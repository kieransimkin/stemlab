"""Check upstream API contracts using explicit SDK doubles, NOT neural inference."""
import contextlib
import hashlib
import importlib.resources
import io
import json
import sys
import types
import numpy as np
import pytest
import soundfile as sf
from stemlab.analysis.midi import adapters

def module(monkeypatch, name, **attributes):
    value = types.ModuleType(name)
    value.__dict__.update(attributes)
    monkeypatch.setitem(sys.modules, name, value)
    return value

def request(model, source='fixture.wav'):
    return {'model': model, 'source': source, 'device': 'cpu', 'allow_downloads': False}

def test_missing_weight_never_downloads_without_consent(tmp_path, monkeypatch):
    monkeypatch.setenv('STEMLAB_CACHE', str(tmp_path))

    def forbidden(*a, **kw):
        raise AssertionError('Network must not be used')
    monkeypatch.setattr(adapters.urllib.request, 'urlopen', forbidden)
    for name in ('mr_mt3', 'yourmt3', 'piano_transcription'):
        with pytest.raises(RuntimeError, match='cached'):
            adapters.checkpoint_for(name, None, False)
    assert not list(tmp_path.rglob('*'))

def test_corrupt_cache_never_replaced(tmp_path, monkeypatch):
    monkeypatch.setenv('STEMLAB_CACHE', str(tmp_path))
    path = tmp_path / 'midi/mr_mt3/mt3.pth'
    path.parent.mkdir(parents=True)
    path.write_bytes(b'not the expected weights')
    with pytest.raises(ValueError, match='checksum'):
        adapters.checkpoint_for('mr_mt3', None, True)
    assert path.read_bytes() == b'not the expected weights'

def test_verified_download_is_atomic_and_cached(tmp_path, monkeypatch):

    class Response(io.BytesIO):

        def geturl(self):
            return 'https://model.example/weights'
    calls = []

    def fetch(*a, **kw):
        calls.append(a)
        return Response(b'verified fixture weights')
    monkeypatch.setattr(adapters.urllib.request, 'urlopen', fetch)
    path = tmp_path / 'weights.pt'
    expected = hashlib.sha256(b'verified fixture weights').hexdigest()
    assert adapters._fetch('https://model.example/weights', path, expected) == path
    assert adapters._fetch('https://model.example/weights', path, expected) == path
    assert len(calls) == 1 and (not list(tmp_path.glob('*.part')))

@pytest.mark.parametrize('bad_hash,limit,redirect', [(True, 1024, 'https://model.example/w'), (False, 2, 'https://model.example/w'), (False, 1024, 'http://model.example/w')])
def test_reject_bad_download_and_remove_partial(tmp_path, monkeypatch, bad_hash, limit, redirect):

    class Response(io.BytesIO):

        def geturl(self):
            return redirect
    monkeypatch.setattr(adapters.urllib.request, 'urlopen', lambda *a, **kw: Response(b'weights'))
    monkeypatch.setattr(adapters, '_MAX_CHECKPOINT_BYTES', limit)
    expected = '0' * 64 if bad_hash else hashlib.sha256(b'weights').hexdigest()
    with pytest.raises(ValueError):
        adapters._fetch('https://model.example/w', tmp_path / 'weights.pt', expected)
    assert not list(tmp_path.iterdir())

def test_explicit_local_checkpoint_does_not_download(tmp_path):
    path = tmp_path / 'local.pt'
    path.write_bytes(b'trusted by caller')
    assert adapters.checkpoint_for('yourmt3', str(path), False) == path

def test_basic_pitch_uses_returned_midi_and_bundled_weights(tmp_path, monkeypatch):
    weights = tmp_path / 'basic.onnx'
    weights.write_bytes(b'fixture')
    calls = {}

    class Model:
        model_type = 'fixture-onnx'

        def __init__(self, path):
            calls['weights'] = path

    class Midi:

        def write(self, path):
            calls['output'] = path

    def predict(path, model):
        calls['predict'] = (path, model)
        return ({}, Midi(), [])
    module(monkeypatch, 'basic_pitch', ICASSP_2022_MODEL_PATH=weights)
    module(monkeypatch, 'basic_pitch.inference', Model=Model, predict=predict)
    result = adapters.run_backend(request('basic_pitch'), tmp_path / 'out.mid')
    assert calls['weights'] == weights and str(calls['predict'][0]) == 'fixture.wav'
    assert calls['output'] == str(tmp_path / 'out.mid')
    assert result['checkpoint_sha256'] == hashlib.sha256(b'fixture').hexdigest()
    assert result['runtime_type'] == 'fixture-onnx'

@pytest.mark.parametrize('model', ['mr_mt3', 'yourmt3'])
def test_mt3_explicit_model_no_wrapper_download_or_cache(tmp_path, monkeypatch, model):
    weights = tmp_path / 'weights.pt'
    weights.write_bytes(b'fixture')
    calls = {}

    class Midi:

        def save(self, path):
            calls['save'] = path

    class Predictor:

        def transcribe(self, audio, sr):
            calls['transcribe'] = (audio, sr)
            return Midi()

    def load_model(**kw):
        calls['load'] = kw
        return Predictor()
    module(monkeypatch, 'mt3_infer', load_model=load_model)
    monkeypatch.setattr(adapters, 'checkpoint_for', lambda *a: weights)
    monkeypatch.setattr(adapters, '_torch_device', lambda _: 'cpu')
    monkeypatch.setattr(adapters, '_audio', lambda *a: (np.ones(16000, dtype='float32'), 16000))
    result = adapters.run_backend(request(model), tmp_path / 'out.mid')
    assert calls['load'] == dict(model=model, checkpoint_path=str(weights), device='cpu', auto_download=False, cache=False)
    assert calls['transcribe'][1] == 16000 and calls['save'] == str(tmp_path / 'out.mid')
    assert result['inference_sample_rate'] == 16000

