"""Browser gate for the exported real React timeline at a nested Pages prefix.

HTTP is mandatory in CI. --in-memory is labelled restricted-environment QA, not
publishable browser evidence. No synthetic movement/player replaces the renderer.
"""
from __future__ import annotations

import argparse
from functools import partial
from http.server import ThreadingHTTPServer
import json
import mimetypes
from pathlib import Path
import sys
import threading
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))
from arcadians_http import ProjectHandler, _byte_range
from check_arcadians_audio import verify_audio_ranges
from stemlab.static_timeline import digest, read_json, verify_snapshot


def check(site: Path, report_path: Path, *, chromium=None, in_memory=False, require_core=False) -> dict:
    from playwright.sync_api import sync_playwright
    site = site.resolve()
    verified = verify_snapshot(site)
    snapshot = read_json(site / 'snapshot.json')
    if require_core and snapshot['coverage'].get('status') != 'complete':
        raise ValueError('Core timeline is incomplete')
    state = read_json(site / 'data/timeline.json')
    expected = 1 + int(snapshot['loop_count'] > 0) + sum(f['path'] != 'canonical.json' and not f['path'].startswith('deep/loops/') for f in state['files'])
    expected += int(bool(state['canonical'].get('bpm'))) + int(bool(state['canonical'].get('lyrics'))) + int(bool(state['canonical'].get('lyric_timing')))
    report_path.parent.mkdir(parents=True, exist_ok=True)
    class Handler(ProjectHandler):
        prefix = '/stemlab/timeline/arcadians/'
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(site)))
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    base = f'http://127.0.0.1:{server.server_port}/stemlab/timeline/arcadians/'
    errors, bad, requests = [], [], []
    report = dict(format='stemlab.timeline-browser-check', status='failed',
                  mode='in-memory' if in_memory else 'http-project-pages-prefix',
                  source_sha256=snapshot['source_sha256'], snapshot_sha256=digest(site / 'snapshot.json'),
                  expected_lanes=expected, coverage=snapshot['coverage']['status'], listening_qa=False)
    stage = 'HTTP audio range validation'
    try:
        report['http_ranges'] = verify_audio_ranges(base + snapshot['audio_path'], site / snapshot['audio_path'])
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True, executable_path=chromium, args=['--no-sandbox'])
            page = browser.new_page(viewport={'width': 1600, 'height': 1050})
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.on('response', lambda r: bad.append([r.status, r.url]) if r.status >= 400 else None)
            page.on('request', lambda r: requests.append(r.url))
            try:
                stage = 'Load real React static viewer'
                if in_memory:
                    base = 'http://snapshot.test/stemlab/timeline/arcadians/'
                    # Fulfil the same static files in a restricted browser, without
                    # using a backend API or manufacturing analysis/playback state.
                    def fixture_route(route):
                        request = route.request
                        relative = unquote(urlsplit(request.url).path.removeprefix('/stemlab/timeline/arcadians/'))
                        path = (site / relative).resolve()
                        if not path.is_relative_to(site) or not path.is_file():
                            route.fulfill(status=404, body='not found')
                            return
                        body = path.read_bytes()
                        headers = {'Access-Control-Allow-Origin': '*', 'Accept-Ranges': 'bytes'}
                        mime = mimetypes.guess_type(path.name)[0] or 'application/octet-stream'
                        span = _byte_range(request.headers.get('range'), len(body))
                        status = 200
                        if span:
                            start, end = span
                            headers['Content-Range'] = f'bytes {start}-{end}/{len(body)}'
                            body = body[start:end+1]
                            status = 206
                        route.fulfill(status=status, body=body, headers=headers, content_type=mime)
                    page.route('**/*', fixture_route)
                    content = (site / 'index.html').read_text().replace('<head>', '<head><base href="' + base + '">')
                    page.set_content(content, wait_until="domcontentloaded")
                else:
                    page.goto(base, wait_until='domcontentloaded', timeout=60000)
                page.wait_for_function('(n)=>document.querySelectorAll(".rts-lane").length === n', arg=expected, timeout=60000)
                page.wait_for_function('''() => [...document.querySelectorAll('.rts-track img')]
                    .every(i => i.complete && i.naturalWidth > 0)''', timeout=60000)
                page.wait_for_function('document.querySelector("audio")?.readyState >= 1', timeout=30000)
                report['all_expected_lanes'] = True
                report['images_loaded'] = True
                report['lanes'] = page.locator('.rts-lane').count()
                audio = page.locator('audio').first
                assert audio.evaluate('(a)=>a.paused && !a.autoplay')
                report['no_autoplay'] = True
                duration = audio.evaluate('(a)=>a.duration')
                assert abs(duration - snapshot['duration_seconds']) < .2
                stage = 'Full-song play/pause and audio clock'
                page.get_by_role('button', name='Play', exact=True).click()
                page.wait_for_function('document.querySelector("audio").currentTime > .25')
                def assert_clock():
                    value = page.evaluate('''() => ({time:document.querySelector('audio').currentTime,
                          display:document.querySelector('.rts-time').textContent})''')
                    minutes, seconds = value['display'].split('/')[0].strip().split(':')
                    assert abs(float(minutes)*60 + float(seconds) - value['time']) < .1, value
                assert_clock()
                page.get_by_role('button', name='Pause', exact=True).click()
                frozen = audio.evaluate('(a)=>a.currentTime')
                page.wait_for_timeout(200)
                assert abs(audio.evaluate('(a)=>a.currentTime') - frozen) < .03
                report['play_pause'] = True
                report['audio_clock'] = True
                stage = 'Fit, zoom and visible timeline seeking'
                page.get_by_role('button', name='Fit', exact=True).click()
                page.wait_for_timeout(250)
                point = page.evaluate('''() => {
                  const r = document.querySelector('.rts-ruler-track').getBoundingClientRect();
                  return {x:r.x + r.width * .37,y:r.y + r.height / 2,width:r.width};
                }''')
                page.mouse.click(point['x'], point['y'])
                target = duration * .37
                # A pointer coordinate is quantized to a CSS pixel. At full-song
                # Fit, one pixel can exceed 120 ms; this is not audio-clock drift.
                # Keep the independent audio/display clock check at 100 ms.
                tolerance = max(.04, duration / point['width'] + .01)
                report['pointer_seek_tolerance_seconds'] = tolerance
                page.wait_for_function('([t,e])=>!document.querySelector("audio").seeking && Math.abs(document.querySelector("audio").currentTime-t)<e', arg=[target,tolerance])
                assert_clock()
                # Seek backwards using the visible ruler too. The library owns the
                # hidden media element; external DOM mutation is not its public UI.
                backward = page.evaluate("""() => {
                  const r = document.querySelector('.rts-ruler-track').getBoundingClientRect();
                  return {x:r.x+r.width*.12,y:r.y+r.height/2};
                }""")
                page.mouse.click(backward['x'], backward['y'])
                page.wait_for_function('([t,e])=>!document.querySelector("audio").seeking && Math.abs(document.querySelector("audio").currentTime-t)<e', arg=[duration * .12,tolerance])
                page.wait_for_timeout(100)
                assert_clock()
                report['seek'] = True
                zoom = page.get_by_label('Zoom', exact=True)
                if zoom.count() == 0:
                    zoom = page.locator('input[type=range]').first
                before = page.locator('.rts-ruler-track').bounding_box()['width']
                zoom.evaluate("""s => {
                  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(s,s.max);
                  s.dispatchEvent(new Event('input',{bubbles:true}));
                  s.dispatchEvent(new Event('change',{bubbles:true}));
                }""")
                page.wait_for_timeout(200)
                assert page.locator('.rts-ruler-track').bounding_box()['width'] > before
                page.get_by_role('button', name='Fit', exact=True).click()
                report['zoom_fit'] = True
                stage = 'Saved loop preview'
                if snapshot['loop_count']:
                    selector = page.get_by_label('Select loop', exact=True)
                    choices = selector.locator('option').evaluate_all('(xs)=>xs.map(x=>x.value).filter(Boolean)')
                    selector.select_option(choices[0])
                    page.get_by_label('Enable loop', exact=True).check()
                    page.get_by_role('button', name='Play', exact=True).click()
                    page.wait_for_function('!document.querySelector(".rts-loop-status").textContent.includes("Loading")')
                    loop_before = page.locator('.rts-time').text_content()
                    page.wait_for_function('(old)=>document.querySelector(".rts-time").textContent !== old', arg=loop_before)
                    page.wait_for_timeout(750)
                    assert page.get_by_role('button', name='Pause', exact=True).count() == 1
                    assert page.locator('.rts-loop-error').count() == 0
                    page.get_by_role('button', name='Pause', exact=True).click()
                    page.get_by_label('Enable loop', exact=True).uncheck()
                    report['loop_audition'] = True
                else:
                    report['loop_audition'] = 'no accepted loops; not fabricated'
                page.screenshot(path=str(report_path.with_suffix('.png')))
                # Inspect only the generated root; no live /api, socket or CDN.
                assert not errors and not bad, (errors, bad)
                assert not any('/api/' in u or '/socket.io' in u for u in requests)
                external = [u for u in requests if u.startswith(('http:', 'https:')) and not u.startswith(base)]
                assert not external, external
                report.update(status='passed', no_backend_requests=True, page_errors=[],
                              bad_responses=[], external_requests=[], duration_seconds=duration,
                              public_files_verified=verified['files'])
            except Exception as exc:
                try:
                    report['browser_state'] = page.evaluate('() => ({time:document.querySelector("audio")?.currentTime,display:document.querySelector(".rts-time")?.textContent})')
                except Exception:
                    pass
                report.update(stage=stage, error=str(exc), error_type=type(exc).__name__,
                              page_errors=errors, bad_responses=bad, requests=requests)
                try:
                    page.screenshot(path=str(report_path.with_suffix('.png')), timeout=5000)
                except Exception:
                    pass
                raise
            finally:
                browser.close()
    except Exception as exc:
        report.setdefault('error', str(exc))
        report.setdefault('stage', stage)
        raise
    finally:
        server.shutdown()
        server.server_close()
        report_path.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
    return report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('site', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--chromium')
    parser.add_argument('--in-memory', action='store_true')
    parser.add_argument('--require-core', action='store_true')
    args = parser.parse_args()
    print(json.dumps(check(args.site, args.report, chromium=args.chromium,
                           in_memory=args.in_memory, require_core=args.require_core), indent=2))


if __name__ == '__main__':
    main()
