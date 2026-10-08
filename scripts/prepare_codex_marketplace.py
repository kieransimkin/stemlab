"""Prepare a release-only marketplace checkout from a verified plugin ZIP. Never pushes Git."""
from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import zipfile
from pathlib import Path, PurePosixPath


def version_tuple(value: str) -> tuple[int, int, int]:
    if not re.fullmatch(r"\d+\.\d+\.\d+", value):
        raise ValueError("Only stable x.y.z releases are supported")
    return tuple(int(part) for part in value.split("."))


def verified_files(archive: Path) -> dict[str, bytes]:
    expected = archive.with_suffix(".zip.sha256").read_text(encoding="utf-8").split()[0]
    if hashlib.sha256(archive.read_bytes()).hexdigest() != expected:
        raise ValueError("Archive checksum mismatch")
    with zipfile.ZipFile(archive) as z:
        names = z.namelist()
        if len(set(names)) != len(names) or len(names) > 100:
            raise ValueError("Duplicate entries or oversized plugin archive")
        if sum(i.file_size for i in z.infolist()) > 4 * 1024 * 1024:
            raise ValueError("Plugin archive expands beyond 4 MiB")
        for name in names:
            p = PurePosixPath(name)
            allowed = name in {"SHA256SUMS", ".agents/plugins/marketplace.json"} or (
                name.startswith("plugins/stemlab/") and
                (p.suffix in {".json", ".md"} or p.name == "LICENSE" or
                 (p.parent.name == "branding" and p.suffix in {".svg", ".png"})))
            if not allowed or ".." in p.parts or p.is_absolute() or "\\" in name:
                raise ValueError("Unexpected archive path")
        files = {name: z.read(name) for name in names}
    verified = set()
    for line in files["SHA256SUMS"].decode("utf-8").splitlines():
        digest, name = line.split("  ", 1)
        if name not in files or hashlib.sha256(files[name]).hexdigest() != digest:
            raise ValueError("File checksum mismatch")
        verified.add(name)
    if verified != set(files) - {"SHA256SUMS"}:
        raise ValueError("Unverified archive members")
    return files


def prepare(archive: Path, checkout: Path, tag: str) -> bool:
    files = verified_files(archive)
    plugin = json.loads(files["plugins/stemlab/plugin.json"])
    version = plugin["version"]
    if tag != f"v{version}" or plugin["name"] != "stemlab":
        raise ValueError("Release identity mismatch")
    incoming = version_tuple(version)
    checkout = checkout.resolve(strict=True)
    # This destination is a separate release-channel checkout, never the main checkout.
    if not (checkout / ".git").exists():
        raise ValueError("Destination must be a dedicated Git checkout")
    if (checkout / "src/stemlab").exists():
        raise ValueError("Refusing to stage into a main source checkout")
    existing = checkout / "plugins/stemlab/plugin.json"
    if existing.is_file():
        old = json.loads(existing.read_text(encoding="utf-8"))
        if version_tuple(old["version"]) > incoming:
            return False  # A slower older release must not downgrade the channel.
    for name in files:
        target = checkout / name
        current = checkout
        for part in target.relative_to(checkout).parts:
            current = current / part
            if current.is_symlink():
                raise ValueError("Refusing a symlinked marketplace path")
    target = checkout / "plugins/stemlab"
    if target.exists():
        shutil.rmtree(target)
    for name, raw in files.items():
        if name == "SHA256SUMS":
            continue
        target = checkout / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(raw)
    market_path = checkout / ".agents/plugins/marketplace.json"
    market = json.loads(market_path.read_text(encoding="utf-8"))
    market["name"] = "stemlab-releases"
    market["interface"]["displayName"] = "StemLab releases · timing and loops for Shorts"
    market_path.write_text(json.dumps(market, indent=2) + "\n", encoding="utf-8")
    (checkout / "README.md").write_text(
        f"# StemLab Codex release channel\n\nRelease: **{tag}**\n\n"
        "Audio timing analysis and loopable sections for creating Shorts videos.\n\n"
        f"Install the matching Python runtime first: `pip install 'danceflow-stemlab[codex]=={version}'`.\n"
        "Configure an explicit workspace with `stemlab-codex configure --workspace ABSOLUTE_PATH`.\n\n"
        "Add this marketplace using `codex plugin marketplace add kieransimkin/stemlab --ref codex-plugins`.\n"
        "Install StemLab in a supported local plugin directory. This is not an OpenAI public-directory listing.\n\n"
        "[Runtime/setup](plugins/stemlab/TECHNICAL-GUIDE.md) · "
        "[My Songs — Kieran Simkin](https://kieransimkin.co.uk/my-songs/)\n",
        encoding="utf-8")
    return True


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--archive", type=Path, required=True)
    parser.add_argument("--checkout", type=Path, required=True)
    parser.add_argument("--tag", required=True)
    args = parser.parse_args()
    print("Marketplace prepared" if prepare(args.archive, args.checkout, args.tag)
          else "A newer release is already present; channel not downgraded")


if __name__ == "__main__":
    main()
