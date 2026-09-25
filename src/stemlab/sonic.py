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
        "subtype": "timeinstants",
    })
    ds = ET.SubElement(data, "dataset", {"id": str(dataset_id), "dimensions": "1"})
    labels = labels or [""] * len(times)
    for t, label in zip(times, labels):
        ET.SubElement(ds, "point", {
            "frame": str(int(round(float(t) * sample_rate))),
            "label": str(label),
        })


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
