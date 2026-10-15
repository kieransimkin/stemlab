"""Build and lock the shared viewer updates, then rebuild StemLab's real Vite bundle.

Run after committing and pushing the companion changes. No releases, commits,
pushes, registry publications or deployment settings are changed by this script.
The small built timeline package is retained under vendor/ so npm ci on GitHub
uses the same bytes without waiting for an npm release or a mutable Git branch.
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile


ROOT = Path(__file__).resolve().parents[1]


def run(args: list[str], cwd: Path, *, capture: bool = False) -> str:
    result = subprocess.run(args, cwd=cwd, check=True, text=True,
                            stdout=subprocess.PIPE if capture else None)
    return result.stdout.strip() if capture else ''


def source_revision(path: Path, repo: str, marker_path: str, marker: str) -> str:
    if not path.is_dir():
        raise ValueError(f'Companion checkout is missing: {path}')
    remote = run(['git', 'remote', 'get-url', 'origin'], path, capture=True)
    accepted = (f'https://github.com/{repo}', f'https://github.com/{repo}.git',
                f'git@github.com:{repo}.git', f'ssh://git@github.com/{repo}.git')
    if remote.casefold() not in {s.casefold() for s in accepted}:
        raise ValueError(f'Expected the {repo} origin, got {remote}')
    if run(['git', 'status', '--porcelain', '--untracked-files=normal'], path, capture=True):
        raise ValueError(f'Commit the intended companion changes first; checkout is not clean: {path}')
    if marker not in (path / marker_path).read_text(encoding='utf-8'):
        raise ValueError(f'The required display API is missing from {repo}')
    revision = run(['git', 'rev-parse', 'HEAD'], path, capture=True)
    if not re.fullmatch('[0-9a-f]{40}', revision):
        raise ValueError('Expected a complete commit SHA')
    # A local-only revision would make Actions fail its checkout. Fetch that exact
    # object from its official origin before storing a companion pin.
    run(['git', 'fetch', '--no-tags', 'origin', revision], path)
    if run(['git', 'rev-parse', 'FETCH_HEAD'], path, capture=True) != revision:
        raise ValueError('The pinned companion revision is not available remotely')
    return revision


def configure(timeline: Path, dancerudiments: Path, root: Path = ROOT) -> dict:
    npm = shutil.which('npm')
    node = shutil.which('node')
    if not npm or not node:
        raise RuntimeError('Install Node.js 22 and npm before building the viewers')
    timeline_sha = source_revision(timeline, 'kieransimkin/react-timeline-sequence',
                                  'src/display.ts', 'TIMELINE_DISPLAY_API_VERSION = 1')
    rudiments_sha = source_revision(dancerudiments, 'kieransimkin/DanceRudiments',
                                   'python/dancerudiments_authoring/harness.py', 'HARNESS_DISPLAY_API_VERSION = 1')
    run([npm, 'ci', '--ignore-scripts'], timeline)
    run([npm, 'run', 'typecheck'], timeline)
    run([npm, 'test'], timeline)
    run([npm, 'run', 'build'], timeline)
    with tempfile.TemporaryDirectory(prefix='stemlab-viewer-package-') as temporary:
        output = Path(temporary)
        packed = json.loads(run([npm, 'pack', '--ignore-scripts', '--json', '--pack-destination', str(output)],
                                timeline, capture=True))
        if len(packed) != 1 or Path(packed[0]['filename']).name != packed[0]['filename']:
            raise ValueError('Unexpected npm pack result')
        package = output / packed[0]['filename']
        digest = hashlib.sha256(package.read_bytes()).hexdigest()
        vendor = root / 'vendor'
        vendor.mkdir(exist_ok=True)
        destination = vendor / f'react-timeline-sequence-{timeline_sha[:12]}-{digest[:12]}.tgz'
        shutil.copyfile(package, destination)
    relative = destination.relative_to(root).as_posix()
    run([npm, 'install', '--save-exact', './' + relative], root)
    run([npm, 'run', 'build:web'], root)
    run([node, '--test', 'tests/web/audio-channels.test.mjs'], root)
    bundle = (root / 'src/stemlab/web/app.js').read_text(encoding='utf-8')
    if 'rts-display-controls' not in bundle or 'rts-audio-layers' not in bundle:
        raise ValueError('The rebuilt web bundle does not contain the shared display controls')
    (root / '.github/dancerudiments-recording-ref').write_text(rudiments_sha + '\n', encoding='ascii')
    metadata = dict(schema='stemlab.viewer-dependencies.v1', timeline_commit=timeline_sha,
                    timeline_archive=relative, timeline_archive_sha256=digest,
                    dancerudiments_commit=rudiments_sha, timeline_display_api=1, harness_display_api=1)
    (root / 'vendor/viewer-dependencies.json').write_text(json.dumps(metadata, indent=2)+'\n', encoding='utf-8')
    print('Built. Review and commit package.json, package-lock.json, vendor/, the companion pin, and src/stemlab/web/app.js + timeline.css.')
    print('No files have been committed, pushed or deployed by this script.')
    return metadata


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--timeline', type=Path, required=True)
    parser.add_argument('--dancerudiments', type=Path, required=True)
    args = parser.parse_args()
    configure(args.timeline.expanduser().resolve(), args.dancerudiments.expanduser().resolve())
