"""Build additional Arcadians stem-pair and fixed-input mode-comparison galleries.

The CI source bundle is made from the already-completed timeline analysis. It
contains the original MP3 and exact floating-point stem WAVs, not display FLACs.
No separation or model inference is repeated in the lightweight gallery job.
"""
from __future__ import annotations

import argparse
from array import array
import base64
import hashlib
import html
import json
import math
from pathlib import Path
import re
import shutil
import sys
import tempfile

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'src'))
from stemlab.static_timeline import read_json, write_json, safe_file, digest
from build_arcadians_demo import ARCADIANS_BPM, ARCADIANS_SHA256, read_payload, validate_revision
from recording_downloads import compress_downloads, read_recording

GALLERIES = ('arcadians-stems', 'arcadians-averages')
STEM_NAMES = {'vocals', 'drums', 'bass', 'guitar', 'piano', 'other'}


def prepare_sources(results: Path, output: Path, source_commit: str, *, coverage: dict, expected_sha=ARCADIANS_SHA256) -> dict:
    """Freeze only verified source/stem bytes for a downstream same-run artifact."""
    from stemlab.audio import audio_info
    validate_revision(source_commit)
    if coverage.get('status') != 'complete' or coverage.get('source_sha256') != expected_sha:
        raise ValueError('Recording sources require the completed real Arcadians core recipe')
    if output.exists():
        raise FileExistsError('Choose a new recording-source bundle directory')
    analysis = read_json(results/'analysis.json')
    model = next((m for m in analysis['models'] if m.get('spec', {}).get('slug') == 'htdemucs_6s'), None)
    if not model or model.get('error') or {s['stem'] for s in model['stems']} != STEM_NAMES:
        raise ValueError('Six genuine HTDemucs stems required')
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent, prefix='.recording-sources-') as temp:
        stage = Path(temp)/'bundle'
        stage.mkdir()
        files = []
        def copy(relative, destination, key):
            src = safe_file(results, relative)
            dst = stage/destination
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(src, dst)
            sha = digest(src)
            if digest(dst) != sha:
                raise ValueError('Source changed while creating recording bundle')
            files.append(dict(key=key, path=destination, sha256=sha, **audio_info(dst)))
        copy(analysis['source']['copied_path'], 'input/audio.mp3', 'master')
        if files[0]['sha256'] != expected_sha:
            raise ValueError('Master identity mismatch')
        stems = []
        for stem in sorted(model['stems'], key=lambda s: s['stem']):
            destination = 'stems/htdemucs_6s/'+stem['stem']+'.wav'
            copy(stem['path'], destination, 'htdemucs_6s/'+stem['stem'])
            stems.append(dict(model='htdemucs_6s', stem=stem['stem'], path=destination))
        manifest = dict(format='stemlab.arcadians-recording-sources', source_commit=source_commit,
            analysis_commit=coverage['analysis_commit'], recipe=coverage['recipe'],
            dependencies=coverage.get('dependencies', {}), files=files,
            source_sha256=expected_sha, source_scope='Actual complete-analysis stems; original normalized float WAV bytes')
        write_json(stage/'source-bundle.json', manifest)
        write_json(stage/'analysis.json', dict(source={'copied_path': 'input/audio.mp3', 'sha256': expected_sha},
            models=[{'spec': {'slug': 'htdemucs_6s'}, 'error': None, 'stems': stems}], beats=[]))
        verify_sources(stage, source_commit, expected_sha=expected_sha)
        stage.rename(output)
    return manifest


def verify_sources(source: Path, source_commit: str, *, expected_sha=ARCADIANS_SHA256) -> dict:
    from stemlab.audio import audio_info
    from stemlab.analysis.rudiment_recordings import source_catalogue
    manifest = read_json(safe_file(source, 'source-bundle.json'))
    validate_revision(source_commit)
    if (manifest.get('format') != 'stemlab.arcadians-recording-sources'
            or manifest.get('source_commit') != source_commit or manifest.get('source_sha256') != expected_sha):
        raise ValueError('Recording source bundle identity/revision mismatch')
    catalogue = source_catalogue(source)
    expected_keys = {'master'} | {'htdemucs_6s/'+name for name in STEM_NAMES}
    entries = manifest.get('files', [])
    if set(catalogue) != expected_keys or {f['key'] for f in entries} != expected_keys or len(entries) != 7:
        raise ValueError('Source bundle must contain exactly the master and six distinct stem roles')
    master_info = audio_info(catalogue['master'])
    hashes = []
    for entry in entries:
        path = safe_file(source, entry['path'])
        info = audio_info(path)
        # CLI callers supply relative bundle roots; source_catalogue resolves its
        # paths. Compare canonical paths, but keep all safe_file containment and
        # symlink checks, then verify the original bytes independently.
        if path.resolve() != catalogue[entry['key']].resolve():
            raise ValueError('Source bundle path mismatch: ' + entry['key'])
        if digest(path) != entry['sha256']:
            raise ValueError('Source bundle hash mismatch: ' + entry['key'])
        for field in ('sample_rate', 'num_frames', 'num_channels', 'subtype'):
            if info[field] != entry[field]:
                raise ValueError('Source bundle audio metadata mismatch')
        if abs(info['duration_seconds']-master_info['duration_seconds']) > 1/master_info['sample_rate']:
            raise ValueError('Source bundle stems must span the complete song')
        if entry['key'] != 'master':
            hashes.append(entry['sha256'])
            if info['subtype'] not in ('FLOAT', 'DOUBLE'):
                raise ValueError('Use actual floating-point stems, not listening derivatives')
    if len(set(hashes)) != 6 or expected_sha in hashes:
        raise ValueError('Do not disguise duplicate/master audio as separate stems')
    if digest(catalogue['master']) != expected_sha:
        raise ValueError('Master identity mismatch')
    return manifest


