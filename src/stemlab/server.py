from __future__ import annotations

import asyncio
import hashlib
import html
import json
import multiprocessing as mp
import os
import queue
import re
import shlex
import signal
import subprocess
import sys
import threading
import time
import uuid
from collections import deque
from contextlib import asynccontextmanager
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.parse import quote

try:
    import socketio
    from fastapi import FastAPI, HTTPException, Request
    from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
except ImportError as exc:  # pragma: no cover - exercised by the CLI error path
    raise RuntimeError(
        "StemLab's HTTP service dependencies are not installed. "
        'Install them with `pip install -e ".[server]"` or `pip install -e ".[all]"`.'
    ) from exc


_HASH_RE = re.compile(r"^[0-9a-f]{64}$")
_SAFE_FILENAME_RE = re.compile(r"[^A-Za-z0-9._-]+")
_DEFAULT_RESULTS_DIR = Path.cwd() / "results"
_EVENT_SENTINEL = {"event": "_scheduler_stopped"}


def _utcnow() -> str:
    return datetime.now(timezone.utc).isoformat()


def _normalise_hash(value: str) -> str:
    value = str(value).strip().lower()
    if not _HASH_RE.fullmatch(value):
        raise ValueError("song hash must be a 64-character SHA-256 hex digest")
    return value


def _safe_filename(value: str) -> str:
    """Return a display-safe basename.

    The uploaded filename never participates in identity: content SHA-256 does.
    We retain a cleaned basename only for human-facing upload metadata.
    """
    value = str(value).replace("\\", "/")
    value = value.rsplit("/", 1)[-1].strip()
    value = _SAFE_FILENAME_RE.sub("_", value).strip("._")
    return (value[:180] or "upload")


def _safe_suffix(filename: str) -> str:
    suffix = Path(filename).suffix.lower()
    if re.fullmatch(r"\.[a-z0-9]{1,12}", suffix):
        return suffix
    return ".audio"


def _atomic_json(path: Path, value: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_name(path.name + f".{os.getpid()}.tmp")
    tmp.write_text(
        json.dumps(value, indent=2, sort_keys=True, default=str) + "\n",
        encoding="utf-8",
    )
    os.replace(tmp, path)


def _read_json(path: Path) -> dict[str, Any] | None:
    try:
        return json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, json.JSONDecodeError, OSError):
        return None


def _tail_lines(path: Path, count: int = 200) -> list[str]:
    if count <= 0 or not path.exists():
        return []
    lines: deque[str] = deque(maxlen=count)
    try:
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for line in handle:
                lines.append(line.rstrip("\r\n"))
    except OSError:
        return []
    return list(lines)


def _job_timeout_seconds(
    durations: list[float],
    minimum_seconds: float,
    multiplier: float,
) -> float:
    """Calculate a stale-job timeout.

    The multiplier is clamped to at least 10, so once historical runtimes exist
    a job is never considered stale before ten times the mean completed analysis
    duration. The minimum is used as a generous floor when little/no history is
    available.
    """
    minimum_seconds = max(60.0, float(minimum_seconds))
    multiplier = max(10.0, float(multiplier))
    clean = [float(value) for value in durations if float(value) > 0]
    if not clean:
        return minimum_seconds
    average = sum(clean) / len(clean)
    return max(minimum_seconds, average * multiplier)


