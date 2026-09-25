import json

import pytest

from stemlab.canonical import (
    _parse_lrc,
    load_canonical,
    normalise_canonical_metadata,
    save_canonical,
)
from stemlab.webui import _first_detected_beat


def test_canonical_metadata_accepts_bpm_lyrics_and_timing():
    result = normalise_canonical_metadata(
        {
            "bpm": "145",
            "lyrics": "One\nTwo",
            "lyric_timing": [
                {"start": 1.0, "end": 2.0, "text": "One"},
                {"start": 2.0, "text": "Two"},
            ],
        }
    )
    assert result["bpm"] == 145.0
    assert result["lyrics"] == "One\nTwo"
    assert result["lyric_timing"][0] == {"start": 1.0, "end": 2.0, "text": "One"}
    assert result["lyric_timing"][1]["end"] == pytest.approx(2.75)


def test_lrc_blank_timestamp_ends_previous_lyric():
    events = _parse_lrc(
        "[00:02.89]No crown, no concrete\n"
        "[00:05.10]\n"
        "[00:06.00]Just mountain breath and moonlit stone\n"
        "[00:09.25]\n"
    )
    assert events == [
        {"start": 2.89, "end": 5.10, "text": "No crown, no concrete"},
        {"start": 6.0, "end": 9.25, "text": "Just mountain breath and moonlit stone"},
    ]


def test_canonical_metadata_rejects_implausible_bpm():
    with pytest.raises(ValueError):
        normalise_canonical_metadata({"bpm": 0})
    with pytest.raises(ValueError):
        normalise_canonical_metadata({"bpm": 401})


def test_save_and_load_canonical_is_hash_worktree_local(tmp_path):
    saved = save_canonical(
        tmp_path,
        {
            "bpm": 145,
            "lyrics": "Arcadia...",
            "lyric_timing": "[00:02.89]Arcadia...\n[00:04.00]\n",
        },
    )
    assert (tmp_path / "canonical.json").is_file()
    assert load_canonical(tmp_path) == saved


def test_first_detected_beat_prefers_consensus(tmp_path):
    beats = tmp_path / "beats"
    beats.mkdir()
    (beats / "beatnet.json").write_text(
        json.dumps({"beats": [0.31, 0.72]}),
        encoding="utf-8",
    )
    assert _first_detected_beat(tmp_path) == (0.31, "beats/beatnet.json")

    (beats / "consensus.json").write_text(
        json.dumps({"beats": [0.42, 0.83]}),
        encoding="utf-8",
    )
    assert _first_detected_beat(tmp_path) == (0.42, "beats/consensus.json")
