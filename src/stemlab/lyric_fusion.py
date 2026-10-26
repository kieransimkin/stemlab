"""Combine source-bound lyric observations without averaging or inventing time.

The ranking is an evidence-selection heuristic, not a calibrated confidence
probability or acoustic forced aligner. Every selected interval has one owner.
"""
from __future__ import annotations

import csv
import hashlib
import html
import io
import json
import math
import re
import shutil
from contextlib import contextmanager
from collections import Counter
from decimal import Decimal, ROUND_HALF_UP
from pathlib import Path
from uuid import uuid4

from . import __version__
from .timing_edits import _stamp
from .util import sha256_file
from .word_alignment import TOKEN

SCHEMA = "stemlab.lyric-fusion.v1"
REQUEST_SCHEMA = "stemlab.lyric-fusion-request.v1"
LOCK_SCHEMA = "stemlab.lyric-fusion-locks.v1"
IDENTITY = re.compile(r"^[a-z][a-z0-9_-]{0,63}$")


def _inventory(text):
    return [(line, match.group()) for line, value in enumerate(text.splitlines(), 1)
            for match in TOKEN.finditer(value)]


def _frames(seconds, sample_rate):
    if type(seconds) not in (int, float) or not math.isfinite(seconds):
        raise ValueError("Observed times must be finite seconds")
    return int((Decimal(str(seconds)) * sample_rate).to_integral_value(rounding=ROUND_HALF_UP))


def _source(audio):
    if not re.fullmatch(r"[0-9a-f]{64}", str(audio.get("sha256", ""))):
        raise ValueError("A verified master SHA-256 is required")
    for name in ("sample_rate", "num_frames"):
        if type(audio.get(name)) is not int or audio[name] < 1:
            raise ValueError(f"Invalid source {name}")


def _observations(text, audio, candidates):
    canonical = _inventory(text)
    if not canonical or len(canonical) > 10000 or not 1 <= len(candidates) <= 16:
        raise ValueError("Require 1..10000 canonical tokens and 1..16 candidates")
    by_word = [[] for _ in canonical]
    identities, rejected, sources = set(), [], []
    for candidate in candidates:
        identity, view = candidate["id"], candidate["view_id"]
        if not IDENTITY.fullmatch(identity) or not IDENTITY.fullmatch(view) or identity in identities:
            raise ValueError("Candidate IDs must be unique; IDs/views require simple lowercase names")
        identities.add(identity)
        payload = candidate["alignment"]
        if payload.get("schema") != "stemlab.canonical-word-reconciliation.v1":
            raise ValueError(f"{identity}: unsupported alignment schema")
        provenance = payload.get("provenance") or {}
        master = provenance.get("canonical_master_sha256") or provenance.get("master_sha256")
        if master != audio["sha256"] or candidate.get("source_clock") != "original_master_seconds":
            raise ValueError(f"{identity}: exact master and unchanged source clock must be verified")
        if payload.get("canonical_text") != text or len(payload.get("words", [])) != len(canonical):
            raise ValueError(f"{identity}: canonical text/token inventory differs")
        duration = audio["num_frames"] / audio["sample_rate"]
        candidate_duration = float(payload.get("duration", -1))
        if not math.isfinite(candidate_duration) or abs(candidate_duration - duration) > .05:
            raise ValueError(f"{identity}: full-source duration differs")
        rows = payload["words"]
        for index, (row, expected) in enumerate(zip(rows, canonical)):
            if (row.get("index"), row.get("line"), row.get("word")) != (index, *expected):
                raise ValueError(f"{identity}: canonical token identity differs at {index}")
        ratio = sum(row.get("match") in ("exact", "fuzzy") for row in rows) / len(rows)
        diagnostics = provenance.get("repetition_diagnostics") or {}
        if ratio < .7 or diagnostics.get("suspicious_decoder_repetition") is True:
            rejected.append({"id": identity, "reason": "below_70_percent_or_decoder_repetition",
                             "canonical_match_ratio": ratio})
            continue
        sources.append({"id": identity, "view_id": view, "canonical_match_ratio": ratio,
                        "source_clock": candidate["source_clock"],
                        "alignment_sha256": candidate.get("alignment_sha256")})
        for index, row in enumerate(rows):
            if row.get("match") not in ("exact", "fuzzy") or row.get("start") is None:
                continue
            start, end = _frames(row["start"], audio["sample_rate"]), _frames(row["end"], audio["sample_rate"])
            if not 0 <= start < end <= audio["num_frames"]:
                continue
            reasons = row.get("review_reasons") or []
            if not isinstance(reasons, list) or any(not isinstance(x, str) for x in reasons):
                raise ValueError(f"{identity}: invalid review reasons")
            by_word[index].append({"index": index, "source": identity, "view_id": view,
                                   "start_frame": start, "end_frame": end,
                                   "observed_start": row["start"], "observed_end": row["end"],
                                   "observed_index": row.get("observed_index"),
                                   "match": row["match"], "review_reasons": list(reasons),
                                   "observation_review_reasons": list(reasons)})
    if not sources:
        raise ValueError("No eligible source-bound candidate passes the existing 70% gate")
    if sum(map(len, by_word)) > 4096:
        raise ValueError("Fusion is bounded to 4096 observations; reduce candidate count")
    return canonical, by_word, sources, rejected


