"""Conservative, native-sample loop discovery for StemLab / DanceFlow.

Kieran Simkin — https://kieransimkin.co.uk/my-songs/
No model downloads, resampling, time stretching or implicit audio export.
"""
from __future__ import annotations

import csv
import io
import json
import math
import re
from collections import Counter
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import numpy as np
import soundfile as sf

from stemlab.branding import attribution
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import sha256_file


@dataclass(frozen=True)
class LoopConfig:
    max_bars: int = 16
    max_seconds: float | None = None
    mode: str = "strict"
    exploratory_algorithm: str = "spectral_context"
    search_scope: str = "sections"
    loops_per_section: int = 1
    snap_ms: float = 5.0
    vocal_guard_ms: float = 80.0
    vocal_threshold_dbfs: float = -45.0
    vocal_relative_db: float = -35.0
    max_interval_error: float = 0.08
    max_grid_residual_ms: float = 20.0
    max_wrap_tempo_error: float = 0.04
    max_join_step: float = 0.01
    max_join_slope_error: float = 0.02

    def __post_init__(self):
        for name, value in asdict(self).items():
            if name in {"mode", "exploratory_algorithm", "search_scope"}:
                continue
            if name == "max_seconds" and value is None:
                continue
            if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
                raise ValueError(f"{name} must be finite")
        if not isinstance(self.max_bars, int) or not 1 <= self.max_bars <= 64:
            raise ValueError("max_bars must be an integer in 1..64")
        if self.max_seconds is not None and self.max_seconds <= 0:
            raise ValueError("max_seconds must be positive")
        if self.mode not in {"strict", "exploratory"}:
            raise ValueError("mode must be strict or exploratory")
        if self.exploratory_algorithm not in {"waveform", "spectral_context"}:
            raise ValueError("exploratory_algorithm must be waveform or spectral_context")
        if self.search_scope not in {"sections", "whole_song"}:
            raise ValueError("search_scope must be sections or whole_song")
        if self.search_scope == "whole_song" and self.mode != "exploratory":
            raise ValueError("whole_song scope requires exploratory mode")
        max_results = 64 if self.mode == "exploratory" else 8
        if not isinstance(self.loops_per_section, int) or not 1 <= self.loops_per_section <= max_results:
            raise ValueError(f"loops_per_section must be an integer in 1..{max_results}")
        if not 0 <= self.snap_ms <= 20 or not 0 <= self.vocal_guard_ms <= 1000:
            raise ValueError("snap_ms must be in 0..20 and vocal_guard_ms in 0..1000")
        if self.vocal_threshold_dbfs >= 0 or self.vocal_relative_db >= 0:
            raise ValueError("Vocal thresholds must be negative")
        if any(getattr(self, k) <= 0 for k in (
            "max_interval_error", "max_grid_residual_ms", "max_wrap_tempo_error",
            "max_join_step", "max_join_slope_error",
        )):
            raise ValueError("Grid and join tolerances must be positive")


def _write_json(path: Path, value: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(value, indent=2, allow_nan=False) + "\n", encoding="utf-8")
    temporary.replace(path)


def _kind(label: str) -> str | None:
    words = re.findall(r"[a-z]+", label.lower())
    if any(x in words for x in ("pre", "post", "prechorus", "postchorus")):
        return None
    return next((kind for kind in ("verse", "chorus", "hook") if kind in words), None)


def _sections(song_map: dict | None, duration: float) -> list[dict]:
    counts: Counter = Counter()
    out = []
    for index, item in enumerate((song_map or {}).get("sections", [])):
        kind = _kind(str(item.get("label", "")))
        if kind is None:
            continue
        try:
            start, end = float(item["start"]), float(item["end"])
        except (KeyError, TypeError, ValueError):
            continue
        if not np.isfinite([start, end]).all() or end <= start or start >= duration or end <= 0:
            continue
        counts[kind] += 1
        out.append(dict(index=index, kind=kind, occurrence=counts[kind],
                        label=str(item["label"]), start=max(0.0, start), end=min(duration, end)))
    return out


def _ordered_times(values) -> np.ndarray:
    result = np.asarray(values, dtype=float)
    if result.ndim != 1 or not np.isfinite(result).all() or np.any(result < 0):
        raise ValueError("Beat timestamps must be finite, nonnegative and one-dimensional")
    if np.any(np.diff(result) <= 0):
        raise ValueError("Beat timestamps must be strictly increasing; duplicates are not repaired")
    return result


