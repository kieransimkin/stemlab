"""Compare observed onset and release edges without inventing lyric timestamps."""

from __future__ import annotations

from bisect import bisect_right
from dataclasses import asdict, dataclass
import math


@dataclass(frozen=True)
class BoundaryObservation:
    """One source-bound edge. Strength is an evidence weight, not a probability."""

    source: str
    family: str
    frame: int
    strength: float


def _rank(observations, tolerance, min_strength):
    ranked = []
    for obs in observations:
        family_best = {}
        for other in observations:
            if other.family == obs.family or min(obs.strength, other.strength) < min_strength:
                continue
            distance = abs(other.frame - obs.frame)
            if distance <= tolerance:
                weight = other.strength * (1 - .5 * distance / tolerance)
                family_best[other.family] = max(weight, family_best.get(other.family, 0))
        # Near-duplicate runs of the same detector cannot vote for each other.
        score = obs.strength + .85 * sum(sorted(family_best.values(), reverse=True)[:2])
        ranked.append((obs, score, sorted(family_best)))
    return sorted(ranked, key=lambda o: (-o[1], -o[0].strength, o[0].frame, o[0].source))


def _observed_spans(starts, ends, min_strength, min_frames, max_frames):
    """Use only one identifiable complete interval per original observation."""
    by_source = {}
    for edge, observations in enumerate((starts, ends)):
        for obs in observations:
            if obs.strength >= min_strength:
                by_source.setdefault((obs.source, obs.family), ([], []))[edge].append(obs)
    return [
        (left[0], right[0]) for left, right in by_source.values()
        if len(left) == len(right) == 1 and min_frames <= right[0].frame - left[0].frame <= max_frames
    ]


def _span_support(onset, release, spans, onset_tolerance, release_tolerance):
    """Support the pair with an observed interval close to both edges."""
    best = {}
    for start, end in spans:
        da, db = abs(start.frame - onset.frame), abs(end.frame - release.frame)
        if da > onset_tolerance or db > release_tolerance:
            continue
        length_ratio = (release.frame - onset.frame) / (end.frame - start.frame)
        # Edge tolerances alone are permissive for short words: two close
        # endpoints can still represent very different sung durations.
        if not .55 <= length_ratio <= 1 / .55:
            continue
        proximity = 1 - .25 * (da / onset_tolerance + db / release_tolerance)
        weight = min(start.strength, end.strength) * proximity
        best[start.family] = max(best.get(start.family, 0), weight)
    return best


