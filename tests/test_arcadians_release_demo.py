"""Publication boundaries and real MP3/shared-harness integration (synthetic media)."""
from __future__ import annotations

import importlib.util
import os
from pathlib import Path
import re
import shutil
import sys
import zipfile

import numpy as np
import pytest
import soundfile as sf

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('arcadians_release_builder', ROOT / 'scripts/build_arcadians_demo.py')
builder = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = builder
spec.loader.exec_module(builder)


def require_recordings():
    try:
        import dancerudiments_authoring.harness  # noqa: F401
    except ImportError:
        if os.environ.get('STEMLAB_REQUIRE_RECORDINGS') == '1':
            raise
        pytest.skip('Companion recording/harness update not installed')


@pytest.fixture(scope='module')
def built(tmp_path_factory):
    require_recordings()
    root = tmp_path_factory.mktemp('arcadians-release')
    audio = root / 'synthetic.mp3'
    sr = 16000
    t = np.arange(sr * 4) / sr
    samples = (.25 * np.sin(2 * np.pi * 60 * t) * np.exp(-np.mod(t, .4) * 8)
               + .12 * np.sin(2 * np.pi * 3400 * t) * np.exp(-np.mod(t + .13, .6) * 19)
               + .06 * np.sin(2 * np.pi * 700 * t))
    if 'MP3' not in sf.available_formats():
        if os.environ.get('STEMLAB_REQUIRE_RECORDINGS') == '1':
            pytest.fail('Required CI fixture needs MP3 support in libsndfile')
        pytest.skip('This libsndfile does not encode synthetic MP3 test fixtures')
    sf.write(audio, np.column_stack((samples, samples * .8)), sr, format='MP3')
    site = root / 'site'
    checksum = builder.digest(audio)
    provenance = builder.build_site(audio, site, source_commit='a' * 40,
                                    companion_commit='b' * 40, release_tag='test-preview',
                                    companion_license='Synthetic test licence marker\n',
                                    expected_sha256=checksum, title='Synthetic test audio',
                                    progress=lambda _: None)
    return root, site, audio, checksum, provenance


def test_locked_release_track_identity():
    assert builder.ARCADIANS_SHA256 == '5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de'
    assert builder.ARCADIANS_BPM == 145
    pin = (ROOT / '.github/dancerudiments-recording-ref').read_text().strip()
    assert re.fullmatch(r'[0-9a-f]{40}', pin)


@pytest.mark.parametrize('value', ['main', '', 'a' * 39, 'A' * 40, 'a' * 41, 'v0.2.4'])
def test_no_moving_or_invalid_revision(value):
    with pytest.raises(ValueError, match='commit SHA'):
        builder.validate_revision(value)


def test_audio_included_unchanged_and_no_autoplay(built):
    _, site, source, checksum, _ = built
    payload = builder.read_payload(site / 'arcadians/index.html')
    assert builder.digest(site / 'arcadians/audio.mp3') == checksum
    assert (site / 'arcadians/audio.mp3').read_bytes() == source.read_bytes()
    assert payload['audio']['relative_path'] == 'audio.mp3'
    text = (site / 'arcadians/index.html').read_text()
    assert '<audio id="audio" controls preload="metadata"></audio>' in text
    assert 'The original track is included' in text
    assert 'Synthetic test audio' in text
    assert 'url=arcadians/index.html' in (site / 'index.html').read_text()
    assert 'window.audition' in text
    assert payload['recording_mode']


def test_full_duration_confirmed_bpm_but_unverified_phase(built):
    _, site, _, _, provenance = built
    payload = builder.read_payload(site / 'arcadians/index.html')
    assert provenance['clock']['bpm'] == 145
    assert provenance['clock']['bpm_status'] == 'confirmed'
    assert provenance['clock']['phase_status'] == 'unverified'
    assert payload['audio']['range_start'] == 0
    assert payload['audio']['range_end'] == provenance['source']['duration_seconds']
    assert payload['pack']['sample_dtype'] == 'float64'
    assert payload['pack']['pips_per_beat'] == 64
    assert len(payload['pack']['patterns']) == 48
    assert {len(p['dimensions']) for p in payload['pack']['patterns']} == {2, 3, 6}
    assert 'no separated stems' in provenance['source_scope']


