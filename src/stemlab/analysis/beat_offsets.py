"""Compare first-beat alignment at canonical and consensus tempos, without inference."""
from __future__ import annotations

import csv
from decimal import Decimal
from fractions import Fraction
import json
import math
import os
from pathlib import Path
import re
import tempfile

from stemlab.beats.common import tempo_from_beats
from stemlab.analysis.tempo_regimes import constant_beat_fit
from stemlab.cues import CueSnapConfig, _json, load_grid, select_grid
from stemlab.util import sha256_file

SCHEMA = 'stemlab.beat-offsets.v1'
PIPS_PER_BEAT = 64


def pip_offset(first_beat_seconds, bpm) -> dict:
    """Signed additive offset: source_seconds * BPM / 60 * 64 + offset = pip 0."""
    values = []
    for value, name in ((first_beat_seconds, 'first beat'), (bpm, 'BPM')):
        if isinstance(value, bool) or not isinstance(value, (int, float, Decimal, Fraction)):
            raise ValueError(name+' must be a finite number')
        if not math.isfinite(value):
            raise ValueError(name+' must be a finite number')
        values.append(value if isinstance(value, Fraction) else Fraction(str(value)))
    first, tempo = values
    if not 0 <= first < 1_000_000_000 or not 0 < tempo <= 10000:
        raise ValueError('Require 0 <= first beat < 1 billion seconds and 0 < BPM <= 10000')
    exact = -first*tempo*PIPS_PER_BEAT/60
    # Nearest integer, exact half-pip ties away from zero; no banker rounding.
    magnitude = abs(exact)
    nearest = (2*magnitude.numerator+magnitude.denominator)//(2*magnitude.denominator)
    integer = -nearest if exact < 0 else nearest
    residual = Fraction(integer)-exact
    return dict(offset_pips=float(exact), exact_offset_pips=str(exact), integer_offset_pips=integer,
        integer_rounding='nearest; exact half-pip ties away from zero',
        integer_residual_pips=float(residual), integer_residual_seconds=float(residual*60/(tempo*64)),
        beat_zero_seconds=float(first), integer_grid_origin_seconds=float(-Fraction(integer)*60/(tempo*64)),
        canonical_first_beat_pip=0, pips_per_beat=64)


def _bpm(value):
    if isinstance(value, bool) or not isinstance(value, (int, float, Decimal)) or not math.isfinite(value) or not 0 < value <= 10000:
        return None
    return value


def tempo_family(observed_bpm, canonical_bpm) -> dict:
    """Rank normal half/same/double metrical readings; this is not tempo approval."""
    if _bpm(observed_bpm) is None or _bpm(canonical_bpm) is None:
        return dict(status='unavailable', interpretations=[])
    observed, canonical = float(observed_bpm), float(canonical_bpm)
    choices = [dict(multiplier=factor, bpm=observed*factor,
                    difference_percent=100*(observed*factor/canonical-1)) for factor in (.5, 1., 2.)]
    closest = min(choices, key=lambda row: abs(math.log(row['bpm']/canonical)))
    return dict(status='candidate', observed_bpm=observed, canonical_bpm=canonical,
                closest_multiplier=closest['multiplier'], closest_bpm=closest['bpm'],
                difference_percent=closest['difference_percent'], interpretations=choices)


def _plain(value):
    if isinstance(value, Decimal):
        return float(value)
    if isinstance(value, dict):
        return {key: _plain(item) for key, item in value.items()}
    if isinstance(value, (list, tuple)):
        return [_plain(item) for item in value]
    return value


