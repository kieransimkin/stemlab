from pathlib import Path

from stemlab import vamp_runtime


def test_windows_vamp_installer_requests_uac_and_waits(monkeypatch):
    calls = []

    monkeypatch.setattr(vamp_runtime, "_platform_key", lambda: "windows")
    monkeypatch.setattr(
        vamp_runtime.subprocess,
        "run",
        lambda args, check: calls.append((args, check)),
    )

    status = vamp_runtime._launch_plugin_pack_installer(
        Path(r"C:\Program Files\StemLab Test\Vamp.Plugin.Pack.Installer.2.0.exe")
    )

    assert status == "completed"
    assert len(calls) == 1
    args, check = calls[0]
    assert args[:4] == [
        "powershell.exe",
        "-NoProfile",
        "-NonInteractive",
        "-Command",
    ]
    assert "-Verb RunAs -Wait" in args[4]
    assert "Vamp.Plugin.Pack.Installer.2.0.exe" in args[4]
    assert check is True
