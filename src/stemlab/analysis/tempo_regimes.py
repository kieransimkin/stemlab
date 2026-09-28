from __future__ import annotations

import math
from dataclasses import dataclass
from typing import Any

import numpy as np


METRIC_RATIOS = (0.5, 2.0, 2.0 / 3.0, 1.5)


@dataclass(frozen=True)
class TempoRegimeConfig:
    min_segment_beats: int = 8
    bic_margin: float = 8.0
    min_change_fraction: float = 0.035
    min_phase_segment_beats: int = 6
    phase_bic_margin: float = 12.0
    min_phase_shift_fraction: float = 0.08
    min_phase_sse_reduction: float = 0.35
    max_phase_tempo_difference_fraction: float = 0.035


def _bic(sse: float, n: int, parameters: int) -> float:
    return n * math.log(max(1e-10, sse / max(1, n))) + parameters * math.log(max(2, n))


def constant_beat_fit(beat_times: np.ndarray) -> dict[str, Any] | None:
    """Fit one fixed-period grid and quantify how precisely beats align to it."""
    if beat_times.size < 3:
        return None
    indexes = np.arange(beat_times.size, dtype=np.float64)
    period, phase = np.polyfit(indexes, beat_times, 1)
    if period <= 0:
        return None
    predicted = phase + period * indexes
    residual_ms = (beat_times - predicted) * 1000.0
    absolute_ms = np.abs(residual_ms)
    interval_error_ms = np.abs(np.diff(beat_times) - period) * 1000.0
    p95_ms = float(np.percentile(absolute_ms, 95))
    p95_fraction = p95_ms / (period * 1000.0)
    end_drift_ms = float(
        (beat_times[-1] - (beat_times[0] + period * (beat_times.size - 1))) * 1000.0
    )
    if p95_fraction <= 0.02 and abs(end_drift_ms) <= period * 50.0:
        grade = "tight"
    elif p95_fraction <= 0.05 and abs(end_drift_ms) <= period * 100.0:
        grade = "good"
    elif p95_fraction <= 0.10:
        grade = "loose"
    else:
        grade = "poor"
    return {
        "proposed_bpm": round(60.0 / period, 4),
        "fitted_period_ms": round(period * 1000.0, 4),
        "fitted_first_beat_seconds": round(float(phase), 6),
        "beat_count": int(beat_times.size),
        "median_absolute_beat_error_ms": round(float(np.median(absolute_ms)), 3),
        "p90_absolute_beat_error_ms": round(float(np.percentile(absolute_ms, 90)), 3),
        "p95_absolute_beat_error_ms": round(p95_ms, 3),
        "maximum_absolute_beat_error_ms": round(float(np.max(absolute_ms)), 3),
        "rmse_beat_error_ms": round(float(np.sqrt(np.mean(residual_ms**2))), 3),
        "p95_interval_error_ms": round(float(np.percentile(interval_error_ms, 95)), 3),
        "anchored_end_drift_ms": round(end_drift_ms, 3),
        "p95_error_percent_of_beat": round(100.0 * p95_fraction, 3),
        "precision_grade": grade,
        "grade_definition": (
            "tight <=2% beat at p95; good <=5%; loose <=10%; poor >10%, "
            "with end-drift guards for tight/good"
        ),
    }


def _fit_models(values: np.ndarray, minimum: int) -> dict[str, Any]:
    n = values.size
    x = np.arange(n, dtype=np.float64)
    stable_sse = float(np.sum((values - np.mean(values)) ** 2))
    slope, intercept = np.polyfit(x, values, 1)
    linear_sse = float(np.sum((values - (intercept + slope * x)) ** 2))
    best_split, best_sse = None, math.inf
    for split in range(minimum, n - minimum + 1):
        left, right = np.mean(values[:split]), np.mean(values[split:])
        sse = float(
            np.sum((values[:split] - left) ** 2)
            + np.sum((values[split:] - right) ** 2)
        )
        if sse < best_sse:
            best_split, best_sse = split, sse
    return {
        "stable_bic": _bic(stable_sse, n, 1),
        "linear_bic": _bic(linear_sse, n, 2),
        "step_bic": _bic(best_sse, n, 3) if best_split is not None else math.inf,
        "slope": float(slope),
        "split": best_split,
    }


def _wrapped_phase_shift(seconds: float, period: float) -> float:
    return seconds if period <= 0 else (seconds + 0.5 * period) % period - 0.5 * period


