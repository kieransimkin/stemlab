"""Read-only loopback viewer for the existing StemLab React timeline.

No duplicate renderer, analysis scheduler, uploads, model inference, or source
copies. The normal frontend bundle owns seeking, zoom and native loop playback.
This adapter maps one authorised result directory onto its existing HTTP contract.
"""
from __future__ import annotations

import asyncio
import hmac
import os
import re
import secrets
import socket
import threading
import time
import zipfile
from pathlib import Path
from typing import Any
from urllib.parse import urlencode

from .paths import AUDIO_SUFFIXES, TEXT_SUFFIXES, inside, read_json, result_root

WEB_ROOT = Path(__file__).resolve().parents[1] / "web"
ASSETS = {"app.js", "timeline.css", "style.css", "arcadians-reference.json", "arcadians-cover.jpg"}
VISIBLE_SUFFIXES = AUDIO_SUFFIXES | TEXT_SUFFIXES | {".png", ".jpg", ".jpeg", ".npz", ".mid", ".midi", ".sv", ".xml"}
MAX_DSP_BYTES = 256 * 1024 * 1024
CSP = ("default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; "
       "img-src 'self' data: blob:; media-src 'self' blob:; connect-src 'self'; "
       "object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'")


class TimelineEvidence:
    """Resolve existing artifacts without granting the HTTP client workspace access."""

    def __init__(self, workspace: Path, results_path: str):
        from stemlab.audio import audio_info
        from stemlab.util import sha256_file

        self.workspace = workspace
        root = result_root(workspace, results_path)
        self.relative = root.relative_to(workspace).as_posix()
        report = read_json(inside(root, "analysis.json"))
        self.source_name = report.get("source", {}).get("copied_path")
        self.digest = report.get("source", {}).get("sha256")
        if not isinstance(self.source_name, str) or not isinstance(self.digest, str):
            raise ValueError("Timeline inspection needs the copied master and its SHA-256")
        if not re.fullmatch(r"[0-9a-f]{64}", self.digest):
            raise ValueError("Invalid source SHA-256")
        master = inside(root, self.source_name)
        if master.suffix.lower() not in AUDIO_SUFFIXES or not master.is_file():
            raise ValueError("The copied master must be a supported audio file")
        if sha256_file(master) != self.digest:
            raise ValueError("Copied master does not match saved analysis; refusing a misleading timeline")
        self.source_info = audio_info(master)
        if self.source_info["num_frames"] <= 0:
            raise ValueError("The copied master is empty")
        self.source_stat = self._stamp(master)

    @staticmethod
    def _stamp(path: Path) -> tuple[int, int, int]:
        stat = path.stat()
        return stat.st_size, stat.st_mtime_ns, stat.st_ctime_ns

    def root(self) -> Path:
        # Recheck the workspace boundary on requests, not just at startup.
        return result_root(self.workspace, self.relative)

    def file(self, name: str) -> Path:
        path = inside(self.root(), name)
        if not path.is_file() or path.suffix.lower() not in VISIBLE_SUFFIXES:
            raise ValueError("Not a supported analysis artifact")
        return path

    def source(self) -> Path:
        root = self.root()
        report = read_json(inside(root, "analysis.json"))
        if (report.get("source", {}).get("copied_path") != self.source_name
                or report.get("source", {}).get("sha256") != self.digest):
            raise ValueError("Source identity changed; reopen the timeline")
        master = inside(root, self.source_name)
        if self._stamp(master) != self.source_stat:
            raise ValueError("Copied master changed; reopen the timeline to revalidate it")
        return master

    def json(self, name: str, *, optional: bool = False) -> dict[str, Any]:
        path = inside(self.root(), name, must_exist=not optional)
        return read_json(path, optional=optional)

    def inventory(self) -> list[dict[str, Any]]:
        root = self.root()
        rows = []
        for current, dirs, names in os.walk(root, followlinks=False):
            kept = []
            for name in sorted(dirs):
                try:
                    inside(root, Path(current) / name)
                except (ValueError, OSError):
                    continue
                kept.append(name)
            dirs[:] = kept
            for name in sorted(names):
                path = Path(current) / name
                try:
                    checked = self.file(path.relative_to(root).as_posix())
                except (ValueError, OSError):
                    continue
                stat = checked.stat()
                rel = path.relative_to(root).as_posix()
                rows.append({"path": rel, "bytes": stat.st_size, "mtime_ns": stat.st_mtime_ns})
                if len(rows) > 10000:
                    raise ValueError("Too many artifacts for this viewer; use paginated MCP inspection")
        return sorted(rows, key=lambda row: row["path"])

    def state(self) -> dict[str, Any]:
        from stemlab.webui import _first_detected_beat

        self.source()
        # The shared selector reads these names directly. Validate each first.
        for name in ("beats/consensus.json", "beats/beat_transformer.json",
                     "beats/beat_this.json", "beats/beatnet.json", "vamp/data/vamp_beats.json"):
            self.json(name, optional=True)
        first, origin = _first_detected_beat(self.root())
        report = self.json("analysis.json")
        errors = list(report.get("errors") or [])
        errors += list((report.get("deep_analysis") or {}).get("errors") or [])
        return {"hash": self.digest,
                "status": {"state": "completed_with_errors" if errors else "completed",
                           "message": "Read-only inspection of saved results; no analysis run",
                           "error_count": len(errors)},
                "duration_seconds": self.source_info["duration_seconds"],
                "source_url": f"/api/{self.digest}/source", "files": self.inventory(),
                "canonical": self.json("canonical.json", optional=True),
                "first_detected_beat": first, "first_detected_beat_source": origin}

    def waveform(self, name: str, points: int) -> dict[str, Any]:
        from stemlab.audio import audio_info
        from stemlab.webui import _waveform_envelope

        path = self.source() if name == "__source__" else self.file(name)
        if path.suffix.lower() not in AUDIO_SUFFIXES:
            raise ValueError("Waveform source must be audio")
        info = audio_info(path)
        if info["num_frames"] * info["num_channels"] * 4 > MAX_DSP_BYTES:
            raise ValueError("Waveform decode exceeds viewer memory limit; use saved artifacts")
        return _waveform_envelope(path, points=max(128, min(20000, points)))

    def spectrogram(self, name: str, width: int, height: int) -> bytes:
        from stemlab.webui import _spectrogram_strip_png

        path = self.file(name)
        if Path(name).parts[0] != "spectrograms" or path.suffix.lower() != ".npz":
            raise ValueError("Choose a spectrograms/*.npz dataset")
        with zipfile.ZipFile(path) as payload:
            if len(payload.infolist()) > 32 or sum(i.file_size for i in payload.infolist()) > MAX_DSP_BYTES:
                raise ValueError("Spectrogram exceeds viewer decode limit")
        return _spectrogram_strip_png(path, max_width=max(256, min(8192, width)),
                                       max_height=max(64, min(768, height)))

    def loop_audio(self, loop_id: str) -> tuple[bytes, str]:
        from stemlab.analysis.loops import preview_loop

        self.source()
        self.json("deep/loops/loops.json")
        return preview_loop(self.root(), loop_id)


