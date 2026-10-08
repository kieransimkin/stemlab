import hashlib
import importlib.util
import json
import sys
import zipfile
from pathlib import Path

import pytest

from stemlab.codex.__main__ import main

ROOT = Path(__file__).resolve().parents[1]


def builder():
    spec = importlib.util.spec_from_file_location("codex_builder", ROOT / "scripts/build_codex_plugin.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def test_manifest_identity_and_mcp_wiring():
    assert builder().validate(ROOT)["name"] == "stemlab"
    manifest = json.loads((ROOT / "plugins/stemlab/plugin.json").read_text())
    assert manifest["author"]["name"] == "Kieran Simkin"
    assert "com.openai" in manifest["extensions"]


def test_archive_is_reproducible_and_has_verified_hashes(tmp_path):
    build = builder().build
    a, b = build(ROOT, tmp_path / "a"), build(ROOT, tmp_path / "b")
    assert a.read_bytes() == b.read_bytes()
    with zipfile.ZipFile(a) as z:
        assert "plugins/stemlab/plugin.json" in z.namelist()
        assert ".agents/plugins/marketplace.json" in z.namelist()
        assert "plugins/stemlab/.codex-plugin/plugin.json" in z.namelist()
        for name in ("logo.svg", "logo-monochrome.svg", "logo.png"):
            member = "plugins/stemlab/branding/" + name
            assert z.read(member) == (ROOT / member).read_bytes()
        for line in z.read("SHA256SUMS").decode().splitlines():
            digest, path = line.split("  ", 1)
            assert hashlib.sha256(z.read(path)).hexdigest() == digest
        assert not any(n.endswith((".wav", ".mp3", ".pt", ".ckpt")) for n in z.namelist())


def test_config_is_explicit_and_does_not_overwrite(tmp_path, monkeypatch, capsys):
    cfg = tmp_path / "settings/codex.json"
    monkeypatch.setenv("STEMLAB_CODEX_CONFIG", str(cfg))
    main(["configure", "--workspace", str(tmp_path)])
    assert json.loads(cfg.read_text())["workspace"] == str(tmp_path)
    with pytest.raises(SystemExit):
        main(["configure", "--workspace", str(tmp_path)])
    main(["doctor"])
    assert "packages_present" in capsys.readouterr().out
    assert not (tmp_path / "stemlab-codex-results").exists()


def test_missing_workspace_fails_closed_on_stderr(tmp_path, monkeypatch, capsys):
    monkeypatch.setenv("STEMLAB_CODEX_CONFIG", str(tmp_path / "missing.json"))
    monkeypatch.delenv("STEMLAB_CODEX_WORKSPACE", raising=False)
    with pytest.raises(SystemExit) as e:
        main(["serve"])
    output = capsys.readouterr()
    assert e.value.code == 2 and not output.out
    assert "No workspace configured" in output.err


def test_optional_sdk_is_not_imported_by_core():
    import subprocess
    result = subprocess.run([sys.executable, "-I", "-c",
        "import sys; import stemlab.codex.bridge; assert 'mcp' not in sys.modules"],
        capture_output=True, text=True, timeout=15)
    assert result.returncode == 0, result.stderr
