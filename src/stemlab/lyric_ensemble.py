"""Build a source-bound ensemble draft from saved lyric boundary observations."""

from __future__ import annotations

import hashlib
import json
from pathlib import Path

from .lyric_boundaries import BoundaryObservation, CropBoundary, compare_crop_boundaries, select_boundaries
from .util import sha256_file
from .word_alignment import TOKEN, normal


def _observation(row: dict, edge: str, sample_rate: int, frames: int):
    for field in ("source", "family"):
        if not isinstance(row[field], str) or not row[field].strip():
            raise ValueError(f"A nonempty {field} is required for every edge")
    check = None
    if "crop_repeat" in row:
        crop = row["crop_repeat"]
        first = CropBoundary(row["frame"], *crop["original_crop_frames"])
        second = CropBoundary(crop["frame"], *crop["repeat_crop_frames"])
        if any(obs.crop_end > frames for obs in (first, second)):
            raise ValueError("Decoded crop lies outside the verified source clock")
        check = compare_crop_boundaries(first, second, edge=edge, sample_rate=sample_rate)
    return BoundaryObservation(row["source"], row["family"], row["frame"], row["strength"],
                               check["review_reasons"] if check else ()), check


def write_ensemble_report(
    request: Path, master: Path, output: Path, *, min_word_seconds: float = 0,
) -> dict:
    """Compare saved same-clock evidence and write a new diagnostic JSON file."""
    import soundfile as sf

    if output.exists() or output.is_symlink():
        raise ValueError("Output already exists; choose a new evidence file")
    if request.stat().st_size > 64 * 1024 * 1024:
        raise ValueError("Lyric boundary requests are limited to 64 MiB")
    raw = request.read_bytes()
    document = json.loads(raw.decode("utf-8-sig"))
    if document.get("schema") != "stemlab.lyric-boundary-request.v1":
        raise ValueError("Expected a StemLab lyric boundary request")
    info = sf.info(master)
    master_sha256 = sha256_file(master)
    if (document["source_sha256"], document["sample_rate"], document["num_frames"]) != (
        master_sha256, info.samplerate, info.frames,
    ):
        raise ValueError("Request does not identify the supplied master and its native clock")
    lyrics = document["canonical_text"]
    inventory = [(number, token) for number, text in enumerate(lyrics.splitlines(), 1) for token in TOKEN.findall(text)]
    words = document["words"]
    if len(words) > 10_000 or any(len(row[edge]) > 16 for row in words for edge in ("onset", "release")):
        raise ValueError("At most 10,000 words and 16 observations per edge are supported")
    families = {}
    for row in words:
        for edge in ("onset", "release"):
            for observation in row[edge]:
                label = observation["source"]
                if families.setdefault(label, observation["family"]) != observation["family"]:
                    raise ValueError("Each source label must have one consistent model family")
    if not inventory or [(row["line"], normal(row["word"])) for row in words] != [
        (line, normal(token)) for line, token in inventory
    ]:
        raise ValueError("Evidence must match every canonical word in occurrence order")
    pairs = []
    diagnostics = []
    for row in words:
        pair, checks = [], []
        for edge in ("onset", "release"):
            observations = []
            for item in row[edge]:
                observation, check = _observation(item, edge, info.samplerate, info.frames)
                observations.append(observation)
                if check is not None:
                    checks.append({"edge": edge, "source": observation.source, "frame": observation.frame,
                                   "repeat": item["crop_repeat"], **check})
            pair.append(observations)
        pairs.append(tuple(pair))
        diagnostics.append(checks)
    chosen = select_boundaries(pairs, sample_rate=info.samplerate, num_frames=info.frames,
                               min_word_seconds=min_word_seconds)
    result = {
        "schema": "stemlab.lyric-ensemble-draft.v1", "source_sha256": master_sha256,
        "sample_rate": info.samplerate, "num_frames": info.frames, "duration": info.duration,
        "provenance": {"master_sha256": master_sha256, "observation_clock": "caller_mapped_to_master_frames"},
        "request_sha256": hashlib.sha256(raw).hexdigest(), "canonical_text": lyrics,
        "review_status": "draft", "listening_qa": "pending", "minimum_word_seconds": min_word_seconds,
        "words": [{"line": line, "word": token, "crop_checks": checks, **selected}
                  for (line, token), checks, selected in zip(inventory, diagnostics, chosen)],
    }
    payload = json.dumps(result, ensure_ascii=False, indent=2, allow_nan=False) + "\n"
    with output.open("x", encoding="utf-8") as stream:
        stream.write(payload)
    return result
