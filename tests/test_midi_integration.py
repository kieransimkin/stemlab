# ruff: noqa: E402
# Optional dependencies must be checked before importing integration helpers.
"""CLI, existing pipeline, and Codex job integration without pretrained models."""
import json
from pathlib import Path
import pytest
from typer.testing import CliRunner
pytest.importorskip('pretty_midi', reason='Install the midi extra')
pytest.importorskip('psutil', reason='Install the midi extra')
from stemlab import cli
from stemlab.analysis import midi, runner as deep_runner
from stemlab.analysis.midi import runner
from stemlab.codex.bridge import StemLabBridge
from stemlab.codex.tasks import midi_options, run_midi_scan
from stemlab.pipeline import run_pipeline
from stemlab.types import PipelineConfig
from test_midi_extraction import audio, fake_worker, saved

def test_cli_list_and_help_do_not_load_weights():
    for arguments in (['midi-models'], ['midi', '--help'], ['analyze', '--help']):
        result = CliRunner().invoke(cli.app, arguments)
        assert result.exit_code == 0, result.output
    assert 'yourmt3' in CliRunner().invoke(cli.app, ['midi-models']).output

def test_cli_runs_saved_sources_and_writes_report(tmp_path, monkeypatch):
    saved(tmp_path / 'old')
    monkeypatch.setattr(runner, 'invoke_worker', fake_worker)
    result = CliRunner().invoke(cli.app, ['midi', str(tmp_path / 'old'), '-o', str(tmp_path / 'new'), '--model', 'transkun', '--model', 'yourmt3', '--no-plots'])
    assert result.exit_code == 0, result.output
    report = json.loads((tmp_path / 'new/report.json').read_text())
    assert report['models_requested'] == ['transkun', 'yourmt3']
    assert report['completed_count'] == 2

@pytest.mark.parametrize('args', [['--model', 'unknown'], ['--model', 'yourmt3', '--target', 'bad'], ['--model', 'transkun', '--checkpoint', 'transkun=no-file'], ['--target', 'master', '--stem', 'piano']])
def test_cli_bad_options_fail_before_creating_output(tmp_path, args):
    path = audio(tmp_path / 'mix.wav')
    result = CliRunner().invoke(cli.app, ['midi', str(path), '-o', str(tmp_path / 'new'), *args])
    assert result.exit_code == 2, result.output
    assert not (tmp_path / 'new').exists()

def test_cli_no_sources_has_failure_exit(tmp_path):
    path = audio(tmp_path / 'mix.wav')
    result = CliRunner().invoke(cli.app, ['midi', str(path), '-o', str(tmp_path / 'new'), '--target', 'stems', '--model', 'transkun'])
    assert result.exit_code == 1, result.output
    assert json.loads((tmp_path / 'new/report.json').read_text())['skipped']

def test_analyze_cli_passes_new_config(tmp_path, monkeypatch):
    path = audio(tmp_path / 'mix.wav')
    configs = []

    def pipeline(cfg, **kw):
        configs.append(cfg)
        return {'errors': []}
    monkeypatch.setattr(cli, 'run_pipeline', pipeline)
    result = CliRunner().invoke(cli.app, ['analyze', str(path), '-o', str(tmp_path / 'new'), '--midi-model', 'yourmt3', '--midi-model', 'transkun', '--midi-allow-downloads'])
    assert result.exit_code == 0, result.output
    assert configs[0].midi_models == ('yourmt3', 'transkun') and configs[0].midi_allow_downloads

@pytest.mark.parametrize('flags', [['--no-deep-analysis'], ['--basic-pitch']])
def test_analyze_cli_rejects_conflicting_requests(tmp_path, flags):
    path = audio(tmp_path / 'mix.wav')
    result = CliRunner().invoke(cli.app, ['analyze', str(path), '-o', str(tmp_path / 'new'), '--midi-model', 'basic_pitch', *flags])
    assert result.exit_code == 2 and (not (tmp_path / 'new').exists())

def test_python_pipeline_rejects_silent_midi_skip(tmp_path):
    path = audio(tmp_path / 'mix.wav')
    with pytest.raises(ValueError, match='deep'):
        run_pipeline(PipelineConfig(path, tmp_path / 'out', (), run_deep_analysis=False, midi_models=('yourmt3',)))
    assert not (tmp_path / 'out').exists()

def deep_fixture(monkeypatch):
    monkeypatch.setattr(deep_runner, 'analyze_sonic_features', lambda *a: {})
    monkeypatch.setattr(deep_runner, 'analyze_rhythm', lambda *a: {})
    monkeypatch.setattr(deep_runner, 'analyze_harmony', lambda *a: {})
    monkeypatch.setattr(deep_runner, 'analyze_song_map', lambda *a, **kw: {})

