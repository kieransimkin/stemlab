from __future__ import annotations

import json
import sys
from pathlib import Path
from types import SimpleNamespace

import numpy as np
import pytest
import soundfile as sf
from typer.testing import CliRunner

from stemlab import cli
from stemlab.analysis.evidence import EVIDENCE_MODELS, EvidenceConfig
from stemlab.analysis.evidence import runner
from stemlab.analysis.evidence.adapters import run_firered
from stemlab.types import StemArtifact


def wav(path: Path, seconds: float = 1.0, sr: int = 44100) -> Path:
    sf.write(path, np.zeros((int(seconds * sr), 2), dtype=np.float32), sr, subtype="FLOAT")
    return path


def test_registry_covers_planned_groups():
    expected = {"firered_aed", "heart_transcriptor", "qwen_forced_aligner", "swift_f0",
                "songformer", "lv_chordia", "adtof_drums", "game_vocal_notes",
                "sheetsage2", "moss_music", "audiosep"}
    assert expected <= set(EVIDENCE_MODELS)
    assert EVIDENCE_MODELS["firered_aed"].commercial_safe
    assert not EVIDENCE_MODELS["adtof_drums"].commercial_safe
    assert not EVIDENCE_MODELS["sheetsage2"].commercial_safe


def test_specialists_route_to_saved_stems(tmp_path):
    master = wav(tmp_path / "master.wav")
    vocals = wav(tmp_path / "vocals.wav")
    drums = wav(tmp_path / "drums.wav")
    guitar = wav(tmp_path / "guitar.wav")
    stems = [StemArtifact("bs_roformer_sw", "vocals", vocals),
             StemArtifact("bs_roformer_sw", "drums", drums),
             StemArtifact("bs_roformer_sw", "guitar", guitar)]
    cfg = EvidenceConfig(models=("firered_aed",))
    assert runner.select_sources(master, stems, EVIDENCE_MODELS["firered_aed"], cfg)[0].path == vocals
    assert runner.select_sources(master, stems, EVIDENCE_MODELS["adtof_drums"], cfg)[0].path == drums
    assert runner.select_sources(master, stems, EVIDENCE_MODELS["swift_f0"], cfg)[0].path in {vocals, guitar}
    assert runner.select_sources(master, stems, EVIDENCE_MODELS["lv_chordia"], cfg)[0].path == master


def test_vocal_or_master_falls_back_but_vocal_only_does_not(tmp_path):
    master = wav(tmp_path / "master.wav")
    cfg = EvidenceConfig(models=("firered_aed",))
    assert runner.select_sources(master, [], EVIDENCE_MODELS["firered_aed"], cfg)[0].path == master
    assert runner.select_sources(master, [], EVIDENCE_MODELS["heart_transcriptor"], cfg) == []


def test_firered_accepts_native_stereo_and_keeps_activity_frame_clock(tmp_path, monkeypatch):
    source = tmp_path / "vocals.wav"
    audio = np.full((44_100, 2), .2, dtype=np.float32)
    sf.write(source, audio, 44_100, subtype="FLOAT")
    original = source.read_bytes()

    def detect(input_audio):
        pcm, sr = input_audio
        assert sr == 16_000 and pcm.shape == (16_000,) and pcm.dtype == np.int16
        assert np.allclose(pcm[500:1000], 6554, atol=6)
        values = np.full((98, 3), .75, dtype=np.float32)
        return {"event2timestamps": {"singing": [(0.2, 0.8)]}}, values

    monkeypatch.setitem(sys.modules, "fireredvad", SimpleNamespace(
        FireRedAedConfig=lambda **kw: kw,
        FireRedAed=SimpleNamespace(from_pretrained=lambda *args: SimpleNamespace(detect=detect)),
    ))
    report = run_firered({"source": str(source), "model_path": "synthetic"}, tmp_path)
    assert source.read_bytes() == original
    assert "activity-scores.npz" in report["files"]
    saved = json.loads((tmp_path / "events.json").read_text())
    assert saved["events"][0]["start"] == .2 and saved["events"][0]["end"] == .8
    assert saved["input_clock"]["source_frames"] == 44_100
    with np.load(tmp_path / "activity-scores.npz") as evidence:
        assert evidence["labels"].tolist() == ["speech", "singing", "music"]
        assert np.allclose(evidence["source_center_seconds"][[0, -1]], [.0125, .9825])


