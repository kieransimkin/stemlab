from __future__ import annotations
from collections import Counter
from pathlib import Path
from typing import Any, Iterable

import numpy as np

from stemlab.types import BeatResult
from stemlab.util import write_json


def _select_grid(results: Iterable[BeatResult]) -> BeatResult | None:
    results = list(results)
    if not results:
        return None
    for preferred in ("consensus", "all_in_one"):
        for result in results:
            if result.model == preferred and len(result.beats) >= 4:
                return result
    return max(results, key=lambda item: (len(item.downbeats), len(item.beats)))


def _tempo_stats(beats: list[float]) -> dict[str, float | None]:
    if len(beats) < 3:
        return {
            "median_bpm": None,
            "mean_bpm": None,
            "bpm_std": None,
            "ibi_cv": None,
            "tempo_drift_bpm_p95_p05": None,
        }
    ibis = np.diff(np.asarray(beats, dtype=float))
    ibis = ibis[(ibis > 0.18) & (ibis < 2.5)]
    if not len(ibis):
        return {
            "median_bpm": None,
            "mean_bpm": None,
            "bpm_std": None,
            "ibi_cv": None,
            "tempo_drift_bpm_p95_p05": None,
        }
    bpms = 60.0 / ibis
    return {
        "median_bpm": float(np.median(bpms)),
        "mean_bpm": float(np.mean(bpms)),
        "bpm_std": float(np.std(bpms)),
        "ibi_cv": float(np.std(ibis) / np.mean(ibis)) if np.mean(ibis) else None,
        "tempo_drift_bpm_p95_p05": float(np.percentile(bpms, 95) - np.percentile(bpms, 5)),
    }


def _beats_per_bar(beats: list[float], downbeats: list[float]) -> dict[str, Any]:
    if len(beats) < 4 or len(downbeats) < 2:
        return {"estimated_beats_per_bar": None, "support_bars": 0, "histogram": {}}
    b = np.asarray(beats, dtype=float)
    counts: list[int] = []
    for start, end in zip(downbeats[:-1], downbeats[1:]):
        count = int(np.sum((b >= start - 0.04) & (b < end - 0.04)))
        if 1 <= count <= 12:
            counts.append(count)
    if not counts:
        return {"estimated_beats_per_bar": None, "support_bars": 0, "histogram": {}}
    hist = Counter(counts)
    value, support = hist.most_common(1)[0]
    confidence = support / len(counts)
    return {
        "estimated_beats_per_bar": int(value),
        "support_bars": len(counts),
        "mode_confidence": float(confidence),
        "histogram": {str(k): int(v) for k, v in sorted(hist.items())},
    }


def _nearest_sample(times: np.ndarray, values: np.ndarray, targets: np.ndarray) -> np.ndarray:
    if not len(times) or not len(targets):
        return np.asarray([], dtype=float)
    idx = np.searchsorted(times, targets)
    idx = np.clip(idx, 1, len(times) - 1)
    left = idx - 1
    choose_right = np.abs(times[idx] - targets) < np.abs(times[left] - targets)
    chosen = np.where(choose_right, idx, left)
    return values[chosen]


