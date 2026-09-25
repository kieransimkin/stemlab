from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from stemlab.types import BeatResult
from stemlab.util import write_json


def _clean_sections(items: list[dict[str, Any]], duration: float | None = None) -> list[dict[str, Any]]:
    sections: list[dict[str, Any]] = []
    for i, item in enumerate(items):
        try:
            start = float(item.get("start", 0.0))
        except (TypeError, ValueError):
            continue
        end_raw = item.get("end")
        try:
            end = float(end_raw) if end_raw is not None else None
        except (TypeError, ValueError):
            end = None
        sections.append(
            {
                "start": max(0.0, start),
                "end": end,
                "label": str(item.get("label") or item.get("text") or f"Section {i + 1}"),
            }
        )
    sections.sort(key=lambda x: x["start"])
    for i, item in enumerate(sections):
        if item["end"] is None or item["end"] <= item["start"]:
            next_start = sections[i + 1]["start"] if i + 1 < len(sections) else duration
            item["end"] = float(next_start) if next_start is not None else item["start"]
        if duration is not None:
            item["end"] = min(float(item["end"]), duration)
        item["duration"] = max(0.0, float(item["end"]) - item["start"])
    return [item for item in sections if item["duration"] > 0]


def _vamp_structure(vamp_result: dict[str, Any] | None) -> list[dict[str, Any]]:
    if not vamp_result:
        return []
    for analysis in vamp_result.get("analyses", []):
        if analysis.get("slug") == "structure":
            return [
                {
                    "start": event.get("start"),
                    "end": event.get("end"),
                    "label": event.get("label") or "segment",
                }
                for event in analysis.get("events", [])
            ]
    return []


def _choose_sections(
    canonical: dict[str, Any] | None,
    structure_result: dict[str, Any] | None,
    vamp_result: dict[str, Any] | None,
    duration: float | None,
) -> tuple[str, list[dict[str, Any]]]:
    if canonical and canonical.get("sections"):
        return "canonical", _clean_sections(list(canonical["sections"]), duration)
    if structure_result and structure_result.get("segments"):
        return "all_in_one", _clean_sections(list(structure_result["segments"]), duration)
    vamp = _vamp_structure(vamp_result)
    if vamp:
        return "segmentino", _clean_sections(vamp, duration)
    if duration and duration > 0:
        return "whole_track", [{"start": 0.0, "end": duration, "duration": duration, "label": "Whole track"}]
    return "none", []


def _mean_window(times: np.ndarray, values: np.ndarray, start: float, end: float) -> float | None:
    if times.size == 0 or values.size == 0:
        return None
    mask = (times >= start) & (times < end)
    vals = np.asarray(values)[mask]
    vals = vals[np.isfinite(vals)]
    return float(np.mean(vals)) if vals.size else None


def _boundary_comparison(
    canonical: list[dict[str, Any]], predicted: list[dict[str, Any]], tolerance: float = 3.0
) -> dict[str, Any] | None:
    canonical_boundaries = np.asarray([x["start"] for x in canonical[1:]], dtype=float)
    predicted_boundaries = np.asarray([x["start"] for x in predicted[1:]], dtype=float)
    if not canonical_boundaries.size or not predicted_boundaries.size:
        return None
    errors = []
    matches = 0
    nearest = []
    for value in canonical_boundaries:
        idx = int(np.argmin(np.abs(predicted_boundaries - value)))
        pred = float(predicted_boundaries[idx])
        error = abs(pred - float(value))
        errors.append(error)
        matches += int(error <= tolerance)
        nearest.append({"canonical": float(value), "predicted": pred, "absolute_error_seconds": float(error)})
    return {
        "tolerance_seconds": float(tolerance),
        "canonical_boundary_count": int(len(canonical_boundaries)),
        "predicted_boundary_count": int(len(predicted_boundaries)),
        "mean_absolute_error_seconds": float(np.mean(errors)),
        "median_absolute_error_seconds": float(np.median(errors)),
        "canonical_boundaries_matched_within_tolerance": int(matches),
        "canonical_boundary_hit_rate": float(matches / len(canonical_boundaries)),
        "nearest_predicted_boundaries": nearest,
        "note": "Diagnostic comparison only; canonical artist-edited structure remains authoritative when supplied.",
    }


