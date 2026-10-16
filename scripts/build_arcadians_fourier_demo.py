"""Full-master Fourier gallery using StemLab composition and the released shared viewer.

Each resolution has its own HTML payload, so selecting 128 bands does not load
the other 124 dimensions. One original MP3 is shared by all six views.
"""
from __future__ import annotations

import argparse
from array import array
import base64
from dataclasses import asdict
import hashlib
import html
import json
import math
from pathlib import Path
import re
import shutil
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'src'))
from build_arcadians_demo import (ARCADIANS_BPM, ARCADIANS_SHA256, DEFAULT_AUDIO,
                                  MAX_FILE_BYTES, digest, read_payload, validate_revision)
from stemlab.static_timeline import read_json, safe_file, write_json
from recording_downloads import compress_downloads, read_recording

GALLERY = 'arcadians-fourier'
CHANNELS = (4, 8, 16, 32, 64, 128)


def build_fourier_demo(audio: Path, site: Path, *, source_commit: str, companion_commit: str,
                       companion_license: str, release_tag='main', expected_sha=ARCADIANS_SHA256,
                       title='Arcadians', progress=print) -> dict:
    from dancerudiments_authoring.harness import build_recording_harness, render_template
    from stemlab.analysis.rudiment_recordings import EnvelopeBank, fourier_axes, resolve_tempo

    validate_revision(source_commit)
    validate_revision(companion_commit)
    if not companion_license.strip() or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._+-]{0,79}', release_tag):
        raise ValueError('Companion licence and a safe release label are required')
    audio = audio.resolve()
    if audio.is_symlink() or audio.suffix.lower() != '.mp3' or digest(audio) != expected_sha:
        raise ValueError('Fourier demo requires the exact original master MP3')
    destination = site/GALLERY
    if destination.exists():
        raise FileExistsError('Fourier demo already exists; never merge stale outputs')
    existing = site/'arcadians/release-demo.json'
    if existing.is_file() and read_json(existing)['stemlab_commit'] != source_commit:
        raise ValueError('Existing master demo has a different revision')
    site.mkdir(parents=True, exist_ok=True)
    bank = EnvelopeBank([audio], progress=progress, **resolve_tempo(audio, bpm=ARCADIANS_BPM, confirmed=True))
    info = bank.infos[audio]
    notice = (f'{title} — Kieran Simkin\nFull original master; no separated stems or reconstructed band WAVs.\n'
        '4, 8, 16, 32, 64 and 128 equal-width frequency bands, each mapped to one dimension.\n'
        'Centered periodic-Hann 2048-point rFFT; one-sided, window-corrected band RMS; independent channel powers.\n'
        'Global normalization within each resolution preserves relative band strength, not calibration between resolutions.\n'
        '145 BPM: artist-confirmed. Beat-zero phase: unverified. 64 pips per beat.\n'
        'Bipolar [-1,+1]: zero amplitude is -1, selected reference is +1; completely silent axes stay 0.\n'
        'No autoplay or implicit looping. Original MP3 copied unchanged at the artist\'s request.\n'
        'Audio/derived-data rights remain applicable; MIT software licensing does not relicense the song.\n'
        f'MP3 SHA-256: {expected_sha}\nStemLab commit: {source_commit}\nDanceRudiments commit: {companion_commit}\n')
    with tempfile.TemporaryDirectory(prefix='.fourier-demo-', dir=site.parent) as temporary:
        gallery = Path(temporary)/GALLERY
        (gallery/'recordings').mkdir(parents=True)
        shutil.copyfile(audio, gallery/'audio.mp3')
        (gallery/'SOURCE-NOTICE.txt').write_text(notice, encoding='utf-8')
        (gallery/'DANCERUDIMENTS-LICENSE.txt').write_text(companion_license, encoding='utf-8')
        audio_meta = dict(name=audio.name, sha256=expected_sha, relative_path='audio.mp3',
                          range_start=float(bank.start), range_end=float(bank.end))
        candidates = []
        for bands in CHANNELS:
            name = f'candidate_{bands:04d}'
            axes = fourier_axes(audio, bands=bands, fft_size=2048)
            recording = bank.compose(axes, name=name, normalization='global', metadata=dict(
                title=f'{bands} frequency bands', family='Fourier full master',
                description=f'{bands} equal-width bands, 0–{info.samplerate/2:g} Hz; FFT 2048; global normalization'))
            path = gallery/'recordings'/(name+'.json')
            # Native Recording supplies the authoritative document. Compact JSON
            # avoids whitespace inflating the 128-D file beyond Pages' file limit.
            with path.open('x', encoding='utf-8') as stream:
                json.dump(recording.to_dict(), stream, separators=(',', ':'), allow_nan=False)
                stream.write('\n')
            view = gallery/f'bands-{bands}.html'
            harness = build_recording_harness([recording], view, audio=audio_meta,
                                              collection_id=f'stemlab-arcadians-fourier-{bands}')
            compress_downloads(view, harness)
            path = path.with_suffix('.json.gz')
            payload = read_payload(view)
            payload.update(source_commit=source_commit, version=release_tag, notices=notice+'\n'+companion_license)
            links = ' · '.join(f'<a href="bands-{n}.html">{n} bands</a>' for n in CHANNELS)
            banner = ('<p><strong>'+html.escape(title)+f' — {bands} Fourier bands</strong><br>'
                'Full master · one band per dimension · 2048-point Hann FFT · global normalization.<br>'
                'Use Bars to see every dimension, or choose any bands for X/Y/Z. '
                'Each view spans the full song; changing resolution starts a fresh paused player.<br>'
                'Recording downloads are losslessly compressed JSON (.json.gz).<br>'
                +links+'<br><a href="index.html" target="_top">Fourier overview</a> · '
                '<a href="../" target="_top">All demos</a> · <a href="SOURCE-NOTICE.txt">Method and rights</a></p>')
            page = render_template(payload).replace('</head>', '<link rel="icon" href="data:,"></head>', 1)
            page = page.replace('</header>', banner+'</header>', 1)
            view.write_text(page, encoding='utf-8')
            harness['html_sha256'] = digest(view)
            write_json(view.with_suffix('.json'), harness)
            candidates.append(dict(bands=bands, dimensions=list(recording.dimensions), samples=len(recording.samples),
                file=path.relative_to(gallery).as_posix(), sha256=digest(path),
                view=view.name, html_sha256=digest(view), harness=harness))
            if path.stat().st_size > MAX_FILE_BYTES or view.stat().st_size > MAX_FILE_BYTES:
                raise ValueError('Fourier view exceeds the existing public file budget')
            del recording, payload, page
            bank.fourier_cache.clear()
        bank.verify_sources()
        provenance = dict(format='stemlab.arcadians-fourier-demo', schema_version=1, gallery=GALLERY,
            stemlab_commit=source_commit, dancerudiments_commit=companion_commit, release_tag=release_tag,
            source=dict(title=title, artist='Kieran Simkin', sha256=expected_sha, sample_rate=info.samplerate,
                        channels=info.channels, frames=info.frames, duration_seconds=info.frames/info.samplerate),
            dimensions=list(CHANNELS), candidate_count=len(CHANNELS), clock=asdict(bank.clock),
            fft_size=2048, frequency_min=0., frequency_max=info.samplerate/2, frequency_scale='linear',
            normalization='global', sample_dtype='float64', pips_per_beat=64,
            audio_file='audio.mp3', audio_included=True, autoplay=False)
        write_json(gallery/'release-demo.json', provenance)
        write_json(gallery/'report.json', dict(candidates=candidates, clock=asdict(bank.clock)))
        options = ''.join(f'<option value="{n}"'+(' selected' if n == 32 else '')+f'>{n} channels</option>' for n in CHANNELS)
        page = '''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" href="data:,">
<title>Arcadians — Fourier frequency bands</title>
<style>body{margin:0;background:#101a25;color:#eef4fa;font:17px/1.6 system-ui}header{max-width:72rem;margin:auto;padding:1rem}a{color:#9cd9ff}select{font:inherit;padding:.4rem}iframe{display:block;border:0;width:100%;height:85vh;min-height:45rem}summary{cursor:pointer}</style></head><body><header>
<h1>Arcadians — Fourier frequency bands</h1>
<p>Hear the full original master and watch its frequency energy become DanceRudiments dimensions.</p>
<label for="channels">Frequency bands / dimensions </label><select id="channels">OPTIONS</select>
<p>4, 8, 16, 32, 64 and 128 channels. Each view loads separately and starts paused. Press Play below.
Use the shared Bars view for all dimensions or select any bands for an X/Y/Z projection.</p>
<details><summary>Method and interpretation</summary><p>Every native pip uses a centered periodic-Hann 2048-point rFFT.
Equal-width bands span 0 Hz to Nyquist (22,050 Hz for this master). Window-corrected one-sided RMS combines
channel powers without cancelling antiphase stereo. Global normalization preserves relative band strengths
within each resolution; the six resolutions are not level-calibrated against each other.</p>
<p>Coordinates are bipolar [-1,+1]: zero amplitude maps to -1, the reference to +1; completely silent bands stay 0.
These are energy envelopes, not isolated band audio. The audio is the unchanged master.
145 BPM is artist-confirmed; beat-zero phase is unverified. No autoplay or looping.</p></details>
<p><a href="../">All Arcadians demos</a> · <a href="SOURCE-NOTICE.txt">Method, source and rights</a> ·
<a href="report.json">Exact band layouts and recording downloads</a> · <a id="standalone" href="bands-32.html">Open selected viewer directly</a></p>
</header><iframe id="viewer" title="Arcadians Fourier frequency-band player" src="bands-32.html"></iframe>
<script>const channels=document.getElementById('channels');channels.addEventListener('change',()=>{
const file='bands-'+channels.value+'.html';document.getElementById('viewer').src=file;
document.getElementById('standalone').href=file;});</script></body></html>'''.replace('OPTIONS', options)
        (gallery/'index.html').write_text(page, encoding='utf-8')
        verify_fourier_gallery(gallery, expected_sha=expected_sha, source_commit=source_commit)
        gallery.rename(destination)
    if existing.is_file():
        main = read_json(existing)
        main['fourier_gallery'] = dict(path=GALLERY+'/', provenance_sha256=digest(destination/'release-demo.json'))
        write_json(existing, main)
    return provenance


