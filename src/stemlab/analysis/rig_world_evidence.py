"""Validate DanceRudiments world-space sidecars and compare their motion pulses.

DanceRudiments owns skeletal transforms. StemLab consumes the exact source-bound
JSON and keeps contact heuristics, world kinematics and control-space evidence
separate. None of these streams constitute musical ground truth.
"""
from __future__ import annotations

from copy import deepcopy
import math
from pathlib import Path

import numpy as np

from .motion_alignment import _inside, _number, _segments, _unit_events, document_hash, read_document

WORLD_FORMAT = "dancerudiments.world-motion-evidence"
FAMILIES = {"world_joint_velocity", "root_relative_joint_velocity",
            "body_height_proxy", "contact_hypotheses"}


def read_world_evidence(value, *, capture_sha256, profile_sha256, type_uri, times):
    if isinstance(value, (str, Path)):
        report, digest = read_document(value)
    elif isinstance(value, dict):
        report, digest = deepcopy(value), document_hash(value)
    else:
        raise ValueError("World motion must be a JSON path or document")
    if (report.get("format") != WORLD_FORMAT or type(report.get("schema_version")) is not int
            or report["schema_version"] != 1 or report.get("supported") is not True):
        raise ValueError("Expected supported dancerudiments.world-motion-evidence schema 1")
    def canonical_type(value):
        return "syn://" + value[8:] if isinstance(value, str) and value.startswith("synny://") else value
    if (report.get("source_file_sha256") != capture_sha256
            or report.get("profile_sha256") != profile_sha256 or canonical_type(report.get("type_uri")) != canonical_type(type_uri)):
        raise ValueError("World motion source hash, rig profile or semantic type mismatch")
    if report.get("requires_review") is not True or report.get("musical_timing_verified") is not False:
        raise ValueError("World evidence must remain an unverified motion hypothesis")
    source_times = np.asarray(report.get("frame_times_seconds"), dtype=float)
    if source_times.shape != times.shape or not np.array_equal(source_times, times):
        raise ValueError("World evidence must preserve every original source timestamp")
    if (report.get("source_start_seconds") != float(times[0])
            or report.get("source_end_seconds") != float(times[-1])):
        raise ValueError("World evidence source range mismatch")
    segments = _segments(report.get("validity_segments_seconds"), [float(times[0]), float(times[-1])],
                         allow_singletons=True)
    # A sidecar cannot conceal a missing sample or erase a source gap. Every
    # capture frame must have coverage, and intervals cannot bridge large gaps.
    if not _inside(times, segments).all():
        raise ValueError("World evidence omitted source frames from validity coverage")
    step = float(np.median(np.diff(times)))
    for left, right in zip(times, times[1:]):
        if right - left > 3 * step and any(a <= left < right <= b for a, b in segments):
            raise ValueError("World coverage bridges a source sampling gap")
    basis = report.get("coordinate_basis", {})
    if (not isinstance(basis, dict) or basis.get("up_axis") not in ("Y", "Z")
            or basis.get("units") not in ("source_units", "metres")):
        raise ValueError("World evidence requires explicit supported axes and units")
    scale = _number(report.get("body_scale"), "world body scale")
    if scale <= 0:
        raise ValueError("World body scale must be positive")
    roots = np.asarray(report.get("root_positions"), dtype=float)
    if roots.shape != (len(times), 3) or not np.isfinite(roots).all():
        raise ValueError("World root positions must be finite vectors on every source frame")
    envelopes = report.get("envelopes")
    if not isinstance(envelopes, dict):
        raise ValueError("World evidence requires motion envelopes")
    for name in ("world_speed", "root_relative_speed", "body_height_proxy", "root_speed"):
        values = np.asarray(envelopes.get(name), dtype=float)
        if values.shape != times.shape or not np.isfinite(values).all():
            raise ValueError("World envelopes must be finite and match the source frame count")
    accents = report.get("motion_accents")
    if not isinstance(accents, list) or len(accents) > len(times) * 8:
        raise ValueError("Invalid world accent list")
    for event in accents:
        if (not isinstance(event, dict) or event.get("family") not in FAMILIES
                or not _inside([_number(event.get("seconds"))], segments)[0]
                or _number(event.get("strength")) < 0):
            raise ValueError("Invalid or out-of-source world motion event")
    feet = report.get("foot_keypoints")
    if not isinstance(feet, list) or len(feet) > 16:
        raise ValueError("At most sixteen foot keypoints are supported")
    names = set()
    for foot in feet:
        if not isinstance(foot, dict):
            raise ValueError("World foot keypoints must be objects")
        name = foot.get("bone")
        if not isinstance(name, str) or not name or name in names:
            raise ValueError("World foot names must be unique")
        names.add(name)
        state = foot.get("contact_state")
        if not isinstance(state, list) or len(state) != len(times) or not all(type(x) is bool for x in state):
            raise ValueError("World foot contact states must be booleans on source frames")
        for field in ("height_above_estimated_floor", "planar_speed"):
            values = np.asarray(foot.get(field), dtype=float)
            if values.shape != times.shape or not np.isfinite(values).all() or np.any(values < 0):
                raise ValueError("World foot diagnostics must be finite nonnegative source arrays")
        if ("maximum_low_height_stance_drift_relative" in foot
                and _number(foot["maximum_low_height_stance_drift_relative"], "stance drift") < 0):
            raise ValueError("World stance drift must be nonnegative")
    contacts = report.get("contact_events")
    if not isinstance(contacts, list) or len(contacts) > len(times) * 16:
        raise ValueError("Invalid contact events")
    for event in contacts:
        if (not isinstance(event, dict) or event.get("bone") not in names
                or event.get("kind") not in ("foot_plant", "toe_off")
                or not _inside([_number(event.get("seconds"))], segments)[0]
                or not 0 <= _number(event.get("strength")) <= 1):
            raise ValueError("Invalid source-bound contact event")
    report["validated_sidecar_sha256"] = digest
    return report


