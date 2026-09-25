from pathlib import Path

import numpy as np

from stemlab.analysis.song_map import analyze_song_map
from stemlab.types import BeatResult


def test_song_map_prefers_canonical_and_compares_machine_boundaries(tmp_path: Path):
    deep = tmp_path / "deep"
    (deep / "sonic").mkdir(parents=True)
    (deep / "rhythm").mkdir(parents=True)
    times = np.arange(0, 20, 1.0)
    np.savez_compressed(
        deep / "sonic" / "curves.npz",
        time_seconds=times,
        rms_dbfs=np.linspace(-20, -10, len(times)),
        spectral_centroid_hz=np.linspace(1000, 2000, len(times)),
        spectral_flatness=np.linspace(.05, .2, len(times)),
        rolloff85_hz=np.linspace(4000, 7000, len(times)),
    )
    np.savez_compressed(
        deep / "rhythm" / "rhythm_curves.npz",
        time_seconds=times,
        onset_strength=np.ones_like(times),
        onset_peaks_seconds=np.array([1, 3, 5, 7, 11, 13, 15, 17], dtype=float),
    )
    canonical = {
        "sections": [
            {"start": 0, "end": 10, "label": "Verse"},
            {"start": 10, "end": 20, "label": "Chorus"},
        ]
    }
    structure = {
        "segments": [
            {"start": 0, "end": 9, "label": "verse"},
            {"start": 9, "end": 20, "label": "chorus"},
        ]
    }
    beats = [BeatResult("consensus", list(np.arange(0, 20, .5)), [0, 2, 4, 6, 8, 10], 120)]
    harmony = {
        "chords": {"collapsed_progression": [
            {"start": 0, "end": 10, "label": "Am"},
            {"start": 10, "end": 20, "label": "F"},
        ]}
    }
    lyrics = {"lines": [
        {"start": 2, "end": 4, "text": "verse line"},
        {"start": 12, "end": 14, "text": "chorus line"},
    ]}
    result = analyze_song_map(
        deep / "song_map",
        canonical=canonical,
        structure_result=structure,
        vamp_result=None,
        beat_results=beats,
        sonic_result={"duration_seconds": 20},
        rhythm_result={},
        harmony_result=harmony,
        lyrics_result=lyrics,
        deep_root=deep,
    )
    assert result["section_source"] == "canonical"
    assert [x["label"] for x in result["sections"]] == ["Verse", "Chorus"]
    assert result["sections"][0]["harmony"]["chords"][0]["label"] == "Am"
    assert result["sections"][1]["lyrics"][0]["text"] == "chorus line"
    assert result["machine_vs_canonical_boundaries"]["median_absolute_error_seconds"] == 1.0
