import pytest

from stemlab.lyric_lrc import build_lrc
from stemlab.word_alignment import reconcile


def observed(words):
    return [dict(word=word, start=i + 0.123, end=i + 0.4) for i, word in enumerate(words)]


def test_exact_text_stanzas_and_repeated_choruses():
    text = "Don't cut anything\n\nDon't cut anything"
    alignment = reconcile(text, observed(["Don't", "cut", "anything"] * 2), 10)
    lrc, report = build_lrc(alignment, title="Song", artist="Artist")
    assert "[00:00.12]Don't cut anything\n\n[00:03.12]Don't cut anything" in lrc
    assert report["first_word_anchor_count"] == 2
    assert report["canonical_text_parity"]
    assert not report["accepted"]


def test_missing_first_word_uses_observed_anchor_with_explicit_review():
    alignment = reconcile("Fly softly home\nStay close", observed(["softly", "home", "Stay", "close"]), 10)
    lrc, report = build_lrc(alignment, title="Song", artist="Artist")
    assert "[00:00.12]Fly softly home" in lrc
    assert not report["cues"][0]["first_word_anchored"]
    assert report["review_line_count"] == 1


def test_no_observed_line_is_not_interpolated():
    alignment = reconcile("one two three four\nmissing", observed(["one", "two", "three", "four"]), 10)
    with pytest.raises(ValueError, match="no usable observed timing"):
        build_lrc(alignment, title="Song", artist="Artist")


def test_threshold_is_required():
    alignment = reconcile("one two three four", observed(["one"]), 10)
    with pytest.raises(ValueError, match="70%"):
        build_lrc(alignment, title="Song", artist="Artist")


def test_centisecond_collision_is_not_silently_shifted():
    alignment = reconcile("one\ntwo", [dict(word="one", start=1, end=1.001),
                                       dict(word="two", start=1.004, end=1.2)], 10)
    with pytest.raises(ValueError, match="non-monotonic"):
        build_lrc(alignment, title="Song", artist="Artist")


def test_out_of_duration_word_is_not_used():
    alignment = reconcile("one", [dict(word="one", start=12, end=13)], 10)
    with pytest.raises(ValueError, match="no usable"):
        build_lrc(alignment, title="Song", artist="Artist")


def test_metadata_cannot_inject_cues():
    alignment = reconcile("one", observed(["one"]), 10)
    with pytest.raises(ValueError, match="metadata"):
        build_lrc(alignment, title="Song\n[00:00]", artist="Artist")


def test_observed_recovery_keeps_canonical_text_and_review_state():
    alignment = reconcile("gilt trip", observed(["gilt", "trip"]), 10)
    anchor = dict(word="guilt", start=2.32, end=2.6, index=None,
                  match="observed_section_recovery", review_reasons=["review"],
                  recovery_evidence={"source": "observed word"})
    lrc, report = build_lrc(alignment, title="Song", artist="Artist", line_anchors={1: anchor})
    assert "[00:02.32]gilt trip" in lrc
    assert report["review_line_count"] == 1
    assert not report["accepted"]


def test_invalid_observed_recovery_is_rejected():
    alignment = reconcile("one", observed(["one"]), 10)
    with pytest.raises(ValueError, match="invalid observed"):
        build_lrc(alignment, title="Song", artist="Artist",
                  line_anchors={1: dict(word="one", start=-2, end=2, index=None)})
