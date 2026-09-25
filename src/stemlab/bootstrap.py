from __future__ import annotations

import os
import shutil
import subprocess
import urllib.request
import venv
from dataclasses import dataclass
from pathlib import Path

from platformdirs import user_cache_dir

from .util import sha256_file

CACHE_ROOT = Path(os.environ.get("STEMLAB_CACHE", user_cache_dir("stemlab")))

SCNET_REPO = "https://github.com/ZFTurbo/Music-Source-Separation-Training.git"
SCNET_REF = "v1.0.15"
SCNET_CONFIG_URL = "https://github.com/ZFTurbo/Music-Source-Separation-Training/releases/download/v1.0.15/config_musdb18_scnet_xl_more_wide_v5.yaml"
SCNET_CHECKPOINT_URL = "https://github.com/ZFTurbo/Music-Source-Separation-Training/releases/download/v1.0.15/model_scnet_ep_36_sdr_10.0891.ckpt"

BEAT_TRANSFORMER_REPO = "https://github.com/zhaojw1998/Beat-Transformer.git"
BEAT_TRANSFORMER_REF = "master"


@dataclass(frozen=True)
class SCNetRuntime:
    repo: Path
    python: Path
    config: Path
    checkpoint: Path


def _download(url: str, path: Path) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists() and path.stat().st_size > 0:
        return path
    tmp = path.with_suffix(path.suffix + ".part")
    with urllib.request.urlopen(url) as r, tmp.open("wb") as f:
        shutil.copyfileobj(r, f, 1024 * 1024)
    tmp.replace(path)
    return path


def _clone(repo_url: str, ref: str, dest: Path) -> Path:
    if (dest / ".git").exists():
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            ["git", "clone", "--depth", "1", "--branch", ref, repo_url, str(dest)],
            check=True,
        )
    except subprocess.CalledProcessError:
        # Release tags vary between repos; fallback still leaves provenance in the manifest.
        if dest.exists():
            shutil.rmtree(dest)
        subprocess.run(["git", "clone", "--depth", "1", repo_url, str(dest)], check=True)
    return dest


def ensure_scnet_runtime(install: bool = True) -> SCNetRuntime:
    root = CACHE_ROOT / "scnet-xl-ihf"
    repo = root / "repo"
    env_dir = root / "venv"
    assets = root / "assets"
    config = assets / "config_musdb18_scnet_xl_more_wide_v5.yaml"
    checkpoint = assets / "model_scnet_ep_36_sdr_10.0891.ckpt"
    if install:
        _clone(SCNET_REPO, SCNET_REF, repo)
        _download(SCNET_CONFIG_URL, config)
        _download(SCNET_CHECKPOINT_URL, checkpoint)
        if os.name == "nt":
            py = env_dir / "Scripts" / "python.exe"
        else:
            py = env_dir / "bin" / "python"
        marker = env_dir / ".stemlab_ready"
        if not marker.exists():
            # Use system packages where possible so an existing CUDA torch install is reused.
            builder = venv.EnvBuilder(with_pip=True, system_site_packages=True)
            builder.create(env_dir)
            req = repo / "requirements.txt"
            if req.exists():
                subprocess.run([str(py), "-m", "pip", "install", "-r", str(req)], check=True)
            marker.write_text(
                f"config_sha256={sha256_file(config)}\ncheckpoint_sha256={sha256_file(checkpoint)}\n",
                encoding="utf-8",
            )
    if os.name == "nt":
        py = env_dir / "Scripts" / "python.exe"
    else:
        py = env_dir / "bin" / "python"
    missing = [p for p in (repo / "inference.py", py, config, checkpoint) if not p.exists()]
    if missing:
        raise RuntimeError(
            "SCNet runtime is not bootstrapped. Run `stemlab bootstrap scnet` first; missing: "
            + ", ".join(map(str, missing))
        )
    return SCNetRuntime(repo, py, config, checkpoint)


def ensure_beat_transformer_repo(install: bool = True) -> Path:
    repo = CACHE_ROOT / "beat-transformer" / "repo"
    if install:
        _clone(BEAT_TRANSFORMER_REPO, BEAT_TRANSFORMER_REF, repo)
    checkpoints = repo / "checkpoint"
    if not checkpoints.exists():
        checkpoints = repo / "checkpoints"
    if not (repo / "code" / "DilatedTransformer.py").exists() or not checkpoints.exists():
        raise RuntimeError("Beat Transformer runtime is missing. Run `stemlab bootstrap beat-transformer`.")
    return repo


def bootstrap(name: str) -> dict:
    if name == "scnet":
        r = ensure_scnet_runtime(True)
        return {"repo": str(r.repo), "python": str(r.python), "config": str(r.config), "checkpoint": str(r.checkpoint)}
    if name in {"beat-transformer", "beat_transformer"}:
        repo = ensure_beat_transformer_repo(True)
        return {"repo": str(repo)}
    if name in {"vamp", "vamp-pack", "vamp_plugin_pack"}:
        # Import lazily so the Vamp runtime can reuse CACHE_ROOT/_download from
        # this module without creating a module-import cycle.
        from .vamp_runtime import bootstrap_vamp

        return bootstrap_vamp()
    if name == "all":
        return {
            "scnet": bootstrap("scnet"),
            "beat_transformer": bootstrap("beat-transformer"),
            "vamp": bootstrap("vamp"),
        }
    raise ValueError(f"Unknown bootstrap target: {name}")
