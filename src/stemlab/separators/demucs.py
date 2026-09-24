from __future__ import annotations

import time
from pathlib import Path

from stemlab.audio import load_audio, save_audio
from stemlab.types import SeparationResult, StemArtifact
from stemlab.util import device_string
from .base import SeparatorBackend


class DemucsBackend(SeparatorBackend):
    MODEL_NAMES = {"htdemucs_ft": "htdemucs_ft", "htdemucs_6s": "htdemucs_6s"}

    def separate(self, input_wav: Path, output_dir: Path, model_slug: str, device: str) -> SeparationResult:
        start = time.perf_counter()
        try:
            import torch
            from demucs.apply import apply_model
            from demucs.audio import convert_audio
            from demucs.pretrained import get_model

            name = self.MODEL_NAMES[model_slug]
            dev = device_string(device)
            # Demucs currently has no MPS support robust enough for all models; CPU fallback is safer.
            if dev == "mps":
                dev = "cpu"
            model = get_model(name=name)
            model.to(dev)
            model.eval()
            wav, sr = load_audio(input_wav)
            wav = convert_audio(wav, sr, model.samplerate, model.audio_channels)
            ref = wav.mean(0)
            wav = (wav - ref.mean()) / (ref.std() + 1e-8)
            with torch.no_grad():
                sources = apply_model(model, wav[None].to(dev), device=dev, progress=True)[0]
            sources = sources * (ref.std() + 1e-8) + ref.mean()
            output_dir.mkdir(parents=True, exist_ok=True)
            artifacts: list[StemArtifact] = []
            for name, source in zip(model.sources, sources):
                p = output_dir / f"{name}.wav"
                save_audio(p, source, model.samplerate)
                artifacts.append(StemArtifact(model_slug, name, p, model.samplerate, int(source.shape[0])))
            return SeparationResult(model_slug, artifacts, time.perf_counter() - start)
        except Exception as exc:
            return SeparationResult(model_slug, elapsed_seconds=time.perf_counter() - start, error=f"{type(exc).__name__}: {exc}")
