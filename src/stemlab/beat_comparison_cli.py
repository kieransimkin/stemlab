"""Optional CLI entry point for evidence-preserving cross-input rhythm comparison."""
from __future__ import annotations

from pathlib import Path
import json
from typing import Annotated

import typer


def _assignment(value: str, *, sep: str = '=') -> tuple[str, str]:
    key, mark, rest = value.partition(sep)
    if not mark or not key or not rest:
        raise ValueError(f"Expected NAME{sep}VALUE")
    return key, rest


def register_beat_comparison_commands(app, console):
    @app.command('compare-beats')
    def compare_beats(
        output: Annotated[Path,typer.Option('--output','-o',help='New comparison JSON; never overwrites')],
        input: Annotated[list[str]|None,typer.Option('--input',help='KIND:NAME=PATH; repeat (audio/recording/capture/package)')]=None,
        model_result: Annotated[list[str]|None,typer.Option('--model-result',help='NAME=previous saved StemLab BeatResult JSON; repeat')]=None,
        align: Annotated[list[str]|None,typer.Option('--align',help='NAME=offset_seconds explicitly confirms common clock; repeat')]=None,
        annotation: Annotated[list[str]|None,typer.Option('--annotation',help='NAME=human-reviewed beat JSON; exact source SHA required')]=None,
        min_bpm: Annotated[float,typer.Option('--min-bpm')]=60.0,
        max_bpm: Annotated[float,typer.Option('--max-bpm')]=200.0,
        no_plp: Annotated[bool,typer.Option('--no-plp',help='Skip optional librosa local pulse baseline')]=False,
    ):
        """Compare classical beat hypotheses across audio and rig/rudiment motion."""
        from .analysis.beat_evidence import analyze_input, compare_reports, read_saved_beat_result, read_source
        try:
            reports=[]
            inputs=[]
            for value in input or []:
                identity, location = _assignment(value)
                kind, sep, name = identity.partition(':')
                if not sep:
                    raise ValueError('--input must be KIND:NAME=PATH')
                inputs.append((kind,name,Path(location)))
            models=[]
            for value in model_result or []:
                name,path=_assignment(value)
                models.append((name,Path(path)))
            if not inputs and not models:
                raise ValueError('Provide at least one --input or --model-result')
            names=[name for _,name,_ in inputs]+[name for name,_ in models]
            if len(names)!=len(set(names)):
                raise ValueError('Source names must be unique')
            output=output.resolve()
            if output.exists():
                raise FileExistsError('Comparison output must be a new file')
            if any(p.resolve()==output for _,_,p in inputs) or any(p.resolve()==output for _,p in models):
                raise ValueError('Output cannot replace a source file')
            offsets={}
            for value in align or []:
                name, raw=_assignment(value)
                if name in offsets:
                    raise ValueError('Duplicate --align name')
                offsets[name]=float(raw)
            if set(offsets)-set(names):
                raise ValueError('Unknown alignment source')
            for kind,name,path in inputs:
                source=read_source(path,kind,name)
                reports.append(analyze_input(source,min_bpm=min_bpm,max_bpm=max_bpm,
                                             include_plp=not no_plp))
            for name,path in models:
                reports.append(read_saved_beat_result(path,name))
            result=compare_reports(reports,source_offsets=offsets)
            if annotation:
                from .analysis.beat_evaluation import evaluate_report, read_annotation
                by_name = {r['input']['name']: r for r in reports}
                evaluations = {}
                for assignment in annotation:
                    name, location = _assignment(assignment)
                    if name not in by_name or name in evaluations:
                        raise ValueError('Annotation source must be unique and match an input name')
                    path = Path(location)
                    if path.resolve() == output:
                        raise ValueError('Output cannot replace an annotation')
                    evaluations[name] = evaluate_report(by_name[name], read_annotation(path))
                result['independent_beat_annotation_evaluations'] = evaluations
            # Atomic nonclobbering creation. Outputs contain hypotheses and
            # source fingerprints, never the input audio or entire rig capture.
            output.parent.mkdir(parents=True,exist_ok=True)
            with output.open('x',encoding='utf8') as handle:
                json.dump(result,handle,indent=2,allow_nan=False)
                handle.write('\n')
        except (ValueError,OSError,KeyError,RuntimeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f'Rhythm comparisons: {output}')
        for report in reports:
            console.print(f"  {report['input']['name']}: {len(report['hypotheses'])} hypotheses from "
                          f"{len(report['methods_run'])} decoding methods")
        if len(reports)>1 and len(offsets)<len(reports):
            console.print('Clock offsets missing: phase alignment deliberately unverified.')
