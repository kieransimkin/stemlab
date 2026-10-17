"""Separate, verified editor document for musical lines, words, cue sections and clocks.

The raw consensus, canonical metadata, ASR evidence, audio and original cue files
are never rewritten. Frames, not rounded millisecond timestamps, are authoritative.
"""

from __future__ import annotations

import csv
import hashlib
import io
import json
import math
import os
import re
import tempfile
import threading
from pathlib import Path
from typing import Any

from .beat_map import _audio_info, read_or_seed as read_beat_map
from .canonical import load_canonical
from .cues import parse_lrc

SCHEMA = "stemlab.timing-edits.v1"
MAX_BYTES = 12 * 1024 * 1024
MAX_LINES = 4096
MAX_WORDS = 50000
MAX_CUES = 20000
HASH = re.compile(r"^[0-9a-f]{64}$")
ID = re.compile(r"^[a-z][a-z0-9_-]{0,63}$")
CUE_KINDS = ("SECTION", "ENTRY", "DROP", "BREAK")
# Established DanceMoves cue conventions, including the published Arcadians cues.
SECTION_NAMES = (
    "INTRO",
    "VOCAL INTRO",
    "VERSE",
    "PRE-CHORUS",
    "CHORUS",
    "POST-CHORUS",
    "BUILD",
    "DROP",
    "FINAL DROP",
    "POST-DROP",
    "BRIDGE",
    "BREAK",
    "BREAKDOWN",
    "SPOKEN BREAKDOWN",
    "INSTRUMENTAL",
    "INTERLUDE",
    "SOLO",
    "HOOK",
    "REFRAIN",
    "MIDDLE EIGHT",
    "OUTRO",
)
CUE_NAME = re.compile(r"^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$")
GUARD = threading.Lock()


def _number(value: Any, label: str, lo: float, hi: float) -> float:
    if type(value) not in (int, float) or not math.isfinite(value) or not lo <= value <= hi:
        raise ValueError(f"{label} must be finite and in {lo}..{hi}")
    return float(value)


def _int(value: Any, label: str, lo: int, hi: int) -> int:
    if type(value) is not int or not lo <= value <= hi:
        raise ValueError(f"{label} must be an integer in {lo}..{hi}")
    return value


def cue_name(kind: str, section: str) -> tuple[str, str]:
    """Canonical [TYPE: SECTION] names; reject invented categories and metadata."""
    if not isinstance(kind, str) or kind.upper() not in CUE_KINDS:
        raise ValueError("Cue type must be SECTION, ENTRY, DROP or BREAK")
    if not isinstance(section, str) or "\n" in section or "\r" in section:
        raise ValueError("Cue section must be a standard musical section name")
    cleaned = re.sub(r" +", " ", section.strip().upper())
    parsed = CUE_NAME.fullmatch(cleaned)
    if not parsed or parsed[1] not in SECTION_NAMES or len(cleaned) > 64:
        raise ValueError(
            f"Nonstandard cue section {section!r}; choose INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc."
        )
    return kind.upper(), cleaned


def _safe_text(value: Any, what: str, limit: int = 1024) -> str:
    if (
        not isinstance(value, str)
        or not value.strip()
        or len(value) > limit
        or any(ord(char) < 32 or char == "\ufffd" for char in value)
    ):
        raise ValueError(f"{what} must be nonempty plain text (without controls)")
    return value.strip()


