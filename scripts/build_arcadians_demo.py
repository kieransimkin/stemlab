"""Build and package the public Arcadians batch demo using DanceRudiments' shared UI.

The release CLI accepts only the checksum-locked bundled track. Test code can call
build_site with an explicitly identified synthetic fixture; that is not a release.
No separation, model download, private manifest copy or music re-encoding occurs.
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))

ARCADIANS_SHA256 = '5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de'
ARCADIANS_BPM = 145.0
DEFAULT_AUDIO = ROOT / 'examples/arcadians/Arcadians - 320kbps.mp3'
PAYLOAD_RE = re.compile(r'<script type="application/json" id="data">(.*?)</script>', re.S)
MAX_SITE_BYTES = 512 * 1024 * 1024
MAX_FILE_BYTES = 90 * 1024 * 1024


def digest(path: Path) -> str:
    result = hashlib.sha256()
    with path.open('rb') as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b''):
            result.update(block)
    return result.hexdigest()


def write_json(path: Path, data: dict) -> None:
    path.write_text(json.dumps(data, indent=2, allow_nan=False) + '\n', encoding='utf-8')


def read_payload(path: Path) -> dict:
    matches = PAYLOAD_RE.findall(path.read_text(encoding='utf-8'))
    if len(matches) != 1:
        raise ValueError('Expected exactly one shared visualizer payload')
    return json.loads(matches[0])


def validate_revision(value: str) -> str:
    if not re.fullmatch(r'[0-9a-f]{40}', value):
        raise ValueError('A full lowercase 40-character Git commit SHA is required')
    return value


def public_files(site: Path) -> list[Path]:
    """Allowlist the site: never upload a checkout, symlink, source manifest or review."""
    files = []
    total = 0
    timeline_files = set()
    timeline_root = site / 'timeline/arcadians'
    if (site / 'timeline').exists():
        from stemlab.static_timeline import verify_snapshot
        verify_snapshot(timeline_root)
        timeline_files = {p.relative_to(site).as_posix() for p in timeline_root.rglob('*') if p.is_file()}
    timeline_dirs = {str(Path(name).parent).replace('\\', '/') for name in timeline_files}
    for directory in list(timeline_dirs):
        timeline_dirs.update(p.as_posix() for p in Path(directory).parents if str(p) != '.')
    allowed = {
        '.nojekyll', 'index.html', 'arcadians/index.html', 'arcadians/index.json',
        'arcadians/report.json', 'arcadians/release-demo.json', 'arcadians/audio.mp3',
        'arcadians/SOURCE-NOTICE.txt', 'arcadians/DANCERUDIMENTS-LICENSE.txt',
    }
    for path in sorted(site.rglob('*')):
        if path.is_symlink():
            raise ValueError('Site contains a symlink: ' + path.relative_to(site).as_posix())
        if path.is_dir():
            if path.relative_to(site).as_posix() not in {'arcadians', 'arcadians/recordings'} | timeline_dirs:
                raise ValueError('Unexpected site directory: ' + path.relative_to(site).as_posix())
            continue
        relative = path.relative_to(site).as_posix()
        if relative not in allowed | timeline_files and not re.fullmatch(r'arcadians/recordings/candidate_[0-9]{4}\.json', relative):
            raise ValueError('Unapproved public file: ' + relative)
        size = path.stat().st_size
        if size > MAX_FILE_BYTES:
            raise ValueError('A public file exceeds the 90 MiB budget: ' + relative)
        total += size
        if total > MAX_SITE_BYTES:
            raise ValueError('Site exceeds the 512 MiB publication budget')
        files.append(path)
    return files


def build_site(audio: Path, output: Path, *, source_commit: str, companion_commit: str,
               release_tag: str, companion_license: str, expected_sha256: str = ARCADIANS_SHA256,
               title: str = 'Arcadians', candidates: int = 48, progress=print) -> dict:
    """Build to a new directory; public CLI locks audio identity and candidate count."""
    from dancerudiments_authoring.harness import render_template
    from stemlab.analysis.rudiment_batch import generate_batch
    import soundfile as sf

    audio, output = Path(audio).resolve(), Path(output).resolve()
    validate_revision(source_commit)
    validate_revision(companion_commit)
    if not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._+-]{0,79}', release_tag):
        raise ValueError('Invalid release label')
    if not re.fullmatch(r'[0-9a-f]{64}', expected_sha256):
        raise ValueError('Invalid expected source checksum')
    if output.exists():
        raise FileExistsError('Choose a new output directory')
    if not audio.is_file() or audio.is_symlink() or audio.suffix.lower() != '.mp3':
        raise ValueError('The demo requires the bundled MP3, not a substitute or symlink')
    if digest(audio) != expected_sha256:
        raise ValueError('Arcadians MP3 checksum mismatch; no public output was written')
    if not companion_license.strip():
        raise ValueError('The companion source licence must be retained')
    info = sf.info(str(audio))
    if info.frames <= 0 or info.samplerate <= 0:
        raise ValueError('Source audio has no decodable samples')
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.arcadians-site-', dir=output.parent) as temporary:
        stage = Path(temporary) / 'site'
        stage.mkdir()
        gallery = stage / 'arcadians'
        report = generate_batch(
            audio, gallery, bpm=ARCADIANS_BPM, confirmed=True,
            # Beat origin is NOT confirmed by the canonical lyric timing.
            beat_zero=None, dimensions=(2, 3, 6), max_candidates=candidates, seed=17,
            normalization='per-axis', include_audio=True, harness=True, progress=progress,
        )
        if report['candidate_count'] != candidates:
            raise ValueError(f'Expected {candidates} movements; generated {report["candidate_count"]}')
        if report['sources'] != [dict(key='master', name=audio.name, sha256=expected_sha256)]:
            raise ValueError('Release demo must describe one genuine master, not invented stems')
        if not all(item['dynamic'] for item in report['candidates']):
            raise ValueError('The release demo contains a static movement')
        notice = (
            f'{title} — Kieran Simkin\n'
            'Bundled source audio, publicly included at the artist\'s request for this demo.\n'
            'Audio is not relicensed under StemLab\'s or DanceRudiments\' MIT code licence.\n'
            'Source audio and derived-data rights remain applicable.\n'
            'Song: https://kieransimkin.co.uk/arcadians/\n'
            f'MP3 SHA-256: {expected_sha256}\n'
            '145 BPM: artist-confirmed. Beat-zero phase: unverified, origin 0 seconds.\n'
            'All movements use filtered/unfiltered versions of the master; no separated stems.\n'
            'The original MP3 is copied unchanged; no synthesised substitute, looping or autoplay.\n'
            'Native C++/WebAssembly playback uses DanceRudiments\' shared visualizer.\n'
            f'StemLab commit: {source_commit}\nDanceRudiments commit: {companion_commit}\n'
        )
        (gallery / 'SOURCE-NOTICE.txt').write_text(notice, encoding='utf-8')
        (gallery / 'DANCERUDIMENTS-LICENSE.txt').write_text(companion_license, encoding='utf-8')
        payload = read_payload(gallery / 'index.html')
        if payload['audio'].get('relative_path') != 'audio.mp3':
            raise ValueError('Shared visualizer did not retain the bundled MP3 link')
        payload.update(collection_id='stemlab-arcadians-' + release_tag, version=release_tag,
                       source_commit=source_commit, notices=notice + '\n' + companion_license)
        page = render_template(payload)
        page = page.replace('</head>', '<link rel="icon" href="data:,"></head>', 1)
        banner = (
            '<p id="arcadians-release"><strong>' + html.escape(title) + ' — Kieran Simkin</strong>'
            ' · ' + html.escape(release_tag) + ' · ' + str(candidates) + ' generated movements.<br>'
            'The original track is included: press Play to hear it alongside the movements. '
            'Both the music and movements follow the audio clock; pause and seek affect both. '
            '145 BPM is confirmed; beat-zero phase is unverified. Filtered master only, not separated stems.<br>'
            '<a href="SOURCE-NOTICE.txt">Source and timing notes</a> · '
            '<a href="audio.mp3" download>Original MP3</a> · '
            '<a href="release-demo.json">Build provenance</a> · '
            '<a href="https://kieransimkin.co.uk/arcadians/">Song page</a></p>'
        )
        page = page.replace('</header>', banner + '</header>', 1)
        page = re.sub(r'<title>.*?</title>',
                      lambda _: '<title>' + html.escape(title) + ' — StemLab movement comparison</title>',
                      page, count=1)
        (gallery / 'index.html').write_text(page, encoding='utf-8')
        harness_report = report['harness']
        harness_report['html_sha256'] = digest(gallery / 'index.html')
        write_json(gallery / 'index.json', harness_report)
        write_json(gallery / 'report.json', report)
        provenance = dict(
            format='stemlab.arcadians-release-demo', schema_version=1,
            release_tag=release_tag, stemlab_commit=source_commit, dancerudiments_commit=companion_commit,
            source=dict(title=title, artist='Kieran Simkin', filename=audio.name,
                        sha256=expected_sha256, sample_rate=info.samplerate, channels=info.channels,
                        frames=info.frames, duration_seconds=info.frames / info.samplerate),
            source_scope='master-only; filtered and unfiltered routes; no separated stems',
            candidate_count=candidates, dimensions=[2, 3, 6], seed=17,
            clock=report['clock'], sample_dtype='float64', pips_per_beat=64,
            audio_file='audio.mp3', audio_included=True, autoplay=False,
            filtering='zero-phase', normalization='per-axis', renderer=harness_report['renderer'],
        )
        write_json(gallery / 'release-demo.json', provenance)
        (stage / '.nojekyll').touch()
        (stage / 'index.html').write_text(
            '<!doctype html><html lang="en"><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            '<meta http-equiv="refresh" content="0; url=arcadians/index.html">'
            '<title>StemLab — Arcadians</title><h1>StemLab — Arcadians</h1>'
            '<p><a href="arcadians/index.html">Open the audio-enabled movement comparison</a></p></html>\n',
            encoding='utf-8',
        )
        verify_site(stage, expected_sha256=expected_sha256, expected_candidates=candidates)
        os.rename(stage, output)
    return provenance


def verify_site(site: Path, *, expected_sha256: str = ARCADIANS_SHA256,
                expected_candidates: int = 48) -> dict:
    site = Path(site).resolve()
    files = public_files(site)
    gallery = site / 'arcadians'
    payload = read_payload(gallery / 'index.html')
    provenance = json.loads((gallery / 'release-demo.json').read_text(encoding='utf-8'))
    report = json.loads((gallery / 'report.json').read_text(encoding='utf-8'))
    harness = json.loads((gallery / 'index.json').read_text(encoding='utf-8'))
    if payload.get('audio', {}).get('relative_path') != 'audio.mp3':
        raise ValueError('Playback must load a same-directory bundled MP3')
    if (digest(gallery / 'audio.mp3') != expected_sha256
            or payload['audio']['sha256'] != expected_sha256
            or provenance['source']['sha256'] != expected_sha256):
        raise ValueError('Published audio identity mismatch')
    if not harness.get('audio_included') or not provenance.get('audio_included'):
        raise ValueError('Audio must be included')
    if payload['clock']['bpm'] != ARCADIANS_BPM or payload['clock']['bpm_status'] != 'confirmed':
        raise ValueError('Demo requires the confirmed 145 BPM clock')
    if payload['clock']['phase_status'] != 'unverified' or payload['clock']['beat_zero_seconds'] != 0:
        raise ValueError('Do not invent a confirmed beat phase')
    if (payload['pack']['pips_per_beat'] != 64 or payload['pack']['sample_dtype'] != 'float64'
            or payload['clock'] != provenance['clock'] or payload['clock'] != report['clock']):
        raise ValueError('Recording clock/precision contract mismatch')
    count = len(payload['pack']['patterns'])
    if any(value != expected_candidates for value in
           (count, harness['candidates'], report['candidate_count'], provenance['candidate_count'])):
        raise ValueError('Candidate count mismatch')
    if harness['html_sha256'] != digest(gallery / 'index.html') or report['harness'] != harness:
        raise ValueError('Generated page/harness checksum mismatch')
    if payload['audio']['range_start'] != 0 or abs(
        payload['audio']['range_end'] - provenance['source']['duration_seconds']
    ) > 1e-6:
        raise ValueError('Demo must cover the entire source track')
    records = {p.name for p in (gallery / 'recordings').glob('*.json')}
    if records != {p['name'] + '.json' for p in payload['pack']['patterns']}:
        raise ValueError('Missing or unlisted authoritative recording file')
    if (site / 'timeline').exists() or provenance.get('timeline'):
        from stemlab.static_timeline import read_json, verify_snapshot
        timeline = site / 'timeline/arcadians'
        verify_snapshot(timeline)
        snapshot = read_json(timeline / 'snapshot.json')
        if (provenance.get('timeline', {}).get('snapshot_sha256') != digest(timeline / 'snapshot.json')
                or snapshot['source_sha256'] != expected_sha256
                or snapshot['source_commit'] != provenance['stemlab_commit']
                or snapshot['coverage'].get('status') != 'complete'):
            raise ValueError('Combined timeline provenance/completeness mismatch')
    if not (site / '.nojekyll').is_file() or not (site / 'index.html').is_file():
        raise ValueError('Missing Pages entry point')
    return dict(files=len(files), total_bytes=sum(p.stat().st_size for p in files), candidates=count,
                audio_sha256=expected_sha256, audio_included=True)


def package_site(site: Path, destination: Path, *, expected_sha256: str = ARCADIANS_SHA256,
                 expected_candidates: int = 48) -> dict:
    """Freeze only verified public files. Test screenshots/logs stay outside the site."""
    site, destination = Path(site).resolve(), Path(destination).resolve()
    verified = verify_site(site, expected_sha256=expected_sha256, expected_candidates=expected_candidates)
    if destination.exists():
        raise FileExistsError('Choose a new release asset directory')
    if destination.is_relative_to(site):
        raise ValueError('Release archive must not be inside the public site')
    files = public_files(site)
    checksums = ''.join(f'{digest(p)}  {p.relative_to(site).as_posix()}\n' for p in files)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.arcadians-assets-', dir=destination.parent) as temporary:
        stage = Path(temporary) / 'assets'
        stage.mkdir()
        archive = stage / 'StemLab-Arcadians-visualizer.zip'
        with zipfile.ZipFile(archive, 'x', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as zf:
            for path in files:
                entry = zipfile.ZipInfo(path.relative_to(site).as_posix(), (2026, 1, 1, 0, 0, 0))
                entry.compress_type = zipfile.ZIP_DEFLATED
                entry.external_attr = 0o100644 << 16
                zf.writestr(entry, path.read_bytes())
        (stage / 'StemLab-Arcadians-files.sha256').write_text(checksums, encoding='utf-8')
        write_json(stage / 'StemLab-Arcadians-build.json', dict(
            **verified, archive_sha256=digest(archive),
            provenance=json.loads((site / 'arcadians/release-demo.json').read_text(encoding='utf-8')),
        ))
        os.rename(stage, destination)
    return verified


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    build = commands.add_parser('build')
    build.add_argument('--audio', type=Path, default=DEFAULT_AUDIO)
    build.add_argument('--output', type=Path, required=True)
    build.add_argument('--source-commit', required=True)
    build.add_argument('--companion-commit', required=True)
    build.add_argument('--companion-license', type=Path, required=True)
    build.add_argument('--release-tag', required=True)
    verify = commands.add_parser('verify')
    verify.add_argument('site', type=Path)
    package = commands.add_parser('package')
    package.add_argument('site', type=Path)
    package.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    try:
        if args.command == 'build':
            result = build_site(args.audio, args.output, source_commit=args.source_commit,
                                companion_commit=args.companion_commit, release_tag=args.release_tag,
                                companion_license=args.companion_license.read_text(encoding='utf-8'))
        elif args.command == 'verify':
            result = verify_site(args.site)
        else:
            result = package_site(args.site, args.output)
        print(json.dumps(result, indent=2))
    except (OSError, ValueError, RuntimeError) as exc:
        parser.exit(1, str(exc) + '\n')
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
