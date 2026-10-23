"""Independent synthetic rhythm evidence; no models, downloads, or copyrighted audio."""
from __future__ import annotations

import hashlib
import json
import math

import numpy as np
import pytest
import soundfile as sf

from stemlab.analysis.beat_evidence import (
    FORMAT, RhythmInput, analyze_input, compare_reports, read_saved_beat_result, read_source,
)


def pulses(*, bpm=120., duration=16, offset=.24, emphasis=False, fps=80):
    times=np.arange(0,duration,1/fps)
    positions=np.arange(offset,duration-.1,60/bpm)
    y=np.zeros_like(times)
    for i,beat in enumerate(positions):
        magnitude=2.5 if emphasis and i%4==0 else 1.
        y+=magnitude*np.exp(-.5*((times-beat)/.035)**2)
    return times,y


def series(bpm=120,emphasis=False):
    t,y=pulses(bpm=bpm,emphasis=emphasis)
    return RhythmInput('synthetic','test_source',t,{'transient':y},'f'*64,'synthetic_truth_not_a_model')


def test_five_independently_labelled_classical_approaches_and_counts():
    report=analyze_input(series(),min_bpm=90,max_bpm=160)
    hypotheses={h['detector']:h for h in report['hypotheses']}
    assert report['format']==FORMAT
    assert set(hypotheses)=={'unbiased_autocorrelation','multi_tap_comb','inter_onset_intervals',
                             'predominant_local_pulse','dynamic_programming_onsets'}
    for h in hypotheses.values():
        assert math.isclose(h['bpm'],120,abs_tol=3),h
        assert abs(h['first_grid_time_seconds']-.24)<.08
        assert h['beats_are_observed'] is False
        assert h['downbeats']==[]
        assert len(h['grid_seconds'])==h['beat_count_grid']
        assert h['metrical_alternatives']
    dp=hypotheses['dynamic_programming_onsets']
    assert dp['beat_count_observed_candidates']>=25
    assert all(x<y for x,y in zip(dp['observed_onset_ordinal_positions'],
                                  dp['observed_onset_ordinal_positions'][1:]))


def test_meter_hypothesis_does_not_relabel_downbeats():
    report=analyze_input(series(emphasis=True),min_bpm=100,max_bpm=140)
    a=[h for h in report['hypotheses'] if h['detector']=='unbiased_autocorrelation'][0]
    assert any(m['beats_per_accent_cycle']==4 for m in a['meter_candidates'])
    assert a['downbeats']==[]
    assert all(m['status']=='hypothesis_not_meter_or_downbeat' for m in a['meter_candidates'])


def test_static_motion_abstains_even_with_declared_clock():
    t=np.arange(0,8,.02)
    source=RhythmInput('still','test',t,{'x':np.zeros(len(t))},'a'*64,'declared_120_bpm')
    result=analyze_input(source,min_bpm=60,max_bpm=200)
    assert result['hypotheses']==[]


def test_harmonic_relationships_do_not_imply_verified_synchrony():
    a=analyze_input(series(120),min_bpm=90,max_bpm=160)
    t, y = pulses(bpm=60)
    b=analyze_input(RhythmInput('other','test',t,{'pulse':y},'b'*64,'synthetic'),
                    min_bpm=55,max_bpm=130)
    result=compare_reports([a,b])
    matches=[m for m in result['cross_source_comparisons'] if abs(m['ratio']-.5)<1e-8]
    assert matches
    assert all(m['shared_clock_alignment']=='unverified' and m['phase_agreement'] is None
               for m in matches)
    verified=compare_reports([a,b],source_offsets={'synthetic':0.0,'other':0.0})
    assert any(m['phase_agreement'] is not None for m in verified['cross_source_comparisons'])


