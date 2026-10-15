"""Safe, resumable release ordering for three sibling DanceFlow repositories.

Invoked by Release-DanceFlow.ps1. Preview is the default; --execute authorizes
scoped commits, ordinary pushes and NEW release tags. Registry publishing is
performed only by each project's existing GitHub Actions release workflows.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
import time
from urllib.request import Request, urlopen

NAMES = ('react-timeline-sequence', 'DanceRudiments', 'stemlab')
OWNER = 'kieransimkin'
MAIN_CI = {
    'react-timeline-sequence': {'ci.yml'},
    'DanceRudiments': {'ci.yml', 'patterns.yml', 'initial-collection.yml', 'recordings.yml', 'visualizer.yml', 'csharp.yml'},
    'stemlab': {'ci.yml', 'recordings.yml', 'midi.yml', 'evidence.yml', 'codex-plugin.yml'},
}
RELEASE_CI = {
    'react-timeline-sequence': {'release.yml'},
    'DanceRudiments': {'release-tag.yml', 'release.yml', 'demo-release.yml', 'csharp.yml'},
    'stemlab': {'ci.yml', 'release.yml'},
}
VERSION_FILES = {
    'react-timeline-sequence': {'package.json', 'package-lock.json'},
    'DanceRudiments': {'package.json', 'package-lock.json', 'pyproject.toml', 'CMakeLists.txt',
                      'bindings/csharp/DanceRudiments/DanceRudiments.csproj'},
    'stemlab': {'src/stemlab/__init__.py', 'plugins/stemlab/plugin.json',
                'plugins/stemlab/.codex-plugin/plugin.json', 'mcp-registry/server.json'},
}
VIEWER_FILES = {'package.json', 'package-lock.json', 'pyproject.toml',
                '.github/dancerudiments-recording-ref', '.github/viewer-releases.json',
                '.github/viewer-build.json', 'src/stemlab/web/app.js', 'src/stemlab/web/timeline.css'}
# A failed prepared StemLab commit may be repaired without restarting the already-
# published companion release chain. Keep this deliberately narrow: only the
# coordinator and its tests may move between the saved prepared SHA and resume.
PREPARED_REPAIR_FILES = {
    'stemlab': {'scripts/release_suite.py', 'tests/test_release_suite.py'},
}


def semver(text: str) -> tuple[int, int, int]:
    match = re.fullmatch(r'(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)', text)
    if not match:
        raise ValueError('Use a stable MAJOR.MINOR.PATCH version: ' + repr(text))
    return tuple(map(int, match.groups()))


def next_minor(current: str, latest: str) -> str:
    major, minor, _ = max(semver(current), semver(latest))
    return f'{major}.{minor + 1}.0'


def release_python_supported(version_info=None) -> bool:
    """Return whether the release coordinator may execute under this Python.

    StemLab itself still tests Python 3.10. The release coordinator deliberately
    requires Python 3.11+, so unit tests of unrelated preflight behavior stub
    this narrow gate instead of making the full 3.10 project CI fail.
    """
    version_info = sys.version_info if version_info is None else version_info
    return tuple(version_info[:2]) >= (3, 11)


def command(args: list[str], cwd: Path, *, capture: bool = False) -> str:
    # Resolve npm.cmd explicitly on Windows. Never use shell=True/Invoke-Expression.
    if args[0] == 'npm':
        args = [shutil.which('npm.cmd' if os.name == 'nt' else 'npm') or 'npm', *args[1:]]
    if not capture:
        print('+', subprocess.list2cmdline(args), flush=True)
    result = subprocess.run(args, cwd=cwd, check=True, text=True, encoding='utf-8',
                            errors='replace', stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else ''


def json_api(endpoint: str, root: Path):
    return json.loads(command(['gh', 'api', endpoint], root, capture=True))


def registry(url: str):
    with urlopen(Request(url, headers={'User-Agent': 'DanceFlow-release-check'}), timeout=45) as response:
        return json.load(response)


def workflow_name(run: dict) -> str:
    return run['path'].split('@', 1)[0].rsplit('/', 1)[-1]


def select_runs(runs: list[dict], sha: str, branch: str) -> dict:
    selected = {}
    for run in runs:
        if run.get('head_sha') != sha or run.get('head_branch') != branch or run.get('event') != 'push':
            continue
        key = workflow_name(run)
        if key not in selected or run['id'] > selected[key]['id']:
            selected[key] = run
    return selected


def patch_files(patch: Path) -> set[str]:
    text = patch.read_text(encoding='utf-8')
    header_lines = re.findall(r'^diff --git (\S+) (\S+)$', text, re.MULTILINE)
    if not header_lines:
        raise ValueError('Patch has no Git file headers')
    paths: set[str] = set()
    for left, right in header_lines:
        if not left.startswith('a/') or not right.startswith('b/') or left[2:] != right[2:]:
            raise ValueError('Patch paths must be simple matching repository-relative paths')
        path = left[2:]
        # Git patch paths are POSIX-style even when the coordinator runs on
        # Windows. WindowsPath('/absolute').is_absolute() is False without a
        # drive, so validate the patch syntax itself rather than host semantics.
        parts = path.split('/')
        if (not path or '\\' in path or path.startswith('/')
                or re.match(r'^[A-Za-z]:', path)
                or any(part in {'', '.', '..'} for part in parts)):
            raise ValueError('Unsafe patch path')
        paths.add(path)
    if len(paths) != len(header_lines):
        raise ValueError('Patch contains duplicate file headers')
    return paths


def dirty_files(repo: Path) -> set[str]:
    args = (['git', 'diff', '--name-only', '-z', 'HEAD'], ['git', 'ls-files', '--others', '--exclude-standard', '-z'])
    return {p for a in args for p in command(a, repo, capture=True).split('\0') if p}


def require_origin(repo: Path, name: str) -> None:
    expected = f'{OWNER}/{name}'
    remote = command(['git', 'remote', 'get-url', 'origin'], repo, capture=True).casefold()
    choices = {f'https://github.com/{expected}', f'https://github.com/{expected}.git',
               f'git@github.com:{expected}.git', f'ssh://git@github.com/{expected}.git'}
    if remote not in {x.casefold() for x in choices}:
        raise ValueError(f'{name}: origin must be the official {expected} repository')
    if command(['git', 'branch', '--show-current'], repo, capture=True) != 'main':
        raise ValueError(f'{name}: switch to main first; this script never switches or resets your work')
    top = Path(command(['git', 'rev-parse', '--show-toplevel'], repo, capture=True)).resolve()
    if top != repo.resolve():
        raise ValueError(f'{repo} is not a repository root')


def current_version(repo: Path, name: str) -> str:
    if name == 'DanceRudiments':
        return command([sys.executable, 'tools/release_version.py', 'current'], repo, capture=True)
    if name == 'react-timeline-sequence':
        return json.loads((repo / 'package.json').read_text(encoding='utf-8'))['version']
    text = (repo / 'src/stemlab/__init__.py').read_text(encoding='utf-8')
    match = re.search(r'^__version__\s*=\s*[\'"]([^\'"]+)', text, re.MULTILINE)
    if not match:
        raise ValueError('StemLab source version was not found')
    return match.group(1)


def prepare_stemlab_version(repo: Path, target: str) -> None:
    """Preserve the CLI, both plugin identities and MCP registry version contract."""
    semver(target)
    init = repo / 'src/stemlab/__init__.py'
    text, count = re.subn(r'^__version__\s*=\s*[\'"][^\'"]+[\'"]',
                         f'__version__ = "{target}"', init.read_text(encoding='utf-8'), flags=re.MULTILINE)
    if count != 1:
        raise ValueError('Expected one StemLab version field')
    outputs = {}
    for relative in ('plugins/stemlab/plugin.json', 'plugins/stemlab/.codex-plugin/plugin.json'):
        path = repo / relative
        value = json.loads(path.read_text(encoding='utf-8'))
        if value.get('name') != 'stemlab':
            raise ValueError('Unexpected plugin identity; refusing a partial version update')
        value['version'] = target
        outputs[path] = value
    path = repo / 'mcp-registry/server.json'
    value = json.loads(path.read_text(encoding='utf-8'))
    if value.get('name') != 'io.github.kieransimkin/stemlab':
        raise ValueError('Unexpected MCP registry identity')
    value['version'] = target
    for package in value.get('packages', []):
        if package.get('registryType') != 'pypi' or package.get('identifier') != 'danceflow-stemlab':
            raise ValueError('Unexpected MCP runtime distribution')
        package['version'] = target
    outputs[path] = value
    # Validate every identity before writing any of the fields.
    init.write_text(text, encoding='utf-8', newline='\n')
    for path, value in outputs.items():
        path.write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8', newline='\n')


class ReleaseSuite:
    def __init__(self, args):
        self.args = args
        self.root = args.projects_root.expanduser().resolve()
        self.state_path = (args.state_file or self.root / '.danceflow-release-session.json').resolve()
        self.state = {'schema': 'danceflow.release-session.v1', 'root': str(self.root), 'projects': {}, 'complete': False}
        self.timeout = args.timeout_minutes * 60
        for name in NAMES:
            if self.state_path.is_relative_to(self.root / name):
                raise ValueError('Keep the release session file outside all three repository checkouts')
        if not self.state_path.parent.is_dir():
            raise ValueError('The release state directory does not exist')

    def save(self):
        # Saved outside all three repos; contains IDs/versions, never credentials.
        temporary = self.state_path.with_suffix('.tmp')
        temporary.write_text(json.dumps(self.state, indent=2) + '\n', encoding='utf-8')
        temporary.replace(self.state_path)

    def api(self, name, endpoint):
        return json_api(f'repos/{OWNER}/{name}/{endpoint}', self.root)

    def sha(self, name):
        return command(['git', 'rev-parse', 'HEAD'], self.root / name, capture=True)

    def patch(self, name):
        return self.args.patch_dir / f'{name}.patch' if self.args.patch_dir else None

    def _adopt_prepared_repair(self, name, item, current_sha):
        """Adopt one narrowly-scoped descendant CI repair before a tag exists."""
        expected = item.get('sha', item['initial_sha'])
        allowed = PREPARED_REPAIR_FILES.get(name)
        if item.get('phase') != 'prepared' or not allowed:
            return False
        repo = self.root / name
        if current_version(repo, name) != item['version']:
            return False
        if command(['git', 'merge-base', expected, current_sha], repo, capture=True) != expected:
            return False
        changed = {line for line in command(
            ['git', 'diff', '--name-only', f'{expected}..{current_sha}'], repo, capture=True
        ).splitlines() if line}
        if not changed or changed - allowed:
            return False
        remote = command(['git', 'ls-remote', 'origin', 'refs/heads/main'], repo, capture=True)
        if not remote or remote.split()[0] != current_sha:
            return False
        tag = 'v' + item['version']
        if command(['git', 'tag', '--list', tag], repo, capture=True):
            raise ValueError(f'{name}: {tag} already exists locally; do not adopt repair code after tagging')
        if command(['git', 'ls-remote', '--tags', 'origin', f'refs/tags/{tag}'], repo, capture=True):
            raise ValueError(f'{name}: {tag} already exists remotely; do not adopt repair code after tagging')
        item.setdefault('repairs', []).append({'from': expected, 'to': current_sha, 'files': sorted(changed)})
        item['sha'] = current_sha
        self.save()
        print(f'{name}: adopted prepared CI repair {expected[:7]} -> {current_sha[:7]}: {sorted(changed)}', flush=True)
        return True

    def preflight(self):
        for tool in ('git', 'gh', 'node'):
            if not shutil.which(tool):
                raise ValueError(f'Install {tool} and restart PowerShell before running the release script')
        if not shutil.which('npm.cmd' if os.name == 'nt' else 'npm'):
            raise ValueError('npm is required')
        if not release_python_supported():
            raise ValueError('Use Python 3.11 or newer for this release coordinator')
        node_major = int(command(['node', '-p', 'process.versions.node.split(".")[0]'], self.root, capture=True))
        if node_major != 24:
            raise ValueError('Use Node.js 24 to match all production CI frontend builds')
        command(['gh', 'auth', 'status', '--hostname', 'github.com'], self.root)
        for name in NAMES:
            repo = self.root / name
            if not repo.is_dir():
                raise ValueError(f'Missing sibling checkout: {repo}')
            require_origin(repo, name)
            if dirty_files(repo):
                raise ValueError(f'{name}: commit or set aside your existing work first. No automatic stash/reset is used.')
        pages = self.api('stemlab', 'pages')
        enabled = self.api('stemlab', 'actions/variables/STEMLAB_PAGES_ENABLED').get('value')
        if pages.get('build_type') != 'workflow' or enabled != 'true':
            raise ValueError('StemLab Pages must use GitHub Actions and STEMLAB_PAGES_ENABLED=true. Configure these intentionally; this script never changes deployment protection/settings.')
        if self.args.resume:
            self.state = json.loads(self.state_path.read_text(encoding='utf-8'))
            if self.state.get('schema') != 'danceflow.release-session.v1' or self.state.get('root') != str(self.root):
                raise ValueError('Release session belongs to a different workspace or schema')
            for name in NAMES:
                item = self.state['projects'][name]
                if self.patch(name) and hashlib.sha256(self.patch(name).read_bytes()).hexdigest() != item.get('patch_sha256'):
                    raise ValueError('The release kit changed since this session began; review it instead of resuming')
                semver(item['version'])
                if item.get('phase') not in {'planned', 'prepared', 'tagged', 'released'}:
                    raise ValueError('Unknown release session phase')
                current_sha = self.sha(name)
                if current_sha != item.get('sha', item['initial_sha']):
                    if not self._adopt_prepared_repair(name, item, current_sha):
                        raise ValueError(f'{name}: checkout moved since the saved session; review instead of tagging different code')
            return
        if self.args.execute and self.state_path.exists():
            raise ValueError('A saved release session exists. Use -Resume, or select a new -StateFile for a genuinely new release.')
        requested = {'DanceRudiments': self.args.dancerudiments_version,
                     'react-timeline-sequence': self.args.timeline_version, 'stemlab': self.args.stemlab_version}
        for name in NAMES:
            repo = self.root / name
            if self.args.execute:
                command(['git', 'fetch', 'origin', 'main', '--tags'], repo)
                command(['git', 'merge', '--ff-only', 'origin/main'], repo)
                if self.sha(name) != command(['git', 'rev-parse', 'origin/main'], repo, capture=True):
                    raise ValueError(f'{name}: local unpublished commits exist; push and review them before starting')
            latest = self.api(name, 'releases/latest')
            if latest.get('draft') or latest.get('prerelease') or not latest['tag_name'].startswith('v'):
                raise ValueError(f'{name}: expected a stable vX.Y.Z latest release')
            old = latest['tag_name'][1:]
            current = current_version(repo, name)
            target = requested[name] or next_minor(current, old)
            if semver(target) <= semver(old) or semver(target) < semver(current):
                raise ValueError(f'{name}: choose a fresh version newer than {old} and no lower than source {current}')
            # Reject old local AND remote tags before any source edits.
            existing = command(['git', 'ls-remote', '--tags', 'origin', f'refs/tags/v{target}'], repo, capture=True)
            local = command(['git', 'tag', '--list', f'v{target}'], repo, capture=True)
            if existing or local:
                raise ValueError(f'{name}: v{target} already exists; never retag or overwrite a release')
            p = self.patch(name)
            if p:
                patch_files(p)
                command(['git', 'apply', '--check', str(p.resolve())], repo)
            self.state['projects'][name] = {'initial_sha': self.sha(name), 'version': target, 'phase': 'planned',
                                             'patch_sha256': hashlib.sha256(p.read_bytes()).hexdigest() if p else None}

    def plan(self):
        print('\nRelease order (existing GitHub Actions publish the registries):')
        for name in NAMES:
            item = self.state['projects'][name]
            print(f"  {name}: v{item['version']} [{item['phase']}]")
        print('First the two companions; then refresh the latest published packages, rebuild, test and release StemLab.')
        print('No force-push, moved tag, credentials change, automatic merge or deployment-protection change.')
        print('The final check requires all four Arcadians pages and HTTP/audio validation, not just a green tag job.\n')

    def wait_runs(self, name, sha, branch, required):
        deadline = time.monotonic() + self.timeout
        previous = None
        while time.monotonic() < deadline:
            data = self.api(name, f'actions/runs?head_sha={sha}&event=push&per_page=100&page=1')
            all_runs = list(data.get('workflow_runs', []))
            for page in range(2, (data.get('total_count', 0) + 99) // 100 + 1):
                all_runs.extend(self.api(name, f'actions/runs?head_sha={sha}&event=push&per_page=100&page={page}').get('workflow_runs', []))
            runs = select_runs(all_runs, sha, branch)
            current = tuple(sorted((key, run['id'], run['status'], run.get('conclusion')) for key, run in runs.items()))
            if current != previous:
                print(name, branch, current, flush=True)
                previous = current
            failed = [run for run in runs.values() if run['status'] == 'completed' and run.get('conclusion') != 'success']
            if failed:
                for run in failed:
                    print('Failed workflow:', run['html_url'], flush=True)
                raise RuntimeError('CI/CD failed or was cancelled. Inspect the failed job, fix it and rerun the appropriate jobs; never bypass the gate. State is retained for -Resume.')
            if required <= runs.keys() and all(run['status'] == 'completed' and run.get('conclusion') == 'success' for run in runs.values()):
                return runs
            time.sleep(15)
        raise TimeoutError(f'{name}: not all required workflows completed: {sorted(required)}. Approvals/queued jobs are not success. Use -Resume after resolving the blocker.')

    def prepare(self, name):
        repo = self.root / name
        item = self.state['projects'][name]
        if item['phase'] != 'planned':
            return
        allowed = set(VERSION_FILES[name])
        p = self.patch(name)
        if p:
            allowed |= patch_files(p)
            command(['git', 'apply', '--check', str(p.resolve())], repo)
            command(['git', 'apply', str(p.resolve())], repo)
        if name == 'DanceRudiments':
            command([sys.executable, 'tools/release_version.py', 'prepare', item['version']], repo)
            command([sys.executable, '-m', 'unittest', 'discover', '-s', 'tests/python', '-p', 'test_recording_source_eol.py', '-v'], repo)
        elif name == 'react-timeline-sequence':
            command(['npm', 'version', item['version'], '--no-git-tag-version', '--ignore-scripts'], repo)
            command(['npm', 'ci', '--ignore-scripts'], repo)
            for script in ('typecheck', 'test', 'build'):
                command(['npm', 'run', script], repo)
        else:
            allowed |= VIEWER_FILES
            legacy = repo / 'vendor/viewer-dependencies.json'
            if legacy.is_file():
                old = json.loads(legacy.read_text(encoding='utf-8'))
                allowed |= {'vendor/viewer-dependencies.json', old.get('timeline_archive', '')}
            command([sys.executable, 'scripts/configure_viewer_build.py'], repo)
            command([sys.executable, 'scripts/check_viewer_build.py', '--latest'], repo)
            with tempfile.TemporaryDirectory(prefix='stemlab-released-native-') as folder:
                command([sys.executable, '-m', 'venv', folder], repo)
                py = str(Path(folder) / ('Scripts/python.exe' if os.name == 'nt' else 'bin/python'))
                command([py, 'scripts/viewer_releases.py', 'install'], repo)
            prepare_stemlab_version(repo, item['version'])
        changed = dirty_files(repo)
        if changed - allowed:
            raise ValueError(f'{name}: unexpected files changed; not committing them: {sorted(changed - allowed)}')
        command(['git', 'add', '--', *sorted(changed)], repo)
        command(['git', 'commit', '-m', f'Prepare v{item["version"]}: released viewer integration and documentation'], repo)
        item.update(phase='prepared', sha=self.sha(name))
        self.save()

    def publish(self, name):
        repo = self.root / name
        item = self.state['projects'][name]
        tag = 'v' + item['version']
        if item['phase'] == 'prepared':
            command(['git', 'push', 'origin', 'HEAD:refs/heads/main'], repo)
            self.wait_runs(name, item['sha'], 'main', MAIN_CI[name])
            if name == 'stemlab':
                command([sys.executable, 'scripts/check_viewer_build.py', '--latest'], repo)
            if self.sha(name) != item['sha'] or dirty_files(repo):
                raise ValueError('Source changed after CI; refusing to tag it')
            remote_main = command(['git', 'ls-remote', 'origin', 'refs/heads/main'], repo, capture=True)
            if not remote_main or remote_main.split()[0] != item['sha']:
                raise ValueError('Remote main moved after CI; review it before releasing this source')
            local_tag = command(['git', 'tag', '--list', tag], repo, capture=True)
            if local_tag:
                if command(['git', 'rev-parse', f'{tag}^{{commit}}'], repo, capture=True) != item['sha']:
                    raise ValueError('Existing local tag names a different commit')
            elif name == 'DanceRudiments':
                command([sys.executable, 'tools/release_version.py', 'tag', item['version']], repo)
            else:
                command(['git', 'tag', '-a', tag, '-m', f'{name} {tag}', item['sha']], repo)
            # Save before push so an interrupted push can be retried without retagging.
            item['phase'] = 'tagged'
            self.save()
        if item['phase'] == 'tagged':
            if command(['git', 'rev-parse', f'{tag}^{{commit}}'], repo, capture=True) != item['sha']:
                raise ValueError('The local release tag changed; refusing to push or replace it')
            command(['git', 'push', 'origin', 'refs/tags/' + tag], repo)
            runs = self.wait_runs(name, item['sha'], tag, RELEASE_CI[name])
            item['release_runs'] = {key: run['id'] for key, run in runs.items()}
            self.verify_publication(name)
            item['phase'] = 'released'
            self.save()

    def verify_publication(self, name):
        item = self.state['projects'][name]
        target = item['version']
        published = self.api(name, f'releases/tags/v{target}')
        actual_sha = self.api(name, f'commits/v{target}')['sha']
        if published.get('draft') or published.get('prerelease') or actual_sha != item['sha']:
            raise ValueError('Published release does not identify the tested stable source')
        latest = self.api(name, 'releases/latest')
        if latest.get('tag_name') != 'v' + target:
            raise ValueError('The new release is not GitHub latest; review release ordering rather than silently downgrading downstream')
        # Index propagation is bounded. A partial publication is not accepted.
        deadline = time.monotonic() + 900
        while time.monotonic() < deadline:
            try:
                if name == 'react-timeline-sequence':
                    ready = registry('https://registry.npmjs.org/react-timeline-sequence/latest')['version'] == target
                elif name == 'DanceRudiments':
                    ready = (registry('https://pypi.org/pypi/dancerudiments/json')['info']['version'] == target
                             and registry('https://registry.npmjs.org/@kieransimkin%2Fdance-rudiments/latest')['version'] == target
                             and target in registry('https://api.nuget.org/v3-flatcontainer/dancerudiments/index.json')['versions'])
                else:
                    ready = registry('https://pypi.org/pypi/danceflow-stemlab/json')['info']['version'] == target
                if ready:
                    return
            except (OSError, KeyError, ValueError) as exc:
                print('Registry not ready:', type(exc).__name__, flush=True)
            time.sleep(15)
        raise TimeoutError(f'{name}: registry publication/version did not verify; do not release downstream against unpublished code')

    def verify_pages(self):
        item = self.state['projects']['stemlab']
        run_id = item['release_runs']['release.yml']
        jobs = self.api('stemlab', f'actions/runs/{run_id}/jobs?per_page=100')['jobs']
        required = 'Publish Arcadians timeline and movement comparison to Pages'
        matches = [job for job in jobs if job['name'] == required]
        if len(matches) != 1 or matches[0]['conclusion'] != 'success':
            raise RuntimeError('Pages deployment was skipped or failed; a green package release is not a live demo')
        with tempfile.TemporaryDirectory(prefix='stemlab-released-pages-') as folder:
            site, qa = Path(folder) / 'site', Path(folder) / 'qa'
            repo = self.root / 'stemlab'
            for artifact, destination in [('stemlab-arcadians-pages', site), ('stemlab-arcadians-browser-qa', qa)]:
                command(['gh', 'run', 'download', str(run_id), '--repo', f'{OWNER}/stemlab',
                         '--name', artifact, '--dir', str(destination)], repo)
            command([sys.executable, 'scripts/publish_arcadians_pages.py', 'verify', '--site', str(site),
                     '--qa', str(qa / 'arcadians-audio-browser.json'), '--source-sha', item['sha']], repo)
            command([sys.executable, 'scripts/publish_arcadians_pages.py', 'live', '--site', str(site),
                     '--url', f'https://{OWNER}.github.io/stemlab/', '--source-sha', item['sha']], repo)
        self.state['complete'] = True
        self.save()
        print('Release workflows, public registries, four Arcadians pages and seekable audio verified. Browser synchronization evidence was generated in CI; this does not claim subjective listening QA.')

    def execute(self):
        if not self.args.resume:
            self.save()
        if self.state['complete']:
            print('This release session is already complete. No tags or packages were recreated.')
            return
        for name in NAMES:
            self.prepare(name)
            self.publish(name)
        self.verify_pages()


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--projects-root', type=Path, default=Path.cwd())
    parser.add_argument('--patch-dir', type=Path)
    parser.add_argument('--state-file', type=Path)
    parser.add_argument('--dancerudiments-version', default='')
    parser.add_argument('--timeline-version', default='')
    parser.add_argument('--stemlab-version', default='')
    parser.add_argument('--timeout-minutes', type=int, default=420)
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--resume', action='store_true')
    args = parser.parse_args(argv)
    if args.timeout_minutes < 1 or (args.resume and not args.execute):
        parser.error('Use a positive timeout; --resume also requires --execute')
    try:
        suite = ReleaseSuite(args)
        suite.preflight()
        suite.plan()
        if args.execute:
            suite.execute()
        else:
            print('Preview only. Run again with -Execute to apply the release kit, commit, push, tag and publish.')
        return 0
    except (OSError, ValueError, KeyError, RuntimeError, subprocess.CalledProcessError) as exc:
        print(f'Release stopped: {exc}', file=sys.stderr)
        print('No rollback/reset, force-push, or replacement release will be attempted. Inspect the checkout and saved session before resuming.', file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
