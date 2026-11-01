"""Independent synthetic sidecars exercise source binding and evidence selection."""
from __future__ import annotations

from copy import deepcopy
import json

import numpy as np
import pytest

from stemlab.analysis.motion_alignment import events_from_rig_report, file_hash, write_document
from stemlab.analysis.rig_motion import analyze_rig_capture, select_rig_tempo_hypothesis
from test_rig_motion_analysis import make_capture


def sidecar(capture_path, source, *, bpm=120, world_bpm=120):
    times = np.asarray(source["frame_times_seconds"])
    contact = np.mod(times - .2, 60 / bpm) < .2
    events = [{"bone": "foot.L", "kind": "foot_plant", "seconds": float(x), "strength": .8}
              for x in np.arange(.2, times[-1] - .05, 60 / bpm)]
    accents = [{"family": "world_joint_velocity", "seconds": float(x), "strength": 1.0}
               for x in np.arange(.2, times[-1] - .05, 60 / world_bpm)]
    return {"format": "dancerudiments.world-motion-evidence", "schema_version": 1,
            "source_file_sha256": file_hash(capture_path), "capture_sha256": "c"*64,
            "profile_sha256": source["profile_sha256"], "type_uri": source["type_uri"],
            "supported": True, "requires_review": True, "musical_timing_verified": False,
            "frame_times_seconds": times.tolist(), "source_start_seconds": float(times[0]),
            "source_end_seconds": float(times[-1]),
            "validity_segments_seconds": [[float(times[0]), float(times[-1])]],
            "coordinate_basis": {"up_axis": "Z", "units": "source_units"}, "body_scale": 2.,
            "root_positions": np.zeros((len(times), 3)).tolist(),
            "envelopes": {key: np.zeros(len(times)).tolist() for key in (
                "world_speed", "root_relative_speed", "body_height_proxy", "root_speed")},
            "motion_accents": accents, "contact_events": events, "contact_intervals": [],
            "foot_keypoints": [{"bone": "foot.L", "contact_state": contact.tolist(),
                                "height_above_estimated_floor": (.1 * (~contact)).tolist(),
                                "planar_speed": (.2 * (~contact)).tolist()}]}


def test_world_contact_selection_preserves_original_control_evidence(tmp_path):
    path, source = make_capture(tmp_path)
    base = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    world = sidecar(path, source)
    report = analyze_rig_capture(path, min_bpm=100, max_bpm=140, world_motion=world)
    assert report["control_evidence"]["recommended_tempo"] == base["recommended_tempo"]
    assert report["control_evidence"]["motion_accents"] == base["motion_accents"]
    assert report["tempo_selection"]["selected_family"] == "contact"
    assert report["recommended_tempo"]["bpm"] == pytest.approx(120, abs=1)
    assert type(report["recommended_tempo"]["bpm"]) is float
    assert report["recommended_tempo"]["tempo_refinement"] == "source_event_constant_fit"
    assert report["recommended_tempo"]["bpm"] == pytest.approx(120, abs=.001)
    assert report["tempo_selection"]["supporting_relations"]
    assert report["tempo_selection"]["independent_model_vote_count"] == 0
    assert report["estimated_beat_map"]["bpm_status"] == "estimated"
    assert report["world_evidence"]["source_identity_verified"] is True
    assert report["world_evidence"]["skeletal_evaluation_recomputed_by_stemlab"] is False
    control = select_rig_tempo_hypothesis(report, family="control")
    assert control["motion_accents"] == base["motion_accents"]
    assert control["recommended_tempo"]["bpm"] == base["recommended_tempo"]["bpm"]
    events = events_from_rig_report(report, clock_id="source")
    original = next(s for s in events["streams"] if s["id"] == "control_accents")
    assert len(original["events"]) == len(base["motion_accents"])
    assert len(events["streams"]) == 5
    assert {s["family"] for s in events["streams"]} == {
        "rig_control_velocity", "world_kinematics", "contact_heuristic_from_same_capture"}


def test_contradictory_world_contact_families_abstain_but_remain_selectable(tmp_path):
    path, source = make_capture(tmp_path)
    report = analyze_rig_capture(path, min_bpm=80, max_bpm=150,
                                  world_motion=sidecar(path, source, bpm=90, world_bpm=120))
    assert report["recommended_tempo"] is None
    assert report["estimated_beat_map"] is None
    assert report["tempo_selection"]["status"] == "contradictory_families_abstained"
    chosen = select_rig_tempo_hypothesis(report, family="contact")
    assert chosen["recommended_tempo"]["bpm"] == pytest.approx(90, abs=1)
    assert chosen["recommended_tempo"]["requires_review"]
    assert chosen["estimated_beat_map"]["extrapolate"] is False
    assert report["recommended_tempo"] is None


