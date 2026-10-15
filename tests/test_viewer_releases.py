"""Offline contracts for registry releases; fixtures are not publication evidence."""
from __future__ import annotations

import base64
from copy import deepcopy
from pathlib import Path
import subprocess
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import viewer_releases as vr


def record():
    return {
        'schema': vr.SCHEMA, 'policy': 'latest-stable',
        'timeline': {'repository': vr.REPOSITORIES['timeline'], 'tag': 'v0.3.0', 'version': '0.3.0',
                     'commit': 'a' * 40,
                     'tarball': 'https://registry.npmjs.org/react-timeline-sequence/-/react-timeline-sequence-0.3.0.tgz',
                     'integrity': 'sha512-' + base64.b64encode(b't' * 64).decode()},
        'dancerudiments': {'repository': vr.REPOSITORIES['dancerudiments'], 'tag': 'v0.3.0',
                          'version': '0.3.0', 'commit': 'b' * 40,
                          'wheels': {'dancerudiments-0.3.0-cp311-cp311-win_amd64.whl': vr.digest(b'fixture wheel')}}}


def fake_api(info=None):
    info = deepcopy(info or record())
    routes = {}
    for key, repo in vr.REPOSITORIES.items():
        item = info[key]
        routes[f'https://api.github.com/repos/{repo}/releases/latest'] = {
            'tag_name': item['tag'], 'draft': False, 'prerelease': False}
        routes[f'https://api.github.com/repos/{repo}/commits/{item["tag"]}'] = {'sha': item['commit']}
    routes['https://registry.npmjs.org/react-timeline-sequence/latest'] = {
        'name': 'react-timeline-sequence', 'version': info['timeline']['version'],
        'dist': {k: info['timeline'][k] for k in ('tarball', 'integrity')}}
    routes['https://pypi.org/pypi/dancerudiments/json'] = {
        'info': {'version': info['dancerudiments']['version']},
        'urls': [{'filename': name, 'packagetype': 'bdist_wheel', 'yanked': False,
                  'digests': {'sha256': digest}} for name, digest in info['dancerudiments']['wheels'].items()]}
    return routes


def make_snapshot(root, info=None):
    info = deepcopy(info or record())
    vr.write(root / 'package.json', {'dependencies': {'react-timeline-sequence': info['timeline']['version']}})
    vr.write(root / 'package-lock.json', {'lockfileVersion': 3, 'packages': {
        '': {'dependencies': {'react-timeline-sequence': info['timeline']['version']}},
        'node_modules/react-timeline-sequence': {
            'version': info['timeline']['version'], 'resolved': info['timeline']['tarball'],
            'integrity': info['timeline']['integrity']}}})
    (root / 'pyproject.toml').write_text(f'rudiments = ["dancerudiments>={info["dancerudiments"]["version"]}"]\n')
    (root / 'web-client/src').mkdir(parents=True, exist_ok=True)
    (root / 'web-client/src/app.jsx').write_bytes(b'// fixture source\n')
    web = root / 'src/stemlab/web'
    web.mkdir(parents=True, exist_ok=True)
    (web / 'app.js').write_text(' '.join(vr.MARKERS))
    (web / 'timeline.css').write_bytes(b'/* fixture CSS */\n')
    vr.write(root / vr.RECORD, info)
    (root / vr.PIN).write_text(info['dancerudiments']['commit'] + '\n')
    vr.write(root / vr.BUILD, {
        'schema': 'stemlab.viewer-build.v1', 'dependencies': info, 'sources': vr.source_hashes(root),
        'outputs': {p: vr.digest((root / p).read_bytes()) for p in
                    ('src/stemlab/web/app.js', 'src/stemlab/web/timeline.css')}})
    return info


def test_resolve_only_agreed_stable_official_releases():
    routes = fake_api()
    assert vr.resolve(routes.__getitem__) == record()


