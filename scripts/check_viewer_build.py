"""Cheap pre-inference guard: require a real rebuilt bundle and locked companions."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path
import re


def check(root: Path) -> None:
    metadata = json.loads((root / 'vendor/viewer-dependencies.json').read_text(encoding='utf-8'))
    if metadata.get('schema') != 'stemlab.viewer-dependencies.v1':
        raise ValueError('Unsupported viewer dependency record')
    if any(not re.fullmatch(r'[0-9a-f]{40}', str(metadata.get(key, '')))
           for key in ('timeline_commit', 'dancerudiments_commit')):
        raise ValueError('Companion revisions must be full commit SHAs')
    relative = Path(metadata['timeline_archive'])
    if relative.is_absolute() or '..' in relative.parts or (not relative.parts or relative.parts[0] != 'vendor'):
        raise ValueError('Invalid timeline archive path')
    archive = root / relative
    if hashlib.sha256(archive.read_bytes()).hexdigest() != metadata['timeline_archive_sha256']:
        raise ValueError('Timeline package bytes do not match the committed dependency record')
    pin = (root / '.github/dancerudiments-recording-ref').read_text().strip()
    if pin != metadata['dancerudiments_commit'] or pin == 'fa3395534dab0feaa8c1d861a512fc941b76bbec':
        raise ValueError('Update the companion pin to the committed bar-view build')
    dependency = json.loads((root / 'package.json').read_text())['dependencies']['react-timeline-sequence']
    if dependency != 'file:' + relative.as_posix():
        raise ValueError('npm must use the recorded timeline archive')
    bundle = (root / 'src/stemlab/web/app.js').read_text(encoding='utf-8')
    if not all(marker in bundle for marker in ('rts-display-controls', 'rts-audio-layers', 'channel height')):
        raise ValueError('Run scripts/configure_viewer_build.py and commit the genuinely rebuilt web bundle')


if __name__ == '__main__':
    check(Path(__file__).resolve().parents[1])
    print('Shared viewer dependencies and rebuilt timeline bundle verified.')
