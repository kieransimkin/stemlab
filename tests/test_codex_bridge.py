import hashlib
import json
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from stemlab.codex.bridge import StemLabBridge
from stemlab.codex.paths import inside, read_json, workspace_path, write_json
from stemlab.codex.tasks import analysis_options, run_analysis, run_loop_scan


@pytest.fixture
def bridge(tmp_path):
    value = StemLabBridge(tmp_path)
    yield value
    value.close()


def make_audio(path, seconds=12):
    sr = 8000
    time = np.arange(sr * seconds) / sr
    audio = (0.05 * np.sin(2 * np.pi * 50 * time)).astype("float32")
    sf.write(path, np.column_stack([audio, -audio]), sr, subtype="FLOAT")
    return sr


def make_results(root):
    (root / "input").mkdir(parents=True)
    master = root / "input/master.wav"
    sr = make_audio(master)
    (root / "stems/demo").mkdir(parents=True)
    sf.write(root / "stems/demo/vocals.wav", np.zeros(sr * 12), sr, subtype="FLOAT")
    write_json(root / "analysis.json", {
        "source": {"copied_path": "input/master.wav", "sha256": hashlib.sha256(master.read_bytes()).hexdigest()},
        "models": [{"stems": [{"model": "demo", "stem": "vocals", "path": "stems/demo/vocals.wav"}]}]})
    write_json(root / "deep/song_map/song_map.json", {"section_source": "synthetic annotation",
        "sections": [{"start": 0, "end": 6, "label": "Verse 1"},
                     {"start": 6, "end": 12, "label": "Chorus 1"}]})
    write_json(root / "beats/test.json", {"model": "test", "beats": np.arange(0, 12.01, 0.5).tolist(),
                                         "downbeats": np.arange(0, 12.01, 2).tolist(), "tempo_bpm": 120})
    return root


def tree_hashes(root):
    return {p.relative_to(root).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
            for p in root.rglob("*") if p.is_file()}


def test_capabilities_and_inspect_are_read_only(bridge, tmp_path):
    path = tmp_path / "source.wav"
    sr = make_audio(path)
    info = bridge.inspect_audio("source.wav")
    assert info["sample_rate"] == sr and info["num_frames"] == sr * 12
    assert info["sha256"] == hashlib.sha256(path.read_bytes()).hexdigest()
    result = bridge.capabilities()
    assert any(a["slug"] == "loops" for a in result["analysis_actions"])
    assert not bridge.jobs.root.exists()


@pytest.mark.parametrize("name", ["../secret.json", ".env", ".ssh/key", "input/../../secret",
                                  "input\x00.wav", "file.wav:secret"])
def test_reject_unsafe_paths(tmp_path, name):
    with pytest.raises((ValueError, OSError)):
        inside(tmp_path, name, must_exist=False)


def test_reject_external_absolute_path(tmp_path):
    with pytest.raises(ValueError):
        inside(tmp_path, tmp_path.parent / "secret.json", must_exist=False)


def test_reject_symbolic_and_hard_links(tmp_path):
    import os
    (tmp_path / "plain.json").write_text("{}")
    try:
        (tmp_path / "link.json").symlink_to(tmp_path / "plain.json")
    except OSError:
        pytest.skip("This Windows account cannot create symlinks")
    with pytest.raises(ValueError):
        inside(tmp_path, "link.json")
    os.link(tmp_path / "plain.json", tmp_path / "hard.json")
    with pytest.raises(ValueError):
        inside(tmp_path, "hard.json")


def test_workspace_must_be_explicit(tmp_path):
    with pytest.raises(ValueError):
        workspace_path(".")
    with pytest.raises(ValueError):
        workspace_path(Path(tmp_path.anchor))


def test_no_download_consent_rejects_inference(bridge, tmp_path):
    make_audio(tmp_path / "song.wav")
    with pytest.raises(ValueError, match="consent"):
        bridge.start_analysis("song.wav", {})
    assert not bridge.jobs.root.exists()


def test_reject_heavy_profile_without_extra_consent():
    with pytest.raises(ValueError, match="expensive"):
        analysis_options({"profile": "full", "allow_model_downloads": True})


@pytest.mark.parametrize("options", [
    {"device": "cpu; rm -rf /"}, {"models": ["not-a-model"]}, {"profile": "unknown"},
    {"arbitrary_command": "echo bad"}, {"export_loops": "true"},
])
def test_reject_unsupported_options(options):
    with pytest.raises(ValueError):
        analysis_options({"allow_model_downloads": True, **options})


def test_model_override_and_deduplication():
    result = analysis_options({"allow_model_downloads": True, "profile": "full",
                               "models": ["htdemucs_ft", "htdemucs_ft"]})
    assert result["models"] == ["htdemucs_ft"]


