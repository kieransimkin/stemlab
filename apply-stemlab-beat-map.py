#!/usr/bin/env python3
"""Apply a focused, reviewable StemLab editable-beat-timeline patch.

Runs on Windows/Linux, tolerates LF and CRLF, refuses ambiguous contexts, leaves
existing work intact, and never invokes Git or modifies DanceMoves. CI needs the
real React/Vite build; run npm ci && npm run build:web after applying.

Usage:
  python apply-stemlab-beat-map.py --check
  python apply-stemlab-beat-map.py
  npm ci && npm run build:web
  git diff --check && git status --short
"""
from __future__ import annotations

import argparse
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent
PROJECT = Path.cwd()
NEW = ROOT / 'new'

API_ROUTES = '''    @app.get("/api/{song_hash}/beat-timeline")
    async def read_beat_timeline(song_hash: str) -> dict[str, Any]:
        """Saved corrections or exact consensus anchors, never rewritten evidence."""
        from .beat_map import read_or_seed
        try:
            song_hash = _normalise_hash(song_hash)
        except ValueError as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        root = (results_dir_provider() / song_hash).resolve()
        if not root.is_dir():
            raise HTTPException(status_code=404, detail="analysis not found")
        try:
            document, saved, revision = await asyncio.to_thread(read_or_seed, root, song_hash)
        except (ValueError, OSError, KeyError, TypeError, json.JSONDecodeError) as exc:
            # While analysis is in progress consensus may not exist yet.
            return {"available": False, "reason": str(exc), "map": None,
                    "saved": False, "revision": None}
        return {"available": True, "map": document, "saved": saved, "revision": revision}

    async def _beat_json_body(request: Request) -> dict[str, Any]:
        from .beat_map import MAX_JSON_BYTES
        body = await request.body()
        if len(body) > MAX_JSON_BYTES:
            raise HTTPException(status_code=413, detail="Beat timeline exceeds 32 MiB")
        try:
            payload = json.loads(body)
        except (UnicodeDecodeError, json.JSONDecodeError) as exc:
            raise HTTPException(status_code=400, detail="Expected UTF-8 JSON") from exc
        if not isinstance(payload, dict):
            raise HTTPException(status_code=400, detail="Beat timeline JSON must be an object")
        return payload

    @app.post("/api/{song_hash}/beat-timeline/preview")
    async def preview_beat_timeline(song_hash: str, request: Request) -> dict[str, Any]:
        """Authoritative validation and single-document export, without saving."""
        from .beat_map import preview
        try:
            song_hash = _normalise_hash(song_hash)
            root = (results_dir_provider() / song_hash).resolve()
            if not root.is_dir():
                raise FileNotFoundError('analysis not found')
            payload = await _beat_json_body(request)
            return await asyncio.to_thread(preview, root, song_hash, payload)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        except (ValueError, OSError, TypeError, KeyError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc

    @app.put("/api/{song_hash}/beat-timeline")
    async def update_beat_timeline(song_hash: str, request: Request) -> dict[str, Any]:
        """Atomic separate correction file with optimistic edit revision guard."""
        from .beat_map import save
        try:
            song_hash = _normalise_hash(song_hash)
            root = (results_dir_provider() / song_hash).resolve()
            if not root.is_dir():
                raise FileNotFoundError('analysis not found')
            payload = await _beat_json_body(request)
            if not isinstance(payload.get('map'), dict):
                raise ValueError('The map must be a beat-timeline JSON object')
            expected = payload.get('expected_revision')
            if expected is not None and (not isinstance(expected, str)
                                         or not _HASH_RE.fullmatch(expected)):
                raise ValueError('Expected revision must be a SHA-256 or null')
            document, revision = await asyncio.to_thread(
                save, root, song_hash, payload['map'], expected)
        except FileNotFoundError as exc:
            raise HTTPException(status_code=404, detail=str(exc)) from exc
        except FileExistsError as exc:
            raise HTTPException(status_code=409, detail=str(exc)) from exc
        except (ValueError, OSError, TypeError, KeyError) as exc:
            raise HTTPException(status_code=400, detail=str(exc)) from exc
        if socketio_server is not None:
            await socketio_server.emit('beat_timeline_saved',
                {'hash': song_hash, 'revision': revision}, room=song_hash)
        return {'map': document, 'revision': revision, 'saved': True}

'''

