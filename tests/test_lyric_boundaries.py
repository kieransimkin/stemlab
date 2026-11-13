import pytest

from stemlab.lyric_boundaries import BoundaryObservation, select_boundaries


def obs(source, family, frame, strength=.8):
    return BoundaryObservation(source, family, frame, strength)


def select(words):
    return select_boundaries(words, num_frames=3000, sample_rate=1000)


def test_related_decodes_cannot_outvote_two_independent_acoustic_methods():
    whispers = [obs(f"whisper-{i}", "attention", 200 + i) for i in range(5)]
    result = select([(
        whispers + [obs("ctc", "ctc", 500), obs("other", "other", 520)],
        [obs("ctc", "ctc", 710), obs("other", "other", 740)],
    )])[0]
    assert result["onset"]["frame"] == 500
    assert result["onset"]["corroborating_families"] == ["other"]
    assert result["onset"]["competing_families"] == ["attention"]
    assert "onset_disagreement" in result["review_reasons"]


def test_weaker_actual_end_can_keep_two_words_instead_of_clipping_first_word():
    result = select([
        ([obs("a", "ctc", 120)], [obs("a", "ctc", 420), obs("b", "other", 270, .5)]),
        ([obs("b", "other", 320)], [obs("b", "other", 500)]),
    ])
    assert [(r["onset"]["frame"], r["release"]["frame"]) for r in result] == [(120, 270), (320, 500)]
    assert result[0]["release"]["source"] == "b"


def test_an_unobserved_or_reversed_edge_leaves_the_word_untimed():
    result = select([([obs("a", "ctc", 400)], [obs("a", "ctc", 400)]), ([], [])])
    assert all(r["onset"] is None and r["release"] is None for r in result)
    assert result[0]["onset_candidates"][0]["frame"] == 400


def test_bad_source_frame_is_not_clamped():
    with pytest.raises(ValueError, match="Invalid source-bound observation"):
        select([([obs("a", "ctc", -1)], [obs("a", "ctc", 400)])])
