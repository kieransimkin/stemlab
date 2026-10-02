"""Sequential, failure-isolated transcription on sources or saved StemLab stems."""
from __future__ import annotations

import json
import os
import subprocess
import sys
import time
from dataclasses import asdict
from pathlib import Path
from typing import Callable

from stemlab.branding import attribution
from stemlab.manifest import write_manifest
from stemlab.types import StemArtifact
from stemlab.util import sha256_file, slugify, write_json
from .registry import MIDI_MODELS, MidiConfig, MidiModel

_PITCHED = {"piano", "guitar", "bass", "vocals", "vocal", "lead_vocals", "voice", "strings",
            "violin", "cello", "flute", "saxophone", "synth", "keyboard", "keys", "electric_piano", "other"}
_PIANO = {"piano", "keyboard", "keys", "electric_piano", "grand_piano", "acoustic_piano"}
_PRIORITY = {name: i for i, name in enumerate(
    ("bs_roformer_sw", "scnet_xl_ihf", "htdemucs_6s", "htdemucs_ft", "openunmix_umxhq"))}


def select_sources(master: Path, stems: list[StemArtifact], spec: MidiModel, config: MidiConfig,
                   explicit_audio: bool = False) -> list[StemArtifact]:
    """An explicit audio file is deliberately given to every selected backend.

    For an analysis folder, auto targets the mix for MT3 and appropriate stems
    for specialists. A missing piano stem is never silently replaced by the mix.
    """
    if config.target == "master" or (explicit_audio and config.target == "auto" and not config.stem_names):
        return [StemArtifact("source", "master", master)]
    if spec.target == "master" and config.target == "auto" and not config.stem_names:
        return [StemArtifact("source", "master", master)]
    allowed = _PIANO if spec.target == "piano" else _PITCHED if spec.target == "pitched_stems" else None
    filters = {n.lower().strip().replace(" ", "_") for n in config.stem_names}
    chosen, seen = [], set()
    for stem in sorted(stems, key=lambda s: (_PRIORITY.get(s.model, 99), s.model, s.stem, str(s.path))):
        name = stem.stem.lower().strip().replace(" ", "_")
        canonical = "vocals" if name in {"vocal", "lead_vocals", "voice"} else name
        if (stem.model == "speech" or canonical in seen or (allowed is not None and name not in allowed)
                or (filters and name not in filters and canonical not in filters)):
            continue
        chosen.append(stem)
        seen.add(canonical)
        if len(chosen) == config.max_stems:
            break
    return chosen


def _terminate(proc: subprocess.Popen) -> None:
    # Retain the parent's process group, so the existing Codex job cancellation
    # can terminate these workers too. psutil is used for a per-model timeout.
    import psutil
    try:
        children = psutil.Process(proc.pid).children(recursive=True)
    except psutil.NoSuchProcess:
        children = []
    for child in reversed(children):
        try:
            child.kill()
        except psutil.NoSuchProcess:
            pass
    if proc.poll() is None:
        proc.kill()
    proc.wait(timeout=10)


def invoke_worker(request: dict, folder: Path, config: MidiConfig) -> dict:
    write_json(folder / "request.json", request)
    python = config.backend_pythons.get(request["model"], sys.executable)
    command = [str(Path(python).expanduser().resolve()), "-I", str(Path(__file__).with_name("worker.py")),
               "--request", str(folder / "request.json")]
    started = time.monotonic()
    log_path = folder / "backend.log"
    with log_path.open("xb") as log:
        proc = subprocess.Popen(command, stdin=subprocess.DEVNULL, stdout=log, stderr=subprocess.STDOUT,
                                shell=False, cwd=folder,
                                env=dict(os.environ, PYTHONUNBUFFERED="1", TOKENIZERS_PARALLELISM="false"))
        try:
            while proc.poll() is None:
                if time.monotonic() - started > config.timeout_seconds:
                    raise TimeoutError(f"MIDI worker exceeded {config.timeout_seconds:g} seconds")
                if log_path.stat().st_size > 64 * 1024 * 1024:
                    raise RuntimeError("MIDI worker log exceeded 64 MiB")
                time.sleep(.1)
        except BaseException:
            _terminate(proc)
            raise
    if proc.returncode != 0:
        details = "See backend.log"
        failure = folder / "failure.json"
        if failure.is_file() and failure.stat().st_size <= 1024 * 1024:
            details = json.loads(failure.read_text(encoding="utf-8")).get("message", details)
        raise RuntimeError(f"MIDI worker exited {proc.returncode}: {details}")
    metadata = folder / "backend.json"
    if not metadata.is_file() or metadata.stat().st_size > 2 * 1024 * 1024:
        raise ValueError("MIDI worker did not return bounded provenance metadata")
    return json.loads(metadata.read_text(encoding="utf-8"))


