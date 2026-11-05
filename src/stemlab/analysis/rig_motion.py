"""Offline beat/tempo/loop hypotheses for DanceRudiments rig captures.

Only source-time pose evidence is used; no audio beat/downbeat is asserted. No
native sampler, Blender, model weights, network access or extra dependencies.

Kieran Simkin — https://kieransimkin.co.uk/my-songs/
"""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path
from typing import Any

import numpy as np

FORMAT = "stemlab.rig-motion-analysis"
MAX_INPUT_BYTES = 64 * 1024 * 1024
MAX_VALUES = 8_388_608


def _object_pairs(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Duplicate JSON key: {key}")
        result[key] = value
    return result


def _reject_constant(value):
    raise ValueError(f"Invalid non-finite JSON value: {value}")


def _canonical(value):
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=True,
                      allow_nan=False)


def _read_capture(path: Path) -> tuple[dict, np.ndarray, np.ndarray, list[dict], str]:
    if not path.is_file() or path.stat().st_size > MAX_INPUT_BYTES:
        raise ValueError("Input must be an existing DanceRudiments capture of at most 64 MiB")
    payload = path.read_bytes()
    data = json.loads(payload, object_pairs_hook=_object_pairs, parse_constant=_reject_constant)
    if not isinstance(data, dict) or data.get("format") != "dancerudiments.rig-capture" or type(data.get("schema_version")) is not int or data["schema_version"] != 1:
        raise ValueError("Expected dancerudiments.rig-capture schema 1, not compiled motion")
    profile = data.get("profile")
    if not isinstance(profile, dict) or profile.get("format") != "dancerudiments.rig-profile":
        raise ValueError("Capture is missing its versioned rig profile")
    channels = profile.get("channels")
    if not isinstance(channels, list) or not channels or len(channels) > MAX_VALUES:
        raise ValueError("Invalid rig profile channel count")
    source_type = data.get("type_uri")
    if isinstance(source_type, str) and source_type.startswith("synny://"):
        source_type = "syn://" + source_type[len("synny://"):]
    if (data.get("profile_sha256") != hashlib.sha256(_canonical(profile).encode("ascii")).hexdigest()
            or source_type != profile.get("type_uri")):
        raise ValueError("Capture profile fingerprint or semantic type does not match")
    if not all(isinstance(c, dict) and c.get("number") == i + 1 and
               c.get("value_type", "float") in ("float", "integer", "boolean") and
               isinstance(c.get("bone"), str) and isinstance(c.get("data_path"), str)
               for i, c in enumerate(channels)):
        raise ValueError("Invalid numbered capture channels")
    times = np.asarray(data.get("frame_times_seconds"), dtype=np.float64)
    values = np.asarray(data.get("frames"), dtype=np.float64)
    if (times.ndim != 1 or not 16 <= len(times) <= 200_000 or
            values.ndim != 2 or values.shape != (len(times), len(channels)) or
            values.size > MAX_VALUES or not np.all(np.isfinite(times)) or
            not np.all(np.isfinite(values)) or not np.all(np.diff(times) > 0)):
        raise ValueError("Capture must have 16..200000 strictly timed, finite complete poses")
    gaps = np.diff(times)
    if times[-1] - times[0] < 3 or np.max(gaps) > 0.35:
        raise ValueError("Need at least 3 seconds of adequately sampled motion (no gaps >0.35 s)")
    for index, channel in enumerate(channels):
        minimum, maximum = channel.get("minimum"), channel.get("maximum")
        if (type(minimum) not in (int, float) or type(maximum) not in (int, float)
                or not math.isfinite(minimum) or not math.isfinite(maximum) or minimum >= maximum
                or np.min(values[:, index]) < minimum - 1e-8
                or np.max(values[:, index]) > maximum + 1e-8):
            raise ValueError(f"Channel {index + 1} is outside its declared finite bounds")
        if channel.get("value_type") in ("integer", "boolean") and not np.allclose(values[:, index], np.rint(values[:, index]), atol=1e-8):
            raise ValueError(f"Discrete channel {index + 1} contains fractional values")
    groups = {}
    for i, c in enumerate(channels):
        if c.get("interpolation") == "quaternion":
            groups.setdefault((c["bone"], c["data_path"]), []).append(i)
    for indices in groups.values():
        if len(indices) != 4 or [channels[i].get("array_index") for i in indices] != [0, 1, 2, 3]:
            raise ValueError("Incomplete quaternion group")
        q = values[:, indices]
        if np.max(np.abs(np.sum(q * q, axis=1) - 1)) > 2e-5:
            raise ValueError("Non-unit quaternion in capture")
        # A sign change does not encode physical angular movement. Unwrap only
        # the analysis copy so that interpolation and tangent tests are sound.
        q = q.copy()
        for k in range(1, len(q)):
            if np.dot(q[k - 1], q[k]) < 0:
                q[k] *= -1
        values[:, indices] = q
    return data, times, values, channels, hashlib.sha256(payload).hexdigest()


