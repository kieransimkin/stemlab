"""Sonic Visualiser session generation and launch helpers."""

from __future__ import annotations

import bz2
import os
import xml.etree.ElementTree as ET
from pathlib import Path

import numpy as np

from .audio import audio_info
from .models import MODEL_REGISTRY
from .types import BeatResult, StemArtifact


def _rel(path: Path, base: Path) -> str:
    return Path(os.path.relpath(path.resolve(), base.resolve())).as_posix()


def _layer(parent, **attrs):
    return ET.SubElement(parent, "layer", {k: str(v) for k, v in attrs.items()})


def _canonicalise_session_layers(data, display) -> None:
    """Convert inline layer definitions to Sonic Visualiser session layout.

    Sonic Visualiser session files define each layer once inside ``<data>`` and
    then reference that layer by id from one or more ``<view>`` elements.  SV's
    reader can create a layer on the fly when it encounters an undefined layer
    inside a view, but that is a compatibility fallback rather than the format
    written by Sonic Visualiser itself.  Sparse annotation layers such as beat
    instants and regions are more reliable when written canonically.
    """
    definitions: list[dict[str, str]] = []
    seen_ids: set[str] = set()

    for view in display.findall("view"):
        # Required by SVFileReader::readView.
        view.set("centreLineVisible", view.get("centreLineVisible", "1"))

        for layer in view.findall("layer"):
            attrs = dict(layer.attrib)
            layer_id = attrs.get("id")
            if not layer_id:
                continue

            if layer_id not in seen_ids:
                definition = dict(attrs)
                definition.pop("visible", None)
                if definition.get("name") and not definition.get("presentationName"):
                    definition["presentationName"] = definition["name"]
                definitions.append(definition)
                seen_ids.add(layer_id)

            # A view contains a lightweight reference to an already-defined
            # layer.  Keep the identifying fields for readability.
            reference = {
                key: attrs[key]
                for key in ("id", "type", "name", "model")
                if key in attrs
            }
            reference["visible"] = "true"
            layer.attrib.clear()
            layer.attrib.update(reference)

    # SVFileReader requires all models to appear before the first layer.
    # Appending definitions here guarantees that all model/dataset elements
    # emitted during construction precede the layer definitions.
    for attrs in definitions:
        ET.SubElement(data, "layer", attrs)


def _pretty_model(model: str) -> str:
    if model == "speech":
        return "Speech / Whisper"
    if model == "consensus":
        return "Consensus"
    spec = MODEL_REGISTRY.get(model)
    if spec is not None:
        return spec.display_name
    return model.replace("_", " ").strip().title()


def _pretty_stem(stem: str) -> str:
    return stem.replace("_", " ").strip()


def _add_timeinstants_model(
    data,
    *,
    model_id: int,
    dataset_id: int,
    name: str,
    sample_rate: int,
    times: list[float],
    labels: list[str] | None = None,
) -> None:
    ET.SubElement(data, "model", {
        "id": str(model_id),
        "name": name,
        "sampleRate": str(sample_rate),
        "type": "sparse",
        "dimensions": "1",
        "resolution": "1",
        "notifyOnAdd": "true",
        "dataset": str(dataset_id),
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "1"})
    labels = labels or [""] * len(times)
    for t, label in zip(times, labels):
        ET.SubElement(ds, "point", {
            "frame": str(int(round(float(t) * sample_rate))),
            "label": str(label),
        })


def _add_text_model(
    data,
    *,
    model_id: int,
    dataset_id: int,
    name: str,
    sample_rate: int,
    text: str,
) -> None:
    """Add a Sonic Visualiser TextModel for prominent diagnostics."""
    ET.SubElement(data, "model", {
        "id": str(model_id),
        "name": name,
        "sampleRate": str(sample_rate),
        "type": "sparse",
        "dimensions": "2",
        "resolution": "1",
        "notifyOnAdd": "true",
        "dataset": str(dataset_id),
        "subtype": "text",
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "2"})
    ET.SubElement(ds, "point", {
        "frame": "0",
        "height": "0.5",
        "label": text,
    })


def _add_timevalues_model(
    data,
    *,
    model_id: int,
    dataset_id: int,
    name: str,
    sample_rate: int,
    points: list[tuple[float, float, str]],
    units: str = "",
) -> bool:
    finite = [(t, v, label) for t, v, label in points if np.isfinite(v)]
    if not finite:
        return False
    values = [value for _time, value, _label in finite]
    ET.SubElement(data, "model", {
        "id": str(model_id),
        "name": name,
        "sampleRate": str(sample_rate),
        "type": "sparse",
        "dimensions": "2",
        "resolution": "1",
        "notifyOnAdd": "true",
        "dataset": str(dataset_id),
        "minimum": str(float(min(values))),
        "maximum": str(float(max(values))),
        "units": units,
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "2"})
    for time_s, value, label in finite:
        ET.SubElement(ds, "point", {
            "frame": str(int(round(float(time_s) * sample_rate))),
            "value": str(float(value)),
            "label": str(label),
        })
    return True


