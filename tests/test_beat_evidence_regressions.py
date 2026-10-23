"""Regression cases motivated by the pinned public-song feature excerpt review.

No public audio or model checkpoint is downloaded by this suite.
"""
from __future__ import annotations

import json
import numpy as np
import pytest

from stemlab.analysis.beat_evidence import (
    RhythmInput, _dp_beat_events, _tempo_family_summary, _local_tempo_warnings,
    _saved_beat_grid_fit, analyze_input, read_saved_beat_result,
)


def test_global_dp_coverage_rejects_short_perfect_streak():
    t=np.arange(0,80,.01)
    y=np.zeros(len(t))
    for beat in np.arange(35,39,.5):
        y+=np.exp(-.5*((t-beat)/.018)**2)
    assert _dp_beat_events(t,y,120)==([],[],0.)
    y=np.zeros(len(t))
    for beat in np.arange(.2,79.8,60/109):
        y+=np.exp(-.5*((t-beat)/.018)**2)
    events, ordinals, support = _dp_beat_events(t,y,109)
    assert len(events)>120 and ordinals[-1]>120
    assert events[-1]-events[0]>75 and .80<support<=1.


def test_octave_ambiguity_does_not_count_multiple_algorithms_as_votes():
    cases=[dict(detector=k,feature='drums',bpm=v)
           for k,v in [('unbiased_autocorrelation',72.29),('multi_tap_comb',72.29),
                       ('predominant_local_pulse',142.86)]]
    grouped,status=_tempo_family_summary(cases)
    assert status=='half_double_tempo_level_unresolved'
    assert grouped[0]['tempo_levels_bpm']==[72.29,142.86]
    grouped,status=_tempo_family_summary([dict(detector='ac',feature='master',bpm=109.),
                                          dict(detector='plp',feature='master',bpm=139.5)])
    assert status=='incompatible_tempo_families_review_required'
    assert len(grouped)==2


def test_local_twofold_variation_never_certifies_tempo_change():
    warnings=_local_tempo_warnings({'kick':[
        {'from_seconds':0.,'bpm':72.29},
        {'from_seconds':4.,'bpm':145.0},
        {'from_seconds':8.,'bpm':72.29}]})
    assert len(warnings)==2
    assert all('octave_level_switch' in x['interpretation'] for x in warnings)


def test_saved_beat_detector_keeps_original_bpm_when_grid_fit_differs(tmp_path):
    beats=np.r_[.02,.02+np.cumsum(np.tile([.56,.56,.56,.56,.51],59))]
    grid=_saved_beat_grid_fit(beats)
    assert grid['status']=='estimated_constant_tempo_grid'
    assert abs(grid['global_fit_bpm']-109.09)<.1
    source=tmp_path/'model.json'
    source.write_text(json.dumps({'model':'beat_this','beats':beats.tolist(),
                                  'downbeats':[],'tempo_bpm':107.14285714,'metadata':{}}))
    saved=read_saved_beat_result(source,'reference')
    hypothesis=saved['hypotheses'][0]
    assert hypothesis['original_saved_model_bpm']==pytest.approx(107.14285714)
    assert hypothesis['source_grid_fit_diagnostics']['global_fit_bpm']==pytest.approx(109.09,abs=.1)
    assert hypothesis['median_interval_quantisation_bias_possible'] is True


def test_sparse_source_has_no_false_high_confidence_dp():
    t=np.arange(0,80,.01)
    y=np.zeros(len(t))+.0002
    for seconds in np.arange(37.,41.,.5):
        y+=1.6*np.exp(-.5*((t-seconds)/.022)**2)
    src=RhythmInput('short_phrase','test',t,{'only_middle':y},'f'*64,'synthetic')
    report=analyze_input(src,min_bpm=95,max_bpm=135,include_plp=False)
    dp=[x for x in report['hypotheses'] if x['detector']=='dynamic_programming_onsets']
    assert not dp or all(h['score_uncalibrated']<.2 for h in dp)
