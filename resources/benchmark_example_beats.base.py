#!/usr/bin/env python3
"""Model-free full-master beat benchmark on StemLab's two published example MP3s.

Runs the ACTUAL StemLab audio feature extractor; no model weights, downloads,
re-encoding or inferred canonical beat-map promotion. Source hashes and saved
reference evidence are verified before comparing. Output must be a new directory.

Kieran Simkin — https://kieransimkin.co.uk/my-songs/
"""
from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path
import sys
import time


EXAMPLES = {
    'arcadians': ('examples/arcadians/Arcadians - 320kbps.mp3',
                  '5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de'),
    'truth': ('examples/the-truth-is-a-virus/master.mp3',
              'b11ac7c48df227ac51d94c05a245d3138acf1a002f851c55d98fd7fb7f0de510'),
}
STAR_LIGHTS = ('examples/star-lights-glow-mystery-liquid-kick/master.mp3',
               '48393fbb5ef5a1afc184ea388ce760612fe0c249c5c2f7caa57e563c6bd2e098')


def sha256(path: Path) -> str:
    sha = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            sha.update(block)
    return sha.hexdigest()


def _json(path: Path) -> dict:
    return json.loads(path.read_text(encoding='utf-8'))


def _abstentions(report: dict) -> list[str]:
    existing = set(report.get('methods_run', []))
    return sorted(set(['unbiased_autocorrelation', 'multi_tap_comb',
                       'inter_onset_intervals', 'dynamic_programming_onsets',
                       'predominant_local_pulse']) - existing)


def _summary(report: dict, *, reference_bpm: float | None,
             reference_status: str) -> dict:
    entries = []
    for hypothesis in report['hypotheses']:
        bpm = hypothesis['bpm']
        delta = round((bpm / reference_bpm - 1) * 100, 2) if reference_bpm else None
        octave = None
        if reference_bpm:
            ratio = bpm/reference_bpm
            octave = next((factor for factor in (.25,.5,1.,2.,4.)
                           if abs(ratio/factor-1)<.06),None)
        entries.append({'decoder':hypothesis['detector'], 'feature':hypothesis['feature'],
                        'bpm':bpm, 'reference_error_percent':delta,
                        'octave_relationship_to_reference':octave,
                        'predicted_grid_beat_count':hypothesis['beat_count_grid'],
                        'source_covered_observed_onsets':hypothesis.get('beat_count_observed_candidates'),
                        'observed_candidate_fraction':hypothesis.get(
                            'observed_candidate_fraction_of_source_grid')})
    warnings = report.get('local_tempo_warnings',[])
    return {'source_seconds_range':report['input']['source_seconds_range'],
            'reference_bpm':reference_bpm, 'reference_status':reference_status,
            'reference_is_independently_annotated_beat_1':False,
            'methods_run':report['methods_run'], 'abstained_methods':_abstentions(report),
            'tempo_family_status':report.get('tempo_family_status'),
            'tempo_families':report.get('tempo_families',[]),
            'local_window_warning_count':len(warnings),
            'local_window_octave_switch_count':sum(
                'octave_level_switch' in w['interpretation'] for w in warnings),
            'hypotheses':entries}


