from __future__ import annotations

import datetime as dt
import shutil
import traceback
from dataclasses import asdict
from pathlib import Path
from typing import Callable

from .analysis.runner import run_comprehensive_analysis
from .analysis.structure import analyze_structure
from .audio import audio_info, normalize_audio_file
from .beats import BeatNetBackend, BeatThisBackend, BeatTransformerBackend
from .beats.common import consensus_result, save_result
from .branding import attribution
from .manifest import write_manifest
from .models import MODEL_REGISTRY
from .separators import make_backend
from .sonic_visualiser import build_session
from .speech import isolate_and_transcribe
from .spectrogram import generate_spectrogram
from .types import BeatResult, PipelineConfig, SeparationResult, StemArtifact
from .util import sha256_file, slugify, write_json
from .vamp import run_vamp_analysis

ProgressFn = Callable[[str], None]


def _vocal_candidate(stems: list[StemArtifact]) -> Path | None:
    priority = ["bs_roformer_sw", "scnet_xl_ihf", "htdemucs_ft", "openunmix_umxhq", "mvsep_mega53"]
    for model in priority:
        for s in stems:
            if s.model == model and s.stem.lower() in {"vocals", "vocal", "lead_vocals"}:
                return s.path
    for s in stems:
        if "vocal" in s.stem.lower() or "voice" in s.stem.lower():
            return s.path
    return None


def _error_record(stage: str, exc: Exception) -> dict:
    return {
        "stage": stage,
        "type": type(exc).__name__,
        "message": str(exc),
        "traceback": "".join(traceback.format_exception(type(exc), exc, exc.__traceback__)),
    }


