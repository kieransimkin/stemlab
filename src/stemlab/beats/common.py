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
