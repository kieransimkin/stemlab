"""Known source-clock fixtures: no downloaded model, song or choreography."""
from __future__ import annotations

from copy import deepcopy
import os
from pathlib import Path
import subprocess
import sys

import numpy as np
import pytest

from stemlab.analysis.motion_alignment import (
    CLOCK_FORMAT, align_motion_audio, create_alignment_revision, document_hash,
    events_from_rhythm_report, file_hash, make_event_evidence, map_motion_seconds,
    events_from_rig_report,
    read_document, validate_event_evidence, write_document,
    validate_alignment_revision,
)


def fixture(tmp_path, motion_times=None, audio_times=None, *, motion_segments=None, audio_segments=None):
    if motion_times is None:
        # Asymmetric interval pattern disambiguates phase from a repeated click grid.
        motion_times = np.cumsum(np.tile([.41, .62, .47, .55, .72, .38, .58], 5))
    if audio_times is None:
        audio_times = np.asarray(motion_times) + .373
    mp, ap = tmp_path / "capture-source.json", tmp_path / "audio-source.bin"
    mp.write_bytes(b'{"synthetic":"motion source identity"}')
    ap.write_bytes(b"synthetic audio fixture identity; no audio decode is needed")
    ms = [{"id": "contacts", "family": "contact_heuristic", "event_type": "observed_feature_peak",
           "events": [{"seconds": float(t), "strength": 1.0} for t in motion_times]}]
    aus = [{"id": "beats", "family": "audio_model:fixture", "event_type": "model_inference",
            "events": [{"seconds": float(t), "strength": 1.0} for t in audio_times]}]
    m = make_event_evidence(kind="motion", source_sha256=file_hash(mp), clock_id="capture-seconds",
                            seconds_range=[0., 24.], streams=ms, valid_segments_seconds=motion_segments)
    a = make_event_evidence(kind="audio", source_sha256=file_hash(ap), clock_id="master-seconds",
                            seconds_range=[0., 48.], streams=aus, valid_segments_seconds=audio_segments)
    clock = {"format": CLOCK_FORMAT, "schema_version": 1,
             "motion_source_sha256": m["source"]["sha256"], "audio_source_sha256": a["source"]["sha256"],
             "motion_clock_id": "capture-seconds", "audio_clock_id": "master-seconds",
             "motion_origin_seconds": 0., "audio_origin_seconds": 0., "seconds_scale": 1.,
             "relationship": "same_performance"}
    return m, a, clock, mp, ap


def align(data, **kwargs):
    m, a, c, mp, ap = data
    return align_motion_audio(m, a, c, motion_source=mp, audio_source=ap, **kwargs)


def test_known_signed_offset_and_unchanged_events(tmp_path):
    data = fixture(tmp_path)
    before = deepcopy(data[:3])
    result = align(data, variable_tempo=False, max_offset_seconds=.8, rate_multipliers=[1.])
    top = result["candidates"][0]
    assert top["intercept_seconds"] == pytest.approx(.373, abs=.002)
    assert top["stream_comparisons"][0]["matched_event_count"] == 35
    assert top["stream_comparisons"][0]["median_absolute_error_seconds"] < .002
    assert result["selected_candidate_id"] is None and result["music_timing_verified"] is False
    assert data[:3] == before
    assert np.isnan(map_motion_seconds(top, [-1., 100.])).all()
    reverse = fixture(tmp_path, audio_times=np.array([e["seconds"] for e in data[0]["streams"][0]["events"]]) - .3)
    negative = align(reverse, variable_tempo=False, max_offset_seconds=.8, rate_multipliers=[1.])
    assert negative["candidates"][0]["intercept_seconds"] == pytest.approx(-.3, abs=.002)


def test_periodic_phase_and_half_double_remain_explicit(tmp_path):
    mt = np.arange(.5, 16., .5)
    data = fixture(tmp_path, mt, mt + .25)
    result = align(data, variable_tempo=False, max_offset_seconds=1)
    assert result["result_status"] == "ambiguous_candidates_require_review"
    assert len(result["ambiguity_candidate_ids"]) >= 2
    assert {c["rate_multiplier"] for c in result["candidates"]} >= {.5, 1., 2.}
    assert all(c["requires_review"] for c in result["candidates"])


@pytest.mark.parametrize("rate", [.5, 2.])
def test_half_double_physical_playback_rate_is_recovered(tmp_path, rate):
    mt = np.cumsum(np.tile([.41, .62, .47, .55, .72, .38, .58], 5))
    result = align(fixture(tmp_path, mt, mt * rate + .2), variable_tempo=False, max_offset_seconds=.5)
    top = result["candidates"][0]
    assert top["rate_multiplier"] == rate
    assert top["playback_rate_motion_seconds_per_audio_second"] == 1 / rate
    assert top["intercept_seconds"] == pytest.approx(.2, abs=.002)