def test_reports_are_paginated_and_bounded(bridge, tmp_path):
    root = make_results(tmp_path / "prior")
    write_json(root / "deep/test.json", {"message": "a" * 100})
    files = bridge.list_artifacts("prior", limit=2)
    assert len(files["artifacts"]) == 2 and files["next_offset"] == 2
    first = bridge.read_artifact("prior", "deep/test.json", limit=20)
    second = bridge.read_artifact("prior", "deep/test.json", offset=first["next_offset"], limit=20)
    assert first["has_more"] and second["offset"] == 20
    with pytest.raises(ValueError):
        bridge.read_artifact("prior", "input/master.wav")
    with pytest.raises(ValueError):
        bridge.read_artifact("prior", "analysis.json", limit=65537)


def test_image_reads_real_png_and_rejects_fake(bridge, tmp_path):
    from PIL import Image
    root = make_results(tmp_path / "prior")
    Image.new("RGB", (20, 20)).save(root / "plot.png")
    assert bridge.read_image("prior", "plot.png").startswith(b"\x89PNG")
    (root / "fake.png").write_bytes(b"not an image")
    with pytest.raises(ValueError):
        bridge.read_image("prior", "fake.png")


def test_read_only_refuses_writes(tmp_path):
    b = StemLabBridge(tmp_path, read_only=True)
    try:
        with pytest.raises(PermissionError):
            b.start_loop_scan("prior")
        with pytest.raises(PermissionError):
            b.start_analysis("song.wav", {})
    finally:
        b.close()


@pytest.mark.parametrize("bars,per", [(0, 1), (65, 1), (1, 9), (True, 1)])
def test_native_loop_limits(bridge, bars, per):
    with pytest.raises(ValueError):
        bridge.start_loop_scan("not-needed", max_bars=bars, per_section=per)


def test_loop_scan_preserves_old_evidence_and_exact_audio(bridge, tmp_path):
    old = make_results(tmp_path / "prior")
    before = tree_hashes(old)
    output = tmp_path / "new"
    output.mkdir()
    result = run_loop_scan(tmp_path, output, {"results_path": "prior", "export_audio": True})
    assert result["state"] == "completed" and result["loop_count"] == 2
    assert tree_hashes(old) == before
    report = read_json(output / "deep/loops/loops.json")
    full, sr = sf.read(old / "input/master.wav", dtype="float32", always_2d=True)
    for loop in report["loops"]:
        clip, rate = sf.read(output / "deep/loops" / loop["file"], dtype="float32", always_2d=True)
        assert rate == sr
        np.testing.assert_array_equal(clip, full[loop["start_sample"]:loop["end_sample"]])
    assert bridge.read_loops("new")["loop_count"] == 2


def test_loop_scan_without_export_and_no_vocals(bridge, tmp_path):
    old = make_results(tmp_path / "prior")
    report = read_json(old / "analysis.json")
    report["models"] = []
    write_json(old / "analysis.json", report)
    output = tmp_path / "new"
    output.mkdir()
    result = run_loop_scan(tmp_path, output, {"results_path": "prior"})
    assert result["loop_count"] == 0 and result["unresolved_sections"] == 2
    assert not (output / "deep/loops/audio").exists()


def test_loop_scan_rejects_stale_master(tmp_path):
    old = make_results(tmp_path / "prior")
    sf.write(old / "input/master.wav", np.zeros(100), 8000)
    output = tmp_path / "new"
    output.mkdir()
    with pytest.raises(ValueError, match="hash"):
        run_loop_scan(tmp_path, output, {"results_path": "prior"})


def test_loop_scan_rejects_metadata_path_escape(tmp_path):
    old = make_results(tmp_path / "prior")
    report = read_json(old / "analysis.json")
    report["models"][0]["stems"][0]["path"] = "../other/vocals.wav"
    write_json(old / "analysis.json", report)
    output = tmp_path / "new"
    output.mkdir()
    with pytest.raises(ValueError):
        run_loop_scan(tmp_path, output, {"results_path": "prior"})


def test_new_analysis_calls_existing_pipeline_and_propagates_errors(tmp_path, monkeypatch):
    import stemlab.pipeline
    make_audio(tmp_path / "song.wav")
    seen = []
    def run(config, progress):
        seen.append(config)
        return {"errors": [{"stage": "one_failed_backend"}], "source": {"sha256": "a" * 64}}
    monkeypatch.setattr(stemlab.pipeline, "run_pipeline", run)
    report = run_analysis(tmp_path, tmp_path / "out", {
        "audio_path": "song.wav", "options": {"allow_model_downloads": True, "profile": "fast"}})
    assert report["state"] == "completed_with_errors" and report["error_count"] == 1
    assert seen[0].bootstrap_external is False and seen[0].run_text_semantics is False
    assert seen[0].models == ("openunmix_umxhq",)
    assert seen[0].whisper_condition_on_previous_text is False


def test_json_rejects_nan_and_non_object(tmp_path):
    p = tmp_path / "bad.json"
    for text in ('{"bad": NaN}', '[]'):
        p.write_text(text)
        with pytest.raises(ValueError):
            read_json(p)
