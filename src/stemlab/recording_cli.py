"""Recording, axis routing, harness and bounded batch-generation commands."""
from pathlib import Path
import re
from typing import Annotated
import typer


def assignments(values, option):
    result = {}
    for value in values or []:
        key, sep, item = value.partition('=')
        if not sep or not key or not item or key in result:
            raise ValueError(f'{option}: use unique NAME=VALUE assignments')
        result[key] = item
    return result


def resolve_axes(source, catalogue, *, axes=None, mode='peak', low_pass=None, high_pass=None,
                 axis_mode=None, gain=None, filter_order=4):
    from .analysis.rudiment_recordings import AxisSpec
    selected = assignments(axes, '--axis')
    if not selected:
        for key in catalogue:
            base = re.sub('[^a-z0-9_]', '_', key.lower())[:110]
            if not base or not base[0].isalpha():
                base = 'axis_'+base
            name, suffix = base, 2
            while name in selected:
                name = f'{base}_{suffix}'
                suffix += 1
            selected[name] = key
    options = dict(low_pass=assignments(low_pass, '--low-pass'), high_pass=assignments(high_pass, '--high-pass'),
                   mode=assignments(axis_mode, '--axis-mode'), gain=assignments(gain, '--gain'))
    for label, values in options.items():
        if set(values)-set(selected):
            raise ValueError(label+': unknown axes '+', '.join(sorted(set(values)-set(selected))))
    base = source if source.is_dir() else source.parent
    specs = []
    for name, key in selected.items():
        if key in catalogue:
            path = catalogue[key]
        else:
            matches = [p for k, p in catalogue.items() if k.split('/')[-1] == key]
            if len(matches) > 1:
                raise ValueError(f'Ambiguous stem {key}; use MODEL/STEM')
            if matches:
                path = matches[0]
            else:
                path = Path(key).expanduser()
                if not path.is_absolute():
                    path = base/path
                if not path.is_file():
                    raise ValueError('Unknown audio source: '+key)
        kwargs = {k: (v[name] if k == 'mode' else float(v[name])) for k, v in options.items() if name in v}
        kwargs.setdefault('mode', mode)
        specs.append(AxisSpec(name, path, filter_order=filter_order, **kwargs))
    return specs


