from __future__ import annotations

import time
from pathlib import Path

from stemlab.bootstrap import ensure_scnet_runtime
from stemlab.types import SeparationResult
from stemlab.util import run_checked
from .base import SeparatorBackend
from .common import collect_wavs


class SCNetBackend(SeparatorBackend):
    def __init__(self, bootstrap_external: bool = True):
        self.bootstrap_external = bootstrap_external

    def separate(self, input_wav: Path, output_dir: Path, model_slug: str, device: str) -> SeparationResult:
        start = time.perf_counter()
        try:
            runtime = ensure_scnet_runtime(install=self.bootstrap_external)
            output_dir.mkdir(parents=True, exist_ok=True)
            input_dir = output_dir.parent / ".scnet_input"
            input_dir.mkdir(parents=True, exist_ok=True)
            link = input_dir / input_wav.name
            if not link.exists():
                try:
                    link.symlink_to(input_wav.resolve())
                except OSError:
                    import shutil
                    shutil.copy2(input_wav, link)
            cmd = [
                str(runtime.python), str(runtime.repo / "inference.py"),
                "--model_type", "scnet",
                "--config_path", str(runtime.config),
                "--start_check_point", str(runtime.checkpoint),
                "--input_folder", str(input_dir),
                "--store_dir", str(output_dir),
            ]
            # MSST accepts device_ids in most recent releases; CPU is selected by an empty/no CUDA env.
            env = {}
            if device.startswith("cuda"):
                idx = device.split(":", 1)[1] if ":" in device else "0"
                cmd += ["--device_ids", idx]
            elif device == "cpu":
                env["CUDA_VISIBLE_DEVICES"] = ""
            run_checked(cmd, cwd=runtime.repo, env=env)
            artifacts = collect_wavs(output_dir, model_slug)
            if not artifacts:
                raise RuntimeError("SCNet completed without producing WAV files")
            return SeparationResult(
                model_slug,
                artifacts,
                time.perf_counter() - start,
                metadata={"repo": str(runtime.repo), "checkpoint": str(runtime.checkpoint)},
            )
        except Exception as exc:
            return SeparationResult(model_slug, elapsed_seconds=time.perf_counter() - start, error=f"{type(exc).__name__}: {exc}")
