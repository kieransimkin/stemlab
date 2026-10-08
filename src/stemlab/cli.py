from __future__ import annotations

import importlib.util
import json
import shutil
import sys
from pathlib import Path
from typing import Annotated

import typer
from rich.console import Console
from rich.table import Table

from .analysis.registry import ACTIONS
from .bootstrap import bootstrap as do_bootstrap
from .branding import AUTHOR_NAME, AUTHOR_SITE, MY_SONGS_URL, PROJECT_DESCRIPTION, REPOSITORY_URL
from .cue_cli import print_cue_review, register_cue_commands
from .models import MODEL_REGISTRY, profile as resolve_profile
from .pipeline import run_pipeline
from .types import PipelineConfig
from .util import device_string

app = typer.Typer(no_args_is_help=True, pretty_exceptions_show_locals=False, help=PROJECT_DESCRIPTION)
console = Console()
register_cue_commands(app, console)


@app.command("repair-spectrograms")
def repair_spectrograms(
    results: Annotated[Path, typer.Argument(exists=True, file_okay=False, help="Existing analysis result directory")],
    max_plot_frames: Annotated[int, typer.Option("--max-plot-frames", min=2, help="Maximum time frames passed to Matplotlib")] = 8192,
):
    """Repair failed spectrogram PNGs from retained full-resolution NPZ evidence."""
    from .spectrogram_repair import repair_failed_spectrograms

    try:
        report = repair_failed_spectrograms(results, max_plot_frames=max_plot_frames)
    except (ValueError, KeyError, OSError) as exc:
        raise typer.BadParameter(str(exc)) from exc
    console.print(
        f"Spectrogram repair: {report['repaired_count']} repaired; "
        f"{report['remaining_error_count']} pipeline error(s) remain."
    )


