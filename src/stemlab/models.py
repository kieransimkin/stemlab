from __future__ import annotations

from dataclasses import asdict, dataclass
from typing import Literal

ModelTier = Literal["high", "fast", "extra"]


@dataclass(frozen=True)
class ModelSpec:
    slug: str
    display_name: str
    family: str
    tier: ModelTier
    backend: str
    stems: tuple[str, ...] | None
    description: str
    upstream: str
    notes: str = ""

    def to_dict(self) -> dict:
        d = asdict(self)
        d["stems"] = list(self.stems) if self.stems is not None else None
        return d


MODEL_REGISTRY: dict[str, ModelSpec] = {
    "bs_roformer_sw": ModelSpec(
        slug="bs_roformer_sw",
        display_name="BS-RoFormer-SW",
        family="Band-Split RoFormer",
        tier="high",
        backend="bs_roformer",
        stems=("vocals", "drums", "bass", "guitar", "piano", "other"),
        description="Recommended modern six-stem BS-RoFormer checkpoint.",
        upstream="https://github.com/openmirlab/bs-roformer-infer",
        notes="Registry id: roformer-model-bs-roformer-sw-by-jarredou",
    ),
    "mvsep_mega53": ModelSpec(
        slug="mvsep_mega53",
        display_name="MVSep Mega 53",
        family="Band-Split RoFormer",
        tier="high",
        backend="bs_roformer",
        stems=None,
        description="Very large broad-discovery separator exposing 53 raw stem targets.",
        upstream="https://github.com/openmirlab/bs-roformer-infer",
        notes="Requires substantial VRAM; upstream recommends >=16 GB.",
    ),
    "scnet_xl_ihf": ModelSpec(
        slug="scnet_xl_ihf",
        display_name="SCNet XL IHF",
        family="SCNet",
        tier="high",
        backend="scnet",
        stems=("vocals", "drums", "bass", "other"),
        description="Large four-stem SCNet checkpoint from Music-Source-Separation-Training.",
        upstream="https://github.com/ZFTurbo/Music-Source-Separation-Training",
        notes="Fixed v1.0.15 config/checkpoint URLs are used by bootstrap.",
    ),
    "htdemucs_ft": ModelSpec(
        slug="htdemucs_ft",
        display_name="HTDemucs fine-tuned",
        family="Hybrid Transformer Demucs",
        tier="high",
        backend="demucs",
        stems=("drums", "bass", "other", "vocals"),
        description="Fine-tuned four-stem Demucs model bag; strong established baseline.",
        upstream="https://github.com/adefossez/demucs",
        notes="This is a bag of fine-tuned HTDemucs models rather than a single tiny network.",
    ),
    "openunmix_umxhq": ModelSpec(
        slug="openunmix_umxhq",
        display_name="Open-Unmix UMxHQ",
        family="Open-Unmix",
        tier="fast",
        backend="openunmix",
        stems=("vocals", "drums", "bass", "other"),
        description="Compact PyTorch baseline selected as the low-latency/realtime candidate.",
        upstream="https://github.com/sigsep/open-unmix-pytorch",
        notes="Potential realtime candidate depends on hardware/buffering; benchmark locally.",
    ),
    "htdemucs_6s": ModelSpec(
        slug="htdemucs_6s",
        display_name="HTDemucs 6-stem",
        family="Hybrid Transformer Demucs",
        tier="extra",
        backend="demucs",
        stems=("drums", "bass", "other", "vocals", "guitar", "piano"),
        description="Optional six-source Demucs variant for extra guitar/piano comparison.",
        upstream="https://github.com/adefossez/demucs",
        notes="Not in the default top-four profile because its piano stem is documented as weaker.",
    ),
}

HIGH_PARAMETER_MODELS = ("bs_roformer_sw", "mvsep_mega53", "scnet_xl_ihf", "htdemucs_ft")
FAST_MODEL = "openunmix_umxhq"
FULL_PROFILE = HIGH_PARAMETER_MODELS + (FAST_MODEL,)
PRACTICAL_PROFILE = ("bs_roformer_sw", "scnet_xl_ihf", "htdemucs_ft", FAST_MODEL)

BS_ROFORMER_IDS = {
    "bs_roformer_sw": "roformer-model-bs-roformer-sw-by-jarredou",
    "mvsep_mega53": "roformer-model-bs-roformer-mvsep-mega-53-stems",
}


def profile(name: str) -> tuple[str, ...]:
    if name == "full":
        return FULL_PROFILE
    if name == "practical":
        return PRACTICAL_PROFILE
    if name == "fast":
        return (FAST_MODEL,)
    raise ValueError(f"Unknown profile: {name}")
