import json
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
    assert (web / "timeline.css").is_file()
    assert (web / "app.js").is_file()
    assert not (web / "canonical.js").exists()
    assert (web / "arcadians-reference.json").is_file()

    index = (web / "index.html").read_text(encoding="utf-8")
    assert "/assets/timeline.css" in index
    assert "/assets/canonical.js" not in index


def test_timeline_control_comes_from_the_public_npm_package():
    root = Path(__file__).parents[1]
    package = json.loads((root / "package.json").read_text(encoding="utf-8"))
    lock = json.loads((root / "package-lock.json").read_text(encoding="utf-8"))

    requested = package["dependencies"]["react-timeline-sequence"]
    installed = lock["packages"]["node_modules/react-timeline-sequence"]

    commit = "b02d66063a67e048a9238da10d7e002dc69d81c8"
    assert requested == f"github:kieransimkin/react-timeline-sequence#{commit}"
    assert installed["version"] == "0.1.3"
    assert installed["resolved"].endswith(f"react-timeline-sequence.git#{commit}")
    assert installed["integrity"].startswith("sha512-")
