from __future__ import annotations

import bz2
import os
import xml.etree.ElementTree as ET
from pathlib import Path

from .audio import audio_info
from .types import BeatResult, StemArtifact


def _rel(path: Path, base: Path) -> str:
    return Path(os.path.relpath(path.resolve(), base.resolve())).as_posix()


def _layer(parent, **attrs):
    return ET.SubElement(parent, "layer", {k: str(v) for k, v in attrs.items()})


def build_session(
    session_dir: Path,
    master: Path,
    stems: list[StemArtifact],
    beats: list[BeatResult],
    whisper: dict | None = None,
) -> tuple[Path, Path]:
    """Create Sonic Visualiser session XML plus native bzip2-compressed .sv file."""
    session_dir.mkdir(parents=True, exist_ok=True)
    root = ET.Element("sv")
    data = ET.SubElement(root, "data")
    display = ET.SubElement(root, "display")
    selections = ET.SubElement(root, "selections")

    audio_models: list[tuple[int, str, Path]] = []
    all_audio = [("master", master)] + [(f"{s.model}:{s.stem}", s.path) for s in stems]
    for idx, (name, path) in enumerate(all_audio):
        info = audio_info(path)
        model_id = idx
        ET.SubElement(data, "model", {
            "id": str(model_id), "name": name, "sampleRate": str(info["sample_rate"]),
            "type": "wavefile", "file": _rel(path, session_dir), "mainModel": "true" if idx == 0 else "false",
        })
        audio_models.append((model_id, name, path))

    next_layer = 1000
    # Master pane also carries all beat/downbeat annotation layers.
    master_pane = ET.SubElement(display, "view", {
        "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
        "tracking": "page", "type": "pane", "name": "Master + beats",
    })
    _layer(master_pane, id=next_layer, type="waveform", name="Master", model=0, channel=-1, gain=1, pan=0)
    next_layer += 1
    _layer(master_pane, id=next_layer, type="spectrogram", name="Master spectrogram", model=0,
           channel=-1, windowSize=2048, windowHopLevel=2, gain=1, threshold=0, minFrequency=0,
           maxFrequency=0, colourScale=0, colourMap=0, colourRotation=0, frequencyScale=0, binScale=0)
    next_layer += 1

    master_sr = audio_info(master)["sample_rate"]
    dataset_id = 10000
    for br in beats:
        for kind, times in (("beats", br.beats), ("downbeats", br.downbeats)):
            model_id = dataset_id
            ds_id = dataset_id + 1
            dataset_id += 2
            ET.SubElement(data, "model", {
                "id": str(model_id), "name": f"{br.model} {kind}", "sampleRate": str(master_sr),
                "type": "sparse", "dimensions": "1", "resolution": "1", "notifyOnAdd": "true",
                "dataset": str(ds_id), "subtype": "timeinstants",
            })
            ds = ET.SubElement(data, "dataset", {"id": str(ds_id), "dimensions": "1"})
            for t in times:
                ET.SubElement(ds, "point", {"frame": str(int(round(float(t) * master_sr))), "label": kind[:-1]})
            _layer(master_pane, id=next_layer, type="timeinstants", name=f"{br.model} {kind}", model=model_id,
                   plotStyle=0, colourName="Orange" if kind == "beats" else "Red", colour="#ff8000" if kind == "beats" else "#ff0000")
            next_layer += 1

    if whisper and whisper.get("words"):
        model_id = dataset_id
        ds_id = dataset_id + 1
        dataset_id += 2
        ET.SubElement(data, "model", {
            "id": str(model_id), "name": "Whisper words", "sampleRate": str(master_sr),
            "type": "sparse", "dimensions": "1", "resolution": "1", "notifyOnAdd": "true",
            "dataset": str(ds_id), "subtype": "timeinstants",
        })
        ds = ET.SubElement(data, "dataset", {"id": str(ds_id), "dimensions": "1"})
        for w in whisper["words"]:
            ET.SubElement(ds, "point", {
                "frame": str(int(round(float(w["start"]) * master_sr))),
                "label": str(w["word"]).strip(),
            })
        _layer(master_pane, id=next_layer, type="timeinstants", name="Whisper words", model=model_id,
               plotStyle=0, colourName="Green", colour="#00a060")
        next_layer += 1

    # Every separated WAV gets its own synchronized waveform + computed spectrogram pane.
    for model_id, name, _path in audio_models[1:]:
        pane = ET.SubElement(display, "view", {
            "centre": "0", "zoom": "1024", "followPan": "1", "followZoom": "1",
            "tracking": "page", "type": "pane", "name": name,
        })
        _layer(pane, id=next_layer, type="waveform", name=name, model=model_id, channel=-1, gain=1, pan=0)
        next_layer += 1
        _layer(pane, id=next_layer, type="spectrogram", name=f"{name} spectrogram", model=model_id,
               channel=-1, windowSize=2048, windowHopLevel=2, gain=1, threshold=0, minFrequency=0,
               maxFrequency=0, colourScale=0, colourMap=0, colourRotation=0, frequencyScale=0, binScale=0)
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
