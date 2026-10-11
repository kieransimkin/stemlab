import numpy as np
import pytest

from stemlab.analysis.loops import detected_bar_phase_metrics
from stemlab.analysis.phrase_loops import PhraseLoopConfig, analyze_phrase_loops
from test_phrase_loops import evidence


@pytest.mark.parametrize('beats_per_bar,period', [(3,.4),(4,.5),(5,.3)])
def test_relative_bar_position_preserves_pickups_without_assuming_meter(beats_per_bar, period):
    beats = np.arange(61)*period
    down = np.arange(0,61,beats_per_bar)
    length = beats_per_bar*period
    a = 2*length+period*.3
    same = detected_bar_phase_metrics(beats,down,a,a+4*length)
    half = detected_bar_phase_metrics(beats,down,a,a+4.5*length)
    quarter = detected_bar_phase_metrics(beats,down,a,a+4.25*length)
    assert same['available'] and same['detected_beats_per_bar'] == beats_per_bar
    assert same['bar_phase_error'] == pytest.approx(0)
    assert half['bar_phase_error'] == pytest.approx(.5)
    assert quarter['bar_phase_error'] == pytest.approx(.25)


@pytest.mark.parametrize('indices,a,b', [([],1,3),([0,4],-1,1),
    ([0,4],1,3),([4,0],.5,1),([0,0,4],.5,1),([0,4.5],.5,1),
    ([0,4],float('nan'),1),([0,4],1,1)])
def test_unknown_bar_context_is_not_approved(indices,a,b):
    result = detected_bar_phase_metrics(np.arange(20)*.5,np.array(indices),a,b)
    assert result['available'] is False


def test_meter_change_and_unsigned_unsorted_indices_are_unavailable():
    beats = np.arange(21)*.5
    assert not detected_bar_phase_metrics(beats,np.array([0,3,6,10,14]),.5,6)['available']
    assert not detected_bar_phase_metrics(beats,np.array([4,0],dtype=np.uint32),.5,1)['available']


def test_opt_in_filter_rejects_half_bar_windows_preserves_raw_audio_and_strict_holds(tmp_path):
    master,y,beat,stems,canonical = evidence(tmp_path)
    for i,line in enumerate(canonical['lyric_timing']):
        if i%3 == 1:
            line['end'] -= 1  # End at a half-bar position; words are otherwise complete.
    cfg = dict(min_seconds=5,max_seconds=16,min_lines=1,top=64,max_overlap=.99)
    baseline = analyze_phrase_loops(master,tmp_path/'old',canonical=canonical,
        beat_results=[beat],stems=stems,config=PhraseLoopConfig(**cfg))
    filtered = analyze_phrase_loops(master,tmp_path/'new',canonical=canonical,
        beat_results=[beat],stems=stems,export_audio=True,
        config=PhraseLoopConfig(**cfg,max_bar_phase_error=.125))
    assert 'bar_phase_mismatch' not in baseline['rejected_candidates']
    assert any(c['detected_bar_phase']['bar_phase_error']>.125 for c in baseline['candidates'])
    assert filtered['rejected_candidates']['bar_phase_mismatch'] > 0
    assert filtered['candidate_count'] > 0 and filtered['accepted_loop_count'] == 0
    import soundfile as sf
    for item in filtered['candidates']:
        assert item['detected_bar_phase']['bar_phase_error'] <= .125
        assert 'complete_bar_alignment_unverified' in item['failed_gates']
        actual,sr = sf.read(tmp_path/'new'/item['file'],dtype='float32',always_2d=True)
        np.testing.assert_array_equal(actual,y[item['start_sample']:item['end_sample']])
        assert sr == 8000


def test_filter_requires_enclosing_downbeats_instead_of_extrapolating(tmp_path):
    master,_,beat,stems,canonical = evidence(tmp_path)
    beat.downbeats = [0.,2.]
    report = analyze_phrase_loops(master,tmp_path/'new',canonical=canonical,
        beat_results=[beat],stems=stems,config=PhraseLoopConfig(max_bar_phase_error=.125))
    assert report['candidate_count'] == 0
    assert report['rejected_candidates']['missing_bar_phase'] > 0


@pytest.mark.parametrize('value',[True,'0.1',float('nan'),float('inf'),-.01,.51])
def test_invalid_bar_phase_option(value):
    with pytest.raises(ValueError,match='max_bar_phase_error'):
        PhraseLoopConfig(max_bar_phase_error=value)
