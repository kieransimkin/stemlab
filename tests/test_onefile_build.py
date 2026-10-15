"""Contracts for the standalone one-file build without building it locally."""
from __future__ import annotations

import importlib.util
from pathlib import Path
import sys

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

spec = importlib.util.spec_from_file_location(
    "build_onefile",
    ROOT / "scripts/build_onefile.py",
)
build_onefile = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(build_onefile)


def beatnet_fixture(tmp_path: Path) -> Path:
    root = tmp_path / "beatnet"
    package = root / "BeatNet"

    (package / "models").mkdir(parents=True)
    (package / "BeatNet.py").write_text(
        "class BeatNet: pass\n",
        encoding="utf-8",
    )
    (package / "models/model_1_weights.pt").write_bytes(b"weights")

    return root


def test_command_embeds_verified_beatnet_and_madmom_metadata(tmp_path):
    runtime = beatnet_fixture(tmp_path)

    command, env = build_onefile.pyinstaller_command(
        runtime,
        tmp_path / "out",
        "stemlab-test",
    )

    text = "\n".join(command)

    assert "-m" in command
    assert "PyInstaller" in command
    assert "--onefile" in command

    assert "--collect-submodules" in command
    assert "BeatNet" in command
    assert "madmom" in command
    assert "stemlab" in command

    assert "--collect-data" in command
    assert "--copy-metadata" in command
    assert "madmom-prebuilt" in command
    assert "danceflow-stemlab" in command

    assert "--paths" in command
    assert str(runtime.resolve()) in command

    assert Path(command[-1]).name == "stemlab_onefile_entry.py"

    search = env["PYTHONPATH"].split(build_onefile.os.pathsep)
    assert search[0] == str(runtime.resolve())
    assert str((ROOT / "src").resolve()) in search

    assert "nuitka" not in text.casefold()


def test_command_refuses_runtime_without_model_weights(tmp_path):
    root = tmp_path / "bad"
    (root / "BeatNet").mkdir(parents=True)

    (root / "BeatNet/BeatNet.py").write_text(
        "",
        encoding="utf-8",
    )

    with pytest.raises(RuntimeError, match="incomplete"):
        build_onefile.pyinstaller_command(
            root,
            tmp_path / "out",
            "stemlab-test",
        )


def test_binary_workflow_uses_pyinstaller_cpu_torch_and_bounded_timeout():
    workflow = yaml.load(
        (ROOT / ".github/workflows/binary.yml").read_text(encoding="utf-8"),
        Loader=yaml.BaseLoader,
    )

    job = workflow["jobs"]["build"]

    assert job["runs-on"] == "ubuntu-22.04"

    timeout = int(job["timeout-minutes"])
    assert 30 <= timeout <= 90

    setup = next(
        step
        for step in job["steps"]
        if step.get("uses", "").startswith("actions/setup-python@")
    )

    assert setup["with"]["python-version"] == "3.11"

    source = (ROOT / ".github/workflows/binary.yml").read_text(
        encoding="utf-8"
    )

    assert "PyInstaller" in source
    assert "build_onefile.py" in source
    assert "check_onefile.py" in source

    assert "https://download.pytorch.org/whl/cpu" in source

    assert "build/onefile/stemlab-linux-x86_64" in source
    assert "stemlab-onefile-linux-x86_64" in source

    assert "cancel-in-progress: true" in source

    assert "python -m nuitka" not in source
    assert "build/nuitka" not in source


def test_binary_extra_uses_pyinstaller_not_nuitka():
    project = (ROOT / "pyproject.toml").read_text(encoding="utf-8")

    binary = next(
        line
        for line in project.splitlines()
        if line.startswith("binary = ")
    )

    assert "pyinstaller" in binary.casefold()
    assert "nuitka" not in binary.casefold()


def test_release_consumes_validated_binary_and_cannot_silently_fall_back():
    release = (
        ROOT / ".github/workflows/release.yml"
    ).read_text(encoding="utf-8")

    assert "uses: ./.github/workflows/binary.yml" in release

    assert "name: stemlab-onefile-linux-x86_64" in release

    assert "build/onefile/stemlab-linux-x86_64" in release

    assert "STEMLAB-BINARY-NOTE.txt" not in release

    assert "Build supplemental StemLab one-file CLI" not in release

    assert "python -m nuitka" not in release
    assert "build/nuitka" not in release


def test_release_coordinator_waits_for_main_binary_ci():
    text = (ROOT / "scripts/release_suite.py").read_text(
        encoding="utf-8"
    )

    assert "'binary.yml'" in text
