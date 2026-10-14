"""Browser gate for bundled audio and the shared recording clock.

Default: serve the generated site under /stemlab/, like GitHub project Pages.
--in-memory is an explicit restricted-environment test mode, never used in CI.
This checks decoded non-silent audio and transport, not subjective listening quality.
"""
from __future__ import annotations

import argparse
import base64
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
from pathlib import Path
import sys
import threading
from urllib.parse import unquote, urlparse

from build_arcadians_demo import read_payload


class ProjectHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if urlparse(self.path).path == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return
        if not unquote(urlparse(self.path).path).startswith('/stemlab/'):
            self.send_error(404)
            return
        self.path = self.path[len('/stemlab'):]
        super().do_GET()

    def log_message(self, *_args):
        pass


def check(site: Path, report_path: Path, *, chromium=None, in_memory=False, screenshot=None) -> dict:
    from playwright.sync_api import sync_playwright

    site = site.resolve()
    gallery = site / 'arcadians'
    payload = read_payload(gallery / 'index.html')
    metadata = json.loads((gallery / 'release-demo.json').read_text(encoding='utf-8'))
    clock = payload['clock']
    audio_file = gallery / payload['audio']['relative_path']
    if not audio_file.is_file():
        raise ValueError('The public MP3 must exist alongside the visualizer')
    server = None
    origin = None
    errors, bad_responses, requests = [], [], []
    if not in_memory:
        server = ThreadingHTTPServer(('127.0.0.1', 0), partial(ProjectHandler, directory=str(site)))
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        origin = f'http://127.0.0.1:{server.server_port}'
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium,
                                                  args=['--no-sandbox'])
            try:
                page = browser.new_page(viewport={'width':1440, 'height':1000})
                page.on('pageerror', lambda e: errors.append(str(e)))
                page.on('request', lambda r: requests.append(r.url))
                page.on('response', lambda r: bad_responses.append((r.status, r.url)) if r.status >= 400 else None)
                if in_memory:
                    page.set_content((gallery / 'index.html').read_text(encoding='utf-8'))
                else:
                    page.goto(origin + '/stemlab/arcadians/', wait_until='load')
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
                    assert audio.evaluate('(a) => a.currentSrc') == origin + '/stemlab/arcadians/audio.mp3'
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
                # Check a decoded source window via Web Audio; this does not play a
                # second source. The actual HTML audio element remains the playback clock.
                if in_memory:
                    raw = base64.b64encode(audio_file.read_bytes()).decode()
                    decode_input = {'base64': raw}
                else:
                    decode_input = {'url': origin + '/stemlab/arcadians/audio.mp3'}
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
                target = duration * .37
                page.evaluate('(b) => window.audition.setBeat(b)', target * clock['bpm'] / 60)
                page.wait_for_function('(t) => Math.abs(document.getElementById("audio").currentTime-t)<.04', arg=target)
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
                audio.evaluate('(a,t)=>{a.currentTime=t}', duration * .63)
                page.wait_for_timeout(100)
                assert_clock()
                # Restart controls both media and movement, without starting playback.
                page.locator('#reset').click()
                page.wait_for_timeout(100)
                assert abs(audio.evaluate('(a)=>a.currentTime')) < .04
                assert not page.evaluate('window.audition.state().running')
                assert_clock()
                # Exercise the visible seek slider while audio is playing.
                page.locator('#play').click()
                page.wait_for_function('window.audition.state().running')
                target_pip = round(duration * .5 * clock['bpm'] / 60 * 64)
                page.locator('#seek').evaluate('(s,p)=>{s.value=p;s.dispatchEvent(new Event("input",{bubbles:true}))}', target_pip)
                page.wait_for_timeout(150)
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
                # Compressed-audio end events can arrive after the last sample
                # reaches duration. Wait for actual completion, not a 180 ms sleep.
                page.evaluate('beat=>window.audition.setBeat(beat)', (first+count-1)/64)
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
                if screenshot:
                    page.locator('#comparison').scroll_into_view_if_needed()
                    page.locator('#comparison').screenshot(path=str(screenshot))
                # No missing files or remote CDN/audio dependency is allowed.
                assert not errors, errors
                assert not bad_responses, bad_responses
                external = [r for r in requests if r.startswith(('https://','http://')) and
                            (origin is None or not r.startswith(origin + '/'))]
                assert not external, external
            finally:
                browser.close()
    finally:
        if server:
            server.shutdown()
            server.server_close()
    report = dict(
        format='stemlab.arcadians-audio-browser-check',
        mode='in-memory' if in_memory else 'http-project-pages-prefix',
        hosted_file_loading_verified=not in_memory, audio_source=metadata['source']['title'],
        audio_sha256=metadata['source']['sha256'], decoded=decoded,
        bundled_audio=True, autoplay=False, play_pause=True, seek_both_directions=True,
        restart=True, audio_clock=True, native_sample=True, sample_vectors_checked=len(patterns)*3,
        candidates=len(patterns), arbitrary_axis_projection=True, review_export_import=True,
        non_looping=True, external_requests=[], page_errors=[],
        listening_qa=False,
    )
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--screenshot', type=Path)
    parser.add_argument('--chromium')
    parser.add_argument('--in-memory', action='store_true')
    args = parser.parse_args()
    try:
        print(json.dumps(check(args.site, args.report, chromium=args.chromium,
                               in_memory=args.in_memory, screenshot=args.screenshot), indent=2))
    except (AssertionError, OSError, ValueError) as exc:
        print(str(exc), file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
