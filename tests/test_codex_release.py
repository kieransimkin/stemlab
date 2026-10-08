import hashlib
import importlib.util
import json
import subprocess
import zipfile
from pathlib import Path

import pytest

ROOT = Path(__file__).resolve().parents[1]


def module(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / f"scripts/{name}.py")
    value = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(value)
    return value


def test_release_tag_and_registry_version_are_tied_to_source(tmp_path):
    builder = module("build_codex_plugin")
    version = builder.package_version(ROOT)
    with pytest.raises(ValueError, match="tag"):
        builder.build(ROOT, tmp_path, "v99.99.99")
    archive = builder.build(ROOT, tmp_path, f"v{version}")
    meta = json.loads((tmp_path / "stemlab-mcp-server.json").read_text())
    assert meta["version"] == meta["packages"][0]["version"] == version
    with zipfile.ZipFile(archive) as z:
        assert json.loads(z.read("plugins/stemlab/plugin.json"))["version"] == version
        assert json.loads(z.read("plugins/stemlab/.codex-plugin/plugin.json"))["version"] == version
        assert json.loads(z.read("plugins/stemlab/RUNTIME.json"))["version"] == version


def test_marketplace_extract_is_verified_and_cannot_downgrade(tmp_path):
    builder = module("build_codex_plugin")
    stage = module("prepare_codex_marketplace")
    archive = builder.build(ROOT, tmp_path / "build")
    checkout = tmp_path / "stage"
    checkout.mkdir()
    subprocess.run(["git", "init", str(checkout)], check=True, capture_output=True)
    version = builder.package_version(ROOT)
    assert stage.prepare(archive, checkout, f"v{version}")
    catalog = json.loads((checkout / ".agents/plugins/marketplace.json").read_text())
    assert catalog["name"] == "stemlab-releases"
    assert not (checkout / "src").exists()
    path = checkout / "plugins/stemlab/plugin.json"
    value = json.loads(path.read_text())
    value["version"] = "999.0.0"
    path.write_text(json.dumps(value))
    assert not stage.prepare(archive, checkout, f"v{version}")
    assert json.loads(path.read_text())["version"] == "999.0.0"


def test_corrupt_archive_is_rejected(tmp_path):
    builder = module("build_codex_plugin")
    archive = builder.build(ROOT, tmp_path)
    archive.write_bytes(archive.read_bytes() + b"corrupt")
    with pytest.raises(ValueError, match="checksum"):
        module("prepare_codex_marketplace").verified_files(archive)


def test_archive_rejects_unverified_or_traversal_members(tmp_path):
    archive = tmp_path / "bad.zip"
    with zipfile.ZipFile(archive, "w") as z:
        z.writestr("../outside", "no")
        z.writestr("SHA256SUMS", "")
    archive.with_suffix(".zip.sha256").write_text(hashlib.sha256(archive.read_bytes()).hexdigest())
    with pytest.raises(ValueError, match="path"):
        module("prepare_codex_marketplace").verified_files(archive)


def test_registry_publisher_metadata_fails_before_network():
    publisher = module("publish_mcp_registry")
    meta = module("build_codex_plugin").registry_metadata(ROOT, "1.2.3")
    assert publisher.validate_metadata(meta, "v1.2.3") == "1.2.3"
    with pytest.raises(ValueError):
        publisher.validate_metadata(meta, "v1.2.4")
    meta["packages"][0]["identifier"] = "unrelated"
    with pytest.raises(ValueError):
        publisher.validate_metadata(meta, "v1.2.3")


def test_publication_is_release_gated_and_dependency_ordered():
    yaml = pytest.importorskip("yaml")
    workflow = yaml.load((ROOT / ".github/workflows/release.yml").read_text(), Loader=yaml.BaseLoader)
    jobs = workflow["jobs"]
    assert workflow["on"]["push"]["tags"] == ["v*"]
    assert jobs["release-build"]["needs"] == "codex-package"
    assert "codex-package" in jobs["pypi-publish"]["needs"]
    for name in ("codex-marketplace", "mcp-registry"):
        assert "refs/tags/v" in jobs[name]["if"]
        assert "github-release" in jobs[name]["needs"]
        assert "pypi-publish" in jobs[name]["needs"]
    assert "MCP_REGISTRY_PUBLISH == 'true'" in jobs["mcp-registry"]["if"]
    assert jobs["mcp-registry"]["permissions"]["id-token"] == "write"
    assert "OPENAI_API_KEY" not in str(workflow)
    assert "--force" not in str(jobs["codex-marketplace"])
    ci = yaml.load((ROOT / ".github/workflows/codex-plugin.yml").read_text(), Loader=yaml.BaseLoader)
    assert "workflow_call" in ci["on"]
    assert ci["permissions"] == {"contents": "read"}
    assert "from mcp.server import MCPServer" in str(ci)
    assert "check_codex_timeline.py" in str(ci)
    assert "playwright install --with-deps chromium" in str(ci)


def test_short_video_purpose_is_in_all_public_descriptions():
    for name in ("README.md", "pyproject.toml", "package.json", "src/stemlab/branding.py",
                 "plugins/stemlab/plugin.json", "plugins/stemlab/.codex-plugin/plugin.json",
                 "mcp-registry/server.json"):
        text = (ROOT / name).read_text(encoding="utf-8").lower()
        assert "timing" in text and "loopable" in text and "shorts" in text


def test_registry_readback_accepts_only_additive_defaults():
    publisher = module("publish_mcp_registry")
    wanted = {"name": "a", "packages": [{"identifier": "x", "version": "1.0.0"}]}
    actual = {"name": "a", "packages": [{"identifier": "x", "version": "1.0.0", "extra": 1}]}
    assert publisher.contains_expected(actual, wanted)
    actual["packages"][0]["version"] = "2.0.0"
    assert not publisher.contains_expected(actual, wanted)


def test_existing_registry_version_does_not_republish(tmp_path, monkeypatch, capsys):
    publisher = module("publish_mcp_registry")
    data = module("build_codex_plugin").registry_metadata(ROOT, "1.2.3")
    path = tmp_path / "server.json"
    path.write_text(json.dumps(data))
    monkeypatch.setenv("GITHUB_REPOSITORY", "kieransimkin/stemlab")
    def fetch(url):
        if "pypi.org" in url:
            return {"info": {"description": "<!-- mcp-name: io.github.kieransimkin/stemlab -->"},
                    "urls": [{"filename": "package.whl"}]}
        return {"server": data}
    monkeypatch.setattr(publisher, "fetch_json", fetch)
    monkeypatch.setattr(publisher, "fetch_bytes", lambda *a: pytest.fail("Must not download"))
    publisher.publish(path, "v1.2.3", "v1.0.0", "a" * 64)
    assert "already published" in capsys.readouterr().out


def test_marketplace_refuses_main_checkout(tmp_path):
    archive = module("build_codex_plugin").build(ROOT, tmp_path / "build")
    checkout = tmp_path / "main"
    (checkout / ".git").mkdir(parents=True)
    (checkout / "src/stemlab").mkdir(parents=True)
    with pytest.raises(ValueError, match="main"):
        module("prepare_codex_marketplace").prepare(
            archive, checkout, "v" + module("build_codex_plugin").package_version(ROOT))