@app.command()
def analyze(
    input_wav: Annotated[Path, typer.Argument(exists=True, dir_okay=False, readable=True, help="Master WAV to analyse")],
    output: Annotated[Path, typer.Option("--output", "-o", help="Named output folder")],
    profile: Annotated[str, typer.Option(help="full, practical or fast")] = "full",
    model: Annotated[list[str] | None, typer.Option("--model", help="Override profile; repeat for multiple models")] = None,
    device: Annotated[str, typer.Option(help="auto, cpu, cuda, cuda:N or mps where supported")] = "auto",
    whisper_model: Annotated[str, typer.Option(help="faster-whisper model id")] = "large-v3",
    whisper_condition_on_previous_text: Annotated[
        bool,
        typer.Option(
            "--whisper-condition-on-previous-text",
            help="Enable Whisper prior-window prompting; disabled by default to avoid decoder repetition cascades",
        ),
    ] = False,
    strict: Annotated[bool, typer.Option("--strict", help="Abort on first backend failure")] = False,
    no_bootstrap: Annotated[bool, typer.Option("--no-bootstrap", help="Do not auto-clone/install external research backends")] = False,
    no_spectrograms: Annotated[bool, typer.Option("--no-spectrograms")] = False,
    no_whisper: Annotated[bool, typer.Option("--no-whisper")] = False,
    no_beats: Annotated[bool, typer.Option("--no-beats")] = False,
    no_vamp: Annotated[bool, typer.Option("--no-vamp", help="Skip Vamp Plugin Pack melody/harmony analysis")] = False,
    no_deep_analysis: Annotated[bool, typer.Option("--no-deep-analysis", help="Skip derived sonic/harmonic/rhythmic/lyrical analysis")] = False,
    no_loops: Annotated[bool, typer.Option("--no-loops", help="Skip verse/chorus loop discovery")] = False,
    export_loops: Annotated[bool, typer.Option("--export-loops", help="Write accepted native-rate loops as WAVs")] = False,
    max_loop_seconds: Annotated[float | None, typer.Option("--max-loop-seconds", min=0.001, help="Maximum discovered loop duration in seconds")] = None,
    no_structure: Annotated[bool, typer.Option("--no-structure", help="Skip All-In-One functional section analysis")] = False,
    no_text_semantics: Annotated[bool, typer.Option("--no-text-semantics", help="Skip sentence-embedding analysis of lyrics/transcript")] = False,
    audio_semantics: Annotated[bool, typer.Option("--audio-semantics", help="Enable MuQ-MuLan zero-shot music/text similarity (CC-BY-NC model weights)")] = False,
    basic_pitch: Annotated[bool, typer.Option("--basic-pitch", help="Enable Basic Pitch MIDI/note transcription on isolated stems")] = False,
    midi_model: Annotated[list[str] | None, typer.Option("--midi-model", help="Optional MIDI model; repeat (see midi-models)")] = None,
    midi_target: Annotated[str, typer.Option("--midi-target", help="auto: mix for MT3, appropriate stems for specialists; or master/stems")] = "auto",
    midi_allow_downloads: Annotated[bool, typer.Option("--midi-allow-downloads", help="Permit missing MIDI checkpoints to be downloaded")] = False,
    evidence_model: Annotated[list[str] | None, typer.Option("--evidence-model", help="Optional complementary evidence model; repeat (see evidence-models)")] = None,
    evidence_allow_downloads: Annotated[bool, typer.Option("--evidence-allow-downloads", help="Permit selected evidence backends to download missing checkpoints")] = False,
    evidence_model_path: Annotated[list[str] | None, typer.Option("--evidence-model-path", help="MODEL=/trusted/checkpoint/or/model-dir; repeat")] = None,
    evidence_backend_python: Annotated[list[str] | None, typer.Option("--evidence-backend-python", help="MODEL=/absolute/path/to/python; repeat for isolated runtimes")] = None,
    evidence_canonical_text: Annotated[Path | None, typer.Option("--evidence-canonical-text", exists=True, dir_okay=False, help="Approved lyrics/text for forced alignment")] = None,
    evidence_language: Annotated[str, typer.Option("--evidence-language", help="Language label passed to forced alignment")] = "English",
    evidence_chord_dictionary: Annotated[str, typer.Option("--evidence-chord-dictionary", help="submission, ismir2017 or full for lv-chordia")] = "submission",
    evidence_prompt: Annotated[str | None, typer.Option("--evidence-prompt", help="Prompt/question for prompted separation or music-language backends")] = None,
    all_in_one_embeddings: Annotated[bool, typer.Option("--all-in-one-embeddings", help="Retain frame-level All-In-One structure embeddings (large output)")] = False,
    text_semantic_model: Annotated[str, typer.Option("--text-semantic-model", help="SentenceTransformer model id for lyric semantics")] = "sentence-transformers/all-MiniLM-L6-v2",
    audio_semantic_model: Annotated[str, typer.Option("--audio-semantic-model", help="MuQ-MuLan model id")] = "OpenMuQ/MuQ-MuLan-large",
    snap_cues: Annotated[Path | None, typer.Option("--snap-cues", exists=True, dir_okay=False, help="Snap this LRC cue file after beat detection; never overwrite it")] = None,
    cue_tolerance_ms: Annotated[float, typer.Option("--cue-tolerance-ms", min=0, max=60000, help="Flag cues with no detected beat within this gap")] = 150,
    cue_beat_model: Annotated[str, typer.Option("--cue-beat-model", help="auto or a detector id")] = "auto",
    cue_downbeats: Annotated[bool, typer.Option("--cue-downbeats", help="Snap only to detected downbeats")] = False,
    cue_force_snap: Annotated[bool, typer.Option("--cue-force-snap", help="Snap distant cues but retain REVIEW warnings")] = False,
    cue_precision: Annotated[str, typer.Option("--cue-precision", help="exact, milliseconds or centiseconds")] = "exact",
    beat_transformer_single_fold: Annotated[bool, typer.Option("--beat-transformer-single-fold", help="Use one released fold instead of all eight")]=False,
):
    """Run separation plus sonic, speech, structure, harmony, rhythm and semantic analysis."""
    if snap_cues is not None:
        from .cues import CueSnapConfig, read_lrc
        try:
            CueSnapConfig(cue_tolerance_ms, cue_beat_model, cue_downbeats, cue_force_snap, cue_precision)
            read_lrc(snap_cues)
            if no_beats and no_structure:
                raise ValueError("--snap-cues needs beat or structure detection; use snap-cues for saved results")
        except (ValueError, OSError) as exc:
            raise typer.BadParameter(str(exc)) from exc
    if export_loops and (no_loops or no_deep_analysis):
        raise typer.BadParameter("--export-loops cannot be combined with --no-loops or --no-deep-analysis")
    if midi_model:
        from .analysis.midi import MidiConfig
        if no_deep_analysis or (basic_pitch and "basic_pitch" in midi_model):
            raise typer.BadParameter("MIDI needs deep analysis; do not request Basic Pitch twice")
        try:
            MidiConfig(models=tuple(midi_model), target=midi_target,
                       allow_downloads=midi_allow_downloads, device=device)
        except ValueError as exc:
            raise typer.BadParameter(str(exc)) from exc
    evidence_paths = {}
    evidence_pythons = {}
    if evidence_model_path or evidence_backend_python:
        from .analysis.midi.registry import parse_overrides
        evidence_paths = parse_overrides(evidence_model_path)
        evidence_pythons = parse_overrides(evidence_backend_python)
    evidence_text = evidence_canonical_text.read_text(encoding="utf-8") if evidence_canonical_text else None
    if evidence_model:
        from .analysis.evidence import EvidenceConfig
        try:
            ecfg = EvidenceConfig(models=tuple(evidence_model), device=device,
                                  allow_downloads=evidence_allow_downloads,
                                  model_paths=evidence_paths, backend_pythons=evidence_pythons,
                                  canonical_text=evidence_text, language=evidence_language,
                                  chord_dictionary=evidence_chord_dictionary, prompt=evidence_prompt)
            ecfg.validate_paths()
        except ValueError as exc:
            raise typer.BadParameter(str(exc)) from exc
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
        whisper_condition_on_previous_text=whisper_condition_on_previous_text,
        continue_on_error=not strict,
        bootstrap_external=not no_bootstrap,
        make_spectrograms=not no_spectrograms,
        run_whisper=not no_whisper,
        run_beats=not no_beats,
        run_vamp=not no_vamp,
        beat_transformer_ensemble=not beat_transformer_single_fold,
        run_deep_analysis=not no_deep_analysis,
        run_structure=not no_structure,
        all_in_one_embeddings=all_in_one_embeddings,
        run_text_semantics=not no_text_semantics,
        text_semantic_model=text_semantic_model,
        run_audio_semantics=audio_semantics,
        audio_semantic_model=audio_semantic_model,
        run_basic_pitch=basic_pitch,
        midi_models=tuple(midi_model or ()),
        midi_target=midi_target,
        midi_allow_downloads=midi_allow_downloads,
        evidence_models=tuple(evidence_model or ()),
        evidence_allow_downloads=evidence_allow_downloads,
        evidence_model_paths=evidence_paths,
        evidence_backend_pythons=evidence_pythons,
        evidence_canonical_text=evidence_text,
        evidence_language=evidence_language,
        evidence_chord_dictionary=evidence_chord_dictionary,
        evidence_prompt=evidence_prompt,
        run_loops=not no_loops,
        export_loops=export_loops,
        loop_max_seconds=max_loop_seconds,
        cue_file=snap_cues,
        cue_tolerance_ms=cue_tolerance_ms,
        cue_beat_model=cue_beat_model,
        cue_downbeats_only=cue_downbeats,
        cue_force_snap=cue_force_snap,
        cue_precision=cue_precision,
    )
    console.print(f"[bold]StemLab[/bold] device={device_string(device)} models={', '.join(models)}")
    result = run_pipeline(cfg, progress=lambda m: console.print(f"[cyan]→[/cyan] {m}"))
    if result.get("cue_alignment"):
        print_cue_review(result["cue_alignment"], console)
    errors = result.get("errors", [])
    deep_errors = (result.get("deep_analysis") or {}).get("errors", [])
    console.print(f"[green]Output:[/green] {output.resolve()}")
    console.print(f"Completed with {len(errors)} pipeline error(s) and {len(deep_errors)} deep-analysis error(s).")
    if errors or deep_errors:
        console.print("See analysis.json and deep/summary.json for backend diagnostics.")
        if strict:
            raise typer.Exit(1)