def analyze_midi(master: Path, output_dir: Path, *, stems: list[StemArtifact] | None = None,
                 config: MidiConfig | None = None, explicit_audio: bool = False,
                 progress: Callable[[str], None] | None = None) -> dict:
    """Write a new report, never replace an earlier extraction or source audio."""
    import soundfile as sf
    try:
        import pretty_midi  # noqa: F401 - fail before spawning costly inference
        import psutil  # noqa: F401
    except ImportError as exc:
        raise RuntimeError('Install the lightweight MIDI support: pip install -e ".[midi]"') from exc
    from .artifacts import read_performance, save_note_artifacts
    config = config or MidiConfig()
    config.validate_paths()
    progress = progress or (lambda _: None)
    master = Path(master).expanduser().resolve()
    if not master.is_file() or sf.info(master).frames <= 0:
        raise ValueError("Source audio is missing or empty")
    output = Path(output_dir).expanduser().resolve()
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        raise FileExistsError("MIDI output must be a new or empty directory; select a new -o path")
    output.mkdir(parents=True, exist_ok=True)
    report = {"schema": "stemlab.midi-analysis.v1", "attribution": attribution(),
              "models_requested": list(config.models), "config": asdict(config),
              "analyses": [], "errors": [], "skipped": [], "status": "running",
              "completed_count": 0, "note_count": 0,
              "source_audio": str(master), "source_sha256": sha256_file(master),
              "method_notes": "Independent model outputs, never merged into an alleged consensus. "
                              "Native MIDI preserved, including tempo, pedals, pitch bends and drum parts. "
                              "Audio is unchanged. MIDI notes/instrument labels are estimates, not ground truth."}
    write_json(output / "report.json", report)
    for slug in config.models:
        spec = MIDI_MODELS[slug]
        selected = select_sources(master, stems or [], spec, config, explicit_audio)
        if not selected:
            report["skipped"].append({"model": slug, "reason": "No matching source for this model/target/stem filter"})
        for index, stem in enumerate(selected, 1):
            path = stem.path.expanduser().resolve()
            label = f"{index:02d}-{slugify(stem.model)[:48]}-{slugify(stem.stem)[:48]}"
            folder = output / slug / label
            folder.mkdir(parents=True)
            started = time.monotonic()
            item = {"model": slug, "model_title": spec.title, "licence": spec.licence,
                    "upstream": spec.upstream, "source_audio": str(path), "source_model": stem.model,
                    "source_stem": stem.stem, "status": "running",
                    "log": (folder / "backend.log").relative_to(output).as_posix()}
            progress(f"MIDI: {slug} / {stem.model}/{stem.stem}")
            try:
                info = sf.info(path)
                if info.frames <= 0:
                    raise ValueError("Selected stem contains no audio frames")
                source_hash = sha256_file(path)
                request = {"model": slug, "source": str(path), "device": config.device,
                           "allow_downloads": config.allow_downloads,
                           "checkpoint": (str(Path(config.checkpoints[slug]).expanduser().resolve())
                                          if slug in config.checkpoints else None),
                           "transkun_config": (str(Path(config.transkun_config).expanduser().resolve())
                                               if config.transkun_config else None)}
                item["backend"] = invoke_worker(request, folder, config)
                if sha256_file(path) != source_hash:
                    raise ValueError("Source audio changed during MIDI inference")
                performance = read_performance(folder / "transcription.mid", info.samplerate, info.frames)
                performance.update(model=slug, model_title=spec.title, source_audio=str(path),
                                   source_sha256=source_hash, source_model=stem.model, source_stem=stem.stem)
                files = save_note_artifacts(folder, performance, config.make_plots)
                item.update(status="completed", note_count=performance["note_count"],
                            warnings=performance["warnings"], source_sha256=source_hash,
                            sample_rate=info.samplerate, source_frames=info.frames,
                            files={k: (folder / v).relative_to(output).as_posix() for k, v in files.items()})
            except Exception as exc:
                item.update(status="failed", error={"type": type(exc).__name__, "message": str(exc)})
                report["errors"].append({"model": slug, "source": str(path), **item["error"]})
                if not config.continue_on_error:
                    item["elapsed_seconds"] = time.monotonic() - started
                    report["analyses"].append(item)
                    report["completed_count"] = sum(r["status"] == "completed" for r in report["analyses"])
                    report["note_count"] = sum(r.get("note_count", 0) for r in report["analyses"])
                    report["status"] = "failed"
                    write_json(output / "report.json", report)
                    write_manifest(output)
                    raise
            item["elapsed_seconds"] = time.monotonic() - started
            report["analyses"].append(item)
            write_json(output / "report.json", report)
    completed = sum(r["status"] == "completed" for r in report["analyses"])
    report["completed_count"] = completed
    report["note_count"] = sum(r.get("note_count", 0) for r in report["analyses"])
    report["status"] = ("completed_with_errors" if report["errors"] or report["skipped"] else "completed")
    if not completed:
        report["status"] = "failed" if report["errors"] else "no_matching_sources"
    write_json(output / "report.json", report)
    write_manifest(output)
    return report