def register_recording_commands(app, console):
    @app.command('record-rudiment')
    def record_rudiment(
        source: Annotated[Path, typer.Argument(exists=True, help='Master audio or a saved StemLab analysis')],
        output: Annotated[Path, typer.Option('--output', '-o', help='NEW output directory: JSON, harness and report')],
        bpm: Annotated[float | None, typer.Option('--bpm', help='Required estimate unless usable saved beat evidence exists')] = None,
        bpm_confirmed: Annotated[bool, typer.Option('--bpm-confirmed')] = False,
        beat_zero: Annotated[float | None, typer.Option('--beat-zero', help='Source seconds at musical beat zero')] = None,
        beat_model: Annotated[str, typer.Option('--beat-model')] = 'auto',
        axis: Annotated[list[str] | None, typer.Option('--axis', help='NAME=master, NAME=MODEL/STEM or NAME=audio-path; repeat')] = None,
        mode: Annotated[str, typer.Option('--mode', help='peak or average (mean absolute amplitude)')] = 'peak',
        axis_mode: Annotated[list[str] | None, typer.Option('--axis-mode', help='NAME=peak|average; repeat')] = None,
        low_pass: Annotated[list[str] | None, typer.Option('--low-pass', help='NAME=Hz; filter before amplitude extraction')] = None,
        high_pass: Annotated[list[str] | None, typer.Option('--high-pass', help='NAME=Hz; combine with low-pass for a band-pass')] = None,
        gain: Annotated[list[str] | None, typer.Option('--gain', help='NAME=number; negative reverses this axis')] = None,
        filter_order: Annotated[int, typer.Option('--filter-order', min=1, max=12)] = 4,
        filter_phase: Annotated[str, typer.Option('--filter-phase', help='zero or causal')] = 'zero',
        normalize: Annotated[str, typer.Option('--normalize', help='none, global, per-axis')] = 'none',
        length_policy: Annotated[str, typer.Option('--length-policy', help='strict, pad, trim')] = 'strict',
        start: Annotated[float, typer.Option('--start', min=0)] = 0.,
        end: Annotated[float | None, typer.Option('--end', min=0)] = None,
        include_audio: Annotated[bool, typer.Option('--include-audio', help='Copy the original track into the local output; off by default')] = False,
        harness: Annotated[bool, typer.Option('--harness/--no-harness', help='Generate the shared DanceRudiments visualizer')] = True,
        legacy: Annotated[bool, typer.Option('--legacy', help='Also export an unchanged XYZ compiled-pack (1..3 axes, <=65535 pips)')] = False,
        name: Annotated[str, typer.Option('--name')] = 'audio_recording',
    ):
        """Export a BPM-synced N-dimensional recording and its native-WASM visualizer."""
        from .analysis.rudiment_recordings import resolve_tempo, source_catalogue
        from .analysis.rudiment_batch import export_single
        try:
            timing = resolve_tempo(source, bpm=bpm, confirmed=bpm_confirmed, beat_zero=beat_zero, beat_model=beat_model)
            catalogue = source_catalogue(source)
            axes = resolve_axes(source, catalogue, axes=axis, mode=mode, low_pass=low_pass,
                                high_pass=high_pass, axis_mode=axis_mode, gain=gain, filter_order=filter_order)
            report = export_single(catalogue['master'], output, axes, timing=timing, normalization=normalize,
                filter_phase=filter_phase, length_policy=length_policy, start_seconds=start, end_seconds=end,
                include_audio=include_audio, harness=harness, legacy=legacy, name=name,
                progress=lambda text: console.print(text, markup=False))
        except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Exported {len(report['candidates'][0]['dimensions'])} dimensions at {timing['bpm']:g} BPM ({timing['bpm_status']}).", markup=False)
        console.print(str(output.resolve()/('index.html' if harness else 'report.json')), markup=False)

    @app.command('generate-batch')
    def generate_batch_command(
        source: Annotated[Path, typer.Argument(exists=True, help='Master audio or saved analysis; all saved stems are included')],
        output: Annotated[Path, typer.Option('--output', '-o', help='NEW output directory for the comparison page and all recordings')],
        bpm: Annotated[float | None, typer.Option('--bpm')] = None,
        bpm_confirmed: Annotated[bool, typer.Option('--bpm-confirmed')] = False,
        beat_zero: Annotated[float | None, typer.Option('--beat-zero')] = None,
        beat_model: Annotated[str, typer.Option('--beat-model')] = 'auto',
        dimensions: Annotated[list[int] | None, typer.Option('--dimensions', help='Repeat: e.g. 2, 3, 6. Defaults to 2 and 3.')] = None,
        max_candidates: Annotated[int, typer.Option('--max-candidates', min=0, max=1024, help='0: min(1024, max(48, three times the number of sources))')] = 0,
        seed: Annotated[int, typer.Option('--seed', help='Reproducible combination/orientation seed')] = 0,
        extra_source: Annotated[list[str] | None, typer.Option('--source', help='Add NAME=audio-path to a master or saved analysis')] = None,
        low_pass: Annotated[list[float] | None, typer.Option('--low-pass', help='Custom low-pass Hz; repeat. Otherwise uses documented presets.')] = None,
        high_pass: Annotated[list[float] | None, typer.Option('--high-pass', help='Custom high-pass Hz; repeat.')] = None,
        normalize: Annotated[str, typer.Option('--normalize', help='Batch default per-axis; also none/global')] = 'per-axis',
        filter_phase: Annotated[str, typer.Option('--filter-phase')] = 'zero',
        length_policy: Annotated[str, typer.Option('--length-policy')] = 'strict',
        start: Annotated[float, typer.Option('--start', min=0)] = 0.,
        end: Annotated[float | None, typer.Option('--end', min=0)] = None,
        include_audio: Annotated[bool, typer.Option('--include-audio')] = False,
        harness: Annotated[bool, typer.Option('--harness/--no-harness')] = True,
    ):
        """Try filtered/unfiltered stem routes and compare a bounded, varied set of native movements."""
        from .analysis.rudiment_batch import generate_batch, DEFAULT_FILTERS
        try:
            extras = assignments(extra_source, '--source')
            base = source if source.is_dir() else source.parent
            extras = {k: (Path(v).expanduser() if Path(v).expanduser().is_absolute() else base/Path(v).expanduser()) for k, v in extras.items()}
            filters = DEFAULT_FILTERS if low_pass is None and high_pass is None else tuple(
                [('raw', None, None)] + [(f'low{v:g}', v, None) for v in low_pass or []] + [(f'high{v:g}', None, v) for v in high_pass or []])
            report = generate_batch(source, output, bpm=bpm, confirmed=bpm_confirmed, beat_zero=beat_zero,
                beat_model=beat_model, dimensions=tuple(dimensions or (2, 3)), max_candidates=max_candidates,
                seed=seed, normalization=normalize, filters=filters, extra_sources=extras,
                filter_phase=filter_phase, length_policy=length_policy, start_seconds=start, end_seconds=end,
                include_audio=include_audio, harness=harness, progress=lambda text: console.print(text, markup=False))
        except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Generated {report['candidate_count']} candidates from {len(report['sources'])} sources; {report['extraction_passes']} cached source/filter passes.", markup=False)
        if report['skipped_filters']:
            console.print(f"Skipped {len(report['skipped_filters'])} invalid source/filter combinations; see report.json.", markup=False)
        console.print(str(output.resolve()/('index.html' if harness else 'report.json')), markup=False)
