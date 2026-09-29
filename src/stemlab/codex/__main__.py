"""CLI for configuring and running the local Codex bridge; never edits Codex's own config."""
from __future__ import annotations

import argparse
import json
import os
import sys
from pathlib import Path

from .bridge import StemLabBridge
from .paths import read_json, workspace_path, write_json


def config_path() -> Path:
    explicit = os.environ.get("STEMLAB_CODEX_CONFIG")
    if explicit:
        path = Path(explicit).expanduser()
        if not path.is_absolute():
            raise ValueError("STEMLAB_CODEX_CONFIG must be absolute")
        return path
    from platformdirs import user_config_path
    return user_config_path("stemlab", appauthor=False) / "codex.json"


def main(argv: list[str] | None = None) -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="operation", required=True)
    configure = sub.add_parser("configure", help="Save an explicit local workspace, not credentials")
    configure.add_argument("--workspace", required=True)
    configure.add_argument("--replace", action="store_true")
    configure.add_argument("--max-jobs", type=int, default=1, choices=range(1, 5))
    configure.add_argument("--timeout-seconds", type=int, default=14400)
    for command in ("serve", "doctor"):
        item = sub.add_parser(command)
        item.add_argument("--workspace", help="Absolute allowed directory; overrides saved configuration")
        item.add_argument("--read-only", action="store_true")
    args = parser.parse_args(argv)
    try:
        if args.operation == "configure":
            root = workspace_path(args.workspace)
            if not 1 <= args.timeout_seconds <= 86400:
                raise ValueError("timeout-seconds must be 1..86400")
            destination = config_path()
            if destination.exists() and not args.replace:
                raise ValueError(f"Configuration already exists: {destination}; review then use --replace")
            write_json(destination, {"workspace": str(root), "max_jobs": args.max_jobs,
                                     "timeout_seconds": args.timeout_seconds})
            print(json.dumps({"config": str(destination), "workspace": str(root)}, indent=2))
            return
        saved = read_json(config_path(), optional=True)
        chosen = args.workspace or os.environ.get("STEMLAB_CODEX_WORKSPACE") or saved.get("workspace")
        if not chosen:
            raise ValueError("No workspace configured. Run stemlab-codex configure --workspace ABSOLUTE_PATH")
        bridge = StemLabBridge(workspace_path(chosen), read_only=args.read_only,
                               max_jobs=int(saved.get("max_jobs", 1)),
                               timeout_seconds=float(saved.get("timeout_seconds", 14400)))
        try:
            if args.operation == "doctor":
                print(json.dumps(bridge.capabilities(), indent=2))
            else:
                try:
                    from .server import create_server
                except ImportError as exc:
                    raise RuntimeError('Install the patched checkout with: pip install -e ".[codex]" '
                                       '(requires the official mcp Python SDK v2)') from exc
                create_server(bridge).run(transport="stdio")
        finally:
            bridge.close()
    except (ValueError, OSError, RuntimeError) as exc:
        print(f"StemLab Codex: {exc}", file=sys.stderr, flush=True)
        raise SystemExit(2) from exc


if __name__ == "__main__":
    main()
