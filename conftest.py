"""Keep pytest's numbered temporary directories inside this checkout.

On Windows a stale/inaccessible ``%TEMP%\\pytest-of-<username>`` directory can
prevent *every* tmp_path fixture from being constructed (WinError 5). Redirect
only the default pytest temp root; explicit overrides remain authoritative.
Pytest itself creates numbered per-session folders and handles their cleanup.
"""
from __future__ import annotations

import os
from pathlib import Path

import pytest


@pytest.hookimpl(tryfirst=True)
def pytest_configure(config: pytest.Config) -> None:
    """Redirect default tmp_path/tmp_path_factory, not application temp files."""
    if config.getoption("basetemp") is not None:
        return  # An explicit --basetemp always wins.
    if os.environ.get("PYTEST_DEBUG_TEMPROOT"):
        return  # Respect a deliberately configured test temp root.

    root = (Path(config.rootpath) / ".pytest-tmp").resolve()
    root.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.environ["PYTEST_DEBUG_TEMPROOT"] = str(root)
