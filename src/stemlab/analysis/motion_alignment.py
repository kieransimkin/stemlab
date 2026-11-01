"""Source-bound audio/motion event alignment; proposals never approve music timing.

NumPy-only event matching preserves detector timestamps, independent-family
lineage, missing coverage and half/double playback interpretations. Coordinates
are original source seconds. Revisions are separate, hash-bound review records.
"""
from __future__ import annotations

from copy import deepcopy
from datetime import datetime, timezone
import hashlib
import json
import math
from pathlib import Path

import numpy as np

EVENT_FORMAT = "stemlab.event-evidence.v1"
CLOCK_FORMAT = "stemlab.motion-clock-map.v1"
FORMAT = "stemlab.motion-alignment.v1"
REVIEW_FORMAT = "stemlab.motion-alignment-review.v1"
MAX_BYTES = 32 * 1024 * 1024
MAX_EVENTS = 6000
MAX_STREAMS = 24
MATCH_INDEX_SAMPLE = 64


def _number(value, label="value") -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValueError(f"{label} must be finite")
    return float(value)


def _label(value, label="name") -> str:
    if not isinstance(value, str) or not value.strip() or len(value) > 160:
        raise ValueError(f"{label} must be a nonempty string of at most 160 characters")
    return value


def _hash(value, label="SHA-256") -> str:
    if not isinstance(value, str) or len(value) != 64 or any(x not in "0123456789abcdef" for x in value):
        raise ValueError(f"{label} must be a lowercase SHA-256")
    return value


def _canonical(value) -> bytes:
    return json.dumps(value, sort_keys=True, separators=(",", ":"), ensure_ascii=True,
                      allow_nan=False).encode("ascii")


def document_hash(value) -> str:
    return hashlib.sha256(_canonical(value)).hexdigest()


def file_hash(path: Path | str) -> str:
    digest = hashlib.sha256()
    with Path(path).open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(block)
    return digest.hexdigest()


def read_document(path: Path | str) -> tuple[dict, str]:
    path = Path(path)
    if not path.is_file() or not 0 < path.stat().st_size <= MAX_BYTES:
        raise ValueError("Evidence JSON must be a nonempty file of at most 32 MiB")
    raw = path.read_bytes()

    def pairs(values):
        out = {}
        for key, value in values:
            if key in out:
                raise ValueError("Duplicate evidence JSON key")
            out[key] = value
        return out

    def constant(value):
        raise ValueError("Nonfinite JSON constant: " + value)

    data = json.loads(raw, object_pairs_hook=pairs, parse_constant=constant)
    if not isinstance(data, dict):
        raise ValueError("Evidence JSON must have an object root")
    return data, hashlib.sha256(raw).hexdigest()


def write_document(path: Path | str, document: dict) -> None:
    """Create a new output; validate serialization before opening the destination."""
    raw = json.dumps(document, indent=2, allow_nan=False) + "\n"
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("x", encoding="utf-8") as handle:
        handle.write(raw)


def _segments(raw, bounds, label="valid segments", *, allow_singletons=False) -> list[list[float]]:
    if not isinstance(raw, list) or not 1 <= len(raw) <= 256:
        raise ValueError(f"{label} needs 1..256 explicit intervals")
    out = []
    for pair in raw:
        if not isinstance(pair, (list, tuple)) or len(pair) != 2:
            raise ValueError(f"Invalid {label}")
        start, end = (_number(x, label) for x in pair)
        if (start < bounds[0] or end > bounds[1] or end < start
                or (end == start and not allow_singletons)):
            raise ValueError(f"{label} must be inside source bounds")
        if out and start <= out[-1][1]:
            raise ValueError(f"{label} must be ordered and disjoint")
        out.append([start, end])
    return out


def _inside(times, segments):
    times = np.asarray(times, dtype=float)
    mask = np.zeros(times.shape, dtype=bool)
    for start, end in segments:
        mask |= (times >= start) & (times <= end)
    return mask


def validate_event_evidence(document: dict, *, expected_kind: str | None = None) -> dict:
    """Return a validated copy; no events, ordinals or missing beats are inserted."""
    if (not isinstance(document, dict) or document.get("format") != EVENT_FORMAT
            or type(document.get("schema_version")) is not int or document["schema_version"] != 1):
        raise ValueError("Expected stemlab.event-evidence.v1 schema 1")
    result = deepcopy(document)
    kind = result.get("kind")
    if kind not in ("motion", "audio") or (expected_kind and kind != expected_kind):
        raise ValueError("Event evidence kind must match audio or motion")
    source = result.get("source")
    if not isinstance(source, dict):
        raise ValueError("Event evidence requires source identity and clock")
    _hash(source.get("sha256"), "source hash")
    _label(source.get("clock_id"), "source clock")
    bounds = source.get("seconds_range")
    if not isinstance(bounds, list) or len(bounds) != 2:
        raise ValueError("Source seconds_range must have two bounds")
    start, end = (_number(x, "source bounds") for x in bounds)
    if start < 0 or not 0 < end - start <= 86400:
        raise ValueError("Source range must be nonnegative and at most one day")
    source["seconds_range"] = [start, end]
    source["valid_segments_seconds"] = _segments(source.get("valid_segments_seconds"), [start, end])
    streams = result.get("streams")
    if not isinstance(streams, list) or len(streams) > MAX_STREAMS:
        raise ValueError("Event evidence supports at most 24 streams")
    seen = set()
    total = 0
    for stream in streams:
        if not isinstance(stream, dict):
            raise ValueError("Invalid event stream")
        identity = _label(stream.get("id"), "stream id")
        if identity in seen:
            raise ValueError("Duplicate event stream id")
        seen.add(identity)
        _label(stream.get("family"), "independent family")
        event_type = stream.get("event_type")
        if event_type not in ("observed_feature_peak", "model_inference", "human_annotation"):
            raise ValueError("Only source-observed peaks, saved model events or human annotations are alignable")
        events = stream.get("events")
        if not isinstance(events, list) or len(events) > MAX_EVENTS:
            raise ValueError("A stream supports at most 6000 events")
        total += len(events)
        if total > 24000:
            raise ValueError("At most 24000 events per source are supported")
        previous = -math.inf
        for event in events:
            if not isinstance(event, dict):
                raise ValueError("Invalid event")
            value = _number(event.get("seconds"), "event seconds")
            strength = _number(event.get("strength", 1.0), "event strength")
            if value <= previous or not _inside([value], source["valid_segments_seconds"])[0]:
                raise ValueError("Event times must be strictly increasing within valid source coverage")
            if not 0 <= strength <= 1:
                raise ValueError("Event strengths must be in [0,1]")
            if event.get("predicted", False) is not False:
                raise ValueError("Predicted grid points cannot be used as observed alignment events")
            event["seconds"], event["strength"] = value, strength
            previous = value
    return result


