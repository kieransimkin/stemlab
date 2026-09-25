from __future__ import annotations

from dataclasses import asdict, dataclass, field
from pathlib import Path
from typing import Any


@dataclass
class StemArtifact:
    model: str
    stem: str
    path: Path
    sample_rate: int | None = None
    channels: int | None = None

    def to_dict(self, root: Path | None = None) -> dict[str, Any]:
        d = asdict(self)
        p = self.path
        if root:
            try:
                p = p.relative_to(root)
            except ValueError:
                pass
        d["path"] = str(p)
        return d


@dataclass
class SeparationResult:
    model: str
    stems: list[StemArtifact] = field(default_factory=list)
    elapsed_seconds: float | None = None
    error: str | None = None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class BeatResult:
    model: str
    beats: list[float]
    downbeats: list[float]
    tempo_bpm: float | None
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass
class PipelineConfig:
    input_wav: Path
    output_dir: Path
    models: tuple[str, ...]
    device: str = "auto"
    whisper_model: str = "large-v3"
    continue_on_error: bool = True
    bootstrap_external: bool = True
    make_spectrograms: bool = True
    run_whisper: bool = True
    run_beats: bool = True
    run_vamp: bool = True
    beat_transformer_ensemble: bool = True
