from __future__ import annotations

from dataclasses import asdict, dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class EvidenceModel:
    slug: str
    title: str
    category: str
    target: str
    module: str
    extra: str
    upstream: str
    licence: str
    commercial_safe: bool
    description: str
    requires_text: bool = False
    default_model_id: str | None = None
    notes: str = ""

    def to_dict(self) -> dict:
        return asdict(self)


EVIDENCE_MODELS: dict[str, EvidenceModel] = {
    "firered_aed": EvidenceModel(
        "firered_aed", "FireRedVAD AED", "vocal_activity", "vocals_or_master",
        "fireredvad", "evidence-vocals", "https://github.com/FireRedTeam/FireRedVAD",
        "Apache-2.0", True,
        "Speech/singing/music interval detection used as independent boundary-safety evidence.",
        default_model_id="FireRedTeam/FireRedVAD",
        notes="Requires the AED checkpoint directory; speech-only VAD metrics are not treated as music-cut accuracy.",
    ),
    "heart_transcriptor": EvidenceModel(
        "heart_transcriptor", "HeartTranscriptor OSS", "lyrics", "vocals",
        "heartlib", "evidence-lyrics", "https://github.com/HeartMuLa/heartlib",
        "Apache-2.0", True,
        "Singing-focused lyric transcription, intended for separated vocal tracks.",
        default_model_id="HeartMuLa/HeartTranscriptor-oss",
        notes="Recognition output never overwrites artist-approved lyrics.",
    ),
    "qwen_forced_aligner": EvidenceModel(
        "qwen_forced_aligner", "Qwen3 ForcedAligner 0.6B", "lyric_alignment", "vocals",
        "qwen_asr", "evidence-align", "https://github.com/QwenLM/Qwen3-ASR",
        "Apache-2.0", True,
        "Aligns supplied canonical text to audio and returns word/character timestamps.",
        requires_text=True, default_model_id="Qwen/Qwen3-ForcedAligner-0.6B",
        notes="Upstream documents speech alignment; singing must be evaluated rather than assumed equivalent.",
    ),
    "swift_f0": EvidenceModel(
        "swift_f0", "SwiftF0", "pitch", "vocals_or_pitched_stem",
        "swift_f0", "evidence-pitch", "https://github.com/lars76/swift-f0",
        "MIT", True,
        "Continuous monophonic F0, voicing confidence and loudness at 16 ms frame spacing.",
        notes="Pitch confidence is not itself proof of singing or vocal activity.",
    ),
    "songformer": EvidenceModel(
        "songformer", "SongFormer", "structure", "master",
        "SongFormer", "evidence-structure", "https://github.com/ASLP-lab/SongFormer",
        "CC-BY-4.0 code; checkpoint/dependency chain requires review", False,
        "Independent functional song-section boundaries and labels for disagreement analysis.",
        notes="Opt-in research backend. SongFormer depends on pretrained representation models whose weight terms must be recorded.",
    ),
    "lv_chordia": EvidenceModel(
        "lv_chordia", "lv-chordia", "harmony", "master",
        "lv_chordia", "evidence-chords", "https://github.com/openmirlab/lv-chordia",
        "MIT", True,
        "Independent large-vocabulary neural chord recognition for harmonic loop inspection.",
    ),
    "adtof_drums": EvidenceModel(
        "adtof_drums", "ADTOF PyTorch", "drums", "drums_or_master",
        "adtof_pytorch", "evidence-drums", "https://github.com/xavriley/ADTOF-pytorch",
        "ADTOF source/model lineage CC BY-NC-SA 4.0", False,
        "Kick/snare/tom/hi-hat/cymbal event transcription used as supporting rhythmic evidence.",
        notes="Non-commercial research route; drum hits do not replace the detected beat grid.",
    ),
    "game_vocal_notes": EvidenceModel(
        "game_vocal_notes", "GAME", "vocal_notes", "vocals",
        "game", "external", "https://github.com/openvpi/GAME",
        "MIT code; verify selected checkpoint terms", False,
        "Singing-note extraction/alignment bridge for separately provisioned GAME inference.",
        requires_text=True,
        notes="External-command bridge; use only with authorised vocals and reviewed checkpoint terms.",
    ),
    "sheetsage2": EvidenceModel(
        "sheetsage2", "SheetSage2", "lead_sheet", "master",
        "transformers", "external-nc", "https://huggingface.co/m-a-p/SheetSage2",
        "CC-BY-NC-4.0", False,
        "Editable lead-sheet evidence: melody, chords, beats, key and structure.",
        notes="Non-commercial checkpoint; external-command bridge keeps trust_remote_code outside StemLab core.",
    ),
    "moss_music": EvidenceModel(
        "moss_music", "MOSS-Music 8B Instruct", "music_language", "master",
        "transformers", "external-large", "https://github.com/OpenMOSS/MOSS-Music",
        "Apache-2.0", True,
        "Audio-grounded music captioning and question answering as explanatory evidence.",
        notes="Large model; answers are descriptive evidence and may not invent precise timing claims.",
    ),
    "audiosep": EvidenceModel(
        "audiosep", "AudioSep", "prompted_separation", "master",
        "audiosep", "external", "https://github.com/Audio-AGI/AudioSep",
        "MIT code; checkpoint/dependency terms must be reviewed", False,
        "Natural-language prompted source extraction for targeted inspection.",
        notes="Derived audio is supporting evidence only and never replaces the master for seam validation.",
    ),
}


@dataclass
class EvidenceConfig:
    models: tuple[str, ...] = ()
    target: str = "auto"
    device: str = "auto"
    allow_downloads: bool = False
    timeout_seconds: float = 1800.0
    continue_on_error: bool = True
    backend_pythons: dict[str, str] = field(default_factory=dict)
    model_paths: dict[str, str] = field(default_factory=dict)
    canonical_text: str | None = None
    language: str = "English"
    chord_dictionary: str = "submission"
    prompt: str | None = None

    def __post_init__(self) -> None:
        unknown = [model for model in self.models if model not in EVIDENCE_MODELS]
        if unknown:
            raise ValueError("Unknown evidence model(s): " + ", ".join(unknown))
        if self.target not in {"auto", "master", "vocals", "stems"}:
            raise ValueError("Evidence target must be auto, master, vocals or stems")
        if not self.timeout_seconds > 0:
            raise ValueError("Evidence timeout must be positive")
        if self.chord_dictionary not in {"submission", "ismir2017", "full"}:
            raise ValueError("Chord dictionary must be submission, ismir2017 or full")

    def validate_paths(self) -> None:
        for mapping_name, mapping in (("backend Python", self.backend_pythons), ("model path", self.model_paths)):
            for slug, raw in mapping.items():
                if slug not in EVIDENCE_MODELS:
                    raise ValueError(f"Unknown {mapping_name} model: {slug}")
                path = Path(raw).expanduser().resolve()
                if mapping_name == "backend Python" and not path.is_file():
                    raise ValueError(f"Backend Python does not exist: {path}")
                if mapping_name == "model path" and not path.exists():
                    raise ValueError(f"Model path does not exist: {path}")
