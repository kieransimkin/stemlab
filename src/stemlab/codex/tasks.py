"""Thin adapters over the existing pipeline and loop finder, not new MIR algorithms."""
from __future__ import annotations

import shutil
from pathlib import Path
from typing import Any

from .paths import AUDIO_SUFFIXES, inside, read_json, result_root, write_json


def audio_path(workspace: Path, name: str) -> Path:
    path = inside(workspace, name)
    if not path.is_file() or path.suffix.lower() not in AUDIO_SUFFIXES:
        raise ValueError("Choose a supported audio file inside the workspace")
    if not 0 < path.stat().st_size <= 4 * 1024 ** 3:
        raise ValueError("Audio file must be nonempty and at most 4 GiB")
    return path


def inspect_audio(workspace: Path, name: str) -> dict[str, Any]:
    from stemlab.audio import audio_info
    from stemlab.util import sha256_file
    path = audio_path(workspace, name)
    info = audio_info(path)
    if info["num_frames"] <= 0:
        raise ValueError("Audio contains no sample frames")
    return {"path": str(path), "sha256": sha256_file(path), **info}


def analysis_options(options: dict[str, Any]) -> dict[str, Any]:
    from stemlab.models import MODEL_REGISTRY, profile
    allowed = {"profile", "models", "device", "allow_model_downloads", "allow_expensive",
               "allow_external_bootstrap", "export_loops", "run_whisper", "run_beats",
               "run_vamp", "run_structure", "run_text_semantics", "run_basic_pitch",
               "noncommercial_audio_semantics", "max_loop_seconds"}
    if set(options) - allowed:
        raise ValueError("Unknown analysis option")
    selected = options.get("profile", "practical")
    default_models = profile(selected)
    models = options.get("models") or list(default_models)
    if not isinstance(models, list) or not models or len(models) > len(MODEL_REGISTRY):
        raise ValueError("Provide a nonempty list of registered model names")
    if any(not isinstance(x, str) or x not in MODEL_REGISTRY for x in models):
        raise ValueError("Unknown separation model")
    if options.get("allow_model_downloads") is not True:
        raise ValueError("Analysis may fetch model weights; obtain user consent and set "
                         "allow_model_downloads=true. Inspection and existing loop scans need no downloads.")
    if "mvsep_mega53" in models and options.get("allow_expensive") is not True:
        raise ValueError("Mega-53 needs explicit allow_expensive=true consent")
    device = options.get("device", "auto")
    import re
    if not isinstance(device, str) or not re.fullmatch(r"auto|cpu|mps|cuda(?::\d+)?", device):
        raise ValueError("Invalid device")
    from stemlab.analysis.loops import LoopConfig
    LoopConfig(max_seconds=options.get("max_loop_seconds"))
    booleans = allowed - {"models", "profile", "device", "max_loop_seconds"}
    if any(k in options and type(options[k]) is not bool for k in booleans):
        raise ValueError("Boolean options must be true or false")
    return {**options, "profile": selected, "models": list(dict.fromkeys(models)), "device": device}


def run_analysis(workspace: Path, output: Path, task: dict[str, Any]) -> dict[str, Any]:
    from stemlab.pipeline import run_pipeline
    from stemlab.types import PipelineConfig
    from stemlab.util import sha256_file
    source = audio_path(workspace, task["audio_path"])
    options = analysis_options(task.get("options", {}))
    canonical = task.get("canonical_path")
    if canonical:
        from stemlab.canonical import save_canonical
        canonical_file = inside(workspace, canonical)
        if canonical_file.suffix.lower() != ".json":
            raise ValueError("Canonical metadata must be JSON")
        save_canonical(output, read_json(canonical_file))
    config = PipelineConfig(
        input_wav=source, output_dir=output, models=tuple(options["models"]),
        device=options["device"], bootstrap_external=options.get("allow_external_bootstrap", False),
        export_loops=options.get("export_loops", False),
        loop_max_seconds=options.get("max_loop_seconds"),
        run_whisper=options.get("run_whisper", True), run_beats=options.get("run_beats", True),
        run_vamp=options.get("run_vamp", True), run_structure=options.get("run_structure", True),
        run_text_semantics=options.get("run_text_semantics", False),
        run_basic_pitch=options.get("run_basic_pitch", False),
        run_audio_semantics=options.get("noncommercial_audio_semantics", False),
    )
    report = run_pipeline(config, progress=lambda message: print(message, flush=True))
    errors = list(report.get("errors") or []) + list((report.get("deep_analysis") or {}).get("errors") or [])
    # The source's own pipeline hash is authoritative; don't hash or mutate its outputs again.
    return {"state": "completed_with_errors" if errors else "completed",
            "message": f"Pipeline finished with {len(errors)} recorded backend errors",
            "error_count": len(errors), "analysis_path": "analysis.json",
            "source_sha256": report.get("source", {}).get("sha256") or sha256_file(source)}


