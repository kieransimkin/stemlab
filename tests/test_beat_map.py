"""Variable-tempo and phase handoff tests; no source audio or detector modifications."""
import hashlib
import io
import json
import sys
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

sys.path.insert(0, str(Path(__file__).parents[1] / 'src'))
from stemlab.beat_map import (SCHEMA, seed_from_consensus, preview, save,
                              read_or_seed, phase_at_frame, export_document)


def fixture(tmp_path, *, times=(.125, .625, 1.125, 1.77, 2.26), sr=8000):
    # Encode once in memory, hash those exact bytes, then create the SHA-named
    # folder directly. Windows cloud sync can lock a populated folder on rename.
    wave = np.zeros(sr * 3, dtype=np.float32)
    buffer = io.BytesIO()
    sf.write(buffer, wave, sr, format='WAV', subtype='FLOAT')
    audio_bytes = buffer.getvalue()
    actual_sha = hashlib.sha256(audio_bytes).hexdigest()
    final = tmp_path/actual_sha
    (final/'.source').mkdir(parents=True)
    (final/'beats').mkdir()
    (final/'.source/upload.wav').write_bytes(audio_bytes)
    (final/'beats/consensus.json').write_text(json.dumps({'model':'consensus','beats':list(times)}))
    return final, actual_sha


def test_defaults_match_consensus_at_source_sample_precision(tmp_path):
    root, sha = fixture(tmp_path)
    doc, saved, revision = read_or_seed(root, sha)
    assert not saved and revision is None
    assert doc['schema'] == SCHEMA and doc['pips_per_beat'] == 64
    assert [r['source'] for r in doc['beats']] == ['consensus']*5
    assert [r['source_frame'] for r in doc['beat_timeline']] == [1000,5000,9000,14160,18080]
    assert doc['tempo_segments'][0]['bpm'] == 120
    assert doc['tempo_segments'][2]['bpm'] == pytest.approx(60/.645)
    assert doc['sync']['beat_1_start_seconds'] == .125
    assert doc['sync']['sync_phase_offset_pips'] == -16
    assert doc['sync']['beat_1_start_pips'] == 16
    assert doc['sync']['exact_phase_offset_pips'] == '-16'
    assert phase_at_frame(doc, 1000) == 0
    assert phase_at_frame(doc, 5000) == 64
    assert phase_at_frame(doc, 9000) == 128
    assert phase_at_frame(doc, (9000+14160)//2) == 160
    assert not (root/'timing/beat-timeline.json').exists()


def test_irregular_user_correction_is_not_smoothed_back_to_constant_tempo(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    doc['beats'][2]['frame'] += 370
    doc['beats'][2]['source'] = 'corrected'
    report = preview(root, sha, doc)
    assert report['beat_timeline'][2]['consensus_error_ms'] == pytest.approx(46.25)
    assert report['tempo_segments'][1]['bpm'] != report['tempo_segments'][2]['bpm']
    assert phase_at_frame(report, 9370) == 128
    assert report['beats'][2]['reference_frame'] == 9000
    assert report['beats'][1]['frame'] == 5000
    assert not (root/'timing/beat-timeline.json').exists()


def test_change_beat_one_and_integrated_sync_phase(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    doc['origin_beat'] = 2
    result = export_document(doc)
    assert result['sync']['beat_1_start_seconds'] == 1.125
    assert result['sync']['exact_phase_offset_pips'] == '-144'
    assert phase_at_frame(result, 9000) == 0
    assert phase_at_frame(result, 0) == -144
    assert result['beat_timeline'][0]['pip'] == -128
    assert result['beat_timeline'][2]['pip'] == 0


def test_explicit_beat_gaps_and_backwards_monotonicity_rejection(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    doc['beats'][2]['beat'] = 3
    doc['beats'][3]['beat'] = 4
    doc['beats'][4]['beat'] = 5
    out = preview(root, sha, doc)
    assert out['tempo_segments'][1]['bpm'] == 240
    assert phase_at_frame(out, 9000) == 192
    doc['beats'][2]['frame'] = doc['beats'][1]['frame']
    with pytest.raises(ValueError, match='strictly'):
        preview(root, sha, doc)


def test_no_overwrite_consensus_and_revision_protection(tmp_path):
    root, sha = fixture(tmp_path)
    before = (root/'beats/consensus.json').read_bytes()
    doc = seed_from_consensus(root, sha)
    result, revision = save(root, sha, doc, None)
    assert revision and len(revision) == 64
    assert result['schema'] == SCHEMA
    assert (root/'beats/consensus.json').read_bytes() == before
    loaded, saved, loaded_revision = read_or_seed(root, sha)
    assert saved and loaded_revision == revision
    assert loaded == result
    with pytest.raises(FileExistsError):
        save(root, sha, doc, None)
    doc['review_status'] = 'artist_confirmed'
    _, new_revision = save(root, sha, doc, revision)
    assert new_revision != revision
    assert read_or_seed(root, sha)[0]['review_status'] == 'artist_confirmed'


def test_consensus_change_is_rejected_as_stale(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    (root/'beats/consensus.json').write_text(json.dumps({'model':'consensus','beats':[.12,.62,1.12]}))
    with pytest.raises(ValueError, match='changed'):
        preview(root, sha, doc)


@pytest.mark.parametrize('fault', [
    lambda d: d.update(pips_per_beat=16),
    lambda d: d['beats'][1].update(frame=-1),
    lambda d: d['beats'][1].update(source='consensus', frame=4001),
    lambda d: d['beats'][1].update(source='manual', reference_frame=4000),
    lambda d: d['beats'][1].update(beat=0),
    lambda d: d.update(origin_beat=1234),
    lambda d: d['source_audio'].update(sha256='f'*64),
])
def test_source_bound_validation_rejects_tampering(tmp_path, fault):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    fault(doc)
    with pytest.raises(ValueError):
        preview(root, sha, doc)


def test_most_recent_beat_is_not_automatically_authoritative_downbeat(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    assert doc['review_status'] == 'estimated'
    assert 'downbeat' not in doc
    assert doc['origin_beat'] == 0
    assert len(doc['beats']) == 5


def test_master_bytes_are_verified_before_export(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    with (root / '.source/upload.wav').open('ab') as f:
        f.write(b'tampered')
    with pytest.raises(ValueError, match='Master audio bytes'):
        preview(root, sha, doc)


def test_import_cannot_forge_consensus_reference_frames(tmp_path):
    root, sha = fixture(tmp_path)
    doc = seed_from_consensus(root, sha)
    doc['beats'][1]['reference_frame'] = 5001
    doc['beats'][1]['frame'] = 5001
    with pytest.raises(ValueError, match='unique original detections'):
        preview(root, sha, doc)
