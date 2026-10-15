"""Two-axis stem pairing and controlled amplitude-mode comparisons.

Reuses StemLab separation and envelope extraction and DanceRudiments' native
recording/harness. No private separator, movement format or renderer lives here.
"""
from __future__ import annotations

from contextlib import contextmanager
from dataclasses import asdict, replace
import hashlib
import itertools
import json
import os
from pathlib import Path
import random
import tempfile

from .rudiment_batch import DEFAULT_FILTERS, MAX_BATCH_VALUES, _audio_metadata, _describe, _harness_api, _output_stage
from .rudiment_recordings import AxisSpec, EnvelopeBank, filter_sos, moving_average_pips, resolve_tempo, source_catalogue

DEFAULT_AVERAGE_WINDOWS = (0.125, 0.25, 0.5, 1.0)


def separation_config(source: Path, output: Path, model: str, device: str):
    """Only separate; do not accidentally launch Whisper, semantics or other models."""
    from stemlab.models import MODEL_REGISTRY
    from stemlab.types import PipelineConfig
    if model not in MODEL_REGISTRY:
        raise ValueError('Unknown separation model: ' + model)
    if device not in ('auto', 'cpu', 'cuda', 'mps'):
        raise ValueError('Device must be auto, cpu, cuda or mps')
    return PipelineConfig(input_wav=source, output_dir=output, models=(model,), device=device,
        continue_on_error=False, make_spectrograms=False, run_whisper=False,
        run_beats=False, run_vamp=False, run_deep_analysis=False, run_structure=False,
        run_text_semantics=False, run_audio_semantics=False, run_basic_pitch=False,
        run_loops=False, export_loops=False)


@contextmanager
def pair_sources(source, *, separate=True, analysis_output=None, model='htdemucs_6s',
                 device='auto', progress=None):
    source = Path(source).expanduser().resolve()
    if source.is_dir() or not separate:
        if analysis_output is not None:
            raise ValueError('--analysis-output is only for separating a new audio file')
        yield source_catalogue(source), {'separation': 'reused saved stems' if source.is_dir() else 'master only'}
        return
    if not source.is_file():
        raise FileNotFoundError(source)
    progress = progress or (lambda message: None)
    with tempfile.TemporaryDirectory(prefix='stemlab-stem-pairs-') as temporary:
        results = _output_stage(analysis_output) if analysis_output is not None else Path(temporary)/'analysis'
        cfg = separation_config(source, results, model, device)
        from stemlab.pipeline import run_pipeline
        progress('Separating once with ' + model + '; first use may download its model weights')
        result = run_pipeline(cfg, progress=progress)
        if result.get('errors') or any(m.get('error') for m in result.get('models', [])):
            raise RuntimeError('Separation failed; no master-as-stem fallback is permitted')
        catalogue = source_catalogue(results)
        if len(catalogue) < 3:
            raise ValueError('Separation must produce at least two different stems')
        yield catalogue, {'separation': 'StemLab pipeline', 'model': model,
                          'device_requested': device, 'analysis_retained': analysis_output is not None,
                          'stem_normalization': 'Existing StemLab separation normalization; master unchanged'}


def _routes(catalogue, bank, filters):
    routes, skipped = {}, []
    for key, source in catalogue.items():
        variants, seen = [], set()
        for label, low, high in [('raw', None, None), *filters]:
            if (low, high) in seen:
                continue
            seen.add((low, high))
            axis = AxisSpec('route', source, low_pass=low, high_pass=high)
            try:
                filter_sos(axis, bank.infos[source].samplerate)
            except ValueError as exc:
                skipped.append({'source': key, 'filter': label, 'reason': str(exc)})
                continue
            variants.append((key, label, axis))
        routes[key] = variants
    return routes, skipped


def _pair_plans(routes, bank, stems_only, seed):
    """Raw coverage first, then round-robin filtered routes. Deterministic and bounded."""
    keys = list(routes)
    cross = list(itertools.permutations(keys, 2) if stems_only else itertools.combinations(keys, 2))
    if stems_only:
        cross = [(x, y) for x, y in cross if x.rsplit('/', 1)[-1].lower() != y.rsplit('/', 1)[-1].lower()
                 and bank.hashes[routes[x][0][2].source] != bank.hashes[routes[y][0][2].source]]
        if not cross:
            raise ValueError('Need at least two distinct stems; aliases/identical files are not different stems')
    for x, y in cross:
        yield routes[x][0], routes[y][0]
    if not stems_only:
        # Include each single source as a bass/treble route pair, including master.
        for key in keys:
            low = next((r for r in routes[key] if r[2].low_pass and not r[2].high_pass), None)
            high = next((r for r in routes[key] if r[2].high_pass and not r[2].low_pass), None)
            if low and high:
                yield low, high
    rng = random.Random(seed)
    variants = []
    for x, y in cross + ([] if stems_only else [(k, k) for k in keys]):
        options = [(a, b) for a in routes[x] for b in routes[y]
                   if (a[1], b[1]) != ('raw', 'raw')
                   and (a[2].source, a[2].low_pass, a[2].high_pass) !=
                       (b[2].source, b[2].low_pass, b[2].high_pass)]
        rng.shuffle(options)
        variants.append(options)
    for depth in range(max(map(len, variants), default=0)):
        for options in variants:
            if depth < len(options):
                yield options[depth]