def _event_end(events: list[dict], index: int, default_duration: float = 0.5) -> float:
    event = events[index]
    start = float(event.get("start", 0.0))
    end = event.get("end")
    if end is not None and np.isfinite(float(end)) and float(end) > start:
        return float(end)
    if index + 1 < len(events):
        next_start = float(events[index + 1].get("start", start))
        if next_start > start:
            return next_start
    return start + default_duration


def _add_regions_model(
    data,
    *,
    model_id: int,
    dataset_id: int,
    name: str,
    sample_rate: int,
    events: list[dict],
    units: str,
) -> bool:
    if not events:
        return False
    labels: dict[str, int] = {}
    region_values: list[float] = []
    for event in events:
        values = event.get("values") or []
        label = str(event.get("label") or "").strip()
        if values:
            value = float(values[0])
        else:
            if label not in labels:
                labels[label] = len(labels) + 1
            value = float(labels[label])
        region_values.append(value)
    ET.SubElement(data, "model", {
        "id": str(model_id),
        "name": name,
        "sampleRate": str(sample_rate),
        "type": "sparse",
        "dimensions": "3",
        "resolution": "1",
        "notifyOnAdd": "true",
        "dataset": str(dataset_id),
        "subtype": "region",
        "valueQuantization": "0",
        "minimum": str(float(min(region_values))),
        "maximum": str(float(max(region_values))),
        "units": units,
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "3"})
    for index, event in enumerate(events):
        start = float(event.get("start", 0.0))
        end = _event_end(events, index)
        label = str(event.get("label") or "").strip()
        if not label and event.get("values"):
            label = str(event["values"][0])
        ET.SubElement(ds, "point", {
            "frame": str(int(round(start * sample_rate))),
            "value": str(region_values[index]),
            "duration": str(max(1, int(round((end - start) * sample_rate)))),
            "label": label,
        })
    return True


def _note_name(frequency: float) -> str:
    if not np.isfinite(frequency) or frequency <= 0:
        return ""
    midi = int(round(69.0 + 12.0 * np.log2(float(frequency) / 440.0)))
    names = ("C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B")
    return f"{names[midi % 12]}{midi // 12 - 1}"


def _add_notes_model(
    data,
    *,
    model_id: int,
    dataset_id: int,
    name: str,
    sample_rate: int,
    events: list[dict],
) -> bool:
    usable = [
        event
        for event in events
        if event.get("values")
        and np.isfinite(float(event["values"][0]))
        and float(event["values"][0]) > 0
    ]
    if not usable:
        return False
    frequencies = [float(event["values"][0]) for event in usable]
    ET.SubElement(data, "model", {
        "id": str(model_id),
        "name": name,
        "sampleRate": str(sample_rate),
        "type": "sparse",
        "dimensions": "3",
        "resolution": "1",
        "notifyOnAdd": "true",
        "dataset": str(dataset_id),
        "subtype": "note",
        "valueQuantization": "0",
        "minimum": str(min(frequencies)),
        "maximum": str(max(frequencies)),
        "units": "Hz",
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "3"})
    for index, event in enumerate(usable):
        start = float(event.get("start", 0.0))
        end = event.get("end")
        if end is None or not np.isfinite(float(end)) or float(end) <= start:
            end = start + 0.1
        frequency = float(event["values"][0])
        velocity = float(event["values"][1]) if len(event["values"]) > 1 else 100.0
        level = min(1.0, max(0.0, velocity / 127.0))
        label = str(event.get("label") or "").strip() or _note_name(frequency)
        ET.SubElement(ds, "point", {
            "frame": str(int(round(start * sample_rate))),
            "value": str(frequency),
            "duration": str(max(1, int(round((float(end) - start) * sample_rate)))),
            "level": str(level),
            "label": label,
        })
    return True


def _qm_key_label(events: list[dict]) -> str | None:
    if not events:
        return None
    event = events[0]
    label = str(event.get("label") or "").strip()
    if label:
        return label
    values = event.get("values") or []
    if not values:
        return None
    value = int(round(float(values[0])))
    pitch_classes = ("C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B")
    if 1 <= value <= 12:
        return f"{pitch_classes[value - 1]} major"
    if 13 <= value <= 24:
        return f"{pitch_classes[value - 13]} minor"
    return str(value)


