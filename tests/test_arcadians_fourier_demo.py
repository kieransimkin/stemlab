"""Real native exports on synthetic media, with publication and tamper gates."""
from __future__ import annotations

import copy
import gzip
from pathlib import Path
import shutil
import sys

import numpy as np
import pytest
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'scripts'))
import build_arcadians_fourier_demo as builder
import build_arcadians_demo as master
import publish_arcadians_pages as publisher
from recording_downloads import compress_downloads, read_recording
from stemlab.static_timeline import read_json, write_json, digest
from test_arcadians_release_demo import require_recordings
from test_arcadians_pages_publish import valid_qa

SHA = 'a'*40


@pytest.fixture(scope='module')
def gallery(tmp_path_factory):
    require_recordings()
    root = tmp_path_factory.mktemp('fourier-gallery')
    rate = 16000
    t = np.arange(rate*2)/rate
    x = (.2+.15*np.sin(3*np.pi*t))*np.sin(2*np.pi*(70*t+1800*t*t))
    audio = root/'synthetic.mp3'
    sf.write(audio, np.column_stack((x, -x)), rate, format='MP3')
    sha = digest(audio)
    site = root/'site'
    provenance = builder.build_fourier_demo(audio, site, source_commit=SHA, companion_commit='b'*40,
        companion_license='Synthetic test licence', expected_sha=sha, progress=lambda _: None)
    return site/builder.GALLERY, audio, sha, provenance


