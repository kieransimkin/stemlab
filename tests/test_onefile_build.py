"""Contracts for the standalone one-file build without running Nuitka."""
from __future__ import annotations

import importlib.util
from pathlib import Path
import sys

import pytest
import yaml

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))

spec = importlib.util.spec_from_file_location("build_onefile", ROOT / "scripts/build_onefile.py")
build_onefile = importlib.util.module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(build_onefile)


def beatnet_fixture(tmp_path: Path) -> Path:
    root = tmp_path / "beatnet"
    package = root / "BeatNet"
    (package / "models").mkdir(parents=True)
    (package / "BeatNet.py").write_text("class BeatNet: pass\n", encoding="utf-8")
    (package / "models/model_1_weights.pt").write_bytes(b"weights")
    return root


def test_command_embeds_verified_beatnet_and_madmom_metadata(tmp_path):
    runtime = beatnet_fixture(tmp_path)
    command, env = build_onefile.nuitka_command(runtime, tmp_path / "out", "stemlab-test")
    text = "\n".join(command)
    assert "--onefile" in command
    assert "--include-package=BeatNet" in command
    assert "--include-package=madmom" in command
    assert "--include-package-data=BeatNet" in command
    assert "--include-package-data=madmom" in command
    assert "--include-package-data=stemlab" in command
    assert "--include-distribution-metadata=madmom-prebuilt" in command
    assert Path(command[-1]).name == "stemlab_onefile_entry.py"
    assert env["PYTHONPATH"].split(build_onefile.os.pathsep)[0] == str(runtime.resolve())
    assert "src/stemlab/__main__.py" not in text


def test_command_refuses_runtime_without_model_weights(tmp_path):
    root = tmp_path / "bad"
    (root / "BeatNet").mkdir(parents=True)
    (root / "BeatNet/BeatNet.py").write_text("", encoding="utf-8")
    with pytest.raises(RuntimeError, match="model_1_weights"):
        build_onefile.nuitka_command(root, tmp_path / "out", "stemlab-test")


def test_binary_workflow_is_required_and_uses_python311():
    workflow = yaml.load((ROOT / ".github/workflows/binary.yml").read_text(encoding="utf-8"),
                         Loader=yaml.BaseLoader)
    job = workflow["jobs"]["build"]
    assert job["runs-on"] == "ubuntu-22.04"
    setup = next(step for step in job["steps"] if step.get("uses", "").startswith("actions/setup-python@"))
    assert setup["with"]["python-version"] == "3.11"
    assert int(job["timeout-minutes"]) >= 150
    source = str(workflow)
    assert "build_onefile.py" in source and "check_onefile.py" in source
    assert "stemlab-onefile-linux-x86_64" in source
    assert "https://download.pytorch.org/whl/cpu" in source


def test_release_consumes_validated_binary_and_cannot_silently_fall_back():
    release = (ROOT / ".github/workflows/release.yml").read_text(encoding="utf-8")
    assert "uses: ./.github/workflows/binary.yml" in release
    assert "name: stemlab-onefile-linux-x86_64" in release
    assert "STEMLAB-BINARY-NOTE.txt" not in release
    assert "Build supplemental StemLab one-file CLI" not in release
    assert "python -m nuitka" not in release


def test_release_coordinator_waits_for_main_binary_ci():
    text = (ROOT / "scripts/release_suite.py").read_text(encoding="utf-8")
    assert "'binary.yml'" in text
