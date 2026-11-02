"""Fail-closed line-level gates for lyric timing candidates, without model imports."""
from __future__ import annotations

import math


def assess_lines(lines: list[dict], duration: float) -> dict:
    """Inspect actual anchors before ranking. Never repair, spread, or snap them.

    Conservative rate/span limits are diagnostic gates, not a claim that fast
    vocals cannot exist. Retain such candidates for a human to resolve.
    """
    if not math.isfinite(duration) or duration <= 0:
        raise ValueError("Audio-header duration must be finite and positive")
    issues = []
    previous_cs = -1
    for index, line in enumerate(lines):
        reasons = []
        start, end = line.get('start'), line.get('end')
        source = line.get('timing_source', '')
        count = int(line.get('canonical_word_count', len(line.get('text', '').split())))
        valid = (isinstance(start, (int, float)) and isinstance(end, (int, float))
                 and math.isfinite(start) and math.isfinite(end) and 0 <= start < end <= duration)
        if not valid:
            reasons.append('missing_or_invalid_audio_anchor')
        else:
            cs = round(start * 100)
            if cs <= previous_cs:
                reasons.append('non_increasing_centisecond_onset')
            previous_cs = cs
            if end - start > max(8.0, count * 2.0):
                reasons.append('discontinuous_or_implausibly_long_line_span')
            if count >= 3 and count / (end - start) > 12:
                reasons.append('implausibly_compressed_line')
            if index >= 2:
                prior = [p.get('start') for p in lines[index-2:index]]
                if all(isinstance(p, (int, float)) for p in prior) and start - prior[0] < .4:
                    reasons.append('three_line_onsets_compressed_inside_400ms')
        if source in {'interpolated', 'uniform_fallback', 'unmatched'}:
            reasons.append('unsupported_or_interpolated_line')
        if line.get('invalid_word_count', 0):
            reasons.append('instant_or_invalid_acoustically_aligned_words')
        if reasons:
            issues.append({'line': index+1, 'text': line.get('text'), 'reasons': reasons})
    return {'schema': 'stemlab.lyric-line-quality.v1', 'line_count': len(lines),
            'export_eligible': bool(lines) and not issues, 'issues': issues,
            'duration_seconds': duration, 'listening_qa': 'pending', 'accepted': False,
            'policy': 'All lines must have valid original audio anchors; no interpolation. '
                      'Whole-song match score cannot override line-level failure.'}


def select_eligible(results: list[dict]) -> int:
    """Choose only a temporally valid, complete candidate above the match floor."""
    eligible = [i for i, result in enumerate(results)
                if float(result.get('matched_ratio', 0)) >= .7
                and assess_lines(result['lines'], float(result['duration']))['export_eligible']]
    if not eligible:
        raise ValueError('No complete candidate passes line-level timing gates; evidence retained, LRC held')
    return max(eligible, key=lambda i: (results[i]['matched_ratio'],
                                      results[i].get('mean_matched_probability') or 0))
