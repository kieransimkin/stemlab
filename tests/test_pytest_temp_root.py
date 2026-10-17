"""Regression checks for the Windows pytest-of-<user> Access denied problem."""
from __future__ import annotations

import os
from pathlib import Path
from types import SimpleNamespace

from conftest import pytest_configure


def test_default_tmp_path_is_outside_shared_system_temp(pytestconfig, tmp_path_factory):
    # A caller who explicitly sets --basetemp can intentionally choose any path.
    if pytestconfig.getoption("basetemp") is not None:
        return
    configured = os.environ.get("PYTEST_DEBUG_TEMPROOT")
    assert configured, "StemLab must configure a writable pytest temp root"
    root = Path(configured).resolve()
    actual = tmp_path_factory.getbasetemp().resolve()
    assert actual.is_relative_to(root)
    assert actual.is_dir()


def test_repo_scoped_temp_root_is_created_early(monkeypatch, tmp_path):
    monkeypatch.delenv("PYTEST_DEBUG_TEMPROOT", raising=False)
    checkout = tmp_path / "checkout with spaces"
    checkout.mkdir()
    config = SimpleNamespace(rootpath=checkout, getoption=lambda name: None)
    pytest_configure(config)
    assert Path(os.environ["PYTEST_DEBUG_TEMPROOT"]) == checkout / ".pytest-tmp"
    assert (checkout / ".pytest-tmp").is_dir()


def test_explicit_environment_root_is_preserved(monkeypatch, tmp_path):
    custom = tmp_path / "my-explicit-pytest-root"
    monkeypatch.setenv("PYTEST_DEBUG_TEMPROOT", str(custom))
    config = SimpleNamespace(rootpath=tmp_path, getoption=lambda name: None)
    pytest_configure(config)
    assert os.environ["PYTEST_DEBUG_TEMPROOT"] == str(custom)
    assert not (tmp_path / ".pytest-tmp").exists()


def test_explicit_basetemp_is_preserved(monkeypatch, tmp_path):
    monkeypatch.delenv("PYTEST_DEBUG_TEMPROOT", raising=False)
    config = SimpleNamespace(rootpath=tmp_path, getoption=lambda name: str(tmp_path / "manual"))
    pytest_configure(config)
    assert "PYTEST_DEBUG_TEMPROOT" not in os.environ
    assert not (tmp_path / ".pytest-tmp").exists()
