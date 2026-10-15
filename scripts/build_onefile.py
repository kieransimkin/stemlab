"""Build StemLab's Linux one-file CLI with PyInstaller.

This is a distribution bundle, not an ahead-of-time optimization build. Heavy
ML libraries stay as Python/native modules inside the executable rather than
being translated into a huge C compilation unit.
"""
from __future__ import annotations

import argparse
import importlib.metadata
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

# Packages with runtime/dynamic imports that PyInstaller cannot safely infer
# only from StemLab's lazy import paths.
COLLECT_SUBMODULES = (
    "stemlab",
    "demucs",
    "openunmix",
    "bs_roformer",
    "faster_whisper",
    "beat_this",
    "BeatNet",
    "madmom",
    "librosa",
    "pyloudnorm",
    "cmudict",
    "sentence_transformers",
    "allin1_infer",
)

# Packages where non-Python files are part of the runtime contract.
COLLECT_DATA = (
    "stemlab",
    "BeatNet",
    "madmom",
    "bs_roformer",
    "faster_whisper",
    "beat_this",
    "cmudict",
    "allin1_infer",
)

# StemLab's BeatNet compatibility layer asks importlib.metadata for these.
COPY_METADATA = (
    "danceflow-stemlab",
    "madmom-prebuilt",
)


def validate_beatnet_runtime(runtime: Path) -> Path:
    """Require code and model weights from StemLab's verified upstream wheel."""
    runtime = Path(runtime).resolve()
    package = runtime / "BeatNet"

    required = (
        package / "BeatNet.py",
        package / "models" / "model_1_weights.pt",
    )
    missing = [path for path in required if not path.is_file()]

    if missing:
        raise RuntimeError(
            "Verified BeatNet runtime is incomplete: "
            + ", ".join(path.name for path in missing)
        )

    return runtime


def pyinstaller_command(
    runtime: Path,
    output_dir: Path,
    output_name: str,
) -> tuple[list[str], dict[str, str]]:
    """Return the reproducible PyInstaller command and environment."""
    runtime = validate_beatnet_runtime(runtime)
    output_dir = Path(output_dir).resolve()
    entry = ROOT / "scripts" / "stemlab_onefile_entry.py"

    if not entry.is_file():
        raise FileNotFoundError(entry)

    command = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--noconfirm",
        "--clean",
        "--onefile",
        "--name",
        output_name,
        "--distpath",
        str(output_dir),
        "--workpath",
        str(output_dir / "work"),
        "--specpath",
        str(output_dir / "spec"),
        "--paths",
        str(ROOT / "src"),
        "--paths",
        str(runtime),
        "--exclude-module",
        "pytest",
        "--exclude-module",
        "ruff",
    ]

    for package in COLLECT_SUBMODULES:
        command.extend(("--collect-submodules", package))

    for package in COLLECT_DATA:
        command.extend(("--collect-data", package))

    for distribution in COPY_METADATA:
        command.extend(("--copy-metadata", distribution))

    command.append(str(entry))

    env = dict(os.environ)

    search_paths = [
        str(runtime),
        str(ROOT / "src"),
    ]

    existing = env.get("PYTHONPATH")
    if existing:
        search_paths.append(existing)

    env["PYTHONPATH"] = os.pathsep.join(search_paths)

    return command, env


def build(output_dir: Path, output_name: str) -> Path:
    if sys.version_info < (3, 11):
        raise RuntimeError(
            "The standalone CLI build requires Python 3.11+ "
            "for madmom-prebuilt/BeatNet"
        )

    sys.path.insert(0, str(ROOT / "src"))

    from stemlab.bootstrap import (
        BEATNET_WHEEL_SHA256,
        ensure_beatnet_runtime,
    )

    # This downloads only the official hash-pinned BeatNet wheel if the verified
    # cache is absent. Its obsolete dependency metadata is never installed.
    runtime = validate_beatnet_runtime(
        ensure_beatnet_runtime(install=True)
    )

    output_dir = Path(output_dir).resolve()
    output_dir.mkdir(parents=True, exist_ok=True)

    command, env = pyinstaller_command(
        runtime,
        output_dir,
        output_name,
    )

    print("+", subprocess.list2cmdline(command), flush=True)

    subprocess.run(
        command,
        cwd=ROOT,
        env=env,
        check=True,
    )

    output = output_dir / output_name

    if not output.is_file():
        raise RuntimeError(
            "PyInstaller did not produce the requested one-file executable"
        )

    size = output.stat().st_size

    if size < 10 * 1024 * 1024:
        raise RuntimeError(
            f"PyInstaller output is unexpectedly small: {size} bytes"
        )

    output.chmod(output.stat().st_mode | 0o111)

    info = {
        "schema": "stemlab.onefile-build.v2",
        "backend": "pyinstaller",
        "python": ".".join(map(str, sys.version_info[:3])),
        "pyinstaller": importlib.metadata.version("pyinstaller"),
        "beatnet_wheel_sha256": BEATNET_WHEEL_SHA256,
        "beatnet_runtime": "embedded-from-verified-wheel",
        "output": output.name,
        "bytes": size,
        "collect_submodules": list(COLLECT_SUBMODULES),
        "collect_data": list(COLLECT_DATA),
        "copy_metadata": list(COPY_METADATA),
    }

    (output_dir / "build-info.json").write_text(
        json.dumps(info, indent=2, sort_keys=True) + "\n",
        encoding="utf-8",
    )

    return output


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)

    parser.add_argument(
        "--output-dir",
        type=Path,
        default=Path("build/onefile"),
    )

    parser.add_argument(
        "--output-name",
        default="stemlab-linux-x86_64",
    )

    args = parser.parse_args()

    build(args.output_dir, args.output_name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
