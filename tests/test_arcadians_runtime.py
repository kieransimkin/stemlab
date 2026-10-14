"""Decoder preflight and CI ownership contracts; no model downloads."""
from __future__ import annotations

import importlib.util
from pathlib import Path
import sys
from types import SimpleNamespace

import numpy as np
import pytest
import yaml

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import build_arcadians_timeline as builder
import check_torchaudio_decode as decoder

ROOT = Path(__file__).resolve().parents[1]


@pytest.fixture
def audio(tmp_path):
    path = tmp_path / 'probe.mp3'
    path.write_bytes(b'synthetic unit-test payload; decoder mocked')
    return path


def install_decoder(monkeypatch, samples=None, sample_rate=44100):
    samples = np.full((2, 22050), .1, dtype=np.float32) if samples is None else samples
    calls = []
    def load(path):
        calls.append(path)
        return samples, sample_rate
    monkeypatch.setitem(sys.modules, 'torchaudio', SimpleNamespace(load=load))
    return calls


def test_preflight_uses_original_path_and_does_not_rewrite_audio(audio, monkeypatch):
    original = audio.read_bytes()
    calls = install_decoder(monkeypatch)
    result = decoder.check_audio_decode(audio, expected_sample_rate=44100,
                                        expected_channels=2, expected_duration=.5)
    assert calls == [str(audio)]
    assert result['status'] == 'passed' and result['frames'] == 22050
    assert result['duration_seconds'] == .5 and audio.read_bytes() == original
    assert 'torchcodec' in result['dependencies']


@pytest.mark.parametrize('samples,rate,match', [
    (np.ones(20), 44100, 'channel-first'),
    (np.ones((2, 0)), 44100, 'non-empty'),
    (np.ones((0, 10)), 44100, 'non-empty'),
    (np.full((2, 10), np.nan), 44100, 'non-finite'),
    (np.full((2, 10), np.inf), 44100, 'non-finite'),
    (np.zeros((2, 10)), 44100, 'silent'),
    (np.ones((2, 10)), 0, 'sample rate'),
    (np.ones((2, 10)), True, 'sample rate'),
])
def test_preflight_rejects_invalid_decoding(audio, monkeypatch, samples, rate, match):
    install_decoder(monkeypatch, samples, rate)
    with pytest.raises(ValueError, match=match):
        decoder.check_audio_decode(audio)


@pytest.mark.parametrize('kwargs,match', [
    ({'expected_sample_rate': 16000}, 'sample rate mismatch'),
    ({'expected_channels': 1}, 'channel count mismatch'),
    ({'expected_duration': 10}, 'duration mismatch'),
    ({'expected_duration': float('nan')}, 'duration mismatch'),
    ({'expected_duration': -1}, 'duration mismatch'),
])
def test_preflight_checks_source_properties(audio, monkeypatch, kwargs, match):
    install_decoder(monkeypatch)
    with pytest.raises(ValueError, match=match):
        decoder.check_audio_decode(audio, **kwargs)


@pytest.mark.parametrize('error', [ImportError('No module named torchcodec'),
                                    RuntimeError('FFmpeg libraries missing'),
                                    OSError('libtorchcodec.so missing')])
def test_decoder_failure_is_actionable_without_silent_fallback(audio, monkeypatch, error):
    def load(_):
        raise error
    monkeypatch.setitem(sys.modules, 'torchaudio', SimpleNamespace(load=load))
    with pytest.raises(RuntimeError, match='TorchCodec.*PyTorch') as caught:
        decoder.check_audio_decode(audio)
    assert caught.value.__cause__ is error


def test_missing_input_stops_before_loading_torchaudio(tmp_path, monkeypatch):
    calls = install_decoder(monkeypatch)
    with pytest.raises(FileNotFoundError):
        decoder.check_audio_decode(tmp_path / 'missing.mp3')
    assert not calls


def test_probe_generation_is_bounded_and_synthetic(tmp_path, monkeypatch):
    calls = []
    monkeypatch.setattr(decoder.subprocess, 'run', lambda cmd, **kw: calls.append((cmd, kw)))
    decoder.make_probe(tmp_path / 'probe.mp3')
    cmd, kwargs = calls[0]
    assert 'sine=frequency=440:sample_rate=44100:duration=0.5' in cmd
    assert '-nostdin' in cmd and 'libmp3lame' in cmd
    assert kwargs == {'check': True, 'timeout': 30}


