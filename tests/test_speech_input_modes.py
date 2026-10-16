"""Music input must not lose singing samples through a speech-only mask."""
import json
import sys
from types import ModuleType, SimpleNamespace

import numpy as np
import pytest

from stemlab import speech


@pytest.mark.parametrize("mode", ["speech", "full"])
def test_speech_mask_and_full_music_keep_source_clock_and_decoder_settings(tmp_path, monkeypatch, mode):
    original = np.linspace(-.8, .8, 1600, dtype=np.float32)
    saved, decoder, vad_calls = {}, {}, []
    monkeypatch.setattr(speech, "load_audio", lambda *a, **kw: ([SimpleNamespace(cpu=lambda: SimpleNamespace(numpy=lambda: original))], 16000))
    monkeypatch.setattr(speech, "save_audio", lambda path, values, rate: saved.update(path=path, values=values, rate=rate))
    monkeypatch.setattr(speech, "normalize_audio_file", lambda path: {"normalized": True})
    torch = ModuleType("torch")
    torch.from_numpy = lambda values: SimpleNamespace(unsqueeze=lambda axis: values)
    monkeypatch.setitem(sys.modules, "torch", torch)
    faster = ModuleType("faster_whisper")
    vad = ModuleType("faster_whisper.vad")
    vad.VadOptions = lambda **kwargs: kwargs
    def detect(*args):
        vad_calls.append(True)
        return [{"start": 320, "end": 1280}]
    vad.get_speech_timestamps = detect
    class Model:
        def __init__(self, name, **kwargs):
            decoder.update(model=name, **kwargs)
        def transcribe(self, path, **kwargs):
            decoder.update(path=path, options=kwargs)
            return iter([]), SimpleNamespace(language="en", language_probability=1, duration=.1)
    faster.WhisperModel = Model
    monkeypatch.setitem(sys.modules, "faster_whisper", faster)
    monkeypatch.setitem(sys.modules, "faster_whisper.vad", vad)
    result = speech.isolate_and_transcribe(tmp_path/"input.wav", tmp_path/"out",
        whisper_model="/project/models/pinned-whisper", device="cpu", vad_mode=mode, language="en")
    assert len(saved["values"]) == len(original)
    assert saved["rate"] == 16000
    assert decoder["options"] == dict(vad_filter=False, word_timestamps=True,
        condition_on_previous_text=False, language="en")
    assert decoder["compute_type"] == "int8"
    assert result["vad_mode"] == mode
    assert result["speech_mask_applied"] == (mode == "speech")
    if mode == "full":
        np.testing.assert_array_equal(saved["values"], original)
        assert not vad_calls
        assert result["regions"] == []
        assert saved["path"].name == "transcription_input.wav"
    else:
        assert vad_calls == [True]
        assert np.all(saved["values"][:320] == 0)
        assert np.all(saved["values"][1280:] == 0)
        np.testing.assert_array_equal(saved["values"][500:1000], original[500:1000])
        assert saved["path"].name == "spoken_word.wav"
    assert json.loads((tmp_path/"out/whisper.json").read_text())["requested_language"] == "en"


@pytest.mark.parametrize("mode,language", [("singing-detector", None), ("full", "English"), ("full", "en/private")])
def test_invalid_options_fail_before_imports_or_output(tmp_path, mode, language):
    with pytest.raises(ValueError):
        speech.isolate_and_transcribe(tmp_path/"missing.wav", tmp_path/"out", vad_mode=mode, language=language)
    assert not (tmp_path/"out").exists()
