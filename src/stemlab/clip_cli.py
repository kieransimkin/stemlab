from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer


def register_clip_commands(app, console):
    @app.command("match-clip")
    def match_clip_command(
        source: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        clip: Annotated[Path, typer.Argument(exists=True, dir_okay=False)],
        output: Annotated[Path, typer.Option("--output", "-o", help="New evidence JSON file")],
        sample_rate: Annotated[int, typer.Option("--sample-rate", min=2000, max=24000)] = 8000,
        clip_start: Annotated[float, typer.Option("--clip-start", min=0)] = 0.0,
        clip_end: Annotated[float | None, typer.Option("--clip-end", min=0)] = None,
    ):
        """Locate a contiguous audio/video excerpt in its source; no models run."""
        from .clip_match import match_clip
        from .util import write_json

        if output.exists() or output.resolve() in (source.resolve(), clip.resolve()):
            raise typer.BadParameter("Output must be a new file, separate from the inputs")
        try:
            report = match_clip(source, clip, sample_rate=sample_rate,
                                clip_start=clip_start, clip_end=clip_end)
        except (OSError, ValueError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        write_json(output, report)
        console.print(f"{report['status']}: {report['reason']}")
        console.print(str(output))
        if report["status"] != "matched":
            raise typer.Exit(2)