def _inside(root: Path, relative: str) -> Path:
    path = Path(relative)
    if path.is_absolute() or ".." in path.parts:
        raise ValueError("Saved source/stem paths must be relative and inside the result directory")
    resolved = (root / path).resolve()
    if not resolved.is_relative_to(root) or not resolved.is_file():
        raise ValueError("Saved source/stem missing or outside the result directory")
    return resolved


def saved_sources(results: Path) -> tuple[Path, list[StemArtifact]]:
    root = Path(results).expanduser().resolve()
    manifest = root / "analysis.json"
    if not manifest.is_file() or manifest.stat().st_size > 32 * 1024 * 1024:
        raise ValueError("Choose a StemLab result containing analysis.json")
    data = json.loads(manifest.read_text(encoding="utf-8"))
    source = data["source"]
    master = _inside(root, source["copied_path"])
    if not source.get("sha256") or sha256_file(master) != source["sha256"]:
        raise ValueError("Copied source does not match the saved SHA-256")
    stems = []
    for model in data.get("models", []):
        if model.get("error"):
            continue
        for stem in model.get("stems", []):
            path = _inside(root, stem["path"])
            stems.append(StemArtifact(str(stem.get("model", model.get("spec", {}).get("slug", "unknown"))),
                                      str(stem["stem"]), path))
    return master, stems


def transcribe_path(source: Path, output_dir: Path | None = None, *, config: MidiConfig | None = None,
                    progress: Callable[[str], None] | None = None) -> dict:
    source = Path(source).expanduser().resolve()
    if source.is_dir():
        master, stems = saved_sources(source)
        return analyze_midi(master, output_dir or source / "deep/midi", stems=stems,
                            config=config, progress=progress)
    if output_dir is None:
        raise ValueError("An audio file requires an explicit --output directory")
    return analyze_midi(source, output_dir, config=config, explicit_audio=True, progress=progress)
