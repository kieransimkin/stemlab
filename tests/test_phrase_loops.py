import json

import numpy as np
import pytest
import soundfile as sf
from typer.testing import CliRunner

from stemlab.analysis.loops import analyze_loops
from stemlab.analysis.phrase_loops import (
    PhraseLoopConfig, analyze_existing_phrase_loops, analyze_phrase_loops,
    _beat_aligned_bounds, _boundary_lyric_repeat, _complete_beat_aligned_bounds,
    _refine_contiguous_line_ends, musical_restart_context,
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
        assert 'boundary_lyric_repeat' in candidate
        assert candidate['crossfade_ms'] == 0
        audio,sr=sf.read(tmp_path/'phrases'/candidate['file'],dtype='float32',always_2d=True)
        np.testing.assert_array_equal(audio,y[candidate['start_sample']:candidate['end_sample']])
        assert sr == 8000
    for i,a in enumerate(report['candidates']):
        for b in report['candidates'][i+1:]:
            overlap=max(0,min(a['end_sample'],b['end_sample'])
                        -max(a['start_sample'],b['start_sample']))
            assert overlap/min(a['duration_samples'],b['duration_samples']) <= .6


def test_default_boundaries_enclose_lyrics_on_measured_beats_and_complete_bars(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    for line in canonical['lyric_timing']:
        line['start'] += .1
        line['end'] -= .1
    report=analyze_phrase_loops(master,tmp_path/'aligned',canonical=canonical,
        beat_results=[beat],stems=stems,config=PhraseLoopConfig(top=12))
    assert report['config']['beat_aligned'] is True
    assert report['candidate_count'] > 0
    assert any(c['boundary_alignment']['start_padding_seconds'] > 0
               for c in report['candidates'])
    for candidate in report['candidates']:
        alignment=candidate['boundary_alignment']
        assert alignment['exact_detected_beat_events'] is True
        assert alignment['same_measured_bar_phase'] is True
        assert alignment['beat_count'] % alignment['detected_beats_per_bar'] == 0
        assert alignment['complete_bar_count'] == (
            alignment['beat_count']//alignment['detected_beats_per_bar'])
        assert candidate['start_seconds'] <= candidate['lyric_target_bounds']['start_seconds']
        assert candidate['end_seconds'] >= candidate['lyric_target_bounds']['end_seconds']
        assert candidate['start_sample'] == round(alignment['start_beat_seconds']*8000)
        assert candidate['end_sample'] == round(alignment['end_beat_seconds']*8000)
        assert 'complete_bar_alignment_unverified' not in candidate['failed_gates']


def test_same_phase_alignment_expands_end_instead_of_cutting_the_lyric():
    beats=np.arange(0,20.01,.5)
    down=np.arange(0,len(beats),4,dtype=int)
    aligned=_beat_aligned_bounds(beats,down,.1,7.9,8000)
    assert aligned['available'] is True
    assert aligned['start_beat_seconds'] == 0
    assert aligned['end_beat_seconds'] == 8
    assert aligned['start_sample'] == 0
    assert aligned['end_sample'] == 64000
    assert aligned['complete_bar_count'] == 4


def test_alignment_recursively_encloses_neighbouring_overlapping_lyrics():
    beats=np.arange(0,20.01,.5)
    down=np.arange(0,len(beats),4,dtype=int)
    lines=[dict(start=1.0,end=2.2,text='overlapping pickup'),
           dict(start=2.1,end=5.9,text='requested phrase'),
           dict(start=5.8,end=7.7,text='overlapping tail')]
    aligned=_complete_beat_aligned_bounds(lines,1,1,beats,down,8000)
    assert aligned['available'] is True
    assert aligned['start_beat_seconds'] == 1
    assert aligned['end_beat_seconds'] == 9
    assert aligned['lyric_complete_on_aligned_bounds'] is True
    assert aligned['lyric_expansion_iterations'] == 1
    assert aligned['enclosed_lyric_bounds'] == {
        'start_seconds':1.0,'end_seconds':7.7}


def test_onset_only_lrc_ends_refine_from_explicit_whisper_words():
    lines=[dict(start=2.1,end=4.1,text='first',occurrence_index=0),
           dict(start=4.1,end=6.1,text='second',occurrence_index=1),
           dict(start=6.1,end=6.85,text='last',occurrence_index=2)]
    whisper={'words':[
        dict(start=2.0,end=3.7,word='first'),
        dict(start=4.2,end=5.8,word='second'),
    ]}
    refined=_refine_contiguous_line_ends(lines,whisper)
    assert refined[0]['end'] == 3.7
    assert refined[0]['canonical_inferred_end'] == 4.1
    assert refined[0]['end_timing_source'] == 'whisper_words'
    assert refined[1]['end'] == 5.8
    assert refined[2] == lines[2]
    assert lines[0]['end'] == 4.1  # Canonical input is not mutated.


def test_onset_only_lrc_phrase_search_no_longer_cascades_through_song(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    for line in canonical['lyric_timing']:
        line['start'] += .1
        line['end'] = min(40.0,line['end']+.1)
    words=[dict(start=line['start'],end=line['end']-.3,word=line['text'])
           for line in canonical['lyric_timing'][:-1]]
    report=analyze_phrase_loops(master,tmp_path/'lrc',canonical=canonical,
        beat_results=[beat],stems=stems,whisper_result={'words':words},
        config=PhraseLoopConfig(top=8,min_lines=2))
    assert report['candidate_count'] > 0
    assert any(any(line.get('end_timing_source') == 'whisper_words'
                   for line in candidate['included_lyrics'])
               for candidate in report['candidates'])


def test_line_boundary_mode_is_explicit_legacy_opt_out(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    for line in canonical['lyric_timing']:
        line['start'] += .1
        line['end'] -= .1
    report=analyze_phrase_loops(master,tmp_path/'legacy',canonical=canonical,
        beat_results=[beat],stems=stems,
        config=PhraseLoopConfig(top=3,beat_aligned=False))
    assert report['config']['beat_aligned'] is False
    assert report['candidate_count'] > 0
    for candidate in report['candidates']:
        first,last=candidate['canonical_line_indices']
        assert candidate['start_sample'] == round(canonical['lyric_timing'][first]['start']*8000)
        assert candidate['end_sample'] == round(canonical['lyric_timing'][last]['end']*8000)
        assert candidate['boundary_alignment']['exact_detected_beat_events'] is False
        assert 'complete_bar_alignment_unverified' in candidate['failed_gates']


def test_duration_limit_applies_after_default_beat_alignment(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    for line in canonical['lyric_timing']:
        line['start'] += .1
        line['end'] -= .1
    report=analyze_phrase_loops(master,tmp_path/'bounded',canonical=canonical,
        beat_results=[beat],stems=stems,
        config=PhraseLoopConfig(min_seconds=5,max_seconds=7.9,min_lines=4))
    assert report['candidate_count'] == 0


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


def test_exact_repeated_boundary_lyric_is_an_explicit_restart_risk():
    lines = [
        {'text': "How you callin' me long-distance"},
        {'text': "I'm P-B-X-in'"},
        {'text': "How you callin' me long distance"},
    ]
    result = _boundary_lyric_repeat(lines, [0, 1, 2])
    assert result['available'] is True
    assert result['exact_text_match'] is True
    assert result['first_occurrence_index'] == 0
    assert result['last_occurrence_index'] == 2
    assert result['normalized_tokens'] == ['how', 'you', 'callin', 'me', 'long', 'distance']
    assert _boundary_lyric_repeat(lines, [0, 1])['available'] is False


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
    {'min_lines':1.5},{'max_overlap':1},{'min_seconds':31,'max_seconds':30},
    {'beat_aligned':'yes'}])
def test_invalid_config(config):
    with pytest.raises(ValueError):
        PhraseLoopConfig(**config)


def test_missing_canonical_grid_and_zero_length_occurrence(tmp_path):
    master,_,beat,stems,canonical=evidence(tmp_path)
    with pytest.raises(ValueError,match='canonical'):
        analyze_phrase_loops(master,tmp_path/'bad',canonical={},beat_results=[beat],stems=stems)
    empty=analyze_phrase_loops(master,tmp_path/'empty',canonical=canonical,
                              beat_results=[],stems=stems)
    assert (empty['candidate_count']==0
            and empty['rejected_candidates']['missing_beat_aligned_bounds'] > 0)
    canonical['lyric_timing'].insert(5,dict(start=10,end=10,text='Instant caption'))
    report=analyze_phrase_loops(master,tmp_path/'zero',canonical=canonical,
                               beat_results=[beat],stems=stems)
    assert report['candidate_count'] > 0
    # Zero-length entries may stay inside the expanded audio span, never become
    # the requested phrase start that generated the candidate.
    assert all(canonical['lyric_timing'][c['requested_canonical_line_indices'][0]]['end']
               > canonical['lyric_timing'][c['requested_canonical_line_indices'][0]]['start']
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
    result=CliRunner().invoke(app,['phrase-loops',str(tmp_path),'--top','3',
                                 '--max-bar-phase-error','0.125'])
    assert result.exit_code==0, result.output
    report=json.loads((tmp_path/'deep/phrase_loops/phrase_loops.json').read_text())
    assert report['candidate_count'] <= 3
    assert report['config']['max_bar_phase_error'] == .125
    assert report['config']['beat_aligned'] is True
    result=CliRunner().invoke(app,['phrase-loops',str(tmp_path),'--top','3',
                                  '--line-boundaries'])
    assert result.exit_code==0, result.output
    report=json.loads((tmp_path/'deep/phrase_loops/phrase_loops.json').read_text())
    assert report['config']['beat_aligned'] is False
