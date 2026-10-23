"""Sub-frame ACF precision and explicit inferred beat-count bookkeeping.

Synthetic sources only. There is no assertion of musical beat one or downbeats.
"""
from __future__ import annotations

import numpy as np
import pytest

from stemlab.analysis.beat_evidence import (
    RhythmInput,
    _refined_period_lag,
    analyze_input,
)


def _pulse_train(bpm: float, *, seconds: float = 32.) -> RhythmInput:
    times = np.arange(0, seconds, .01)
    y = np.zeros(times.size)
    for i, beat in enumerate(np.arange(.23, seconds - .25, 60. / bpm)):
        # Four-beat accents can make an autocorrelation choose half time.
        accent = (1., .65, .82, .65)[i % 4]
        y += accent * np.exp(-.5 * ((times - beat) / .026) ** 2)
    return RhythmInput('synthetic', 'test', times, {'pulse': y}, 'a' * 64, 'synthetic')


@pytest.mark.parametrize('bpm', [72.5, 107.14, 109., 145., 187.5])
def test_refinement_reduces_integer_lag_quantisation_without_resolving_octaves(bpm):
    report = analyze_input(_pulse_train(bpm), min_bpm=60, max_bpm=200, include_plp=False)
    hypotheses = [h for h in report['hypotheses']
                  if h['detector'] in {'unbiased_autocorrelation', 'multi_tap_comb'}]
    assert hypotheses
    for h in hypotheses:
        detail = h['lag_refinement']
        assert detail['fps_of_feature_trace'] == 100
        assert detail['metrical_level_ambiguity_unchanged'] is True
        # Compare against the matching half/double interpretation; the source
        # alone does not tell us which one is a genuine musical quarter note.
        possible = (bpm / 2, bpm, bpm * 2)
        reference = min(possible, key=lambda target: abs(target - h['bpm']))
        assert abs(h['bpm'] - reference) < 0.8, h
        coarse_error = abs(detail['coarse_integer_bin_bpm'] - reference)
        refined_error = abs(h['bpm'] - reference)
        assert refined_error <= coarse_error + .05


def test_peak_at_boundary_or_flat_curve_falls_back_to_original_integer_bin():
    for scores, index in [(np.asarray([3., 2., 1.]), 0),
                          (np.asarray([1., 1., 1.]), 1),
                          (np.asarray([1., 2., 3.]), 2)]:
        lag, detail = _refined_period_lag(np.array([40, 41, 42]), scores, index, 60, 200)
        assert lag == 40 + index
        assert detail['status'] == 'integer_bin_no_stable_interior_peak'


def test_precision_metadata_keeps_distinct_observed_and_inferred_counts():
    report = analyze_input(_pulse_train(120.), min_bpm=90, max_bpm=140, include_plp=False)
    dp = [h for h in report['hypotheses'] if h['detector'] == 'dynamic_programming_onsets']
    assert dp
    for hypothesis in dp:
        counts = hypothesis['beat_count_diagnostics']
        observed = len(hypothesis['onset_aligned_beat_candidates_seconds'])
        assert counts['observed_onset_candidates_in_path'] == observed
        assert counts['inferred_unobserved_intermediate_slots'] >= 0
        assert (counts['estimated_ordinal_slots_between_first_and_last_onsets']
                == observed + counts['inferred_unobserved_intermediate_slots'])
        assert counts['predicted_full_source_grid_slots'] == hypothesis['beat_count_grid']
        assert counts['observed_onset_candidates_are_not_confirmed_music_beats'] is True
        assert counts['missing_slot_counts_are_inferred_not_observed'] is True


def test_no_period_or_beat_count_claim_from_static_motion():
    t = np.arange(0, 20, .01)
    report = analyze_input(RhythmInput('static', 'test', t, {'motion': np.zeros(len(t))},
                                       'a' * 64, 'synthetic'),
                           min_bpm=60, max_bpm=200, include_plp=False)
    assert not report['hypotheses']


def test_tempo_family_keeps_source_path_coverage_separate_from_detector_votes():
    from stemlab.analysis.beat_evidence import _tempo_family_summary
    hypotheses = [
        {'detector': 'unbiased_autocorrelation', 'feature': 'bass', 'bpm': 146.3},
        {'detector': 'multi_tap_comb', 'feature': 'bass', 'bpm': 146.3},
        {'detector': 'dynamic_programming_onsets', 'feature': 'bass', 'bpm': 146.3,
         'observed_candidate_fraction_of_source_grid': .57},
        {'detector': 'unbiased_autocorrelation', 'feature': 'treble', 'bpm': 109.1},
        {'detector': 'dynamic_programming_onsets', 'feature': 'treble', 'bpm': 109.1,
         'observed_candidate_fraction_of_source_grid': .94},
    ]
    grouped, status = _tempo_family_summary(hypotheses)
    assert status == 'incompatible_tempo_families_review_required'
    by_tempo = {round(row['tempo_levels_bpm'][0]): row for row in grouped}
    assert by_tempo[109]['best_full_source_observed_path_coverage'] == .94
    assert by_tempo[109]['features_with_80pct_path_coverage'] == ['treble']
    assert by_tempo[146]['best_full_source_observed_path_coverage'] == .57
    assert by_tempo[146]['features_with_80pct_path_coverage'] == []
    assert by_tempo[109]['coverage_is_not_confidence_or_musical_ground_truth'] is True
