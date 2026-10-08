"""Lossless LRC cue labels, detected-event snapping and explicit review diagnostics.

StemLab / DanceFlow — Kieran Simkin, https://kieransimkin.co.uk/my-songs/
No detector inference, tempo extrapolation, audio editing or implicit overwriting.
"""
from __future__ import annotations

import bisect
import hashlib
import html
import json
import re
import tempfile
from collections import Counter, defaultdict
from dataclasses import dataclass, field
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP, localcontext
from pathlib import Path
from typing import Any, Iterable

SCHEMA = "stemlab.cue-snap.v1"
GENERATE_SCHEMA = "stemlab.cue-generate.v1"
TIMESTAMP = re.compile(r"\[(\d{1,9}):([0-5]\d)(?:\.(\d{1,30}))?\]")
OFFSET = re.compile(r"^\s*\[offset:\s*([+-]?\d{1,9})\s*\]\s*$", re.IGNORECASE)
ENHANCED = re.compile(r"<\d+:\d+(?:\.\d+)?>")
PRIORITY = ("consensus", "all_in_one", "beat_transformer", "beat_this", "beatnet")
MAX_CUE_BYTES = 2 * 1024 * 1024
MAX_GRID_BYTES = 32 * 1024 * 1024
MAX_CUES = 20_000
MAX_BEATS = 500_000


