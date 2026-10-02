"""Explicit model capabilities, dependency boundaries and selection policy."""
from __future__ import annotations

import math
import re
from dataclasses import asdict, dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class MidiModel:
    slug: str
    title: str
    family: str
    target: str
    package: str
    module: str
    extra: str
    upstream: str
    licence: str
    notes: str

    def to_dict(self) -> dict:
        return asdict(self)


MIDI_MODELS = {m.slug: m for m in (
    MidiModel("basic_pitch", "Spotify Basic Pitch", "polyphonic", "pitched_stems",
              "basic-pitch", "basic_pitch", "amt", "https://github.com/spotify/basic-pitch",
              "Apache-2.0", "Bundled ICASSP 2022 weights. Best on one pitched instrument; "
              "not a drum transcriber. Existing --basic-pitch remains unchanged."),
    MidiModel("piano_transcription", "High-resolution piano + pedals", "piano", "piano",
              "piano-transcription-inference", "piano_transcription_inference", "midi-piano",
              "https://github.com/qiuqiangkong/piano_transcription_inference", "MIT inference wrapper",
              "Qiuqiang Kong / ByteDance note-and-pedal model. Solo piano or a piano stem. "
              "Legacy PyTorch runtime; use a separate backend Python when necessary."),
    MidiModel("transkun", "Transkun V2", "piano", "piano", "transkun", "transkun", "midi-transkun",
              "https://github.com/Yujia-Yan/Transkun", "MIT",
              "Packaged V2 No Pedal Extension model. Preserve its note/pedal convention; "
              "do not interpret sustain-pedal events as longer physical key presses."),
    MidiModel("mr_mt3", "MR-MT3 via mt3-infer", "multitrack", "master", "mt3-infer",
              "mt3_infer", "midi-mt3", "https://github.com/gudgud96/MR-MT3", "MIT model code",
              "Multi-instrument MIDI, including drums. Optional mt3-infer wrapper; "
              "review that dependency's third-party licence notices before redistribution."),
    MidiModel("yourmt3", "YourMT3 via mt3-infer", "multitrack", "master", "mt3-infer",
              "mt3_infer", "midi-mt3", "https://huggingface.co/spaces/mimbres/YourMT3",
              "Apache-2.0 Space code (see model-specific notices)",
              "YPTF.MoE+Multi noPS checkpoint. MIDI instrument parts, not separated audio stems. "
              "The separate GitHub YourMT3 repository declares GPL-3.0; do not conflate licences."),
)}


@dataclass(frozen=True)
class MidiConfig:
    models: tuple[str, ...] = ("basic_pitch",)
    target: str = "auto"
    stem_names: tuple[str, ...] = ()
    max_stems: int = 6
    device: str = "auto"
    allow_downloads: bool = False
    checkpoints: dict[str, str] = field(default_factory=dict)
    backend_pythons: dict[str, str] = field(default_factory=dict)
    transkun_config: str | None = None
    timeout_seconds: float = 1800
    make_plots: bool = True
    continue_on_error: bool = True

    def __post_init__(self):
        if (not isinstance(self.models, (tuple, list)) or not self.models or len(self.models) > len(MIDI_MODELS)
                or any(not isinstance(m, str) or m not in MIDI_MODELS for m in self.models)
                or len(set(self.models)) != len(self.models)):
            raise ValueError("Choose unique MIDI model names from: " + ", ".join(MIDI_MODELS))
        if not isinstance(self.target, str) or self.target not in {"auto", "master", "stems"}:
            raise ValueError("MIDI target must be auto, master or stems")
        if type(self.max_stems) is not int or not 1 <= self.max_stems <= 64:
            raise ValueError("max_stems must be 1..64")
        if not isinstance(self.device, str) or not re.fullmatch(r"auto|cpu|mps|cuda(?::\d+)?", self.device):
            raise ValueError("Invalid MIDI device")
        if (isinstance(self.timeout_seconds, bool) or not isinstance(self.timeout_seconds, (int, float))
                or not math.isfinite(self.timeout_seconds)
                or not 1 <= self.timeout_seconds <= 86400):
            raise ValueError("timeout_seconds must be finite and between 1 and 86400")
        for value in (self.allow_downloads, self.make_plots, self.continue_on_error):
            if type(value) is not bool:
                raise ValueError("MIDI flags must be boolean")
        if (not isinstance(self.stem_names, (tuple, list))
                or any(not isinstance(s, str) or not s.strip() for s in self.stem_names)):
            raise ValueError("Stem filters must be nonempty names")
        if self.stem_names and self.target == "master":
            raise ValueError("Stem filters cannot be combined with target=master")
        for overrides in (self.checkpoints, self.backend_pythons):
            if not isinstance(overrides, dict) or set(overrides) - set(self.models):
                raise ValueError("Overrides must name a selected MIDI model")
            if any(not isinstance(p, str) or not p for p in overrides.values()):
                raise ValueError("Override paths must be nonempty strings")
        if self.transkun_config is not None and (
                not isinstance(self.transkun_config, str) or not self.transkun_config):
            raise ValueError("Transkun config must be a nonempty file path")
        if self.transkun_config and "transkun" not in self.models:
            raise ValueError("A Transkun config requires the transkun model")
        if bool(self.transkun_config) != bool(self.checkpoints.get("transkun")):
            raise ValueError("Custom Transkun weights require the matching --transkun-config")

    def validate_paths(self) -> None:
        """Do this before creating output directories or starting workers."""
        for value in (*self.checkpoints.values(), *self.backend_pythons.values(),
                      *([self.transkun_config] if self.transkun_config else [])):
            if not Path(value).expanduser().is_file():
                raise ValueError(f"MIDI override file does not exist: {value}")


def parse_overrides(values: list[str] | None) -> dict[str, str]:
    result: dict[str, str] = {}
    for value in values or []:
        key, sep, path = value.partition("=")
        if not sep or key not in MIDI_MODELS or not path.strip() or key in result:
            raise ValueError("Expected unique MODEL=PATH entries (paths may contain '=')")
        result[key] = str(Path(path).expanduser().resolve())
    return result