def _phase_candidate(
    beat_times: np.ndarray, split: int, config: TempoRegimeConfig
) -> dict[str, Any] | None:
    n = beat_times.size
    minimum = config.min_phase_segment_beats
    if split < minimum or n - split < minimum:
        return None
    indexes = np.arange(n, dtype=np.float64)
    base_period, base_phase = np.polyfit(indexes, beat_times, 1)
    if base_period <= 0:
        return None
    base_sse = float(np.sum((beat_times - (base_phase + base_period * indexes)) ** 2))
    step = (indexes >= split).astype(np.float64)
    design = np.column_stack((np.ones(n), indexes, step))
    coefficients, _, _, _ = np.linalg.lstsq(design, beat_times, rcond=None)
    _, period, raw_shift = map(float, coefficients)
    if period <= 0:
        return None
    jump_sse = float(np.sum((beat_times - design @ coefficients) ** 2))
    base_bic = _bic(base_sse, n, 2)
    jump_bic = _bic(jump_sse, n, 3)
    bic_gain = base_bic - jump_bic
    reduction = 1.0 - jump_sse / max(base_sse, 1e-12)
    if bic_gain < config.phase_bic_margin or reduction < config.min_phase_sse_reduction:
        return None
    left_period = float(np.polyfit(np.arange(split), beat_times[:split], 1)[0])
    right_period = float(np.polyfit(np.arange(n - split), beat_times[split:], 1)[0])
    if left_period <= 0 or right_period <= 0:
        return None
    tempo_difference = abs(right_period / left_period - 1.0)
    if tempo_difference > config.max_phase_tempo_difference_fraction:
        return None
    shift = _wrapped_phase_shift(raw_shift, period)
    shift_fraction = shift / period
    if abs(shift_fraction) < config.min_phase_shift_fraction:
        return None
    boundary_error = float(beat_times[split] - beat_times[split - 1] - period)
    if abs(_wrapped_phase_shift(boundary_error, period) - shift) > max(0.025, 0.08 * period):
        return None
    return {
        "split": split,
        "shared_bpm": 60.0 / period,
        "before_bpm": 60.0 / left_period,
        "after_bpm": 60.0 / right_period,
        "tempo_difference_fraction": tempo_difference,
        "phase_shift_seconds": shift,
        "phase_shift_beats": shift_fraction,
        "boundary_interval_error_seconds": boundary_error,
        "single_grid_bic": base_bic,
        "phase_jump_bic": jump_bic,
        "bic_gain": bic_gain,
        "sse_reduction_fraction": reduction,
    }