def _hash(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def _number(value: Any, name: str) -> Decimal:
    if isinstance(value, bool) or not isinstance(value, (int, float, Decimal)):
        raise ValueError(f"{name} must be numeric (not a string or boolean)")
    try:
        result = Decimal(str(value))
    except InvalidOperation as exc:
        raise ValueError(f"Invalid {name}") from exc
    if not result.is_finite() or abs(result) >= Decimal('1000000000'):
        raise ValueError(f"{name} must be finite and smaller than 1 billion")
    if result.as_tuple().exponent < -30:
        raise ValueError(f"{name} exceeds 30 decimal places")
    return result


def _read(path: Path, limit: int) -> bytes:
    with path.open('rb') as handle:
        raw = handle.read(limit + 1)
    if len(raw) > limit:
        raise ValueError(f"File exceeds {limit} bytes: {path}")
    return raw


def _json(path: Path) -> tuple[dict, str]:
    raw = _read(path, MAX_GRID_BYTES)
    try:
        data = json.loads(raw.decode('utf-8-sig'), parse_float=Decimal)
    except (ValueError, UnicodeError) as exc:
        raise ValueError(f"Invalid UTF-8 JSON: {path}") from exc
    if not isinstance(data, dict):
        raise ValueError(f"Expected a JSON object: {path}")
    return data, _hash(raw)


@dataclass(frozen=True)
class CueSnapConfig:
    tolerance_ms: float = 150.0
    beat_model: str = 'auto'
    downbeats_only: bool = False
    force_snap: bool = False
    precision: str = 'exact'

    def __post_init__(self) -> None:
        if not 0 <= _number(self.tolerance_ms, 'tolerance_ms') <= 60000:
            raise ValueError('tolerance_ms must be between 0 and 60000')
        if not isinstance(self.beat_model, str) or not re.fullmatch(r'[A-Za-z0-9_-]+', self.beat_model):
            raise ValueError('beat_model must be auto or a detector id (letters, digits, _ and -)')
        if type(self.downbeats_only) is not bool or type(self.force_snap) is not bool:
            raise ValueError('downbeats_only and force_snap must be booleans')
        if self.precision not in ('exact', 'milliseconds', 'centiseconds'):
            raise ValueError('precision must be exact, milliseconds or centiseconds')


@dataclass(frozen=True)
class Cue:
    line: int
    column_start: int
    column_end: int
    timestamp: str
    time: Decimal
    label: str
    occurrence: int


@dataclass
class CueDocument:
    lines: list[str]
    cues: list[Cue]
    offset_ms: int = 0
    encoding: str = 'utf-8'
    bom: bytes = b''

    def effective_time(self, cue: Cue) -> Decimal:
        # Positive LRC offsets advance display: event_time = tag_time - offset_ms/1000.
        with localcontext() as ctx:
            ctx.prec = 50
            return cue.time - Decimal(self.offset_ms) / 1000


def parse_lrc(text: str) -> CueDocument:
    """Parse leading timestamps only; bracketed cue labels remain opaque text.

    Multiple leading timestamps are supported without splitting/reordering lines.
    Enhanced word-timing LRC is refused instead of silently desynchronising words.
    """
    if '\x00' in text:
        raise ValueError('LRC text contains NUL characters')
    if ENHANCED.search(text):
        raise ValueError('Enhanced word-timing LRC is not supported; provide line-level musical cues')
    lines = text.splitlines(keepends=True)
    cues: list[Cue] = []
    offsets: list[int] = []
    for line_no, line in enumerate(lines, 1):
        body = line.rstrip('\r\n')
        offset = OFFSET.fullmatch(body)
        if offset:
            offsets.append(int(offset[1]))
            continue
        if re.match(r'^\s*\[offset:', body, re.IGNORECASE):
            raise ValueError(f'Malformed offset metadata on line {line_no}')
        position = len(body) - len(body.lstrip(' \t\ufeff'))
        matches = []
        while True:
            match = TIMESTAMP.match(body, position)
            if match is None:
                if re.match(r'\[[+-]?\d+[:.]', body[position:]):
                    raise ValueError(f'Malformed LRC timestamp on line {line_no}')
                break
            matches.append(match)
            position = match.end()
            while position < len(body) and body[position] in ' \t':
                position += 1
        label = body[position:]
        for index, match in enumerate(matches):
            with localcontext() as ctx:
                ctx.prec = 50
                seconds = Decimal(match[2] + ('.' + match[3] if match[3] else ''))
                timestamp = Decimal(match[1]) * 60 + seconds
            cues.append(Cue(line_no, match.start(), match.end(), match[0], timestamp, label, index + 1))
        if len(cues) > MAX_CUES:
            raise ValueError(f'LRC exceeds {MAX_CUES} cue timestamps')
    if len(offsets) > 1:
        raise ValueError('Multiple offset tags are ambiguous; retain exactly one offset tag')
    return CueDocument(lines, cues, offsets[0] if offsets else 0)


def read_lrc(path: Path) -> tuple[CueDocument, bytes]:
    raw = _read(path, MAX_CUE_BYTES)
    encoding, bom = 'utf-8', b''
    for prefix, codec in ((b'\xef\xbb\xbf', 'utf-8'), (b'\xff\xfe', 'utf-16-le'), (b'\xfe\xff', 'utf-16-be')):
        if raw.startswith(prefix):
            encoding, bom = codec, prefix
            break
    try:
        text = raw[len(bom):].decode(encoding)
    except UnicodeError as exc:
        raise ValueError('Use UTF-8 LRC or BOM-marked UTF-16; no lossy encoding conversion is performed') from exc
    document = parse_lrc(text)
    if not document.cues:
        raise ValueError('No line-level LRC cue timestamps were found')
    document.encoding, document.bom = encoding, bom
    return document, raw


def format_timestamp(seconds: Decimal, precision: str = 'exact') -> str:
    seconds = _number(seconds, 'timestamp')
    if seconds < 0:
        raise ValueError('Negative LRC timestamp cannot be encoded')
    with localcontext() as ctx:
        ctx.prec = 50
        if precision != 'exact':
            seconds = seconds.quantize(Decimal('.001' if precision == 'milliseconds' else '.01'), rounding=ROUND_HALF_UP)
        minutes = int(seconds // 60)
        rest = format(seconds - minutes * 60, 'f')
    integer, _, fraction = rest.partition('.')
    if precision == 'exact':
        fraction = fraction.rstrip('0').ljust(2, '0')
    return f'[{minutes:02d}:{int(integer):02d}.{fraction}]'


@dataclass
class BeatGrid:
    times: tuple[Decimal, ...]
    model: str | None
    kind: str = 'beats'
    path: str | None = None
    sha256: str | None = None
    warnings: list[str] = field(default_factory=list)
    sample_rate: int | None = None
    duration: Decimal | None = None
    source_sha256: str | None = None
    analysis_sha256: str | None = None


def _validated_times(data: dict, kind: str, duration: Decimal | None) -> tuple[tuple[Decimal, ...], list[str]]:
    values = data.get(kind, [])
    if not isinstance(values, (list, tuple)) or len(values) > MAX_BEATS:
        raise ValueError(f'{kind} must be an array of at most {MAX_BEATS} timestamps')
    times = [_number(value, f'{kind} timestamp') for value in values]
    if any(t < 0 for t in times):
        raise ValueError('Negative detected timestamps are invalid')
    notes = []
    if times != sorted(times) or len(times) != len(set(times)):
        notes.append('Detected timestamps were sorted and exact duplicates removed; no new beats were inferred.')
    if duration is not None:
        kept = [time for time in times if time <= duration]
        if len(kept) != len(times):
            notes.append(f'{len(times) - len(kept)} detected event(s) beyond the recorded audio duration were excluded.')
        times = kept
    return tuple(sorted(set(times))), notes


def select_grid(records: Iterable[tuple[str, dict, str | None, str | None]], *,
                config: CueSnapConfig, sample_rate: int | None = None,
                duration: Decimal | None = None, source_sha256: str | None = None) -> BeatGrid:
    """Choose ONE detector/consensus grid, never a fabricated constant-tempo grid."""
    if sample_rate is not None and (type(sample_rate) is not int or not 1 <= sample_rate <= 10_000_000):
        raise ValueError('sample_rate must be a positive integer <= 10000000')
    if duration is not None:
        duration = _number(duration, 'duration')
        if duration < 0:
            raise ValueError('duration must be nonnegative')
    kind = 'downbeats' if config.downbeats_only else 'beats'
    records = list(records)
    if config.beat_model != 'auto':
        records = [record for record in records if record[0] == config.beat_model]
        if not records:
            raise ValueError(f'No result for requested detector {config.beat_model!r}')
    records.sort(key=lambda r: (PRIORITY.index(r[0]) if r[0] in PRIORITY else len(PRIORITY), r[0]))
    warnings: list[str] = []
    empty = None
    for model, data, path, digest in records:
        if data.get('error') or data.get('status') in ('failed', 'unavailable'):
            warnings.append(f'{model}: failed/unavailable result ignored')
            continue
        try:
            times, notes = _validated_times(data, kind, duration)
        except ValueError as exc:
            if config.beat_model != 'auto':
                raise
            warnings.append(f'{model}: {exc}')
            continue
        grid = BeatGrid(times, model, kind, path, digest, warnings + notes,
                        sample_rate, duration, source_sha256)
        if times:
            return grid
        warnings.append(f'{model}: no detected {kind}')
        empty = grid
    return BeatGrid((), empty.model if empty else None, kind,
                    empty.path if empty else None, empty.sha256 if empty else None,
                    warnings + [f'No usable detected {kind}; all cues require review.'],
                    sample_rate, duration, source_sha256)


def load_grid(source: Path, *, config: CueSnapConfig, sample_rate: int | None = None) -> BeatGrid:
    """Load a StemLab folder or explicit detector JSON. Never read canonical BPM."""
    source = source.expanduser().resolve()
    records = []
    warnings = []
    duration, source_sha, analysis_sha = None, None, None
    if source.is_file():
        data, digest = _json(source)
        records.append((str(data.get('model') or source.stem), data, str(source), digest))
    elif source.is_dir():
        analysis = source / 'analysis.json'
        if analysis.exists():
            if not analysis.resolve().is_relative_to(source):
                raise ValueError('Analysis metadata symlink escapes the result folder')
            record, analysis_sha = _json(analysis)
            src = record.get('source') or {}
            if not isinstance(src, dict):
                raise ValueError('analysis.json source must be an object')
            info = src.get('audio') or {}
            if not isinstance(info, dict):
                raise ValueError('analysis.json source.audio must be an object')
            saved_sr = info.get('sample_rate')
            if saved_sr is not None:
                if type(saved_sr) is not int or saved_sr <= 0:
                    raise ValueError('Invalid source sample rate in analysis.json')
                if sample_rate is not None and sample_rate != saved_sr:
                    raise ValueError('--sample-rate disagrees with analysis.json')
                sample_rate = saved_sr
            frames = info.get('num_frames')
            if type(frames) is int and frames >= 0 and sample_rate:
                with localcontext() as ctx:
                    ctx.prec = 50
                    duration = Decimal(str(frames / sample_rate))
            elif info.get('duration_seconds') is not None:
                duration = _number(info['duration_seconds'], 'duration')
            source_sha = src.get('sha256')
        paths = sorted((source / 'beats').glob('*.json'))
        structure = source / 'deep/structure/structure.json'
        if structure.exists() and not (source / 'beats/all_in_one.json').exists():
            paths.append(structure)
        for path in paths:
            if not path.resolve().is_relative_to(source):
                raise ValueError('Beat result symlink escapes the result folder')
            file_model = 'all_in_one' if path == structure else path.stem
            if config.beat_model != 'auto' and file_model != config.beat_model:
                continue
            try:
                data, digest = _json(path)
            except ValueError as exc:
                if config.beat_model != 'auto':
                    raise
                warnings.append(str(exc))
                continue
            records.append((file_model, data, str(path), digest))
    else:
        raise FileNotFoundError(source)
    grid = select_grid(records, config=config, sample_rate=sample_rate,
                       duration=duration, source_sha256=source_sha)
    grid.warnings = warnings + grid.warnings
    grid.analysis_sha256 = analysis_sha
    return grid


def _nearest(times: tuple[Decimal, ...], time: Decimal) -> int | None:
    if not times:
        return None
    at = bisect.bisect_left(times, time)
    indices = [i for i in (at - 1, at) if 0 <= i < len(times)]
    return min(indices, key=lambda i: (abs(times[i] - time), times[i]))


def _sample(time: Decimal | None, sample_rate: int | None) -> int | None:
    if time is None or sample_rate is None or time < 0:
        return None
    return int((time * sample_rate).to_integral_value(rounding=ROUND_HALF_UP))


def snap_document(document: CueDocument, grid: BeatGrid, config: CueSnapConfig) -> tuple[bytes, dict]:
    """Return new bytes and auditable decisions; all non-timestamp bytes survive."""
    with localcontext() as ctx:
        ctx.prec = 50
        return _snap_document(document, grid, config)


def _snap_document(document: CueDocument, grid: BeatGrid, config: CueSnapConfig) -> tuple[bytes, dict]:
    times = grid.times
    if tuple(sorted(set(times))) != times or any(not t.is_finite() or t < 0 for t in times):
        raise ValueError('BeatGrid must contain sorted, unique, nonnegative finite Decimal timestamps')
    tolerance = Decimal(str(config.tolerance_ms)) / 1000
    offset = Decimal(document.offset_ms) / 1000
    rows: list[dict] = []
    replacements: dict[int, list[tuple[int, int, str]]] = defaultdict(list)
    assignments: dict[int, list[int]] = defaultdict(list)
    effective_outputs: list[Decimal] = []
    for cue in document.cues:
        time = document.effective_time(cue)
        index = _nearest(times, time)
        beat = times[index] if index is not None else None
        delta = beat - time if beat is not None else None
        near = delta is not None and abs(delta) <= tolerance
        issues: list[str] = []
        if beat is None:
            issues.append('no_detected_beats')
        elif not near:
            issues.append('no_nearby_beat')
        outside = time < 0 or (grid.duration is not None and time > grid.duration)
        if outside:
            issues.append('outside_audio')
        result_time = time
        token = cue.timestamp
        action = 'kept'
        rounding = Decimal(0)
        eligible = beat is not None and (near or config.force_snap) and not outside
        if eligible and beat + offset < 0:
            issues.append('offset_cannot_encode_beat')
            eligible = False
        if eligible:
            token = format_timestamp(beat + offset, config.precision)
            parsed = TIMESTAMP.fullmatch(token)
            raw = Decimal(parsed[1]) * 60 + Decimal(parsed[2] + '.' + parsed[3])
            result_time = raw - offset
            rounding = result_time - beat
            action = ('already_on_beat' if time == beat else 'snapped') if near else 'forced'
            if rounding:
                issues.append('rounded_off_beat')
            assignments[index].append(len(rows))
        replacements[cue.line].append((cue.column_start, cue.column_end, token))
        effective_outputs.append(result_time)
        rows.append({
            'cue_index': len(rows) + 1, 'line': cue.line, 'timestamp_index': cue.occurrence,
            'label': cue.label, 'original_timestamp': cue.timestamp, 'output_timestamp': token,
            'original_seconds': float(time), 'original_seconds_exact': str(time),
            'output_seconds': float(result_time), 'output_seconds_exact': str(result_time),
            'nearest_beat_index': index, 'nearest_beat_seconds': float(beat) if beat is not None else None,
            'nearest_beat_seconds_exact': str(beat) if beat is not None else None,
            'nearest_beat_gap_ms': float(abs(delta) * 1000) if delta is not None else None,
            'shift_to_nearest_beat_ms': float(delta * 1000) if delta is not None else None,
            'applied_shift_ms': float((result_time - time) * 1000),
            'serialization_error_ms': float(rounding * 1000),
            'has_nearby_beat': bool(near), 'action': action, 'issues': issues,
            'needs_review': bool(issues),
            'nearest_beat_sample': _sample(beat, grid.sample_rate),
            'output_sample': _sample(result_time, grid.sample_rate),
            'on_selected_beat_exactly': beat is not None and result_time == beat,
        })
    for indices in assignments.values():
        if len({Decimal(rows[i]['original_seconds_exact']) for i in indices}) > 1:
            for i in indices:
                rows[i]['issues'].append('shared_beat')
                rows[i]['needs_review'] = True
    chronological = sorted(range(len(rows)), key=lambda i: document.effective_time(document.cues[i]))
    for a, b in zip(chronological, chronological[1:]):
        if effective_outputs[a] > effective_outputs[b]:
            for i in (a, b):
                rows[i]['issues'].append('order_inversion')
                rows[i]['needs_review'] = True
    lines = list(document.lines)
    for line_no, spans in replacements.items():
        for start, end, replacement in reversed(spans):
            line = lines[line_no - 1]
            lines[line_no - 1] = line[:start] + replacement + line[end:]
    counts = Counter(row['action'] for row in rows)
    review_count = sum(row['needs_review'] for row in rows)
    report = {
        'schema': SCHEMA, 'status': 'review_required' if review_count else 'completed',
        'cue_count': len(rows), 'snapped_count': counts['snapped'],
        'already_on_beat_count': counts['already_on_beat'], 'kept_count': counts['kept'],
        'forced_count': counts['forced'], 'review_count': review_count,
        'without_nearby_beat_count': sum(not row['has_nearby_beat'] for row in rows),
        'all_cues_on_detected_beats': bool(rows) and all(row['on_selected_beat_exactly'] for row in rows),
        'config': {'tolerance_ms': float(config.tolerance_ms), 'beat_model': config.beat_model,
                   'downbeats_only': config.downbeats_only, 'force_snap': config.force_snap,
                   'precision': config.precision},
        'grid': {'model': grid.model, 'kind': grid.kind, 'event_count': len(times),
                 'path': grid.path, 'sha256': grid.sha256, 'warnings': grid.warnings},
        'sample_rate': grid.sample_rate,
        'sample_convention': 'Zero-based native audio frames, rounded to nearest sample; detector timing is an estimate.',
        'source_sha256': grid.source_sha256, 'analysis_sha256': grid.analysis_sha256,
        'source_identity_note': 'Identity/sample rate from supplied analysis metadata; no audio was decoded or rehashed.',
        'duration_seconds': float(grid.duration) if grid.duration is not None else None,
        'offset_ms': document.offset_ms,
        'offset_convention': 'Positive offset advances cues: audio time = timestamp minus offset_ms / 1000. Offset tag preserved.',
        'precision_note': 'Exact uses the stored decimal beat timestamp. Compatibility precision may round off the beat. '
                          'No precision mode makes an estimated beat acoustically exact.',
        'cues': rows,
    }
    return document.bom + ''.join(lines).encode(document.encoding), report


def review_text(report: dict) -> str:
    lines = [f"StemLab cue alignment: {report['status']}",
             f"Grid: {report['grid']['model']} / {report['grid']['kind']}; nearby <= {report['config']['tolerance_ms']:g} ms",
             f"{report['cue_count']} cues, {report['without_nearby_beat_count']} without a nearby beat, {report['review_count']} requiring review.",
             'REVIEW remains set for distant cues even when forced onto a beat.', '']
    for row in report['cues']:
        gap = f"{row['nearest_beat_gap_ms']:.3f} ms" if row['nearest_beat_gap_ms'] is not None else 'no beat'
        lines.append(f"{'REVIEW' if row['needs_review'] else 'OK'} line {row['line']}: "
                     f"{row['original_timestamp']} -> {row['output_timestamp']} | {row['action']} | gap {gap} | "
                     f"{', '.join(row['issues']) or '-'} | {row['label']}")
    lines += ['', *report['grid']['warnings'], report['precision_note']]
    return '\n'.join(lines) + '\n'


def review_html(report: dict) -> str:
    """Self-contained, escaped report. No scripts, remote assets or active cue markup."""
    def esc(value: Any) -> str:
        return html.escape(str(value), quote=True)
    rows = []
    for item in report['cues']:
        gap = f"{item['nearest_beat_gap_ms']:.3f} ms" if item['nearest_beat_gap_ms'] is not None else 'NO BEAT'
        status = 'REVIEW' if item['needs_review'] else 'OK'
        cells = [status, item['line'], item['label'], item['original_timestamp'], item['output_timestamp'],
                 item['nearest_beat_seconds_exact'] or '—', gap, item['action'], ', '.join(item['issues']) or '—']
        rows.append(f'<tr class="{status.lower()}">' + ''.join(f'<td>{esc(c)}</td>' for c in cells) + '</tr>')
    return '''<!doctype html><html lang="en"><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'">
<title>StemLab cue alignment review</title><style>
body{font:16px system-ui,sans-serif;margin:2rem;background:#101621;color:#e9eef7}
h1{margin-bottom:.5rem}p{max-width:90ch;line-height:1.6}table{border-collapse:collapse;width:100%;font-size:14px}
th,td{text-align:left;vertical-align:top;padding:.65rem;border-bottom:1px solid #465368}th{background:#20324a}
.review{background:#4b2330}.review td:first-child{font-weight:800;color:#ffced6}.ok td:first-child{color:#adf1c8}
.scroll{overflow:auto}td:nth-child(4),td:nth-child(5){white-space:nowrap;font-family:monospace}
</style><h1>StemLab · cue alignment</h1>''' + (
        f"<p><strong>{report['review_count']} cues require review; {report['without_nearby_beat_count']} have no nearby beat.</strong><br>"
        f"Grid: {esc(report['grid']['model'])} · {esc(report['grid']['kind'])} · "
        f"Nearby tolerance: ±{esc(report['config']['tolerance_ms'])} ms. Red rows are also labelled REVIEW; "
        'forcing a distant snap does not clear the warning. Cue text and original inputs are preserved.</p>'
        '<div class="scroll"><table><thead><tr>' + ''.join(f'<th>{name}</th>' for name in
            ('Status', 'Line', 'Cue', 'Original tag', 'Output tag', 'Nearest beat (s)', 'Original gap', 'Action', 'Issues'))
        + '</tr></thead><tbody>' + ''.join(rows) + '</tbody></table></div>'
        + '<p>' + esc(report['precision_note']) + '</p><p>' + esc('; '.join(report['grid']['warnings']))
        + '</p><p>StemLab / DanceFlow · Kieran Simkin</p></html>\n'
    )


def snap_cue_file(cue_file: Path, output_dir: Path, *, grid: BeatGrid,
                  config: CueSnapConfig | None = None) -> dict:
    """Write a new complete result folder. Never edit the input or an older report."""
    config = config or CueSnapConfig()
    cue_file = Path(cue_file).expanduser().resolve()
    output_dir = Path(output_dir).expanduser().absolute()
    if output_dir.exists() or output_dir.is_symlink():
        raise FileExistsError(f'Output must be a NEW directory: {output_dir}')
    document, original = read_lrc(cue_file)
    output, report = snap_document(document, grid, config)
    name = cue_file.stem + '.beat-snapped.lrc'
    report.update({'input_cue_file': str(cue_file), 'input_cue_sha256': _hash(original),
                   'output_cue_file': name, 'output_cue_sha256': _hash(output),
                   'files': {'cues': name, 'report': 'report.json', 'review': 'review.html', 'text': 'review.txt'}})
    output_dir.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.cue-snap-', dir=output_dir.parent) as temporary:
        stage = Path(temporary) / 'result'
        stage.mkdir()
        (stage / name).write_bytes(output)
        (stage / 'report.json').write_text(json.dumps(report, indent=2, ensure_ascii=False, allow_nan=False) + '\n', encoding='utf-8')
        (stage / 'review.txt').write_text(review_text(report), encoding='utf-8')
        (stage / 'review.html').write_text(review_html(report), encoding='utf-8')
        # Recheck before publishing; rename refuses any nonempty existing directory.
        if output_dir.exists() or output_dir.is_symlink():
            raise FileExistsError(f'Output appeared while processing: {output_dir}')
        stage.rename(output_dir)
    return report


def snap_existing_cues(source: Path, cue_file: Path, output_dir: Path, *,
                       config: CueSnapConfig | None = None, sample_rate: int | None = None) -> dict:
    config = config or CueSnapConfig()
    grid = load_grid(Path(source), config=config, sample_rate=sample_rate)
    return snap_cue_file(cue_file, output_dir, grid=grid, config=config)


def _section_source(results: Path) -> tuple[str, list[dict], str, str]:
    """Load functional boundaries without inventing labels or a whole-track cue."""
    results = Path(results).expanduser().resolve()
    candidates = [
        (results / 'deep/song_map/song_map.json', 'sections', 'section_source'),
        (results / 'deep/structure/structure.json', 'segments', None),
    ]
    for path, key, origin_key in candidates:
        if not path.exists():
            continue
        if not path.resolve().is_relative_to(results):
            raise ValueError('Structure result symlink escapes the result folder')
        data, digest = _json(path)
        origin = str(data.get(origin_key) or 'all_in_one') if origin_key else 'all_in_one'
        if origin in {'whole_track', 'none'}:
            continue
        raw = data.get(key)
        if not isinstance(raw, list):
            raise ValueError(f'{path} {key} must be an array')
        sections: list[dict] = []
        for index, item in enumerate(raw):
            if not isinstance(item, dict):
                raise ValueError(f'{path} section {index + 1} must be an object')
            start = _number(item.get('start'), f'section {index + 1} start')
            if start < 0:
                raise ValueError(f'{path} section {index + 1} has a negative start')
            label = str(item.get('label') or item.get('text') or '').strip()
            label = re.sub(r'[\r\n\t]+', ' ', label)
            if not label:
                raise ValueError(f'{path} section {index + 1} has no model label')
            sections.append({'start': start, 'label': label, 'source_index': index + 1})
        sections.sort(key=lambda row: (row['start'], row['source_index']))
        if sections:
            return origin, sections, str(path), digest
    raise ValueError('No functional section boundaries found; full structure analysis must complete first')


def generate_section_cues(results: Path, output_dir: Path, *,
                          config: CueSnapConfig | None = None,
                          title: str | None = None,
                          artist: str = 'Kieran Simkin') -> dict:
    """Export detected functional sections as a new beat-aligned LRC result."""
    config = config or CueSnapConfig()
    results = Path(results).expanduser().resolve()
    output_dir = Path(output_dir).expanduser().absolute()
    if output_dir.exists() or output_dir.is_symlink():
        raise FileExistsError(f'Output must be a NEW directory: {output_dir}')
    origin, sections, section_path, section_sha = _section_source(results)
    grid = load_grid(results, config=config)
    if title is None:
        canonical = results / 'canonical.json'
        if canonical.exists():
            data, _ = _json(canonical)
            candidate = data.get('title')
            if isinstance(candidate, str) and candidate.strip():
                title = candidate.strip()
    title = title or 'StemLab-generated section cues'
    safe_title = re.sub(r'[\r\n\t]+', ' ', title).strip()
    safe_artist = re.sub(r'[\r\n\t]+', ' ', artist).strip()
    lines = [
        f'[ti:{safe_title} - Provisional Section Cues]',
        f'[ar:{safe_artist}]',
        f'[by:StemLab {origin} functional structure; machine-generated; listening review required]',
        '[offset:0]',
        '',
    ]
    for section in sections:
        lines.append(f"{format_timestamp(section['start'])}[SECTION: {section['label']}]")
    source_text = '\n'.join(lines) + '\n'
    output, report = snap_document(parse_lrc(source_text), grid, config)
    report['schema'] = GENERATE_SCHEMA
    report['status'] = 'review_required'
    report['generation'] = {
        'section_source': origin,
        'section_file': section_path,
        'section_file_sha256': section_sha,
        'section_count': len(sections),
        'labels_retained_verbatim': True,
        'machine_generated': True,
        'listening_review_required': True,
        'boundary_policy': 'Detected section starts are snapped only when a selected detected beat is within tolerance; distant starts are retained and flagged.',
    }
    filename_title = re.sub(r'[^A-Za-z0-9]+', '-', safe_title).strip('-').lower()
    name = f'{filename_title or "stemlab"}-section-cues.beat-snapped.lrc'
    report.update({
        'generated_source_sha256': _hash(source_text.encode('utf-8')),
        'output_cue_file': name,
        'output_cue_sha256': _hash(output),
        'files': {'cues': name, 'report': 'report.json', 'review': 'review.html', 'text': 'review.txt'},
    })
    output_dir.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.cue-generate-', dir=output_dir.parent) as temporary:
        stage = Path(temporary) / 'result'
        stage.mkdir()
        (stage / name).write_bytes(output)
        (stage / 'report.json').write_text(
            json.dumps(report, indent=2, ensure_ascii=False, allow_nan=False) + '\n', encoding='utf-8')
        generated_review = review_text(report)
        generated_review += '\nMachine-generated functional boundaries require listening review before being treated as canonical.\n'
        (stage / 'review.txt').write_text(generated_review, encoding='utf-8')
        (stage / 'review.html').write_text(review_html(report), encoding='utf-8')
        if output_dir.exists() or output_dir.is_symlink():
            raise FileExistsError(f'Output appeared while processing: {output_dir}')
        stage.rename(output_dir)
    return report