def benchmark(root: Path, output: Path, *, min_bpm: float,
              max_bpm: float, include_plp: bool) -> dict:
    from stemlab.analysis.beat_evidence import (
        analyze_input, compare_reports, read_saved_beat_result, read_source,
    )

    root, output = root.resolve(), output.resolve()
    if output.exists():
        raise FileExistsError(f'Benchmark output directory already exists: {output}')
    if output == root or output.is_relative_to(root/'examples'):
        raise ValueError('Benchmark output cannot be a source/example tree')
    canonical = _json(root/'examples/arcadians/reference.json')
    evidence = _json(root/'examples/the-truth-is-a-virus/evidence.json')
    if canonical['example_audio']['sha256'] != EXAMPLES['arcadians'][1]:
        raise ValueError('Arcadians reference source checksum unexpectedly changed')
    if evidence['analysed_tagged_mp3_sha256'] != EXAMPLES['truth'][1]:
        raise ValueError('Truth source evidence checksum unexpectedly changed')
    models = {}
    refs_root = root/'examples/the-truth-is-a-virus/beats'
    for detector in ('beat_this','beatnet'):
        source = refs_root / f'{detector}.json'
        pinned = evidence['files'][f'beats/{detector}.json']
        if sha256(source) != pinned:
            raise ValueError(f'Frozen {detector} source file hash mismatch')
        models[detector] = read_saved_beat_result(source, f'truth_{detector}')
    pending = {}
    metadata = {}
    all_examples=dict(EXAMPLES)
    # This third source was added after the original two-song benchmark. Include
    # it only if present in this checkout, without confusing it with the Anthem
    # mix or the (unbundled) lossless canonical WAV.
    star_path = root/STAR_LIGHTS[0]
    if star_path.is_file():
        star_evidence=_json(root/'examples/star-lights-glow-mystery-liquid-kick/evidence.json')
        derivative=star_evidence.get('listening_and_analysis_derivative') or {}
        if derivative.get('sha256')!=STAR_LIGHTS[1] or derivative.get('path')!='master.mp3':
            raise ValueError('Star Lights Glow derivative identity differs from its pinned evidence')
        all_examples['star_lights_glow']=STAR_LIGHTS
    for name,(relative,expected) in all_examples.items():
        source = root/relative
        if sha256(source) != expected:
            raise ValueError(f'{name} MP3 bytes mismatch with pinned source')
        started=time.monotonic()
        extracted=read_source(source,'audio',name)
        report=analyze_input(extracted, min_bpm=min_bpm, max_bpm=max_bpm,
                             include_plp=include_plp)
        pending[name]=report
        metadata[name]={'source_path':relative, 'source_sha256':expected,
                        'elapsed_seconds':round(time.monotonic()-started,3),
                        'feature_extractor':'StemLab _audio_input four-band audio spectral flux'}
    # Compare independent model predictions with real classical audio features,
    # but don't assume confirmed downbeat or audio alignment without explicit
    # source offsets. All raw model BPMs remain frozen and unmodified.
    comparison=compare_reports([pending['truth'],*models.values()])
    fitted=[]
    for detector, saved in models.items():
        h=saved['hypotheses'][0] if saved['hypotheses'] else None
        if h and (fit:=h['source_grid_fit_diagnostics']) and fit.get('status')=='estimated_constant_tempo_grid':
            fitted.append(fit['global_fit_bpm'])
    truth_reference=sum(fitted)/len(fitted) if fitted else None
    summary={'format':'stemlab.example-beat-benchmark.v1',
             'status':'source_verified_offline_full_master_measurement_not_ground_truth',
             'source_commit':None, 'min_bpm':min_bpm, 'max_bpm':max_bpm,
             'include_plp':include_plp, 'metadata':metadata,
             'songs':{
                 'arcadians':_summary(pending['arcadians'],reference_bpm=canonical['bpm'],
                                      reference_status='artist_confirmed_tempo_only'),
                 'truth':_summary(pending['truth'],reference_bpm=truth_reference,
                                  reference_status='saved_neural_beat_grid_fit_not_artist_confirmed'),
                 **({'star_lights_glow':_summary(pending['star_lights_glow'],reference_bpm=None,
                                                reference_status='unconfirmed_mix_specific_bpm')}
                    if 'star_lights_glow' in pending else {}),
              },
             'truth_saved_model_diagnostics':{
                 k:(v['hypotheses'][0] if v['hypotheses'] else None) for k,v in models.items()},
             'notes':['Scores are uncalibrated and cannot be compared as probabilities.',
                      'No beat-one or downbeat ground truth is available for these songs.',
                      'Octave variants of the BPM count as separate metrical interpretations.',
                      'This command never runs or downloads a neural checkpoint.']}
    output.mkdir(parents=True,exist_ok=False)
    artefacts=[('arcadians_classical.json',pending['arcadians']),
               ('truth_classical.json',pending['truth']),
               ('truth_vs_saved_models.json',comparison),
               ('summary.json',summary)]
    if 'star_lights_glow' in pending:
        artefacts.append(('star_lights_glow_classical.json',pending['star_lights_glow']))
    for key,value in artefacts:
        (output/key).write_text(json.dumps(value,indent=2,allow_nan=False)+'\n',encoding='utf-8')
    return summary


def main(argv: list[str] | None = None) -> int:
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo-root',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output-dir',type=Path,required=True,
                        help='New local directory, separate from source examples')
    parser.add_argument('--min-bpm',type=float,default=60)
    parser.add_argument('--max-bpm',type=float,default=200)
    parser.add_argument('--no-plp',action='store_true')
    options=parser.parse_args(argv)
    result=benchmark(options.repo_root, options.output_dir,min_bpm=options.min_bpm,
                     max_bpm=options.max_bpm, include_plp=not options.no_plp)
    for song,item in result['songs'].items():
        print(f"{song}: {item['tempo_family_status']}; methods={','.join(item['methods_run'])}")
        for h in item['hypotheses']:
            if h['decoder'] in ('unbiased_autocorrelation','predominant_local_pulse'):
                print(f"  {h['feature']} / {h['decoder']}: {h['bpm']:.2f} BPM "
                      f"(reference {item['reference_status']})")
    print(f"Reports: {options.output_dir.resolve()}")
    return 0


if __name__=='__main__':
    sys.exit(main())
