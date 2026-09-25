from __future__ import annotations

import math
from pathlib import Path
from typing import Any

import numpy as np

from stemlab.util import write_json


def _db(value: float, floor: float = -120.0) -> float:
    if not math.isfinite(value) or value <= 0.0:
        return floor
    return float(max(floor, 20.0 * math.log10(value)))


def _safe_stat(values: np.ndarray, fn, default: float | None = None) -> float | None:
    values = np.asarray(values, dtype=float)
    values = values[np.isfinite(values)]
    if not len(values):
        return default
    return float(fn(values))


def _true_peak_4x(audio: np.ndarray) -> float:
    """Return a conservative 4x oversampled peak estimate.

    This is deliberately labelled an estimate rather than a standards-certified
    true-peak meter. It is still materially better than sample peak for spotting
    potential inter-sample overs.
    """
    from scipy.signal import resample_poly

    if audio.ndim == 1:
        audio = audio[:, None]
    peak = 0.0
    for channel in range(audio.shape[1]):
        up = resample_poly(audio[:, channel], 4, 1, window=("kaiser", 8.6))
        if up.size:
            peak = max(peak, float(np.max(np.abs(up))))
    return peak


def _frame_times(n_frames: int, hop_length: int, sample_rate: int) -> np.ndarray:
    return np.arange(n_frames, dtype=float) * float(hop_length) / float(sample_rate)


