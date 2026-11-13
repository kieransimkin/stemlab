"""Benchmark and propose line display timing without moving acoustic word edges."""

from __future__ import annotations

import hashlib
import json
import math
import statistics
from dataclasses import asdict, dataclass
from pathlib import Path

from .cues import parse_lrc
from .word_alignment import TOKEN, normal


@dataclass(frozen=True)
class DisplayPolicy:
    """Opt-in display heuristics, distinct from acoustic onset/release estimates."""

    pickup_threshold: float = .80
    pickup_fraction: float = .85
    max_pickup_shift: float = 1.20
    hold_until_next_within: float = 0

    def __post_init__(self):
        values = asdict(self)
        if not all(math.isfinite(value) and value >= 0 for value in values.values()):
            raise ValueError("Display timing parameters must be finite and nonnegative")
        if self.pickup_fraction > 1 or max(
            self.pickup_threshold, self.max_pickup_shift, self.hold_until_next_within
        ) > 10:
            raise ValueError("Display timing duration parameters are limited to ten seconds and fraction to one")


def propose_display(
    lines: list[dict], duration: float, *, policy: DisplayPolicy = DisplayPolicy(),
) -> list[dict]:
    """Propose display starts and clears for a single ordered lyric track.

    Each line may have an observed first-word start/end and last-word end,
    in source seconds. Missing acoustic edges stay unknown. Clear estimates
    may hold through short gaps or stop at the next known line; these are
    presentation choices and cannot update any word timestamps. By default
    no gap is held; a same-track overlap clears at the next display start.
    """
    if not math.isfinite(duration) or duration <= 0:
        raise ValueError("A finite positive source duration is required")
    result = []
    for i, line in enumerate(lines):
        onset, first_end = line.get("first_word_start"), line.get("first_word_end")
        release = line.get("last_word_end")
        if onset is not None and not (math.isfinite(onset) and 0 <= onset < duration):
            raise ValueError(f"Invalid first-word start for line {i + 1}")
        if first_end is not None and (onset is None or not onset < first_end <= duration):
            raise ValueError(f"Invalid first-word end for line {i + 1}")
        if release is not None and not (0 < release <= duration and (onset is None or onset < release)):
            raise ValueError(f"Invalid last-word end for line {i + 1}")
        shift = 0.0
        if first_end is not None:
            shift = min(
                policy.max_pickup_shift,
                policy.pickup_fraction * max(0, first_end - onset - policy.pickup_threshold),
            )
        start = None if onset is None else onset + shift
        # A suspicious or unrelated later end cannot move the display beyond
        # the line's last observed edge or reverse an existing ordered pair.
        if release is not None and start is not None and start >= release:
            start, shift = onset, 0
        if shift and i + 1 < len(lines):
            next_onset = lines[i + 1].get("first_word_start")
            if next_onset is not None and onset <= next_onset <= start:
                start, shift = onset, 0
        result.append({
            "line": i + 1, "display_start": start, "display_clear": None,
            "first_word_start": onset, "first_word_end": first_end, "last_word_end": release,
            "display_start_method": (
                "unknown" if start is None else "long_first_word_display_adjustment" if shift else "first_word_start"
            ),
            "display_clear_method": "unknown",
        })
    for i, row in enumerate(result):
        end, start = row["last_word_end"], row["display_start"]
        if end is None:
            continue
        # Do not jump across a missing occurrence to the next available line.
        next_start = result[i + 1]["display_start"] if i + 1 < len(result) else None
        clear, method = end, "last_word_end"
        if next_start is not None and (
            next_start < clear or (policy.hold_until_next_within > 0 and next_start - end <= policy.hold_until_next_within)
        ):
            clear = next_start
            method = "display_overlap_clipped_at_next_start" if clear < end else "next_display_start"
        if start is not None and clear <= start:
            method, clear = "unknown_due_to_overlapping_or_reversed_display", None
        row.update(display_clear=clear, display_clear_method=method)
    return result


def score_edges(reference, predicted):
    """Return paired errors and coverage; missing predictions are never exact."""
    if len(reference) != len(predicted):
        raise ValueError("Reference and candidate must share the same occurrence inventory")
    errors = []
    eligible = 0
    for wanted, actual in zip(reference, predicted):
        if wanted is None:
            continue
        if not math.isfinite(wanted) or (actual is not None and not math.isfinite(actual)):
            raise ValueError("Timing scores require finite edges")
        eligible += 1
        if actual is not None:
            errors.append(actual - wanted)
    absolute = sorted(map(abs, errors))
    return {
        "reference_count": eligible,
        "paired": len(errors),
        "coverage": len(errors) / eligible if eligible else None,
        "mean_absolute_error_seconds": statistics.mean(absolute) if absolute else None,
        "median_absolute_error_seconds": statistics.median(absolute) if absolute else None,
        "p90_absolute_error_seconds": absolute[math.ceil(.9 * len(absolute)) - 1] if absolute else None,
        "median_signed_error_seconds": statistics.median(errors) if errors else None,
        "within_100ms": sum(value <= .1 + 1e-9 for value in absolute),
        "within_250ms": sum(value <= .25 + 1e-9 for value in absolute),
        "over_1s": sum(value > 1 for value in absolute),
    }