def test_preflight_failure_prevents_expensive_model_work(audio, tmp_path, monkeypatch):
    import stemlab.pipeline as pipeline
    calls = []
    monkeypatch.setattr(builder, 'DEFAULT_AUDIO', audio)
    monkeypatch.setattr(builder, 'digest', lambda _: builder.ARCADIANS_SHA256)
    def fail(path, **kwargs):
        assert path == audio
        assert kwargs == {'expected_sample_rate': 44100, 'expected_channels': 2,
                          'expected_duration': 273.604558}
        raise RuntimeError('decoder unavailable')
    monkeypatch.setattr(builder, 'check_audio_decode', fail)
    monkeypatch.setattr(pipeline, 'run_pipeline', lambda *a, **kw: calls.append(a))
    with pytest.raises(RuntimeError, match='decoder unavailable'):
        builder.build(tmp_path / 'analysis', tmp_path / 'site', 'b' * 40)
    assert calls == [] and not (tmp_path / 'analysis').exists()


def test_lint_gate_precedes_expensive_analysis():
    workflow = yaml.load((ROOT / '.github/workflows/arcadians-demo.yml').read_text(),
                         Loader=yaml.BaseLoader)
    jobs = workflow['jobs']
    assert jobs['timeline']['needs'] == 'static-regressions'
    steps = jobs['static-regressions']['steps']
    commands = '\n'.join(s.get('run', '') for s in steps)
    assert 'ruff check src tests scripts' in commands
    assert 'tests/test_arcadians_runtime.py' in commands
    assert 'ruff' in next(s for s in steps if 'Install lightweight' in s.get('name', ''))['run']


def test_ownership_repair_runs_on_failure_before_browser_or_uploads():
    workflow = yaml.load((ROOT / '.github/workflows/arcadians-timeline.yml').read_text(),
                         Loader=yaml.BaseLoader)
    steps = workflow['jobs']['build']['steps']
    index = next(i for i, s in enumerate(steps) if s.get('name') == 'Restore runner ownership of generated files')
    fix = steps[index]
    assert fix['if'] == 'always()'
    assert 'sudo chown -R --no-dereference "$(id -u):$(id -g)" "$output"' in fix['run']
    assert 'output="$RUNNER_TEMP/arcadians-timeline"' in fix['run']
    assert '[ ! -L "$output" ]' in fix['run']
    assert 'chmod' not in fix['run'] and '$GITHUB_WORKSPACE' not in fix['run']
    assert index > next(i for i, s in enumerate(steps) if s.get('name', '').startswith('Run the complete core recipe'))
    assert index < next(i for i, s in enumerate(steps) if s.get('name', '').startswith('Install browser'))
    assert all(i > index for i, s in enumerate(steps) if 'actions/upload-artifact' in s.get('uses', ''))


def test_docker_codec_is_pinned_to_selected_pytorch_wheel_index():
    dockerfile = (ROOT / 'docker/Dockerfile').read_text()
    assert 'ARG TORCHCODEC_VERSION=0.17.0' in dockerfile
    segment = dockerfile.split('RUN python -m pip install --upgrade', 1)[1].split('\n\n', 1)[0]
    assert '--index-url "${TORCH_INDEX_URL}"' in segment
    assert all(f'"{package}==${{{variable}}}"' in segment for package, variable in
               [('torch', 'TORCH_VERSION'), ('torchaudio', 'TORCHAUDIO_VERSION'),
                ('torchcodec', 'TORCHCODEC_VERSION')])
    verify = (ROOT / 'docker/verify-environment.sh').read_text()
    assert "'torchcodec'" in verify
    assert 'python /opt/stemlab/scripts/check_torchaudio_decode.py' in verify
    assert 'include scripts/check_torchaudio_decode.py' in (ROOT / 'MANIFEST.in').read_text()


@pytest.mark.skipif(importlib.util.find_spec('ruff') is None, reason='Ruff unavailable; CI runs its mandatory lint step')
def test_new_runtime_files_pass_ruff():
    import subprocess
    subprocess.run([sys.executable, '-m', 'ruff', 'check',
                    'scripts/assemble_arcadians_site.py', 'scripts/build_arcadians_timeline.py',
                    'scripts/check_arcadians_timeline.py', 'scripts/check_torchaudio_decode.py',
                    'tests/test_arcadians_timeline.py', 'tests/test_arcadians_runtime.py'],
                   cwd=ROOT, check=True, timeout=30)
