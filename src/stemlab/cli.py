from __future__ import annotations

import importlib.util
import json
import shutil
from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.table import Table

from .bootstrap import bootstrap as do_bootstrap
from .models import MODEL_REGISTRY, profile as resolve_profile
from .pipeline import run_pipeline
from .types import PipelineConfig
from .util import device_string

app = typer.Typer(no_args_is_help=True, pretty_exceptions_show_locals=False, help="Multi-model music stem separation and analysis.")
console = Console()


@app.command()
def analyze(
    input_wav: Annotated[Path, typer.Argument(exists=True, dir_okay=False, readable=True, help="Master WAV to analyse")],
    output: Annotated[Path, typer.Option("--output", "-o", help="Named output folder")],
    profile: Annotated[str, typer.Option(help="full, practical or fast")] = "full",
    model: Annotated[list[str] | None, typer.Option("--model", help="Override profile; repeat for multiple models")] = None,
    device: Annotated[str, typer.Option(help="auto, cpu, cuda, cuda:N or mps where supported")] = "auto",
    whisper_model: Annotated[str, typer.Option(help="faster-whisper model id")] = "large-v3",
    strict: Annotated[bool, typer.Option("--strict", help="Abort on first backend failure")] = False,
    no_bootstrap: Annotated[bool, typer.Option("--no-bootstrap", help="Do not auto-clone/install external research backends")] = False,
    no_spectrograms: Annotated[bool, typer.Option("--no-spectrograms")] = False,
    no_whisper: Annotated[bool, typer.Option("--no-whisper")] = False,
    no_beats: Annotated[bool, typer.Option("--no-beats")] = False,
    no_vamp: Annotated[bool, typer.Option("--no-vamp", help="Skip Vamp Plugin Pack melody/harmony analysis")] = False,
    beat_transformer_single_fold: Annotated[bool, typer.Option("--beat-transformer-single-fold", help="Use one released fold instead of all eight")]=False,
):
    """Run separation, speech, Vamp melody/harmony analysis, beat tracking and SV export."""
    models = tuple(model) if model else resolve_profile(profile)
    invalid = [m for m in models if m not in MODEL_REGISTRY]
    if invalid:
        raise typer.BadParameter("Unknown model(s): " + ", ".join(invalid))
    cfg = PipelineConfig(
        input_wav=input_wav,
        output_dir=output,
        models=models,
        device=device,
        whisper_model=whisper_model,
        continue_on_error=not strict,
        bootstrap_external=not no_bootstrap,
        make_spectrograms=not no_spectrograms,
        run_whisper=not no_whisper,
        run_beats=not no_beats,
        run_vamp=not no_vamp,
        beat_transformer_ensemble=not beat_transformer_single_fold,
    )
    console.print(f"[bold]StemLab[/bold] device={device_string(device)} models={', '.join(models)}")
    result = run_pipeline(cfg, progress=lambda m: console.print(f"[cyan]→[/cyan] {m}"))
    errors = result.get("errors", [])
    console.print(f"[green]Output:[/green] {output.resolve()}")
    console.print(f"Completed with {len(errors)} recorded error(s).")
    if errors:
        console.print("See analysis.json for backend diagnostics.")
        if strict:
            raise typer.Exit(1)


@app.command("models")
def list_models():
    """Show the curated model registry."""
    table = Table("slug", "tier", "family", "stems", "description")
    for spec in MODEL_REGISTRY.values():
        table.add_row(spec.slug, spec.tier, spec.family, ", ".join(spec.stems or ("dynamic (53)",)), spec.description)
    console.print(table)


@app.command()
def bootstrap(
    target: Annotated[str, typer.Argument(help="scnet, beat-transformer, vamp, or all")] = "all",
):
    """Install/cache external runtimes, including Sonic Annotator + the Vamp Plugin Pack."""
    result = do_bootstrap(target)
    console.print_json(json.dumps(result))


@app.command()
def doctor():
    """Check local dependencies and accelerators."""
    packages = ["torch", "torchaudio", "demucs", "openunmix", "bs_roformer", "faster_whisper", "beat_this", "BeatNet"]
    table = Table("component", "status")
    for p in packages:
        table.add_row(p, "installed" if importlib.util.find_spec(p) else "missing")
    table.add_row("git", shutil.which("git") or "missing")
    table.add_row("sonic-visualiser", shutil.which("sonic-visualiser") or shutil.which("sonic-visualiser.exe") or "not on PATH")
    try:
        from .vamp_runtime import probe_vamp_runtime

        vamp = probe_vamp_runtime()
        table.add_row("sonic-annotator", vamp.get("annotator") or "missing")
        if vamp.get("ready"):
            vamp_status = "ready"
        else:
            missing = vamp.get("missing", [])
            vamp_status = f"missing {len(missing)} requested output(s)"
        table.add_row("Vamp Plugin Pack", vamp_status)
    except Exception as exc:
        table.add_row("sonic-annotator", "unavailable")
        table.add_row("Vamp Plugin Pack", f"probe failed: {exc}")
    table.add_row("auto device", device_string("auto"))
    console.print(table)


if __name__ == "__main__":
    app()
