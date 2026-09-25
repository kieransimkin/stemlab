from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from stemlab.types import BeatResult
from stemlab.util import write_json


def analyze_structure(
    audio_path: Path,
    output_dir: Path,
    *,
    device: str = "auto",
    include_embeddings: bool = False,
) -> tuple[dict[str, Any], BeatResult]:
    """Run All-In-One-Infer functional structure + beat/downbeat analysis.

    StemLab intentionally lets this route perform its own internal separation.
    Existing StemLab stems are peak-normalised independently for visualisation;
    feeding those to a model trained on natural stem level relationships could
    alter its evidence distribution.
    """
    import allin1_infer

    output_dir.mkdir(parents=True, exist_ok=True)
    kwargs: dict[str, Any] = {
        "include_activations": True,
        "include_embeddings": bool(include_embeddings),
    }
    # Current all-in-one-infer accepts a device request through its modern
    # session layer. Keep a fallback for releases where analyze() did not expose
    # that keyword yet.
    if device and device != "auto":
        kwargs["device"] = device
    try:
        result = allin1_infer.analyze(str(audio_path), **kwargs)
    except TypeError:
        kwargs.pop("device", None)
        result = allin1_infer.analyze(str(audio_path), **kwargs)

    def values(value):
        if value is None:
            return []
        if hasattr(value, "tolist"):
            return value.tolist()
        return list(value)

    segments = [
        {"start": float(s.start), "end": float(s.end), "label": str(s.label)}
        for s in values(getattr(result, "segments", None))
    ]
    beats = [float(v) for v in values(getattr(result, "beats", None))]
    downbeats = [float(v) for v in values(getattr(result, "downbeats", None))]
    beat_positions = [int(v) for v in values(getattr(result, "beat_positions", None))]
    bpm = float(result.bpm) if getattr(result, "bpm", None) is not None else None

    activation_file = None
    activations = getattr(result, "activations", None)
    if activations is not None:
        activation_file = "activations.npz"
        arrays = {key: np.asarray(value) for key, value in activations.items()}
        np.savez_compressed(output_dir / activation_file, **arrays)

    embedding_file = None
    embeddings = getattr(result, "embeddings", None)
    if embeddings is not None:
        embedding_file = "embeddings.npy"
        np.save(output_dir / embedding_file, np.asarray(embeddings))

    structure = {
        "model": "all-in-one-infer / harmonix-all",
        "upstream": "https://github.com/openmirlab/all-in-one-infer",
        "bpm": bpm,
        "beats": beats,
        "downbeats": downbeats,
        "beat_positions": beat_positions,
        "segments": segments,
        "activation_fps": getattr(result, "activation_fps", None),
        "files": {
            "activations": activation_file,
            "embeddings": embedding_file,
        },
        "method_notes": {
            "separation": "All-In-One-Infer performs its own model-compatible separation rather than consuming StemLab's independently peak-normalised visualisation stems.",
            "functional_labels": "Model labels can include start/end/intro/outro/break/bridge/inst/solo/verse/chorus.",
        },
    }
    write_json(output_dir / "structure.json", structure)

    beat_result = BeatResult(
        model="all_in_one",
        beats=beats,
        downbeats=downbeats,
        tempo_bpm=bpm,
        metadata={
            "source": "all-in-one-infer",
            "segments": len(segments),
            "beat_positions": beat_positions,
        },
    )
    return structure, beat_result
