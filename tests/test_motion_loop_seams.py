import numpy as np
import pytest

from stemlab.analysis.motion_loop_seams import measure_pcm_join, rank_aligned_motion_loops


def test_pcm_wrap_uses_last_included_sample_and_both_channels():
    pcm = np.zeros((16000, 2))
    pcm[7999, 1] = .8
    pcm[8000, 0] = .1
    seam = measure_pcm_join(pcm, 8000, 0, 1)
    assert seam["step_peak"] == pytest.approx(.8)
    assert seam["possible_click"]


def test_ranker_rejects_click_and_prefers_smaller_view_reset():
    t = np.arange(481) / 60
    x = np.sin(2 * np.pi * t)[:, None]
    channels = [dict(bone="wrist", data_path="rotation_euler", array_index=0)]
    pcm = np.zeros((8 * 8000, 2))
    pcm[8000] = .8
    result = rank_aligned_motion_loops(
        t, x, channels, np.arange(1., 8.), beat_count=2, pcm=pcm, sample_rate=8000,
        max_shift_seconds=0, view_seam=lambda start, end: (0., 0. if start == 3 else .9),
    )
    assert result
    assert result[0]["start_seconds"] == 3
    assert result[0]["end_seconds"] == 5
    assert all(c["start_seconds"] != 1 and not c["audio_seam"]["possible_click"] for c in result)
    assert all(c["requires_review"] for c in result)


def test_grid_shift_preserves_exact_duration_and_bounds():
    t = np.arange(241) / 60
    x = np.sin(2 * np.pi * t)[:, None]
    channels = [dict(bone="wrist", data_path="rotation_euler", array_index=0)]
    cuts = rank_aligned_motion_loops(
        t, x, channels, [0, 1, 2, 3, 4], beat_count=2,
        view_seam=lambda start, end: (0., 0. if start > 1.008 else .8),
    )
    assert cuts
    assert all(0 <= c["start_seconds"] < c["end_seconds"] <= 4 for c in cuts)
    assert all(c["end_seconds"] - c["start_seconds"] == pytest.approx(2) for c in cuts)
    assert all(abs(c["beat_shift_seconds"]) <= .015 + 1e-12 for c in cuts)


def test_missing_motion_interval_cannot_be_used_as_a_loop_join():
    t = np.r_[np.arange(120), np.arange(145, 361)] / 60
    x = np.sin(2 * np.pi * t)[:, None]
    channels = [dict(bone="wrist", data_path="rotation_euler", array_index=0)]
    cuts = rank_aligned_motion_loops(
        t, x, channels, np.arange(1., 6.), beat_count=2, max_shift_seconds=0,
    )
    assert [cut["start_seconds"] for cut in cuts] == [3.]
