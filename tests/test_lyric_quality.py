import pytest
from stemlab.lyric_quality import assess_lines, select_eligible
from stemlab.lyric_acoustic import canonical_result, draft_lrc


def line(text='A small synthetic lyric', start=1, end=3, source='asr_alignment'):
    return dict(text=text, start=start, end=end, timing_source=source, canonical_word_count=len(text.split()))


def test_high_global_score_cannot_hide_interpolated_verse():
    bad = dict(matched_ratio=.94, duration=40, lines=[line(), line(start=3, end=3.1, source='interpolated')])
    with pytest.raises(ValueError, match='line-level'):
        select_eligible([bad])


def test_complete_lower_score_beats_invalid_winner():
    bad = dict(matched_ratio=.99, duration=40, lines=[line(end=28)])
    good = dict(matched_ratio=.85, duration=40, lines=[line()])
    assert select_eligible([bad, good]) == 1


def test_many_lines_squeezed_into_two_seconds_are_held():
    lines = [line(start=20+i*.12, end=20+(i+1)*.12) for i in range(17)]
    report = assess_lines(lines, 50)
    assert not report['export_eligible']
    assert any('compressed' in reason for issue in report['issues'] for reason in issue['reasons'])


def test_centisecond_collision_is_not_shifted():
    assert not assess_lines([line('one', 1, 1.003), line('two', 1.004, 1.1)], 20)['export_eligible']


def test_acoustic_adapter_preserves_canonical_text_and_crop_clock():
    raw = {'segments': [{'words': [{'word': ' A', 'start': .2, 'end': .5},
                                  {'word': ' dream', 'start': .5, 'end': 1}]}]}
    result = canonical_result('A dream\n', raw, 30, offset=12)
    assert result['lines'][0]['start'] == 12.2
    assert '[00:12.20]A dream' in draft_lrc(result, title='Test', artist='Test')
    assert not result['accepted']


def test_forced_text_omissions_are_not_filled():
    with pytest.raises(ValueError, match='every canonical line'):
        canonical_result('one\ntwo', {'segments': []}, 20)


def test_backend_substitution_is_not_canonical_evidence():
    with pytest.raises(ValueError, match='changed canonical tokens'):
        canonical_result('original', {'segments': [{'words': [{'word': 'different', 'start': 1, 'end': 2}]}]}, 20)


def test_zero_duration_first_word_and_middle_word_are_held():
    for instant in [0, 1]:
        words = [{'word': 'one', 'start': 1, 'end': 1.2}, {'word': 'two', 'start': 1.2, 'end': 1.5}]
        words[instant]['end'] = words[instant]['start']
        result = canonical_result('one two', {'segments': [{'words': words}]}, 20)
        with pytest.raises(ValueError, match='gates'):
            draft_lrc(result, title='Test', artist='Test')


def test_instant_words_do_not_become_full_coverage_claim():
    assert not assess_lines([line(start=2, end=2)], 20)['export_eligible']