def analyze_song_map(
    output_dir: Path,
    *,
    canonical: dict[str, Any] | None,
    structure_result: dict[str, Any] | None,
    vamp_result: dict[str, Any] | None,
    beat_results: list[BeatResult],
    sonic_result: dict[str, Any] | None,
    rhythm_result: dict[str, Any] | None,
    harmony_result: dict[str, Any] | None,
    lyrics_result: dict[str, Any] | None,
    deep_root: Path,
) -> dict[str, Any]:
    """Fuse all evidence into section-level musical summaries on one timeline."""
    output_dir.mkdir(parents=True, exist_ok=True)
    duration = None
    if sonic_result:
        try:
            duration = float(sonic_result.get("duration_seconds"))
        except (TypeError, ValueError):
            pass

    section_source, sections = _choose_sections(canonical, structure_result, vamp_result, duration)

    sonic_curves = None
    sonic_path = deep_root / "sonic" / "curves.npz"
    if sonic_path.exists():
        sonic_curves = np.load(sonic_path)
    rhythm_curves = None
    rhythm_path = deep_root / "rhythm" / "rhythm_curves.npz"
    if rhythm_path.exists():
        rhythm_curves = np.load(rhythm_path)

    beat_grid: list[float] = []
    for preferred in ("consensus", "all_in_one"):
        match = next((r for r in beat_results if r.model == preferred and r.beats), None)
        if match:
            beat_grid = [float(x) for x in match.beats]
            break
    if not beat_grid and beat_results:
        best = max(beat_results, key=lambda r: len(r.beats))
        beat_grid = [float(x) for x in best.beats]

    chords = (harmony_result or {}).get("chords", {}).get("collapsed_progression", [])
    lyric_lines = (lyrics_result or {}).get("lines", [])
    onset_peaks = (
        np.asarray(rhythm_curves["onset_peaks_seconds"], dtype=float)
        if rhythm_curves is not None and "onset_peaks_seconds" in rhythm_curves.files
        else np.asarray([], dtype=float)
    )

    enriched = []
    for section in sections:
        start, end = float(section["start"]), float(section["end"])
        rec: dict[str, Any] = dict(section)
        if sonic_curves is not None:
            t = np.asarray(sonic_curves["time_seconds"], dtype=float)
            rec["sonic"] = {
                "mean_rms_dbfs": _mean_window(t, sonic_curves["rms_dbfs"], start, end),
                "mean_spectral_centroid_hz": _mean_window(t, sonic_curves["spectral_centroid_hz"], start, end),
                "mean_spectral_flatness": _mean_window(t, sonic_curves["spectral_flatness"], start, end),
                "mean_rolloff85_hz": _mean_window(t, sonic_curves["rolloff85_hz"], start, end),
            }
        section_beats = [b for b in beat_grid if start <= b < end]
        section_onsets = onset_peaks[(onset_peaks >= start) & (onset_peaks < end)]
        rec["rhythm"] = {
            "beat_count": len(section_beats),
            "onset_count": int(section_onsets.size),
            "onset_density_per_second": float(section_onsets.size / max(end - start, 1e-9)),
        }
        rec["harmony"] = {
            "chords": [
                {"label": c.get("label"), "start": c.get("start"), "end": c.get("end")}
                for c in chords
                if float(c.get("end", 0)) > start and float(c.get("start", 0)) < end
            ]
        }
        rec["lyrics"] = [
            {"text": line.get("text"), "start": line.get("start"), "end": line.get("end")}
            for line in lyric_lines
            if line.get("start") is not None
            and line.get("end") is not None
            and float(line["end"]) > start
            and float(line["start"]) < end
        ]
        enriched.append(rec)

    comparison = None
    if canonical and canonical.get("sections") and structure_result and structure_result.get("segments"):
        comparison = _boundary_comparison(
            _clean_sections(list(canonical["sections"]), duration),
            _clean_sections(list(structure_result["segments"]), duration),
        )

    result = {
        "section_source": section_source,
        "section_count": len(enriched),
        "sections": enriched,
        "machine_vs_canonical_boundaries": comparison,
        "method_notes": {
            "priority": "Canonical artist-edited sections > All-In-One functional structure > Segmentino > whole track.",
            "fusion": "Section summaries are computed from the exact same timeline as StemLab sonic, rhythm, chord and lyric evidence.",
        },
    }
    write_json(output_dir / "song_map.json", result)
    return result
