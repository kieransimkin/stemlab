from __future__ import annotations

import datetime as dt
import platform
import sys
from pathlib import Path

from .util import sha256_file, write_json


def build_file_manifest(root: Path) -> dict:
    files = []
    for p in sorted(root.rglob("*")):
        if not p.is_file() or p.name == "manifest.json":
            continue
        files.append({
            "path": p.relative_to(root).as_posix(),
            "bytes": p.stat().st_size,
            "sha256": sha256_file(p),
        })
    return {
        "generated_at": dt.datetime.now(dt.timezone.utc).isoformat(),
        "platform": platform.platform(),
        "python": sys.version,
        "files": files,
    }


def write_manifest(root: Path, extra: dict | None = None) -> Path:
    data = build_file_manifest(root)
    if extra:
        data.update(extra)
    path = root / "manifest.json"
    write_json(path, data)
    return path