def test_public_site_and_deterministic_archive(built, tmp_path):
    _, site, _, checksum, _ = built
    verified = builder.verify_site(site, expected_sha256=checksum)
    assert verified['candidates'] == 48 and verified['audio_included']
    for name in ('first', 'second'):
        builder.package_site(site, tmp_path / name, expected_sha256=checksum)
    first = tmp_path / 'first/StemLab-Arcadians-visualizer.zip'
    assert builder.digest(first) == builder.digest(tmp_path / 'second/StemLab-Arcadians-visualizer.zip')
    with zipfile.ZipFile(first) as archive:
        names = archive.namelist()
        assert 'arcadians/audio.mp3' in names and '.nojekyll' in names
        assert 'arcadians/index.html' in names
        assert sum(n.startswith('arcadians/recordings/') for n in names) == 48
        assert 'asset-manifest.json' not in '\n'.join(names)
        assert 'analysis.json' not in '\n'.join(names)
        assert 'browser-test-review.json' not in '\n'.join(names)


def test_wrong_audio_hash_fails_before_publication(built, tmp_path):
    _, _, audio, _, _ = built
    with pytest.raises(ValueError, match='checksum mismatch'):
        builder.build_site(audio, tmp_path / 'bad', source_commit='a' * 40,
                           companion_commit='b' * 40, release_tag='test', companion_license='test')
    assert not (tmp_path / 'bad').exists()


@pytest.mark.parametrize('filename', ['.env', 'asset-manifest.json', 'browser-test-review.json'])
def test_private_or_test_file_not_published(built, tmp_path, filename):
    _, site, _, checksum, _ = built
    copy = tmp_path / 'site'
    shutil.copytree(site, copy)
    (copy / 'arcadians' / filename).write_text('must not publish')
    with pytest.raises(ValueError, match='Unapproved public file'):
        builder.package_site(copy, tmp_path / 'bad-assets', expected_sha256=checksum)
    assert not (tmp_path / 'bad-assets').exists()


def test_symlink_rejected(tmp_path):
    target = tmp_path / 'private'
    target.write_text('private data')
    site = tmp_path / 'site'
    site.mkdir()
    try:
        (site / 'index.html').symlink_to(target)
    except OSError:
        pytest.skip('Symlink creation unavailable on this platform')
    with pytest.raises(ValueError, match='symlink'):
        builder.public_files(site)


def test_missing_audio_rejected(built, tmp_path):
    _, site, _, checksum, _ = built
    copy = tmp_path / 'site'
    shutil.copytree(site, copy)
    (copy / 'arcadians/audio.mp3').unlink()
    with pytest.raises(FileNotFoundError):
        builder.verify_site(copy, expected_sha256=checksum)


def test_mutated_audio_or_page_rejected(built, tmp_path):
    _, site, _, checksum, _ = built
    copy = tmp_path / 'site'
    shutil.copytree(site, copy)
    with (copy / 'arcadians/audio.mp3').open('ab') as handle:
        handle.write(b'wrong')
    with pytest.raises(ValueError, match='audio identity'):
        builder.verify_site(copy, expected_sha256=checksum)
    shutil.copyfile(site / 'arcadians/audio.mp3', copy / 'arcadians/audio.mp3')
    with (copy / 'arcadians/index.html').open('a') as handle:
        handle.write('changed')
    with pytest.raises(ValueError, match='checksum mismatch'):
        builder.verify_site(copy, expected_sha256=checksum)


def test_release_gating_and_pages_boundary():
    release = (ROOT / '.github/workflows/release.yml').read_text()
    demo = (ROOT / '.github/workflows/arcadians-demo.yml').read_text()
    recordings = (ROOT / '.github/workflows/recordings.yml').read_text()
    assert 'needs: [codex-package, arcadians-demo]' in release
    assert 'cp arcadians-release/* dist-release/' in release
    assert 'needs: [github-release, arcadians-demo]' in release
    assert "vars.STEMLAB_PAGES_ENABLED == 'true'" in release
    assert 'path: public-site' in release and 'pages: write' in release and 'id-token: write' in release
    assert 'build_arcadians_demo.py package' in demo
    assert 'check_arcadians_audio.py' in demo
    assert 'test_recording.py' in demo
    assert 'include-hidden-files: true' in demo
    assert '--in-memory' not in demo
    assert 'steps.companion.outputs.ref' in recordings
    assert 'steps.companion.outputs.ref' in demo
    assert 'pages: write' not in demo  # PR/called build never publishes.


def test_cli_does_not_allow_substitute_checksum():
    import subprocess
    result = subprocess.run([sys.executable, str(ROOT / 'scripts/build_arcadians_demo.py'), 'build', '--help'],
                            text=True, capture_output=True, check=True)
    assert '--expected-sha256' not in result.stdout
