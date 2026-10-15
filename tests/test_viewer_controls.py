"""Display grouping QA and reproducible viewer-build guards; no model downloads."""
from __future__ import annotations

from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
from timeline_display_checks import expected_display_layout


def test_layout_combines_master_and_stems_but_retains_beats():
    files = [{'path': p} for p in (
        'canonical.json', 'input/original.mp3', 'spectrograms/master.npz',
        'spectrograms/master.png', 'stems/model/drums.wav',
        'spectrograms/model/drums.npz', 'spectrograms/model/drums.png',
        'beats/beatnet.json', 'beats/beatnet__model-drums.json')]
    result = expected_display_layout({'files': files, 'canonical': {'bpm': 145}}, {}, {})
    assert result['lane_count'] == 5  # master, drums, two detectors, canonical BPM
    assert result['paired_count'] == 2
    assert result['audio_count'] == 2


def test_layout_maps_spectrogram_provenance_not_basenames():
    state = {'files': [{'path': p} for p in ('stems/a/drums.wav', 'stems/b/drums.wav',
                                            'spectrograms/unique.npz')]}
    analysis = {'spectrograms': [{'audio': 'stems/a/drums.wav', 'data': 'spectrograms/unique.npz'}]}
    result = expected_display_layout(state, {}, analysis)
    assert result['audio_count'] == 3
    assert result['paired_count'] == 1


def test_unaligned_png_not_silently_overlaid_or_lost():
    result = expected_display_layout({'files': [{'path': 'spectrograms/master.png'}]}, {}, {})
    assert result['lane_count'] == 2
    assert result['paired_count'] == 0
