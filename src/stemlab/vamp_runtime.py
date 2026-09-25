from __future__ import annotations

import os
import shutil
import subprocess
import sys
import tarfile
import zipfile
from dataclasses import dataclass
from pathlib import Path

from .bootstrap import CACHE_ROOT, _download

SONIC_ANNOTATOR_VERSION = "1.7"
VAMP_PLUGIN_PACK_VERSION = "2.0"

SONIC_ANNOTATOR_URLS = {
    "windows": (
        "https://github.com/sonic-visualiser/sonic-annotator/releases/download/"
        "sonic-annotator-1.7/sonic-annotator-1.7-win64.zip"
    ),
    "linux": (
        "https://github.com/sonic-visualiser/sonic-annotator/releases/download/"
        "sonic-annotator-1.7/sonic-annotator-1.7.0-linux64-static.tar.gz"
    ),
    "macos": (
        "https://github.com/sonic-visualiser/sonic-annotator/releases/download/"
        "sonic-annotator-1.7/sonic-annotator-1.7.0-macos.tar.gz"
    ),
}

VAMP_PLUGIN_PACK_URLS = {
    "windows": (
        "https://github.com/vamp-plugins/vamp-plugin-pack/releases/download/"
        "v2.0/Vamp.Plugin.Pack.Installer.2.0.exe"
    ),
    "linux": (
        "https://github.com/vamp-plugins/vamp-plugin-pack/releases/download/"
        "v2.0/vamp-plugin-pack-installer-2.0"
    ),
    "macos": (
        "https://github.com/vamp-plugins/vamp-plugin-pack/releases/download/"
        "v2.0/Vamp.Plugin.Pack.Installer-2.0.dmg"
    ),
}

# Outputs used by StemLab. Missing outputs are reported individually, so a
# partial Vamp installation can still provide useful analysis.
VAMP_REQUIRED_OUTPUTS = (
    "vamp:nnls-chroma:chordino:simplechord",
    "vamp:nnls-chroma:chordino:harmonicchange",
    "vamp:nnls-chroma:nnls-chroma:chroma",
    "vamp:nnls-chroma:nnls-chroma:basschroma",
    "vamp:nnls-chroma:tuning:tuning",
    "vamp:qm-vamp-plugins:qm-keydetector:key",
    "vamp:qm-vamp-plugins:qm-tonalchange:changepositions",
    "vamp:pyin:pyin:smoothedpitchtrack",
    "vamp:pyin:pyin:notes",
    "vamp:silvet:silvet:notes",
    "vamp:segmentino:segmentino:segmentation",
    "vamp:qm-vamp-plugins:qm-barbeattracker:beats",
    "vamp:qm-vamp-plugins:qm-barbeattracker:bars",
)


@dataclass(frozen=True)
class VampRuntime:
    annotator: Path
    available_outputs: frozenset[str]
    missing_outputs: tuple[str, ...]


def _platform_key() -> str:
    if os.name == "nt":
        return "windows"
    if sys.platform == "darwin":
        return "macos"
    if sys.platform.startswith("linux"):
        return "linux"
    raise RuntimeError(f"Unsupported platform for bundled Sonic Annotator: {sys.platform}")


def _find_annotator(root: Path) -> Path | None:
    names = ("sonic-annotator.exe",) if os.name == "nt" else ("sonic-annotator",)
    for name in names:
        for candidate in root.rglob(name):
            if candidate.is_file():
                return candidate
    return None


def _extract_archive(archive: Path, destination: Path) -> None:
    destination.mkdir(parents=True, exist_ok=True)
    lower = archive.name.lower()
    if lower.endswith(".zip"):
        with zipfile.ZipFile(archive) as zf:
            zf.extractall(destination)
        return
    if lower.endswith(".tar.gz") or lower.endswith(".tgz"):
        # This is an official, pinned upstream release archive.
        with tarfile.open(archive, "r:gz") as tf:
            tf.extractall(destination)
        return
    raise RuntimeError(f"Unsupported Sonic Annotator archive: {archive}")


def ensure_sonic_annotator(install: bool = True) -> Path:
    """Return a Sonic Annotator executable, downloading the pinned binary if needed."""
    for name in ("sonic-annotator", "sonic-annotator.exe"):
        found = shutil.which(name)
        if found:
            return Path(found)

    root = CACHE_ROOT / "vamp" / f"sonic-annotator-{SONIC_ANNOTATOR_VERSION}"
    existing = _find_annotator(root) if root.exists() else None
    if existing:
        return existing

    if not install:
        raise RuntimeError(
            "Sonic Annotator is not available. Run `stemlab bootstrap vamp` first."
        )

    key = _platform_key()
    url = SONIC_ANNOTATOR_URLS[key]
    suffix = ".zip" if key == "windows" else ".tar.gz"
    archive = _download(url, CACHE_ROOT / "vamp" / "downloads" / f"sonic-annotator-{SONIC_ANNOTATOR_VERSION}{suffix}")
    _extract_archive(archive, root)
    executable = _find_annotator(root)
    if executable is None:
        raise RuntimeError(f"Sonic Annotator was downloaded but no executable was found under {root}")
    if os.name != "nt":
        executable.chmod(executable.stat().st_mode | 0o111)
    return executable