def test_mocked_run_preserves_source_and_writes_report(tmp_path, monkeypatch):
    master = wav(tmp_path / "master.wav")
    before = master.read_bytes()
    def fake(request, folder, config):
        (folder / "events.json").write_text('{"events": []}\n')
        return {"files": ["events.json"], "event_count": 0}
    monkeypatch.setattr(runner, "_invoke", fake)
    report = runner.analyze_evidence(master, tmp_path / "out",
                                     config=EvidenceConfig(models=("firered_aed",)), explicit_audio=True)
    assert report["status"] == "completed"
    assert report["completed_count"] == 1
    assert master.read_bytes() == before
    saved = json.loads((tmp_path / "out/report.json").read_text())
    assert saved["schema"] == "stemlab.evidence-models.v1"
    assert saved["analyses"][0]["commercial_safe"] is True


def test_missing_qwen_text_is_visible_skip(tmp_path):
    master = wav(tmp_path / "master.wav")
    report = runner.analyze_evidence(master, tmp_path / "out",
                                     config=EvidenceConfig(models=("qwen_forced_aligner",)), explicit_audio=True)
    assert report["status"] == "no_matching_sources"
    assert report["skipped"][0]["model"] == "qwen_forced_aligner"
    assert "canonical text" in report["skipped"][0]["reason"]


def test_config_rejects_unknown_and_bad_chord_dictionary():
    try:
        EvidenceConfig(models=("nope",))
    except ValueError as exc:
        assert "Unknown evidence" in str(exc)
    else:
        raise AssertionError("unknown model accepted")
    try:
        EvidenceConfig(models=("swift_f0",), chord_dictionary="wrong")
    except ValueError as exc:
        assert "Chord dictionary" in str(exc)
    else:
        raise AssertionError("bad chord dictionary accepted")


def test_cli_help_and_registry():
    runner_cli = CliRunner()
    for command in (["evidence", "--help"], ["evidence-models"]):
        result = runner_cli.invoke(cli.app, command, color=False)
        assert result.exit_code == 0, result.output
    assert "firered_aed" in EVIDENCE_MODELS


@pytest.mark.parametrize("command, option_prefix", [("evidence", ""), ("analyze", "evidence-")])
def test_cli_routes_evidence_overrides_to_evidence_registry(tmp_path, monkeypatch, command, option_prefix):
    import stemlab.analysis.evidence as evidence

    master = wav(tmp_path / "master.wav")
    model_dir = tmp_path / "model=local"
    model_dir.mkdir()
    backend_python = Path(sys.executable).resolve()
    captured = {}

    def fake_evidence(source, output, *, config, progress):
        captured.update(models=config.models, model_paths=config.model_paths,
                        backend_pythons=config.backend_pythons)
        return {"status": "completed", "completed_count": 1, "errors": [], "skipped": []}

    def fake_pipeline(config, *, progress):
        captured.update(models=config.evidence_models, model_paths=config.evidence_model_paths,
                        backend_pythons=config.evidence_backend_pythons)
        return {"errors": []}

    monkeypatch.setattr(evidence, "analyze_path", fake_evidence)
    monkeypatch.setattr(cli, "run_pipeline", fake_pipeline)
    args = [command, str(master), "--output", str(tmp_path / "out"), "--device", "cpu",
            f"--{option_prefix}model", "firered_aed"]
    model_option = f"--{option_prefix}model-path"
    python_option = f"--{option_prefix}backend-python"
    runner_cli = CliRunner()
    result = runner_cli.invoke(cli.app, [
        *args, model_option, f"firered_aed={model_dir}",
        python_option, f"firered_aed={backend_python}",
    ], color=False)
    assert result.exit_code == 0, result.output
    assert captured == {
        "models": ("firered_aed",), "model_paths": {"firered_aed": str(model_dir)},
        "backend_pythons": {"firered_aed": str(backend_python)},
    }
    captured.clear()
    invalid = runner_cli.invoke(cli.app, [*args, model_option, f"basic_pitch={model_dir}"], color=False)
    assert invalid.exit_code == 2 and "Expected unique MODEL=PATH" in invalid.output
    assert not captured


def test_codex_capabilities_and_read_only_gate(tmp_path):
    from stemlab.codex.bridge import StemLabBridge
    bridge = StemLabBridge(tmp_path, read_only=True)
    try:
        caps = bridge.capabilities()
        assert any(item["slug"] == "swift_f0" for item in caps["evidence_models"])
        try:
            bridge.start_evidence_scan("missing.wav")
        except PermissionError:
            pass
        else:
            raise AssertionError("read-only bridge allowed evidence job")
    finally:
        bridge.close()


def test_codex_evidence_options_reject_unknown():
    from stemlab.codex.tasks import evidence_options
    assert evidence_options(models=["swift_f0"])["models"] == ["swift_f0"]
    try:
        evidence_options(models=["missing"])
    except ValueError as exc:
        assert "Unknown evidence" in str(exc)
    else:
        raise AssertionError("unknown evidence model accepted")
