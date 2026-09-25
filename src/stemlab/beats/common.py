from __future__ import annotations

import csv
from pathlib import Path

import numpy as np

from stemlab.types import BeatResult
from stemlab.util import write_json


def tempo_from_beats(beats: list[float]) -> float | None:
    if len(beats) < 2:
        return None
    d = np.diff(np.asarray(beats, dtype=float))
    d = d[(d > 0.18) & (d < 2.5)]
    if len(d) == 0:
        return None
    return float(60.0 / np.median(d))


def _cluster_events(results: list[BeatResult], attr: str, tolerance: float) -> list[dict]:
    events: list[tuple[float, str]] = []
    for result in results:
        events.extend((float(t), result.model) for t in getattr(result, attr))
    events.sort(key=lambda item: item[0])
    if not events:
        return []

    clusters: list[list[tuple[float, str]]] = []
    current: list[tuple[float, str]] = []
    for event in events:
        if not current:
            current = [event]
            continue
        centre = float(np.median([t for t, _ in current]))
        if abs(event[0] - centre) <= tolerance:
            current.append(event)
        else:
            clusters.append(current)
            current = [event]
    if current:
        clusters.append(current)

    required = len(results) // 2 + 1
    consensus: list[dict] = []
    for cluster in clusters:
        raw_centre = float(np.median([t for t, _ in cluster]))
        # At most one vote per detector.  If one detector somehow contributes
        # two events inside the tolerance window, keep the one closest to the
        # cluster centre instead of letting it count twice.
        by_model: dict[str, float] = {}
        for t, model in cluster:
            previous = by_model.get(model)
            if previous is None or abs(t - raw_centre) < abs(previous - raw_centre):
                by_model[model] = t
        if len(by_model) < required:
            continue
        times = list(by_model.values())
        consensus.append(
            {
                "time": float(np.median(times)),
                "support": len(by_model),
                "models": sorted(by_model),
            }
        )
    return consensus


def consensus_result(results: list[BeatResult], *, tolerance: float = 0.08) -> BeatResult | None:
    """Build a majority-vote beat/downbeat estimate from successful detectors.

    Events within ``tolerance`` seconds are clustered and each detector gets at
    most one vote in a cluster.  A cluster must be supported by a strict
    majority of the available detectors.  The chosen event time is the median
    of the supporting detector times, which is robust to one slightly early or
    late detector.
    """
    source_results = [r for r in results if r.model != "consensus"]
    if not source_results:
        return None

    beat_events = _cluster_events(source_results, "beats", tolerance)
    downbeat_events = _cluster_events(source_results, "downbeats", tolerance)
    beats = [event["time"] for event in beat_events]
    downbeats = [event["time"] for event in downbeat_events]
    required = len(source_results) // 2 + 1
    return BeatResult(
        "consensus",
        beats,
        downbeats,
        tempo_from_beats(beats),
        {
            "method": "majority-vote median event clustering",
            "tolerance_seconds": float(tolerance),
            "sources": [r.model for r in source_results],
            "required_support": required,
            "beat_support": beat_events,
            "downbeat_support": downbeat_events,
        },
    )


def save_result(result: BeatResult, output_dir: Path) -> BeatResult:
    output_dir.mkdir(parents=True, exist_ok=True)
    write_json(
        output_dir / f"{result.model}.json",
        {
            "model": result.model,
            "beats": result.beats,
            "downbeats": result.downbeats,
            "tempo_bpm": result.tempo_bpm,
            "metadata": result.metadata,
        },
    )
    with (output_dir / f"{result.model}.tsv").open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f, delimiter="\t")
        w.writerow(["time_seconds", "type"])
        down = np.asarray(result.downbeats, dtype=float)
        for t in result.beats:
            is_down = len(down) and float(np.min(np.abs(down - t))) < 0.03
            w.writerow([f"{t:.9f}", "downbeat" if is_down else "beat"])
    return result
