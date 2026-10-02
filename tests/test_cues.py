"""Deterministic cue snapping against supplied grids, without neural inference."""
from decimal import Decimal
import hashlib
import json

import pytest

from stemlab.cues import (
    BeatGrid, CueSnapConfig, format_timestamp, load_grid, parse_lrc, read_lrc,
    review_html, select_grid, snap_cue_file, snap_document, snap_existing_cues,
)


def grid(values, **kw):
    return BeatGrid(tuple(Decimal(str(v)) for v in values), 'test_detector', **kw)


def snap(text, beats, **kw):
    raw, report = snap_document(parse_lrc(text), grid(beats), CueSnapConfig(**kw))
    return raw.decode(), report


def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data), encoding='utf-8')
    return path


def test_bracketed_cue_labels_and_metadata_are_preserved():
    text = '[ti:Title]\r\n[ar:Artist]\r\n[offset:0]\r\n\r\n[00:12.95][ENTRY: VOCAL INTRO]\r\n[01:12.45][DROP: CHORUS 1]'
    raw, report = snap(text, [13, 72.4])
    assert raw == text.replace('[00:12.95]', '[00:13.00]').replace('[01:12.45]', '[01:12.40]')
    assert [c['label'] for c in report['cues']] == ['[ENTRY: VOCAL INTRO]', '[DROP: CHORUS 1]']
    assert report['all_cues_on_detected_beats'] and not report['review_count']


@pytest.mark.parametrize('time', ['1.23456789123456789', '59.999999999999', '60', '0.000000000000000000000000000001', '6000.5'])
def test_exact_decimal_roundtrip(time):
    value = Decimal(time)
    token = format_timestamp(value)
    assert parse_lrc(token + '[SECTION: TEST]').cues[0].time == value
    raw, report = snap(token + 'cue', [value])
    assert raw == token + 'cue'
    assert report['cues'][0]['nearest_beat_seconds_exact'] == str(value)
    assert report['all_cues_on_detected_beats']


def test_variable_grid_not_replaced_with_constant_bpm():
    raw, report = snap('[00:00.91]A\n[00:01.56]B\n[00:02.20]C', ['0.9238125', '1.62391', '2.31211'])
    assert [c.time for c in parse_lrc(raw).cues] == [Decimal(t) for t in ['0.9238125', '1.62391', '2.31211']]
    assert report['snapped_count'] == 3


@pytest.mark.parametrize('difference,near', [('0.15', True), ('0.150000000001', False), ('-0.15', True), ('-0.150000000001', False)])
def test_tolerance_is_inclusive_and_symmetric(difference, near):
    cue = Decimal('10') + Decimal(difference)
    raw, report = snap(format_timestamp(cue) + 'cue', [10])
    item = report['cues'][0]
    assert item['has_nearby_beat'] is near
    assert item['needs_review'] is (not near)
    assert parse_lrc(raw).cues[0].time == (Decimal(10) if near else cue)


def test_nearest_tie_uses_earlier_beat():
    raw, report = snap('[00:00.50]cue', [0, 1], tolerance_ms=500)
    assert report['cues'][0]['nearest_beat_index'] == 0
    assert raw == '[00:00.00]cue'


def test_zero_tolerance_exact_matches_only():
    _, report = snap('[00:01.00]A\n[00:02.00001]B', [1, 2], tolerance_ms=0)
    assert report['already_on_beat_count'] == 1 and report['kept_count'] == 1


def test_distant_cue_is_kept_and_flagged_with_gap():
    text = '[00:09.20][BREAK: SPOKEN BREAKDOWN]'
    raw, report = snap(text, [8, 10])
    assert raw == text
    item = report['cues'][0]
    assert item['nearest_beat_gap_ms'] == 800
    assert item['shift_to_nearest_beat_ms'] == 800
    assert item['applied_shift_ms'] == 0
    assert item['issues'] == ['no_nearby_beat']
    assert report['status'] == 'review_required'


def test_forced_cue_still_flagged_distant():
    raw, report = snap('[00:09.20][DROP: TEST]', [8, 10], force_snap=True)
    assert raw == '[00:10.00][DROP: TEST]'
    item = report['cues'][0]
    assert item['action'] == 'forced' and item['needs_review']
    assert not item['has_nearby_beat']
    assert report['all_cues_on_detected_beats'] and report['status'] == 'review_required'


