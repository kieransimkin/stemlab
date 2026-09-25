from __future__ import annotations

import importlib
import importlib.metadata
import importlib.util
import sys

import numpy as np

from stemlab.beats.beatnet import _load_beatnet_class


def test_beatnet_loader_supports_madmom_prebuilt_without_pyaudio(tmp_path, monkeypatch):
    beatnet_dir = tmp_path / "BeatNet"
    madmom_dir = tmp_path / "madmom"
    dist_info = tmp_path / "madmom_prebuilt-0.17.post1.dist-info"
    beatnet_dir.mkdir()
    madmom_dir.mkdir()
    dist_info.mkdir()

    (beatnet_dir / "__init__.py").write_text("", encoding="utf-8")
    (beatnet_dir / "BeatNet.py").write_text(
        "import pyaudio\n"
        "import madmom\n"
        "class BeatNet:\n"
        "    pass\n",
        encoding="utf-8",
    )
    (madmom_dir / "__init__.py").write_text(
        "from importlib.metadata import distribution\n"
        "import numpy as np\n"
        "__version__ = distribution('madmom').version\n"
        "_legacy_aliases = (np.float, np.int)\n",
        encoding="utf-8",
    )
    (dist_info / "METADATA").write_text(
        "Metadata-Version: 2.1\n"
        "Name: madmom-prebuilt\n"
        "Version: 0.17.post1\n",
        encoding="utf-8",
    )

    monkeypatch.syspath_prepend(str(tmp_path))
    for name in ("BeatNet.BeatNet", "BeatNet", "madmom"):
        monkeypatch.delitem(sys.modules, name, raising=False)
    monkeypatch.delitem(sys.modules, "pyaudio", raising=False)
    monkeypatch.delattr(np, "float", raising=False)
    monkeypatch.delattr(np, "int", raising=False)

    real_find_spec = importlib.util.find_spec

    def find_spec_without_pyaudio(name, package=None):
        if name == "pyaudio":
            return None
        return real_find_spec(name, package)

    monkeypatch.setattr(importlib.util, "find_spec", find_spec_without_pyaudio)

    original_distribution = importlib.metadata.distribution
    beatnet_class = _load_beatnet_class()

    assert beatnet_class.__name__ == "BeatNet"
    assert importlib.metadata.distribution is original_distribution
    assert "float" in np.__dict__
    assert "int" in np.__dict__
    assert "pyaudio" not in sys.modules

    madmom = importlib.import_module("madmom")
    assert madmom.__version__ == "0.17.post1"
