import os
import subprocess
import sys
import time

import numpy as np
import pytest
import soundfile as sf

from stemlab.codex.jobs import JobManager
from stemlab.codex.paths import write_json


def wait(manager, job_id, seconds=15):
    deadline = time.monotonic() + seconds
    while time.monotonic() < deadline:
        result = manager.status(job_id)
        if result["state"] != "running":
            return result
        time.sleep(0.05)
    raise AssertionError("Worker did not reach terminal state")


def test_real_isolated_worker_and_persisted_history(tmp_path):
    sf.write(tmp_path / "a.wav", np.zeros(8000), 8000)
    manager = JobManager(tmp_path)
    try:
        job = manager.submit({"kind": "inspect", "audio_path": "a.wav"})
        state = wait(manager, job["job_id"])
        assert state["state"] == "completed", manager.logs(job["job_id"])
        assert state["result"]["audio"]["num_frames"] == 8000
        assert manager.list_jobs()["total"] == 1
    finally:
        manager.close()
    new = JobManager(tmp_path)
    try:
        assert new.status(job["job_id"])["state"] == "completed"
    finally:
        new.close()


def test_worker_failures_are_observable(tmp_path):
    manager = JobManager(tmp_path)
    try:
        job = manager.submit({"kind": "inspect", "audio_path": "missing.wav"})
        assert wait(manager, job["job_id"])["state"] == "failed"
        assert "FileNotFoundError" in manager.logs(job["job_id"])["text"]
    finally:
        manager.close()


def sleeping_worker(monkeypatch):
    real = subprocess.Popen
    seen = []
    def launch(command, **kwargs):
        seen.append(command)
        return real([sys.executable, "-I", "-c", "import time; time.sleep(30)"], **kwargs)
    monkeypatch.setattr(subprocess, "Popen", launch)
    return seen


def test_capacity_cancel_and_shutdown(tmp_path, monkeypatch):
    seen = sleeping_worker(monkeypatch)
    manager = JobManager(tmp_path)
    try:
        job = manager.submit({"kind": "inspect", "audio_path": "a.wav"})
        assert seen[0][1:4] == ["-I", "-m", "stemlab.codex.worker"]
        with pytest.raises(RuntimeError, match="busy"):
            manager.submit({"kind": "inspect", "audio_path": "a.wav"})
        manager.cancel(job["job_id"])
        assert wait(manager, job["job_id"])["state"] == "cancelled"
        # Idempotent cancel of a terminal job is safe.
        assert manager.cancel(job["job_id"])["state"] == "cancelled"
    finally:
        manager.close()


def test_deadline(tmp_path, monkeypatch):
    sleeping_worker(monkeypatch)
    manager = JobManager(tmp_path, timeout_seconds=0.25)
    try:
        job = manager.submit({"kind": "inspect", "audio_path": "a.wav"})
        assert wait(manager, job["job_id"])["state"] == "timed_out"
    finally:
        manager.close()


def test_two_servers_cannot_launch_in_same_workspace(tmp_path, monkeypatch):
    sleeping_worker(monkeypatch)
    a, b = JobManager(tmp_path), JobManager(tmp_path)
    try:
        a.submit({"kind": "inspect", "audio_path": "a.wav"})
        with pytest.raises(RuntimeError, match="Another"):
            b.submit({"kind": "inspect", "audio_path": "a.wav"})
    finally:
        a.close()
        b.close()


def test_no_arbitrary_worker_or_stale_pid_kill(tmp_path, monkeypatch):
    manager = JobManager(tmp_path)
    try:
        with pytest.raises(ValueError):
            manager.submit({"kind": "shell", "command": "whoami"})
        job_id = "a" * 32
        write_json(manager.root / ".jobs" / job_id / "status.json",
                   {"job_id": job_id, "state": "running", "pid": os.getpid()})
        # Never pass a persisted PID to terminate()/taskkill().
        assert manager.cancel(job_id)["state"] == "unmanaged"
        with pytest.raises(ValueError):
            manager.status("../bad")
    finally:
        manager.close()