def test_variable_tempo_path_uses_original_events_and_unused_anchor_check(tmp_path):
    mt = np.arange(.4, 20., .5)
    at = mt + .15 + .0018 * mt**2
    result = align(fixture(tmp_path, mt, at), max_offset_seconds=1.5,
                   tolerance_seconds=.045, rate_multipliers=[1.])
    warps = [c for c in result["candidates"] if c["method"] == "bounded_monotone_event_path"]
    assert warps
    top = warps[0]
    assert top["interpolation_check"]["p95_error_seconds"] < .01
    assert top["interpolation_check"]["independent_test_set"] is False
    for segment in top["mapping_segments"]:
        for anchor in segment["anchors"]:
            assert anchor["motion_seconds"] == mt[anchor["motion_event_index"]]
            assert anchor["audio_seconds"] == at[anchor["audio_event_index"]]
    estimates = map_motion_seconds(top, mt)
    valid = np.isfinite(estimates)
    assert np.median(np.abs(estimates[valid] - at[valid])) < .01


def test_no_interpolation_through_source_gaps(tmp_path):
    mt = np.r_[np.arange(.5, 5., .5), np.arange(9.5, 18., .5)]
    data = fixture(tmp_path, mt, mt + .25, motion_segments=[[0., 5.], [9., 24.]],
                   audio_segments=[[0., 5.5], [9., 48.]])
    result = align(data, rate_multipliers=[1.], max_offset_seconds=.4)
    top = result["candidates"][0]
    assert len(top["mapping_segments"]) == 2
    assert np.isnan(map_motion_seconds(top, [6., 7., 8.])).all()
    with pytest.raises(ValueError, match="gap"):
        create_alignment_revision(result, report_sha256="a"*64, candidate_id=top["candidate_id"],
                                  reviewer="fixture", manual_anchors=[
                                      {"motion_seconds": 1., "audio_seconds": 1.25},
                                      {"motion_seconds": 12., "audio_seconds": 12.25}])


def test_missing_events_preserved_and_one_to_one_matches(tmp_path):
    data = fixture(tmp_path)
    del data[1]["streams"][0]["events"][7:10]
    result = align(data, variable_tempo=False, rate_multipliers=[1.], max_offset_seconds=.5)
    pairs = result["candidates"][0]["stream_comparisons"][0]["matched_event_indices"]
    assert len(pairs) == 32
    assert len({m for m, _ in pairs}) == len(pairs) == len({a for _, a in pairs})
    assert len(data[1]["streams"][0]["events"]) == 32


def test_large_match_index_sample_keeps_original_indices_and_full_statistics(tmp_path):
    mt = np.arange(.5, 22., .12)
    data = fixture(tmp_path, mt, mt + .033)
    for index, event in enumerate(data[0]["streams"][0]["events"]):
        if index % 5 == 0:
            event["strength"] = 0.
    result = align(data, rate_multipliers=[1.], max_offset_seconds=.05,
                   tolerance_seconds=.005, variable_tempo=False)
    comparison = result["candidates"][0]["stream_comparisons"][0]
    assert comparison["matched_event_count"] == sum(i % 5 != 0 for i in range(len(mt)))
    assert comparison["matched_event_indices_sampled"] is True
    assert len(comparison["matched_event_indices"]) == 64
    assert all(i == j and i % 5 != 0 for i, j in comparison["matched_event_indices"])


def test_silence_no_overlap_and_zero_strength_abstain(tmp_path):
    data = fixture(tmp_path, [], [])
    assert align(data)["result_status"] == "insufficient_event_support"
    data = fixture(tmp_path)
    for e in data[0]["streams"][0]["events"]:
        e["strength"] = 0.
    assert not align(data)["candidates"]
    data = fixture(tmp_path, [1., 2., 3., 4., 5.], [31., 32., 33., 34., 35.])
    assert not align(data, max_offset_seconds=0, rate_multipliers=[1.])["candidates"]


def test_correlated_streams_do_not_add_independent_votes(tmp_path):
    data = fixture(tmp_path)
    first = data[0]["streams"][0]
    for index in range(10):
        data[0]["streams"].append({**deepcopy(first), "id": "duplicate" + str(index)})
    result = align(data, variable_tempo=False, rate_multipliers=[1.], max_offset_seconds=.5)
    assert result["candidates"][0]["supporting_family_pair_count"] == 1
    assert len(result["stream_selection"]["motion"]["omitted_stream_ids"]) == 3