def _validate_filters(filters):
    if not filters or len(filters) > 32:
        raise ValueError('Supply 1..32 filter presets')
    labels = {}
    for label, low, high in filters:
        if not isinstance(label, str) or not label or len(label) > 64 or '\0' in label:
            raise ValueError('Invalid filter label')
        if label == 'raw' and (low is not None or high is not None):
            raise ValueError('The raw preset must be unfiltered')
        if label in labels and labels[label] != (low, high):
            raise ValueError('Filter labels must be unique')
        labels[label] = low, high
        AxisSpec('check', Path('.'), low_pass=low, high_pass=high)


def _generate(source, output, *, stems_only, maximum, variants, bpm=None, confirmed=False,
              beat_zero=None, beat_model='auto', model='htdemucs_6s', device='auto',
              separate=True, analysis_output=None, include_master=True, master_only=False, seed=17,
              filters=DEFAULT_FILTERS, normalization='per-axis', include_audio=False,
              harness=True, progress=None, **options):
    # Reject missing BPM, invalid settings/output and unavailable companion before model downloads.
    timing = resolve_tempo(source, bpm=bpm, confirmed=confirmed, beat_zero=beat_zero, beat_model=beat_model)
    output = _output_stage(output)
    if analysis_output is not None:
        analysis_path = Path(analysis_output).expanduser().resolve()
        if analysis_path.is_relative_to(output) or output.is_relative_to(analysis_path):
            raise ValueError('Analysis and public output must be separate, non-nested directories')
        _output_stage(analysis_path)
    if type(maximum) is not int or not 1 <= maximum <= 1024//len(variants):
        raise ValueError('Batch must contain 1..1024 candidates, counting every mode/window variant')
    if type(seed) is not int or normalization not in ('none', 'global', 'per-axis'):
        raise ValueError('Invalid seed or normalization')
    _validate_filters(filters)
    renderer = _harness_api() if harness else None
    progress = progress or (lambda message: None)
    # Ensure authoring support exists even when exporting JSON without the harness.
    from .rudiment_recordings import recording_api
    recording_api()
    if master_only and (stems_only or not include_master):
        raise ValueError("Master-only conflicts with stems-only selection")
    with pair_sources(source, separate=separate and not master_only, analysis_output=analysis_output,
                      model=model, device=device, progress=progress) as (all_sources, preparation):
        catalogue = {k: p for k, p in all_sources.items() if k != 'master' or (include_master and not stems_only)}
        if master_only or (not separate and not Path(source).is_dir()):
            catalogue = {'master': all_sources['master']}
        if stems_only and len(catalogue) < 2:
            raise ValueError('Stem-pair batches require at least two saved/separated stems')
        if not catalogue or len(catalogue) > 128:
            raise ValueError('Select 1..128 sources')
        # Explicit master first; sort others so JSON/model output ordering cannot affect seed.
        catalogue = dict(sorted(catalogue.items(), key=lambda item: (item[0] != 'master', item[0])))
        bank = EnvelopeBank([all_sources['master'], *catalogue.values()], progress=progress, **timing, **options)
        group_values = 2*bank.count*len(variants)
        if 2*bank.count > bank.api.MAX_RECORDING_VALUES or group_values > MAX_BATCH_VALUES:
            raise ValueError('One complete comparison group exceeds the value budget; shorten the excerpt')
        affordable = MAX_BATCH_VALUES//group_values
        limit = min(maximum, affordable)
        routes, skipped_filters = _routes(catalogue, bank, filters)
        plans, seen = [], set()
        for pair in _pair_plans(routes, bank, stems_only, seed):
            signature = tuple((r[2].source, r[2].low_pass, r[2].high_pass, r[2].filter_order) for r in pair)
            if signature in seen:
                continue
            seen.add(signature)
            plans.append(pair)
            if len(plans) == limit:
                break
        if not plans:
            raise ValueError('No different input routes; add a second source or usable filters')
        kind = 'stem-pairs' if stems_only else 'mode-comparison'
        report = dict(schema='stemlab.rudiment-pair-batch.v1', batch_kind=kind, clock=asdict(bank.clock),
            seed=seed, normalization=normalization,
            normalization_reference='self' if stems_only else 'peak',
            filter_presets=[dict(name=label, low_pass=low, high_pass=high) for label, low, high in filters],
            sources=[dict(key=k, name=p.name, sha256=bank.hashes[p]) for k, p in catalogue.items()],
            preparation=preparation, variants=variants, pairs=[], candidates=[], skipped_filters=skipped_filters,
            requested_pairs=maximum, pair_count=len(plans),
            limit_reason='batch_value_budget' if affordable < maximum and len(plans) == affordable else
                         'max_pairs' if len(plans) == maximum else 'route_space_exhausted',
            comparison_policy='Keep complete groups including numerically identical/static variants; no per-mode selection bias')
        output.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.TemporaryDirectory(dir=output.parent, prefix='.stemlab-pairs-') as temporary:
            stage = Path(temporary)/'result'
            (stage/'recordings').mkdir(parents=True)
            audio = _audio_metadata(all_sources['master'], bank, stage, include_audio)
            digests = {}
            def recordings():
                for index, pair in enumerate(plans, 1):
                    pair_id = f'pair_{index:03d}'
                    family = pair_id+' / '+' × '.join(f'{key} [{label}]' for key, label, _ in pair)
                    group = dict(id=pair_id, sources=[r[0] for r in pair], filters=[r[1] for r in pair], candidates=[])
                    report['pairs'].append(group)
                    for variant in variants:
                        axes = [replace(r[2], name=axis, mode=variant['mode'],
                                        moving_average_beats=variant.get('window_beats', .25))
                                for axis, r in zip(('x', 'y'), pair)]
                        title = family+' / '+variant['label']
                        values, metadata = bank.compose(axes, normalization=normalization,
                            normalization_reference=report['normalization_reference'], _data_only=True,
                            metadata=dict(title=title, family=family, description=_describe(axes), pair_id=pair_id,
                                batch_kind=kind, comparison_variant=variant,
                                route_sources=group['sources'], route_filters=group['filters']))
                        sample_hash = hashlib.sha256((values+0.).astype('<f8').tobytes()).hexdigest()
                        name = f'candidate_{len(report["candidates"])+1:04d}'
                        duplicate = digests.setdefault(sample_hash, name)
                        metadata.update(duplicate_of=duplicate if duplicate != name else None)
                        record = bank.api.Recording(name, ('x', 'y'), values.tolist(), bank.clock,
                                                    json.dumps(metadata, allow_nan=False))
                        filename = 'recordings/'+name+'.json'
                        bank.api.write_recording(stage/filename, record)
                        report['candidates'].append(dict(name=name, title=title, family=family,
                            dimensions=2, pair_id=pair_id, variant=variant, sources=group['sources'],
                            filters=group['filters'], file=filename, sample_sha256=sample_hash,
                            dynamic=metadata['dynamic'], duplicate_of=metadata['duplicate_of']))
                        group['candidates'].append(name)
                        progress(f'Generated {len(report["candidates"])}/{len(plans)*len(variants)}: {title}')
                        yield record
            if renderer:
                report['harness'] = renderer.build_recording_harness(recordings(), stage/'index.html',
                    collection_id='stemlab-'+kind, audio=audio)
            else:
                for _ in recordings():
                    pass
            bank.verify_sources()
            report.update(candidate_count=len(report['candidates']), total_values=2*bank.count*len(report['candidates']),
                extraction_passes=len(bank.cache), cache_hits=bank.cache_hits, cached_values=bank.cached_values,
                smoothing_passes=len(bank.smoothing_cache), harness_file='index.html' if renderer else None)
            (stage/'report.json').write_text(json.dumps(report, indent=2, allow_nan=False)+'\n', encoding='utf-8')
            os.rename(stage, output)
        return report


