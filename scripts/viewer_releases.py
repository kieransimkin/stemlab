"""Resolve, build and audit StemLab's latest *released* viewer dependencies.

No development-branch or vendor-tarball fallback. A synchronization resolves the
latest stable GitHub releases AND public registries, then records exact versions,
release commits and integrity values. CI checks freshness before using this
snapshot; every job in a long build consumes the same committed snapshot.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import sys
import tempfile
from urllib.parse import urlparse
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
RECORD = '.github/viewer-releases.json'
BUILD = '.github/viewer-build.json'
PIN = '.github/dancerudiments-recording-ref'
SCHEMA = 'stemlab.viewer-releases.v1'
REPOSITORIES = {'timeline': 'kieransimkin/react-timeline-sequence',
                'dancerudiments': 'kieransimkin/DanceRudiments'}
SEMVER = re.compile(r'(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\Z')
MARKERS = ('rts-display-controls', 'rts-audio-layers', 'channel height', 'rts-audition', 'Audition lyrics')


def version(value: str) -> tuple[int, int, int]:
    match = SEMVER.fullmatch(str(value))
    if not match:
        raise ValueError(f'A stable MAJOR.MINOR.PATCH version is required: {value!r}')
    return tuple(map(int, match.groups()))


def digest(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def read(path: Path) -> dict:
    return json.loads(path.read_text(encoding='utf-8'))


def write(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, indent=2, sort_keys=True) + '\n', encoding='utf-8', newline='\n')


def run(args: list[str], cwd: Path, *, capture: bool = False) -> str:
    result = subprocess.run(args, cwd=cwd, check=True, text=True, encoding='utf-8',
                            errors='replace', stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else ''


def executable(name: str) -> str:
    path = shutil.which(name + '.cmd' if os.name == 'nt' and name == 'npm' else name)
    if not path:
        raise RuntimeError(f'{name} is required; install it and restart the terminal')
    return path


def get_json(url: str) -> dict:
    host = urlparse(url).hostname
    if urlparse(url).scheme != 'https' or host not in {'api.github.com', 'registry.npmjs.org', 'pypi.org'}:
        raise ValueError('Only the official HTTPS GitHub, npm and PyPI APIs are allowed')
    headers = {'User-Agent': 'StemLab-release-verifier', 'Accept': 'application/json'}
    if host == 'api.github.com':
        token = os.environ.get('GH_TOKEN') or os.environ.get('GITHUB_TOKEN')
        if token:
            headers['Authorization'] = f'Bearer {token}'
    with urlopen(Request(url, headers=headers), timeout=45) as response:
        if urlparse(response.url).hostname != host:
            raise ValueError('Unexpected registry/API redirect')
        body = response.read(8 * 1024 * 1024 + 1)
    if len(body) > 8 * 1024 * 1024:
        raise ValueError('Registry/API metadata is unexpectedly large')
    value = json.loads(body)
    if not isinstance(value, dict):
        raise ValueError('Registry/API metadata must be a JSON object')
    return value


def release(repo: str, fetch=get_json) -> dict:
    data = fetch(f'https://api.github.com/repos/{repo}/releases/latest')
    tag = data.get('tag_name', '')
    if data.get('draft') is not False or data.get('prerelease') is not False or not tag.startswith('v'):
        raise ValueError(f'{repo}: latest must be a published stable vX.Y.Z release')
    version(tag[1:])
    commit = fetch(f'https://api.github.com/repos/{repo}/commits/{tag}').get('sha', '')
    if not re.fullmatch('[0-9a-f]{40}', commit):
        raise ValueError(f'{repo}: release tag did not resolve to a commit')
    return {'repository': repo, 'tag': tag, 'version': tag[1:], 'commit': commit}


def resolve(fetch=get_json) -> dict:
    timeline = release(REPOSITORIES['timeline'], fetch)
    native = release(REPOSITORIES['dancerudiments'], fetch)
    npm = fetch('https://registry.npmjs.org/react-timeline-sequence/latest')
    pypi = fetch('https://pypi.org/pypi/dancerudiments/json')
    if npm.get('name') != 'react-timeline-sequence' or npm.get('version') != timeline['version']:
        raise ValueError('Latest timeline GitHub release and npm latest disagree. Finish its Release workflow; do not use main or a vendor archive.')
    if pypi.get('info', {}).get('version') != native['version']:
        raise ValueError('Latest DanceRudiments GitHub release and PyPI disagree. Finish Release packages before releasing StemLab.')
    # These are the earliest possible new stable versions after the pre-display releases.
    if version(timeline['version']) < (0, 2, 3) or version(native['version']) < (0, 2, 5):
        raise ValueError('Publish fresh companion releases containing the display APIs before updating StemLab')
    timeline['tarball'] = npm.get('dist', {}).get('tarball', '')
    timeline['integrity'] = npm.get('dist', {}).get('integrity', '')
    native['wheels'] = {f['filename']: f.get('digests', {}).get('sha256', '')
                        for f in pypi.get('urls', [])
                        if f.get('packagetype') == 'bdist_wheel' and not f.get('yanked', False)}
    value = {'schema': SCHEMA, 'policy': 'latest-stable', 'timeline': timeline, 'dancerudiments': native}
    validate_record(value)
    return value


def validate_record(info: dict) -> None:
    if info.get('schema') != SCHEMA or info.get('policy') != 'latest-stable':
        raise ValueError('Unsupported released-viewer dependency record')
    for key, repo in REPOSITORIES.items():
        item = info.get(key, {})
        version(item.get('version', ''))
        if item.get('repository') != repo or item.get('tag') != 'v' + item['version']:
            raise ValueError('Dependency must name its official stable release')
        if not re.fullmatch('[0-9a-f]{40}', str(item.get('commit', ''))):
            raise ValueError('Release commits must be full SHAs, not mutable branches')
    if version(info['timeline']['version']) < (0, 2, 3) or version(info['dancerudiments']['version']) < (0, 2, 5):
        raise ValueError('Selected releases predate the required display APIs')
    timeline = info['timeline']
    expected = f"https://registry.npmjs.org/react-timeline-sequence/-/react-timeline-sequence-{timeline['version']}.tgz"
    if timeline.get('tarball') != expected:
        raise ValueError('Timeline must come from the public npm registry, not file:, git: or a mirror')
    integrity = timeline.get('integrity', '')
    try:
        if not integrity.startswith('sha512-') or len(base64.b64decode(integrity[7:], validate=True)) != 64:
            raise ValueError('bad integrity')
    except (ValueError, TypeError) as exc:
        raise ValueError('npm SHA-512 integrity is required') from exc
    wheels = info['dancerudiments'].get('wheels', {})
    prefix = 'dancerudiments-' + info['dancerudiments']['version'] + '-'
    if not isinstance(wheels, dict) or not wheels or any(not name.startswith(prefix)
                         or not re.fullmatch(r'dancerudiments-[A-Za-z0-9_.+-]+\.whl', name)
                         or not re.fullmatch('[0-9a-f]{64}', str(sha)) for name, sha in wheels.items()):
        raise ValueError('Non-yanked published wheel filenames and SHA-256 digests are required')


def source_hashes(root: Path) -> dict:
    files = [root / 'package.json', root / 'package-lock.json']
    files.extend(p for p in (root / 'web-client').rglob('*') if p.is_file()
                 and p.suffix in {'.js', '.jsx', '.ts', '.tsx', '.css', '.json', '.mjs'})
    return {p.relative_to(root).as_posix(): digest(p.read_bytes().replace(b'\r\n', b'\n'))
            for p in sorted(files)}


def verify_lock(root: Path, info: dict) -> None:
    requested = read(root / 'package.json')['dependencies']['react-timeline-sequence']
    lock = read(root / 'package-lock.json')
    installed = lock.get('packages', {}).get('node_modules/react-timeline-sequence', {})
    item = info['timeline']
    if requested != item['version'] or installed.get('version') != item['version']:
        raise ValueError('npm dependency/lock is stale; run python scripts/configure_viewer_build.py')
    if lock.get('packages', {}).get('', {}).get('dependencies', {}).get('react-timeline-sequence') != requested:
        raise ValueError('npm lock root does not match package.json')
    if installed.get('resolved') != item['tarball'] or installed.get('integrity') != item['integrity']:
        raise ValueError('npm lock must preserve the exact published package URL and SHA-512 integrity')


def check(root: Path = ROOT, *, latest: bool = False, fetch=get_json) -> dict:
    if not (root / RECORD).is_file():
        raise ValueError('Released viewer metadata is missing. Release both companions, then run python scripts/configure_viewer_build.py')
    info = read(root / RECORD)
    validate_record(info)
    verify_lock(root, info)
    if (root / PIN).read_text(encoding='ascii').strip() != info['dancerudiments']['commit']:
        raise ValueError('The harness checkout pin must be the selected RELEASE commit')
    project = (root / 'pyproject.toml').read_text(encoding='utf-8')
    required = f'rudiments = ["dancerudiments>={info["dancerudiments"]["version"]}"]'
    if required not in project:
        raise ValueError('Optional rudiments minimum must match the selected stable release')
    bundle = root / 'src/stemlab/web/app.js'
    css = root / 'src/stemlab/web/timeline.css'
    if not all(marker in bundle.read_text(encoding='utf-8') for marker in MARKERS):
        raise ValueError('The genuinely rebuilt frontend is missing display controls')
    built = read(root / BUILD)
    if built.get('schema') != 'stemlab.viewer-build.v1' or built.get('dependencies') != info:
        raise ValueError('Rebuild the frontend against the selected released packages')
    expected_hashes = {str(p.relative_to(root).as_posix()): digest(p.read_bytes()) for p in (bundle, css)}
    if built.get('outputs') != expected_hashes or built.get('sources') != source_hashes(root):
        raise ValueError('Frontend sources, lock or built outputs changed after the recorded build')
    if latest and resolve(fetch) != info:
        raise ValueError('A newer stable viewer release is available. Run python scripts/configure_viewer_build.py and commit the rebuilt assets before CI/release.')
    return info


def synchronize(root: Path = ROOT, *, fetch=get_json, runner=run, if_needed: bool = False) -> dict:
    info = resolve(fetch)
    if if_needed:
        try:
            if check(root) == info:
                return info
        except (OSError, ValueError, KeyError):
            pass
    npm = executable('npm')
    node = executable('node')
    runner([npm, 'install', '--save-exact', f"react-timeline-sequence@{info['timeline']['version']}",
            '--registry=https://registry.npmjs.org/'], root)
    verify_lock(root, info)
    # Check what was installed, not a marker copied into the consuming app.
    module = root / 'node_modules/react-timeline-sequence/dist/index.js'
    installed = read(root / 'node_modules/react-timeline-sequence/package.json')
    if installed.get('version') != info['timeline']['version'] or not all(
            symbol in module.read_text(encoding='utf-8') for symbol in
            ('TIMELINE_DISPLAY_API_VERSION', 'TIMELINE_LYRIC_AUDITION_API_VERSION')):
        raise ValueError('Published timeline package does not export the required display API')
    runner([npm, 'run', 'build:web'], root)
    runner([node, '--test', 'tests/web/audio-channels.test.mjs', 'tests/web/lyric-audition.test.mjs'], root)
    bundle = root / 'src/stemlab/web/app.js'
    css = root / 'src/stemlab/web/timeline.css'
    if not all(marker in bundle.read_text(encoding='utf-8') for marker in MARKERS):
        raise ValueError('Build did not produce the shared display controls')
    # Keep the optional feature optional. A fresh install selects the latest stable
    # distribution; CI explicitly installs the verified snapshot to avoid races.
    project = root / 'pyproject.toml'
    text, count = re.subn(r'^rudiments\s*=\s*\[[^\n]*\]',
                         f'rudiments = ["dancerudiments>={info["dancerudiments"]["version"]}"]',
                         project.read_text(encoding='utf-8'), flags=re.MULTILINE)
    if count != 1:
        raise ValueError('Expected one optional rudiments dependency in pyproject.toml')
    project.write_text(text, encoding='utf-8', newline='\n')
    (root / PIN).write_text(info['dancerudiments']['commit'] + '\n', encoding='ascii', newline='\n')
    write(root / RECORD, info)
    write(root / BUILD, {'schema': 'stemlab.viewer-build.v1', 'dependencies': info,
                        'sources': source_hashes(root),
                        'outputs': {p.relative_to(root).as_posix(): digest(p.read_bytes()) for p in (bundle, css)}})
    # Remove only the old helper's identified, unchanged generated archive.
    old_record = root / 'vendor/viewer-dependencies.json'
    if old_record.is_file():
        old = read(old_record)
        relative = Path(old.get('timeline_archive', ''))
        if old.get('schema') != 'stemlab.viewer-dependencies.v1' or relative.parent != Path('vendor'):
            raise ValueError('Unexpected vendor metadata; review it before removing the old build route')
        archive = root / relative
        if archive.exists():
            if digest(archive.read_bytes()) != old.get('timeline_archive_sha256'):
                raise ValueError('Old vendor package changed; refusing to delete it')
            archive.unlink()
        old_record.unlink()
    check(root)
    return info


def install_native(root: Path = ROOT, *, python: str = sys.executable, runner=run) -> None:
    info = check(root)
    native = info['dancerudiments']
    with tempfile.TemporaryDirectory(prefix='stemlab-release-wheel-') as folder:
        target = Path(folder)
        runner([python, '-m', 'pip', 'download', '--only-binary=:all:', '--no-deps',
                '--index-url', 'https://pypi.org/simple', '--dest', folder,
                'dancerudiments==' + native['version']], root)
        wheels = list(target.glob('*.whl'))
        if len(wheels) != 1 or native['wheels'].get(wheels[0].name) != digest(wheels[0].read_bytes()):
            raise ValueError('Downloaded native wheel does not match the selected PyPI release digest')
        runner([python, '-m', 'pip', 'install', '--no-deps', '--force-reinstall', str(wheels[0])], root)
    code = (
        'import importlib.metadata as m; import importlib.machinery as machinery; '
        'import dancerudiments as d; '
        'from dancerudiments_authoring.harness import HARNESS_DISPLAY_API_VERSION; '
        f'assert m.version("dancerudiments") == {native["version"]!r}; '
        'assert str(d.__file__).endswith(tuple(machinery.EXTENSION_SUFFIXES)); '
        'assert d.PIPS_PER_BEAT == 64; assert hasattr(d,"SampledRecording"); '
        'assert HARNESS_DISPLAY_API_VERSION == 1; print("Published native recording/display APIs verified")'
    )
    runner([python, '-c', code], root)


def outputs(info: dict, path: Path) -> None:
    validate_record(info)
    # All values have been constrained before being placed into GITHUB_OUTPUT.
    with path.open('a', encoding='utf-8', newline='\n') as stream:
        stream.write(f'ref={info["dancerudiments"]["commit"]}\nversion={info["dancerudiments"]["version"]}\n')
        stream.write(f'tag={info["dancerudiments"]["tag"]}\ntimeline_version={info["timeline"]["version"]}\n')


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['resolve', 'sync', 'check', 'install'])
    parser.add_argument('--latest', action='store_true', help='Reject a snapshot older than the latest published stable releases')
    parser.add_argument('--if-needed', action='store_true')
    parser.add_argument('--outputs', type=Path)
    args = parser.parse_args(argv)
    try:
        if args.command == 'resolve':
            info = resolve()
        elif args.command == 'sync':
            info = synchronize(if_needed=args.if_needed)
        else:
            info = check(latest=args.latest)
            if args.command == 'install':
                install_native()
        if args.outputs:
            outputs(info, args.outputs)
        print(json.dumps(info, indent=2))
        return 0
    except (OSError, ValueError, KeyError, RuntimeError, subprocess.CalledProcessError) as exc:
        print(f'Released viewer check failed: {exc}', file=sys.stderr)
        return 1


if __name__ == '__main__':
    raise SystemExit(main())