def _grid(results: list[BeatResult], duration: float):
    """Keep a single detector's beats/downbeats together; never fabricate 4/4."""
    rank = {"consensus": 0, "all_in_one": 1}
    reasons = []
    for item in sorted(results, key=lambda r: rank.get(r.model, 2)):
        try:
            beats = _ordered_times(item.beats)
            down = _ordered_times(item.downbeats)
            if len(down) < 2:
                positions = item.metadata.get("beat_positions", [])
                if len(positions) == len(beats):
                    down = beats[np.asarray(positions) == 1]
            beats = beats[beats <= duration + 1e-9]
            down = down[down <= duration + 1e-9]
            if len(beats) < 3 or len(down) < 2:
                raise ValueError("not enough beats/downbeats")
            indices = []
            for value in down:
                idx = int(np.argmin(np.abs(beats - value)))
                # Downbeat and beat must identify the same event. This tolerance
                # admits detector jitter, not a different beat or meter phase.
                if abs(beats[idx] - value) > 0.03:
                    raise ValueError("downbeat does not align with its detector's beat grid")
                indices.append(idx)
            indices = np.asarray(indices, dtype=int)
            if np.any(np.diff(indices) <= 0):
                raise ValueError("multiple downbeats map to one beat")
            return item.model, beats, indices, reasons
        except (ValueError, TypeError) as exc:
            reasons.append(f"{item.model}: {exc}")
    return None, np.array([]), np.array([], dtype=int), reasons


def _vocal_intervals(whisper: dict | None, lyrics: dict | None, canonical: dict | None):
    """Union ALL available explicit timings; absence of words is not silence."""
    intervals = []
    sources = []
    collections = [
        ("canonical", (canonical or {}).get("lyric_timing", [])),
        ("lyric_lines", (lyrics or {}).get("lines", [])),
        ("whisper_words", (whisper or {}).get("words", [])),
    ]
    for name, items in collections:
        added = 0
        for item in items:
            try:
                a, b = float(item["start"]), float(item["end"])
            except (KeyError, TypeError, ValueError):
                continue
            if np.isfinite([a, b]).all() and b > a:
                intervals.append((a, b))
                added += 1
        if added:
            sources.append(name)
    return sorted(set(intervals)), sources


class VocalGate:
    """5 ms per-channel RMS bins; never cancel antiphase stereo by averaging."""
    def __init__(self, path: Path, duration: float, cfg: LoopConfig, gain_db: float = 0):
        self.path = path
        info = sf.info(path)
        self.sr = int(info.samplerate)
        self.duration = info.frames / self.sr
        if abs(self.duration - duration) > max(0.02, 2 / self.sr):
            raise ValueError("Vocal stem does not cover the master timeline")
        self.hop = max(1, round(0.005 * self.sr))
        # Block reading avoids allocating every separated track simultaneously.
        levels = []
        with sf.SoundFile(path) as handle:
            while True:
                data = handle.read(self.hop * 2000, dtype="float32", always_2d=True)
                if not len(data):
                    break
                if not np.isfinite(data).all():
                    raise ValueError("Vocal stem has non-finite audio")
                data = data.astype(np.float64) * 10 ** (-gain_db / 20)
                padding = (-len(data)) % self.hop
                if padding:
                    data = np.pad(data, ((0, padding), (0, 0)))
                rms = np.sqrt(np.mean(data.reshape(-1, self.hop, info.channels) ** 2, axis=1))
                levels.extend(np.max(rms, axis=1).tolist())
        self.levels = np.asarray(levels)
        peak = float(self.levels.max(initial=0))
        self.threshold = min(10 ** (cfg.vocal_threshold_dbfs / 20),
                             peak * 10 ** (cfg.vocal_relative_db / 20)) if peak > 0 else 0.0
        self.cfg = cfg

    def clear(self, seconds: float, margin: float) -> bool:
        start, end = seconds - margin, seconds + margin
        # Missing coverage is unknown, not silence. At actual track edges the
        # guard is clipped to the existing recording only.
        if seconds < 0 or seconds > self.duration + 1 / self.sr:
            return False
        a = max(0, math.floor(start * self.sr / self.hop))
        b = min(len(self.levels), math.ceil(end * self.sr / self.hop) + 1)
        return b > a and float(np.max(self.levels[a:b])) <= self.threshold