def generate_stem_batch(source, output, *, max_candidates=120, mode='peak', moving_average_beats=.25, **options):
    """Separate a song once (or reuse saved stems), then pair different stems in 2D."""
    AxisSpec('validate', Path(source), mode=mode, moving_average_beats=moving_average_beats)
    variant = {'mode': mode, 'label': mode}
    if mode == 'moving-average':
        variant.update(window_beats=moving_average_beats, label=f'moving-average {moving_average_beats:g} beats')
    return _generate(source, output, stems_only=True, maximum=max_candidates, variants=[variant], **options)


def generate_average_comparison_batch(source, output, *, max_pairs=32,
                                      windows_beats=DEFAULT_AVERAGE_WINDOWS, **options):
    """Same X/Y source+filter+gain pair for peak, mean absolute and each moving average.

    All comparisons use unsmoothed peak normalization references, so smoothing is
    not hidden by separately boosting each variant to full scale.
    """
    if not windows_beats or len(windows_beats) > 16:
        raise ValueError('Supply 1..16 moving-average windows')
    pips = [moving_average_pips(window) for window in windows_beats]
    if len(set(pips)) != len(pips):
        raise ValueError('Moving-average windows must round to distinct pip widths')
    variants = [{'mode': mode, 'label': mode} for mode in ('peak', 'average')]
    variants += [dict(mode='moving-average', window_beats=window, window_pips=pip,
                      label=f'moving-average {window:g} beats ({pip} pips)')
                 for window, pip in zip(windows_beats, pips)]
    return _generate(source, output, stems_only=False, maximum=max_pairs, variants=variants, **options)
