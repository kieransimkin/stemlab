from __future__ import annotations

import time
from pathlib import Path

from stemlab.audio import load_audio, save_audio
from stemlab.types import SeparationResult, StemArtifact
from stemlab.util import device_string
from .base import SeparatorBackend


class OpenUnmixBackend(SeparatorBackend):
    def separate(self, input_wav: Path, output_dir: Path, model_slug: str, device: str) -> SeparationResult:
        start = time.perf_counter()
        try:
            from openunmix.predict import separate

            dev = device_string(device)
            if dev == "mps":
                dev = "cpu"
            wav, sr = load_audio(input_wav)
            estimates = separate(
                audio=wav,
                rate=sr,
                model_str_or_path="umxhq",
                targets=["vocals", "drums", "bass", "other"],
                niter=0,  # fastest mode: appropriate for the realtime-candidate comparison
                device=dev,
                filterbank="torch",
            )
            output_dir.mkdir(parents=True, exist_ok=True)
            artifacts: list[StemArtifact] = []
            # Open-Unmix values normally have shape [1, channels, samples].
            for target, estimate in estimates.items():
                audio = estimate.squeeze(0).detach().cpu()
                p = output_dir / f"{target}.wav"
                save_audio(p, audio, 44100)
                artifacts.append(StemArtifact(model_slug, target, p, 44100, int(audio.shape[0])))
            return SeparationResult(
                model_slug,
                artifacts,
                time.perf_counter() - start,
                metadata={"niter": 0, "realtime_candidate": True},
            )
        except Exception as exc:
            return SeparationResult(model_slug, elapsed_seconds=time.perf_counter() - start, error=f"{type(exc).__name__}: {exc}")
