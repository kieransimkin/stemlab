"""Source-bound, sample-accurate, nonuniform rhythmic timeline for DanceFlow.

The consensus detector is read-only. User corrections live in a separate document;
consumer phase is an integral of the *observed* beat intervals, never a constant
BPM approximation. Beat zero is explicit and need not be a musical downbeat.
"""
from __future__ import annotations

import hashlib
import json
import math
import os
import re
import tempfile
import threading
from bisect import bisect_right
from decimal import Decimal, ROUND_HALF_UP
from fractions import Fraction
from pathlib import Path
from typing import Any

SCHEMA = 'stemlab.beat-timeline.v1'
PIPS = 64
MAX_BEATS = 25_000
MAX_JSON_BYTES = 32 * 1024 * 1024
_SAVE_LOCK = threading.Lock()
_HASH = re.compile(r'^[a-f0-9]{64}$')


def _load_json(path: Path, max_bytes: int = MAX_JSON_BYTES) -> dict:
    if not path.is_file() or path.stat().st_size > max_bytes:
        raise ValueError(f'Missing/oversized required input: {path.name}')
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict):
        raise ValueError(f'{path.name} must contain a JSON object')
    return data


def _hash_file(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def _bounded_int(value: Any, name: str, low: int, high: int) -> int:
    if type(value) is not int or not low <= value <= high:
        raise ValueError(f'{name} must be an integer in {low}..{high}')
    return value


def _audio_info(root: Path, source_hash: str) -> dict:
    import soundfile as sf
    if not _HASH.fullmatch(source_hash) or root.name != source_hash:
        raise ValueError('Beat timeline must be bound to the selected SHA-256 result')
    source = root / '.source'
    found = sorted(source.glob('upload.*')) if source.is_dir() else []
    if not found:
        analysis = _load_json(root / 'analysis.json')
        meta = analysis.get('source') or {}
        if meta.get('sha256') != source_hash:
            raise ValueError('Saved analysis master SHA-256 disagrees with selected result')
        rel = Path(meta.get('copied_path', ''))
        if rel.is_absolute() or '..' in rel.parts or not rel.parts:
            raise ValueError('Invalid saved master path')
        path = (root / rel).resolve()
        if not path.is_relative_to(root.resolve()):
            raise ValueError('Saved master escapes the analysis directory')
    else:
        path = found[0]
    if not path.is_file():
        raise ValueError('Exact master audio is not present')
    if _hash_file(path) != source_hash:
        raise ValueError('Master audio bytes do not match the selected source SHA-256')
    info = sf.info(str(path))
    if info.frames < 2 or info.samplerate < 1:
        raise ValueError('Master must have at least two source frames')
    return {'sha256': source_hash, 'sample_rate': info.samplerate,
            'num_frames': info.frames, 'duration_seconds': info.frames / info.samplerate,
            'num_channels': info.channels}


def _consensus(root: Path) -> tuple[dict, str]:
    path = root / 'beats' / 'consensus.json'
    document = _load_json(path)
    if document.get('error') or document.get('status') in ('failed', 'unavailable'):
        raise ValueError('Consensus analysis has not succeeded')
    if document.get('model', 'consensus') != 'consensus':
        raise ValueError('Consensus file has another detector identity')
    values = document.get('beats')
    if not isinstance(values, list) or not 2 <= len(values) <= MAX_BEATS:
        raise ValueError('A consensus with 2..25000 real timestamps is required')
    previous = -1.
    for value in values:
        if type(value) not in (int, float) or not math.isfinite(value) or value <= previous or value < 0:
            raise ValueError('Consensus timestamps must be finite, ordered, nonnegative and unique')
        previous = value
    return document, _hash_file(path)


def _frame(value: int | float, sample_rate: int) -> int:
    return int((Decimal(str(value)) * sample_rate).to_integral_value(rounding=ROUND_HALF_UP))


def seed_from_consensus(root: Path, source_hash: str) -> dict:
    """Lossless relative-to-sample-rate consensus anchors; no inferred beat claims."""
    source = _audio_info(root, source_hash)
    document, digest = _consensus(root)
    beats = []
    previous = -1
    for index, seconds in enumerate(document['beats']):
        frame = _frame(seconds, source['sample_rate'])
        if frame <= previous or frame >= source['num_frames']:
            raise ValueError('Consensus timestamps overlap at native sample resolution or exceed the master')
        beats.append({'beat': index, 'frame': frame,
                      'source': 'consensus', 'reference_frame': frame})
        previous = frame
    return validate_map({'schema': SCHEMA, 'pips_per_beat': PIPS,
                         'source_audio': source, 'consensus_sha256': digest,
                         'origin_beat': 0, 'review_status': 'estimated',
                         'beats': beats}, expected_hash=source_hash)


def validate_map(data: dict, *, expected_hash: str | None = None, actual_audio: dict | None = None) -> dict:
    """Strictly revalidate imported, edited and persisted beat maps.

    Frames are the authority; seconds and BPM are derived, never accepted as
    substitute evidence. Nonadjacent integer beats represent an explicit gap.
    """
    if not isinstance(data, dict) or data.get('schema') != SCHEMA or data.get('pips_per_beat') != PIPS:
        raise ValueError(f'Expected {SCHEMA} at 64 pips per beat')
    audio = data.get('source_audio')
    if not isinstance(audio, dict):
        raise ValueError('Source-bound master metadata is required')
    digest = audio.get('sha256')
    if not isinstance(digest, str) or not _HASH.fullmatch(digest) or (expected_hash and expected_hash != digest):
        raise ValueError('Master SHA-256 mismatch')
    sr = _bounded_int(audio.get('sample_rate'), 'sample_rate', 1, 768_000)
    n = _bounded_int(audio.get('num_frames'), 'num_frames', 2, 10**13)
    ch = _bounded_int(audio.get('num_channels'), 'num_channels', 1, 512)
    if actual_audio is not None and any(audio.get(k) != actual_audio.get(k) for k in
                                        ('sha256', 'sample_rate', 'num_frames', 'num_channels')):
        raise ValueError('Map identity differs from the exact master recording')
    consensus_sha = data.get('consensus_sha256')
    if not isinstance(consensus_sha, str) or not _HASH.fullmatch(consensus_sha):
        raise ValueError('Original consensus SHA-256 is required')
    rows = data.get('beats')
    if not isinstance(rows, list) or not 2 <= len(rows) <= MAX_BEATS:
        raise ValueError('Need 2..25000 beat anchors')
    corrected = []
    prior_frame, prior_beat = -1, -1
    for idx, entry in enumerate(rows):
        if not isinstance(entry, dict):
            raise ValueError('Every anchor must be an object')
        beat = _bounded_int(entry.get('beat'), 'beat', 0, 2_147_483_647)
        frame = _bounded_int(entry.get('frame'), 'frame', 0, n-1)
        if frame <= prior_frame or beat <= prior_beat:
            raise ValueError('Beat numbers and source frames must both increase strictly')
        kind = entry.get('source')
        if kind not in ('consensus', 'corrected', 'manual'):
            raise ValueError('Beat source must be consensus, corrected or manual')
        reference = entry.get('reference_frame')
        if reference is not None:
            _bounded_int(reference, 'reference_frame', 0, n-1)
        if kind == 'consensus' and (reference is None or frame != reference):
            raise ValueError('Unmodified consensus beats must retain their original frame')
        if kind == 'manual' and reference is not None:
            raise ValueError('Manually inserted beats have no detector reference')
        corrected.append({'beat': beat, 'frame': frame, 'source': kind,
                          'reference_frame': reference})
        prior_beat, prior_frame = beat, frame
    origin = _bounded_int(data.get('origin_beat'), 'origin_beat', 0, 2_147_483_647)
    if origin not in {r['beat'] for r in corrected}:
        raise ValueError('Beat 1 origin must identify a real anchor')
    status = data.get('review_status', 'estimated')
    if status not in ('estimated', 'artist_confirmed'):
        raise ValueError('Expected estimated or explicitly artist_confirmed beat status')
    return {'schema': SCHEMA, 'pips_per_beat': PIPS,
            'source_audio': {'sha256': digest, 'sample_rate': sr,
                             'num_frames': n, 'duration_seconds': n / sr, 'num_channels': ch},
            'consensus_sha256': consensus_sha, 'origin_beat': origin,
            'review_status': status, 'beats': corrected}


def _verify_references(data: dict, consensus: dict) -> None:
    sr = data['source_audio']['sample_rate']
    known = {_frame(value, sr) for value in consensus['beats']}
    seen = set()
    for row in data['beats']:
        reference = row['reference_frame']
        if reference is not None:
            if reference not in known or reference in seen:
                raise ValueError('Consensus reference frames must match unique original detections')
            seen.add(reference)


def phase_at_frame(data: dict, frame: int | Fraction) -> Fraction:
    """Integrated pips; exact piecewise-linear phase, including boundary extrapolation."""
    beats = data['beats']
    frames = [b['frame'] for b in beats]
    index = max(0, min(len(beats)-2, bisect_right(frames, frame)-1))
    left, right = beats[index:index+2]
    relative = Fraction(frame-left['frame'], right['frame']-left['frame'])
    return PIPS * (left['beat'] - data['origin_beat'] + relative * (right['beat']-left['beat']))


def export_document(data: dict) -> dict:
    """Single complete JSON object, ready for a variable-tempo consumer adapter."""
    doc = validate_map(data)
    sr = doc['source_audio']['sample_rate']
    rows = doc['beats']
    origin = next(b for b in rows if b['beat'] == doc['origin_beat'])
    offset = phase_at_frame(doc, 0)
    intervals = []
    for a, b in zip(rows, rows[1:]):
        bpm = Fraction((b['beat']-a['beat']) * 60 * sr, b['frame']-a['frame'])
        intervals.append({'from_beat': a['beat'], 'to_beat': b['beat'],
                          'start_frame': a['frame'], 'end_frame': b['frame'],
                          'start_seconds': a['frame']/sr, 'end_seconds': b['frame']/sr,
                          'bpm': float(bpm), 'bpm_exact': str(bpm)})
    timeline = []
    first_bpm = intervals[0]['bpm']
    for row in rows:
        phase_pips = PIPS * (row['beat'] - doc['origin_beat'])
        theoretical = (row['frame']-origin['frame']) * first_bpm * PIPS / (sr*60)
        timeline.append({'beat': row['beat'], 'time_seconds': row['frame']/sr,
                         'source_frame': row['frame'], 'pip': phase_pips,
                         'source': row['source'],
                         'consensus_reference_frame': row['reference_frame'],
                         'consensus_error_ms': None if row['reference_frame'] is None else
                             1000*(row['frame']-row['reference_frame'])/sr,
                         'phase_deviation_pips': phase_pips - theoretical})
    exact_offset = str(offset)
    return {**doc,
            'mapping': 'piecewise-linear integrated phase between exact beat anchors; extrapolate nearest interval at ends',
            'sync': {'beat_1_index': doc['origin_beat'], 'beat_1_source_frame': origin['frame'],
                     'beat_1_start_seconds': origin['frame'] / sr,
                     'beat_1_start_pips': float(-offset),
                     'beat_1_start_ticks': float(-offset/4),
                     'sync_phase_offset_pips': float(offset),
                     'sync_phase_offset_ticks': float(offset/4),
                     'exact_phase_offset_pips': exact_offset,
                     'canonical_first_beat_pip': 0,
                     'phase_offset_reference': 'integrated variable-tempo beat map extrapolated to source time zero',
                     'pips_per_beat': PIPS, 'ticks_per_beat_dancemoves': 16},
            'beat_timeline': timeline, 'tempo_segments': intervals,
            'control_envelopes': {
                'tempo': 'interval BPM = 60 * beat_step * source_sample_rate / interval_frames',
                'phase': 'native pip = integrated 64-pip beat position with Beat 1 at zero',
                'interpolation': 'piecewise-linear phase between anchors; bounded positive piecewise BPM',
            },
            'consumer_note': 'DanceMoves beat-alignment.v1 supports ONLY fixed tempo; variable-tempo playback needs a beat-timeline.v1 importer. Do not silently reduce this map to one BPM.'}


def _path(root: Path) -> Path:
    return root / 'timing' / 'beat-timeline.json'


def read_or_seed(root: Path, source_hash: str) -> tuple[dict, bool, str | None]:
    """Return saved correction or exact detector proposal; proposal is never persisted."""
    saved = _path(root)
    if saved.exists():
        raw = saved.read_bytes()
        if len(raw) > MAX_JSON_BYTES:
            raise ValueError('Stored beat timeline exceeds 32 MiB')
        source = _audio_info(root, source_hash)
        data = validate_map(json.loads(raw), expected_hash=source_hash, actual_audio=source)
        consensus, current_digest = _consensus(root)
        if data['consensus_sha256'] != current_digest:
            raise ValueError('Original consensus evidence has changed; review and rebase corrections')
        _verify_references(data, consensus)
        return export_document(data), True, hashlib.sha256(raw).hexdigest()
    return export_document(seed_from_consensus(root, source_hash)), False, None


def preview(root: Path, source_hash: str, payload: dict) -> dict:
    source = _audio_info(root, source_hash)
    doc = validate_map(payload, expected_hash=source_hash, actual_audio=source)
    consensus, current_hash = _consensus(root)
    if doc['consensus_sha256'] != current_hash:
        raise ValueError('Original consensus has changed; rebase the correction explicitly')
    _verify_references(doc, consensus)
    return export_document(doc)


def save(root: Path, source_hash: str, payload: dict, expected_revision: str | None) -> tuple[dict, str]:
    result = preview(root, source_hash, payload)
    target = _path(root)
    with _SAVE_LOCK:
        exists = target.exists()
        digest = hashlib.sha256(target.read_bytes()).hexdigest() if exists else None
        if expected_revision != digest:
            raise FileExistsError('Another editor saved this beat timeline; reload before overwriting')
        target.parent.mkdir(parents=True, exist_ok=True)
        body = (json.dumps(result, indent=2, ensure_ascii=True, allow_nan=False) + '\n').encode('utf-8')
        if len(body) > MAX_JSON_BYTES:
            raise ValueError('Corrected beat timeline exceeds 32 MiB; export a shorter excerpt')
        fd, temp = tempfile.mkstemp(dir=target.parent, prefix='.beat-timeline-', suffix='.json')
        try:
            with os.fdopen(fd, 'wb') as handle:
                handle.write(body)
                handle.flush()
                os.fsync(handle.fileno())
            os.replace(temp, target)
        finally:
            if os.path.exists(temp):
                os.unlink(temp)
        return result, hashlib.sha256(body).hexdigest()
