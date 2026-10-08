"""Conservative canonical-word reconciliation of retained ASR evidence.

This is text reconciliation, not an acoustic forced aligner. Missing words
remain untimed; fuzzy matches and acoustic anomalies require review.
"""
from __future__ import annotations

import csv
import hashlib
import json
import re
from difflib import SequenceMatcher
from pathlib import Path

TOKEN = re.compile(r"[\w]+(?:['’][\w]+)?", re.UNICODE)


def normal(word):
    return word.casefold().replace('’', "'")


def reconcile(text, observed, duration):
    canonical = [(line, m.group()) for line, value in enumerate(text.splitlines(), 1)
                 for m in TOKEN.finditer(value)]
    a = [normal(w) for _, w in canonical]
    b = [normal(str(w.get('word', w.get('text', ''))).strip()) for w in observed]
    n, m = len(a), len(b)
    scores = [[0.0] * (m + 1) for _ in range(n + 1)]
    moves = [bytearray(m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        scores[i][0], moves[i][0] = -i, 1
    for j in range(1, m + 1):
        scores[0][j], moves[0][j] = -j, 2
    def similarity(x, y):
        if x == y:
            return 2.0
        ratio = SequenceMatcher(None, x, y).ratio()
        return 0.6 if min(len(x), len(y)) >= 4 and ratio >= .86 else -2.1
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            options = (scores[i-1][j-1] + similarity(a[i-1], b[j-1]),
                       scores[i-1][j] - 1, scores[i][j-1] - 1)
            move = max(range(3), key=lambda k: options[k])
            scores[i][j], moves[i][j] = options[move], move
    mapping = {}
    i, j = n, m
    while i or j:
        move = moves[i][j]
        if i and j and move == 0:
            if similarity(a[i-1], b[j-1]) > 0:
                mapping[i-1] = j-1
            i, j = i-1, j-1
        elif i and (not j or move == 1):
            i -= 1
        else:
            j -= 1
    rows = []
    previous_end = 0.0
    for idx, (line, word) in enumerate(canonical):
        source = observed[mapping[idx]] if idx in mapping else None
        start, end = (float(source['start']), float(source['end'])) if source else (None, None)
        reasons = []
        kind = 'unmatched'
        if source:
            kind = 'exact' if a[idx] == b[mapping[idx]] else 'fuzzy'
            if kind == 'fuzzy':
                reasons.append('fuzzy_text_match')
            if not (0 <= start < end <= duration):
                reasons.append('invalid_or_zero_duration')
            if start < previous_end - .001:
                reasons.append('overlap_or_backward_time')
            if end - start > 2:
                reasons.append('long_word_duration')
            if float(source.get('probability', 1)) < .5:
                reasons.append('low_asr_probability')
            previous_end = max(previous_end, end)
        else:
            reasons.append('no_observed_word')
        rows.append(dict(index=idx, line=line, word=word, start=start, end=end,
                         observed_index=mapping.get(idx), match=kind,
                         probability=source.get('probability') if source else None,
                         review_reasons=reasons, state='review' if reasons else 'provisional'))
    return dict(schema='stemlab.canonical-word-reconciliation.v1', canonical_text=text,
                duration=duration, words=rows, canonical_words=n,
                matched_words=len(mapping), match_ratio=len(mapping)/max(n, 1),
                exact_words=sum(r['match']=='exact' for r in rows),
                review_words=sum(bool(r['review_reasons']) for r in rows),
                threshold_pass=len(mapping)/max(n, 1) >= .7,
                listening_qa='pending', accepted=False,
                policy='No interpolation; matched ASR timings remain provisional until listening QA.')


def export_alignment(analysis: Path, lyrics: Path, output: Path):
    if output.exists():
        raise ValueError('Refusing to overwrite an existing alignment directory')
    source = json.loads((analysis/'analysis.json').read_text(encoding='utf-8'))
    speech_path = analysis/'speech'/'whisper.json'
    speech = json.loads(speech_path.read_text(encoding='utf-8'))
    text = lyrics.read_text(encoding='utf-8-sig')
    result = reconcile(text, speech['words'], source['source']['audio']['duration_seconds'])
    result['provenance'] = {'analysis': str(analysis), 'lyrics': str(lyrics),
        'master_sha256': source['source']['sha256'],
        'lyrics_sha256': hashlib.sha256(lyrics.read_bytes()).hexdigest(),
        'speech_sha256': hashlib.sha256(speech_path.read_bytes()).hexdigest(),
        'model': speech.get('model'), 'repetition_diagnostics': speech.get('repetition_diagnostics')}
    output.mkdir(parents=True)
    (output/'word-timings.json').write_text(json.dumps(result, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
    with (output/'word-timings.tsv').open('w', newline='', encoding='utf-8') as stream:
        writer = csv.DictWriter(stream, fieldnames=list(result['words'][0]), delimiter='\t')
        writer.writeheader()
        writer.writerows(result['words'])
    manifest = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in output.iterdir()}
    (output/'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n', encoding='utf-8')
    return {k:v for k,v in result.items() if k not in ('words','canonical_text')}
