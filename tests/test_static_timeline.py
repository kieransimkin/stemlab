"""Static exporter contracts using generated audio; no learned-model claims."""
from __future__ import annotations

import io
import json
from pathlib import Path
import re
import sys

import numpy as np
import pytest
import soundfile as sf
from scipy.signal import stft

from stemlab.static_timeline import (
    WEB_ROOT, adapt_bundle, digest, export_timeline, public_value, read_json,
    safe_file, verify_snapshot, write_json,
)

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))


def build_small_analysis(root: Path) -> Path:
    root.mkdir(parents=True)
    (root / 'input').mkdir()
    sr = 16000
    time = np.arange(sr * 4) / sr
    signal = (.2 * np.sin(time * 2 * np.pi * 110)).astype('float32')
    master = root / 'input/synthetic.wav'
    sf.write(master, np.column_stack([signal, signal * .9]), sr, subtype='FLOAT')
    sha = digest(master)
    write_json(root / 'analysis.json', {
        'source': {'sha256': sha, 'copied_path': 'input/synthetic.wav', 'original_path': '/private/music.wav'},
        'models': [], 'errors': [], 'completed_at': 'unit-test',
        'fixture_note': 'Synthetic audio and test annotations, not learned-model output',
        'config': {'private': '/secret'},
    })
    write_json(root / 'canonical.json', {'title': 'Synthetic contract test — no model accuracy claims',
                                        'bpm': 120, 'lyrics': 'A test',
                                        'lyric_timing': [{'start': 0, 'end': 1, 'text': 'A test'}]})
    write_json(root / 'beats/consensus.json', {'model': 'synthetic', 'beats': list(np.arange(0, 4, .5))})
    write_json(root / 'deep/loops/loops.json', {'schema': 'stemlab.loops.v1', 'loop_count': 0, 'loops': [], 'unresolved_sections': [],
        'source_sha256': sha, 'source_frames': sr * 4, 'sample_rate': sr, 'channels': 2})
    (root / 'spectrograms').mkdir()
    frequencies, times, z = stft(signal, sr, nperseg=256)
    np.savez_compressed(root / 'spectrograms/master.npz',
                        magnitude_db=(20 * np.log10(np.maximum(np.abs(z), 1e-5))).astype('float32'),
                        times_seconds=times, frequencies_hz=frequencies, sample_rate=sr)
    return root


@pytest.fixture
def analysis(tmp_path):
    return build_small_analysis(tmp_path / 'results')


def test_snapshot_reuses_real_bundle_and_exact_source(analysis, tmp_path):
    destination = tmp_path / 'site'
    meta = export_timeline(analysis, destination, include_audio=True, source_commit='a' * 40)
    assert verify_snapshot(destination)['status'] == 'passed'
    assert (destination / 'media/source.wav').read_bytes() == (analysis / 'input/synthetic.wav').read_bytes()
    assert meta['duration_seconds'] == 4
    assert meta['coverage']['status'] == 'saved-snapshot'
    assert meta['original_bundle_sha256'] == digest(WEB_ROOT / 'app.js')
    assert meta['url_literals_relocated'] >= 10
    index = (destination / 'index.html').read_text()
    assert 'stemlab-static-data' in index and 'assets/app.js' in index
    assert 'cdn.socket.io' not in index and 'src="/assets/' not in index
    assert index.index('assets/static-timeline.js') < index.index('assets/app.js')
    payload = json.loads(re.search(r'id="stemlab-static-data">(.*?)</script>', index).group(1))
    assert payload['hash'] == meta['source_sha256']
    assert all(not path.startswith('/') for path in payload['routes'].values())
    assert all((destination / path).is_file() for path in payload['routes'].values())
    assert 'api_required' in meta and meta['api_required'] is False
    state = read_json(destination / 'data/timeline.json')
    assert state['first_detected_beat'] == 0
    assert state['canonical']['lyric_timing'][0]['text'] == 'A test'
    assert 'config' not in read_json(destination / 'data/analysis.json')
    assert 'original_path' not in read_json(destination / 'data/analysis.json')['source']
    assert not (destination / 'input').exists()