def run_loop_scan(workspace: Path, output: Path, task: dict[str, Any]) -> dict[str, Any]:
    """Read old evidence but write ONLY to the new job directory."""
    import soundfile as sf
    from stemlab.analysis.loops import LoopConfig, analyze_loops
    from stemlab.analysis.song_map import _choose_sections
    from stemlab.manifest import write_manifest
    from stemlab.types import BeatResult, StemArtifact
    from stemlab.util import sha256_file

    old = result_root(workspace, task["results_path"])
    def load(name: str) -> dict[str, Any]:
        return read_json(inside(old, name, must_exist=False), optional=True)
    analysis = load("analysis.json")
    master = inside(old, analysis["source"]["copied_path"])
    if sha256_file(master) != analysis["source"]["sha256"]:
        raise ValueError("Copied master does not match the saved source hash")
    canonical, structure = load("canonical.json"), load("deep/structure/structure.json")
    song_map = load("deep/song_map/song_map.json")
    if canonical.get("sections") or structure.get("segments"):
        origin, sections = _choose_sections(canonical, structure, None, sf.info(master).duration)
        song_map = {"section_source": origin, "sections": sections}
    beats = []
    beat_dir = inside(old, "beats", must_exist=False)
    for path in sorted(beat_dir.glob("*.json")):
        data = read_json(inside(old, path))
        if isinstance(data.get("beats"), list):
            beats.append(BeatResult(str(data.get("model", path.stem)), data["beats"],
                                    data.get("downbeats", []), data.get("tempo_bpm"),
                                    data.get("metadata", {})))
    stems, gains = [], {}
    for model in analysis.get("models", []):
        for item in model.get("stems", []):
            path = inside(old, item["path"], must_exist=False)
            stems.append(StemArtifact(str(item["model"]), str(item["stem"]), path))
        for item in model.get("normalization", []):
            path = inside(old, item["path"], must_exist=False)
            gains[str(path)] = float(item.get("gain_db", 0.0))
    # A copy of the master makes each result self-contained for existing preview_loop().
    (output / "input").mkdir()
    copied = output / "input" / master.name
    shutil.copyfile(master, copied)
    config = LoopConfig(max_bars=task.get("max_bars", 16),
                        max_seconds=task.get("max_seconds"),
                        loops_per_section=task.get("per_section", 1),
                        mode=task.get("mode", "strict"),
                        exploratory_algorithm=task.get("exploratory_algorithm", "spectral_context"),
                        search_scope=task.get("search_scope", "sections"))
    report = analyze_loops(copied, output / "deep/loops", song_map=song_map, beat_results=beats,
                           stems=stems, canonical=canonical, normalization_gains=gains,
                           whisper_result=load("speech/whisper.json"),
                           lyrics_result=load("deep/lyrics/lyrics.json"),
                           export_audio=task.get("export_audio", False), config=config)
    write_json(output / "analysis.json", {
        "source": {"original_path": str(master), "copied_path": f"input/{master.name}",
                   "sha256": report["source_sha256"]}, "models": [],
        "codex_provenance": {"operation": "loop_scan", "evidence_directory": str(old),
                             "prior_evidence_modified": False},
        "deep_analysis": {"analyses": {"loops": {"available": True,
                                               "path": "deep/loops/loops.json"}}}})
    write_manifest(output)
    return {"state": "completed", "message": "Loop scan complete; prior results untouched",
            "loop_count": report["loop_count"], "unresolved_sections": len(report["unresolved_sections"]),
            "report_path": "deep/loops/loops.json"}


def midi_options(*, models: list[str] | None = None, target: str = "auto",
                 stem_names: list[str] | None = None, device: str = "auto",
                 allow_model_downloads: bool = False, max_stems: int = 6,
                 make_plots: bool = True) -> dict[str, Any]:
    from stemlab.analysis.midi import MidiConfig
    if models is not None and not isinstance(models, list):
        raise ValueError("MIDI models must be a list")
    if stem_names is not None and not isinstance(stem_names, list):
        raise ValueError("MIDI stem_names must be a list")
    selected = ["basic_pitch"] if models is None else models
    MidiConfig(models=tuple(selected), target=target, stem_names=tuple(stem_names or ()),
               device=device, allow_downloads=allow_model_downloads, max_stems=max_stems,
               make_plots=make_plots)
    return {"models": selected, "target": target, "stem_names": stem_names or [],
            "device": device, "allow_model_downloads": allow_model_downloads,
            "max_stems": max_stems, "make_plots": make_plots}


