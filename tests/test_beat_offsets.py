from decimal import Decimal
from fractions import Fraction
import json

import pytest

from stemlab.analysis.beat_offsets import alignment_from_report, compare_beat_offsets, pip_offset, tempo_family, timeline_beat_offsets, write_beat_offsets


def save(root, name, data):
    path = root/name
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data), encoding='utf-8')


@pytest.fixture
def results(tmp_path):
    root = tmp_path/'results'
    save(root, 'analysis.json', {'source': {'sha256': 'a'*64, 'audio': {'num_frames': 80000, 'sample_rate': 8000, 'num_channels': 1}},
                                'beats': [{'model': 'missing'}]})
    save(root, 'canonical.json', {'bpm': 120})
    save(root, 'beats/consensus.json', {'model': 'consensus', 'tempo_bpm': 60, 'beats': [.25, 1.25, 2.25], 'metadata': {'detectors': ['beatnet', 'beat_this']}})
    save(root, 'beats/beatnet.json', {'model': 'beatnet', 'tempo_bpm': 120, 'beats': [.125, .625, 1.125]})
    save(root, 'beats/beat_this.json', {'model': 'beat_this', 'tempo_bpm': 240, 'beats': [0, .25, .5]})
    return root


def test_exact_signed_native_clock_and_integer_residual():
    row = pip_offset(Decimal('.125'), Decimal('120'))
    assert row['offset_pips'] == -16
    assert row['exact_offset_pips'] == '-16'
    assert row['integer_residual_seconds'] == 0
    assert row['beat_zero_seconds'] == .125
    row = pip_offset(Fraction(1, 256), 120)
    assert row['offset_pips'] == -.5
    assert row['integer_offset_pips'] == -1
    assert row['integer_residual_pips'] == -.5
    assert row['integer_grid_origin_seconds'] == 1/128
    assert row['integer_residual_seconds'] == -1/256


@pytest.mark.parametrize('first,bpm', [(True, 120), (-1, 120), (0, 0), (float('nan'), 120), (1, float('inf')), ('1', 120)])
def test_invalid_inputs(first, bpm):
    with pytest.raises(ValueError):
        pip_offset(first, bpm)


def test_half_double_interpretations_preserve_raw_tempo():
    assert tempo_family(60, 120)['closest_multiplier'] == 2
    assert tempo_family(240, 120)['closest_multiplier'] == .5
    assert [r['bpm'] for r in tempo_family(60, 120)['interpretations']] == [30, 60, 120]
    assert tempo_family(None, 120)['status'] == 'unavailable'


def test_missing_detection_candidate_preserves_original_beats_and_raw_combined_tempo(results):
    path = results/'beats/consensus.json'
    save(results, 'beats/consensus.json', {'model': 'consensus', 'tempo_bpm': 120,
        'beats': [.125, .625, 1.125, 2.125, 2.625, 3.125]})
    before = path.read_bytes()
    report = compare_beat_offsets(results)
    consensus = next(row for row in report['analyses'] if row['analysis_id'] == 'consensus')
    assert consensus['sequential_grid_fit']['precision_grade'] == 'poor'
    assert consensus['constant_grid_fit']['inferred_missing_beats'] == 1
    assert consensus['constant_grid_fit']['proposed_bpm'] == 120
    assert report['bpm_bases'][1]['bpm'] == 120
    assert report['bpm_bases'][3]['bpm'] == 120
    assert path.read_bytes() == before


def test_full_matrix_uses_each_actual_first_beat_and_saved_consensus(results):
    before = {p: p.read_bytes() for p in results.rglob('*.json')}
    report = compare_beat_offsets(results)
    bases = {r['id']: r for r in report['bpm_bases']}
    assert bases['canonical']['bpm'] == 120
    assert bases['combined']['bpm'] == 60
    assert bases['combined_family']['bpm'] == 120
    rows = {(r['analysis_id'], r['bpm_basis']): r for r in report['comparisons']}
    assert len(rows) == 16
    assert rows['consensus', 'canonical']['offset_pips'] == -32
    assert rows['consensus', 'combined']['offset_pips'] == -16
    assert rows['beatnet', 'canonical']['offset_pips'] == -16
    assert rows['beat_this', 'combined']['offset_pips'] == 0
    assert rows['missing', 'canonical']['status'] == 'unavailable'
    assert all(p.read_bytes() == raw for p, raw in before.items())


def test_missing_canonical_keeps_combined_and_missing_consensus_keeps_individual(results):
    (results/'canonical.json').unlink()
    report = compare_beat_offsets(results)
    assert report['bpm_bases'][0]['status'] == 'unavailable'
    assert report['bpm_bases'][1]['bpm'] == 60
    (results/'beats/consensus.json').unlink()
    report = compare_beat_offsets(results, canonical_bpm=120)
    assert report['bpm_bases'][1]['status'] == 'unavailable'
    assert any(r['analysis_id'] == 'beatnet' and r['status'] == 'available' for r in report['comparisons'])


def test_consensus_timestamp_estimate_is_not_mean_of_individual_tempos(results):
    save(results, 'beats/consensus.json', {'model': 'consensus', 'beats': [.25, 1.25, 2.25]})
    report = compare_beat_offsets(results)
    assert report['bpm_bases'][1]['bpm'] == 60


def test_vamp_timestamps_and_failed_detector_are_explicit(results):
    save(results, 'vamp/data/vamp_beats.json', {'events': [{'start': .2}, {'start': .7}]})
    save(results, 'beats/beatnet.json', {'model': 'beatnet', 'status': 'failed', 'beats': [.1]})
    report = compare_beat_offsets(results)
    rows = {r['analysis_id']: r for r in report['analyses']}
    assert rows['vamp_beats']['first_beat_seconds'] == .2
    assert rows['beatnet']['status'] == 'unavailable'


def test_wrong_audio_rejected_and_wip_timeline_remains_available(results):
    audio = results/'wrong.wav'
    audio.write_bytes(b'wrong')
    with pytest.raises(ValueError, match='identity'):
        compare_beat_offsets(results, audio=audio)
    (results/'analysis.json').write_text('{', encoding='utf-8')
    assert timeline_beat_offsets(results)['status'] == 'unavailable'


def test_report_new_directory_and_existing_evidence_never_overwritten(results, tmp_path):
    output = tmp_path/'report'
    report = write_beat_offsets(results, output)
    assert json.loads((output/'beat-offsets.json').read_text()) == report
    assert 'integer_residual_seconds' in (output/'beat-offsets.csv').read_text()
    with pytest.raises(FileExistsError):
        write_beat_offsets(results, output)


def test_source_bound_handoff_keeps_exact_clock_and_estimated_phase(results, tmp_path):
    output = tmp_path/'renderer-handoff'
    report = write_beat_offsets(results, output, alignment_bpm_basis='canonical')
    alignment = json.loads((output/'beat-alignment.json').read_text())
    assert alignment['offset_pips'] == -32
    assert alignment['exact_bpm'] == '120'
    assert alignment['source_sha256'] == 'a'*64
    assert alignment['bpm_status'] == 'canonical'
    assert alignment['phase_status'] == 'estimated'
    assert len(alignment['report_sha256']) == 64
    report['comparisons'][0]['exact_offset_pips'] = '9'
    with pytest.raises(ValueError, match='disagree'):
        alignment_from_report(report)
    with pytest.raises(ValueError, match='unavailable'):
        alignment_from_report(report, analysis_id='missing')