@app.command("loops")
def find_loops(
    results: Annotated[Path, typer.Argument(exists=True, file_okay=False, help="Existing analysis result directory")],
    export_loops: Annotated[bool, typer.Option("--export-loops", help="Write accepted loops and exploratory audition slices as WAVs")] = False,
    max_bars: Annotated[int, typer.Option("--max-bars", min=1, max=64)] = 16,
    max_seconds: Annotated[float | None, typer.Option("--max-seconds", min=0.001, help="Maximum loop duration in seconds (no limit by default)")] = None,
    per_section: Annotated[int, typer.Option("--per-section", min=1, max=64)] = 1,
    mode: Annotated[str, typer.Option("--mode", help="strict or exploratory; exploratory near-misses are not accepted loops")] = "strict",
    exploratory_algorithm: Annotated[str, typer.Option("--exploratory-algorithm", help="waveform or spectral_context ranking")] = "spectral_context",
    search_scope: Annotated[str, typer.Option("--search-scope", help="sections or whole_song (exploratory only)")] = "sections",
):
    """Find loops in saved evidence without rerunning separation or models."""
    from .analysis.loops import LoopConfig, analyze_existing_loops

    try:
        report = analyze_existing_loops(results, export_audio=export_loops,
            config=LoopConfig(max_bars=max_bars, max_seconds=max_seconds,
                              loops_per_section=per_section, mode=mode,
                              exploratory_algorithm=exploratory_algorithm, search_scope=search_scope))
    except (ValueError, KeyError, OSError) as exc:
        raise typer.BadParameter(str(exc)) from exc
    console.print(f"{report['loop_count']} accepted loop(s); {report['exploratory_count']} audition candidate(s); "
                  f"{len(report['unresolved_sections'])} unresolved search window(s).")
    console.print(str(results / "deep/loops/loops.json"))