def _beat_position_labels(beats: list[float], downbeats: list[float], tolerance: float = 0.09) -> list[str]:
    if not beats:
        return []
    down = np.asarray(downbeats, dtype=float)
    position: int | None = None
    labels: list[str] = []
    for beat in beats:
        is_downbeat = bool(len(down) and np.min(np.abs(down - float(beat))) <= tolerance)
        if is_downbeat:
            position = 1
            labels.append("★ 1")
        elif position is None:
            labels.append("beat")
        else:
            position += 1
            labels.append(str(position))
    return labels


def _support_labels(result: BeatResult, positions: list[str]) -> tuple[list[str], list[int]]:
    sources = result.metadata.get("sources", [])
    n_sources = max(1, len(sources))
    support_events = result.metadata.get("beat_support", [])
    labels: list[str] = []
    support_values: list[int] = []
    for i, beat in enumerate(result.beats):
        best = None
        if support_events:
            best = min(support_events, key=lambda event: abs(float(event["time"]) - float(beat)))
            if abs(float(best["time"]) - float(beat)) > 0.02:
                best = None
        support = int(best.get("support", n_sources) if best else n_sources)
        models = best.get("models", sources) if best else sources
        detector_text = ", ".join(str(m) for m in models)
        position = positions[i] if i < len(positions) else "beat"
        labels.append(f"{position} • {support}/{n_sources} detectors • {detector_text}")
        support_values.append(support)
    return labels, support_values


