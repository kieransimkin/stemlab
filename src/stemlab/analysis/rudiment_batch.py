"""Bounded batch routing and transactional exports; DanceRudiments owns the visualizer."""
from __future__ import annotations
from dataclasses import asdict, replace
import hashlib
import importlib
import itertools
import json
import os
from pathlib import Path
import random
import shutil
import tempfile

from .rudiment_recordings import AxisSpec, EnvelopeBank, filter_sos, source_catalogue, resolve_tempo

MAX_BATCH_VALUES = 32_000_000
DEFAULT_FILTERS = (('raw', None, None), ('bass180', 180., None), ('bass350', 350., None),
                   ('treble1600', None, 1600.), ('treble3000', None, 3000.), ('mid', 3000., 180.))


def _harness_api():
    try:
        return importlib.import_module('dancerudiments_authoring.harness')
    except ImportError as exc:
        raise RuntimeError('Install the companion DanceRudiments recording/harness update') from exc


def _output_stage(output):
    output = Path(output).expanduser().resolve()
    if output.exists():
        raise FileExistsError('Choose a new output directory; existing output is never overwritten')
    return output


def _audio_metadata(master, bank, stage, include_audio):
    from stemlab.util import sha256_file
    path = Path(master).resolve()
    metadata = dict(name=path.name, sha256=sha256_file(path), range_start=float(bank.start), range_end=float(bank.end))
    if include_audio:
        suffix = path.suffix.lower()
        filename = 'audio'+(suffix if suffix in ('.wav', '.mp3', '.flac', '.ogg', '.aiff', '.aif', '.m4a') else '.bin')
        shutil.copyfile(path, stage/filename)
        if sha256_file(stage/filename) != metadata['sha256']:
            raise ValueError('Source audio changed during copying')
        metadata['relative_path'] = filename
    return metadata