def compare_beat_offsets(results: Path, *, canonical_bpm=None, audio: Path | None = None) -> dict:
    """All saved detector/source runs, one canonical and one combined BPM basis.

    Keep the recorded consensus unchanged; do not double a half-time result,
    average detector BPMs, or count percussion runs as independent detectors.
    """
    root = Path(results).expanduser().resolve()
    if not root.is_dir():
        raise ValueError('Choose an existing StemLab analysis directory')
    analysis_path = root/'analysis.json'
    if not analysis_path.resolve().is_relative_to(root):
        raise ValueError('Analysis path leaves the result directory')
    analysis, analysis_hash = _json(analysis_path)
    source = analysis.get('source') or {}
    if not isinstance(source, dict):
        raise ValueError('analysis.json source must be an object')
    declared_hash = source.get('sha256')
    source_info = dict(sha256=declared_hash, audio=source.get('audio'), audio_verified=False)
    if audio is not None:
        from stemlab.audio import audio_info
        path = Path(audio).resolve()
        if not re.fullmatch('[0-9a-f]{64}', str(declared_hash)) or sha256_file(path) != declared_hash:
            raise ValueError('Audio identity differs from the saved analysis')
        info = audio_info(path)
        for field in ('num_frames', 'sample_rate', 'num_channels'):
            expected = (source.get('audio') or {}).get(field)
            if expected is not None and expected != info[field]:
                raise ValueError('Audio metadata differs from the saved analysis: '+field)
        source_info.update(audio=info, audio_verified=True, verified_audio=path.name)
    canonical_hash = None
    if canonical_bpm is not None:
        if _bpm(canonical_bpm) is None or not 1 <= canonical_bpm <= 400:
            raise ValueError('Canonical BPM must be finite and within 1..400')
        canonical_source = 'explicit canonical BPM argument'
    else:
        canonical_source = 'canonical.json'
        path = root/'canonical.json'
        if path.exists():
            if not path.resolve().is_relative_to(root):
                raise ValueError('Canonical metadata path leaves the result directory')
            data, canonical_hash = _json(path)
            canonical_bpm = _bpm(data.get('bpm'))
            if canonical_bpm is not None and not 1 <= canonical_bpm <= 400:
                raise ValueError('Canonical BPM must be within 1..400')
    paths = {p.stem: p for p in sorted((root/'beats').glob('*.json'))}
    structure = root/'deep/structure/structure.json'
    if structure.exists() and 'all_in_one' not in paths:
        paths['all_in_one'] = structure
    vamp = root/'vamp/data/vamp_beats.json'
    if vamp.exists() and 'vamp_beats' not in paths:
        paths['vamp_beats'] = vamp
    listed = analysis.get('beats') or []
    models = set(paths) | {str(r['model']) for r in listed if isinstance(r, dict) and r.get('model')}
    if len(models) > 128:
        raise ValueError('At most 128 beat-analysis results are supported')
    records = []
    combined_bpm, combined_source, combined_fit = None, None, None
    for model in sorted(models, key=lambda name: (name != 'consensus', name)):
        path = paths.get(model)
        record = dict(analysis_id=model, kind='consensus' if model == 'consensus' else 'individual',
                      status='unavailable', phase_status='estimated', first_beat_seconds=None)
        try:
            if path is None:
                raise ValueError('No saved timestamp file; a summary count is not beat evidence')
            if not path.resolve().is_relative_to(root):
                raise ValueError('Beat evidence path leaves the result directory')
            data, digest = _json(path)
            if data.get('error') or data.get('status') in ('failed', 'unavailable'):
                raise ValueError('Detector result failed or is unavailable')
            if model == 'vamp_beats' and path == vamp:
                events = data.get('events')
                if not isinstance(events, list) or any(not isinstance(e, dict) or 'start' not in e for e in events):
                    raise ValueError('Vamp beat events require explicit start timestamps')
                normalized = dict(beats=[e['start'] for e in events])
                base = load_grid(root, config=CueSnapConfig())
                grid = select_grid([(model, normalized, str(path), digest)], config=CueSnapConfig(),
                    duration=base.duration, sample_rate=base.sample_rate, source_sha256=base.source_sha256)
            else:
                if data.get('model', model) != model:
                    raise ValueError('Beat filename and detector identity disagree')
                grid = load_grid(root, config=CueSnapConfig(beat_model=model))
            if not grid.times:
                raise ValueError('No usable detected beat timestamps')
            metadata = data.get('metadata') or {}
            if not isinstance(metadata, dict):
                raise ValueError('Detector metadata must be an object')
            if grid.sha256 != digest or grid.analysis_sha256 not in (None, analysis_hash):
                raise ValueError('Beat evidence or source metadata changed during the read')
            record.update(status='available', first_beat_seconds=float(grid.times[0]),
                first_beat_exact_seconds=str(grid.times[0]), beat_count=len(grid.times),
                detector_bpm=float(data['tempo_bpm']) if _bpm(data.get('tempo_bpm')) is not None else None,
                evidence_file=path.relative_to(root).as_posix(), evidence_sha256=digest,
                detector=metadata.get('detector', model), input_source=metadata.get('source'), warnings=grid.warnings)
            import numpy as np
            record['constant_grid_fit'] = constant_beat_fit(np.asarray(grid.times, dtype=float))
            if model == 'consensus':
                combined_fit = record['constant_grid_fit']
                combined_bpm = _bpm(data.get('tempo_bpm'))
                combined_source = 'saved consensus tempo_bpm'
                if combined_bpm is None:
                    combined_bpm = tempo_from_beats([float(t) for t in grid.times])
                    combined_source = 'existing tempo_from_beats on saved consensus timestamps'
                record['consensus_method'] = metadata.get('method')
                record['required_support'] = metadata.get('required_support')
                record['detectors'] = metadata.get('detectors')
        except (OSError, ValueError, TypeError, KeyError) as exc:
            record.update(status='unavailable', reason=str(exc))
        records.append(record)
    family = tempo_family(combined_bpm, canonical_bpm)
    fitted_bpm = _bpm((combined_fit or {}).get('proposed_bpm'))
    family_bpm = (Decimal(str(combined_bpm))*Decimal(str(family['closest_multiplier']))
                  if family['status'] == 'candidate' else None)
    bases = [dict(id='canonical', bpm=float(canonical_bpm) if canonical_bpm is not None else None,
                  source=canonical_source, sha256=canonical_hash,
                  status='available' if canonical_bpm is not None else 'unavailable'),
             dict(id='combined', bpm=float(combined_bpm) if combined_bpm is not None else None,
                  source=combined_source, status='available' if combined_bpm is not None else 'unavailable'),
             dict(id='combined_family', bpm=float(family_bpm) if family_bpm is not None else None,
                  source='closest half/same/double metrical interpretation of the combined estimate',
                  multiplier=family.get('closest_multiplier'), status='available' if family_bpm is not None else 'unavailable'),
             dict(id='combined_fit', bpm=fitted_bpm, source='existing constant_beat_fit on unchanged consensus timestamps',
                  fit=combined_fit, status='available' if fitted_bpm is not None else 'unavailable')]
    for record in records:
        record['tempo_family'] = tempo_family(record.get('detector_bpm'), canonical_bpm)
    comparisons = []
    for record in records:
        for basis in bases:
            row = dict(analysis_id=record['analysis_id'], kind=record['kind'], bpm_basis=basis['id'],
                       bpm=basis['bpm'], status='unavailable')
            if record['status'] == 'available' and basis['status'] == 'available':
                tempo = {'canonical': canonical_bpm, 'combined_family': family_bpm,
                         'combined': combined_bpm, 'combined_fit': fitted_bpm}[basis['id']]
                row.update(pip_offset(Decimal(record['first_beat_exact_seconds']), tempo), status='available',
                           first_beat_seconds=record['first_beat_seconds'], phase_status='estimated',
                           first_beat_exact_seconds=record['first_beat_exact_seconds'], exact_bpm=str(Fraction(str(tempo))))
            else:
                row['reason'] = record.get('reason') or basis['id']+' BPM unavailable'
            comparisons.append(row)
    for record in records:
        if record.get('evidence_sha256') and sha256_file(root/record['evidence_file']) != record['evidence_sha256']:
            raise ValueError('Beat evidence changed during comparison')
    if sha256_file(analysis_path) != analysis_hash:
        raise ValueError('Source metadata changed during comparison')
    if canonical_hash and sha256_file(root/'canonical.json') != canonical_hash:
        raise ValueError('Canonical metadata changed during comparison')
    if audio is not None and sha256_file(Path(audio)) != declared_hash:
        raise ValueError('Audio changed during comparison')
    return _plain(dict(schema=SCHEMA, status='available' if any(r['status'] == 'available' for r in comparisons) else 'unavailable',
        producer='StemLab', source=source_info, analysis_sha256=analysis_hash, bpm_bases=bases,
        analyses=records, comparisons=comparisons, combined_tempo_family=family, pips_per_beat=64, canonical_first_beat_pip=0,
        mapping='aligned_pip = source_seconds * bpm / 60 * 64 + offset_pips',
        notes=['First detected beat is an estimate, not an artist-confirmed first beat or downbeat.',
               'Half/double time are normal metrical interpretations. Raw consensus/detector BPMs and observed events remain intact.',
               'The closest canonical-family BPM is a comparison candidate, not automatic tempo/phase approval or newly detected beats.',
               'The original grid starts at source time zero; the aligned grid starts at the selected first detected beat.',
               'A constant-tempo grid does not establish whole-song beat alignment or change canonical metadata.']))


