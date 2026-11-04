import pytest
from stemlab.lyric_parts import assemble_lines


def row(number, text, start, part):
    return dict(
        canonical_line=number,
        text=text,
        start=start,
        end=start + 1,
        part=part,
        evidence={"kind": "synthetic_observation"},
    )


def test_overlapping_parts_are_not_serialized_or_shifted():
    text = "First phrase\nNext phrase\nBacking phrase\n"
    lrc, report = assemble_lines(
        text,
        [
            row(1, "First phrase", 2, "lead"),
            row(2, "Next phrase", 4, "lead"),
            row(3, "Backing phrase", 2, "backing"),
        ],
        10,
        title="Test",
        artist="Test",
    )
    assert "[00:02.00]First phrase\n[00:02.00]Backing phrase\n[00:04.00]Next phrase" in lrc
    assert report["canonical_occurrences_exact"] and not report["accepted"]


def test_missing_duplicate_or_substituted_occurrences_are_rejected():
    for rows in [
        [row(1, "one", 1, "lead")],
        [row(1, "one", 1, "lead")] * 2,
        [row(1, "different", 1, "lead"), row(2, "two", 2, "lead")],
    ]:
        with pytest.raises(ValueError):
            assemble_lines("one\ntwo", rows, 10, title="Test", artist="Test")


def test_time_cannot_reverse_inside_one_part():
    with pytest.raises(ValueError, match="line-level"):
        assemble_lines(
            "one\ntwo",
            [row(1, "one", 4, "lead"), row(2, "two", 2, "lead")],
            10,
            title="Test",
            artist="Test",
        )


def test_input_timestamp_and_artist_metadata_are_never_silently_repaired():
    bad = row(1, "one", -1, "lead")
    with pytest.raises(ValueError, match="source-clock"):
        assemble_lines("one", [bad], 10, title="Test", artist="Test")
