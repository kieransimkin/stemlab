"""Portable, read-only exports of StemLab's existing React timeline.

Materialize the viewer's small GET API as static JSON/images/audio. The exported
bundle retains the renderer and transport; only its legacy root-relative URL
literals and inventory polling are adapted. No server, service worker, neural
inference or replacement timeline engine is installed in the exported site.
"""
from __future__ import annotations

import hashlib
import html
import json
import math
from pathlib import Path
import re
import shutil
import tempfile

WEB_ROOT = Path(__file__).with_name('web')
MAX_BYTES = 480 * 1024 * 1024
MAX_FILE_BYTES = 90 * 1024 * 1024
AUDIO = {'.wav', '.flac', '.mp3', '.ogg', '.opus', '.m4a', '.aif', '.aiff'}
JSON_FILES = {'analysis.json', 'canonical.json', 'speech/whisper.json',
              'speech/speech_regions.json', 'deep/summary.json', 'vamp/report.json'}
JSON_DIRS = ('beats/', 'vamp/data/', 'deep/structure/', 'deep/song_map/',
             'deep/harmony/', 'deep/lyrics/', 'deep/sonic/', 'deep/rhythm/',
             'deep/semantic_text/', 'deep/semantic_audio/', 'deep/loops/')


def digest(path: Path) -> str:
    value = hashlib.sha256()
    with path.open('rb') as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b''):
            value.update(chunk)
    return value.hexdigest()


def read_json(path: Path):
    return json.loads(path.read_text(encoding='utf-8'))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, allow_nan=False,
                               separators=(',', ':')) + '\n', encoding='utf-8')


def safe_file(root: Path, relative: str) -> Path:
    """Reject absolute paths, hidden names and symlinks, including parent symlinks."""
    if (not isinstance(relative, str) or not relative or '\\' in relative
            or relative.startswith('/') or re.match(r'^[A-Za-z]:', relative)
            or any(not p or p.startswith('.') for p in relative.split('/'))):
        raise ValueError('Unsafe public artifact path')
    path = root
    for part in relative.split('/'):
        path = path / part
        if path.is_symlink():
            raise ValueError('Public export refuses symlinks')
    if not path.resolve().is_relative_to(root.resolve()) or not path.is_file():
        raise ValueError('Missing public artifact: ' + relative)
    return path


def public_value(value, root: Path):
    """Preserve evidence but remove machine paths, configuration and tracebacks."""
    if isinstance(value, dict):
        return {str(k): public_value(v, root) for k, v in value.items()
                if k not in {'traceback', 'original_path', 'config', 'environment',
                             'generator', 'backend_python'}}
    if isinstance(value, list):
        return [public_value(v, root) for v in value]
    if isinstance(value, float) and not math.isfinite(value):
        return None
    if isinstance(value, str):
        # Absolute paths inside this analysis become relative artifact references.
        # pathlib uses backslashes on Windows; return portable relative references.
        prefix = root.resolve().as_posix() + '/'
        portable = value.replace('\\', '/')
        if portable.startswith(prefix):
            return portable[len(prefix):]
        if value.startswith(('/', '\\')) or re.match(r'^[A-Za-z]:[\\/]', value):
            return '[local path omitted]'
    return value


def adapt_bundle(source: str) -> tuple[str, int]:
    """Relocate URI literals, not React or playback code; fail on contract drift.

    Vite's checked-in readable ES module has template URLs for /api/H/... and
    /H/artifact. Keeping this build adapter here avoids a second frontend source
    tree. A browser gate verifies every actual request at a nested Pages prefix.
    """
    pattern = r'`/(?:api/\$\{|\$\{)[^`\n]+`'
    result, count = re.subn(pattern, lambda m: 'window.__stemlabStatic.url(' + m[0] + ')', source)
    if count < 10 or 'TimelineSequence' not in source and 'rts-scroller' not in source:
        raise ValueError('Unsupported timeline bundle; update the static URL adapter and browser tests')
    result = result.replace('fetch("/assets/arcadians-reference.json",',
                            'fetch(window.__stemlabStatic.url("/assets/arcadians-reference.json"),')
    # Frozen snapshots never need inventory/loop polling. React's scheduling is
    # untouched; these window-qualified timers belong to the evidence adapters.
    result = result.replace('window.setInterval(', 'window.__stemlabStatic.interval(')
    result = result.replace('window.setTimeout(', 'window.__stemlabStatic.timeout(')
    result = result.replace('new URLSearchParams(location.search)',
                            'new URLSearchParams(window.__stemlabStatic.search)')
    result = result.replace('"polling"', '"static"').replace(
        'Socket.IO browser client unavailable; timeline inventory polling remains active.',
        'Published read-only analysis snapshot. No server or model download is required.')
    return result, count