def _locks(text, audio, document):
    if document is None:
        return []
    if (document.get("schema") != LOCK_SCHEMA or document.get("authority") != "artist_confirmed"
            or document.get("source_sha256") != audio["sha256"]
            or document.get("canonical_text_sha256") != hashlib.sha256(text.encode()).hexdigest()
            or document.get("sample_rate") != audio["sample_rate"]
            or document.get("num_frames") != audio["num_frames"]):
        raise ValueError("Artist locks must identify this exact source and canonical text")
    canonical, result = _inventory(text), []
    for row in document.get("words", []):
        index, start, end = row.get("canonical_index"), row.get("start_frame"), row.get("end_frame")
        if (type(index) is not int or not 0 <= index < len(canonical)
                or row.get("word") != canonical[index][1]
                or type(start) is not int or type(end) is not int
                or not 0 <= start < end <= audio["num_frames"]):
            raise ValueError("Invalid artist-locked word")
        result.append({"index": index, "start_frame": start, "end_frame": end,
                       "source": "artist-lock", "view_id": "artist-lock",
                       "observed_index": None, "match": "artist_locked", "review_reasons": [],
                       "supporting_views": [], "supporting_candidates": [], "weight": 0})
    result.sort(key=lambda row: row["index"])
    if any(b["index"] <= a["index"] or b["start_frame"] < a["end_frame"]
           for a, b in zip(result, result[1:])):
        raise ValueError("Artist locks overlap, run backwards or repeat an index")
    return result


def _select(nodes, lower, upper, left_frame, right_frame):
    """Highest-ranked chronological path; each edge preserves original intervals."""
    options = [x for x in nodes if lower < x["index"] < upper
               and left_frame <= x["start_frame"] < x["end_frame"] <= right_frame]
    options.sort(key=lambda row: row["index"])
    scores, previous = [], []
    for i, row in enumerate(options):
        best, predecessor = (row["weight"], 1, 0), -1
        for j in range(i):
            before = options[j]
            if before["index"] >= row["index"] or before["end_frame"] > row["start_frame"]:
                continue
            switch = before["source"] != row["source"]
            score = (scores[j][0] + row["weight"] - 5 * switch,
                     scores[j][1] + 1, scores[j][2] - switch)
            if score > best:
                best, predecessor = score, j
        scores.append(best)
        previous.append(predecessor)
    if not scores:
        return []
    index = max(range(len(scores)), key=scores.__getitem__)
    result = []
    while index >= 0:
        result.append(options[index])
        index = previous[index]
    return list(reversed(result))


