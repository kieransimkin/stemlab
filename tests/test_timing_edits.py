from __future__ import annotations
import hashlib
import json
import wave
from pathlib import Path

import pytest

from stemlab import timing_edits


def make_root(tmp_path: Path) -> tuple[Path, str]:
    audio = tmp_path / "song.wav"
    with wave.open(str(audio), "wb") as handle:
        handle.setnchannels(1)
        handle.setsampwidth(2)
        handle.setframerate(8000)
        handle.writeframes(b"\0\0" * 32000)
    sha = hashlib.sha256(audio.read_bytes()).hexdigest()
    root = tmp_path / sha
    (root / ".source").mkdir(parents=True)
    (root / ".source" / "upload.wav").write_bytes(audio.read_bytes())
    (root / "canonical.json").write_text(
        json.dumps(
            {
                "bpm": 120,
                "lyrics": "Hello world\nOne more line",
                "lyric_timing": [
                    {"start": 0.125, "end": 1.125, "text": "Hello world"},
                    {"start": 1.125, "end": 2.125, "text": "One more line"},
                ],
                "sections": [
                    {"start": 0.125, "end": 1.125, "label": "INTRO"},
                    {"start": 1.125, "end": 2.125, "label": "VERSE 1"},
                ],
            }
        ),
        encoding="utf-8",
    )
    return root, sha


def test_seed_source_exact_and_fixed_export(tmp_path):
    root, hash_value = make_root(tmp_path)
    doc, saved, rev, warnings = timing_edits.read_or_seed(root, hash_value)
    assert not saved and rev is None and any("unverified" in x for x in warnings)
    assert doc["lines"][0]["start_frame"] == 1000
    assert doc["clock_mode"] == "fixed"
    exported = timing_edits.export_document(root, hash_value, doc)
    assert "[00:00.125]Hello world" in exported["line_lrc"]
    assert "[SECTION: INTRO]" in exported["cue_lrc"]
    assert "[SECTION: VERSE 1]" in exported["cue_lrc"]
    assert exported["clock"]["offset_pips"] == 0  # no consensus: never invent first beat


def test_enforced_section_names(tmp_path):
    assert timing_edits.cue_name("section", "verse 1") == ("SECTION", "VERSE 1")
    assert timing_edits.cue_name("DROP", "CHORUS 1") == ("DROP", "CHORUS 1")
    assert timing_edits.cue_name("ENTRY", "VOCAL INTRO") == ("ENTRY", "VOCAL INTRO")
    for type_, name in [
        ("CRASH", "VERSE"),
        ("SECTION", "SILLY RANDOM NAME"),
        ("SECTION", "VERSES"),
        ("BREAK", "INTRO\nDROP"),
        ("SECTION", ""),
    ]:
        with pytest.raises(ValueError):
            timing_edits.cue_name(type_, name)


def test_edit_validation_words_bound_to_lines_and_concurrency(tmp_path):
    root, hash_value = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, hash_value)
    doc["words"] = [
        {
            "id": "word-0001",
            "line_id": doc["lines"][0]["id"],
            "start_frame": 1200,
            "end_frame": 2000,
            "word": "Hello",
        }
    ]
    original = timing_edits.preview(root, hash_value, doc)
    saved, revision = timing_edits.save(root, hash_value, original, None)
    assert timing_edits.read_or_seed(root, hash_value)[2] == revision
    assert saved["words"][0]["word"] == "Hello"
    with pytest.raises(FileExistsError):
        timing_edits.save(root, hash_value, saved, None)
    saved["words"][0]["end_frame"] = saved["lines"][1]["start_frame"] + 10
    with pytest.raises(ValueError, match="Word end"):
        timing_edits.preview(root, hash_value, saved)


def test_import_word_tsv_and_cue_lrc(tmp_path):
    root, hash_value = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, hash_value)
    words = timing_edits.import_text(
        root,
        hash_value,
        doc,
        kind="words",
        format="tsv",
        text="start\tend\tprobability\tword\n0.150\t0.350\t0.97\tHello\n0.400\t0.600\t0.8\tworld\n",
    )
    assert len(words["words"]) == 2
    assert words["words"][1]["line_id"] == words["lines"][0]["id"]
    cues = timing_edits.import_text(
        root,
        hash_value,
        doc,
        kind="cues",
        format="lrc",
        text="[00:00.125][SECTION: INTRO]\n[00:01.125][DROP: CHORUS 1]\n",
    )
    assert cues["cues"][1]["type"] == "DROP"
    with pytest.raises(ValueError, match="Nonstandard"):
        timing_edits.import_text(
            root,
            hash_value,
            doc,
            kind="cues",
            format="lrc",
            text="[00:00.125][SECTION: UNAPPROVED STUFF]\n",
        )
    with pytest.raises(ValueError, match="Remove or export"):
        timing_edits.import_text(
            root, hash_value, words, kind="lines", format="lrc", text="[00:00.50]Changed parent\n"
        )


def test_source_mismatch_and_missing_beat_map_cannot_silently_use_fixed(tmp_path):
    root, hash_value = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, hash_value)
    with pytest.raises(ValueError, match="SHA-256"):
        timing_edits.preview(root, hash_value, {**doc, "source_sha256": "b" * 64})
    doc["clock_mode"] = "variable"
    with pytest.raises((ValueError, FileExistsError)):
        timing_edits.preview(root, hash_value, doc)


