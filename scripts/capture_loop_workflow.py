"""Capture and check the real frontend using scripts/loop_demo.py's fixture.

Install Playwright, then: python -m playwright install chromium
Start loop_demo.py --serve and supply its printed URL with --url.
This script does not run learned models or simulate the audio playback engine.
"""
from __future__ import annotations

import argparse
import json
import time
from pathlib import Path
from urllib.parse import parse_qs, urlsplit
from urllib.request import urlopen


def clock_seconds(page) -> float:
    displayed = page.locator('.rts-time').inner_text().split('/')[0].strip()
    minutes, seconds = displayed.split(':')
    return 60 * float(minutes) + float(seconds)


def wait_for_audio(page, loop: dict, sample_rate: int, timeout: float = 15) -> None:
    start = loop['start_sample'] / sample_rate
    end = loop['end_sample'] / sample_rate
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        status = page.locator('.rts-loop-status').inner_text()
        if 'Loading' not in status and start <= clock_seconds(page) < end:
            page.wait_for_timeout(100)
            return
        page.wait_for_timeout(100)
    raise AssertionError(f"Transport did not enter loop {loop['id']}")


def capture_workflow(page, output: Path, report: dict) -> dict:
    """Shared by normal browser QA and a restricted-runner in-memory harness."""
    output.mkdir(parents=True, exist_ok=True)
    page.locator('.rts-loop-region').first.wait_for(timeout=30000)
    page.wait_for_function("""() => document.querySelectorAll('.rts-lane').length >= 8
        && [...document.querySelectorAll('.rts-track img')].every(i => i.complete && i.naturalWidth)""")
    assert page.locator('.rts-loop-region').count() == report['loop_count']
    assert not page.get_by_label('Enable loop', exact=True).is_checked()
    assert page.get_by_role('button', name='Play', exact=True).count() == 1
    page.get_by_role('button', name='Fit', exact=True).click()
    page.wait_for_timeout(250)
    # Fit must update the shared window readout using the new scale.
    ending = page.locator('.rts-window').inner_text().split('—')[-1].strip()
    minute, second = ending.split(':')
    assert abs(60 * float(minute) + float(second) - report['source_frames'] / report['sample_rate']) < .1
    page.screenshot(path=str(output / 'loops-overview.png'))

    chorus = next(x for x in report['loops'] if x['section_kind'] == 'chorus')
    verse = next(x for x in report['loops'] if x['section_kind'] == 'verse')
    sr = report['sample_rate']
    page.get_by_label('Select loop', exact=True).select_option(chorus['id'])
    page.get_by_label('Enable loop', exact=True).check()
    page.get_by_role('button', name='Zoom to loop', exact=True).click()
    page.get_by_role('button', name='Play', exact=True).click()
    wait_for_audio(page, chorus, sr)
    page.wait_for_timeout(650)
    assert page.get_by_role('button', name='Pause', exact=True).count() == 1
    page.screenshot(path=str(output / 'loops-playing.png'))

    # Observe an actual wrap in the audio-clock-driven playhead, not a mock timer.
    previous = clock_seconds(page)
    duration = (chorus['end_sample'] - chorus['start_sample']) / sr
    deadline = time.monotonic() + duration + 5
    wrapped = False
    while time.monotonic() < deadline:
        page.wait_for_timeout(100)
        current = clock_seconds(page)
        if current < previous - duration / 2:
            wrapped = True
            break
        previous = current
    assert wrapped, 'No native loop wrap observed'

    page.get_by_label('Select loop', exact=True).select_option(verse['id'])
    wait_for_audio(page, verse, sr)
    page.wait_for_timeout(350)
    page.get_by_role('button', name='Pause', exact=True).click()
    frozen = page.locator('.rts-time').inner_text()
    page.wait_for_timeout(250)
    assert page.locator('.rts-time').inner_text() == frozen
    page.get_by_role('button', name='Zoom to loop', exact=True).click()
    page.wait_for_timeout(250)

    # A paused timeline click seeks within the currently selected loop.
    seek_time = (verse['start_sample'] + (verse['end_sample'] - verse['start_sample']) / 3) / sr
    point = page.evaluate("""seconds => {
        const s = document.querySelector('.rts-scroller');
        const r = s.getBoundingClientRect();
        const label = document.querySelector('.rts-label').getBoundingClientRect().width;
        const trackWidth = document.querySelector('.rts-ruler-track').getBoundingClientRect().width;
        const duration = Number(document.querySelector('audio').duration);
        const ruler = document.querySelector('.rts-ruler-track').getBoundingClientRect();
        return {x:r.left + label + seconds * trackWidth / duration - s.scrollLeft,
                y:ruler.top + ruler.height / 2};
    }""", seek_time)
    page.mouse.click(point['x'], point['y'])
    page.wait_for_timeout(250)
    assert abs(clock_seconds(page) - seek_time) < .1
    page.screenshot(path=str(output / 'loops-inspect.png'))

    # Disabling loops restores the existing native full-song transport.
    page.get_by_label('Enable loop', exact=True).uncheck()
    page.get_by_role('button', name='Play', exact=True).click()
    page.wait_for_function("() => !document.querySelector('audio').paused")
    page.wait_for_timeout(250)
    page.get_by_role('button', name='Pause', exact=True).click()
    assert page.locator('.rts-loop-error').count() == 0
    return {
        'fixture': 'synthetic audio and supplied beat/section annotations; no learned models',
        'loop_count': report['loop_count'], 'unresolved_sections': len(report['unresolved_sections']),
        'checks': ['no autoplay', 'region selection', 'enable and play', 'native repeat wrap',
                   'switch while playing', 'pause freezes clock', 'paused seek', 'full-song restore'],
    }


def main() -> None:
    from playwright.sync_api import sync_playwright

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--url', required=True, help='The exact URL printed by loop_demo.py --serve')
    parser.add_argument('--output', type=Path, default=Path('docs/screenshots'))
    parser.add_argument('--chromium', help='Optional existing Chromium executable')
    args = parser.parse_args()
    parsed = urlsplit(args.url)
    digest = parse_qs(parsed.query).get('hash', [''])[0]
    if len(digest) != 64 or any(x not in '0123456789abcdefABCDEF' for x in digest):
        parser.error('--url must contain the fixture SHA-256 in ?hash=')
    base = f'{parsed.scheme}://{parsed.netloc}'
    with urlopen(f'{base}/{digest}/deep/loops/loops.json', timeout=15) as response:
        report = json.load(response)
    with sync_playwright() as playwright:
        options = {'headless': True}
        if args.chromium:
            options['executable_path'] = args.chromium
        browser = playwright.chromium.launch(**options)
        page = browser.new_page(viewport={'width': 1600, 'height': 1100}, device_scale_factor=1)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        try:
            page.goto(args.url, wait_until='domcontentloaded')
            result = capture_workflow(page, args.output, report)
            assert not errors, errors
            result['page_errors'] = errors
            result['capture_mode'] = 'normal HTTP browser navigation'
            (args.output / 'workflow-validation.json').write_text(
                json.dumps(result, indent=2) + '\n', encoding='utf-8')
            print(json.dumps(result, indent=2))
        finally:
            browser.close()


if __name__ == '__main__':
    main()