def test_default_deep_pass_does_not_transcribe(tmp_path, monkeypatch):
    deep_fixture(monkeypatch)

    def forbidden(*a, **k):
        raise AssertionError('MIDI is opt-in')
    monkeypatch.setattr(midi, 'analyze_midi', forbidden)
    report = deep_runner.run_comprehensive_analysis(audio(tmp_path / 'mix.wav'), tmp_path, beat_results=[], stems=[], vamp_result=None, whisper_result=None, run_loops=False)
    assert 'midi' not in report['analyses']

def test_deep_summary_registers_results_and_nested_failures(tmp_path, monkeypatch):
    deep_fixture(monkeypatch)
    monkeypatch.setattr(midi, 'analyze_midi', lambda *a, **kw: {'status': 'completed_with_errors', 'completed_count': 1, 'errors': [{'model': 'yourmt3', 'message': 'test failure'}], 'skipped': [{'model': 'transkun', 'reason': 'No piano stem'}]})
    report = deep_runner.run_comprehensive_analysis(audio(tmp_path / 'mix.wav'), tmp_path, beat_results=[], stems=[], vamp_result=None, whisper_result=None, run_loops=False, midi_models=('basic_pitch', 'transkun', 'yourmt3'))
    assert report['analyses']['midi'] == {'available': True, 'path': 'deep/midi/report.json'}
    assert {e['stage'] for e in report['errors']} == {'midi:yourmt3', 'midi:transkun'}

def test_relative_checkpoint_resolved_before_worker_cwd_change(tmp_path, monkeypatch):
    monkeypatch.chdir(tmp_path)
    audio(tmp_path / 'mix.wav')
    (tmp_path / 'weights.pt').write_bytes(b'fixture')
    seen = []

    def predictor(request, folder, config):
        seen.append(request['checkpoint'])
        return fake_worker(request, folder, config)
    monkeypatch.setattr(runner, 'invoke_worker', predictor)
    config = midi.MidiConfig(models=('mr_mt3',), checkpoints={'mr_mt3': 'weights.pt'}, make_plots=False)
    midi.transcribe_path(Path('mix.wav'), Path('output'), config=config)
    assert seen == [str(tmp_path / 'weights.pt')]

@pytest.mark.parametrize('options', [dict(models=[]), dict(models='yourmt3'), dict(models=['bad']), dict(allow_model_downloads='true'), dict(max_stems=True), dict(stem_names='piano')])
def test_codex_midi_options_are_typed(options):
    with pytest.raises(ValueError):
        midi_options(**options)

def test_codex_submission_and_read_only_guard(tmp_path, monkeypatch):
    audio(tmp_path / 'mix.wav')
    bridge = StemLabBridge(tmp_path)
    calls = []
    monkeypatch.setattr(bridge.jobs, 'submit', lambda task: calls.append(task) or {'state': 'queued'})
    try:
        assert len(bridge.capabilities()['midi_models']) == 5
        report = bridge.start_midi_scan('mix.wav', models=['yourmt3'], allow_model_downloads=True)
        assert report['state'] == 'queued' and calls[0]['kind'] == 'midi'
        assert calls[0]['options']['allow_model_downloads'] is True
        with pytest.raises(ValueError):
            bridge.start_midi_scan('../outside.wav')
    finally:
        bridge.close()
    bridge = StemLabBridge(tmp_path, read_only=True)
    try:
        with pytest.raises(PermissionError):
            bridge.start_midi_scan('mix.wav')
    finally:
        bridge.close()

def test_codex_job_preserves_original_results(tmp_path, monkeypatch):
    saved(tmp_path / 'old')
    before = {p: p.read_bytes() for p in (tmp_path / 'old').rglob('*') if p.is_file()}
    output = tmp_path / 'job'
    output.mkdir()
    monkeypatch.setattr(runner, 'invoke_worker', fake_worker)
    result = run_midi_scan(tmp_path, output, {'source_path': 'old', 'options': {'models': ['transkun', 'yourmt3'], 'make_plots': False}})
    assert result['state'] == 'completed' and result['completed_count'] == 2
    manifest = json.loads((output / 'analysis.json').read_text())
    assert (output / manifest['source']['copied_path']).is_file()
    assert manifest['codex_provenance']['prior_evidence_modified'] is False
    assert before == {p: p.read_bytes() for p in (tmp_path / 'old').rglob('*') if p.is_file()}

def test_codex_missing_piano_is_failed_not_completed(tmp_path):
    path = audio(tmp_path / 'mix.wav')
    output = tmp_path / 'job'
    output.mkdir()
    result = run_midi_scan(tmp_path, output, {'source_path': path.name, 'options': {'models': ['transkun'], 'target': 'stems', 'make_plots': False}})
    assert result['state'] == 'failed' and result['skipped_count'] == 1
