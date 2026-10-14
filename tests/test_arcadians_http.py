"""HTTP media transport regressions; these run without Playwright or DanceRudiments."""
from __future__ import annotations

from functools import partial
from http.client import HTTPConnection
from http.server import ThreadingHTTPServer
import importlib.util
import json
from pathlib import Path
import socket
import threading
import time
from types import SimpleNamespace

import pytest

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location('arcadians_http', ROOT / 'scripts/arcadians_http.py')
http = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(http)


@pytest.fixture(scope='module')
def server(tmp_path_factory):
    site = tmp_path_factory.mktemp('arcadians-http')
    gallery = site / 'arcadians'
    gallery.mkdir()
    data = bytes(range(256)) * 4096
    (gallery / 'audio.mp3').write_bytes(data)
    (gallery / 'empty.mp3').touch()
    (gallery / 'index.html').write_text('<h1>Local QA fixture</h1>')
    (site / 'index.html').write_text('root')
    failures = []
    service = ThreadingHTTPServer(('127.0.0.1', 0), partial(http.ProjectHandler, directory=str(site)))
    service.handle_error = lambda *_: failures.append('unexpected request exception')
    thread = threading.Thread(target=service.serve_forever, daemon=True)
    thread.start()
    yield SimpleNamespace(service=service, site=site, data=data, failures=failures)
    service.shutdown()
    service.server_close()
    thread.join(timeout=5)


def request(server, path='/stemlab/arcadians/audio.mp3', *, method='GET', headers=None):
    connection = HTTPConnection('127.0.0.1', server.service.server_port, timeout=5)
    try:
        connection.request(method, path, headers=headers or {})
        response = connection.getresponse()
        return response.status, dict(response.getheaders()), response.read()
    finally:
        connection.close()


def test_full_file_and_head(server):
    for method in ('GET', 'HEAD'):
        status, headers, body = request(server, method=method)
        assert status == 200
        assert headers['Accept-Ranges'] == 'bytes'
        assert headers['Content-Type'].startswith('audio/')
        assert int(headers['Content-Length']) == len(server.data)
        assert body == (server.data if method == 'GET' else b'')


@pytest.mark.parametrize('header,start,end', [
    ('bytes=0-31', 0, 31),
    ('bytes=1000-1031', 1000, 1031),
    ('bytes=1048550-', 1048550, 1048575),
    ('bytes=-32', 1048544, 1048575),
    ('bytes=1048570-9999999', 1048570, 1048575),
    ('bytes=-9999999', 0, 1048575),
])
def test_precise_partial_media_bytes(server, header, start, end):
    status, headers, body = request(server, headers={'Range': header})
    assert status == 206
    assert headers['Content-Range'] == f'bytes {start}-{end}/{len(server.data)}'
    assert int(headers['Content-Length']) == end-start+1
    assert headers['Accept-Ranges'] == 'bytes'
    assert body == server.data[start:end+1]


@pytest.mark.parametrize('header', ['bytes=1048576-', 'bytes=8-7', 'bytes=-0'])
def test_unsatisfiable_ranges(server, header):
    status, headers, body = request(server, headers={'Range': header})
    assert status == 416
    assert headers['Content-Range'] == f'bytes */{len(server.data)}'
    assert headers['Content-Length'] == '0' and body == b''


@pytest.mark.parametrize('header', ['bytes=0-1,5-6', 'items=1-2', 'bytes=hello', 'bytes=-'])
def test_unsupported_or_malformed_ranges_fall_back_to_full_response(server, header):
    status, headers, body = request(server, headers={'Range': header})
    assert status == 200 and body == server.data
    assert 'Content-Range' not in headers


def test_head_ignores_range_but_keeps_prefix(server):
    status, headers, body = request(server, method='HEAD', headers={'Range': 'bytes=0-31'})
    assert status == 200 and not body
    assert int(headers['Content-Length']) == len(server.data)
    assert 'Content-Range' not in headers


def test_if_range_validator(server):
    _, headers, _ = request(server, method='HEAD')
    status, _, body = request(server, headers={'Range': 'bytes=0-31', 'If-Range': headers['Last-Modified']})
    assert status == 206 and body == server.data[:32]
    status, _, body = request(server, headers={'Range': 'bytes=0-31', 'If-Range': 'outdated-validator'})
    assert status == 200 and body == server.data


