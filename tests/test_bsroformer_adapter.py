from __future__ import annotations

import pytest

from stemlab.separators.bsroformer import _validate_model_hardware


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