def test_piano_blocks_upstream_implicit_wget(tmp_path, monkeypatch):
    weights = tmp_path / 'small.pth'
    weights.write_bytes(b'fixture')

    def forbidden(**kw):
        raise AssertionError('Do not enter upstream implicit downloader')
    module(monkeypatch, 'piano_transcription_inference', PianoTranscription=forbidden, sample_rate=16000)
    monkeypatch.setattr(adapters, 'checkpoint_for', lambda *a: weights)
    with pytest.raises(ValueError, match='implicit download'):
        adapters.run_backend(request('piano_transcription'), tmp_path / 'out.mid')

def test_piano_constructor_and_output_api(tmp_path, monkeypatch):
    weights = tmp_path / 'weights.pth'
    with weights.open('wb') as f:
        f.truncate(160000000)
    calls = {}

    class Predictor:

        def __init__(self, **kw):
            calls['constructor'] = kw

        def transcribe(self, audio, path):
            calls['transcribe'] = (len(audio), path)
    module(monkeypatch, 'piano_transcription_inference', PianoTranscription=Predictor, sample_rate=16000)
    monkeypatch.setattr(adapters, 'checkpoint_for', lambda *a: weights)
    monkeypatch.setattr(adapters, '_torch_device', lambda _: 'cpu')
    monkeypatch.setattr(adapters, '_audio', lambda *a: (np.zeros(16000, dtype='float32'), 16000))
    result = adapters.run_backend(request('piano_transcription'), tmp_path / 'out.mid')
    assert calls['constructor'] == dict(checkpoint_path=str(weights), device='cpu')
    assert calls['transcribe'] == (16000, str(tmp_path / 'out.mid'))
    assert result['device'] == 'cpu'

def test_transkun_v2_config_state_dict_and_sample_rate(tmp_path, monkeypatch):
    folder = tmp_path / 'pretrained'
    folder.mkdir()
    (folder / '2.0.pt').write_bytes(b'fixture')
    (folder / '2.0.conf').write_text('fixture')
    calls = {}

    class Tensor:

        def to(self, device):
            return self

    class Model:
        fs = 44100

        def __init__(self, conf):
            calls['config'] = conf

        def to(self, device):
            return self

        def load_state_dict(self, state, strict):
            calls['state'] = (state, strict)

        def eval(self):
            return self

        def transcribe(self, audio, **kw):
            calls['transcribe'] = kw
            return ['fixture-note']

    class Midi:

        def write(self, path):
            calls['write'] = path

    def load(*a, **kw):
        calls['load'] = kw
        return {'best_state_dict': {'fixture': 1}}

    def audio(path, rate, mono):
        calls['audio'] = (rate, mono)
        return (np.zeros((441, 2), dtype='float32'), rate)
    module(monkeypatch, 'torch', load=load, inference_mode=contextlib.nullcontext, from_numpy=lambda _: Tensor())
    module(monkeypatch, 'transkun')
    module(monkeypatch, 'transkun.Data', writeMidi=lambda _: Midi())
    module(monkeypatch, 'moduleconf', parseFromFile=lambda _: {'Model': types.SimpleNamespace(module=types.SimpleNamespace(TransKun=Model), config='fixture-config')})
    monkeypatch.setattr(importlib.resources, 'files', lambda _: tmp_path)
    monkeypatch.setattr(adapters, '_torch_device', lambda _: 'cpu')
    monkeypatch.setattr(adapters, '_audio', audio)
    result = adapters.run_backend(request('transkun'), tmp_path / 'out.mid')
    assert calls['state'] == ({'fixture': 1}, True) and calls['load']['weights_only'] is True
    assert calls['audio'] == (44100, False)
    assert calls['transcribe'] == dict(stepInSecond=None, segmentSizeInSecond=None, discardSecondHalf=False)
    assert result['config_sha256']

def test_audio_resample_keeps_duration_and_channels(tmp_path):
    path = tmp_path / 'audio.wav'
    sf.write(path, np.ones((22050, 2), dtype='float32') * 0.1, 22050, subtype='FLOAT')
    audio, sr = adapters._audio(path, 16000, mono=False)
    assert audio.shape == (16000, 2) and sr == 16000 and (audio.dtype == np.float32)

def test_piano_checksum_metadata_protocol(tmp_path, monkeypatch):
    monkeypatch.setenv('STEMLAB_CACHE', str(tmp_path))
    info = {'files': [{'key': adapters._PIANO_NAME, 'checksum': 'md5:' + 'a' * 32}]}
    monkeypatch.setattr(adapters.urllib.request, 'urlopen', lambda *a, **k: io.BytesIO(json.dumps(info).encode()))
    calls = []

    def fake_download(url, path, expected, algorithm='sha256', minimum=1):
        calls.append((expected, algorithm, minimum))
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_bytes(b'fixture')
        return path
    monkeypatch.setattr(adapters, '_fetch', fake_download)
    path = adapters.checkpoint_for('piano_transcription', None, True)
    assert calls == [('a' * 32, 'md5', 160000000)]
    assert json.loads(path.with_suffix('.checksum.json').read_text())['sha256'] == adapters.digest(path)
