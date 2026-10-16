"""Lossless static delivery of native recording documents; no sampling/DSP changes."""
from __future__ import annotations

import gzip
import hashlib
import json
from pathlib import Path
import re

PAYLOAD = re.compile(r'(<script type="application/json" id="data">)(.*?)(</script>)', re.S)


def read_recording(path: Path) -> dict:
    # Native objects still enforce the shared value budget. The 128-D full-song
    # text can exceed the native file loader's separate 64 MiB transport limit.
    opener = gzip.open if path.suffix == '.gz' else open
    with opener(path, 'rb') as stream:
        raw = stream.read(90*1024*1024+1)
    if len(raw) > 90*1024*1024:
        raise ValueError('Recording download exceeds 90 MiB decoded budget')
    return json.loads(raw)


def compress_downloads(view: Path, harness: dict, *, enabled=True) -> dict:
    """Retain the released renderer and update only payload download paths/hashes."""
    if not enabled:
        return harness
    from dancerudiments_authoring.recording import canonical_json
    page = view.read_text(encoding='utf-8')
    payload = json.loads(PAYLOAD.search(page)[2])
    for pattern in payload['pack']['patterns']:
        path = view.parent/pattern['recording_path']
        document = read_recording(path)
        compressed = path.with_suffix(path.suffix+'.gz')
        with compressed.open('xb') as stream:
            with gzip.GzipFile(filename='', mode='wb', fileobj=stream, mtime=0, compresslevel=9) as packed:
                packed.write(path.read_bytes())
        if read_recording(compressed) != document:
            raise ValueError('Compressed native recording changed')
        path.unlink()
        pattern['recording_path'] += '.gz'
        descriptor = {k: v for k, v in pattern.items() if k != 'source_sha256'}
        pattern['source_sha256'] = hashlib.sha256(canonical_json([payload['clock'], descriptor]).encode()).hexdigest()
    payload['pack_sha256'] = hashlib.sha256(canonical_json(payload['pack']).encode()).hexdigest()
    encoded = json.dumps(payload, ensure_ascii=True, separators=(',', ':'), allow_nan=False).replace('</', '<\\/')
    page = PAYLOAD.sub(lambda match: match[1]+encoded+match[3], page, count=1)
    view.write_text(page, encoding='utf-8')
    harness.update(pack_sha256=payload['pack_sha256'], html_sha256=hashlib.sha256(view.read_bytes()).hexdigest())
    return harness
