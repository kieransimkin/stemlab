from __future__ import annotations

import csv
import io
import subprocess
from dataclasses import asdict, dataclass
from pathlib import Path
from typing import Any

import numpy as np

from .util import write_json
from .vamp_runtime import ensure_vamp_runtime


@dataclass(frozen=True)
class VampAnalysisSpec:
    slug: str
    title: str
    transform: str
    target: str
    kind: str
    units: str = ""


VAMP_ANALYSES: tuple[VampAnalysisSpec, ...] = (
    VampAnalysisSpec(
        "chords",
        "Chordino chord transcription",
        "vamp:nnls-chroma:chordino:simplechord",
        "master",
        "segments",
        "chord",
    ),
    VampAnalysisSpec(
        "harmonic_change",
        "Chordino harmonic-change function",
        "vamp:nnls-chroma:chordino:harmonicchange",
        "master",
        "curve",
    ),
    VampAnalysisSpec(
        "nnls_chroma",
        "NNLS Chroma",
        "vamp:nnls-chroma:nnls-chroma:chroma",
        "master",
        "matrix",
    ),
    VampAnalysisSpec(
        "nnls_bass_chroma",
        "NNLS bass chroma",
        "vamp:nnls-chroma:nnls-chroma:basschroma",
        "master",
        "matrix",
    ),
    VampAnalysisSpec(
        "tuning",
        "Concert-pitch tuning",
        "vamp:nnls-chroma:tuning:tuning",
        "master",
        "scalar",
        "Hz",
    ),
    VampAnalysisSpec(
        "key",
        "Queen Mary key detector",
        "vamp:qm-vamp-plugins:qm-keydetector:key",
        "master",
        "scalar",
        "key",
    ),
    VampAnalysisSpec(
        "tonal_changes",
        "Queen Mary tonal-change positions",
        "vamp:qm-vamp-plugins:qm-tonalchange:changepositions",
        "master",
        "events",
    ),
    VampAnalysisSpec(
        "melody_pitch",
        "pYIN smoothed melody pitch",
        "vamp:pyin:pyin:smoothedpitchtrack",
        "melody",
        "curve",
        "Hz",
    ),
    VampAnalysisSpec(
        "melody_notes",
        "pYIN monophonic note transcription",
        "vamp:pyin:pyin:notes",
        "melody",
        "notes",
        "Hz",
    ),
    VampAnalysisSpec(
        "polyphonic_notes",
        "Silvet polyphonic note transcription",
        "vamp:silvet:silvet:notes",
        "master",
        "notes",
        "Hz",
    ),
    VampAnalysisSpec(
        "structure",
        "Segmentino structural segmentation",
        "vamp:segmentino:segmentino:segmentation",
        "master",
        "segments",
        "segment-type",
    ),
    VampAnalysisSpec(
        "vamp_beats",
        "Queen Mary Vamp beats",
        "vamp:qm-vamp-plugins:qm-barbeattracker:beats",
        "master",
        "events",
    ),
    VampAnalysisSpec(
        "vamp_bars",
        "Queen Mary Vamp bars",
        "vamp:qm-vamp-plugins:qm-barbeattracker:bars",
        "master",
        "events",
    ),
)


def parse_sonic_annotator_csv(text: str) -> list[dict[str, Any]]:
    """Parse Sonic Annotator CSV emitted with --csv-end-times --csv-fill-ends.

    The first two fields are start and end time. Remaining numeric fields are
    feature values and any non-numeric field is retained as a label. This
    generic representation covers Chordino labels, pYIN pitch/note values,
    Silvet frequency/velocity pairs and multi-bin chroma vectors.
    """
    events: list[dict[str, Any]] = []
    for row in csv.reader(io.StringIO(text)):
        if not row or not row[0].strip():
            continue
        try:
            start = float(row[0])
        except ValueError:
            continue

        end: float | None = None
        index = 1
        if len(row) > 1:
            try:
                end = float(row[1])
                index = 2
            except ValueError:
                pass

        values: list[float] = []
        labels: list[str] = []
        for field in row[index:]:
            field = field.strip()
            if not field:
                continue
            try:
                values.append(float(field))
            except ValueError:
                labels.append(field)

        events.append(
            {
                "start": start,
                "end": end,
                "values": values,
                "label": " ".join(labels).strip(),
            }
        )
    return events


def _run_annotator(
    annotator: Path,
    transform: str,
    source: Path,
    transform_path: Path,
) -> str:
    skeleton = subprocess.run(
        [str(annotator), "-s", transform],
        check=True,
        text=True,
        capture_output=True,
    )
    transform_path.parent.mkdir(parents=True, exist_ok=True)
    transform_path.write_text(skeleton.stdout, encoding="utf-8")

    proc = subprocess.run(
        [
            str(annotator),
            "-t",
            str(transform_path),
            "-w",
            "csv",
            "--csv-stdout",
            "--csv-omit-filenames",
            "--csv-end-times",
            "--csv-fill-ends",
            str(source),
        ],
        check=True,
        text=True,
        capture_output=True,
    )
    return proc.stdout


def _save_npz(path: Path, events: list[dict[str, Any]]) -> Path:
    path.parent.mkdir(parents=True, exist_ok=True)
    starts = np.asarray([float(event["start"]) for event in events], dtype=np.float64)
    ends = np.asarray(
        [
            float(event["end"]) if event.get("end") is not None else np.nan
            for event in events
        ],
        dtype=np.float64,
    )
    width = max((len(event.get("values", [])) for event in events), default=0)
    values = np.full((len(events), width), np.nan, dtype=np.float32)
    for row, event in enumerate(events):
        vals = event.get("values", [])
        if vals:
            values[row, : len(vals)] = np.asarray(vals, dtype=np.float32)
    labels = np.asarray([event.get("label", "") for event in events], dtype=str)
    np.savez_compressed(
        path,
        start_seconds=starts,
        end_seconds=ends,
        values=values,
        labels=labels,
    )
    return path


