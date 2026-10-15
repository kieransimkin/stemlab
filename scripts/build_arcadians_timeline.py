"""Run the complete Arcadians core recipe and export the real static timeline.

This deliberately does not mean the five-separator `full` comparison profile or
all optional experimental/NC models. Missing required evidence is a release error.
"""
from __future__ import annotations

import argparse
from dataclasses import asdict
import importlib.metadata
import json
import math
from pathlib import Path
import sys

# Keep checkout imports usable without installing the project first.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'src'))

from build_arcadians_demo import ARCADIANS_SHA256, DEFAULT_AUDIO, validate_revision
from check_torchaudio_decode import check_audio_decode
from stemlab.static_timeline import digest, export_timeline, read_json, safe_file, write_json

ROOT = Path(__file__).resolve().parents[1]

RECIPE = 'arcadians-core-v2'
STEMS = {'vocals', 'drums', 'bass', 'guitar', 'piano', 'other'}
BEATS = {'all_in_one', 'beatnet', 'beat_this', 'beat_transformer', 'consensus'}
DEEP = {'structure', 'sonic', 'rhythm', 'harmony', 'lyrics', 'semantic_text', 'song_map', 'loops'}
SCOPE = ('Complete full-song core analysis: HTDemucs six stems, master/stem spectrograms, '
         'Whisper small + VAD, master/percussion BeatNet and BeatThis, demixed Beat Transformer + All-In-One + detector-balanced consensus, '
         '13 Vamp analyses, sonic/rhythm/harmony/lyrics/text semantics, song map and loop discovery')


def recipe(audio: Path, results: Path):
    from stemlab.types import PipelineConfig
    return PipelineConfig(input_wav=audio, output_dir=results, models=('htdemucs_6s',),
                          device='cpu', whisper_model='small', continue_on_error=False,
                          bootstrap_external=True, run_text_semantics=True,
                          run_audio_semantics=False, run_basic_pitch=False,
                          run_loops=True, export_loops=False)


