from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from .manifest import write_manifest
from .spectrogram import render_spectrogram_png
from .util import write_json


def repair_failed_spectrograms(results: Path, *, max_plot_frames: int = 8192) -> dict:
    """Repair failed spectrogram previews from retained NPZ evidence."""
    analysis_path = results / "analysis.json"
    if not analysis_path.is_file():
        raise ValueError(f"Missing analysis.json: {analysis_path}")
    analysis = json.loads(analysis_path.read_text(encoding="utf-8"))
    errors = list(analysis.get("errors") or [])
    repaired = []
    retained_errors = []
    existing = {(item.get("model"), item.get("stem")) for item in analysis.get("spectrograms") or []}

    stem_paths = {}
    for model in analysis.get("models") or []:
        for stem in model.get("stems") or []:
            stem_paths[(stem.get("model"), stem.get("stem"))] = results / stem["path"]

    for error in errors:
        parts = str(error.get("stage", "")).split(":")
        if len(parts) != 3 or parts[0] != "spectrogram":
            retained_errors.append(error)
            continue
        model, stem = parts[1], parts[2]
        if (model, stem) in existing:
            continue
        data_path = results / "spectrograms" / model / f"{stem}.npz"
        audio_path = stem_paths.get((model, stem))
        if audio_path is None or not audio_path.is_file() or not data_path.is_file():
            retained_errors.append(error)
            continue
        with np.load(data_path) as data:
            db = data["magnitude_db"].astype(np.float32)
            times = data["times_seconds"].astype(np.float64)
            sample_rate = int(data["sample_rate"])
            n_fft = int(data["n_fft"])
            hop_length = int(data["hop_length"])
        png_path = data_path.with_suffix(".png")
        plot_frames = render_spectrogram_png(
            db, times, sample_rate, png_path, title=audio_path.name,
            max_plot_frames=max_plot_frames,
        )
        record = {
            "audio": str(audio_path.resolve()),
            "png": str(png_path.resolve()),
            "data": str(data_path.resolve()),
            "sample_rate": sample_rate,
            "n_fft": n_fft,
            "hop_length": hop_length,
            "frames": int(db.shape[1]),
            "plot_frames": plot_frames,
            "bins": int(db.shape[0]),
            "model": model,
            "stem": stem,
        }
        analysis.setdefault("spectrograms", []).append(record)
        existing.add((model, stem))
        repaired.append(record)

    analysis["errors"] = retained_errors
    write_json(analysis_path, analysis)

    manifest_path = results / "manifest.json"
    extra = {}
    if manifest_path.is_file():
        old_manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        extra = {key: value for key, value in old_manifest.items()
                 if key not in {"generated_at", "platform", "python", "files"}}
    extra["error_count"] = len(retained_errors)
    write_manifest(results, extra=extra)
    return {
        "status": "repaired" if repaired else "unchanged",
        "repaired_count": len(repaired),
        "remaining_error_count": len(retained_errors),
        "repaired": repaired,
    }