@pytest.mark.parametrize("change", ["clock", "hash", "bytes", "predicted", "duplicates", "nan"])
def test_untrusted_identity_clocks_and_events_fail_closed(tmp_path, change):
    data = fixture(tmp_path)
    m, a, clock, mp, _ = data
    if change == "clock":
        clock["motion_clock_id"] = "some-other-clock"
    elif change == "hash":
        clock["audio_source_sha256"] = "f"*64
    elif change == "bytes":
        mp.write_bytes(b"changed-source")
    elif change == "predicted":
        m["streams"][0]["event_type"] = "predicted_grid"
    elif change == "duplicates":
        a["streams"][0]["events"][1]["seconds"] = a["streams"][0]["events"][0]["seconds"]
    else:
        m["streams"][0]["events"][0]["seconds"] = float("nan")
    with pytest.raises(ValueError):
        align(data)


def test_review_revision_has_explicit_independent_confirmations(tmp_path):
    result = align(fixture(tmp_path), rate_multipliers=[1.], max_offset_seconds=.5, variable_tempo=False)
    report_path = tmp_path / "report.json"
    write_document(report_path, result)
    candidate = result["candidates"][0]["candidate_id"]
    rev = create_alignment_revision(result, report_sha256=file_hash(report_path), candidate_id=candidate,
                                     reviewer="Synthetic reviewer")
    assert rev["mapping_status"] == "user_confirmed"
    assert rev["beat_one_status"] == rev["meter_status"] == "unconfirmed"
    assert not rev["loop_seams_verified"] and not rev["retargeting_verified"]
    next_rev = create_alignment_revision(result, report_sha256=file_hash(report_path), candidate_id=candidate,
                                          reviewer="Synthetic reviewer", beat_one_audio_seconds=.373,
                                          meter=(6, 8), previous_revision=rev)
    assert next_rev["revision"] == 2
    assert next_rev["previous_revision_sha256"] == document_hash(rev)
    assert next_rev["beat_one_status"] == "user_confirmed"
    assert result["selected_candidate_id"] is None
    with pytest.raises(ValueError, match="different"):
        create_alignment_revision(result, report_sha256="b"*64, candidate_id=candidate,
                                  reviewer="fixture", previous_revision=rev)


@pytest.mark.parametrize("mutation", ["report", "source", "anchors", "status", "beat_one", "mesh", "timestamp"])
def test_saved_review_tampering_is_rejected(tmp_path, mutation):
    result = align(fixture(tmp_path), rate_multipliers=[1.], max_offset_seconds=.5, variable_tempo=False)
    rev = create_alignment_revision(result, report_sha256="a"*64,
                                     candidate_id=result["candidates"][0]["candidate_id"], reviewer="fixture")
    if mutation == "report":
        result["clock_mapping"]["seconds_scale"] = 2.
    elif mutation == "source":
        rev["audio_source_sha256"] = "b"*64
    elif mutation == "anchors":
        rev["mapping_segments"][0]["anchors"][0]["audio_seconds"] = -1.
    elif mutation == "status":
        rev["decision"] = "reject"
    elif mutation == "beat_one":
        rev["beat_one_status"] = "user_confirmed"
    elif mutation == "mesh":
        rev["retargeting_verified"] = True
    else:
        rev["reviewed_at"] = "2026-11-01T10:00:00"
    with pytest.raises(ValueError):
        validate_alignment_revision(result, rev, report_sha256="a"*64)


def test_positive_offset_exactly_at_search_boundary_is_included(tmp_path):
    mt = np.cumsum(np.tile([.41, .62, .47, .55, .72, .38, .58], 5))
    result = align(fixture(tmp_path, mt, mt + .5), variable_tempo=False,
                   max_offset_seconds=.5, rate_multipliers=[1.])
    assert result["candidates"][0]["intercept_seconds"] == pytest.approx(.5, abs=.002)


def test_fractional_clock_generated_boundary_is_reviewable_but_manual_overflow_is_not(tmp_path):
    mt = np.cumsum(np.tile([.41, .62, .47, .55, .72, .38, .58], 4))
    data = fixture(tmp_path, mt, .97 * mt + .1)
    motion, audio, clock, _, _ = data
    motion["source"]["seconds_range"] = [0., 20.]
    motion["source"]["valid_segments_seconds"] = [[0., 20.]]
    audio["source"]["seconds_range"] = [0., 16.]
    audio["source"]["valid_segments_seconds"] = [[0., 16.]]
    clock.update(seconds_scale=.97, audio_origin_seconds=.1)
    result = align(data, max_offset_seconds=0., rate_multipliers=[1.], variable_tempo=False)
    candidate = result["candidates"][0]
    # The inverse/forward arithmetic formerly produced 16.000000000000004,
    # making the algorithm's own best candidate impossible to accept.
    assert candidate["mapping_segments"][0]["audio_seconds_range"] == [.1, 16.]
    revision = create_alignment_revision(result, report_sha256="a" * 64,
                                         candidate_id=candidate["candidate_id"], reviewer="fixture")
    assert revision["mapping_status"] == "user_confirmed"
    segment = revision["mapping_segments"][0]
    outside = float(np.nextafter(16., np.inf))
    segment["audio_seconds_range"][1] = outside
    segment["anchors"][-1]["audio_seconds"] = outside
    with pytest.raises(ValueError, match="boundary or coverage gap"):
        validate_alignment_revision(result, revision, report_sha256="a" * 64)


