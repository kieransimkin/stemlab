"""Keep pytest fixtures off Windows sync folders and stale global temp paths.

Windows: %LOCALAPPDATA%/StemLab/pytest/<checkout-fingerprint>/pytest-of-USER/pytest-N.
Other platforms: the existing git-ignored .pytest-tmp/ under the checkout.
Explicit --basetemp or PYTEST_DEBUG_TEMPROOT always wins.
"""
from __future__ import annotations

import hashlib
import os
from pathlib import Path
from typing import Mapping

import pytest


def default_temp_root(
    checkout: Path, *, environment: Mapping[str, str] | None = None, platform: str | None = None
) -> Path:
    """Choose a user-owned, non-synchronised Windows location for test data."""
    current_environment = os.environ if environment is None else environment
    platform = os.name if platform is None else platform
    checkout = Path(checkout).resolve()
    if platform == "nt":
        # %TEMP%/pytest-of-USER can be stale or ACL-protected. Checkouts under
        # OneDrive can lock temporary renames; neither is suitable on Windows.
        base = Path(current_environment.get("LOCALAPPDATA") or Path.home() / "AppData" / "Local")
        key = hashlib.sha256(str(checkout).casefold().encode("utf-8")).hexdigest()[:12]
        return base / "StemLab" / "pytest" / key
    return checkout / ".pytest-tmp"


@pytest.hookimpl(tryfirst=True)
def pytest_configure(config: pytest.Config) -> None:
    """Redirect only pytest's default tmp_path/tmp_path_factory fixtures."""
    if config.getoption("basetemp") is not None:
        return
    if os.environ.get("PYTEST_DEBUG_TEMPROOT"):
        return
    root = default_temp_root(Path(config.rootpath))
    root.mkdir(mode=0o700, parents=True, exist_ok=True)
    os.environ["PYTEST_DEBUG_TEMPROOT"] = str(root)
