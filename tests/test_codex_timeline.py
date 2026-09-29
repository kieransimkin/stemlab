"""The real bundled frontend with the read-only single-result API, not a UI mock."""
import io
import socket
from pathlib import Path
from urllib.parse import urlsplit

import numpy as np
import pytest
import soundfile as sf
from fastapi.testclient import TestClient

from stemlab.codex.bridge import StemLabBridge
from stemlab.codex.paths import read_json, write_json
from stemlab.codex.timeline import TimelineEvidence, WEB_ROOT, create_timeline_app
from stemlab.codex.tasks import run_loop_scan
from test_codex_bridge import make_results, tree_hashes


@pytest.fixture
def evidence(tmp_path):
    prior = make_results(tmp_path / "prior")
    output = tmp_path / "results"
    output.mkdir()
    run_loop_scan(tmp_path, output, {"results_path": "prior"})
    (output / "beats").mkdir()
    write_json(output / "beats/consensus.json", read_json(prior / "beats/test.json"))
    write_json(output / "canonical.json", {"title": "Synthetic timeline QA", "bpm": 120})
    (output / "spectrograms").mkdir()
    np.savez(output / "spectrograms/master.npz", magnitude_db=np.zeros((64, 120), dtype="float32"))
    return TimelineEvidence(tmp_path, "results")


@pytest.fixture
def viewer(evidence):
    app = create_timeline_app(evidence, origin="http://127.0.0.1:8989", token="private-test-token",
                              cookie_name="stemlab_test", expired=lambda: False, lifetime_seconds=300)
    with TestClient(app, base_url="http://127.0.0.1:8989") as client:
        yield client


def login(client):
    return client.get("/?viewer_token=private-test-token", follow_redirects=True)


def test_auth_bootstrap_and_unchanged_real_react_assets(viewer, evidence):
    before = tree_hashes(evidence.root())
    assert viewer.get("/").status_code == 403
    assert viewer.get(f"/api/{evidence.digest}/source").status_code == 403
    response = login(viewer)
    assert response.status_code == 200 and urlsplit(str(response.url)).query == f"hash={evidence.digest}"
    assert "viewer_token" not in str(response.url)
    assert "cdn.socket.io" not in response.text
    assert '/assets/app.js' in response.text and '/assets/timeline.css' in response.text
    for name in ("app.js", "style.css", "timeline.css"):
        assert viewer.get("/assets/" + name).content == (WEB_ROOT / name).read_bytes()
    bundle = viewer.get("/assets/app.js").text
    assert "rts-loop-region" in bundle and "Enable loop" in bundle
    assert "script-src 'self'" in response.headers["content-security-policy"]
    assert response.headers["referrer-policy"] == "no-referrer"
    assert response.headers["cache-control"] == "no-store"
    assert tree_hashes(evidence.root()) == before


def test_inventory_waveforms_canonical_spectrograms_and_source(viewer, evidence):
    login(viewer)
    base = f"/api/{evidence.digest}"
    state = viewer.get(base + "/timeline").json()
    assert state["first_detected_beat"] == 0
    assert state["duration_seconds"] == 12
    assert state["canonical"]["bpm"] == 120
    assert any(f["path"] == "deep/loops/loops.json" for f in state["files"])
    assert viewer.get(base + "/canonical").json()["title"] == "Synthetic timeline QA"
    envelope = viewer.get(base + "/waveform").json()
    assert envelope["frames"] == 96000 and envelope["sample_rate"] == 8000
    assert viewer.get(base + "/source").content == evidence.source().read_bytes()
    spec = viewer.get(base + "/spectrogram", params={"path": "spectrograms/master.npz"})
    assert spec.status_code == 200 and spec.content.startswith(b"\x89PNG")
    assert viewer.get(base + "/waveform", params={"path": "canonical.json"}).status_code == 409