def test_all_six_resolutions_span_full_original_on_native_clock(gallery):
    path, audio, sha, provenance = gallery
    assert provenance['dimensions'] == [4, 8, 16, 32, 64, 128]
    assert builder.verify_fourier_gallery(path, expected_sha=sha, source_commit=SHA) == provenance
    assert digest(path/'audio.mp3') == digest(audio)
    assert provenance['source']['duration_seconds'] == sf.info(audio).duration
    assert provenance['clock']['phase_status'] == 'unverified'
    from dancerudiments_authoring.recording import Recording
    for item in read_json(path/'report.json')['candidates']:
        doc = read_recording(path/item['file'])
        recording = Recording.from_dict(doc)
        native = recording.to_native()
        for index in (0, len(recording.samples)//2, len(recording.samples)-1):
            assert list(native.sample(index)) == list(recording.samples[index])
        assert len(recording.dimensions) == item['bands']
        assert doc['provenance']['normalization'] == 'global'
        assert item['harness']['sample_bytes'] <= len(recording.samples)*item['bands']*8
    overview = (path/'index.html').read_text(encoding='utf-8')
    assert all(f'value="{n}"' in overview for n in builder.CHANNELS)
    assert '<iframe' in overview and 'bands-32.html' in overview and 'channels.addEventListener' in overview


@pytest.mark.parametrize('damage', ['audio', 'view', 'missing', 'metadata', 'samples'])
def test_bad_source_view_or_native_data_cannot_publish(gallery, tmp_path, damage):
    path, _, sha, _ = gallery
    target = tmp_path/'gallery'
    shutil.copytree(path, target)
    if damage == 'audio':
        (target/'audio.mp3').write_bytes(b'wrong')
    elif damage == 'view':
        (target/'bands-128.html').write_text('wrong')
    elif damage == 'missing':
        (target/'recordings/candidate_0128.json.gz').unlink()
    else:
        file = target/'recordings/candidate_0128.json.gz'
        doc = read_recording(file)
        if damage == 'metadata':
            doc['provenance']['axes'][0]['fourier']['index'] = 3
        else:
            doc['samples'][1][127] = .123456789
        import json
        with gzip.open(file, 'wt', encoding='utf-8') as stream:
            json.dump(doc, stream)
    with pytest.raises((ValueError, OSError)):
        builder.verify_fourier_gallery(target, expected_sha=sha, source_commit=SHA)


def test_source_mismatch_never_creates_public_gallery(gallery, tmp_path):
    _, audio, _, _ = gallery
    with pytest.raises(ValueError, match='exact original'):
        builder.build_fourier_demo(audio, tmp_path/'site', source_commit=SHA, companion_commit='b'*40,
                                   companion_license='Test')
    assert not (tmp_path/'site').exists()


def test_publisher_requires_six_matching_browser_receipts(gallery, tmp_path, monkeypatch):
    path, _, sha, provenance = gallery
    monkeypatch.setattr(publisher, 'verify_fourier_gallery', lambda *args, **kwargs: provenance)
    monkeypatch.setattr(publisher, 'ARCADIANS_SHA256', sha)
    for item in read_json(path/'report.json')['candidates']:
        qa = valid_qa()
        qa.update(gallery=builder.GALLERY, channels=item['bands'], view=item['view'],
            html_sha256=item['html_sha256'], audio_sha256=sha, candidates=1, sample_vectors_checked=3,
            view_modes=['xy', 'bars'], all_dimension_bars=True, bar_channels_checked=item['bands'], resolution_selector=True)
        qa['decoded']['duration'] = provenance['source']['duration_seconds']
        qa['http_ranges']['audio_bytes'] = (path/'audio.mp3').stat().st_size
        write_json(tmp_path/f"arcadians-fourier-{item['bands']}-audio-browser.json", qa)
    publisher.verify_fourier_artifacts(path.parent, tmp_path, SHA)
    file = tmp_path/'arcadians-fourier-128-audio-browser.json'
    qa = read_json(file)
    qa['channels'] = 32
    write_json(file, qa)
    with pytest.raises(ValueError, match='different resolution'):
        publisher.verify_fourier_artifacts(path.parent, tmp_path, SHA)


def test_live_checks_overview_all_views_and_seekable_original(gallery, monkeypatch):
    path, _, _, _ = gallery
    calls = []
    def request(url, *, headers=None, limit=None):
        relative = url.split('/stemlab/arcadians-fourier/', 1)[1]
        calls.append(relative)
        data = (path/relative).read_bytes()
        if headers:
            return 206, {'Content-Range': f'bytes 0-31/{len(data)}'}, data[:32]
        return 200, {}, data
    monkeypatch.setattr(publisher, 'public_request', request)
    publisher.verify_live_fourier('https://example.github.io/stemlab/', path, SHA)
    assert calls == ['index.html', 'release-demo.json', 'report.json', 'audio.mp3'] + [f'bands-{n}.html' for n in builder.CHANNELS]


def test_download_compression_preserves_all_native_values_and_renderer(tmp_path):
    require_recordings()
    from stemlab.analysis.rudiment_batch import export_single
    from stemlab.analysis.rudiment_recordings import fourier_axes
    rate = 8000
    audio = tmp_path/'tone.wav'
    sf.write(audio, np.sin(np.arange(rate)*.3), rate, subtype='FLOAT')
    output = tmp_path/'output'
    report = export_single(audio, output, fourier_axes(audio, 4), timing=dict(bpm=120))
    view = output/'index.html'
    old = master.read_payload(view)
    documents = {p['name']: read_recording(output/p['recording_path']) for p in old['pack']['patterns']}
    harness = copy.deepcopy(report['harness'])
    compress_downloads(view, harness)
    new = master.read_payload(view)
    assert new['recording_data'] == old['recording_data'] and new['wasm'] == old['wasm']
    for pattern in new['pack']['patterns']:
        assert pattern['recording_path'].endswith('.json.gz')
        assert read_recording(output/pattern['recording_path']) == documents[pattern['name']]
    assert harness['html_sha256'] == digest(view)


def test_workflow_gates_every_resolution_before_combined_publication():
    import yaml
    root = Path(__file__).resolve().parents[1]
    workflow = yaml.load((root/'.github/workflows/arcadians-demo.yml').read_text(), Loader=yaml.BaseLoader)
    steps = str(workflow['jobs']['build']['steps'])
    assert 'build_arcadians_fourier_demo.py' in steps and 'for BANDS in 4 8 16 32 64 128' in steps
    assert '--gallery arcadians-fourier --channels' in steps
    assert steps.index('build_arcadians_fourier_demo.py') < steps.index('publish_arcadians_pages.py verify')
    assert 'arcadians-fourier-*-audio-browser.json' in steps
    recording = (root/'.github/workflows/recordings.yml').read_text()
    assert 'test_arcadians_fourier_demo.py' in recording