def combine(canonical_text, audio, candidates, *, locks=None,
            onset_tolerance_ms=120, end_tolerance_ms=200):
    """Choose actual word intervals, retain conflicts/gaps and honour explicit locks.

    ``view_id`` groups correlated variants (e.g. one vocal stem). Agreement
    between views is corroboration, never a calibrated independence claim.
    """
    _source(audio)
    for value in (onset_tolerance_ms, end_tolerance_ms):
        if type(value) not in (int, float) or not math.isfinite(value) or not 0 <= value <= 500:
            raise ValueError("Agreement tolerances must be finite and in 0..500 ms")
    canonical, observations, sources, rejected = _observations(canonical_text, audio, candidates)
    start_tol = _frames(onset_tolerance_ms / 1000, audio["sample_rate"])
    end_tol = _frames(end_tolerance_ms / 1000, audio["sample_rate"])
    for options in observations:
        for row in options:
            supporting = [x for x in options if x["match"] == "exact" and not x["observation_review_reasons"]
                          and abs(x["start_frame"] - row["start_frame"]) <= start_tol
                          and abs(x["end_frame"] - row["end_frame"]) <= end_tol]
            views = sorted({x["view_id"] for x in supporting})
            clean = row["match"] == "exact" and not row["observation_review_reasons"]
            row["supporting_views"] = views
            row["supporting_candidates"] = sorted({x["source"] for x in supporting})
            row["certainty"] = ("corroborated_exact" if clean and len(views) >= 2
                                else "single_view_exact" if clean else "flagged_observation")
            row["weight"] = ((100 + 40 * max(0, min(len(views), 3) - 1)) if clean
                             else 40 if row["match"] == "exact" else 20)
            if any(abs(x["start_frame"] - row["start_frame"]) > start_tol
                   or abs(x["end_frame"] - row["end_frame"]) > end_tol for x in options):
                row["review_reasons"] = [*row["review_reasons"], "timing_disagreement"]
    locked = _locks(canonical_text, audio, locks)
    nodes = [row for options in observations for row in options]
    selected, previous_index, previous_frame = [], -1, 0
    for lock in [*locked, {"index": len(canonical), "start_frame": audio["num_frames"]}]:
        selected.extend(_select(nodes, previous_index, lock["index"], previous_frame, lock["start_frame"]))
        if lock["index"] < len(canonical):
            selected.append(lock)
            previous_index, previous_frame = lock["index"], lock["end_frame"]
    chosen = {row["index"]: row for row in selected}
    primary = sources[0]["id"]
    words = []
    for index, (line, word) in enumerate(canonical):
        row = chosen.get(index)
        alternatives = [{k: v for k, v in x.items() if k not in ("weight", "certainty")}
                        for x in observations[index]]
        primary_present = any(x["source"] == primary for x in observations[index])
        words.append({"index": index, "line": line, "word": word,
                      "start_frame": row["start_frame"] if row else None,
                      "end_frame": row["end_frame"] if row else None,
                      "source": row["source"] if row else None,
                      "view_id": row["view_id"] if row else None,
                      "observed_index": row.get("observed_index") if row else None,
                      "certainty": row.get("certainty", "artist_locked") if row else "untimed",
                      "decision": ("artist_locked" if row and row["source"] == "artist-lock"
                                   else "primary" if row and row["source"] == primary
                                   else "replacement" if row and primary_present
                                   else "gap_fill" if row else "unresolved"),
                      "supporting_views": row["supporting_views"] if row else [],
                      "supporting_candidates": row["supporting_candidates"] if row else [],
                      "review_reasons": row["review_reasons"] if row else
                          ["chronology_conflict" if alternatives else "no_observed_word"],
                      "alternatives": alternatives})
    lines = []
    for number, text in enumerate(canonical_text.splitlines(), 1):
        if not text.strip():
            continue
        members = [row for row in words if row["line"] == number]
        timed = [row for row in members if row["start_frame"] is not None]
        reasons = sorted({x for row in members for x in row["review_reasons"]})
        if not members or members[0]["start_frame"] is None:
            reasons.append("line_onset_not_observed")
        if not members or members[-1]["end_frame"] is None:
            reasons.append("line_end_not_observed")
        lines.append({"id": f"line-{number}", "line": number, "text": text,
                      "start_frame": timed[0]["start_frame"] if timed else None,
                      "end_frame": timed[-1]["end_frame"] if timed else None,
                      "review_reasons": reasons})
    contributions = dict(Counter(row["source"] for row in words if row["source"]))
    return {"schema": SCHEMA, "source": dict(audio), "canonical_text": canonical_text,
            "canonical_text_sha256": hashlib.sha256(canonical_text.encode()).hexdigest(),
            "review_status": "draft", "accepted": False, "listening_qa": "pending",
            "candidates": sources, "rejected_candidates": rejected, "words": words, "lines": lines,
            "summary": {"canonical_tokens": len(words), "timed_tokens": len(selected),
                        "timed_lines": sum(row["start_frame"] is not None for row in lines),
                        "gap_fills": sum(row["decision"] == "gap_fill" for row in words),
                        "replacements": sum(row["decision"] == "replacement" for row in words),
                        "corroborated_tokens": sum(row["certainty"] == "corroborated_exact" for row in words),
                        "conflicted_tokens": sum("timing_disagreement" in row["review_reasons"] for row in words),
                        "contributions": contributions},
            "policy": {"source_clock": "original_master_seconds", "averaging": False,
                       "interpolation": False, "beat_snapping": False,
                       "onset_tolerance_ms": onset_tolerance_ms, "end_tolerance_ms": end_tolerance_ms,
                       "ranking": "Chronological maximum evidence-weight path; small source-switch penalty. Scores and agreement are not calibrated probabilities.",
                       "line_boundaries": "First/last selected observed token; missing edges remain flagged."}}