def test_consensus_corroborates_the_requested_candidate_not_the_first(tmp_path):
    path, source = make_capture(tmp_path)
    report = analyze_rig_capture(path, min_bpm=100, max_bpm=140, world_motion=sidecar(path, source))
    groups = report["world_evidence"]["bpm_candidates_by_family"]
    primary = groups["contact_hypotheses"][0]
    groups["contact_hypotheses"] = [primary, {**deepcopy(primary), "bpm": 90.}]
    selected = select_rig_tempo_hypothesis(report, family="consensus", candidate_index=1)
    assert selected["recommended_tempo"] is None
    assert selected["tempo_selection"]["status"] == "contradictory_families_abstained"
    assert selected["tempo_selection"]["supporting_relations"] == []
    # The explicit alternative remains available, but it only gains consensus
    # corroboration when another family's leading hypothesis actually agrees.
    assert select_rig_tempo_hypothesis(report, family="contact", candidate_index=1)["recommended_tempo"]["bpm"] == 90.
    report["control_evidence"]["bpm_candidates"][0]["bpm"] = 90.
    corroborated = select_rig_tempo_hypothesis(report, family="consensus", candidate_index=1)
    assert corroborated["recommended_tempo"]["bpm"] == 90.
    assert corroborated["tempo_selection"]["supporting_relations"] == [
        {"family": "control", "bpm": 90., "ratio_to_contact": 1.}]


@pytest.mark.parametrize("use_world", [False, True])
@pytest.mark.parametrize("isolated_frame", [False, True])
def test_gap_accents_stay_in_original_evidence_but_do_not_become_alignment_events(tmp_path, use_world, isolated_frame):
    path, source = make_capture(tmp_path)
    keep = [i for i, t in enumerate(source["frame_times_seconds"])
            if not 2. < t < 2.2 or (isolated_frame and i == 126)]
    source["frame_times_seconds"] = [source["frame_times_seconds"][i] for i in keep]
    source["frames"] = [source["frames"][i] for i in keep]
    path.write_text(json.dumps(source), encoding="utf-8")
    coverage = [[0., 2.], [2.2, 16.]]
    if isolated_frame:
        coverage.insert(1, [2.1, 2.1])

    def covered(seconds):
        return any(start <= seconds <= end for start, end in coverage)

    original = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert original["source_valid_segments_seconds"] == coverage
    interpolated = [event for event in original["motion_accents"] if not covered(event["seconds"])]
    assert interpolated, "Fixture must expose the old control interpolation across a source gap"
    report = original
    if use_world:
        world = sidecar(path, source)
        world["validity_segments_seconds"] = coverage
        world["motion_accents"] = [e for e in world["motion_accents"] if covered(e["seconds"])]
        world["contact_events"] = [e for e in world["contact_events"] if covered(e["seconds"])]
        report = analyze_rig_capture(path, min_bpm=100, max_bpm=140,
                                     world_motion=world, tempo_strategy="control")
        assert report["control_evidence"]["motion_accents"] == original["motion_accents"]
        assert all(covered(event["seconds"]) for event in report["motion_accents"])
        assert any(loop["world_contact_diagnostics"]["status"] == "source_gap"
                   for loop in report["control_evidence"]["loop_candidates"])
        assert report["loop_candidates"]
        assert all(any(start <= loop["start_seconds"] < loop["end_seconds"] <= end
                       for start, end in coverage) for loop in report["loop_candidates"])
    events = events_from_rig_report(report, clock_id="source")
    assert events["source"]["valid_segments_seconds"] == [[0., 2.], [2.2, 16.]]
    assert events["provenance"]["excluded_singleton_coverage_interval_count"] == int(isolated_frame)
    control = next(stream for stream in events["streams"] if stream["id"] == "control_accents")
    assert all(covered(event["seconds"]) for event in control["events"])
    assert events["provenance"]["excluded_control_events_outside_coverage_count"] == len(interpolated)