def analyze_sonic_features(
    audio_path: Path,
    output_dir: Path,
    *,
    frame_length: int = 4096,
    hop_length: int = 1024,
) -> dict[str, Any]:
    """Measure loudness, dynamics, timbre, noisiness and stereo behaviour.

    The output is intentionally split into global summary values and time-varying
    curves so the web timeline can later render both a compact card and aligned
    feature lanes.
    """
    import librosa
    import pyloudnorm as pyln
    import soundfile as sf

    output_dir.mkdir(parents=True, exist_ok=True)
    audio, sr = sf.read(str(audio_path), dtype="float32", always_2d=True)
    if audio.size == 0:
        raise ValueError(f"Empty audio file: {audio_path}")

    duration = float(audio.shape[0] / sr)
    channels = int(audio.shape[1])
    mono = np.mean(audio, axis=1, dtype=np.float64).astype(np.float32)

    sample_peak = float(np.max(np.abs(audio)))
    true_peak = _true_peak_4x(audio)
    rms_global = float(np.sqrt(np.mean(np.square(audio, dtype=np.float64))))
    crest_db = _db(sample_peak / rms_global) if rms_global > 0 else None

    meter = pyln.Meter(sr)
    try:
        integrated_lufs = float(meter.integrated_loudness(audio if channels > 1 else mono))
        if not math.isfinite(integrated_lufs):
            integrated_lufs = None
    except Exception:
        integrated_lufs = None

    rms = librosa.feature.rms(y=mono, frame_length=frame_length, hop_length=hop_length)[0]
    rms_db = librosa.amplitude_to_db(np.maximum(rms, 1e-10), ref=1.0)
    centroid = librosa.feature.spectral_centroid(
        y=mono, sr=sr, n_fft=frame_length, hop_length=hop_length
    )[0]
    bandwidth = librosa.feature.spectral_bandwidth(
        y=mono, sr=sr, n_fft=frame_length, hop_length=hop_length
    )[0]
    rolloff85 = librosa.feature.spectral_rolloff(
        y=mono, sr=sr, roll_percent=0.85, n_fft=frame_length, hop_length=hop_length
    )[0]
    rolloff95 = librosa.feature.spectral_rolloff(
        y=mono, sr=sr, roll_percent=0.95, n_fft=frame_length, hop_length=hop_length
    )[0]
    flatness = librosa.feature.spectral_flatness(
        y=mono, n_fft=frame_length, hop_length=hop_length
    )[0]
    zcr = librosa.feature.zero_crossing_rate(
        mono, frame_length=frame_length, hop_length=hop_length
    )[0]
    contrast = librosa.feature.spectral_contrast(
        y=mono, sr=sr, n_fft=frame_length, hop_length=hop_length
    )
    times = _frame_times(len(rms), hop_length, sr)

    # A robust short-term range gives a more musically intuitive dynamics value
    # than max-minus-min, which is dominated by fades and silence.
    finite_rms_db = rms_db[np.isfinite(rms_db)]
    if len(finite_rms_db):
        p10, p50, p90, p95 = np.percentile(finite_rms_db, [10, 50, 90, 95])
        short_term_range = float(p95 - p10)
    else:
        p10 = p50 = p90 = p95 = float("nan")
        short_term_range = None

    stereo: dict[str, Any] | None = None
    if channels >= 2:
        left = audio[:, 0].astype(np.float64)
        right = audio[:, 1].astype(np.float64)
        denom = float(np.sqrt(np.sum(left * left) * np.sum(right * right)))
        correlation = float(np.sum(left * right) / denom) if denom > 0 else None
        mid = 0.5 * (left + right)
        side = 0.5 * (left - right)
        mid_rms = float(np.sqrt(np.mean(mid * mid)))
        side_rms = float(np.sqrt(np.mean(side * side)))
        width_db = _db(side_rms / mid_rms) if mid_rms > 0 else None
        stereo = {
            "left_right_correlation": correlation,
            "mid_rms_dbfs": _db(mid_rms),
            "side_rms_dbfs": _db(side_rms),
            "side_to_mid_db": width_db,
        }

    summary = {
        "source": str(audio_path),
        "sample_rate": int(sr),
        "channels": channels,
        "duration_seconds": duration,
        "loudness": {
            "integrated_lufs_bs1770": integrated_lufs,
            "sample_peak_dbfs": _db(sample_peak),
            "true_peak_estimate_dbfs_4x": _db(true_peak),
            "rms_dbfs": _db(rms_global),
            "crest_factor_db": crest_db,
            "short_term_rms_range_db_p95_p10": short_term_range,
            "short_term_rms_dbfs_p10": float(p10) if math.isfinite(p10) else None,
            "short_term_rms_dbfs_median": float(p50) if math.isfinite(p50) else None,
            "short_term_rms_dbfs_p90": float(p90) if math.isfinite(p90) else None,
            "method_notes": {
                "integrated_loudness": "pyloudnorm implementation of ITU-R BS.1770",
                "true_peak": "4x polyphase oversampled estimate; not a certified compliance meter",
            },
        },
        "timbre": {
            "spectral_centroid_hz_mean": _safe_stat(centroid, np.mean),
            "spectral_centroid_hz_median": _safe_stat(centroid, np.median),
            "spectral_bandwidth_hz_mean": _safe_stat(bandwidth, np.mean),
            "rolloff85_hz_mean": _safe_stat(rolloff85, np.mean),
            "rolloff95_hz_mean": _safe_stat(rolloff95, np.mean),
            "spectral_flatness_mean": _safe_stat(flatness, np.mean),
            "zero_crossing_rate_mean": _safe_stat(zcr, np.mean),
            "spectral_contrast_mean_by_band_db": [
                float(v) for v in np.nanmean(contrast, axis=1)
            ],
        },
        "stereo": stereo,
        "curve_file": "curves.npz",
    }

    np.savez_compressed(
        output_dir / "curves.npz",
        time_seconds=times.astype(np.float32),
        rms_dbfs=rms_db.astype(np.float32),
        spectral_centroid_hz=centroid.astype(np.float32),
        spectral_bandwidth_hz=bandwidth.astype(np.float32),
        rolloff85_hz=rolloff85.astype(np.float32),
        rolloff95_hz=rolloff95.astype(np.float32),
        spectral_flatness=flatness.astype(np.float32),
        zero_crossing_rate=zcr.astype(np.float32),
        spectral_contrast_db=contrast.astype(np.float32),
    )
    write_json(output_dir / "sonic.json", summary)
    return summary