def make_event_evidence(*, kind: str, source_sha256: str, clock_id: str,
                        seconds_range, streams, valid_segments_seconds=None,
                        provenance=None) -> dict:
    return validate_event_evidence({
        "format": EVENT_FORMAT, "schema_version": 1, "kind": kind,
        "source": {"sha256": source_sha256, "clock_id": clock_id,
                   "seconds_range": list(seconds_range),
                   "valid_segments_seconds": (valid_segments_seconds if valid_segments_seconds is not None
                                               else [list(seconds_range)])},
        "streams": streams, "provenance": provenance or {},
        "music_timing_verified": False,
    })


def events_from_rig_report(report: dict, *, clock_id: str) -> dict:
    """Adapt actual detector accents; a regular estimated beat map is never used."""
    if report.get("format") != "stemlab.rig-motion-analysis":
        raise ValueError("Expected a rig-motion analysis report")
    source_hash = report.get("source_manifest_sha256", report.get("source_file_sha256"))
    bounds = report["source_range_seconds"]
    original = report.get("control_evidence", report)
    world = report.get("world_evidence")
    segments = (world.get("valid_segments_seconds") if isinstance(world, dict)
                else report.get("source_valid_segments_seconds"))
    singleton_count = 0
    if segments is not None:
        coverage = _segments(segments, bounds, allow_singletons=True)
        segments = [pair for pair in coverage if pair[1] > pair[0]]
        singleton_count = len(coverage) - len(segments)
        if not segments:
            raise ValueError("Motion alignment needs a source coverage interval with distinct timestamps; "
                             "isolated frames have no continuous time span")
    control_events = original.get("motion_accents", [])
    covered_events = ([event for event in control_events
                       if _inside([event["seconds"]], segments)[0]]
                      if segments is not None else control_events)
    streams = [{"id": "control_accents", "family": "rig_control_velocity",
                "event_type": "observed_feature_peak", "events": _unit_events(covered_events)}]
    if isinstance(world, dict):
        for item in world.get("event_streams", []):
            streams.append(deepcopy(item))
    return make_event_evidence(kind="motion", source_sha256=source_hash, clock_id=clock_id,
                              seconds_range=bounds, streams=streams,
                              valid_segments_seconds=segments,
                              provenance={"analysis_sha256": document_hash(report),
                                          "profile_sha256": report["profile_sha256"],
                                          "excluded_singleton_coverage_interval_count": singleton_count,
                                          "excluded_control_events_outside_coverage_count":
                                              len(control_events) - len(covered_events)})


def _unit_events(events) -> list[dict]:
    # Detector strengths have arbitrary scales; record one monotone normalization,
    # retaining original strengths for review. No timing is generated or shifted.
    raw = [(float(e["seconds"]), max(0.0, _number(e.get("strength", 1.0)))) for e in events]
    maximum = max((s for _, s in raw), default=1.0) or 1.0
    by_time = {}
    for seconds, strength in raw:
        by_time[seconds] = max(strength, by_time.get(seconds, 0.0))
    return [{"seconds": t, "strength": s / maximum, "original_strength": s}
            for t, s in sorted(by_time.items())]


def events_from_rhythm_report(report: dict, *, source_sha256: str, clock_id: str,
                              seconds_range=None, valid_segments_seconds=None) -> dict:
    """Import saved model detections or DP-selected observed onset timestamps.

    A saved model JSON hash identifies detector output, not its audio master;
    therefore an explicit audio source SHA is mandatory for that route.
    """
    if report.get("format") == "stemlab.rhythm-evidence.v1":
        input_data = report.get("input", {})
        if input_data.get("kind") == "audio" and input_data.get("sha256") != source_sha256:
            raise ValueError("Rhythm report belongs to a different audio source")
        bounds = seconds_range or input_data.get("source_seconds_range")
        streams = []
        for index, hypothesis in enumerate(report.get("hypotheses", [])):
            events = hypothesis.get("onset_aligned_beat_candidates_seconds")
            if not events:
                continue
            streams.append({"id": f"audio_onsets_{index}", "family": "audio_spectral_onsets",
                            "event_type": "observed_feature_peak",
                            "events": [{"seconds": v, "strength": 1.0} for v in events],
                            "feature": hypothesis.get("feature")})
        if not streams:
            raise ValueError("Report has no source-observed onset events; predicted grids are not alignable")
    elif isinstance(report.get("model"), str) and isinstance(report.get("beats"), list):
        if report["model"] == "consensus":
            raise ValueError("Use individual saved model runs with explicit provenance")
        bounds = seconds_range
        streams = [{"id": "saved_beats", "family": "audio_model:" + report["model"],
                    "event_type": "model_inference", "events": [
                        {"seconds": v, "strength": 1.0} for v in report["beats"]]}]
    else:
        raise ValueError("Expected rhythm evidence or an individual StemLab BeatResult")
    if bounds is None:
        raise ValueError("Explicit audio source bounds are required")
    return make_event_evidence(kind="audio", source_sha256=source_sha256,
                              clock_id=clock_id, seconds_range=bounds, streams=streams,
                              valid_segments_seconds=valid_segments_seconds,
                              provenance={"analysis_sha256": document_hash(report),
                                          "source_association": "explicit_caller_supplied"})


