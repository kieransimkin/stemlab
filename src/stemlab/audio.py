from __future__ import annotations

import math
from pathlib import Path
from typing import Any


def audio_info(path: Path) -> dict[str, Any]:
    """Return stable audio metadata without relying on removed torchaudio.info().

    TorchAudio removed ``torchaudio.info`` in 2.9 as its I/O stack moved to
    TorchCodec.  StemLab already depends on python-soundfile, so use libsndfile
    for metadata instead.  This keeps the public result stable across
    TorchAudio releases and avoids decoding the complete file merely to learn
    its duration.
    """
    import soundfile as sf

    info = sf.info(str(path))
    sample_rate = int(info.samplerate)
    num_frames = int(info.frames)
    return {
        "sample_rate": sample_rate,
        "num_frames": num_frames,
        "num_channels": int(info.channels),
        "duration_seconds": float(num_frames / sample_rate) if sample_rate else 0.0,
        # Preserve the old StemLab keys.  libsndfile exposes format/subtype
        # rather than TorchAudio's historical AudioMetaData encoding enum.
        "encoding": str(info.subtype or info.format or "UNKNOWN"),
        "bits_per_sample": _bits_per_sample(info.subtype),
        "format": str(info.format or ""),
        "subtype": str(info.subtype or ""),
    }


def _bits_per_sample(subtype: str | None) -> int:
    """Best-effort bit depth for libsndfile subtype names."""
    if not subtype:
        return 0
    subtype = subtype.upper()
    known = {
        "PCM_S8": 8,
        "PCM_U8": 8,
        "PCM_16": 16,
        "PCM_24": 24,
        "PCM_32": 32,
        "FLOAT": 32,
        "DOUBLE": 64,
        "ULAW": 8,
        "ALAW": 8,
    }
    return known.get(subtype, 0)


def load_audio(path: Path, target_sr: int | None = None, mono: bool = False):
    """Load audio as a channels-first float32 PyTorch tensor.

    File decoding uses soundfile instead of torchaudio.load.  This is
    intentional: in TorchAudio >=2.9 ``load`` delegates to TorchCodec, which is
    an additional optional binary dependency.  We still use TorchAudio for the
    DSP operation (resampling) so the rest of the pipeline remains PyTorch/
    TorchAudio native.
    """
    import soundfile as sf
    import torch
    import torchaudio

    data, sr = sf.read(str(path), dtype="float32", always_2d=True)
    # soundfile returns [frames, channels]; StemLab uses [channels, frames].
    wav = torch.from_numpy(data.T.copy())

    sr = int(sr)
    if target_sr is not None and sr != target_sr:
        wav = torchaudio.functional.resample(wav, sr, int(target_sr))
        sr = int(target_sr)
    if mono and wav.shape[0] > 1:
        wav = wav.mean(dim=0, keepdim=True)
    if wav.shape[0] == 1 and not mono:
        wav = wav.repeat(2, 1)
    return wav.contiguous(), sr


def save_audio(path: Path, wav, sample_rate: int) -> None:
    """Save a channels-first tensor as audio using libsndfile.

    WAV output is written as 32-bit floating point, matching StemLab's previous
    ``torchaudio.save(..., encoding='PCM_F', bits_per_sample=32)`` behaviour.
    For other extensions, libsndfile chooses its normal default subtype.
    """
    import soundfile as sf

    path.parent.mkdir(parents=True, exist_ok=True)
    audio = wav.detach().cpu().float().numpy().T
    subtype = "FLOAT" if path.suffix.lower() in {".wav", ".wave"} else None
    sf.write(str(path), audio, int(sample_rate), subtype=subtype)


def normalize_audio_file(path: Path, *, target_peak_dbfs: float = -1.0) -> dict[str, Any]:
    """Peak-normalize an already-written stem in place.

    Stem separators use different output gain conventions.  That makes direct
    visual comparison in Sonic Visualiser awkward because a perfectly useful
    low-level stem can render almost black.  StemLab therefore normalizes every
    generated stem immediately after it appears on disk, before spectrogram or
    transcription analysis is run.

    The operation is deliberately simple and deterministic: the largest
    absolute sample is moved to ``target_peak_dbfs`` (default -1 dBFS).  Silent
    files are left untouched.  WAV files are rewritten as float32 so the
    normalization step cannot introduce integer clipping or an extra quantize
    cycle.
    """
    import numpy as np
    import soundfile as sf

    path = Path(path)
    info = sf.info(str(path))
    audio, sample_rate = sf.read(str(path), dtype="float32", always_2d=True)
    if audio.size == 0:
        return {
            "normalized": False,
            "reason": "empty",
            "target_peak_dbfs": float(target_peak_dbfs),
            "gain_db": 0.0,
            "peak_before": 0.0,
            "peak_after": 0.0,
        }

    peak_before = float(np.max(np.abs(audio)))
    if not math.isfinite(peak_before):
        raise ValueError(f"Non-finite sample peak in {path}")
    if peak_before == 0.0:
        return {
            "normalized": False,
            "reason": "silent",
            "target_peak_dbfs": float(target_peak_dbfs),
            "gain_db": 0.0,
            "peak_before": 0.0,
            "peak_after": 0.0,
        }

    target_peak = float(10.0 ** (float(target_peak_dbfs) / 20.0))
    gain = target_peak / peak_before
    audio *= np.float32(gain)

    # Preserve the original container where possible.  Float WAV is preferred
    # for generated analysis material because it avoids another PCM quantize
    # cycle after gain adjustment.
    subtype = "FLOAT" if path.suffix.lower() in {".wav", ".wave"} else info.subtype
    sf.write(str(path), audio, int(sample_rate), subtype=subtype)

    peak_after = float(np.max(np.abs(audio)))
    return {
        "normalized": True,
        "target_peak_dbfs": float(target_peak_dbfs),
        "gain_db": float(20.0 * math.log10(gain)),
        "peak_before": peak_before,
        "peak_after": peak_after,
        "peak_before_dbfs": float(20.0 * math.log10(peak_before)),
        "peak_after_dbfs": float(20.0 * math.log10(peak_after)),
    }
