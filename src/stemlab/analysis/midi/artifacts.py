"""Normalise note metadata without rewriting an upstream MIDI performance."""
from __future__ import annotations

import csv
import math
from pathlib import Path

from stemlab.util import write_json


def read_performance(path: Path, sample_rate: int, source_frames: int) -> dict:
    import pretty_midi
    if not path.is_file() or not 14 <= path.stat().st_size <= 32 * 1024 * 1024:
        raise ValueError("Backend MIDI missing, empty, or larger than 32 MiB")
    with path.open("rb") as handle:
        if handle.read(4) != b"MThd":
            raise ValueError("Backend did not produce a Standard MIDI File")
    performance = pretty_midi.PrettyMIDI(str(path))
    notes, tracks, warnings = [], [], []
    for index, instrument in enumerate(performance.instruments):
        name = instrument.name or ("Drums" if instrument.is_drum
                                   else pretty_midi.program_to_instrument_name(instrument.program))
        tracks.append({"index": index, "name": name, "program": instrument.program,
                       "is_drum": instrument.is_drum,
                       "control_changes": [{"time": float(c.time), "number": c.number, "value": c.value}
                                           for c in instrument.control_changes],
                       "pitch_bends": [{"time": float(b.time), "pitch": b.pitch}
                                       for b in instrument.pitch_bends]})
        for note in instrument.notes:
            if (not math.isfinite(note.start) or not math.isfinite(note.end)
                    or not 0 <= note.start < note.end or not 0 <= note.pitch <= 127
                    or not 0 <= note.velocity <= 127):
                raise ValueError("Backend MIDI contains invalid note data")
            start = round(note.start * sample_rate)
            end = round(note.end * sample_rate)
            notes.append({"start": float(note.start), "end": float(note.end),
                          "start_sample": start, "end_sample": end,
                          "midi_pitch": int(note.pitch), "velocity": int(note.velocity),
                          "frequency_hz": (None if instrument.is_drum else
                                           float(pretty_midi.note_number_to_hz(note.pitch))),
                          "track_index": index, "program": instrument.program,
                          "is_drum": instrument.is_drum,
                          "outside_source": start >= source_frames or end > source_frames,
                          "sub_sample_duration": start == end})
    notes.sort(key=lambda x: (x["start"], x["track_index"], x["midi_pitch"], x["end"]))
    if any(n["outside_source"] for n in notes):
        warnings.append("Some model notes extend beyond the source; preserved, not clipped or quantised")
    if any(n["sub_sample_duration"] for n in notes):
        warnings.append("Some notes round to less than one original sample frame; use their seconds values")
    if not notes:
        warnings.append("Valid MIDI but no notes were detected")
    times, tempi = performance.get_tempo_changes()
    return {"schema": "stemlab.midi-notes.v1", "sample_rate": sample_rate,
            "source_frames": source_frames, "note_count": len(notes), "notes": notes,
            "tracks": tracks, "warnings": warnings,
            "tempo_map": [{"time": float(t), "bpm": float(b)} for t, b in zip(times, tempi)],
            "time_signatures": [{"time": float(x.time), "numerator": x.numerator,
                                 "denominator": x.denominator} for x in performance.time_signature_changes],
            "timing_notes": "Seconds are decoded through the MIDI tempo map. Sample-frame estimates "
                            "use the original audio sample rate and nearest-frame rounding, start inclusive, "
                            "end exclusive. No beat quantisation or time stretching. Model MIDI tempo "
                            "is NOT a measurement of the source tempo. The native MIDI is retained unchanged."}


def save_note_artifacts(folder: Path, record: dict, make_plot: bool) -> dict[str, str]:
    write_json(folder / "notes.json", record)
    columns = ["track_index", "program", "is_drum", "start", "end", "start_sample", "end_sample",
               "midi_pitch", "velocity", "frequency_hz", "outside_source"]
    with (folder / "notes.csv").open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=columns, extrasaction="ignore")
        writer.writeheader()
        writer.writerows(record["notes"])
    files = {"midi": "transcription.mid", "notes": "notes.json", "csv": "notes.csv"}
    if make_plot:
        _piano_roll(folder / "piano-roll.png", record)
        files["piano_roll"] = "piano-roll.png"
    return files


def _piano_roll(path: Path, record: dict) -> None:
    from matplotlib.backends.backend_agg import FigureCanvasAgg
    from matplotlib.collections import LineCollection
    from matplotlib.figure import Figure
    figure = Figure(figsize=(16, 5), dpi=160)
    FigureCanvasAgg(figure)
    axes = figure.add_subplot(111)
    notes = record["notes"]
    for track in record["tracks"]:
        selected = [n for n in notes if n["track_index"] == track["index"]]
        if not selected:
            continue
        segments = [[(n["start"], n["midi_pitch"]), (n["end"], n["midi_pitch"])] for n in selected]
        # Use Matplotlib's default colour cycle; tracks remain separate.
        colour = axes._get_lines.get_next_color()
        axes.add_collection(LineCollection(segments, linewidths=2, colors=colour, label=track["name"]))
    duration = record["source_frames"] / record["sample_rate"]
    axes.set_xlim(0, max(duration, max((n["end"] for n in notes), default=0), .01))
    if notes:
        axes.set_ylim(min(n["midi_pitch"] for n in notes) - 2, max(n["midi_pitch"] for n in notes) + 2)
        axes.legend(loc="upper right", fontsize=8)
    else:
        axes.set_ylim(0, 127)
        axes.text(.5, .5, "No notes detected", transform=axes.transAxes, ha="center")
    axes.set_xlabel("Original audio timeline (seconds)")
    axes.set_ylabel("MIDI note number (drums use GM drum-note numbers)")
    axes.set_title(f"{record.get('model_title', 'Transcription')} · {len(notes):,} inferred notes")
    figure.tight_layout()
    figure.savefig(path)
    figure.clear()