def verify_fourier_gallery(gallery: Path, *, expected_sha=ARCADIANS_SHA256, source_commit=None) -> dict:
    """Verify exact source/extent, authoritative documents and every shared sample column."""
    from stemlab.analysis.frequency_bands import frequency_edges
    provenance = read_json(safe_file(gallery, 'release-demo.json'))
    report = read_json(safe_file(gallery, 'report.json'))
    if (provenance.get('format') != 'stemlab.arcadians-fourier-demo' or provenance.get('dimensions') != list(CHANNELS)
            or provenance.get('candidate_count') != len(CHANNELS) or provenance.get('fft_size') != 2048
            or provenance.get('normalization') != 'global'
            or source_commit is not None and provenance.get('stemlab_commit') != source_commit
            or provenance['source']['sha256'] != expected_sha or digest(gallery/'audio.mp3') != expected_sha):
        raise ValueError('Fourier demo source, revision or settings mismatch')
    if [c['bands'] for c in report['candidates']] != list(CHANNELS):
        raise ValueError('Fourier gallery must include all six requested resolutions')
    if {p.name for p in (gallery/'recordings').glob('*')} != {f'candidate_{n:04d}.json.gz' for n in CHANNELS}:
        raise ValueError('Missing or unlisted Fourier recording')
    for item in report['candidates']:
        n = item['bands']
        view = safe_file(gallery, item['view'])
        record = safe_file(gallery, item['file'])
        payload = read_payload(view)
        document = read_recording(record)
        harness = read_json(view.with_suffix('.json'))
        patterns = payload['pack']['patterns']
        clock = provenance['clock']
        if (digest(view) != item['html_sha256'] or digest(record) != item['sha256']
                or harness != item['harness'] or harness['html_sha256'] != digest(view)
                or len(patterns) != 1 or patterns[0]['dimensions'] != item['dimensions']
                or document['dimensions'] != [f'band_{j:03d}' for j in range(n)]
                or len(item['dimensions']) != n or len(document['samples']) != item['samples']
                or patterns[0]['period_pips'] != item['samples'] or document['clock'] != clock
                or payload['clock'] != clock or report['clock'] != clock
                or document['pips_per_beat'] != 64 or document['sample_dtype'] != 'float64'
                or len(document['provenance']['axes']) != n
                or document['provenance']['normalization'] != 'global'
                or clock['start_pip'] != 0 or clock['bpm'] != ARCADIANS_BPM
                or item['samples'] != math.ceil(provenance['source']['duration_seconds']*ARCADIANS_BPM/60*64)
                or clock['bpm_status'] != 'confirmed' or clock['phase_status'] != 'unverified'
                or payload['audio']['range_start'] != 0
                or abs(payload['audio']['range_end']-provenance['source']['duration_seconds']) > 1e-6
                or document['provenance']['requested_end_seconds'] != payload['audio']['range_end']
                or payload['audio']['relative_path'] != 'audio.mp3' or payload['audio']['sha256'] != expected_sha):
            raise ValueError('Fourier recording/harness/clock identity mismatch')
        raw = base64.b64decode(payload['recording_data'], validate=True)
        for j, meta in enumerate(document['provenance']['axes']):
            spec = meta['fourier']
            expected_edges = list(frequency_edges(provenance['source']['sample_rate'], n))
            if (meta['source_sha256'] != expected_sha or meta['mode'] != 'fourier'
                    or spec['index'] != j or spec['edges_hz'] != expected_edges or spec['fft_size'] != 2048
                    or meta['band_count'] != n or meta['fft_bin_end_exclusive'] <= meta['fft_bin_start']):
                raise ValueError('Fourier band provenance mismatch')
            values = [row[j] for row in document['samples'] if len(row) == n]
            if len(values) != item['samples'] or any(not math.isfinite(v) or abs(v) > 1 for v in values):
                raise ValueError('Invalid Fourier samples')
            column = array('d', (v+0. for v in values))
            if sys.byteorder != 'little':
                column.byteswap()
            data = column.tobytes()
            offset = patterns[0]['column_offsets'][j]
            if (data != raw[offset:offset+len(data)]
                    or hashlib.sha256(data).hexdigest() != patterns[0]['column_sha256'][j]):
                raise ValueError('Fourier viewer samples differ from recording')
    return provenance


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--audio', type=Path, default=DEFAULT_AUDIO)
    parser.add_argument('--site', type=Path, required=True)
    parser.add_argument('--source-commit', required=True)
    parser.add_argument('--companion-commit', required=True)
    parser.add_argument('--companion-license', type=Path, required=True)
    parser.add_argument('--release-tag', default='main')
    args = parser.parse_args()
    print(json.dumps(build_fourier_demo(args.audio, args.site, source_commit=args.source_commit,
        companion_commit=args.companion_commit, companion_license=args.companion_license.read_text(encoding='utf-8'),
        release_tag=args.release_tag), indent=2))


if __name__ == '__main__':
    main()