def test_world_coverage_cannot_bridge_short_gap_over_three_median_frame_steps(tmp_path):
    path, source = make_capture(tmp_path)
    next_observed_sample = source["frame_times_seconds"][124]
    keep = [i for i in range(len(source["frame_times_seconds"])) if i not in (121, 122, 123)]
    source["frame_times_seconds"] = [source["frame_times_seconds"][i] for i in keep]
    source["frames"] = [source["frames"][i] for i in keep]
    path.write_text(json.dumps(source), encoding="utf-8")
    world = sidecar(path, source)
    with pytest.raises(ValueError, match="bridges a source sampling gap"):
        analyze_rig_capture(path, world_motion=world)
    base = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert base["source_valid_segments_seconds"] == [[0., 2.], [next_observed_sample, 16.]]
    world["validity_segments_seconds"] = base["source_valid_segments_seconds"]
    result = analyze_rig_capture(path, world_motion=world)
    assert result["world_evidence"]["valid_segments_seconds"] == base["source_valid_segments_seconds"]


def test_no_motion_sidecar_produces_no_tempo_or_contacts(tmp_path):
    path, source = make_capture(tmp_path, static=True)
    world = sidecar(path, source)
    world["motion_accents"] = []
    world["contact_events"] = []
    report = analyze_rig_capture(path, world_motion=world)
    assert report["recommended_tempo"] is None
    assert not report["loop_candidates"]
    assert all(not s["events"] for s in report["world_evidence"]["event_streams"])


@pytest.mark.parametrize("mutation", ["source", "profile", "time", "type", "nan", "out_of_bounds", "claim", "state"])
def test_sidecar_tampering_is_rejected(tmp_path, mutation):
    path, source = make_capture(tmp_path)
    world = sidecar(path, source)
    if mutation == "source":
        world["source_file_sha256"] = "f"*64
    elif mutation == "profile":
        world["profile_sha256"] = "f"*64
    elif mutation == "time":
        world["frame_times_seconds"][10] += .001
    elif mutation == "type":
        world["type_uri"] += "/other"
    elif mutation == "nan":
        world["root_positions"][10][0] = float("nan")
    elif mutation == "out_of_bounds":
        world["contact_events"][0]["seconds"] = -1.
    elif mutation == "claim":
        world["musical_timing_verified"] = True
    else:
        world["foot_keypoints"][0]["contact_state"][0] = 1
    with pytest.raises(ValueError):
        analyze_rig_capture(path, world_motion=world)


def test_world_loop_diagnostics_and_input_immutability(tmp_path):
    path, source = make_capture(tmp_path)
    world = sidecar(path, source)
    original = deepcopy(world)
    report = analyze_rig_capture(path, min_bpm=100, max_bpm=140, world_motion=world, tempo_strategy="control")
    assert report["loop_candidates"]
    assert all("world_contact_diagnostics" in loop for loop in report["loop_candidates"])
    assert all(loop["world_contact_diagnostics"]["skin_seam_verified"] is False for loop in report["loop_candidates"])
    assert original == world
    sidecar_path = tmp_path / "world.json"
    write_document(sidecar_path, world)
    from_path = analyze_rig_capture(path, min_bpm=100, max_bpm=140, world_motion=sidecar_path)
    assert from_path["world_evidence"]["sidecar_sha256"] == file_hash(sidecar_path)


def test_cli_exports_actual_event_evidence_and_checks_output_paths(tmp_path):
    import typer
    from typer.testing import CliRunner
    from rich.console import Console
    from stemlab.rig_motion_cli import register_rig_motion_commands
    path, source = make_capture(tmp_path)
    world_path = tmp_path / "world.json"
    write_document(world_path, sidecar(path, source))
    app = typer.Typer()
    register_rig_motion_commands(app, Console())
    args = ["analyze-rig-motion", str(path), "--world-motion", str(world_path),
            "--output", str(tmp_path / "analysis.json"), "--events-output", str(tmp_path / "events.json"),
            "--clock-id", "source", "--min-bpm", "100", "--max-bpm", "140"]
    result = CliRunner().invoke(app, args)
    assert result.exit_code == 0, result.output
    assert (tmp_path / "events.json").is_file()
    assert CliRunner().invoke(app, args).exit_code != 0


def test_world_selection_requires_sidecar_and_valid_candidate(tmp_path):
    path, source = make_capture(tmp_path)
    with pytest.raises(ValueError, match="sidecar"):
        analyze_rig_capture(path, tempo_strategy="world")
    report = analyze_rig_capture(path, min_bpm=100, max_bpm=140, world_motion=sidecar(path, source))
    with pytest.raises(ValueError, match="outside"):
        select_rig_tempo_hypothesis(report, family="contact", candidate_index=7)
