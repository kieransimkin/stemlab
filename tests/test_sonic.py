import bz2
import xml.etree.ElementTree as ET

from stemlab.sonic import build_session


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