def test_saved_audio_event_bridge_never_uses_predicted_grids():
    report = {"format": "stemlab.rhythm-evidence.v1", "input": {"kind": "audio", "sha256": "a"*64,
              "source_seconds_range": [0., 10.]}, "hypotheses": [{"grid_seconds": [1., 2., 3.]}]}
    with pytest.raises(ValueError, match="no source-observed"):
        events_from_rhythm_report(report, source_sha256="a"*64, clock_id="master")
    report["hypotheses"][0]["onset_aligned_beat_candidates_seconds"] = [1., 2., 4., 5.]
    events = events_from_rhythm_report(report, source_sha256="a"*64, clock_id="master")
    assert [e["seconds"] for e in events["streams"][0]["events"]] == [1., 2., 4., 5.]
    with pytest.raises(ValueError, match="different audio"):
        events_from_rhythm_report(report, source_sha256="b"*64, clock_id="master")


def test_isolated_frames_do_not_invent_an_alignable_continuous_interval():
    report = {"format": "stemlab.rig-motion-analysis", "source_file_sha256": "a" * 64,
              "profile_sha256": "b" * 64, "source_range_seconds": [0., 1.],
              "source_valid_segments_seconds": [[0., 0.], [1., 1.]], "motion_accents": []}
    with pytest.raises(ValueError, match="isolated frames have no continuous time span"):
        events_from_rig_report(report, clock_id="source")


def test_json_duplicates_nonclobber_and_cli(tmp_path):
    import typer
    from rich.console import Console
    from typer.testing import CliRunner
    from stemlab.rig_motion_cli import register_rig_motion_commands
    data = fixture(tmp_path)
    m, a, clock, mp, ap = data
    paths = [tmp_path / name for name in ("motion.json", "audio.json", "clock.json")]
    for path, document in zip(paths, (m, a, clock)):
        write_document(path, document)
    app = typer.Typer()
    register_rig_motion_commands(app, Console())
    output = tmp_path / "aligned.json"
    args = ["align-motion-audio", str(paths[0]), str(paths[1]), "--motion-source", str(mp),
            "--audio-source", str(ap), "--clock-map", str(paths[2]), "--output", str(output),
            "--rate", "1", "--max-offset", ".5", "--constant-tempo"]
    runner = CliRunner()
    result = runner.invoke(app, args)
    assert result.exit_code == 0, result.output
    saved, _ = read_document(output)
    assert saved["candidates"][0]["intercept_seconds"] == pytest.approx(.373, abs=.002)
    before = output.read_bytes()
    assert runner.invoke(app, args).exit_code != 0
    assert output.read_bytes() == before
    revision = tmp_path / "review.json"
    reviewed = runner.invoke(app, ["confirm-motion-alignment", str(output), "--candidate",
                                     saved["candidates"][0]["candidate_id"], "--reviewer", "Fixture",
                                     "--beat-one", ".373", "--meter", "4/4", "--output", str(revision)])
    assert reviewed.exit_code == 0, reviewed.output
    assert read_document(revision)[0]["beat_one_status"] == "user_confirmed"
    bad = tmp_path / "duplicate.json"
    bad.write_text('{"format":"x","format":"y"}')
    with pytest.raises(ValueError, match="Duplicate"):
        read_document(bad)


def test_offline_motion_api_does_not_import_audio_or_model_stack():
    code = """
import sys
import stemlab.analysis.rig_motion
import stemlab.analysis.motion_alignment
assert not any(x in sys.modules for x in ('soundfile', 'torch', 'librosa', 'stemlab.analysis.runner'))
"""
    result = subprocess.run([sys.executable, "-c", code], capture_output=True, text=True,
                            env={**os.environ, "PYTHONPATH": str(Path(__file__).resolve().parents[1] / "src")})
    assert result.returncode == 0, result.stderr


def test_empty_streams_are_legal_but_out_of_bounds_events_are_not(tmp_path):
    m = fixture(tmp_path)[0]
    m["streams"] = []
    assert validate_event_evidence(m)["streams"] == []
    m = fixture(tmp_path)[0]
    m["streams"][0]["events"][0]["seconds"] = -.1
    with pytest.raises(ValueError, match="coverage"):
        validate_event_evidence(m)
