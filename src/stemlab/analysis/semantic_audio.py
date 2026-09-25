from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from stemlab.util import device_string, write_json

AUDIO_PROMPT_SETS: dict[str, list[str]] = {
    "mood": [
        "euphoric and uplifting",
        "melancholic and reflective",
        "dark and ominous",
        "playful and humorous",
        "dreamy and ethereal",
        "aggressive and intense",
        "relaxed and spacious",
        "hopeful and triumphant",
        "tense and anxious",
        "warm and nostalgic",
    ],
    "style": [
        "UK garage",
        "hip-hop and rap",
        "electronic pop",
        "house music",
        "techno",
        "drum and bass",
        "dubstep and UK bass",
        "rock music",
        "folk and acoustic music",
        "ambient music",
        "cinematic soundtrack music",
        "classical music",
    ],
    "production": [
        "dense layered production",
        "sparse minimal production",
        "bright high-frequency production",
        "dark low-frequency-heavy production",
        "wide spacious stereo production",
        "dry intimate production",
        "acoustic organic instrumentation",
        "synthetic electronic instrumentation",
        "strong dance groove",
        "loose human groove",
    ],
}


def analyze_audio_semantics(
    audio_path: Path,
    output_dir: Path,
    *,
    device: str = "auto",
    model_name: str = "OpenMuQ/MuQ-MuLan-large",
    prompt_sets: dict[str, list[str]] | None = None,
) -> dict[str, Any]:
    """Run zero-shot music/text similarity with MuQ-MuLan.

    MuQ-MuLan's released model weights are CC-BY-NC 4.0. This route is therefore
    optional and the licence is embedded into every result so downstream users
    do not accidentally treat the checkpoint as unrestricted/commercial.
    """
    import librosa
    import torch
    from muq import MuQMuLan

    output_dir.mkdir(parents=True, exist_ok=True)
    resolved_device = device_string(device)
    if resolved_device.startswith("mps"):
        resolved_device = "cpu"

    wav, _ = librosa.load(str(audio_path), sr=24000, mono=True)
    wavs = torch.tensor(wav, dtype=torch.float32).unsqueeze(0).to(resolved_device)
    model = MuQMuLan.from_pretrained(model_name).to(resolved_device).eval()

    sets = prompt_sets or AUDIO_PROMPT_SETS
    flat: list[tuple[str, str]] = []
    for category, prompts in sets.items():
        flat.extend((category, prompt) for prompt in prompts)
    texts = [prompt for _, prompt in flat]

    with torch.no_grad():
        audio_embeds = model(wavs=wavs)
        text_embeds = model(texts=texts)
        similarities = model.calc_similarity(audio_embeds, text_embeds)
    scores = similarities.detach().float().cpu().numpy().reshape(-1)

    grouped: dict[str, list[dict[str, Any]]] = {category: [] for category in sets}
    for (category, prompt), score in zip(flat, scores.tolist()):
        grouped[category].append({"prompt": prompt, "similarity": float(score)})
    for category in grouped:
        grouped[category].sort(key=lambda item: item["similarity"], reverse=True)

    result = {
        "model": model_name,
        "input_sample_rate_hz": 24000,
        "device": resolved_device,
        "score_semantics": "MuQ-MuLan audio/text similarity; relative ranking, not calibrated probability",
        "licence": {
            "code": "MIT",
            "released_model_weights": "CC-BY-NC 4.0",
            "commercial_use_warning": True,
            "upstream": "https://github.com/tencent-ailab/MuQ",
        },
        "prompt_sets": grouped,
        "embedding_file": "muq_mulan_embeddings.npz",
    }
    np.savez_compressed(
        output_dir / "muq_mulan_embeddings.npz",
        audio=audio_embeds.detach().float().cpu().numpy(),
        text=text_embeds.detach().float().cpu().numpy(),
        labels=np.asarray(texts, dtype=str),
        similarities=scores.astype(np.float32),
    )
    write_json(output_dir / "semantic_audio.json", result)
    return result