def test_local_tempo_windows_keep_variations_separate():
    fps=80
    t=np.arange(0,30,1/fps)
    y=np.zeros(len(t))
    beats = [.2]
    location = .2
    while location<29.9:
        bpm=100+55*location/30
        location+=60/bpm
        beats.append(location)
    for b in beats:
        y+=np.exp(-.5*((t-b)/.03)**2)
    result=analyze_input(RhythmInput('ramp','test',t,{'pulse':y},'a'*64,'test'),
                         min_bpm=85,max_bpm=175,include_plp=False)
    windows=result['local_tempo_windows']['pulse']
    assert len(windows)>=3
    assert max(w['bpm'] for w in windows)-min(w['bpm'] for w in windows)>=15


def test_recording_input_ranks_per_axis_motion_without_confusing_declared_bpm(tmp_path):
    bpm=120
    t=np.arange(0,12,60/(64*bpm))
    rows=np.stack((.8*np.sin(2*np.pi*1*t),.3*np.cos(2*np.pi*t)),axis=1)
    data={'format':'dancerudiments.recording','schema_version':1,'pips_per_beat':64,
          'name':'synthetic','dimensions':['hand_y','foot_z'],
          'clock':{'bpm':bpm,'bpm_source':'synthetic nominal','bpm_status':'estimated',
                   'phase_status':'unverified','start_pip':0,'beat_zero_seconds':0},
          'samples':rows.tolist()}
    path = tmp_path / 'recording.json'
    path.write_text(json.dumps(data))
    source=read_source(path,'recording','dance')
    assert source.clock_basis=='nominal_recording_clock_not_independent_tempo'
    assert source.metadata['declared_bpm_status']=='estimated'
    result=analyze_input(source,min_bpm=90,max_bpm=160,include_plp=False)
    assert result['hypotheses']
    assert any(abs(h['bpm']-120)<4 for h in result['hypotheses'])


def test_audio_features_independently_identify_kick_transients(tmp_path):
    sr=11025
    t=np.arange(0,12,1/sr)
    y=np.zeros(len(t),dtype=np.float32)
    for beat in np.arange(.2,11.8,.5):
        first=int(beat*sr)
        pulse=np.arange(min(int(.08*sr),len(y)-first))/sr
        y[first:first+len(pulse)]+=.65*np.sin(2*np.pi*(90*pulse))*np.exp(-80*pulse)
    path = tmp_path / 'kick.wav'
    sf.write(path, y, sr)
    source=read_source(path,'audio','song')
    assert source.kind=='audio'
    assert len(source.features)==4
    result=analyze_input(source,min_bpm=100,max_bpm=140,include_plp=False)
    assert any(abs(h['bpm']-120)<4 for h in result['hypotheses']),result['hypotheses'][:2]


def test_capture_quaternion_and_kinetic_pause_features(tmp_path):
    t=np.arange(0,12,1/60)
    profile={'format':'dancerudiments.rig-profile','schema_version':1,'version':1,
             'type_uri':'syn://type/danceflow/motion/rig/custom/test','model':'test',
             'channels':[{'number':1,'name':'left_foot_y','bone':'left_foot','data_path':'location',
                          'array_index':1,'unit':'metres','minimum':-2.,'maximum':2.,'neutral':0.,
                          'value_type':'float','interpolation':'linear','rotation_mode':'','enum_items':[]}],
             'source':{'fixture':'test'}}
    digest=hashlib.sha256(json.dumps(profile,sort_keys=True,separators=(',',':'),
                                     ensure_ascii=True,allow_nan=False).encode()).hexdigest()
    data={'format':'dancerudiments.rig-capture','schema_version':1,
          'type_uri':profile['type_uri'],'profile_sha256':digest,'profile':profile,
          'frame_times_seconds':t.tolist(),'frames':(.7*np.sin(2*np.pi*t)).reshape(-1,1).tolist(),
          'provenance':{'synthetic':True}}
    path = tmp_path / 'capture.json'
    path.write_text(json.dumps(data))
    source=read_source(path,'capture','leftfoot')
    assert source.kind=='rig_capture'
    assert 'kinetic_velocity_minima' in source.features
    assert source.metadata['profile_sha256']==digest
    report=analyze_input(source,min_bpm=90,max_bpm=160,include_plp=False)
    assert report['hypotheses']


