from __future__ import annotations

import math
import re
from collections import Counter
from pathlib import Path
from typing import Any

import numpy as np

from stemlab.types import BeatResult
from stemlab.util import write_json

PITCHES_C = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"]
PITCH_TO_PC = {name: i for i, name in enumerate(PITCHES_C)}
PITCH_TO_PC.update({"Db": 1, "D#": 3, "Gb": 6, "G#": 8, "A#": 10})

# Krumhansl-Schmuckler profiles, C-rooted.
MAJOR_PROFILE = np.asarray([6.35, 2.23, 3.48, 2.33, 4.38, 4.09, 2.52, 5.19, 2.39, 3.66, 2.29, 2.88], dtype=float)
MINOR_PROFILE = np.asarray([6.33, 2.68, 3.52, 5.38, 2.60, 3.53, 2.54, 4.75, 3.98, 2.69, 3.34, 3.17], dtype=float)


def _find_analysis(vamp_result: dict[str, Any] | None, slug: str) -> dict[str, Any] | None:
    if not vamp_result:
        return None
    for item in vamp_result.get("analyses", []):
        if item.get("slug") == slug:
            return item
    return None


def _normalise_chord(label: str) -> str:
    label = (label or "").strip()
    if not label:
        return "N"
    if label.lower() in {"n", "no chord", "none"}:
        return "N"
    return re.sub(r"\s+", "", label)


def _chord_root(label: str) -> str | None:
    m = re.match(r"^([A-Ga-g])([#b]?)", label)
    if not m:
        return None
    return m.group(1).upper() + m.group(2)


def _chord_quality(label: str) -> str:
    lower = label.lower()
    tail = lower[len(_chord_root(label) or "") :]
    if "dim" in tail or "°" in tail:
        return "diminished"
    if "aug" in tail or "+" in tail:
        return "augmented"
    if "sus" in tail:
        return "suspended"
    if ":min" in tail or tail.startswith("m") and not tail.startswith("maj"):
        return "minor"
    if ":maj" in tail or "maj" in tail:
        return "major"
    return "major"


def _parse_key(label: Any) -> tuple[int, str] | None:
    if label is None:
        return None
    text = str(label).strip().replace(":", " ")
    match = re.match(r"^([A-Ga-g])([#b]?)(?:\s+)?(major|minor|maj|min|m)?", text, re.I)
    if not match:
        return None
    root_name = match.group(1).upper() + match.group(2)
    pc = PITCH_TO_PC.get(root_name)
    if pc is None:
        return None
    mode_raw = (match.group(3) or "major").lower()
    mode = "minor" if mode_raw in {"minor", "min", "m"} else "major"
    return pc, mode


def _degree_name(interval: int, quality: str) -> str:
    # Chromatic scale-degree spelling optimized for readable MIR summaries.
    degree = {
        0: "I", 1: "bII", 2: "II", 3: "bIII", 4: "III", 5: "IV",
        6: "#IV", 7: "V", 8: "bVI", 9: "VI", 10: "bVII", 11: "VII",
    }[interval % 12]
    if quality == "minor":
        return degree.lower()
    if quality == "diminished":
        return degree.lower() + "°"
    if quality == "augmented":
        return degree + "+"
    if quality == "suspended":
        return degree + "sus"
    return degree