def _gates(stems: list[StemArtifact], duration: float, cfg: LoopConfig, gains: dict[str, float]):
    # A lead-only stem or speech-gated track cannot establish absence of backing
    # singing. Use complete vocals only. Multiple complete estimates must agree.
    gates, errors = [], []
    for stem in stems:
        if stem.stem.lower().replace(" ", "_") not in {"vocal", "vocals", "all_vocals"}:
            continue
        if stem.model == "speech":
            continue
        try:
            gain = float(gains.get(str(stem.path), 0.0))
            if not math.isfinite(gain):
                raise ValueError("Invalid normalization gain")
            gates.append(VocalGate(Path(stem.path), duration, cfg, gain))
        except (ValueError, OSError, RuntimeError) as exc:
            errors.append(f"{stem.model}/{stem.stem}: {exc}")
    return gates, errors


def grid_metrics(beats: np.ndarray, down_indices: np.ndarray, first: int, last: int,
                 cfg: LoopConfig) -> dict | None:
    counts = np.diff(down_indices[first:last + 1])
    if not len(counts) or np.any(counts != counts[0]) or not 2 <= counts[0] <= 12:
        return None
    values = beats[down_indices[first]:down_indices[last] + 1]
    intervals = np.diff(values)
    if len(intervals) < 2 or np.any(intervals <= 0):
        return None
    period = float(np.median(intervals))
    error = float(np.max(np.abs(intervals / period - 1)))
    # A straight grid includes the closing downbeat. Ramp/phase-skip residuals
    # cannot be hidden by discarding long or short intervals.
    x = np.arange(len(values))
    slope, intercept = np.polyfit(x, values, 1)
    residual = float(np.max(np.abs(values - (intercept + slope * x))))
    wrap_error = float(abs(intervals[-1] - intervals[0]) / period)
    if error > cfg.max_interval_error or residual * 1000 > cfg.max_grid_residual_ms:
        return None
    if wrap_error > cfg.max_wrap_tempo_error:
        return None
    return dict(beats_per_bar=int(counts[0]), beat_count=int(len(intervals)),
                bpm=60 / period, maximum_interval_relative_error=error,
                maximum_grid_residual_ms=residual * 1000,
                wrap_interval_relative_error=wrap_error,
                first_interval_seconds=float(intervals[0]),
                last_interval_seconds=float(intervals[-1]))


def optimize_join(audio: np.ndarray, sr: int, start: int, end: int,
                  lower: int, upper: int, cfg: LoopConfig, *, allow_failed: bool = False) -> dict | None:
    """Same offset at both cuts keeps length fixed. Score every channel."""
    radius = round(cfg.snap_ms * sr / 1000)
    lo = max(-radius, lower - start, -start)
    hi = min(radius, upper - end, len(audio) - end)
    if hi < lo or end - start < 4:
        return None
    offsets = np.arange(lo, hi + 1, dtype=np.int64)
    a, b = start + offsets, end + offsets
    jump = np.max(np.abs(audio[a] - audio[b - 1]), axis=1)
    slope = np.max(np.abs((audio[a + 1] - audio[a]) - (audio[b - 1] - audio[b - 2])), axis=1)
    valid = (jump <= cfg.max_join_step) & (slope <= cfg.max_join_slope_error)
    if not valid.any() and not allow_failed:
        return None
    cost = jump / cfg.max_join_step + 0.3 * slope / cfg.max_join_slope_error
    cost += 0.02 * np.abs(offsets) / max(1, radius)
    if not allow_failed:
        cost[~valid] = np.inf
    best = int(np.argmin(cost))
    return dict(start_sample=int(a[best]), end_sample=int(b[best]),
                common_offset_samples=int(offsets[best]),
                max_channel_step=float(jump[best]),
                max_channel_slope_error=float(slope[best]), cost=float(cost[best]),
                passes_waveform_join=bool(valid[best]))