@pytest.mark.parametrize('failure', ['draft', 'prerelease', 'tag', 'sha', 'npm-lag', 'pypi-lag', 'yanked', 'mirror', 'hash'])
def test_resolve_rejects_incomplete_or_untrusted_publication(failure):
    routes = fake_api()
    rel = routes[f'https://api.github.com/repos/{vr.REPOSITORIES["timeline"]}/releases/latest']
    if failure in ('draft', 'prerelease'):
        rel[failure] = True
    elif failure == 'tag':
        rel['tag_name'] = 'main'
    elif failure == 'sha':
        routes[f'https://api.github.com/repos/{vr.REPOSITORIES["timeline"]}/commits/v0.3.0']['sha'] = 'main'
    elif failure == 'npm-lag':
        routes['https://registry.npmjs.org/react-timeline-sequence/latest']['version'] = '0.2.2'
    elif failure == 'pypi-lag':
        routes['https://pypi.org/pypi/dancerudiments/json']['info']['version'] = '0.2.4'
    elif failure == 'yanked':
        routes['https://pypi.org/pypi/dancerudiments/json']['urls'][0]['yanked'] = True
    elif failure == 'mirror':
        routes['https://registry.npmjs.org/react-timeline-sequence/latest']['dist']['tarball'] = 'file:vendor/local.tgz'
    else:
        routes['https://registry.npmjs.org/react-timeline-sequence/latest']['dist']['integrity'] = 'sha512-invalid'
    with pytest.raises(ValueError):
        vr.resolve(routes.__getitem__)


@pytest.mark.parametrize('value', ['latest', 'main', 'v0.3.0', '01.2.3', '0.3.0-rc1', '', '../x'])
def test_version_refuses_aliases_and_prereleases(value):
    with pytest.raises(ValueError):
        vr.version(value)


def test_check_requires_built_registry_snapshot(tmp_path):
    info = make_snapshot(tmp_path)
    assert vr.check(tmp_path, latest=True, fetch=fake_api().__getitem__) == info


@pytest.mark.parametrize('path', ['package.json', 'package-lock.json', 'pyproject.toml', vr.PIN, vr.BUILD,
                                  'src/stemlab/web/app.js', 'src/stemlab/web/timeline.css', 'web-client/src/app.jsx'])
def test_modified_dependency_or_source_or_output_fails(tmp_path, path):
    make_snapshot(tmp_path)
    file = tmp_path / path
    if path.endswith('.json'):
        file.write_text('{}')
    else:
        file.write_text('stale')
    with pytest.raises((ValueError, KeyError)):
        vr.check(tmp_path)


def test_missing_receipt_is_not_a_success(tmp_path):
    with pytest.raises(ValueError, match='missing'):
        vr.check(tmp_path)


def test_source_crlf_is_normalized_but_output_bytes_are_exact(tmp_path):
    make_snapshot(tmp_path)
    src = tmp_path / 'web-client/src/app.jsx'
    src.write_bytes(src.read_bytes().replace(b'\n', b'\r\n'))
    vr.check(tmp_path)
    css = tmp_path / 'src/stemlab/web/timeline.css'
    css.write_bytes(css.read_bytes().replace(b'\n', b'\r\n'))
    with pytest.raises(ValueError, match='outputs changed'):
        vr.check(tmp_path)


def test_latest_changed_commit_cannot_silently_reuse_old_release(tmp_path):
    make_snapshot(tmp_path)
    routes = fake_api()
    routes[f'https://api.github.com/repos/{vr.REPOSITORIES["timeline"]}/commits/v0.3.0']['sha'] = 'c' * 40
    with pytest.raises(ValueError, match='newer stable'):
        vr.check(tmp_path, latest=True, fetch=routes.__getitem__)


@pytest.mark.parametrize('bad', ['dancerudiments-0.2.4-cp311-cp311-win_amd64.whl', '../escape.whl'])
def test_wheel_must_belong_to_selected_version(bad):
    info = record()
    info['dancerudiments']['wheels'] = {bad: 'c' * 64}
    with pytest.raises(ValueError):
        vr.validate_record(info)


