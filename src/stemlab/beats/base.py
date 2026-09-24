from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path

from stemlab.types import BeatResult, StemArtifact


class BeatBackend(ABC):
    @abstractmethod
    def analyze(self, audio_path: Path, output_dir: Path, stems: list[StemArtifact] | None = None) -> BeatResult:
        raise NotImplementedError