def run_midi_scan(workspace: Path, output: Path, task: dict[str, Any]) -> dict[str, Any]:
    from stemlab.analysis.midi import MidiConfig, analyze_midi
    from stemlab.analysis.midi.runner import saved_sources
    from stemlab.manifest import write_manifest
    from stemlab.util import sha256_file
    source = inside(workspace, task["source_path"])
    options = midi_options(**task.get("options", {}))
    is_file = source.is_file()
    if is_file:
        master, stems = audio_path(workspace, task["source_path"]), []
    else:
        master, stems = saved_sources(source)
        # Apply the bridge's stricter link policy to all manifest-derived paths.
        inside(workspace, master)
        for stem in stems:
            inside(workspace, stem.path)
    (output / "input").mkdir()
    copied = output / "input" / master.name
    shutil.copyfile(master, copied)
    report = analyze_midi(copied, output / "deep/midi", stems=stems, explicit_audio=is_file,
                          config=MidiConfig(models=tuple(options["models"]), target=options["target"],
                                            stem_names=tuple(options["stem_names"]), device=options["device"],
                                            allow_downloads=options["allow_model_downloads"],
                                            max_stems=options["max_stems"], make_plots=options["make_plots"]),
                          progress=lambda message: print(message, flush=True))
    write_json(output / "analysis.json", {
        "source": {"original_path": str(master), "copied_path": f"input/{master.name}",
                   "sha256": sha256_file(copied)}, "models": [],
        "codex_provenance": {"operation": "midi_scan", "evidence_directory": str(source),
                             "prior_evidence_modified": False},
        "deep_analysis": {"analyses": {"midi": {"available": bool(report["completed_count"]),
                                               "path": "deep/midi/report.json"}},
                          "errors": report["errors"]}})
    write_manifest(output)
    return {"state": "failed" if report["status"] == "no_matching_sources" else report["status"],
            "message": "MIDI extraction: " + report["status"], "report_path": "deep/midi/report.json",
            "completed_count": report["completed_count"], "error_count": len(report["errors"]),
            "skipped_count": len(report["skipped"]), "note_count": report["note_count"]}


def evidence_options(*, models: list[str] | None = None, target: str = "auto",
                     device: str = "auto", allow_model_downloads: bool = False,
                     language: str = "English", chord_dictionary: str = "submission",
                     prompt: str | None = None) -> dict[str, Any]:
    from stemlab.analysis.evidence import EvidenceConfig
    if models is not None and not isinstance(models, list):
        raise ValueError("Evidence models must be a list")
    selected = ["firered_aed", "swift_f0"] if models is None else models
    # MCP deliberately does not accept model paths/backend interpreters. Those
    # are host provisioning concerns and avoid arbitrary executable paths.
    EvidenceConfig(models=tuple(selected), target=target, device=device,
                   allow_downloads=allow_model_downloads, language=language,
                   chord_dictionary=chord_dictionary, prompt=prompt)
    return {"models": selected, "target": target, "device": device,
            "allow_model_downloads": allow_model_downloads, "language": language,
            "chord_dictionary": chord_dictionary, "prompt": prompt}


def run_evidence_scan(workspace: Path, output: Path, task: dict[str, Any]) -> dict[str, Any]:
    from stemlab.analysis.evidence import EvidenceConfig, analyze_evidence
    from stemlab.analysis.evidence.runner import saved_sources
    from stemlab.manifest import write_manifest
    from stemlab.util import sha256_file
    source = inside(workspace, task["source_path"])
    options = dict(task.get("options", {}))
    canonical_text_path = options.pop("canonical_text_path", None)
    canonical_text = None
    if canonical_text_path:
        text_file = inside(workspace, canonical_text_path)
        canonical_text = text_file.read_text(encoding="utf-8")
    options = evidence_options(**options)
    is_file = source.is_file()
    if is_file:
        master, stems = audio_path(workspace, task["source_path"]), []
    else:
        master, stems, _ = saved_sources(source)
        inside(workspace, master)
        for stem in stems:
            inside(workspace, stem.path)
    (output / "input").mkdir()
    copied = output / "input" / master.name
    shutil.copyfile(master, copied)
    report = analyze_evidence(
        copied, output / "deep/evidence_models", stems=stems, explicit_audio=is_file,
        config=EvidenceConfig(models=tuple(options["models"]), target=options["target"],
                              device=options["device"],
                              allow_downloads=options["allow_model_downloads"],
                              canonical_text=canonical_text, language=options["language"],
                              chord_dictionary=options["chord_dictionary"], prompt=options["prompt"]),
        progress=lambda message: print(message, flush=True),
    )
    write_json(output / "analysis.json", {
        "source": {"original_path": str(master), "copied_path": f"input/{master.name}",
                   "sha256": sha256_file(copied)}, "models": [],
        "codex_provenance": {"operation": "evidence_scan", "evidence_directory": str(source),
                             "prior_evidence_modified": False},
        "deep_analysis": {"analyses": {"evidence_models": {
            "available": bool(report.get("completed_count")),
            "path": "deep/evidence_models/report.json"}}, "errors": report["errors"]}})
    write_manifest(output)
    return {"state": "failed" if report["status"] in {"failed", "no_matching_sources"} else report["status"],
            "message": "Evidence scan: " + report["status"],
            "report_path": "deep/evidence_models/report.json",
            "completed_count": report.get("completed_count", 0),
            "error_count": len(report["errors"]), "skipped_count": len(report["skipped"])}