def _functional_harmony(chords: list[dict[str, Any]], key_label: Any) -> dict[str, Any] | None:
    parsed = _parse_key(key_label)
    if not parsed:
        return None
    tonic, mode = parsed
    diatonic_intervals = {0, 2, 4, 5, 7, 9, 11} if mode == "major" else {0, 2, 3, 5, 7, 8, 10}
    progression = []
    duration_by_degree: Counter[str] = Counter()
    roots: list[int] = []
    for chord in chords:
        root_name = _chord_root(chord["label"])
        root = PITCH_TO_PC.get(root_name) if root_name else None
        if root is None:
            progression.append({**chord, "degree": None, "diatonic_root": None})
            continue
        interval = (root - tonic) % 12
        quality = _chord_quality(chord["label"])
        degree = _degree_name(interval, quality)
        duration_by_degree[degree] += float(chord.get("duration") or 0.0)
        roots.append(root)
        progression.append(
            {
                **chord,
                "root": root_name,
                "quality": quality,
                "degree": degree,
                "diatonic_root": interval in diatonic_intervals,
            }
        )

    motions = Counter()
    for a, b in zip(roots, roots[1:]):
        motions[(b - a) % 12] += 1
    motion_names = {
        0: "same root", 1: "up semitone", 2: "up whole tone", 3: "up minor third",
        4: "up major third", 5: "up fourth / down fifth", 6: "tritone",
        7: "up fifth / down fourth", 8: "down major third", 9: "down minor third",
        10: "down whole tone", 11: "down semitone",
    }

    cadences = []
    for prev, cur in zip(progression, progression[1:]):
        a, b = prev.get("degree"), cur.get("degree")
        if not a or not b:
            continue
        a_base = a.replace("°", "").replace("+", "").replace("sus", "").upper()
        b_base = b.replace("°", "").replace("+", "").replace("sus", "").upper()
        kind = None
        if a_base == "V" and b_base == "I":
            kind = "dominant-tonic"
        elif a_base == "IV" and b_base == "I":
            kind = "plagal"
        elif a_base == "II" and b_base == "V":
            kind = "predominant-dominant"
        elif a_base == "BVII" and b_base == "I":
            kind = "backdoor/modal bVII-I"
        if kind:
            cadences.append(
                {
                    "type": kind,
                    "from": prev["label"],
                    "to": cur["label"],
                    "time_seconds": float(cur["start"]),
                }
            )

    total = sum(float(x.get("duration") or 0.0) for x in progression)
    tonic_duration = sum(float(x.get("duration") or 0.0) for x in progression if (x.get("root") and PITCH_TO_PC.get(x["root"]) == tonic))
    dominant_pc = (tonic + 7) % 12
    dominant_duration = sum(float(x.get("duration") or 0.0) for x in progression if (x.get("root") and PITCH_TO_PC.get(x["root"]) == dominant_pc))
    valid = [x for x in progression if x.get("diatonic_root") is not None]
    chromatic = [x for x in valid if not x["diatonic_root"]]
    return {
        "key_basis": str(key_label),
        "mode": mode,
        "progression": progression,
        "diatonic_root_share": float((len(valid) - len(chromatic)) / len(valid)) if valid else None,
        "chromatic_root_events": len(chromatic),
        "tonic_duration_share": float(tonic_duration / total) if total else None,
        "dominant_duration_share": float(dominant_duration / total) if total else None,
        "degree_duration_histogram": [
            {"degree": degree, "seconds": float(seconds)}
            for degree, seconds in duration_by_degree.most_common()
        ],
        "root_motion": [
            {"semitones_up_mod12": int(interval), "name": motion_names[interval], "count": int(count)}
            for interval, count in motions.most_common()
        ],
        "cadence_candidates": cadences,
    }


def _duration(event: dict[str, Any]) -> float:
    start = float(event.get("start") or 0.0)
    end = event.get("end")
    if end is None:
        return 0.0
    return max(0.0, float(end) - start)


