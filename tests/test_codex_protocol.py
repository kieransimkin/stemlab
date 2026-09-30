"""Actual JSON-RPC over stdio, not a mocked decorator or HTTP substitute.

The dedicated CI job installs/requires MCP v2 before running this module.
"""
import json
import queue
import subprocess
import sys
import threading
from pathlib import Path

import pytest

pytest.importorskip("mcp.server", reason="Install the codex extra for actual stdio protocol tests")


@pytest.mark.parametrize("read_only", [True, False])
def test_stdio_discovery_tools_errors_and_resources(tmp_path, monkeypatch, read_only):
    monkeypatch.setenv("STEMLAB_CODEX_CONFIG", str(tmp_path / "not-configured.json"))
    command = [sys.executable, "-I", "-m", "stemlab.codex", "serve", "--workspace", str(tmp_path)]
    if read_only:
        command.append("--read-only")
    proc = subprocess.Popen(command, stdin=subprocess.PIPE, stdout=subprocess.PIPE,
                            stderr=subprocess.PIPE, text=True, encoding="utf-8")
    lines = queue.Queue()
    errors = []
    def reader():
        for line in proc.stdout:
            lines.put(line)
    def err_reader():
        errors.extend(proc.stderr.readlines())
    threading.Thread(target=reader, daemon=True).start()
    threading.Thread(target=err_reader, daemon=True).start()
    request_id = 0
    def request(method, params):
        nonlocal request_id
        request_id += 1
        proc.stdin.write(json.dumps({"jsonrpc": "2.0", "id": request_id,
                                      "method": method, "params": params}) + "\n")
        proc.stdin.flush()
        while True:
            try:
                value = json.loads(lines.get(timeout=30))
            except queue.Empty as exc:
                raise AssertionError("No protocol response: " + "".join(errors)) from exc
            if value.get("id") == request_id:
                assert "error" not in value, value
                return value["result"]
    try:
        initial = request("initialize", {"protocolVersion": "2025-11-25", "capabilities": {},
                                          "clientInfo": {"name": "stemlab-test", "version": "1"}})
        assert initial["serverInfo"]["name"] == "StemLab"
        proc.stdin.write('{"jsonrpc":"2.0","method":"notifications/initialized"}\n')
        proc.stdin.flush()
        tools = request("tools/list", {})["tools"]
        names = {t["name"] for t in tools}
        assert {"stemlab_read_image", "stemlab_capabilities", "stemlab_open_timeline",
                "stemlab_close_timeline"} <= names
        assert ("stemlab_start_analysis" in names) is (not read_only)
        response = request("tools/call", {"name": "stemlab_capabilities", "arguments": {}})
        assert not response.get("isError")
        content = next(item["text"] for item in response["content"] if item.get("type") == "text")
        assert Path(json.loads(content)["workspace"]) == tmp_path.resolve()
        denied = request("tools/call", {"name": "stemlab_inspect_audio", "arguments": {"path": "../outside.wav"}})
        assert denied["isError"] is True
        resources = request("resources/list", {})["resources"]
        assert any(r["uri"] == "stemlab://guide" for r in resources)
        prompts = request("prompts/list", {})["prompts"]
        assert any(p["name"] == "analyze_song" for p in prompts)
    finally:
        proc.stdin.close()
        try:
            proc.wait(timeout=10)
        except subprocess.TimeoutExpired:
            proc.kill()
            proc.wait(timeout=5)