def _event_tempos(events, times, min_bpm, max_bpm):
    from .rig_motion import _tempo_candidates
    from .tempo_regimes import constant_beat_fit, missing_detection_fit

    if len(events) < 5 or events[-1]["seconds"] - events[0]["seconds"] < 2:
        return []
    grid = np.arange(times[0], times[-1] + .00001, .01)
    if len(grid) > 200000:
        raise ValueError("World pulse analysis exceeds bounded timeline length")
    curve = np.zeros(len(grid))
    for event in events:
        index = int(round((event["seconds"] - times[0]) / .01))
        if 0 <= index < len(curve):
            curve[index] = max(curve[index], event["strength"])
    kernel = np.exp(-.5 * (np.arange(-6, 7) / 2.0) ** 2)
    smooth = np.convolve(curve, kernel, mode="same")
    candidates = _tempo_candidates(grid, smooth, [smooth], min_bpm, max_bpm)
    observed = np.asarray([e["seconds"] for e in events], dtype=float)
    # Refine the 0.5-BPM correlation bin using original event times, with the
    # shared constant-grid fit and its endpoint guard. No new observations or
    # beat-one labels are generated; half/double pulse readings remain explicit.
    fits = [(constant_beat_fit(observed), np.arange(len(observed)), "sequential_events")]
    missed = missing_detection_fit(observed)
    if missed is not None:
        fits.append((missed, np.asarray(missed["inferred_beat_indexes"]), "inferred_integer_event_gaps"))
    accepted = []
    for fit, ordinals, method in fits:
        if fit is None or fit["precision_grade"] not in ("tight", "good"):
            continue
        period = fit["fitted_period_ms"] / 1000
        anchored = np.abs(observed - (observed[0] + period * ordinals))
        if np.percentile(anchored, 95) <= .08 * period and abs(fit["anchored_end_drift_ms"]) <= 80 * period:
            accepted.append((fit, method, float(np.percentile(anchored, 95))))
    if accepted:
        fit, method, anchored = min(accepted, key=lambda value: value[0]["p95_absolute_beat_error_ms"])
        pulse_bpm = float(fit["proposed_bpm"])
        for candidate in candidates:
            ratio = candidate["bpm"] / pulse_bpm
            level = min((.5, 1., 2.), key=lambda factor: abs(math.log(ratio / factor)))
            refined = float(pulse_bpm * level)
            if abs(math.log(ratio / level)) <= math.log(1.04) and min_bpm <= refined <= max_bpm:
                candidate.update(coarse_bpm=candidate["bpm"], bpm=refined,
                                 beat_zero_seconds=fit["fitted_first_beat_seconds"],
                                 tempo_refinement="source_event_constant_fit",
                                 source_event_fit={"method": method, "fit": fit,
                                                   "first_anchored_p95_error_seconds": anchored,
                                                   "metrical_multiplier": level,
                                                   "observed_timestamps_unchanged": True})
    return candidates