def spectral_context(audio: np.ndarray, sr: int, start: int, end: int) -> dict:
    """Compare local spectral envelopes at two cut neighborhoods; not a seam test.

    This is an inexpensive feature-similarity ranking inspired by recurrence
    methods, not an implementation of a published loop detector.
    """
    size = max(32, round(0.35 * sr))
    envelopes, chroma_vectors = [], []
    levels = []
    for lo, hi in ((end - size, end), (start, start + size)):
        block = np.zeros((size, audio.shape[1]), dtype=np.float64)
        a, b = max(0, lo), min(len(audio), hi)
        block[a - lo:b - lo] = audio[a:b]
        levels.append(float(np.sqrt(np.mean(block ** 2))))
        spectrum = np.mean(np.abs(np.fft.rfft(block * np.hanning(len(block))[:, None], axis=0)), axis=1)
        frequencies = np.fft.rfftfreq(len(block), 1 / sr)
        edges = np.geomspace(50, min(16000, sr / 2), 25)
        bands = np.array([np.sum(spectrum[(frequencies >= left) & (frequencies < right)])
                          for left, right in zip(edges[:-1], edges[1:])])
        envelopes.append(np.log1p(bands))
        usable = (frequencies >= 80) & (frequencies <= min(5000, sr / 2))
        pitch_classes = np.mod(np.rint(69 + 12 * np.log2(frequencies[usable] / 440)).astype(int), 12)
        chroma_vectors.append(np.bincount(pitch_classes, weights=spectrum[usable], minlength=12))

    def cosine(left: np.ndarray, right: np.ndarray) -> float:
        denominator = np.linalg.norm(left) * np.linalg.norm(right)
        return float(np.dot(left, right) / denominator) if denominator > 0 else 0.0

    envelope_similarity = cosine(*envelopes)
    chroma_similarity = cosine(*chroma_vectors)
    similarity = 0.5 * (envelope_similarity + chroma_similarity)
    level_difference = float(abs(20 * np.log10(max(levels[0], 1e-8) / max(levels[1], 1e-8))))
    return {"feature_similarity": max(0.0, min(1.0, similarity)),
            "log_band_cosine_similarity": max(0.0, min(1.0, envelope_similarity)),
            "chroma_cosine_similarity": max(0.0, min(1.0, chroma_similarity)),
            "rms_difference_db": level_difference, "window_ms": size * 1000 / sr}