def validate(data: dict, audio: dict) -> dict:
    if not isinstance(data, dict) or data.get("schema") != SCHEMA:
        raise ValueError(f"Expected {SCHEMA}")
    if data.get("source_sha256") != audio["sha256"]:
        raise ValueError("Timing edits must match exact master SHA-256")
    if (
        data.get("sample_rate") != audio["sample_rate"]
        or data.get("num_frames") != audio["num_frames"]
    ):
        raise ValueError("Source frame identity changed; reload before editing")
    duration = audio["num_frames"]
    mode = data.get("clock_mode")
    if mode not in ("fixed", "variable"):
        raise ValueError("Choose fixed or variable BPM; no implicit downgrade")
    fixed = data.get("fixed_clock")
    if not isinstance(fixed, dict):
        raise ValueError("Fixed BPM / phase data is required for fallback and comparison")
    bpm = _number(fixed.get("bpm"), "Fixed BPM", 20, 400)
    first = _int(fixed.get("first_beat_frame"), "Fixed Beat 1 frame", 0, duration - 1)
    if (
        mode == "variable"
        and data.get("beat_revision") is not None
        and not HASH.fullmatch(str(data["beat_revision"]))
    ):
        raise ValueError("Variable clock revision must be SHA-256 or null (consensus draft)")
    revision = data.get("beat_revision") if mode == "variable" else None
    seen: set[str] = set()
    result: dict[str, Any] = {
        "schema": SCHEMA,
        "source_sha256": audio["sha256"],
        "sample_rate": audio["sample_rate"],
        "num_frames": duration,
        "clock_mode": mode,
        "fixed_clock": {"bpm": bpm, "first_beat_frame": first},
        "beat_revision": revision,
        "review_status": data.get("review_status", "draft"),
    }
    if result["review_status"] not in ("draft", "artist_confirmed"):
        raise ValueError("Edits must remain draft until explicit listening approval")
    for key, cap in (("lines", MAX_LINES), ("words", MAX_WORDS), ("cues", MAX_CUES)):
        if not isinstance(data.get(key), list) or len(data[key]) > cap:
            raise ValueError(f"{key} must contain at most {cap} entries")
    lines: list[dict] = []
    prev_end = -1
    for row in data["lines"]:
        if not isinstance(row, dict):
            raise ValueError("Invalid lyric line")
        identity = _safe_id(row, seen)
        start = _int(row.get("start_frame"), "Line start", 0, duration - 1)
        end = _int(row.get("end_frame"), "Line end", start + 1, duration)
        if start < prev_end:
            raise ValueError("Lyric lines must not overlap or run backwards")
        lines.append(
            {
                "id": identity,
                "start_frame": start,
                "end_frame": end,
                "text": _safe_text(row.get("text"), "Lyric line", 4096),
            }
        )
        prev_end = end
    parents = {row["id"]: row for row in lines}
    words: list[dict] = []
    last_by_line: dict[str, int] = {}
    for row in data["words"]:
        if not isinstance(row, dict):
            raise ValueError("Invalid word entry")
        identity = _safe_id(row, seen)
        parent = row.get("line_id")
        if parent not in parents:
            raise ValueError("Every word must belong to an existing lyric line")
        start = _int(
            row.get("start_frame"),
            "Word start",
            parents[parent]["start_frame"],
            parents[parent]["end_frame"] - 1,
        )
        end = _int(row.get("end_frame"), "Word end", start + 1, parents[parent]["end_frame"])
        if start < last_by_line.get(parent, -1):
            raise ValueError("Words within a line must be ordered and nonoverlapping")
        last_by_line[parent] = end
        words.append(
            {
                "id": identity,
                "line_id": parent,
                "start_frame": start,
                "end_frame": end,
                "word": _safe_text(row.get("word"), "Word", 256),
            }
        )
    cues: list[dict] = []
    previous_frame = -1
    for row in data["cues"]:
        if not isinstance(row, dict):
            raise ValueError("Invalid cue")
        identity = _safe_id(row, seen)
        frame = _int(row.get("frame"), "Cue frame", 0, duration - 1)
        if frame < previous_frame:
            raise ValueError("Cue positions must stay chronologically ordered")
        kind, section = cue_name(row.get("type"), row.get("section"))
        cues.append({"id": identity, "frame": frame, "type": kind, "section": section})
        previous_frame = frame
    result.update(lines=lines, words=words, cues=cues)
    return result


