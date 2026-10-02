"""Opt-in REAL audio-to-MIDI inference smoke test; no generated predictions.

Requires a separately installed model runtime and a real user-supplied input.
Nothing is downloaded unless --allow-model-downloads is explicitly given.
"""
from __future__ import annotations

import argparse
import json
from pathlib import Path

from stemlab.analysis.midi import MIDI_MODELS, MidiConfig, transcribe_path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("--output", "-o", type=Path, required=True)
    parser.add_argument("--model", choices=tuple(MIDI_MODELS), action="append", required=True)
    parser.add_argument("--allow-model-downloads", action="store_true")
    parser.add_argument("--device", default="cpu")
    args = parser.parse_args()
    try:
        report = transcribe_path(args.source, args.output, config=MidiConfig(
            models=tuple(args.model), device=args.device, allow_downloads=args.allow_model_downloads),
            progress=print)
        if report["status"] != "completed":
            raise RuntimeError("Inference did not fully complete; inspect report.json and backend.log")
        for result in report["analyses"]:
            for key in ("midi", "notes", "csv"):
                if not (args.output / result["files"][key]).is_file():
                    raise RuntimeError(f"Missing {key} artifact after completion")
        print(json.dumps({"source_sha256": report["source_sha256"],
                          "completed_count": report["completed_count"],
                          "note_count": report["note_count"],
                          "report": str(args.output.resolve() / "report.json"),
                          "validation": "Real model worker execution, NOT musical-accuracy validation"},
                         indent=2))
    except (ValueError, OSError, RuntimeError, KeyError) as exc:
        parser.exit(1, str(exc) + "\n")


if __name__ == "__main__":
    main()
