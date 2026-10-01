from __future__ import annotations

import hashlib
import importlib.util
import sys
import zipfile

import pytest

from stemlab import bootstrap as bootstrap_module


def _write_test_wheel(path, payload: bytes = b"class BeatNet: pass\n") -> str:
    with zipfile.ZipFile(path, "w") as archive:
        archive.writestr("BeatNet/__init__.py", b"")
        archive.writestr("BeatNet/BeatNet.py", payload)
        archive.writestr("BeatNet/models/model_1_weights.pt", b"weights")
    return hashlib.sha256(path.read_bytes()).hexdigest()


def test_beatnet_bootstrap_verifies_and_exposes_official_wheel(tmp_path, monkeypatch):
    source = tmp_path / "source.whl"
    digest = _write_test_wheel(source)
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")
    monkeypatch.setattr(bootstrap_module, "BEATNET_WHEEL_SHA256", digest)
    monkeypatch.setattr(importlib.util, "find_spec", lambda name: None if name == "BeatNet" else importlib.util.find_spec(name))

    def copy_download(_url, destination):
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(source.read_bytes())
        return destination

    monkeypatch.setattr(bootstrap_module, "_download", copy_download)
    runtime = bootstrap_module.ensure_beatnet_runtime(install=True)

    assert (runtime / "BeatNet" / "BeatNet.py").is_file()
    assert (runtime / "BeatNet" / "models" / "model_1_weights.pt").is_file()
    assert "sha256=" + digest in (runtime / ".stemlab_ready").read_text(encoding="utf-8")
    assert str(runtime) in sys.path
    sys.path.remove(str(runtime))


def test_beatnet_bootstrap_rejects_checksum_mismatch(tmp_path, monkeypatch):
    source = tmp_path / "source.whl"
    _write_test_wheel(source)
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")
    monkeypatch.setattr(bootstrap_module, "BEATNET_WHEEL_SHA256", "0" * 64)
    monkeypatch.setattr(importlib.util, "find_spec", lambda name: None if name == "BeatNet" else importlib.util.find_spec(name))

    def copy_download(_url, destination):
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(source.read_bytes())
        return destination

    monkeypatch.setattr(bootstrap_module, "_download", copy_download)
    with pytest.raises(RuntimeError, match="checksum mismatch"):
        bootstrap_module.ensure_beatnet_runtime(install=True)
    assert not (tmp_path / "cache" / "downloads" / "BeatNet-1.1.3-py3-none-any.whl").exists()


def test_beatnet_bootstrap_respects_no_bootstrap(tmp_path, monkeypatch):
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")
    monkeypatch.setattr(importlib.util, "find_spec", lambda name: None if name == "BeatNet" else importlib.util.find_spec(name))

    with pytest.raises(RuntimeError, match="stemlab bootstrap beatnet"):
        bootstrap_module.ensure_beatnet_runtime(install=False)