def _clock_mapping(document, motion, audio):
    if (not isinstance(document, dict) or document.get("format") != CLOCK_FORMAT
            or type(document.get("schema_version")) is not int or document["schema_version"] != 1):
        raise ValueError("An explicit stemlab.motion-clock-map.v1 is required")
    for kind, evidence in (("motion", motion), ("audio", audio)):
        if (document.get(kind + "_source_sha256") != evidence["source"]["sha256"]
                or document.get(kind + "_clock_id") != evidence["source"]["clock_id"]):
            raise ValueError("Clock mapping source hash or clock identity mismatch")
    if document.get("relationship") not in ("same_performance", "creative_retiming"):
        raise ValueError("Clock relationship must explicitly be same_performance or creative_retiming")
    for kind, evidence in (("motion", motion), ("audio", audio)):
        origin = _number(document.get(kind + "_origin_seconds"), "clock origin")
        if not _inside([origin], evidence["source"]["valid_segments_seconds"])[0]:
            raise ValueError("Clock origins must lie within valid source coverage")
    scale = _number(document.get("seconds_scale"), "seconds scale")
    if not .125 <= scale <= 8:
        raise ValueError("Clock scale must be between 0.125 and 8")
    return deepcopy(document)


def _times(stream):
    return np.array([e["seconds"] for e in stream["events"]], dtype=float)


def _positive(stream):
    return np.array([e["strength"] > 0 for e in stream["events"]], dtype=bool)


def _bounded_streams(evidence):
    """Keep eight representative streams, with explicit omission metadata."""
    ranked = sorted(evidence["streams"], key=lambda stream: (-int(_positive(stream).sum()), stream["id"]))
    selected, families = [], set()
    for stream in ranked:
        if stream["family"] not in families and _positive(stream).any():
            selected.append(stream)
            families.add(stream["family"])
        if len(selected) == 8:
            break
    for stream in ranked:
        if len(selected) >= 8:
            break
        if stream not in selected and _positive(stream).any():
            selected.append(stream)
    return {**evidence, "streams": selected}


def _matches(mapped, audio_times, tolerance):
    """Monotone nearest-event matching, with at most one match per original event."""
    if not len(mapped) or not len(audio_times):
        return []
    closest = np.searchsorted(audio_times, mapped)
    right = np.clip(closest, 0, len(audio_times) - 1)
    left = np.clip(closest - 1, 0, len(audio_times) - 1)
    nearest = np.where(np.abs(mapped - audio_times[left]) <= np.abs(mapped - audio_times[right]), left, right)
    selected = {}
    for i, j in enumerate(nearest):
        residual = float(mapped[i] - audio_times[j])
        if abs(residual) <= tolerance and (int(j) not in selected or abs(residual) < abs(selected[int(j)][2])):
            selected[int(j)] = (i, int(j), residual)
    return sorted(selected.values())


def _overlap_segments(motion_segments, audio_segments, slope, intercept):
    result = []
    for m0, m1 in motion_segments:
        for a0, a1 in audio_segments:
            start, end = max(m0, (a0 - intercept) / slope), min(m1, (a1 - intercept) / slope)
            if end > start:
                # Retain the exact validated audio bounds for generated-anchor
                # roundoff repair; reviewer-supplied mappings remain strict.
                result.append((start, end, a0, a1))
    return result


def _candidate_lags(motion_times, audio_times, slope, intercept, max_offset, resolution):
    if not len(motion_times) or not len(audio_times):
        return []
    # Fixed event/sample bounds keep long sparse files from causing an N*M allocation.
    ids = np.unique(np.linspace(0, len(motion_times) - 1, min(len(motion_times), 128)).astype(int))
    differences = []
    for t in motion_times[ids]:
        centre = slope * t + intercept
        start = np.searchsorted(audio_times, centre - max_offset, side="left")
        end = np.searchsorted(audio_times, centre + max_offset, side="right")
        if end > start:
            neighbours = audio_times[start:end]
            if len(neighbours) > 256:
                neighbours = neighbours[np.linspace(0, len(neighbours) - 1, 256).astype(int)]
            differences.extend((neighbours - centre).tolist())
    if not differences:
        return [0.0]
    bins = {}
    for delta in differences:
        key = round(delta / resolution)
        bins.setdefault(key, []).append(delta)
    ranked = sorted(bins, key=lambda key: (-len(bins[key]), abs(key), key))[:32]
    lags = [0.0]
    for key in ranked:
        nearby = bins[key] + bins.get(key - 1, []) + bins.get(key + 1, [])
        delta = float(np.median(nearby))
        if abs(delta) <= max_offset + 1e-9 and all(abs(delta - x) > resolution for x in lags):
            lags.append(delta)
    return lags


