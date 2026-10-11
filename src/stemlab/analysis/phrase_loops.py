"""Exploratory lyric-phrase loops with musical restart evidence and artist feedback.

Suggestions never enter strict loops. No inferred listening approval or audio edits.
"""
from __future__ import annotations

from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path
import math
import re

import numpy as np
import soundfile as sf

from stemlab.util import sha256_file
from .loops import (LoopConfig, _gates, _grid, _vocal_intervals, _write_json,
                    detected_bar_phase_metrics, index_loop_report, load_loop_evidence,
                    optimize_join, spectral_context)
from .rudiment_matches import extract_peak_events


@dataclass(frozen=True)
class PhraseLoopConfig:
    min_seconds: float = 5.0
    max_seconds: float = 30.0
    min_lines: int = 4
    top: int = 6
    max_overlap: float = 0.60
    max_bar_phase_error: float | None = None

    def __post_init__(self):
        for key in ("min_seconds", "max_seconds", "max_overlap"):
            value = getattr(self, key)
            if isinstance(value, bool) or not isinstance(value, (float, int)):
                raise ValueError(f"{key} must be finite")
            if not math.isfinite(value):
                raise ValueError(f"{key} must be finite")
        if not 0 < self.min_seconds <= self.max_seconds:
            raise ValueError("Require 0 < min_seconds <= max_seconds")
        if not 0 <= self.max_overlap < 1:
            raise ValueError("max_overlap must be in [0, 1)")
        if self.max_bar_phase_error is not None:
            value = self.max_bar_phase_error
            if (isinstance(value, bool) or not isinstance(value, (float, int))
                    or not math.isfinite(value) or not 0 <= value <= .5):
                raise ValueError('max_bar_phase_error must be None or finite in [0, .5]')
        for key, upper in (("min_lines", 128), ("top", 64)):
            value = getattr(self, key)
            if isinstance(value, bool) or not isinstance(value, int) or not 1 <= value <= upper:
                raise ValueError(f"{key} must be an integer in 1..{upper}")


def _canonical_lines(canonical: dict, duration: float) -> list[dict]:
    lines = []
    for index, item in enumerate(canonical.get("lyric_timing", [])):
        start, end = float(item["start"]), float(item["end"])
        text = item.get("text")
        if (not np.isfinite([start, end]).all() or not 0 <= start <= end <= duration
                or not isinstance(text, str) or not text.strip()):
            raise ValueError("Canonical lyric lines need finite native bounds and nonempty text")
        if lines and (start < lines[-1]["start"] or end < lines[-1]["end"]):
            raise ValueError("Canonical lyric timing must be monotonic; never reorder occurrences")
        lines.append({**item, "start": start, "end": end, "occurrence_index": index})
    if not lines:
        raise ValueError("Phrase search requires explicit canonical lyric_timing")
    return lines


def _iou(a: int, b: int, c: int, d: int) -> float:
    overlap = max(0, min(b, d) - max(a, c))
    return overlap / (max(b, d) - min(a, c))


