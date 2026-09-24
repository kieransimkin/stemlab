from __future__ import annotations

from pathlib import Path

import numpy as np

from stemlab.types import BeatResult, StemArtifact
from .base import BeatBackend
from .common import save_result, tempo_from_beats


class BeatNetBackend(BeatBackend):
    def analyze(self, audio_path: Path, output_dir: Path, stems: list[StemArtifact] | None = None) -> BeatResult:
        from BeatNet.BeatNet import BeatNet

        estimator = BeatNet(1, mode="offline", inference_model="DBN", plot=[], thread=False)
        events = np.asarray(estimator.process(str(audio_path)))
        if events.ndim == 1:
            events = events.reshape(-1, 2)
        beats = [float(x) for x in events[:, 0]] if len(events) else []
        downbeats = [float(t) for t, idx in events[:, :2] if int(round(float(idx))) == 1] if len(events) else []
        return save_result(
            BeatResult("beatnet", beats, downbeats, tempo_from_beats(beats), {"mode": "offline", "decoder": "DBN"}),
            output_dir,
        )