def _score_mapping(motion, audio, segments, mapper, tolerance):
    pairs = []
    families = {}
    for ms in motion["streams"]:
        mt = _times(ms)
        mp = _positive(ms)
        for aus in audio["streams"]:
            at = _times(aus)
            ap = _positive(aus)
            all_matches = []
            observed_motion = 0
            observed_audio = 0
            span = 0.0
            for seg in segments:
                m0, m1 = seg["motion_seconds_range"]
                a0, a1 = seg["audio_seconds_range"]
                mi = np.arange(np.searchsorted(mt, m0), np.searchsorted(mt, m1, side="right"))
                ai = np.arange(np.searchsorted(at, a0), np.searchsorted(at, a1, side="right"))
                mi, ai = mi[mp[mi]], ai[ap[ai]]
                observed_motion += len(mi)
                observed_audio += len(ai)
                mapped = mapper(mt[mi], seg)
                found = _matches(mapped, at[ai], tolerance)
                if len(found) >= 2:
                    span += float(mt[mi[found[-1][0]]] - mt[mi[found[0][0]]])
                all_matches.extend((int(mi[i]), int(ai[j]), residual) for i, j, residual in found)
            if not observed_motion or not observed_audio:
                continue
            count = len(all_matches)
            f_measure = 2 * count / (observed_motion + observed_audio)
            errors = [abs(p[2]) for p in all_matches]
            median = float(np.median(errors)) if errors else None
            score = f_measure * math.exp(-.5 * (median / tolerance) ** 2) if count >= 4 else 0.0
            covered = sum(seg["motion_seconds_range"][1] - seg["motion_seconds_range"][0] for seg in segments)
            span_fraction = min(1.0, span / covered) if covered else 0.0
            score *= math.sqrt(span_fraction)
            if span_fraction < .2:
                score = 0.0
            sample = (all_matches if count <= MATCH_INDEX_SAMPLE else
                      [all_matches[i] for i in np.linspace(0, count - 1, MATCH_INDEX_SAMPLE).astype(int)])
            record = {"motion_stream": ms["id"], "audio_stream": aus["id"],
                      "motion_family": ms["family"], "audio_family": aus["family"],
                      "matched_event_count": count, "motion_events_in_overlap": observed_motion,
                      "audio_events_in_overlap": observed_audio,
                      "motion_event_recall": count / observed_motion,
                      "audio_event_recall": count / observed_audio,
                      "event_f_measure": f_measure, "median_absolute_error_seconds": median,
                      "matched_span_fraction_of_overlap": span_fraction,
                      "p95_absolute_error_seconds": float(np.percentile(errors, 95)) if errors else None,
                      "score_uncalibrated": score,
                      "matched_event_indices": [[i, j] for i, j, _ in sample],
                      "matched_event_indices_sampled": count > MATCH_INDEX_SAMPLE}
            pairs.append(record)
            family = (ms["family"], aus["family"])
            if family not in families or score > families[family]["score_uncalibrated"]:
                families[family] = record
    supported = [p for p in families.values() if p["score_uncalibrated"] > 0]
    score = float(np.mean([p["score_uncalibrated"] for p in families.values()])) if families else 0.0
    summaries = [{k: v for k, v in p.items() if k not in ("matched_event_indices", "matched_event_indices_sampled")}
                 for p in families.values()]
    return {"score_uncalibrated": score, "stream_comparisons": pairs,
            "independent_family_comparisons": summaries,
            "supporting_family_pair_count": len(supported),
            "family_aggregation": "best_stream_per_family_pair; mean_across_family_pairs; no_decoder_voting"}


def _affine_segments(overlap, slope, intercept):
    result = []
    for m0, m1, lower, upper in overlap:
        def bounded_audio_boundary(seconds):
            product = slope * seconds
            value = product + intercept
            # Division followed by multiplication/addition can land a handful
            # of ULPs beyond an exact source boundary, especially near zero.
            # Only this internally generated endpoint receives the correction.
            tolerance = 8 * max(math.ulp(x) for x in (product, intercept, value, lower, upper))
            if value < lower and lower - value <= tolerance:
                value = lower
            elif value > upper and value - upper <= tolerance:
                value = upper
            if not lower <= value <= upper:
                raise ValueError("Generated affine boundary is outside source coverage")
            return value

        a0, a1 = bounded_audio_boundary(m0), bounded_audio_boundary(m1)
        if a1 <= a0:
            continue  # No representable audio interval after floating-point clipping.
        result.append({"motion_seconds_range": [m0, m1],
                       "audio_seconds_range": [a0, a1],
                       "anchors": [{"motion_seconds": m0, "audio_seconds": a0},
                                   {"motion_seconds": m1, "audio_seconds": a1}],
                       "anchor_kind": "estimated_transform_boundaries_not_detected_events"})
    return result


def _map_segment(times, segment):
    anchors = segment["anchors"]
    return np.interp(times, [a["motion_seconds"] for a in anchors],
                     [a["audio_seconds"] for a in anchors])


def _warp_path(mt, at, slope, intercept, band):
    """Sparse monotone event path with skips and local rate/acceleration guards.

    This estimates a time warp, not a new beat detector. Exact original event
    indices remain in the output. All work is bounded to a local time band.
    """
    if min(len(mt), len(at)) < 8 or max(len(mt), len(at)) > 2500:
        return []
    states = {}
    best = None
    for i, t in enumerate(mt):
        target = slope * t + intercept
        lo = np.searchsorted(at, target - band, side="left")
        hi = np.searchsorted(at, target + band, side="right")
        if hi - lo > 64:
            continue
        for j in range(int(lo), int(hi)):
            prior_error = abs(at[j] - target) / max(band, 1e-9)
            state = (1.0 - .1 * prior_error, 1, None, slope)
            for di in (1, 2, 3):
                if i < di:
                    break
                for dj in (1, 2, 3):
                    previous = states.get((i - di, j - dj))
                    if previous is None:
                        continue
                    rate = (at[j] - at[j - dj]) / (mt[i] - mt[i - di])
                    if not .5 <= rate / slope <= 2:
                        continue
                    acceleration = abs(math.log(rate / previous[3]))
                    if acceleration > math.log(1.4):
                        continue
                    reward = 1 - .18 * (di + dj - 2) - .4 * acceleration - .12 * abs(math.log(rate / slope))
                    reward -= .03 * prior_error
                    proposal = (previous[0] + reward, previous[1] + 1, (i - di, j - dj), rate)
                    if proposal[0] > state[0]:
                        state = proposal
            states[(i, j)] = state
            if best is None or state[0] > states[best][0]:
                best = (i, j)
    if best is None or states[best][1] < 8:
        return []
    path = []
    while best is not None:
        path.append(best)
        best = states[best][2]
    return path[::-1]


