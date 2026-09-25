import bz2
import xml.etree.ElementTree as ET

from stemlab.sonic import build_session
from stemlab.types import BeatResult


def test_native_sv_is_bzip2_xml(tmp_path, monkeypatch):
    master = tmp_path / "master.wav"
    master.write_bytes(b"fake")
    monkeypatch.setattr("stemlab.sonic.audio_info", lambda p: {"sample_rate": 44100})
    sv, xml = build_session(tmp_path / "sv", master, [], [])
    assert sv.read_bytes().startswith(b"BZh")
    decoded = bz2.decompress(sv.read_bytes())
    assert decoded == xml.read_bytes()
    root = ET.fromstring(decoded)
    assert root.tag == "sv"
    assert (tmp_path / "sv" / "open_sonic_visualiser.bat").exists()



def test_session_uses_canonical_layer_definitions_and_visible_view_refs(tmp_path, monkeypatch):
    master = tmp_path / "master.wav"
    master.write_bytes(b"fake")
    monkeypatch.setattr("stemlab.sonic.audio_info", lambda p: {"sample_rate": 44100})

    raw = BeatResult(
        "beatnet",
        [0.50, 1.00, 1.50],
        [0.50],
        120.0,
        {},
    )
    consensus = BeatResult(
        "consensus",
        [0.50, 1.00, 1.50],
        [0.50],
        120.0,
        {
            "sources": ["beatnet"],
            "beat_support": [
                {"time": 0.50, "support": 1, "models": ["beatnet"]},
                {"time": 1.00, "support": 1, "models": ["beatnet"]},
                {"time": 1.50, "support": 1, "models": ["beatnet"]},
            ],
        },
    )

    _sv, xml = build_session(tmp_path / "sv", master, [], [raw, consensus])
    root = ET.fromstring(xml.read_bytes())
    data = root.find("data")
    display = root.find("display")
    assert data is not None
    assert display is not None

    definitions = {layer.attrib["id"]: layer for layer in data.findall("layer")}
    assert definitions
    assert any(layer.attrib.get("type") == "timeinstants" for layer in definitions.values())
    assert any(layer.attrib.get("type") == "regions" for layer in definitions.values())

    for view in display.findall("view"):
        assert view.attrib.get("centreLineVisible") == "1"
        for ref in view.findall("layer"):
            assert ref.attrib["id"] in definitions
            assert ref.attrib.get("visible") == "true"
            assert set(ref.attrib).issubset({"id", "type", "name", "model", "visible"})

    point_frames = {
        int(point.attrib["frame"])
        for dataset in data.findall("dataset")
        for point in dataset.findall("point")
        if "frame" in point.attrib
    }
    assert int(round(0.50 * 44100)) in point_frames
    assert int(round(1.00 * 44100)) in point_frames


def test_empty_beat_results_produce_visible_diagnostic_layer(tmp_path, monkeypatch):
    master = tmp_path / "master.wav"
    master.write_bytes(b"fake")
    monkeypatch.setattr("stemlab.sonic.audio_info", lambda p: {"sample_rate": 44100})

    _sv, xml = build_session(tmp_path / "sv", master, [], [])
    root = ET.fromstring(xml.read_bytes())
    data = root.find("data")
    assert data is not None

    text_models = [
        model
        for model in data.findall("model")
        if model.attrib.get("subtype") == "text"
    ]
    assert text_models
    labels = [
        point.attrib.get("label", "")
        for dataset in data.findall("dataset")
        for point in dataset.findall("point")
    ]
    assert any("NO BEAT EVENTS" in label for label in labels)
