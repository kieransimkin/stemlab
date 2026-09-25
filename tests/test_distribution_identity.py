from pathlib import Path

try:
    import tomllib
except ModuleNotFoundError:  # Python 3.10
    import tomli as tomllib


def test_stemlab_canonical_identity_is_not_distribution_name():
    root = Path(__file__).resolve().parents[1]
    pyproject = tomllib.loads((root / "pyproject.toml").read_text(encoding="utf-8"))
    readme = (root / "README.md").read_text(encoding="utf-8")

    # The registry coordinate is namespaced under Dance Flow because the bare
    # PyPI name is unavailable. It must not rename the product itself.
    assert pyproject["project"]["name"] == "danceflow-stemlab"
    assert pyproject["project"]["scripts"]["stemlab"] == "stemlab.cli:app"
    assert readme.startswith("# StemLab")
    assert "canonical project name is **StemLab**" in readme
    assert "pip install danceflow-stemlab" in readme