def test_native_loop_playback_needs_no_export_and_preserves_files(viewer, evidence):
    before = tree_hashes(evidence.root())
    login(viewer)
    loop = evidence.json("deep/loops/loops.json")["loops"][0]
    response = viewer.get(f"/api/{evidence.digest}/loops/{loop['id']}/audio")
    assert response.status_code == 200
    clip, sr = sf.read(io.BytesIO(response.content), dtype="float32", always_2d=True)
    full, rate = sf.read(evidence.source(), dtype="float32", always_2d=True)
    assert sr == rate
    np.testing.assert_array_equal(clip, full[loop["start_sample"]:loop["end_sample"]])
    assert not (evidence.root() / "deep/loops/audio").exists()
    assert tree_hashes(evidence.root()) == before


@pytest.mark.parametrize("method,path", [("put", "/api/x/canonical"), ("post", "/upload/test.wav"),
                                          ("delete", "/anything"), ("options", "/")])
def test_viewer_never_accepts_mutations(viewer, method, path):
    login(viewer)
    assert getattr(viewer, method)(path).status_code == 405


def test_wrong_host_origin_cookie_cross_site_and_hash_are_rejected(viewer, evidence):
    assert viewer.get("/?viewer_token=wrong").status_code == 403
    assert viewer.get("/?viewer_token=é").status_code == 403
    login(viewer)
    assert viewer.get("/", headers={"host": "attacker.example"}).status_code == 403
    assert viewer.get("/", headers={"origin": "https://attacker.example"}).status_code == 403
    assert viewer.get("/", headers={"sec-fetch-site": "cross-site"}).status_code == 403
    assert viewer.get("/api/" + "a" * 64 + "/timeline").status_code == 404
    assert viewer.get("/api/" + "a" * 64 + "/loops/verse-01-01/audio").status_code == 404
    assert viewer.get("/assets/absent.js").status_code == 404


def test_hidden_traversal_script_and_link_artifacts_are_not_served(viewer, evidence, tmp_path):
    root = evidence.root()
    (root / ".env").write_text("secret")
    (root / "script.html").write_text("<script>alert(1)</script>")
    (root / "illustration.svg").write_text("<svg/>")
    (tmp_path / "outside.json").write_text('{"private":true}')
    login(viewer)
    for name in (".env", "script.html", "illustration.svg", "%2e%2e%2foutside.json"):
        assert viewer.get(f"/{evidence.digest}/{name}").status_code in {404, 409}
    files = viewer.get(f"/api/{evidence.digest}/timeline").json()["files"]
    assert not any(x["path"] in {".env", "script.html", "illustration.svg"} for x in files)
    try:
        (root / "escape.json").symlink_to(tmp_path / "outside.json")
    except OSError:
        return  # Windows accounts without link permission still test all other guards.
    assert viewer.get(f"/{evidence.digest}/escape.json").status_code == 409
    assert not any(x["path"] == "escape.json" for x in evidence.inventory())


def test_changed_or_outside_master_is_not_trusted(viewer, evidence, tmp_path):
    login(viewer)
    master = evidence.source()
    master.write_bytes(master.read_bytes() + b"changed")
    assert viewer.get(f"/api/{evidence.digest}/source").status_code == 409
    assert viewer.get(f"/{evidence.digest}/input/master.wav").status_code == 409
    with pytest.raises(ValueError, match="match"):
        TimelineEvidence(tmp_path, "results")
    report = evidence.json("analysis.json")
    report["source"]["copied_path"] = "../prior/input/master.wav"
    write_json(evidence.root() / "analysis.json", report)
    with pytest.raises(ValueError):
        TimelineEvidence(tmp_path, "results")


def test_decode_limits_and_expiry(viewer, evidence, monkeypatch):
    import stemlab.codex.timeline as timeline
    login(viewer)
    monkeypatch.setattr(timeline, "MAX_DSP_BYTES", 10)
    assert viewer.get(f"/api/{evidence.digest}/waveform").status_code == 409
    assert viewer.get(f"/api/{evidence.digest}/spectrogram",
                      params={"path": "spectrograms/master.npz"}).status_code == 409
    app = create_timeline_app(evidence, origin="http://127.0.0.1:8989", token="private-test-token",
                              cookie_name="expired", expired=lambda: True, lifetime_seconds=60)
    with TestClient(app, base_url="http://127.0.0.1:8989") as client:
        assert client.get("/?viewer_token=private-test-token").status_code == 410


