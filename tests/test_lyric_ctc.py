import numpy as np
import pytest

from stemlab.lyric_ctc import align_window, ctc_spans


def emissions(path, classes):
    scores = np.full((len(path), classes), -12.0)
    for frame, label in enumerate(path):
        scores[frame, label] = 0.0
    return scores - np.log(np.exp(scores).sum(axis=1, keepdims=True))


def test_ctc_repeated_letters_need_blank_but_different_labels_do_not():
    scores = emissions([0, 1, 1, 0, 1, 2, 0], 3)
    assert ctc_spans(scores, [1, 1, 2]) == [(1, 3), (4, 5), (5, 6)]
    with pytest.raises(ValueError, match="Not enough"):
        ctc_spans(scores[:3], [1, 1, 2])


def test_ctc_window_ignores_a_stronger_earlier_repeat_and_keeps_native_clock():
    labels = ("-", "|", "A", "B")
    scores = emissions([0, 2, 1, 3, 0, 0, 2, 1, 3, 0, 0], len(labels))
    result = align_window(
        "A b!", scores, labels, sample_rate=44100, num_frames=200000,
        input_start_frame=88200, window=(92600, 97903),
    )
    a, b = result["words"]
    assert [a["word"], b["word"]] == ["A", "b"]
    assert (a["start_frame"], a["end_frame"]) == (93602, 94484)
    assert (b["start_frame"], b["end_frame"]) == (95366, 96248)
    assert a["start"] == a["start_frame"] / 44100
    assert not a["review_reasons"] and not b["review_reasons"]
    assert result["greedy_letters_in_window"] == "A B"
    assert b["greedy_letters_in_span"] == "B"


def test_ctc_forced_path_on_blank_does_not_look_corroborated():
    result = align_window(
        "A", emissions([0] * 10, 3), ("-", "|", "A"),
        sample_rate=16000, num_frames=6400, input_start_frame=0, window=(0, 3200),
    )
    word = result["words"][0]
    assert word["letter_score"] < 0.001
    assert {"weak_letter_evidence", "weak_first_letter", "weak_last_letter"} <= set(word["review_reasons"])


def test_ctc_unsupported_orthography_is_not_silently_discarded():
    with pytest.raises(ValueError, match="Unsupported spelling"):
        align_window(
            "A2", emissions([0, 2, 0], 3), ("-", "|", "A"),
            sample_rate=16000, num_frames=1600, input_start_frame=0, window=(0, 1600),
        )
