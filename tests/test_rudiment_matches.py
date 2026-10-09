"""Synthetic regression coverage; no DanceRudiments installation or model weights required."""
from __future__ import annotations

from pathlib import Path
from types import SimpleNamespace

import numpy as np
import pytest
import soundfile as sf

from stemlab.analysis.rudiment_matches import (
    RudimentConfig, _beat_grid, analyze_rudiments, extract_peak_events, load_catalogue,
)
from stemlab.types import BeatResult, StemArtifact


class NativeSamplerFixture:
    """Protocol fixture; production always samples the real DanceRudiments package."""

    PIPS_PER_BEAT = 64

    def catalogue(self):
        return [
            {"name": "regular_pulse", "description": "Quarter-note acceleration", "period_pips": 64},
            {"name": "counter_motion", "description": "Two-beat counterphase", "period_pips": 128},
            {"name": "flat_motion", "description": "No movement", "period_pips": 64},
        ]

    def sample(self, name, pip):
        if name == "flat_motion":
            values = (0, 0, 0)
        elif name == "regular_pulse":
            values = (np.cos(2 * np.pi * (pip % 64) / 64), 0, 0)
        else:
            values = (0, np.sin(2 * np.pi * (pip % 128) / 128), 0)
        return SimpleNamespace(as_tuple=lambda: values)


def _pulses(path: Path, *, seconds: float = 20., bpm: float = 120., offset: float = 0.) -> None:
    sr = 8000
    audio = np.zeros(int(seconds * sr), np.float32)
    for t in np.arange(offset, seconds - .2, 60 / bpm):
        i = int((t + .07) * sr)
        length = min(400, len(audio) - i)
        if length > 0:
            audio[i:i + length] += .7 * np.sin(np.linspace(0, np.pi * 10, length)).astype(np.float32) * np.exp(-np.linspace(0, 5, length))
    sf.write(path, audio, sr, subtype="FLOAT")


def test_optional_dependency_error(monkeypatch):
    import sys
    monkeypatch.setitem(sys.modules, "dancerudiments", None)
    with pytest.raises(RuntimeError, match=r"\[rudiments\]"):
        load_catalogue(RudimentConfig())


def test_config_and_grid_validation():
    with pytest.raises(ValueError, match="collection"):
        RudimentConfig(collection="invented")
    with pytest.raises(ValueError, match="BPM"):
        _beat_grid([], 20, bpm=0)
    with pytest.raises(ValueError, match="beats"):
        _beat_grid([], 20)
    result = BeatResult("consensus", list(np.arange(0, 10.01, .5)), [], 120)
    grid, source = _beat_grid([result], 10)
    assert source == "consensus" and len(grid) == 21


def test_two_stems_find_candidates_without_reimplementing_motion(tmp_path):
    master = tmp_path / "mix.wav"
    drums = tmp_path / "drums.wav"
    bass = tmp_path / "bass.wav"
    for path, offset in [(master, 0), (drums, 0), (bass, 0)]:
        _pulses(path, offset=offset)
    report = analyze_rudiments(master, tmp_path / "matches", bpm=120,
        stems=[StemArtifact("separator", "drums", drums), StemArtifact("separator", "bass", bass)],
        runtime=NativeSamplerFixture(),
        config=RudimentConfig(min_similarity=.52, top_per_stem=10, window_beats=8))
    assert report["source_count"] == 3
    assert report["pattern_count_scored"] == 2  # constant movement is rejected
    assert report["total_matches"] >= 2
    assert report["cross_stem_peak_agreement"]["bins_with_two_or_more_stems"] > 0
    assert len(report["cross_stem_candidates"]) >= 1
    assert (tmp_path / "matches" / "report.json").is_file()
    assert (tmp_path / "matches" / "index.html").is_file()
    assert (tmp_path / "matches" / "overview.png").is_file()
    assert all(0 <= m["similarity"] <= 1 for s in report["sources"] for m in s["matches"])


def test_silence_yields_no_spurious_candidates(tmp_path):
    path = tmp_path / "quiet.wav"
    sf.write(path, np.zeros(12 * 8000, dtype=np.float32), 8000, subtype="FLOAT")
    assert len(extract_peak_events(path)["times"]) == 0
    report = analyze_rudiments(path, tmp_path / "out", bpm=120, runtime=NativeSamplerFixture())
    assert report["total_matches"] == 0
    assert report["plot"] is None


def test_missing_or_bad_grid_rejected(tmp_path):
    path = tmp_path / "audio.wav"
    _pulses(path)
    with pytest.raises(ValueError, match="detected beats"):
        analyze_rudiments(path, tmp_path / "out", runtime=NativeSamplerFixture())


def test_html_escapes_untrusted_pattern_descriptions(tmp_path):
    runtime = NativeSamplerFixture()
    def malicious_catalogue():
        return [{"name": "regular_pulse", "description": "<script>alert(1)</script>", "period_pips": 64}]
    runtime.catalogue = malicious_catalogue
    path = tmp_path / "audio.wav"
    _pulses(path)
    analyze_rudiments(path, tmp_path / "out", bpm=120, runtime=runtime,
                      config=RudimentConfig(min_similarity=0.5))
    html = (tmp_path / "out" / "index.html").read_text()
    assert "<script>alert(1)</script>" not in html


def test_beat_grid_invalid_discontinuity():
    beats = list(np.arange(0, 10.5, .5))
    beats[13] = beats[12] + 5
    with pytest.raises(ValueError, match="increasing"):
        _beat_grid([BeatResult("consensus", beats, [], 120)], 20)