def test_empty_file(server):
    path = '/stemlab/arcadians/empty.mp3'
    status, headers, body = request(server, path)
    assert status == 200 and body == b'' and headers['Content-Length'] == '0'
    status, headers, body = request(server, path, headers={'Range': 'bytes=0-'})
    assert status == 416 and headers['Content-Range'] == 'bytes */0' and body == b''


def test_prefix_preserved_in_directory_redirect(server):
    status, headers, body = request(server, '/stemlab/arcadians?view=compare')
    assert status == 301
    assert headers['Location'] == '/stemlab/arcadians/?view=compare' and body == b''
    status, _, body = request(server, headers={}, path='/stemlab/arcadians/?view=compare')
    assert status == 200 and b'Local QA fixture' in body


@pytest.mark.parametrize('path', ['/arcadians/audio.mp3', '/stemlab/../index.html',
                                  '/stemlab/%2e%2e/index.html', '/stemlab/%5c../index.html',
                                  '/stemlab/%00', '/stemlab//etc/passwd', '/stemlab/missing'])
def test_unavailable_or_escaping_paths(server, path):
    for method in ('GET', 'HEAD'):
        assert request(server, path, method=method)[0] == 404


def test_outside_symlink_is_not_served(server, tmp_path):
    external = tmp_path / 'private.txt'
    external.write_text('not public')
    link = server.site / 'escape.txt'
    try:
        link.symlink_to(external)
    except OSError:
        pytest.skip('Symlinks unavailable')
    try:
        assert request(server, '/stemlab/escape.txt')[0] == 404
    finally:
        link.unlink()


def test_cancelled_media_preload_is_not_a_server_failure(server):
    before = len(server.failures)
    connection = socket.create_connection(('127.0.0.1', server.service.server_port), timeout=5)
    connection.sendall(b'GET /stemlab/arcadians/audio.mp3 HTTP/1.1\r\nHost: localhost\r\n\r\n')
    connection.recv(200)
    connection.close()
    time.sleep(.05)
    assert len(server.failures) == before


@pytest.fixture
def checker(monkeypatch):
    monkeypatch.syspath_prepend(str(ROOT / 'scripts'))
    spec = importlib.util.spec_from_file_location('arcadians_audio_check_test', ROOT / 'scripts/check_arcadians_audio.py')
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def test_http_audio_range_preflight(checker, server):
    url = f'http://127.0.0.1:{server.service.server_port}/stemlab/arcadians/audio.mp3'
    result = checker.verify_audio_ranges(url, server.site / 'arcadians/audio.mp3')
    assert result == {'verified': True, 'partial_requests': 3, 'audio_bytes': len(server.data)}


def test_timeout_diagnostics_written_before_teardown(checker, tmp_path):
    class Page:
        def evaluate(self, _):
            return {'audio': {'time': 0, 'seeking': False, 'seekable': []}}
        def screenshot(self, *, path, timeout):
            assert timeout == 5000
            Path(path).write_bytes(b'fake test screenshot')
    report, screenshot = tmp_path / 'qa/report.json', tmp_path / 'qa/failure.png'
    checker._failure_report(report, TimeoutError('seek failed'), 'shared-control-seek',
                            page=Page(), screenshot=screenshot, target=101.23)
    value = json.loads(report.read_text())
    assert value['status'] == 'failed' and value['stage'] == 'shared-control-seek'
    assert value['target_seconds'] == 101.23
    assert value['browser_state']['audio']['seekable'] == []
    assert value['error_type'] == 'TimeoutError' and screenshot.is_file()


def test_diagnostics_survive_a_closed_browser(checker, tmp_path):
    class Page:
        def evaluate(self, _):
            raise RuntimeError('Browser closed')
        def screenshot(self, **_):
            raise RuntimeError('Browser closed')
    report = tmp_path / 'failure.json'
    checker._failure_report(report, RuntimeError('Original failure'), 'page-load',
                            page=Page(), screenshot=tmp_path / 'failure.png')
    value = json.loads(report.read_text())
    assert value['error'] == 'Original failure'
    assert value['state_error'] == value['screenshot_error'] == 'Browser closed'


def test_qa_is_in_release_workflow_and_source_distribution():
    workflow = (ROOT / '.github/workflows/arcadians-demo.yml').read_text()
    assert 'tests/test_arcadians_http.py' in workflow
    assert 'scripts/arcadians_http.py' in workflow
    assert '--in-memory' not in workflow
    assert 'include scripts/arcadians_http.py' in (ROOT / 'MANIFEST.in').read_text()
