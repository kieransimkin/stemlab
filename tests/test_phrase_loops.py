import json

import numpy as np
import pytest
import soundfile as sf
from typer.testing import CliRunner

from stemlab.analysis.loops import analyze_loops
from stemlab.analysis.phrase_loops import (
    PhraseLoopConfig, analyze_existing_phrase_loops, analyze_phrase_loops,
    musical_restart_context,
)
from stemlab.analysis.rudiment_matches import extract_peak_events
from stemlab.cli import app
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import sha256_file


def evidence(tmp_path):
    sr = 8000
    t = np.arange(sr*40)/sr
    frequencies = np.array([261.6256,220,349.2282,195.9977])
    f = frequencies[(t//2).astype(int)%4]
    phase = np.cumsum(f)/sr
    envelope = .3*np.exp(-7*(t%0.5))+.015
    y = np.column_stack((envelope*np.sin(2*np.pi*phase),
                         envelope*np.sin(2*np.pi*phase+.2))).astype('float32')
    master = tmp_path/'master.wav'
    vocal = tmp_path/'vocals.wav'
    sf.write(master,y,sr,subtype='FLOAT')
    sf.write(vocal,np.full_like(y,.05),sr,subtype='FLOAT')
    beat = BeatResult('test',list(np.arange(0,40.01,.5)),list(np.arange(0,40.01,2)),120)
    lines = [dict(start=float(i*2),end=float((i+1)*2),text=f'Line {i%4}',
                  canonicalLine=i+1) for i in range(20)]
    return master,y,beat,[StemArtifact('test','vocals',vocal)],{'lyric_timing':lines}


def run(tmp_path, **kwargs):
    master,y,beat,stems,canonical = evidence(tmp_path)
    report = analyze_phrase_loops(master,tmp_path/'phrases',canonical=canonical,
                                 beat_results=[beat],stems=stems,**kwargs)
    return report,master,y,canonical


def test_harmonic_restart_discriminates_same_grid_cuts(tmp_path):
    master,y,_,_,_ = evidence(tmp_path)
    events=extract_peak_events(master)
    good=musical_restart_context(y,8000,8*8000,16*8000,.5,events)
    bad=musical_restart_context(y,8000,8*8000,18*8000,.5,events)
    assert good['available'] and bad['available']
    assert good['cost'] < bad['cost']
    assert good['harmonic_context_similarity'] > bad['harmonic_context_similarity']


def test_line_occurrences_native_export_and_diversity(tmp_path):
    report,master,y,canonical=run(tmp_path,export_audio=True)
    assert report['candidate_count'] > 1 and report['accepted_loop_count'] == 0
    assert report['source_sha256'] == sha256_file(master)
    for candidate in report['candidates']:
        first,last=candidate['canonical_line_indices']
        assert candidate['included_lyrics'] == [dict(**line,occurrence_index=i)
            for i,line in enumerate(canonical['lyric_timing']) if first<=i<=last]
        assert candidate['status'] == 'requires_listening_or_edit'
        assert 'vocal_boundary' in candidate['failed_gates']
        assert 'attended_listening_unavailable' in candidate['failed_gates']
        assert candidate['crossfade_ms'] == 0
        audio,sr=sf.read(tmp_path/'phrases'/candidate['file'],dtype='float32',always_2d=True)
        np.testing.assert_array_equal(audio,y[candidate['start_sample']:candidate['end_sample']])
        assert sr == 8000
    for i,a in enumerate(report['candidates']):
        for b in report['candidates'][i+1:]:
            overlap=max(0,min(a['end_sample'],b['end_sample'])
                        -max(a['start_sample'],b['start_sample']))
            assert overlap/min(a['duration_samples'],b['duration_samples']) <= .6


def test_feedback_exact_hash_bad_region_repeats_and_new_matches(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    # Words repeat every eight seconds. Excluding this full occurrence also
    # excludes its exact canonical-word repeats; no classifier is invented.
    feedback={'schema':'stemlab.loop_feedback.v1','source_sha256':sha256_file(master),
        'ratings':[{'start_sample':8*8000,'end_sample':16*8000,
                    'rating':'bad','reason':'section_unsuitable'}]}
    report=analyze_phrase_loops(master,tmp_path/'out',canonical=canonical,
        beat_results=[beat],stems=stems,feedback=feedback)
    assert report['feedback_summary']['excluded_passages'] == [
        [0,64000],[64000,128000],[128000,192000],[192000,256000],[256000,320000]]
    assert report['candidate_count'] == 0
    feedback['source_sha256']='0'*64
    with pytest.raises(ValueError,match='source hash'):
        analyze_phrase_loops(master,tmp_path/'bad',canonical=canonical,
            beat_results=[beat],stems=stems,feedback=feedback)
    assert not (tmp_path/'bad/phrase_loops.json').exists()


def test_rated_near_duplicates_are_not_resuggested(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    feedback={'schema':'stemlab.loop_feedback.v1','source_sha256':sha256_file(master),
        'ratings':[{'start_sample':8*8000,'end_sample':16*8000,
                    'rating':'good','reason':'unknown'}]}
    report=analyze_phrase_loops(master,tmp_path/'out',canonical=canonical,
        beat_results=[beat],stems=stems,feedback=feedback)
    assert report['feedback_summary']['positive_reference_count'] == 1
    assert report['rejected_candidates']['previously_rated_near_duplicate'] > 0
    assert all((c['start_sample'],c['end_sample'])!=(64000,128000)
               for c in report['candidates'])


@pytest.mark.parametrize('mutation',[[],{'ratings':['bad']},
    {'ratings':[{'start_sample':True,'end_sample':64000,'rating':'bad'}]},
    {'ratings':[{'start_sample':1,'end_sample':64000,'rating':'excellent'}]}])
def test_malformed_feedback_is_rejected_before_output(tmp_path,mutation):
    master,_,beat,stems,canonical=evidence(tmp_path)
    if isinstance(mutation,dict):
        feedback={'schema':'stemlab.loop_feedback.v1','source_sha256':sha256_file(master),
                  **mutation}
    else:
        feedback=mutation
    with pytest.raises(ValueError):
        analyze_phrase_loops(master,tmp_path/'bad',canonical=canonical,
            beat_results=[beat],stems=stems,feedback=feedback)
    assert not (tmp_path/'bad/phrase_loops.json').exists()


@pytest.mark.parametrize('config',[{'min_seconds':float('nan')},{'top':True},
    {'min_lines':1.5},{'max_overlap':1},{'min_seconds':31,'max_seconds':30}])
def test_invalid_config(config):
    with pytest.raises(ValueError):
        PhraseLoopConfig(**config)


def test_missing_canonical_grid_and_zero_length_occurrence(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    with pytest.raises(ValueError,match='canonical'):
        analyze_phrase_loops(master,tmp_path/'bad',canonical={},beat_results=[beat],stems=stems)
    empty=analyze_phrase_loops(master,tmp_path/'empty',canonical=canonical,
                              beat_results=[],stems=stems)
    assert empty['candidate_count']==0 and empty['rejected_candidates']['missing_grid'] > 0
    canonical['lyric_timing'].insert(5,dict(start=10,end=10,text='Instant caption'))
    report=analyze_phrase_loops(master,tmp_path/'zero',canonical=canonical,
                               beat_results=[beat],stems=stems)
    assert report['candidate_count'] > 0
    # Zero-length entries may stay inside a selected interval, never become its start.
    assert all(c['included_lyrics'][0]['end']>c['included_lyrics'][0]['start']
               for c in report['candidates'])


def test_context_unknown_stays_unknown_and_no_implicit_exports(tmp_path):
    _,y,_,_,_=evidence(tmp_path)
    missing=musical_restart_context(y,8000,0,8000,.5,
                                   {'times':np.array([]),'strengths':np.array([])})
    assert missing['available'] is False
    known=musical_restart_context(y,8000,64000,128000,.5,
                                 {'times':np.array([]),'strengths':np.array([])})
    assert known['attack_context_similarity'] is None and known['assessed_weight']==.6
    run(tmp_path)
    assert not list((tmp_path/'phrases').rglob('*.wav'))


def test_reuse_and_cli_index_separate_report_preserve_strict(tmp_path):
    master,y,beat,stems,canonical=evidence(tmp_path)
    (tmp_path/'beats').mkdir()
    (tmp_path/'beats/test.json').write_text(json.dumps(dict(model='test',beats=beat.beats,
                                                          downbeats=beat.downbeats)))
    (tmp_path/'canonical.json').write_text(json.dumps(canonical))
    analysis={'source':{'copied_path':master.name,'sha256':sha256_file(master)},
        'models':[{'stems':[{'model':'test','stem':'vocals','path':'vocals.wav'}]}]}
    (tmp_path/'analysis.json').write_text(json.dumps(analysis))
    strict=analyze_loops(master,tmp_path/'deep/loops',song_map={'sections':[]},
                        beat_results=[beat],stems=stems,canonical=canonical)
    old=(tmp_path/'deep/loops/loops.json').read_bytes()
    report=analyze_existing_phrase_loops(tmp_path)
    assert report['candidate_count'] > 0
    assert (tmp_path/'deep/loops/loops.json').read_bytes()==old
    assert strict['loop_count']==0
    updated=json.loads((tmp_path/'analysis.json').read_text())
    assert updated['deep_analysis']['analyses']['phrase_loops']['path'].endswith('phrase_loops.json')
    result=CliRunner().invoke(app,['phrase-loops',str(tmp_path),'--top','3'])
    assert result.exit_code==0, result.output
    report=json.loads((tmp_path/'deep/phrase_loops/phrase_loops.json').read_text())
    assert report['candidate_count'] <= 3