def _safe_id(row: dict, seen: set[str]) -> str:
    value = row.get("id")
    if not isinstance(value, str) or not ID.fullmatch(value) or value in seen:
        raise ValueError("Every timing event requires a unique lowercase id")
    seen.add(value)
    return value


def _path(root: Path) -> Path:
    return root / "timing" / "song-timing-edits.json"


def _seed(root: Path, audio: dict) -> tuple[dict, list[str]]:
    canonical = load_canonical(root)
    sr, frames = audio["sample_rate"], audio["num_frames"]
    warnings: list[str] = []
    lines = []
    for i, event in enumerate(canonical.get("lyric_timing") or []):
        text = str(event.get("text") or "").strip()
        if not text:
            continue  # LRC clear markers are not lyric lines.
        start = round(float(event["start"]) * sr)
        end = round(float(event.get("end") or (event["start"] + 0.75)) * sr)
        if 0 <= start < end <= frames and (not lines or start >= lines[-1]["end_frame"]):
            lines.append(
                {"id": f"line-{i + 1:04}", "text": text, "start_frame": start, "end_frame": end}
            )
        else:
            warnings.append(f"Canonical line {i + 1} needs timing review and was not seeded")
    sections = []
    for i, item in enumerate(canonical.get("sections") or []):
        label = str(item.get("label") or "")
        try:
            kind, section = cue_name("SECTION", label)
            position = round(float(item["start"]) * sr)
            if 0 <= position < frames:
                sections.append(
                    {"id": f"cue-{i + 1:04}", "frame": position, "type": kind, "section": section}
                )
        except (ValueError, TypeError, KeyError):
            warnings.append(
                f"Canonical section {i + 1} is not in the standard cue vocabulary; review it manually"
            )
    words = []
    last_word_end: dict[str, int] = {}
    for candidate in (
        root / "timing/word-timings.json",
        root / "speech/word-timings.json",
        root / "lyrics/word-timings.json",
    ):
        if not candidate.is_file():
            continue
        try:
            if candidate.stat().st_size > MAX_BYTES:
                raise ValueError("word timing too large")
            parsed = json.loads(candidate.read_text(encoding="utf-8"))
            rows = parsed.get("words", [])
            for i, item in enumerate(rows[:MAX_WORDS]):
                if item.get("start") is None or item.get("end") is None:
                    continue
                start, end = round(float(item["start"]) * sr), round(float(item["end"]) * sr)
                parent = next(
                    (
                        line
                        for line in lines
                        if line["start_frame"] <= start < end <= line["end_frame"]
                    ),
                    None,
                )
                if not parent:
                    warnings.append(
                        f"Observed word {i + 1} is outside timed lyric lines; it was not inferred"
                    )
                    continue
                if last_word_end.get(parent["id"], -1) > start:
                    warnings.append(
                        f"Observed word {i + 1} overlaps a preceding word; it was not imported"
                    )
                    continue
                words.append(
                    {
                        "id": f"word-{i + 1:05}",
                        "line_id": parent["id"],
                        "word": str(item["word"]),
                        "start_frame": start,
                        "end_frame": end,
                    }
                )
                last_word_end[parent["id"]] = end
        except (ValueError, KeyError, OSError, TypeError) as exc:
            warnings.append(f"Word evidence not imported ({candidate.name}): {exc}")
            words = []
        break
    bpm = canonical.get("bpm")
    try:
        bpm = float(bpm)
        if not (20 <= bpm <= 400):
            raise ValueError()
    except (ValueError, TypeError):
        bpm = 120.0
        warnings.append("No canonical fixed BPM: 120 BPM is an explicit unverified UI fallback")
    beat_one = 0
    try:
        detected, _, _ = read_beat_map(root, audio["sha256"])
        origin = next(row for row in detected["beats"] if row["beat"] == detected["origin_beat"])
        beat_one = origin["frame"]
    except (ValueError, OSError, KeyError, StopIteration, TypeError):
        warnings.append("Fixed Beat 1 is unverified: set it manually or wait for consensus anchors")
    base = dict(
        schema=SCHEMA,
        source_sha256=audio["sha256"],
        sample_rate=sr,
        num_frames=frames,
        clock_mode="fixed",
        fixed_clock={"bpm": bpm, "first_beat_frame": beat_one},
        beat_revision=None,
        review_status="draft",
        lines=lines,
        words=words,
        cues=sorted(sections, key=lambda row: row["frame"]),
    )
    return validate(base, audio), warnings


