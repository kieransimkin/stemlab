"""Publication selection, evidence and live-site checks: no network in unit tests."""
from __future__ import annotations

import copy
import importlib.util
import json
from pathlib import Path
import sys

import pytest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
spec = importlib.util.spec_from_file_location('arcadians_pages_publish', ROOT / 'scripts/publish_arcadians_pages.py')
pages = importlib.util.module_from_spec(spec)
spec.loader.exec_module(pages)
SHA = '3a6bec84de1a8f58385ae221ff605e917ad04a98'
RUN_ID = 38514594498


def valid_run():
    return dict(id=RUN_ID, repository={'full_name': pages.REPOSITORY},
                head_repository={'full_name': pages.REPOSITORY}, head_branch='main',
                event='workflow_dispatch', path=pages.WORKFLOW, status='completed',
                conclusion='success', head_sha=SHA)


def valid_qa():
    return dict(format='stemlab.arcadians-audio-browser-check', status='passed',
                mode='http-project-pages-prefix', hosted_file_loading_verified=True,
                bundled_audio=True, play_pause=True, seek_both_directions=True,
                restart=True, audio_clock=True, native_sample=True,
                arbitrary_axis_projection=True, review_export_import=True,
                non_looping=True, autoplay=False, candidates=48, sample_vectors_checked=144,
                audio_source='Arcadians', audio_sha256=pages.ARCADIANS_SHA256,
                external_requests=[], page_errors=[],
                http_ranges={'verified': True, 'partial_requests': 3, 'audio_bytes': 11},
                decoded={'channels': 2, 'duration': 273.605, 'peak': .9, 'rms': .2})


PROVENANCE = {'stemlab_commit': SHA, 'source': {'duration_seconds': 273.605}}


@pytest.mark.parametrize('key,value', [
    ('event', 'pull_request'), ('event', 'push'), ('head_branch', 'unsafe'),
    ('repository', {'full_name': 'someone/stemlab'}),
    ('head_repository', {'full_name': 'someone/stemlab'}),
    ('status', 'in_progress'), ('conclusion', 'failure'), ('conclusion', 'cancelled'),
    ('path', '.github/workflows/other.yml'), ('head_sha', 'bad'),
])
def test_reject_untrusted_or_unsuccessful_run(key, value):
    run = valid_run()
    run[key] = value
    with pytest.raises(ValueError):
        pages.validate_run(run)


def test_accept_exact_successful_main_demo():
    assert pages.validate_run(valid_run()) == SHA


@pytest.mark.parametrize('value', ['0', '-1', '12;echo bad', '\n123', '1e5', 'abc', '９９', '9'*19])
def test_reject_bad_run_id(value):
    with pytest.raises(ValueError):
        pages.run_number(value)


def fake_api(path):
    if path.startswith('actions/workflows/'):
        return {'workflow_runs': [valid_run()]}
    if path == f'actions/runs/{RUN_ID}':
        return valid_run()
    name = next(name for name in pages.ARTIFACTS if name in path)
    artifact = dict(id=123 if name == pages.ARTIFACTS[0] else 124, name=name,
                    expired=False, size_in_bytes=100,
                    workflow_run={'id': RUN_ID, 'head_sha': SHA})
    return {'total_count': 1, 'artifacts': [artifact]}


@pytest.mark.parametrize('requested', ['', str(RUN_ID)])
def test_select_latest_or_explicit_run(monkeypatch, requested):
    monkeypatch.setattr(pages, 'api_json', fake_api)
    assert pages.select_run(requested) == dict(run_id=RUN_ID, source_sha=SHA,
                                              site_artifact_id=123, qa_artifact_id=124)