def export_timeline(results: Path, output: Path, *, include_audio: bool = False,
                    source_commit: str = '', coverage: dict | None = None,
                    byte_exact_json: dict[str, str] | None = None,
                    artwork: Path | None = None, audition: dict | None = None) -> dict:
    """Export to a NEW directory; explicit audio inclusion authorizes local copying.

    Generic snapshots may be incomplete and are labelled as such. Arcadians'
    release builder applies a separate strict core-analysis gate before calling.
    """
    from .audio import audio_info
    from .webui import _first_detected_beat, _spectrogram_strip_png, _waveform_envelope

    if not include_audio:
        raise ValueError('Use --include-audio to explicitly include source/stem audio and lyrics')
    results, output = Path(results).resolve(), Path(output).absolute()
    byte_exact_json = byte_exact_json or {}
    if not isinstance(byte_exact_json, dict) or len(byte_exact_json) > 128:
        raise ValueError('Byte-exact evidence requires a bounded explicit hash inventory')
    for relative, expected in byte_exact_json.items():
        path = safe_file(results, relative)
        value = read_json(path)
        if (path.suffix != '.json' or digest(path) != expected or public_value(value, results) != value):
            raise ValueError('Byte-exact JSON must match its hash and already be public-safe: ' + relative)
    if output.exists() or output.is_symlink():
        raise FileExistsError('Timeline output must be a new directory')
    if output.resolve().is_relative_to(results):
        raise ValueError('Keep the public export outside the analysis directory')
    analysis = read_json(safe_file(results, 'analysis.json'))
    source = safe_file(results, analysis['source']['copied_path'])
    sha = analysis['source']['sha256']
    if audition is not None:
        if audition.get('source_sha256') != sha or not isinstance(audition.get('items'), list):
            raise ValueError('Lyric audition reference must identify the exact source master')
        for item in audition['items']:
            if (not isinstance(item.get('label'), str) or
                    not isinstance(item.get('start'), (int, float)) or
                    not math.isfinite(item['start']) or item['start'] < 0 or
                    not isinstance(item.get('end'), (int, float)) or
                    not math.isfinite(item['end']) or item['end'] <= item['start']):
                raise ValueError('Lyric audition requires finite explicit line intervals')
    # The bundled Arcadians artwork belongs only to its checksum-locked master.
    # Other exports require an explicit local artwork input; no network download.
    if artwork is None and sha == '5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de':
        artwork = WEB_ROOT / 'arcadians-cover.jpg'
    if artwork is not None:
        artwork = Path(artwork)
        if (artwork.is_symlink() or not artwork.is_file() or
                artwork.suffix.lower() not in {'.png', '.jpg', '.jpeg', '.webp'} or
                artwork.stat().st_size > 20 * 1024 * 1024):
            raise ValueError('Artwork must be a local PNG/JPEG/WebP file up to 20 MiB')
    if source.suffix.lower() not in AUDIO or digest(source) != sha:
        raise ValueError('Copied master does not match the analysis SHA-256')
    info = audio_info(source)
    if info['num_frames'] <= 0:
        raise ValueError('Empty source audio')
    if audition is not None and any(item['end'] > info['duration_seconds'] + .05 for item in audition['items']):
        raise ValueError('Lyric audition exceeds the source duration')
    canonical = read_json(results / 'canonical.json') if (results / 'canonical.json').exists() else {}
    errors = list(analysis.get('errors') or []) + list((analysis.get('deep_analysis') or {}).get('errors') or [])
    coverage = coverage or {'status': 'saved-snapshot', 'scope': 'Existing evidence only; not a completeness claim'}
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.timeline-', dir=output.parent) as temporary:
        stage = Path(temporary) / 'site'
        stage.mkdir()
        routes, rows, derivatives = {}, [], []
        api = f'/api/{sha}'
        def route(key, relative):
            routes[key] = relative
        def json_artifact(relative, value):
            name = 'data/' + relative
            if relative in byte_exact_json:
                path = safe_file(results, relative)
                if digest(path) != byte_exact_json[relative] or read_json(path) != value:
                    raise ValueError('Byte-exact evidence changed during export: ' + relative)
                (stage/name).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(path, stage/name)
            else:
                write_json(stage / name, public_value(value, results))
            route(f'/{sha}/{relative}', name)
        def audio_artifact(relative, path, name):
            destination = stage / name
            destination.parent.mkdir(parents=True, exist_ok=True)
            if relative != '__source__':
                # Browser-sized full-duration derivatives. Preserve exact floating
                # point originals in the analysis artifact, not in public Pages.
                import soundfile as sf
                destination = destination.with_suffix('.flac')
                name = destination.relative_to(stage).as_posix()
                with sf.SoundFile(path) as original, sf.SoundFile(
                    destination, 'w', samplerate=original.samplerate,
                    channels=original.channels, format='FLAC', subtype='PCM_24',
                ) as preview:
                    for block in original.blocks(blocksize=65536, dtype='float32', always_2d=True):
                        preview.write(block)
                derivatives.append({'source_artifact': relative, 'public_file': name,
                                    'encoding': 'FLAC PCM_24', 'resampled': False,
                                    'note': '24-bit quantized listening derivative; original float stems remain in analysis artifact'})
            else:
                shutil.copyfile(path, destination)
            wave_name = 'waveforms/' + hashlib.sha256(relative.encode()).hexdigest()[:24] + '.json'
            write_json(stage / wave_name, _waveform_envelope(path))
            route(api + '/waveform?path=' + relative, wave_name)
            route(f'/{sha}/{relative}', name)
        audio_name = 'media/source' + source.suffix.lower()
        audio_artifact('__source__', source, audio_name)
        route(api + '/source', audio_name)
        for path in sorted(results.rglob('*')):
            if not path.is_file():
                continue
            relative = path.relative_to(results).as_posix()
            ext = path.suffix.lower()
            is_midi_json = (relative == 'deep/midi/report.json' or
                            relative.startswith('deep/midi/') and path.name == 'notes.json')
            is_midi = relative.startswith('deep/midi/') and path.name == 'transcription.mid'
            is_json = ext == '.json' and (relative in JSON_FILES or relative.startswith(JSON_DIRS) or is_midi_json)
            is_audio = ext in AUDIO and (relative.startswith('stems/') or relative == 'speech/spoken_word.wav')
            is_spec = ext == '.npz' and relative.startswith('spectrograms/')
            if not (is_json or is_audio or is_spec or is_midi):
                continue
            path = safe_file(results, relative)
            if is_json:
                json_artifact(relative, read_json(path))
            elif is_audio:
                audio_artifact(relative, path, 'media/' + relative)
            elif is_midi:
                with path.open('rb') as native:
                    if native.read(4) != b'MThd':
                        raise ValueError('Public MIDI must be a Standard MIDI File')
                name = 'data/' + relative
                (stage / name).parent.mkdir(parents=True, exist_ok=True)
                shutil.copyfile(path, stage / name)
                route(f'/{sha}/{relative}', name)
            else:
                name = 'spectrograms/' + hashlib.sha256(relative.encode()).hexdigest()[:24] + '.png'
                (stage / name).parent.mkdir(parents=True, exist_ok=True)
                (stage / name).write_bytes(_spectrogram_strip_png(path))
                route(api + '/spectrogram?path=' + relative, name)
            rows.append({'path': relative, 'bytes': path.stat().st_size, 'mtime_ns': 0})
        loop_report = results / 'deep/loops/loops.json'
        loop_count = 0
        if loop_report.exists():
            from .analysis.loops import preview_loop
            loop_doc = read_json(safe_file(results, 'deep/loops/loops.json'))
            if (loop_doc.get('schema') != 'stemlab.loops.v1'
                    or not isinstance(loop_doc.get('loops'), list)
                    or not isinstance(loop_doc.get('unresolved_sections'), list)
                    or loop_doc.get('loop_count') != len(loop_doc['loops'])
                    or loop_doc.get('source_sha256') != sha
                    or loop_doc.get('source_frames') != info['num_frames']):
                raise ValueError('Unsupported, incomplete or wrong-source loop report; regenerate loop discovery')
            for loop in loop_doc['loops']:
                identifier = str(loop['id'])
                if not re.fullmatch(r'[A-Za-z0-9_.-]{1,120}', identifier):
                    raise ValueError('Unsafe loop identifier')
                name = f'loops/{identifier}.wav'
                data, _ = preview_loop(results, identifier)
                (stage / 'loops').mkdir(exist_ok=True)
                (stage / name).write_bytes(data)
                route(api + f'/loops/{identifier}/audio', name)
                if loop.get('file'):
                    route(f'/{sha}/deep/loops/{loop["file"]}', name)
                loop_count += 1
        first, detector = _first_detected_beat(results)
        from .analysis.beat_offsets import timeline_beat_offsets
        snapshot = dict(hash=sha, duration_seconds=info['duration_seconds'], files=rows,
                        status={'state': 'completed_with_errors' if errors else 'completed',
                                'error_count': len(errors), 'message': coverage['scope']},
                        canonical=public_value(canonical, results),
                        beat_offsets=public_value(timeline_beat_offsets(results, canonical.get('bpm')), results),
                        first_detected_beat=first,
                        first_detected_beat_source=detector, source_url=audio_name)
        write_json(stage / 'data/timeline.json', snapshot)
        json_artifact('canonical.json', snapshot['canonical'])
        route(api + '/timeline', 'data/timeline.json')
        route(api + '/canonical', 'data/canonical.json')
        # An absent loop report remains absent, never fabricated as "zero loops".
        if not loop_report.exists():
            write_json(stage/'data/loops-unavailable.json', {'schema': 'stemlab.loop-availability.v1',
                'status': 'not-analysed', 'reason': 'Loop discovery was not run in this retained analysis. No zero-loop result is asserted.'})
            route(f'/{sha}/deep/loops/loops.json', 'data/loops-unavailable.json')
        (stage / 'assets').mkdir()
        for name in ('style.css', 'timeline.css', 'arcadians-cover.jpg', 'arcadians-reference.json', 'static-timeline.js'):
            path = safe_file(WEB_ROOT, name)
            if name.endswith('.css'):
                (stage / 'assets' / name).write_text(path.read_text().replace('/assets/', './'), encoding='utf-8')
            else:
                shutil.copyfile(path, stage / 'assets' / name)
            route('/assets/' + name, 'assets/' + name)
        bundle, count = adapt_bundle((WEB_ROOT / 'app.js').read_text(encoding='utf-8'))
        (stage / 'assets/app.js').write_text(bundle, encoding='utf-8')
        artwork_name = None
        if artwork is not None:
            artwork_name = 'media/cover' + artwork.suffix.lower()
            shutil.copyfile(artwork, stage / artwork_name)
        if audition is not None:
            write_json(stage / 'data/lyric-audition.json', audition)
        # The song hash alone does not change when its analysis is regenerated.
        # Version URLs by exported content so cached envelopes/data cannot mix runs.
        revision = hashlib.sha256(json.dumps({path.relative_to(stage).as_posix(): digest(path)
            for path in sorted(stage.rglob('*')) if path.is_file()}, sort_keys=True).encode()).hexdigest()[:16]
        payload = dict(schema='stemlab.static-timeline.v1', hash=sha, routes=routes, version=revision,
                       artwork=artwork_name, lyric_items=audition['items'] if audition else None)
        html_payload = json.dumps(payload, ensure_ascii=True).replace('<', '\\u003c').replace('>', '\\u003e').replace('&', '\\u0026')
        index = (WEB_ROOT / 'index.html').read_text(encoding='utf-8')
        index = re.sub(r'<script\b[^>]*\bsrc=["\']https?://[^"\']+["\'][^>]*>\s*</script>', '', index, flags=re.I)
        index = index.replace('href="/assets/', 'href="assets/').replace('src="/assets/', 'src="assets/')
        title = str(canonical.get('title') or source.name)
        banner = ('<aside class="static-evidence" style="padding:1rem" role="note">'
                  '<strong>' + html.escape(title) + ' · published analysis</strong> — '
                  + html.escape(coverage['scope'])
                  + '. Artist reference and model estimates are separate; no listening approval is implied. '
                  '<a href="snapshot.json">Provenance and completeness</a> · '
                  '<a href="data/analysis.json">Analysis report</a></aside>')
        index = index.replace('<main>', '<main>' + banner)
        index = index.replace('<script type="module" src="assets/app.js">',
                              '<script type="application/json" id="stemlab-static-data">' + html_payload + '</script>\n'
                              '<script src="assets/static-timeline.js"></script>\n'
                              '<script type="module" src="assets/app.js">')
        index = re.sub(r'((?:src|href)="assets/[^"?]+)(")', lambda m: m[1] + '?v=' + revision + m[2], index)
        (stage / 'index.html').write_text(index, encoding='utf-8')
        notice = ('StemLab static timeline. Renderer: bundled react-timeline-sequence.\n'
                  'Audio and lyric rights remain with their owners; the software licence does not license music.\n'
                  'Source SHA-256: ' + sha + '\n' + coverage['scope'] + '\n')
        (stage / 'SOURCE-NOTICE.txt').write_text(notice, encoding='utf-8')
        files = {}
        for path in sorted(stage.rglob('*')):
            if path.is_file():
                if path.stat().st_size > MAX_FILE_BYTES:
                    raise ValueError('Static artifact exceeds 90 MiB: ' + path.name)
                files[path.relative_to(stage).as_posix()] = {'sha256': digest(path), 'bytes': path.stat().st_size}
        if sum(f['bytes'] for f in files.values()) > MAX_BYTES:
            raise ValueError('Static timeline exceeds publication budget')
        result = dict(schema='stemlab.static-timeline.v1', source_sha256=sha, source_commit=source_commit,
                      duration_seconds=info['duration_seconds'], sample_rate=info['sample_rate'],
                      source_frames=info['num_frames'], coverage=coverage, autoplay=False,
                      renderer='StemLab bundled react-timeline-sequence', api_required=False, asset_revision=revision,
                      original_bundle_sha256=digest(WEB_ROOT / 'app.js'), url_literals_relocated=count,
                      artifact_lanes=len(rows), loop_count=loop_count, audio_path=audio_name,
                      stem_audio_derivatives=derivatives, files=files)
        write_json(stage / 'snapshot.json', result)
        verify_snapshot(stage)
        stage.rename(output)
    return result