def test_export_requires_audio_opt_in_and_new_output(analysis, tmp_path):
    with pytest.raises(ValueError, match='include-audio'):
        export_timeline(analysis, tmp_path / 'site')
    with pytest.raises(ValueError, match='outside'):
        export_timeline(analysis, analysis / 'public', include_audio=True)
    output = tmp_path / 'site'
    output.mkdir()
    with pytest.raises(FileExistsError):
        export_timeline(analysis, output, include_audio=True)


def test_midi_export_keeps_native_bytes_and_omits_worker_requests(analysis, tmp_path):
    import pretty_midi
    folder = analysis / 'deep/midi/basic_pitch/bass'
    folder.mkdir(parents=True)
    performance = pretty_midi.PrettyMIDI()
    instrument = pretty_midi.Instrument(32)
    instrument.notes.append(pretty_midi.Note(90, 45, .3, .9))
    performance.instruments.append(instrument)
    native = folder / 'transcription.mid'
    performance.write(str(native))
    write_json(folder / 'notes.json', {'schema': 'stemlab.midi-notes.v1', 'notes': []})
    write_json(folder / 'request.json', {'source': '/private/source.wav'})
    (folder / 'backend.log').write_text('private diagnostics')
    original = native.read_bytes()
    site = tmp_path / 'midi-site'
    record = export_timeline(analysis, site, include_audio=True)
    assert (site / 'data/deep/midi/basic_pitch/bass/transcription.mid').read_bytes() == original
    assert (site / 'data/deep/midi/basic_pitch/bass/notes.json').is_file()
    assert not any(name.endswith(('request.json', 'backend.log')) for name in record['files'])
    assert native.read_bytes() == original


def test_missing_loop_analysis_is_explicit_not_a_missing_route_or_zero_result(analysis, tmp_path):
    (analysis/'deep/loops/loops.json').unlink()
    site = tmp_path/'site'
    export_timeline(analysis, site, include_audio=True)
    assert verify_snapshot(site)['status'] == 'passed'
    availability = read_json(site/'data/loops-unavailable.json')
    assert availability['status'] == 'not-analysed'
    assert 'loop_count' not in availability


def test_source_mismatch_does_not_leave_a_site(analysis, tmp_path):
    (analysis / 'input/synthetic.wav').write_bytes(b'not-the-source')
    with pytest.raises(ValueError, match='SHA-256'):
        export_timeline(analysis, tmp_path / 'site', include_audio=True)
    assert not (tmp_path / 'site').exists()


@pytest.mark.parametrize('name', ['../secret', '/etc/passwd', 'C:/secret', 'input\\secret',
                                  'input/./secret', '.source/x', 'input//x'])
def test_unsafe_file_paths_are_rejected(analysis, name):
    with pytest.raises(ValueError):
        safe_file(analysis, name)


def test_symlink_is_not_exported(analysis, tmp_path):
    target = tmp_path / 'outside.json'
    write_json(target, {'private': 'never publish'})
    (analysis / 'canonical.json').unlink()
    try:
        (analysis / 'canonical.json').symlink_to(target)
    except OSError:
        pytest.skip('Host denies symlink creation')
    with pytest.raises(ValueError, match='symlink'):
        export_timeline(analysis, tmp_path / 'site', include_audio=True)
    assert not (tmp_path / 'site').exists()


@pytest.mark.parametrize('change', ['extra', 'corrupt', 'missing', 'clock'])
def test_snapshot_tampering_fails(analysis, tmp_path, change):
    output = tmp_path / 'site'
    export_timeline(analysis, output, include_audio=True)
    if change == 'extra':
        (output / 'secrets.txt').write_text('not allowed')
    elif change == 'corrupt':
        (output / 'assets/app.js').write_text('broken')
    elif change == 'missing':
        (output / 'assets/style.css').unlink()
    else:
        snapshot = read_json(output / 'snapshot.json')
        snapshot['duration_seconds'] = 99
        write_json(output / 'snapshot.json', snapshot)
    with pytest.raises(ValueError):
        verify_snapshot(output)


