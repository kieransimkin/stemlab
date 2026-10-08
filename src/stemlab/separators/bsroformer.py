from __future__ import annotations

import inspect
import shutil
import tempfile
import time
from pathlib import Path

from stemlab.models import BS_ROFORMER_IDS
from stemlab.types import SeparationResult
from stemlab.util import device_string
from .base import SeparatorBackend
from .common import collect_wavs


MVSep_MEGA53_MINIMUM_CUDA_BYTES = 16 * 1024**3


def _validate_model_hardware(
    model_slug: str,
    device: str,
    *,
    cuda_total_bytes: int | None = None,
) -> None:
    """Reject a known-impossible Mega53 CUDA run before it can exhaust VRAM."""
    resolved_device = device_string(device)
    if model_slug != "mvsep_mega53" or resolved_device != "cuda":
        return
    if cuda_total_bytes is None:
        import torch

        cuda_total_bytes = int(torch.cuda.get_device_properties(torch.cuda.current_device()).total_memory)
    if cuda_total_bytes < MVSep_MEGA53_MINIMUM_CUDA_BYTES:
        detected_gib = cuda_total_bytes / 1024**3
        raise RuntimeError(
            "MVSep-MDX23C/Mega53 requires at least 16 GiB of CUDA VRAM according to "
            f"the upstream model guidance; detected {detected_gib:.1f} GiB. "
            "The backend is unavailable on this GPU and inference was not attempted."
        )


class BSRoformerBackend(SeparatorBackend):
    """Version-tolerant adapter for openmirlab/bs-roformer-infer.

    The upstream package has a stable session API but model-selection keywords have evolved.
    We inspect the installed signature so this adapter works across compatible releases.
    """

    def _session(self, model_id: str, device: str):
        from bs_roformer import BSRoformerSession

        sig = inspect.signature(BSRoformerSession)
        kwargs = {}
        params = sig.parameters
        if "device" in params:
            dev = device_string(device)
            kwargs["device"] = "cpu" if dev == "mps" else dev
        for key in ("model_name", "model_slug", "model_id", "model"):
            if key in params:
                kwargs[key] = model_id
                break
        else:
            # New/alternate versions can be driven through resolved explicit assets.
            from bs_roformer import ensure_model_assets
            ckpt, cfg = ensure_model_assets(model_id)
            if "model_path" in params:
                kwargs["model_path"] = str(ckpt)
            if "config_path" in params:
                kwargs["config_path"] = str(cfg)
        return BSRoformerSession(**kwargs)

    def separate(self, input_wav: Path, output_dir: Path, model_slug: str, device: str) -> SeparationResult:
        start = time.perf_counter()
        try:
            model_id = BS_ROFORMER_IDS[model_slug]
            _validate_model_hardware(model_slug, device)
            output_dir.mkdir(parents=True, exist_ok=True)
            with tempfile.TemporaryDirectory(prefix="stemlab-roformer-") as td:
                inp = Path(td) / input_wav.name
                try:
                    inp.symlink_to(input_wav.resolve())
                except OSError:
                    shutil.copy2(input_wav, inp)
                session = self._session(model_id, device)
                with session:
                    # The session context manager owns the upstream load/release lifecycle.
                    session.infer(str(Path(td)), store_dir=str(output_dir))
            artifacts = collect_wavs(output_dir, model_slug)
            if not artifacts:
                raise RuntimeError("BS-RoFormer completed without producing WAV files")
            return SeparationResult(
                model_slug,
                artifacts,
                time.perf_counter() - start,
                metadata={"registry_model": model_id},
            )
        except Exception as exc:
            return SeparationResult(model_slug, elapsed_seconds=time.perf_counter() - start, error=f"{type(exc).__name__}: {exc}")
