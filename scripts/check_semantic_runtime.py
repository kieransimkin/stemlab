"""Exercise lazy audio resources BEFORE text-model imports; never fetch weights.

The general environment verifier imports torchvision first, which can mask a
broken lazy resampy import until much later. Run this probe as a fresh process.
Only the short resampling input is synthetic; no model inference is claimed.
"""
from __future__ import annotations

import importlib
import importlib.metadata
import json

import numpy as np


def check_semantic_runtime() -> dict:
    """Require real Kaiser resources, resampling and concrete text-model classes.

    Basic Pitch 0.4.0 requires resampy<0.4.3. That older resampy imports
    pkg_resources, which setuptools>=82 no longer supplies. Do not preload
    torchvision, patch sys.modules, or substitute a different resampler here.
    """
    stage = "librosa/resampy filter resources"
    try:
        librosa = importlib.import_module("librosa")
        source = (0.1 * np.sin(2 * np.pi * 440 * np.arange(800) / 8000)).astype(np.float32)
        probes = []
        for name in ("kaiser_best", "kaiser_fast"):
            stage = f"resampy {name} resampling"
            # Unlike importing librosa alone, this loads resampy's packaged
            # filter data and executes its Numba resampling implementation.
            samples = np.asarray(librosa.resample(
                source, orig_sr=8000, target_sr=16000, res_type=name,
            ))
            if samples.shape != (1600,) or not np.isfinite(samples).all():
                raise ValueError("Resampler returned an invalid shape or non-finite samples")
            rms = float(np.sqrt(np.mean(samples.astype(np.float64) ** 2)))
            if not 0.05 < rms < 0.09:
                raise ValueError(f"Resampler did not preserve the probe's signal level: {rms}")
            probes.append({"filter": name, "input_frames": 800,
                           "output_frames": 1600, "output_rms": rms})

        stage = "transformers.PreTrainedModel import after audio processing"
        transformers = importlib.import_module("transformers")
        model_class = transformers.PreTrainedModel  # Resolve the actual lazy attribute.
        if not isinstance(model_class, type):
            raise TypeError("PreTrainedModel must resolve to a class")
        stage = "sentence_transformers.SentenceTransformer import after audio processing"
        sentence_transformers = importlib.import_module("sentence_transformers")
        sentence_class = sentence_transformers.SentenceTransformer
        if not isinstance(sentence_class, type) or not callable(getattr(sentence_class, "encode", None)):
            raise TypeError("SentenceTransformer must expose its encode API")
    except Exception as exc:
        # Preserve the full chained traceback: a generic PreTrainedModel error
        # can wrap a missing pkg_resources deep inside audio/inspection imports.
        raise RuntimeError(
            f"Audio/text runtime preflight failed at {stage}. Rebuild using the "
            "Docker runtime lock (resampy 0.4.2 with setuptools 81.0.0 while "
            "Basic Pitch requires resampy<0.4.3). Inspect the chained error; "
            "no model weights were loaded and no analysis fallback was used."
        ) from exc

    dependencies = {
        name: importlib.metadata.version(name)
        for name in ("setuptools", "resampy", "librosa", "torch", "torchvision",
                     "transformers", "sentence-transformers")
    }
    return {"format": "stemlab.semantic-runtime-check", "status": "passed",
            "scope": "synthetic resampling and real class imports; no model inference",
            "input_sample_rate": 8000, "output_sample_rate": 16000,
            "resampling": probes, "dependencies": dependencies}


def main() -> int:
    print(json.dumps(check_semantic_runtime(), indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
