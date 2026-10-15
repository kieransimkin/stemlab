"""Build StemLab's Linux one-file CLI with the verified BeatNet runtime embedded."""
from __future__ import annotations

import argparse
import importlib.metadata
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]

INCLUDE_PACKAGES = (
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
PACKAGE_DATA = (
    "stemlab",
    "BeatNet",
    "madmom",
    "bs_roformer",
    "faster_whisper",
    "beat_this",
    "cmudict",
    "allin1_infer",
)
DISTRIBUTION_METADATA = (
    "danceflow-stemlab",
    "madmom-prebuilt",
)


def validate_beatnet_runtime(runtime: Path) -> Path:
    """Require code and bundled model weights from the checksum-verified wheel."""
    runtime = Path(runtime).resolve()
    package = runtime / "BeatNet"
    model = package / "models" / "model_1_weights.pt"
    if not (package / "BeatNet.py").is_file() or not model.is_file():
        raise RuntimeError(
            "Verified BeatNet runtime is incomplete; expected BeatNet.py and model_1_weights.pt"
        )
    return runtime


def nuitka_command(runtime: Path, output_dir: Path, output_name: str) -> tuple[list[str], dict[str, str]]:
    """Return the exact reproducible Nuitka command/environment."""
    runtime = validate_beatnet_runtime(runtime)
    output_dir = Path(output_dir)
    entry = ROOT / "scripts" / "stemlab_onefile_entry.py"
    if not entry.is_file():
        raise FileNotFoundError(entry)

    command = [
        sys.executable,
        "-m",
        "nuitka",
        "--onefile",
        "--assume-yes-for-downloads",
        f"--output-dir={output_dir}",
        f"--output-filename={output_name}",
        "--nofollow-import-to=*.tests",
    ]
    command.extend(f"--include-package={name}" for name in INCLUDE_PACKAGES)
    command.extend(f"--include-package-data={name}" for name in PACKAGE_DATA)
    command.extend(
        f"--include-distribution-metadata={name}" for name in DISTRIBUTION_METADATA
    )
    command.append(str(entry))

    env = dict(os.environ)
    existing = env.get("PYTHONPATH")
    env["PYTHONPATH"] = str(runtime) + (os.pathsep + existing if existing else "")
    return command, env


def build(output_dir: Path, output_name: str) -> Path:
    if sys.version_info < (3, 11):
        raise RuntimeError("The standalone CLI build requires Python 3.11+ for madmom-prebuilt/BeatNet")

    sys.path.insert(0, str(ROOT / "src"))
    from stemlab.bootstrap import BEATNET_WHEEL_SHA256, ensure_beatnet_runtime

    runtime = validate_beatnet_runtime(ensure_beatnet_runtime(install=True))
    command, env = nuitka_command(runtime, output_dir, output_name)
    output_dir.mkdir(parents=True, exist_ok=True)

    print("+", subprocess.list2cmdline(command), flush=True)
    subprocess.run(command, cwd=ROOT, env=env, check=True)

    output = (output_dir / output_name).resolve()
    if not output.is_file() or output.stat().st_size < 10 * 1024 * 1024:
        raise RuntimeError("Nuitka did not produce a plausible one-file executable")
    output.chmod(output.stat().st_mode | 0o111)

    info = {
        "schema": "stemlab.onefile-build.v1",
        "python": ".".join(map(str, sys.version_info[:3])),
        "nuitka": importlib.metadata.version("nuitka"),
        "beatnet_wheel_sha256": BEATNET_WHEEL_SHA256,
        "beatnet_runtime": "embedded-from-verified-wheel",
        "output": output.name,
        "bytes": output.stat().st_size,
        "packages": list(INCLUDE_PACKAGES),
        "package_data": list(PACKAGE_DATA),
        "distribution_metadata": list(DISTRIBUTION_METADATA),
    }
    (output_dir / "build-info.json").write_text(
        json.dumps(info, indent=2, sort_keys=True) + "\n", encoding="utf-8"
    )
    return output


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output-dir", type=Path, default=Path("build/nuitka"))
    parser.add_argument("--output-name", default="stemlab-linux-x86_64")
    args = parser.parse_args()
    build(args.output_dir, args.output_name)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