README = '''## Correct beats and export variable-tempo synchronisation

The timeline now includes a **Beat correction** editor, automatically seeded at
all exact **consensus beat** sample frames. Drag beats individually against the
master/stem waveform, nudge at single-sample precision, insert missing beats,
edit the **local BPM envelope**, inspect the **phase CV curve**, shift global
phase, and explicitly select the anchor for **Beat 1**. The original detector
output is never modified. Corrections live separately at
`timing/beat-timeline.json` with undo/redo and revision-safe saving.

**Export Beat 1 + full beat timeline JSON** downloads **one** versioned
`stemlab.beat-timeline.v1` object containing every corrected beat, locally
varying BPM intervals, original master/consensus hashes, `beat_1_start_seconds`,
`beat_1_start_pips` and the signed `sync_phase_offset_pips` (plus DanceMoves
16-tick conversions). The viewer also supports copying this whole JSON value,
importing previously edited versions, and restoring original consensus anchors.
Export preserves irregular timing; no constant tempo approximation is substituted.

**DanceMoves compatibility:** the existing WordPress `beat-alignment.v1`
importer is **constant BPM only** and rejects this schema. To drive variable
rhythm in DanceMoves, add the corresponding `beat-timeline.v1` import/scheduler
support (including WordPress exact-audio hash checks) before pasting/using it.
The old beat-offset handoff remains available for true constant-BPM songs.

Read [editable beat timelines, schemas and consumer requirements](docs/beat-timeline.md).
Rebuild `src/stemlab/web/app.js` and `timeline.css` from the unchanged published
React timeline dependency after applying source changes:
`npm ci && npm run build:web`; check in both outputs with the source.

'''

DOC_SHORT = '''\n## Editable nonuniform beat correction

The browser's Beat correction lanes make an independent source-frame-accurate
beat map: the default anchors are the **real consensus beats at their original
timestamps**, without a constant BPM fit, and the local BPM/phase envelopes
preserve tempo changes and intentional irregularity. Editors can drag, nudge,
insert or remove anchors, define Beat 1, undo/redo, and restore consensus. The
original detector evidence and all source/lyric/cue timestamps are immutable.

Export one `stemlab.beat-timeline.v1` JSON document with the complete corrected
beats, interval BPMs, signed sync phase/Beat 1 start pips, 16-tick conversion,
source and consensus SHA-256 identities. See [beat timeline guide](beat-timeline.md).
DanceMoves' current `beat-alignment.v1` importer is fixed-tempo only; a
versioned DanceMoves consumer update is required to use the full irregular map.
'''

AGENTS_APPEND = '''\n## User-edited variable tempo and Beat 1 alignment\n\nThe corrected beat timeline (`stemlab.beat-timeline.v1`) preserves all original\nconsensus detector timestamps as read-only evidence and places any user edits in\n`timing/beat-timeline.json`. Clock corrections use exact source sample frames,\nstrictly ordered beat indices, 64 pips/beat, and integrated piecewise phase.\nThe first-beat sync phase offset is **signed**, may be fractional, and must not\nbe rounded to integer pips (or 16-tick DanceMoves units) silently. Keep audio,\nlyric/cue and recording time on the untouched original source clock. New web\nfeatures use the released shared timeline's custom lane API; rebuild/commit its\nreal compiled assets. DanceMoves 3.3.x only understands constant-tempo beat\nalignment v1: never mislabel an irregular v1 timeline as that older schema.\n'''


def modifications() -> dict[str, list[tuple[str, str]]]:
    return {
        'src/stemlab/webui.py': [
            ('from .analysis.beat_offsets import timeline_beat_offsets\n',
             'from .analysis.beat_offsets import timeline_beat_offsets\n'),
            ('            "canonical": "GET/PUT /api/{sha256}/canonical",',
             '            "canonical": "GET/PUT /api/{sha256}/canonical",\n'
             '            "beat_timeline": "GET/PUT /api/{sha256}/beat-timeline",\n'
             '            "beat_timeline_export": "POST /api/{sha256}/beat-timeline/preview",'),
            ('    @app.get("/api/{song_hash}/canonical")\n',
             API_ROUTES + '    @app.get("/api/{song_hash}/canonical")\n'),
        ],
        'web-client/src/app.jsx': [
            ('import { BeatOffsetControls } from "./beat-offset-controls.jsx";\n',
             'import { BeatOffsetControls } from "./beat-offset-controls.jsx";\n'
             'import { useBeatMapEditor } from "./beat-map-editor.jsx";\n'),
            ('  const [duration, setDuration] = useState(0);',
             '  const [duration, setDuration] = useState(0);\n'
             '  const beatEditor = useBeatMapEditor(hash, duration);'),
            ('  const allLanes = [...gridLanes, ...references.lanes, ...[...displayLanes]',
             '  const allLanes = [...gridLanes, ...beatEditor.lanes, ...references.lanes, ...[...displayLanes]'),
            ('    grid={comparison.grid}',
             '    grid={[...comparison.grid, ...beatEditor.grid]}'),
            ('    onDurationChange={setDuration}',
             '    onDurationChange={setDuration}\n'
             '    onWindowChange={beatEditor.onWindowChange}\n'
             '    onTimeChange={beatEditor.onTimeChange}'),
            ('    footer={<><BeatOffsetControls comparison={comparison} onBasis={setGridBasis} onAnalysis={setGridAnalysis} />',
             '    footer={<><BeatOffsetControls comparison={comparison} onBasis={setGridBasis} onAnalysis={setGridAnalysis} />{beatEditor.panel}'),
        ],
        'README.md': [
            ('## First-beat alignment and tempo families\n', README + '## First-beat alignment and tempo families\n'),
        ],
        '.github/workflows/ci.yml': [
            ('      - run: node --test tests/web/audio-channels.test.mjs tests/web/beat-offsets.test.mjs',
             '      - run: node --test tests/web/audio-channels.test.mjs tests/web/beat-offsets.test.mjs tests/web/beat-map.test.mjs'),
        ],
    }


