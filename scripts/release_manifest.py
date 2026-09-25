from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

# Make the source checkout importable when this helper is run before installation.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from stemlab.branding import attribution


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "dist-release")
    records = []
    for path in sorted(root.iterdir()):
        if not path.is_file() or path.name in {"SHA256SUMS", "release-assets.json"}:
            continue
        digest = hashlib.sha256()
        with path.open("rb") as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b""):
                digest.update(block)
        records.append(
            {
                "name": path.name,
                "bytes": path.stat().st_size,
                "sha256": digest.hexdigest(),
            }
        )

    (root / "release-assets.json").write_text(
        json.dumps({"project": attribution(), "assets": records}, indent=2) + "\n",
        encoding="utf-8",
    )
    (root / "SHA256SUMS").write_text(
        "".join(f"{record['sha256']}  {record['name']}\n" for record in records),
        encoding="utf-8",
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
