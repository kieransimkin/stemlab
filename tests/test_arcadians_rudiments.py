"""Real-audio smoke test against the optional published DanceRudiments C++ runtime.

Requires: pip install -e '.[rudiments]'. This test never pretends a mix is stems.
With STEMLAB_REQUIRE_NATIVE_RUDIMENTS=1, missing native imports are failures, not skips.
"""
import importlib
import os
from pathlib import Path

import pytest

from stemlab.analysis.rudiment_matches import RudimentConfig, analyze_rudiments
from stemlab.util import sha256_file


def test_bundled_arcadians_matches_multiple_official_patterns(tmp_path):
    # Local/base CI runs may skip this opt-in test. The native CI matrix sets
    # the strict flag so imports fail loudly instead of producing a green skip.
    for module in ("dancerudiments", "dancerudiments_authoring"):
        if os.environ.get("STEMLAB_REQUIRE_NATIVE_RUDIMENTS") == "1":
            importlib.import_module(module)
        else:
            pytest.importorskip(module)
    audio = Path(__file__).resolve().parents[1] / "examples/arcadians/Arcadians - 320kbps.mp3"
    assert audio.exists(), "Bundled Arcadians reference audio required"
    assert sha256_file(audio) == (
        "5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de"
    ), "Unexpected Arcadians fixture bytes"
    report = analyze_rudiments(audio, tmp_path / "rudiments", bpm=145,
        config=RudimentConfig(collection="initial", top_per_stem=28))
    assert report["grid_source"] == "explicit_bpm_unverified_phase"
    assert report["source_count"] == 1
    assert report["pattern_count_catalogue"] == 28
    assert report["sources"][0]["peak_count"] >= 1000
    print(f"Arcadians native: {report['sources'][0]['peak_count']} peaks; "
          f"{report['total_matches']} candidate matches")
    assert report["total_matches"] >= 12
    assert len({m["pattern"] for m in report["sources"][0]["matches"]}) >= 12
    assert report["sources"][0]["matches"][0]["similarity"] >= .68