def _plot_analysis(
    spec: VampAnalysisSpec,
    events: list[dict[str, Any]],
    path: Path,
) -> Path | None:
    if spec.kind not in {"curve", "matrix"} or not events:
        return None

    import matplotlib

    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    path.parent.mkdir(parents=True, exist_ok=True)
    times = np.asarray([event["start"] for event in events], dtype=float)
    widths = [len(event.get("values", [])) for event in events]
    if not widths or max(widths, default=0) == 0:
        return None

    fig = plt.figure(figsize=(16, 5), dpi=150)
    ax = fig.add_subplot(111)

    if spec.kind == "curve":
        values = np.asarray(
            [event["values"][0] if event.get("values") else np.nan for event in events],
            dtype=float,
        )
        finite = np.isfinite(values)
        if spec.slug == "melody_pitch":
            finite &= values > 0
        ax.plot(times[finite], values[finite])
        ax.set_ylabel(spec.units or "Value")
        ax.set_xlabel("Time (s)")
        ax.set_title(spec.title)
    else:
        width = max(widths)
        matrix = np.full((len(events), width), np.nan, dtype=float)
        for i, event in enumerate(events):
            vals = event.get("values", [])
            matrix[i, : len(vals)] = vals
        end_time = float(times[-1]) if len(times) else 0.0
        ax.imshow(
            matrix.T,
            origin="lower",
            aspect="auto",
            extent=[float(times[0]), end_time, 0, width],
            interpolation="nearest",
        )
        if width == 12:
            pitch_classes = ["A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab"]
            ax.set_yticks(np.arange(12) + 0.5, labels=pitch_classes)
        ax.set_ylabel("Pitch class / bin")
        ax.set_xlabel("Time (s)")
        ax.set_title(spec.title)

    fig.tight_layout()
    fig.savefig(path)
    plt.close(fig)
    return path


def run_vamp_analysis(
    master: Path,
    melody_source: Path | None,
    output_dir: Path,
    *,
    bootstrap_external: bool = True,
) -> dict[str, Any]:
    """Run the curated Vamp melody/harmony/structure analysis suite.

    Melody-specific pYIN transforms are run on StemLab's preferred separated
    vocal stem. They are skipped when no vocal stem is available because pYIN
    is a monophonic estimator and applying it blindly to a dense master mix is
    misleading.
    """
    output_dir.mkdir(parents=True, exist_ok=True)
    runtime = ensure_vamp_runtime(install_annotator=bootstrap_external)

    transforms_dir = output_dir / "transforms"
    raw_dir = output_dir / "raw"
    data_dir = output_dir / "data"
    plots_dir = output_dir / "plots"
    for directory in (transforms_dir, raw_dir, data_dir, plots_dir):
        directory.mkdir(parents=True, exist_ok=True)

    analyses: list[dict[str, Any]] = []
    missing: list[str] = []
    skipped: list[dict[str, str]] = []
    errors: list[dict[str, str]] = []

    for spec in VAMP_ANALYSES:
        if spec.transform not in runtime.available_outputs:
            missing.append(spec.transform)
            continue

        if spec.target == "melody":
            if melody_source is None:
                skipped.append(
                    {
                        "slug": spec.slug,
                        "reason": "no separated vocal stem available for monophonic pYIN",
                    }
                )
                continue
            source = melody_source
        else:
            source = master

        transform_path = transforms_dir / f"{spec.slug}.n3"
        raw_path = raw_dir / f"{spec.slug}.csv"
        json_path = data_dir / f"{spec.slug}.json"
        npz_path = data_dir / f"{spec.slug}.npz"
        plot_path = plots_dir / f"{spec.slug}.png"

        try:
            raw = _run_annotator(runtime.annotator, spec.transform, source, transform_path)
            raw_path.write_text(raw, encoding="utf-8")
            events = parse_sonic_annotator_csv(raw)
            _save_npz(npz_path, events)
            png = _plot_analysis(spec, events, plot_path)
            record: dict[str, Any] = {
                **asdict(spec),
                "source_audio": str(source),
                "event_count": len(events),
                "events": events,
                "files": {
                    "transform": str(transform_path),
                    "csv": str(raw_path),
                    "json": str(json_path),
                    "npz": str(npz_path),
                    "png": str(png) if png else None,
                },
            }
            write_json(json_path, {k: v for k, v in record.items() if k != "files"} | {"files": record["files"]})
            analyses.append(record)
        except Exception as exc:
            errors.append(
                {
                    "slug": spec.slug,
                    "transform": spec.transform,
                    "type": type(exc).__name__,
                    "message": str(exc),
                }
            )

    if not analyses and missing:
        raise RuntimeError(
            "Sonic Annotator is available, but none of StemLab's Vamp Plugin Pack "
            "analysis outputs were found. Run `stemlab bootstrap vamp`, complete "
            "the official plugin installer, then retry."
        )

    report = {
        "sonic_annotator": str(runtime.annotator),
        "available_output_count": len(runtime.available_outputs),
        "melody_source": str(melody_source) if melody_source else None,
        "missing_outputs": missing,
        "skipped": skipped,
        "errors": errors,
        "analyses": [
            {
                **{k: v for k, v in analysis.items() if k not in {"events", "files"}},
                "files": analysis["files"],
            }
            for analysis in analyses
        ],
    }
    write_json(output_dir / "report.json", report)

    return {
        **report,
        "report_path": str(output_dir / "report.json"),
        "analyses": analyses,
    }
