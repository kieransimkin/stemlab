from __future__ import annotations

import asyncio
import io
import re
from pathlib import Path
from typing import Any, Callable
from urllib.parse import quote

try:
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import FileResponse, JSONResponse, Response
except ImportError as exc:  # pragma: no cover - server extra controls this path
    raise RuntimeError(
        "StemLab's web UI requires the server dependencies. "
        'Install them with `pip install -e ".[server]"` or `pip install -e ".[all]"`.'
    ) from exc


_HASH_RE = re.compile(r"^[0-9a-f]{64}$")
_WEB_ROOT = Path(__file__).with_name("web")


def _normalise_hash(value: str) -> str:
    value = str(value).strip().lower()
    if not _HASH_RE.fullmatch(value):
        raise ValueError("song hash must be a 64-character SHA-256 hex digest")
    return value


def index_response() -> FileResponse:
    index = _WEB_ROOT / "index.html"
    if not index.is_file():
        raise HTTPException(status_code=500, detail="StemLab web assets are missing")
    return FileResponse(index, media_type="text/html")


def _source_audio_path(results_dir: Path, song_hash: str) -> Path:
    song_hash = _normalise_hash(song_hash)
    source_dir = (results_dir / song_hash / ".source").resolve()
    candidates = sorted(source_dir.glob("upload.*")) if source_dir.is_dir() else []
    if not candidates:
        raise FileNotFoundError(f"uploaded source for {song_hash} is not available")
    return candidates[0]


def _public_result_path(results_dir: Path, song_hash: str, rel_path: str) -> tuple[Path, Path]:
    song_hash = _normalise_hash(song_hash)
    root = (results_dir / song_hash).resolve()
    if not root.is_dir():
        raise FileNotFoundError(song_hash)

    rel = Path(rel_path)
    if rel.is_absolute() or any(part in {"", ".", ".."} or part.startswith(".") for part in rel.parts):
        raise ValueError("invalid public result path")

    target = (root / rel).resolve()
    try:
        target.relative_to(root)
    except ValueError as exc:
        raise ValueError("invalid public result path") from exc
    return root, target


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


def _waveform_envelope(audio_path: Path, points: int = 12000) -> dict[str, Any]:
    """Return a compact min/max waveform envelope on the source song timeline."""
    import numpy as np
    import soundfile as sf

    points = max(128, min(20000, int(points)))
    data, sample_rate = sf.read(str(audio_path), dtype="float32", always_2d=True)
    if data.size == 0:
        return {
            "sample_rate": int(sample_rate),
            "duration_seconds": 0.0,
            "frames": 0,
            "points": 0,
            "min": [],
            "max": [],
        }

    mono = data.mean(axis=1, dtype=np.float32)
    frames = int(mono.shape[0])
    bucket = max(1, int(np.ceil(frames / points)))
    buckets = int(np.ceil(frames / bucket))
    padded = buckets * bucket
    if padded != frames:
        mono = np.pad(mono, (0, padded - frames), mode="constant", constant_values=np.nan)
    shaped = mono.reshape(buckets, bucket)
    mins = np.nanmin(shaped, axis=1)
    maxs = np.nanmax(shaped, axis=1)
    mins = np.nan_to_num(mins, nan=0.0)
    maxs = np.nan_to_num(maxs, nan=0.0)
    return {
        "sample_rate": int(sample_rate),
        "duration_seconds": float(frames / sample_rate) if sample_rate else 0.0,
        "frames": frames,
        "points": buckets,
        "min": mins.astype(float).tolist(),
        "max": maxs.astype(float).tolist(),
    }


def _spectrogram_strip_png(
    data_path: Path,
    *,
    max_width: int = 8192,
    max_height: int = 768,
) -> bytes:
    """Render a margin-free spectrogram strip suitable for exact time alignment."""
    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.image as mpimg
    import numpy as np

    max_width = max(256, min(16384, int(max_width)))
    max_height = max(64, min(2048, int(max_height)))

    with np.load(data_path, allow_pickle=False) as payload:
        matrix = np.asarray(payload["magnitude_db"], dtype=np.float32)

    if matrix.ndim != 2 or not matrix.size:
        raise ValueError("spectrogram dataset is empty or has an unexpected shape")

    freq_stride = max(1, int(np.ceil(matrix.shape[0] / max_height)))
    time_stride = max(1, int(np.ceil(matrix.shape[1] / max_width)))
    matrix = matrix[::freq_stride, ::time_stride]

    buffer = io.BytesIO()
    mpimg.imsave(
        buffer,
        matrix,
        format="png",
        origin="lower",
        cmap="magma",
        vmin=-100.0,
        vmax=0.0,
    )
    return buffer.getvalue()


