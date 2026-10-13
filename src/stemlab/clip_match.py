"""Find a contiguous recording excerpt on its source clock, without models.

Matching proves a measured waveform relationship, never public-use rights or
artist approval. AAC/MP3 encoding and fades are tolerated; ambiguous repetition,
edit jumps, silence, different performances and rate changes remain unresolved.
"""
from __future__ import annotations

import math
import shutil
import subprocess
from pathlib import Path

import numpy as np
from scipy.signal import correlate, resample_poly

from .util import sha256_file


def _samples(value: np.ndarray) -> np.ndarray:
    value = np.asarray(value, dtype=np.float64)
    if value.ndim == 1:
        value = value[:, None]
    if value.ndim != 2 or not value.size or not np.all(np.isfinite(value)):
        raise ValueError("Audio must contain finite frames with one or two channels")
    if value.shape[1] not in (1, 2):
        raise ValueError("Only mono and stereo inputs are supported")
    return value


def _correlation(source: np.ndarray, query: np.ndarray) -> np.ndarray:
    """Sliding, channel-preserving, zero-mean normalised correlation."""
    if source.shape[1] != query.shape[1]:
        if source.shape[1] == 1:
            source = np.repeat(source, query.shape[1], axis=1)
        else:
            query = np.repeat(query, source.shape[1], axis=1)
    n = len(query)
    query = query - query.mean(axis=0)
    energy = float(np.sum(query * query))
    if energy <= 1e-12:
        return np.zeros(len(source) - n + 1)
    numerator = np.zeros(len(source) - n + 1)
    variance = np.zeros_like(numerator)
    for channel in range(source.shape[1]):
        signal = source[:, channel]
        numerator += correlate(signal, query[:, channel], mode="valid", method="fft")
        total = np.concatenate(([0.0], np.cumsum(signal)))
        square = np.concatenate(([0.0], np.cumsum(signal * signal)))
        sums = total[n:] - total[:-n]
        variance += square[n:] - square[:-n] - sums * sums / n
    norm = np.sqrt(np.maximum(variance, 0) * energy)
    return np.clip(np.divide(numerator, norm, out=np.zeros_like(norm), where=norm > 1e-12), -1, 1)


