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