def alignment_from_report(report: dict, *, analysis_id='consensus', bpm_basis='canonical', report_sha256=None) -> dict:
    """Small explicit, source-bound handoff for renderers and playback clocks."""
    source_sha = report.get('source', {}).get('sha256')
    if (report.get('schema') != SCHEMA or report.get('pips_per_beat') != 64
            or not re.fullmatch('[0-9a-f]{64}', str(source_sha))):
        raise ValueError('Alignment requires a valid source-bound 64-pip comparison report')
    row = next((r for r in report['comparisons'] if r['analysis_id'] == analysis_id and r['bpm_basis'] == bpm_basis), None)
    if row is None or row['status'] != 'available':
        raise ValueError('Selected beat analysis/BPM basis is unavailable; no alignment exported')
    first, tempo, offset = (Fraction(row[key]) for key in ('first_beat_exact_seconds', 'exact_bpm', 'exact_offset_pips'))
    if first*tempo*64/60+offset != 0:
        raise ValueError('Alignment offset and exact clock disagree')
    detector = next(r for r in report['analyses'] if r['analysis_id'] == analysis_id)
    return dict(schema='stemlab.beat-alignment.v1', source_sha256=source_sha,
        source_audio=report['source'].get('audio'), source_audio_verified=report['source'].get('audio_verified', False),
        bpm=row['bpm'], exact_bpm=row['exact_bpm'], bpm_basis=bpm_basis,
        bpm_status='canonical' if bpm_basis == 'canonical' else 'estimated',
        phase_status='estimated', analysis_id=analysis_id, evidence_sha256=detector['evidence_sha256'],
        first_beat_seconds=row['first_beat_seconds'], first_beat_exact_seconds=str(first),
        offset_pips=row['offset_pips'], exact_offset_pips=row['exact_offset_pips'],
        pips_per_beat=64, canonical_first_beat_pip=0, report_sha256=report_sha256,
        mapping='aligned_pip = source_seconds * bpm / 60 * 64 + offset_pips',
        scope='Rhythmic clock only. Preserve audio, lyric/cue and captured-recording source time. Detector phase remains estimated.')


