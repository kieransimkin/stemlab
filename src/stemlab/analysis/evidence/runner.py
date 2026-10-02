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
from .registry import EVIDENCE_MODELS, EvidenceConfig, EvidenceModel

_VOCALS = {"vocals", "vocal", "lead_vocals", "voice"}
_PITCHED = _VOCALS | {"piano", "guitar", "bass", "strings", "violin", "cello", "flute", "saxophone", "synth", "keyboard", "keys"}
_PRIORITY = {name: i for i, name in enumerate(("bs_roformer_sw", "scnet_xl_ihf", "htdemucs_6s", "htdemucs_ft", "openunmix_umxhq"))}


def select_sources(master: Path, stems: list[StemArtifact], spec: EvidenceModel, config: EvidenceConfig,
                   explicit_audio: bool = False) -> list[StemArtifact]:
    if config.target == "master" or explicit_audio:
        return [StemArtifact("source", "master", master)]
    if spec.target == "master":
        return [StemArtifact("source", "master", master)]
    allowed = _VOCALS if spec.target == "vocals" else _PITCHED if spec.target == "vocals_or_pitched_stem" else None
    if spec.target == "vocals_or_master":
        allowed = _VOCALS
    if spec.target == "drums_or_master":
        allowed = {"drums", "drum", "percussion"}
    chosen, seen = [], set()
    for stem in sorted(stems, key=lambda s: (_PRIORITY.get(s.model, 99), s.model, s.stem, str(s.path))):
        name = stem.stem.lower().strip().replace(" ", "_")
        if stem.model == "speech" or name in seen or (allowed is not None and name not in allowed):
            continue
        chosen.append(stem)
        seen.add(name)
        if spec.target in {"vocals", "vocals_or_master", "drums_or_master"}:
            break
    if not chosen and spec.target in {"vocals_or_master", "drums_or_master"}:
        return [StemArtifact("source", "master", master)]
    return chosen


def _terminate(proc: subprocess.Popen) -> None:
    try:
        import psutil
        children = psutil.Process(proc.pid).children(recursive=True)
    except Exception:
        children = []
    for child in reversed(children):
        try:
            child.kill()
        except Exception:
            pass
    if proc.poll() is None:
        proc.kill()
    proc.wait(timeout=10)


def _invoke(request: dict, folder: Path, config: EvidenceConfig) -> dict:
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
                    raise TimeoutError(f"Evidence worker exceeded {config.timeout_seconds:g} seconds")
                if log_path.stat().st_size > 64 * 1024 * 1024:
                    raise RuntimeError("Evidence worker log exceeded 64 MiB")
                time.sleep(.1)
        except BaseException:
            _terminate(proc)
            raise
    if proc.returncode != 0:
        failure = folder / "failure.json"
        details = "See backend.log"
        if failure.is_file() and failure.stat().st_size <= 1024 * 1024:
            details = json.loads(failure.read_text(encoding="utf-8")).get("message", details)
        raise RuntimeError(f"Evidence worker exited {proc.returncode}: {details}")
    metadata = folder / "backend.json"
    if not metadata.is_file() or metadata.stat().st_size > 2 * 1024 * 1024:
        raise ValueError("Evidence worker did not return bounded metadata")
    return json.loads(metadata.read_text(encoding="utf-8"))