def build_pair_demos(sources: Path, site: Path, *, source_commit: str, companion_commit: str,
                     companion_license: str, release_tag='main', expected_sha=ARCADIANS_SHA256,
                     title='Arcadians', stem_candidates=60, comparison_pairs=30, progress=print,
                     compress_recordings=False) -> dict:
    from dancerudiments_authoring.harness import render_template
    from stemlab.analysis.rudiment_pairs import generate_stem_batch, generate_average_comparison_batch
    validate_revision(companion_commit)
    bundle = verify_sources(sources, source_commit, expected_sha=expected_sha)
    if not companion_license.strip() or not re.fullmatch(r'[A-Za-z0-9][A-Za-z0-9._+-]{0,79}', release_tag):
        raise ValueError('Companion licence and a safe release label are required')
    if any((site/name).exists() for name in GALLERIES):
        raise FileExistsError('Pair demo already exists; never merge stale outputs')
    existing = site/'arcadians/release-demo.json'
    if existing.is_file() and read_json(existing)['stemlab_commit'] != source_commit:
        raise ValueError('Existing master demo has a different revision')
    site.mkdir(parents=True, exist_ok=True)
    source_info = next(f for f in bundle['files'] if f['key'] == 'master')
    outputs = {}
    # Both pages are staged before either is installed. Source audio remains separate.
    with tempfile.TemporaryDirectory(prefix='.pair-demos-', dir=site.parent) as temporary:
        stage = Path(temporary)
        for name, function, arguments in [
            ('arcadians-stems', generate_stem_batch, {'max_candidates': stem_candidates}),
            ('arcadians-averages', generate_average_comparison_batch, {'max_pairs': comparison_pairs}),
        ]:
            gallery = stage/name
            report = function(sources, gallery, bpm=ARCADIANS_BPM, confirmed=True, seed=17,
                              include_audio=True, harness=True, progress=progress, **arguments)
            expected_count = stem_candidates if name == 'arcadians-stems' else comparison_pairs*6
            if report['candidate_count'] != expected_count:
                raise ValueError('Pair demo did not generate all requested candidates/groups')
            compress_downloads(gallery/'index.html', report['harness'], enabled=compress_recordings)
            if compress_recordings:
                for candidate in report['candidates']:
                    candidate['file'] += '.gz'
            description = ('X and Y use different actual separated stems; raw and independently filtered routes.'
                if name == 'arcadians-stems' else 'Fixed input pairs: peak, per-pip average, and centered moving averages '
                'over 1/8, 1/4, 1/2 and 1 beat. Every variant shares the same peak-normalization reference.')
            notice = (f'{title} — Kieran Simkin\n'+description+'\n'
                'Original MP3 included at the artist\'s request. Audio/derived-data rights remain applicable; '
                'MIT software licensing does not relicense the song.\n'
                '145 BPM: artist-confirmed. Beat-zero phase: unverified. No autoplay or implicit looping.\n'
                'Inputs reuse the full timeline analysis\'s normalized floating-point stems, not FLAC listening derivatives.\n'
                'Recording downloads may be losslessly compressed JSON (.json.gz); no samples are removed.\n'
                f'StemLab commit: {source_commit}\nDanceRudiments commit: {companion_commit}\n')
            (gallery/'SOURCE-NOTICE.txt').write_text(notice, encoding='utf-8')
            (gallery/'DANCERUDIMENTS-LICENSE.txt').write_text(companion_license, encoding='utf-8')
            payload = read_payload(gallery/'index.html')
            payload.update(source_commit=source_commit, version=release_tag,
                           notices=notice+'\n'+companion_license)
            page = render_template(payload).replace('</head>', '<link rel="icon" href="data:,"></head>', 1)
            banner = ('<p><strong>'+html.escape(title)+' — '+html.escape(report['batch_kind'])+'</strong><br>'
                +html.escape(description)+'<br>Press Play to hear the original song. '
                'Use the family filter to select one pair and compare up to four settings at a time.<br>'
                '<a href="../">All demos</a> · <a href="../arcadians/">Master movements</a> · '
                '<a href="../arcadians-stems/">Stem pairs</a> · <a href="../arcadians-averages/">Average comparisons</a> · '
                '<a href="../timeline/arcadians/">Timeline</a> · <a href="report.json">Exact routes and settings</a> · '
                '<a href="SOURCE-NOTICE.txt">Source notes</a></p>')
            page = page.replace('</header>', banner+'</header>', 1)
            (gallery/'index.html').write_text(page, encoding='utf-8')
            report['harness']['html_sha256'] = digest(gallery/'index.html')
            write_json(gallery/'index.json', report['harness'])
            write_json(gallery/'report.json', report)
            provenance = dict(format='stemlab.arcadians-pair-demo', schema_version=1,
                gallery=name, batch_kind=report['batch_kind'], stemlab_commit=source_commit,
                dancerudiments_commit=companion_commit, analysis_commit=bundle['analysis_commit'],
                source_bundle_sha256=digest(sources/'source-bundle.json'), stem_sources=bundle['files'],
                source=dict(title=title, artist='Kieran Simkin', sha256=expected_sha,
                            sample_rate=source_info['sample_rate'], channels=source_info['num_channels'],
                            frames=source_info['num_frames'], duration_seconds=source_info['duration_seconds']),
                candidate_count=report['candidate_count'], pair_count=report['pair_count'], dimensions=[2],
                variants=report['variants'], clock=report['clock'], pips_per_beat=64, sample_dtype='float64',
                audio_file='audio.mp3', audio_included=True, autoplay=False, seed=17,
                renderer=report['harness']['renderer'], normalization_reference=report['normalization_reference'])
            write_json(gallery/'release-demo.json', provenance)
            verify_pair_gallery(gallery, expected_sha=expected_sha, source_commit=source_commit)
            outputs[name] = provenance
        for name in GALLERIES:
            (stage/name).rename(site/name)
    if (site/'arcadians/release-demo.json').is_file():
        main = read_json(site/'arcadians/release-demo.json')
        if main['stemlab_commit'] != source_commit:
            raise ValueError('Existing master demo has a different revision')
        main['additional_galleries'] = {name: {'path': name+'/',
            'provenance_sha256': digest(site/name/'release-demo.json'),
            'candidate_count': value['candidate_count']} for name, value in outputs.items()}
        write_json(site/'arcadians/release-demo.json', main)
    return outputs