def _loop_world_diagnostics(loop, world, times):
    start, end = loop["start_seconds"], loop["end_seconds"]
    if not any(a <= start < end <= b for a, b in world["validity_segments_seconds"]):
        return {"status": "source_gap", "contact_compatible": False, "requires_review": True}
    left = min(len(times) - 1, max(0, int(np.searchsorted(times, start))))
    right = min(len(times) - 1, max(0, int(np.searchsorted(times, end))))
    roots = np.asarray(world["root_positions"])
    root_start = np.array([np.interp(start, times, roots[:, k]) for k in range(3)])
    root_end = np.array([np.interp(end, times, roots[:, k]) for k in range(3)])
    drift = float(np.linalg.norm(root_end - root_start) / world["body_scale"])
    states = []
    for foot in world["foot_keypoints"]:
        a, b = foot["contact_state"][left], foot["contact_state"][right]
        states.append({"bone": foot["bone"], "start_contact_hypothesis": a,
                       "end_contact_hypothesis": b, "state_matches": a == b,
                       "maximum_low_height_stance_drift_relative": foot.get("maximum_low_height_stance_drift_relative")})
    return {"status": "estimated_contact_boundary_check", "root_travel_body_scales": drift,
            "foot_boundaries": states,
            "contact_compatible": all(f["state_matches"] for f in states) if states else None,
            "requires_review": True, "skin_seam_verified": False,
            "note": "Source skeleton contact states do not verify the retargeted character's feet."}


def add_world_evidence(report, world, data, times, values, channels, *, min_bpm, max_bpm,
                       tempo_strategy="consensus"):
    from .rig_motion import _search_loops, _signals

    result = deepcopy(report)
    result["control_evidence"] = {key: deepcopy(report[key]) for key in (
        "motion_accents", "bpm_candidates", "recommended_tempo", "estimated_beat_map", "loop_candidates")}
    streams, family_tempos, family_events = [], {}, {}
    for family in sorted(FAMILIES):
        # Contact plant accents must derive from the explicit contact-event lane,
        # so the same event cannot be counted again through motion_accents.
        raw = ([e for e in world["contact_events"] if e["kind"] == "foot_plant"]
               if family == "contact_hypotheses" else
               [e for e in world["motion_accents"] if e["family"] == family])
        events = _unit_events(raw)
        lineage = ("contact_heuristic_from_same_capture" if family == "contact_hypotheses"
                   else "world_kinematics")
        streams.append({"id": family, "family": lineage, "event_type": "observed_feature_peak", "events": events})
        candidates = _event_tempos(events, times, min_bpm, max_bpm)
        for candidate in candidates:
            candidate.update(evidence_family=family, source="world/contact source-event periodicity")
        family_tempos[family], family_events[family] = candidates, events
    active = _signals(times, values, channels)[1]
    loops = []
    for family, candidates in family_tempos.items():
        for candidate in candidates[:2]:
            for loop in _search_loops(times, values, channels, active, candidate, max_loops=4):
                loop.update(tempo_evidence_family=family, source_bpm=candidate["bpm"])
                loop["world_contact_diagnostics"] = _loop_world_diagnostics(loop, world, times)
                loops.append(loop)
    for loop in result["control_evidence"]["loop_candidates"]:
        loop["world_contact_diagnostics"] = _loop_world_diagnostics(loop, world, times)
        loop["tempo_evidence_family"] = "control"
        if loop.get("beats"):
            loop["source_bpm"] = 60 * loop["beats"] / (loop["end_seconds"] - loop["start_seconds"])
    result["world_evidence"] = {
        "format": WORLD_FORMAT, "sidecar_sha256": world["validated_sidecar_sha256"],
        "source_file_sha256": world["source_file_sha256"], "profile_sha256": world["profile_sha256"],
        "source_identity_verified": True, "skeletal_evaluation_recomputed_by_stemlab": False,
        "coordinate_basis": world["coordinate_basis"],
        "valid_segments_seconds": world["validity_segments_seconds"],
        "event_streams": streams, "bpm_candidates_by_family": family_tempos,
        "loop_candidates": loops, "contact_event_count": len(world["contact_events"]),
        "foot_keypoint_count": len(world["foot_keypoints"]),
        "family_lineage": {s["id"]: s["family"] for s in streams},
        "music_timing_verified": False,
    }
    result["limitations"].append("World-space and contact heuristics share the same source capture; they are not independent musical annotations.")
    return select_rig_tempo_hypothesis(result, family=tempo_strategy)


