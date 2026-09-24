from __future__ import annotations

import hashlib
import json
import sys
from pathlib import Path

root = Path(sys.argv[1] if len(sys.argv) > 1 else "dist-release")
records = []
for path in sorted(root.iterdir()):
    if not path.is_file() or path.name in {"SHA256SUMS", "release-assets.json"}:
        continue
    h = hashlib.sha256()
    with path.open("rb") as f:
        for block in iter(lambda: f.read(1024 * 1024), b""):
            h.update(block)
    records.append({"name": path.name, "bytes": path.stat().st_size, "sha256": h.hexdigest()})
(root / "release-assets.json").write_text(json.dumps({"assets": records}, indent=2) + "\n", encoding="utf-8")
(root / "SHA256SUMS").write_text("".join(f"{r['sha256']}  {r['name']}\n" for r in records), encoding="utf-8")