def _feedback(feedback: dict | None, source_hash: str, frames: int,
              lines: list[dict], sr: int) -> tuple[list[dict], list[tuple[int, int]]]:
    if feedback is None:
        return [], []
    if not isinstance(feedback, dict) or feedback.get("schema") != "stemlab.loop_feedback.v1":
        raise ValueError("Unsupported loop feedback schema")
    if feedback.get("source_sha256") != source_hash:
        raise ValueError("Feedback source hash does not match this master")
    ratings = feedback.get("ratings")
    if not isinstance(ratings, list):
        raise ValueError("Feedback ratings must be a list")
    excluded = []
    tokens = [tuple(re.findall(r"\w+", line["text"].casefold())) for line in lines]
    for item in ratings:
        if not isinstance(item, dict):
            raise ValueError("Each feedback rating must be an object")
        a, b = item.get("start_sample"), item.get("end_sample")
        if (isinstance(a, bool) or isinstance(b, bool) or not isinstance(a, int)
                or not isinstance(b, int) or not 0 <= a < b <= frames):
            raise ValueError("Feedback needs valid native sample-frame bounds")
        if item.get("rating") not in {"bad", "okay", "good"}:
            raise ValueError("Feedback rating must be bad, okay or good")
        reason = item.get("reason", "unknown")
        if reason not in {"unknown", "musical_restart", "section_unsuitable"}:
            raise ValueError("Unsupported feedback reason")
        if item["rating"] == "bad" and reason == "section_unsuitable":
            excluded.append((a, b))
            # Exact canonical words identify repeats, not an inferred song-section label.
            inside = [i for i, line in enumerate(lines)
                      if round(line["start"]*sr) >= a and round(line["end"]*sr) <= b]
            if inside:
                needle = tokens[inside[0]:inside[-1]+1]
                for i in range(len(tokens)-len(needle)+1):
                    if tokens[i:i+len(needle)] == needle:
                        excluded.append((round(lines[i]["start"]*sr),
                                         round(lines[i+len(needle)-1]["end"]*sr)))
    return ratings, sorted(set(excluded))


def _cosine(a: np.ndarray, b: np.ndarray) -> float | None:
    denominator = float(np.linalg.norm(a)*np.linalg.norm(b))
    return float(np.clip(np.dot(a, b)/denominator, 0, 1)) if denominator > 1e-12 else None


def _attack_signature(events: dict, seconds: float, period: float) -> np.ndarray:
    # Same musical phase on either side of each cut, using StemLab's RMS-rise peaks.
    relative = (events["times"]-seconds)/period
    keep = (relative >= -2) & (relative < 2)
    return np.histogram(relative[keep], bins=32, range=(-2, 2),
                        weights=events["strengths"][keep])[0]


def musical_restart_context(audio: np.ndarray, sr: int, a: int, b: int,
                            period: float, events: dict) -> dict:
    size = round(.35*sr)
    context_frames = round(max(.35,2*period)*sr)
    if a < context_frames or b+context_frames > len(audio):
        return {"available": False, "reason": "Insufficient recorded context around a cut"}
    # Compare BEFORE with BEFORE and AFTER with AFTER. Last-v-first alone conflates
    # a normal attack with a tail and ignores what the ending would lead into.
    before = spectral_context(audio, sr, a-size, b)
    after = spectral_context(audio, sr, a, b+size)
    attack = _cosine(_attack_signature(events, a/sr, period),
                     _attack_signature(events, b/sr, period))
    harmonic = (before["chroma_cosine_similarity"]+after["chroma_cosine_similarity"])/2
    spectral = (before["log_band_cosine_similarity"]
                +after["log_band_cosine_similarity"])/2
    level = (before["rms_difference_db"]+after["rms_difference_db"])/2
    components = {"harmonic": (.30, 1-harmonic), "spectral": (.20, 1-spectral),
                  "level": (.10, min(1, level/12))}
    if attack is not None:
        components["attack"] = (.40, 1-attack)
    weight = sum(w for w, _ in components.values())
    cost = sum(w*c for w, c in components.values())/weight
    return dict(available=True, cost=cost, assessed_weight=weight,
                attack_context_similarity=attack, harmonic_context_similarity=harmonic,
                spectral_context_similarity=spectral, rms_context_difference_db=level,
                before=before, after=after, attack_window_beats=4,
                interpretation="Descriptive musical-continuation ranking, not listening approval")


def _phase(beats: np.ndarray, a: float, b: float) -> dict:
    if len(beats) < 3 or a < beats[0] or b > beats[-1]:
        return {"available": False, "reason": "No usable measured grid"}
    indices = [int(np.argmin(np.abs(beats-t))) for t in (a, b)]
    periods = []
    offsets = []
    for index, seconds in zip(indices, (a, b)):
        intervals = np.diff(beats[max(0,index-4):min(len(beats),index+5)])
        period = float(np.median(intervals))
        periods.append(period)
        offsets.append(float((seconds-beats[index])/period))
    phase_error = abs(offsets[1]-offsets[0])
    phase_error = abs(phase_error-round(phase_error))
    return dict(available=True, local_period_seconds=float(np.mean(periods)),
                nearest_beat_indices=indices, nearest_beat_count=indices[1]-indices[0],
                phase_error_beats=phase_error,
                local_tempo_difference=float(abs(periods[1]-periods[0])/np.mean(periods)),
                interpretation="Measured beat-phase proxy; no complete-bar or straight-grid approval")