def select_boundaries(
    words: list[tuple[list[BoundaryObservation], list[BoundaryObservation]]],
    *,
    num_frames: int,
    sample_rate: int,
    onset_tolerance_seconds: float = .12,
    release_tolerance_seconds: float = .20,
    min_word_seconds: float = 0,
    max_word_seconds: float = 4,
    corroboration_min_strength: float = .4,
    interval_weight: float = .65,
) -> list[dict]:
    """Find a nonoverlapping draft path through observed word-edge pairs.

    A word with no compatible start/end pair stays untimed. Within that limit
    the path first maximizes coverage, then corroboration. Do not feed in
    unsupported guesses, unmapped audio views or unrelated vocal parts.
    Different edges may come from different sources; both retain provenance.
    Only sufficient-strength observations corroborate another model's edge.
    Observed complete intervals favour pairs that preserve the sung span.
    """
    if type(num_frames) is not int or num_frames <= 0 or type(sample_rate) is not int or sample_rate <= 0:
        raise ValueError("A positive integer source sample rate and frame count are required")
    seconds = (onset_tolerance_seconds, release_tolerance_seconds, max_word_seconds)
    if not all(math.isfinite(x) and 0 < x <= 10 for x in seconds):
        raise ValueError("Timing tolerances and maximum word duration must be between 0 and 10 seconds")
    if not math.isfinite(min_word_seconds) or not 0 <= min_word_seconds <= max_word_seconds:
        raise ValueError("Minimum word duration must be between zero and the maximum")
    if not math.isfinite(corroboration_min_strength) or not 0 <= corroboration_min_strength <= 1:
        raise ValueError("Corroboration minimum strength must be between 0 and 1")
    if not math.isfinite(interval_weight) or not 0 <= interval_weight <= 2:
        raise ValueError("Interval weight must be between 0 and 2")
    min_frames = max(1, math.ceil(min_word_seconds * sample_rate))
    onset_tolerance, release_tolerance, max_frames = (max(1, round(x * sample_rate)) for x in seconds)
    if len(words) > 10000 or any(len(a) > 16 or len(b) > 16 for a, b in words):
        raise ValueError("At most 10,000 words and 16 observations per edge are supported")

    def valid(obs, *, start):
        return (
            isinstance(obs, BoundaryObservation) and bool(obs.source) and bool(obs.family)
            and type(obs.frame) is int and 0 <= obs.frame <= num_frames
            and (obs.frame < num_frames if start else obs.frame > 0)
            and math.isfinite(obs.strength) and 0 < obs.strength <= 1
        )

    def render(row, ranked, tolerance):
        obs, score, groups = row
        return {
            **asdict(obs), "score": round(score, 6), "corroborating_families": groups,
            "competing_families": sorted({
                candidate.family for candidate, _, _ in ranked
                if candidate.family != obs.family and candidate.strength >= .5
                and abs(candidate.frame - obs.frame) > tolerance
            }),
        }

    # Frontier stores nondominated paths, keyed by last selected release frame.
    # A path with an earlier release and a better score can replace a later one.
    # Back pointers share prefixes; an untimed word leaves the frontier intact.
    frontier = [(0, (0, 0.0), None)]
    evidence = []
    for index, (starts, ends) in enumerate(words):
        if any(not valid(obs, start=True) for obs in starts) or any(not valid(obs, start=False) for obs in ends):
            raise ValueError(f"Invalid source-bound observation for word {index + 1}")
        a = _rank(starts, onset_tolerance, corroboration_min_strength)
        b = _rank(ends, release_tolerance, corroboration_min_strength)
        evidence.append({
            "onset_candidates": [render(x, a, onset_tolerance) for x in a],
            "release_candidates": [render(y, b, release_tolerance) for y in b],
        })
        if not a or not b:
            continue
        spans = _observed_spans(starts, ends, corroboration_min_strength, min_frames, max_frames)
        evidence[-1]["observed_intervals"] = [
            {"source": start.source, "family": start.family, "start_frame": start.frame, "end_frame": end.frame}
            for start, end in spans
        ]
        additions = []
        frontier_frames = [x[0] for x in frontier]
        for ia, (x, xs, _) in enumerate(a):
            _, (count, score), link = frontier[bisect_right(frontier_frames, x.frame) - 1]
            for ib, (y, ys, _) in enumerate(b):
                span = y.frame - x.frame
                if min_frames <= span <= max_frames:
                    support = _span_support(x, y, spans, onset_tolerance, release_tolerance)
                    interval_score = interval_weight * max(support.values(), default=0)
                    # Prefer one source for ties; no boundary is moved.
                    q = xs + ys + interval_score + (.06 if x.source == y.source else 0)
                    additions.append((y.frame, (count + 1, score + q), (index, ia, ib, sorted(support), link)))
        merged = sorted(frontier + additions, key=lambda row: row[0])
        frontier = []
        best = (-1, 0.0)
        for row in merged:
            if row[1] > best:
                if frontier and frontier[-1][0] == row[0]:
                    frontier[-1] = row
                else:
                    frontier.append(row)
                best = row[1]

    selected = {}
    link = frontier[-1][2]
    while link is not None:
        index, ia, ib, support, link = link
        selected[index] = ia, ib, support
    for index, row in enumerate(evidence):
        if index not in selected:
            row.update(onset=None, release=None, review_reasons=["no_compatible_observed_interval"])
            continue
        ia, ib, support = selected[index]
        onset, release = row["onset_candidates"][ia], row["release_candidates"][ib]
        reasons = []
        for key, edge in (("onset", onset), ("release", release)):
            if not edge["corroborating_families"]:
                reasons.append(f"{key}_single_family")
            if edge["competing_families"]:
                reasons.append(f"{key}_disagreement")
            if edge["strength"] < .4:
                reasons.append(f"{key}_weak_evidence")
        if not support:
            reasons.append("no_strong_matching_complete_interval")
        row.update(onset=onset, release=release, interval_supporting_families=support, review_reasons=reasons)
    return evidence
