"""Synthetic movement only; no real animation/music or model downloads."""
from __future__ import annotations

import hashlib
import json
import math

import numpy as np
import pytest

from stemlab.analysis.rig_motion import analyze_rig_capture, write_rig_analysis


def make_capture(tmp_path, *, bpm=120, duration=16, drift=0., static=False,
                 reverse_quaternion=False, step_switch=False):
    # A two-second choreography loop with a 120-BPM physical pulse layered in.
    t = np.arange(0, duration + 1e-8, 1/60)
    rows = []
    for i, x in enumerate(t):
        primary = 0.0 if static else (.85 * math.exp(-((x % (60 / bpm) - .12) / .065) ** 2) +
                                       .12 * math.sin(2 * math.pi * x / 2))
        secondary = 0.0 if static else .10 * math.sin(2 * math.pi * x / 2 + .4)
        angle = .0 if static else .15 * math.sin(2 * math.pi * x / 2)
        q = [math.cos(angle/2), 0., 0., math.sin(angle/2)]
        if reverse_quaternion and i % 2:
            q = [-p for p in q]
        rows.append([drift * x, primary, secondary, *q, 1 if step_switch and x > 8 else 0])
    channels = []
    for idx, (name, bone, path, axis, mn, mx, interp, value_type) in enumerate([
        ("root_x", "root", "location", 0, "-100", "100", "linear", "float"),
        ("hand_x", "hand", "location", 0, "-2", "2", "linear", "float"),
        ("knee_x", "knee", "rotation_euler", 0, "-4", "4", "linear", "float"),
        ("qw", "spine", "rotation_quaternion", 0, "-1", "1", "quaternion", "float"),
        ("qx", "spine", "rotation_quaternion", 1, "-1", "1", "quaternion", "float"),
        ("qy", "spine", "rotation_quaternion", 2, "-1", "1", "quaternion", "float"),
        ("qz", "spine", "rotation_quaternion", 3, "-1", "1", "quaternion", "float"),
        ("ik", "hand", '["IK_parent"]', -1, "0", "2", "step", "integer"),
    ]):
        channels.append({"number": idx+1, "name": name, "bone": bone, "data_path": path,
                         "array_index": axis, "unit": "units", "minimum": float(mn),
                         "maximum": float(mx), "neutral": 0. if name != 'qw' else 1.,
                         "interpolation": interp, "value_type": value_type,
                         "rotation_mode": "QUATERNION" if interp == "quaternion" else "",
                         "enum_items": []})
    profile = {"format": "dancerudiments.rig-profile", "schema_version": 1,
               "type_uri": "syn://type/danceflow/motion/rigify/custom/synthetic", "model": "synthetic",
               "version": 1, "channels": channels, "source": {"synthetic": True}}
    fingerprint = hashlib.sha256(json.dumps(profile, sort_keys=True, separators=(',', ':'),
                                             ensure_ascii=True).encode('ascii')).hexdigest()
    source = {"format": "dancerudiments.rig-capture", "schema_version": 1,
              "type_uri": profile["type_uri"], "profile_sha256": fingerprint,
              "profile": profile, "frame_times_seconds": t.tolist(),
              "frames": rows, "provenance": {"source": "unit-test generated"}}
    path = tmp_path / "capture.json"
    path.write_text(json.dumps(source), encoding="utf-8")
    return path, source


def test_periodic_motion_detects_tempo_and_loop(tmp_path):
    path, _ = make_capture(tmp_path)
    result = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert len(result["motion_accents"]) >= 12
    assert result["bpm_candidates"]
    assert abs(result["recommended_tempo"]["bpm"] - 120) < 5
    assert result["estimated_beat_map"]["bpm_status"] == "estimated"
    assert result["estimated_beat_map"]["phase_status"] == "estimated"
    assert result["estimated_beat_map"]["extrapolate"] is False
    assert result["loop_candidates"]
    assert any(abs(x["end_seconds"] - x["start_seconds"] - 2) < .08
               and x["pose_mismatch"] < .3 for x in result["loop_candidates"])
    assert all(c["requires_review"] and not c["repaired"] for c in result["loop_candidates"])
    write_rig_analysis(tmp_path / "report.json", result, beat_map_path=tmp_path / "beats.json")
    assert json.loads((tmp_path / "beats.json").read_text())["pips_per_beat"] == 64
    with pytest.raises(FileExistsError):
        write_rig_analysis(tmp_path / "report.json", result)


