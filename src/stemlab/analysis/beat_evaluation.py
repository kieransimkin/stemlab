"""Source-bound, one-to-one beat evaluation and held-out reliability calibration.

Only explicit human-reviewed beat annotations may be evaluated. BPM labels alone
are not beat timestamps. No predicted grid is promoted to an observed beat map.
Calibration never uses a song for both fitting and evaluation.
"""
from __future__ import annotations

from collections import defaultdict
import json
import math
from pathlib import Path
import re
from typing import Any

import numpy as np

ANNOTATION_FORMAT = 'stemlab.beat-annotation.v1'
_HASH = re.compile(r'[0-9a-f]{64}\Z')


def _times(raw: Any, *, name: str) -> np.ndarray:
    if (not isinstance(raw, list) or len(raw) > 25_000
            or any(type(value) not in (int, float) or not math.isfinite(value) or value < 0
                   for value in raw)):
        raise ValueError(f'{name} must contain ordered finite nonnegative timestamps')
    times = np.asarray(raw, dtype=float)
    if len(times) and np.any(np.diff(times) <= 0):
        raise ValueError(f'{name} timestamps must be strictly increasing')
    return times


def read_annotation(path: Path | str) -> dict:
    """Require source-hashed, explicitly reviewed, source-clock reference beats."""
    path = Path(path)
    if not path.is_file() or path.stat().st_size > 2 * 1024 * 1024:
        raise ValueError('Missing or oversized beat annotation')
    def unique_pairs(items):
        result = {}
        for key, value in items:
            if key in result:
                raise ValueError('Duplicate annotation field: ' + key)
            result[key] = value
        return result
    data = json.loads(path.read_text(encoding='utf-8'), object_pairs_hook=unique_pairs,
                      parse_constant=lambda x: (_ for _ in ()).throw(ValueError(x)))
    if (not isinstance(data, dict) or data.get('format') != ANNOTATION_FORMAT
            or type(data.get('schema_version')) is not int or data['schema_version'] != 1):
        raise ValueError('Expected stemlab.beat-annotation.v1')
    if not isinstance(data.get('source_sha256'), str) or not _HASH.fullmatch(data['source_sha256']):
        raise ValueError('Annotation requires source audio/motion SHA-256')
    if data.get('clock') != 'source_seconds' or data.get('status') != 'human_reviewed':
        raise ValueError('Annotation requires explicit human review and original source clock')
    if not isinstance(data.get('annotator'), str) or not data['annotator'].strip():
        raise ValueError('Annotation requires a nonempty annotator/provenance label')
    beats = _times(data.get('beats'), name='Beat annotation')
    if len(beats) < 5:
        raise ValueError('At least five annotated beats are needed for evaluation')
    downs = _times(data.get('downbeats', []), name='Downbeats')
    if len(downs):
        if any(np.min(np.abs(beats - value)) > .07 for value in downs):
            raise ValueError('Annotated downbeats must coincide with reviewed beats')
    return data


def beat_f_measure(predicted: list[float], reference: list[float], *, tolerance: float = .07) -> dict:
    """Monotone one-to-one beat matching: no prediction may match twice.

    A timing F1 of 1 measures agreement *with the given annotation*, not whether
    an artist-confirmed tempo or a genuine downbeat was inferred independently.
    """
    a, b = _times(predicted, name='Predictions'), _times(reference, name='Reference')
    if not type(tolerance) in (int, float) or not math.isfinite(tolerance) or not 0 < tolerance <= .2:
        raise ValueError('Tolerance must be finite and in (0, 0.2] seconds')
    i = j = matched = 0
    errors = []
    consecutive = longest = 0
    while i < len(a) and j < len(b):
        delta = a[i] - b[j]
        if abs(delta) <= tolerance:
            matched += 1
            errors.append(abs(float(delta)))
            consecutive += 1
            longest = max(longest, consecutive)
            i += 1; j += 1
        elif delta < 0:
            consecutive = 0
            i += 1
        else:
            consecutive = 0
            j += 1
    precision = matched / len(a) if len(a) else 0.0
    recall = matched / len(b) if len(b) else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    return {'matched_count': matched, 'predicted_count': len(a), 'reference_count': len(b),
            'precision': round(precision, 6), 'recall': round(recall, 6),
            'f_measure': round(f1, 6),
            'median_absolute_error_seconds': round(float(np.median(errors)), 6) if errors else None,
            'longest_continuous_match_count_proxy': longest,
            'tolerance_seconds': float(tolerance),
            'note': 'One-to-one timing matches; not a tempo score or ground-truth confidence.'}