def install_routes(
    app: FastAPI,
    *,
    results_dir_provider: Callable[[], Path],
    scheduler_provider: Callable[[], Any],
) -> None:
    """Register UI/API routes before StemLab's generic result-tree catch-alls."""

    @app.get("/assets/{name}")
    async def web_asset(name: str):
        if "/" in name or "\\" in name or name.startswith("."):
            raise HTTPException(status_code=404, detail="asset not found")
        target = (_WEB_ROOT / name).resolve()
        try:
            target.relative_to(_WEB_ROOT.resolve())
        except ValueError as exc:
            raise HTTPException(status_code=404, detail="asset not found") from exc
        if not target.is_file():
            raise HTTPException(status_code=404, detail="asset not found")
        return FileResponse(target)

    @app.get("/api")
    async def service_api_index() -> dict[str, Any]:
        return {
            "service": "stemlab",
            "upload": "PUT /upload/{filename}",
            "socket_io_path": "/socket.io",
            "subscribe_event": "subscribe",
            "results": "GET /{sha256}",
            "status": "GET /jobs/{sha256}",
            "timeline": "GET /api/{sha256}/timeline",
            "source_audio": "GET /api/{sha256}/source",
            "waveform": "GET /api/{sha256}/waveform?path=...",
            "spectrogram": "GET /api/{sha256}/spectrogram?path=...",
            "results_root": str(results_dir_provider()),
        }

    @app.get("/api/{song_hash}/timeline")
    async def timeline_state(song_hash: str) -> dict[str, Any]:
        try:
            song_hash = _normalise_hash(song_hash)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

        results_dir = results_dir_provider()
        root = (results_dir / song_hash).resolve()
        if not root.is_dir():
            raise HTTPException(status_code=404, detail="result hash not found")

        files = [
            {
                "path": path,
                "bytes": size,
                "mtime_ns": mtime_ns,
                "url": f"/{song_hash}/{quote(path)}",
            }
            for path, (size, mtime_ns) in sorted(_visible_files(root).items())
        ]

        duration_seconds = None
        try:
            import soundfile as sf

            info = sf.info(str(_source_audio_path(results_dir, song_hash)))
            duration_seconds = float(info.frames / info.samplerate) if info.samplerate else None
        except Exception:
            pass

        return {
            "hash": song_hash,
            "status": scheduler_provider().status(song_hash),
            "duration_seconds": duration_seconds,
            "source_url": f"/api/{song_hash}/source",
            "files": files,
        }

    @app.get("/api/{song_hash}/source")
    async def source_audio(song_hash: str):
        try:
            source = _source_audio_path(results_dir_provider(), song_hash)
        except (ValueError, FileNotFoundError) as exc:
            raise HTTPException(status_code=404, detail="source audio not found") from exc
        return FileResponse(source)

    @app.get("/api/{song_hash}/waveform")
    async def timeline_waveform(
        song_hash: str,
        path: str = "__source__",
        points: int = 12000,
    ) -> JSONResponse:
        try:
            song_hash = _normalise_hash(song_hash)
            results_dir = results_dir_provider()
            if path == "__source__":
                audio_path = _source_audio_path(results_dir, song_hash)
            else:
                _root, audio_path = _public_result_path(results_dir, song_hash, path)
                if not audio_path.is_file():
                    raise FileNotFoundError(audio_path)
            envelope = await asyncio.to_thread(_waveform_envelope, audio_path, points)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        except (FileNotFoundError, OSError, RuntimeError) as exc:
            raise HTTPException(status_code=404, detail="audio waveform source not found") from exc
        return JSONResponse(envelope)

    @app.get("/api/{song_hash}/spectrogram")
    async def timeline_spectrogram(
        song_hash: str,
        path: str,
        max_width: int = 8192,
        max_height: int = 768,
    ) -> Response:
        try:
            song_hash = _normalise_hash(song_hash)
            results_dir = results_dir_provider()
            root, data_path = _public_result_path(results_dir, song_hash, path)
            rel = data_path.relative_to(root)
            if not rel.parts or rel.parts[0] != "spectrograms" or data_path.suffix.lower() != ".npz":
                raise ValueError("path is not a StemLab spectrogram dataset")
            if not data_path.is_file():
                raise FileNotFoundError(data_path)
            png = await asyncio.to_thread(
                _spectrogram_strip_png,
                data_path,
                max_width=max_width,
                max_height=max_height,
            )
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        except (FileNotFoundError, OSError) as exc:
            raise HTTPException(status_code=404, detail="spectrogram dataset not found") from exc
        except Exception as exc:
            # The scheduler may observe a just-created NPZ before its ZIP
            # central directory is fully flushed. The browser retries 409s.
            raise HTTPException(status_code=409, detail=f"spectrogram not ready: {exc}") from exc
        return Response(content=png, media_type="image/png")
