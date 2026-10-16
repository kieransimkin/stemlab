"""Assertions for merged audio lanes and display-only navigation.

The count oracle uses the retained file inventory, independently of the JS
adapter. These helpers never replace media playback or analysis data.
"""
from __future__ import annotations

from pathlib import PurePosixPath


AUDIO_SUFFIXES = {'.wav', '.flac', '.mp3', '.ogg', '.opus', '.m4a', '.aif', '.aiff'}


def _key(path: str) -> str | None:
    if path == '__source__' or path.startswith('input/'):
        return 'master'
    if path.startswith('stems/'):
        return str(PurePosixPath(path[6:]).with_suffix(''))
    if path.startswith('speech/') and PurePosixPath(path).suffix.lower() in AUDIO_SUFFIXES:
        return str(PurePosixPath(path).with_suffix(''))
    return None


def expected_display_layout(state: dict, snapshot: dict, analysis: dict) -> dict:
    """Mirror identities, not rendering: every non-audio analysis lane stays."""
    groups = {'master': {'wave'}}
    other = []
    sources = {}
    for rec in analysis.get('spectrograms', []):
        key = _key(str(rec.get('audio', '')).replace('\\', '/'))
        if key:
            sources[str(rec.get('data', ''))] = key
            sources[str(rec.get('png', ''))] = key
    for rec in state['files']:
        path = rec['path']
        if path == 'canonical.json' or path.startswith('deep/loops/'):
            continue
        suffix = PurePosixPath(path).suffix.lower()
        key = _key(path)
        if key and suffix in AUDIO_SUFFIXES:
            groups.setdefault(key, set()).add('wave')
        elif path.startswith('spectrograms/') and suffix in ('.npz', '.png'):
            key = sources.get(path, str(PurePosixPath(path[13:]).with_suffix('')))
            groups.setdefault(key, set()).add('spec' if suffix == '.npz' else 'png')
        else:
            other.append(path)
    # Standalone PNG stays only without an aligned NPZ. Do not merge chart axes
    # and legend padding over an audio envelope.
    count = len(other) + sum(int(bool(kinds & {'wave', 'spec'}))
                            + int('png' in kinds and 'spec' not in kinds)
                            for kinds in groups.values())
    canonical = state.get('canonical', {})
    count += sum(bool(canonical.get(key)) for key in ('lyrics', 'lyric_timing'))
    bases = state.get('beat_offsets', {}).get('bpm_bases', [])
    if canonical.get('bpm') or any(row.get('status') == 'available' for row in bases):
        count += 2  # source-zero and independently offset BPM grids
    count += int(snapshot.get('loop_count', 0) > 0)
    paired = [key for key, kinds in groups.items() if {'wave', 'spec'} <= kinds]
    return {'lane_count': count, 'audio_count': sum(bool(k & {'wave', 'spec'}) for k in groups.values()),
            'paired_count': len(paired), 'audio_keys': list(groups)}


def set_range(locator, value):
    locator.evaluate("""(n,v)=>{
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(n,String(v));
      n.dispatchEvent(new Event('input',{bubbles:true}));
    }""", value)