def evaluate_report(report: dict, annotation: dict, *, tolerance: float = .07) -> dict:
    """Compare a *source-bound* classical/model report to user-supplied truth."""
    if annotation.get('format') != ANNOTATION_FORMAT or annotation.get('status') != 'human_reviewed':
        raise ValueError('An explicitly reviewed beat annotation is required')
    input_data = report.get('input') or {}
    original = input_data.get('sha256')
    if input_data.get('kind') == 'saved_model_result':
        original = (input_data.get('metadata') or {}).get('source_sha256')
    if original is None or original != annotation.get('source_sha256'):
        raise ValueError('Annotation source hash must match the exact analysed source')
    reference = _times(annotation.get('beats'), name='Annotation').tolist()
    comparisons = []
    for hypothesis in report.get('hypotheses', []):
        # Saved model events are predictions too, and remain a separate case.
        candidates = hypothesis.get('grid_seconds', [])
        metrics = beat_f_measure(candidates, reference, tolerance=tolerance)
        comparisons.append({'detector': hypothesis['detector'], 'feature': hypothesis['feature'],
                            'bpm': hypothesis['bpm'],
                            'raw_detector_score_uncalibrated': hypothesis.get('score_uncalibrated'),
                            'predicted_grid_kind': ('saved_model_estimate' if hypothesis.get('beats_are_model_estimates')
                                                    else 'constant_tempo_hypothesis'),
                            **metrics})
    return {'format': 'stemlab.beat-evaluation.v1', 'schema_version': 1,
            'source_sha256': annotation['source_sha256'],
            'annotator': annotation['annotator'], 'annotation_status': 'human_reviewed',
            'source_name': input_data.get('name'), 'comparisons': comparisons,
            'calibrated_confidence_status': 'unavailable_until_held_out_corpus',
            'note': ('Evaluation is conditional on this annotation. Use distinct track identities '
                     'for fitting and holdout; no detector score is a probability.')}


def _isotonic_train(values: list[tuple[float, float]]) -> list[dict]:
    """Pool-adjacent-violators calibration, with explicit training support counts."""
    blocks = []
    for score, success in sorted(values):
        blocks.append([score, score, float(success), 1])
        while len(blocks) > 1 and blocks[-2][2] / blocks[-2][3] > blocks[-1][2] / blocks[-1][3]:
            a, b = blocks[-2:]
            blocks[-2:] = [[a[0], b[1], a[2] + b[2], a[3] + b[3]]]
    return [{'score_min': round(a, 6), 'score_max': round(b, 6),
             'success_rate': round(total / count, 6), 'samples': count}
            for a, b, total, count in blocks]


def _map_isotonic(blocks: list[dict], value: float) -> float:
    return min(blocks, key=lambda b: max(b['score_min'] - value, value - b['score_max'], 0))['success_rate']


def calibrate_held_out(evaluations: list[dict], *, min_train: int = 8,
                       min_holdout: int = 4, success_f1: float = .75) -> dict:
    """Train score->reliability on a disjoint labelled corpus, never its holdout.

    Each input must be one separate track/method result with a prescribed
    `split` of 'train' or 'holdout'. No pseudo-labels from an audio model.
    Returns reliability only for methods meeting minimum sample requirements;
    otherwise abstains. No model training or source media download occurs.
    """
    if not 0 < success_f1 <= 1:
        raise ValueError('A positive success F1 threshold is required')
    groups: dict[str, list[dict]] = defaultdict(list)
    for example in evaluations:
        if not isinstance(example, dict):
            raise ValueError('Evaluation example must be a dictionary')
        if example.get('split') not in ('train', 'holdout'):
            raise ValueError('Explicit train/holdout split required')
        sha, method = example.get('source_sha256'), example.get('detector')
        if not isinstance(sha, str) or not _HASH.fullmatch(sha) or not isinstance(method, str) or not method:
            raise ValueError('Each calibration sample needs exact source hash and method')
        score, f1 = example.get('raw_score'), example.get('reference_f_measure')
        if (type(score) not in (int, float) or type(f1) not in (int, float)
                or not math.isfinite(score) or not math.isfinite(f1) or not 0 <= score <= 1
                or not 0 <= f1 <= 1):
            raise ValueError('Uncalibrated score and reference F1 must be finite in [0,1]')
        groups[method].append(example)
    training_ids = {row['source_sha256'] for rows in groups.values() for row in rows
                    if row['split'] == 'train'}
    holdout_ids = {row['source_sha256'] for rows in groups.values() for row in rows
                   if row['split'] == 'holdout'}
    if training_ids & holdout_ids:
        raise ValueError('The same source cannot occur in both train and holdout across any methods')
    results = []
    for method, items in sorted(groups.items()):
        train = [x for x in items if x['split'] == 'train']
        held = [x for x in items if x['split'] == 'holdout']
        ids_t = {x['source_sha256'] for x in train}
        ids_h = {x['source_sha256'] for x in held}
        if ids_t & ids_h:
            raise ValueError('Calibration track cannot appear in both train and holdout')
        if (len(ids_t) < min_train or len(ids_h) < min_holdout
                or len(ids_t) != len(train) or len(ids_h) != len(held)):
            results.append({'detector': method, 'status': 'insufficient_disjoint_tracks',
                            'training_tracks': len(ids_t), 'holdout_tracks': len(ids_h)})
            continue
        tables = _isotonic_train([(x['raw_score'], float(x['reference_f_measure'] >= success_f1))
                                 for x in train])
        predicted = [float(_map_isotonic(tables, x['raw_score'])) for x in held]
        observed = [float(x['reference_f_measure'] >= success_f1) for x in held]
        brier = float(np.mean((np.asarray(predicted) - np.asarray(observed)) ** 2))
        results.append({'detector': method, 'status': 'held_out_evaluated_calibration',
                        'training_tracks': len(train), 'holdout_tracks': len(held),
                        'success_threshold_f1': success_f1,
                        'heldout_brier': round(brier, 6), 'calibration_table': tables,
                        'note': 'Reliability on this held-out corpus; not a universal probability.'})
    return {'format': 'stemlab.beat-score-calibration.v1', 'schema_version': 1,
            'methods': results, 'annotation_requirement': 'independently reviewed beat timestamps'}