def analyze_loops(audio_path: Path, output_dir: Path, *, song_map: dict | None,
                  beat_results: list[BeatResult], stems: list[StemArtifact],
                  whisper_result: dict | None = None, lyrics_result: dict | None = None,
                  canonical: dict | None = None, normalization_gains: dict[str, float] | None = None,
                  export_audio: bool = False, config: LoopConfig | None = None) -> dict[str, Any]:
    cfg = config or LoopConfig()
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    audio, sr = sf.read(audio_path, dtype="float32", always_2d=True)
    if not len(audio) or not np.isfinite(audio).all():
        raise ValueError("Master must contain finite audio samples")
    duration = len(audio) / sr
    sections = (_sections(song_map, duration) if cfg.search_scope == "sections" else
                [dict(index=-1, kind="whole", occurrence=1, label="Whole master search",
                      start=0.0, end=duration)])
    model, beats, down, grid_errors = _grid(beat_results, duration)
    intervals, timing_sources = _vocal_intervals(whisper_result, lyrics_result, canonical)
    gates, vocal_errors = _gates(stems, duration, cfg, normalization_gains or {})
    # No acoustic evidence means no accepted cuts, even with a transcript.
    guard = cfg.vocal_guard_ms / 1000
    safety_cache: dict[int, bool] = {}

    def acoustic_clear(t: float, margin: float) -> bool:
        return bool(gates) and all(g.clear(t, margin) for g in gates)

    def timing_clear(t: float, margin: float) -> bool:
        return not any(a - margin <= t <= b + margin for a, b in intervals)

    def clear(t: float, margin: float) -> bool:
        return acoustic_clear(t, margin) and timing_clear(t, margin)

    def boundary_clear(index: int) -> bool:
        if index not in safety_cache:
            safety_cache[index] = clear(float(beats[down[index]]), guard + cfg.snap_ms / 1000)
        return safety_cache[index]

    loops, exploratory, unresolved, section_diagnostics = [], [], [], []
    for section in sections:
        reason = None
        rejected: Counter = Counter()
        candidates, near_misses = [], []
        boundary_counts = None
        if model is None:
            reason = "No usable beat/downbeat grid; bar starts are unknown."
        elif not gates and cfg.mode == "strict":
            reason = "No valid full-vocal stem; transcript gaps alone cannot prove silence."
        else:
            lower = max(0, math.ceil(section["start"] * sr - 1e-7))
            upper = min(len(audio), math.floor(section["end"] * sr + 1e-7))
            indices = [i for i, b in enumerate(down) if lower <= round(beats[b] * sr) <= upper]
            margin = guard + cfg.snap_ms / 1000
            boundary_counts = {
                "downbeats_in_section": len(indices),
                "acoustically_clear_downbeats": sum(
                    acoustic_clear(float(beats[down[i]]), margin) for i in indices),
                "timing_clear_downbeats": sum(
                    timing_clear(float(beats[down[i]]), margin) for i in indices),
                "fully_clear_downbeats": sum(boundary_clear(i) for i in indices),
            }
            max_frames = None if cfg.max_seconds is None else math.floor(cfg.max_seconds * sr)
            for i in indices:
                for j in range(i + 1, min(len(down), i + cfg.max_bars + 1)):
                    a, b = round(beats[down[i]] * sr), round(beats[down[j]] * sr)
                    if b > upper:
                        break
                    # The shared boundary offset preserves duration exactly.
                    # Once a later downbeat is too long, all following ones are too.
                    if max_frames is not None and b - a > max_frames:
                        rejected["max_seconds"] += 1
                        break
                    vocal_ok = boundary_clear(i) and boundary_clear(j)
                    if not vocal_ok and cfg.mode == "strict":
                        rejected["vocal_boundary"] += 1
                        continue
                    metrics = grid_metrics(beats, down, i, j, cfg)
                    if metrics is None:
                        rejected["unstable_grid_or_meter"] += 1
                        continue
                    join = optimize_join(audio, sr, a, b, lower, upper, cfg,
                                         allow_failed=cfg.mode == "exploratory")
                    if join is None:
                        rejected["waveform_join"] += 1
                        continue
                    s, e = join["start_sample"], join["end_sample"]
                    snapped_vocal_ok = clear(s / sr, guard) and clear(e / sr, guard)
                    passes = vocal_ok and snapped_vocal_ok and join["passes_waveform_join"]
                    bars = j - i
                    preference = {8: 0, 4: 0.06, 16: 0.12, 2: 0.25, 1: 0.45}.get(bars, 0.20)
                    cost = preference + 0.25 * join["cost"]
                    cost += metrics["maximum_grid_residual_ms"] / (10 * cfg.max_grid_residual_ms)
                    item = dict(start_sample=s, end_sample=e, duration_samples=e - s,
                                start_seconds=s / sr, end_seconds=e / sr,
                                duration_seconds=(e - s) / sr, bars=bars,
                                grid_start_sample=a, grid_end_sample=b,
                                grid=metrics, join=join, ranking_cost=cost)
                    if passes:
                        candidates.append(item)
                    elif cfg.mode == "exploratory":
                        failed = []
                        if not gates:
                            failed.append("full_vocal_evidence_missing")
                        elif not vocal_ok or not snapped_vocal_ok:
                            failed.append("vocal_boundary")
                        if not join["passes_waveform_join"]:
                            failed.append("waveform_join")
                        context = spectral_context(audio, sr, s, e)
                        # Feature similarity can suggest an audition, but is
                        # not a substitute for vocal, grid or seam clearance.
                        if cfg.exploratory_algorithm == "spectral_context":
                            rank = (1 - context["feature_similarity"]
                                    + min(1.0, context["rms_difference_db"] / 24)
                                    + preference + metrics["maximum_grid_residual_ms"] / 200)
                        else:
                            rank = cost
                        near_misses.append({**item, "spectral_context": context,
                                            "failed_gates": failed,
                                            "status": "requires_listening_or_edit",
                                            "exploratory_ranking_cost": rank})
                        for gate in failed:
                            rejected[gate] += 1
                    elif not snapped_vocal_ok:
                        rejected["vocal_boundary"] += 1
            if not candidates:
                reason = "No candidate met all duration, complete-bar, vocal-clear, grid and join checks."
        section_diagnostics.append({"section_index": section["index"], "label": section["label"],
                                    "boundary_counts": boundary_counts,
                                    "rejected_candidates": dict(rejected)})
        near_misses.sort(key=lambda x: (x["exploratory_ranking_cost"], x["start_sample"], x["end_sample"]))
        for rank, item in enumerate(near_misses[:cfg.loops_per_section], 1):
            candidate_id = f"{section['kind']}-{section['occurrence']:02d}-x{rank:02d}"
            record = {"id": candidate_id, "section_index": section["index"],
                      "section_label": section["label"], "section_kind": section["kind"],
                      **item, "file": None, "vocal_clear": "vocal_boundary" not in item["failed_gates"]
                      and "full_vocal_evidence_missing" not in item["failed_gates"]}
            if export_audio:
                name = f"exploratory-audio/{candidate_id}-{item['start_sample']}-{item['end_sample']}.wav"
                path = output_dir / name
                path.parent.mkdir(parents=True, exist_ok=True)
                temporary = path.with_suffix(".tmp")
                sf.write(temporary, audio[item["start_sample"]:item["end_sample"]], sr,
                         subtype="FLOAT", format="WAV")
                temporary.replace(path)
                record["file"] = name
            exploratory.append(record)
        if reason:
            unresolved.append({**section, "reason": reason, "rejected_candidates": dict(rejected)})
            continue
        candidates.sort(key=lambda x: (x["ranking_cost"], x["start_sample"], x["end_sample"]))
        for rank, item in enumerate(candidates[:cfg.loops_per_section], 1):
            loop_id = f"{section['kind']}-{section['occurrence']:02d}-{rank:02d}"
            record = {"id": loop_id, "section_index": section["index"],
                      "section_label": section["label"], "section_kind": section["kind"],
                      "section_start_seconds": section["start"], "section_end_seconds": section["end"],
                      **item, "file": None, "vocal_clear": True}
            if export_audio:
                name = f"audio/{loop_id}-{item['start_sample']}-{item['end_sample']}.wav"
                path = output_dir / name
                path.parent.mkdir(parents=True, exist_ok=True)
                temporary = path.with_suffix(".tmp")
                sf.write(temporary, audio[item["start_sample"]:item["end_sample"]], sr,
                         subtype="FLOAT", format="WAV")
                temporary.replace(path)
                record["file"] = name
            loops.append(record)

    result = dict(schema="stemlab.loops.v1", attribution=attribution(),
                  source_name=Path(audio_path).name, source_sha256=sha256_file(audio_path),
                  sample_rate=int(sr), source_frames=len(audio), channels=audio.shape[1],
                  section_source=(song_map or {}).get("section_source") if cfg.search_scope == "sections"
                  else "whole_master_search_window",
                  grid_source=model, config=asdict(cfg), loop_count=len(loops),
                  target_section_count=len(sections), loops=loops,
                  exploratory_count=len(exploratory), exploratory_candidates=exploratory,
                  unresolved_sections=unresolved,
                  section_diagnostics=section_diagnostics,
                  export_audio=bool(export_audio), grid_diagnostics=grid_errors,
                  vocal_diagnostics=vocal_errors, vocal_timing_sources=timing_sources,
                  vocal_sources=[dict(name=g.path.name, threshold_amplitude=g.threshold) for g in gates],
                  boundary_convention="zero-based source sample frames; start inclusive, end exclusive",
                  method_notes=[
                      "End is the following downbeat, retaining the final beat's full duration.",
                      "Both boundaries move by the SAME small sample offset; no duration-changing crossfade.",
                      "All valid full-vocal stems must be quiet in guard windows; all explicit vocal timings veto cuts.",
                      "Acoustic silence and seam checks are heuristics, not proof of inaudibility. Audition loops.",
                      "Loops may contain vocals inside; only the cut neighborhoods must be vocal-clear.",
                      "Native source sample rate and channels are preserved. No resampling or normalization.",
                      "Exploratory candidates are near-misses only; spectral context ranks them but does not establish a clean edit.",
                  ])
    tsv = output_dir / "loops.tsv"
    with tsv.open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerow(["id", "section", "start_sample", "end_sample_exclusive", "sample_rate", "bars"])
        for loop in loops:
            writer.writerow([loop["id"], loop["section_label"], loop["start_sample"], loop["end_sample"], sr, loop["bars"]])
    with (output_dir / "exploratory.tsv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerow(["id", "section", "start_sample", "end_sample_exclusive", "sample_rate",
                         "bars", "failed_gates", "ranking_cost"])
        for item in exploratory:
            writer.writerow([item["id"], item["section_label"], item["start_sample"],
                             item["end_sample"], sr, item["bars"], ",".join(item["failed_gates"]),
                             item["exploratory_ranking_cost"]])
    _write_json(output_dir / "loops.json", result)
    return result