def _variable_candidate(base, motion, audio, tolerance, max_offset):
    pairs = base["stream_comparisons"]
    if not pairs:
        return None
    strongest = max(pairs, key=lambda p: (p["score_uncalibrated"], p["matched_event_count"]))
    ms = next(s for s in motion["streams"] if s["id"] == strongest["motion_stream"])
    aus = next(s for s in audio["streams"] if s["id"] == strongest["audio_stream"])
    mt, at = _times(ms), _times(aus)
    slope, intercept = base["audio_seconds_per_motion_second"], base["intercept_seconds"]
    segments, heldout_errors, matched = [], [], []
    for bounded in base["mapping_segments"]:
        m0, m1 = bounded["motion_seconds_range"]
        a0, a1 = bounded["audio_seconds_range"]
        mi = np.flatnonzero((mt >= m0) & (mt <= m1) & _positive(ms))
        ai = np.flatnonzero((at >= a0) & (at <= a1) & _positive(aus))
        path = _warp_path(mt[mi], at[ai], slope, intercept, max(tolerance * 4, max_offset))
        if len(path) < 8:
            continue
        # Fit every other observed correspondence; assess unused event pairs.
        anchors_idx = sorted(set([0, len(path) - 1, *range(0, len(path), 2)]))
        anchors = [{"motion_seconds": float(mt[mi[path[k][0]]]),
                    "audio_seconds": float(at[ai[path[k][1]]]),
                    "motion_event_index": int(mi[path[k][0]]),
                    "audio_event_index": int(ai[path[k][1]])} for k in anchors_idx]
        segment = {"motion_seconds_range": [anchors[0]["motion_seconds"], anchors[-1]["motion_seconds"]],
                   "audio_seconds_range": [anchors[0]["audio_seconds"], anchors[-1]["audio_seconds"]],
                   "anchors": anchors, "anchor_kind": "matched_observed_event_correspondences"}
        for k, (i, j) in enumerate(path):
            matched.append([int(mi[i]), int(ai[j])])
            if k not in anchors_idx:
                heldout_errors.append(abs(float(_map_segment([mt[mi[i]]], segment)[0]) - float(at[ai[j]])))
        segments.append(segment)
    if not segments or len(heldout_errors) < 3:
        return None
    score = _score_mapping(motion, audio, segments, _map_segment, tolerance)
    full_duration = sum(b - a for a, b in motion["source"]["valid_segments_seconds"])
    coverage = sum(s["motion_seconds_range"][1] - s["motion_seconds_range"][0] for s in segments) / full_duration
    score["score_uncalibrated"] *= math.sqrt(coverage)
    # The interpolation fit alone is not evidence of musical synchrony. Require
    # held-out temporal support and disclose that path selection saw all events.
    heldout_p95 = float(np.percentile(heldout_errors, 95))
    if heldout_p95 > tolerance or score["score_uncalibrated"] <= base["score_uncalibrated"] + .05:
        return None
    result = {"method": "bounded_monotone_event_path", "mapping_segments": segments,
              "starting_affine_candidate": base["candidate_id"],
              "rate_multiplier": base["rate_multiplier"],
              "motion_coverage_fraction": coverage,
              "fit_motion_stream": ms["id"], "fit_audio_stream": aus["id"],
              "matched_event_indices": matched,
              "interpolation_check": {"unused_anchor_pair_count": len(heldout_errors),
                                      "p95_error_seconds": heldout_p95,
                                      "independent_test_set": False,
                                      "note": "Pairs were excluded from anchors, but path selection used all events."},
              "requires_review": True, "music_timing_verified": False, **score}
    result["candidate_id"] = "warp-" + document_hash(result)[:16]
    return result