def read_display_reference(text: str, duration: float) -> list[dict]:
    """Read the authored display edges in LRC occurrence order, with source offsets."""
    document = parse_lrc(text)
    rows = []
    previous = None
    for cue in document.cues:
        time = float(document.effective_time(cue))
        if not 0 <= time <= duration:
            raise ValueError(f"Reference timestamp outside the source on LRC line {cue.line}")
        label = cue.label.strip()
        if label:
            if rows and time < rows[-1]["display_start"]:
                raise ValueError("Reference display starts must be in occurrence order")
            previous = {"text": label, "display_start": time, "display_clear": None, "clear_issue": None}
            rows.append(previous)
        elif previous is not None:
            previous["display_clear"] = time
            previous = None
    for i, row in enumerate(rows):
        clear = row["display_clear"]
        if clear is None:
            continue
        if clear <= row["display_start"]:
            row["clear_issue"] = "nonpositive_display_span"
        elif i + 1 < len(rows) and clear > rows[i + 1]["display_start"]:
            row["clear_issue"] = "clear_after_next_display_start"
    return rows


def _line_observations(source: dict) -> tuple[float, list[dict], list[dict]]:
    if source.get("schema") != "stemlab.canonical-word-reconciliation.v1":
        raise ValueError("Expected a StemLab canonical-word reconciliation")
    duration = float(source["duration"])
    words = {}
    for word in source["words"]:
        words.setdefault(word["line"], []).append(word)
    groups, metadata = [], []

    def observed(word):
        a, b = word.get("start"), word.get("end")
        return word.get("match") == "exact" and a is not None and b is not None and 0 <= a < b <= duration

    for physical, text in enumerate(source["canonical_text"].splitlines(), 1):
        if not text.strip():
            continue
        items = words.pop(physical, [])
        if [normal(word["word"]) for word in items] != [normal(token) for token in TOKEN.findall(text)]:
            raise ValueError(f"Canonical word inventory mismatch on lyric line {physical}")
        first, last = (items[0], items[-1]) if items else ({}, {})
        a, b = (first["start"], first["end"]) if observed(first) else (None, None)
        end = last["end"] if observed(last) else None
        if a is not None and end is not None and end <= a:
            end = None
        groups.append(dict(first_word_start=a, first_word_end=b, last_word_end=end))
        metadata.append(dict(physical_lyric_line=physical, text=text))
    if not groups or words:
        raise ValueError("Expected the words to refer to nonblank canonical lyric lines")
    return duration, groups, metadata


def write_display_report(
    alignment: Path, output: Path, *, reference_lrc: Path | None = None,
    policy: DisplayPolicy = DisplayPolicy(),
) -> dict:
    """Write a new draft. Optionally score it against the same recording's authored LRC."""
    if output.exists() or output.is_symlink():
        raise ValueError("Output already exists; choose a new evidence file")
    raw = alignment.read_bytes()
    source = json.loads(raw.decode("utf-8-sig"))
    duration, groups, metadata = _line_observations(source)
    proposed = propose_display(groups, duration, policy=policy)
    result = {
        "schema": "stemlab.lyric-display-proposals.v1", "duration": duration,
        "input_sha256": hashlib.sha256(raw).hexdigest(), "input_provenance": source.get("provenance"),
        "policy": asdict(policy), "review_status": "draft", "listening_qa": "pending",
        "lines": [{**meta, **edges} for meta, edges in zip(metadata, proposed)],
    }
    if reference_lrc is not None:
        reference_raw = reference_lrc.read_bytes()
        reference = read_display_reference(reference_raw.decode("utf-8-sig"), duration)
        if len(reference) != len(metadata) or any(
            [normal(t) for t in TOKEN.findall(a["text"])] != [normal(t) for t in TOKEN.findall(b["text"])]
            for a, b in zip(reference, metadata)
        ):
            raise ValueError("Reference LRC and reconciliation must have the same lyrics in occurrence order")
        starts = [row["display_start"] for row in reference]
        clears = [row["display_clear"] if row["clear_issue"] is None else None for row in reference]
        result["display_benchmark"] = {
            "reference_sha256": hashlib.sha256(reference_raw).hexdigest(),
            "reference_binding": "caller_supplied_same_recording",
            "reference_lines": reference,
            "unshifted_start": score_edges(starts, [row["first_word_start"] for row in proposed]),
            "proposed_start": score_edges(starts, [row["display_start"] for row in proposed]),
            "proposed_clear": score_edges(clears, [row["display_clear"] for row in proposed]),
        }
    encoded = json.dumps(result, indent=2, ensure_ascii=False, allow_nan=False) + "\n"
    with output.open("x", encoding="utf-8") as stream:
        stream.write(encoded)
    return result
