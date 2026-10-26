import copy
import hashlib
import json
import wave

import pytest

from stemlab.lyric_fusion import LOCK_SCHEMA, REQUEST_SCHEMA, combine, export_request
from stemlab.word_alignment import reconcile

TEXT = "Signals cross the quiet night\nVoices find a clear way home"
AUDIO = {"sha256": "a" * 64, "sample_rate": 1000, "num_frames": 14000}


def candidate(identity, missing=(), view=None, offsets=None):
    observed = []
    for index, word in enumerate(TEXT.split()):
        if index not in missing:
            start = index + 1 + (offsets or {}).get(index, 0)
            observed.append(dict(word=word, start=start, end=start + .3, probability=.99))
    result = reconcile(TEXT, observed, 14)
    result["provenance"] = {"master_sha256": AUDIO["sha256"]}
    return dict(id=identity, view_id=view or identity, source_clock="original_master_seconds",
                alignment=result)


def test_fills_gaps_with_exact_observations_and_retains_missing_words():
    a, b = candidate("a", (2, 8, 10)), candidate("b", (1, 7, 10))
    before = copy.deepcopy([a, b])
    result = combine(TEXT, AUDIO, [a, b])
    assert result["canonical_text"] == TEXT
    assert result["summary"]["timed_tokens"] == 10
    assert result["summary"]["gap_fills"] == 2
    assert result["words"][2]["source"] == "b"
    assert result["words"][2]["start_frame"] == 3000
    assert result["words"][10]["start_frame"] is None
    assert result["lines"][-1]["review_reasons"][-1] == "line_end_not_observed"
    assert [a, b] == before
    assert not result["accepted"] and result["listening_qa"] == "pending"


def test_corroboration_is_view_grouped_and_never_averages():
    a = candidate("a")
    duplicate = candidate("duplicate", view="a", offsets={0: .04})
    result = combine(TEXT, AUDIO, [a, duplicate])
    assert result["words"][0]["certainty"] == "single_view_exact"
    b = candidate("b", offsets={0: .06})
    result = combine(TEXT, AUDIO, [a, duplicate, b])
    assert result["words"][0]["certainty"] == "corroborated_exact"
    assert result["words"][0]["start_frame"] in (1000, 1040, 1060)
    assert result["words"][0]["start_frame"] != 1033


def test_conflicts_are_retained_and_candidate_order_does_not_change_corroboration():
    a, b, c = candidate("a"), candidate("b"), candidate("c", offsets={3: .6})
    for inputs in ([a, b, c], [c, b, a]):
        result = combine(TEXT, AUDIO, inputs)
        row = result["words"][3]
        assert row["start_frame"] == 4000
        assert row["certainty"] == "corroborated_exact"
        assert "timing_disagreement" in row["review_reasons"]
        assert len(row["alternatives"]) == 3


def test_global_path_never_moves_or_clamps_overlapping_evidence():
    a, b = candidate("a"), candidate("b")
    a["alignment"]["words"][3].update(start=3.1, end=3.2)
    result = combine(TEXT, AUDIO, [a, b])
    rows = [x for x in result["words"] if x["start_frame"] is not None]
    assert all(a["end_frame"] <= b["start_frame"] for a, b in zip(rows, rows[1:]))
    for row in rows:
        assert any(x["source"] == row["source"] and x["start_frame"] == row["start_frame"]
                   and x["end_frame"] == row["end_frame"] for x in row["alternatives"])


def test_explicit_artist_locks_are_preserved_and_impossible_locks_fail():
    locks = dict(schema=LOCK_SCHEMA, authority="artist_confirmed", source_sha256=AUDIO["sha256"],
                 canonical_text_sha256=hashlib.sha256(TEXT.encode()).hexdigest(),
                 sample_rate=1000, num_frames=14000,
                 words=[dict(canonical_index=3, word="quiet", start_frame=4017, end_frame=4321)])
    result = combine(TEXT, AUDIO, [candidate("a")], locks=locks)
    assert result["words"][3]["start_frame"] == 4017
    assert result["words"][3]["end_frame"] == 4321
    assert result["words"][3]["decision"] == "artist_locked"
    locks["words"].append(dict(canonical_index=4, word="night", start_frame=4200, end_frame=5000))
    with pytest.raises(ValueError, match="overlap"):
        combine(TEXT, AUDIO, [candidate("a")], locks=locks)


