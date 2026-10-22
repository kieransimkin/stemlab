"""Synthetic chunked package adapter regressions; no third-party motions or downloads."""
from __future__ import annotations

import json
import math
import sys
import types

import numpy as np
import pytest

from stemlab.analysis.rig_motion_package import analyze_rig_motion_package
from test_rig_motion_analysis import make_capture


def make_package(tmp_path, monkeypatch, *, corrupt=""):
    _, data = make_capture(tmp_path, bpm=120)
    channels = data["profile"]["channels"]
    t = np.asarray(data["frame_times_seconds"])
    source = np.asarray(data["frames"])
    pips = np.arange(0, 16 * 64 + 1)
    seconds = pips / 64
    values = np.stack([np.interp(seconds, t, source[:, k]) for k in range(len(channels))], axis=1)
    q = values[:, 3:7]
    q /= np.maximum(np.linalg.norm(q, axis=1)[:, None], 1e-12)
    mn = np.array([c["minimum"] for c in channels])
    mx = np.array([c["maximum"] for c in channels])
    rows = (2 * (values - mn) / (mx - mn) - 1).tolist()

    profile = types.SimpleNamespace(
        fingerprint=data["profile_sha256"], type_uri=data["type_uri"],
        channels=[types.SimpleNamespace(**c, to_dict=lambda c=c: c) for c in channels])
    clip_ids = ["part_a", "part_b"]
    descriptors = []
    motions = {}
    for index, (start, end) in enumerate(((0, 512), (512, len(rows)))):
        meta = {"complete_action": True, "timing_kind": "time-only",
                "music_timing_verified": False, "original_clip_id": "a" * 64,
                "chunk_count": 2, "chunk_index": index, "trimmed_source_frames": 0}
        descriptors.append({"id": clip_ids[index], "start_pip": start,
                            "sample_count": end-start, "sha256": str(index+1)*64, "metadata": meta})
        clock = types.SimpleNamespace(bpm=60, bpm_source="time-only: source seconds",
                                      phase_status="unverified", beat_zero_seconds=0)
        motions[clip_ids[index]] = types.SimpleNamespace(
            recording=types.SimpleNamespace(samples=rows[start:end], clock=clock))
    if corrupt == "missing":
        descriptors.pop()
    if corrupt == "wrong_clock":
        motions["part_b"].recording.clock.bpm = 124
    if corrupt == "mixed_action":
        descriptors[1]["metadata"]["original_clip_id"] = "b" * 64
    manifest = {"id": "synthetic", "version": "1.0.0", "dimensions": [c["name"] for c in channels],
                "provenance": {"source": {"calibration_frame_count": 1, "frame_count": 1025,
                                          "effective_frame_time_seconds": "1/64"}}}
    root = tmp_path / "package"
    root.mkdir()
    (root / "manifest.json").write_text(json.dumps(manifest))

    class FakePackage:
        def __init__(self, _path, *, cache_size):
            assert cache_size == 0
            self.manifest, self.profile = manifest, profile

        def __enter__(self):
            return self

        def __exit__(self, *_):
            pass

        def catalogue(self):
            return descriptors

        def load(self, clip_id):
            return motions[clip_id]

    parent = types.ModuleType("dancerudiments_authoring")
    adapter = types.ModuleType("dancerudiments_authoring.motion_packages")
    adapter.MotionPackage = FakePackage
    monkeypatch.setitem(sys.modules, "dancerudiments_authoring", parent)
    monkeypatch.setitem(sys.modules, "dancerudiments_authoring.motion_packages", adapter)
    return root


def test_analyze_complete_chunked_seconds_not_a_music_clock(tmp_path, monkeypatch):
    source = make_package(tmp_path, monkeypatch)
    report = analyze_rig_motion_package(source, min_bpm=100, max_bpm=140)
    assert report["source_kind"] == "motion_package"
    assert report["source_original_action_id"] == "a"*64
    assert report["source_clip_ids"] == ["part_a", "part_b"]
    assert report["source_calibration_omitted_pips"] == 1
    assert report["source_sample_count"] == 1025
    assert report["source_range_seconds"][0] == 1/64
    assert report["recommended_tempo"] is not None
    assert math.isclose(report["recommended_tempo"]["bpm"], 120, abs_tol=5)
    assert report["estimated_beat_map"]["bpm_status"] == "estimated"
    assert all(loop["requires_review"] for loop in report["loop_candidates"])


@pytest.mark.parametrize("corrupt, message", [("missing", "Incomplete"),
                                              ("wrong_clock", "60 BPM"),
                                              ("mixed_action", "Multiple original")])
def test_package_missing_chunk_or_mixed_timing_fails_closed(tmp_path, monkeypatch, corrupt, message):
    source = make_package(tmp_path, monkeypatch, corrupt=corrupt)
    with pytest.raises(ValueError, match=message):
        analyze_rig_motion_package(source, min_bpm=100, max_bpm=140)


def test_package_file_is_unchanged(tmp_path, monkeypatch):
    source = make_package(tmp_path, monkeypatch)
    before = (source/"manifest.json").read_bytes()
    analyze_rig_motion_package(source)
    assert (source/"manifest.json").read_bytes() == before


def test_cli_reads_pack_and_never_writes_inside_source(tmp_path, monkeypatch):
    import typer
    from rich.console import Console
    from typer.testing import CliRunner
    from stemlab.rig_motion_cli import register_rig_motion_commands

    source = make_package(tmp_path, monkeypatch)
    app = typer.Typer()
    register_rig_motion_commands(app, Console())
    @app.command("noop")
    def noop():
        pass

    output = tmp_path / "analysis.json"
    cli = CliRunner().invoke(app, ["analyze-rig-motion", str(source),
                                   "--output", str(output), "--min-bpm", "100",
                                   "--max-bpm", "140"])
    assert cli.exit_code == 0, cli.output
    assert json.loads(output.read_text())["source_kind"] == "motion_package"

    unsafe = CliRunner().invoke(app, ["analyze-rig-motion", str(source),
                                      "--output", str(source / "mutated.json")])
    assert unsafe.exit_code != 0
    assert not (source / "mutated.json").exists()
