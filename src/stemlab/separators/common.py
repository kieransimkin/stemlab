from __future__ import annotations

from pathlib import Path

from stemlab.audio import audio_info
from stemlab.types import StemArtifact


def collect_wavs(root: Path, model_slug: str) -> list[StemArtifact]:
    out: list[StemArtifact] = []
    for p in sorted(root.rglob("*.wav")):
        stem = p.stem
        # Common separator naming: song_(Stem).wav, song_vocals.wav, vocals.wav
        if "_(" in stem and stem.endswith(")"):
            stem = stem.rsplit("_(", 1)[1][:-1]
        elif "_" in stem:
            suffix = stem.rsplit("_", 1)[1]
            if suffix.lower() in {
                "vocals", "drums", "bass", "guitar", "piano", "other", "instrumental",
                "speech", "noise", "strings", "woodwinds", "brass",
            }:
                stem = suffix
        stem = stem.lower().replace(" ", "_")
        try:
            info = audio_info(p)
            sr, ch = info["sample_rate"], info["num_channels"]
        except Exception:
            sr, ch = None, None
        out.append(StemArtifact(model=model_slug, stem=stem, path=p, sample_rate=sr, channels=ch))
    return out
