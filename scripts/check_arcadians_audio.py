"""Browser gate for bundled audio and the shared recording clock.

Default: serve the generated site under /stemlab/, like GitHub project Pages.
--in-memory is an explicit restricted-environment test mode, never used in CI.
This checks decoded non-silent audio and transport, not subjective listening quality.
"""
from __future__ import annotations

import argparse
import base64
from functools import partial
from http.server import ThreadingHTTPServer
import json
from pathlib import Path
import sys
import threading
from urllib.request import Request, urlopen

from arcadians_http import ProjectHandler
from build_arcadians_demo import read_payload


def verify_audio_ranges(url: str, audio_file: Path) -> dict:
    """Prove the HTTP transport supports seeking before starting the browser."""
    size = audio_file.stat().st_size
    if size < 1:
        raise ValueError('Audio file is empty')
    with urlopen(Request(url, method='HEAD'), timeout=10) as response:
        assert response.status == 200
        assert response.headers.get('Accept-Ranges') == 'bytes'
        assert int(response.headers['Content-Length']) == size
        assert not response.read(), 'HEAD must not include audio bytes'
    width = min(size, 32)
    spans = [(f'bytes=0-{width-1}', 0, width-1),
             (f'bytes=-{width}', size-width, size-1),
             (f'bytes={size-width}-', size-width, size-1)]
    for header, start, end in spans:
        with urlopen(Request(url, headers={'Range': header}), timeout=10) as response:
            assert response.status == 206, 'Audio server must honour byte-range requests'
            assert response.headers['Content-Range'] == f'bytes {start}-{end}/{size}'
            assert int(response.headers['Content-Length']) == end-start+1
            received = response.read()
        with audio_file.open('rb') as source:
            source.seek(start)
            assert received == source.read(end-start+1), 'Wrong partial audio payload'
    return {'verified': True, 'partial_requests': len(spans), 'audio_bytes': size}


def _failure_report(report_path: Path, exc: Exception, stage: str, *, page=None,
                    screenshot=None, in_memory=False, errors=(), bad_responses=(),
                    ranges=None, target=None):
    """Retain useful evidence before Playwright/browser teardown, even on timeout."""
    result = dict(format='stemlab.arcadians-audio-browser-check', status='failed',
                  mode='in-memory' if in_memory else 'http-project-pages-prefix',
                  stage=stage, error_type=type(exc).__name__, error=str(exc),
                  target_seconds=target, http_ranges=ranges,
                  page_errors=list(errors), bad_responses=list(bad_responses),
                  hosted_file_loading_verified=False, listening_qa=False)
    if page is not None:
        try:
            result['browser_state'] = page.evaluate("""() => {
                const a = document.getElementById('audio');
                const spans = r => Array.from({length:r.length}, (_,i)=>[r.start(i),r.end(i)]);
                const media = a ? {src:a.currentSrc, time:a.currentTime,
                    duration:Number.isFinite(a.duration)?a.duration:null,
                    paused:a.paused, seeking:a.seeking, ended:a.ended,
                    readyState:a.readyState, networkState:a.networkState,
                    seekable:spans(a.seekable), buffered:spans(a.buffered),
                    error:a.error?{code:a.error.code,message:a.error.message}:null} : null;
                return {url:location.href, audio:media, audition:window.audition?.state()};
            }""")
        except Exception as diagnostic_error:
            result['state_error'] = str(diagnostic_error)
        if screenshot:
            try:
                Path(screenshot).parent.mkdir(parents=True, exist_ok=True)
                page.screenshot(path=str(screenshot), timeout=5000)
                result['screenshot'] = Path(screenshot).name
            except Exception as diagnostic_error:
                result['screenshot_error'] = str(diagnostic_error)
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(result, indent=2) + '\n', encoding='utf-8')


