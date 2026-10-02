"""Isolated MIDI worker; logs go to the parent's backend.log, never MCP stdout."""
from __future__ import annotations

import argparse
import json
import os
import sys
import traceback
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--request", type=Path, required=True)
    args = parser.parse_args()
    request = json.loads(args.request.read_text(encoding="utf-8"))
    # Running this file allows a per-model Python environment without duplicating
    # StemLab. Only this trusted checkout's src directory is added to sys.path.
    sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
    work = args.request.resolve().parent
    if not request.get("allow_downloads", False):
        os.environ["HF_HUB_OFFLINE"] = "1"
        os.environ["TRANSFORMERS_OFFLINE"] = "1"
    if request.get("device") == "cpu":
        os.environ["CUDA_VISIBLE_DEVICES"] = ""
    try:
        from stemlab.analysis.midi.adapters import run_backend
        metadata = run_backend(request, work / "transcription.mid")
        (work / "backend.json").write_text(json.dumps(metadata, indent=2) + "\n", encoding="utf-8")
    except Exception as exc:
        (work / "failure.json").write_text(
            json.dumps({"type": type(exc).__name__, "message": str(exc)}, indent=2) + "\n",
            encoding="utf-8")
        traceback.print_exc()
        raise SystemExit(1) from exc


if __name__ == "__main__":
    main()
