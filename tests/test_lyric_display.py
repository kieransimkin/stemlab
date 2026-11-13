import json
from copy import deepcopy

import pytest
from typer.testing import CliRunner

from stemlab.cli import app
from stemlab.lyric_display import DisplayPolicy, propose_display, read_display_reference, score_edges
from stemlab.word_alignment import reconcile


def test_long_pickup_display_adjustment_keeps_original_acoustic_edges():
    lines = [
        {"first_word_start": 10.0, "first_word_end": 11.8, "last_word_end": 13.2},
        {"first_word_start": 14.0, "first_word_end": 14.3, "last_word_end": 17.0},
    ]
    before = deepcopy(lines)
    proposed = propose_display(lines, 20)
    assert lines == before
    assert proposed[0]["first_word_start"] == 10
    assert proposed[0]["display_start"] == pytest.approx(10.85)
    assert proposed[0]["display_clear"] == 13.2
    assert proposed[1]["display_start"] == 14
    assert proposed[1]["display_clear"] == 17
    assert propose_display(lines, 20, policy=DisplayPolicy(hold_until_next_within=1))[0]["display_clear"] == 14


def test_display_shift_does_not_pass_next_anchored_occurrence():
    proposed = propose_display([
        {"first_word_start": 10, "first_word_end": 12, "last_word_end": 13},
        {"first_word_start": 11, "first_word_end": 11.3, "last_word_end": 14},
    ], 20)
    assert proposed[0]["display_start"] == 10
    assert proposed[0]["display_clear"] == 11
    assert proposed[0]["last_word_end"] == 13


def test_unknown_line_does_not_inherit_times_and_following_long_gap_does_not_hold():
    proposed = propose_display([
        {"first_word_start": 1, "first_word_end": 1.4, "last_word_end": 2},
        {},
        {"first_word_start": 3, "last_word_end": 3.5},
        {"first_word_start": 8, "last_word_end": 10},
    ], 11, policy=DisplayPolicy(hold_until_next_within=1.5))
    assert proposed[0]["display_clear"] == 2
    assert proposed[1]["display_start"] is None and proposed[1]["display_clear"] is None
    assert proposed[2]["display_clear"] == 3.5


def test_one_part_display_can_clear_at_next_line_without_clipping_acoustic_release():
    proposed = propose_display([
        {"first_word_start": 1, "last_word_end": 3},
        {"first_word_start": 2.5, "last_word_end": 4},
    ], 5)
    assert proposed[0]["display_clear"] == 2.5
    assert proposed[0]["last_word_end"] == 3
    assert proposed[0]["display_clear_method"] == "display_overlap_clipped_at_next_start"


def test_missing_prediction_is_coverage_loss_and_not_zero_error():
    scored = score_edges([1, 2, 3, None], [1.10, None, 2.5, 5])
    assert scored["paired"] == 2 and scored["coverage"] == pytest.approx(2/3)
    assert scored["mean_absolute_error_seconds"] == pytest.approx(.3)
    assert scored["within_100ms"] == 1
    assert scored["median_signed_error_seconds"] == pytest.approx(-.2)


def test_reference_retains_offsets_explicit_clears_and_ambiguous_events():
    reference = read_display_reference(
        "[offset:500]\n[00:01.5]First\n[00:04.5]\n[00:03.5]Second\n"
        "[00:03.5]\n[00:06.5]Third\n[00:08.5]Fourth\n[00:10.5]\n", 10,
    )
    assert [(r["display_start"], r["display_clear"], r["clear_issue"]) for r in reference] == [
        (1, 4, "clear_after_next_display_start"), (3, 3, "nonpositive_display_span"),
        (6, None, None), (8, 10, None),
    ]
    with pytest.raises(ValueError, match="outside the source on LRC line 1"):
        read_display_reference("[00:11]Outside", 10)


def test_cli_scores_authored_hold_and_preserves_both_sources(tmp_path):
    source = tmp_path / "reconciliation.json"
    lrc = tmp_path / "artist.lrc"
    output = tmp_path / "draft.json"
    raw = json.dumps(reconcile("Float\nAgain", [
        {"word": "Float", "start": 1, "end": 2.7},
        {"word": "Again", "start": 4, "end": 4.4},
    ], 6))
    reference = "[00:01.75]Float\n[00:04]\n[00:04]Again\n[00:05]\n"
    source.write_text(raw, encoding="utf-8")
    lrc.write_text(reference, encoding="utf-8")
    args = ["lyric-display", str(source), "--reference-lrc", str(lrc), "-o", str(output), "--hold-until-next-within", "1.5"]
    result = CliRunner().invoke(app, args)
    assert result.exit_code == 0, result.output
    document = json.loads(output.read_text(encoding="utf-8"))
    line = document["lines"][0]
    assert (line["first_word_start"], line["last_word_end"], line["display_clear"]) == (1, 2.7, 4)
    assert document["display_benchmark"]["proposed_start"]["within_100ms"] == 2
    assert source.read_text(encoding="utf-8") == raw
    assert lrc.read_text(encoding="utf-8") == reference
    before = output.read_bytes()
    assert CliRunner().invoke(app, args).exit_code != 0
    assert output.read_bytes() == before
    unrelated = tmp_path / "other.lrc"
    unrelated.write_text(reference.replace("Again", "Wrong"), encoding="utf-8")
    absent = tmp_path / "no-output.json"
    result = CliRunner().invoke(app, ["lyric-display", str(source), "--reference-lrc", str(unrelated), "-o", str(absent)])
    assert result.exit_code != 0 and "same lyrics" in result.output
    assert not absent.exists()
