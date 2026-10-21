"""Exercise the released subtitle preview through the actual StemLab viewer UI."""
from __future__ import annotations


def check_lyric_audition(page, state: dict) -> dict:
    toggle = page.get_by_label('Audition lyrics', exact=True)
    assert toggle.is_checked()
    assert page.locator('.rts-audition').is_visible()
    items = page.evaluate('window.__stemlabStatic?.lyricItems')
    if items is None:
        items = [{'start': row['start'], 'end': row.get('end'), 'label': row.get('text', '')}
                 for row in state.get('canonical', {}).get('lyric_timing', [])]
    duration = page.locator('audio').evaluate('(a)=>a.duration')
    lines = [row for row in items if row.get('label') and row.get('end') and
             row['end'] - row['start'] > 1 and row['end'] <= duration]
    if not lines:
        assert 'No timed lyrics available' in page.locator('.rts-audition-status').inner_text()
        return {'available': False, 'reason': 'No bounded line timings in this saved snapshot'}
    first = lines[0]
    target = (first['start'] + first['end']) / 2

    def seek_line():
        page.get_by_role('button', name='Fit', exact=True).click()
        page.wait_for_timeout(100)
        ruler = page.locator('.rts-ruler-track').bounding_box()
        page.mouse.click(ruler['x'] + ruler['width'] * target / duration,
                         ruler['y'] + ruler['height'] / 2)
        page.wait_for_function('(text)=>document.querySelector(".rts-audition-subtitles").textContent===text', arg=first['label'])

    seek_line()
    art = page.locator('.rts-audition-cover img')
    if art.count():
        page.wait_for_function('document.querySelector(".rts-audition-cover img").naturalWidth>0')
    page.get_by_role('button', name='Play', exact=True).click()
    page.wait_for_function('(t)=>document.querySelector("audio").currentTime>t', arg=target + .15)
    assert page.locator('.rts-audition-subtitles').inner_text() == first['label']
    page.get_by_role('button', name='Pause', exact=True).click()
    toggle.uncheck()
    assert page.locator('.rts-audition').count() == 0
    toggle.check()
    seek_line()
    selector = page.get_by_label('Audio channel', exact=True)
    options = selector.locator('option').evaluate_all('(items)=>items.map(x=>x.value)')
    tested_stem = None
    if len(options) > 1:
        tested_stem = options[-1]
        old = page.locator('audio').get_attribute('src')
        selector.select_option(tested_stem)
        page.wait_for_function('document.querySelector("audio").paused && document.querySelector("audio").currentTime===0 && document.querySelector("audio").readyState>=1')
        assert page.locator('audio').get_attribute('src') != old
        seek_line()
        page.get_by_role('button', name='Play', exact=True).click()
        page.wait_for_function('(t)=>document.querySelector("audio").currentTime>t', arg=target + .15)
        assert page.locator('.rts-audition-subtitles').inner_text() == first['label']
        page.get_by_role('button', name='Pause', exact=True).click()
        selector.select_option('__source__')
        page.wait_for_function('document.querySelector("audio").paused && document.querySelector("audio").readyState>=1')
        seek_line()
    return {'available': True, 'artwork_loaded': bool(art.count()), 'line_count': len(items),
            'source_clock_subtitle': True, 'toggle': True, 'audio_channels': len(options),
            'stem_playback_verified': tested_stem}
