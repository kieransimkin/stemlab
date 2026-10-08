from __future__ import annotations

from pathlib import Path

from stemlab.types import BeatResult, StemArtifact
from stemlab.util import device_string, sha256_file
from stemlab.bootstrap import BEAT_THIS_CHECKPOINT_URL, ensure_beat_this_checkpoint
from .base import BeatBackend
from .common import save_result, tempo_from_beats


class BeatThisBackend(BeatBackend):
    def __init__(self, bootstrap_external: bool = True):
        self.bootstrap_external = bootstrap_external

    def analyze(self, audio_path: Path, output_dir: Path, stems: list[StemArtifact] | None = None) -> BeatResult:
        from beat_this.inference import File2Beats

        dev = device_string("auto")
        if dev == "mps":
            dev = "cpu"
        checkpoint = ensure_beat_this_checkpoint(self.bootstrap_external)
        engine = File2Beats(checkpoint_path=str(checkpoint), device=dev, dbn=False)
        beats, downbeats = engine(audio_path)
        b = [float(x) for x in beats]
        d = [float(x) for x in downbeats]
        return save_result(
            BeatResult(
                "beat_this",
                b,
                d,
                tempo_from_beats(b),
                {
                    "checkpoint": str(checkpoint),
                    "checkpoint_sha256": sha256_file(checkpoint),
                    "checkpoint_source": BEAT_THIS_CHECKPOINT_URL,
                    "dbn": False,
                },
            ),
            output_dir,
        )
