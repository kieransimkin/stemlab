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


def test_minimum_duration_can_reject_a_letter_peak_paired_with_an_early_end():
    result = select_boundaries(
        [([obs("letter", "ctc", 650)], [obs("attention", "attention", 674), obs("other", "other", 1030, .45)])],
        num_frames=2000, sample_rate=1000, min_word_seconds=.06,
    )[0]
    assert result["onset"]["frame"] == 650
    assert result["release"]["frame"] == 1030
    assert {row["frame"] for row in result["release_candidates"]} == {674, 1030}


def test_weak_observations_are_retained_but_do_not_count_as_corroboration():
    result = select([(
        [obs("weak", "other", 505, .16), obs("acoustic", "ctc", 500)],
        [obs("weak", "other", 795, .2), obs("acoustic", "ctc", 800)],
    )])[0]
    assert result["onset"]["corroborating_families"] == []
    assert result["release"]["corroborating_families"] == []
    assert result["interval_supporting_families"] == ["ctc"]
    assert {item["source"] for item in result["onset_candidates"]} == {"weak", "acoustic"}


def test_observed_duration_prevents_an_unheard_short_mixed_pair():
    words = [(
        [obs("acoustic", "ctc", 610, .93), obs("whisper", "attention", 300, .63)],
        [obs("acoustic", "ctc", 1140, .74), obs("whisper", "attention", 690, .85)],
    )]
    old = select_boundaries(words, sample_rate=1000, num_frames=3000, interval_weight=0)[0]
    new = select(words)[0]
    assert (old["onset"]["frame"], old["release"]["frame"]) == (610, 690)
    assert "no_strong_matching_complete_interval" in old["review_reasons"]
    assert (new["onset"]["frame"], new["release"]["frame"]) == (610, 1140)
    assert new["interval_supporting_families"] == ["ctc"]
