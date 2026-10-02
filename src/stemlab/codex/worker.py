"""Private subprocess entry point. Invoked only with a generated job ID."""
from __future__ import annotations

import argparse
import traceback
from pathlib import Path

from .jobs import JOB_ID
from .paths import inside, read_json, workspace_path, write_json


def execute(workspace: Path, job_id: str) -> None:
    if not JOB_ID.fullmatch(job_id):
        raise ValueError("Invalid job ID")
    root = inside(workspace, "stemlab-codex-results")
    control = root / ".jobs" / job_id
    if any(p.is_symlink() for p in (root / ".jobs", control)):
        raise ValueError("Refusing symlinked job state")
    output = inside(root, job_id)
    task = read_json(control / "request.json")
    from .tasks import inspect_audio, run_analysis, run_loop_scan, run_midi_scan
    try:
        if task["kind"] == "inspect":
            report = inspect_audio(workspace, task["audio_path"])
            write_json(output / "audio-info.json", report)
            result = {"state": "completed", "message": "Audio metadata inspected", "audio": report}
        elif task["kind"] == "analyze":
            result = run_analysis(workspace, output, task)
        elif task["kind"] == "midi":
            result = run_midi_scan(workspace, output, task)
        elif task["kind"] == "loops":
            result = run_loop_scan(workspace, output, task)
        else:
            raise ValueError("Unknown worker operation")
        write_json(control / "result.json", result)
    except Exception as exc:
        write_json(control / "result.json", {"state": "failed", "message": str(exc),
                                             "error_type": type(exc).__name__})
        traceback.print_exc()
        raise SystemExit(1) from exc


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--workspace", required=True)
    parser.add_argument("--job-id", required=True)
    args = parser.parse_args()
    execute(workspace_path(args.workspace), args.job_id)


if __name__ == "__main__":
    main()
