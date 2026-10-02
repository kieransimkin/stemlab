from __future__ import annotations

import csv
import importlib.metadata
import json
import os
from pathlib import Path
from typing import Any

import numpy as np


def _pkg(name: str) -> str | None:
    try:
        return importlib.metadata.version(name)
    except importlib.metadata.PackageNotFoundError:
        return None


def _write_csv(path: Path, rows: list[dict[str, Any]]) -> None:
    if not rows:
        return
    keys = list(rows[0])
    with path.open("w", newline="", encoding="utf-8") as handle:
        writer = csv.DictWriter(handle, fieldnames=keys)
        writer.writeheader()
        writer.writerows(rows)


def run_firered(request: dict, out: Path) -> dict:
    from fireredvad import FireRedAed, FireRedAedConfig
    model_dir = request.get("model_path")
    if not model_dir:
        raise ValueError("firered_aed requires --model-path firered_aed=/path/to/FireRedVAD/AED")
    config = FireRedAedConfig(use_gpu=request.get("device", "auto").startswith("cuda"),
                              smooth_window_size=5, speech_threshold=0.4,
                              singing_threshold=0.5, music_threshold=0.5,
                              min_event_frame=20, max_event_frame=2000,
                              min_silence_frame=20, merge_silence_frame=0,
                              extend_speech_frame=0, chunk_max_frame=30000)
    model = FireRedAed.from_pretrained(model_dir, config)
    result, probs = model.detect(str(request["source"]))
    rows = []
    for label, spans in (result.get("event2timestamps") or {}).items():
        for start, end in spans:
            rows.append({"label": label, "start": float(start), "end": float(end),
                         "duration": float(end) - float(start)})
    payload = {"model": "firered_aed", "events": rows,
               "event_ratios": result.get("event2ratio", {}),
               "probability_shape": list(np.asarray(probs).shape) if probs is not None else None}
    (out / "events.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    _write_csv(out / "events.csv", rows)
    return {"files": ["events.json", "events.csv"], "event_count": len(rows),
            "package_version": _pkg("fireredvad")}


def run_heart(request: dict, out: Path) -> dict:
    import torch
    from heartlib import HeartTranscriptorPipeline
    model_path = request.get("model_path")
    if not model_path:
        raise ValueError("heart_transcriptor requires --model-path heart_transcriptor=/path/to/HeartTranscriptor-oss")
    device_name = request.get("device", "auto")
    device = torch.device("cuda" if device_name == "auto" and torch.cuda.is_available() else
                          ("cpu" if device_name == "auto" else device_name))
    dtype = torch.float16 if device.type == "cuda" else torch.float32
    pipe = HeartTranscriptorPipeline.from_pretrained(model_path, device=device, dtype=dtype)
    with torch.no_grad():
        result = pipe(str(request["source"]), max_new_tokens=256, num_beams=2, task="transcribe",
                      condition_on_prev_tokens=False, compression_ratio_threshold=1.8,
                      temperature=(0.0, 0.1, 0.2, 0.4), logprob_threshold=-1.0,
                      no_speech_threshold=0.4)
    payload = {"model": "heart_transcriptor", "result": result}
    (out / "transcript.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2, default=str) + "\n",
                                         encoding="utf-8")
    text = result if isinstance(result, str) else result.get("text") if isinstance(result, dict) else str(result)
    (out / "transcript.txt").write_text((text or "").strip() + "\n", encoding="utf-8")
    return {"files": ["transcript.json", "transcript.txt"], "package_version": _pkg("heartlib")}


def run_qwen(request: dict, out: Path) -> dict:
    import torch
    from qwen_asr import Qwen3ForcedAligner
    model_id = request.get("model_path") or "Qwen/Qwen3-ForcedAligner-0.6B"
    device_name = request.get("device", "auto")
    device_map = "cuda:0" if device_name == "auto" and torch.cuda.is_available() else (
        "cpu" if device_name == "auto" else device_name)
    dtype = torch.bfloat16 if str(device_map).startswith("cuda") else torch.float32
    aligner = Qwen3ForcedAligner.from_pretrained(model_id, dtype=dtype, device_map=device_map)
    results = aligner.align(audio=str(request["source"]), text=request["canonical_text"],
                            language=request.get("language", "English"))
    result = results[0]
    rows = [{"text": item.text, "start": float(item.start_time), "end": float(item.end_time)}
            for item in result.items]
    payload = {"model": "qwen_forced_aligner", "language": request.get("language", "English"), "items": rows}
    (out / "alignment.json").write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    _write_csv(out / "alignment.csv", rows)
    return {"files": ["alignment.json", "alignment.csv"], "word_count": len(rows),
            "package_version": _pkg("qwen-asr")}


def run_swift(request: dict, out: Path) -> dict:
    from swift_f0 import SwiftF0
    detector = SwiftF0()
    result = detector.detect_file(str(request["source"]))
    timestamps = np.asarray(result.timestamps, dtype=float)
    pitch = np.asarray(result.pitch_hz, dtype=float)
    confidence = np.asarray(result.confidence, dtype=float)
    loudness = np.asarray(result.loudness_db, dtype=float)
    rows = [{"time": float(t), "pitch_hz": float(p), "confidence": float(c), "loudness_db": float(level)}
            for t, p, c, level in zip(timestamps, pitch, confidence, loudness)]
    voiced = confidence >= 0.5
    payload = {"model": "swift_f0", "frame_period_seconds": 0.016, "frames": len(rows),
               "voiced_frames": int(voiced.sum()),
               "voiced_ratio": float(voiced.mean()) if len(voiced) else 0.0,
               "median_pitch_hz": float(np.median(pitch[voiced])) if voiced.any() else None,
               "frames_data": rows}
    (out / "pitch.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    _write_csv(out / "pitch.csv", rows)
    return {"files": ["pitch.json", "pitch.csv"], "frame_count": len(rows),
            "package_version": _pkg("swift-f0")}


def run_lv_chordia(request: dict, out: Path) -> dict:
    from lv_chordia.chord_recognition import chord_recognition
    rows = chord_recognition(audio_path=str(request["source"]),
                             chord_dict_name=request.get("chord_dictionary", "submission"))
    normalized = [{"start": float(item["start_time"]), "end": float(item["end_time"]),
                   "chord": str(item["chord"])} for item in rows]
    payload = {"model": "lv_chordia", "dictionary": request.get("chord_dictionary", "submission"),
               "segments": normalized}
    (out / "chords.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    _write_csv(out / "chords.csv", normalized)
    return {"files": ["chords.json", "chords.csv"], "segment_count": len(normalized),
            "package_version": _pkg("lv-chordia")}


def run_adtof(request: dict, out: Path) -> dict:
    import pretty_midi
    from adtof_pytorch import transcribe_to_midi
    midi_path = out / "drums.mid"
    transcribe_to_midi(str(request["source"]), str(midi_path))
    midi = pretty_midi.PrettyMIDI(str(midi_path))
    rows = []
    for instrument in midi.instruments:
        for note in instrument.notes:
            rows.append({"pitch": int(note.pitch), "start": float(note.start), "end": float(note.end),
                         "velocity": int(note.velocity), "is_drum": bool(instrument.is_drum)})
    rows.sort(key=lambda row: (row["start"], row["pitch"]))
    payload = {"model": "adtof_drums", "events": rows}
    (out / "drums.json").write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    _write_csv(out / "drums.csv", rows)
    return {"files": ["drums.mid", "drums.json", "drums.csv"], "event_count": len(rows),
            "package_version": _pkg("adtof-pytorch")}


def run_songformer(request: dict, out: Path) -> dict:
    """Use a separately provisioned SongFormer checkout via its inference CLI.

    The upstream package is not currently distributed as a small stable PyPI API.
    To avoid vendoring or silently cloning it, the worker accepts an explicit
    command template through STEMLAB_SONGFORMER_COMMAND. The template must contain
    {input} and {output}; this is documented as an opt-in research bridge.
    """
    import shlex
    import subprocess
    template = os.environ.get("STEMLAB_SONGFORMER_COMMAND")
    if not template:
        raise RuntimeError("songformer requires STEMLAB_SONGFORMER_COMMAND with {input} and {output}")
    result_path = out / "structure.txt"
    command = [part.format(input=str(request["source"]), output=str(result_path)) for part in shlex.split(template)]
    subprocess.run(command, check=True, stdin=subprocess.DEVNULL)
    if not result_path.is_file():
        raise RuntimeError("SongFormer command did not create the requested output")
    rows = []
    for line in result_path.read_text(encoding="utf-8").splitlines():
        parts = line.strip().split(maxsplit=1)
        if len(parts) == 2 and parts[0].replace(".", "", 1).isdigit():
            rows.append({"start": float(parts[0]), "label": parts[1]})
    (out / "structure.json").write_text(json.dumps({"model": "songformer", "boundaries": rows}, indent=2) + "\n",
                                        encoding="utf-8")
    return {"files": ["structure.txt", "structure.json"], "boundary_count": len(rows)}


def run_external_bridge(request: dict, out: Path) -> dict:
    """Run a deliberately explicit model-specific external command bridge.

    The command must write JSON to {output}. StemLab never shells a raw user
    string; shlex splitting plus shell=False preserves argument boundaries.
    """
    import shlex
    import subprocess
    slug = request["model"]
    env_name = "STEMLAB_" + slug.upper() + "_COMMAND"
    template = os.environ.get(env_name)
    if not template:
        raise RuntimeError(f"{slug} requires {env_name} with {{input}} and {{output}} placeholders")
    result_path = out / "result.json"
    mapping = {"input": str(request["source"]), "output": str(result_path),
               "text": request.get("canonical_text") or "", "prompt": request.get("prompt") or ""}
    command = [part.format(**mapping) for part in shlex.split(template)]
    subprocess.run(command, check=True, stdin=subprocess.DEVNULL, shell=False)
    if not result_path.is_file() or result_path.stat().st_size > 128 * 1024 * 1024:
        raise RuntimeError(f"{slug} command did not create a bounded result.json")
    payload = json.loads(result_path.read_text(encoding="utf-8"))
    if not isinstance(payload, (dict, list)):
        raise ValueError("External evidence result must be JSON object or array")
    return {"files": ["result.json"], "external_command": env_name}


_RUNNERS = {
    "firered_aed": run_firered,
    "heart_transcriptor": run_heart,
    "qwen_forced_aligner": run_qwen,
    "swift_f0": run_swift,
    "lv_chordia": run_lv_chordia,
    "adtof_drums": run_adtof,
    "songformer": run_songformer,
    "game_vocal_notes": run_external_bridge,
    "sheetsage2": run_external_bridge,
    "moss_music": run_external_bridge,
    "audiosep": run_external_bridge,
}


def run_backend(request: dict, out: Path) -> dict:
    slug = request["model"]
    if slug not in _RUNNERS:
        raise ValueError(f"Unknown evidence backend: {slug}")
    return _RUNNERS[slug](request, out)
