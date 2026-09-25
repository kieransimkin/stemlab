from __future__ import annotations

import csv
from pathlib import Path
from typing import Any

import numpy as np

from .audio import load_audio, normalize_audio_file, save_audio
from .util import write_json


def _fmt_srt(t: float) -> str:
    ms = int(round(max(0.0, t) * 1000))
    h, ms = divmod(ms, 3_600_000)
    m, ms = divmod(ms, 60_000)
    s, ms = divmod(ms, 1000)
    return f"{h:02}:{m:02}:{s:02},{ms:03}"


def isolate_and_transcribe(
    vocal_path: Path,
    output_dir: Path,
    *,
    whisper_model: str = "large-v3",
    device: str = "auto",
) -> dict[str, Any]:
    """Use faster-whisper's Silero VAD to make a timeline-preserving spoken-word stem,
    then run Whisper with word timestamps over that isolated stem.
    """
    from faster_whisper import WhisperModel
    from faster_whisper.vad import VadOptions, get_speech_timestamps

    output_dir.mkdir(parents=True, exist_ok=True)
    wav16, _ = load_audio(vocal_path, target_sr=16000, mono=True)
    mono = wav16[0].cpu().numpy().astype(np.float32)
    vad_opts = VadOptions(min_silence_duration_ms=300, speech_pad_ms=120)
    raw_regions = get_speech_timestamps(mono, vad_opts)
    regions = [
        {"start": r["start"] / 16000.0, "end": r["end"] / 16000.0, "start_sample": int(r["start"]), "end_sample": int(r["end"])}
        for r in raw_regions
    ]
    write_json(output_dir / "speech_regions.json", regions)

    # Keep original timing so transcript/beat/session data share one time axis.
    spoken = np.zeros_like(mono)
    fade = int(0.010 * 16000)
    for r in raw_regions:
        s, e = int(r["start"]), int(r["end"])
        spoken[s:e] = mono[s:e]
        n = min(fade, max(0, (e - s) // 2))
        if n:
            ramp = np.linspace(0.0, 1.0, n, dtype=np.float32)
            spoken[s:s+n] *= ramp
            spoken[e-n:e] *= ramp[::-1]
    import torch
    spoken_path = output_dir / "spoken_word.wav"
    save_audio(spoken_path, torch.from_numpy(spoken).unsqueeze(0), 16000)
    normalization = normalize_audio_file(spoken_path)

    if device == "auto":
        try:
            import torch as _torch
            fw_device = "cuda" if _torch.cuda.is_available() else "cpu"
        except Exception:
            fw_device = "cpu"
    else:
        fw_device = "cuda" if device.startswith("cuda") else "cpu"
    compute_type = "float16" if fw_device == "cuda" else "int8"
    model = WhisperModel(whisper_model, device=fw_device, compute_type=compute_type)
    # We already VAD-gated the audio; leave VAD off here so timestamps stay on the master timeline.
    segments_iter, info = model.transcribe(str(spoken_path), vad_filter=False, word_timestamps=True)
    segments = []
    words = []
    for s in segments_iter:
        sw = []
        for w in (s.words or []):
            item = {"start": float(w.start), "end": float(w.end), "word": w.word, "probability": float(w.probability)}
            sw.append(item)
            words.append(item)
        segments.append({
            "id": int(s.id), "start": float(s.start), "end": float(s.end), "text": s.text,
            "avg_logprob": float(s.avg_logprob), "no_speech_prob": float(s.no_speech_prob), "words": sw,
        })
    result = {
        "source_vocals": str(vocal_path),
        "spoken_word_wav": str(spoken_path),
        "normalization": normalization,
        "model": whisper_model,
        "language": info.language,
        "language_probability": float(info.language_probability),
        "duration": float(info.duration),
        "duration_after_vad": float(getattr(info, "duration_after_vad", info.duration)),
        "regions": regions,
        "segments": segments,
        "words": words,
    }
    write_json(output_dir / "whisper.json", result)
    (output_dir / "transcript.txt").write_text("".join(s["text"] for s in segments).strip() + "\n", encoding="utf-8")

    with (output_dir / "words.tsv").open("w", newline="", encoding="utf-8") as f:
        writer = csv.writer(f, delimiter="\t")
        writer.writerow(["start", "end", "probability", "word"])
        for w in words:
            writer.writerow([f"{w['start']:.6f}", f"{w['end']:.6f}", f"{w['probability']:.6f}", w["word"]])
    with (output_dir / "transcript.srt").open("w", encoding="utf-8") as f:
        for i, s in enumerate(segments, 1):
            f.write(f"{i}\n{_fmt_srt(s['start'])} --> {_fmt_srt(s['end'])}\n{s['text'].strip()}\n\n")
    return result