@dataclass(frozen=True)
class ServiceSettings:
    results_dir: Path
    max_jobs: int = 1
    profile: str = "full"
    device: str = "auto"
    extra_cli_args: tuple[str, ...] = ()
    timeout_min_seconds: float = 24 * 60 * 60
    timeout_multiplier: float = 10.0
    file_poll_seconds: float = 1.0
    upload_chunk_bytes: int = 1024 * 1024
    max_upload_bytes: int = 0
    history_lines: int = 200

    @classmethod
    def from_env(cls) -> "ServiceSettings":
        results = Path(os.environ.get("STEMLAB_RESULTS_DIR", _DEFAULT_RESULTS_DIR))
        extra = tuple(shlex.split(os.environ.get("STEMLAB_SERVICE_CLI_ARGS", "")))
        return cls(
            results_dir=results.expanduser().resolve(),
            max_jobs=max(1, int(os.environ.get("STEMLAB_SERVICE_MAX_JOBS", "1"))),
            profile=os.environ.get("STEMLAB_SERVICE_PROFILE", "full"),
            device=os.environ.get("STEMLAB_SERVICE_DEVICE", "auto"),
            extra_cli_args=extra,
            timeout_min_seconds=max(
                60.0,
                float(os.environ.get("STEMLAB_SERVICE_MIN_TIMEOUT_SECONDS", str(24 * 60 * 60))),
            ),
            timeout_multiplier=max(
                10.0,
                float(os.environ.get("STEMLAB_SERVICE_TIMEOUT_MULTIPLIER", "10")),
            ),
            file_poll_seconds=max(
                0.2,
                float(os.environ.get("STEMLAB_SERVICE_FILE_POLL_SECONDS", "1")),
            ),
            upload_chunk_bytes=max(
                64 * 1024,
                int(os.environ.get("STEMLAB_SERVICE_UPLOAD_CHUNK_BYTES", str(1024 * 1024))),
            ),
            max_upload_bytes=max(
                0,
                int(os.environ.get("STEMLAB_SERVICE_MAX_UPLOAD_BYTES", "0")),
            ),
            history_lines=max(
                0,
                int(os.environ.get("STEMLAB_SERVICE_HISTORY_LINES", "200")),
            ),
        )


def _service_root(results_dir: Path) -> Path:
    return results_dir / ".scheduler"


def _job_meta_dir(results_dir: Path, song_hash: str) -> Path:
    return _service_root(results_dir) / "jobs" / song_hash


def _status_path(results_dir: Path, song_hash: str) -> Path:
    return _job_meta_dir(results_dir, song_hash) / "status.json"


def _stats_path(results_dir: Path) -> Path:
    return _service_root(results_dir) / "stats.json"


def _load_durations(results_dir: Path) -> list[float]:
    data = _read_json(_stats_path(results_dir)) or {}
    raw = data.get("durations_seconds", [])
    return [float(value) for value in raw if isinstance(value, (int, float)) and value > 0][-100:]


def _save_durations(results_dir: Path, durations: list[float]) -> None:
    durations = [float(value) for value in durations if value > 0][-100:]
    average = (sum(durations) / len(durations)) if durations else None
    _atomic_json(
        _stats_path(results_dir),
        {
            "updated_at": _utcnow(),
            "sample_count": len(durations),
            "average_analysis_seconds": average,
            "durations_seconds": durations,
        },
    )


def _emit(events: mp.Queue, event: str, song_hash: str, **payload: Any) -> None:
    events.put(
        {
            "event": event,
            "hash": song_hash,
            "timestamp": _utcnow(),
            **payload,
        }
    )


def _set_status(
    results_dir: Path,
    events: mp.Queue,
    song_hash: str,
    **updates: Any,
) -> dict[str, Any]:
    path = _status_path(results_dir, song_hash)
    current = _read_json(path) or {"hash": song_hash}
    current.update(updates)
    current["hash"] = song_hash
    current["updated_at"] = _utcnow()
    _atomic_json(path, current)
    _emit(events, "job_status", song_hash, status=current)
    return current


def _pid_exists(pid: int | None) -> bool:
    if not pid or pid <= 0:
        return False
    if os.name == "nt":
        try:
            result = subprocess.run(
                ["tasklist", "/FI", f"PID eq {pid}", "/NH"],
                text=True,
                capture_output=True,
                check=False,
            )
            return str(pid) in result.stdout
        except OSError:
            return False
    try:
        os.kill(pid, 0)
        return True
    except OSError:
        return False