def _beat_revision(root: Path, source_hash: str) -> str | None:
    _, _, digest = read_beat_map(root, source_hash)
    return digest


def _check_clock(root: Path, source_hash: str, doc: dict) -> dict | None:
    if doc["clock_mode"] == "fixed":
        return None
    beats, _, digest = read_beat_map(root, source_hash)
    if doc["beat_revision"] != digest:
        raise FileExistsError(
            "Beat corrections have changed; refresh clock matching before saving timing edits"
        )
    return beats


def read_or_seed(root: Path, source_hash: str) -> tuple[dict, bool, str | None, list[str]]:
    audio = _audio_info(root, source_hash)
    target = _path(root)
    if target.exists():
        raw = target.read_bytes()
        if len(raw) > MAX_BYTES:
            raise ValueError("Saved song timing exceeds 12 MiB")
        doc = validate(json.loads(raw), audio)
        _check_clock(root, source_hash, doc)
        return doc, True, hashlib.sha256(raw).hexdigest(), []
    doc, warnings = _seed(root, audio)
    return doc, False, None, warnings


def preview(root: Path, source_hash: str, payload: dict) -> dict:
    doc = validate(payload, _audio_info(root, source_hash))
    _check_clock(root, source_hash, doc)
    return doc


def save(
    root: Path, source_hash: str, payload: dict, expected_revision: str | None
) -> tuple[dict, str]:
    with GUARD:
        doc = preview(root, source_hash, payload)
        target = _path(root)
        exists = target.exists()
        old = hashlib.sha256(target.read_bytes()).hexdigest() if exists else None
        if old != expected_revision:
            raise FileExistsError(
                "Another editor changed song timings; reload without discarding your draft"
            )
        body = (json.dumps(doc, indent=2, ensure_ascii=False, allow_nan=False) + "\n").encode(
            "utf-8"
        )
        if len(body) > MAX_BYTES:
            raise ValueError("Edited timing file exceeds 12 MiB")
        target.parent.mkdir(parents=True, exist_ok=True)
        fd, tmp = tempfile.mkstemp(dir=target.parent, prefix=".song-timing-", suffix=".json")
        try:
            with os.fdopen(fd, "wb") as f:
                f.write(body)
                f.flush()
                os.fsync(f.fileno())
            os.replace(tmp, target)
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)
    return doc, hashlib.sha256(body).hexdigest()


