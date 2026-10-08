from __future__ import annotations

from pathlib import Path

from stemlab.models import MODEL_REGISTRY


ROOT = Path(__file__).resolve().parents[1]


def test_docker_uses_python_311_for_full_optional_runtime():
    dockerfile = (ROOT / "docker" / "Dockerfile").read_text(encoding="utf-8")
    assert dockerfile.startswith("FROM python:3.11-bookworm\n")
    assert '"torchvision==${TORCHVISION_VERSION}"' in dockerfile
    assert "apt-get -o Acquire::Retries=3" in dockerfile


def test_docker_lock_includes_all_analysis_backend_packages():
    requirements = (ROOT / "docker" / "requirements.lock.txt").read_text(encoding="utf-8")
    required = {
        "all-in-one-infer",
        "basic-pitch",
        "beat-this",
        "bs-roformer-infer",
        "demucs",
        "faster-whisper",
        "madmom-prebuilt",
        "muq",
        "openunmix",
        "sentence-transformers",
    }
    declared = {
        line.split("==", 1)[0].split(">=", 1)[0].strip().lower()
        for line in requirements.splitlines()
        if line and not line.startswith("#")
    }
    assert required <= declared


def test_container_docs_bound_the_optional_research_model_claim():
    docs = "\n".join(
        (ROOT / path).read_text(encoding="utf-8")
        for path in ("docker/README.md", "docs/containers.md")
    )
    assert "does not preinstall every research backend" in docs
    assert "does not mean every registry entry is inference-ready" in docs
    assert "--backend-python MODEL=PATH" in docs


def test_docker_verifier_covers_optional_features_and_registered_models():
    verifier = (ROOT / "docker" / "verify-environment.sh").read_text(encoding="utf-8")
    assert "'muq', 'basic_pitch'" in verifier
    assert "'torch', 'torchaudio', 'torchvision'" in verifier
    assert "from stemlab.models import MODEL_REGISTRY" in verifier
    assert "beatnet_class = _load_beatnet_class()" in verifier
    assert "'BeatNet'" not in verifier
    assert {spec.backend for spec in MODEL_REGISTRY.values()} == {
        "bs_roformer",
        "demucs",
        "openunmix",
        "scnet",
    }


def test_docker_normalises_windows_shell_script_line_endings():
    attributes = (ROOT / ".gitattributes").read_text(encoding="utf-8")
    dockerfile = (ROOT / "docker" / "Dockerfile").read_text(encoding="utf-8")

    assert "*.sh text eol=lf" in attributes
    assert "sed -i 's/\\r$//' /opt/stemlab-docker/*.sh" in dockerfile


def test_compose_uses_compatible_gpu_reservations_and_torchvision_pin():
    compose = (ROOT / "compose.yaml").read_text(encoding="utf-8")

    assert "gpus: all" not in compose
    assert "capabilities: [gpu]" in compose
    assert "TORCHVISION_VERSION: ${TORCHVISION_VERSION:-0.29.1}" in compose
