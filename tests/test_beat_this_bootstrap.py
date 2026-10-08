from __future__ import annotations

import hashlib

import pytest

from stemlab import bootstrap as bootstrap_module


def test_beat_this_bootstrap_downloads_and_verifies_checkpoint(tmp_path, monkeypatch):
    source = tmp_path / "final0.ckpt"
    source.write_bytes(b"verified beat-this checkpoint")
    digest = hashlib.sha256(source.read_bytes()).hexdigest()
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")
    monkeypatch.setattr(bootstrap_module, "BEAT_THIS_CHECKPOINT_SHA256", digest)

    def copy_download(_url, destination):
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(source.read_bytes())
        return destination

    monkeypatch.setattr(bootstrap_module, "_download", copy_download)
    checkpoint = bootstrap_module.ensure_beat_this_checkpoint(install=True)

    assert checkpoint.read_bytes() == source.read_bytes()
    assert checkpoint == (
        tmp_path
        / "cache"
        / "beat-this"
        / bootstrap_module.BEAT_THIS_VERSION
        / "beat_this-final0.ckpt"
    )


def test_beat_this_bootstrap_rejects_checksum_mismatch(tmp_path, monkeypatch):
    source = tmp_path / "final0.ckpt"
    source.write_bytes(b"wrong checkpoint")
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")
    monkeypatch.setattr(bootstrap_module, "BEAT_THIS_CHECKPOINT_SHA256", "0" * 64)

    def copy_download(_url, destination):
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(source.read_bytes())
        return destination

    monkeypatch.setattr(bootstrap_module, "_download", copy_download)
    with pytest.raises(RuntimeError, match="checksum mismatch"):
        bootstrap_module.ensure_beat_this_checkpoint(install=True)
    assert not (
        tmp_path
        / "cache"
        / "beat-this"
        / bootstrap_module.BEAT_THIS_VERSION
        / "beat_this-final0.ckpt"
    ).exists()


def test_beat_this_bootstrap_respects_no_bootstrap(tmp_path, monkeypatch):
    monkeypatch.setattr(bootstrap_module, "CACHE_ROOT", tmp_path / "cache")

    with pytest.raises(RuntimeError, match="stemlab bootstrap beat-this"):
        bootstrap_module.ensure_beat_this_checkpoint(install=False)