def match_samples(source: np.ndarray, clip: np.ndarray, sample_rate: int, *,
                  min_correlation: float = 0.90, min_margin: float = 0.02,
                  tolerance_seconds: float = 0.002) -> dict:
    """Return conservative timing evidence for already decoded equal-rate PCM."""
    source, clip = _samples(source), _samples(clip)
    if not isinstance(sample_rate, int) or sample_rate < 1:
        raise ValueError("sample_rate must be a positive integer")
    if (not math.isfinite(min_correlation) or not 0 < min_correlation <= 1 or
            not math.isfinite(min_margin) or not 0 <= min_margin <= 1 or
            not math.isfinite(tolerance_seconds) or tolerance_seconds <= 0):
        raise ValueError("Invalid matching thresholds")
    report = {"status": "unresolved", "mapping": None, "candidates": [], "anchors": [],
              "analysis_sample_rate": sample_rate, "precision_seconds": 1 / sample_rate,
              "source_duration_seconds": len(source) / sample_rate,
              "clip_duration_seconds": len(clip) / sample_rate,
              "thresholds": {"min_correlation": min_correlation, "min_margin": min_margin,
                             "offset_tolerance_seconds": tolerance_seconds}}
    if len(clip) < 2 * sample_rate or len(clip) > len(source):
        return {**report, "reason": "Clip needs at least two seconds and must fit in the source"}
    edge = min(round(0.25 * sample_rate), len(clip) // 10)
    query = clip[edge:len(clip) - edge]
    if np.std(query) < 1e-7:
        return {**report, "reason": "Silent or constant clip has insufficient timing information"}
    scores = _correlation(source, query)
    remaining = scores.copy()
    exclusion = max(1, round(0.5 * sample_rate))
    for _ in range(min(5, len(scores))):
        index = int(np.argmax(remaining))
        if not np.isfinite(remaining[index]):
            break
        report["candidates"].append({"offset_samples": index - edge,
                                     "offset_seconds": (index - edge) / sample_rate,
                                     "correlation": float(scores[index])})
        remaining[max(0, index - exclusion):index + exclusion + 1] = -np.inf
    best = report["candidates"][0]
    offset = best["offset_samples"]
    second = report["candidates"][1]["correlation"] if len(report["candidates"]) > 1 else 0
    report["correlation_margin"] = best["correlation"] - second
    if best["correlation"] < min_correlation:
        return {**report, "reason": "No strong contiguous waveform match"}
    if offset < 0 or offset + len(clip) > len(source):
        return {**report, "reason": "Matched interval extends outside the source; inspect clip range"}
    anchor_frames = min(sample_rate, len(query) // 3)
    starts = np.linspace(edge, len(clip) - edge - anchor_frames, 5).round().astype(int)
    search_radius = max(1, round(0.05 * sample_rate))
    for start in starts:
        expected = offset + int(start)
        left = max(0, expected - search_radius)
        right = min(len(source), expected + anchor_frames + search_radius)
        section = clip[start:start + anchor_frames]
        if np.std(section) < 1e-7:
            report["anchors"].append({"clip_time": start / sample_rate, "correlation": 0.0,
                                       "informative": False, "offset_error_seconds": None})
            continue
        anchor_scores = _correlation(source[left:right], section)
        index = int(np.argmax(anchor_scores))
        actual_offset = left + index - int(start)
        report["anchors"].append({"clip_time": start / sample_rate, "informative": True,
                                   "correlation": float(anchor_scores[index]),
                                   "offset_seconds": actual_offset / sample_rate,
                                   "offset_error_seconds": (actual_offset - offset) / sample_rate})
    reliable = [a for a in report["anchors"] if a["informative"]]
    if len(reliable) < 3 or any(a["correlation"] < min_correlation or
                               abs(a["offset_error_seconds"]) > tolerance_seconds for a in reliable):
        return {**report, "reason": "Independent windows disagree; possible edit, speed change or mismatch"}
    if report["correlation_margin"] < min_margin:
        return {**report, "reason": "Repeated audio gives ambiguous source positions"}
    return {**report, "status": "matched", "reason": "Unique contiguous match with consistent independent windows",
            "mapping": {"offset": offset / sample_rate, "duration": len(clip) / sample_rate,
                        "playerStart": 0.0}}


def decode_audio(path: Path, sample_rate: int = 8000, *, max_seconds: float = 1800) -> np.ndarray:
    """Decode a local audio/video file; retain stereo phase and bound memory/time."""
    import soundfile as sf

    path = Path(path)
    if not path.is_file():
        raise ValueError("Expected an existing local audio or video file")
    if not isinstance(sample_rate, int) or not 2000 <= sample_rate <= 24000:
        raise ValueError("Analysis rate must be an integer from 2000 to 24000 Hz")
    if not math.isfinite(max_seconds) or not 2 <= max_seconds <= 7200:
        raise ValueError("Decode limit must be between two seconds and two hours")
    try:
        info = sf.info(str(path))
    except (sf.LibsndfileError, RuntimeError):
        info = None
    if info is not None:
        if info.duration > max_seconds or info.channels not in (1, 2):
            raise ValueError("Audio exceeds the decode limit or is not mono/stereo")
        data, native_rate = sf.read(str(path), dtype="float32", always_2d=True)
        if native_rate != sample_rate:
            divisor = math.gcd(native_rate, sample_rate)
            data = resample_poly(data, sample_rate // divisor, native_rate // divisor, axis=0)
        return _samples(data)
    ffmpeg = shutil.which("ffmpeg")
    if ffmpeg is None:
        raise ValueError("FFmpeg is required to decode this local video/audio format")
    result = subprocess.run([ffmpeg, "-nostdin", "-v", "error", "-i", str(path),
                             "-map", "0:a:0", "-vn", "-t", str(max_seconds + 0.1),
                             "-ac", "2", "-ar", str(sample_rate), "-f", "f32le", "pipe:1"],
                            capture_output=True, timeout=120, check=True)
    data = np.frombuffer(result.stdout, dtype="<f4")
    if data.size % 2 or data.size > max_seconds * sample_rate * 2:
        raise ValueError("Decoded audio is incomplete or exceeds the decode limit")
    return _samples(data.reshape(-1, 2))


def match_clip(source_path: Path, clip_path: Path, *, sample_rate: int = 8000,
               clip_start: float = 0.0, clip_end: float | None = None,
               min_correlation: float = 0.90, min_margin: float = 0.02) -> dict:
    """Analyse immutable local files and return hash-bound source/player timing."""
    source_path, clip_path = Path(source_path), Path(clip_path)
    source_hash, clip_hash = sha256_file(source_path), sha256_file(clip_path)
    source = decode_audio(source_path, sample_rate)
    clip = decode_audio(clip_path, sample_rate)
    if not math.isfinite(clip_start) or clip_start < 0:
        raise ValueError("clip_start must be a finite non-negative time")
    if clip_end is not None and (not math.isfinite(clip_end) or clip_end <= clip_start):
        raise ValueError("clip_end must be finite and later than clip_start")
    first = round(clip_start * sample_rate)
    last = len(clip) if clip_end is None else round(clip_end * sample_rate)
    if first >= len(clip) or last > len(clip):
        raise ValueError("Selected clip interval must fit in the decoded audio")
    report = match_samples(source, clip[first:last], sample_rate,
                           min_correlation=min_correlation, min_margin=min_margin)
    if report["mapping"] is not None:
        report["mapping"]["playerStart"] = first / sample_rate
    from . import __version__
    if source_hash != sha256_file(source_path) or clip_hash != sha256_file(clip_path):
        raise ValueError("An input file changed during matching; discard this result")
    return {"schema": "stemlab.clip-match.v1", "stemlab_version": __version__,
            "source": {"path": str(source_path), "sha256": source_hash},
            "clip": {"path": str(clip_path), "sha256": clip_hash},
            "clip_range_seconds": [first / sample_rate, last / sample_rate], **report}
