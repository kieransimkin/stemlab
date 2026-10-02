"""CLI/pipeline checks using real WAVs and controlled detector fixtures."""
import json
from decimal import Decimal

import numpy as np
import pytest
import soundfile as sf
from rich.text import Text
from typer.testing import CliRunner

from stemlab import cli, pipeline
from stemlab.canonical import _parse_lrc
from stemlab.cues import parse_lrc
from stemlab.types import BeatResult, PipelineConfig


def fixture(tmp_path):
    root = tmp_path / 'analysis'
    (root / 'beats').mkdir(parents=True)
    (root / 'beats/beat_this.json').write_text(json.dumps({'model': 'beat_this', 'beats': [1.123456789, 2, 4], 'downbeats': [1.123456789]}))
    cues = tmp_path / 'musical cues.lrc'
    cues.write_text('[ti:Test]\n[offset:0]\n[00:01.10][ENTRY: INTRO]\n[00:03.20][DROP: CHORUS]')
    return root, cues


@pytest.mark.parametrize(
    'command, expected_option',
    [('snap-cues', '--force-snap'), ('analyze', '--snap-cues')],
)
@pytest.mark.parametrize('force_color', [False, True], ids=['plain', 'ansi'])
def test_cli_help(command, expected_option, force_color, monkeypatch):
    # CI may force Rich colour even when CliRunner is capturing help. ANSI
    # sequences can occur inside an option name, so inspect the rendered text.
    monkeypatch.setenv('COLUMNS', '160')
    monkeypatch.delenv('FORCE_COLOR', raising=False)
    monkeypatch.delenv('NO_COLOR', raising=False)
    if force_color:
        monkeypatch.setenv('FORCE_COLOR', '1')
    result = CliRunner().invoke(
        cli.app, [command, '--help'], color=force_color, terminal_width=160,
    )
    assert result.exit_code == 0, result.output
    plain_help = Text.from_ansi(result.output).plain
    assert expected_option in plain_help, plain_help


def test_cli_default_output_reports_distant_cue(tmp_path):
    root, cues = fixture(tmp_path)
    result = CliRunner().invoke(cli.app, ['snap-cues', str(root), str(cues)])
    assert result.exit_code == 0, result.output
    assert 'REVIEW' in result.output and '800.000 ms' in result.output
    output = root / 'cues' / cues.stem
    report = json.loads((output / 'report.json').read_text())
    assert report['review_count'] == 1 and report['snapped_count'] == 1
    assert '[ENTRY: INTRO]' in (output / report['output_cue_file']).read_text()


def test_cli_force_and_fail_on_review(tmp_path):
    root, cues = fixture(tmp_path)
    result = CliRunner().invoke(cli.app, ['snap-cues', str(root), str(cues), '-o', str(tmp_path / 'forced'), '--force-snap', '--fail-on-review'])
    assert result.exit_code == 2, result.output
    report = json.loads((tmp_path / 'forced/report.json').read_text())
    assert report['forced_count'] == 1 and report['review_count'] == 1
    assert report['all_cues_on_detected_beats']


def test_cli_explicit_grid_sample_rate_and_downbeats(tmp_path):
    root, cues = fixture(tmp_path)
    result = CliRunner().invoke(cli.app, ['snap-cues', str(root / 'beats/beat_this.json'), str(cues), '--sample-rate', '44100', '--downbeats', '--tolerance-ms', '200'])
    assert result.exit_code == 0, result.output
    report = json.loads((tmp_path / 'cues' / cues.stem / 'report.json').read_text())
    assert report['sample_rate'] == 44100 and report['grid']['kind'] == 'downbeats'


@pytest.mark.parametrize('flags', [['--tolerance-ms', '-5'], ['--tolerance-ms', 'nan'], ['--beat-model', 'missing'], ['--precision', 'unknown']])
def test_cli_invalid_settings_do_not_write(tmp_path, flags):
    root, cues = fixture(tmp_path)
    result = CliRunner().invoke(cli.app, ['snap-cues', str(root), str(cues), '-o', str(tmp_path / 'new'), *flags])
    assert result.exit_code != 0, result.output
    assert not (tmp_path / 'new').exists()


def test_canonical_import_accepts_exact_precision_and_offset():
    text = '[offset:200]\n[00:01.3234567891234][ENTRY: START]\n[00:02.20][DROP: END]'
    events = _parse_lrc(text)
    assert events[0]['start'] == pytest.approx(1.1234567891234, abs=1e-14)
    assert events[0]['text'] == '[ENTRY: START]'
    assert events[1]['start'] == 2


def test_analyze_cli_passes_options(tmp_path, monkeypatch):
    root, cues = fixture(tmp_path)
    master = tmp_path / 'master.wav'
    sf.write(master, np.zeros(100), 8000)
    seen = []
    monkeypatch.setattr(cli, 'run_pipeline', lambda cfg, **kw: seen.append(cfg) or {'errors': []})
    result = CliRunner().invoke(cli.app, ['analyze', str(master), '-o', str(tmp_path / 'new'), '--snap-cues', str(cues), '--cue-tolerance-ms', '120', '--cue-force-snap', '--cue-downbeats', '--cue-precision', 'milliseconds', '--cue-beat-model', 'beat_this'])
    assert result.exit_code == 0, result.output
    cfg = seen[0]
    assert cfg.cue_file == cues and cfg.cue_tolerance_ms == 120
    assert cfg.cue_force_snap and cfg.cue_downbeats_only
    assert cfg.cue_precision == 'milliseconds' and cfg.cue_beat_model == 'beat_this'


