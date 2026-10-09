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
    whisper_condition_on_previous_text: bool = False
    continue_on_error: bool = True
    bootstrap_external: bool = True
    make_spectrograms: bool = True
    run_whisper: bool = True
    run_beats: bool = True
    run_vamp: bool = True
    beat_transformer_ensemble: bool = True

    # High-level analysis added in v0.2. These are separated from the existing
    # low-level detectors so heavyweight/non-commercial model routes remain
    # explicit and auditable.
    run_deep_analysis: bool = True
    # Candidate audio-attack -> DanceRudiments matching is opt-in.
    run_rudiments: bool = False
    rudiments_top_per_stem: int = 20
    rudiments_max_patterns: int = 0
    run_structure: bool = True
    all_in_one_embeddings: bool = False
    run_text_semantics: bool = True
    text_semantic_model: str = "sentence-transformers/all-MiniLM-L6-v2"
    run_audio_semantics: bool = False
    audio_semantic_model: str = "OpenMuQ/MuQ-MuLan-large"
    run_basic_pitch: bool = False
    # Optional transcription; not implied by a separation profile or `all`.
    midi_models: tuple[str, ...] = ()
    midi_target: str = "auto"
    midi_allow_downloads: bool = False
    midi_max_stems: int = 6
    midi_timeout_seconds: float = 1800
    # Optional complementary evidence models; never enabled by a normal profile.
    evidence_models: tuple[str, ...] = ()
    evidence_allow_downloads: bool = False
    evidence_timeout_seconds: float = 1800
    evidence_model_paths: dict[str, str] = field(default_factory=dict)
    evidence_backend_pythons: dict[str, str] = field(default_factory=dict)
    evidence_canonical_text: str | None = None
    evidence_language: str = "English"
    evidence_chord_dictionary: str = "submission"
    evidence_prompt: str | None = None
    run_loops: bool = True
    export_loops: bool = False
    loop_max_seconds: float | None = None

    # Optional timestamp-only post-processing; cues never influence beat detection.
    cue_file: Path | None = None
    cue_tolerance_ms: float = 150.0
    cue_beat_model: str = "auto"
    cue_downbeats_only: bool = False
    cue_force_snap: bool = False
    cue_precision: str = "exact"
