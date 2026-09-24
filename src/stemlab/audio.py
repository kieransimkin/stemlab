from __future__ import annotations

from pathlib import Path


def audio_info(path: Path) -> dict:
    import torchaudio

    info = torchaudio.info(str(path))
    return {
        "sample_rate": int(info.sample_rate),
        "num_frames": int(info.num_frames),
        "num_channels": int(info.num_channels),
        "duration_seconds": float(info.num_frames / info.sample_rate) if info.sample_rate else 0.0,
        "encoding": str(info.encoding),
        "bits_per_sample": int(info.bits_per_sample),
    }


def load_audio(path: Path, target_sr: int | None = None, mono: bool = False):
    import torch
    import torchaudio

    wav, sr = torchaudio.load(str(path))
    wav = wav.float()
    if target_sr is not None and sr != target_sr:
        wav = torchaudio.functional.resample(wav, sr, target_sr)
        sr = target_sr
    if mono and wav.shape[0] > 1:
        wav = wav.mean(dim=0, keepdim=True)
    if wav.shape[0] == 1 and not mono:
        wav = wav.repeat(2, 1)
    return wav.contiguous(), int(sr)


def save_audio(path: Path, wav, sample_rate: int) -> None:
    import torchaudio

    path.parent.mkdir(parents=True, exist_ok=True)
    torchaudio.save(str(path), wav.detach().cpu().float(), sample_rate=sample_rate, encoding="PCM_F", bits_per_sample=32)
