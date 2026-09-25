from __future__ import annotations

import math
import re
from collections import Counter, defaultdict
from pathlib import Path
from typing import Any

import numpy as np

from stemlab.util import write_json

WORD_RE = re.compile(r"[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?:['’][A-Za-zÀ-ÖØ-öø-ÿ]+)?")
VOWELS = set("AEIOU")
STOPWORDS = {
    "a", "an", "and", "are", "as", "at", "be", "been", "but", "by", "for", "from",
    "had", "has", "have", "he", "her", "him", "his", "i", "if", "in", "into", "is", "it",
    "its", "me", "my", "no", "not", "of", "on", "or", "our", "out", "she", "so", "that",
    "the", "their", "them", "then", "there", "they", "this", "to", "up", "us", "was", "we",
    "were", "what", "when", "where", "who", "will", "with", "you", "your", "just", "while",
}


def _words(text: str) -> list[str]:
    return [m.group(0).lower().replace("’", "'") for m in WORD_RE.finditer(text)]


def _normalise_line(line: str) -> str:
    return " ".join(_words(line))


def _cmu() -> dict[str, list[list[str]]] | None:
    try:
        import cmudict

        raw = cmudict.dict()
        return {str(k).lower(): list(v) for k, v in raw.items()}
    except Exception:
        return None


def _phones(word: str, dictionary: dict[str, list[list[str]]] | None) -> list[str] | None:
    if not dictionary:
        return None
    variants = dictionary.get(word.lower())
    return variants[0] if variants else None


def _syllable_count_word(word: str, dictionary: dict[str, list[list[str]]] | None) -> int:
    phones = _phones(word, dictionary)
    if phones:
        return max(1, sum(any(ch.isdigit() for ch in p) for p in phones))
    cleaned = re.sub(r"[^a-z]", "", word.lower())
    if not cleaned:
        return 0
    groups = re.findall(r"[aeiouy]+", cleaned)
    count = len(groups)
    if cleaned.endswith("e") and count > 1 and not cleaned.endswith(("le", "ye")):
        count -= 1
    return max(1, count)


def _rhyme_key(word: str, dictionary: dict[str, list[list[str]]] | None) -> str:
    phones = _phones(word, dictionary)
    if phones:
        # Keep the final stressed vowel and everything after it. If stress is
        # absent, fall back to the final vowel nucleus.
        idx = None
        for i in range(len(phones) - 1, -1, -1):
            if "1" in phones[i] or "2" in phones[i]:
                idx = i
                break
        if idx is None:
            for i in range(len(phones) - 1, -1, -1):
                if phones[i] and phones[i][0] in VOWELS:
                    idx = i
                    break
        if idx is not None:
            return " ".join(re.sub(r"\d", "", p) for p in phones[idx:])
    # Orthographic fallback keeps the analysis useful for names/out-of-vocab words.
    cleaned = re.sub(r"[^a-z]", "", word.lower())
    return cleaned[-3:] if len(cleaned) >= 3 else cleaned


def _line_records(lyrics: str, timing: list[dict[str, Any]] | None) -> list[dict[str, Any]]:
    lines = [line.strip() for line in lyrics.splitlines() if line.strip()]
    timed_by_norm: dict[str, list[dict[str, Any]]] = defaultdict(list)
    for item in timing or []:
        timed_by_norm[_normalise_line(str(item.get("text") or ""))].append(item)

    seen: Counter[str] = Counter()
    records = []
    for index, line in enumerate(lines):
        norm = _normalise_line(line)
        occurrence = seen[norm]
        seen[norm] += 1
        candidates = timed_by_norm.get(norm, [])
        t = candidates[occurrence] if occurrence < len(candidates) else None
        words = _words(line)
        records.append(
            {
                "index": index,
                "text": line,
                "normalised": norm,
                "words": words,
                "end_word": words[-1] if words else "",
                "start": float(t.get("start")) if t and t.get("start") is not None else None,
                "end": float(t.get("end")) if t and t.get("end") is not None else None,
            }
        )
    return records


def _rhyme_analysis(records: list[dict[str, Any]], dictionary) -> dict[str, Any]:
    key_to_letter: dict[str, str] = {}
    alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    classes: dict[str, list[int]] = defaultdict(list)
    scheme: list[str] = []

    for rec in records:
        end_word = rec["end_word"]
        key = _rhyme_key(end_word, dictionary) if end_word else ""
        rec["rhyme_key"] = key
        if not key:
            scheme.append("-")
            continue
        if key not in key_to_letter:
            n = len(key_to_letter)
            key_to_letter[key] = alphabet[n] if n < len(alphabet) else f"R{n + 1}"
        letter = key_to_letter[key]
        scheme.append(letter)
        classes[key].append(rec["index"])

    repeated_classes = [
        {
            "rhyme": key,
            "scheme": key_to_letter[key],
            "line_indexes": indexes,
            "end_words": [records[i]["end_word"] for i in indexes],
        }
        for key, indexes in classes.items()
        if len(indexes) >= 2
    ]
    repeated_classes.sort(key=lambda x: (-len(x["line_indexes"]), x["scheme"]))

    # Consecutive-line rhyme density is a useful simple signal for pop/rap writing.
    adjacent = 0
    adjacent_matches = 0
    for a, b in zip(records, records[1:]):
        if a.get("rhyme_key") and b.get("rhyme_key"):
            adjacent += 1
            adjacent_matches += int(a["rhyme_key"] == b["rhyme_key"])

    return {
        "scheme": " ".join(scheme),
        "classes": repeated_classes,
        "unique_rhyme_classes": len(classes),
        "adjacent_end_rhyme_rate": float(adjacent_matches / adjacent) if adjacent else None,
    }