def _collapse_progression(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    out: list[dict[str, Any]] = []
    for event in events:
        label = _normalise_chord(str(event.get("label") or ""))
        start = float(event.get("start") or 0.0)
        end = float(event.get("end") or start)
        if out and out[-1]["label"] == label and abs(out[-1]["end"] - start) < 0.25:
            out[-1]["end"] = end
            out[-1]["duration"] = out[-1]["end"] - out[-1]["start"]
        else:
            out.append({"label": label, "start": start, "end": end, "duration": max(0.0, end - start)})
    return out


def _ngram_counts(labels: list[str], n: int) -> list[dict[str, Any]]:
    if len(labels) < n:
        return []
    counts = Counter(tuple(labels[i : i + n]) for i in range(len(labels) - n + 1))
    return [
        {"progression": list(items), "count": int(count)}
        for items, count in counts.most_common(12)
    ]


def _beats_per_chord(chords: list[dict[str, Any]], beat_results: list[BeatResult]) -> float | None:
    grid = next((x for x in beat_results if x.model == "consensus"), None)
    if grid is None and beat_results:
        grid = max(beat_results, key=lambda x: len(x.beats))
    if not grid or len(grid.beats) < 4 or not chords:
        return None
    b = np.asarray(grid.beats, dtype=float)
    counts = []
    for chord in chords:
        if chord["label"] == "N":
            continue
        c = int(np.sum((b >= chord["start"]) & (b < chord["end"])))
        if c > 0:
            counts.append(c)
    return float(np.median(counts)) if counts else None


def _chroma_matrix(vamp_result: dict[str, Any] | None) -> np.ndarray | None:
    analysis = _find_analysis(vamp_result, "nnls_chroma")
    if not analysis:
        return None
    rows = []
    for event in analysis.get("events", []):
        vals = [float(v) for v in event.get("values", [])]
        if len(vals) >= 12:
            rows.append(vals[:12])
    if not rows:
        return None
    matrix_a = np.asarray(rows, dtype=float)
    # NNLS Chroma's bins are A, Bb, B, C, C#, D, Eb, E, F, F#, G, Ab.
    # Rotate to C, C#, D, Eb, E, F, F#, G, Ab, A, Bb, B.
    order = [3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2]
    return matrix_a[:, order]


def _key_candidates(chroma: np.ndarray | None) -> list[dict[str, Any]]:
    if chroma is None or chroma.size == 0:
        return []
    profile = np.nanmean(chroma, axis=0)
    if not np.any(np.isfinite(profile)) or np.nansum(profile) <= 0:
        return []
    profile = np.nan_to_num(profile, nan=0.0)
    scores: list[tuple[float, str]] = []
    for root in range(12):
        for mode, template in (("major", MAJOR_PROFILE), ("minor", MINOR_PROFILE)):
            rolled = np.roll(template, root)
            if np.std(profile) == 0 or np.std(rolled) == 0:
                corr = 0.0
            else:
                corr = float(np.corrcoef(profile, rolled)[0, 1])
            scores.append((corr, f"{PITCHES_C[root]} {mode}"))
    scores.sort(reverse=True)
    return [{"key": label, "correlation": score} for score, label in scores[:6]]


def _pitch_class_entropy(chroma: np.ndarray | None) -> float | None:
    if chroma is None or chroma.size == 0:
        return None
    p = np.nansum(np.maximum(chroma, 0.0), axis=0)
    total = float(np.sum(p))
    if total <= 0:
        return None
    p = p / total
    p = p[p > 0]
    return float(-np.sum(p * np.log2(p)) / math.log2(12.0))


def analyze_harmony(
    vamp_result: dict[str, Any] | None,
    beat_results: list[BeatResult],
    output_dir: Path,
) -> dict[str, Any]:
    """Fuse Chordino/NNLS/QM evidence into a higher-level harmonic summary."""
    output_dir.mkdir(parents=True, exist_ok=True)

    chord_analysis = _find_analysis(vamp_result, "chords")
    chord_events = list(chord_analysis.get("events", [])) if chord_analysis else []
    chords = _collapse_progression(chord_events)
    labels = [item["label"] for item in chords if item["label"] != "N"]

    by_duration: Counter[str] = Counter()
    for item in chords:
        by_duration[item["label"]] += float(item["duration"])

    total_duration = sum(by_duration.values())
    chord_hist = [
        {
            "chord": label,
            "seconds": float(seconds),
            "share": float(seconds / total_duration) if total_duration > 0 else 0.0,
        }
        for label, seconds in by_duration.most_common()
    ]

    transitions = Counter(zip(labels, labels[1:]))
    top_transitions = [
        {"from": a, "to": b, "count": int(count)}
        for (a, b), count in transitions.most_common(16)
    ]

    chroma = _chroma_matrix(vamp_result)
    key_analysis = _find_analysis(vamp_result, "key")
    vamp_key = None
    if key_analysis and key_analysis.get("events"):
        first = key_analysis["events"][0]
        vamp_key = first.get("label") or (first.get("values") or [None])[0]

    tuning_analysis = _find_analysis(vamp_result, "tuning")
    tuning_hz = None
    if tuning_analysis and tuning_analysis.get("events"):
        vals = tuning_analysis["events"][0].get("values") or []
        if vals:
            tuning_hz = float(vals[0])

    tonal_changes = _find_analysis(vamp_result, "tonal_changes")
    change_times = [
        float(event.get("start") or 0.0)
        for event in (tonal_changes.get("events", []) if tonal_changes else [])
    ]

    key_candidates = _key_candidates(chroma)
    key_basis = vamp_key or (key_candidates[0]["key"] if key_candidates else None)
    functional = _functional_harmony(chords, key_basis)

    result = {
        "source": "StemLab Vamp evidence fusion",
        "vamp_key": vamp_key,
        "independent_key_candidates_from_nnls_chroma": key_candidates,
        "functional_harmony": functional,
        "tuning_hz": tuning_hz,
        "pitch_class_entropy_normalized": _pitch_class_entropy(chroma),
        "tonal_change_times_seconds": change_times,
        "chords": {
            "event_count": len(chords),
            "unique_count": len(set(labels)),
            "changes_per_minute": (
                float(60.0 * max(0, len(chords) - 1) / max(1e-9, chords[-1]["end"] - chords[0]["start"]))
                if len(chords) >= 2
                else None
            ),
            "median_beats_per_chord": _beats_per_chord(chords, beat_results),
            "duration_histogram": chord_hist,
            "top_transitions": top_transitions,
            "top_bigrams": _ngram_counts(labels, 2),
            "top_trigrams": _ngram_counts(labels, 3),
            "collapsed_progression": chords,
        },
        "method_notes": {
            "key_fusion": "Reports the QM Vamp key independently from a Krumhansl-Schmuckler correlation over mean NNLS chroma; disagreement is retained rather than hidden.",
            "harmonic_rhythm": "Median number of consensus/detected beats falling inside non-N chord segments.",
            "functional_harmony": "Scale-degree, chromatic-root, root-motion and cadence summaries are deterministic derivations relative to the reported key basis, not separate learned labels.",
        },
    }
    write_json(output_dir / "harmony.json", result)
    return result