def run_pipeline(config: PipelineConfig, progress: ProgressFn | None = None) -> dict:
    progress = progress or (lambda _msg: None)
    src = config.input_wav.expanduser().resolve()
    if not src.is_file():
        raise FileNotFoundError(src)
    out = config.output_dir.expanduser().resolve()
    out.mkdir(parents=True, exist_ok=True)

    input_dir = out / "input"
    stems_dir = out / "stems"
    spec_dir = out / "spectrograms"
    beats_dir = out / "beats"
    speech_dir = out / "speech"
    vamp_dir = out / "vamp"
    deep_dir = out / "deep"
    sonic_dir = out / "sonic_visualiser"
    for d in (input_dir, stems_dir, spec_dir, beats_dir, speech_dir, vamp_dir, deep_dir, sonic_dir):
        d.mkdir(parents=True, exist_ok=True)

    master = input_dir / src.name
    if master.resolve() != src:
        shutil.copy2(src, master)
    started = dt.datetime.now(dt.timezone.utc)
    analysis: dict = {
        "stemlab_version": __import__("stemlab").__version__,
        "attribution": attribution(),
        "started_at": started.isoformat(),
        "source": {
            "original_path": str(src),
            "copied_path": str(master.relative_to(out)),
            "sha256": sha256_file(master),
            "audio": audio_info(master),
        },
        "config": {
            **asdict(config),
            "input_wav": str(config.input_wav),
            "output_dir": str(config.output_dir),
            "models": list(config.models),
        },
        "models": [],
        "spectrograms": [],
        "beats": [],
        "speech": None,
        "vamp": None,
        "structure": None,
        "deep_analysis": None,
        "errors": [],
    }

    if config.make_spectrograms:
        progress("spectrogram: master")
        try:
            rec = generate_spectrogram(master, spec_dir / "master.png", spec_dir / "master.npz")
            analysis["spectrograms"].append(rec)
        except Exception as exc:
            analysis["errors"].append(_error_record("spectrogram:master", exc))
            if not config.continue_on_error:
                raise

    all_stems: list[StemArtifact] = []
    for model_slug in config.models:
        if model_slug not in MODEL_REGISTRY:
            exc = ValueError(f"Unknown model: {model_slug}")
            analysis["errors"].append(_error_record(f"separation:{model_slug}", exc))
            if not config.continue_on_error:
                raise exc
            continue
        spec = MODEL_REGISTRY[model_slug]
        progress(f"separation: {spec.display_name}")
        backend = make_backend(spec.backend, bootstrap_external=config.bootstrap_external)
        result: SeparationResult = backend.separate(master, stems_dir / model_slug, model_slug, config.device)

        # Normalize immediately after the separator has materialised each stem.
        # This gives downstream PNG/Sonic Visualiser spectrograms a consistent
        # usable level while leaving the copied master untouched.
        normalization: list[dict] = []
        if not result.error:
            for stem in result.stems:
                progress(f"normalize: {model_slug}/{stem.stem}")
                try:
                    norm = normalize_audio_file(stem.path)
                    normalization.append({
                        "stem": stem.stem,
                        "path": str(stem.path.relative_to(out)),
                        **norm,
                    })
                except Exception as exc:
                    analysis["errors"].append(_error_record(f"normalize:{model_slug}:{stem.stem}", exc))
                    if not config.continue_on_error:
                        raise

        model_record = {
            "spec": spec.to_dict(),
            "elapsed_seconds": result.elapsed_seconds,
            "error": result.error,
            "metadata": result.metadata,
            "normalization": normalization,
            "stems": [s.to_dict(out) for s in result.stems],
        }
        analysis["models"].append(model_record)
        if result.error:
            analysis["errors"].append({"stage": f"separation:{model_slug}", "message": result.error})
            if not config.continue_on_error:
                raise RuntimeError(result.error)
            continue
        all_stems.extend(result.stems)
        if config.make_spectrograms:
            for stem in result.stems:
                progress(f"spectrogram: {model_slug}/{stem.stem}")
                try:
                    base = spec_dir / model_slug / slugify(stem.stem)
                    rec = generate_spectrogram(stem.path, base.with_suffix(".png"), base.with_suffix(".npz"))
                    rec["model"] = model_slug
                    rec["stem"] = stem.stem
                    analysis["spectrograms"].append(rec)
                except Exception as exc:
                    analysis["errors"].append(_error_record(f"spectrogram:{model_slug}:{stem.stem}", exc))
                    if not config.continue_on_error:
                        raise

    whisper_result = None
    if config.run_whisper:
        vocal = _vocal_candidate(all_stems)
        if vocal is None:
            exc = RuntimeError("No vocal stem was produced; spoken-word isolation/Whisper cannot run")
            analysis["errors"].append(_error_record("speech", exc))
            if not config.continue_on_error:
                raise exc
        else:
            progress(f"speech + Whisper: {vocal.name}")
            try:
                whisper_result = isolate_and_transcribe(
                    vocal,
                    speech_dir,
                    whisper_model=config.whisper_model,
                    device=config.device,
                )
                analysis["speech"] = {
                    "source_vocals": str(Path(whisper_result["source_vocals"]).relative_to(out)),
                    "spoken_word_wav": str(Path(whisper_result["spoken_word_wav"]).relative_to(out)),
                    "model": whisper_result["model"],
                    "language": whisper_result["language"],
                    "language_probability": whisper_result["language_probability"],
                    "regions": len(whisper_result["regions"]),
                    "segments": len(whisper_result["segments"]),
                    "words": len(whisper_result["words"]),
                    "normalization": whisper_result.get("normalization"),
                }
                spoken = Path(whisper_result["spoken_word_wav"])
                all_stems.append(StemArtifact("speech", "spoken_word", spoken, 16000, 1))
                if config.make_spectrograms:
                    rec = generate_spectrogram(
                        spoken,
                        spec_dir / "speech" / "spoken_word.png",
                        spec_dir / "speech" / "spoken_word.npz",
                    )
                    rec["model"] = "speech"
                    rec["stem"] = "spoken_word"
                    analysis["spectrograms"].append(rec)
            except Exception as exc:
                analysis["errors"].append(_error_record("speech", exc))
                if not config.continue_on_error:
                    raise

    vamp_result = None
    if config.run_vamp:
        melody_source = _vocal_candidate(all_stems)
        progress("Vamp Plugin Pack: melody, harmony, tonality, notes and structure")
        try:
            vamp_result = run_vamp_analysis(
                master,
                melody_source,
                vamp_dir,
                bootstrap_external=config.bootstrap_external,
            )
            analysis["vamp"] = {
                "sonic_annotator": vamp_result.get("sonic_annotator"),
                "report": str((vamp_dir / "report.json").relative_to(out)),
                "melody_source": (
                    str(Path(vamp_result["melody_source"]).relative_to(out))
                    if vamp_result.get("melody_source")
                    else None
                ),
                "missing_outputs": vamp_result.get("missing_outputs", []),
                "skipped": vamp_result.get("skipped", []),
                "errors": vamp_result.get("errors", []),
                "analyses": [
                    {
                        "slug": item.get("slug"),
                        "title": item.get("title"),
                        "transform": item.get("transform"),
                        "target": item.get("target"),
                        "kind": item.get("kind"),
                        "units": item.get("units"),
                        "event_count": item.get("event_count"),
                        "files": {
                            key: (
                                str(Path(value).relative_to(out))
                                if value is not None
                                else None
                            )
                            for key, value in item.get("files", {}).items()
                        },
                    }
                    for item in vamp_result.get("analyses", [])
                ],
            }
        except Exception as exc:
            analysis["errors"].append(_error_record("vamp", exc))
            if not config.continue_on_error:
                raise

    beat_results: list[BeatResult] = []
    structure_result = None
    if config.run_structure:
        progress("functional structure: All-In-One-Infer")
        try:
            structure_result, structure_beats = analyze_structure(
                master,
                deep_dir / "structure",
                device=config.device,
                include_embeddings=config.all_in_one_embeddings,
            )
            beat_results.append(structure_beats)
            analysis["structure"] = {
                "model": structure_result.get("model"),
                "bpm": structure_result.get("bpm"),
                "segments": len(structure_result.get("segments", [])),
                "path": str((deep_dir / "structure" / "structure.json").relative_to(out)),
            }
            analysis["beats"].append({
                "model": structure_beats.model,
                "beats": len(structure_beats.beats),
                "downbeats": len(structure_beats.downbeats),
                "tempo_bpm": structure_beats.tempo_bpm,
                "metadata": structure_beats.metadata,
            })
            save_result(structure_beats, beats_dir)
        except Exception as exc:
            analysis["errors"].append(_error_record("structure:all_in_one", exc))
            if not config.continue_on_error:
                raise

    if config.run_beats:
        beat_backends = [
            BeatNetBackend(),
            BeatThisBackend(),
            BeatTransformerBackend(
                bootstrap_external=config.bootstrap_external,
                ensemble=config.beat_transformer_ensemble,
            ),
        ]
        for backend in beat_backends:
            name = backend.__class__.__name__
            progress(f"beat analysis: {name}")
            try:
                br = backend.analyze(master, beats_dir, all_stems)
                beat_results.append(br)
                analysis["beats"].append({
                    "model": br.model,
                    "beats": len(br.beats),
                    "downbeats": len(br.downbeats),
                    "tempo_bpm": br.tempo_bpm,
                    "metadata": br.metadata,
                })
            except Exception as exc:
                analysis["errors"].append(_error_record(f"beats:{name}", exc))
                if not config.continue_on_error:
                    raise

    # Produce one clearly identified shared guess across every successful beat
    # detector, including All-In-One when that route is available.
    if len(beat_results) >= 2:
        consensus = consensus_result(beat_results)
        if consensus is not None and consensus.beats:
            save_result(consensus, beats_dir)
            beat_results.append(consensus)
            analysis["beats"].append({
                "model": consensus.model,
                "beats": len(consensus.beats),
                "downbeats": len(consensus.downbeats),
                "tempo_bpm": consensus.tempo_bpm,
                "metadata": consensus.metadata,
            })

    if config.run_deep_analysis:
        try:
            deep_report = run_comprehensive_analysis(
                master,
                out,
                beat_results=beat_results,
                vamp_result=vamp_result,
                whisper_result=whisper_result,
                stems=all_stems,
                structure_result=structure_result,
                progress=progress,
                continue_on_error=config.continue_on_error,
                run_text_semantics=config.run_text_semantics,
                text_semantic_model=config.text_semantic_model,
                run_audio_semantics=config.run_audio_semantics,
                audio_semantic_model=config.audio_semantic_model,
                run_basic_pitch=config.run_basic_pitch,
                device=config.device,
            )
            analysis["deep_analysis"] = {
                "schema": deep_report.get("schema"),
                "report": str((deep_dir / "summary.json").relative_to(out)),
                "analyses": deep_report.get("analyses", {}),
                "errors": deep_report.get("errors", []),
            }
        except Exception as exc:
            analysis["errors"].append(_error_record("deep_analysis", exc))
            if not config.continue_on_error:
                raise

    progress("Sonic Visualiser session")
    try:
        sv, xml = build_session(
            sonic_dir,
            master,
            all_stems,
            beat_results,
            whisper_result,
            vamp=vamp_result,
        )
        analysis["sonic_visualiser"] = {
            "session": str(sv.relative_to(out)),
            "xml": str(xml.relative_to(out)),
            "windows_launcher": str((sonic_dir / "open_sonic_visualiser.bat").relative_to(out)),
            "unix_launcher": str((sonic_dir / "open_sonic_visualiser.sh").relative_to(out)),
        }
    except Exception as exc:
        analysis["errors"].append(_error_record("sonic_visualiser", exc))
        if not config.continue_on_error:
            raise

    analysis["completed_at"] = dt.datetime.now(dt.timezone.utc).isoformat()
    write_json(out / "analysis.json", analysis)
    progress("manifest")
    write_manifest(
        out,
        extra={
            "source_sha256": analysis["source"]["sha256"],
            "models_requested": list(config.models),
            "error_count": len(analysis["errors"]),
            "attribution": attribution(),
        },
    )
    return analysis