def _signals(times, values, channels):
    """Group physical control channels; don't overweight rigs with many axes."""
    dt = np.diff(times)
    groups = {}
    for i, channel in enumerate(channels):
        if channel.get("value_type", "float") != "float" or channel.get("interpolation") == "step":
            continue
        groups.setdefault((channel["bone"], channel["data_path"]), []).append(i)
    signals = []
    accepted = []
    for (bone, path), indices in groups.items():
        block = values[:, indices]
        if path == "rotation_quaternion":
            dot = np.clip(np.abs(np.sum(block[1:] * block[:-1], axis=1)), 0, 1)
            speed = 2 * np.arccos(dot) / dt
        else:
            speed = np.linalg.norm(np.diff(block, axis=0) / dt[:, None], axis=1)
        amplitude = float(np.percentile(speed, 95))
        if amplitude <= 1e-5:
            continue
        signals.append(np.clip(speed / amplitude, 0, 3))
        accepted.append((bone, path, indices, amplitude))
    if not signals:
        return None, [], []
    speed = np.asarray(signals)
    # Kinematic novelty: changes/impulses and sustained movement both matter.
    # Central differences avoid frame-rate-dependent spikes.
    flux = np.abs(np.diff(speed, axis=1, prepend=speed[:, :1]))
    energy = np.mean(0.60 * flux + 0.40 * speed, axis=0)
    return energy, accepted, list(speed)