def test_sanitization_keeps_scientific_evidence_and_removes_machine_paths(analysis):
    sanitized = public_value({'evidence': {'score': .8}, 'config': {'x': 2}, 'a': float('nan'),
        'b': float('inf'), 'file': str(analysis / 'beats/consensus.json'), 'local': r'C:\Private\song.wav'}, analysis)
    assert sanitized == {'evidence': {'score': .8}, 'a': None, 'b': None,
                         'file': 'beats/consensus.json', 'local': '[local path omitted]'}


def test_bundle_drift_fails_instead_of_copying_a_broken_viewer():
    with pytest.raises(ValueError, match='Unsupported'):
        adapt_bundle('console.log("not a viewer")')


def test_full_duration_stem_audio_derivatives_preserve_clock(analysis, tmp_path):
    source = analysis / 'input/synthetic.wav'
    stem = analysis / 'stems/synthetic/bass.wav'
    stem.parent.mkdir(parents=True)
    stem.write_bytes(source.read_bytes())
    output = tmp_path / 'site'
    meta = export_timeline(analysis, output, include_audio=True)
    derivative = meta['stem_audio_derivatives'][0]
    assert derivative['encoding'] == 'FLAC PCM_24' and derivative['resampled'] is False
    path = output / derivative['public_file']
    original_info, published_info = sf.info(source), sf.info(path)
    assert published_info.subtype == 'PCM_24'
    assert (published_info.frames, published_info.samplerate, published_info.channels) == (
        original_info.frames, original_info.samplerate, original_info.channels)
    original, _ = sf.read(source)
    published, _ = sf.read(path)
    assert np.max(np.abs(original - published)) <= 2**-23
    assert digest(source) == digest(stem)  # Original float audio untouched.


def test_loop_previews_use_existing_sample_exact_exporter(tmp_path):
    from loop_demo import create_fixture
    from stemlab.analysis.loops import preview_loop
    _, source = create_fixture(tmp_path / 'loop-source')
    meta = export_timeline(source, tmp_path / 'site', include_audio=True)
    loops = read_json(source / 'deep/loops/loops.json')['loops']
    assert len(loops) == meta['loop_count'] == 2
    for loop in loops:
        actual = (tmp_path / 'site/loops' / (loop['id'] + '.wav')).read_bytes()
        expected, _ = preview_loop(source, loop['id'])
        # Float WAV's PEAK chunk can contain a write-time timestamp. Compare
        # the actual sample contract, not unrelated wall-clock header metadata.
        actual_info, expected_info = sf.info(io.BytesIO(actual)), sf.info(io.BytesIO(expected))
        assert (actual_info.format, actual_info.subtype, actual_info.frames,
                actual_info.channels, actual_info.samplerate) == (
                    expected_info.format, expected_info.subtype, expected_info.frames,
                    expected_info.channels, expected_info.samplerate)
        actual_samples, actual_rate = sf.read(io.BytesIO(actual), dtype='float64', always_2d=True)
        expected_samples, expected_rate = sf.read(io.BytesIO(expected), dtype='float64', always_2d=True)
        assert actual_rate == expected_rate
        np.testing.assert_array_equal(actual_samples, expected_samples)


def test_missing_loop_evidence_is_not_claimed_to_have_zero_candidates(analysis, tmp_path):
    (analysis / 'deep/loops/loops.json').unlink()
    meta = export_timeline(analysis, tmp_path / 'site', include_audio=True)
    assert meta['coverage']['status'] != 'complete'
    state = read_json(tmp_path / 'site/data/timeline.json')
    assert all(row['path'] != 'deep/loops/loops.json' for row in state['files'])