def select_rig_tempo_hypothesis(report: dict, *, family="consensus", candidate_index=0) -> dict:
    """Explicitly choose an inference family; preserve originals and review status.

    Consensus prefers a contact pulse corroborated at the same/half/double level
    by control or world kinematics. It does not inflate the numeric score or
    silently decide which metrical level is the music's beat.
    """
    from .rig_motion import _beat_map

    if family not in ("control", "world", "contact", "consensus"):
        raise ValueError("Tempo strategy must be control, world, contact or consensus")
    if type(candidate_index) is not int or not 0 <= candidate_index <= 7:
        raise ValueError("Tempo candidate index must be 0..7")
    result = deepcopy(report)
    control = result.get("control_evidence")
    if control is None:
        if family not in ("control", "consensus"):
            raise ValueError("World/contact tempo selection needs validated world evidence")
        return result
    world = result["world_evidence"]
    hypotheses = world["bpm_candidates_by_family"]
    streams = {s["id"]: s["events"] for s in world["event_streams"]}
    world_family = max((f for f in hypotheses if f != "contact_hypotheses"),
                       key=lambda f: hypotheses[f][0]["score"] if hypotheses[f] else -1)
    groups = {"control": control["bpm_candidates"], "world": hypotheses[world_family],
              "contact": hypotheses["contact_hypotheses"]}
    chosen = family
    agreement = []
    status = "explicit_family_selection_requires_review"
    if family == "consensus":
        if groups["contact"]:
            if candidate_index >= len(groups["contact"]):
                raise ValueError("Tempo candidate index is outside the selected family's candidates")
            contact = groups["contact"][candidate_index]
            for name in ("control", "world"):
                if groups[name]:
                    other = groups[name][0]
                    ratio = other["bpm"] / contact["bpm"]
                    level = min((.5, 1.0, 2.0), key=lambda value: abs(math.log(ratio / value)))
                    if abs(math.log(ratio / level)) <= math.log(1.04):
                        agreement.append({"family": name, "bpm": other["bpm"], "ratio_to_contact": level})
            chosen = "contact" if agreement else "control"
            if not agreement and (groups["control"] or groups["world"]):
                chosen = None
                status = "contradictory_families_abstained"
            elif agreement:
                status = "corroborated_contact_pulse_metrical_level_requires_review"
            else:
                chosen = "contact"
                status = "single_contact_family_requires_review"
        elif groups["control"]:
            chosen = "control"
            status = "control_fallback_no_contact_tempo"
        elif groups["world"]:
            chosen = "world"
            status = "world_fallback_no_contact_or_control_tempo"
        else:
            chosen = None
            status = "no_supported_tempo"
    candidates = deepcopy(groups[chosen]) if chosen else []
    if chosen and candidates and candidate_index >= len(candidates):
        raise ValueError("Tempo candidate index is outside the selected family's candidates")
    primary = candidates[candidate_index] if candidates else None
    events = (deepcopy(control["motion_accents"]) if chosen == "control" else
              deepcopy(streams[world_family]) if chosen == "world" else
              deepcopy(streams["contact_hypotheses"]) if chosen == "contact" else [])
    coverage = world["valid_segments_seconds"]
    # The original control analysis may interpolate its envelope across a short
    # permitted capture gap. Keep it intact as evidence, but do not promote any
    # such accent to the selected source-observed stream.
    events = [event for event in events if _inside([event["seconds"]], coverage)[0]]
    if primary is not None:
        primary["selection_family"] = chosen
        primary["requires_review"] = True
    result["motion_accents"], result["bpm_candidates"] = events, candidates
    result["recommended_tempo"] = primary
    result["estimated_beat_map"] = _beat_map(np.asarray(result["source_range_seconds"]), primary,
                                              source_hash=result["source_file_sha256"])
    all_loops = control["loop_candidates"] + world["loop_candidates"]
    selected_loops = []
    seen = set()
    for loop in all_loops:
        if not any(start <= loop["start_seconds"] < loop["end_seconds"] <= end
                   for start, end in coverage):
            continue
        if loop.get("beats") is not None and (primary is None or
                abs(60 * loop["beats"] / (loop["end_seconds"] - loop["start_seconds"]) - primary["bpm"]) > .02 * primary["bpm"]):
            continue
        key = (loop["start_seconds"], loop["end_seconds"], loop.get("beats"))
        if key not in seen:
            selected_loops.append(deepcopy(loop))
            seen.add(key)
    result["loop_candidates"] = selected_loops
    result["tempo_selection"] = {"requested_strategy": family, "selected_family": chosen,
                                  "candidate_index": candidate_index, "status": status,
                                  "supporting_relations": agreement,
                                  "independent_model_vote_count": 0,
                                  "music_timing_verified": False}
    return result