def _stamp(frame: int, sr: int) -> str:
    # Millisecond compatibility for DanceMoves. Full frame times stay in JSON.
    millis = (frame * 1000 + sr // 2) // sr
    minutes, rem = divmod(millis, 60000)
    seconds, fraction = divmod(rem, 1000)
    return f"[{minutes:02d}:{seconds:02d}.{fraction:03d}]"


def export_document(root: Path, source_hash: str, payload: dict) -> dict:
    doc = preview(root, source_hash, payload)
    sr = doc["sample_rate"]
    lines = "[offset:0]\n" + "".join(
        _stamp(row["start_frame"], sr) + row["text"] + "\n" for row in doc["lines"]
    )
    words = io.StringIO(newline="")
    writer = csv.writer(words, delimiter="\t", lineterminator="\n")
    writer.writerow(("start", "end", "word"))
    for row in doc["words"]:
        writer.writerow(
            (f"{row['start_frame'] / sr:.6f}", f"{row['end_frame'] / sr:.6f}", row["word"])
        )
    cues = "[offset:0]\n" + "".join(
        _stamp(row["frame"], sr) + f"[{row['type']}: {row['section']}]\n" for row in doc["cues"]
    )
    word_rows = [
        {
            "start": row["start_frame"] / sr,
            "end": row["end_frame"] / sr,
            "word": row["word"],
            "line_id": row["line_id"],
        }
        for row in doc["words"]
    ]
    if doc["clock_mode"] == "variable":
        beat_map = _check_clock(root, source_hash, doc)
        clock = {"mode": "variable", "beat_timeline": beat_map}
    else:
        bpm = doc["fixed_clock"]["bpm"]
        first = doc["fixed_clock"]["first_beat_frame"] / sr
        clock = {
            "mode": "fixed",
            "bpm": bpm,
            "first_beat_seconds": first,
            "offset_pips": -first * bpm * 64 / 60,
            "pips_per_beat": 64,
        }
    return {
        "schema": "stemlab.song-timing.v1",
        "source_sha256": source_hash,
        "source_audio": {"sample_rate": sr, "num_frames": doc["num_frames"]},
        "timings": doc,
        "clock": clock,
        "line_lrc": lines,
        "word_tsv": words.getvalue(),
        "word_json": {"schema": "stemlab.word-timings.v1", "words": word_rows},
        "cue_lrc": cues,
        "note": "Source frame positions are authoritative; exported LRC/TSV round for DanceMoves players. Both clocks use unaltered source audio time.",
    }


def _lrc_rows(text: str) -> list[tuple[float, str]]:
    parsed = parse_lrc(text)
    rows = []
    for cue in parsed.cues:
        time = float(parsed.effective_time(cue))
        if time < 0:
            raise ValueError("LRC offset moved a timing event before source time zero")
        rows.append((time, cue.label.strip()))
    return rows


def import_text(
    root: Path, source_hash: str, payload: dict, *, kind: str, text: str, format: str
) -> dict:
    """Preview an explicit replacement. Reject any orphaned words and unknown cues."""
    if kind not in ("lines", "words", "cues") or format not in ("lrc", "tsv", "json"):
        raise ValueError("Unsupported timing import kind/format")
    if not isinstance(text, str) or len(text.encode("utf-8")) > 1_048_576 or "\x00" in text:
        raise ValueError("Timing import must be UTF-8 text under 1 MiB")
    doc = preview(root, source_hash, payload)
    sr = doc["sample_rate"]
    updated = {**doc}
    if kind == "lines":
        if format != "lrc":
            raise ValueError("Line lyric imports require LRC")
        # Blank line-LRC stamps are explicit lyric clear boundaries. Keep their
        # time as the previous line's end instead of extending its visibility.
        rows = _lrc_rows(text)
        imported = []
        for i, (start, label) in enumerate(rows):
            if not label:
                continue
            end = rows[i + 1][0] if i + 1 < len(rows) else doc["num_frames"] / sr
            start_frame, end_frame = round(start * sr), min(doc["num_frames"], round(end * sr))
            imported.append(
                dict(
                    id=f"line-{i + 1:04}", start_frame=start_frame, end_frame=end_frame, text=label
                )
            )
        updated["lines"] = imported
        if doc["words"]:
            raise ValueError(
                "Remove or export current word edits before replacing their parent lines"
            )
    elif kind == "cues":
        if format != "lrc":
            raise ValueError("Section cue imports require LRC")
        imported = []
        for i, (start, label) in enumerate(_lrc_rows(text)):
            match = re.fullmatch(r"\[([A-Za-z]+):\s*([^\]\[]+)\]", label)
            if not match:
                raise ValueError(f"Cue {i + 1} must use [SECTION: INTRO], [DROP: CHORUS 1], etc.")
            typ, section = cue_name(match[1], match[2])
            imported.append(
                dict(id=f"cue-{i + 1:04}", frame=round(start * sr), type=typ, section=section)
            )
        updated["cues"] = imported
    else:
        if format == "json":
            data = json.loads(text)
            raw = data if isinstance(data, list) else data.get("words")
            if not isinstance(raw, list):
                raise ValueError("Word JSON requires a words array")
            entries = [(x.get("start"), x.get("end"), x.get("word", x.get("text"))) for x in raw]
        elif format == "tsv":
            reader = csv.DictReader(io.StringIO(text), delimiter="\t")
            if not {"start", "end", "word"}.issubset(reader.fieldnames or []):
                raise ValueError("Word TSV requires start, end, word columns")
            entries = [(r["start"], r["end"], r["word"]) for r in reader]
        else:
            # Enhanced <mm:ss.xxx> markers or one [mm:ss.xxx] marker per word.
            # Their next boundary is the *display* end, not claimed acoustic
            # evidence; the resulting draft requires listening review.
            stamps = re.compile(r"<(\d{1,3}):([0-5]\d)(?:[.:](\d{1,3}))?>")
            basic = re.compile(r"^\[(\d{1,3}):([0-5]\d)(?:[.:](\d{1,3}))?\](.*)$")
            starts = []
            offsets = re.findall(r"^\s*\[offset:\s*([+-]?\d{1,9})\s*\]\s*$", text, re.M | re.I)
            if len(offsets) > 1:
                raise ValueError("Multiple word-LRC offsets are ambiguous")
            offset_seconds = (int(offsets[0]) / 1000) if offsets else 0
            for line in text.splitlines():
                tags = list(stamps.finditer(line))
                if tags:
                    for j, mark in enumerate(tags):
                        next_pos = tags[j + 1].start() if j + 1 < len(tags) else len(line)
                        name = line[mark.end() : next_pos].strip()
                        if not name:
                            raise ValueError("Empty enhanced LRC word")
                        starts.append(
                            (
                                int(mark[1]) * 60
                                + int(mark[2])
                                + float("0." + str(mark[3] or "0"))
                                - offset_seconds,
                                name,
                            )
                        )
                else:
                    match = basic.fullmatch(line.strip())
                    if match:
                        name = match[4].strip()
                        if not name:
                            raise ValueError("Empty word-level LRC timestamp")
                        starts.append(
                            (
                                int(match[1]) * 60
                                + int(match[2])
                                + float("0." + str(match[3] or "0"))
                                - offset_seconds,
                                name,
                            )
                        )
                    elif line.strip() and not re.match(
                        r"^\[(?:ar|al|ti|by|offset):", line.strip(), re.I
                    ):
                        raise ValueError("Untimed word LRC text")
            entries = []
            for i, (start, name) in enumerate(starts):
                frame = round(start * sr)
                parent = next(
                    (
                        line
                        for line in doc["lines"]
                        if line["start_frame"] <= frame < line["end_frame"]
                    ),
                    None,
                )
                if not parent:
                    raise ValueError(f"Word {i + 1} has no timed lyric line")
                next_frame = (
                    round(starts[i + 1][0] * sr) if i + 1 < len(starts) else parent["end_frame"]
                )
                end = min(parent["end_frame"], next_frame)
                if end <= frame:
                    raise ValueError("Word LRC timestamps must strictly advance inside their lines")
                entries.append((frame / sr, end / sr, name))
        imported = []
        for i, (start, end, word) in enumerate(entries):
            if start is None or end is None:
                raise ValueError("Word timing must include observed start and end")
            frame, end_frame = round(float(start) * sr), round(float(end) * sr)
            parent = next(
                (
                    line
                    for line in doc["lines"]
                    if line["start_frame"] <= frame < end_frame <= line["end_frame"]
                ),
                None,
            )
            if not parent:
                raise ValueError(
                    f"Word {i + 1} does not fall within a timed lyric line; place lines first"
                )
            imported.append(
                dict(
                    id=f"word-{i + 1:05}",
                    start_frame=frame,
                    end_frame=end_frame,
                    word=word,
                    line_id=parent["id"],
                )
            )
        updated["words"] = imported
    updated["review_status"] = "draft"
    return preview(root, source_hash, updated)
