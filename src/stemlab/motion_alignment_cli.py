"""Model-free source-event alignment and separate, explicit timing review."""
from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer


def register_motion_alignment_commands(app, console):
    @app.command("prepare-alignment-events")
    def prepare_events(
        evidence: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        source: Annotated[Path, typer.Option("--source", exists=True, dir_okay=False)],
        clock_id: Annotated[str, typer.Option("--clock-id")],
        output: Annotated[Path, typer.Option("--output", "-o")],
        audio_start: Annotated[float | None, typer.Option("--audio-start", help="Explicit original audio source range start")] = None,
        audio_end: Annotated[float | None, typer.Option("--audio-end", help="Explicit original audio source range end")] = None,
    ):
        """Export observed rig accents or saved audio events; never predicted beat grids."""
        from .analysis.motion_alignment import (events_from_rig_report, events_from_rhythm_report,
                                                file_hash, read_document, write_document)
        try:
            document, _ = read_document(evidence)
            digest = file_hash(source)
            if document.get("format") == "stemlab.rig-motion-analysis":
                result = events_from_rig_report(document, clock_id=clock_id)
                if result["source"]["sha256"] != digest:
                    raise ValueError("Rig report and source bytes have different hashes")
            else:
                if (audio_start is None) != (audio_end is None):
                    raise ValueError("Provide both --audio-start and --audio-end")
                bounds = [audio_start, audio_end] if audio_start is not None else None
                result = events_from_rhythm_report(document, source_sha256=digest,
                                                   clock_id=clock_id, seconds_range=bounds)
            write_document(output, result)
        except (ValueError, OSError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Source event evidence: {output}; {len(result['streams'])} streams")

    @app.command("align-motion-audio")
    def align(
        motion_events: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        audio_events: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        motion_source: Annotated[Path, typer.Option("--motion-source", exists=True, dir_okay=False)],
        audio_source: Annotated[Path, typer.Option("--audio-source", exists=True, dir_okay=False)],
        clock_map: Annotated[Path, typer.Option("--clock-map", exists=True, dir_okay=False)],
        output: Annotated[Path, typer.Option("--output", "-o")],
        max_offset: Annotated[float, typer.Option("--max-offset", min=0, max=30)] = 2.0,
        tolerance: Annotated[float, typer.Option("--tolerance", min=.005, max=.25)] = .07,
        rate: Annotated[list[float] | None, typer.Option("--rate", help="Repeat explicit time-scale multipliers; default 0.5, 1, 2")] = None,
        variable_tempo: Annotated[bool, typer.Option("--variable-tempo/--constant-tempo")] = True,
    ):
        """Rank offsets, half/double rates and bounded variable-tempo event mappings."""
        from .analysis.motion_alignment import align_motion_audio, read_document, write_document
        try:
            if output.exists():
                raise ValueError("Alignment output must be a new file")
            motion, motion_digest = read_document(motion_events)
            audio, audio_digest = read_document(audio_events)
            mapping, mapping_digest = read_document(clock_map)
            result = align_motion_audio(motion, audio, mapping, motion_source=motion_source,
                                        audio_source=audio_source, max_offset_seconds=max_offset,
                                        tolerance_seconds=tolerance,
                                        rate_multipliers=rate if rate is not None else (.5, 1., 2.),
                                        variable_tempo=variable_tempo)
            result["input_document_sha256"] = {"motion_events": motion_digest,
                                               "audio_events": audio_digest, "clock_map": mapping_digest}
            write_document(output, result)
        except (ValueError, OSError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Alignment: {output}; {result['result_status']}; {len(result['candidates'])} candidates")

    @app.command("confirm-motion-alignment")
    def confirm(
        report: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        candidate: Annotated[str, typer.Option("--candidate")],
        reviewer: Annotated[str, typer.Option("--reviewer")],
        output: Annotated[Path, typer.Option("--output", "-o")],
        decision: Annotated[str, typer.Option("--decision", help="accept_mapping, reject, needs_review")] = "accept_mapping",
        beat_one: Annotated[float | None, typer.Option("--beat-one", help="Explicitly confirm audio beat-one seconds")] = None,
        meter: Annotated[str | None, typer.Option("--meter", help="Explicitly confirmed numerator/denominator")] = None,
        manual_anchors: Annotated[Path | None, typer.Option("--manual-anchors", exists=True, dir_okay=False,
                     help="JSON object with anchors [{motion_seconds,audio_seconds}]")] = None,
        previous_revision: Annotated[Path | None, typer.Option("--previous-revision", exists=True, dir_okay=False)] = None,
    ):
        """Write a source-bound review revision; preserve original evidence and media."""
        from .analysis.motion_alignment import create_alignment_revision, read_document, write_document
        try:
            document, digest = read_document(report)
            parsed_meter = None
            if meter is not None:
                bits = meter.split("/")
                if len(bits) != 2:
                    raise ValueError("Meter must be NUMERATOR/DENOMINATOR")
                parsed_meter = tuple(int(value) for value in bits)
            anchors = read_document(manual_anchors)[0].get("anchors") if manual_anchors else None
            previous = read_document(previous_revision)[0] if previous_revision else None
            result = create_alignment_revision(document, report_sha256=digest, candidate_id=candidate,
                                                reviewer=reviewer, decision=decision,
                                                beat_one_audio_seconds=beat_one, meter=parsed_meter,
                                                manual_anchors=anchors, previous_revision=previous)
            write_document(output, result)
        except (ValueError, OSError, KeyError, TypeError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        console.print(f"Alignment review revision {result['revision']}: {output}")


if __name__ == "__main__":
    from rich.console import Console

    app = typer.Typer(no_args_is_help=True, pretty_exceptions_show_locals=False)
    register_motion_alignment_commands(app, Console())
    app()
