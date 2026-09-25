from __future__ import annotations

import csv
from pathlib import Path
from typing import Any

from stemlab.types import StemArtifact
from stemlab.util import slugify, write_json

PREFERRED_STEMS = ("piano", "guitar", "bass", "vocals", "vocal", "other")


def _select_stems(stems: list[StemArtifact], max_stems: int = 4) -> list[StemArtifact]:
    # Prefer the six-stem BS-RoFormer output because Basic Pitch performs best
    # on isolated single-instrument audio. Fall back to unique stem names from
    # whatever separator succeeded.
    preferred = [s for s in stems if s.model == "bs_roformer_sw" and s.stem.lower() in PREFERRED_STEMS]
    if preferred:
        rank = {name: i for i, name in enumerate(PREFERRED_STEMS)}
        preferred.sort(key=lambda s: rank.get(s.stem.lower(), 99))
        return preferred[:max_stems]

    out: list[StemArtifact] = []
    seen = set()
    for stem in stems:
        name = stem.stem.lower()
        if name in PREFERRED_STEMS and name not in seen:
            out.append(stem)
            seen.add(name)
        if len(out) >= max_stems:
            break
    return out


def analyze_basic_pitch(
    stems: list[StemArtifact],
    output_dir: Path,
    *,
    max_stems: int = 4,
) -> dict[str, Any]:
    """Neural polyphonic note transcription for separated instrument stems.

    This complements Silvet/pYIN rather than replacing them. Basic Pitch is
    strongest on one instrument at a time, so StemLab deliberately targets
    separated stems instead of the dense master mix.
    """
    from basic_pitch import ICASSP_2022_MODEL_PATH
    from basic_pitch.inference import Model, predict

    output_dir.mkdir(parents=True, exist_ok=True)
    selected = _select_stems(stems, max_stems=max_stems)
    if not selected:
        raise RuntimeError("No suitable separated stems available for Basic Pitch")

    model = Model(ICASSP_2022_MODEL_PATH)
    analyses = []
    for stem in selected:
        model_output, midi_data, note_events = predict(stem.path, model)
        slug = f"{slugify(stem.model)}-{slugify(stem.stem)}"
        midi_path = output_dir / f"{slug}.mid"
        csv_path = output_dir / f"{slug}.csv"
        json_path = output_dir / f"{slug}.json"
        midi_data.write(str(midi_path))
        serialised = []
        with csv_path.open("w", newline="", encoding="utf-8") as handle:
            writer = csv.writer(handle)
            writer.writerow(["start_seconds", "end_seconds", "midi_pitch", "amplitude", "pitch_bends"])
            for start, end, pitch, amplitude, bends in note_events:
                item = {
                    "start": float(start),
                    "end": float(end),
                    "midi_pitch": int(pitch),
                    "amplitude": float(amplitude),
                    "pitch_bends": [int(v) for v in bends] if bends else [],
                }
                serialised.append(item)
                writer.writerow([item["start"], item["end"], item["midi_pitch"], item["amplitude"], item["pitch_bends"]])
        record = {
            "model": "Spotify Basic Pitch",
            "source_model": stem.model,
            "source_stem": stem.stem,
            "source_audio": str(stem.path),
            "note_count": len(serialised),
            "notes": serialised,
            "files": {"midi": str(midi_path), "csv": str(csv_path)},
        }
        write_json(json_path, record)
        analyses.append(record)

    report = {
        "model": "Spotify Basic Pitch",
        "upstream": "https://github.com/spotify/basic-pitch",
        "licence": "Apache-2.0",
        "analyses": analyses,
        "method_notes": "Applied to separated stems because upstream states the model works best on one instrument at a time.",
    }
    write_json(output_dir / "report.json", report)
    return report
