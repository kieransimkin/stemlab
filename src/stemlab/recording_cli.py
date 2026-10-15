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
                 axis_mode=None, gain=None, filter_order=4, moving_average_beats=.25,
                 axis_window=None):
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
                   mode=assignments(axis_mode, '--axis-mode'), gain=assignments(gain, '--gain'),
                   moving_average_beats=assignments(axis_window, '--axis-window-beats'))
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
        kwargs.setdefault('moving_average_beats', moving_average_beats)
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
        frequency_bands: Annotated[int | None, typer.Option('--frequency-bands', help='Fourier buckets: N bands become N dimensions; default range 0..Nyquist', min=1, max=1024)] = None,
        frequency_source: Annotated[str, typer.Option('--frequency-source', help='master, MODEL/STEM or audio path for Fourier analysis')] = 'master',
        fft_size: Annotated[int, typer.Option('--fft-size', help='Fourier window size in source frames; power of two', min=16, max=65536)] = 2048,
        frequency_min: Annotated[float, typer.Option('--frequency-min', help='Lowest Fourier-band frequency in Hz', min=0)] = 0.,
        frequency_max: Annotated[float | None, typer.Option('--frequency-max', help='Highest frequency in Hz; default source Nyquist', min=0)] = None,
        frequency_scale: Annotated[str, typer.Option('--frequency-scale', help='linear (default) or log; log requires a positive --frequency-min')] = 'linear',
        mode: Annotated[str, typer.Option('--mode', help='peak, average (per-pip mean absolute) or moving-average (centered envelope)')] = 'peak',
        axis_mode: Annotated[list[str] | None, typer.Option('--axis-mode', help='NAME=peak|average|moving-average; repeat')] = None,
        moving_average_beats: Annotated[float, typer.Option('--moving-average-beats', help='Centered smoothing window in beats; default 1/4 beat', min=0.000001, max=64)] = .25,
        axis_window: Annotated[list[str] | None, typer.Option('--axis-window-beats', help='NAME=beats; override smoothing window per axis')] = None,
        low_pass: Annotated[list[str] | None, typer.Option('--low-pass', help='NAME=Hz; filter before amplitude extraction')] = None,
        high_pass: Annotated[list[str] | None, typer.Option('--high-pass', help='NAME=Hz; combine with low-pass for a band-pass')] = None,
        gain: Annotated[list[str] | None, typer.Option('--gain', help='NAME=number; negative reverses this axis')] = None,
        filter_order: Annotated[int, typer.Option('--filter-order', min=1, max=12)] = 4,
        filter_phase: Annotated[str, typer.Option('--filter-phase', help='zero or causal')] = 'zero',
        normalize: Annotated[str, typer.Option('--normalize', help='reference only: none=PCM unity, global=shared peak, per-axis=axis peak; output always [-1,+1]')] = 'none',
        length_policy: Annotated[str, typer.Option('--length-policy', help='strict, pad, trim')] = 'strict',
        start: Annotated[float, typer.Option('--start', min=0)] = 0.,
        end: Annotated[float | None, typer.Option('--end', min=0)] = None,
        include_audio: Annotated[bool, typer.Option('--include-audio', help='Copy the original track into the local output; off by default')] = False,
        harness: Annotated[bool, typer.Option('--harness/--no-harness', help='Generate the shared DanceRudiments visualizer')] = True,
        legacy: Annotated[bool, typer.Option('--legacy', help='Also export an unchanged XYZ compiled-pack (1..3 axes, <=65535 pips)')] = False,
        name: Annotated[str, typer.Option('--name')] = 'audio_recording',
    ):
        """Export a BPM-synced N-dimensional recording and its native-WASM visualizer."""
        from .analysis.rudiment_recordings import resolve_tempo, source_catalogue, fourier_axes
        from .analysis.rudiment_batch import export_single
        try:
            timing = resolve_tempo(source, bpm=bpm, confirmed=bpm_confirmed, beat_zero=beat_zero, beat_model=beat_model)
            catalogue = source_catalogue(source)
            if frequency_bands is not None:
                if any((axis, low_pass, high_pass, axis_mode, axis_window)) or mode != 'peak' or filter_order != 4 or filter_phase != 'zero' or moving_average_beats != .25:
                    raise ValueError('--frequency-bands selects Fourier RMS; do not combine it with time-domain axis/filter/mode options')
                selected = resolve_axes(source, catalogue, axes=['spectrum='+frequency_source])[0].source
                axes = fourier_axes(selected, frequency_bands, fft_size=fft_size, minimum=frequency_min,
                                    maximum=frequency_max, spacing=frequency_scale)
                gains = assignments(gain, '--gain')
                if set(gains)-{a.name for a in axes}:
                    raise ValueError('--gain: unknown Fourier band axes')
                from dataclasses import replace
                axes = [replace(a, gain=float(gains.get(a.name, 1.))) for a in axes]
            else:
                if frequency_source != 'master' or fft_size != 2048 or frequency_min != 0 or frequency_max is not None or frequency_scale != 'linear':
                    raise ValueError('Fourier options require --frequency-bands')
                axes = resolve_axes(source, catalogue, axes=axis, mode=mode, low_pass=low_pass,
                                    high_pass=high_pass, axis_mode=axis_mode, gain=gain, filter_order=filter_order,
                                    moving_average_beats=moving_average_beats, axis_window=axis_window)
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
        mode: Annotated[list[str] | None, typer.Option('--mode', help='Repeat peak, average or moving-average; default peak and average')] = None,
        moving_average_beats: Annotated[float, typer.Option('--moving-average-beats', min=0.000001, max=64)] = .25,
        dimensions: Annotated[list[int] | None, typer.Option('--dimensions', help='Repeat: e.g. 2, 3, 6. Defaults to 2 and 3.')] = None,
        max_candidates: Annotated[int, typer.Option('--max-candidates', min=0, max=1024, help='0: min(1024, max(48, three times the number of sources))')] = 0,
        seed: Annotated[int, typer.Option('--seed', help='Reproducible combination/orientation seed')] = 0,
        extra_source: Annotated[list[str] | None, typer.Option('--source', help='Add NAME=audio-path to a master or saved analysis')] = None,
        low_pass: Annotated[list[float] | None, typer.Option('--low-pass', help='Custom low-pass Hz; repeat. Otherwise uses documented presets.')] = None,
        high_pass: Annotated[list[float] | None, typer.Option('--high-pass', help='Custom high-pass Hz; repeat.')] = None,
        normalize: Annotated[str, typer.Option('--normalize', help='Reference default per-axis; none/global also supported; output always [-1,+1]')] = 'per-axis',
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
                modes=tuple(mode) if mode is not None else ('peak', 'average'), moving_average_beats=moving_average_beats,
                filter_phase=filter_phase, length_policy=length_policy, start_seconds=start, end_seconds=end,
                include_audio=include_audio, harness=harness, progress=lambda text: console.print(text, markup=False))
        except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Generated {report['candidate_count']} candidates from {len(report['sources'])} sources; {report['extraction_passes']} cached source/filter passes.", markup=False)
        if report['skipped_filters']:
            console.print(f"Skipped {len(report['skipped_filters'])} invalid source/filter combinations; see report.json.", markup=False)
        console.print(str(output.resolve()/('index.html' if harness else 'report.json')), markup=False)


    @app.command('generate-stem-batch')
    def generate_stem_batch_command(
        source: Annotated[Path, typer.Argument(exists=True, help='Song to separate once, or saved analysis to reuse')],
        output: Annotated[Path, typer.Option('--output', '-o', help='NEW comparison page / recordings directory')],
        bpm: Annotated[float | None, typer.Option('--bpm')] = None,
        bpm_confirmed: Annotated[bool, typer.Option('--bpm-confirmed')] = False,
        beat_zero: Annotated[float | None, typer.Option('--beat-zero')] = None,
        beat_model: Annotated[str, typer.Option('--beat-model')] = 'auto',
        model: Annotated[str, typer.Option('--model', help='Separator for raw song input only')] = 'htdemucs_6s',
        device: Annotated[str, typer.Option('--device')] = 'auto',
        analysis_output: Annotated[Path | None, typer.Option('--analysis-output', help='NEW separate directory to retain separation for reuse')] = None,
        max_candidates: Annotated[int, typer.Option('--max-candidates', min=1, max=1024)] = 120,
        mode: Annotated[str, typer.Option('--mode', help='peak, average or moving-average')] = 'peak',
        moving_average_beats: Annotated[float, typer.Option('--moving-average-beats', min=0.000001, max=64)] = .25,
        seed: Annotated[int, typer.Option('--seed')] = 17,
        low_pass: Annotated[list[float] | None, typer.Option('--low-pass')] = None,
        high_pass: Annotated[list[float] | None, typer.Option('--high-pass')] = None,
        normalize: Annotated[str, typer.Option('--normalize')] = 'per-axis',
        filter_phase: Annotated[str, typer.Option('--filter-phase')] = 'zero',
        length_policy: Annotated[str, typer.Option('--length-policy')] = 'strict',
        start: Annotated[float, typer.Option('--start', min=0)] = 0.,
        end: Annotated[float | None, typer.Option('--end', min=0)] = None,
        include_audio: Annotated[bool, typer.Option('--include-audio')] = False,
        harness: Annotated[bool, typer.Option('--harness/--no-harness')] = True,
    ):
        """Separate once; compare 2D recordings whose X and Y use different stems."""
        from .analysis.rudiment_pairs import generate_stem_batch
        try:
            report = generate_stem_batch(source, output, bpm=bpm, confirmed=bpm_confirmed,
                beat_zero=beat_zero, beat_model=beat_model, model=model, device=device,
                analysis_output=analysis_output, max_candidates=max_candidates, mode=mode,
                moving_average_beats=moving_average_beats, seed=seed,
                filters=_pair_filters(low_pass, high_pass), normalization=normalize,
                filter_phase=filter_phase, length_policy=length_policy, start_seconds=start,
                end_seconds=end, include_audio=include_audio, harness=harness,
                progress=lambda text: console.print(text, markup=False))
        except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        _pair_result(console, output, report)

    @app.command('generate-average-comparison')
    def generate_average_comparison_command(
        source: Annotated[Path, typer.Argument(exists=True, help='Song to separate once, or saved analysis to reuse')],
        output: Annotated[Path, typer.Option('--output', '-o')],
        bpm: Annotated[float | None, typer.Option('--bpm')] = None,
        bpm_confirmed: Annotated[bool, typer.Option('--bpm-confirmed')] = False,
        beat_zero: Annotated[float | None, typer.Option('--beat-zero')] = None,
        beat_model: Annotated[str, typer.Option('--beat-model')] = 'auto',
        model: Annotated[str, typer.Option('--model')] = 'htdemucs_6s',
        device: Annotated[str, typer.Option('--device')] = 'auto',
        analysis_output: Annotated[Path | None, typer.Option('--analysis-output')] = None,
        master_only: Annotated[bool, typer.Option('--master-only', help='No separation; compare filtered master routes only')] = False,
        include_master: Annotated[bool, typer.Option('--include-master/--stems-only')] = True,
        max_pairs: Annotated[int, typer.Option('--max-pairs', min=1, max=341, help='Input-pair groups, each retaining every mode/window')] = 32,
        window_beats: Annotated[list[float] | None, typer.Option('--window-beats', help='Repeat; defaults to .125, .25, .5 and 1 beat')] = None,
        seed: Annotated[int, typer.Option('--seed')] = 17,
        low_pass: Annotated[list[float] | None, typer.Option('--low-pass')] = None,
        high_pass: Annotated[list[float] | None, typer.Option('--high-pass')] = None,
        normalize: Annotated[str, typer.Option('--normalize', help='Reference scale within each pair: none/global/per-axis; output always bipolar [-1,+1]')] = 'per-axis',
        filter_phase: Annotated[str, typer.Option('--filter-phase')] = 'zero',
        length_policy: Annotated[str, typer.Option('--length-policy')] = 'strict',
        start: Annotated[float, typer.Option('--start', min=0)] = 0.,
        end: Annotated[float | None, typer.Option('--end', min=0)] = None,
        include_audio: Annotated[bool, typer.Option('--include-audio')] = False,
        harness: Annotated[bool, typer.Option('--harness/--no-harness')] = True,
    ):
        """Hold inputs/filters fixed; compare peak, average and several moving averages."""
        from .analysis.rudiment_pairs import DEFAULT_AVERAGE_WINDOWS, generate_average_comparison_batch
        try:
            report = generate_average_comparison_batch(source, output, bpm=bpm, confirmed=bpm_confirmed,
                beat_zero=beat_zero, beat_model=beat_model, model=model, device=device,
                analysis_output=analysis_output, master_only=master_only, include_master=include_master,
                max_pairs=max_pairs, windows_beats=tuple(window_beats) if window_beats is not None else DEFAULT_AVERAGE_WINDOWS,
                seed=seed, filters=_pair_filters(low_pass, high_pass), normalization=normalize,
                filter_phase=filter_phase, length_policy=length_policy, start_seconds=start,
                end_seconds=end, include_audio=include_audio, harness=harness,
                progress=lambda text: console.print(text, markup=False))
        except (OSError, ValueError, RuntimeError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        _pair_result(console, output, report)


def _pair_filters(low_pass, high_pass):
    from .analysis.rudiment_batch import DEFAULT_FILTERS
    if low_pass is None and high_pass is None:
        return DEFAULT_FILTERS
    return tuple([('raw', None, None)] + [(f'low{v:g}', v, None) for v in low_pass or []]
                 + [(f'high{v:g}', None, v) for v in high_pass or []])


def _pair_result(console, output, report):
    console.print(f"Generated {report['candidate_count']} recordings across {report['pair_count']} input pairs; "
                  f"{report['extraction_passes']} extraction passes, {report['smoothing_passes']} smoothing passes.", markup=False)
    console.print(str(output.resolve()/(report['harness_file'] or 'report.json')), markup=False)