def analyze_evidence(master: Path, output_dir: Path, *, stems: list[StemArtifact] | None = None,
                     config: EvidenceConfig, explicit_audio: bool = False,
                     progress: Callable[[str], None] | None = None) -> dict:
    import soundfile as sf
    config.validate_paths()
    progress = progress or (lambda _: None)
    master = Path(master).expanduser().resolve()
    info = sf.info(master)
    if not master.is_file() or info.frames <= 0:
        raise ValueError("Source audio is missing or empty")
    output = Path(output_dir).expanduser().resolve()
    if output.exists() and (not output.is_dir() or any(output.iterdir())):
        raise FileExistsError("Evidence output must be a new or empty directory")
    output.mkdir(parents=True, exist_ok=True)
    report = {"schema": "stemlab.evidence-models.v1", "attribution": attribution(),
              "source_audio": str(master), "source_sha256": sha256_file(master),
              "sample_rate": info.samplerate, "frames": info.frames,
              "models_requested": list(config.models), "config": asdict(config),
              "analyses": [], "errors": [], "skipped": [], "status": "running",
              "method_notes": "Independent evidence streams are retained separately; no model vote is silently converted into ground truth."}
    write_json(output / "report.json", report)
    for slug in config.models:
        spec = EVIDENCE_MODELS[slug]
        if spec.requires_text and not (config.canonical_text and config.canonical_text.strip()):
            report["skipped"].append({"model": slug, "reason": "canonical text is required"})
            continue
        selected = select_sources(master, stems or [], spec, config, explicit_audio)
        if not selected:
            report["skipped"].append({"model": slug, "reason": "No suitable saved source for model target"})
            continue
        for index, source in enumerate(selected, 1):
            path = source.path.expanduser().resolve()
            folder = output / slug / f"{index:02d}-{slugify(source.model)}-{slugify(source.stem)}"
            folder.mkdir(parents=True)
            progress(f"evidence: {slug} / {source.model}/{source.stem}")
            item = {"model": slug, "title": spec.title, "category": spec.category,
                    "licence": spec.licence, "commercial_safe": spec.commercial_safe,
                    "upstream": spec.upstream, "source_audio": str(path), "source_model": source.model,
                    "source_stem": source.stem, "status": "running",
                    "log": (folder / "backend.log").relative_to(output).as_posix()}
            started = time.monotonic()
            try:
                source_info = sf.info(path)
                before = sha256_file(path)
                request = {"model": slug, "source": str(path), "device": config.device,
                           "allow_downloads": config.allow_downloads,
                           "model_path": config.model_paths.get(slug),
                           "canonical_text": config.canonical_text, "language": config.language,
                           "chord_dictionary": config.chord_dictionary, "prompt": config.prompt}
                item["backend"] = _invoke(request, folder, config)
                if sha256_file(path) != before:
                    raise ValueError("Source audio changed during evidence inference")
                item.update(status="completed", source_sha256=before, sample_rate=source_info.samplerate,
                            source_frames=source_info.frames,
                            files=[(folder / f).relative_to(output).as_posix()
                                   for f in item["backend"].get("files", []) if (folder / f).exists()])
            except Exception as exc:
                item.update(status="failed", error={"type": type(exc).__name__, "message": str(exc)})
                report["errors"].append({"model": slug, "source": str(path), **item["error"]})
                if not config.continue_on_error:
                    item["elapsed_seconds"] = time.monotonic() - started
                    report["analyses"].append(item)
                    report["status"] = "failed"
                    write_json(output / "report.json", report)
                    write_manifest(output)
                    raise
            item["elapsed_seconds"] = time.monotonic() - started
            report["analyses"].append(item)
            write_json(output / "report.json", report)
    completed = sum(item["status"] == "completed" for item in report["analyses"])
    report["completed_count"] = completed
    report["status"] = "completed_with_errors" if report["errors"] or report["skipped"] else "completed"
    if not completed:
        report["status"] = "failed" if report["errors"] else "no_matching_sources"
    write_json(output / "report.json", report)
    write_manifest(output)
    return report


def _inside(root: Path, relative: str) -> Path:
    path = Path(relative)
    if path.is_absolute() or ".." in path.parts:
        raise ValueError("Saved paths must be relative to the result directory")
    resolved = (root / path).resolve()
    if not resolved.is_relative_to(root) or not resolved.is_file():
        raise ValueError("Saved source/stem missing or outside the result directory")
    return resolved


def saved_sources(results: Path) -> tuple[Path, list[StemArtifact], dict]:
    root = Path(results).expanduser().resolve()
    manifest = root / "analysis.json"
    if not manifest.is_file() or manifest.stat().st_size > 32 * 1024 * 1024:
        raise ValueError("Choose a StemLab result containing analysis.json")
    data = json.loads(manifest.read_text(encoding="utf-8"))
    source = data["source"]
    master = _inside(root, source["copied_path"])
    if sha256_file(master) != source.get("sha256"):
        raise ValueError("Copied source does not match the saved SHA-256")
    stems = []
    for model in data.get("models", []):
        if model.get("error"):
            continue
        for stem in model.get("stems", []):
            path = _inside(root, stem["path"])
            stems.append(StemArtifact(str(stem.get("model", model.get("spec", {}).get("slug", "unknown"))),
                                      str(stem["stem"]), path))
    return master, stems, data


def analyze_path(source: Path, output_dir: Path | None, *, config: EvidenceConfig,
                 progress: Callable[[str], None] | None = None) -> dict:
    source = Path(source).expanduser().resolve()
    if source.is_dir():
        master, stems, _ = saved_sources(source)
        return analyze_evidence(master, output_dir or source / "deep/evidence_models", stems=stems,
                                config=config, progress=progress)
    if output_dir is None:
        raise ValueError("An audio file requires an explicit --output directory")
    return analyze_evidence(source, output_dir, config=config, explicit_audio=True, progress=progress)