def create_timeline_app(evidence: TimelineEvidence, *, origin: str, token: str,
                        cookie_name: str, expired, lifetime_seconds: int):
    """Use the real React frontend with a single-result, GET-only API surface."""
    from fastapi import FastAPI, HTTPException, Request
    from fastapi.responses import FileResponse, HTMLResponse, JSONResponse, RedirectResponse, Response

    app = FastAPI(docs_url=None, redoc_url=None, openapi_url=None)
    expected_host = origin.removeprefix("http://")

    @app.middleware("http")
    async def guard(request: Request, call_next):
        headers = {"Cache-Control": "no-store", "Referrer-Policy": "no-referrer",
                   "X-Content-Type-Options": "nosniff", "Content-Security-Policy": CSP}
        def error(code: int, message: str):
            return JSONResponse({"detail": message}, status_code=code, headers=headers)
        if expired():
            return error(410, "Timeline session expired; reopen it through MCP")
        if request.headers.get("host") != expected_host:
            return error(403, "Invalid viewer host")
        if request.headers.get("origin") not in {None, origin}:
            return error(403, "Cross-origin access is not allowed")
        if request.method not in {"GET", "HEAD"}:
            return error(405, "This timeline only reads saved results")
        supplied = request.query_params.get("viewer_token", "")
        if request.url.path == "/" and hmac.compare_digest(supplied.encode("utf-8"), token.encode("ascii")):
            # Token is removed from the displayed URL before any assets/media load.
            response = RedirectResponse(f"/?hash={evidence.digest}", status_code=303)
            response.set_cookie(cookie_name, token, httponly=True, samesite="strict",
                                max_age=lifetime_seconds, path="/")
        elif not hmac.compare_digest(request.cookies.get(cookie_name, "").encode("utf-8"), token.encode("ascii")):
            return error(403, "Open the private URL returned by stemlab_open_timeline")
        elif request.headers.get("sec-fetch-site") == "cross-site":
            return error(403, "Cross-site access is not allowed")
        else:
            if request.url.path.startswith(("/api/", f"/{evidence.digest}/")):
                try:
                    evidence.source()
                except (ValueError, KeyError, OSError):
                    return error(409, "Saved source changed; reopen the timeline to revalidate it")
            response = await call_next(request)
        response.headers.update(headers)
        return response

    for error_type in (ValueError, KeyError, OSError, zipfile.BadZipFile):
        async def handler(_request: Request, exc: Exception):
            # No filesystem details or local credentials in browser error responses.
            return JSONResponse({"detail": "Artifact unavailable, changed, invalid or too large"},
                                status_code=404 if isinstance(exc, FileNotFoundError) else 409)
        app.add_exception_handler(error_type, handler)

    def check_hash(value: str) -> None:
        if value != evidence.digest:
            raise HTTPException(404, "This session exposes only its selected analysis")

    @app.get("/", response_class=HTMLResponse)
    async def index():
        html = (WEB_ROOT / "index.html").read_text(encoding="utf-8")
        # The normal bundle already has polling fallback. No CDN or extra renderer.
        html = re.sub(r'<script\b[^>]*\bsrc=["\']https?://[^"\']+["\'][^>]*>\s*</script>',
                      "", html, flags=re.IGNORECASE)
        return html

    @app.get("/assets/{name}")
    async def asset(name: str):
        if name not in ASSETS:
            raise HTTPException(404, "Asset not found")
        path = inside(WEB_ROOT, name)
        return FileResponse(path)

    @app.get("/api/{song_hash}/timeline")
    async def timeline_state(song_hash: str):
        check_hash(song_hash)
        return await asyncio.to_thread(evidence.state)

    @app.get("/api/{song_hash}/canonical")
    async def canonical(song_hash: str):
        check_hash(song_hash)
        return evidence.json("canonical.json", optional=True)

    @app.get("/api/{song_hash}/source")
    async def source_audio(song_hash: str):
        check_hash(song_hash)
        return FileResponse(evidence.source())

    @app.get("/api/{song_hash}/waveform")
    async def waveform(song_hash: str, path: str = "__source__", points: int = 12000):
        check_hash(song_hash)
        return await asyncio.to_thread(evidence.waveform, path, points)

    @app.get("/api/{song_hash}/spectrogram")
    async def spectrogram(song_hash: str, path: str, max_width: int = 8192, max_height: int = 768):
        check_hash(song_hash)
        png = await asyncio.to_thread(evidence.spectrogram, path, max_width, max_height)
        return Response(png, media_type="image/png")

    @app.get("/api/{song_hash}/loops/{loop_id}/audio")
    async def loop_audio(song_hash: str, loop_id: str):
        check_hash(song_hash)
        data, filename = await asyncio.to_thread(evidence.loop_audio, loop_id)
        return Response(data, media_type="audio/wav", headers={
            "Content-Disposition": f'inline; filename="{filename}"'})

    @app.get("/{song_hash}/{path:path}")
    async def artifact(song_hash: str, path: str):
        check_hash(song_hash)
        target = evidence.file(path)
        if target.suffix.lower() == ".json":
            return evidence.json(path)
        if target.suffix.lower() in AUDIO_SUFFIXES | {".png", ".jpg", ".jpeg"}:
            return FileResponse(target)
        # Never serve user-generated HTML, JS, SVG or XML as executable page content.
        return FileResponse(target, media_type="application/octet-stream", filename=target.name)

    return app


