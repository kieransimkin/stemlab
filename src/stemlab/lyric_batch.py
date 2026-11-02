"""Repetition-safe ASR candidates with complete line gates, replacing legacy interpolation."""

from __future__ import annotations

import argparse
import json
from pathlib import Path

from .lyric_lrc import build_lrc
from .lyric_quality import assess_lines
from .word_alignment import reconcile


def candidate_lines(alignment: dict) -> list[dict]:
    lines = []
    for number, text in enumerate(alignment["canonical_text"].splitlines(), 1):
        if not text.strip():
            continue
        words = [w for w in alignment["words"] if w["line"] == number]
        valid = [
            w
            for w in words
            if w.get("start") is not None
            and w.get("end") is not None
            and 0 <= w["start"] < w["end"] <= alignment["duration"]
        ]
        lines.append(
            {
                "text": text,
                "start": valid[0]["start"] if valid and valid[0] is words[0] else None,
                "end": max((w["end"] for w in valid), default=None),
                "canonical_word_count": len(words),
                "timing_source": "observed_asr",
            }
        )
    return lines


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--lyrics", type=Path, required=True)
    parser.add_argument("--audio", type=Path, action="append", required=True)
    parser.add_argument("--output-dir", type=Path, required=True)
    parser.add_argument(
        "--model", type=Path, required=True, help="Existing local faster-whisper model directory"
    )
    parser.add_argument("--device", default="cpu", choices=["cpu", "cuda", "auto"])
    parser.add_argument(
        "--no-condition-on-previous-text",
        action="store_true",
        help="Compatibility flag; already the default",
    )
    parser.add_argument(
        "--condition-on-previous-text",
        action="store_true",
        help="Explicit diagnostic comparison only",
    )
    args = parser.parse_args()
    if args.output_dir.exists():
        parser.error("Output exists; refusing to overwrite prior evidence or artist edits")
    if not (args.model / "model.bin").is_file():
        parser.error("An existing local model is required; no implicit model downloads")
    text = args.lyrics.read_text(encoding="utf-8-sig")
    from .speech import isolate_and_transcribe
    import soundfile as sf
    import stemlab

    args.output_dir.mkdir(parents=True)
    results = []
    for index, audio in enumerate(args.audio, 1):
        speech = isolate_and_transcribe(
            audio,
            args.output_dir / f"candidate-{index}" / "speech",
            whisper_model=str(args.model),
            device=args.device,
            vad_mode="full",
            language="en",
            condition_on_previous_text=args.condition_on_previous_text,
        )
        info = sf.info(str(audio))
        alignment = reconcile(text, speech["words"], info.frames / info.samplerate)
        quality = assess_lines(candidate_lines(alignment), alignment["duration"])
        lrc, line_report = None, None
        if quality["export_eligible"]:
            try:
                lrc, line_report = build_lrc(alignment, title=args.lyrics.stem, artist="")
            except ValueError:
                quality["export_eligible"] = False
        result = {
            "audio_path": str(audio),
            "alignment": alignment,
            "quality": quality,
            "line_report": line_report,
            "lrc": lrc,
        }
        results.append(result)
        (args.output_dir / f"asr-alignment-v{index}.json").write_text(
            json.dumps(
                {k: v for k, v in result.items() if k != "lrc"}, indent=2, ensure_ascii=False
            )
            + "\n",
            encoding="utf-8",
        )
    eligible = [
        i
        for i, r in enumerate(results)
        if r["quality"]["export_eligible"] and r["alignment"]["threshold_pass"]
    ]
    best = max(eligible, key=lambda i: results[i]["alignment"]["match_ratio"]) if eligible else None
    summary = {
        "stemlab_version": stemlab.__version__,
        "selected_input_index": best + 1 if best is not None else None,
        "export_state": "complete_draft_pending_listening"
        if best is not None
        else "held_for_line_evidence",
        "policy": "Rank only complete line-valid candidates. No interpolation; canonical text retained. "
        "Separate vocal parts before comparing overlapping evidence. No canonical promotion.",
        "candidates": [
            {
                "audio": r["audio_path"],
                "quality": r["quality"],
                "match_ratio": r["alignment"]["match_ratio"],
            }
            for r in results
        ],
    }
    (args.output_dir / "timing-summary.json").write_text(
        json.dumps(summary, indent=2) + "\n", encoding="utf-8"
    )
    if best is None:
        print("Complete LRC held: unresolved line anchors; all native evidence retained.")
        raise SystemExit(2)
    (args.output_dir / "synced-lyrics-estimated.lrc").write_text(
        results[best]["lrc"], encoding="utf-8"
    )
    print("Complete draft exported; artist listening confirmation remains pending.")


if __name__ == "__main__":
    main()