def verify_snapshot(site: Path) -> dict:
    """Verify the exact exported set. Never permit an upload of a source checkout."""
    site = Path(site).resolve()
    record = read_json(safe_file(site, 'snapshot.json'))
    if record.get('schema') != 'stemlab.static-timeline.v1' or record.get('autoplay') is not False:
        raise ValueError('Unsupported static timeline snapshot')
    files = record['files']
    if not isinstance(files, dict) or not 5 <= len(files) <= 1000:
        raise ValueError('Invalid static artifact inventory')
    actual = set()
    total = 0
    allowed_extensions = {'.html', '.js', '.css', '.json', '.png', '.jpg', '.txt', '.mid'} | AUDIO
    for path in site.rglob('*'):
        if path.is_symlink():
            raise ValueError('Public snapshot contains a symlink')
        if path.is_file():
            relative = path.relative_to(site).as_posix()
            if relative != 'snapshot.json':
                actual.add(relative)
    if actual != set(files):
        raise ValueError('Static inventory differs from the actual public files')
    for name, evidence in files.items():
        path = safe_file(site, name)
        if path.suffix.lower() not in allowed_extensions or not (
            name in {'index.html', 'SOURCE-NOTICE.txt'}
            or name.startswith(('assets/', 'data/', 'media/', 'waveforms/', 'spectrograms/', 'loops/'))
        ):
            raise ValueError('Unexpected public file')
        size = path.stat().st_size
        if size != evidence['bytes'] or size > MAX_FILE_BYTES or digest(path) != evidence['sha256']:
            raise ValueError('Static artifact checksum or size mismatch: ' + name)
        total += size
    if total > MAX_BYTES:
        raise ValueError('Static timeline exceeds publication budget')
    if digest(safe_file(site, record['audio_path'])) != record['source_sha256']:
        raise ValueError('Static master is not the source named in the evidence')
    state = read_json(safe_file(site, 'data/timeline.json'))
    if state.get('hash') != record['source_sha256'] or state['duration_seconds'] != record['duration_seconds']:
        raise ValueError('Timeline clock/source mismatch')
    return {'status': 'passed', 'files': len(files), 'bytes': total,
            'source_sha256': record['source_sha256'], 'coverage': record['coverage']}
