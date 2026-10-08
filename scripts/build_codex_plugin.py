"""Build a deterministic local marketplace ZIP; no installs, network or publication."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def validate(root: Path) -> dict:
    plugin = root / "plugins/stemlab"
    portable = json.loads((plugin / "plugin.json").read_text(encoding="utf-8"))
    legacy = json.loads((plugin / ".codex-plugin/plugin.json").read_text(encoding="utf-8"))
    if portable["name"] != "stemlab" or not re.fullmatch(r"\d+\.\d+\.\d+", portable["version"]):
        raise ValueError("Invalid plugin identity/version")
    if portable["version"] != legacy["version"] or legacy["name"] != portable["name"]:
        raise ValueError("Portable and compatibility manifests disagree")
    if legacy.get("skills") != "./skills/" or legacy.get("mcpServers") != "./.mcp.json":
        raise ValueError("Invalid compatibility paths")
    modern_mcp = json.loads((plugin / "mcp.json").read_text(encoding="utf-8"))
    old_mcp = json.loads((plugin / ".mcp.json").read_text(encoding="utf-8"))
    expected = {"command": "stemlab-codex", "args": ["serve"]}
    if modern_mcp["mcpServers"] != {"stemlab": {"type": "stdio", **expected}}:
        raise ValueError("Unexpected portable MCP command")
    if old_mcp["mcpServers"] != {"stemlab": expected}:
        raise ValueError("Unexpected compatibility MCP command")
    market = json.loads((root / ".agents/plugins/marketplace.json").read_text(encoding="utf-8"))
    entry = market["plugins"][0]
    if market["name"] != "stemlab-local" or entry["source"] != {
        "source": "local", "path": "./plugins/stemlab"}:
        raise ValueError("Marketplace source does not match the plugin folder")
    skills = sorted((plugin / "skills").glob("*/SKILL.md"))
    if not skills or any(not p.read_text(encoding="utf-8").startswith("---\nname:") for p in skills):
        raise ValueError("Missing skill front matter")
    for p in plugin.rglob("*"):
        if p.is_symlink():
            raise ValueError("Plugin packages must not contain symlinks")
    return portable


def package_version(root: Path, release_tag: str | None = None) -> str:
    text = (root / "src/stemlab/__init__.py").read_text(encoding="utf-8")
    match = re.search(r'__version__\s*=\s*["\'](\d+\.\d+\.\d+)["\']', text)
    if not match:
        raise ValueError("A stable x.y.z StemLab source version is required")
    version = match.group(1)
    if release_tag and release_tag != f"v{version}":
        raise ValueError("Release tag does not match the StemLab source version")
    return version


def registry_metadata(root: Path, version: str) -> dict:
    value = json.loads((root / "mcp-registry/server.json").read_text(encoding="utf-8"))
    if value["name"] != "io.github.kieransimkin/stemlab":
        raise ValueError("Unexpected MCP registry namespace")
    if not isinstance(value.get("description"), str) or not 1 <= len(value["description"]) <= 100:
        raise ValueError("MCP registry description must contain 1 to 100 characters")
    if f'mcp-name: {value["name"]} -->' not in (root / "README.md").read_text(encoding="utf-8"):
        raise ValueError("PyPI README ownership marker is missing")
    value["version"] = version
    value["icons"] = [{
        "src": f"https://raw.githubusercontent.com/kieransimkin/stemlab/v{version}/docs/branding/logo.png",
        "mimeType": "image/png", "sizes": ["256x256"],
    }]
    for package in value["packages"]:
        if package["registryType"] != "pypi" or package["identifier"] != "danceflow-stemlab":
            raise ValueError("Unexpected MCP registry package")
        package["version"] = version
    return value


def build(root: Path, output: Path, release_tag: str | None = None) -> Path:
    validate(root)
    version = package_version(root, release_tag)
    files = {p.relative_to(root).as_posix(): p.read_bytes()
             for p in (root / "plugins/stemlab").rglob("*")
             if p.is_file() and (p.suffix in {".json", ".md"} or
                                (p.parent.name == "branding" and p.suffix in {".svg", ".png"}))}
    files[".agents/plugins/marketplace.json"] = (root / ".agents/plugins/marketplace.json").read_bytes()
    files["plugins/stemlab/LICENSE"] = (root / "LICENSE").read_bytes()
    files["plugins/stemlab/TECHNICAL-GUIDE.md"] = (root / "docs/codex-plugin.md").read_bytes()
    files["plugins/stemlab/PUBLISHING.md"] = (root / "docs/codex-publishing.md").read_bytes()
    for name in ("plugins/stemlab/plugin.json", "plugins/stemlab/.codex-plugin/plugin.json"):
        value = json.loads(files[name])
        value["version"] = version
        files[name] = (json.dumps(value, indent=2) + "\n").encode("utf-8")
    files["plugins/stemlab/RUNTIME.json"] = (json.dumps({
        "distribution": "danceflow-stemlab", "version": version, "extra": "codex",
        "requirement": f"danceflow-stemlab[codex]=={version}",
        "command": "stemlab-codex", "args": ["serve"],
        "note": "Preinstall the matching runtime. No lifecycle installer is run by this plugin."
    }, indent=2) + "\n").encode("utf-8")
    checksums = "".join(f"{hashlib.sha256(raw).hexdigest()}  {name}\n" for name, raw in sorted(files.items()))
    files["SHA256SUMS"] = checksums.encode("utf-8")
    output.mkdir(parents=True, exist_ok=True)
    destination = output / f"stemlab-codex-plugin-{version}.zip"
    with zipfile.ZipFile(destination, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for name, raw in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(1980, 1, 1, 0, 0, 0))
            info.create_system = 3
            info.external_attr = 0o100644 << 16
            info.compress_type = zipfile.ZIP_DEFLATED
            archive.writestr(info, raw)
    digest = hashlib.sha256(destination.read_bytes()).hexdigest()
    destination.with_suffix(".zip.sha256").write_text(f"{digest}  {destination.name}\n", encoding="utf-8")
    (output / "stemlab-mcp-server.json").write_text(
        json.dumps(registry_metadata(root, version), indent=2) + "\n", encoding="utf-8")
    return destination


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=ROOT / "dist/codex")
    parser.add_argument("--release-tag", help="Require an exact vX.Y.Z source-version match")
    parser.add_argument("--check", action="store_true", help="Validate structure without writing")
    args = parser.parse_args()
    if args.check:
        validate(ROOT)
        registry_metadata(ROOT, package_version(ROOT, args.release_tag))
        print("Plugin and marketplace structure valid")
    else:
        print(build(ROOT, args.output, args.release_tag))


if __name__ == "__main__":
    main()
