"""Opt-in kinematic beat, BPM and loop discovery for captured rig animations."""
from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer


def register_rig_motion_commands(app, console):
    @app.command("analyze-rig-motion")
    def analyze_rig_motion(
        capture: Annotated[Path, typer.Argument(exists=True, dir_okay=False,
                                                 help="DanceRudiments rig-capture JSON")],
        output: Annotated[Path, typer.Option("--output", "-o", help="New evidence JSON path")],
        estimated_beat_map: Annotated[Path | None, typer.Option("--estimated-beat-map",
                                help="Optional NEW DanceRudiments beat-map JSON (estimated, not approved)")] = None,
        min_bpm: Annotated[float, typer.Option("--min-bpm", min=30, max=300)] = 60,
        max_bpm: Annotated[float, typer.Option("--max-bpm", min=30, max=300)] = 200,
    ):
        """Find movement accents, candidate BPMs and reviewable pose/velocity loops."""
        from .analysis.rig_motion import analyze_rig_capture, write_rig_analysis
        try:
            if capture.resolve() in {p.resolve() for p in (output, estimated_beat_map) if p}:
                raise ValueError("Analysis output must not replace the input capture")
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
