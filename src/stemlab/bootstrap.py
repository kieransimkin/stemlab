from __future__ import annotations

import os
import importlib
import importlib.util
import shutil
import subprocess
import sys
import urllib.request
import venv
import zipfile
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

# BeatNet 1.1.3's wheel contains usable modern-Python inference code and model
# weights, but its published metadata hard-pins NumPy <1.21 / Numba 0.54.1.
# Those pins cannot coexist with the maintained madmom-prebuilt wheels. Fetch
# and verify the official pure-Python wheel, then expose only its BeatNet package
# from StemLab's cache so obsolete dependency metadata never reaches a resolver.
BEATNET_VERSION = "1.1.3"
BEATNET_WHEEL_URL = (
    "https://files.pythonhosted.org/packages/67/c7/"
    "3ece1b101a1f841655b76322ea9fafe64591a711cb3d99dc52ded06eaa11/"
    "BeatNet-1.1.3-py3-none-any.whl"
)
BEATNET_WHEEL_SHA256 = "1ecfa17bdcbe899975a88bdb6efebd6970d846a4f3b6cfd5c6f320647c641c7e"


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


def ensure_beatnet_runtime(install: bool = True) -> Path:
    """Expose BeatNet without resolving its obsolete published dependencies."""
    installed = importlib.util.find_spec("BeatNet")
    if installed is not None:
        locations = installed.submodule_search_locations
        return Path(next(iter(locations))).parent if locations else Path(installed.origin).parent

    root = CACHE_ROOT / "beatnet" / BEATNET_VERSION
    package = root / "BeatNet"
    marker = root / ".stemlab_ready"
    if not ((package / "BeatNet.py").is_file() and marker.is_file()):
        if not install:
            raise RuntimeError(
                "BeatNet runtime is not bootstrapped. Install StemLab's beats extra, then run "
                "`stemlab bootstrap beatnet`."
            )
        wheel = CACHE_ROOT / "downloads" / f"BeatNet-{BEATNET_VERSION}-py3-none-any.whl"
        _download(BEATNET_WHEEL_URL, wheel)
        actual_sha256 = sha256_file(wheel)
        if actual_sha256 != BEATNET_WHEEL_SHA256:
            wheel.unlink(missing_ok=True)
            raise RuntimeError(
                "BeatNet wheel checksum mismatch: "
                f"expected {BEATNET_WHEEL_SHA256}, got {actual_sha256}; removed cached file"
            )

        root.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(wheel) as archive:
            members = [m for m in archive.infolist() if m.filename.startswith("BeatNet/")]
            if not any(m.filename == "BeatNet/BeatNet.py" for m in members):
                raise RuntimeError("Verified BeatNet wheel does not contain BeatNet/BeatNet.py")
            for member in members:
                relative = Path(*member.filename.split("/"))
                target = (root / relative).resolve()
                if root.resolve() not in target.parents and target != root.resolve():
                    raise RuntimeError(f"Unsafe path in BeatNet wheel: {member.filename}")
                if member.is_dir():
                    target.mkdir(parents=True, exist_ok=True)
                    continue
                target.parent.mkdir(parents=True, exist_ok=True)
                with archive.open(member) as source, target.open("wb") as destination:
                    shutil.copyfileobj(source, destination)
        marker.write_text(
            f"version={BEATNET_VERSION}\nurl={BEATNET_WHEEL_URL}\nsha256={actual_sha256}\n",
            encoding="utf-8",
        )

    root_text = str(root)
    if root_text not in sys.path:
        sys.path.insert(0, root_text)
        importlib.invalidate_caches()
    return root


def bootstrap(name: str) -> dict:
    if name == "scnet":
        r = ensure_scnet_runtime(True)
        return {"repo": str(r.repo), "python": str(r.python), "config": str(r.config), "checkpoint": str(r.checkpoint)}
    if name in {"beat-transformer", "beat_transformer"}:
        repo = ensure_beat_transformer_repo(True)
        return {"repo": str(repo)}
    if name in {"beatnet", "beat-net"}:
        runtime = ensure_beatnet_runtime(True)
        return {
            "runtime": str(runtime),
            "version": BEATNET_VERSION,
            "source": BEATNET_WHEEL_URL,
            "sha256": BEATNET_WHEEL_SHA256,
        }
    if name in {"vamp", "vamp-pack", "vamp_plugin_pack"}:
        # Import lazily so the Vamp runtime can reuse CACHE_ROOT/_download from
        # this module without creating a module-import cycle.
        from .vamp_runtime import bootstrap_vamp

        return bootstrap_vamp()
    if name == "all":
        return {
            "scnet": bootstrap("scnet"),
            "beatnet": bootstrap("beatnet"),
            "beat_transformer": bootstrap("beat-transformer"),
            "vamp": bootstrap("vamp"),
        }
    raise ValueError(f"Unknown bootstrap target: {name}")