def _internal_rhyme_density(records: list[dict[str, Any]], dictionary) -> float | None:
    comparisons = 0
    matches = 0
    for rec in records:
        words = rec["words"]
        if len(words) < 3:
            continue
        keys = [_rhyme_key(word, dictionary) for word in words]
        end_key = keys[-1]
        for key in keys[:-1]:
            if not key or not end_key:
                continue
            comparisons += 1
            matches += int(key == end_key)
    return float(matches / comparisons) if comparisons else None


def _key_terms(words: list[str]) -> list[dict[str, Any]]:
    terms = [w for w in words if len(w) >= 3 and w not in STOPWORDS and not w.isdigit()]
    counts = Counter(terms)
    return [{"term": term, "count": int(count)} for term, count in counts.most_common(24)]


def _ngrams(words: list[str], n: int) -> list[dict[str, Any]]:
    if len(words) < n:
        return []
    counts = Counter(tuple(words[i : i + n]) for i in range(len(words) - n + 1))
    return [
        {"phrase": " ".join(items), "count": int(count)}
        for items, count in counts.most_common(20)
        if count >= 2 and not all(word in STOPWORDS for word in items)
    ]


def _delivery(records: list[dict[str, Any]], dictionary) -> dict[str, Any]:
    timed = []
    for rec in records:
        if rec["start"] is None or rec["end"] is None or rec["end"] <= rec["start"]:
            continue
        syllables = sum(_syllable_count_word(w, dictionary) for w in rec["words"])
        duration = rec["end"] - rec["start"]
        timed.append(
            {
                "line_index": rec["index"],
                "start": rec["start"],
                "end": rec["end"],
                "words": len(rec["words"]),
                "syllables": syllables,
                "words_per_second": len(rec["words"]) / duration,
                "syllables_per_second": syllables / duration,
            }
        )
    if not timed:
        return {"timed_lines": [], "median_words_per_second": None, "median_syllables_per_second": None}
    return {
        "timed_lines": timed,
        "median_words_per_second": float(np.median([x["words_per_second"] for x in timed])),
        "median_syllables_per_second": float(np.median([x["syllables_per_second"] for x in timed])),
        "peak_syllables_per_second": float(max(x["syllables_per_second"] for x in timed)),
    }


def analyze_lyrics(
    lyrics: str,
    output_dir: Path,
    *,
    timing: list[dict[str, Any]] | None = None,
    source: str = "canonical",
) -> dict[str, Any]:
    """Analyse rhyme, repetition, prosody, lexical variety and timed delivery."""
    output_dir.mkdir(parents=True, exist_ok=True)
    dictionary = _cmu()
    records = _line_records(lyrics, timing)
    all_words = [word for rec in records for word in rec["words"]]
    normal_lines = [rec["normalised"] for rec in records if rec["normalised"]]
    line_counts = Counter(normal_lines)

    syllables_per_line = [
        sum(_syllable_count_word(word, dictionary) for word in rec["words"])
        for rec in records
    ]
    for rec, syllables in zip(records, syllables_per_line):
        rec["syllables"] = syllables

    rhyme = _rhyme_analysis(records, dictionary)
    rhyme["internal_end_rhyme_density"] = _internal_rhyme_density(records, dictionary)

    result = {
        "source": source,
        "text": lyrics,
        "line_count": len(records),
        "word_count": len(all_words),
        "unique_word_count": len(set(all_words)),
        "type_token_ratio": float(len(set(all_words)) / len(all_words)) if all_words else None,
        "mean_words_per_line": float(np.mean([len(rec["words"]) for rec in records])) if records else None,
        "median_syllables_per_line": float(np.median(syllables_per_line)) if syllables_per_line else None,
        "repetition": {
            "repeated_lines": [
                {"line": line, "count": int(count)}
                for line, count in line_counts.most_common()
                if count >= 2
            ],
            "top_bigrams": _ngrams(all_words, 2),
            "top_trigrams": _ngrams(all_words, 3),
        },
        "rhyme": rhyme,
        "lexical": {
            "key_terms": _key_terms(all_words),
        },
        "delivery": _delivery(records, dictionary),
        "lines": records,
        "method_notes": {
            "phonetics": "CMU Pronouncing Dictionary when available, with an orthographic fallback for names and out-of-vocabulary words.",
            "rhyme": "End-rhyme class uses the final stressed vowel nucleus and following phonemes; this is a useful signal, not a complete theory of slant rhyme.",
        },
    }
    write_json(output_dir / "lyrics.json", result)
    return result


def transcript_to_lyrics(whisper_result: dict[str, Any] | None) -> tuple[str, list[dict[str, Any]]]:
    """Produce a line-like text/timing representation when canonical lyrics are absent."""
    if not whisper_result:
        return "", []
    segments = whisper_result.get("segments") or []
    text_lines = []
    timing = []
    for seg in segments:
        text = str(seg.get("text") or "").strip()
        if not text:
            continue
        text_lines.append(text)
        timing.append({"start": seg.get("start"), "end": seg.get("end"), "text": text})
    return "\n".join(text_lines), timing