def _read(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}


def _inside(root: Path, value: str) -> Path:
    path = (root / value).resolve()
    if not path.is_relative_to(root.resolve()):
        raise ValueError("Analysis artifact path escapes its results directory")
    return path


def analyze_existing_loops(root: Path, *, export_audio: bool = False,
                           config: LoopConfig | None = None) -> dict:
    """Reuse saved models. Also works after canonical section/timing edits."""
    from .song_map import _choose_sections
    from stemlab.manifest import write_manifest

    root = root.expanduser().resolve()
    analysis = _read(root / "analysis.json")
    source = analysis.get("source", {})
    master = _inside(root, source["copied_path"])
    if sha256_file(master) != source["sha256"]:
        raise ValueError("Copied master no longer matches analysis source hash")
    canonical = _read(root / "canonical.json")
    structure = _read(root / "deep/structure/structure.json")
    song_map = _read(root / "deep/song_map/song_map.json")
    if canonical.get("sections") or structure.get("segments"):
        info = sf.info(master)
        origin, sections = _choose_sections(canonical, structure, None, info.duration)
        song_map = {"section_source": origin, "sections": sections}
    results = []
    for path in sorted((root / "beats").glob("*.json")):
        data = _read(path)
        if isinstance(data.get("beats"), list):
            results.append(BeatResult(str(data.get("model", path.stem)), data["beats"],
                                      data.get("downbeats", []), data.get("tempo_bpm"), data.get("metadata", {})))
    stems, gains = [], {}
    for model in analysis.get("models", []):
        for item in model.get("stems", []):
            stems.append(StemArtifact(str(item["model"]), str(item["stem"]), _inside(root, item["path"])))
        for item in model.get("normalization", []):
            gains[str(_inside(root, item["path"]))] = float(item.get("gain_db", 0.0))
    report = analyze_loops(master, root / "deep/loops", song_map=song_map, beat_results=results,
                           stems=stems, whisper_result=_read(root / "speech/whisper.json"),
                           lyrics_result=_read(root / "deep/lyrics/lyrics.json"), canonical=canonical,
                           normalization_gains=gains, export_audio=export_audio, config=config)
    summary_path = root / "deep/summary.json"
    summary = _read(summary_path)
    summary.setdefault("analyses", {})["loops"] = {"available": True, "path": "deep/loops/loops.json"}
    _write_json(summary_path, summary)
    if not isinstance(analysis.get("deep_analysis"), dict):
        analysis["deep_analysis"] = {}
    analysis["deep_analysis"].setdefault("analyses", {})["loops"] = summary["analyses"]["loops"]
    _write_json(root / "analysis.json", analysis)
    old_manifest = _read(root / "manifest.json")
    write_manifest(root, extra={k: v for k, v in old_manifest.items()
                                if k not in {"generated_at", "platform", "python", "files"}})
    return report