def align_motion_audio(motion: dict, audio: dict, clock_mapping: dict, *,
                       motion_source: Path | str, audio_source: Path | str,
                       max_offset_seconds: float = 2.0, tolerance_seconds: float = .07,
                       rate_multipliers=(.5, 1.0, 2.0), variable_tempo: bool = True) -> dict:
    """Rank source-bound timing proposals without modifying/approving either input."""
    motion = validate_event_evidence(motion, expected_kind="motion")
    audio = validate_event_evidence(audio, expected_kind="audio")
    motion_digest, audio_digest = document_hash(motion), document_hash(audio)
    mapping = _clock_mapping(clock_mapping, motion, audio)
    if type(variable_tempo) is not bool:
        raise ValueError("variable_tempo must be an explicit boolean")
    for evidence, path in ((motion, motion_source), (audio, audio_source)):
        if file_hash(path) != evidence["source"]["sha256"]:
            raise ValueError("Source bytes no longer match event evidence SHA-256")
    selections = {}
    for kind, evidence in (("motion", motion), ("audio", audio)):
        bounded = _bounded_streams(evidence)
        selected_ids = [s["id"] for s in bounded["streams"]]
        selections[kind] = {"selected_stream_ids": selected_ids,
                            "omitted_stream_ids": [s["id"] for s in evidence["streams"] if s["id"] not in selected_ids],
                            "rule": "up_to_eight; distinct_families_first_then_positive_event_count"}
        if kind == "motion":
            motion = bounded
        else:
            audio = bounded
    tolerance = _number(tolerance_seconds, "event tolerance")
    max_offset = _number(max_offset_seconds, "offset search radius")
    if not .005 <= tolerance <= .25 or not 0 <= max_offset <= 30:
        raise ValueError("Tolerance must be 5..250 ms and offset radius 0..30 seconds")
    rates = sorted(set(_number(x, "rate multiplier") for x in rate_multipliers))
    if not rates or len(rates) > 9 or any(x < .25 or x > 4 for x in rates):
        raise ValueError("Provide 1..9 rate multipliers within [0.25,4]")
    candidates = []
    for multiplier in rates:
        slope = mapping["seconds_scale"] * multiplier
        initial = mapping["audio_origin_seconds"] - slope * mapping["motion_origin_seconds"]
        proposal_bins = {}
        for ms in motion["streams"]:
            for aus in audio["streams"]:
                lags = _candidate_lags(_times(ms)[_positive(ms)], _times(aus)[_positive(aus)], slope, initial,
                                       max_offset, max(.005, tolerance / 2))
                for order, lag in enumerate(lags):
                    key = round(lag / max(.005, tolerance / 2))
                    entry = proposal_bins.setdefault(key, {"values": [], "support": {}})
                    entry["values"].append(lag)
                    family = (ms["family"], aus["family"])
                    entry["support"][family] = max(entry["support"].get(family, 0), 1 / (1 + order))
        ranked_bins = sorted(proposal_bins, key=lambda key: (-sum(proposal_bins[key]["support"].values()), abs(key)))[:32]
        proposals = [float(np.median(proposal_bins[key]["values"])) for key in ranked_bins]
        # Evaluate all supported lags, then retain maxima separated by tolerance.
        for delta in proposals:
            intercept = initial + delta
            overlap = _overlap_segments(motion["source"]["valid_segments_seconds"],
                                        audio["source"]["valid_segments_seconds"], slope, intercept)
            duration = sum(end - start for start, end, _, _ in overlap)
            if duration <= 0:
                continue
            segments = _affine_segments(overlap, slope, intercept)
            scored = _score_mapping(motion, audio, segments, _map_segment, tolerance)
            if scored["supporting_family_pair_count"] == 0 or scored["score_uncalibrated"] < .2:
                continue
            source_duration = sum(b - a for a, b in motion["source"]["valid_segments_seconds"])
            overlap_fraction = duration / source_duration
            # A tiny perfect overlap must not outrank most of a coherent action.
            scored["score_uncalibrated"] *= math.sqrt(overlap_fraction)
            candidate = {"method": "affine_event_match", "rate_multiplier": multiplier,
                         "audio_seconds_per_motion_second": slope,
                         "playback_rate_motion_seconds_per_audio_second": 1 / slope,
                         "intercept_seconds": intercept,
                         "offset_adjustment_seconds": delta,
                         "mapping_segments": segments,
                         "motion_coverage_fraction": overlap_fraction,
                         "requires_review": True, "music_timing_verified": False, **scored}
            candidate["candidate_id"] = "affine-" + document_hash(candidate)[:16]
            candidates.append(candidate)
    candidates.sort(key=lambda c: (-c["score_uncalibrated"], abs(c["rate_multiplier"] - 1),
                                  abs(c["offset_adjustment_seconds"])))
    selected = []
    for candidate in candidates:
        if any(old["rate_multiplier"] == candidate["rate_multiplier"] and
               abs(old["intercept_seconds"] - candidate["intercept_seconds"]) < tolerance
               for old in selected):
            continue
        selected.append(candidate)
        if len(selected) >= 18:
            break
    if variable_tempo:
        warps = []
        for candidate in selected[:6]:
            warp = _variable_candidate(candidate, motion, audio, tolerance, max_offset)
            if warp is not None:
                warps.append(warp)
        selected.extend(warps)
        selected.sort(key=lambda c: -c["score_uncalibrated"])
    best_score = selected[0]["score_uncalibrated"] if selected else 0.0
    ambiguous = [c["candidate_id"] for c in selected if c["score_uncalibrated"] >= best_score - .035]
    periodic_aliases = []
    if selected and selected[0]["method"] == "affine_event_match":
        best = selected[0]
        strongest = max(best["stream_comparisons"], key=lambda p: p["score_uncalibrated"])
        stream = next(s for s in audio["streams"] if s["id"] == strongest["audio_stream"])
        intervals = np.diff(_times(stream)[_positive(stream)])
        if len(intervals) >= 4:
            period = float(np.median(intervals))
            relative = intervals / period
            periodic = float(np.mean(np.abs(relative - np.rint(relative)) < .08)) >= .9
            if periodic:
                for candidate in selected[1:]:
                    if candidate["method"] != "affine_event_match" or candidate["rate_multiplier"] != best["rate_multiplier"]:
                        continue
                    cycles = (candidate["intercept_seconds"] - best["intercept_seconds"]) / period
                    if (abs(cycles) > .5 and abs(cycles - round(cycles)) < .08
                            and candidate["score_uncalibrated"] >= .8 * best_score):
                        periodic_aliases.append(candidate["candidate_id"])
                        if candidate["candidate_id"] not in ambiguous:
                            ambiguous.append(candidate["candidate_id"])
    return {"format": FORMAT, "schema_version": 1,
            "motion_source": deepcopy(motion["source"]), "audio_source": deepcopy(audio["source"]),
            "motion_evidence_sha256": motion_digest, "audio_evidence_sha256": audio_digest,
            "stream_selection": selections,
            "source_bytes_verified": True, "clock_mapping": mapping,
            "search": {"max_offset_seconds": max_offset, "tolerance_seconds": tolerance,
                       "rate_multipliers": rates, "variable_tempo": variable_tempo},
            "work_limits": {"offset_candidates_per_rate": 32, "streams_per_source": 8,
                            "displayed_event_index_pairs_per_stream_comparison": MATCH_INDEX_SAMPLE,
                            "variable_path_max_events_per_stream_segment": 2500},
            "candidates": selected,
            "result_status": ("insufficient_event_support" if not selected else
                              "ambiguous_candidates_require_review" if len(ambiguous) > 1 else
                              "candidate_requires_review"),
            "ambiguity_candidate_ids": ambiguous if len(ambiguous) > 1 else [],
            "periodic_lag_alias_candidate_ids": periodic_aliases,
            "selected_candidate_id": None, "music_timing_verified": False,
            "notes": ["Observed motion pulses are not automatically musical beats or beat one.",
                      "Rate hypotheses remain separate from half/double musical beat interpretations.",
                      "Missing source coverage is not interpolated or extrapolated.",
                      "Scores are uncalibrated agreement of events, not probability or musical quality.",
                      "Root placement, foot sliding and retargeted skin seams need separate validation."]}