def test_saved_model_input_retains_downbeats_and_provenance(tmp_path):
    beats=np.arange(.2,8,.5).tolist()
    data={'model':'beat_this','beats':beats,'downbeats':beats[::4],
          'tempo_bpm':120.,'metadata':{'source':{'sha256':'a'*64},'detector':'beat_this'}}
    path = tmp_path / 'model.json'
    path.write_text(json.dumps(data))
    result=read_saved_beat_result(path,'beatthis_model')
    hyp=result['hypotheses'][0]
    assert hyp['bpm']==120
    assert hyp['downbeats']==[round(x,6) for x in beats[::4]]
    assert hyp['beats_are_model_estimates'] is True
    assert result['input']['metadata']['source_sha256']=='a'*64


def test_saved_model_rejects_faked_downbeat_and_duplicates(tmp_path):
    path=tmp_path/'invalid.json'
    data={'model':'beatnet','beats':[.2,.7,1.2], 'downbeats':[.42], 'tempo_bpm':120,'metadata':{}}
    path.write_text(json.dumps(data))
    with pytest.raises(ValueError,match='coincide'):
        read_saved_beat_result(path,'net')
    path.write_text('{"model":"a","model":"b"}')
    with pytest.raises(ValueError,match='Duplicate'):
        read_saved_beat_result(path,'net')


def test_nonfinite_offsets_and_duplicate_sources_fail():
    source=analyze_input(series(),include_plp=False)
    with pytest.raises(ValueError,match='unique'):
        compare_reports([source,source])
    with pytest.raises(ValueError,match='finite'):
        compare_reports([source],source_offsets={'synthetic':float('nan')})


def test_cli_generates_separate_no_overwrite_comparison(tmp_path):
    import typer
    from typer.testing import CliRunner
    from rich.console import Console
    from stemlab.beat_comparison_cli import register_beat_comparison_commands
    path=tmp_path/'model.json'
    path.write_text(json.dumps({'model':'beatnet','beats':np.arange(.2,8,.5).tolist(),
                                'downbeats':[], 'tempo_bpm':120,'metadata':{}}))
    app=typer.Typer()
    register_beat_comparison_commands(app,Console())
    @app.command('nothing')
    def nothing():
        pass
    out=tmp_path/'analysis.json'
    run=CliRunner().invoke(app,['compare-beats','--model-result',f'model={path}',
                                '--output',str(out)])
    assert run.exit_code==0,(run.output,run.exception)
    result=json.loads(out.read_text())
    assert len(result['source_reports'])==1
    again=CliRunner().invoke(app,['compare-beats','--model-result',f'model={path}',
                                  '--output',str(out)])
    assert again.exit_code!=0


def test_verified_motion_package_adapter_marks_derivation_not_new_observation(monkeypatch):
    import stemlab.analysis.rig_motion_package as package
    original='2'*64
    monkeypatch.setattr(package,'analyze_rig_motion_package',lambda path:{
        'source_range_seconds':[.02,12.02],
        'motion_accents':[{'seconds':i+.25,'strength':.8} for i in range(1,12)],
        'source_manifest_sha256':original,
        'source_original_action_id':'3'*64,
        'source_clip_sha256':['4'*64,'5'*64],
        'profile_sha256':'6'*64})
    source=read_source('/synthetic/manifest.json','package','salsa')
    assert source.kind=='motion_package'
    assert source.sha256==original
    assert source.metadata['derived_from']=='stemlab.rig-motion-analysis'
    assert sum(source.features['existing_rig_accents'])>0
    result=analyze_input(source,min_bpm=55,max_bpm=130,include_plp=False)
    assert result['input']['metadata']['derived_from']=='stemlab.rig-motion-analysis'