def test_static_motion_rejected(tmp_path):
    path, _ = make_capture(tmp_path, static=True)
    output = analyze_rig_capture(path)
    assert not output["motion_accents"] and output["recommended_tempo"] is None
    assert output["estimated_beat_map"] is None and not output["loop_candidates"]
    with pytest.raises(ValueError, match="No supported"):
        write_rig_analysis(tmp_path / "report.json", output, beat_map_path=tmp_path / "beats.json")


def test_sign_flipped_quaternion_not_spurious_motion(tmp_path):
    path, _ = make_capture(tmp_path, static=True, reverse_quaternion=True)
    output = analyze_rig_capture(path)
    assert output["active_controls"] == 0


def test_root_drift_does_not_report_seamless_loop(tmp_path):
    path, _ = make_capture(tmp_path, drift=.2)
    output = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert output["recommended_tempo"] is not None
    assert not output["loop_candidates"]  # root translation is not automatically cancelled


def test_discrete_step_cannot_cross_loop_seam(tmp_path):
    path, _ = make_capture(tmp_path, step_switch=True)
    output = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert all(not (x["start_seconds"] < 8 < x["end_seconds"])
               for x in output["loop_candidates"])


def test_tampered_fingerprint_and_times_fail_closed(tmp_path):
    path, source = make_capture(tmp_path)
    source["profile"]["channels"][0]["bone"] = "mismatched"
    path.write_text(json.dumps(source), encoding="utf-8")
    with pytest.raises(ValueError, match="fingerprint"):
        analyze_rig_capture(path)
    source["profile"]["channels"][0]["bone"] = "root"
    source["frame_times_seconds"][4] = source["frame_times_seconds"][3]
    path.write_text(json.dumps(source), encoding="utf-8")
    with pytest.raises(ValueError, match="strictly timed"):
        analyze_rig_capture(path)


def test_wrong_format_or_duplicate_keys_fail(tmp_path):
    path = tmp_path / "capture.json"
    path.write_text('{"format":"dancerudiments.rig-capture","format":"x"}', encoding='utf-8')
    with pytest.raises(ValueError, match="Duplicate"):
        analyze_rig_capture(path)


def test_invalid_bpm_bounds(tmp_path):
    path, _ = make_capture(tmp_path)
    with pytest.raises(ValueError, match="BPM range"):
        analyze_rig_capture(path, min_bpm=200, max_bpm=100)


def test_unquantized_pose_loop_without_rhythmic_tempo(tmp_path):
    path, source = make_capture(tmp_path)
    for i, t in enumerate(source["frame_times_seconds"]):
        source["frames"][i][1] = .7 * math.sin(2 * math.pi * t / 2)
    path.write_text(json.dumps(source), encoding="utf-8")
    report = analyze_rig_capture(path, min_bpm=130, max_bpm=170)
    assert any(abs(p["seconds"] - 2) < .1 for p in report["pose_period_candidates"])
    assert any(x["alignment"] == "pose_recurrence_only" and x["beats"] is None
               for x in report["loop_candidates"])


def test_quaternion_interpolation_does_not_create_pose_error(tmp_path):
    # Non-unit linear interpolation through one quaternion's keyframes must be
    # renormalized for orientation *comparison*. Playback remains native.
    path, _ = make_capture(tmp_path)
    report = analyze_rig_capture(path, min_bpm=100, max_bpm=140)
    assert any(c["pose_mismatch"] < .1 for c in report["loop_candidates"])


def test_typer_cli_writes_optional_map(tmp_path):
    from rich.console import Console
    from typer.testing import CliRunner
    import typer
    from stemlab.rig_motion_cli import register_rig_motion_commands

    app = typer.Typer()
    register_rig_motion_commands(app, Console())
    # A second command keeps CLI behaviour equivalent to StemLab's multi-command app.
    @app.command("noop")
    def noop():
        pass

    capture, _ = make_capture(tmp_path)
    result = CliRunner().invoke(app, ["analyze-rig-motion", str(capture), "--output",
                                      str(tmp_path / "analysis.json"), "--estimated-beat-map",
                                      str(tmp_path / "beat-map.json"), "--min-bpm", "100",
                                      "--max-bpm", "140"])
    assert result.exit_code == 0, result.output
    assert json.loads((tmp_path / "analysis.json").read_text())["format"] == "stemlab.rig-motion-analysis"
    assert json.loads((tmp_path / "beat-map.json").read_text())["schema_version"] == 1
