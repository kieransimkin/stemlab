"""Exercise real selectors and painted shared-timeline markers, not a mock grid."""
from __future__ import annotations


def check_beat_offset_controls(page, state):
    report = state.get('beat_offsets') or {}
    bases = [b for b in report.get('bpm_bases', []) if b['status'] == 'available']
    analyses = [a for a in report.get('analyses', []) if a['status'] == 'available']
    basis = page.get_by_label('BPM grid basis', exact=True)
    detector = page.get_by_label('First beat analysis', exact=True)
    assert basis.count() == detector.count() == 1
    if not bases or not analyses:
        assert page.locator('.rts-grid-line.stemlab-grid-aligned').count() == 0
        return {'status': 'unavailable; no aligned grid fabricated'}
    checked = 0
    original_basis, original_detector = basis.input_value(), detector.input_value()
    audio = page.locator('audio').first
    before = audio.evaluate('(a)=>({time:a.currentTime,paused:a.paused})')
    for b in bases:
        basis.select_option(b['id'])
        for a in analyses:
            detector.select_option(a['analysis_id'])
            row = next(r for r in report['comparisons'] if r['bpm_basis'] == b['id'] and r['analysis_id'] == a['analysis_id'])
            if row['status'] != 'available':
                continue
            output = page.get_by_test_id('beat-offset-value')
            page.wait_for_function('(s)=>document.querySelector("[data-testid=beat-offset-value]").textContent.includes(s)',
                                   arg=f"{row['offset_pips']:.6f} pips")
            assert f"{row['first_beat_seconds']:.6f}s" in output.text_content()
            original = page.locator('.rts-grid-line.stemlab-grid-original').first
            aligned = page.locator('.rts-grid-line.stemlab-grid-aligned').first
            assert original.count() == aligned.count() == 1
            assert original.evaluate('(n)=>parseFloat(n.style.left)') == 0
            colors = [node.evaluate('(n)=>getComputedStyle(n).borderLeftColor') for node in (original, aligned)]
            assert colors[0] != colors[1], colors
            styles = [node.evaluate('(n)=>getComputedStyle(n).borderLeftStyle') for node in (original, aligned)]
            assert styles == ['dashed', 'solid'], styles
            checked += 1
    basis.select_option(original_basis)
    detector.select_option(original_detector)
    after = audio.evaluate('(a)=>({time:a.currentTime,paused:a.paused})')
    assert before == after, (before, after)
    return {'status': 'passed', 'comparisons_checked': checked, 'distinct_colors_and_line_styles': True,
            'selection_preserves_transport': True}
