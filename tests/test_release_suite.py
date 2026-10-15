"""Release coordinator safety/ordering tests. No registry writes or real releases."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import subprocess
import sys

import pytest
import yaml

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import release_suite as rs


def options(root, **values):
    data = dict(projects_root=root, state_file=None, patch_dir=None, timeout_minutes=1,
                execute=True, resume=False, dancerudiments_version='', timeline_version='', stemlab_version='')
    data.update(values)
    return argparse.Namespace(**data)


def fake_run(name='ci.yml', *, number=1, sha='a' * 40, branch='main', event='push', status='completed', conclusion='success'):
    return dict(id=number, path='.github/workflows/' + name, head_sha=sha, head_branch=branch,
                event=event, status=status, conclusion=conclusion, html_url='https://github.com/example/actions/runs/' + str(number))


def test_version_selection_uses_higher_source_or_release():
    assert rs.next_minor('0.2.2', '0.2.2') == '0.3.0'
    assert rs.next_minor('0.2.4', '0.2.4') == '0.3.0'
    assert rs.next_minor('1.4.2', '1.4.2') == '1.5.0'
    assert rs.next_minor('1.8.0', '2.1.0') == '2.2.0'


@pytest.mark.parametrize('bad', ['main', 'latest', 'v1.2.3', '1.2.3-rc.1', '1.2', '01.2.3', '1.2.3\n'])
def test_release_version_is_strict(bad):
    with pytest.raises(ValueError):
        rs.semver(bad)


def test_runs_filter_sha_branch_event_and_choose_newest():
    good = fake_run(number=2)
    data = [fake_run(), good, fake_run(number=3, sha='b' * 40),
            fake_run(number=4, branch='v0.3.0'), fake_run(number=5, event='pull_request')]
    assert rs.select_runs(data, 'a' * 40, 'main') == {'ci.yml': good}
    assert rs.select_runs(data, 'a' * 40, 'v0.3.0')['ci.yml']['id'] == 4


def test_existing_success_does_not_hide_failed_newer_run():
    good, bad = fake_run(), fake_run(number=2, conclusion='failure')
    assert rs.select_runs([good, bad], 'a' * 40, 'main')['ci.yml'] == bad


@pytest.mark.parametrize('path', ['../outside', '/absolute', 'with space', 'one\nnew'])
def test_patch_paths_are_scoped(tmp_path, path):
    patch = tmp_path / 'p.patch'
    patch.write_text(f'diff --git a/{path} b/{path}\n')
    with pytest.raises(ValueError):
        rs.patch_files(patch)


def test_patch_paths_support_regular_new_and_deleted_files(tmp_path):
    patch = tmp_path / 'p.patch'
    patch.write_text('diff --git a/README.md b/README.md\n--- a/README.md\n+++ b/README.md\n'
                     'diff --git a/scripts/a.py b/scripts/a.py\nnew file mode 100644\n')
    assert rs.patch_files(patch) == {'README.md', 'scripts/a.py'}


def test_session_must_remain_outside_repository(tmp_path):
    with pytest.raises(ValueError, match='outside'):
        rs.ReleaseSuite(options(tmp_path, state_file=tmp_path / 'stemlab/state.json'))


def test_session_atomic_save_contains_no_credentials(tmp_path):
    suite = rs.ReleaseSuite(options(tmp_path))
    suite.save()
    data = json.loads(suite.state_path.read_text())
    assert data['root'] == str(tmp_path)
    assert data['complete'] is False
    assert not suite.state_path.with_suffix('.tmp').exists()
    assert 'token' not in str(data).lower()


def test_failed_workflow_prevents_tag_creation(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    suite.state['projects']['stemlab'] = {'version': '1.5.0', 'phase': 'prepared', 'sha': 'a' * 40}
    calls = []
    monkeypatch.setattr(rs, 'command', lambda args, cwd, **kw: calls.append(args))
    monkeypatch.setattr(suite, 'api', lambda *a: {'workflow_runs': [fake_run(conclusion='failure')], 'total_count': 1})
    with pytest.raises(RuntimeError, match='CI/CD failed'):
        suite.publish('stemlab')
    assert calls == [['git', 'push', 'origin', 'HEAD:refs/heads/main']]
    assert suite.state['projects']['stemlab']['phase'] == 'prepared'


def test_missing_required_workflow_times_out_not_success(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    monkeypatch.setattr(suite, 'api', lambda *a: {'workflow_runs': [fake_run()], 'total_count': 1})
    times = iter([0, 1, 100])
    monkeypatch.setattr(rs.time, 'monotonic', lambda: next(times))
    monkeypatch.setattr(rs.time, 'sleep', lambda value: None)
    with pytest.raises(TimeoutError, match='not all required'):
        suite.wait_runs('stemlab', 'a' * 40, 'main', {'ci.yml', 'recordings.yml'})


def test_all_required_green_and_paginated_runs(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    requests = []
    def api(name, path):
        requests.append(path)
        return {'workflow_runs': [fake_run('ci.yml' if path.endswith('&page=1') else 'recordings.yml')], 'total_count': 101}
    monkeypatch.setattr(suite, 'api', api)
    result = suite.wait_runs('stemlab', 'a' * 40, 'main', {'ci.yml', 'recordings.yml'})
    assert set(result) == {'ci.yml', 'recordings.yml'}
    assert len(requests) == 2


def test_tagged_resume_refuses_changed_tag(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    suite.state['projects']['stemlab'] = {'version': '1.5.0', 'phase': 'tagged', 'sha': 'a' * 40}
    calls = []
    def command(args, cwd, **kw):
        calls.append(args)
        return 'b' * 40
    monkeypatch.setattr(rs, 'command', command)
    with pytest.raises(ValueError, match='tag changed'):
        suite.publish('stemlab')
    assert len(calls) == 1
    assert 'push' not in calls[0]


def test_execute_is_dependency_ordered_and_ends_with_live_verification(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    calls = []
    monkeypatch.setattr(suite, 'save', lambda: calls.append('save'))
    monkeypatch.setattr(suite, 'prepare', lambda name: calls.append(('prepare', name)))
    monkeypatch.setattr(suite, 'publish', lambda name: calls.append(('publish', name)))
    monkeypatch.setattr(suite, 'verify_pages', lambda: calls.append('live'))
    suite.execute()
    assert calls == ['save', ('prepare', 'react-timeline-sequence'), ('publish', 'react-timeline-sequence'),
                     ('prepare', 'DanceRudiments'), ('publish', 'DanceRudiments'),
                     ('prepare', 'stemlab'), ('publish', 'stemlab'), 'live']


def test_dependency_publication_failure_stops_before_stemlab(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    seen = []
    monkeypatch.setattr(suite, 'save', lambda: None)
    monkeypatch.setattr(suite, 'prepare', lambda name: seen.append(name))
    def fail(name):
        raise RuntimeError('publication failed')
    monkeypatch.setattr(suite, 'publish', fail)
    with pytest.raises(RuntimeError):
        suite.execute()
    assert seen == ['react-timeline-sequence']


def test_completed_resume_creates_nothing(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path, resume=True))
    suite.state['complete'] = True
    def forbidden(*args, **kwargs):
        raise AssertionError('completed session should not modify anything')
    monkeypatch.setattr(suite, 'prepare', forbidden)
    monkeypatch.setattr(suite, 'save', forbidden)
    suite.execute()


def test_preview_does_not_call_execute(monkeypatch, tmp_path):
    calls = []
    monkeypatch.setattr(rs.ReleaseSuite, 'preflight', lambda s: calls.append('check'))
    monkeypatch.setattr(rs.ReleaseSuite, 'plan', lambda s: calls.append('plan'))
    monkeypatch.setattr(rs.ReleaseSuite, 'execute', lambda s: calls.append('WRITE'))
    assert rs.main(['--projects-root', str(tmp_path)]) == 0
    assert calls == ['check', 'plan']


def test_skipped_pages_is_not_success(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    suite.state['projects']['stemlab'] = {'sha': 'a' * 40, 'release_runs': {'release.yml': 1}}
    monkeypatch.setattr(suite, 'api', lambda *a: {'jobs': [dict(name='Publish Arcadians timeline and movement comparison to Pages', conclusion='skipped')]})
    with pytest.raises(RuntimeError, match='skipped or failed'):
        suite.verify_pages()
    assert suite.state['complete'] is False


def test_release_tag_sha_must_match_tested_commit(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path))
    suite.state['projects']['stemlab'] = {'sha': 'a' * 40, 'version': '1.5.0'}
    monkeypatch.setattr(suite, 'api', lambda name, p: {'sha': 'b' * 40} if p.startswith('commits') else {'draft': False, 'prerelease': False})
    with pytest.raises(ValueError, match='tested stable source'):
        suite.verify_publication('stemlab')


def test_real_git_scoped_dirty_detection(tmp_path):
    subprocess.run(['git', 'init', '-q', str(tmp_path)], check=True)
    for key, value in [('user.email', 'test@example.invalid'), ('user.name', 'Test')]:
        subprocess.run(['git', 'config', key, value], cwd=tmp_path, check=True)
    (tmp_path / 'README.md').write_text('one')
    subprocess.run(['git', 'add', 'README.md'], cwd=tmp_path, check=True)
    subprocess.run(['git', 'commit', '-qm', 'fixture'], cwd=tmp_path, check=True)
    (tmp_path / 'README.md').write_text('two')
    (tmp_path / 'unrelated.txt').write_text('do not commit')
    assert rs.dirty_files(tmp_path) == {'README.md', 'unrelated.txt'}


def test_workflows_retain_http_and_native_gates():
    root = Path(__file__).parents[1]
    def load(name):
        return yaml.load((root / '.github/workflows' / name).read_text(), Loader=yaml.BaseLoader)
    ci, recording, arcadians = load('ci.yml'), load('recordings.yml'), load('arcadians-demo.yml')
    assert '--latest' in str(ci) and '--latest' in str(recording) and '--latest' in str(arcadians)
    assert 'ParseFile' in str(ci)
    assert 'viewer_releases.py install' in str(recording)
    assert 'pip install ./.recording-dancerudiments' not in str(recording)
    assert 'DANCERUDIMENTS_RECORDING_REF' not in str(recording)
    assert 'recording_ref' not in str(recording['on'])
    assert 'shell' in recording['jobs']['recordings']['defaults']['run']
    assert 'check_arcadians_audio.py' in str(arcadians)
    assert 'arcadians-stems' in str(arcadians) and 'arcadians-averages' in str(arcadians)
    release = load('release.yml')
    assert {'codex-package', 'arcadians-demo'} <= set(release['jobs']['release-build']['needs'])
    assert release['jobs']['arcadians-demo']['uses'] == './.github/workflows/arcadians-demo.yml'


def test_release_update_workflow_only_proposes_reviewed_changes():
    root = Path(__file__).parents[1]
    text = (root / '.github/workflows/viewer-releases.yml').read_text()
    assert 'schedule:' in text and 'workflow_dispatch:' in text
    assert 'sync --if-needed' in text
    assert 'gh pr create' in text
    assert 'gh pr merge' not in text and 'git push --force' not in text and 'npm publish' not in text


def test_readme_and_agents_cover_release_policy():
    root = Path(__file__).parents[1]
    for name in ('README.md', 'AGENTS.md'):
        text = (root / name).read_text()
        assert 'latest stable official releases' in text
        assert 'Release-DanceFlow.ps1' in text
        assert 'released-viewers.md' in text
    assert 'No package release is required' not in (root / 'docs/viewer-controls.md').read_text()


def setup_preflight(suite, monkeypatch):
    seen = []
    for name in rs.NAMES:
        (suite.root / name).mkdir()
    def command(args, cwd, **kwargs):
        seen.append(args)
        if args[0] == 'node':
            return '24'
        if args[:2] == ['git', 'rev-parse']:
            return 'a' * 40
        return ''
    monkeypatch.setattr(rs, 'command', command)
    monkeypatch.setattr(rs.shutil, 'which', lambda tool: '/fixture/' + tool)
    monkeypatch.setattr(rs, 'require_origin', lambda *args: None)
    monkeypatch.setattr(rs, 'current_version', lambda repo, name: '1.4.2' if name == 'stemlab' else ('0.2.4' if name == 'DanceRudiments' else '0.2.2'))
    def api(name, endpoint):
        if endpoint == 'pages':
            return {'build_type': 'workflow'}
        if endpoint.startswith('actions/variables'):
            return {'value': 'true'}
        return {'tag_name': 'v' + rs.current_version(None, name), 'draft': False, 'prerelease': False}
    monkeypatch.setattr(suite, 'api', api)
    return seen


def test_real_preflight_preview_performs_no_writes(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path, execute=False))
    seen = setup_preflight(suite, monkeypatch)
    suite.preflight()
    assert {k: v['version'] for k, v in suite.state['projects'].items()} == {
        'react-timeline-sequence': '0.3.0', 'DanceRudiments': '0.3.0', 'stemlab': '1.5.0'}
    assert not any(cmd[0] == 'git' and cmd[1] in {'fetch', 'merge', 'commit', 'push', 'apply'} for cmd in seen)
    assert not suite.state_path.exists()


def test_existing_remote_tag_aborts_preflight(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path, execute=False))
    setup_preflight(suite, monkeypatch)
    original = rs.command
    def command(args, cwd, **kw):
        return 'a' * 40 + '\trefs/tags/v0.3.0' if args[:2] == ['git', 'ls-remote'] else original(args, cwd, **kw)
    monkeypatch.setattr(rs, 'command', command)
    with pytest.raises(ValueError, match='already exists'):
        suite.preflight()
    assert not suite.state_path.exists()


def test_resume_rejects_checkout_movement(tmp_path, monkeypatch):
    suite = rs.ReleaseSuite(options(tmp_path, resume=True))
    setup_preflight(suite, monkeypatch)
    suite.state['projects'] = {name: dict(initial_sha='b' * 40, sha='b' * 40, version='1.0.0', phase='prepared') for name in rs.NAMES}
    suite.save()
    with pytest.raises(ValueError, match='checkout moved'):
        suite.preflight()


def make_version_fixture(root):
    init = root / 'src/stemlab/__init__.py'
    init.parent.mkdir(parents=True)
    init.write_text('__version__ = "1.4.2"\n')
    for rel in ('plugins/stemlab/plugin.json', 'plugins/stemlab/.codex-plugin/plugin.json'):
        path = root / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(json.dumps({'name': 'stemlab', 'version': '1.4.2'}))
    registry = root / 'mcp-registry/server.json'
    registry.parent.mkdir()
    registry.write_text(json.dumps({'name': 'io.github.kieransimkin/stemlab', 'version': '1.4.1',
                                   'packages': [{'registryType': 'pypi', 'identifier': 'danceflow-stemlab', 'version': '1.4.1'}]}))


def test_stemlab_bump_keeps_plugin_and_registry_identities_consistent(tmp_path):
    make_version_fixture(tmp_path)
    rs.prepare_stemlab_version(tmp_path, '1.5.0')
    assert rs.current_version(tmp_path, 'stemlab') == '1.5.0'
    for rel in rs.VERSION_FILES['stemlab'] - {'src/stemlab/__init__.py'}:
        data = json.loads((tmp_path / rel).read_text())
        assert data['version'] == '1.5.0'
        for package in data.get('packages', []):
            assert package['version'] == '1.5.0'


def test_identity_error_causes_no_partial_version_writes(tmp_path):
    make_version_fixture(tmp_path)
    path = tmp_path / 'mcp-registry/server.json'
    data = json.loads(path.read_text())
    data['name'] = 'other'
    path.write_text(json.dumps(data))
    with pytest.raises(ValueError, match='registry identity'):
        rs.prepare_stemlab_version(tmp_path, '1.5.0')
    assert rs.current_version(tmp_path, 'stemlab') == '1.4.2'