def build_session(
    session_dir: Path,
    master: Path,
    stems: list[StemArtifact],
    beats: list[BeatResult],
    whisper: dict | None = None,
    *,
    vamp: dict | None = None,
) -> tuple[Path, Path]:
    """Create a strongly-labelled Sonic Visualiser analysis workspace.

    The session deliberately separates overview, detector comparison, consensus
    beat grid, speech/words, and individual stem views so it is always obvious
    what each pane and layer represents.
    """
    session_dir.mkdir(parents=True, exist_ok=True)
    root = ET.Element("sv")
    data = ET.SubElement(root, "data")
    display = ET.SubElement(root, "display")
    selections = ET.SubElement(root, "selections")

    # (model_id, model_slug, stem_name, path, display_label)
    audio_models: list[tuple[int, str, str, Path, str]] = []
    master_label = f"MASTER • Original mix • {master.name}"
    all_audio = [("master", "original_mix", master, master_label)] + [
        (
            s.model,
            s.stem,
            s.path,
            f"STEM • {_pretty_model(s.model)} • {_pretty_stem(s.stem)}",
        )
        for s in stems
    ]
    for idx, (model_slug, stem_name, path, display_label) in enumerate(all_audio):
        info = audio_info(path)
        ET.SubElement(data, "model", {
            "id": str(idx),
            "name": display_label,
            "sampleRate": str(info["sample_rate"]),
            "type": "wavefile",
            "file": _rel(path, session_dir),
            "mainModel": "true" if idx == 0 else "false",
        })
        audio_models.append((idx, model_slug, stem_name, path, display_label))

    next_layer = 1000
    master_sr = audio_info(master)["sample_rate"]
    dataset_id = 10000

    # Clean master overview: no annotation pile-up obscuring the spectrogram.
    master_pane = ET.SubElement(display, "view", {
        "centre": "0",
        "zoom": "1024",
        "followPan": "1",
        "followZoom": "1",
        "tracking": "page",
        "type": "pane",
        "name": "MASTER • Original mix overview",
    })
    _layer(
        master_pane,
        id=next_layer,
        type="waveform",
        name=f"MASTER • Waveform • {master.name}",
        model=0,
        channel=-1,
        gain=1,
        pan=0,
    )
    next_layer += 1
    _layer(
        master_pane,
        id=next_layer,
        type="spectrogram",
        name=f"MASTER • Spectrogram • {master.name}",
        model=0,
        channel=-1,
        windowSize=2048,
        windowHopLevel=2,
        gain=1,
        threshold=0,
        minFrequency=0,
        maxFrequency=0,
        colourScale=0,
        colourMap=0,
        colourRotation=0,
        frequencyScale=0,
        binScale=0,
    )
    next_layer += 1

    detector_results = [br for br in beats if br.model != "consensus"]
    consensus = next((br for br in beats if br.model == "consensus"), None)

    # Do not let a detector failure look like a rendering failure.  If no beat
    # events reached the session, make that fact visible inside Sonic Visualiser.
    have_beat_events = any(br.beats for br in detector_results)
    if consensus is not None and consensus.beats:
        have_beat_events = True

    if not have_beat_events:
        diagnostic_model_id = dataset_id
        diagnostic_ds_id = dataset_id + 1
        dataset_id += 2
        _add_text_model(
            data,
            model_id=diagnostic_model_id,
            dataset_id=diagnostic_ds_id,
            name="BEAT DIAGNOSTIC • no beat events available",
            sample_rate=master_sr,
            text=(
                "NO BEAT EVENTS WERE PASSED TO SONIC VISUALISER — "
                "check beats/*.json and analysis.json for detector errors"
            ),
        )
        diagnostic_pane = ET.SubElement(display, "view", {
            "centre": "0",
            "zoom": "1024",
            "followPan": "1",
            "followZoom": "1",
            "tracking": "page",
            "type": "pane",
            "name": "BEATS • DIAGNOSTIC • no events produced",
        })
        _layer(
            diagnostic_pane,
            id=next_layer,
            type="text",
            name="⚠ BEATS • NO EVENTS • see analysis.json",
            model=diagnostic_model_id,
            colourName="Red",
            colour="#ff3050",
            darkBackground="false",
        )
        next_layer += 1

    # Keep raw detector hypotheses in their own comparison pane.
    if detector_results:
        comparison_pane = ET.SubElement(display, "view", {
            "centre": "0",
            "zoom": "1024",
            "followPan": "1",
            "followZoom": "1",
            "tracking": "page",
            "type": "pane",
            "name": "BEATS • Individual detector hypotheses",
        })
        _layer(
            comparison_pane,
            id=next_layer,
            type="waveform",
            name=f"REFERENCE • Master waveform for beat comparison • {master.name}",
            model=0,
            channel=-1,
            gain=0.7,
            pan=0,
        )
        next_layer += 1
        colours = [
            ("Orange", "#ff8000"),
            ("Purple", "#c832ff"),
            ("Blue", "#0080ff"),
        ]
        for index, br in enumerate(detector_results):
            pretty = _pretty_model(br.model)
            colour_name, colour = colours[index % len(colours)]
            for kind, times in (("beats", br.beats), ("downbeats", br.downbeats)):
                model_id = dataset_id
                ds_id = dataset_id + 1
                dataset_id += 2
                singular = "beat" if kind == "beats" else "downbeat"
                _add_timeinstants_model(
                    data,
                    model_id=model_id,
                    dataset_id=ds_id,
                    name=f"{pretty} • {kind} • raw detector hypothesis",
                    sample_rate=master_sr,
                    times=times,
                    labels=[f"{pretty} {singular}"] * len(times),
                )
                layer_colour_name = colour_name if kind == "beats" else "Red"
                layer_colour = colour if kind == "beats" else "#ff3050"
                _layer(
                    comparison_pane,
                    id=next_layer,
                    type="timeinstants",
                    name=f"{pretty} • {kind.upper()} • individual hypothesis",
                    model=model_id,
                    plotStyle=0,
                    colourName=layer_colour_name,
                    colour=layer_colour,
                )
                next_layer += 1

    # Special high-visibility final guess: a dedicated consensus pane with a
    # region strip spanning every inter-beat interval.  Each block is labelled
    # with beat position (when a consensus downbeat exists) and detector vote
    # count.  This is materially easier to read than three superimposed tick
    # tracks and makes the chosen beat-matching result explicit.
    if consensus is not None and consensus.beats:
        tempo_text = f" • {consensus.tempo_bpm:.2f} BPM" if consensus.tempo_bpm else ""
        consensus_pane = ET.SubElement(display, "view", {
            "centre": "0",
            "zoom": "1024",
            "followPan": "1",
            "followZoom": "1",
            "tracking": "page",
            "type": "pane",
            "name": f"★ BEAT CONSENSUS • majority-vote final guess{tempo_text}",
        })
        _layer(
            consensus_pane,
            id=next_layer,
            type="waveform",
            name=f"REFERENCE • Master waveform beneath consensus grid • {master.name}",
            model=0,
            channel=-1,
            gain=0.55,
            pan=0,
        )
        next_layer += 1

        positions = _beat_position_labels(consensus.beats, consensus.downbeats)
        beat_labels, support_values = _support_labels(consensus, positions)
        n_sources = max(1, len(consensus.metadata.get("sources", [])))

        region_model_id = dataset_id
        region_ds_id = dataset_id + 1
        dataset_id += 2
        ET.SubElement(data, "model", {
            "id": str(region_model_id),
            "name": "★ Consensus beat grid • inter-beat regions coloured by detector agreement",
            "sampleRate": str(master_sr),
            "type": "sparse",
            "dimensions": "3",
            "resolution": "1",
            "notifyOnAdd": "true",
            "dataset": str(region_ds_id),
            "subtype": "region",
            "valueQuantization": "1",
            "minimum": "1",
            "maximum": str(n_sources),
            "units": "detector-votes",
        })
        region_ds = ET.SubElement(data, "dataset", {"id": str(region_ds_id), "dimensions": "3"})
        for i, beat in enumerate(consensus.beats[:-1]):
            start_frame = int(round(float(beat) * master_sr))
            end_frame = int(round(float(consensus.beats[i + 1]) * master_sr))
            ET.SubElement(region_ds, "point", {
                "frame": str(start_frame),
                "value": str(support_values[i]),
                "duration": str(max(1, end_frame - start_frame)),
                "label": beat_labels[i],
            })
        _layer(
            consensus_pane,
            id=next_layer,
            type="regions",
            name="★ FINAL BEAT GRID • block label = beat position + detector agreement",
            model=region_model_id,
            verticalScale=1,
            plotStyle=1,
            fillColourMap="Green",
            colourMap=0,
            colourName="Green",
            colour="#00d084",
            darkBackground="false",
        )
        next_layer += 1

        beat_model_id = dataset_id
        beat_ds_id = dataset_id + 1
        dataset_id += 2
        _add_timeinstants_model(
            data,
            model_id=beat_model_id,
            dataset_id=beat_ds_id,
            name="★ Consensus beats • majority-vote median timestamps",
            sample_rate=master_sr,
            times=consensus.beats,
            labels=beat_labels,
        )
        _layer(
            consensus_pane,
            id=next_layer,
            type="timeinstants",
            name="★ CONSENSUS BEAT TICKS • final timing guess",
            model=beat_model_id,
            plotStyle=0,
            colourName="Green",
            colour="#00ff90",
        )
        next_layer += 1

        if consensus.downbeats:
            down_model_id = dataset_id
            down_ds_id = dataset_id + 1
            dataset_id += 2
            _add_timeinstants_model(
                data,
                model_id=down_model_id,
                dataset_id=down_ds_id,
                name="★ Consensus downbeats • bar anchors",
                sample_rate=master_sr,
                times=consensus.downbeats,
                labels=["★ DOWNBEAT / BAR ANCHOR"] * len(consensus.downbeats),
            )
            _layer(
                consensus_pane,
                id=next_layer,
                type="timeinstants",
                name="★ CONSENSUS DOWNBEATS • bar anchors",
                model=down_model_id,
                plotStyle=0,
                colourName="Purple",
                colour="#ff30ff",
            )
            next_layer += 1

    if whisper and whisper.get("words"):
        speech_model_id = next((mid for mid, slug, _stem, _path, _label in audio_models if slug == "speech"), 0)
        speech_reference = "spoken-word VAD stem" if speech_model_id else "master"
        words_pane = ET.SubElement(display, "view", {
            "centre": "0",
            "zoom": "1024",
            "followPan": "1",
            "followZoom": "1",
            "tracking": "page",
            "type": "pane",
            "name": "SPEECH • Whisper word timing",
        })
        _layer(
            words_pane,
            id=next_layer,
            type="waveform",
            name=f"REFERENCE • {speech_reference} waveform for Whisper words",
            model=speech_model_id,
            channel=-1,
            gain=0.8,
            pan=0,
        )
        next_layer += 1

        model_id = dataset_id
        ds_id = dataset_id + 1
        dataset_id += 2
        word_times = [float(w["start"]) for w in whisper["words"]]
        word_labels = [str(w["word"]).strip() for w in whisper["words"]]
        _add_timeinstants_model(
            data,
            model_id=model_id,
            dataset_id=ds_id,
            name="Whisper • word start timestamps",
            sample_rate=master_sr,
            times=word_times,
            labels=word_labels,
        )
        _layer(
            words_pane,
            id=next_layer,
            type="timeinstants",
            name="Whisper • WORD STARTS • label = recognised word",
            model=model_id,
            plotStyle=0,
            colourName="Green",
            colour="#00a060",
        )
        next_layer += 1

    # Vamp Plugin Pack feature layers. The raw CSV, JSON, NPZ and plot files
    # are also kept under output/vamp; these panes expose the most useful
    # musical interpretations directly in the synchronized SV workspace.
    vamp_analyses = {
        str(item.get("slug")): item
        for item in (vamp or {}).get("analyses", [])
        if item.get("slug")
    }

    harmony_slugs = {"chords", "harmonic_change", "key", "tuning", "tonal_changes"}
    if harmony_slugs.intersection(vamp_analyses):
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane",
            "name": "HARMONY • Vamp Chordino / key / tonal change",
        })
        _layer(
            pane, id=next_layer, type="waveform",
            name=f"REFERENCE • Master waveform for harmony • {master.name}",
            model=0, channel=-1, gain=0.55, pan=0,
        )
        next_layer += 1

        summary: list[str] = []
        key_analysis = vamp_analyses.get("key")
        if key_analysis:
            key_label = _qm_key_label(key_analysis.get("events", []))
            if key_label:
                summary.append(f"Estimated key: {key_label}")
        tuning_analysis = vamp_analyses.get("tuning")
        if tuning_analysis and tuning_analysis.get("events"):
            event = tuning_analysis["events"][0]
            if event.get("values"):
                summary.append(f"Concert pitch: {float(event['values'][0]):.2f} Hz")
            elif event.get("label"):
                summary.append(f"Tuning: {event['label']}")
        if summary:
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            _add_text_model(
                data, model_id=model_id, dataset_id=ds_id,
                name="HARMONY • key and tuning summary", sample_rate=master_sr,
                text=" • ".join(summary),
            )
            _layer(
                pane, id=next_layer, type="text",
                name="HARMONY • KEY / TUNING SUMMARY", model=model_id,
                colourName="Purple", colour="#a050ff", darkBackground="false",
            )
            next_layer += 1

        chord_analysis = vamp_analyses.get("chords")
        if chord_analysis:
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            if _add_regions_model(
                data, model_id=model_id, dataset_id=ds_id,
                name="HARMONY • Chordino chord transcription",
                sample_rate=master_sr, events=chord_analysis.get("events", []),
                units="chord",
            ):
                _layer(
                    pane, id=next_layer, type="regions",
                    name="HARMONY • CHORDS • Chordino", model=model_id,
                    verticalScale=1, plotStyle=1, fillColourMap="Magma",
                    colourMap=0, colourName="Orange", colour="#ff9632",
                    darkBackground="false",
                )
                next_layer += 1

        harmonic_analysis = vamp_analyses.get("harmonic_change")
        if harmonic_analysis:
            points = [
                (
                    float(event.get("start", 0.0)),
                    float(event["values"][0]),
                    "",
                )
                for event in harmonic_analysis.get("events", [])
                if event.get("values")
            ]
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            if _add_timevalues_model(
                data, model_id=model_id, dataset_id=ds_id,
                name="HARMONY • harmonic-change likelihood",
                sample_rate=master_sr, points=points,
            ):
                _layer(
                    pane, id=next_layer, type="timevalues",
                    name="HARMONY • HARMONIC CHANGE FUNCTION", model=model_id,
                    plotStyle=2, verticalScale=0, scaleMinimum=0, scaleMaximum=1,
                    drawDivisions="true", fillSegments="false",
                    colourName="Blue", colour="#2080ff", darkBackground="false",
                )
                next_layer += 1

        tonal_analysis = vamp_analyses.get("tonal_changes")
        if tonal_analysis:
            times = [float(event.get("start", 0.0)) for event in tonal_analysis.get("events", [])]
            if times:
                model_id, ds_id = dataset_id, dataset_id + 1
                dataset_id += 2
                _add_timeinstants_model(
                    data, model_id=model_id, dataset_id=ds_id,
                    name="HARMONY • tonal change positions",
                    sample_rate=master_sr, times=times,
                    labels=["TONAL CHANGE"] * len(times),
                )
                _layer(
                    pane, id=next_layer, type="timeinstants",
                    name="HARMONY • TONAL CHANGE POSITIONS", model=model_id,
                    plotStyle=0, colourName="Red", colour="#ff3050",
                )
                next_layer += 1

    chroma_analysis = vamp_analyses.get("nnls_chroma")
    if chroma_analysis and chroma_analysis.get("events"):
        chroma_events = chroma_analysis["events"]
        if any(len(event.get("values") or []) >= 12 for event in chroma_events):
            pane = ET.SubElement(display, "view", {
                "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
                "tracking": "page", "type": "pane",
                "name": "HARMONY • NNLS chroma pitch-class strengths",
            })
            pitch_classes = ("A", "Bb", "B", "C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab")
            colours = (
                ("Red", "#ff3050"), ("Orange", "#ff9632"), ("Green", "#00a060"),
                ("Blue", "#2080ff"), ("Purple", "#a050ff"), ("Black", "#202020"),
            )
            for pitch_index, pitch_class in enumerate(pitch_classes):
                points = [
                    (
                        float(event.get("start", 0.0)),
                        float(event["values"][pitch_index]),
                        pitch_class,
                    )
                    for event in chroma_events
                    if len(event.get("values") or []) > pitch_index
                ]
                model_id, ds_id = dataset_id, dataset_id + 1
                dataset_id += 2
                if _add_timevalues_model(
                    data, model_id=model_id, dataset_id=ds_id,
                    name=f"HARMONY • NNLS chroma • {pitch_class}",
                    sample_rate=master_sr, points=points, units="strength",
                ):
                    colour_name, colour = colours[pitch_index % len(colours)]
                    _layer(
                        pane, id=next_layer, type="timevalues",
                        name=f"CHROMA • {pitch_class}", model=model_id,
                        plotStyle=2, verticalScale=0,
                        drawDivisions="false", fillSegments="false",
                        colourName=colour_name, colour=colour, darkBackground="false",
                    )
                    next_layer += 1

    melody_pitch = vamp_analyses.get("melody_pitch")
    melody_notes = vamp_analyses.get("melody_notes")
    if melody_pitch or melody_notes:
        melody_model_id = next(
            (
                mid for mid, slug, stem, _path, _label in audio_models
                if slug != "speech" and "vocal" in stem.lower()
            ),
            0,
        )
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane",
            "name": "MELODY • pYIN pitch contour and note transcription",
        })
        _layer(
            pane, id=next_layer, type="waveform",
            name="REFERENCE • separated vocal stem for pYIN melody",
            model=melody_model_id, channel=-1, gain=0.65, pan=0,
        )
        next_layer += 1

        if melody_pitch:
            points = [
                (
                    float(event.get("start", 0.0)),
                    float(event["values"][0]),
                    _note_name(float(event["values"][0])),
                )
                for event in melody_pitch.get("events", [])
                if event.get("values") and float(event["values"][0]) > 0
            ]
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            if _add_timevalues_model(
                data, model_id=model_id, dataset_id=ds_id,
                name="MELODY • pYIN smoothed F0",
                sample_rate=master_sr, points=points, units="Hz",
            ):
                _layer(
                    pane, id=next_layer, type="timevalues",
                    name="MELODY • pYIN F0 / PITCH TRACK", model=model_id,
                    plotStyle=2, verticalScale=1,
                    drawDivisions="true", fillSegments="false",
                    colourName="Orange", colour="#ff9632", darkBackground="false",
                )
                next_layer += 1

        if melody_notes:
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            if _add_notes_model(
                data, model_id=model_id, dataset_id=ds_id,
                name="MELODY • pYIN note transcription",
                sample_rate=master_sr, events=melody_notes.get("events", []),
            ):
                _layer(
                    pane, id=next_layer, type="notes",
                    name="MELODY • pYIN NOTES", model=model_id,
                    verticalScale=1, scaleMinimum=0, scaleMaximum=0,
                    colourName="Blue", colour="#000080", darkBackground="false",
                )
                next_layer += 1

    polyphonic_notes = vamp_analyses.get("polyphonic_notes")
    if polyphonic_notes and polyphonic_notes.get("events"):
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane",
            "name": "NOTES • Silvet polyphonic transcription",
        })
        _layer(
            pane, id=next_layer, type="waveform",
            name=f"REFERENCE • Master waveform for Silvet • {master.name}",
            model=0, channel=-1, gain=0.45, pan=0,
        )
        next_layer += 1
        model_id, ds_id = dataset_id, dataset_id + 1
        dataset_id += 2
        if _add_notes_model(
            data, model_id=model_id, dataset_id=ds_id,
            name="NOTES • Silvet polyphonic transcription",
            sample_rate=master_sr, events=polyphonic_notes["events"],
        ):
            _layer(
                pane, id=next_layer, type="notes",
                name="NOTES • SILVET POLYPHONIC NOTES", model=model_id,
                verticalScale=1, scaleMinimum=0, scaleMaximum=0,
                colourName="Purple", colour="#8030c0", darkBackground="false",
            )
            next_layer += 1

    structure = vamp_analyses.get("structure")
    if structure and structure.get("events"):
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane",
            "name": "STRUCTURE • Segmentino song sections",
        })
        model_id, ds_id = dataset_id, dataset_id + 1
        dataset_id += 2
        if _add_regions_model(
            data, model_id=model_id, dataset_id=ds_id,
            name="STRUCTURE • Segmentino sections",
            sample_rate=master_sr, events=structure["events"],
            units="segment-type",
        ):
            _layer(
                pane, id=next_layer, type="regions",
                name="STRUCTURE • SEGMENTINO", model=model_id,
                verticalScale=1, plotStyle=1, fillColourMap="Magma",
                colourMap=0, colourName="Green", colour="#008000",
                darkBackground="false",
            )
            next_layer += 1

    vamp_beats = vamp_analyses.get("vamp_beats")
    vamp_bars = vamp_analyses.get("vamp_bars")
    if vamp_beats or vamp_bars:
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane",
            "name": "RHYTHM • Queen Mary Vamp beat/bar tracker",
        })
        for analysis_item, label, colour_name, colour in (
            (vamp_beats, "VAMP BEAT", "Orange", "#ff9632"),
            (vamp_bars, "VAMP BAR", "Purple", "#a050ff"),
        ):
            if not analysis_item:
                continue
            times = [float(event.get("start", 0.0)) for event in analysis_item.get("events", [])]
            if not times:
                continue
            model_id, ds_id = dataset_id, dataset_id + 1
            dataset_id += 2
            _add_timeinstants_model(
                data, model_id=model_id, dataset_id=ds_id,
                name=f"RHYTHM • {label.lower()} positions",
                sample_rate=master_sr, times=times, labels=[label] * len(times),
            )
            _layer(
                pane, id=next_layer, type="timeinstants",
                name=f"RHYTHM • {label} POSITIONS", model=model_id,
                plotStyle=0, colourName=colour_name, colour=colour,
            )
            next_layer += 1

    # Every separated WAV gets its own synchronized waveform + spectrogram pane,
    # with redundant explicit labels in both the pane and each layer.
    for model_id, model_slug, stem_name, _path, display_label in audio_models[1:]:
        pane = ET.SubElement(display, "view", {
            "centre": "0",
            "zoom": "1024",
            "followPan": "1",
            "followZoom": "1",
            "tracking": "page",
            "type": "pane",
            "name": display_label,
        })
        pretty_model = _pretty_model(model_slug)
        pretty_stem = _pretty_stem(stem_name)
        _layer(
            pane,
            id=next_layer,
            type="waveform",
            name=f"Waveform • {pretty_model} • {pretty_stem}",
            model=model_id,
            channel=-1,
            gain=1,
            pan=0,
        )
        next_layer += 1
        _layer(
            pane,
            id=next_layer,
            type="spectrogram",
            name=f"Spectrogram • {pretty_model} • {pretty_stem}",
            model=model_id,
            channel=-1,
            windowSize=2048,
            windowHopLevel=2,
            gain=1,
            threshold=0,
            minFrequency=0,
            maxFrequency=0,
            colourScale=0,
            colourMap=0,
            colourRotation=0,
            frequencyScale=0,
            binScale=0,
        )
        next_layer += 1

    # Empty element is intentionally retained for normal SV session shape.
    selections.text = None

    # Canonical Sonic Visualiser session structure: full layer definitions in
    # <data>, followed by visible references from each pane.
    _canonicalise_session_layers(data, display)

    tree = ET.ElementTree(root)
    try:
        ET.indent(tree, space="  ")
    except AttributeError:
        pass
    xml_bytes = ET.tostring(root, encoding="utf-8", xml_declaration=True)
    xml_path = session_dir / "session.xml"
    xml_path.write_bytes(xml_bytes)
    sv_path = session_dir / "session.sv"
    sv_path.write_bytes(bz2.compress(xml_bytes, compresslevel=9))

    bat = session_dir / "open_sonic_visualiser.bat"
    bat.write_text(
        '@echo off\r\nset "SESSION=%~dp0session.sv"\r\n'
        'where sonic-visualiser.exe >nul 2>nul && (start "" sonic-visualiser.exe "%SESSION%" & exit /b 0)\r\n'
        'if exist "%ProgramFiles%\\Sonic Visualiser\\Sonic Visualiser.exe" (start "" "%ProgramFiles%\\Sonic Visualiser\\Sonic Visualiser.exe" "%SESSION%" & exit /b 0)\r\n'
        'if exist "%ProgramFiles(x86)%\\Sonic Visualiser\\Sonic Visualiser.exe" (start "" "%ProgramFiles(x86)%\\Sonic Visualiser\\Sonic Visualiser.exe" "%SESSION%" & exit /b 0)\r\n'
        'echo Sonic Visualiser was not found on PATH or under Program Files.\r\npause\r\n',
        encoding="utf-8",
    )
    sh = session_dir / "open_sonic_visualiser.sh"
    sh.write_text('#!/usr/bin/env sh\nexec sonic-visualiser "$(dirname "$0")/session.sv"\n', encoding="utf-8")
    try:
        sh.chmod(0o755)
    except OSError:
        pass
    return sv_path, xml_path