@pytest.mark.parametrize('force', [False, True])
def test_no_grid_never_invents_a_beat(force):
    text = '[00:01.23]A\n[00:04.56]B\n'
    raw, report = snap(text, [], force_snap=force)
    assert raw == text
    assert report['review_count'] == 2 and report['without_nearby_beat_count'] == 2
    assert all(c['nearest_beat_seconds'] is None for c in report['cues'])


@pytest.mark.parametrize('encoding,bom', [('utf-8', b''), ('utf-8', b'\xef\xbb\xbf'), ('utf-16-le', b'\xff\xfe'), ('utf-16-be', b'\xfe\xff')])
def test_unicode_bom_crlf_and_no_final_newline_preserved(tmp_path, encoding, bom):
    text = '[ti:Clay — 星]\r\n[by:Kieran]\r\n[00:01.03][DROP: 星]'
    source = tmp_path / 'cues.lrc'
    source.write_bytes(bom + text.encode(encoding))
    before = source.read_bytes()
    report = snap_cue_file(source, tmp_path / 'new', grid=grid([1]))
    raw = (tmp_path / 'new' / report['output_cue_file']).read_bytes()
    assert raw == bom + text.replace('[00:01.03]', '[00:01.00]').encode(encoding)
    assert source.read_bytes() == before


def test_multiple_leading_timestamps_and_blank_cues():
    text = '  [00:01.01] \t[00:02.02]   [SECTION: KEEP [03:04.50]]\n[00:03.03]\n'
    raw, report = snap(text, [1, 2, 3])
    assert raw == text.replace('[00:01.01]', '[00:01.00]').replace('[00:02.02]', '[00:02.00]').replace('[00:03.03]', '[00:03.00]')
    assert report['cue_count'] == 3
    assert report['cues'][0]['label'] == '[SECTION: KEEP [03:04.50]]'


@pytest.mark.parametrize('offset', [200, -200])
def test_offset_preserved_and_applied_once(offset):
    text = f'[offset:{offset}]\n[00:01.03]cue'
    effective = Decimal('1.03') - Decimal(offset) / 1000
    target = effective + Decimal('.04')
    raw, report = snap(text, [target])
    assert raw == f'[offset:{offset}]\n[00:01.07]cue'
    assert Decimal(report['cues'][0]['output_seconds_exact']) == target
    assert parse_lrc(raw).offset_ms == offset


def test_negative_output_tag_due_to_offset_is_not_encoded():
    text = '[offset:-1000]\n[00:00.04]cue'
    raw, report = snap(text, ['.95'])
    assert raw == text
    assert 'offset_cannot_encode_beat' in report['cues'][0]['issues']


@pytest.mark.parametrize('text', ['[00:60.01]cue', '[00:xx]cue', '[01:02:03]cue', '[00:00.-4]cue', '[offset:x]\n[00:01]A', '[offset:0]\n[offset:0]\n[00:01]A', '[00:01]<00:01.0>word', '[00:01]x\x00'])
def test_malformed_and_enhanced_timing_rejected(text):
    with pytest.raises(ValueError):
        parse_lrc(text)


@pytest.mark.parametrize('value', [-1, float('nan'), float('inf'), True, '150', 60001])
def test_invalid_tolerance(value):
    with pytest.raises(ValueError):
        CueSnapConfig(tolerance_ms=value)


@pytest.mark.parametrize('options', [dict(beat_model='../bad'), dict(force_snap='true'), dict(downbeats_only=1), dict(precision='2')])
def test_invalid_options(options):
    with pytest.raises(ValueError):
        CueSnapConfig(**options)


@pytest.mark.parametrize('precision,expected,error', [('milliseconds', '[01:00.000]A', .49), ('centiseconds', '[01:00.00]A', .49)])
def test_rounded_compatibility_mode_is_not_claimed_exact(precision, expected, error):
    raw, report = snap('[00:59.99]A', ['59.99951'], precision=precision)
    assert raw == expected
    item = report['cues'][0]
    assert item['serialization_error_ms'] == pytest.approx(error)
    assert 'rounded_off_beat' in item['issues'] and not report['all_cues_on_detected_beats']


def test_sample_frames_rounded_to_native_rate():
    _, report = snap_document(parse_lrc('[00:01.23]A'), grid(['1.23456789'], sample_rate=44100), CueSnapConfig())
    item = report['cues'][0]
    assert item['nearest_beat_sample'] == 54444 == item['output_sample']