def _terminate_process_tree(proc: subprocess.Popen[str]) -> None:
    if proc.poll() is not None:
        return
    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/PID", str(proc.pid), "/T", "/F"],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    else:
        try:
            os.killpg(proc.pid, signal.SIGTERM)
            proc.wait(timeout=10)
        except (ProcessLookupError, subprocess.TimeoutExpired):
            try:
                os.killpg(proc.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass


def _pipe_reader(
    song_hash: str,
    stream_name: str,
    pipe: Any,
    log_path: Path,
    events: mp.Queue,
) -> None:
    log_path.parent.mkdir(parents=True, exist_ok=True)
    with log_path.open("a", encoding="utf-8", errors="replace", buffering=1) as log:
        try:
            for line in iter(pipe.readline, ""):
                if line == "":
                    break
                log.write(line)
                _emit(
                    events,
                    "process_output",
                    song_hash,
                    stream=stream_name,
                    line=line.rstrip("\r\n"),
                )
        finally:
            try:
                pipe.close()
            except Exception:
                pass


def _visible_files(workdir: Path) -> dict[str, tuple[int, int]]:
    found: dict[str, tuple[int, int]] = {}
    if not workdir.exists():
        return found
    for path in workdir.rglob("*"):
        if not path.is_file():
            continue
        try:
            rel = path.relative_to(workdir)
        except ValueError:
            continue
        if any(part.startswith(".") for part in rel.parts):
            continue
        try:
            stat = path.stat()
        except OSError:
            continue
        found[rel.as_posix()] = (int(stat.st_size), int(stat.st_mtime_ns))
    return found


def _recover_interrupted_jobs(results_dir: Path, events: mp.Queue) -> None:
    jobs_dir = _service_root(results_dir) / "jobs"
    if not jobs_dir.exists():
        return
    for status_file in jobs_dir.glob("*/status.json"):
        state = _read_json(status_file)
        if not state or state.get("state") not in {"running", "queued"}:
            continue
        pid = state.get("pid")
        # A running CLI whose scheduler has disappeared cannot have its pipe
        # output relayed reliably. Kill an orphaned tree and make the next
        # upload/resubmission restart the hash cleanly.
        if state.get("state") == "running" and _pid_exists(pid):
            if os.name == "nt":
                subprocess.run(
                    ["taskkill", "/PID", str(pid), "/T", "/F"],
                    stdout=subprocess.DEVNULL,
                    stderr=subprocess.DEVNULL,
                    check=False,
                )
            else:
                try:
                    os.killpg(int(pid), signal.SIGTERM)
                except (OSError, TypeError, ValueError):
                    pass
        song_hash = str(state.get("hash") or status_file.parent.name)
        _set_status(
            results_dir,
            events,
            song_hash,
            state="interrupted",
            pid=None,
            message="scheduler restarted while analysis was active; resubmit/upload to resume",
        )


@dataclass
class _RunningJob:
    song_hash: str
    source: Path
    workdir: Path
    proc: subprocess.Popen[str]
    started_monotonic: float
    started_at: str
    timeout_seconds: float
    known_files: dict[str, tuple[int, int]]
    last_file_scan: float
    threads: tuple[threading.Thread, threading.Thread]
    timed_out: bool = False


def _start_job(
    settings: ServiceSettings,
    song_hash: str,
    source: Path,
    events: mp.Queue,
    durations: list[float],
) -> _RunningJob:
    workdir = settings.results_dir / song_hash
    workdir.mkdir(parents=True, exist_ok=True)
    meta_dir = _job_meta_dir(settings.results_dir, song_hash)
    meta_dir.mkdir(parents=True, exist_ok=True)
    stdout_log = meta_dir / "stdout.log"
    stderr_log = meta_dir / "stderr.log"

    timeout_seconds = _job_timeout_seconds(
        durations,
        settings.timeout_min_seconds,
        settings.timeout_multiplier,
    )
    command = [
        sys.executable,
        "-m",
        "stemlab.cli",
        "analyze",
        str(source),
        "--output",
        str(workdir),
        "--profile",
        settings.profile,
        "--device",
        settings.device,
        *settings.extra_cli_args,
    ]
    env = os.environ.copy()
    env["PYTHONUNBUFFERED"] = "1"
    env.setdefault("PYTHONIOENCODING", "utf-8")

    popen_kwargs: dict[str, Any] = {
        "stdout": subprocess.PIPE,
        "stderr": subprocess.PIPE,
        "text": True,
        "encoding": "utf-8",
        "errors": "replace",
        "bufsize": 1,
        "env": env,
    }
    if os.name == "nt":
        popen_kwargs["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP
    else:
        popen_kwargs["start_new_session"] = True

    proc = subprocess.Popen(command, **popen_kwargs)
    assert proc.stdout is not None
    assert proc.stderr is not None

    stdout_thread = threading.Thread(
        target=_pipe_reader,
        args=(song_hash, "stdout", proc.stdout, stdout_log, events),
        daemon=True,
    )
    stderr_thread = threading.Thread(
        target=_pipe_reader,
        args=(song_hash, "stderr", proc.stderr, stderr_log, events),
        daemon=True,
    )
    stdout_thread.start()
    stderr_thread.start()

    started_at = _utcnow()
    _set_status(
        settings.results_dir,
        events,
        song_hash,
        state="running",
        pid=proc.pid,
        source=str(source),
        command=command,
        started_at=started_at,
        completed_at=None,
        returncode=None,
        timeout_seconds=timeout_seconds,
        profile=settings.profile,
        device=settings.device,
    )
    return _RunningJob(
        song_hash=song_hash,
        source=source,
        workdir=workdir,
        proc=proc,
        started_monotonic=time.monotonic(),
        started_at=started_at,
        timeout_seconds=timeout_seconds,
        known_files=_visible_files(workdir),
        last_file_scan=0.0,
        threads=(stdout_thread, stderr_thread),
    )


def _scan_job_files(job: _RunningJob, events: mp.Queue) -> None:
    current = _visible_files(job.workdir)
    for rel, (size, mtime_ns) in current.items():
        if rel not in job.known_files:
            _emit(
                events,
                "new_file",
                job.song_hash,
                path=rel,
                bytes=size,
                mtime_ns=mtime_ns,
                url=f"/{job.song_hash}/{quote(rel)}",
            )
    job.known_files = current
    job.last_file_scan = time.monotonic()


def _scheduler_process_main(
    settings: ServiceSettings,
    commands: mp.Queue,
    events: mp.Queue,
) -> None:
    settings.results_dir.mkdir(parents=True, exist_ok=True)
    _service_root(settings.results_dir).mkdir(parents=True, exist_ok=True)
    durations = _load_durations(settings.results_dir)
    _recover_interrupted_jobs(settings.results_dir, events)

    pending: deque[tuple[str, Path]] = deque()
    pending_hashes: set[str] = set()
    running: dict[str, _RunningJob] = {}
    shutting_down = False

    def queue_job(song_hash: str, source: Path, message: str) -> None:
        if song_hash in pending_hashes or song_hash in running:
            return
        pending.append((song_hash, source))
        pending_hashes.add(song_hash)
        _set_status(
            settings.results_dir,
            events,
            song_hash,
            state="queued",
            pid=None,
            source=str(source),
            message=message,
        )

    while not shutting_down:
        # Drain commands first so duplicate uploads are coalesced in one process.
        while True:
            try:
                command = commands.get_nowait()
            except queue.Empty:
                break

            op = command.get("op")
            if op == "shutdown":
                shutting_down = True
                break
            if op != "submit":
                continue

            try:
                song_hash = _normalise_hash(command["hash"])
                source = Path(command["source"]).resolve()
            except (KeyError, ValueError, OSError):
                continue

            existing = running.get(song_hash)
            if existing is not None:
                elapsed = time.monotonic() - existing.started_monotonic
                if elapsed <= existing.timeout_seconds:
                    state = _read_json(_status_path(settings.results_dir, song_hash)) or {}
                    _emit(
                        events,
                        "job_status",
                        song_hash,
                        status={**state, "attached": True},
                    )
                    continue

                _emit(
                    events,
                    "job_timeout",
                    song_hash,
                    elapsed_seconds=elapsed,
                    timeout_seconds=existing.timeout_seconds,
                    message="duplicate submission found stale running analysis; restarting it",
                )
                _terminate_process_tree(existing.proc)
                for thread in existing.threads:
                    thread.join(timeout=2)
                running.pop(song_hash, None)
                _set_status(
                    settings.results_dir,
                    events,
                    song_hash,
                    state="timed_out",
                    pid=None,
                    returncode=existing.proc.poll(),
                )
                queue_job(song_hash, source, "requeued after stale analysis timeout")
                continue

            if song_hash in pending_hashes:
                state = _read_json(_status_path(settings.results_dir, song_hash)) or {}
                _emit(
                    events,
                    "job_status",
                    song_hash,
                    status={**state, "attached": True},
                )
                continue

            workdir = settings.results_dir / song_hash
            status = _read_json(_status_path(settings.results_dir, song_hash)) or {}
            if status.get("state") == "completed" and (workdir / "manifest.json").exists():
                _emit(
                    events,
                    "job_status",
                    song_hash,
                    status={**status, "attached": True, "cached": True},
                )
                continue

            queue_job(song_hash, source, "analysis submitted")

        if shutting_down:
            break

        while pending and len(running) < settings.max_jobs:
            song_hash, source = pending.popleft()
            pending_hashes.discard(song_hash)
            if not source.is_file():
                _set_status(
                    settings.results_dir,
                    events,
                    song_hash,
                    state="failed",
                    pid=None,
                    message=f"source file disappeared before analysis: {source}",
                )
                continue
            try:
                running[song_hash] = _start_job(
                    settings,
                    song_hash,
                    source,
                    events,
                    durations,
                )
            except Exception as exc:
                _set_status(
                    settings.results_dir,
                    events,
                    song_hash,
                    state="failed",
                    pid=None,
                    message=f"failed to start analysis: {type(exc).__name__}: {exc}",
                )

        now = time.monotonic()
        for song_hash, job in list(running.items()):
            if now - job.last_file_scan >= settings.file_poll_seconds:
                _scan_job_files(job, events)

            elapsed = now - job.started_monotonic
            if job.proc.poll() is None and elapsed > job.timeout_seconds:
                _emit(
                    events,
                    "job_timeout",
                    song_hash,
                    elapsed_seconds=elapsed,
                    timeout_seconds=job.timeout_seconds,
                    message="analysis exceeded stale-job timeout",
                )
                job.timed_out = True
                _terminate_process_tree(job.proc)

            returncode = job.proc.poll()
            if returncode is None:
                continue

            for thread in job.threads:
                thread.join(timeout=3)
            _scan_job_files(job, events)

            duration = max(0.0, time.monotonic() - job.started_monotonic)
            state_name = (
                "completed" if returncode == 0
                else "timed_out" if job.timed_out
                else "failed"
            )
            if returncode == 0:
                durations.append(duration)
                durations[:] = durations[-100:]
                _save_durations(settings.results_dir, durations)

            _set_status(
                settings.results_dir,
                events,
                song_hash,
                state=state_name,
                pid=None,
                returncode=returncode,
                duration_seconds=duration,
                completed_at=_utcnow(),
            )
            running.pop(song_hash, None)

        time.sleep(0.2)

    for song_hash, job in list(running.items()):
        _terminate_process_tree(job.proc)
        for thread in job.threads:
            thread.join(timeout=2)
        _set_status(
            settings.results_dir,
            events,
            song_hash,
            state="interrupted",
            pid=None,
            returncode=job.proc.poll(),
            message="web service scheduler stopped",
        )
    events.put(_EVENT_SENTINEL)


class AnalysisScheduler:
    """Small multi-process coordinator around StemLab CLI subprocesses."""

    def __init__(self, settings: ServiceSettings):
        self.settings = settings
        self._ctx = mp.get_context("spawn")
        self._commands: mp.Queue | None = None
        self._events: mp.Queue | None = None
        self._process: mp.Process | None = None

    def start(self) -> None:
        if self._process is not None and self._process.is_alive():
            return
        self.settings.results_dir.mkdir(parents=True, exist_ok=True)
        self._commands = self._ctx.Queue()
        self._events = self._ctx.Queue()
        self._process = self._ctx.Process(
            target=_scheduler_process_main,
            args=(self.settings, self._commands, self._events),
            name="stemlab-analysis-scheduler",
            daemon=True,
        )
        self._process.start()

    def stop(self) -> None:
        process = self._process
        commands = self._commands
        if process is None:
            return
        if process.is_alive() and commands is not None:
            commands.put({"op": "shutdown"})
            process.join(timeout=15)
        if process.is_alive():
            process.terminate()
            process.join(timeout=5)
        self._process = None

    def submit(self, song_hash: str, source: Path) -> None:
        song_hash = _normalise_hash(song_hash)
        if self._commands is None:
            raise RuntimeError("analysis scheduler is not running")
        self._commands.put(
            {
                "op": "submit",
                "hash": song_hash,
                "source": str(source.resolve()),
            }
        )

    def status(self, song_hash: str) -> dict[str, Any]:
        song_hash = _normalise_hash(song_hash)
        state = _read_json(_status_path(self.settings.results_dir, song_hash))
        return state or {"hash": song_hash, "state": "unknown"}

    def next_event(self, timeout: float = 0.5) -> dict[str, Any] | None:
        if self._events is None:
            return None
        try:
            return self._events.get(timeout=timeout)
        except queue.Empty:
            return None

    def history(self, song_hash: str) -> dict[str, list[str]]:
        song_hash = _normalise_hash(song_hash)
        meta = _job_meta_dir(self.settings.results_dir, song_hash)
        return {
            "stdout": _tail_lines(meta / "stdout.log", self.settings.history_lines),
            "stderr": _tail_lines(meta / "stderr.log", self.settings.history_lines),
        }


settings = ServiceSettings.from_env()
sio = socketio.AsyncServer(
    async_mode="asgi",
    cors_allowed_origins="*",
    logger=False,
    engineio_logger=False,
)


async def _event_pump(scheduler: AnalysisScheduler) -> None:
    while True:
        event = await asyncio.to_thread(scheduler.next_event, 0.5)
        if event is None:
            await asyncio.sleep(0)
            continue
        if event == _EVENT_SENTINEL:
            return
        event_name = str(event.get("event") or "scheduler_event")
        song_hash = event.get("hash")
        if song_hash and _HASH_RE.fullmatch(str(song_hash)):
            await sio.emit(event_name, event, room=str(song_hash))


@asynccontextmanager
async def _lifespan(app: FastAPI):
    scheduler = AnalysisScheduler(settings)
    scheduler.start()
    app.state.scheduler = scheduler
    pump = asyncio.create_task(_event_pump(scheduler))
    try:
        yield
    finally:
        scheduler.stop()
        try:
            await asyncio.wait_for(pump, timeout=3)
        except (asyncio.TimeoutError, asyncio.CancelledError):
            pump.cancel()


http_app = FastAPI(
    title="StemLab Analysis Service",
    version="1",
    lifespan=_lifespan,
)


def _scheduler_from_app() -> AnalysisScheduler:
    scheduler = getattr(http_app.state, "scheduler", None)
    if scheduler is None:
        raise HTTPException(status_code=503, detail="analysis scheduler is not running")
    return scheduler


@http_app.get("/")
async def service_index():
    from .webui import index_response

    return index_response()


@http_app.get("/healthz")
async def healthz() -> dict[str, Any]:
    scheduler = getattr(http_app.state, "scheduler", None)
    process_alive = bool(
        scheduler
        and scheduler._process is not None  # noqa: SLF001 - internal health probe
        and scheduler._process.is_alive()  # noqa: SLF001
    )
    return {
        "ok": process_alive,
        "scheduler": "running" if process_alive else "stopped",
        "max_jobs": settings.max_jobs,
    }


async def _store_upload(request: Request, filename: str) -> tuple[str, Path, int, str]:
    clean_name = _safe_filename(filename)
    uploads_dir = _service_root(settings.results_dir) / "uploads"
    uploads_dir.mkdir(parents=True, exist_ok=True)
    temp_path = uploads_dir / f"{uuid.uuid4().hex}.part"

    content_length = request.headers.get("content-length")
    if (
        settings.max_upload_bytes > 0
        and content_length
        and int(content_length) > settings.max_upload_bytes
    ):
        raise HTTPException(status_code=413, detail="upload exceeds configured maximum size")

    digest = hashlib.sha256()
    size = 0
    try:
        with temp_path.open("wb") as handle:
            async for chunk in request.stream():
                if not chunk:
                    continue
                size += len(chunk)
                if settings.max_upload_bytes > 0 and size > settings.max_upload_bytes:
                    raise HTTPException(
                        status_code=413,
                        detail="upload exceeds configured maximum size",
                    )
                digest.update(chunk)
                handle.write(chunk)
    except Exception:
        temp_path.unlink(missing_ok=True)
        raise

    if size == 0:
        temp_path.unlink(missing_ok=True)
        raise HTTPException(status_code=400, detail="empty upload")

    song_hash = digest.hexdigest()
    workdir = settings.results_dir / song_hash
    source_dir = workdir / ".source"
    source_dir.mkdir(parents=True, exist_ok=True)

    existing = sorted(source_dir.glob("upload.*"))
    if existing:
        source_path = existing[0]
        temp_path.unlink(missing_ok=True)
    else:
        source_path = source_dir / f"upload{_safe_suffix(clean_name)}"
        try:
            os.replace(temp_path, source_path)
        except OSError:
            # Another simultaneous upload of the exact bytes may have won.
            existing = sorted(source_dir.glob("upload.*"))
            if existing:
                source_path = existing[0]
                temp_path.unlink(missing_ok=True)
            else:
                raise

    upload_id = uuid.uuid4().hex
    _atomic_json(
        source_dir / "uploads" / f"{upload_id}.json",
        {
            "upload_id": upload_id,
            "received_at": _utcnow(),
            "sha256": song_hash,
            "bytes": size,
            "filename": clean_name,
            "content_type": request.headers.get("content-type"),
            "source_path": str(source_path),
        },
    )
    return song_hash, source_path, size, clean_name


@http_app.put("/upload/{filename:path}")
async def upload_file(request: Request, filename: str) -> JSONResponse:
    song_hash, source_path, size, clean_name = await _store_upload(request, filename)
    scheduler = _scheduler_from_app()
    scheduler.submit(song_hash, source_path)
    state = scheduler.status(song_hash)
    return JSONResponse(
        status_code=202,
        content={
            "hash": song_hash,
            "filename": clean_name,
            "bytes": size,
            "state": state.get("state", "submitted"),
            "status_url": f"/jobs/{song_hash}",
            "results_url": f"/{song_hash}",
            "socket_io_path": "/socket.io",
            "socket_room": song_hash,
            "subscribe": {"event": "subscribe", "data": {"hash": song_hash}},
        },
    )


@http_app.put("/upload")
async def upload_file_header(request: Request) -> JSONResponse:
    filename = (
        request.headers.get("x-filename")
        or request.query_params.get("filename")
        or "upload"
    )
    return await upload_file(request, filename)


@http_app.get("/jobs/{song_hash}")
async def job_status(song_hash: str) -> dict[str, Any]:
    try:
        song_hash = _normalise_hash(song_hash)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    return _scheduler_from_app().status(song_hash)


def _resolve_result_path(song_hash: str, rel_path: str = "") -> tuple[Path, Path]:
    try:
        song_hash = _normalise_hash(song_hash)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail="not found") from exc

    root = (settings.results_dir / song_hash).resolve()
    if not root.is_dir():
        raise HTTPException(status_code=404, detail="result hash not found")

    target = (root / rel_path).resolve()
    try:
        target.relative_to(root)
    except ValueError as exc:
        raise HTTPException(status_code=404, detail="not found") from exc

    # Internal upload/scheduler metadata is not part of the public result tree.
    if any(part.startswith(".") for part in Path(rel_path).parts):
        raise HTTPException(status_code=404, detail="not found")
    return root, target


from .webui import install_routes as _install_web_routes

_install_web_routes(
    http_app,
    results_dir_provider=lambda: settings.results_dir,
    scheduler_provider=_scheduler_from_app,
)


def _directory_listing(song_hash: str, root: Path, directory: Path) -> HTMLResponse:
    rel = directory.relative_to(root)
    title_path = "/" + song_hash
    if rel.parts:
        title_path += "/" + rel.as_posix()

    rows: list[str] = []
    if rel.parts:
        parent_rel = rel.parent.as_posix()
        parent_url = f"/{song_hash}"
        if parent_rel != ".":
            parent_url += "/" + quote(parent_rel)
        rows.append(f'<li><a href="{parent_url}">../</a></li>')

    for child in sorted(directory.iterdir(), key=lambda p: (not p.is_dir(), p.name.lower())):
        if child.name.startswith("."):
            continue
        child_rel = child.relative_to(root).as_posix()
        href = f"/{song_hash}/{quote(child_rel)}"
        label = html.escape(child.name + ("/" if child.is_dir() else ""))
        suffix = ""
        if child.is_file():
            try:
                suffix = f" <small>{child.stat().st_size:,} bytes</small>"
            except OSError:
                pass
        rows.append(f'<li><a href="{href}">{label}</a>{suffix}</li>')

    status = _read_json(_status_path(settings.results_dir, song_hash)) or {}
    state = html.escape(str(status.get("state", "unknown")))
    body = (
        "<!doctype html><html><head>"
        f"<meta charset='utf-8'><title>StemLab {html.escape(title_path)}</title>"
        "<style>body{font-family:system-ui,sans-serif;max-width:1100px;margin:2rem auto;"
        "padding:0 1rem}li{margin:.35rem 0}small{color:#666}code{background:#eee;"
        "padding:.15rem .3rem}</style></head><body>"
        f"<h1>{html.escape(title_path)}</h1>"
        f"<p>Analysis state: <code>{state}</code></p>"
        "<ul>"
        + "".join(rows)
        + "</ul></body></html>"
    )
    return HTMLResponse(body)


@http_app.get("/{song_hash}")
async def result_root(song_hash: str):
    root, target = _resolve_result_path(song_hash)
    return _directory_listing(song_hash.lower(), root, target)


@http_app.get("/{song_hash}/{rel_path:path}")
async def result_file(song_hash: str, rel_path: str):
    root, target = _resolve_result_path(song_hash, rel_path)
    if not target.exists():
        raise HTTPException(status_code=404, detail="file not found")
    if target.is_dir():
        return _directory_listing(song_hash.lower(), root, target)
    if not target.is_file():
        raise HTTPException(status_code=404, detail="file not found")
    return FileResponse(target)


@sio.event
async def connect(sid: str, environ: dict, auth: Any = None):
    return True


@sio.event
async def subscribe(sid: str, data: Any):
    raw_hash = data.get("hash") if isinstance(data, dict) else data
    try:
        song_hash = _normalise_hash(raw_hash)
    except (TypeError, ValueError):
        return {"ok": False, "error": "invalid SHA-256 hash"}

    workdir = settings.results_dir / song_hash
    if not workdir.exists():
        return {"ok": False, "error": "unknown SHA-256 hash"}

    await sio.enter_room(sid, song_hash)
    scheduler = _scheduler_from_app()
    status = scheduler.status(song_hash)
    await sio.emit(
        "job_status",
        {
            "event": "job_status",
            "hash": song_hash,
            "timestamp": _utcnow(),
            "status": {**status, "attached": True},
        },
        to=sid,
    )
    history = scheduler.history(song_hash)
    if history["stdout"] or history["stderr"]:
        await sio.emit(
            "process_history",
            {
                "event": "process_history",
                "hash": song_hash,
                "timestamp": _utcnow(),
                **history,
            },
            to=sid,
        )
    return {"ok": True, "hash": song_hash, "status": status}


@sio.event
async def unsubscribe(sid: str, data: Any):
    raw_hash = data.get("hash") if isinstance(data, dict) else data
    try:
        song_hash = _normalise_hash(raw_hash)
    except (TypeError, ValueError):
        return {"ok": False, "error": "invalid SHA-256 hash"}
    await sio.leave_room(sid, song_hash)
    return {"ok": True, "hash": song_hash}


app = socketio.ASGIApp(
    sio,
    http_app,
    socketio_path="socket.io",
)


def run_server(
    *,
    host: str = "0.0.0.0",
    port: int = 8000,
    results_dir: Path | None = None,
    max_jobs: int | None = None,
    profile: str | None = None,
    device: str | None = None,
) -> None:
    """Run the service with exactly one ASGI worker.

    Analysis concurrency belongs to AnalysisScheduler. Running multiple ASGI
    workers would create independent schedulers and break the one-job-per-hash
    guarantee.
    """
    if results_dir is not None:
        os.environ["STEMLAB_RESULTS_DIR"] = str(results_dir.expanduser().resolve())
    if max_jobs is not None:
        os.environ["STEMLAB_SERVICE_MAX_JOBS"] = str(max(1, int(max_jobs)))
    if profile is not None:
        os.environ["STEMLAB_SERVICE_PROFILE"] = profile
    if device is not None:
        os.environ["STEMLAB_SERVICE_DEVICE"] = device

    # Refresh module settings after applying CLI overrides. This also keeps
    # ``uvicorn stemlab.server:app`` working normally from environment values.
    global settings
    settings = ServiceSettings.from_env()

    import uvicorn

    uvicorn.run(
        app,
        host=host,
        port=int(port),
        workers=1,
        reload=False,
    )
