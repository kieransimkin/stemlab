"""Public-safe native separate-part example; no audio or model inference."""

import argparse
import json
from pathlib import Path
from stemlab.lyric_parts import assemble_lines

parser = argparse.ArgumentParser()
parser.add_argument("--output", type=Path, required=True)
args = parser.parse_args()
args.output.mkdir(parents=True, exist_ok=False)
text = "A bright shore\nKeep moving\nA soft echo\n"
rows = [
    dict(
        canonical_line=1,
        text="A bright shore",
        start=1,
        end=2.2,
        part="lead",
        evidence={"kind": "synthetic fixture"},
    ),
    dict(
        canonical_line=2,
        text="Keep moving",
        start=3,
        end=4,
        part="lead",
        evidence={"kind": "synthetic fixture"},
    ),
    dict(
        canonical_line=3,
        text="A soft echo",
        start=1.5,
        end=3.5,
        part="backing",
        evidence={"kind": "synthetic fixture"},
    ),
]
lrc, report = assemble_lines(text, rows, 5, title="Synthetic observations", artist="StemLab test")
(args.output / "lyrics.lrc").write_text(lrc, encoding="utf-8")
(args.output / "evidence.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="240" viewBox="0 0 800 240">',
    '<rect width="800" height="240" fill="#151426"/>',
    '<g fill="#f4edf7" font-family="sans-serif" font-size="18"><text x="24" y="32">Actual synthetic native output: separate parts retain overlap</text></g>',
]
for row in report["lines"]:
    y = 65 if row["part"] == "lead" else 140
    x = 130 + row["start"] * 120
    width = (row["end"] - row["start"]) * 120
    colour = "#ec83c1" if row["part"] == "lead" else "#80cbdc"
    svg.append(f'<rect x="{x}" y="{y}" width="{width}" height="38" rx="6" fill="{colour}"/>')
    svg.append(
        f'<text x="{x + 5}" y="{y + 24}" fill="#161125" font-family="sans-serif" font-size="15">{row["text"]}</text>'
    )
svg += [
    '<g fill="#f4edf7" font-family="sans-serif" font-size="16"><text x="24" y="90">Lead</text><text x="24" y="165">Backing</text><text x="24" y="220">No interpolation or shifting; test observations are not measured singing.</text></g>',
    "</svg>",
]
(args.output / "lyric-parts-selection.svg").write_text("\n".join(svg) + "\n", encoding="utf-8")