def verify_pair_gallery(gallery: Path, *, expected_sha=ARCADIANS_SHA256, source_commit=None) -> dict:
    """Check records, UI sample columns and fixed-input comparison contracts, without executing downloaded code."""
    provenance = read_json(safe_file(gallery, 'release-demo.json'))
    report = read_json(safe_file(gallery, 'report.json'))
    harness = read_json(safe_file(gallery, 'index.json'))
    payload = read_payload(safe_file(gallery, 'index.html'))
    count = provenance['candidate_count']
    if (provenance['format'] != 'stemlab.arcadians-pair-demo' or provenance['gallery'] not in GALLERIES
            or source_commit is not None and provenance['stemlab_commit'] != source_commit):
        raise ValueError('Pair demo revision/schema mismatch')
    if (digest(safe_file(gallery, 'audio.mp3')) != expected_sha or payload['audio']['sha256'] != expected_sha
            or provenance['source']['sha256'] != expected_sha or payload['audio']['relative_path'] != 'audio.mp3'):
        raise ValueError('Pair demo must bundle the unchanged original MP3')
    clock = payload['clock']
    if (clock != report['clock'] or clock != provenance['clock'] or clock['bpm'] != ARCADIANS_BPM
            or clock['bpm_status'] != 'confirmed' or clock['phase_status'] != 'unverified'
            or clock['beat_zero_seconds'] != 0 or clock['start_pip'] != 0
            or payload['pack']['pips_per_beat'] != 64 or payload['pack']['sample_dtype'] != 'float64'):
        raise ValueError('Pair recording clock/precision contract mismatch')
    if (payload['audio']['range_start'] != 0 or abs(payload['audio']['range_end'] - provenance['source']['duration_seconds']) > 1e-6):
        raise ValueError('Pair demo must cover the entire song')
    if (count != len(payload['pack']['patterns']) or count != report['candidate_count']
            or count != len(report['candidates']) or count != harness['candidates']
            or harness['html_sha256'] != digest(gallery/'index.html') or report['harness'] != harness):
        raise ValueError('Pair demo candidate/checksum mismatch')
    patterns = {p['name']: p for p in payload['pack']['patterns']}
    files = {p.name for p in (gallery/'recordings').glob('*')}
    if files != {Path(c['file']).name for c in report['candidates']}:
        raise ValueError('Missing or unlisted pair recordings')
    raw = base64.b64decode(payload['recording_data'], validate=True)
    sources = {s['key']: s['sha256'] for s in provenance['stem_sources']}
    records = {}
    for candidate in report['candidates']:
        document = read_recording(safe_file(gallery, candidate['file']))
        pattern = patterns[candidate['name']]
        if document['clock'] != clock or document['dimensions'] != ['x', 'y'] or pattern['dimensions'] != ['x', 'y']:
            raise ValueError('Pair recordings must have exactly two dimensions on one clock')
        values = document['samples']
        if (len(values) != pattern['period_pips'] or not values or any(len(row) != 2 for row in values)
                or any(isinstance(v, bool) or not isinstance(v, (float, int)) or not math.isfinite(v) or abs(v) > 1
                       for row in values for v in row)):
            raise ValueError('Invalid pair samples')
        def binary(items):
            packed = array('d', (v+0. for v in items))
            if sys.byteorder != 'little':
                packed.byteswap()
            return packed.tobytes()
        if hashlib.sha256(binary(v for row in values for v in row)).hexdigest() != candidate['sample_sha256']:
            raise ValueError('Pair recording sample hash mismatch')
        for j, offset in enumerate(pattern['column_offsets']):
            if binary(row[j] for row in values) != raw[offset:offset+len(values)*8]:
                raise ValueError('Visualizer samples differ from the authoritative pair recording')
        meta = document['provenance']
        if meta != pattern['provenance'] and any(meta.get(k) != pattern['provenance'].get(k) for k in meta):
            raise ValueError('Visualizer provenance mismatch')
        if meta['route_sources'] != candidate['sources'] or meta['route_filters'] != candidate['filters']:
            raise ValueError('Pair routing metadata mismatch')
        for axis, key in zip(meta['axes'], candidate['sources']):
            if sources.get(key) != axis['source_sha256']:
                raise ValueError('Movement is not bound to its source stem')
        if report['batch_kind'] == 'stem-pairs':
            x, y = candidate['sources']
            if x == 'master' or y == 'master' or x.split('/')[-1] == y.split('/')[-1] or sources[x] == sources[y]:
                raise ValueError('X and Y must use different real stems')
        records[candidate['name']] = meta
    for group in report['pairs']:
        if len(group['candidates']) != len(report['variants']):
            raise ValueError('Incomplete mode-comparison group')
        metas = [records[name] for name in group['candidates']]
        for meta, variant in zip(metas, report['variants']):
            if (meta['comparison_variant'] != variant or meta['pair_id'] != group['id']
                    or meta['route_sources'] != group['sources'] or meta['route_filters'] != group['filters']):
                raise ValueError('Comparison group inputs/settings changed')
            for j, axis in enumerate(meta['axes']):
                if axis['mode'] != variant['mode'] or (axis['mode'] == 'moving-average'
                        and axis['moving_average_beats'] != variant['window_beats']):
                    raise ValueError('Comparison amplitude settings differ from their labels')
                for key in ('source_sha256', 'low_pass', 'high_pass', 'filter_order', 'gain', 'normalization_divisor'):
                    if axis[key] != metas[0]['axes'][j][key]:
                        raise ValueError('Comparison changed inputs, filters, gain or normalization')
    if report['batch_kind'] == 'mode-comparison' and report['normalization_reference'] != 'peak':
        raise ValueError('Mode comparisons require a shared peak reference')
    return provenance


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--sources', type=Path, required=True)
    parser.add_argument('--site', type=Path, required=True)
    parser.add_argument('--source-commit', required=True)
    parser.add_argument('--companion-commit', required=True)
    parser.add_argument('--companion-license', type=Path, required=True)
    parser.add_argument('--release-tag', default='main')
    args = parser.parse_args()
    result = build_pair_demos(args.sources, args.site, source_commit=args.source_commit,
        companion_commit=args.companion_commit, companion_license=args.companion_license.read_text(encoding='utf-8'),
        release_tag=args.release_tag, compress_recordings=True)
    print(json.dumps({name: value['candidate_count'] for name, value in result.items()}, indent=2))


if __name__ == '__main__':
    main()
