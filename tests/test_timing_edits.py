from __future__ import annotations
import hashlib
import json
import wave
from pathlib import Path

import pytest

from stemlab import timing_edits


def make_root(tmp_path: Path) -> tuple[Path, str]:
    audio = tmp_path / 'song.wav'
    with wave.open(str(audio), 'wb') as handle:
        handle.setnchannels(1);handle.setsampwidth(2);handle.setframerate(8000)
        handle.writeframes(b'\0\0' * 32000)
    sha = hashlib.sha256(audio.read_bytes()).hexdigest()
    root = tmp_path / sha
    (root / '.source').mkdir(parents=True)
    (root / '.source' / 'upload.wav').write_bytes(audio.read_bytes())
    (root / 'canonical.json').write_text(json.dumps({'bpm':120,'lyrics':'Hello world\nOne more line',
        'lyric_timing':[{'start':.125,'end':1.125,'text':'Hello world'},
                        {'start':1.125,'end':2.125,'text':'One more line'}],
        'sections':[{'start':.125,'end':1.125,'label':'INTRO'},
                    {'start':1.125,'end':2.125,'label':'VERSE 1'}]}),encoding='utf-8')
    return root,sha


def test_seed_source_exact_and_fixed_export(tmp_path):
    root,hash_value=make_root(tmp_path)
    doc,saved,rev,warnings=timing_edits.read_or_seed(root,hash_value)
    assert not saved and rev is None and any('unverified' in x for x in warnings)
    assert doc['lines'][0]['start_frame']==1000
    assert doc['clock_mode']=='fixed'
    exported=timing_edits.export_document(root,hash_value,doc)
    assert '[00:00.125]Hello world' in exported['line_lrc']
    assert '[SECTION: INTRO]' in exported['cue_lrc']
    assert '[SECTION: VERSE 1]' in exported['cue_lrc']
    assert exported['clock']['offset_pips']==0 # no consensus: never invent first beat


def test_enforced_section_names(tmp_path):
    assert timing_edits.cue_name('section','verse 1')==('SECTION','VERSE 1')
    assert timing_edits.cue_name('DROP','CHORUS 1')==('DROP','CHORUS 1')
    assert timing_edits.cue_name('ENTRY','VOCAL INTRO')==('ENTRY','VOCAL INTRO')
    for type_,name in [('CRASH','VERSE'),('SECTION','SILLY RANDOM NAME'),('SECTION','VERSES'),
                       ('BREAK','INTRO\nDROP'),('SECTION','')] :
        with pytest.raises(ValueError):timing_edits.cue_name(type_,name)


def test_edit_validation_words_bound_to_lines_and_concurrency(tmp_path):
    root,hash_value=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,hash_value)
    doc['words']=[{'id':'word-0001','line_id':doc['lines'][0]['id'],
       'start_frame':1200,'end_frame':2000,'word':'Hello'}]
    original=timing_edits.preview(root,hash_value,doc)
    saved,revision=timing_edits.save(root,hash_value,original,None)
    assert timing_edits.read_or_seed(root,hash_value)[2]==revision
    assert saved['words'][0]['word']=='Hello'
    with pytest.raises(FileExistsError):timing_edits.save(root,hash_value,saved,None)
    saved['words'][0]['end_frame']=saved['lines'][1]['start_frame']+10
    with pytest.raises(ValueError,match='Word end'):
        timing_edits.preview(root,hash_value,saved)


def test_import_word_tsv_and_cue_lrc(tmp_path):
    root,hash_value=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,hash_value)
    words=timing_edits.import_text(root,hash_value,doc,kind='words',format='tsv',
        text='start\tend\tprobability\tword\n0.150\t0.350\t0.97\tHello\n0.400\t0.600\t0.8\tworld\n')
    assert len(words['words'])==2
    assert words['words'][1]['line_id']==words['lines'][0]['id']
    cues=timing_edits.import_text(root,hash_value,doc,kind='cues',format='lrc',
        text='[00:00.125][SECTION: INTRO]\n[00:01.125][DROP: CHORUS 1]\n')
    assert cues['cues'][1]['type']=='DROP'
    with pytest.raises(ValueError,match='Nonstandard'):
        timing_edits.import_text(root,hash_value,doc,kind='cues',format='lrc',
            text='[00:00.125][SECTION: UNAPPROVED STUFF]\n')
    with pytest.raises(ValueError,match='Remove or export'):
        timing_edits.import_text(root,hash_value,words,kind='lines',format='lrc',
            text='[00:00.50]Changed parent\n')


def test_source_mismatch_and_missing_beat_map_cannot_silently_use_fixed(tmp_path):
    root,hash_value=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,hash_value)
    with pytest.raises(ValueError,match='SHA-256'):
        timing_edits.preview(root,hash_value,{**doc,'source_sha256':'b'*64})
    doc['clock_mode']='variable'
    with pytest.raises((ValueError,FileExistsError)):
        timing_edits.preview(root,hash_value,doc)


def test_import_enhanced_word_lrc_uses_explicit_display_boundaries(tmp_path):
    root,source=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,source)
    rows=timing_edits.import_text(root,source,doc,kind='words',format='lrc',
       text='[00:01.125]<00:01.200>One <00:01.400>more <00:01.600>line\n')
    assert [r['word'] for r in rows['words']]==['One','more','line']
    assert rows['words'][0]['end_frame']==rows['words'][1]['start_frame']
    assert rows['review_status']=='draft'


def test_line_lrc_clear_time_remains_explicit_end(tmp_path):
    root,source=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,source)
    imported=timing_edits.import_text(root,source,doc,kind='lines',format='lrc',
        text='[00:00.125]Hello world\n[00:00.750]\n[00:01.125]One more line\n')
    assert imported['lines'][0]['end_frame']==6000
    assert imported['lines'][1]['start_frame']==9000


def test_word_lrc_offsets_are_not_silently_dropped(tmp_path):
    root,source=make_root(tmp_path)
    doc,*_=timing_edits.read_or_seed(root,source)
    imported=timing_edits.import_text(root,source,doc,kind='words',format='lrc',
        text='[offset:100]\n[00:01.300]<00:01.300>One <00:01.500>more <00:01.700>line\n')
    assert imported['words'][0]['start_frame']==9600
    with pytest.raises(ValueError,match='Multiple word-LRC offsets'):
        timing_edits.import_text(root,source,doc,kind='words',format='lrc',
            text='[offset:1]\n[offset:2]\n[00:01.500]Hello\n')