@pytest.mark.parametrize('mutation', ['expired', 'duplicate', 'wrong_commit', 'too_big', 'missing'])
def test_reject_bad_artifacts(monkeypatch, mutation):
    def changed(path):
        result = copy.deepcopy(fake_api(path))
        if 'artifacts' in result:
            if mutation == 'expired':
                result['artifacts'][0]['expired'] = True
            elif mutation == 'duplicate':
                result['total_count'] = 2
                result['artifacts'] *= 2
            elif mutation == 'wrong_commit':
                result['artifacts'][0]['workflow_run']['head_sha'] = 'b'*40
            elif mutation == 'too_big':
                result['artifacts'][0]['size_in_bytes'] = 600 * 1024 * 1024
            else:
                result['artifacts'] = []
                result['total_count'] = 0
        return result
    monkeypatch.setattr(pages, 'api_json', changed)
    with pytest.raises(ValueError):
        pages.select_run(str(RUN_ID))


@pytest.mark.parametrize('key,value', [
    ('status', 'failed'), ('mode', 'in-memory'), ('hosted_file_loading_verified', False),
    ('audio_clock', False), ('seek_both_directions', False), ('autoplay', True),
    ('candidates', 47), ('sample_vectors_checked', 143), ('audio_sha256', 'a'*64),
    ('audio_source', 'Synthetic'), ('page_errors', ['error']), ('external_requests', ['https://cdn.example']),
    ('bad_responses', [[404, '/audio.mp3']]), ('play_pause', 'true'),
    ('http_ranges', {'verified': False, 'partial_requests': 3}),
    ('decoded', {'channels': 2, 'duration': 273.605, 'peak': 0, 'rms': 0}),
])
def test_qa_failure_is_not_waived(key, value):
    qa = valid_qa()
    qa[key] = value
    with pytest.raises(ValueError):
        pages.verify_qa(qa, PROVENANCE)


def test_full_http_qa_is_accepted():
    pages.verify_qa(valid_qa(), PROVENANCE)


def test_verify_artifacts_reuses_site_verifier_and_checks_provenance(tmp_path, monkeypatch):
    (tmp_path / 'arcadians').mkdir()
    (tmp_path / 'arcadians/audio.mp3').write_bytes(b'publicaudio')
    provenance_file = tmp_path / 'arcadians/release-demo.json'
    provenance_file.write_text(json.dumps(PROVENANCE))
    qa_file = tmp_path / 'qa.json'
    qa_file.write_text(json.dumps(valid_qa()))
    calls = []
    monkeypatch.setattr(pages, 'verify_site', lambda path: calls.append(path) or {'candidates': 48})
    timeline_calls = []
    monkeypatch.setattr(pages, 'verify_timeline_qa', lambda *args: timeline_calls.append(args))
    pair_calls = []
    monkeypatch.setattr(pages, 'verify_pair_artifacts', lambda *args: pair_calls.append(args))
    result = pages.verify_artifacts(tmp_path, qa_file, SHA)
    assert pair_calls == [(tmp_path, tmp_path, SHA)]
    assert timeline_calls == [(tmp_path / 'timeline/arcadians', tmp_path / 'arcadians-timeline-browser.json', SHA)]
    assert calls == [tmp_path] and result['browser_qa'] == 'passed'
    with pytest.raises(ValueError, match='provenance'):
        pages.verify_artifacts(tmp_path, qa_file, 'b'*40)
    qa = valid_qa()
    qa['http_ranges']['audio_bytes'] = 900
    qa_file.write_text(json.dumps(qa))
    with pytest.raises(ValueError, match='size'):
        pages.verify_artifacts(tmp_path, qa_file, SHA)