def test_cli_exports_existing_analysis(analysis, tmp_path):
    from typer.testing import CliRunner
    from stemlab.cli import app
    result = CliRunner().invoke(app, ['export-timeline', str(analysis), '--output', str(tmp_path / 'site'), '--include-audio'])
    assert result.exit_code == 0, result.output
    assert (tmp_path / 'site/index.html').is_file()


@pytest.mark.parametrize('field,value', [('unresolved_sections', None), ('source_sha256', 'a'*64),
                                        ('loop_count', 9), ('loops', {}), ('schema', 'unsupported')])
def test_malformed_or_wrong_source_loop_report_is_not_published(analysis, tmp_path, field, value):
    path = analysis / 'deep/loops/loops.json'
    report = read_json(path)
    report[field] = value
    write_json(path, report)
    with pytest.raises(ValueError, match='loop report'):
        export_timeline(analysis, tmp_path / 'site', include_audio=True)
    assert not (tmp_path / 'site').exists()


def test_content_revision_invalidates_stale_same_song_analysis(analysis, tmp_path):
    one = export_timeline(analysis, tmp_path / 'first', include_audio=True)
    write_json(analysis / 'beats/consensus.json', {'beats': [.1, .6, 1.1], 'model': 'changed synthetic annotations'})
    two = export_timeline(analysis, tmp_path / 'second', include_audio=True)
    assert one['source_sha256'] == two['source_sha256']
    assert one['asset_revision'] != two['asset_revision']
    html = (tmp_path / 'second/index.html').read_text()
    assert 'assets/app.js?v=' + two['asset_revision'] in html
    assert 'assets/static-timeline.js?v=' + two['asset_revision'] in html


def test_byte_exact_public_evidence_preserves_crlf_and_rejects_private_data(analysis, tmp_path):
    relative = 'beats/consensus.json'
    path = analysis / relative
    raw = b'{"model":"synthetic","beats":[0,0.5,1,1.5]}\r\n'
    path.write_bytes(raw)
    export_timeline(analysis, tmp_path/'pinned', include_audio=True, byte_exact_json={relative: digest(path)})
    assert (tmp_path/'pinned/data'/relative).read_bytes() == raw
    with pytest.raises(ValueError, match='public-safe'):
        export_timeline(analysis, tmp_path/'private', include_audio=True,
                        byte_exact_json={'analysis.json': digest(analysis/'analysis.json')})
    with pytest.raises(ValueError, match='hash'):
        export_timeline(analysis, tmp_path/'tampered', include_audio=True, byte_exact_json={relative: 'a'*64})


def test_artwork_and_audition_reference_are_local_hashed_and_source_bound(analysis, tmp_path):
    artwork = WEB_ROOT / 'arcadians-cover.jpg'
    audition = {'source_sha256': read_json(analysis/'analysis.json')['source']['sha256'],
                'items': [{'start': 0, 'end': 1, 'label': 'Audition'}]}
    result = export_timeline(analysis, tmp_path/'audition', include_audio=True, artwork=artwork, audition=audition)
    assert result['files']['media/cover.jpg']['sha256'] == digest(artwork)
    assert read_json(tmp_path/'audition/data/lyric-audition.json') == audition
    payload = json.loads(re.search(r'id="stemlab-static-data">(.*?)</script>',
                                  (tmp_path/'audition/index.html').read_text()).group(1))
    assert payload['artwork'] == 'media/cover.jpg' and payload['lyric_items'] == audition['items']
    with pytest.raises(ValueError, match='exact source'):
        export_timeline(analysis, tmp_path/'wrong', include_audio=True, audition={**audition, 'source_sha256': 'a'*64})
    with pytest.raises(ValueError, match='finite'):
        export_timeline(analysis, tmp_path/'bad', include_audio=True,
                        audition={**audition, 'items': [{'start': 0, 'end': float('nan'), 'label': 'Bad'}]})