def check(site: Path, report_path: Path, *, chromium=None, in_memory=False, screenshot=None, gallery_name='arcadians') -> dict:
    from playwright.sync_api import sync_playwright

    site = site.resolve()
    if gallery_name not in ('arcadians', 'arcadians-stems', 'arcadians-averages'):
        raise ValueError('Unknown movement gallery')
    gallery = site / gallery_name
    prefix = '/stemlab/' + gallery_name + '/'
    payload = read_payload(gallery / 'index.html')
    metadata = json.loads((gallery / 'release-demo.json').read_text(encoding='utf-8'))
    clock = payload['clock']
    audio_file = gallery / payload['audio']['relative_path']
    if not audio_file.is_file():
        raise ValueError('The public MP3 must exist alongside the visualizer')
    server = None
    origin = None
    stage, page, target = 'http-range-preflight', None, None
    ranges = {'verified': False, 'reason': ('in-memory mode bypasses HTTP' if in_memory
                                          else 'HTTP preflight not completed')}
    errors, bad_responses, requests = [], [], []
    if not in_memory:
        server = ThreadingHTTPServer(('127.0.0.1', 0), partial(ProjectHandler, directory=str(site)))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        origin = f'http://127.0.0.1:{server.server_port}'
    try:
        if not in_memory:
            ranges = verify_audio_ranges(origin + prefix + 'audio.mp3', audio_file)
        stage = 'browser-start'
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium,
                                                  args=['--no-sandbox'])
            try:
                page = browser.new_page(viewport={'width':1440, 'height':1000})
                page.on('pageerror', lambda e: errors.append(str(e)))
                page.on('request', lambda r: requests.append(r.url))
                page.on('response', lambda r: bad_responses.append((r.status, r.url)) if r.status >= 400 else None)
                stage = 'page-load'
                if in_memory:
                    page.set_content((gallery / 'index.html').read_text(encoding='utf-8'))
                else:
                    page.goto(origin + prefix, wait_until='load')
                stage = 'harness-ready'
                page.wait_for_function('window.audition?.ready === true', timeout=60000)
                if in_memory:
                    page.evaluate('''b64 => {
                        const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
                        document.getElementById('audio').src = URL.createObjectURL(new Blob([bytes], {type:'audio/mpeg'}));
                    }''', base64.b64encode(audio_file.read_bytes()).decode())
                # Metadata preload alone need not decode frames, so wait for metadata
                # now and require readiness after a user-gesture Play below.
                page.wait_for_function("document.getElementById('audio').readyState >= 1", timeout=30000)
                audio = page.locator('#audio')
                assert audio.evaluate('(a) => a.controls && !a.autoplay && a.paused && !a.muted')
                assert not page.evaluate('window.audition.state().running')
                assert page.locator('#bpm').input_value() == str(int(clock['bpm']))
                assert page.locator('#bpm').is_disabled() and page.locator('#offset').is_disabled()
                if not in_memory:
                    assert audio.evaluate('(a) => a.currentSrc') == origin + prefix + 'audio.mp3'
                stage = 'native-sample-comparison'
                # Check every stored dimension of every candidate at three points.
                # Expected data are the authoritative JSON, not a second sampler.
                patterns = payload['pack']['patterns']
                first = clock['start_pip']
                count = patterns[0]['period_pips']
                expected_vectors = []
                for pattern in patterns:
                    document = json.loads((gallery / pattern['recording_path']).read_text(encoding='utf-8'))
                    expected_vectors.append([document['samples'][i] for i in (0, count // 2, count - 1)])
                actual_vectors = page.evaluate('''([first,count]) => window.audition.metadata().map((_,i) =>
                    [0,Math.floor(count/2),count-1].map(k=>window.audition.sample(i,first+k)))''', [first,count])
                assert actual_vectors == expected_vectors, 'Native samples differ from recording JSON'
                assert page.evaluate('''p => {try{window.audition.sample(0,p);return false;}catch(e){return true;}}''', first-1)
                selected = next((i for i,item in enumerate(patterns) if len(item['dimensions']) > 3), None)
                if selected is not None:
                    n_dimensions = len(patterns[selected]['dimensions'])
                    mapping = [n_dimensions-1, n_dimensions-2, -1]
                    page.evaluate('([i,m])=>window.audition.setProjection(i,m)', [selected,mapping])
                    assert page.evaluate('i=>window.audition.projection(i)', selected) == mapping
                if selected is None and len(patterns[0]['dimensions']) >= 2:
                    mapping = [1, 0, -1]
                    page.evaluate('m=>window.audition.setProjection(0,m)', mapping)
                    assert page.evaluate('window.audition.projection(0)') == mapping
                    page.evaluate('window.audition.setProjection(0,[0,1,-1])')
                if gallery_name == 'arcadians-averages':
                    stage = 'fixed-pair-family-filter'
                    group = patterns[0]['provenance']['family']
                    expected = sum(p['provenance']['family'] == group for p in patterns)
                    page.locator('#family').select_option(group)
                    assert page.locator('#grid > .card').count() == expected
                    page.locator('#family').select_option('')
                # Check a decoded source window via Web Audio; this does not play a
                # second source. The actual HTML audio element remains the playback clock.
                if in_memory:
                    raw = base64.b64encode(audio_file.read_bytes()).decode()
                    decode_input = {'base64': raw}
                else:
                    decode_input = {'url': origin + prefix + 'audio.mp3'}
                stage = 'audio-decode'
                decoded = page.evaluate('''async input => {
                    const bytes = input.base64 ? Uint8Array.from(atob(input.base64), c=>c.charCodeAt(0)).buffer
                        : await (await fetch(input.url)).arrayBuffer();
                    const context = new AudioContext();
                    try {
                        const data = await context.decodeAudioData(bytes);
                        let sum=0, peak=0, count=0;
                        for (let c=0;c<data.numberOfChannels;c++) {
                            const x=data.getChannelData(c);
                            for(let i=0;i<x.length;i+=31) {sum+=x[i]*x[i];peak=Math.max(peak,Math.abs(x[i]));count++;}
                        }
                        return {duration:data.duration, channels:data.numberOfChannels, peak, rms:Math.sqrt(sum/count)};
                    } finally {await context.close();}
                }''', decode_input)
                assert decoded['peak'] > .001 and decoded['rms'] > .00001, 'Decoded source is silent'
                assert abs(decoded['duration'] - metadata['source']['duration_seconds']) < .2
                duration = audio.evaluate('(a) => a.duration')
                assert abs(duration - metadata['source']['duration_seconds']) < .2
                comparisons = [p['name'] for p in payload['pack']['patterns'][:4]]
                page.evaluate('(names) => window.audition.compare(names)', comparisons)
                def assert_clock():
                    value = page.evaluate('''() => ({time:document.getElementById('audio').currentTime,
                                                  beat:window.audition.state().beat})''')
                    expected = (value['time'] - clock['beat_zero_seconds']) * clock['bpm'] / 60
                    assert abs(value['beat'] - expected) < 1e-6, value
                # Shared Play starts the actual bundled source, not a silent timer.
                stage = 'shared-control-seek'
                target = duration * .37
                page.wait_for_function("""t => {
                    const a=document.getElementById('audio');
                    return Array.from({length:a.seekable.length}, (_,i)=>i).some(
                        i=>a.seekable.start(i)<=t && a.seekable.end(i)>=t);
                }""", arg=target, timeout=30000)
                page.evaluate('(b) => window.audition.setBeat(b)',
                              (target-clock['beat_zero_seconds']) * clock['bpm'] / 60)
                page.wait_for_function("""t => {const a=document.getElementById('audio');
                    return !a.seeking && Math.abs(a.currentTime-t)<.04;}""", arg=target)
                stage = 'play-pause'
                page.locator('#play').click()
                page.wait_for_function('!document.getElementById("audio").paused && window.audition.state().running')
                page.wait_for_function('(t)=>document.getElementById("audio").currentTime > t+.1', arg=target)
                assert_clock()
                page.locator('#play').click()
                page.wait_for_function('document.getElementById("audio").paused && !window.audition.state().running')
                stopped = audio.evaluate('(a) => a.currentTime')
                page.wait_for_timeout(150)
                assert abs(audio.evaluate('(a) => a.currentTime') - stopped) < .03
                # Native audio seek is also reflected by the movement clock.
                stage = 'native-audio-seek'
                target = duration * .63
                audio.evaluate('(a,t)=>{a.currentTime=t}', target)
                page.wait_for_function("""t => {const a=document.getElementById('audio');
                    return !a.seeking && Math.abs(a.currentTime-t)<.04;}""", arg=target)
                assert_clock()
                # Restart controls both media and movement, without starting playback.
                stage = 'restart'
                page.locator('#reset').click()
                page.wait_for_function("""() => {const a=document.getElementById('audio');
                    return !a.seeking && Math.abs(a.currentTime)<.04;}""")
                assert abs(audio.evaluate('(a)=>a.currentTime')) < .04
                assert not page.evaluate('window.audition.state().running')
                assert_clock()
                stage = 'playing-slider-seek'
                # Exercise the visible seek slider while audio is playing.
                page.locator('#play').click()
                page.wait_for_function('window.audition.state().running')
                target_pip = round(duration * .5 * clock['bpm'] / 60 * 64)
                page.locator('#seek').evaluate('(s,p)=>{s.value=p;s.dispatchEvent(new Event("input",{bubbles:true}))}', target_pip)
                page.wait_for_function("""t => {const a=document.getElementById('audio');
                    return !a.seeking && Math.abs(a.currentTime-t)<1;}""", arg=duration*.5)
                assert_clock()
                assert abs(audio.evaluate('(a)=>a.currentTime') - duration * .5) < 1
                page.locator('#play').click()
                # Also check the sample at the chosen middle position after transport edits.
                i = 0
                pip = payload['pack']['patterns'][i]['period_pips'] // 2
                recording = json.loads((gallery / payload['pack']['patterns'][i]['recording_path']).read_text())
                expected_sample = recording['samples'][pip]
                actual_sample = page.evaluate('([i,p])=>window.audition.sample(i,p)', [i,pip])
                assert actual_sample == expected_sample
                stage = 'review-export-import'
                name = patterns[0]['name']
                page.evaluate('name=>window.audition.setStatus(name,"keep")', name)
                review = page.evaluate('window.audition.review()')
                assert review['choices'][0]['status'] == 'keep'
                with page.expect_download() as download:
                    page.locator('#export-choices').click()
                review_path = report_path.with_name('arcadians-test-review.json')
                review_path.parent.mkdir(parents=True, exist_ok=True)
                download.value.save_as(review_path)
                assert json.loads(review_path.read_text(encoding='utf-8')) == review
                page.evaluate('doc=>window.audition.importReview(doc)', review)
                stage = 'end-of-recording'
                # Compressed-audio end events can arrive after the last sample
                # reaches duration. Wait for actual completion, not a 180 ms sleep.
                page.evaluate('beat=>window.audition.setBeat(beat)', (first+count-1)/64)
                page.wait_for_function("!document.getElementById('audio').seeking")
                page.evaluate('''() => {
                    window.__arcadiansEndPlay = false;
                    document.getElementById('audio').addEventListener('play', () => {
                        window.__arcadiansEndPlay = true;
                    }, {once:true});
                }''')
                page.locator('#play').click()
                page.wait_for_function('window.__arcadiansEndPlay === true', timeout=5000)
                page.wait_for_function('!window.audition.state().running && document.getElementById("audio").paused', timeout=5000)
                assert audio.evaluate('(a)=>a.currentTime') >= payload['audio']['range_end'] - .1
                assert page.evaluate('window.audition.state().beat') >= (first+count-2)/64
                page.evaluate('beat=>window.audition.setBeat(beat)', count/128)
                stage = 'screenshot-and-network-check'
                if screenshot:
                    Path(screenshot).parent.mkdir(parents=True, exist_ok=True)
                    page.locator('#comparison').scroll_into_view_if_needed()
                    page.locator('#comparison').screenshot(path=str(screenshot))
                # No missing files or remote CDN/audio dependency is allowed.
                assert not errors, errors
                assert not bad_responses, bad_responses
                external = [r for r in requests if r.startswith(('https://','http://')) and
                            (origin is None or not r.startswith(origin + '/'))]
                assert not external, external
            except Exception as exc:
                _failure_report(report_path, exc, stage, page=page, screenshot=screenshot,
                                in_memory=in_memory, errors=errors, bad_responses=bad_responses,
                                ranges=ranges, target=target)
                raise
            finally:
                browser.close()
    except Exception as exc:
        if stage in ('http-range-preflight', 'browser-start'):
            _failure_report(report_path, exc, stage, in_memory=in_memory, ranges=ranges)
        raise
    finally:
        if server:
            server.shutdown()
            server.server_close()
    report = dict(
        format='stemlab.arcadians-audio-browser-check', status='passed', http_ranges=ranges,
        mode='in-memory' if in_memory else 'http-project-pages-prefix',
        hosted_file_loading_verified=not in_memory, audio_source=metadata['source']['title'],
        audio_sha256=metadata['source']['sha256'], decoded=decoded,
        bundled_audio=True, autoplay=False, play_pause=True, seek_both_directions=True,
        restart=True, audio_clock=True, native_sample=True, sample_vectors_checked=len(patterns)*3,
        candidates=len(patterns), arbitrary_axis_projection=True, review_export_import=True,
        non_looping=True, external_requests=[], page_errors=[],
        listening_qa=False, gallery=gallery_name, pair_family_filter=(gallery_name == 'arcadians-averages'),
        html_sha256=__import__('hashlib').sha256((gallery/'index.html').read_bytes()).hexdigest(),
    )
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--screenshot', type=Path)
    parser.add_argument('--gallery', choices=('arcadians', 'arcadians-stems', 'arcadians-averages'), default='arcadians')
    parser.add_argument('--chromium')
    parser.add_argument('--in-memory', action='store_true')
    args = parser.parse_args()
    try:
        print(json.dumps(check(args.site, args.report, chromium=args.chromium,
                               in_memory=args.in_memory, screenshot=args.screenshot, gallery_name=args.gallery), indent=2))
    except (AssertionError, OSError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
