from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from stemlab import __version__
from stemlab.branding import (
    ARCADIANS_EPK_URL,
    AUTHOR_NAME,
    AUTHOR_SITE,
    DISTRIBUTION_NAME,
    MY_SONGS_URL,
    PARENT_PROJECT_NAME,
    PROJECT_DESCRIPTION,
    PROJECT_NAME,
    RELATED_PLUGIN_NAME,
    RELATED_PLUGIN_PLATFORM,
    REPOSITORY_URL,
)


def render() -> str:
    return f"""{PROJECT_NAME} {__version__}
{'=' * (len(PROJECT_NAME) + len(__version__) + 1)}

{PROJECT_DESCRIPTION}

Part of: {PARENT_PROJECT_NAME}
Related plugin: {RELATED_PLUGIN_NAME} ({RELATED_PLUGIN_PLATFORM})
PyPI distribution: {DISTRIBUTION_NAME}

Author: {AUTHOR_NAME}
Website: {AUTHOR_SITE}
My Songs: {MY_SONGS_URL}
Arcadians showcase: {ARCADIANS_EPK_URL}
Source: {REPOSITORY_URL}

The distribution identifier is namespaced for PyPI only. The canonical project,
Python package, CLI and container image are all named StemLab/stemlab.
"""


def main() -> int:
    target = Path(sys.argv[1] if len(sys.argv) > 1 else "STEMLAB-ABOUT.txt")
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text(render(), encoding="utf-8")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