def map_motion_seconds(candidate: dict, seconds) -> np.ndarray:
    """Map only covered source times; return NaN in gaps or outside the candidate."""
    times = np.asarray(seconds, dtype=float)
    if not np.isfinite(times).all():
        raise ValueError("Mapping times must be finite")
    output = np.full(times.shape, np.nan, dtype=float)
    for segment in candidate.get("mapping_segments", []):
        start, end = segment["motion_seconds_range"]
        mask = (times >= start) & (times <= end)
        output[mask] = _map_segment(times[mask], segment)
    return output


def _validate_review_segments(segments, motion_source, audio_source):
    if not isinstance(segments, list) or not 1 <= len(segments) <= 256:
        raise ValueError("Reviewed mapping needs 1..256 explicit segments")
    previous_m = previous_a = -math.inf
    for segment in segments:
        if not isinstance(segment, dict):
            raise ValueError("Invalid mapping segment")
        anchors = segment.get("anchors")
        if not isinstance(anchors, list) or not 2 <= len(anchors) <= 6000:
            raise ValueError("A mapping segment needs 2..6000 anchors")
        m = [_number(a.get("motion_seconds"), "mapping motion anchor") for a in anchors]
        a = [_number(p.get("audio_seconds"), "mapping audio anchor") for p in anchors]
        if (any(y <= x for x, y in zip(m, m[1:])) or any(y <= x for x, y in zip(a, a[1:]))
                or m[0] <= previous_m or a[0] <= previous_a):
            raise ValueError("Mapping anchors and segments must increase in both clocks")
        if (segment.get("motion_seconds_range") != [m[0], m[-1]]
                or segment.get("audio_seconds_range") != [a[0], a[-1]]):
            raise ValueError("Mapping bounds must match the outer anchors")
        for source, positions in ((motion_source, m), (audio_source, a)):
            if not any(lo <= positions[0] <= positions[-1] <= hi
                       for lo, hi in source["valid_segments_seconds"]):
                raise ValueError("Mapping cannot cross a source boundary or coverage gap")
        previous_m, previous_a = m[-1], a[-1]


def validate_alignment_revision(report: dict, revision: dict, *, report_sha256: str | None = None) -> dict:
    """Check a saved/UI-authored revision before using its source-clock mapping."""
    if (report.get("format") != FORMAT or revision.get("format") != REVIEW_FORMAT
            or report.get("schema_version") != 1 or revision.get("schema_version") != 1):
        raise ValueError("Unknown alignment report or review schema")
    if report_sha256 is not None and revision.get("report_sha256") != _hash(report_sha256):
        raise ValueError("Revision exact report file hash mismatch")
    if revision.get("report_content_sha256") != document_hash(report):
        raise ValueError("Revision report content hash mismatch")
    for kind in ("motion", "audio"):
        if revision.get(kind + "_source_sha256") != report[kind + "_source"]["sha256"]:
            raise ValueError("Revision source identity mismatch")
    candidates = [c for c in report.get("candidates", []) if c.get("candidate_id") == revision.get("candidate_id")]
    if len(candidates) != 1:
        raise ValueError("Revision refers to an unknown candidate")
    _label(revision.get("reviewer"), "reviewer")
    if type(revision.get("revision")) is not int or revision["revision"] < 1:
        raise ValueError("Review revision must be a positive integer")
    if revision["revision"] == 1:
        if revision.get("previous_revision_sha256") is not None:
            raise ValueError("First review cannot reference a previous revision")
    else:
        _hash(revision.get("previous_revision_sha256"), "previous revision hash")
    try:
        stamp = revision.get("reviewed_at", "")
        if not isinstance(stamp, str):
            raise ValueError("Review timestamp must be text")
        # JavaScript review surfaces emit a terminal Z; support Python 3.10 too.
        timestamp = datetime.fromisoformat(stamp[:-1] + "+00:00" if stamp.endswith("Z") else stamp)
    except (ValueError, TypeError) as exc:
        raise ValueError("Review timestamp must be an ISO timestamp with timezone") from exc
    if timestamp.tzinfo is None:
        raise ValueError("Review timestamp must include a timezone")
    decision = revision.get("decision")
    if decision not in ("accept_mapping", "reject", "needs_review"):
        raise ValueError("Unknown review decision")
    status = "user_confirmed" if decision == "accept_mapping" else decision
    if revision.get("mapping_status") != status:
        raise ValueError("Review status contradicts its decision")
    if decision == "accept_mapping":
        _validate_review_segments(revision.get("mapping_segments"), report["motion_source"], report["audio_source"])
    elif revision.get("mapping_segments") != []:
        raise ValueError("Rejected or unresolved revision cannot supply an accepted mapping")
    beat_one = revision.get("beat_one_audio_seconds")
    expected = "user_confirmed" if beat_one is not None else "unconfirmed"
    if revision.get("beat_one_status") != expected:
        raise ValueError("Beat-one status contradicts its explicit confirmation")
    if beat_one is not None:
        if decision != "accept_mapping" or not _inside([_number(beat_one)], report["audio_source"]["valid_segments_seconds"])[0]:
            raise ValueError("Confirmed beat one is outside source coverage or not accepted")
    meter = revision.get("meter")
    if revision.get("meter_status") != ("user_confirmed" if meter is not None else "unconfirmed"):
        raise ValueError("Meter status contradicts its explicit confirmation")
    if meter is not None and (decision != "accept_mapping" or not isinstance(meter, list)
                              or len(meter) != 2 or any(type(x) is not int for x in meter)
                              or not 1 <= meter[0] <= 32 or meter[1] not in (1, 2, 4, 8, 16, 32)):
        raise ValueError("Invalid confirmed meter")
    if revision.get("loop_seams_verified") is not False or revision.get("retargeting_verified") is not False:
        raise ValueError("Timing review cannot approve loop seams or retargeted geometry")
    return deepcopy(revision)