def test_analyze_no_detector_rejected_before_run(tmp_path, monkeypatch):
    _, cues = fixture(tmp_path)
    master = tmp_path / 'master.wav'
    sf.write(master, np.zeros(100), 8000)
    def unexpected(*a, **kw):
        raise AssertionError('Pipeline must not run')
    monkeypatch.setattr(cli, 'run_pipeline', unexpected)
    result = CliRunner().invoke(cli.app, ['analyze', str(master), '-o', str(tmp_path / 'new'), '--snap-cues', str(cues), '--no-beats', '--no-structure'])
    assert result.exit_code == 2, result.output
    assert not (tmp_path / 'new').exists()


def config(tmp_path, **kw):
    master = tmp_path / 'master.wav'
    sf.write(master, np.zeros(8000 * 6), 8000, subtype='FLOAT')
    cues = tmp_path / 'cues.lrc'
    cues.write_text('[00:01.10][ENTRY: START]\n[00:03.20][DROP: CHORUS]')
    return PipelineConfig(master, tmp_path / 'out', (), run_structure=False, run_vamp=False,
                          run_whisper=False, make_spectrograms=False, run_deep_analysis=False,
                          cue_file=cues, **kw)


def stub_detectors(monkeypatch, beats):
    class Detector:
        def __init__(self, **kw):
            pass
        def analyze(self, *args):
            # Same named detector avoids misleading artificial multi-model consensus.
            return BeatResult('beat_this', beats, [], None)
    for name in ['BeatThisBackend', 'BeatNetBackend', 'BeatTransformerBackend']:
        monkeypatch.setattr(pipeline, name, Detector)
    def build_session(directory, *a, **kw):
        a, b = directory / 'session.sv', directory / 'session.xml'
        a.write_text('Test session')
        b.write_text('Test session')
        return a, b
    monkeypatch.setattr(pipeline, 'build_session', build_session)


def test_pipeline_opt_in_registers_report_and_preserves_inputs(tmp_path, monkeypatch):
    cfg = config(tmp_path)
    stub_detectors(monkeypatch, [1.123456789, 2, 4])
    before = cfg.cue_file.read_bytes()
    result = pipeline.run_pipeline(cfg)
    assert not result['errors']
    report = result['cue_alignment']
    assert report['review_count'] == 1 and report['sample_rate'] == 8000
    assert (cfg.output_dir / report['report_path']).is_file()
    saved = json.loads((cfg.output_dir / 'analysis.json').read_text())
    assert saved['cue_alignment']['status'] == 'review_required'
    assert cfg.cue_file.read_bytes() == before
    assert (cfg.output_dir / 'manifest.json').is_file()


def test_pipeline_never_uses_stale_results(tmp_path, monkeypatch):
    cfg = config(tmp_path)
    stub_detectors(monkeypatch, [])
    (cfg.output_dir / 'beats').mkdir(parents=True)
    stale = cfg.output_dir / 'beats/consensus.json'
    stale.write_text('{"beats":[1.1,3.2]}')
    result = pipeline.run_pipeline(cfg)
    assert result['cue_alignment']['without_nearby_beat_count'] == 2
    assert result['cue_alignment']['kept_count'] == 2
    assert stale.read_text() == '{"beats":[1.1,3.2]}'


def test_pipeline_existing_cues_refused_before_overwriting_audio(tmp_path):
    cfg = config(tmp_path)
    (cfg.output_dir / 'cues/cues').mkdir(parents=True)
    with pytest.raises(FileExistsError):
        pipeline.run_pipeline(cfg)
    assert not (cfg.output_dir / 'input').exists()


def test_pipeline_no_detector_rejected(tmp_path):
    cfg = config(tmp_path, run_beats=False)
    with pytest.raises(ValueError, match='detection'):
        pipeline.run_pipeline(cfg)
    assert not cfg.output_dir.exists()


def test_exact_pipeline_report_matches_lrc(tmp_path, monkeypatch):
    cfg = config(tmp_path, cue_force_snap=True)
    stub_detectors(monkeypatch, [1.123456789, 4.000000000012])
    result = pipeline.run_pipeline(cfg)
    report = result['cue_alignment']
    output = cfg.output_dir / 'cues/cues' / report['output_cue_file']
    parsed = parse_lrc(output.read_text())
    assert [c.time for c in parsed.cues] == [Decimal(c['nearest_beat_seconds_exact']) for c in report['cues']]


def test_cue_markers_not_interpreted_as_rich_markup(tmp_path):
    root, cues = fixture(tmp_path)
    cues.write_text('[00:01.10][red] [DROP: CHORUS 1]')
    result = CliRunner().invoke(cli.app, ['snap-cues', str(root), str(cues)])
    assert result.exit_code == 0 and '[red]' in result.output