def live_fixture(tmp_path, monkeypatch, failure=None):
    (tmp_path / 'arcadians').mkdir()
    (tmp_path / 'index.html').write_bytes(b'landing')
    (tmp_path / 'arcadians/index.html').write_bytes(b'visualizer')
    (tmp_path / 'arcadians/audio.mp3').write_bytes(bytes(range(64)))
    requests = []
    def fake(url, *, headers=None, limit=None):
        requests.append(url)
        if failure == '404':
            raise OSError('404 Not Found')
        if url.endswith('release-demo.json'):
            return 200, {}, json.dumps({'stemlab_commit': 'b'*40 if failure == 'stale' else SHA}).encode()
        if url.endswith('audio.mp3'):
            assert headers['Range'] == 'bytes=0-31'
            return (200 if failure == 'range' else 206), {'Content-Range': 'bytes 0-31/64'}, bytes(range(32))
        return 200, {}, b'wrong' if failure == 'html' else (b'visualizer' if url.endswith('arcadians/') else b'landing')
    monkeypatch.setattr(pages, 'public_request', fake)
    return requests


def test_verify_live_checks_real_site_not_an_artifact(tmp_path, monkeypatch):
    requests = live_fixture(tmp_path, monkeypatch)
    result = pages.verify_live('https://example.github.io/stemlab/', tmp_path, SHA, attempts=1)
    assert result['status'] == 'passed'
    assert result['public_audio_range_verified'] is True
    assert result['live_browser_playback_tested'] is False
    assert requests == [
        'https://example.github.io/stemlab/arcadians/release-demo.json',
        'https://example.github.io/stemlab/', 'https://example.github.io/stemlab/arcadians/',
        'https://example.github.io/stemlab/arcadians/audio.mp3',
    ]


@pytest.mark.parametrize('failure', ['404', 'stale', 'range', 'html'])
def test_missing_stale_or_broken_public_site_fails(tmp_path, monkeypatch, failure):
    requests = live_fixture(tmp_path, monkeypatch, failure)
    with pytest.raises(RuntimeError, match='live URL did not verify'):
        pages.verify_live('https://example.github.io/stemlab/', tmp_path, SHA, attempts=2, delay=0)
    assert len([url for url in requests if url.endswith('release-demo.json')]) == 2


def test_workflow_publishes_artifacts_and_preserves_trust_boundary():
    yaml = pytest.importorskip('yaml')
    workflow = yaml.load((ROOT / '.github/workflows/arcadians-pages.yml').read_text(), Loader=yaml.BaseLoader)
    assert set(workflow['on']) == {'workflow_dispatch', 'workflow_run'}
    assert workflow['on']['workflow_run']['workflows'] == ['Arcadians release demo']
    job = workflow['jobs']['publish']
    assert job['concurrency']['group'] == 'stemlab-pages'
    assert job['environment']['name'] == 'github-pages'
    assert job['permissions'] == {'contents': 'read', 'actions': 'read', 'pages': 'write', 'id-token': 'write'}
    condition = job['if']
    assert "github.ref == 'refs/heads/main'" in condition
    assert "workflow_run.event == 'workflow_dispatch'" in condition
    assert "workflow_run.head_repository.full_name == 'kieransimkin/stemlab'" in condition
    steps = job['steps']
    assert steps[0]['with']['ref'] == '${{ github.sha }}'
    assert steps[0]['with']['persist-credentials'] == 'false'
    downloads = [step for step in steps if step.get('uses') == 'actions/download-artifact@v5']
    assert len(downloads) == 2 and downloads[0]['with']['path'] != downloads[1]['with']['path']
    assert all(step['with']['run-id'] == '${{ steps.source.outputs.run_id }}' for step in downloads)
    uploads = [step for step in steps if step.get('uses') == 'actions/upload-pages-artifact@v4']
    assert len(uploads) == 1 and uploads[0]['with']['path'] == 'public-site'
    assert steps[-1]['run'].startswith('python scripts/publish_arcadians_pages.py live')
    assert '--in-memory' not in str(workflow)
    release = yaml.load((ROOT / '.github/workflows/release.yml').read_text(), Loader=yaml.BaseLoader)
    assert release['jobs']['arcadians-pages']['concurrency']['group'] == job['concurrency']['group']
    assert "refs/tags/v" in release['jobs']['arcadians-pages']['if']
