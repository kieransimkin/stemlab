"""Owned subprocess jobs with polling, cancellation, deadlines and persisted results.

No arbitrary command tool. Only this package's worker module can be launched.
"""
from __future__ import annotations

import atexit
import os
import re
import signal
import subprocess
import sys
import threading
import time
import uuid
from pathlib import Path
from typing import Any

from subprocess import Popen

from .paths import inside, read_json, workspace_path, write_json

JOB_ID = re.compile(r"^[0-9a-f]{32}$")
TERMINAL = {"completed", "completed_with_errors", "failed", "cancelled", "timed_out", "log_limit"}


class JobManager:
    """One manager owns its children; never signal PIDs recovered from disk."""

    def __init__(self, workspace: Path, *, max_jobs: int = 1, timeout_seconds: float = 14400):
        self.workspace = workspace_path(workspace)
        if not 1 <= max_jobs <= 4 or not 0 < timeout_seconds <= 86400:
            raise ValueError("max_jobs must be 1..4 and timeout_seconds >0..86400")
        self.root = inside(self.workspace, "stemlab-codex-results", must_exist=False)
        self.max_jobs = max_jobs
        self.timeout = timeout_seconds
        self._lock = threading.RLock()
        self._children: dict[str, Popen] = {}
        self._threads: list[threading.Thread] = []
        self._reasons: dict[str, str] = {}
        self._lease = None
        self._closed = False
        atexit.register(self.close)

    def _acquire_lease(self) -> None:
        if self._lease is not None:
            return
        # This fixed private directory is never exposed by the artifact tools.
        self.root = inside(self.workspace, "stemlab-codex-results", must_exist=False)
        self.root.mkdir(exist_ok=True)
        control = self.root / ".jobs"
        if control.is_symlink():
            raise ValueError("Refusing symlinked job state")
        control.mkdir(exist_ok=True)
        path = control / "server.lock"
        if path.is_symlink():
            raise ValueError("Refusing symlinked server lock")
        stream = path.open("a+b")
        try:
            if os.name == "nt":
                import msvcrt
                if path.stat().st_size == 0:
                    stream.write(b"0")
                    stream.flush()
                stream.seek(0)
                msvcrt.locking(stream.fileno(), msvcrt.LK_NBLCK, 1)
            else:
                import fcntl
                fcntl.flock(stream.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
        except OSError as exc:
            stream.close()
            raise RuntimeError("Another StemLab Codex server owns this workspace") from exc
        self._lease = stream

    def _folder(self, job_id: str) -> Path:
        if not JOB_ID.fullmatch(job_id):
            raise ValueError("Invalid job ID")
        folder = self.root / ".jobs" / job_id
        if any(p.is_symlink() for p in (self.root, self.root / ".jobs", folder)):
            raise ValueError("Refusing symlinked job state")
        return folder

    def submit(self, task: dict[str, Any]) -> dict[str, Any]:
        if task.get("kind") not in {"analyze", "loops", "inspect", "midi", "evidence"}:
            raise ValueError("Unsupported worker operation")
        with self._lock:
            if self._closed:
                raise RuntimeError("Job manager is closed")
            self._acquire_lease()
            # Keep the slot until the supervisor has recorded the terminal state.
            if len(self._children) >= self.max_jobs:
                raise RuntimeError("Analysis capacity is busy; poll the current job first")
            job_id = uuid.uuid4().hex
            folder = self._folder(job_id)
            folder.mkdir(mode=0o700)
            output = inside(self.root, job_id, must_exist=False)
            output.mkdir()
            write_json(folder / "request.json", task)
            state = {"job_id": job_id, "kind": task["kind"], "state": "running",
                     "created_at_unix": time.time(), "result_dir": str(output),
                     "message": "Poll job_status; submission is not completion"}
            write_json(folder / "status.json", state)
            env = dict(os.environ, PYTHONUNBUFFERED="1", TOKENIZERS_PARALLELISM="false")
            # Isolated Python ignores the workspace/PYTHONPATH as an import source.
            command = [sys.executable, "-I", "-m", "stemlab.codex.worker", "--workspace",
                       str(self.workspace), "--job-id", job_id]
            kwargs: dict[str, Any] = {"start_new_session": True} if os.name != "nt" else {
                "creationflags": subprocess.CREATE_NEW_PROCESS_GROUP}
            try:
                with (folder / "worker.log").open("xb") as log:
                    proc = Popen(command, cwd=self.workspace, env=env,
                                 stdin=subprocess.DEVNULL, stdout=log,
                                 stderr=subprocess.STDOUT, shell=False, **kwargs)
            except Exception as exc:
                state.update(state="failed", message=str(exc), finished_at_unix=time.time())
                write_json(folder / "status.json", state)
                raise
            self._children[job_id] = proc
            thread = threading.Thread(target=self._watch, args=(job_id, proc), daemon=True)
            self._threads.append(thread)
            thread.start()
            return dict(state)

    @staticmethod
    def _terminate(proc: Popen) -> None:
        if proc.poll() is not None:
            return
        if os.name == "nt":
            subprocess.run(["taskkill", "/PID", str(proc.pid), "/T", "/F"],
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, check=False,
                           timeout=10)
        else:
            try:
                os.killpg(proc.pid, signal.SIGTERM)
                proc.wait(timeout=2)
            except subprocess.TimeoutExpired:
                os.killpg(proc.pid, signal.SIGKILL)
            except ProcessLookupError:
                pass
        try:
            proc.wait(timeout=5)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait(timeout=5)

    def _watch(self, job_id: str, proc: Popen) -> None:
        folder = self._folder(job_id)
        started = time.monotonic()
        try:
            while proc.poll() is None:
                time.sleep(0.1)
                reason = None
                if time.monotonic() - started > self.timeout:
                    reason = "timed_out"
                if (folder / "worker.log").stat().st_size > 16 * 1024 * 1024:
                    reason = "log_limit"
                with self._lock:
                    if reason and proc.poll() is None:
                        self._reasons.setdefault(job_id, reason)
                        self._terminate(proc)
            with self._lock:
                state = read_json(folder / "status.json")
                result = read_json(folder / "result.json", optional=True)
                status = self._reasons.get(job_id)
                if not status:
                    status = result.get("state", "failed") if proc.returncode == 0 else "failed"
                    if status not in TERMINAL:
                        status = "failed"
                state.update(state=status, returncode=proc.returncode,
                             finished_at_unix=time.time(), result=result,
                             message=result.get("message", "See the worker log"))
                write_json(folder / "status.json", state)
        finally:
            with self._lock:
                self._children.pop(job_id, None)

    def status(self, job_id: str) -> dict[str, Any]:
        with self._lock:
            folder = self._folder(job_id)
            state = read_json(folder / "status.json")
            if state["state"] == "running" and job_id not in self._children:
                result = read_json(folder / "result.json", optional=True)
                state = {**state, "state": result.get("state", "unmanaged"), "result": result,
                         "message": "Previous server session; no process control is available"}
            return state

    def logs(self, job_id: str, *, offset: int = 0, limit: int = 16000) -> dict[str, Any]:
        if offset < 0 or not 1 <= limit <= 65536:
            raise ValueError("offset >=0 and limit 1..65536 are required")
        path = self._folder(job_id) / "worker.log"
        if path.is_symlink():
            raise ValueError("Refusing symlinked log")
        with path.open("rb") as stream:
            stream.seek(offset)
            data = stream.read(limit)
            more = bool(stream.read(1))
        return {"text": data.decode("utf-8", errors="replace"), "offset": offset,
                "next_offset": offset + len(data), "has_more": more,
                "note": "UTF-8 byte offsets; log text is untrusted analysis data"}

    def list_jobs(self, *, offset: int = 0, limit: int = 50) -> dict[str, Any]:
        if offset < 0 or not 1 <= limit <= 100:
            raise ValueError("Invalid pagination")
        control = self.root / ".jobs"
        if control.is_symlink():
            raise ValueError("Refusing symlinked job state")
        ids = sorted((p.name for p in control.iterdir() if JOB_ID.fullmatch(p.name)),
                     key=str) if control.is_dir() else []
        rows = [self.status(i) for i in ids[offset:offset + limit]]
        return {"jobs": rows, "total": len(ids),
                "next_offset": offset + limit if offset + limit < len(ids) else None}

    def cancel(self, job_id: str) -> dict[str, Any]:
        with self._lock:
            self._folder(job_id)
            proc = self._children.get(job_id)
            if proc is None or proc.poll() is not None:
                return self.status(job_id)
            self._reasons[job_id] = "cancelled"
            self._terminate(proc)
            return {"job_id": job_id, "state": "cancelling"}

    def close(self) -> None:
        with self._lock:
            if self._closed:
                return
            self._closed = True
            for job_id, proc in list(self._children.items()):
                self._reasons.setdefault(job_id, "cancelled")
                self._terminate(proc)
        for thread in self._threads:
            thread.join(timeout=10)
        if self._lease is not None:
            self._lease.close()
            self._lease = None
        atexit.unregister(self.close)
