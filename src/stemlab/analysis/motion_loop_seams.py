"""Rank beat-constrained motion cuts using aligned seam evidence."""
from collections.abc import Callable

import numpy as np

from . import rig_motion


def measure_pcm_join(pcm: np.ndarray, sample_rate: int, start: float, end: float) -> dict:
    """Measure a hard wrap in normalized PCM on a zero-origin sample clock."""
    first, stop = round(start * sample_rate), round(end * sample_rate)
    width = max(2, round(.05 * sample_rate))
    if not 0 <= first < stop <= len(pcm) or stop - first < 2 * width:
        raise ValueError("PCM does not cover both interior loop neighborhoods")
    head = np.asarray(pcm[first:first + width], dtype=float)
    tail = np.asarray(pcm[stop - width:stop], dtype=float)
    step = float(np.max(np.abs(head[0] - tail[-1])))
    slope = float(np.quantile(np.abs(np.concatenate((np.diff(head, axis=0),
                                                    np.diff(tail, axis=0)))), .99))
    head_rms = float(np.sqrt(np.mean(head ** 2)))
    tail_rms = float(np.sqrt(np.mean(tail ** 2)))
    return {
        "step_peak": step,
        "local_p99_slope": slope,
        "step_to_local_slope": step / max(slope, 1e-9),
        "level_change": abs(head_rms - tail_rms) / max(head_rms, tail_rms, .025),
        "possible_click": bool(step >= .03 and step >= 2 * max(slope, 1e-9)),
    }


def rank_aligned_motion_loops(
    times,
    values,
    channels,
    beat_seconds,
    *,
    beat_count: int,
    pcm=None,
    sample_rate: int | None = None,
    view_seam: Callable[[float, float], tuple[float, float]] | None = None,
    max_shift_seconds: float = .015,
    max_results: int = 8,
) -> list[dict]:
    """Rank raw cuts of one beat count on a caller-supplied, aligned clock.

    Both endpoints move by the same bounded offset. Optional normalized PCM
    evidence rejects abrupt joins. A fixed-view observer may provide full-body
    and lower-body mismatch in [0, 1]. Its observations are camera evidence.
    """
    times = np.asarray(times, dtype=float)
    values = np.asarray(values, dtype=float)
    beats = np.asarray(beat_seconds, dtype=float)
    if (times.ndim != 1 or len(times) < 16 or values.shape != (len(times), len(channels))
            or len(times) > 200_000 or values.size > rig_motion.MAX_VALUES
            or not np.isfinite(times).all() or not np.isfinite(values).all()
            or np.any(np.diff(times) <= 0)):
        raise ValueError("Expected finite, increasing motion samples and matching channels")
    if (beats.ndim != 1 or not np.isfinite(beats).all() or np.any(np.diff(beats) <= 0)
            or not 1 <= beat_count <= 32 or not 1 <= max_results <= 50
            or not 0 <= max_shift_seconds <= .03):
        raise ValueError("Expected a bounded, increasing beat grid and loop search")
    if (pcm is None) != (sample_rate is None):
        raise ValueError("PCM and its native sample rate must be supplied together")
    if pcm is not None:
        pcm = np.asarray(pcm)
        if (pcm.ndim not in (1, 2) or (pcm.ndim == 2 and pcm.shape[1] == 0)
                or not 8000 <= sample_rate <= 192000 or not np.isfinite(pcm).all()):
            raise ValueError("Expected finite normalized PCM and a supported sample rate")
    _, active, _ = rig_motion._signals(times, values, channels)
    groups = rig_motion._groups_at(values, channels, active)
    if not groups or len(beats) <= beat_count:
        return []

    spacing = np.diff(times)
    missing = spacing > 3 * np.median(spacing)
    gap_start, gap_end = times[:-1][missing], times[1:][missing]
    shifts = np.linspace(-max_shift_seconds, max_shift_seconds, 13) if max_shift_seconds else [0.]
    best_by_anchor = []
    for anchor, nominal_end in zip(beats[:-beat_count], beats[beat_count:]):
        span = float(nominal_end - anchor)
        if span < .2:
            continue
        starts = anchor + shifts
        best = None
        for start, end, pose, velocity, drift in rig_motion._seam_batches(
                times, values, channels, groups, starts, span):
            if (pose > .32 or velocity > .6 or drift > .02
                    or np.any((gap_end > start - .04) & (gap_start < end + .04))):
                continue
            audio = None
            if pcm is not None:
                if round(start * sample_rate) < 0 or round(end * sample_rate) > len(pcm):
                    continue
                audio = measure_pcm_join(pcm, sample_rate, start, end)
                if audio["possible_click"]:
                    continue
            body, lower = view_seam(start, end) if view_seam else (None, None)
            if view_seam and not all(0 <= v <= 1 for v in (body, lower)):
                raise ValueError("Expected normalized fixed-view mismatch")
            repeat = None
            if not np.any((gap_end > end) & (gap_start < end + span)):
                repeat = rig_motion._repeat_cost(times, values, groups, start, end)
            shift = float(start - anchor)
            cost = .34 * pose / .32 + .16 * velocity / .6 + .10 * drift / .02
            if repeat is not None:
                cost += .045 * min(repeat / .25, 2)
            if body is not None:
                cost += .25 * body + .32 * lower
            if audio is not None:
                cost += (.10 * audio["level_change"]
                         + .075 * min(audio["step_to_local_slope"] / 2, 1)
                         + .08 * min(audio["step_peak"] / .25, 1))
            if max_shift_seconds:
                cost += .012 * abs(shift) / max_shift_seconds
            candidate = dict(
                start_seconds=start, end_seconds=end, beats=beat_count,
                nominal_start_seconds=float(anchor), nominal_end_seconds=float(nominal_end),
                beat_shift_seconds=shift, pose_mismatch=pose, velocity_mismatch=velocity,
                root_drift_relative=drift, repeated_phrase_mismatch=repeat,
                body_view_mismatch=body, lower_body_view_mismatch=lower, audio_seam=audio,
                cost=cost, requires_review=True,
            )
            if best is None or candidate["cost"] < best["cost"]:
                best = candidate
        if best is not None:
            best_by_anchor.append(best)
    return sorted(best_by_anchor, key=lambda cut: cut["cost"])[:max_results]