class TimelineSession:
    """Bounded viewer lifetime, owned by the MCP process and never publicly bound."""

    def __init__(self, evidence: TimelineEvidence, lifetime_seconds: int):
        import uvicorn

        if type(lifetime_seconds) is not int or not 60 <= lifetime_seconds <= 3600:
            raise ValueError("Timeline lifetime must be 60..3600 seconds")
        for name in ("app.js", "timeline.css", "style.css", "index.html"):
            path = WEB_ROOT / name
            if not path.is_file() or path.stat().st_size == 0:
                raise ValueError("The bundled React frontend is missing; rebuild StemLab web assets first")
        self.evidence = evidence
        self.deadline = time.monotonic() + lifetime_seconds
        self.token = secrets.token_urlsafe(32)
        self.socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.socket.bind(("127.0.0.1", 0))
        self.socket.listen(16)
        self.origin = f"http://127.0.0.1:{self.socket.getsockname()[1]}"
        try:
            app = create_timeline_app(evidence, origin=self.origin, token=self.token,
                                      cookie_name="stemlab_view_" + secrets.token_hex(8),
                                      expired=self.expired, lifetime_seconds=lifetime_seconds)
            self.app = app
            config = uvicorn.Config(app, host="127.0.0.1", port=0, access_log=False,
                                    log_level="error", log_config=None, lifespan="off", ws="none",
                                    timeout_graceful_shutdown=2)
            self.server = uvicorn.Server(config)
            self.thread = threading.Thread(target=self.server.run, kwargs={"sockets": [self.socket]},
                                           daemon=True, name="stemlab-timeline")
            self.timer = threading.Timer(lifetime_seconds, self._expire)
            self.timer.daemon = True
            self.thread.start()
            until = time.monotonic() + 10
            while not self.server.started and self.thread.is_alive() and time.monotonic() < until:
                time.sleep(0.01)
            if not self.server.started:
                self.close()
                raise RuntimeError("Local viewer could not start; use reports and state the browser limitation")
            self.timer.start()
        except BaseException:
            self.socket.close()
            raise

    def expired(self) -> bool:
        return time.monotonic() >= self.deadline

    def _expire(self) -> None:
        self.server.should_exit = True

    def describe(self) -> dict[str, Any]:
        return {"url": self.origin + "/?" + urlencode({"hash": self.evidence.digest,
                                                        "viewer_token": self.token}),
                "result_dir": str(self.evidence.root()), "source_sha256": self.evidence.digest,
                "expires_in_seconds": max(0, int(self.deadline - time.monotonic())),
                "renderer": "StemLab's bundled react-timeline-sequence", "read_only": True,
                "browser_opened": False, "autoplay": False,
                "inspection_steps": ["Open this private local URL using an available browser tool.",
                                     "Use the shared waveform, spectrogram, beat and section timeline.",
                                     "Select a detected loop, Enable loop, Zoom to loop, then Play to audition.",
                                     "Read JSON for precise sample bounds and unresolved reasons.",
                                     "Capture the rendered browser for screenshots; never substitute illustrations."],
                "limitations": ["URL is reachable only on the machine running the MCP runtime.",
                                "No browser control is supplied by MCP; use the host's browser tool or open the URL manually.",
                                "It exposes saved evidence, not missing or newly computed model output.",
                                "Local URL grants temporary access to this analysis. Do not publish or forward it."]}

    def close(self) -> None:
        self.timer.cancel()
        self.server.should_exit = True
        self.thread.join(timeout=4)
        self.socket.close()
