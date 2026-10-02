from __future__ import annotations

import argparse
import hashlib
import json
from pathlib import Path

import soundfile as sf


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def main() -> None:
    parser = argparse.ArgumentParser(description="Probe an authorised StemLab evaluation corpus without copying audio")
    parser.add_argument("audio", nargs="+", type=Path)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--probe-only", action="store_true", help="Only verify input diversity/decodability; run no model")
    args = parser.parse_args()
    rows = []
    for raw in args.audio:
        path = raw.expanduser().resolve()
        info = sf.info(path)
        rows.append({"name": path.name, "path": str(path), "sha256": sha256(path),
                     "sample_rate": info.samplerate, "channels": info.channels,
                     "frames": info.frames, "duration_seconds": info.duration,
                     "format": info.format, "subtype": info.subtype})
    result = {"schema": "stemlab.evidence-corpus.v1", "probe_only": args.probe_only,
              "file_count": len(rows), "files": rows,
              "summary": {"sample_rates": sorted({r["sample_rate"] for r in rows}),
                          "channels": sorted({r["channels"] for r in rows}),
                          "min_duration_seconds": min(r["duration_seconds"] for r in rows),
                          "max_duration_seconds": max(r["duration_seconds"] for r in rows),
                          "total_duration_seconds": sum(r["duration_seconds"] for r in rows)}}
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(result, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(result["summary"], indent=2))


if __name__ == "__main__":
    main()