def test_distinct_cues_sharing_beat_remain_and_are_flagged():
    raw, report = snap('[00:00.99]A\n[00:01.01]B', [1])
    assert raw == '[00:01.00]A\n[00:01.00]B'
    assert all('shared_beat' in c['issues'] for c in report['cues'])


def test_intentionally_simultaneous_cues_are_not_collision():
    _, report = snap('[00:01.00]A\n[00:01.000]B', [1])
    assert report['review_count'] == 0


def test_multi_timestamp_lrc_keeps_original_line_order():
    text = '[00:02][00:06]chorus\n[00:04]verse'
    raw, report = snap(text, [2, 4, 6])
    assert raw == '[00:02.00][00:06.00]chorus\n[00:04.00]verse'
    assert not any('order_inversion' in c['issues'] for c in report['cues'])


def test_auto_consensus_preferred_even_if_another_grid_fits_cue_better():
    selected = select_grid([('beat_this', {'beats': [1.05]}, None, None), ('consensus', {'beats': [1]}, None, None)], config=CueSnapConfig())
    assert selected.model == 'consensus' and selected.times == (Decimal(1),)
    _, report = snap_document(parse_lrc('[00:01.05]A'), selected, CueSnapConfig())
    assert report['cues'][0]['output_seconds'] == 1


def test_auto_fallback_records_empty_or_broken_detector():
    selected = select_grid([('consensus', {'beats': []}, None, None), ('all_in_one', {'beats': ['bad']}, None, None), ('beat_this', {'beats': [1]}, None, None)], config=CueSnapConfig())
    assert selected.model == 'beat_this' and len(selected.warnings) == 2


def test_specific_missing_model_refuses_fallback():
    with pytest.raises(ValueError, match='requested detector'):
        select_grid([], config=CueSnapConfig(beat_model='beatnet'))


@pytest.mark.parametrize('values', [[True], ['1.0'], [-1], [float('nan')], [float('inf')], 10])
def test_specific_invalid_grid_rejected(values):
    with pytest.raises(ValueError):
        select_grid([('beatnet', {'beats': values}, None, None)], config=CueSnapConfig(beat_model='beatnet'))


def test_downbeats_use_reported_events_not_every_fourth_beat():
    g = select_grid([('beat_this', {'beats': [0, 1, 2, 3, 4, 5], 'downbeats': [1, 4]}, None, None)], config=CueSnapConfig(downbeats_only=True))
    assert g.times == (Decimal(1), Decimal(4)) and g.kind == 'downbeats'
    g = select_grid([('beat_this', {'beats': [0, 1, 2, 3, 4, 5]}, None, None)], config=CueSnapConfig(downbeats_only=True))
    assert not g.times


def test_grid_sorted_deduplicated_with_warning():
    g = select_grid([('beatnet', {'beats': [2, 1, 1]}, None, None)], config=CueSnapConfig())
    assert g.times == (Decimal(1), Decimal(2)) and g.warnings


def test_no_bpm_synthesis_when_grid_is_missing(tmp_path):
    save_json(tmp_path / 'canonical.json', {'bpm': 120})
    g = load_grid(tmp_path, config=CueSnapConfig())
    assert not g.times


def test_exact_json_decimal_and_hashes(tmp_path):
    p = tmp_path / 'beat_this.json'
    p.write_text('{"model":"beat_this","beats":[1.23456789123456789]}')
    g = load_grid(p, config=CueSnapConfig())
    assert g.times == (Decimal('1.23456789123456789'),)
    assert g.sha256 == hashlib.sha256(p.read_bytes()).hexdigest()


def test_analysis_metadata_sample_rate_duration_and_source_identity(tmp_path):
    save_json(tmp_path / 'analysis.json', {'source': {'sha256': 'source-hash', 'audio': {'sample_rate': 44100, 'num_frames': 100000}}})
    save_json(tmp_path / 'beats/beat_this.json', {'beats': [0, 1, 2, 3]})
    g = load_grid(tmp_path, config=CueSnapConfig())
    assert g.sample_rate == 44100 and g.source_sha256 == 'source-hash'
    assert g.times == (Decimal(0), Decimal(1), Decimal(2))
    assert g.warnings and g.analysis_sha256
    with pytest.raises(ValueError, match='disagrees'):
        load_grid(tmp_path, config=CueSnapConfig(), sample_rate=48000)


