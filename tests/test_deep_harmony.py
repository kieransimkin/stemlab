from pathlib import Path

from stemlab.analysis.harmony import analyze_harmony
from stemlab.types import BeatResult


def test_harmonic_progression_and_meter_alignment(tmp_path):
    vamp = {
        "analyses": [
            {
                "slug": "chords",
                "events": [
                    {"start": 0.0, "end": 2.0, "label": "C"},
                    {"start": 2.0, "end": 4.0, "label": "G"},
                    {"start": 4.0, "end": 6.0, "label": "Am"},
                    {"start": 6.0, "end": 8.0, "label": "F"},
                ],
            },
            {
                "slug": "nnls_chroma",
                "events": [{"start": 0.0, "values": [0, 0, 0, 1, 0, 0, 0, .8, 0, 0, .6, 0]}] * 4,
            },
            {"slug": "key", "events": [{"start": 0.0, "label": "C major", "values": []}]},
        ]
    }
    beats = [BeatResult("consensus", [i * .5 for i in range(16)], [0, 2, 4, 6], 120.0)]
    result = analyze_harmony(vamp, beats, tmp_path)
    assert result["vamp_key"] == "C major"
    assert result["chords"]["event_count"] == 4
    assert result["chords"]["top_bigrams"][0]["progression"] == ["C", "G"]
    assert result["chords"]["median_beats_per_chord"] == 4.0


def test_functional_harmony_maps_cadence(tmp_path: Path):
    from stemlab.analysis.harmony import analyze_harmony
    vamp = {
        "analyses": [
            {"slug": "chords", "events": [
                {"start": 0, "end": 2, "label": "C"},
                {"start": 2, "end": 4, "label": "F"},
                {"start": 4, "end": 6, "label": "G"},
                {"start": 6, "end": 8, "label": "C"},
            ]},
            {"slug": "key", "events": [{"start": 0, "end": 8, "label": "C major", "values": []}]},
        ]
    }
    result = analyze_harmony(vamp, [], tmp_path)
    functional = result["functional_harmony"]
    assert [x["degree"] for x in functional["progression"]] == ["I", "IV", "V", "I"]
    assert any(x["type"] == "dominant-tonic" for x in functional["cadence_candidates"])