def _read(path):
    if path.stat().st_size > 12 * 1024 * 1024:
        raise ValueError("Fusion JSON inputs must be at most 12 MiB")
    return json.loads(path.read_text(encoding="utf-8"),
                      parse_constant=lambda value: (_ for _ in ()).throw(ValueError(value)))


def _srt_stamp(frame, sr):
    millis = (frame * 1000 + sr // 2) // sr
    hours, millis = divmod(millis, 3600000)
    minutes, millis = divmod(millis, 60000)
    seconds, millis = divmod(millis, 1000)
    return f"{hours:02}:{minutes:02}:{seconds:02},{millis:03}"


def overview_svg(result):
    """Actual selection diagram, not an illustration of acoustic accuracy."""
    words = result["words"]
    width, row_height = 1000, 22
    colors = ["#137c8b", "#a65e00", "#7e57c2", "#397c35"]
    sources = [*result["summary"]["contributions"]]
    color = {name: colors[i % len(colors)] for i, name in enumerate(sources)}
    rows = [f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{80 + row_height * len(words)}" role="img" aria-label="Actual lyric fusion source selections">',
            '<rect width="100%" height="100%" fill="#101724"/>',
            '<text x="20" y="28" fill="white" font-family="monospace" font-size="16">Observed lyric intervals · source selections · provisional</text>']
    frames = result["source"]["num_frames"]
    for i, word in enumerate(words):
        y = 55 + i * row_height
        label = html.escape(f"{i}: {word['word']}")
        rows.append(f'<text x="20" y="{y + 13}" fill="white" font-family="monospace" font-size="12">{label}</text>')
        if word["start_frame"] is not None:
            x = 230 + word["start_frame"] / frames * 550
            size = max(2, (word["end_frame"] - word["start_frame"]) / frames * 550)
            rows.append(f'<rect x="{x:.3f}" y="{y}" width="{size:.3f}" height="16" fill="{color[word["source"]]}"/>')
        source = html.escape(word["source"] or "UNTIMED")
        rows.append(f'<text x="790" y="{y + 13}" fill="#ddd" font-family="monospace" font-size="11">{source}</text>')
    return "\n".join([*rows, "</svg>\n"])


@contextmanager
def _output_stage(parent):
    # Inherit the selected output parent's ACL. Windows temp mode 0700 can
    # otherwise leave a renamed result unreadable to the normal review context.
    parent = parent.resolve()
    stage = parent / (".lyric-fusion-" + uuid4().hex)
    stage.mkdir()
    try:
        yield stage
    finally:
        if stage.exists():
            if stage.parent.resolve() != parent or stage.is_symlink():
                raise ValueError("Refusing cleanup outside the owned output stage")
            shutil.rmtree(stage)


def export_request(request_path: Path, output: Path):
    """Verify local source/candidates and export a NEW lyric-only review bundle."""
    from .audio import audio_info
    request_path, output = Path(request_path).resolve(), Path(output).absolute()
    if output.exists() or output.is_symlink():
        raise FileExistsError("Refusing to overwrite an existing fusion output")
    request = _read(request_path)
    if request.get("schema") != REQUEST_SCHEMA:
        raise ValueError(f"Expected {REQUEST_SCHEMA}")
    def resolve(value):
        return (request_path.parent / value).resolve()

    analysis_root = resolve(request["analysis"])
    analysis = _read(analysis_root / "analysis.json")
    relative = Path(analysis["source"]["copied_path"].replace("\\", "/"))
    master = (analysis_root / relative).resolve()
    if relative.is_absolute() or not master.is_relative_to(analysis_root):
        raise ValueError("Copied master must stay inside its analysis root")
    if sha256_file(master) != analysis["source"]["sha256"]:
        raise ValueError("Copied master hash differs")
    info = audio_info(master)
    audio = {"sha256": analysis["source"]["sha256"],
             "sample_rate": info["sample_rate"], "num_frames": info["num_frames"]}
    lyrics = resolve(request["lyrics"])
    text = lyrics.read_text(encoding="utf-8-sig")
    candidates = []
    for item in request["candidates"]:
        path = resolve(item["path"])
        candidates.append({**item, "alignment": _read(path), "alignment_sha256": sha256_file(path)})
    locks = _read(resolve(request["locks"])) if request.get("locks") else None
    result = combine(text, audio, candidates, locks=locks,
                     onset_tolerance_ms=request.get("onset_tolerance_ms", 120),
                     end_tolerance_ms=request.get("end_tolerance_ms", 200))
    sr = audio["sample_rate"]
    lines = [row for row in result["lines"] if row["start_frame"] is not None]
    words = [row for row in result["words"] if row["start_frame"] is not None]
    output.parent.mkdir(parents=True, exist_ok=True)
    with _output_stage(output.parent) as stage:
        def write(name, value):
            return (stage / name).write_text(value, encoding="utf-8")

        write("combined-timeline.json", json.dumps(result, ensure_ascii=False, indent=2) + "\n")
        write("lyrics.lrc", "[offset:0]\n" + "".join(_stamp(row["start_frame"], sr) + row["text"] + "\n" for row in lines))
        write("subtitles.srt", "\n".join(f"{i}\n{_srt_stamp(row['start_frame'], sr)} --> {_srt_stamp(row['end_frame'], sr)}\n{row['text']}\n" for i, row in enumerate(lines, 1)))
        word_rows = [{"start": row["start_frame"] / sr, "end": row["end_frame"] / sr,
                      "word": row["word"], "line_id": f"line-{row['line']}"} for row in words]
        write("word-timings.json", json.dumps({"schema": "stemlab.word-timings.v1", "source_sha256": audio["sha256"], "review_status": "draft", "words": word_rows}, ensure_ascii=False, indent=2) + "\n")
        table = io.StringIO(newline="")
        writer = csv.writer(table, delimiter="\t", lineterminator="\n")
        writer.writerow(("canonical_index", "word", "start_frame", "end_frame", "source", "certainty", "decision"))
        for row in result["words"]:
            writer.writerow([row[key] for key in ("index", "word", "start_frame", "end_frame", "source", "certainty", "decision")])
        write("word-provenance.tsv", table.getvalue())
        write("selection.svg", overview_svg(result))
        write("request-provenance.json", json.dumps({"engine": {"name": "StemLab", "package_version": __version__, "implementation_sha256": sha256_file(Path(__file__))}, "request_sha256": sha256_file(request_path), "analysis_sha256": sha256_file(analysis_root / 'analysis.json'), "lyrics_sha256": sha256_file(lyrics), "candidates": result["candidates"], "accepted": False}, indent=2) + "\n")
        write("manifest.json", json.dumps({path.name: sha256_file(path) for path in sorted(stage.iterdir())}, indent=2) + "\n")
        if output.exists() or output.is_symlink():
            raise FileExistsError("Fusion output appeared while preparing; original preserved")
        stage.rename(output)
    return result