def test_import_enhanced_word_lrc_uses_explicit_display_boundaries(tmp_path):
    root, source = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, source)
    rows = timing_edits.import_text(
        root,
        source,
        doc,
        kind="words",
        format="lrc",
        text="[00:01.125]<00:01.200>One <00:01.400>more <00:01.600>line\n",
    )
    assert [r["word"] for r in rows["words"]] == ["One", "more", "line"]
    assert rows["words"][0]["end_frame"] == rows["words"][1]["start_frame"]
    assert rows["review_status"] == "draft"


def test_line_lrc_clear_time_remains_explicit_end(tmp_path):
    root, source = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, source)
    imported = timing_edits.import_text(
        root,
        source,
        doc,
        kind="lines",
        format="lrc",
        text="[00:00.125]Hello world\n[00:00.750]\n[00:01.125]One more line\n",
    )
    assert imported["lines"][0]["end_frame"] == 6000
    assert imported["lines"][1]["start_frame"] == 9000


def test_word_lrc_offsets_are_not_silently_dropped(tmp_path):
    root, source = make_root(tmp_path)
    doc, *_ = timing_edits.read_or_seed(root, source)
    imported = timing_edits.import_text(
        root,
        source,
        doc,
        kind="words",
        format="lrc",
        text="[offset:100]\n[00:01.300]<00:01.300>One <00:01.500>more <00:01.700>line\n",
    )
    assert imported["words"][0]["start_frame"] == 9600
    with pytest.raises(ValueError, match="Multiple word-LRC offsets"):
        timing_edits.import_text(
            root,
            source,
            doc,
            kind="words",
            format="lrc",
            text="[offset:1]\n[offset:2]\n[00:01.500]Hello\n",
        )


def test_combined_lrc_round_trip_separates_word_gaps_line_holds_and_clears(tmp_path):
    root, source = make_root(tmp_path)
    original, _, revision, _ = timing_edits.read_or_seed(root, source)
    text = (
        "\ufeff[ar:Test Artist]\r\n[re:Draft]\r\n[offset:100]\r\n"
        "[00:00.225]<00:00.250>Hello,<00:00.350> <00:00.400>world!<00:00.500>\r\n"
        "[00:00.750]\r\n"
        "[00:01.225]<00:01.225>We're <00:01.400>here.<00:01.500>\r\n"
        "[00:01.850]\r\n"
        "[00:01.850]A line with no word timing\r\n"
        "[00:02.350]\r\n"
    )
    imported = timing_edits.import_text(
        root, source, original, kind="combined", format="alrc", text=text
    )
    assert [(x["text"], x["start_frame"], x["end_frame"]) for x in imported["lines"]] == [
        ("Hello, world!", 1000, 5200),
        ("We're here.", 9000, 14000),
        ("A line with no word timing", 14000, 18000),
    ]
    assert [(x["word"], x["start_frame"], x["end_frame"]) for x in imported["words"]] == [
        ("Hello,", 1200, 2000), ("world!", 2400, 3200), ("We're", 9000, 10400), ("here.", 10400, 11200)
    ]
    assert imported["cues"] == original["cues"]
    assert imported["fixed_clock"] == original["fixed_clock"]
    assert imported["review_status"] == "draft"
    assert timing_edits.read_or_seed(root, source)[0] == original

    # One frame inside the hold is editable and survives save/export/reimport.
    imported["lines"][0]["end_frame"] += 1
    imported["words"][0]["end_frame"] -= 1
    saved, _ = timing_edits.save(root, source, imported, revision)
    exported = timing_edits.export_document(root, source, saved)
    assert exported["combined_lrc_error"] is None
    assert "<00:00.249875> <00:00.300>world!<00:00.400>\n[00:00.650125]" in exported["combined_lrc"]
    assert "<00:01.400>\n[00:01.750]A line" in exported["combined_lrc"]
    assert timing_edits.import_text(
        root, source, saved, kind="combined", format="lrc", text=exported["combined_lrc"]
    ) == saved


@pytest.mark.parametrize(
    ("text", "reason"),
    [
        ("[00:00.100]<00:00.200>A<00:00.300>\n[00:00.250]", "inside their line"),
        ("[00:00.100]<00:00.090>A<00:00.200>", "inside their line"),
        ("[00:00.100]<00:00.200>A<00:00.200>", "must advance"),
        ("[00:00.500]A\n[00:00.300]B", "Line timestamps must advance"),
        ("[00:00.100]A\n[00:04.100]", "outside the recording"),
        ("[00:00.100]A <00:00.200>B", "before the text"),
        ("[00:00.100]<00:60.000>A", "Malformed lyric text"),
        ("[offset:250]\n[00:00.100]A", "outside the recording"),
        ("[offset:0]\n[offset:1]\n[00:00.100]A", "Multiple LRC offsets"),
    ],
)
def test_combined_lrc_rejects_invalid_intervals_without_saving(tmp_path, text, reason):
    root, source = make_root(tmp_path)
    doc, _, _, _ = timing_edits.read_or_seed(root, source)
    with pytest.raises(ValueError, match=reason):
        timing_edits.import_text(root, source, doc, kind="combined", format="lrc", text=text)
    assert timing_edits.read_or_seed(root, source)[0] == doc


def test_combined_lrc_text_conflict_keeps_separate_exports_available(tmp_path):
    root, source = make_root(tmp_path)
    doc, _, _, _ = timing_edits.read_or_seed(root, source)
    doc["words"].append(
        dict(id="word-partial", line_id=doc["lines"][0]["id"],
             start_frame=1600, end_frame=2400, word="Hello")
    )
    exported = timing_edits.export_document(root, source, doc)
    assert exported["combined_lrc"] is None
    assert "text without timed words" in exported["combined_lrc_error"]
    assert "Hello world" in exported["line_lrc"]
    assert exported["word_json"]["words"][0]["word"] == "Hello"
