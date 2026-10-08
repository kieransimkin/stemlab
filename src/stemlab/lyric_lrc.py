"""Export canonical lyric lines from observed word timings without interpolation."""
from __future__ import annotations

import hashlib
import json
from pathlib import Path


def build_lrc(alignment: dict, *, title: str, artist: str, line_anchors: dict | None = None) -> tuple[str, dict]:
    """Keep every canonical line; flag late anchors and refuse missing lines.

    Word timestamps are evidence, not listening approval. A line with an untimed
    first word can use its first observed word, explicitly recorded as a late
    anchor. No time is manufactured for a line without usable observed words.
    """
    if not alignment.get("threshold_pass"):
        raise ValueError("Canonical word coverage is below the 70% threshold")
    for label, value in (("title", title), ("artist", artist)):
        if any(char in value for char in "\r\n[]"):
            raise ValueError(f"Unsafe LRC {label} metadata")
    text = alignment["canonical_text"]
    duration = float(alignment["duration"])
    cues, output = [], [f"[ti:{title}]", f"[ar:{artist}]", "[offset:0]"]
    previous_cs = -1
    for number, line in enumerate(text.splitlines(), 1):
        if not line.strip():
            output.append("")
            continue
        words = [word for word in alignment["words"] if word["line"] == number]
        usable = [word for word in words
                  if word.get("start") is not None and word.get("end") is not None
                  and 0 <= float(word["start"]) < float(word["end"]) <= duration]
        override = (line_anchors or {}).get(number)
        if not usable and not override:
            raise ValueError(f"Canonical line {number} has no usable observed timing")
        anchor = override or usable[0]
        if not 0 <= float(anchor["start"]) < float(anchor["end"]) <= duration:
            raise ValueError(f"Canonical line {number} has invalid observed recovery timing")
        centiseconds = round(float(anchor["start"]) * 100)
        if centiseconds <= previous_cs or centiseconds / 100 > duration:
            raise ValueError(f"Canonical line {number} has non-monotonic/out-of-range timing")
        previous_cs = centiseconds
        minutes, rest = divmod(centiseconds, 6000)
        seconds, fraction = divmod(rest, 100)
        stamp = f"[{minutes:02}:{seconds:02}.{fraction:02}]"
        late = not override and anchor["index"] != words[0]["index"]
        reasons = list(anchor.get("review_reasons") or [])
        if late:
            reasons.append("line_first_word_untimed_late_observed_anchor")
        cues.append({"canonical_line": number, "text": line, "start": centiseconds / 100,
                     "observed_start": anchor["start"], "anchor_word": anchor["word"],
                     "anchor_index": anchor["index"], "anchor_match": anchor["match"],
                     "first_word_anchored": not late, "review_reasons": reasons,
                     "recovery_evidence": anchor.get("recovery_evidence")})
        output.append(stamp + line)
    if not cues:
        raise ValueError("No canonical lyric lines")
    report = {"schema": "stemlab.canonical-line-lrc.v1", "line_count": len(cues),
              "canonical_nonempty_lines": sum(bool(line.strip()) for line in text.splitlines()),
              "canonical_word_match_ratio": alignment["match_ratio"],
              "first_word_anchor_count": sum(cue["first_word_anchored"] for cue in cues),
              "review_line_count": sum(bool(cue["review_reasons"]) for cue in cues),
              "canonical_text_parity": True, "strictly_increasing": True,
              "duration_seconds": duration, "cues": cues,
              "listening_qa": "pending", "accepted": False,
              "policy": "Observed ASR word anchors only; no interpolation or beat snapping. "
                        "Late anchors are flagged; listening QA remains required."}
    return "\n".join(output) + "\n", report


def export_lrc(alignment_path: Path, output: Path, *, title: str, artist: str,
               anchors_path: Path | None = None) -> dict:
    if output.exists():
        raise ValueError("Refusing to overwrite an existing LRC export directory")
    alignment = json.loads(alignment_path.read_text(encoding="utf-8"))
    anchors = {}
    if anchors_path:
        for item in json.loads(anchors_path.read_text(encoding="utf-8"))["anchors"]:
            source = Path(item["speech_path"])
            digest = hashlib.sha256(source.read_bytes()).hexdigest()
            if digest != item["speech_sha256"]:
                raise ValueError("Recovery speech evidence hash mismatch")
            word = json.loads(source.read_text(encoding="utf-8"))["words"][item["observed_index"]]
            if word["word"] != item["observed_word"]:
                raise ValueError("Recovery observed word identity mismatch")
            number = int(item["canonical_line"])
            if number in anchors:
                raise ValueError("Duplicate recovery line anchor")
            anchors[number] = {**word, "index": None, "match": "observed_section_recovery",
                               "review_reasons": ["section_recovery_requires_listening_qa"],
                               "recovery_evidence": item}
    lrc, report = build_lrc(alignment, title=title, artist=artist, line_anchors=anchors)
    report["provenance"] = {
        "alignment_path": str(alignment_path),
        "alignment_sha256": hashlib.sha256(alignment_path.read_bytes()).hexdigest(),
        "alignment_provenance": alignment.get("provenance"),
        "line_anchor_evidence_path": str(anchors_path) if anchors_path else None,
    }
    output.mkdir(parents=True)
    lrc_path = output / "canonical-lyric-timing.lrc"
    lrc_path.write_text(lrc, encoding="utf-8")
    report["lrc_sha256"] = hashlib.sha256(lrc_path.read_bytes()).hexdigest()
    (output / "line-timing-evidence.json").write_text(
        json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    return report
