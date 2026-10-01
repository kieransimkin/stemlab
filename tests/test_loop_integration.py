import io
import json
import numpy as np
import pytest
import soundfile as sf
from fastapi import FastAPI
from fastapi.testclient import TestClient
from typer.testing import CliRunner
from stemlab.analysis import runner
from stemlab.cli import app
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import sha256_file
from stemlab.webui import install_routes

@pytest.mark.parametrize('max_seconds', [None, 2.0])
def test_runner_registers_loop_report_and_defaults(tmp_path, monkeypatch, max_seconds):
    sr = 8000
    master = tmp_path / 'master.wav'
    vocal = tmp_path / 'vocals.wav'
    sf.write(master, np.zeros(sr * 8), sr, subtype='FLOAT')
    sf.write(vocal, np.zeros(sr * 8), sr, subtype='FLOAT')
    monkeypatch.setattr(runner, 'analyze_sonic_features', lambda *a: {'duration_seconds': 8})
    monkeypatch.setattr(runner, 'analyze_rhythm', lambda *a: {})
    monkeypatch.setattr(runner, 'analyze_harmony', lambda *a: {})
    monkeypatch.setattr(runner, 'analyze_song_map', lambda *a, **kw: {'sections': [{'start': 0, 'end': 8, 'label': 'Verse'}]})
    report = runner.run_comprehensive_analysis(master, tmp_path, beat_results=[BeatResult('test', list(np.arange(0, 8.01, 0.5)), [0, 2, 4, 6, 8], 120)], stems=[StemArtifact('test', 'vocals', vocal)], vamp_result=None, whisper_result=None, run_text_semantics=False, loop_max_seconds=max_seconds)
    assert report['analyses']['loops']['available']
    loop_report = json.loads((tmp_path / 'deep/loops/loops.json').read_text())
    assert loop_report['loop_count'] == 1
    assert loop_report['config']['max_seconds'] == max_seconds
    if max_seconds is not None:
        assert loop_report['loops'][0]['duration_seconds'] <= max_seconds
    assert not list((tmp_path / 'deep/loops').rglob('*.wav'))

def test_export_flag_conflicts_are_not_silent(tmp_path):
    master = tmp_path / 'master.wav'
    sf.write(master, np.zeros(800), 8000)
    result = CliRunner().invoke(app, ['analyze', str(master), '-o', str(tmp_path / 'out'), '--no-loops', '--export-loops'])
    assert result.exit_code == 2
    assert 'cannot be combined' in result.output

def test_web_preview_returns_exact_native_rate_wav(tmp_path):
    sr = 8000
    y = np.linspace(-0.5, 0.5, 8000, dtype='float32')
    song_hash = 'a' * 64
    root = tmp_path / song_hash
    root.mkdir()
    master = root / 'master.wav'
    sf.write(master, y, sr, subtype='FLOAT')
    (root / 'analysis.json').write_text(json.dumps({'source': {'copied_path': 'master.wav', 'sha256': sha256_file(master)}}))
    (root / 'deep/loops').mkdir(parents=True)
    (root / 'deep/loops/loops.json').write_text(json.dumps({'source_sha256': sha256_file(master), 'sample_rate': sr, 'loops': [{'id': 'verse-01-01', 'start_sample': 100, 'end_sample': 2100}]}))
    api = FastAPI()
    install_routes(api, results_dir_provider=lambda: tmp_path, scheduler_provider=lambda: None)
    with TestClient(api) as client:
        response = client.get(f'/api/{song_hash}/loops/verse-01-01/audio')
        assert response.status_code == 200
        got, rate = sf.read(io.BytesIO(response.content), dtype='float32')
        assert rate == sr
        np.testing.assert_array_equal(got, y[100:2100])
        assert client.get(f'/api/{song_hash}/loops/verse-99-01/audio').status_code == 404
    assert list((root / 'deep/loops').iterdir()) == [root / 'deep/loops/loops.json']