def test_outside_audio_not_forced(tmp_path):
    g = grid([0, 1, 2], duration=Decimal(3))
    text = '[00:04.00]end'
    raw, report = snap_document(parse_lrc(text), g, CueSnapConfig(force_snap=True))
    assert raw.decode() == text
    assert report['cues'][0]['issues'] == ['no_nearby_beat', 'outside_audio']


def test_corrupt_auto_file_falls_back_with_warning(tmp_path):
    save_json(tmp_path / 'beats/beat_this.json', {'beats': [1]})
    (tmp_path / 'beats/consensus.json').write_text('broken')
    g = load_grid(tmp_path, config=CueSnapConfig())
    assert g.model == 'beat_this' and 'Invalid' in g.warnings[0]


def test_structure_json_fallback(tmp_path):
    save_json(tmp_path / 'deep/structure/structure.json', {'beats': [1, 2], 'downbeats': [1]})
    g = load_grid(tmp_path, config=CueSnapConfig())
    assert g.model == 'all_in_one' and g.times == (Decimal(1), Decimal(2))


def test_escaping_symlink_rejected(tmp_path):
    external = save_json(tmp_path / 'external.json', {'beats': [1]})
    (tmp_path / 'results/beats').mkdir(parents=True)
    try:
        (tmp_path / 'results/beats/consensus.json').symlink_to(external)
    except OSError:
        pytest.skip('Symlinks unavailable on this host')
    with pytest.raises(ValueError, match='symlink'):
        load_grid(tmp_path / 'results', config=CueSnapConfig())


def test_safe_new_output_atomic_result_and_no_rewrites(tmp_path):
    cues = tmp_path / 'cue.lrc'
    cues.write_text('[00:01.04][DROP: Test]\n[00:05.80]Later')
    beat_path = save_json(tmp_path / 'beat_this.json', {'beats': [1, 6]})
    before = {p: p.read_bytes() for p in [cues, beat_path]}
    report = snap_existing_cues(beat_path, cues, tmp_path / 'out')
    assert all(p.read_bytes() == data for p, data in before.items())
    assert set(p.name for p in (tmp_path / 'out').iterdir()) == {'cue.beat-snapped.lrc', 'report.json', 'review.html', 'review.txt'}
    assert json.loads((tmp_path / 'out/report.json').read_text()) == report
    assert 'REVIEW line 2' in (tmp_path / 'out/review.txt').read_text()
    assert '<tr class="review">' in (tmp_path / 'out/review.html').read_text()
    with pytest.raises(FileExistsError):
        snap_existing_cues(beat_path, cues, tmp_path / 'out')


def test_input_not_replaced_when_output_is_input_file(tmp_path):
    p = tmp_path / 'x.lrc'
    p.write_text('[00:01]A')
    with pytest.raises(FileExistsError):
        snap_cue_file(p, p, grid=grid([1]))
    assert p.read_text() == '[00:01]A'


def test_parse_error_creates_no_outputs(tmp_path):
    p = tmp_path / 'x.lrc'
    p.write_text('[00:xx]A')
    with pytest.raises(ValueError):
        snap_cue_file(p, tmp_path / 'out', grid=grid([1]))
    assert not (tmp_path / 'out').exists()


def test_no_cues_rejected_by_file_operation(tmp_path):
    p = tmp_path / 'x.lrc'
    p.write_text('[ti:No cues]')
    with pytest.raises(ValueError, match='No line-level'):
        read_lrc(p)


def test_html_does_not_execute_cue_text():
    _, report = snap('[00:04.00]<script>alert("hello")</script>', [1])
    output = review_html(report)
    assert '<script>' not in output and '&lt;script&gt;' in output
    assert 'default-src' in output and 'REVIEW' in output


def test_output_hash_matches_actual_bytes(tmp_path):
    p = tmp_path / 'x.lrc'
    p.write_bytes(b'\xef\xbb\xbf[00:01.03]A\r\n')
    report = snap_cue_file(p, tmp_path / 'out', grid=grid([1]))
    output = (tmp_path / 'out' / report['output_cue_file']).read_bytes()
    assert report['output_cue_sha256'] == hashlib.sha256(output).hexdigest()
    assert report['input_cue_sha256'] == hashlib.sha256(p.read_bytes()).hexdigest()
