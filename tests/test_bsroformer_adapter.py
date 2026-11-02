from __future__ import annotations

import sys
import types

import pytest

import stemlab.separators.bsroformer as bsroformer
from stemlab.separators.bsroformer import BSRoformerBackend, _validate_model_hardware


def test_session_routes_upstream_models_into_stemlab_cache(monkeypatch, tmp_path):
    captured = {}

    class FakeSession:
        def __init__(self, *, model_name=None, models_dir=None, device=None):
            captured.update(model_name=model_name, models_dir=models_dir, device=device)

    monkeypatch.setitem(
        sys.modules,
        "bs_roformer",
        types.SimpleNamespace(BSRoformerSession=FakeSession),
    )
    monkeypatch.setattr(bsroformer, "BS_ROFORMER_MODELS_DIR", tmp_path / "bs-roformer")

    session = BSRoformerBackend()._session("registry-model", "cpu")

    assert isinstance(session, FakeSession)
    assert captured == {
        "model_name": "registry-model",
        "models_dir": str(tmp_path / "bs-roformer"),
        "device": "cpu",
    }


def test_mega53_rejects_cuda_device_below_upstream_vram_minimum():
    with pytest.raises(RuntimeError, match=r"at least 16 GiB.*detected 8\.0 GiB"):
        _validate_model_hardware(
            "mvsep_mega53",
            "cuda",
            cuda_total_bytes=8 * 1024**3,
        )


def test_mega53_accepts_cuda_device_at_upstream_vram_minimum():
    _validate_model_hardware(
        "mvsep_mega53",
        "cuda",
        cuda_total_bytes=16 * 1024**3,
    )


def test_other_roformer_model_is_not_subject_to_mega53_limit():
    _validate_model_hardware(
        "bs_roformer_sw",
        "cuda",
        cuda_total_bytes=8 * 1024**3,
    )