def require_core(results: Path, *, expected_sha: str = ARCADIANS_SHA256) -> dict:
    """Verify actual payloads, not file names or a success exit code alone."""
    from stemlab.audio import audio_info
    from stemlab.vamp_runtime import VAMP_REQUIRED_OUTPUTS
    results = Path(results).resolve()
    report = read_json(safe_file(results, 'analysis.json'))
    master = safe_file(results, report['source']['copied_path'])
    info = audio_info(master)
    if digest(master) != expected_sha or report['source']['sha256'] != expected_sha:
        raise ValueError('Core analysis must use the complete, checksum-locked Arcadians source')
    if report.get('errors') or (report.get('deep_analysis') or {}).get('errors'):
        raise ValueError('An incomplete/failed analysis cannot be published as the core demo')
    if not report.get('completed_at'):
        raise ValueError('Analysis did not finish')
    models = report.get('models', [])
    model = next((m for m in models if m.get('spec', {}).get('slug') == 'htdemucs_6s'), None)
    if not model or model.get('error') or {s.get('stem') for s in model.get('stems', [])} != STEMS:
        raise ValueError('All six genuine separated stems are required')
    for stem in model['stems']:
        path = safe_file(results, stem['path'])
        if abs(audio_info(path)['duration_seconds'] - info['duration_seconds']) > .05:
            raise ValueError('A stem does not span the full master timeline')
        safe_file(results, f'spectrograms/htdemucs_6s/{stem["stem"]}.npz')
    safe_file(results, 'spectrograms/master.npz')
    whisper = read_json(safe_file(results, 'speech/whisper.json'))
    if not whisper.get('words') or whisper.get('condition_on_previous_text') is not False:
        raise ValueError('Repetition-safe Whisper word evidence is required, not canonical stand-ins')
    safe_file(results, 'speech/speech_regions.json')
    for backend in BEATS:
        value = read_json(safe_file(results, f'beats/{backend}.json'))
        beats = value.get('beats') or []
        if len(beats) < 2 or any(not isinstance(t, (int, float)) or not 0 <= t <= info['duration_seconds'] + 1 for t in beats):
            raise ValueError('Missing/invalid full-song beat evidence: ' + backend)
        if beats != sorted(set(beats)):
            raise ValueError('Beat evidence is not strictly time ordered')
    # v2 requires real master AND percussion passes, not just plausible filenames.
    from stemlab.beats.inputs import beat_inputs
    from stemlab.types import StemArtifact
    inputs = beat_inputs(master, [StemArtifact('htdemucs_6s', item['stem'], safe_file(results, item['path']))
                                 for item in model['stems']])
    percussion_models = []
    for source in inputs:
        expected_source = source.metadata(results)
        for detector in ('beatnet', 'beat_this'):
            name = detector if source.kind == 'master' else detector+'__'+source.id
            value = read_json(safe_file(results, f'beats/{name}.json'))
            times = value.get('beats')
            if (value.get('model') != name or value.get('metadata', {}).get('detector') != detector
                    or value.get('metadata', {}).get('source') != expected_source
                    or not isinstance(times, list) or len(times) < 2
                    or any(isinstance(t, bool) or not isinstance(t, (int, float))
                           or not math.isfinite(t) or not 0 <= t <= info['duration_seconds'] + 1 for t in times)
                    or times != sorted(set(times))):
                raise ValueError('Missing/misattributed master or percussion beat evidence: '+name)
            if source.kind == 'stem':
                percussion_models.append(name)
    if not percussion_models:
        raise ValueError('Core v2 requires beat analysis of an actual drum/percussion stem')
    vamp = read_json(safe_file(results, 'vamp/report.json'))
    if vamp.get('errors') or vamp.get('missing_outputs') or vamp.get('skipped'):
        raise ValueError('All curated Vamp transforms must complete; partial plugin installs are not a complete demo')
    if not set(VAMP_REQUIRED_OUTPUTS) <= {item.get('transform') for item in vamp.get('analyses', [])}:
        raise ValueError('Missing Vamp analysis families')
    for item in vamp['analyses']:
        # The pipeline records absolute analysis-local JSON paths for Vamp.
        path = Path(item.get('files', {}).get('json', ''))
        if path.is_absolute():
            path = path.relative_to(results)
        data = read_json(safe_file(results, path.as_posix()))
        if data.get('transform') != item['transform'] or not isinstance(data.get('events'), list):
            raise ValueError('Vamp transform data do not match their provenance')
    summary = read_json(safe_file(results, 'deep/summary.json'))
    if summary.get('errors'):
        raise ValueError('Deep analysis reported errors')
    for name in DEEP:
        entry = summary.get('analyses', {}).get(name, {})
        if entry.get('available') is not True:
            raise ValueError('Required core stage is unavailable: ' + name)
        safe_file(results, entry['path'])
    harmony = read_json(results / 'deep/harmony/harmony.json')
    if not harmony.get('chords', {}).get('collapsed_progression'):
        raise ValueError('Harmony has no measured chord progression')
    structure = read_json(results / 'deep/structure/structure.json')
    if not structure.get('segments'):
        raise ValueError('No model-estimated functional song structure')
    sonic = read_json(results / 'deep/sonic/sonic.json')
    rhythm = read_json(results / 'deep/rhythm/rhythm.json')
    lyrics = read_json(results / 'deep/lyrics/lyrics.json')
    semantics = read_json(results / 'deep/semantic_text/semantic_text.json')
    song_map = read_json(results / 'deep/song_map/song_map.json')
    metrics = [sonic.get('loudness', {}).get('integrated_lufs_bs1770'),
               rhythm.get('tempo', {}).get('median_bpm')]
    if any(not isinstance(v, (int, float)) or not math.isfinite(v) for v in metrics):
        raise ValueError('Sonic/tempo measurements are missing or non-finite')
    if abs(sonic.get('duration_seconds', 0) - info['duration_seconds']) > .1:
        raise ValueError('Sonic analysis does not span the full song')
    if not lyrics.get('line_count') or not semantics.get('theme_similarity') or not song_map.get('sections'):
        raise ValueError('Lyric, semantic or song-map evidence is empty')
    canonical = read_json(safe_file(results, 'canonical.json'))
    if canonical.get('bpm') != 145 or not canonical.get('lyric_timing') or not canonical.get('sections'):
        raise ValueError('Canonical 145 BPM, timed lyrics and artist sections must remain separate reference evidence')
    loops = read_json(results / 'deep/loops/loops.json')
    if (loops.get('schema') != 'stemlab.loops.v1' or loops.get('source_frames') != info['num_frames']
            or loops.get('source_sha256') != expected_sha
            or loops.get('loop_count') != len(loops.get('loops', []))
            or not isinstance(loops.get('unresolved_sections'), list)):
        raise ValueError('Loop scan is not bound to the complete source')
    return dict(status='complete', recipe=RECIPE, scope=SCOPE, stems=sorted(STEMS),
                beat_models=sorted(BEATS), percussion_beat_models=percussion_models,
                beat_input_sources=[source.metadata(results) for source in inputs], deep_stages=sorted(DEEP), vamp_transforms=len(VAMP_REQUIRED_OUTPUTS),
                source_sha256=expected_sha, source_frames=info['num_frames'],
                duration_seconds=info['duration_seconds'], loop_count=loops['loop_count'],
                unselected=['alternate separation comparison models', 'optional MIDI transcribers',
                            'specialist evidence backends', 'non-commercial MuQ audio semantics'],
                listening_qa=False, hypotheses_not_ground_truth=True)