def check_display_controls(page, *, paired_count: int) -> dict:
    from playwright.sync_api import expect
    audio = page.locator('audio').first
    paused = audio.evaluate('(a)=>a.paused')
    before = audio.evaluate('(a)=>a.currentTime')
    paired = page.locator('.rts-audio-both')
    assert paired.count() == paired_count
    candidates = page.locator('.rts-lane-audio')
    index = next((i for i in range(candidates.count())
                  if candidates.nth(i).locator('.rts-audio-both').count()), 0)
    lane = candidates.nth(index)
    lane.scroll_into_view_if_needed()
    selector = lane.locator('select')
    for mode, wave_count, spec_count in (('waveform', 1, 0), ('spectrogram', 0, 1), ('both', 1, 1)):
        # OPTION.disabled is the native UI state; avoids engine differences in
        # accessibility disabled-state matching for native select options.
        if selector.locator(f'option[value={mode}]').evaluate('(option)=>option.disabled'):
            continue
        selector.select_option(mode)
        expect(lane.locator('.rts-waveform')).to_have_count(wave_count, timeout=10000)
        expect(lane.locator('img.rts-image')).to_have_count(spec_count, timeout=10000)
    height = lane.locator('input[type=range]')
    initial = int(height.input_value())
    # Keep the lane in view and drive the actual DOM wheel event path. Chromium's
    # real mouse wheel is checked too below; this also exercises line-delta units.
    track = lane.locator('.rts-track')
    neighbor = candidates.nth(1 if index == 0 else 0) if candidates.count() > 1 else None
    neighbor_height = neighbor.locator('input[type=range]').input_value() if neighbor else None
    start_height = lane.evaluate('(n)=>n.getBoundingClientRect().height')
    track.evaluate('(n)=>n.dispatchEvent(new WheelEvent("wheel", {deltaY:-5,deltaMode:1,altKey:true,bubbles:true,cancelable:true}))')
    page.wait_for_timeout(80)
    assert lane.evaluate('(n)=>n.getBoundingClientRect().height') > start_height
    if neighbor is not None:
        assert neighbor.locator('input[type=range]').input_value() == neighbor_height
    lane.get_by_role('button', name='Reset height', exact=False).click()
    assert int(height.input_value()) == initial
    set_range(height, 300)
    page.wait_for_timeout(60)
    assert abs(lane.evaluate('(n)=>n.getBoundingClientRect().height') - 301) < 2
    lane.get_by_role('button', name='Reset height', exact=False).click()
    page.get_by_role('button', name='Fit', exact=True).click()
    zoom = page.get_by_label('Timeline zoom', exact=True)
    set_range(zoom, 40)
    page.wait_for_timeout(100)
    scroller = page.locator('.rts-scroller')
    scroller.evaluate('(n)=>{n.scrollLeft=100}')
    box = scroller.bounding_box()
    pointer = {'x':box['x']+600, 'y':box['y']+120}
    page.mouse.move(**pointer)
    start_left = scroller.evaluate('(n)=>n.scrollLeft')
    page.mouse.wheel(0, 140)
    page.wait_for_timeout(100)
    assert scroller.evaluate('(n)=>n.scrollLeft') > start_left
    old_zoom = float(zoom.input_value())
    def under_pointer():
        return page.evaluate('''x=>{const s=document.querySelector('.rts-scroller');
          const r=document.querySelector('.rts-ruler-track');
          const duration=Number(document.querySelector('audio').duration);
          const label=document.querySelector('.rts-ruler-label').getBoundingClientRect().width;
          return (s.scrollLeft+x-s.getBoundingClientRect().left-label)/(r.getBoundingClientRect().width/duration);
        }''', pointer['x'])
    anchor = under_pointer()
    page.keyboard.down('Control')
    try:
        page.mouse.wheel(0, -120)
    finally:
        page.keyboard.up('Control')
    page.wait_for_timeout(100)
    assert float(zoom.input_value()) > old_zoom
    assert abs(under_pointer() - anchor) < .5  # CSS pixel scroll rounding, not a media-clock tolerance.
    page.get_by_role('button', name='Fit', exact=True).click()
    assert audio.evaluate('(a)=>a.paused') == paused
    if paused:
        assert abs(audio.evaluate('(a)=>a.currentTime') - before) < .02
    return {'combined_audio_lanes': paired_count, 'audio_view_modes': ['waveform','spectrogram','both'],
            'per_lane_height': True, 'wheel_time_pan': True, 'ctrl_wheel_time_zoom': True,
            'alt_wheel_lane_height': True, 'cursor_anchored_zoom': True, 'view_controls_do_not_seek': True}
