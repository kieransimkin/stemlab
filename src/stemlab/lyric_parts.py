"""Export explicitly selected line anchors while preserving separate vocal parts."""

from __future__ import annotations

import math
from .lyric_quality import assess_lines


def assemble_lines(
    text: str, selections: list[dict], duration: float, *, title: str, artist: str
) -> tuple[str, dict]:
    """One explicit source anchor per canonical occurrence; no automatic fusion.

    Different parts may overlap. Each part must remain chronological. LRC is
    sorted by performed onset; the evidence table retains canonical occurrence
    IDs because written block order need not equal performed time order.
    """
    if any(c in title + artist for c in "\r\n[]"):
        raise ValueError("Unsafe LRC metadata")
    canonical = [line for line in text.splitlines() if line.strip()]
    chosen = {}
    for row in selections:
        number = row["canonical_line"]
        if number in chosen or not 1 <= number <= len(canonical):
            raise ValueError("Duplicate or unknown canonical occurrence")
        if row["text"] != canonical[number - 1]:
            raise ValueError("Selected text does not match the canonical occurrence")
        if not row.get("evidence") or not row.get("part"):
            raise ValueError("Every line needs a named part and original timing evidence")
        if not (
            math.isfinite(row["start"])
            and math.isfinite(row["end"])
            and 0 <= row["start"] < row["end"] <= duration
        ):
            raise ValueError("Invalid source-clock line anchor")
        chosen[number] = dict(row)
    if set(chosen) != set(range(1, len(canonical) + 1)):
        raise ValueError("Complete export held: unplaced canonical occurrences")
    for part in {row["part"] for row in chosen.values()}:
        rows = sorted(
            (row for row in chosen.values() if row["part"] == part),
            key=lambda r: r["canonical_line"],
        )
        report = assess_lines(rows, duration)
        if not report["export_eligible"]:
            raise ValueError(f"Part {part} failed line-level timing gates: {report['issues']}")
    rows = sorted(
        chosen.values(), key=lambda row: (round(row["start"] * 100), row["canonical_line"])
    )
    output = [
        f"[ti:{title}]",
        f"[ar:{artist}]",
        "[offset:0]",
        "[re:Separate-part timing draft; manual confirmation pending]",
    ]
    for row in rows:
        minutes, remainder = divmod(round(row["start"] * 100), 6000)
        seconds, cs = divmod(remainder, 100)
        output.append(f"[{minutes:02}:{seconds:02}.{cs:02}]" + row["text"])
    return "\n".join(output) + "\n", {
        "schema": "stemlab.canonical-part-lines.v1",
        "line_count": len(rows),
        "canonical_occurrences_exact": True,
        "canonical_document_order_preserved_in_evidence": True,
        "delivery_order": "onset, then canonical occurrence ID; independent parts can overlap",
        "parts": sorted({row["part"] for row in rows}),
        "duration": duration,
        "lines": rows,
        "listening_qa": "pending",
        "accepted": False,
        "policy": "Explicit original anchors only. No interpolation, beat snapping, inferred voice separation or automatic promotion. "
        "A shared observation does not prove two independent performances.",
    }