def preview_loop(root: Path, loop_id: str) -> tuple[bytes, str]:
    """Read-only exact slice; never create files merely to audition a loop."""
    if not re.fullmatch(r"(?:verse|chorus|hook|whole)-\d+-(?:\d+|x\d+)", loop_id):
        raise ValueError("Invalid loop id")
    root = root.resolve()
    report = _read(root / "deep/loops/loops.json")
    item = next((x for x in report.get("loops", []) + report.get("exploratory_candidates", [])
                 if x.get("id") == loop_id), None)
    if item is None:
        raise FileNotFoundError("Loop not found; run stemlab loops on this result directory")
    analysis = _read(root / "analysis.json")
    master = _inside(root, analysis["source"]["copied_path"])
    if report.get("source_sha256") != analysis["source"]["sha256"] or sha256_file(master) != report["source_sha256"]:
        raise ValueError("Loop report is stale for the current master")
    a, b = item["start_sample"], item["end_sample"]
    with sf.SoundFile(master) as handle:
        if not isinstance(a, int) or not isinstance(b, int) or not 0 <= a < b <= len(handle):
            raise ValueError("Invalid sample bounds")
        if handle.samplerate != report["sample_rate"]:
            raise ValueError("Loop sample rate does not match the source")
        # Defend an HTTP request from an edited/unbounded report.
        if (b - a) * handle.channels * 4 > 128 * 1024 * 1024:
            raise ValueError("Loop preview exceeds 128 MiB; use CLI export")
        handle.seek(a)
        audio = handle.read(b - a, dtype="float32", always_2d=True)
        stream = io.BytesIO()
        sf.write(stream, audio, handle.samplerate, subtype="FLOAT", format="WAV")
    return stream.getvalue(), f"{loop_id}.wav"