def _groove_features(
    y: np.ndarray,
    sr: int,
    beats: list[float],
    *,
    hop_length: int = 512,
) -> tuple[dict[str, Any], dict[str, np.ndarray]]:
    import librosa

    onset = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop_length)
    times = librosa.times_like(onset, sr=sr, hop_length=hop_length)
    peaks = librosa.onset.onset_detect(
        onset_envelope=onset,
        sr=sr,
        hop_length=hop_length,
        units="time",
        backtrack=False,
    )
    peaks = np.asarray(peaks, dtype=float)

    if len(beats) < 4:
        return (
            {
                "onset_density_per_second": float(len(peaks) / max(1e-9, len(y) / sr)),
                "offbeat_onset_energy_ratio": None,
                "swing_offbeat_position_median": None,
                "swing_ratio_long_to_short": None,
                "quantization_error_seconds_median": None,
                "periodicity_strength": None,
            },
            {"time_seconds": times, "onset_strength": onset, "onset_peaks_seconds": peaks},
        )

    b = np.asarray(beats, dtype=float)
    intervals = np.diff(b)
    valid = intervals[(intervals > 0.18) & (intervals < 2.5)]
    median_beat = float(np.median(valid)) if len(valid) else float(np.median(intervals))

    # Compare onset energy on beats and exact eighth-note offbeats.
    beat_targets = b[:-1]
    off_targets = 0.5 * (b[:-1] + b[1:])
    beat_energy = _nearest_sample(times, onset, beat_targets)
    off_energy = _nearest_sample(times, onset, off_targets)
    energy_total = float(np.sum(beat_energy) + np.sum(off_energy))
    offbeat_ratio = float(np.sum(off_energy) / energy_total) if energy_total > 0 else None

    # Estimate swung eighth placement by finding the strongest onset inside the
    # interior of each beat interval. Straight eighths cluster near 0.50;
    # triplet swing clusters near 0.667. We require sufficient interior onsets.
    off_positions: list[float] = []
    for start, end in zip(b[:-1], b[1:]):
        interval = end - start
        if not (0.18 < interval < 2.5):
            continue
        mask = (times >= start + 0.30 * interval) & (times <= start + 0.82 * interval)
        if not np.any(mask):
            continue
        local_values = onset[mask]
        if not len(local_values):
            continue
        local_times = times[mask]
        j = int(np.argmax(local_values))
        if local_values[j] < np.percentile(onset, 60):
            continue
        position = float((local_times[j] - start) / interval)
        if 0.30 <= position <= 0.82:
            off_positions.append(position)

    swing_pos = float(np.median(off_positions)) if len(off_positions) >= 8 else None
    swing_ratio = None
    if swing_pos is not None and swing_pos < 0.95:
        swing_ratio = float(swing_pos / max(1e-9, 1.0 - swing_pos))

    # Quantization error against a 16th-note grid derived from detected beats.
    grid: list[float] = []
    for start, end in zip(b[:-1], b[1:]):
        interval = end - start
        if 0.18 < interval < 2.5:
            grid.extend(start + interval * np.arange(4) / 4.0)
    grid_arr = np.asarray(grid, dtype=float)
    qerr = None
    if len(peaks) and len(grid_arr):
        distances = np.min(np.abs(peaks[:, None] - grid_arr[None, :]), axis=1)
        qerr = float(np.median(distances))

    # Tempogram periodicity: high values mean a strongly periodic onset curve.
    try:
        tempogram = librosa.feature.tempogram(
            onset_envelope=onset,
            sr=sr,
            hop_length=hop_length,
        )
        periodicity = float(np.nanmean(np.max(tempogram, axis=0))) if tempogram.size else None
    except Exception:
        periodicity = None

    features = {
        "onset_density_per_second": float(len(peaks) / max(1e-9, len(y) / sr)),
        "offbeat_onset_energy_ratio": offbeat_ratio,
        "swing_offbeat_position_median": swing_pos,
        "swing_ratio_long_to_short": swing_ratio,
        "swing_support_intervals": len(off_positions),
        "quantization_error_seconds_median": qerr,
        "periodicity_strength": periodicity,
        "median_beat_interval_seconds": median_beat,
        "method_notes": {
            "swing": "strongest interior onset position within detected beat intervals; descriptive, not a style classifier",
            "syncopation_proxy": "offbeat onset energy ratio; higher values imply more energy away from primary beats",
        },
    }
    curves = {"time_seconds": times, "onset_strength": onset, "onset_peaks_seconds": peaks}
    return features, curves


def analyze_rhythm(
    audio_path: Path,
    beat_results: list[BeatResult],
    output_dir: Path,
) -> dict[str, Any]:
    """Derive meter, stability, onset density, swing and syncopation proxies."""
    import librosa

    output_dir.mkdir(parents=True, exist_ok=True)
    grid = _select_grid(beat_results)
    y, sr = librosa.load(str(audio_path), sr=22050, mono=True)

    beats = list(grid.beats) if grid else []
    downbeats = list(grid.downbeats) if grid else []
    groove, curves = _groove_features(y, sr, beats)
    result = {
        "source": str(audio_path),
        "grid_source": grid.model if grid else None,
        "beat_count": len(beats),
        "downbeat_count": len(downbeats),
        "tempo": _tempo_stats(beats),
        "meter": _beats_per_bar(beats, downbeats),
        "groove": groove,
        "detectors": [
            {
                "model": item.model,
                "tempo_bpm": item.tempo_bpm,
                "beats": len(item.beats),
                "downbeats": len(item.downbeats),
            }
            for item in beat_results
        ],
        "curve_file": "rhythm_curves.npz",
    }
    np.savez_compressed(output_dir / "rhythm_curves.npz", **curves)
    write_json(output_dir / "rhythm.json", result)
    return result