def export_single(master, output, axes, *, timing, normalization='none', name='audio_recording',
                  include_audio=False, harness=True, legacy=False, **options):
    """New directory with recording JSON, comparison harness and provenance report."""
    renderer = _harness_api() if harness else None
    output = _output_stage(output)
    bank = EnvelopeBank([master]+[a.source for a in axes], **timing, **options)
    if legacy and (len(axes) > 3 or bank.count > 65535):
        raise ValueError('Legacy compiled export is limited to 1..3 axes and 65535 pips')
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent, prefix='.stemlab-recording-') as folder:
        stage = Path(folder)/'result'
        (stage/'recordings').mkdir(parents=True)
        r = bank.compose(axes, name=name, normalization=normalization,
                         metadata={'title': name.replace('_', ' '), 'family': 'Custom routing',
                                   'description': _describe(axes)})
        bank.api.write_recording(stage/'recordings'/(r.name+'.json'), r)
        if legacy:
            bank.api.write_document(stage/(r.name+'.compiled.json'), r.to_compiled_pack().to_dict())
        audio = _audio_metadata(master, bank, stage, include_audio)
        report = dict(schema='stemlab.rudiment-recording-run.v1', clock=asdict(bank.clock),
                      sources=[dict(name=p.name, sha256=h) for p, h in bank.hashes.items()],
                      candidates=[dict(name=r.name, dimensions=list(r.dimensions), file='recordings/'+r.name+'.json')],
                      extraction_passes=len(bank.cache), cached_values=bank.cached_values)
        if renderer:
            report['harness'] = renderer.build_recording_harness([r], stage/'index.html', audio=audio)
        bank.verify_sources()
        report['harness_file'] = 'index.html' if renderer else None
        (stage/'report.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
        os.rename(stage, output)
    return report


def _describe(axes):
    return ' | '.join(f'{a.name}: {a.source.name}, {a.mode}, '+
        (f'HP {a.high_pass:g} Hz / LP {a.low_pass:g} Hz' if a.high_pass is not None and a.low_pass is not None else
         f'LP {a.low_pass:g} Hz' if a.low_pass is not None else f'HP {a.high_pass:g} Hz' if a.high_pass is not None else 'unfiltered')+
        (f', {a.moving_average_beats:g} beat centered window' if a.mode == 'moving-average' else '')+
        (f', gain {a.gain:g}' if a.gain != 1 else '') for a in axes)


def generate_batch(source, output, *, bpm=None, confirmed=False, beat_zero=None, beat_model='auto',
                   dimensions=(2, 3), max_candidates=0, seed=0, normalization='per-axis',
                   filters=DEFAULT_FILTERS, include_audio=False, harness=True, extra_sources=None,
                   modes=('peak', 'average'), moving_average_beats=.25,
                   progress=None, **options):
    """Fair source coverage then seeded cross-source combinations, not an exhaustive Cartesian product.

    Two baseline candidates per source retain bass/treble and raw/filtered coverage.
    Extra constant/duplicate numeric movements are skipped. Baseline duplicates
    are labelled, rather than silently dropping a source from the batch.
    """
    timing = resolve_tempo(source, bpm=bpm, confirmed=confirmed, beat_zero=beat_zero, beat_model=beat_model)
    if not modes:
        raise ValueError('Choose at least one amplitude mode')
    modes = tuple(dict.fromkeys(modes))
    for mode in modes:
        AxisSpec('validate', Path(source), mode=mode, moving_average_beats=moving_average_beats)
    if not dimensions or any(type(d) is not int or d < 2 for d in dimensions):
        raise ValueError('Batch dimensions must be positive integers >=2')
    dimensions = tuple(dict.fromkeys(dimensions))
    if type(seed) is not int or type(max_candidates) is not int or not 0 <= max_candidates <= 1024:
        raise ValueError('Seed must be an integer; max-candidates must be 0..1024 (0=automatic)')
    renderer = _harness_api() if harness else None
    catalogue = source_catalogue(source)
    for key, path in (extra_sources or {}).items():
        if key in catalogue or not key or len(key) > 128 or '\0' in key:
            raise ValueError('Duplicate/invalid extra source name')
        catalogue[key] = Path(path).expanduser().resolve()
    maximum = min(1024, max(48, 3*len(catalogue))) if max_candidates == 0 else max_candidates
    if maximum > 1024 or maximum < 2*len(catalogue):
        raise ValueError(f'Need at least {2*len(catalogue)} candidates for two routes per source (limit 1024)')
    if not filters:
        raise ValueError('At least one filter route is required')
    for label, low, high in filters:
        if not isinstance(label, str) or not label or len(label)>64 or (label=='raw' and (low is not None or high is not None)):
            raise ValueError('Invalid filter preset label')
        AxisSpec('validate', Path(source), low_pass=low, high_pass=high)
    output = _output_stage(output)
    progress = progress or (lambda text: None)
    bank = EnvelopeBank(catalogue.values(), progress=progress, **timing, **options)
    if bank.count*max(dimensions) > bank.api.MAX_RECORDING_VALUES:
        raise ValueError('One candidate exceeds the shared value budget; shorten the excerpt')
    coverage_values = sum(bank.count*dimensions[i % len(dimensions)] for i in range(2*len(catalogue)))
    if coverage_values > MAX_BATCH_VALUES:
        raise ValueError('Source coverage exceeds the batch value budget; shorten the excerpt')
    routes, skipped_filters = {}, []
    for key, path in catalogue.items():
        variants = []
        definitions = [('raw', None, None)] + list(filters)
        seen = set()
        for label, low, high in definitions:
            if (low, high) in seen:
                continue
            seen.add((low, high))
            try:
                prototype = AxisSpec('route', path, low_pass=low, high_pass=high)
                filter_sos(prototype, bank.infos[path.resolve()].samplerate)
            except ValueError as exc:
                skipped_filters.append(dict(source=key, filter=label, reason=str(exc)))
                continue
            for mode in modes:
                variants.append((label, replace(prototype, mode=mode, moving_average_beats=moving_average_beats)))
        routes[key] = variants
    rng = random.Random(seed)
    pool = [(key, label, spec) for key, variants in routes.items() for label, spec in variants]
    if not pool:
        raise ValueError('No valid audio routes')

    def make_axes(refs, orientation=False):
        result = []
        for i, (_, _, spec) in enumerate(refs):
            axis = ('x', 'y', 'z')[i] if i < 3 else f'axis_{i+1}'
            result.append(replace(spec, name=axis, gain=rng.choice((-1., 1.)) if orientation else 1.))
        return result

    def baseline_plans():
        index = 0
        for key, variants in routes.items():
            raw_peak = next(((label, spec) for label, spec in variants if label == 'raw' and spec.mode == 'peak'), variants[0])
            raw_mean = next(((label, spec) for label, spec in variants if label == 'raw' and spec.mode == 'average'), variants[0])
            bass = next(((label, spec) for label, spec in variants if spec.low_pass is not None and spec.high_pass is None and spec.mode == raw_peak[1].mode), raw_peak)
            treble = next(((label, spec) for label, spec in variants if spec.high_pass is not None and spec.low_pass is None and spec.mode == raw_mean[1].mode), raw_mean)
            pair_family = 'Source bass / treble' if bass[1].low_pass is not None and treble[1].high_pass is not None else 'Source filtered pair (limited bandwidth)'
            for family, chosen in [(pair_family, [bass, treble, raw_peak]), ('Source raw / filtered', [raw_mean, bass, treble])]:
                dim = dimensions[index % len(dimensions)]
                index += 1
                choices = chosen + variants
                refs = [(key, *choices[i % len(choices)]) for i in range(dim)]
                yield family, refs, False, True

    def mixed_plans():
        for _ in range(maximum*20):
            dim = rng.choice(dimensions)
            if len(catalogue) > 1:
                keys = rng.sample(list(catalogue), 2)
                refs = [(key, *rng.choice(routes[key])) for key in keys]
                refs.extend(rng.choice(pool) for _ in range(dim-2))
            else:
                refs = rng.sample(pool, dim) if dim <= len(pool) else [rng.choice(pool) for _ in range(dim)]
            yield 'Cross-source / orientation' if len(catalogue) > 1 else 'Filter / orientation variations', refs, True, False

    report = dict(schema='stemlab.rudiment-recording-batch.v1', clock=asdict(bank.clock), seed=seed,
                  requested_dimensions=list(dimensions), max_candidates=maximum, normalization=normalization,
                  modes=list(modes), moving_average_beats=moving_average_beats,
                  sources=[dict(key=k, name=p.name, sha256=bank.hashes[p.resolve()]) for k, p in catalogue.items()],
                  candidates=[], skipped_filters=skipped_filters, skipped_candidates=[], limit_reason=None,
                  coverage_policy='A bass/treble and a raw/filtered baseline per source; static/duplicate baselines are labelled',
                  filter_presets=[dict(name=a, low_pass=b, high_pass=c) for a, b, c in filters])
    hashes, total_values, attempts = {}, 0, 0
    output.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(dir=output.parent, prefix='.stemlab-batch-') as folder:
        stage = Path(folder)/'result'
        (stage/'recordings').mkdir(parents=True)
        audio = _audio_metadata(catalogue['master'], bank, stage, include_audio)
        def recordings():
            nonlocal attempts, total_values
            plans = itertools.chain(baseline_plans(), mixed_plans())
            for family, refs, orientation, baseline in plans:
                if len(report['candidates']) >= maximum:
                    report['limit_reason'] = 'max_candidates'
                    break
                attempts += 1
                axes = make_axes(refs, orientation)
                if total_values+bank.count*len(axes) > MAX_BATCH_VALUES:
                    report['limit_reason'] = 'batch_value_budget'
                    break
                title = family+' / '+' × '.join(dict.fromkeys(key for key, _, _ in refs))
                values, meta = bank.compose(axes, normalization=normalization,
                    metadata=dict(title=title, family=family, description=_describe(axes),
                                  route_sources=[key for key, _, _ in refs],
                                  route_filters=[label for _, label, _ in refs]), _data_only=True)
                digest = hashlib.sha256((values+0.).astype('<f8').tobytes()).hexdigest()
                duplicate = hashes.get((len(axes), digest))
                if not baseline and (duplicate or not meta['dynamic']):
                    report['skipped_candidates'].append(dict(attempt=attempts, reason='duplicate' if duplicate else 'constant'))
                    continue
                name = f'candidate_{len(report["candidates"])+1:04d}'
                hashes.setdefault((len(axes), digest), name)
                meta.update(seed=seed, baseline=baseline, duplicate_of=duplicate)
                r = bank.api.Recording(name, tuple(a.name for a in axes), values.tolist(), bank.clock, json.dumps(meta, allow_nan=False))
                filename = 'recordings/'+name+'.json'
                bank.api.write_recording(stage/filename, r)
                report['candidates'].append(dict(name=name, title=title, family=family,
                    dimensions=len(axes), file=filename, sources=[key for key, _, _ in refs],
                    sample_sha256=digest, duplicate_of=duplicate, dynamic=meta['dynamic']))
                total_values += values.size
                progress(f'Generated {len(report["candidates"])}/{maximum}: {title}')
                yield r
        if renderer:
            report['harness'] = renderer.build_recording_harness(recordings(), stage/'index.html',
                                                                collection_id='stemlab-batch', audio=audio)
        else:
            for _ in recordings():
                pass
        bank.verify_sources()
        if report['limit_reason'] is None:
            report['limit_reason'] = 'max_candidates' if len(report['candidates']) >= maximum else 'attempt_budget'
        report.update(total_values=int(total_values), attempts=attempts,
                      extraction_passes=len(bank.cache), cache_hits=bank.cache_hits,
                      cached_values=bank.cached_values,
                      candidate_count=len(report['candidates']), harness_file='index.html' if renderer else None)
        (stage/'report.json').write_text(json.dumps(report, indent=2)+'\n', encoding='utf-8')
        os.rename(stage, output)
    return report