def write_beat_offsets(results: Path, output: Path, *, alignment_analysis='consensus', alignment_bpm_basis=None, **options) -> dict:
    output = Path(output).expanduser().resolve()
    if output.exists():
        raise FileExistsError('Choose a new output directory; existing evidence is never overwritten')
    report = compare_beat_offsets(results, **options)
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='.beat-offsets-', dir=output.parent) as folder:
        stage = Path(folder)/'report'
        stage.mkdir()
        (stage/'beat-offsets.json').write_text(json.dumps(report, indent=2, allow_nan=False)+'\n', encoding='utf-8')
        if alignment_bpm_basis is not None:
            alignment = alignment_from_report(report, analysis_id=alignment_analysis, bpm_basis=alignment_bpm_basis,
                                              report_sha256=sha256_file(stage/'beat-offsets.json'))
            (stage/'beat-alignment.json').write_text(json.dumps(alignment, indent=2, allow_nan=False)+'\n', encoding='utf-8')
        fields = ('analysis_id', 'kind', 'bpm_basis', 'bpm', 'status', 'first_beat_seconds',
                  'offset_pips', 'integer_offset_pips', 'integer_residual_pips', 'integer_residual_seconds', 'reason')
        with (stage/'beat-offsets.csv').open('w', newline='', encoding='utf-8') as stream:
            writer = csv.DictWriter(stream, fieldnames=fields, extrasaction='ignore')
            writer.writeheader()
            writer.writerows(report['comparisons'])
        os.rename(stage, output)
    return report


def timeline_beat_offsets(results: Path, canonical_bpm=None) -> dict:
    """Keep an in-progress or unavailable beat report from blocking other lanes."""
    try:
        return compare_beat_offsets(results, canonical_bpm=canonical_bpm)
    except (ValueError, OSError, TypeError, KeyError) as exc:
        return dict(schema=SCHEMA, status='unavailable', reason=str(exc), bpm_bases=[], analyses=[], comparisons=[],
                    pips_per_beat=64, canonical_first_beat_pip=0)
