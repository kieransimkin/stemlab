"""Real-audio smoke test against the optional published DanceRudiments C++ runtime.

Requires: pip install -e '.[rudiments]'. This test never pretends a mix is stems.
"""
from pathlib import Path

import pytest

from stemlab.analysis.rudiment_matches import RudimentConfig, analyze_rudiments


def test_bundled_arcadians_matches_multiple_official_patterns(tmp_path):
    pytest.importorskip("dancerudiments")
    pytest.importorskip("dancerudiments_authoring")
    audio = Path(__file__).resolve().parents[1] / "examples/arcadians/Arcadians - 320kbps.mp3"
    assert audio.exists(), "Bundled Arcadians reference audio required"
    report = analyze_rudiments(audio, tmp_path / "rudiments", bpm=145,
        config=RudimentConfig(collection="initial", top_per_stem=28))
    assert report["grid_source"] == "explicit_bpm_unverified_phase"
    assert report["source_count"] == 1
    assert report["pattern_count_catalogue"] == 28
    assert report["sources"][0]["peak_count"] >= 1000
    assert report["total_matches"] >= 12
    assert len({m["pattern"] for m in report["sources"][0]["matches"]}) >= 12
    assert report["sources"][0]["matches"][0]["similarity"] >= .68
