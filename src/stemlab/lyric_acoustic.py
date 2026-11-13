"""Optional known-text acoustic alignment; does not replace canonical words.

stable-ts owns the actual alignment algorithm. This adapter retains its raw
evidence, source clocks, text parity and explicit failure diagnostics.
"""

from __future__ import annotations

import hashlib
import math
from pathlib import Path

from .lyric_quality import assess_lines
from .word_alignment import TOKEN, normal


def lexical(value: str) -> str:
    return "".join(c.casefold() for c in value if c.isalnum())


def canonical_result(
    text: str, raw: dict, duration: float, *, offset: float = 0, crop_end: float | None = None,
) -> dict:
    """Retain exact input line grouping; reject omissions or substituted text."""
    canonical = [line for line in text.splitlines() if line.strip()]
    segments = raw.get("segments", [])
    if len(segments) != len(canonical):
        raise ValueError("Acoustic backend did not preserve every canonical line")
    upper = duration if crop_end is None else min(duration, crop_end)
    if not 0 <= offset < upper <= duration:
        raise ValueError("Invalid acoustic candidate source bounds")
    lines = []
    for number, (line, segment) in enumerate(zip(canonical, segments), 1):
        words = segment.get("words") or []
        canonical_words = TOKEN.findall(line)
        if [normal(word["word"]) for word in words] != [normal(word) for word in canonical_words]:
            raise ValueError(f"Acoustic backend changed canonical tokens on line {number}")
        shifted = []
        for spelling, word in zip(canonical_words, words):
            shifted.append({
                **word, "word": spelling, "backend_word": word["word"],
                "start": float(word["start"]) + offset, "end": float(word["end"]) + offset,
            })
        valid = [
            word
            for word in shifted
            if math.isfinite(word["start"])
            and math.isfinite(word["end"])
            and offset <= word["start"] < word["end"] <= upper
        ]
        disordered = any(right["start"] < left["end"] for left, right in zip(valid, valid[1:]))
        first_valid = bool(shifted) and shifted[0] in valid
        lines.append(
            {
                "text": line,
                "canonical_line": number,
                "canonical_word_count": len(canonical_words),
                "start": shifted[0]["start"] if first_valid else None,
                "end": max((word["end"] for word in valid), default=None),
                "timing_source": "acoustic_known_text",
                "words": shifted,
                "invalid_word_count": len(shifted) - len(valid),
                "overlapping_or_backward_words": disordered,
                "review_reasons": ["acoustic_candidate_requires_listening"]
                + (["instant_or_invalid_words"] if len(valid) != len(shifted) else [])
                + (["overlapping_or_backward_words"] if disordered else []),
            }
        )
    quality = assess_lines(lines, duration, require_nonoverlap=True)
    return {
        "schema": "stemlab.canonical-acoustic-alignment.v1",
        "canonical_text": text,
        "duration": duration,
        "source_offset_seconds": offset,
        "lines": lines,
        "quality": quality,
        "canonical_text_parity": True,
        "listening_qa": "pending",
        "accepted": False,
        "policy": "Known text aligned acoustically; no interpolation, beat snapping, or canonical edits. "
        "Forced text coverage is not recognition accuracy or listening approval.",
    }