@app.command("midi-models")
def list_midi_models():
    """List MIDI backends without importing model runtimes or downloading weights."""
    from .analysis.midi import MIDI_MODELS
    table = Table("model", "target", "extra", "package present", "notes")
    for spec in MIDI_MODELS.values():
        present = importlib.util.find_spec(spec.module) is not None
        table.add_row(spec.slug, spec.target, spec.extra, "yes" if present else "no", spec.notes)
    console.print(table)
    console.print("Package presence is not model/GPU readiness; inference is optional and separately tested.")


@app.command("midi")
def extract_midi(
    source: Annotated[Path, typer.Argument(exists=True, help="Audio file or existing StemLab result folder")],
    output: Annotated[Path | None, typer.Option("--output", "-o", help="New/empty output directory; defaults to RESULTS/deep/midi")] = None,
    model: Annotated[list[str] | None, typer.Option("--model", "--midi-model", help="Repeat to compare models; default basic_pitch")] = None,
    target: Annotated[str, typer.Option(help="auto, master or stems")] = "auto",
    stem: Annotated[list[str] | None, typer.Option("--stem", help="Restrict saved stems by name; repeat")] = None,
    max_stems: Annotated[int, typer.Option("--max-stems", min=1, max=64)] = 6,
    device: Annotated[str, typer.Option(help="auto, cpu, cuda or cuda:N; PyTorch models")] = "auto",
    allow_model_downloads: Annotated[bool, typer.Option("--allow-model-downloads")] = False,
    checkpoint: Annotated[list[str] | None, typer.Option("--checkpoint", help="MODEL=trusted checkpoint file; repeat")] = None,
    transkun_config: Annotated[Path | None, typer.Option("--transkun-config", exists=True, dir_okay=False)] = None,
    backend_python: Annotated[list[str] | None, typer.Option("--backend-python", help="MODEL=/absolute/path/to/python; repeat for isolated environments")] = None,
    timeout: Annotated[float, typer.Option("--timeout", min=1, max=86400, help="Per-model/per-source timeout in seconds")] = 1800,
    no_plots: Annotated[bool, typer.Option("--no-plots")] = False,
    strict: Annotated[bool, typer.Option("--strict", help="Stop at first failure; retain diagnostics")] = False,
):
    """Extract MIDI without rerunning separation, beats, lyrics or other analyses."""
    from .analysis.midi import MidiConfig, transcribe_path
    from .analysis.midi.registry import parse_overrides
    try:
        config = MidiConfig(models=tuple(model or ["basic_pitch"]), target=target,
                            stem_names=tuple(stem or ()), max_stems=max_stems, device=device,
                            allow_downloads=allow_model_downloads, checkpoints=parse_overrides(checkpoint),
                            transkun_config=str(transkun_config.resolve()) if transkun_config else None,
                            backend_pythons=parse_overrides(backend_python), timeout_seconds=timeout,
                            make_plots=not no_plots, continue_on_error=not strict)
        config.validate_paths()
        if source.is_file() and output is None:
            raise ValueError("--output is required for an audio file")
    except (ValueError, OSError) as exc:
        raise typer.BadParameter(str(exc)) from exc
    try:
        report = transcribe_path(source, output, config=config,
                                 progress=lambda message: console.print(message, markup=False))
    except (ValueError, OSError, RuntimeError, KeyError) as exc:
        console.print(str(exc), markup=False)
        raise typer.Exit(1) from exc
    console.print(f"MIDI status: {report['status']}; {report['completed_count']} successful extraction(s), "
                  f"{len(report['errors'])} failure(s), {len(report['skipped'])} skipped model(s).")
    console.print(str((output or source / "deep/midi").resolve() / "report.json"))
    if report["status"] != "completed":
        raise typer.Exit(1)


