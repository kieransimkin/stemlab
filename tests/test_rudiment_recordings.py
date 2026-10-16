"""Synthetic-audio DSP, exact clock, batch, CLI and shared-harness checks."""
from fractions import Fraction
import json
import os
import numpy as np
import pytest
import soundfile as sf
from scipy.signal import sosfiltfilt
from typer.testing import CliRunner
from stemlab.util import sha256_file
from stemlab.analysis.rudiment_recordings import AxisSpec, EnvelopeBank, audio_blocks, filter_sos, extract_recording, sample_edges, resolve_tempo
from stemlab.analysis.rudiment_batch import generate_batch, export_single
from stemlab.recording_cli import resolve_axes

try:
    from dancerudiments_authoring.recording import RecordingClock, load_recording
except ImportError:
    if os.environ.get('STEMLAB_REQUIRE_RECORDINGS')=='1':
        raise
    pytest.skip('Optional recording update not installed',allow_module_level=True)


def audio(tmp_path, values, sr=8000, name='audio.wav'):
    path=tmp_path/name
    sf.write(path,np.asarray(values,dtype=float),sr,subtype='DOUBLE')
    return path


@pytest.mark.parametrize('mode',['peak','average'])
def test_correct_rectified_window_values_and_antiphase(tmp_path,mode):
    x=np.array([.1,-.4,.2,-.2,0,.3,-.5,.2,-.1,.6]*4)
    p=audio(tmp_path,np.column_stack((x,-x)),1280)
    r=extract_recording([AxisSpec('x',p,mode=mode)],bpm=120,block_frames=7)
    expected=max(abs(x[:10])) if mode=='peak' else np.mean(abs(x[:10]))
    expected=2*expected-1
    assert np.asarray(r.samples)[:,0]==pytest.approx([expected]*4,abs=1e-12)


@pytest.mark.parametrize('dims',[1,2,3,4,8,128])
def test_any_number_of_axes(tmp_path,dims):
    p=audio(tmp_path,[.5]*20,1280)
    r=extract_recording([AxisSpec('axis_'+str(i),p) for i in range(dims)],bpm=120)
    assert r.samples==((0.,)*dims,)*2


