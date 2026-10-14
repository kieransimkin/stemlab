"""Exercise the MP3 decoder used by All-In-One before downloading analysis models.

Without --audio, create a short, explicitly synthetic MP3 in a temporary folder.
This is a decoder/environment check, not evidence of model inference or playback.
"""
from __future__ import annotations

import argparse
import importlib.metadata
import json
import math
from pathlib import Path
import subprocess
import tempfile


def check_audio_decode(
    audio: Path,
    *,
    expected_sample_rate: int | None = None,
    expected_channels: int | None = None,
    expected_duration: float | None = None,
) -> dict:
    """Require finite, non-silent, channel-first PCM through torchaudio.load."""
    import numpy as np

    if not audio.is_file():
        raise FileNotFoundError(audio)
    try:
        import torchaudio
        samples, sample_rate = torchaudio.load(str(audio))
    except (ImportError, RuntimeError, OSError) as exc:
        raise RuntimeError(
            "torchaudio MP3 decoder preflight failed. Install a TorchCodec version "
            "compatible with the selected PyTorch wheel and FFmpeg shared libraries. "
            "The source will not be silently transcoded or decoded by a fallback."
        ) from exc
    pcm = np.asarray(samples)
    if pcm.ndim != 2 or min(pcm.shape) < 1:
        raise ValueError('Decoder must return non-empty channel-first PCM')
    if not np.isfinite(pcm).all():
        raise ValueError('Decoder returned non-finite PCM')
    if (isinstance(sample_rate, bool) or not isinstance(sample_rate, (int, np.integer))
            or sample_rate <= 0):
        raise ValueError('Decoder returned an invalid sample rate')
    peak = float(np.max(np.abs(pcm)))
    if peak <= 1e-5:
        raise ValueError('Decoder returned silent audio for the non-silent probe/source')
    duration = pcm.shape[1] / sample_rate
    if expected_sample_rate is not None and sample_rate != expected_sample_rate:
        raise ValueError(f'Decoder sample rate mismatch: {sample_rate} != {expected_sample_rate}')
    if expected_channels is not None and pcm.shape[0] != expected_channels:
        raise ValueError(f'Decoder channel count mismatch: {pcm.shape[0]} != {expected_channels}')
    if (expected_duration is not None
            and (not math.isfinite(expected_duration) or expected_duration <= 0
                 or abs(duration - expected_duration) > 0.05)):
        raise ValueError(f'Decoder duration mismatch: {duration} != {expected_duration}')
    versions = {}
    for name in ('torch', 'torchaudio', 'torchcodec'):
        try:
            versions[name] = importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            versions[name] = 'not installed'
    return {'status': 'passed', 'decoder': 'torchaudio.load', 'sample_rate': int(sample_rate),
            'channels': int(pcm.shape[0]), 'frames': int(pcm.shape[1]),
            'duration_seconds': float(duration), 'peak': peak, 'dependencies': versions}


def make_probe(path: Path) -> None:
    subprocess.run(
        ['ffmpeg', '-hide_banner', '-loglevel', 'error', '-nostdin', '-y',
         '-f', 'lavfi', '-i', 'sine=frequency=440:sample_rate=44100:duration=0.5',
         '-ac', '2', '-c:a', 'libmp3lame', '-b:a', '128k', str(path)],
        check=True, timeout=30,
    )


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--audio', type=Path, help='Optional existing audio instead of a synthetic MP3')
    args = parser.parse_args()
    if args.audio is not None:
        report = check_audio_decode(args.audio)
        report['probe'] = 'supplied audio'
    else:
        with tempfile.TemporaryDirectory(prefix='stemlab-decoder-') as directory:
            probe = Path(directory) / 'synthetic.mp3'
            make_probe(probe)
            report = check_audio_decode(probe, expected_sample_rate=44100,
                                        expected_channels=2, expected_duration=0.5)
            report['probe'] = 'synthetic MP3; no model-inference claim'
    print(json.dumps(report, indent=2, allow_nan=False))
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