def analyze_phrase_loops(audio_path: Path, output_dir: Path, *, canonical: dict,
                         beat_results: list, stems: list, feedback: dict | None = None,
                         whisper_result: dict | None = None, lyrics_result: dict | None = None,
                         normalization_gains: dict | None = None, song_map: dict | None = None,
                         export_audio: bool = False, config: PhraseLoopConfig | None = None) -> dict:
    cfg = config or PhraseLoopConfig()
    audio, sr = sf.read(audio_path, dtype="float32", always_2d=True)
    if not len(audio) or not np.isfinite(audio).all():
        raise ValueError("Master must contain finite audio samples")
    source_hash = sha256_file(audio_path)
    lines = _canonical_lines(canonical, len(audio)/sr)
    ratings, excluded = _feedback(feedback, source_hash, len(audio), lines, sr)
    model, beats, down, errors = _grid(beat_results, len(audio)/sr)
    strict_cfg = LoopConfig(snap_ms=0)
    gates, vocal_errors = _gates(stems, len(audio)/sr, strict_cfg, normalization_gains or {})
    intervals, timing_sources = _vocal_intervals(whisper_result, lyrics_result, canonical)
    events = extract_peak_events(audio_path)
    good_lengths = [(r["end_sample"]-r["start_sample"])/sr for r in ratings
                    if r["rating"] in {"good", "okay"}]
    rejected = Counter()
    pool = []
    for i, first in enumerate(lines):
        if first["end"] <= first["start"]:
            continue  # Preserve zero-length canonical lines, but never use as a start.
        for j in range(i+cfg.min_lines-1, len(lines)):
            last = lines[j]
            a, b = round(first["start"]*sr), round(last["end"]*sr)
            duration = (b-a)/sr
            if duration > cfg.max_seconds:
                break
            if duration < cfg.min_seconds or last["end"] <= last["start"]:
                continue
            if any(max(a,c) < min(b,d) for c,d in excluded):
                rejected["unsuitable_passage"] += 1
                continue
            if any(_iou(a,b,r["start_sample"],r["end_sample"]) >= .90 for r in ratings):
                rejected["previously_rated_near_duplicate"] += 1
                continue
            phase = _phase(beats, a/sr, b/sr)
            if not phase["available"]:
                rejected["missing_grid"] += 1
                continue
            bar_phase = detected_bar_phase_metrics(beats, down, a/sr, b/sr)
            if cfg.max_bar_phase_error is not None:
                if not bar_phase['available']:
                    rejected['missing_bar_phase'] += 1
                    continue
                if bar_phase['bar_phase_error'] > cfg.max_bar_phase_error+1e-12:
                    rejected['bar_phase_mismatch'] += 1
                    continue
            context = musical_restart_context(audio, sr, a, b,
                                               phase["local_period_seconds"], events)
            if not context["available"]:
                rejected["missing_recorded_context"] += 1
                continue
            join = optimize_join(audio, sr, a, b, a, b, strict_cfg, allow_failed=True)
            if join is None:
                rejected["invalid_native_bounds"] += 1
                continue
            duration_cost = (min(abs(math.log(duration/d)) for d in good_lengths)
                             if good_lengths else 0)
            cost = (.75*context["cost"] + .10*min(1,phase["phase_error_beats"]/.25)
                    +.10*min(1,duration_cost)+.05*min(1,join["cost"]/10))
            timing_clear = [not any(s-.08 <= t <= e+.08 for s,e in intervals)
                            for t in (a/sr,b/sr)]
            acoustic_clear = [bool(gates) and all(g.clear(t,.08) for g in gates)
                              for t in (a/sr,b/sr)]
            failed = ["complete_bar_alignment_unverified", "attended_listening_unavailable"]
            if not all(timing_clear) or not all(acoustic_clear):
                failed.append("vocal_boundary")
            if not join["passes_waveform_join"]:
                failed.append("waveform_join")
            pool.append(dict(start_sample=a,end_sample=b,duration_samples=b-a,
                start_seconds=a/sr,end_seconds=b/sr,duration_seconds=duration,
                included_lyrics=lines[i:j+1],canonical_line_indices=[i,j],
                restart_context=context,phase=phase,detected_bar_phase=bar_phase,join=join,
                vocal_clear=all(acoustic_clear) and all(timing_clear),
                acoustic_clear=acoustic_clear,timing_clear=timing_clear,
                failed_gates=failed,ranking_cost=cost,feedback_duration_cost=duration_cost,
                status="requires_listening_or_edit",crossfade_ms=0,file=None))
    pool.sort(key=lambda c:(c["ranking_cost"],c["start_sample"],c["end_sample"]))
    selected = []
    for item in pool:
        if any(max(0,min(item["end_sample"],c["end_sample"])
                     -max(item["start_sample"],c["start_sample"]))
               /min(item["duration_samples"],c["duration_samples"]) > cfg.max_overlap
               for c in selected):
            rejected["overlapping_alternative"] += 1
            continue
        item["id"] = f"phrase-{len(selected)+1:02d}"
        selected.append(item)
        if len(selected) == cfg.top:
            break
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    if export_audio:
        for item in selected:
            item["file"] = f"audio/{item['id']}-{item['start_sample']}-{item['end_sample']}.wav"
            path = output_dir/item["file"]
            path.parent.mkdir(exist_ok=True)
            sf.write(path,audio[item["start_sample"]:item["end_sample"]],sr,subtype="FLOAT")
    report = dict(schema="stemlab.phrase_loops.v1",source_sha256=source_hash,
        source_name=Path(audio_path).name,sample_rate=int(sr),source_frames=len(audio),
        channels=audio.shape[1],config=asdict(cfg),grid_source=model,grid_diagnostics=errors,
        vocal_diagnostics=vocal_errors,vocal_timing_sources=timing_sources,
        boundary_convention="zero-based native frames; start inclusive, end exclusive",
        candidate_count=len(selected),candidates=selected,scored_candidate_count=len(pool),
        rejected_candidates=dict(rejected),accepted_loop_count=0,
        feedback_summary=dict(rating_count=len(ratings),positive_reference_count=len(good_lengths),
                              excluded_passages=[list(x) for x in excluded]),
        method_notes=["Complete canonical lines, not proof of complete musical or narrative phrases.",
            "Before-to-before and after-to-after harmonic/spectral context plus RMS-rise attack shape.",
            "Weights: musical context .75, beat phase .10, rated duration .10, sample seam .05.",
            "Explicit feedback only; no trained model or calibrated confidence.",
            "Bad section passages and exact canonical-word repeats excluded; all rated near-duplicates suppressed.",
            "Missing attack similarity stays null; available context weights are reported.",
            "Strict loop search and its acceptance gates are unchanged.",
            "Optional detected bar-phase filter uses enclosing downbeats and consistent measured beats per bar; it does not prove meter, harmony or listening quality.",
            "Native audio slices only; no snap, fade, crossfade, stretch or normalisation."])
    _write_json(output_dir/"phrase_loops.json",report)
    return report


def analyze_existing_phrase_loops(root: Path, *, feedback: dict | None = None,
                                 export_audio: bool = False,
                                 config: PhraseLoopConfig | None = None) -> dict:
    root = root.expanduser().resolve()
    report = analyze_phrase_loops(output_dir=root/"deep/phrase_loops",
        **load_loop_evidence(root), feedback=feedback, export_audio=export_audio, config=config)
    index_loop_report(root,"phrase_loops","deep/phrase_loops/phrase_loops.json")
    return report
