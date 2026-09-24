from __future__ import annotations

from pathlib import Path

from stemlab.types import BeatResult, StemArtifact
from stemlab.util import device_string
from .base import BeatBackend
from .common import save_result, tempo_from_beats


class BeatThisBackend(BeatBackend):
    def analyze(self, audio_path: Path, output_dir: Path, stems: list[StemArtifact] | None = None) -> BeatResult:
        from beat_this.inference import File2Beats

        dev = device_string("auto")
        if dev == "mps":
            dev = "cpu"
        engine = File2Beats(checkpoint_path="final0", device=dev, dbn=False)
        beats, downbeats = engine(audio_path)
        b = [float(x) for x in beats]
        d = [float(x) for x in downbeats]
        return save_result(
            BeatResult("beat_this", b, d, tempo_from_beats(b), {"checkpoint": "final0", "dbn": False}),
            output_dir,
        )
