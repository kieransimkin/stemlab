"""Display grouping QA and reproducible viewer-build guards; no model downloads."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from timeline_display_checks import expected_display_layout
from check_viewer_build import check
import configure_viewer_build as configure


def test_layout_combines_master_and_stems_but_retains_beats():
    files = [{'path': p} for p in (
        'canonical.json', 'input/original.mp3', 'spectrograms/master.npz',
        'spectrograms/master.png', 'stems/model/drums.wav',
        'spectrograms/model/drums.npz', 'spectrograms/model/drums.png',
        'beats/beatnet.json', 'beats/beatnet__model-drums.json')]
    result = expected_display_layout({'files': files, 'canonical': {'bpm': 145}}, {}, {})
    assert result['lane_count'] == 5  # master, drums, two detectors, canonical BPM
    assert result['paired_count'] == 2
    assert result['audio_count'] == 2


def test_layout_maps_spectrogram_provenance_not_basenames():
    state = {'files': [{'path': p} for p in ('stems/a/drums.wav', 'stems/b/drums.wav',
                                            'spectrograms/unique.npz')]}
    analysis = {'spectrograms': [{'audio': 'stems/a/drums.wav', 'data': 'spectrograms/unique.npz'}]}
    result = expected_display_layout(state, {}, analysis)
    assert result['audio_count'] == 3
    assert result['paired_count'] == 1


def test_unaligned_png_not_silently_overlaid_or_lost():
    result = expected_display_layout({'files': [{'path': 'spectrograms/master.png'}]}, {}, {})
    assert result['lane_count'] == 2
    assert result['paired_count'] == 0


def make_guard_files(root):
    (root / 'vendor').mkdir()
    (root / '.github').mkdir()
    (root / 'src/stemlab/web').mkdir(parents=True)
    archive = 'vendor/react-timeline-sequence-test.tgz'
    (root / archive).write_bytes(b'TEST archive bytes; no npm runtime claim')
    info = {'schema': 'stemlab.viewer-dependencies.v1', 'timeline_commit': 'b' * 40,
            'timeline_archive': archive, 'timeline_archive_sha256': hashlib.sha256((root / archive).read_bytes()).hexdigest(),
            'dancerudiments_commit': 'c' * 40, 'timeline_display_api': 1, 'harness_display_api': 1}
    (root / 'vendor/viewer-dependencies.json').write_text(json.dumps(info))
    (root / '.github/dancerudiments-recording-ref').write_text(info['dancerudiments_commit'])
    (root / 'package.json').write_text(json.dumps({'dependencies': {'react-timeline-sequence': 'file:' + archive}}))
    (root / 'src/stemlab/web/app.js').write_text('rts-display-controls rts-audio-layers channel height')
    return info


def test_guard_accepts_consistent_dependency_record(tmp_path):
    make_guard_files(tmp_path)
    check(tmp_path)


@pytest.mark.parametrize('damage', ['bytes', 'path', 'pin', 'dependency', 'bundle', 'revision', 'schema'])
def test_guard_rejects_stale_or_unlocked_build(tmp_path, damage):
    info = make_guard_files(tmp_path)
    if damage == 'bytes':
        (tmp_path / info['timeline_archive']).write_bytes(b'changed')
    elif damage == 'path':
        info['timeline_archive'] = '../elsewhere.tgz'
    elif damage == 'pin':
        (tmp_path / '.github/dancerudiments-recording-ref').write_text('d' * 40)
    elif damage == 'dependency':
        (tmp_path / 'package.json').write_text(json.dumps({'dependencies': {'react-timeline-sequence': '0.2.0'}}))
    elif damage == 'bundle':
        (tmp_path / 'src/stemlab/web/app.js').write_text('old viewer')
    elif damage == 'revision':
        info['timeline_commit'] = 'main'
    else:
        info['schema'] = 'unknown'
    (tmp_path / 'vendor/viewer-dependencies.json').write_text(json.dumps(info))
    with pytest.raises(ValueError):
        check(tmp_path)


@pytest.mark.parametrize('dirty', [True, False])
def test_companion_revision_requires_clean_published_api(tmp_path, monkeypatch, dirty):
    (tmp_path / 'display.ts').write_text('DISPLAY_API_VERSION = 1')
    calls = []
    def run(args, cwd, *, capture=False):
        calls.append(args)
        if args[1] == 'remote':
            return 'https://github.com/kieransimkin/react-timeline-sequence.git'
        if args[1] == 'status':
            return ' M src/display.ts' if dirty else ''
        if args[1] == 'rev-parse':
            return 'a' * 40
        return ''
    monkeypatch.setattr(configure, 'run', run)
    if dirty:
        with pytest.raises(ValueError, match='not clean'):
            configure.source_revision(tmp_path, 'kieransimkin/react-timeline-sequence', 'display.ts', 'DISPLAY_API_VERSION = 1')
        assert not any(c[1] == 'fetch' for c in calls)
    else:
        assert configure.source_revision(tmp_path, 'kieransimkin/react-timeline-sequence', 'display.ts', 'DISPLAY_API_VERSION = 1') == 'a' * 40
        assert ['git', 'fetch', '--no-tags', 'origin', 'a' * 40] in calls