def prepare(check: bool) -> None:
    if not (PROJECT/'AGENTS.md').is_file() or not (PROJECT/'web-client/src/app.jsx').is_file():
        raise SystemExit('Run this script from the StemLab repository root')
    originals: dict[Path, tuple[bytes, str]] = {}
    replacements: dict[Path, bytes] = {}
    errors: list[str] = []
    for filename, tasks in modifications().items():
        path = PROJECT/filename
        if not path.is_file():
            errors.append(f'Missing existing file: {filename}')
            continue
        raw = path.read_bytes()
        crlf = b'\r\n' in raw
        source = raw.decode('utf-8').replace('\r\n','\n')
        before = source
        for old, new in tasks:
            if old == new:
                continue
            found = source.count(old)
            if found == 1:
                source = source.replace(old,new)
            elif found == 0 and new in source:
                errors.append(f'Already present in {filename}: {new[:65]!r}')
            else:
                errors.append(f'Expected one context in {filename}, found {found}: {old[:65]!r}')
        if source != before:
            replacements[path] = source.replace('\n','\r\n').encode('utf-8') if crlf else source.encode('utf-8')
            originals[path] = (raw, filename)
    for filename, addition in [('docs/beat-offsets.md', DOC_SHORT),
                               ('docs/viewer-controls.md', DOC_SHORT),
                               ('AGENTS.md', AGENTS_APPEND)]:
        path=PROJECT/filename
        if not path.is_file():
            errors.append(f'Missing existing file: {filename}')
            continue
        data=path.read_bytes(); crlf=b'\r\n' in data
        text=data.decode('utf-8').replace('\r\n','\n')
        if addition in text or '## User-edited variable tempo and Beat 1 alignment' in text and filename=='AGENTS.md':
            errors.append(f'Already present in {filename}')
        else:
            final=text.rstrip('\n')+'\n'+addition
            replacements[path]=final.replace('\n','\r\n').encode('utf8') if crlf else final.encode('utf8')
    created: dict[Path,bytes] = {}
    for file in sorted(NEW.rglob('*')):
        if not file.is_file() or any(x in {'.pytest_cache', '__pycache__'} for x in file.parts) or file.suffix=='.pyc':
            continue
        rel=file.relative_to(NEW)
        target=PROJECT/rel
        if target.exists():
            errors.append(f'Output already exists: {rel}')
        else:
            created[target]=file.read_bytes()
    if errors:
        for line in errors:print('ERROR:',line,file=sys.stderr)
        raise SystemExit('No files were modified. Resolve conflicts in your checkout before retrying.')
    if check:
        print('Validation passed:',len(replacements),'existing files and',len(created),'new files will be updated.')
        return
    # Only write after ALL contexts/paths have been checked: no half-applied patch.
    for path,body in {**replacements,**created}.items():
        path.parent.mkdir(parents=True,exist_ok=True)
        path.write_bytes(body)
        print('Patched',path.relative_to(PROJECT))
    print('\nRun: npm ci && npm run build:web')
    print('Run: python -m pytest tests/test_beat_map.py tests/test_web_frontend.py')
    print('Run: node --test tests/web/beat-map.test.mjs tests/web/beat-offsets.test.mjs')
    print('Review: git diff --check && git status --short')
    print('Commit the rebuilt app.js and timeline.css alongside the Python/JS source.')
    print('DanceMoves requires a separate beat-timeline.v1 consumer update.')


if __name__ == '__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--check',action='store_true',help='Validate every edit without writing files')
    args=parser.parse_args()
    prepare(args.check)
