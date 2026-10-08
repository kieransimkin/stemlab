"""CLI registration for timestamp-only LRC beat snapping."""
from __future__ import annotations

from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.table import Table
from rich.text import Text

from .cues import CueSnapConfig, generate_section_cues, snap_existing_cues


def print_cue_review(report: dict, console: Console) -> None:
    table = Table('status', 'line', 'cue', 'old → new', 'nearest gap', 'action / issues')
    for item in report['cues']:
        review = item['needs_review']
        gap = f"{item['nearest_beat_gap_ms']:.3f} ms" if item['nearest_beat_gap_ms'] is not None else 'NO BEAT'
        table.add_row(Text('REVIEW' if review else 'OK', style='bold red' if review else 'green'),
                      str(item['line']), Text(item['label']),
                      Text(f"{item['original_timestamp']} → {item['output_timestamp']}"),
                      gap, Text(item['action'] + (': ' + ', '.join(item['issues']) if item['issues'] else '')))
    console.print(table)
    console.print(f"{report['cue_count']} cues; {report['snapped_count']} snapped; "
                  f"{report['forced_count']} forced; {report['kept_count']} kept; "
                  f"{report['without_nearby_beat_count']} without a nearby beat; "
                  f"{report['review_count']} require review.")
    for warning in report['grid']['warnings']:
        console.print(Text(warning, style='yellow'))


def register_cue_commands(app: typer.Typer, console: Console) -> None:
    @app.command('generate-cues')
    def generate_cues(
        results: Annotated[Path, typer.Argument(exists=True, file_okay=False, help='Existing StemLab full-analysis directory')],
        output: Annotated[Path, typer.Option('--output', '-o', help='New output directory')],
        title: Annotated[str | None, typer.Option('--title', help='Song title; defaults to canonical.json when present')] = None,
        artist: Annotated[str, typer.Option('--artist', help='Artist metadata')] = 'Kieran Simkin',
        tolerance_ms: Annotated[float, typer.Option('--tolerance-ms', min=0, max=60000, help='Maximum nearby beat gap in milliseconds')] = 150,
        beat_model: Annotated[str, typer.Option('--beat-model', help='auto prefers consensus; or a specific detector id')] = 'auto',
        downbeats: Annotated[bool, typer.Option('--downbeats', help='Only snap to explicitly detected bar starts')] = False,
        precision: Annotated[str, typer.Option('--precision', help='exact, milliseconds or centiseconds')] = 'exact',
        fail_on_review: Annotated[bool, typer.Option('--fail-on-review', help='Exit 2 when an alignment cue needs review')] = False,
    ) -> None:
        """Generate provisional beat-aligned LRC cues from functional sections."""
        try:
            config = CueSnapConfig(tolerance_ms, beat_model, downbeats, False, precision)
            report = generate_section_cues(results, output, config=config, title=title, artist=artist)
        except (ValueError, OSError) as exc:
            console.print(Text(str(exc), style='red'))
            raise typer.Exit(1) from exc
        print_cue_review(report, console)
        console.print(Text(f"Generated provisional cues: {output.resolve() / report['output_cue_file']}"))
        console.print(Text('Listening review remains required for machine-generated section boundaries.', style='yellow'))
        if fail_on_review and report['review_count']:
            raise typer.Exit(2)

    @app.command('snap-cues')
    def snap_cues(
        results: Annotated[Path, typer.Argument(exists=True, help='Existing StemLab results directory or detector JSON')],
        cues: Annotated[Path, typer.Argument(exists=True, dir_okay=False, help='Line-timed LRC cue file; labels are preserved')],
        output: Annotated[Path | None, typer.Option('--output', '-o', help='New output directory; default RESULTS/cues/<cue-stem>')] = None,
        tolerance_ms: Annotated[float, typer.Option('--tolerance-ms', min=0, max=60000, help='Maximum nearby beat gap in milliseconds, in either direction')] = 150,
        beat_model: Annotated[str, typer.Option('--beat-model', help='auto prefers consensus; or a specific detector id')] = 'auto',
        downbeats: Annotated[bool, typer.Option('--downbeats', help='Only snap to explicitly detected bar-start events')] = False,
        force_snap: Annotated[bool, typer.Option('--force-snap', help='Snap distant cues too; keep their REVIEW warnings')] = False,
        precision: Annotated[str, typer.Option('--precision', help='exact, milliseconds or centiseconds; rounding is reported')] = 'exact',
        sample_rate: Annotated[int | None, typer.Option('--sample-rate', min=1, max=10_000_000, help='Source rate for sample-frame reporting with a bare detector JSON')] = None,
        fail_on_review: Annotated[bool, typer.Option('--fail-on-review', help='Write results, then exit 2 when any cue needs review')] = False,
    ) -> None:
        """Snap LRC timestamps to existing detected events; flag missing/remote beats."""
        destination = output
        if destination is None:
            destination = (results if results.is_dir() else cues.parent) / 'cues' / cues.stem
        try:
            config = CueSnapConfig(tolerance_ms, beat_model, downbeats, force_snap, precision)
            report = snap_existing_cues(results, cues, destination, config=config, sample_rate=sample_rate)
        except (ValueError, OSError) as exc:
            console.print(Text(str(exc), style='red'))
            raise typer.Exit(1) from exc
        print_cue_review(report, console)
        console.print(Text(f"Updated cues: {destination.resolve() / report['output_cue_file']}"))
        console.print(Text(f"Colour-coded review: {destination.resolve() / 'review.html'}"))
        if fail_on_review and report['review_count']:
            raise typer.Exit(2)