@app.command("evidence-models")
def list_evidence_models():
    """List optional complementary evidence models without importing their runtimes."""
    from .analysis.evidence import EVIDENCE_MODELS
    table = Table("model", "category", "target", "extra", "commercial", "package present", "description")
    for spec in EVIDENCE_MODELS.values():
        present = importlib.util.find_spec(spec.module) is not None
        table.add_row(spec.slug, spec.category, spec.target, spec.extra,
                      "yes" if spec.commercial_safe else "restricted/review",
                      "yes" if present else "no", spec.description)
    console.print(table)
    console.print("Availability does not imply checkpoint readiness or validated musical accuracy.")


@app.command("evidence")
def extract_evidence(
    source: Annotated[Path, typer.Argument(exists=True, help="Audio file or existing StemLab result folder")],
    output: Annotated[Path | None, typer.Option("--output", "-o", help="New/empty destination; defaults to RESULTS/deep/evidence_models")] = None,
    model: Annotated[list[str] | None, typer.Option("--model", help="Evidence backend; repeat")] = None,
    target: Annotated[str, typer.Option(help="auto, master, vocals or stems")] = "auto",
    device: Annotated[str, typer.Option(help="auto, cpu, cuda or cuda:N")] = "auto",
    allow_model_downloads: Annotated[bool, typer.Option("--allow-model-downloads")] = False,
    model_path: Annotated[list[str] | None, typer.Option("--model-path", help="MODEL=/trusted/checkpoint/or/model-dir; repeat")] = None,
    backend_python: Annotated[list[str] | None, typer.Option("--backend-python", help="MODEL=/absolute/path/to/python; repeat")] = None,
    canonical_text: Annotated[Path | None, typer.Option("--canonical-text", exists=True, dir_okay=False, help="Approved lyrics/text for forced alignment")] = None,
    language: Annotated[str, typer.Option(help="Language label for forced alignment")] = "English",
    chord_dictionary: Annotated[str, typer.Option("--chord-dictionary", help="submission, ismir2017 or full")] = "submission",
    prompt: Annotated[str | None, typer.Option("--prompt", help="Prompt/question passed to external prompted-separation or music-language models")] = None,
    timeout: Annotated[float, typer.Option("--timeout", min=1, max=86400, help="Per-model/per-source timeout seconds")] = 1800,
    strict: Annotated[bool, typer.Option("--strict", help="Stop at first backend failure")] = False,
):
    """Run optional independent evidence models without rerunning separation unless needed."""
    from .analysis.evidence import EvidenceConfig, analyze_path
    from .analysis.midi.registry import parse_overrides
    try:
        cfg = EvidenceConfig(models=tuple(model or ("firered_aed", "swift_f0")), target=target,
                             device=device, allow_downloads=allow_model_downloads,
                             timeout_seconds=timeout, continue_on_error=not strict,
                             model_paths=parse_overrides(model_path),
                             backend_pythons=parse_overrides(backend_python),
                             canonical_text=canonical_text.read_text(encoding="utf-8") if canonical_text else None,
                             language=language, chord_dictionary=chord_dictionary, prompt=prompt)
        cfg.validate_paths()
        if source.is_file() and output is None:
            raise ValueError("--output is required for an audio file")
        report = analyze_path(source, output, config=cfg,
                              progress=lambda message: console.print(message, markup=False))
    except (ValueError, OSError, RuntimeError, KeyError) as exc:
        raise typer.BadParameter(str(exc)) from exc
    console.print(f"Evidence status: {report['status']}; {report.get('completed_count', 0)} completed; "
                  f"{len(report['errors'])} failure(s); {len(report['skipped'])} skipped.")
    console.print(str((output or source / "deep/evidence_models").resolve() / "report.json"))
    if report["status"] == "failed":
        raise typer.Exit(1)