def test_real_loopback_lifecycle_is_owned_read_only_and_closed(evidence, tmp_path):
    import urllib.request
    import http.cookiejar

    before = tree_hashes(evidence.root())
    bridge = StemLabBridge(tmp_path, read_only=True)
    try:
        info = bridge.open_timeline("results", lifetime_seconds=60)
        assert not info["browser_opened"] and not info["autoplay"] and info["read_only"]
        assert bridge.open_timeline("results")["url"] == info["url"]
        parsed = urlsplit(info["url"])
        assert parsed.hostname == "127.0.0.1"
        # Exercise the real listener, rather than only ASGI in-process routes.
        opener = urllib.request.build_opener(urllib.request.ProxyHandler({}),
                   urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))
        with opener.open(info["url"], timeout=10) as response:
            assert b"/assets/app.js" in response.read()
        active = bridge._timeline
        assert active.thread.is_alive()
        bridge.close()
        assert not active.thread.is_alive()
        with socket.socket() as client:
            assert client.connect_ex(("127.0.0.1", parsed.port)) != 0
        assert tree_hashes(evidence.root()) == before
        assert not bridge.jobs.root.exists()
    finally:
        bridge.close()


@pytest.mark.parametrize("value", [0, 59, 3601, True, 1.5])
def test_invalid_lifetime_never_starts_a_listener(tmp_path, value):
    bridge = StemLabBridge(tmp_path)
    try:
        with pytest.raises(ValueError):
            bridge.open_timeline("absent", lifetime_seconds=value)
        assert bridge._timeline is None
    finally:
        bridge.close()


def test_inspection_workflow_prefers_real_timeline_with_honest_fallback(tmp_path):
    root = Path(__file__).resolve().parents[1]
    bridge = StemLabBridge(tmp_path)
    try:
        assert bridge.capabilities()["inspection"]["preferred"] == "react-timeline-sequence"
    finally:
        bridge.close()
    skill = (root / "plugins/stemlab/skills/stemlab/SKILL.md").read_text(encoding="utf-8")
    guide = (root / "src/stemlab/codex/server.py").read_text(encoding="utf-8")
    for text in (skill, guide):
        assert "stemlab_open_timeline" in text
        assert "react-timeline-sequence" in text
        assert "fallback" in text


def test_missing_frontend_fails_before_starting_a_listener(evidence, tmp_path, monkeypatch):
    import stemlab.codex.timeline as timeline
    monkeypatch.setattr(timeline, "WEB_ROOT", tmp_path / "absent-bundle")
    bridge = StemLabBridge(tmp_path)
    try:
        with pytest.raises(ValueError, match="frontend is missing"):
            bridge.open_timeline("results")
        assert bridge._timeline is None
    finally:
        bridge.close()


def test_switch_result_closes_previous_viewer(evidence, tmp_path):
    bridge = StemLabBridge(tmp_path, read_only=True)
    try:
        bridge.open_timeline("results", lifetime_seconds=60)
        old = bridge._timeline
        current = bridge.open_timeline("prior", lifetime_seconds=60)
        assert not old.thread.is_alive()
        assert current["result_dir"] == str(tmp_path / "prior")
        assert bridge._timeline is not old
    finally:
        bridge.close()


def test_reopen_revalidates_changed_source_instead_of_reusing_session(evidence, tmp_path):
    from stemlab.util import sha256_file
    bridge = StemLabBridge(tmp_path, read_only=True)
    try:
        bridge.open_timeline("results", lifetime_seconds=60)
        old = bridge._timeline
        source = evidence.source()
        sf.write(source, np.zeros((8000, 2)), 8000, subtype="FLOAT")
        data = read_json(evidence.root() / "analysis.json")
        data["source"]["sha256"] = sha256_file(source)
        write_json(evidence.root() / "analysis.json", data)
        current = bridge.open_timeline("results", lifetime_seconds=60)
        assert not old.thread.is_alive()
        assert current["source_sha256"] == data["source"]["sha256"]
    finally:
        bridge.close()
