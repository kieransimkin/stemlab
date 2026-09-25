import numpy as np
import soundfile as sf
import pytest

from stemlab.audio import normalize_audio_file


def test_normalize_audio_file_targets_minus_one_dbfs(tmp_path):
    path = tmp_path / "quiet.wav"
    sr = 48000
    signal = np.zeros((sr // 10, 2), dtype=np.float32)
    signal[:, 0] = 0.05
    signal[:, 1] = -0.025
    sf.write(path, signal, sr, subtype="FLOAT")

    result = normalize_audio_file(path)
    normalized, read_sr = sf.read(path, dtype="float32", always_2d=True)

    assert read_sr == sr
    assert result["normalized"] is True
    assert np.max(np.abs(normalized)) == pytest.approx(10 ** (-1 / 20), rel=1e-5)
    assert result["peak_after_dbfs"] == pytest.approx(-1.0, abs=1e-4)


def test_normalize_audio_file_leaves_silence_alone(tmp_path):
    path = tmp_path / "silent.wav"
    sf.write(path, np.zeros((100, 1), dtype=np.float32), 16000, subtype="FLOAT")

    result = normalize_audio_file(path)

    assert result["normalized"] is False
    assert result["reason"] == "silent"