def list_vamp_outputs(annotator: Path) -> frozenset[str]:
    proc = subprocess.run(
        [str(annotator), "-l"],
        check=True,
        text=True,
        capture_output=True,
    )
    return frozenset(
        line.strip()
        for line in proc.stdout.splitlines()
        if line.strip().startswith("vamp:")
    )


def ensure_vamp_runtime(install_annotator: bool = True) -> VampRuntime:
    """Probe Sonic Annotator and the currently installed Vamp plugins.

    This function never launches the interactive Vamp Plugin Pack installer.
    Pipeline runs therefore remain non-interactive. Use ``stemlab bootstrap
    vamp`` for the one-time plugin installation UI.
    """
    annotator = ensure_sonic_annotator(install=install_annotator)
    outputs = list_vamp_outputs(annotator)
    missing = tuple(output for output in VAMP_REQUIRED_OUTPUTS if output not in outputs)
    return VampRuntime(annotator, outputs, missing)


def _plugin_pack_filename() -> str:
    key = _platform_key()
    if key == "windows":
        return f"Vamp.Plugin.Pack.Installer.{VAMP_PLUGIN_PACK_VERSION}.exe"
    if key == "macos":
        return f"Vamp.Plugin.Pack.Installer-{VAMP_PLUGIN_PACK_VERSION}.dmg"
    return f"vamp-plugin-pack-installer-{VAMP_PLUGIN_PACK_VERSION}"


def download_vamp_plugin_pack() -> Path:
    key = _platform_key()
    path = CACHE_ROOT / "vamp" / "downloads" / _plugin_pack_filename()
    return _download(VAMP_PLUGIN_PACK_URLS[key], path)


def _launch_plugin_pack_installer(installer: Path) -> str:
    key = _platform_key()
    if key == "windows":
        # The official Plugin Pack installer carries a requireAdministrator
        # manifest. Launching it directly with subprocess therefore raises
        # WinError 740 from a normal (non-elevated) StemLab shell. Ask Windows
        # to elevate it through the Shell "runas" verb instead, wait for the
        # installer to finish, and make cancellation/failure visible to the
        # caller through PowerShell's exit status.
        escaped = str(installer).replace("'", "''")
        script = (
            "$ErrorActionPreference='Stop'; "
            f"Start-Process -FilePath '{escaped}' -Verb RunAs -Wait"
        )
        subprocess.run(
            ["powershell.exe", "-NoProfile", "-NonInteractive", "-Command", script],
            check=True,
        )
        return "completed"
    if key == "linux":
        installer.chmod(installer.stat().st_mode | 0o111)
        subprocess.run([str(installer)], check=True)
        return "completed"

    # The macOS distribution is a DMG. Open it and let Finder present the
    # signed installer. We cannot know when the user has completed it.
    subprocess.run(["open", str(installer)], check=True)
    return "opened-dmg"


def bootstrap_vamp() -> dict:
    """Download Sonic Annotator and run the official Vamp Plugin Pack installer."""
    annotator = ensure_sonic_annotator(install=True)
    outputs = list_vamp_outputs(annotator)
    missing_before = tuple(output for output in VAMP_REQUIRED_OUTPUTS if output not in outputs)

    installer: Path | None = None
    installer_status = "not-needed"
    if missing_before:
        installer = download_vamp_plugin_pack()
        installer_status = _launch_plugin_pack_installer(installer)
        if installer_status == "completed":
            outputs = list_vamp_outputs(annotator)

    missing_after = tuple(output for output in VAMP_REQUIRED_OUTPUTS if output not in outputs)
    return {
        "sonic_annotator": str(annotator),
        "sonic_annotator_version": SONIC_ANNOTATOR_VERSION,
        "plugin_pack_version": VAMP_PLUGIN_PACK_VERSION,
        "plugin_pack_installer": str(installer) if installer else None,
        "installer_status": installer_status,
        "available_output_count": len(outputs),
        "missing_before": list(missing_before),
        "missing_after": list(missing_after),
        "ready": not missing_after,
        "note": (
            "On macOS, complete the installer from the opened DMG and run "
            "`stemlab bootstrap vamp` again to verify installation."
            if installer_status == "opened-dmg"
            else None
        ),
    }


def probe_vamp_runtime() -> dict:
    try:
        runtime = ensure_vamp_runtime(install_annotator=False)
    except Exception as exc:
        return {"ready": False, "error": str(exc), "annotator": None, "missing": list(VAMP_REQUIRED_OUTPUTS)}
    return {
        "ready": not runtime.missing_outputs,
        "annotator": str(runtime.annotator),
        "available_output_count": len(runtime.available_outputs),
        "missing": list(runtime.missing_outputs),
    }
