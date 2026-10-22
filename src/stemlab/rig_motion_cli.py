"""Opt-in kinematic beat, BPM and loop discovery for captured rig animations."""
from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer


def register_rig_motion_commands(app, console):
    @app.command("analyze-rig-motion")
    def analyze_rig_motion(
        capture: Annotated[Path, typer.Argument(exists=True,
                        help="DanceRudiments rig-capture JSON or validated motion-package directory")],
        output: Annotated[Path, typer.Option("--output", "-o", help="New evidence JSON path")],
        estimated_beat_map: Annotated[Path | None, typer.Option("--estimated-beat-map",
                                help="Optional NEW DanceRudiments beat-map JSON (estimated, not approved)")] = None,
        min_bpm: Annotated[float, typer.Option("--min-bpm", min=30, max=300)] = 60,
        max_bpm: Annotated[float, typer.Option("--max-bpm", min=30, max=300)] = 200,
        action_id: Annotated[str | None, typer.Option("--action-id",
                     help="Select original action SHA-256 in multi-action motion package")] = None,
    ):
        """Find movement accents, candidate BPMs and reviewable pose/velocity loops."""
        from .analysis.rig_motion import analyze_rig_capture, write_rig_analysis
        try:
            if capture.resolve() in {p.resolve() for p in (output, estimated_beat_map) if p}:
                raise ValueError("Analysis output must not replace the input capture")
            if capture.is_dir() or capture.name == "manifest.json":
                # Never modify a verified package tree with analysis sidecars.
                package_root = capture if capture.is_dir() else capture.parent
                if any(p.resolve().is_relative_to(package_root.resolve())
                       for p in (output, estimated_beat_map) if p is not None):
                    raise ValueError("Write analysis outside the immutable motion-package directory")
                from .analysis.rig_motion_package import analyze_rig_motion_package
                report = analyze_rig_motion_package(capture, original_action_id=action_id,
                                                   min_bpm=min_bpm, max_bpm=max_bpm)
            else:
                if action_id is not None:
                    raise ValueError("--action-id is only valid for motion packages")
                report = analyze_rig_capture(capture, min_bpm=min_bpm, max_bpm=max_bpm)
            write_rig_analysis(output, report, beat_map_path=estimated_beat_map)
        except (ValueError, OSError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        tempo = report["recommended_tempo"]
        console.print(f"Rig motion evidence: {output}")
        console.print(f"Motion accents: {len(report['motion_accents'])}; "
                      f"candidate loops: {len(report['loop_candidates'])}")
        console.print(f"Estimated BPM: {tempo['bpm']:.1f} (unverified movement rhythm)"
                      if tempo else "No defensible tempo estimate; review source motion")
        if estimated_beat_map:
            console.print(f"Unverified source beat map: {estimated_beat_map}")
