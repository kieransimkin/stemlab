from __future__ import annotations

import json
import os
import re
import tempfile
from pathlib import Path
from typing import Any

_LRC_TIMESTAMP_RE = re.compile(r"\[(\d{1,3}):(\d{2}(?:\.\d{1,3})?)\]")
_REFERENCE_TEXT_FIELDS = (
    "title",
    "artist",
    "release_date",
    "isrc",
    "upc",
    "website",
    "my_songs_url",
    "epk_url",
    "cover_art_url",
    "source_url",
)


def _parse_lrc(text: str) -> list[dict[str, Any]]:
    cues: list[dict[str, Any]] = []
    for raw_line in str(text).splitlines():
        matches = list(_LRC_TIMESTAMP_RE.finditer(raw_line))
        if not matches:
            continue
        lyric = _LRC_TIMESTAMP_RE.sub("", raw_line).strip()
        for match in matches:
            minutes = int(match.group(1))
            seconds = float(match.group(2))
            cues.append({"time": minutes * 60.0 + seconds, "text": lyric})
    cues.sort(key=lambda item: item["time"])
    events: list[dict[str, Any]] = []
    for index, cue in enumerate(cues):
        lyric = str(cue["text"]).strip()
        if not lyric:
            continue
        start = float(cue["time"])
        end: float | None = None
        for following in cues[index + 1 :]:
            next_time = float(following["time"])
            if next_time > start:
                end = next_time
                break
        events.append({"start": start, "end": end, "text": lyric})
    return _finalize_timing(events)


def _finalize_timing(events: list[dict[str, Any]]) -> list[dict[str, Any]]:
    cleaned: list[dict[str, Any]] = []
    for event in events:
        start = float(event["start"])
        end = event.get("end")
        end = float(end) if end is not None else None
        text = str(event.get("text") or "").strip()
        if start < 0:
            raise ValueError("lyric timing start values must be >= 0")
        if end is not None and end < start:
            raise ValueError("lyric timing end values must be >= start")
        cleaned.append({"start": start, "end": end, "text": text})
    cleaned.sort(key=lambda item: item["start"])
    for index, event in enumerate(cleaned):
        if event["end"] is not None:
            continue
        if index + 1 < len(cleaned) and cleaned[index + 1]["start"] > event["start"]:
            event["end"] = cleaned[index + 1]["start"]
        else:
            event["end"] = event["start"] + 0.75
    return cleaned


def _normalise_timing(value: Any) -> list[dict[str, Any]]:
    if value in (None, "", []):
        return []
    if isinstance(value, str):
        stripped = value.strip()
        if not stripped:
            return []
        if stripped.startswith("[") or stripped.startswith("{"):
            try:
                decoded = json.loads(stripped)
            except json.JSONDecodeError:
                decoded = None
            if decoded is not None:
                value = decoded
            else:
                return _parse_lrc(stripped)
        else:
            return _parse_lrc(stripped)
    if isinstance(value, dict):
        value = value.get("events") or value.get("lyrics") or value.get("timing") or []
    if not isinstance(value, list):
        raise ValueError("lyric_timing must be an array of events, JSON text, or LRC text")
    events: list[dict[str, Any]] = []
    for item in value:
        if not isinstance(item, dict):
            raise ValueError("each lyric timing event must be an object")
        raw_start = item.get("start", item.get("time"))
        if raw_start is None:
            raise ValueError("each lyric timing event requires start or time")
        text = item.get("text", item.get("word", item.get("lyric", "")))
        events.append({"start": float(raw_start), "end": item.get("end"), "text": str(text or "")})
    return _finalize_timing(events)


def _normalise_sections(value: Any) -> list[dict[str, Any]]:
    if value in (None, "", []):
        return []
    if not isinstance(value, list):
        raise ValueError("sections must be an array")
    items: list[dict[str, Any]] = []
    for item in value:
        if not isinstance(item, dict) or item.get("start") is None:
            raise ValueError("each section requires at least start and label")
        start = float(item["start"])
        end = None if item.get("end") in (None, "") else float(item["end"])
        if start < 0 or (end is not None and end < start):
            raise ValueError("section start/end values are invalid")
        items.append({"start": start, "end": end, "label": str(item.get("label") or "section").strip()})
    items.sort(key=lambda x: x["start"])
    for i, item in enumerate(items):
        if item["end"] is None and i + 1 < len(items):
            item["end"] = items[i + 1]["start"]
    return items


def normalise_canonical_metadata(payload: Any) -> dict[str, Any]:
    if not isinstance(payload, dict):
        raise ValueError("canonical metadata must be a JSON object")
    raw_bpm = payload.get("bpm")
    if raw_bpm in (None, ""):
        bpm = None
    else:
        bpm = float(raw_bpm)
        if not 1.0 <= bpm <= 400.0:
            raise ValueError("canonical BPM must be between 1 and 400")
    raw_lyrics = payload.get("lyrics")
    result: dict[str, Any] = {
        "bpm": bpm,
        "lyrics": None if raw_lyrics in (None, "") else str(raw_lyrics).strip(),
        "lyric_timing": _normalise_timing(payload.get("lyric_timing")),
        "sections": _normalise_sections(payload.get("sections")),
    }
    for field in _REFERENCE_TEXT_FIELDS:
        raw = payload.get(field)
        result[field] = None if raw in (None, "") else str(raw).strip()
    return result


def canonical_path(workdir: Path) -> Path:
    return Path(workdir) / "canonical.json"


def empty_canonical() -> dict[str, Any]:
    return normalise_canonical_metadata({})


def load_canonical(workdir: Path) -> dict[str, Any]:
    path = canonical_path(workdir)
    try:
        value = json.loads(path.read_text(encoding="utf-8"))
    except (FileNotFoundError, OSError, json.JSONDecodeError):
        return empty_canonical()
    try:
        return normalise_canonical_metadata(value)
    except (TypeError, ValueError):
        return empty_canonical()


def save_canonical(workdir: Path, payload: Any) -> dict[str, Any]:
    workdir = Path(workdir)
    workdir.mkdir(parents=True, exist_ok=True)
    value = normalise_canonical_metadata(payload)
    target = canonical_path(workdir)
    fd, tmp_name = tempfile.mkstemp(prefix=".canonical.", suffix=".tmp", dir=str(workdir), text=True)
    tmp = Path(tmp_name)
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as handle:
            json.dump(value, handle, indent=2, sort_keys=True)
            handle.write("\n")
        os.replace(tmp, target)
    finally:
        tmp.unlink(missing_ok=True)
    return value
