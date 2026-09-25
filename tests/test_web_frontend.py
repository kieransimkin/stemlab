from pathlib import Path

import numpy as np
import pytest

pytest.importorskip("fastapi")

from stemlab.webui import _spectrogram_strip_png, _waveform_envelope


def test_waveform_envelope_is_compact_and_time_aligned(tmp_path):
    sf = pytest.importorskip("soundfile")
    sample_rate = 8000
    duration = 2.0
    t = np.arange(int(sample_rate * duration), dtype=np.float32) / sample_rate
    audio = (0.5 * np.sin(2 * np.pi * 220 * t)).astype(np.float32)
    path = tmp_path / "tone.wav"
    sf.write(path, audio, sample_rate, subtype="FLOAT")

    result = _waveform_envelope(path, points=512)

    assert result["duration_seconds"] == pytest.approx(duration, rel=1e-5)
    assert 1 <= len(result["min"]) <= 512
    assert len(result["min"]) == len(result["max"])
    assert min(result["min"]) < 0
    assert max(result["max"]) > 0


def test_spectrogram_strip_is_margin_free_png(tmp_path):
    path = tmp_path / "spec.npz"
    matrix = np.linspace(-100.0, 0.0, 64 * 128, dtype=np.float32).reshape(64, 128)
    np.savez_compressed(path, magnitude_db=matrix.astype(np.float16))

    png = _spectrogram_strip_png(path, max_width=64, max_height=32)

    assert png.startswith(b"\x89PNG\r\n\x1a\n")


def test_frontend_assets_are_present():
    import stemlab.webui as webui

    web = Path(webui.__file__).with_name("web")
    assert (web / "index.html").is_file()
    assert (web / "style.css").is_file()
    assert (web / "app.js").is_file()