def create_alignment_revision(report: dict, *, report_sha256: str, candidate_id: str,
                              reviewer: str, decision: str = "accept_mapping",
                              beat_one_audio_seconds: float | None = None,
                              meter: tuple[int, int] | None = None,
                              manual_anchors: list[dict] | None = None,
                              previous_revision: dict | None = None) -> dict:
    """Record explicit review separately. Never turns an algorithm score into approval."""
    if report.get("format") != FORMAT or report.get("schema_version") != 1:
        raise ValueError("Expected a motion alignment report")
    _hash(report_sha256, "exact report file hash")
    _label(reviewer, "reviewer")
    if decision not in ("accept_mapping", "reject", "needs_review"):
        raise ValueError("Decision must be accept_mapping, reject or needs_review")
    candidate = next((c for c in report.get("candidates", []) if c["candidate_id"] == candidate_id), None)
    if candidate is None:
        raise ValueError("Unknown alignment candidate")
    _validate_review_segments(candidate.get("mapping_segments"), report["motion_source"], report["audio_source"])
    if decision != "accept_mapping" and (beat_one_audio_seconds is not None or meter is not None or manual_anchors):
        raise ValueError("Timing confirmations require explicit accept_mapping")
    selected = deepcopy(candidate)
    if manual_anchors is not None:
        if not isinstance(manual_anchors, list) or not 2 <= len(manual_anchors) <= 2000:
            raise ValueError("Manual mapping needs 2..2000 source-bound anchors")
        anchors = []
        for item in manual_anchors:
            m = _number(item.get("motion_seconds"), "manual motion time")
            a = _number(item.get("audio_seconds"), "manual audio time")
            if (not _inside([m], report["motion_source"]["valid_segments_seconds"])[0]
                    or not _inside([a], report["audio_source"]["valid_segments_seconds"])[0]):
                raise ValueError("Manual anchors must lie in valid source coverage")
            if anchors and (m <= anchors[-1]["motion_seconds"] or a <= anchors[-1]["audio_seconds"]):
                raise ValueError("Manual anchors must be strictly increasing in both source clocks")
            anchors.append({"motion_seconds": m, "audio_seconds": a})
        # Refuse connecting anchors across unknown source spans. A reviewer can
        # accept separate candidates/segments instead of hiding missing footage.
        for first, last in zip(anchors, anchors[1:]):
            for source, key in (("motion_source", "motion_seconds"), ("audio_source", "audio_seconds")):
                if not any(lo <= first[key] <= last[key] <= hi
                           for lo, hi in report[source]["valid_segments_seconds"]):
                    raise ValueError("Manual anchors cannot bridge a source coverage gap")
        selected["mapping_segments"] = [{"motion_seconds_range": [anchors[0]["motion_seconds"], anchors[-1]["motion_seconds"]],
                                         "audio_seconds_range": [anchors[0]["audio_seconds"], anchors[-1]["audio_seconds"]],
                                         "anchors": anchors, "anchor_kind": "user_confirmed_correspondences"}]
    if beat_one_audio_seconds is not None:
        beat_one_audio_seconds = _number(beat_one_audio_seconds, "beat one")
        if not _inside([beat_one_audio_seconds], report["audio_source"]["valid_segments_seconds"])[0]:
            raise ValueError("Beat one must lie within valid audio coverage")
    if meter is not None:
        if (len(meter) != 2 or any(type(x) is not int for x in meter)
                or not 1 <= meter[0] <= 32 or meter[1] not in (1, 2, 4, 8, 16, 32)):
            raise ValueError("Meter needs numerator 1..32 and power-of-two denominator")
    previous_hash = None
    revision = 1
    if previous_revision is not None:
        if (previous_revision.get("format") != REVIEW_FORMAT
                or previous_revision.get("report_sha256") != report_sha256):
            raise ValueError("Previous revision belongs to a different alignment report")
        validate_alignment_revision(report, previous_revision, report_sha256=report_sha256)
        previous_hash = document_hash(previous_revision)
        revision = previous_revision["revision"] + 1
    result = {"format": REVIEW_FORMAT, "schema_version": 1, "revision": revision,
            "previous_revision_sha256": previous_hash, "report_sha256": report_sha256,
            "report_content_sha256": document_hash(report),
            "motion_source_sha256": report["motion_source"]["sha256"],
            "audio_source_sha256": report["audio_source"]["sha256"],
            "candidate_id": candidate_id, "decision": decision,
            "reviewer": reviewer, "reviewed_at": datetime.now(timezone.utc).isoformat(),
            "mapping_status": "user_confirmed" if decision == "accept_mapping" else decision,
            "mapping_segments": selected["mapping_segments"] if decision == "accept_mapping" else [],
            "beat_one_audio_seconds": beat_one_audio_seconds,
            "beat_one_status": "user_confirmed" if beat_one_audio_seconds is not None else "unconfirmed",
            "meter": list(meter) if meter is not None else None,
            "meter_status": "user_confirmed" if meter is not None else "unconfirmed",
            "loop_seams_verified": False, "retargeting_verified": False}
    return validate_alignment_revision(report, result, report_sha256=report_sha256)
