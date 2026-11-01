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
        world_motion: Annotated[Path | None, typer.Option("--world-motion", exists=True,
                     dir_okay=False, help="Source-hash-bound DanceRudiments world/contact evidence JSON")] = None,
        tempo_strategy: Annotated[str, typer.Option("--tempo-strategy",
                     help="consensus, control, world or contact; estimates always require review")] = "consensus",
        events_output: Annotated[Path | None, typer.Option("--events-output",
                     help="Optional new source-event JSON for audio-motion alignment")] = None,
        clock_id: Annotated[str | None, typer.Option("--clock-id",
                     help="Explicit source clock identity, required with --events-output")] = None,
    ):
        """Find movement accents, candidate BPMs and reviewable pose/velocity loops."""
        from .analysis.rig_motion import analyze_rig_capture, write_rig_analysis
        try:
            outputs = [p for p in (output, estimated_beat_map, events_output) if p is not None]
            if len({p.resolve() for p in outputs}) != len(outputs) or any(p.exists() for p in outputs):
                raise ValueError("Outputs must be distinct new paths")
            if events_output is not None and not clock_id:
                raise ValueError("--events-output requires --clock-id")
            if capture.resolve() in {p.resolve() for p in outputs}:
                raise ValueError("Analysis output must not replace the input capture")
            if capture.is_dir() or capture.name == "manifest.json":
                if world_motion is not None or tempo_strategy not in ("control", "consensus"):
                    raise ValueError("World-motion sidecars require original rig captures, not compiled packages")
                # Never modify a verified package tree with analysis sidecars.
                package_root = capture if capture.is_dir() else capture.parent
                if any(p.resolve().is_relative_to(package_root.resolve())
                       for p in outputs):
                    raise ValueError("Write analysis outside the immutable motion-package directory")
                from .analysis.rig_motion_package import analyze_rig_motion_package
                report = analyze_rig_motion_package(capture, original_action_id=action_id,
                                                   min_bpm=min_bpm, max_bpm=max_bpm)
            else:
                if action_id is not None:
                    raise ValueError("--action-id is only valid for motion packages")
                report = analyze_rig_capture(capture, min_bpm=min_bpm, max_bpm=max_bpm,
                                             world_motion=world_motion, tempo_strategy=tempo_strategy)
            events = None
            if events_output is not None:
                from .analysis.motion_alignment import events_from_rig_report
                events = events_from_rig_report(report, clock_id=clock_id)
            write_rig_analysis(output, report, beat_map_path=estimated_beat_map)
            if events is not None:
                from .analysis.motion_alignment import write_document
                write_document(events_output, events)
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

    from .motion_alignment_cli import register_motion_alignment_commands
    register_motion_alignment_commands(app, console)


if __name__ == "__main__":
    from rich.console import Console

    app = typer.Typer(no_args_is_help=True, pretty_exceptions_show_locals=False)
    register_rig_motion_commands(app, Console())
    app()
