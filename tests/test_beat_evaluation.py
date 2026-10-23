"""Source-bound rhythm evaluation and disjoint-score calibration tests."""
from __future__ import annotations

import json

import numpy as np
import pytest

from stemlab.analysis.beat_evidence import _saved_beat_grid_fit, analyze_input, compare_reports
from stemlab.analysis.beat_evidence import RhythmInput
from stemlab.analysis.beat_evaluation import (
    ANNOTATION_FORMAT, beat_f_measure, calibrate_held_out, evaluate_report,
    read_annotation,
)


def fixture(tmp_path, bpm=120.0, duration=16, mislabel=None):
    source_hash = 'a' * 64
    times = np.arange(0., duration, 1 / 80.)
    data = np.zeros(len(times))
    anchors = np.arange(.20, duration - .1, 60 / bpm)
    for seconds in anchors:
        data += np.exp(-.5 * ((times - seconds) / .035)**2)
    src = RhythmInput('audio', 'synthetic', times, {'attack': data}, source_hash, 'synthetic')
    report = analyze_input(src, min_bpm=95, max_bpm=150, include_plp=False)
    annotation = dict(format=ANNOTATION_FORMAT, schema_version=1,
                      source_sha256=mislabel or source_hash,
                      clock='source_seconds', status='human_reviewed', annotator='unit_test',
                      beats=[float(x) for x in anchors], downbeats=[])
    path = tmp_path / 'beat-reference.json'
    path.write_text(json.dumps(annotation))
    return report, path


def test_one_to_one_matching_prevents_double_counting():
    ref = [.1, .6, 1.1, 1.6]
    pred = [.101, .102, .599, 1.6]
    result = beat_f_measure(pred, ref, tolerance=.07)
    assert result['matched_count'] == 3
    assert result['predicted_count'] == 4
    assert result['precision'] == .75
    assert result['recall'] == .75
    assert result['f_measure'] == .75


def test_source_bound_annotation_accepts_review_and_reports_timing_error(tmp_path):
    report, path = fixture(tmp_path)
    annotated = read_annotation(path)
    result = evaluate_report(report, annotated)
    assert result['annotation_status'] == 'human_reviewed'
    assert result['source_sha256'] == 'a'*64
    assert result['calibrated_confidence_status'] == 'unavailable_until_held_out_corpus'
    assert len(result['comparisons']) >= 3
    assert any(item['f_measure'] > .8 for item in result['comparisons'])


def test_unbound_annotation_rejected_and_source_unchanged(tmp_path):
    report, path = fixture(tmp_path, mislabel='b'*64)
    before = path.read_bytes()
    with pytest.raises(ValueError, match='source hash'):
        evaluate_report(report, read_annotation(path))
    assert path.read_bytes() == before


def test_no_artist_bpm_label_is_accepted_as_beat_annotation(tmp_path):
    fake = tmp_path/'bpm.json'
    fake.write_text(json.dumps({'format': ANNOTATION_FORMAT, 'schema_version':1,
                                'source_sha256':'a'*64,'status':'human_reviewed',
                                'clock':'source_seconds','annotator':'artist','bpm':145}))
    with pytest.raises(ValueError, match='Beat annotation'):
        read_annotation(fake)


def test_robust_global_fit_tracks_rounding_without_replacing_model_events():
    beat_times = np.arange(16., 170., 60 / 109.5)
    rounded = np.round(beat_times / .02) * .02
    copy = rounded.copy()
    fit = _saved_beat_grid_fit(rounded)
    assert fit['status'] == 'estimated_constant_tempo_grid'
    assert abs(fit['global_fit_bpm'] - 109.5) < .25, fit
    assert fit['observed_timestamp_count'] == len(beat_times)
    assert fit['segment_drift_percent'] < 2
    assert np.array_equal(rounded, copy)


def test_robust_fit_abstains_on_real_tempo_acceleration():
    first = 20 + np.arange(100) * .55
    later = first[-1] + np.cumsum(np.linspace(.55, .4, 100))
    beats = np.r_[first, later]
    fit = _saved_beat_grid_fit(beats)
    assert fit['status'] == 'nonconstant_or_poorly_fitted_grid_review_required'
    assert fit['segment_drift_percent'] > 4


def test_tempo_half_double_comparison_is_conditional_not_false_confirmation(tmp_path):
    t = np.arange(0.,16., .0125)
    def source(name, bpm, digest):
        y = np.zeros(len(t))
        for beat in np.arange(.2,15.7,60/bpm):
            y += np.exp(-.5*((t-beat)/.03)**2)
        return RhythmInput(name,'synthetic',t,{'onsets':y},digest,'source_seconds')
    full = analyze_input(source('full',120,'a'*64),min_bpm=115,max_bpm=125,include_plp=False)
    half = analyze_input(source('half',60,'b'*64),min_bpm=55,max_bpm=65,include_plp=False)
    compared = compare_reports([full,half],source_offsets={'full':0.,'half':0.})
    harmonic = [x for x in compared['cross_source_comparisons'] if x['ratio']==.5]
    assert harmonic
    assert all(x['phase_agreement'] is None or
               x['phase_agreement']['status']=='harmonic_grid_overlap_not_metrical_level_confirmation'
               for x in harmonic)
    assert compared['confidence_calibration_status']=='not_calibrated_no_heldout_annotations'


def test_calibration_requires_disjoint_tracks_and_sufficient_support():
    rows = [{'source_sha256':f'{i:064x}', 'detector':'ac', 'raw_score':.1+.05*i,
             'reference_f_measure':min(1., .08*i),
             'split':'train' if i<10 else 'holdout'} for i in range(16)]
    output = calibrate_held_out(rows)
    result = output['methods'][0]
    assert result['status'] == 'held_out_evaluated_calibration'
    assert result['training_tracks'] == 10
    assert result['holdout_tracks'] == 6
    assert 0 <= result['heldout_brier'] <= 1
    rows[-1]['source_sha256'] = rows[0]['source_sha256']
    with pytest.raises(ValueError, match='both train and holdout'):
        calibrate_held_out(rows)


def test_insufficient_annotation_count_never_claims_calibrated_confidence():
    samples = [{'source_sha256':f'{i:064x}', 'detector':'ac', 'raw_score':.4,
                'reference_f_measure':.8,'split':'train' if i<3 else 'holdout'}
               for i in range(5)]
    result = calibrate_held_out(samples)['methods'][0]
    assert result['status']=='insufficient_disjoint_tracks'