def test_wheel_is_hash_checked_before_install(tmp_path):
    make_snapshot(tmp_path)
    calls = []
    def runner(args, cwd, **kwargs):
        calls.append(args)
        if 'download' in args:
            Path(args[args.index('--dest') + 1], next(iter(record()['dancerudiments']['wheels']))).write_bytes(b'fixture wheel')
    vr.install_native(tmp_path, runner=runner)
    assert len(calls) == 3
    assert '--only-binary=:all:' in calls[0]
    assert '--no-deps' in calls[1]
    assert 'HARNESS_DISPLAY_API_VERSION == 1' in calls[2][-1]
    assert not any('-e' in cmd or '--pre' in cmd for cmd in calls)


def test_bad_wheel_fails_without_installation(tmp_path):
    make_snapshot(tmp_path)
    calls = []
    def runner(args, cwd, **kwargs):
        calls.append(args)
        if 'download' in args:
            Path(args[args.index('--dest') + 1], next(iter(record()['dancerudiments']['wheels']))).write_bytes(b'tampered')
    with pytest.raises(ValueError, match='digest'):
        vr.install_native(tmp_path, runner=runner)
    assert len(calls) == 1


def test_sync_uses_registry_and_build_not_siblings(tmp_path, monkeypatch):
    info = make_snapshot(tmp_path)
    module = tmp_path / 'node_modules/react-timeline-sequence'
    (module / 'dist').mkdir(parents=True)
    vr.write(module / 'package.json', {'version': '0.3.0'})
    (module / 'dist/index.js').write_text('export const TIMELINE_DISPLAY_API_VERSION = 1;')
    calls = []
    monkeypatch.setattr(vr, 'executable', lambda name: name)
    vr.synchronize(tmp_path, fetch=fake_api().__getitem__, runner=lambda args, cwd: calls.append(args))
    assert calls[0] == ['npm', 'install', '--save-exact', 'react-timeline-sequence@0.3.0', '--registry=https://registry.npmjs.org/']
    assert ['npm', 'run', 'build:web'] in calls
    assert ['node', '--test', 'tests/web/audio-channels.test.mjs'] in calls
    assert vr.check(tmp_path) == info
    assert not (tmp_path / 'vendor').exists()


def test_sync_if_needed_is_a_noop(tmp_path):
    make_snapshot(tmp_path)
    def must_not_run(*args, **kwargs):
        raise AssertionError('An unchanged release should not rebuild')
    vr.synchronize(tmp_path, fetch=fake_api().__getitem__, runner=must_not_run, if_needed=True)


def test_output_rejects_injection(tmp_path):
    info = record()
    info['dancerudiments']['commit'] = 'b' * 40 + '\nx=unsafe'
    with pytest.raises(ValueError):
        vr.outputs(info, tmp_path / 'outputs')
    assert not (tmp_path / 'outputs').exists()


def test_output_contains_release_not_main(tmp_path):
    target = tmp_path / 'outputs'
    vr.outputs(record(), target)
    assert f'ref={"b" * 40}' in target.read_text()
    assert 'tag=v0.3.0' in target.read_text()


def test_obsolete_sibling_cli_arguments_are_rejected():
    script = Path(__file__).parents[1] / 'scripts/configure_viewer_build.py'
    result = subprocess.run([sys.executable, str(script), '--timeline', '../sibling'], capture_output=True, text=True)
    assert result.returncode == 2
    assert 'unrecognized arguments' in result.stderr


def test_snapshot_npm_integrity_mismatch(tmp_path):
    make_snapshot(tmp_path)
    lock = vr.read(tmp_path / 'package-lock.json')
    lock['packages']['node_modules/react-timeline-sequence']['integrity'] = 'sha512-other'
    vr.write(tmp_path / 'package-lock.json', lock)
    with pytest.raises(ValueError, match='integrity'):
        vr.check(tmp_path)


def test_snapshot_never_accepts_local_vendor_dependency(tmp_path):
    make_snapshot(tmp_path)
    package = vr.read(tmp_path / 'package.json')
    package['dependencies']['react-timeline-sequence'] = 'file:vendor/test.tgz'
    vr.write(tmp_path / 'package.json', package)
    with pytest.raises(ValueError):
        vr.check(tmp_path)
