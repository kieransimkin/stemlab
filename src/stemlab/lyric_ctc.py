"""Bounded letter-level evidence for known English lyrics, on the input clock."""

from __future__ import annotations

import argparse
from importlib.metadata import version
import json
import math
from pathlib import Path

import numpy as np

from .util import sha256_file
from .word_alignment import TOKEN, normal


CHECKPOINT = "wav2vec2_fairseq_base_ls960_asr_ls960.pth"
CHECKPOINT_SHA256 = "488fd4f16de84438ffc945334278c1b9fb9b7159a806c1080b16111a958c945d"
MODEL_RATE = 16_000
STRIDE = 320
RECEPTIVE_FIELD = 400
MAX_WINDOW_SECONDS = 18
MAX_TOKENS = 256


def ctc_spans(log_probs: np.ndarray, targets: list[int], *, blank: int = 0) -> list[tuple[int, int]]:
    """Return half-open frame spans for the best ordered CTC path in a window.

    Initial/final blank state permits an unknown amount of untranscribed audio
    around a line. Repeated adjacent labels still require an intervening blank.
    Scores are relative to blank; capping gains limits the effect of a single
    frame with an unusually small blank probability.
    """
    values = np.asarray(log_probs, dtype=np.float64)
    if (
        values.ndim != 2 or not 0 <= blank < values.shape[1]
        or len(values) > MAX_WINDOW_SECONDS * MODEL_RATE // STRIDE
        or not 0 < len(targets) <= MAX_TOKENS
        or any(not 0 <= t < values.shape[1] or t == blank for t in targets)
        or not np.isfinite(values).all() or (values > 0).any()
    ):
        raise ValueError("Invalid CTC log probabilities or target labels")
    minimum = len(targets) + sum(a == b for a, b in zip(targets, targets[1:]))
    if len(values) < minimum:
        raise ValueError("Not enough CTC frames for all labels and repeated-letter blanks")

    symbols = np.full(2 * len(targets) + 1, blank, dtype=int)
    symbols[1::2] = targets
    can_skip = (symbols[2:] != blank) & (symbols[2:] != symbols[:-2])
    gains = np.minimum(values[:, symbols] - values[:, [blank]], 4.0)
    back = np.empty(gains.shape, dtype=np.uint8)
    score = np.full(len(symbols), -np.inf)
    score[0] = 0
    options = np.full((3, len(symbols)), -np.inf)
    indices = np.arange(len(symbols))
    for i, row in enumerate(gains):
        options[0] = score
        options[1, 1:] = score[:-1]
        options[2, 2:] = np.where(can_skip, score[:-2], -np.inf)
        # Stable ties prefer staying, then a one-state step, then a skip.
        moves = np.argmax(options, axis=0)
        back[i] = moves
        score = options[moves, indices] + row
    state = len(symbols) - (1 if score[-1] >= score[-2] else 2)
    if not np.isfinite(score[state]):
        raise ValueError("No ordered CTC path")
    starts = np.zeros(len(targets), dtype=int)
    ends = np.zeros(len(targets), dtype=int)
    for i in range(len(values) - 1, -1, -1):
        if state % 2:
            token = state // 2
            starts[token] = i
            if ends[token] == 0:
                ends[token] = i + 1
        state -= int(back[i, state])
    return list(zip(starts.tolist(), ends.tolist()))


def _greedy_letters(log_probs: np.ndarray, labels: tuple[str, ...]) -> str:
    indices = log_probs.argmax(axis=1)
    return "".join(
        labels[label] for i, label in enumerate(indices)
        if label != 0 and (i == 0 or label != indices[i - 1])
    ).replace("|", " ").strip()