@app.command("models")
def list_models():
    """Show the curated source-separation model registry."""
    table = Table("slug", "tier", "family", "stems", "description")
    for spec in MODEL_REGISTRY.values():
        table.add_row(spec.slug, spec.tier, spec.family, ", ".join(spec.stems or ("dynamic (53)",)), spec.description)
    console.print(table)


@app.command("analysis-actions")
def list_analysis_actions():
    """Show every high-level analysis route, dependency and default status."""
    table = Table("action", "category", "default", "dependency", "description")
    for action in ACTIONS:
        default = "yes" if action.default else "opt-in"
        if action.licence_note:
            default += " *"
        table.add_row(action.slug, action.category, default, action.dependency, action.description)
    console.print(table)
    console.print("\n[dim]* licence/runtime caveats are intentional; see README and the generated result metadata.[/dim]")


@app.command()
def bootstrap(
    target: Annotated[str, typer.Argument(help="scnet, beatnet, beat-transformer, vamp, or all")] = "all",
):
    """Install/cache external runtimes, including Sonic Annotator + the Vamp Plugin Pack."""
    result = do_bootstrap(target)
    console.print_json(json.dumps(result))


@app.command()
def serve(
    host: Annotated[str, typer.Option(help="HTTP listen address")] = "0.0.0.0",
    port: Annotated[int, typer.Option(help="HTTP listen port")] = 8000,
    results: Annotated[Path, typer.Option("--results", help="Content-addressed results root")] = Path("results"),
    scheduler_jobs: Annotated[int, typer.Option("--scheduler-jobs", help="Maximum concurrent CLI analyses")] = 1,
    profile: Annotated[str, typer.Option(help="Analysis profile for uploaded audio")] = "full",
    device: Annotated[str, typer.Option(help="Device passed to StemLab analyses")] = "auto",
):
    """Expose StemLab as an HTTP PUT + Socket.IO analysis microservice."""
    try:
        from .server import run_server
    except RuntimeError as exc:
        console.print(f"[red]{exc}[/red]")
        raise typer.Exit(2) from exc

    run_server(
        host=host,
        port=port,
        results_dir=results,
        max_jobs=scheduler_jobs,
        profile=profile,
        device=device,
    )


@app.command()
def doctor():
    """Check local dependencies, analysis actions and accelerators."""
    packages = [
        "torch", "torchaudio", "demucs", "openunmix", "bs_roformer", "faster_whisper",
        "beat_this", "BeatNet", "librosa", "pyloudnorm", "cmudict", "sentence_transformers",
        "allin1_infer", "muq", "basic_pitch",
    ]
    table = Table("component", "status")
    for p in packages:
        if p == "BeatNet":
            try:
                from .bootstrap import ensure_beatnet_runtime

                ensure_beatnet_runtime(install=False)
                status = "ready (installed or verified StemLab cache)"
            except Exception:
                status = "missing (run `stemlab bootstrap beatnet`)"
        elif p == "beat_this":
            try:
                from .bootstrap import ensure_beat_this_checkpoint

                ensure_beat_this_checkpoint(install=False)
                status = "ready (installed package and verified StemLab checkpoint)"
            except Exception:
                status = "package installed; checkpoint missing (run `stemlab bootstrap beat-this`)" if importlib.util.find_spec(p) else "missing"
        else:
            status = "installed" if importlib.util.find_spec(p) else "missing"
        if p == "allin1_infer" and status == "missing":
            status = "missing (install the deep/all extra)"
        if p == "basic_pitch" and sys.version_info >= (3, 12) and status == "missing":
            status = "missing (recommended on Python 3.10/3.11)"
        if p == "muq" and status == "installed":
            status = "installed (weights are CC-BY-NC 4.0)"
        table.add_row(p, status)
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
    console.print(f"\n[bold]{AUTHOR_NAME}[/bold] · {AUTHOR_SITE}")
    console.print(f"Songs: {MY_SONGS_URL}")
    console.print(f"Source: {REPOSITORY_URL}")


if __name__ == "__main__":
    app()