def _resample(times, signal):
    midpoints = (times[:-1] + times[1:]) / 2
    native_hz = 1.0 / np.median(np.diff(times))
    fps = min(60, max(10, int(round(native_hz))))
    regular = np.arange(midpoints[0], midpoints[-1], 1.0 / fps)
    envelope = np.interp(regular, midpoints, signal)
    window = max(1, round(fps * .06))
    if window > 1:
        envelope = np.convolve(np.pad(envelope, (window // 2, window - window // 2 - 1),
                                             mode="edge"), np.ones(window) / window, mode="valid")
    return regular, envelope, fps


def _accents(t, energy, fps):
    if len(t) < 3 or float(np.ptp(energy)) < .02:
        return []
    threshold = max(float(np.percentile(energy, 70)), float(np.median(energy) + .3 * np.std(energy)))
    peaks = np.where((energy[1:-1] >= energy[:-2]) & (energy[1:-1] > energy[2:]) &
                     (energy[1:-1] > threshold))[0] + 1
    strongest = sorted(peaks, key=lambda k: float(energy[k]), reverse=True)
    taken = []
    blocked = np.zeros(len(t), dtype=bool)
    radius = math.ceil(.13 * fps) - 1
    for p in strongest:
        if not blocked[p]:
            taken.append(int(p))
            blocked[max(0, p - radius):p + radius + 1] = True
    maximum = max(float(np.percentile(energy, 95)), 1e-9)
    return [{"seconds": round(float(t[p]), 6), "strength": round(float(min(1, energy[p] / maximum)), 4)}
            for p in sorted(taken)]


def _correlation(t, signal, seconds):
    shifted = t + seconds
    keep = shifted <= t[-1]
    if np.sum(keep) < 50:
        return 0.0
    a = signal[keep]
    b = np.interp(shifted[keep], t, signal)
    a = a - a.mean()
    b = b - b.mean()
    den = math.sqrt(float(np.dot(a, a) * np.dot(b, b)))
    return float(np.dot(a, b) / den) if den > 1e-10 else 0.0


def _regular_correlations(times, signals, periods):
    """Overlap-normalised Pearson correlations on the uniform analysis grid.

    Interpolate fractional lags exactly as the scalar path does. The prefix
    statistics use the same overlap as the cross-products, including the
    fractional-lag endpoint, rather than normalising by the full recording.
    """
    size = len(times)
    step = float((times[-1] - times[0]) / (size - 1))
    regular = times[0] + step * np.arange(size)
    if not np.allclose(times, regular, rtol=0, atol=step * 1e-8):
        return np.asarray([[_correlation(times, row, period) for period in periods]
                           for row in signals])

    # Centre before accumulating squares so near-constant channels don't lose
    # precision to cancellation when their means are removed again per lag.
    rows = np.asarray(signals, dtype=np.float64)
    rows = rows - rows.mean(axis=1, keepdims=True)
    fft_length = 1 << (2 * size - 1).bit_length()
    spectrum = np.fft.rfft(rows, n=fft_length, axis=1)
    ac = np.fft.irfft(spectrum * spectrum.conj(), n=fft_length, axis=1)
    first = np.pad(rows.cumsum(axis=1), ((0, 0), (1, 0)))
    squares = np.pad((rows ** 2).cumsum(axis=1), ((0, 0), (1, 0)))
    adjacent = np.pad((rows[:, :-1] * rows[:, 1:]).cumsum(axis=1), ((0, 0), (1, 0)))
    result = np.zeros((len(rows), len(periods)))
    for i, period in enumerate(periods):
        lag = period / step
        if abs(lag - round(lag)) <= 1e-8:
            lag = float(round(lag))
        offset = int(lag)
        frac = lag - offset
        count = size - offset - (frac > 0)
        if count <= 0:
            continue
        # At a grid-aligned lag, floating-point addition can round the last
        # shifted timestamp outside the scalar path's inclusive endpoint.
        if (times[count - 1] + period > times[-1]
                or (count < size and times[count] + period <= times[-1])):
            result[:, i] = [_correlation(times, row, period) for row in signals]
            continue
        if count < 50:
            continue
        a = first[:, count]
        aa = squares[:, count]
        b = first[:, offset + count] - first[:, offset]
        bb = squares[:, offset + count] - squares[:, offset]
        ab = ac[:, offset]
        if frac:
            # Autocorrelation at the shorter integer lag includes one final
            # pair that cannot be interpolated inside the recording.
            ab = ab - rows[:, count] * rows[:, -1]
            b1 = first[:, offset + count + 1] - first[:, offset + 1]
            b11 = squares[:, offset + count + 1] - squares[:, offset + 1]
            b01 = adjacent[:, offset + count] - adjacent[:, offset]
            keep = 1 - frac
            b = keep * b + frac * b1
            bb = keep**2 * bb + 2 * keep * frac * b01 + frac**2 * b11
            ab = keep * ab + frac * ac[:, offset + 1]
        denominator = np.sqrt(np.maximum(0, aa - a*a/count) * np.maximum(0, bb - b*b/count))
        np.divide(ab - a*b/count, denominator, out=result[:, i], where=denominator > 1e-10)
    return np.clip(result, -1, 1)


def _phase(t, energy, period):
    choices = 64
    phases = t[0] + np.arange(choices) * period / choices
    scores = []
    for phase in phases:
        beats = np.arange(phase, t[-1] - period / 2, period)
        if len(beats) < 5:
            scores.append((-1.0, phase))
            continue
        on = np.mean(np.interp(beats, t, energy))
        off = np.mean(np.interp(beats + .5 * period, t, energy))
        scores.append(((on - off) / max(on + off, 1e-8), phase))
    strength, phase = max(scores)
    return max(0.0, float(strength)), float(phase)


def _tempo_peaks(curve):
    return np.pad((curve[1:-1] >= curve[:-2]) & (curve[1:-1] > curve[2:]), (1, 1))


def _tempo_spectrum(t, streams, bpm, minimum, maximum):
    """Compare periodic energy per control, with equal weight across controls."""
    size = 1 << (len(t) * 4 - 1).bit_length()
    rates = np.fft.rfftfreq(size, t[1] - t[0]) * 60
    band = (rates >= min(35, .6 * minimum)) & (rates <= max(420, 2 * maximum))
    window = np.hanning(len(t))
    weights = np.full(len(streams), .8 / (len(streams) - 1))
    weights[0] = .2
    combined = np.zeros(len(rates))
    for start in range(0, len(streams), 16):
        block = streams[start:start + 16]
        centered = block - block.mean(axis=1, keepdims=True)
        magnitude = np.abs(np.fft.rfft(centered * window, n=size, axis=1))
        magnitude /= np.maximum(1e-9, magnitude[:, band].max(axis=1, keepdims=True))
        combined += weights[start:start + 16] @ magnitude
    return np.interp(bpm, rates, combined), np.interp(2 * bpm, rates, combined)


def _tempo_candidates(t, energy, group_envelopes, minimum, maximum):
    """Rank pulse rates using periodicity, local peak shape and metrical evidence."""
    if float(np.ptp(energy)) < .02 or len(t) < 6 or not group_envelopes:
        return []
    # Extend the scoring grid past the requested bounds to distinguish a
    # genuine boundary peak from a rising shoulder clipped by the bounds.
    before = math.ceil((minimum - .85 * minimum) * 2) + 1
    after = math.ceil((maximum / .85 - minimum) * 2) + 1
    bpm_range = minimum + .5 * np.arange(-before, after + 1)
    streams = np.asarray([energy, *group_envelopes])
    correlations = _regular_correlations(t, streams, 60.0 / bpm_range)
    pooled, groups = correlations[0], correlations[1:]
    agreement = np.quantile(np.maximum(0, groups), .8, axis=0)
    ranks = .85 * agreement + .15 * np.maximum(0, pooled)
    direct, subdivision = _tempo_spectrum(t, streams, bpm_range, minimum, maximum)
    periodic_peak = _tempo_peaks(ranks)
    spectral_peak = _tempo_peaks(direct) & (direct > .18)
    candidates = (periodic_peak | spectral_peak) & (ranks >= .14)
    candidates &= (bpm_range >= minimum) & (bpm_range <= maximum + .001)

    shoulders = .5 * (np.interp(.85 * bpm_range, bpm_range, ranks)
                       + np.interp(bpm_range / .85, bpm_range, ranks))
    prominence = np.maximum(0, ranks - shoulders)
    # A broad log-tempo prior breaks ties between plausible metrical levels.
    # Strong motion evidence can still win well outside the centre.
    prior = np.exp(-.5 * (np.log2(bpm_range / 120) / .7) ** 2)
    proposals = []
    for i in np.flatnonzero(candidates):
        bpm = float(bpm_range[i])
        phase_score, zero = _phase(t, energy, 60 / bpm)
        phase_term = phase_score if periodic_peak[i] else 0.0
        periodicity = .85 * ranks[i] + .15 * phase_term
        # A strong subdivision can reinforce a pulse with its own evidence.
        # On its own it cannot turn a clear fast pulse into a slower beat.
        harmonic_support = min(subdivision[i], 1.5 * direct[i])
        rank = (.65 * periodicity + .35 * direct[i] + .35 * prominence[i]
                + .22 * harmonic_support) * prior[i] / 1.57
        support = int(np.sum(groups[:, i] >= .30))
        proposals.append({"bpm": bpm, "autocorrelation": round(float(pooled[i]), 4),
                          "group_periodicity": round(float(agreement[i]), 4),
                          "supporting_control_groups": support,
                          "active_control_groups": len(group_envelopes),
                          "phase_contrast": round(phase_score, 4), "beat_zero_seconds": round(zero, 6),
                          "spectral_support": round(float(direct[i]), 4),
                          "subdivision_support": round(float(subdivision[i]), 4),
                          "score": round(float(rank), 4), "source": "pose-velocity novelty"})
    proposals.sort(key=lambda c: -c["score"])
    result = []
    for p in proposals:
        if all(abs(p["bpm"] - other["bpm"]) >= 2.0 for other in result):
            result.append(p)
        if len(result) >= 8:
            break
    if result:
        base = result[0]["bpm"]
        for index, item in enumerate(result):
            ratio = item["bpm"] / base
            item["metrical_relation_to_top"] = (
                "primary" if index == 0 else
                "half_time" if abs(ratio - .5) < .06 else
                "double_time" if abs(ratio - 2) < .12 else "alternative"
            )
            item["requires_review"] = True
    return result


def _groups_at(values, channels, active):
    # Weight each bone/path group once; robust motion range is a pose mismatch
    # denominator, not an assumed physical joint limit.
    result = []
    for bone, path, indices, speed_scale in active:
        block = values[:, indices]
        if path == "rotation_quaternion":
            span = 1.0  # compare quaternion angular distances in radians
        else:
            center = np.median(block, axis=0)
            span = float(np.percentile(np.linalg.norm(block - center, axis=1), 90))
        if span > 1e-7:
            result.append((bone, path, indices, max(span, .02 if path == "rotation_quaternion" else 1e-6), speed_scale))
    return result


def _pose_distances(left, right, groups):
    measures = []
    for _, path, indices, span, _ in groups:
        a, b = left[..., indices], right[..., indices]
        if path == "rotation_quaternion":
            a = a / np.maximum(1e-12, np.linalg.norm(a, axis=-1, keepdims=True))
            b = b / np.maximum(1e-12, np.linalg.norm(b, axis=-1, keepdims=True))
            distance = 2 * np.arccos(np.clip(np.abs(np.sum(a * b, axis=-1)), 0, 1))
        else:
            distance = np.linalg.norm(a - b, axis=-1)
        measures.append(distance / span)
    if not measures:
        return np.full(left.shape[:-1], np.inf)
    return np.percentile(np.stack(measures, axis=-1), 80, axis=-1)


def _pose_distance(left, right, groups):
    return float(_pose_distances(left, right, groups))


def _pose_at(times, values, seconds):
    i = np.clip(np.searchsorted(times, seconds, side="right") - 1, 0, len(times) - 2)
    w = np.asarray((seconds - times[i]) / (times[i+1] - times[i]))[..., None]
    return (1-w) * values[i] + w * values[i+1]


def _seam_batches(times, values, channels, groups, starts, duration):
    """Score all in-range candidates in bounded blocks without sampling a new clock."""
    starts = np.asarray(starts, dtype=float)
    starts = starts[(starts >= times[0]) & (starts + duration <= times[-1])]
    step_indices = [i for i, c in enumerate(channels) if c.get("interpolation") == "step"]
    h = min(.04, duration / 12)
    for block in range(0, len(starts), 128):
        start = starts[block:block+128]
        end = start + duration
        a, b = _pose_at(times, values, start), _pose_at(times, values, end)
        pose = _pose_distances(a, b, groups)
        left = start - h >= times[0]
        right = end + h <= times[-1]
        va = (_pose_at(times, values, start + h)
              - _pose_at(times, values, np.where(left, start-h, start))) / np.where(left, 2*h, h)[:, None]
        vb = (_pose_at(times, values, np.where(right, end+h, end))
              - _pose_at(times, values, end - h)) / np.where(right, 2*h, h)[:, None]
        delta = va - vb
        velocity = np.percentile(np.stack([
            np.linalg.norm(delta[:, indices], axis=1) / max(scale, 1e-5)
            for _, _, indices, _, scale in groups
        ], axis=1), 80, axis=1)
        drift = np.zeros(len(start))
        for bone, path, indices, span, _ in groups:
            if bone.lower() in ("root", "root_ctrl", "hips", "pelvis", "master") and path == "location":
                drift = np.maximum(drift, np.linalg.norm(a[:, indices] - b[:, indices], axis=1) / span)
        valid = np.ones(len(start), dtype=bool)
        if step_indices:
            ia = np.maximum(0, np.searchsorted(times, start, side="right") - 1)
            ib = np.maximum(0, np.searchsorted(times, end, side="right") - 1)
            valid = np.all(values[np.ix_(ia, step_indices)] == values[np.ix_(ib, step_indices)], axis=1)
        for i in np.flatnonzero(valid):
            yield float(start[i]), float(end[i]), float(pose[i]), float(velocity[i]), float(drift[i])


def _seam(times, values, channels, groups, start, end):
    if not groups:
        return None
    row = next(_seam_batches(times, values, channels, groups, [start], end - start), None)
    return row[2:] if row is not None else None


def _repeat_cost(times, values, groups, start, end):
    duration = end - start
    if end + duration > times[-1]:
        return None
    offsets = np.linspace(0, duration, 17)
    return float(np.median(_pose_distances(_pose_at(times, values, start + offsets),
                                           _pose_at(times, values, end + offsets), groups)))


def _search_loops(times, values, channels, active, primary, max_loops=12):
    if primary is None or not active:
        return []
    groups = _groups_at(values, channels, active)
    if not groups:
        return []
    bpm = primary["bpm"]
    period = 60 / bpm
    # This phase is a kinematic hypothesis, never a claimed musical downbeat.
    begin = float(primary["beat_zero_seconds"])
    anchors = np.arange(begin, times[-1] - period, period)
    anchors = anchors[(anchors >= times[0])]
    results = []
    for beats in (1, 2, 4, 8, 16, 32):
        span = beats * period
        for start, end, pose, tangent, drift in _seam_batches(
                times, values, channels, groups, anchors, span):
            if pose > .32 or tangent > .6 or drift > .02:
                continue
            repeat = _repeat_cost(times, values, groups, float(start), end)
            quality = 1 / (1 + pose + .60 * tangent + .5 * (repeat if repeat is not None else 1))
            results.append({"start_seconds": round(float(start), 6),
                            "end_seconds": round(end, 6), "beats": beats,
                            "alignment": "estimated_motion_beat_grid",
                            "pose_mismatch": round(pose, 5),
                            "velocity_mismatch": round(tangent, 5),
                            "root_drift_relative": round(drift, 5),
                            "repeated_phrase_mismatch": round(repeat, 5) if repeat is not None else None,
                            "evidence": "repeated_and_seam" if repeat is not None and repeat < .25 else "seam_only",
                            "score": round(quality, 5), "requires_review": True,
                            "repaired": False})
    # Avoid flooding the review UI with dozens of identical shifts of one loop.
    results.sort(key=lambda v: (v["evidence"] != "repeated_and_seam", -v["score"], -v["beats"]))
    kept = []
    for candidate in results:
        if any(candidate["beats"] == old["beats"] and
               abs(candidate["start_seconds"] - old["start_seconds"]) < period * 1.2
               for old in kept):
            continue
        kept.append(candidate)
        if len(kept) >= max_loops:
            break
    return kept


def _pose_periods(times, values, active):
    """Find repeat periods in the *pose* signal, without requiring a BPM guess.

    An estimated bar clock is not necessary to identify that a two-second dance
    cycle is repeated. This intentionally uses a bounded, labelled first window
    and avoids treating very short-term smoothness as periodicity.
    """
    stop = min(float(times[-1]), float(times[0]) + 90.0)
    grid = np.arange(times[0], stop, .05)
    if len(grid) < 120:
        return [], [float(times[0]), float(stop)]
    features = []
    for bone, path, indices, _ in active[:128]:
        block = values[:, indices]
        center = np.median(block, axis=0)
        scale = np.percentile(np.linalg.norm(block - center, axis=1), 90)
        if scale < 1e-5:
            continue
        for j in indices:
            features.append(np.interp(grid, times, values[:, j]) / scale / math.sqrt(len(indices)))
    if not features:
        return [], [float(times[0]), float(stop)]
    feature_array = np.stack(features, axis=1)
    max_lag = min(round(12 / .05), len(grid) // 2)
    lags = np.arange(12, max_lag + 1)  # avoid sub-600ms smooth-motion false positives
    errors = []
    for lag in lags:
        changes = feature_array[lag:] - feature_array[:-lag]
        # Full clip-wide evidence penalises repeating only at one lucky seam.
        errors.append(float(np.mean(np.sqrt(np.sum(changes * changes, axis=1)))))
    peaks = []
    for i in range(1, len(errors) - 1):
        if errors[i] < .18 and errors[i] <= errors[i-1] and errors[i] < errors[i+1]:
            peaks.append((errors[i], round(float(lags[i]) * .05, 4)))
    peaks.sort()
    distinct = []
    for mismatch, period in peaks:
        if all(abs(period - p["seconds"]) >= .18 for p in distinct):
            distinct.append({"seconds": period, "trajectory_mismatch": round(mismatch, 5),
                             "source": "unquantized_pose_recurrence"})
        if len(distinct) >= 6:
            break
    return distinct, [round(float(grid[0]), 4), round(float(grid[-1]), 4)]


def _recurrence_windows(times, values, active):
    """Look for recurrent sections near the start, middle and end of long takes."""
    duration = float(times[-1] - times[0])
    starts = [float(times[0])]
    if duration > 90:
        # Windows are sampled, not claimed as complete clip-wide recurrence coverage.
        count = min(3, math.ceil(duration / 90))
        starts = np.linspace(times[0], times[-1] - 90, count)
    candidates = []
    inspected = []
    for start in starts:
        a = int(np.searchsorted(times, start, side="left"))
        b = int(np.searchsorted(times, start + 90, side="right"))
        if b - a < 2:
            continue
        periods, window = _pose_periods(times[a:b], values[a:b], active)
        inspected.append(window)
        candidates.extend(dict(candidate, search_window_seconds=window) for candidate in periods)
    candidates.sort(key=lambda item: item["trajectory_mismatch"])
    distinct = []
    for candidate in candidates:
        if all(abs(candidate["seconds"] - old["seconds"]) >= .18 for old in distinct):
            distinct.append(candidate)
        if len(distinct) == 6:
            break
    return distinct, inspected


def _independent_loops(times, values, channels, active, periods, *, max_loops=4):
    groups = _groups_at(values, channels, active)
    if not groups:
        return []
    loops = []
    for period in periods:
        duration = period["seconds"]
        starts = np.arange(times[0], times[-1] - duration + 1e-7, max(.1, duration / 16))
        for start, end, pose, tangent, root in _seam_batches(
                times, values, channels, groups, starts, duration):
            if pose > .32 or tangent > .60 or root > .02:
                continue
            repeated = _repeat_cost(times, values, groups, float(start), end)
            if repeated is not None and repeated > .30:
                continue
            quality = 1 / (1 + pose + .60 * tangent + .5 * (repeated if repeated is not None else 1))
            loops.append({"start_seconds": round(float(start), 6),
                          "end_seconds": round(end, 6), "beats": None,
                          "alignment": "pose_recurrence_only",
                          "periodicity_mismatch": period["trajectory_mismatch"],
                          "pose_mismatch": round(pose, 5),
                          "velocity_mismatch": round(tangent, 5),
                          "root_drift_relative": round(root, 5),
                          "repeated_phrase_mismatch": round(repeated, 5) if repeated is not None else None,
                          "evidence": "repeated_and_seam" if repeated is not None and repeated < .25 else "seam_only",
                          "score": round(quality, 5), "requires_review": True, "repaired": False})
    loops.sort(key=lambda d: (d["evidence"] != "repeated_and_seam", -d["score"]))
    selected = []
    for item in loops:
        if any(abs(item["start_seconds"] - seen["start_seconds"]) < .3 and
               abs(item["end_seconds"] - seen["end_seconds"]) < .3 for seen in selected):
            continue
        selected.append(item)
        if len(selected) >= max_loops:
            break
    return selected


def _beat_map(times, primary, *, source_hash):
    if primary is None:
        return None
    period = 60 / primary["bpm"]
    zero = primary["beat_zero_seconds"]
    starts = np.arange(zero, times[-1] + 1e-9, period)
    starts = starts[starts >= times[0] - 1e-9]
    if len(starts) < 2:
        return None
    return {"format": "dancerudiments.beat-map", "schema_version": 1,
            "pips_per_beat": 64, "interpolation": "linear",
            "anchors": [{"seconds": round(float(s), 9), "beat": int(i)} for i, s in enumerate(starts)],
            "source": "StemLab estimated kinematic tempo; source evidence SHA-256 " + source_hash,
            "bpm_status": "estimated", "phase_status": "estimated", "extrapolate": False}


def _analyze_poses(data, times, values, channels, digest, *, min_bpm, max_bpm,
                   source_kind="capture"):
    """Shared offline analysis for independently validated source-time poses."""
    if not 30 <= min_bpm < max_bpm <= 300 or max_bpm / min_bpm > 8:
        raise ValueError("Expected a bounded BPM range within 30..300")
    if (times.ndim != 1 or values.ndim != 2 or values.shape != (len(times), len(channels))
            or not 16 <= len(times) <= 200_000 or values.size > MAX_VALUES
            or not np.isfinite(times).all() or not np.isfinite(values).all()
            or not np.all(np.diff(times) > 0) or times[-1] - times[0] < 3
            or np.max(np.diff(times)) > .35):
        raise ValueError("Need at least three seconds of finite, continuous source poses")
    gap_limit = 3 * float(np.median(np.diff(times)))
    cuts = [0, *(np.flatnonzero(np.diff(times) > gap_limit) + 1).tolist(), len(times)]
    coverage = [[float(times[first]), float(times[last - 1])]
                for first, last in zip(cuts, cuts[1:])]
    energy, active, streams = _signals(times, values, channels)
    if energy is None:
        return {"format": FORMAT, "schema_version": 1, "source_file_sha256": digest,
                "source_kind": source_kind, "profile_sha256": data["profile_sha256"], "type_uri": data["type_uri"],
                "motion_accents": [], "bpm_candidates": [], "recommended_tempo": None,
                "estimated_beat_map": None, "loop_candidates": [], "active_controls": 0,
                "pose_period_candidates": [], "pose_period_search_seconds": None,
                "sample_rate_hz": None,
                "source_range_seconds": [float(times[0]), float(times[-1])],
                "source_valid_segments_seconds": coverage,
                "limitations": ["No varying continuous controls; tempo and loops cannot be inferred."]}
    t, envelope, fps = _resample(times, energy)
    accents = _accents(t, envelope, fps)
    aligned = [_resample(times, stream)[1] for stream in streams]
    candidates = _tempo_candidates(t, envelope, aligned, min_bpm, max_bpm)
    primary = candidates[0] if candidates and len(accents) >= 5 else None
    periods, inspected = _recurrence_windows(times, values, active)
    aligned_loops = _search_loops(times, values, channels, active, primary, max_loops=8)
    loops = aligned_loops + _independent_loops(times, values, channels, active, periods)
    limitations = ["Motion accents are not verified musical beats or beat 1.",
                   "Half/double tempo and choreography subdivisions are ambiguous.",
                   "Loop suggestions are not seam repairs or contact/skin deformation checks."]
    if primary is None:
        limitations.append("Insufficient consistent motion accents for a tempo hypothesis.")
    if len(inspected) > 1:
        limitations.append("Pose recurrence searches bounded start, middle and end windows; uninspected intervals may contain other periods.")
    return {"format": FORMAT, "schema_version": 1, "source_file_sha256": digest,
            "source_kind": source_kind, "profile_sha256": data["profile_sha256"], "type_uri": data["type_uri"],
            "sample_rate_hz": fps,
            "source_range_seconds": [float(times[0]), float(times[-1])],
            "source_valid_segments_seconds": coverage,
            "active_controls": len(active), "motion_accents": accents,
            "bpm_candidates": candidates, "recommended_tempo": primary,
            "estimated_beat_map": _beat_map(times, primary, source_hash=digest),
            "pose_period_candidates": periods,
            "pose_period_search_seconds": inspected[0] if inspected else None,
            "pose_period_search_windows_seconds": inspected,
            "loop_candidates": loops, "limitations": limitations}


def analyze_motion_channels(times, values, channels, *, source_sha256: str,
                            min_bpm: float = 60, max_bpm: float = 200) -> dict[str, Any]:
    """Analyse evaluated, finite source-time motion arrays without a JSON round trip.

    Callers own format decoding, units and the original source hash. Channels
    describe continuous controls grouped by bone and data path. Quaternion
    groups must be in array-index order and use the declared interpolation.
    This evidence is not a DanceRudiments rig capture and cannot be compiled
    or interpreted as a verified beat map or as a contact test.
    """
    if (not isinstance(source_sha256, str) or len(source_sha256) != 64
            or any(char not in "0123456789abcdef" for char in source_sha256)):
        raise ValueError("source_sha256 must be a lowercase SHA-256")
    times = np.asarray(times, dtype=np.float64)
    values = np.asarray(values, dtype=np.float64)
    if (values.ndim != 2 or times.ndim != 1 or values.shape != (len(times), len(channels))
            or not len(channels) or len(channels) > 4096 or values.size > MAX_VALUES):
        raise ValueError("Motion arrays do not match the bounded channel layout")
    groups = {}
    seen = set()
    for i, channel in enumerate(channels):
        if (not isinstance(channel, dict) or not isinstance(channel.get("bone"), str)
                or not isinstance(channel.get("data_path"), str)
                or channel.get("value_type", "float") not in ("float", "integer", "boolean")
                or channel.get("interpolation", "linear") not in ("linear", "step", "quaternion")
                or type(channel.get("array_index")) is not int
                or channel["array_index"] < (-1 if channel.get("interpolation") == "step" else 0)):
            raise ValueError("Invalid motion channel descriptor")
        if channel.get("value_type") in ("integer", "boolean") and not np.allclose(
                values[:, i], np.rint(values[:, i]), rtol=0, atol=1e-8):
            raise ValueError("Discrete motion channel contains fractional values")
        key = (channel["bone"], channel["data_path"])
        identity = (*key, channel["array_index"])
        if identity in seen:
            raise ValueError("Duplicate motion channel component")
        seen.add(identity)
        if channel["data_path"] == "rotation_quaternion":
            if channel.get("interpolation") != "quaternion":
                raise ValueError("Quaternion groups require quaternion interpolation")
            groups.setdefault(key, []).append(i)
    if groups:
        values = values.copy()
    for indices in groups.values():
        if [channels[i]["array_index"] for i in indices] != [0, 1, 2, 3]:
            raise ValueError("Incomplete quaternion group")
        q = values[:, indices]
        if np.any(np.abs(np.sum(q * q, axis=1) - 1) > 2e-5):
            raise ValueError("Non-unit quaternion in motion channels")
        flips = np.sum(q[1:] * q[:-1], axis=1) < 0
        signs = np.r_[1, np.cumprod(np.where(flips, -1, 1))]
        values[:, indices] = q * signs[:, None]
    metadata = {"profile_sha256": hashlib.sha256(_canonical(channels).encode("ascii")).hexdigest(),
                "type_uri": "stemlab:motion-channels/v1"}
    return _analyze_poses(metadata, times, values, channels, source_sha256,
                          min_bpm=min_bpm, max_bpm=max_bpm, source_kind="motion_channels")


def analyze_rig_capture(path: Path | str, *, min_bpm: float = 60, max_bpm: float = 200,
                        world_motion: Path | str | dict | None = None,
                        tempo_strategy: str = "consensus") -> dict[str, Any]:
    """Analyse the original physical RigCapture without changing its timing."""
    data, times, values, channels, digest = _read_capture(Path(path))
    report = _analyze_poses(data, times, values, channels, digest,
                            min_bpm=min_bpm, max_bpm=max_bpm)
    if world_motion is None:
        if tempo_strategy not in ("control", "consensus"):
            raise ValueError("World/contact tempo strategy requires a world-motion sidecar")
        return report
    from .rig_world_evidence import add_world_evidence, read_world_evidence
    world = read_world_evidence(world_motion, capture_sha256=digest,
                               profile_sha256=data["profile_sha256"],
                               type_uri=data["type_uri"], times=times)
    return add_world_evidence(report, world, data, times, values, channels,
                              min_bpm=min_bpm, max_bpm=max_bpm, tempo_strategy=tempo_strategy)


def select_rig_tempo_hypothesis(report: dict, *, family="consensus", candidate_index=0) -> dict:
    """Select a retained evidence family without confirming its musical timing."""
    from .rig_world_evidence import select_rig_tempo_hypothesis as select
    return select(report, family=family, candidate_index=candidate_index)


def write_rig_analysis(path: Path | str, report: dict, *, beat_map_path: Path | str | None = None):
    """Write only new files. The map is explicitly estimated, never confirmed."""
    report_path = Path(path)
    outputs = [(report_path, report)]
    if beat_map_path is not None:
        if report.get("estimated_beat_map") is None:
            raise ValueError("No supported motion tempo hypothesis; cannot export beat map")
        outputs.append((Path(beat_map_path), report["estimated_beat_map"]))
    resolved = [p.resolve() for p, _ in outputs]
    if len(set(resolved)) != len(resolved) or any(p.exists() for p, _ in outputs):
        raise FileExistsError("Output files must be distinct, new paths")
    for output, payload in outputs:
        output.parent.mkdir(parents=True, exist_ok=True)
        # 'x' is exclusive; no existing output is ever overwritten.
        with output.open("x", encoding="utf-8") as stream:
            json.dump(payload, stream, indent=2, allow_nan=False)
            stream.write("\n")