def analyze_tempo_regimes(
    beats: list[float], config: TempoRegimeConfig | None = None
) -> dict[str, Any]:
    """Classify stable, gradual and abrupt tempo regions plus same-BPM phase skips."""
    config = config or TempoRegimeConfig()
    times = np.asarray(beats, dtype=np.float64)
    times = times[np.isfinite(times)]
    times = np.unique(times)
    if times.size < 3:
        return {"sections": [], "events": [], "method": "insufficient beats"}
    raw_bpm = 60.0 / np.diff(times)
    padded = np.pad(raw_bpm, (2, 2), mode="edge")
    smooth = np.asarray([np.median(padded[i : i + 5]) for i in range(raw_bpm.size)])
    events: list[dict[str, Any]] = []
    stable_ranges: list[tuple[int, int, str]] = []

    def visit(start: int, end: int, depth: int = 0) -> None:
        values = np.log(np.maximum(1e-6, smooth[start:end]))
        if values.size < 2 * config.min_segment_beats or depth > 8:
            stable_ranges.append((start, end, "short leaf after accepted boundaries"))
            return
        models = _fit_models(values, config.min_segment_beats)
        if models["split"] is None:
            stable_ranges.append((start, end, "stable model"))
            return
        split = start + int(models["split"])
        before = float(np.median(smooth[max(start, split - config.min_segment_beats) : split]))
        after = float(np.median(smooth[split : min(end, split + config.min_segment_beats)]))
        fraction = abs(after / before - 1.0)
        if (
            models["step_bic"] + config.bic_margin
            < min(models["stable_bic"], models["linear_bic"])
            and fraction >= config.min_change_fraction
        ):
            ratio = after / before
            alias = next((r for r in METRIC_RATIOS if abs(ratio / r - 1.0) <= 0.125), None)
            events.append({
                "kind": "abrupt",
                "last_old_regime_beat_index": split - 1,
                "first_new_regime_beat_index": split,
                "last_old_regime_beat_seconds": round(float(times[split - 1]), 6),
                "first_new_regime_beat_seconds": round(float(times[split]), 6),
                "from_bpm": round(before, 4),
                "to_bpm": round(after, 4),
                "metric_alias_suspected": alias is not None,
                "metric_ratio": alias,
                "model_bic": {k: round(float(models[k]), 3) for k in ("stable_bic", "linear_bic", "step_bic")},
            })
            visit(start, split, depth + 1)
            visit(split, end, depth + 1)
            return
        total_fraction = math.exp(abs(float(models["slope"])) * max(0, values.size - 1)) - 1.0
        if models["linear_bic"] + config.bic_margin < models["stable_bic"] and total_fraction >= config.min_change_fraction:
            events.append({
                "kind": "gradual",
                "start_beat_index": start,
                "end_beat_index": end,
                "start_seconds": round(float(times[start]), 6),
                "end_seconds": round(float(times[end]), 6),
                "direction": "accelerando" if models["slope"] > 0 else "ritardando",
                "from_bpm": round(float(np.median(smooth[start : start + 4])), 4),
                "to_bpm": round(float(np.median(smooth[max(start, end - 4) : end])), 4),
                "model_bic": {k: round(float(models[k]), 3) for k in ("stable_bic", "linear_bic", "step_bic")},
            })
            return
        stable_ranges.append((start, end, "stable model not materially outperformed"))

    if times.size < 2 * config.min_segment_beats + 1:
        stable_ranges.append((0, times.size - 1, "short track; insufficient beats for model comparison"))
    else:
        visit(0, times.size - 1)

    refined: list[tuple[int, int, str]] = []
    for start, end, basis in stable_ranges:
        section = times[start : end + 1]
        candidates = [
            candidate
            for split in range(config.min_phase_segment_beats, section.size - config.min_phase_segment_beats + 1)
            if (candidate := _phase_candidate(section, split, config)) is not None
        ]
        if not candidates:
            refined.append((start, end, basis))
            continue
        best = max(candidates, key=lambda item: item["bic_gain"])
        split = start + int(best["split"])
        events.append({
            "kind": "phase_skip",
            "last_old_phase_beat_index": split - 1,
            "first_new_phase_beat_index": split,
            "last_old_phase_beat_seconds": round(float(times[split - 1]), 6),
            "first_new_phase_beat_seconds": round(float(times[split]), 6),
            "shared_bpm": round(float(best["shared_bpm"]), 4),
            "before_bpm": round(float(best["before_bpm"]), 4),
            "after_bpm": round(float(best["after_bpm"]), 4),
            "tempo_difference_percent": round(100.0 * float(best["tempo_difference_fraction"]), 3),
            "phase_shift_seconds": round(float(best["phase_shift_seconds"]), 6),
            "phase_shift_ms": round(1000.0 * float(best["phase_shift_seconds"]), 3),
            "phase_shift_beats": round(float(best["phase_shift_beats"]), 6),
            "boundary_interval_error_ms": round(1000.0 * float(best["boundary_interval_error_seconds"]), 3),
            "model_bic": {
                "single_grid_bic": round(float(best["single_grid_bic"]), 3),
                "phase_jump_bic": round(float(best["phase_jump_bic"]), 3),
                "bic_gain": round(float(best["bic_gain"]), 3),
            },
            "sse_reduction_fraction": round(float(best["sse_reduction_fraction"]), 6),
            "interpretation": "Persistent same-BPM grid offset; cross-source and listening confirmation are still required.",
        })
        refined.extend(((start, split - 1, "phase-skip split"), (split, end, "phase-skip split")))

    sections = []
    for start, end, basis in sorted(refined):
        fit = constant_beat_fit(times[start : end + 1])
        if fit is None:
            continue
        sections.append({
            "start_beat_index": int(start),
            "end_beat_index": int(end),
            "start_seconds": round(float(times[start]), 6),
            "end_seconds": round(float(times[end]), 6),
            "classification_basis": basis,
            "beat_fit": fit,
            "constant_bpm_assumption_status": (
                "supported" if fit["precision_grade"] in ("tight", "good")
                else "provisional" if fit["precision_grade"] == "loose"
                else "weak_or_rejected_by_alignment_precision"
            ),
        })
    events.sort(key=lambda item: float(item.get("first_new_regime_beat_seconds", item.get("first_new_phase_beat_seconds", item.get("start_seconds", 0.0)))))
    return {
        "sections": sections,
        "events": events,
        "policy": {
            "tempo_change": "stable, linear-ramp and abrupt-step BIC comparison on smoothed beat intervals",
            "phase_skip": "same-period two-grid model; >=8% beat shift, >=12 BIC gain, >=35% SSE reduction, <=3.5% tempo difference",
            "precision": "fixed-grid residuals are authoritative; grades are shorthand only",
        },
    }
