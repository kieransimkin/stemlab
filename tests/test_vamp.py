from subprocess import CompletedProcess
from pathlib import Path

from stemlab import vamp
from stemlab.vamp import parse_sonic_annotator_csv


def test_parse_sonic_annotator_csv_labels_values_and_end_times():
    text = (
        '0.000000000,0.500000000,"C"\n'
        '0.500000000,1.000000000,440.0\n'
        '1.000000000,1.500000000,523.25,96.0,"C5"\n'
    )
    events = parse_sonic_annotator_csv(text)
    assert events[0] == {
        "start": 0.0,
        "end": 0.5,
        "values": [],
        "label": "C",
    }
    assert events[1]["values"] == [440.0]
    assert events[2]["values"] == [523.25, 96.0]
    assert events[2]["label"] == "C5"


def test_run_annotator_uses_supported_singular_csv_omit_filename(monkeypatch):
    calls = []

    def fake_run(args, **kwargs):
        calls.append(args)
        return CompletedProcess(args, 0, stdout="transform" if len(calls) == 1 else "0,1,beat\n")

    monkeypatch.setattr(vamp.subprocess, "run", fake_run)
    monkeypatch.setattr(Path, "mkdir", lambda self, **kwargs: None)
    monkeypatch.setattr(Path, "write_text", lambda self, text, **kwargs: len(text))
    raw = vamp._run_annotator(Path("sonic-annotator.exe"), "vamp:test", Path("song.wav"), Path("beat.n3"))
    assert raw == "0,1,beat\n"
    assert "--csv-omit-filename" in calls[1]
    assert "--csv-omit-filenames" not in calls[1]
