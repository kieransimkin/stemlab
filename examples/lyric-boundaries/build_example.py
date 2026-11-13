"""Draw the actual selections from a model-free synthetic timing fixture."""

from pathlib import Path

import numpy as np

from stemlab.lyric_boundaries import BoundaryObservation, select_boundaries
from stemlab.lyric_ctc import align_window


def build_example(path: Path):
    labels = ("-", "|", "G", "O", "N", "W")
    # "go now": two separate lexical words inside the same sung phrase.
    targets = {25: 2, 29: 3, 36: 1, 45: 4, 49: 3, 55: 5}
    emissions = np.full((73, len(labels)), -9.0)
    emissions[:, 0] = 0
    for cell, index in targets.items():
        emissions[cell, 0] = -9
        emissions[cell, index] = 0
    emissions -= np.log(np.exp(emissions).sum(axis=1, keepdims=True))
    letters = align_window(
        "go now", emissions, labels, sample_rate=16000, num_frames=24000,
        input_start_frame=0, window=(1600, 22400),
    )["words"]
    pairs = []
    for i, word in enumerate(letters):
        onset, release = word["start_frame"], word["end_frame"]
        pairs.append((
            [BoundaryObservation("letter model", "ctc", onset, .95),
             BoundaryObservation("other model", "other", onset - 320, .85),
             BoundaryObservation("speech recogniser", "attention", (4500, 10500)[i], .72)],
            [BoundaryObservation("letter model", "ctc", release, .45),
             BoundaryObservation("other model", "other", release + 1100, .9)],
        ))
    selected = select_boundaries(pairs, num_frames=24000, sample_rate=16000)
    svg = [
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 780 260" role="img" '
        'aria-label="Synthetic words on the source clock, comparing recogniser and acoustic observations">',
        '<rect width="780" height="260" fill="#101a2a" rx="16"/>',
        '<g font-family="system-ui,sans-serif" fill="#eff5fa">',
        '<text x="26" y="35" font-size="20">Two observed edges for each word</text>',
        '<text x="26" y="61" font-size="13">Synthetic evidence · the coloured marks stay on their original clock</text>',
    ]

    def x(frame):
        return 155 + frame / 24000 * 585

    for y, label in [(99, "Speech onset"), (137, "Letter evidence"), (175, "Other model"), (213, "Selected interval")]:
        svg.append(f'<text x="26" y="{y + 5}" font-size="13">{label}</text>')
        svg.append(f'<path d="M155 {y} H740" stroke="#354762"/>')
    for pair, interval, word in zip(pairs, selected, ("go", "now")):
        for row in pair:
            for obs in row:
                y, colour = {"attention": (99, "#f9a86a"), "ctc": (137, "#71e3ec"), "other": (175, "#c5abff")}[obs.family]
                svg.append(f'<circle cx="{x(obs.frame):.2f}" cy="{y}" r="5" fill="{colour}"/>')
        a, b = x(interval["onset"]["frame"]), x(interval["release"]["frame"])
        svg.append(f'<rect x="{a:.2f}" y="203" width="{b-a:.2f}" height="20" rx="6" fill="#a4eda2"/>')
        svg.append(f'<text x="{(a+b)/2:.2f}" y="218" fill="#102217" text-anchor="middle" font-size="13">{word}</text>')
    svg.append('<text x="155" y="244" font-size="12">0.0 s</text><text x="708" y="244" font-size="12">1.5 s</text></g></svg>')
    with path.open("x", encoding="utf-8", newline="\n") as stream:
        stream.write("\n".join(svg) + "\n")


if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("output", type=Path)
    build_example(parser.parse_args().output)