def test_absolute_rational_boundaries_do_not_drift():
    c=RecordingClock(123.456,'test',beat_zero_seconds=.12345,start_pip=-17)
    e=sample_edges(c,100000,44100)
    for i in [0,1,63,33333,100000]:
        q=(Fraction('.12345')+(i-17)*Fraction(60,64)/Fraction('123.456'))*44100
        assert e[i]==-(-q.numerator//q.denominator)
    assert len(set(np.diff(e)))==2


def test_different_rates_same_extent_and_partial_window(tmp_path):
    a=audio(tmp_path,[.2]*4410,44100,'a.wav')
    b=audio(tmp_path,[.4]*4800,48000,'b.wav')
    r=extract_recording([AxisSpec('a',a),AxisSpec('b',b,mode='average')],bpm=137.3,beat_zero_seconds=.03)
    assert all(v==(-.6,-.2) for v in r.samples)
    assert r.clock.start_pip<0
    assert r.provenance['axes'][0]['partial_windows']>=1


@pytest.mark.parametrize('phase',['zero','causal'])
@pytest.mark.parametrize('mode',['peak','average'])
def test_block_size_invariance(tmp_path,phase,mode):
    p=audio(tmp_path,np.random.default_rng(9).uniform(-.8,.8,(2083,2)))
    axes=[AxisSpec('x',p,mode=mode,low_pass=250),AxisSpec('y',p,mode=mode,high_pass=800)]
    kw=dict(bpm=127.75,beat_zero_seconds=.013,filter_phase=phase)
    a=extract_recording(axes,block_frames=17,**kw)
    b=extract_recording(axes,block_frames=9999,**kw)
    np.testing.assert_allclose(a.samples,b.samples,atol=1e-12,rtol=0)


@pytest.mark.parametrize('length',[1,3,1001])
@pytest.mark.parametrize('order',[1,4,8])
def test_streaming_zero_phase_matches_scipy(tmp_path,length,order):
    x=np.random.default_rng(5).uniform(-.5,.5,(length,2))
    p=audio(tmp_path,x)
    sos=filter_sos(AxisSpec('x',p,high_pass=100,low_pass=900,filter_order=order),8000)
    edge=min(length-1,int(3*(2*len(sos)+1-min((sos[:,2]==0).sum(),(sos[:,5]==0).sum()))))
    expected=sosfiltfilt(sos,x,axis=0,padlen=edge)
    actual=np.concatenate(list(audio_blocks(p,sos,'zero',17)))
    np.testing.assert_allclose(actual,expected,atol=1e-14,rtol=0)


def test_bass_treble_discrimination_before_rectification(tmp_path):
    t=np.arange(16000)/8000
    x=np.where(t<1,.8*np.sin(2*np.pi*64*t),.8*np.sin(2*np.pi*2000*t))
    p=audio(tmp_path,x)
    r=extract_recording([AxisSpec('bass',p,mode='average',low_pass=200),AxisSpec('treble',p,mode='average',high_pass=1000)],bpm=120)
    v=np.asarray(r.samples)
    assert v[25:100,0].mean() > v[25:100,1].mean() + .5
    assert v[155:230,1].mean() > v[155:230,0].mean() + .5


@pytest.mark.parametrize('bad',[None,0,-1,True,float('inf'),float('nan')])
def test_bpm_gate_before_optional_import_or_audio(tmp_path,monkeypatch,bad):
    import stemlab.analysis.rudiment_recordings as m
    def forbidden():
        pytest.fail('BPM must be checked first')
    monkeypatch.setattr(m,'recording_api',forbidden)
    with pytest.raises(ValueError,match='BPM'):
        m.extract_recording([AxisSpec('x',tmp_path/'missing.wav')],bpm=bad)


@pytest.mark.parametrize('kwargs',[dict(low_pass=0),dict(high_pass=float('nan')),dict(low_pass=100,high_pass=200),dict(gain=float('inf')),dict(mode='frequency'),dict(filter_order=True)])
def test_invalid_axis_settings(tmp_path,kwargs):
    with pytest.raises(ValueError):
        AxisSpec('x',tmp_path/'missing.wav',**kwargs)


def test_nyquist_empty_nan_and_excessive_rate(tmp_path):
    for x in [[],[float('nan')],[float('inf')]]:
        p=audio(tmp_path,x)
        with pytest.raises(ValueError):
            extract_recording([AxisSpec('x',p)],bpm=120)
    p=audio(tmp_path,[.2]*100,1280)
    with pytest.raises(ValueError,match='Nyquist'):
        extract_recording([AxisSpec('x',p,low_pass=640)],bpm=120)
    with pytest.raises(ValueError,match='exceeds'):
        extract_recording([AxisSpec('x',p)],bpm=1300)


def test_length_policies(tmp_path):
    a=audio(tmp_path,[.2]*20,1280,'a.wav')
    b=audio(tmp_path,[.4]*40,1280,'b.wav')
    axes=[AxisSpec('a',a),AxisSpec('b',b)]
    with pytest.raises(ValueError,match='durations differ'):
        extract_recording(axes,bpm=120)
    assert extract_recording(axes,bpm=120,length_policy='trim').samples==((-.6,-.2),)*2
    assert extract_recording(axes,bpm=120,length_policy='pad').samples==((-.6,-.2),)*2+((-1.,-.2),)*2


@pytest.mark.parametrize('normalization,expected',[('none',(-.6,-.2)),('global',(0.,1.)),('per-axis',(1.,1.))])
def test_normalization(tmp_path,normalization,expected):
    a=audio(tmp_path,[.2]*20,1280,'a.wav')
    b=audio(tmp_path,[.4]*20,1280,'b.wav')
    assert extract_recording([AxisSpec('a',a),AxisSpec('b',b)],bpm=120,normalization=normalization).samples[0]==expected


def test_all_dancerudiments_output_uses_bipolar_scale(tmp_path):
    p=audio(tmp_path,[0.]*10+[.5]*10,1280,'dynamic.wav')
    r=extract_recording([AxisSpec('x',p)],bpm=120,normalization='per-axis')
    assert r.samples==((-1.,),(1.,))
    assert r.provenance['output_scale']=='bipolar'
    assert r.provenance['output_range']==[-1.,1.]
    assert r.provenance['axes'][0]['output_range']==[-1.,1.]
    assert np.min(r.samples)>=-1 and np.max(r.samples)<=1

    silent=audio(tmp_path,[0.]*20,1280,'silent.wav')
    s=extract_recording([AxisSpec('x',silent)],bpm=120,normalization='per-axis')
    assert s.samples==((0.,),(0.,))


def test_silence_direction_and_clipping(tmp_path):
    a=audio(tmp_path,[0]*20,1280,'a.wav')
    b=audio(tmp_path,[.8]*20,1280,'b.wav')
    r=extract_recording([AxisSpec('a',a),AxisSpec('b',b,gain=-2)],bpm=120,normalization='per-axis')
    assert r.samples==((0.,-1.),)*2
    assert r.provenance['axes'][1]['clipped_windows']==2


def saved(tmp_path):
    root=tmp_path/'source'
    root.mkdir()
    t=np.arange(4000)/8000
    bass=.6*np.sin(2*np.pi*64*t)*(.2+.8*np.sin(2*np.pi*3*t)**2)
    treble=.2*np.sin(2*np.pi*2000*t)*(.3+.7*np.sin(2*np.pi*7*t)**2)
    p=audio(root,bass+treble,name='master.wav')
    audio(root,bass,name='bass.wav')
    audio(root,treble,name='treble.wav')
    data=dict(source=dict(copied_path='master.wav',sha256=sha256_file(p)),
              models=[dict(spec=dict(slug='test'),stems=[dict(stem='bass',path='bass.wav'),dict(stem='treble',path='treble.wav')])],
              beats=[dict(model='test',tempo_bpm=120,beats=2)])
    (root/'analysis.json').write_text(json.dumps(data))
    (root/'beats').mkdir()
    (root/'beats/test.json').write_text(json.dumps(dict(model='test',tempo_bpm=120,beats=[.05,.55])))
    return root,data


def test_saved_bpm_provenance_and_stale_rejection(tmp_path):
    root,data=saved(tmp_path)
    t=resolve_tempo(root)
    assert t['bpm']==120 and t['bpm_source']=='saved:test' and t['phase_status']=='estimated'
    assert t['beat_zero_seconds']==.05 and t['bpm_status']=='estimated'
    assert resolve_tempo(root,bpm=145,confirmed=True)['bpm_status']=='confirmed'
    assert resolve_tempo(root,bpm=145)['phase_status']=='unverified'
    with pytest.raises(ValueError):
        resolve_tempo(root,confirmed=True)
    data['beats']=[]
    (root/'analysis.json').write_text(json.dumps(data))
    with pytest.raises(ValueError):
        resolve_tempo(root)


def test_filter_cache_reuses_both_modes(tmp_path):
    p=audio(tmp_path,[.2,-.2]*100)
    bank=EnvelopeBank([p],bpm=120)
    bank.compose([AxisSpec('x',p,low_pass=200),AxisSpec('y',p,mode='average',low_pass=200)])
    bank.compose([AxisSpec('z',p,low_pass=200)])
    assert len(bank.cache)==1 and bank.cache_hits==2
    p.write_bytes(b'changed')
    with pytest.raises(ValueError,match='changed'):
        bank.verify_sources()


def test_seeded_batch_coverage_diversity_shared_harness_and_no_audio_leak(tmp_path):
    root,_=saved(tmp_path)
    a=generate_batch(root,tmp_path/'a',dimensions=(2,3,6),max_candidates=16,seed=7)
    b=generate_batch(root,tmp_path/'b',dimensions=(2,3,6),max_candidates=16,seed=7)
    assert a['candidate_count']==b['candidate_count']==16
    assert [x['sample_sha256'] for x in a['candidates']]==[x['sample_sha256'] for x in b['candidates']]
    assert {key for x in a['candidates'] for key in x['sources']}=={'master','test/bass','test/treble'}
    assert {x['dimensions'] for x in a['candidates']}=={2,3,6}
    assert len({x['sample_sha256'] for x in a['candidates']})>=12
    assert a['harness']['renderer']=='shared DanceRudiments release visualizer'
    assert a['harness']['sample_bytes']<a['total_values']*8
    assert a['extraction_passes']<=18 and a['cache_hits']>0
    assert not list((tmp_path/'a').glob('*.wav'))
    assert (tmp_path/'a/index.html').is_file()
    r=load_recording(tmp_path/'a'/a['candidates'][0]['file'])
    assert r.clock.bpm==120


def test_batch_bpm_missing_and_invalid_limits_leave_no_output(tmp_path):
    root,_=saved(tmp_path)
    p=root/'master.wav'
    for kw in [dict(),dict(bpm=0),dict(bpm=120,dimensions=(1,)),dict(bpm=120,filters=[('bad',-1,None)])]:
        out=tmp_path/'new'/'bad'
        with pytest.raises(ValueError):
            generate_batch(p,out,**kw)
        assert not out.exists()
    with pytest.raises(ValueError,match='at least'):
        generate_batch(root,tmp_path/'too-small',max_candidates=2)


def test_single_bundle_legacy_and_transactional_protection(tmp_path):
    p=audio(tmp_path,[.2]*20,1280)
    axes=[AxisSpec('x',p),AxisSpec('y',p,mode='average')]
    report=export_single(p,tmp_path/'ok',axes,timing={'bpm':120},include_audio=True,legacy=True)
    assert (tmp_path/'ok/index.html').exists() and (tmp_path/'ok/audio.wav').read_bytes()==p.read_bytes()
    assert (tmp_path/'ok/audio_recording.compiled.json').exists()
    assert report['harness']['candidates']==1
    with pytest.raises(FileExistsError):
        export_single(p,tmp_path/'ok',axes,timing={'bpm':120})
    with pytest.raises(ValueError):
        export_single(p,tmp_path/'bad',[AxisSpec('x',p,low_pass=99999)],timing={'bpm':120})
    assert not (tmp_path/'bad').exists()


def test_cli_registration_missing_bpm_and_custom_six_axes(tmp_path):
    from stemlab.cli import app
    runner=CliRunner()
    p=audio(tmp_path,[.3]*80,1280)
    for command in ['record-rudiment','generate-batch']:
        assert runner.invoke(app,[command,'--help']).exit_code==0
        result=runner.invoke(app,[command,str(p),'-o',str(tmp_path/command)])
        assert result.exit_code!=0 and 'BPM' in result.output
    args=['record-rudiment',str(p),'--bpm','120','--bpm-confirmed','-o',str(tmp_path/'six')]
    for name in ['x','y','z','rotation','energy','extra']:
        args+=['--axis',name+'=master']
    args+=['--axis-mode','energy=average','--gain','extra=-1']
    result=runner.invoke(app,args)
    assert result.exit_code==0,result.output
    r=load_recording(tmp_path/'six/recordings/audio_recording.json')
    assert len(r.dimensions)==6 and r.samples[0][-1]==.4 and r.clock.bpm_status=='confirmed'


def test_ambiguous_stems_and_unknown_axes(tmp_path):
    p=audio(tmp_path,[.2]*20)
    catalogue={'master':p,'one/bass':p,'two/bass':p}
    with pytest.raises(ValueError,match='Ambiguous'):
        resolve_axes(p,catalogue,axes=['x=bass'])
    with pytest.raises(ValueError,match='unknown axes'):
        resolve_axes(p,catalogue,axes=['x=master'],low_pass=['typo=100'])


def test_signed_waveform_and_envelope_composition(tmp_path):
    sr = 8000
    t = np.arange(sr * 2) / sr
    p = audio(tmp_path, .5 * np.sin(2 * np.pi * 8 * t))
    axes = [AxisSpec('signed', p, mode='waveform'),
            AxisSpec('level', p, mode='average')]
    r = extract_recording(axes, bpm=120, block_frames=17)
    samples = np.asarray(r.samples)
    assert samples[40:200, 0].min() < -.45
    assert samples[40:200, 0].max() > .45
    assert r.provenance['axes'][0]['output_mapping'].startswith('signed PCM')
    assert r.provenance['axes'][1]['output_mapping'].startswith('0 amplitude')
    assert r.provenance['axes'][0]['antialias_filter_order'] == 12
    assert r.to_native().sample(r.clock.start_pip + 50) == list(r.samples[50])


def test_cli_signed_waveform_saved_stem_and_master(tmp_path):
    root, _ = saved(tmp_path)
    from stemlab.cli import app
    runner = CliRunner()
    stem_out = tmp_path / 'stem-waveform'
    result = runner.invoke(app, [
        'record-rudiment', str(root), '--mode', 'waveform',
        '--axis', 'x=test/bass', '--high-pass', 'x=12',
        '--no-harness', '-o', str(stem_out),
    ])
    assert result.exit_code == 0, result.output
    r = load_recording(stem_out / 'recordings/audio_recording.json')
    assert r.dimensions == ('x',) and r.clock.bpm == 120
    assert r.provenance['axes'][0]['high_pass'] == 12
    assert json.loads((stem_out / 'report.json').read_text())['extraction_passes'] == 1
    master_out = tmp_path / 'master-waveform'
    result = runner.invoke(app, [
        'record-rudiment', str(root / 'master.wav'), '--bpm', '120',
        '--mode', 'waveform', '--axis', 'x=master', '--low-pass', 'x=35',
        '--no-harness', '-o', str(master_out),
    ])
    assert result.exit_code == 0, result.output
    r = load_recording(master_out / 'recordings/audio_recording.json')
    assert r.provenance['axes'][0]['low_pass'] == 35
    refused = tmp_path / 'invalid-waveform'
    result = runner.invoke(app, [
        'record-rudiment', str(root / 'master.wav'), '--bpm', '120',
        '--mode', 'waveform', '--axis', 'x=master', '--high-pass', 'x=4000',
        '--no-harness', '-o', str(refused),
    ])
    assert result.exit_code != 0 and not refused.exists()