def align_known_text(
    audio: Path,
    text: str,
    model_path: Path,
    *,
    device: str = "cuda",
    start: float = 0,
    end: float | None = None,
    model=None,
) -> tuple[dict, dict]:
    """Use only an existing local model. Crop offsets are applied exactly once."""
    import soundfile as sf
    from faster_whisper.audio import decode_audio

    if not audio.is_file() or not (model_path / "model.bin").is_file():
        raise ValueError("Audio and an existing local faster-whisper model are required")
    info = sf.info(str(audio))
    duration = info.frames / info.samplerate
    stop = duration if end is None else end
    if not 0 <= start < stop <= duration:
        raise ValueError("Invalid source-clock alignment bounds")
    if model is None:
        import stable_whisper

        model = stable_whisper.load_faster_whisper(
            str(model_path),
            device=device,
            compute_type="float16" if device == "cuda" else "int8",
            local_files_only=True,
        )
    samples = decode_audio(str(audio), sampling_rate=16000)
    first_sample = round(start * 16000)
    clip = samples[first_sample : round(stop * 16000)]
    result = model.align(
        clip,
        text,
        language="en",
        original_split=True,
        regroup=False,
        nonspeech_skip=None,
        suppress_silence=False,
        remove_instant_words=False,
        token_step=100,
        max_word_dur=3,
        verbose=None,
    )
    if result is None:
        raise RuntimeError("Acoustic alignment failed; no timestamps fabricated")
    raw = result.to_dict()
    actual_start = first_sample / 16000
    actual_stop = (first_sample + len(clip)) / 16000
    aligned = canonical_result(text, raw, duration, offset=actual_start, crop_end=actual_stop)
    with audio.open("rb") as stream:
        digest = hashlib.file_digest(stream, "sha256").hexdigest()
    from importlib.metadata import version

    aligned["provenance"] = {
        "audio_path": str(audio),
        "audio_sha256": digest,
        "audio_frames": info.frames,
        "sample_rate": info.samplerate,
        "model_path": str(model_path),
        "crop_start": start,
        "crop_end": stop,
        "decoded_crop_start": actual_start,
        "decoded_crop_end": actual_stop,
        "backend": "stable-ts-whisperless",
        "backend_version": version("stable-ts-whisperless"),
    }
    return aligned, raw


def draft_lrc(alignment: dict, *, title: str, artist: str) -> str:
    if any(c in title + artist for c in "\r\n[]"):
        raise ValueError("Unsafe LRC metadata")
    quality = assess_lines(alignment["lines"], alignment["duration"], require_nonoverlap=True)
    if not quality["export_eligible"]:
        raise ValueError("Line-level timing gates failed; retain evidence for correction")
    output = [
        f"[ti:{title}]",
        f"[ar:{artist}]",
        "[offset:0]",
        "[re:Acoustic alignment draft; artist confirmation pending]",
    ]
    for line in alignment["lines"]:
        minutes, remainder = divmod(round(line["start"] * 100), 6000)
        seconds, cs = divmod(remainder, 100)
        output.append(f"[{minutes:02}:{seconds:02}.{cs:02}]" + line["text"])
    return "\n".join(output) + "\n"


def main():
    """Standalone optional CLI, without booting the complete analysis pipeline."""
    import argparse
    import json

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--audio", type=Path, required=True)
    parser.add_argument("--lyrics", type=Path, required=True)
    parser.add_argument(
        "--model", type=Path, required=True, help="Existing local faster-whisper model directory"
    )
    parser.add_argument(
        "--output", type=Path, required=True, help="New evidence directory; never overwritten"
    )
    parser.add_argument("--device", choices=["cpu", "cuda"], default="cuda")
    parser.add_argument("--start", type=float, default=0)
    parser.add_argument("--end", type=float)
    parser.add_argument("--title", required=True)
    parser.add_argument("--artist", required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error("Output already exists; artist edits and prior evidence must be preserved")
    text = args.lyrics.read_text(encoding="utf-8-sig")
    result, raw = align_known_text(
        args.audio, text, args.model, device=args.device, start=args.start, end=args.end
    )
    args.output.mkdir(parents=True)
    for name, value in [("raw-backend.json", raw), ("canonical-alignment.json", result)]:
        (args.output / name).write_text(
            json.dumps(value, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
        )
    try:
        lrc = draft_lrc(result, title=args.title, artist=args.artist)
    except ValueError as error:
        print(str(error))
        raise SystemExit(2) from error
    (args.output / "canonical-timing-draft.lrc").write_text(lrc, encoding="utf-8")
    print("Complete acoustic draft exported; artist listening confirmation remains pending.")


if __name__ == "__main__":
    main()
