import numpy as np
import pytest

from stemlab.analysis.tempo_regimes import constant_beat_fit, missing_detection_fit


def test_missing_beat_indexes_do_not_turn_a_gap_into_a_tempo_change():
    times = np.array([.125, .625, 1.125, 2.125, 2.625, 3.125])
    before = times.copy()
    sequential = constant_beat_fit(times)
    assert sequential['precision_grade'] == 'poor'
    result = missing_detection_fit(times)
    assert result['proposed_bpm'] == pytest.approx(120)
    assert result['precision_grade'] == 'tight'
    assert result['inferred_beat_indexes'] == [0, 1, 2, 4, 5, 6]
    assert result['inferred_missing_beats'] == 1
    assert result['beat_count'] == 6
    assert result['first_anchored_p95_error_ms'] == 0
    np.testing.assert_array_equal(times, before)


def test_explicit_indexes_keep_interval_and_end_drift_guards():
    result = constant_beat_fit(np.array([.125, .625, 1.625]), beat_indexes=[0, 1, 3])
    assert result['proposed_bpm'] == pytest.approx(120)
    assert result['p95_interval_error_ms'] == 0
    assert result['anchored_end_drift_ms'] == 0
    for indexes in ([0, 1], [0, 0, 1], [0, 1.5, 3], [0, 1, float('inf')]):
        with pytest.raises(ValueError):
            constant_beat_fit(np.array([.125, .625, 1.625]), beat_indexes=indexes)


def test_half_time_without_missing_detections_is_not_silently_doubled():
    assert missing_detection_fit(np.array([.125, 1.125, 2.125, 3.125])) is None
    assert constant_beat_fit(np.array([.125, 1.125, 2.125, 3.125]))['proposed_bpm'] == 60
    assert missing_detection_fit(np.array([0, 1, 1])) is None