def build(results: Path, output: Path, source_commit: str, *, reuse: bool = False, recording_sources: Path | None = None) -> dict:
    from stemlab.pipeline import run_pipeline
    from stemlab.canonical import save_canonical
    validate_revision(source_commit)
    if digest(DEFAULT_AUDIO) != ARCADIANS_SHA256:
        raise ValueError('Bundled Arcadians MP3 checksum mismatch')
    if not reuse:
        if results.exists():
            raise FileExistsError('Choose a new analysis directory or explicitly use --reuse')
        # Verify the actual compressed source through the decoder used by
        # All-In-One before any separation/model inference. Keep source bytes intact.
        print('Preflight: torchaudio decoding of the original Arcadians MP3', flush=True)
        check_audio_decode(DEFAULT_AUDIO, expected_sample_rate=44100, expected_channels=2,
                           expected_duration=273.604558)
        results.mkdir(parents=True)
        reference = read_json(ROOT / 'src/stemlab/web/arcadians-reference.json')
        save_canonical(results, reference)
        cfg = recipe(DEFAULT_AUDIO, results)
        print('Running ' + RECIPE + ': ' + SCOPE, flush=True)
        run_pipeline(cfg, progress=lambda line: print(line, flush=True))
        dependencies = {}
        for distribution in ('torch', 'torchaudio', 'torchcodec', 'demucs', 'faster-whisper', 'beat-this',
                             'all-in-one-infer', 'sentence-transformers', 'librosa'):
            dependencies[distribution] = importlib.metadata.version(distribution)
        # Provenance is not faked when --reuse exports an earlier completed analysis.
        write_json(results / 'core-run.json', {'recipe': RECIPE, 'analysis_commit': source_commit,
                                              'dependencies': dependencies,
                                              'settings': {k: str(v) if isinstance(v, Path) else v for k, v in asdict(cfg).items()}})
    coverage = require_core(results)
    stamp = read_json(safe_file(results, 'core-run.json'))
    if stamp.get('recipe') != RECIPE:
        raise ValueError('Unrecognized core analysis recipe')
    coverage['analysis_commit'] = stamp['analysis_commit']
    coverage['dependencies'] = stamp['dependencies']
    snapshot = export_timeline(results, output, include_audio=True, source_commit=source_commit, coverage=coverage)
    if recording_sources is not None:
        from build_arcadians_pair_demos import prepare_sources
        prepare_sources(results, recording_sources, source_commit, coverage=coverage)
    return snapshot


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--results', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--source-commit', required=True)
    parser.add_argument('--recording-sources', type=Path, help='NEW exact-stem handoff for downstream pair demos')
    parser.add_argument('--reuse', action='store_true', help='Validate and export existing complete analysis; no model rerun')
    args = parser.parse_args()
    try:
        result = build(args.results, args.output, args.source_commit, reuse=args.reuse, recording_sources=args.recording_sources)
        print(json.dumps({key: value for key, value in result.items() if key != 'files'}, indent=2))
    except Exception as exc:
        # Failed runs remain failed, with diagnostics outside public output.
        write_json(args.results.parent / 'qa/timeline-build-failure.json', {'status': 'failed', 'error': str(exc),
                                                                       'type': type(exc).__name__})
        raise
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