def align_window(
    text: str,
    log_probs: np.ndarray,
    labels: tuple[str, ...],
    *,
    sample_rate: int,
    num_frames: int,
    input_start_frame: int,
    window: tuple[int, int],
) -> dict:
    """Compare exactly one canonical occurrence with a bounded acoustic view.

    The emission origin is the actual decoded input frame, including any
    surrounding model context. The half-hop edges are centred on the 400-sample
    convolutional receptive field. Output frames represent model estimates.
    """
    start, stop = window
    if sample_rate <= 0 or not 0 <= input_start_frame <= start < stop <= num_frames:
        raise ValueError("Invalid native-frame CTC window")
    words = TOKEN.findall(text)
    if not words or not labels or labels[0] != "-" or "|" not in labels or len(set(labels)) != len(labels):
        raise ValueError("English CTC labels and at least one lyric word are required")
    lookup = {label: i for i, label in enumerate(labels)}
    spellings = [normal(word).upper() for word in words]
    if any(not spelling or any(c not in lookup or c in "-|" for c in spelling) for spelling in spellings):
        raise ValueError("Unsupported spelling for the English CTC model")
    target = "|".join(spellings)
    if log_probs.ndim != 2 or log_probs.shape[1] != len(labels):
        raise ValueError("CTC label vocabulary does not match the emissions")

    edge_offset = (RECEPTIVE_FIELD - STRIDE) // 2
    edges = input_start_frame + np.rint(
        (np.arange(len(log_probs) + 1) * STRIDE + edge_offset) * sample_rate / MODEL_RATE
    ).astype(np.int64)
    # Keep only complete model cells inside the caller's window. Do not snap a
    # token clipped by an edge to that edge or search the neighbouring occurrence.
    first = int(np.searchsorted(edges, start, side="left"))
    last = int(np.searchsorted(edges, stop, side="right")) - 1
    if last <= first:
        raise ValueError("No complete CTC frame in the lyric window")
    target_ids = [lookup[c] for c in target]
    spans = ctc_spans(log_probs[first:last], target_ids)
    output = []
    k = 0
    for word, spelling in zip(words, spellings):
        chars = []
        peaks = []
        for c in spelling:
            a, b = spans[k]
            lo, hi = a + first, b + first
            peak = float(np.max(log_probs[lo:hi, lookup[c]]))
            peaks.append(peak)
            chars.append({
                "letter": c, "start_frame": int(edges[lo]), "end_frame": int(edges[hi]),
                "peak_probability": math.exp(peak),
            })
            k += 1
        k += 1  # A CTC word delimiter is an observation, not part of either word.
        a, b = chars[0]["start_frame"], chars[-1]["end_frame"]
        score = math.exp(sum(peaks) / len(peaks))
        reasons = []
        if score < 0.12:
            reasons.append("weak_letter_evidence")
        if chars[0]["peak_probability"] < 0.12:
            reasons.append("weak_first_letter")
        if chars[-1]["peak_probability"] < 0.12:
            reasons.append("weak_last_letter")
        if a == edges[first] or b == edges[last]:
            reasons.append("touches_search_edge")
        output.append({
            "word": word, "start_frame": a, "end_frame": b,
            "start": a / sample_rate, "end": b / sample_rate,
            "letter_score": score, "letters": chars, "review_reasons": reasons,
            "greedy_letters_in_span": _greedy_letters(
                log_probs[np.searchsorted(edges, a):np.searchsorted(edges, b)], labels
            ),
        })
    return {
        "start": output[0]["start"], "end": output[-1]["end"],
        "start_frame": output[0]["start_frame"], "end_frame": output[-1]["end_frame"],
        "words": output, "window_start_frame": start, "window_end_frame": stop,
        "greedy_letters_in_window": _greedy_letters(log_probs[first:last], labels),
    }


def load_model(checkpoint: Path, device: str):
    """Use only the verified local TorchAudio checkpoint; no automatic download."""
    if (
        checkpoint.name != CHECKPOINT or not checkpoint.is_file()
        or sha256_file(checkpoint) != CHECKPOINT_SHA256
    ):
        raise ValueError(f"Expected a checksum-verified local {CHECKPOINT}")
    from torchaudio.pipelines import WAV2VEC2_ASR_BASE_960H

    bundle = WAV2VEC2_ASR_BASE_960H
    model = bundle.get_model(dl_kwargs={"model_dir": str(checkpoint.parent), "weights_only": True})
    return model.to(device), tuple(bundle.get_labels())


