"""Explicit local workspace boundaries, bounded reads and atomic JSON records."""
from __future__ import annotations

import json
import os
import stat
import tempfile
from pathlib import Path
from typing import Any

MAX_JSON_BYTES = 8 * 1024 * 1024
AUDIO_SUFFIXES = {".wav", ".wave", ".flac", ".mp3", ".ogg", ".opus", ".aif", ".aiff"}
TEXT_SUFFIXES = {".json", ".txt", ".md", ".csv", ".tsv", ".srt", ".lrc"}


def inside(root: Path, value: str | Path, *, must_exist: bool = True) -> Path:
    """Reject traversal, hidden files, links and special files, including Windows ADS.

    This is an application guard, not an OS sandbox against concurrent malicious
    filesystem changes. The workspace and its processes must be locally trusted.
    """
    root = root.resolve(strict=True)
    raw = Path(value)
    if not str(value) or "\x00" in str(value):
        raise ValueError("An explicit path is required")
    candidate = raw if raw.is_absolute() else root / raw
    try:
        parts = candidate.relative_to(root).parts
    except ValueError as exc:
        raise ValueError("Path is outside the configured workspace") from exc
    if any(p.startswith(".") or ":" in p for p in parts):
        raise ValueError("Hidden paths, traversal and alternate data streams are not allowed")
    current = root
    for part in parts:
        current = current / part
        if current.is_symlink():
            raise ValueError("Symbolic links are not accepted")
        if current.exists() and not (current.is_dir() or current.is_file()):
            raise ValueError("Only regular files and directories are accepted")
    resolved = candidate.resolve(strict=must_exist)
    if not resolved.is_relative_to(root):
        raise ValueError("Resolved path escapes the workspace")
    if resolved.exists() and resolved.is_file() and resolved.stat().st_nlink > 1:
        raise ValueError("Hard-linked files are not accepted")
    return resolved


def read_json(path: Path, *, optional: bool = False) -> dict[str, Any]:
    if optional and not path.exists():
        return {}
    if path.is_symlink() or not stat.S_ISREG(path.stat().st_mode):
        raise ValueError("JSON must be a regular non-symlink file")
    with path.open("rb") as stream:
        raw = stream.read(MAX_JSON_BYTES + 1)
    if len(raw) > MAX_JSON_BYTES:
        raise ValueError("JSON report exceeds the 8 MiB read limit")
    def reject(value: str):
        raise ValueError(f"Non-finite JSON number: {value}")
    data = json.loads(raw, parse_constant=reject)
    if not isinstance(data, dict):
        raise ValueError("Expected a JSON object")
    return data


def write_json(path: Path, value: Any) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.is_symlink():
        raise ValueError("Refusing to replace a symbolic link")
    payload = json.dumps(value, indent=2, ensure_ascii=False, allow_nan=False) + "\n"
    fd, name = tempfile.mkstemp(prefix=".write-", dir=path.parent)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            stream.write(payload)
        os.replace(name, path)
    finally:
        Path(name).unlink(missing_ok=True)


def workspace_path(value: str | Path) -> Path:
    raw = Path(value).expanduser()
    if not raw.is_absolute():
        raise ValueError("Workspace must be an explicit absolute directory")
    root = raw.resolve(strict=True)
    if not root.is_dir() or root == Path(root.anchor):
        raise ValueError("Workspace must be a directory, not a filesystem root")
    return root


def result_root(workspace: Path, value: str | Path) -> Path:
    root = inside(workspace, value)
    if not root.is_dir():
        raise ValueError("Expected a StemLab results directory")
    read_json(inside(root, "analysis.json"))
    return root
