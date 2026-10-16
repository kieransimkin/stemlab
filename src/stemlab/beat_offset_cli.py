"""Model-free first-beat/pip comparison across saved beat detectors and BPM bases."""
from pathlib import Path
from typing import Annotated

import typer
from rich.table import Table


def register_beat_offset_commands(app, console):
    @app.command('beat-offset')
    def beat_offset(
        results: Annotated[Path, typer.Argument(exists=True, file_okay=False, help='Existing StemLab analysis directory')],
        output: Annotated[Path, typer.Option('--output', '-o', help='New JSON/CSV report directory')],
        canonical_bpm: Annotated[float | None, typer.Option('--canonical-bpm', min=1, max=400, help='Canonical tempo; default canonical.json, never a detector estimate')] = None,
        audio: Annotated[Path | None, typer.Option('--audio', exists=True, dir_okay=False, help='Optionally verify the exact original audio hash/metadata')] = None,
        alignment_bpm_basis: Annotated[str | None, typer.Option('--alignment-bpm-basis', help='Export a source-bound beat-alignment.json for this explicit basis: canonical, combined, combined_family or combined_fit')] = None,
        alignment_analysis: Annotated[str, typer.Option('--alignment-analysis', help='Saved analysis ID for the optional renderer/playback handoff')] = 'consensus',
    ):
        """Align each saved first beat to pip 0 at canonical and combined-consensus BPM."""
        from .analysis.beat_offsets import write_beat_offsets
        try:
            report = write_beat_offsets(results, output, canonical_bpm=canonical_bpm, audio=audio,
                alignment_bpm_basis=alignment_bpm_basis, alignment_analysis=alignment_analysis)
        except (ValueError, OSError) as exc:
            raise typer.BadParameter(str(exc)) from exc
        table = Table('Beat analysis', 'BPM basis', 'BPM', 'Additive pip offset', 'Whole pips', 'Residual ms')
        for row in report['comparisons']:
            valid = row['status'] == 'available'
            table.add_row(row['analysis_id'], row['bpm_basis'], f"{row['bpm']:.6f}" if row['bpm'] else 'unavailable',
                f"{row['offset_pips']:+.6f}" if valid else row.get('reason', 'unavailable'),
                str(row['integer_offset_pips']) if valid else '—',
                f"{row['integer_residual_seconds']*1000:+.6f}" if valid else '—')
        console.print(table)
        console.print('64 native pips per beat. Add the signed offset to the source-clock pip; first beat maps to 0.')
        console.print('Detector phases and the combined BPM remain estimates. Canonical metadata/audio are unchanged.')
        console.print(str(output.resolve()/'beat-offsets.json'))
