from __future__ import annotations

import json
import traceback
from pathlib import Path
from typing import Any, Callable

from stemlab.branding import attribution
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import write_json

from .sonic import analyze_sonic_features
from .harmony import analyze_harmony
from .lyrics import analyze_lyrics, transcript_to_lyrics
from .rhythm import analyze_rhythm
from .song_map import analyze_song_map

ProgressFn = Callable[[str], None]


def _error(stage: str, exc: Exception) -> dict[str, Any]:
    return {
        "stage": stage,
        "type": type(exc).__name__,
        "message": str(exc),
        "traceback": "".join(traceback.format_exception(type(exc), exc, exc.__traceback__)),
    }


def load_canonical(output_root: Path) -> dict[str, Any] | None:
    path = output_root / "canonical.json"
    if not path.exists():
        return None
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
        return value if isinstance(value, dict) else None
    except Exception:
        return None


def run_comprehensive_analysis(
    master: Path,
    output_root: Path,
    *,
    beat_results: list[BeatResult],
    vamp_result: dict[str, Any] | None,
    whisper_result: dict[str, Any] | None,
    stems: list[StemArtifact],
    structure_result: dict[str, Any] | None = None,
    progress: ProgressFn | None = None,
    continue_on_error: bool = True,
    run_text_semantics: bool = True,
    text_semantic_model: str = "sentence-transformers/all-MiniLM-L6-v2",
    run_audio_semantics: bool = False,
    audio_semantic_model: str = "OpenMuQ/MuQ-MuLan-large",
    run_basic_pitch: bool = False,
    device: str = "auto",
) -> dict[str, Any]:
    """Run the high-level evidence-fusion analysis suite.

    This stage does not discard lower-level measurements. It creates derived
    summaries while preserving which detector/model each conclusion came from.
    """
    progress = progress or (lambda _message: None)
    root = output_root / "deep"
    root.mkdir(parents=True, exist_ok=True)
    errors: list[dict[str, Any]] = []
    analyses: dict[str, Any] = {}

    def run(stage: str, fn):
        progress(f"deep analysis: {stage}")
        try:
            value = fn()
            analyses[stage] = value
            return value
        except Exception as exc:
            errors.append(_error(stage, exc))
            if not continue_on_error:
                raise
            return None

    sonic_result = run("sonic", lambda: analyze_sonic_features(master, root / "sonic"))
    rhythm_result = run("rhythm", lambda: analyze_rhythm(master, beat_results, root / "rhythm"))
    harmony_result = run("harmony", lambda: analyze_harmony(vamp_result, beat_results, root / "harmony"))

    canonical = load_canonical(output_root)
    lyrics_text = ""
    lyric_timing: list[dict[str, Any]] = []
    lyric_source = None
    if canonical and canonical.get("lyrics"):
        lyrics_text = str(canonical["lyrics"])
        lyric_timing = list(canonical.get("lyric_timing") or [])
        lyric_source = "canonical.json"
    else:
        lyrics_text, lyric_timing = transcript_to_lyrics(whisper_result)
        lyric_source = "Whisper transcript" if lyrics_text else None

    lyrics_result = None
    if lyrics_text:
        lyrics_result = run(
            "lyrics",
            lambda: analyze_lyrics(
                lyrics_text,
                root / "lyrics",
                timing=lyric_timing,
                source=lyric_source or "unknown",
            ),
        )
        if run_text_semantics:
            def semantic_text():
                from .semantic_text import analyze_text_semantics

                return analyze_text_semantics(
                    lyrics_text,
                    root / "semantic_text",
                    model_name=text_semantic_model,
                )
            run("semantic_text", semantic_text)

    run(
        "song_map",
        lambda: analyze_song_map(
            root / "song_map",
            canonical=canonical,
            structure_result=structure_result,
            vamp_result=vamp_result,
            beat_results=beat_results,
            sonic_result=sonic_result,
            rhythm_result=rhythm_result,
            harmony_result=harmony_result,
            lyrics_result=lyrics_result,
            deep_root=root,
        ),
    )

    if run_audio_semantics:
        def semantic_audio():
            from .semantic_audio import analyze_audio_semantics

            return analyze_audio_semantics(
                master,
                root / "semantic_audio",
                device=device,
                model_name=audio_semantic_model,
            )
        run("semantic_audio", semantic_audio)

    if run_basic_pitch:
        def basic_pitch():
            from .transcription import analyze_basic_pitch

            return analyze_basic_pitch(stems, root / "basic_pitch")
        run("basic_pitch", basic_pitch)

    if structure_result is not None:
        analyses["structure"] = structure_result

    report = {
        "schema": "stemlab.deep-analysis.v1",
        "attribution": attribution(),
        "source_audio": str(master),
        "canonical_present": canonical is not None,
        "analyses": {
            key: {
                "available": value is not None,
                "path": {
                    "sonic": "deep/sonic/sonic.json",
                    "rhythm": "deep/rhythm/rhythm.json",
                    "harmony": "deep/harmony/harmony.json",
                    "lyrics": "deep/lyrics/lyrics.json",
                    "semantic_text": "deep/semantic_text/semantic_text.json",
                    "semantic_audio": "deep/semantic_audio/semantic_audio.json",
                    "basic_pitch": "deep/basic_pitch/report.json",
                    "structure": "deep/structure/structure.json",
                    "song_map": "deep/song_map/song_map.json",
                }.get(key),
            }
            for key, value in analyses.items()
        },
        "errors": errors,
        "evidence_policy": (
            "Derived summaries retain detector/model provenance. Embedding similarities are not "
            "reported as calibrated probabilities; heuristic groove/rhyme metrics are labelled as such."
        ),
    }
    write_json(root / "summary.json", report)
    return report
