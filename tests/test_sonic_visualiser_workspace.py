import bz2
import xml.etree.ElementTree as ET

from stemlab.sonic_visualiser import build_session
from stemlab.types import BeatResult, StemArtifact


def test_workspace_has_explicit_labels_and_consensus_region_grid(tmp_path, monkeypatch):
    master = tmp_path / "master.wav"
    stem = tmp_path / "vocals.wav"
    master.write_bytes(b"fake")
    stem.write_bytes(b"fake")
    monkeypatch.setattr("stemlab.sonic_visualiser.audio_info", lambda p: {"sample_rate": 44100})

    consensus = BeatResult(
        "consensus",
        [1.0, 2.0, 3.0, 4.0],
        [1.0],
        60.0,
        {
            "sources": ["beatnet", "beat_this", "beat_transformer"],
            "beat_support": [
                {"time": 1.0, "support": 3, "models": ["beatnet", "beat_this", "beat_transformer"]},
                {"time": 2.0, "support": 2, "models": ["beatnet", "beat_this"]},
                {"time": 3.0, "support": 3, "models": ["beatnet", "beat_this", "beat_transformer"]},
                {"time": 4.0, "support": 2, "models": ["beatnet", "beat_transformer"]},
            ],
        },
    )
    detector = BeatResult("beatnet", [1.0, 2.0, 3.0, 4.0], [1.0], 60.0)

    sv, _xml = build_session(
        tmp_path / "sv",
        master,
        [StemArtifact("bs_roformer_sw", "vocals", stem, 44100, 2)],
        [detector, consensus],
    )
    root = ET.fromstring(bz2.decompress(sv.read_bytes()))

    views = root.findall("./display/view")
    layers = root.findall("./display/view/layer")
    assert all(view.get("name") for view in views)
    assert all(layer.get("name") for layer in layers)
    assert any("BEAT CONSENSUS" in view.get("name", "") for view in views)
    assert any(layer.get("type") == "regions" and "FINAL BEAT GRID" in layer.get("name", "") for layer in layers)
    assert any("BS-RoFormer" in view.get("name", "") and "vocals" in view.get("name", "") for view in views)
