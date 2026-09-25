from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # Python 3.10
    import tomli as tomllib

import stemlab


def test_stemlab_stable_identity():
    root = Path(__file__).resolve().parents[1]
    pyproject = tomllib.loads((root / "pyproject.toml").read_text(encoding="utf-8"))
    readme = (root / "README.md").read_text(encoding="utf-8")

    project = pyproject["project"]
    assert project["name"] == "danceflow-stemlab"
    assert project["scripts"]["stemlab"] == "stemlab.cli:app"
    assert "version" in project["dynamic"]
    assert "version" not in project
    assert stemlab.__version__ == "1.0.0"

    assert readme.startswith("# StemLab")
    assert "canonical project name is **StemLab**" in readme
    assert "pip install danceflow-stemlab" in readme
    assert "DanceFlow" in readme
    assert "DanceMoves" in readme
