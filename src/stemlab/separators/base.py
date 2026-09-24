from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path

from stemlab.types import SeparationResult


class SeparatorBackend(ABC):
    @abstractmethod
    def separate(self, input_wav: Path, output_dir: Path, model_slug: str, device: str) -> SeparationResult:
        raise NotImplementedError
