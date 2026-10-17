"""Regression tests for Windows pytest temp ACLs and OneDrive directory locks."""
from __future__ import annotations

import os
from pathlib import Path
from types import SimpleNamespace

from conftest import default_temp_root, pytest_configure


def test_default_tmp_path_is_in_the_configured_root(pytestconfig, tmp_path_factory):
    if pytestconfig.getoption("basetemp") is not None:
        return  # A caller-provided location is always authoritative.
    configured = os.environ.get("PYTEST_DEBUG_TEMPROOT")
    assert configured, "StemLab must configure a writable pytest temp root"
    actual = tmp_path_factory.getbasetemp().resolve()
    assert actual.is_relative_to(Path(configured).resolve())
    assert actual.is_dir()


def test_default_root_is_created_early(monkeypatch, tmp_path):
    monkeypatch.delenv("PYTEST_DEBUG_TEMPROOT", raising=False)
    checkout = tmp_path / "OneDrive" / "checkout with spaces"
    checkout.mkdir(parents=True)
    config = SimpleNamespace(rootpath=checkout, getoption=lambda _: None)
    pytest_configure(config)
    expected = default_temp_root(checkout)
    assert Path(os.environ["PYTEST_DEBUG_TEMPROOT"]) == expected
    assert expected.is_dir()


def test_windows_location_avoids_both_temp_and_onedrive(tmp_path):
    checkout = tmp_path / "OneDrive" / "Documents" / "GitHub" / "stemlab"
    other_checkout = tmp_path / "AnotherCheckout" / "stemlab"
    local = tmp_path / "AppData" / "Local"
    env = {"LOCALAPPDATA": str(local)}
    first = default_temp_root(checkout, environment=env, platform="nt")
    second = default_temp_root(other_checkout, environment=env, platform="nt")
    assert first.is_relative_to(local / "StemLab" / "pytest")
    assert not first.is_relative_to(checkout)
    assert first != second  # Separate worktrees never share the same temp root.
    assert first == default_temp_root(checkout, environment=env, platform="nt")


def test_linux_ci_retains_ignored_checkout_location(tmp_path):
    assert default_temp_root(tmp_path, environment={}, platform="posix") == (
        tmp_path / ".pytest-tmp"
    )


def test_explicit_environment_root_is_preserved(monkeypatch, tmp_path):
    custom = tmp_path / "my-explicit-pytest-root"
    monkeypatch.setenv("PYTEST_DEBUG_TEMPROOT", str(custom))
    config = SimpleNamespace(rootpath=tmp_path, getoption=lambda _: None)
    pytest_configure(config)
    assert os.environ["PYTEST_DEBUG_TEMPROOT"] == str(custom)
    assert not (tmp_path / ".pytest-tmp").exists()


def test_explicit_basetemp_is_preserved(monkeypatch, tmp_path):
    monkeypatch.delenv("PYTEST_DEBUG_TEMPROOT", raising=False)
    config = SimpleNamespace(rootpath=tmp_path, getoption=lambda _: str(tmp_path / "manual"))
    pytest_configure(config)
    assert "PYTEST_DEBUG_TEMPROOT" not in os.environ
    assert not (tmp_path / ".pytest-tmp").exists()
