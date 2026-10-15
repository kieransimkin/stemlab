"""Runtime smoke checks for StemLab's actual one-file executable."""
from __future__ import annotations

import argparse
import os
from pathlib import Path
import subprocess
import tempfile


def run(binary: Path, *args: str, cache: Path, timeout: int = 180) -> str:
    env = dict(os.environ)
    env.update(
        STEMLAB_CACHE=str(cache),
        XDG_CACHE_HOME=str(cache / "xdg"),
        NO_COLOR="1",
        TERM="dumb",
    )
    result = subprocess.run(
        [str(binary), *args],
        check=False,
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        env=env,
        timeout=timeout,
    )
    if result.returncode:
        raise RuntimeError(
            f"Standalone CLI {' '.join(args)} failed with {result.returncode}:\n{result.stdout[-8000:]}"
        )
    return result.stdout


def check(binary: Path) -> dict:
    binary = Path(binary).resolve()
    if not binary.is_file():
        raise FileNotFoundError(binary)
    size = binary.stat().st_size
    if size < 10 * 1024 * 1024:
        raise ValueError("Standalone CLI is unexpectedly small")
    if size >= 1900 * 1024 * 1024:
        raise ValueError("Standalone CLI is too large for a practical GitHub release asset")

    with tempfile.TemporaryDirectory(prefix="stemlab-onefile-smoke-") as folder:
        cache = Path(folder)
        help_text = run(binary, "--help", cache=cache)
        if "Usage" not in help_text or "StemLab" not in help_text:
            raise RuntimeError("Standalone CLI help output is incomplete")

        models = run(binary, "models", cache=cache)
        if "htdemucs" not in models.casefold():
            raise RuntimeError("Standalone CLI cannot load StemLab's model registry")

        doctor = run(binary, "doctor", cache=cache)
        if "BeatNet" not in doctor or "ready (installed or verified StemLab cache)" not in doctor:
            raise RuntimeError(
                "Standalone CLI does not contain the verified BeatNet runtime/model weights"
            )

    return {
        "status": "passed",
        "bytes": size,
        "help": True,
        "models": True,
        "embedded_beatnet": True,
        "external_cache_required": False,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("binary", type=Path)
    args = parser.parse_args()
    print(check(args.binary))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
