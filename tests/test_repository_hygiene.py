from pathlib import Path


def test_repository_has_no_historical_patch_or_build_debris():
    root = Path(__file__).resolve().parents[1]

    assert not list(root.glob("*.patch"))
    assert not list(root.glob("*.zip"))
    assert not list(root.glob("*.whl"))
    assert not (root / "environment-snapshot").exists()
    assert not (root / "UPGRADE_NOTES.md").exists()
    assert not (root / "uv.lock").exists()
    assert not (root / "snapshot-stemlab-environment.ps1").exists()


def test_clear_sonic_module_names():
    root = Path(__file__).resolve().parents[1]
    assert (root / "src/stemlab/analysis/sonic.py").is_file()
    assert (root / "src/stemlab/sonic_visualiser.py").is_file()
    assert not (root / "src/stemlab/analysis/audio_features.py").exists()
    assert not (root / "src/stemlab/sonic.py").exists()
