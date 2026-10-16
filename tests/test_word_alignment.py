from stemlab.word_alignment import reconcile


def test_missing_words_are_not_invented():
    r = reconcile('Fly softly home', [{'word':'Fly','start':1,'end':1.2},
                  {'word':'home','start':2,'end':2.5}], 5)
    assert r['words'][1]['start'] is None
    assert not r['accepted']
    assert r['canonical_text'] == 'Fly softly home'


def test_repeated_phrases_preserve_order():
    r = reconcile('fly home\nfly home', [dict(word=w,start=i,end=i+.2)
                   for i,w in enumerate(['fly','home','fly','home'])], 5)
    assert [w['start'] for w in r['words']] == [0,1,2,3]
    assert r['exact_words'] == 4


def test_invalid_timings_flagged():
    r = reconcile('fly home', [dict(word='fly',start=1,end=1),
                  dict(word='home',start=2,end=9)], 5)
    assert r['review_words'] == 2


def test_short_words_not_fuzzily_matched():
    r = reconcile('in', [dict(word='it',start=1,end=2)], 5)
    assert r['matched_words'] == 0


def test_punctuation_on_observed_short_words_preserves_canonical_text_and_exact_times():
    observed = [dict(word=' Oh!', start=.125, end=.3), dict(word='Go,', start=.5, end=.7),
                dict(word='go.', start=1, end=1.2)]
    before = [dict(word) for word in observed]
    result = reconcile('Oh!\nGo, go.', observed, 2)
    assert result['exact_words'] == 3
    assert result['canonical_text'] == 'Oh!\nGo, go.'
    assert [word['start'] for word in result['words']] == [.125, .5, 1]
    assert observed == before
    assert result['listening_qa'] == 'pending' and not result['accepted']


def test_multiword_asr_stamp_is_not_split_to_invent_word_times():
    result = reconcile('go home', [dict(word='go home', start=1, end=2)], 3)
    assert result['matched_words'] == 0
    assert all(word['start'] is None for word in result['words'])