@pytest.mark.parametrize("change", ["master", "clock", "text", "inventory"])
def test_rejects_incompatible_source_or_text(change):
    a = candidate("a")
    if change == "master":
        a["alignment"]["provenance"]["master_sha256"] = "b" * 64
    elif change == "clock":
        a["source_clock"] = "unknown"
    elif change == "text":
        a["alignment"]["canonical_text"] += " changed"
    else:
        a["alignment"]["words"][0]["index"] = 9
    with pytest.raises(ValueError):
        combine(TEXT, AUDIO, [a])


def test_low_coverage_and_decoder_loops_cannot_inflate_fusion():
    a, b, c = candidate("a"), candidate("b", range(5)), candidate("c")
    c["alignment"]["provenance"]["repetition_diagnostics"] = {"suspicious_decoder_repetition": True}
    result = combine(TEXT, AUDIO, [a, b, c])
    assert [row["id"] for row in result["rejected_candidates"]] == ["b", "c"]
    assert result["summary"]["corroborated_tokens"] == 0


def test_native_export_is_source_bound_lyric_only_and_refuses_overwrite(tmp_path):
    analysis = tmp_path / "analysis"
    analysis.mkdir()
    master = analysis / "source.wav"
    with wave.open(str(master), "wb") as stream:
        stream.setparams((1, 2, 1000, 0, "NONE", "not compressed"))
        stream.writeframes(b"\0\0" * 14000)
    sha = hashlib.sha256(master.read_bytes()).hexdigest()
    (analysis / "analysis.json").write_text(json.dumps({"source": {"sha256": sha, "copied_path": "source.wav"}}))
    (tmp_path / "lyrics.txt").write_text(TEXT)
    inputs = []
    for identity, missing in (("a", (2, 8, 10)), ("b", (1, 7, 10))):
        c = candidate(identity, missing)
        c["alignment"]["provenance"]["master_sha256"] = sha
        filename = identity + ".json"
        (tmp_path / filename).write_text(json.dumps(c["alignment"]))
        inputs.append({"id": identity, "view_id": identity, "path": filename,
                       "source_clock": "original_master_seconds"})
    request = tmp_path / "request.json"
    request.write_text(json.dumps({"schema": REQUEST_SCHEMA, "analysis": "analysis",
                                   "lyrics": "lyrics.txt", "candidates": inputs}))
    out = tmp_path / "combined"
    result = export_request(request, out)
    assert result["summary"]["timed_tokens"] == 10
    assert "Signals cross the quiet night" in (out / "lyrics.lrc").read_text()
    assert not any(out.glob("*.wav"))
    assert not (out / "cue.lrc").exists()
    assert "UNTIMED" in (out / "selection.svg").read_text()
    engine = json.loads((out / "request-provenance.json").read_text())["engine"]
    assert engine["name"] == "StemLab" and len(engine["implementation_sha256"]) == 64
    for name, expected in json.loads((out / "manifest.json").read_text()).items():
        assert hashlib.sha256((out / name).read_bytes()).hexdigest() == expected
    with pytest.raises(FileExistsError):
        export_request(request, out)


def test_invalid_intervals_cannot_fill_gaps_or_override_artist_locks():
    a, b = candidate("a"), candidate("b")
    for source in (a, b):
        source["alignment"]["words"][0].update(start=1.0, end=1.0)
        source["alignment"]["words"][1].update(start=-1.0, end=.1)
        source["alignment"]["words"][2].update(start=14.0, end=15.0)
    result = combine(TEXT, AUDIO, [a, b])
    assert all(row["start_frame"] is None for row in result["words"][:3])
    assert result["summary"]["timed_tokens"] == 8