def align_audio(
    audio: Path, lyrics: str, windows: list, checkpoint: Path, *,
    device: str = "cpu", context_seconds: float = 0.8, loaded_model=None,
) -> dict:
    """Align each nonblank lyric occurrence in its caller-supplied search window."""
    import soundfile as sf
    from scipy.signal import resample_poly
    import torch

    if not math.isfinite(context_seconds) or not 0 <= context_seconds <= 3:
        raise ValueError("Model context must be between 0 and 3 seconds")
    canonical = [line for line in lyrics.splitlines() if line.strip()]
    if not canonical or not isinstance(windows, list) or len(canonical) != len(windows):
        raise ValueError("Supply exactly one ordered search window per nonblank canonical line")
    with sf.SoundFile(audio) as signal:
        sr, frames = signal.samplerate, signal.frames
        bounds = []
        last_start = -1
        for row in windows:
            if (
                not isinstance(row, (list, tuple)) or len(row) != 2
                or not all(type(t) in (int, float) and math.isfinite(t) for t in row)
                or not 0 <= row[0] < row[1] <= frames / sr
                or row[1] - row[0] > MAX_WINDOW_SECONDS
            ):
                raise ValueError("Invalid or oversized lyric search window in source seconds")
            start, stop = round(row[0] * sr), round(row[1] * sr)
            if not last_start < start < stop:
                raise ValueError("Lyric search windows must start in occurrence order")
            last_start = start
            bounds.append((start, stop))
        pad = round(context_seconds * sr)
        factor = math.gcd(sr, MODEL_RATE)
        model, labels = loaded_model or load_model(checkpoint, device)
        lines = []
        for occurrence, (line, (start, stop)) in enumerate(zip(canonical, bounds), 1):
            origin, limit = max(0, start - pad), min(frames, stop + pad)
            signal.seek(origin)
            samples = signal.read(limit - origin, dtype="float32", always_2d=True).mean(axis=1)
            samples = resample_poly(samples, MODEL_RATE // factor, sr // factor)
            try:
                if len(samples) < RECEPTIVE_FIELD or not np.isfinite(samples).all() or not np.any(samples):
                    raise ValueError("Silent, invalid or undersized audio window")
                with torch.inference_mode():
                    logits, _ = model(torch.from_numpy(samples).unsqueeze(0).to(device))
                    probs = logits[0].float().log_softmax(dim=-1).cpu().numpy()
                if len(probs) != 1 + (len(samples) - RECEPTIVE_FIELD) // STRIDE:
                    raise RuntimeError("Unexpected WAV2VEC2_ASR_BASE_960H emission clock")
                result = align_window(
                    line, probs, labels, sample_rate=sr, num_frames=frames,
                    input_start_frame=origin, window=(start, stop),
                )
                result.update(status="candidate", model_context_start_frame=origin, model_context_end_frame=limit)
            except ValueError as exc:
                result = {
                    "status": "unresolved", "reason": str(exc),
                    "window_start_frame": start, "window_end_frame": stop, "words": [],
                }
            lines.append(dict(result, canonical_line=occurrence, text=line))
    return {
        "schema": "stemlab.lyric-ctc.v1", "canonical_text": lyrics, "lines": lines,
        "source": {
            "path": str(audio.resolve()), "sha256": sha256_file(audio),
            "sample_rate": sr, "num_frames": frames,
        },
        "model": {
            "name": "WAV2VEC2_ASR_BASE_960H", "checkpoint_sha256": CHECKPOINT_SHA256,
            "torchaudio": version("torchaudio"), "device": device,
            "stride_seconds": STRIDE / MODEL_RATE, "context_seconds": context_seconds,
        },
        "policy": "Candidate grapheme boundaries from speech-trained CTC, not recognition, "
        "sustained-vowel release times, or listening approval.",
        "listening_qa": "pending", "accepted": False,
    }


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--audio", type=Path, required=True)
    parser.add_argument("--lyrics", type=Path, required=True)
    parser.add_argument("--windows", type=Path, required=True, help="JSON list of [start, end] seconds per lyric line")
    parser.add_argument("--checkpoint", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True, help="New JSON file")
    parser.add_argument("--device", default="cpu")
    parser.add_argument("--context-seconds", type=float, default=0.8)
    args = parser.parse_args()
    if args.output.exists() or args.output.is_symlink():
        parser.error("Output already exists; choose a new evidence file")
    result = align_audio(
        args.audio, args.lyrics.read_text(encoding="utf-8-sig"),
        json.loads(args.windows.read_text(encoding="utf-8-sig")), args.checkpoint,
        device=args.device, context_seconds=args.context_seconds,
    )
    with args.output.open("x", encoding="utf-8") as stream:
        json.dump(result, stream, indent=2, ensure_ascii=False, allow_nan=False)
        stream.write("\n")
    print(f"{sum(line['status'] == 'candidate' for line in result['lines'])}/{len(result['lines'])} line candidates")


if __name__ == "__main__":
    main()
