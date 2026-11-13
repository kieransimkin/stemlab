"""Enhanced lyric LRC with independent line and word intervals."""

from __future__ import annotations

import re
from collections import defaultdict
from fractions import Fraction
from itertools import count

from .cues import OFFSET


_TIME = r"([0-9]{1,9}):([0-5][0-9])(?:[.:]([0-9]{1,9}))?"
_LINE = re.compile(rf"\[{_TIME}\]")
_WORD = re.compile(rf"<{_TIME}>")
_METADATA = re.compile(r"\[[A-Za-z][A-Za-z0-9_-]*:[^\[\]]*\]")
_TEXT = re.compile(r"\S")
_STAMP_LIKE = re.compile(r"[<\[]\s*[+-]?[0-9]+[:.]")


def _seconds(tag: re.Match) -> Fraction:
    minutes, seconds, fraction = tag.groups()
    fraction = fraction or "0"
    return int(minutes) * 60 + int(seconds) + Fraction(int(fraction), 10 ** len(fraction))


def _ids(prefix, reserved):
    for index in count(1):
        identifier = f"{prefix}-{index:04d}"
        if identifier not in reserved:
            yield identifier


def parse(text: str, sample_rate: int, num_frames: int, *, cue_ids=()) -> tuple[list[dict], list[dict]]:
    """Map a combined LRC to native frames on the selected recording's clock.

    A blank square row clears the visible line. Empty inline spans mark word
    releases and gaps. A last word with no following tag ends at its line clear.
    """
    events = []
    offset = None
    for number, raw in enumerate(text.removeprefix("\ufeff").splitlines(), 1):
        body = raw.strip()
        if not body:
            continue
        if match := OFFSET.fullmatch(body):
            if offset is not None:
                raise ValueError("Multiple LRC offsets are ambiguous")
            offset = Fraction(int(match[1]), 1000)
            continue
        if re.match(r"^\[offset\s*:", body, re.IGNORECASE):
            raise ValueError(f"Invalid LRC offset on row {number}")
        if _METADATA.fullmatch(body):
            continue
        tag = _LINE.match(body)
        if tag is None:
            raise ValueError(f"Expected a line timestamp on LRC row {number}")
        events.append((_seconds(tag), body[tag.end():].strip(), number))

    offset = offset or Fraction(0)

    def frame(seconds):
        return round((seconds - offset) * sample_rate)

    previous_time = None
    previous_was_clear = False
    for seconds, body, number in events:
        # Allow the nearest timestamp at the source end to round back to its
        # exact last frame, as it does for exports with a recurring decimal.
        if seconds < offset or frame(seconds) > num_frames:
            raise ValueError(f"LRC row {number} is outside the recording")
        if previous_time is not None and (
            seconds < previous_time
            or (seconds == previous_time and (not previous_was_clear or not body))
        ):
            raise ValueError(f"Line timestamps must advance on LRC row {number}")
        previous_time = seconds
        previous_was_clear = not body

    lines, words = [], []
    reserved = set(cue_ids)
    line_ids = _ids("line-lrc", reserved)
    word_ids = _ids("word-lrc", reserved)
    for index, (seconds, body, number) in enumerate(events):
        start = frame(seconds)
        if not body:
            continue
        clear = frame(events[index + 1][0]) if index + 1 < len(events) else num_frames
        if not start < clear <= num_frames:
            raise ValueError(f"Line start and clear must form an interval on LRC row {number}")
        tags = list(_WORD.finditer(body))
        line_text = _WORD.sub("", body).strip()
        if not line_text or _STAMP_LIKE.search(line_text):
            raise ValueError(f"Malformed lyric text or timestamps on LRC row {number}")
        identifier = next(line_ids)
        lines.append(dict(id=identifier, start_frame=start, end_frame=clear, text=line_text))
        if not tags:
            continue
        if body[:tags[0].start()].strip():
            raise ValueError(f"Place a word timestamp before the text on LRC row {number}")
        times = [_seconds(tag) for tag in tags]
        boundaries = [frame(time) for time in times]
        clear_time = events[index + 1][0] if index + 1 < len(events) else None
        if (
            times[0] < seconds
            or boundaries[-1] > clear
            or (clear_time is not None and times[-1] > clear_time)
            or any(a >= b for a, b in zip(boundaries, boundaries[1:]))
        ):
            raise ValueError(f"Word timestamps must advance inside their line on LRC row {number}")
        for part, tag in enumerate(tags):
            stop = tags[part + 1].start() if part + 1 < len(tags) else len(body)
            word = body[tag.end():stop].strip()
            if not word:
                continue
            left = boundaries[part]
            right = boundaries[part + 1] if part + 1 < len(tags) else clear
            if left >= right:
                raise ValueError(f"Word interval must be positive on LRC row {number}")
            words.append(
                dict(id=next(word_ids), line_id=identifier, start_frame=left, end_frame=right, word=word)
            )

    if not lines:
        raise ValueError("Combined LRC has no timed lyric lines")
    return lines, words


def _stamp(frame: int, sample_rate: int, *, word: bool = False) -> str:
    # Prefer familiar milliseconds. Use a finer timestamp if milliseconds
    # would move a source frame, including at very short gaps or boundaries.
    for digits in (3, 6, 9):
        scale = 10 ** digits
        units = (frame * scale + sample_rate // 2) // sample_rate
        if round(Fraction(units * sample_rate, scale)) == frame:
            minutes, remainder = divmod(units, 60 * scale)
            seconds, decimal = divmod(remainder, scale)
            time = f"{minutes:02d}:{seconds:02d}.{decimal:0{digits}d}"
            return f"<{time}>" if word else f"[{time}]"
    raise ValueError("Combined LRC cannot represent this source clock")


def render(lines: list[dict], words: list[dict], sample_rate: int) -> str:
    """Render a validated edit document without changing its text or frames."""
    if not lines:
        raise ValueError("There are no lyric lines to export as combined LRC")
    by_line = defaultdict(list)
    for word in words:
        by_line[word["line_id"]].append(word)

    output = ["[offset:0]"]
    for index, line in enumerate(lines):
        text = line["text"]
        if _STAMP_LIKE.search(text):
            raise ValueError(f"Lyric line {index + 1} contains text that resembles a timing tag")
        row = [_stamp(line["start_frame"], sample_rate)]
        timed = by_line[line["id"]]
        if not timed:
            row.append(text)
        else:
            # A2 has one text stream. Each timed label must match a contiguous
            # segment of the line so the two tracks can round-trip together.
            cursor = 0
            prior_end = None
            for word in timed:
                value = word["word"]
                match = _TEXT.search(text, cursor)
                if match is None or not text.startswith(value, match.start()):
                    raise ValueError(f"Lyric line {index + 1} and its timed word text must match")
                start, end = word["start_frame"], word["end_frame"]
                if prior_end is not None and prior_end < start:
                    row.append(_stamp(prior_end, sample_rate, word=True))
                row.extend((text[cursor:match.start()], _stamp(start, sample_rate, word=True), value))
                cursor = match.start() + len(value)
                prior_end = end
            if text[cursor:].strip():
                raise ValueError(f"Lyric line {index + 1} has text without timed words")
            row.append(_stamp(prior_end, sample_rate, word=True))
        output.append("".join(row))
        clear = line["end_frame"]
        if index + 1 == len(lines) or clear < lines[index + 1]["start_frame"]:
            output.append(_stamp(clear, sample_rate))
    return "\n".join(output) + "\n"
