"""Publish an existing, successful Arcadians demo without rebuilding or releasing.

This trusted-checkout helper selects same-repository/manual/main workflow artifacts,
reuses the existing site's verifier, checks the saved HTTP browser QA, and probes the
actual public deployment. It never executes code from downloaded artifacts.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import time
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

from build_arcadians_demo import ARCADIANS_SHA256, digest, validate_revision, verify_site
from assemble_arcadians_site import verify_timeline_qa
from build_arcadians_pair_demos import GALLERIES, verify_pair_gallery
from build_arcadians_fourier_demo import CHANNELS, GALLERY as FOURIER_GALLERY, verify_fourier_gallery

REPOSITORY = 'kieransimkin/stemlab'
WORKFLOW = '.github/workflows/arcadians-demo.yml'
ARTIFACTS = ('stemlab-arcadians-pages', 'stemlab-arcadians-browser-qa')


def api_json(path: str) -> dict:
    token = os.environ.get('GH_TOKEN')
    if not token:
        raise ValueError('GH_TOKEN is required to read workflow artifacts')
    request = Request('https://api.github.com/repos/' + REPOSITORY + '/' + path,
                      headers={'Authorization': 'Bearer ' + token,
                               'Accept': 'application/vnd.github+json',
                               'X-GitHub-Api-Version': '2022-11-28'})
    with urlopen(request, timeout=30) as response:
        return json.load(response)


def run_number(value: str) -> int:
    if not re.fullmatch(r'[1-9][0-9]{0,17}', value):
        raise ValueError('Demo run ID must be a positive numeric workflow run ID')
    return int(value)


def validate_run(run: dict) -> str:
    if (run.get('repository', {}).get('full_name') != REPOSITORY
            or run.get('head_repository', {}).get('full_name') != REPOSITORY
            or run.get('head_branch') != 'main'
            or run.get('event') != 'workflow_dispatch'
            or run.get('path') != WORKFLOW
            or run.get('status') != 'completed'
            or run.get('conclusion') != 'success'):
        raise ValueError('Only a successful Arcadians release demo manually started on '
                         'this repository\'s main branch may be published')
    return validate_revision(run.get('head_sha', ''))


def select_run(requested: str = '') -> dict:
    if requested:
        identifier = run_number(requested)
    else:
        query = urlencode(dict(branch='main', event='workflow_dispatch', status='success', per_page=1))
        results = api_json('actions/workflows/arcadians-demo.yml/runs?' + query)['workflow_runs']
        if not results:
            raise ValueError('No successful Arcadians demo exists; run Arcadians release demo on main first')
        identifier = run_number(str(results[0]['id']))
    run = api_json(f'actions/runs/{identifier}')
    sha = validate_run(run)
    result = dict(run_id=identifier, source_sha=sha)
    for name, output in zip(ARTIFACTS, ('site_artifact_id', 'qa_artifact_id')):
        query = urlencode(dict(name=name, per_page=100))
        collection = api_json(f'actions/runs/{identifier}/artifacts?' + query)
        artifacts = collection['artifacts']
        if collection['total_count'] != 1 or len(artifacts) != 1:
            raise ValueError(f'Expected exactly one {name} artifact for run {identifier}')
        artifact = artifacts[0]
        if (artifact.get('name') != name or artifact.get('expired') is not False
                or not 0 < artifact.get('size_in_bytes', 0) <= 900 * 1024 * 1024
                or artifact.get('workflow_run', {}).get('id') != identifier
                or artifact.get('workflow_run', {}).get('head_sha') != sha):
            raise ValueError(f'Invalid, expired or mismatched artifact: {name}')
        result[output] = run_number(str(artifact['id']))
    return result


def verify_qa(qa: dict, provenance: dict, *, expected_candidates=48) -> None:
    required_true = ('hosted_file_loading_verified', 'bundled_audio', 'play_pause',
                     'seek_both_directions', 'restart', 'audio_clock', 'native_sample',
                     'arbitrary_axis_projection', 'review_export_import', 'non_looping')
    if (qa.get('format') != 'stemlab.arcadians-audio-browser-check'
            or qa.get('status') != 'passed'
            or qa.get('mode') != 'http-project-pages-prefix'
            or any(qa.get(field) is not True for field in required_true)
            or qa.get('autoplay') is not False
            or qa.get('candidates') != expected_candidates or qa.get('sample_vectors_checked') != expected_candidates*3
            or qa.get('audio_source') != 'Arcadians'
            or qa.get('audio_sha256') != ARCADIANS_SHA256
            or qa.get('external_requests') != [] or qa.get('page_errors') != []
            or qa.get('bad_responses', []) != []):
        raise ValueError('Saved QA must certify all real-Arcadians HTTP browser checks')
    ranges, decoded = qa.get('http_ranges', {}), qa.get('decoded', {})
    if (ranges.get('verified') is not True or ranges.get('partial_requests', 0) < 3
            or decoded.get('channels') != 2
            or not decoded.get('peak', 0) > .001
            or not decoded.get('rms', 0) > .00001
            or not abs(decoded.get('duration', 0) - provenance['source']['duration_seconds']) < .2):
        raise ValueError('Saved QA lacks valid seeking or decoded stereo audio evidence')


def verify_artifacts(site: Path, qa_path: Path, source_sha: str) -> dict:
    validate_revision(source_sha)
    verified = verify_site(site)
    provenance = json.loads((site / 'arcadians/release-demo.json').read_text(encoding='utf-8'))
    if provenance.get('stemlab_commit') != source_sha:
        raise ValueError('Site provenance does not match the selected workflow commit')
    qa = json.loads(qa_path.read_text(encoding='utf-8'))
    verify_qa(qa, provenance)
    if qa['http_ranges'].get('audio_bytes') != (site / 'arcadians/audio.mp3').stat().st_size:
        raise ValueError('QA refers to a different audio file size')
    # A newly deployed movement-only archive would erase the timeline. Reject old
    # archives rather than claiming two demos while uploading only one.
    verify_timeline_qa(site / 'timeline/arcadians',
                       qa_path.with_name('arcadians-timeline-browser.json'), source_sha)
    verify_pair_artifacts(site, qa_path.parent, source_sha)
    verify_fourier_artifacts(site, qa_path.parent, source_sha)
    verify_reference_artifacts(site, qa_path.parent, source_sha)
    return dict(verified, source_sha=source_sha, browser_qa='passed', timeline_qa='passed', pair_galleries_qa='passed')


def verify_reference_artifacts(site: Path, qa_dir: Path, source_sha: str) -> None:
    from build_beat_example import SOURCE_SHA, SLUG, verify_example
    timeline = site/'timeline'/SLUG
    verify_example(timeline, source_sha)
    qa = json.loads((qa_dir/'truth-beat-browser.json').read_text(encoding='utf-8'))
    required = ('no_autoplay', 'play_pause', 'seek', 'audio_clock', 'zoom_fit',
                'images_loaded', 'all_expected_lanes', 'no_backend_requests')
    if (qa.get('format') != 'stemlab.timeline-browser-check' or qa.get('status') != 'passed'
            or qa.get('mode') != 'http-project-pages-prefix'
            or qa.get('source_sha256') != SOURCE_SHA
            or qa.get('snapshot_sha256') != digest(timeline/'snapshot.json')
            or any(qa.get(key) is not True for key in required)
            or qa.get('beat_offsets', {}).get('status') != 'passed'
            or qa['beat_offsets'].get('comparisons_checked') != 6
            or any(qa.get(key) != [] for key in ('page_errors', 'bad_responses', 'external_requests'))):
        raise ValueError('Reference beat example requires matching real HTTP playback and offset-grid QA')


def verify_fourier_artifacts(site: Path, qa_dir: Path, source_sha: str) -> None:
    gallery = site/FOURIER_GALLERY
    provenance = verify_fourier_gallery(gallery, source_commit=source_sha)
    report = json.loads((gallery/'report.json').read_text(encoding='utf-8'))
    for item in report['candidates']:
        n = item['bands']
        qa = json.loads((qa_dir/f'arcadians-fourier-{n}-audio-browser.json').read_text(encoding='utf-8'))
        verify_qa(qa, provenance, expected_candidates=1)
        if (qa.get('gallery') != FOURIER_GALLERY or qa.get('channels') != n or qa.get('view') != item['view']
                or qa.get('html_sha256') != digest(gallery/item['view'])
                or qa['http_ranges'].get('audio_bytes') != (gallery/'audio.mp3').stat().st_size
                or qa.get('view_modes') != ['xy', 'bars'] or qa.get('all_dimension_bars') is not True
                or qa.get('bar_channels_checked') != n or qa.get('resolution_selector') is not True):
            raise ValueError('Fourier browser QA is stale or belongs to a different resolution')


def verify_pair_artifacts(site: Path, qa_dir: Path, source_sha: str) -> None:
    """Mandatory on new publications: older sites must not erase the extra demos."""
    for name, expected in zip(GALLERIES, (60, 180)):
        provenance = verify_pair_gallery(site/name, source_commit=source_sha)
        if provenance['candidate_count'] != expected:
            raise ValueError('Missing requested pair-demo candidates')
        qa = json.loads((qa_dir/(name+'-audio-browser.json')).read_text(encoding='utf-8'))
        verify_qa(qa, provenance, expected_candidates=expected)
        if name == 'arcadians-averages' and qa.get('pair_family_filter') is not True:
            raise ValueError('Average comparison must validate its fixed-pair family filter')
        if (qa.get('gallery') != name or qa.get('html_sha256') != digest(site/name/'index.html')
                or qa['http_ranges'].get('audio_bytes') != (site/name/'audio.mp3').stat().st_size):
            raise ValueError('Pair-demo browser QA is stale or belongs to a different gallery')


def public_request(url: str, *, headers=None, limit=90 * 1024 * 1024) -> tuple[int, dict, bytes]:
    request = Request(url, headers={'Cache-Control': 'no-cache', 'Accept-Encoding': 'identity',
                                   **(headers or {})})
    with urlopen(request, timeout=30) as response:
        body = response.read(limit + 1)
        if len(body) > limit:
            raise ValueError('Public response exceeds expected size')
        return response.status, dict(response.headers.items()), body


def verify_live(base_url: str, site: Path, source_sha: str, *, attempts: int = 12,
                delay: float = 5) -> dict:
    parts = urlsplit(base_url)
    if (parts.scheme != 'https' or not parts.hostname or parts.username or parts.password
            or parts.query or parts.fragment):
        raise ValueError('Use the HTTPS site URL returned by deploy-pages')
    validate_revision(source_sha)
    if attempts < 1:
        raise ValueError('At least one public verification attempt is required')
    base = base_url.rstrip('/') + '/'
    gallery = base + 'arcadians/'
    audio = site / 'arcadians/audio.mp3'
    size = audio.stat().st_size
    last_error = None
    for attempt in range(attempts):
        try:
            status, _, raw = public_request(gallery + 'release-demo.json', limit=65536)
            provenance = json.loads(raw)
            if status != 200 or provenance.get('stemlab_commit') != source_sha:
                raise ValueError('Public Pages deployment is missing or still serving an older build')
            for url, local in [(base, site / 'index.html'),
                               (gallery, site / 'arcadians/index.html')]:
                status, _, content = public_request(url)
                if status != 200 or hashlib.sha256(content).hexdigest() != digest(local):
                    raise ValueError('Public page differs from the verified build: ' + url)
            status, headers, content = public_request(gallery + 'audio.mp3',
                                                      headers={'Range': 'bytes=0-31'}, limit=32)
            headers = {key.lower(): value for key, value in headers.items()}
            with audio.open('rb') as handle:
                expected = handle.read(32)
            if (status != 206 or content != expected
                    or headers.get('content-range') != f'bytes 0-31/{size}'):
                raise ValueError('The public MP3 is unavailable or does not honour byte ranges')
            if (site / 'timeline/arcadians').is_dir():
                verify_live_timeline(base, site / 'timeline/arcadians', source_sha)
            if (site/'timeline/the-truth-is-a-virus').is_dir():
                verify_live_timeline(base, site/'timeline/the-truth-is-a-virus', source_sha,
                                     name='the-truth-is-a-virus')
            for name in GALLERIES:
                if (site/name).exists():
                    verify_live_pair(base, site/name, name, source_sha)
            if (site/FOURIER_GALLERY).exists():
                verify_live_fourier(base, site/FOURIER_GALLERY, source_sha)
            return dict(status='passed', url=gallery, source_sha=source_sha,
                        html_matches_tested_artifact=True, public_audio_range_verified=True,
                        live_browser_playback_tested=False)
        except (OSError, ValueError) as exc:
            last_error = exc
            if attempt + 1 < attempts:
                print(f'Waiting for Pages propagation ({attempt + 1}/{attempts}): {exc}', flush=True)
                time.sleep(delay)
    raise RuntimeError(f'Pages deployment was submitted but the live URL did not verify: {last_error}')


def verify_live_fourier(base: str, gallery: Path, source_sha: str) -> None:
    # Reuse exact-file and byte-range checks for the overview/source/report/audio.
    verify_live_pair(base, gallery, FOURIER_GALLERY, source_sha)
    for n in CHANNELS:
        file = f'bands-{n}.html'
        status, _, content = public_request(base.rstrip('/')+'/'+FOURIER_GALLERY+'/'+file)
        if status != 200 or hashlib.sha256(content).hexdigest() != digest(gallery/file):
            raise ValueError('Public Fourier view differs from tested build: '+file)


def verify_live_pair(base: str, gallery: Path, name: str, source_sha: str) -> None:
    provenance = json.loads((gallery/'release-demo.json').read_text(encoding='utf-8'))
    if provenance['stemlab_commit'] != source_sha:
        raise ValueError('Pair gallery is stale')
    prefix = base.rstrip('/')+'/'+name+'/'
    for file in ('index.html', 'release-demo.json', 'report.json'):
        status, _, content = public_request(prefix+file)
        if status != 200 or hashlib.sha256(content).hexdigest() != digest(gallery/file):
            raise ValueError('Public pair gallery differs from tested build: '+name+'/'+file)
    audio = gallery/'audio.mp3'
    status, headers, content = public_request(prefix+'audio.mp3', headers={'Range': 'bytes=0-31'}, limit=32)
    headers = {key.lower(): value for key, value in headers.items()}
    with audio.open('rb') as stream:
        expected = stream.read(32)
    if (status != 206 or content != expected or headers.get('content-range') != f'bytes 0-31/{audio.stat().st_size}'):
        raise ValueError('Public pair gallery audio is not seekable')


def verify_live_timeline(base: str, timeline: Path, source_sha: str, *, name='arcadians') -> None:
    snapshot = json.loads((timeline / 'snapshot.json').read_text(encoding='utf-8'))
    if snapshot['source_commit'] != source_sha:
        raise ValueError('Timeline export is stale')
    if name not in ('arcadians', 'the-truth-is-a-virus'):
        raise ValueError('Unknown public timeline')
    prefix = base.rstrip('/') + '/timeline/'+name+'/'
    for name in ('index.html', 'snapshot.json', 'data/timeline.json', 'assets/app.js',
                 'assets/static-timeline.js', 'assets/style.css', 'assets/timeline.css'):
        status, _, data = public_request(prefix + name)
        if status != 200 or hashlib.sha256(data).hexdigest() != digest(timeline / name):
            raise ValueError('Public timeline/asset differs from tested snapshot: ' + name)
    for name in snapshot['files']:
        if name.startswith('data/deep/midi/') and name.endswith(('/transcription.mid', '/notes.json', '/report.json')):
            status, _, data = public_request(prefix + name)
            if status != 200 or hashlib.sha256(data).hexdigest() != digest(timeline / name):
                raise ValueError('Public MIDI artifact differs from tested snapshot: ' + name)
    audio = timeline / snapshot['audio_path']
    status, headers, data = public_request(prefix + snapshot['audio_path'],
                                          headers={'Range': 'bytes=0-31'}, limit=32)
    headers = {k.lower(): v for k, v in headers.items()}
    with audio.open('rb') as handle:
        expected = handle.read(32)
    if status != 206 or data != expected or headers.get('content-range') != f'bytes 0-31/{audio.stat().st_size}':
        raise ValueError('Public timeline audio is not seekable')


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    commands = parser.add_subparsers(dest='command', required=True)
    select = commands.add_parser('select')
    select.add_argument('--run-id', default='')
    verify = commands.add_parser('verify')
    verify.add_argument('--site', type=Path, required=True)
    verify.add_argument('--qa', type=Path, required=True)
    verify.add_argument('--source-sha', required=True)
    live = commands.add_parser('live')
    live.add_argument('--url', required=True)
    live.add_argument('--site', type=Path, required=True)
    live.add_argument('--source-sha', required=True)
    args = parser.parse_args()
    try:
        if args.command == 'select':
            result = select_run(args.run_id)
            if output := os.environ.get('GITHUB_OUTPUT'):
                with open(output, 'a', encoding='utf-8') as handle:
                    for key, value in result.items():
                        handle.write(f'{key}={value}\n')
        elif args.command == 'verify':
            result = verify_artifacts(args.site, args.qa, args.source_sha)
        else:
            result = verify_live(args.url, args.site, args.source_sha)
        print(json.dumps(result, indent=2))
    except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
