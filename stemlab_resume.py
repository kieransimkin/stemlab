#!/usr/bin/env python
from __future__ import annotations

import argparse
import email
import json
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.request
import zipfile
from pathlib import Path

EXPECTED_REPO = "kieransimkin/stemlab"
VERSION = "1.0.0"
TAG = "v1.0.0"
DIST_NAME = "danceflow-stemlab"

# The first finalisation pass intentionally renamed these modules. One absolute
# test import was missed. These replacements make the migration exhaustive and
# are safe to run repeatedly.
PYTHON_REPLACEMENTS = (
    ("from stemlab.analysis.audio_features import ", "from stemlab.analysis.sonic import "),
    ("from .audio_features import ", "from .sonic import "),
    ("import stemlab.analysis.audio_features", "import stemlab.analysis.sonic"),
    ("from stemlab.sonic import build_session", "from stemlab.sonic_visualiser import build_session"),
    ("from .sonic import build_session", "from .sonic_visualiser import build_session"),
    ("stemlab.sonic.audio_info", "stemlab.sonic_visualiser.audio_info"),
)

STALE_IMPORT_TOKENS = (
    "stemlab.analysis.audio_features",
    ".audio_features import",
    "from stemlab.sonic import build_session",
    "from .sonic import build_session",
    "stemlab.sonic.audio_info",
)


def run(cmd: list[str], cwd: Path, *, capture: bool = False) -> str:
    print("+", " ".join(cmd))
    completed = subprocess.run(
        cmd,
        cwd=cwd,
        check=True,
        text=True,
        capture_output=capture,
    )
    return completed.stdout.strip() if capture else ""


def git(root: Path, *args: str, capture: bool = False) -> str:
    return run(["git", *args], root, capture=capture)


def repair_imports(root: Path) -> None:
    changed: list[str] = []
    for base in (root / "src", root / "tests", root / "scripts"):
        if not base.exists():
            continue
        for path in base.rglob("*.py"):
            original = path.read_text(encoding="utf-8")
            updated = original
            for old, new in PYTHON_REPLACEMENTS:
                updated = updated.replace(old, new)
            if updated != original:
                path.write_text(updated.rstrip() + "\n", encoding="utf-8", newline="\n")
                changed.append(str(path.relative_to(root)))

    if changed:
        print("repaired stale imports:")
        for item in changed:
            print(f"  - {item}")
    else:
        print("no stale imports required rewriting")

    stale: list[str] = []
    for base in (root / "src", root / "tests", root / "scripts"):
        if not base.exists():
            continue
        for path in base.rglob("*.py"):
            text = path.read_text(encoding="utf-8")
            for token in STALE_IMPORT_TOKENS:
                if token in text:
                    stale.append(f"{path.relative_to(root)}: {token}")
    if stale:
        raise SystemExit(
            "Stale pre-1.0 module references remain:\n" + "\n".join(stale)
        )


def assert_finalised_layout(root: Path) -> None:
    required = (
        "src/stemlab/analysis/sonic.py",
        "src/stemlab/sonic_visualiser.py",
        "docs/danceflow.md",
        "docs/web.md",
        "docs/containers.md",
        "docs/publishing.md",
        "CHANGELOG.md",
        "scripts/release_about.py",
        "tests/test_repository_hygiene.py",
    )
    missing = [item for item in required if not (root / item).is_file()]
    if missing:
        raise SystemExit(
            "The original finaliser did not reach the expected partially-applied "
            "state. Missing:\n" + "\n".join(missing)
        )

    forbidden = (
        "src/stemlab/analysis/audio_features.py",
        "src/stemlab/sonic.py",
        "UPGRADE_NOTES.md",
        "uv.lock",
        "snapshot-stemlab-environment.ps1",
        "environment-snapshot",
    )
    present = [item for item in forbidden if (root / item).exists()]
    if present:
        raise SystemExit(
            "Stale pre-1.0 paths are still present:\n" + "\n".join(present)
        )

    root_debris = [
        p.name
        for pattern in ("*.patch", "*.zip", "*.whl")
        for p in root.glob(pattern)
        if p.is_file()
    ]
    # The repair script itself may have been copied into the repository. Ignore
    # it for validation; .gitignore prevents it from entering the release.
    root_debris = [
        name for name in root_debris
        if not name.startswith("stemlab-1.0.0-resume")
    ]
    if root_debris:
        raise SystemExit(
            "Root-level release debris remains:\n" + "\n".join(sorted(root_debris))
        )


def assert_identity(root: Path) -> None:
    pyproject = (root / "pyproject.toml").read_text(encoding="utf-8")
    init_py = (root / "src/stemlab/__init__.py").read_text(encoding="utf-8")
    readme = (root / "README.md").read_text(encoding="utf-8")
    workflow = (root / ".github/workflows/release.yml").read_text(encoding="utf-8")

    checks = {
        "PyPI distribution": 'name = "danceflow-stemlab"' in pyproject,
        "dynamic package version": 'dynamic = ["version"]' in pyproject,
        "StemLab 1.0.0": '__version__ = "1.0.0"' in init_py,
        "canonical StemLab README": readme.startswith("# StemLab"),
        "DanceFlow description": "DanceFlow" in readme,
        "DanceMoves relationship": "DanceMoves" in readme,
        "tag-driven release": 'tags: ["v*"]' in workflow,
        "PyPI OIDC": "id-token: write" in workflow,
        "release about generator": "scripts/release_about.py" in workflow,
        "PyPI coordinate": "danceflow-stemlab" in workflow,
    }
    failed = [name for name, ok in checks.items() if not ok]
    if failed:
        raise SystemExit("1.0 identity/release checks failed:\n" + "\n".join(failed))


def install_validation_deps(root: Path) -> None:
    run([sys.executable, "-m", "pip", "install", "-U", "pip"], root)
    run([sys.executable, "-m", "pip", "install", "-e", ".[dev,server]"], root)
    run([sys.executable, "-m", "pip", "install", "-U", "build", "twine"], root)


def validate_source(root: Path) -> None:
    print("\n=== Source validation ===")
    run([sys.executable, "-m", "compileall", "-q", "src", "tests", "scripts"], root)
    run([sys.executable, "-m", "pytest", "-q"], root)
    run([sys.executable, "-m", "ruff", "check", "src", "tests", "scripts"], root)
    git(root, "diff", "--check")


def build_and_validate_distribution(root: Path) -> None:
    print("\n=== Distribution validation ===")
    shutil.rmtree(root / "dist", ignore_errors=True)
    shutil.rmtree(root / "build", ignore_errors=True)
    run([sys.executable, "-m", "build"], root)

    dists = sorted((root / "dist").glob("*"))
    if not dists:
        raise SystemExit("python -m build produced no distributions.")

    run(
        [sys.executable, "-m", "twine", "check", *[str(path) for path in dists]],
        root,
    )

    wheels = sorted((root / "dist").glob("danceflow_stemlab-1.0.0-*.whl"))
    if len(wheels) != 1:
        raise SystemExit(
            "Expected exactly one danceflow_stemlab-1.0.0 wheel, got: "
            + ", ".join(path.name for path in wheels)
        )

    with zipfile.ZipFile(wheels[0]) as archive:
        metadata_name = next(
            name for name in archive.namelist()
            if name.endswith(".dist-info/METADATA")
        )
        metadata = email.message_from_bytes(archive.read(metadata_name))
        names = set(archive.namelist())

    expected = {
        "Name": "danceflow-stemlab",
        "Version": "1.0.0",
    }
    for field, value in expected.items():
        if metadata.get(field) != value:
            raise SystemExit(
                f"Wheel metadata mismatch: {field}={metadata.get(field)!r}, "
                f"expected {value!r}"
            )

    if not any(name.endswith("stemlab/__init__.py") for name in names):
        raise SystemExit("Built wheel does not contain the stemlab Python package.")
    if not any(name.endswith("stemlab/web/index.html") for name in names):
        raise SystemExit("Built wheel does not contain StemLab web assets.")

    print(
        f"wheel OK: {wheels[0].name} | "
        f"{metadata.get('Name')} {metadata.get('Version')} | "
        f"Requires-Python {metadata.get('Requires-Python')}"
    )


def gh_json(root: Path, args: list[str]):
    raw = run(["gh", *args], root, capture=True)
    return json.loads(raw or "[]")


def wait_for_run(
    root: Path,
    *,
    workflow: str,
    event: str,
    commit: str,
    head_branch: str | None = None,
    timeout: int = 120,
) -> int:
    deadline = time.time() + timeout
    while time.time() < deadline:
        runs = gh_json(
            root,
            [
                "run", "list",
                "--workflow", workflow,
                "--event", event,
                "--commit", commit,
                "--limit", "20",
                "--json", "databaseId,createdAt,status,conclusion,headBranch,headSha,event",
            ],
        )
        for item in runs:
            if item.get("headSha") != commit:
                continue
            if head_branch is not None and item.get("headBranch") != head_branch:
                continue
            return int(item["databaseId"])
        time.sleep(3)
    raise SystemExit(
        f"Timed out waiting for {workflow} event={event} "
        f"commit={commit} branch={head_branch}"
    )


def ensure_pypi_environment(root: Path) -> None:
    # Idempotently create/read the environment referenced in release.yml. This
    # also makes the OIDC environment claim explicit for future publisher rules.
    run(
        [
            "gh", "api", "--method", "PUT",
            f"repos/{EXPECTED_REPO}/environments/pypi",
            "--silent",
        ],
        root,
    )


def wait_for_pypi(version: str, timeout: int = 180) -> None:
    url = f"https://pypi.org/pypi/{DIST_NAME}/{version}/json"
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            with urllib.request.urlopen(url, timeout=15) as response:
                if response.status == 200:
                    payload = json.load(response)
                    info = payload.get("info", {})
                    print(
                        f"PyPI verified: {info.get('name')} "
                        f"{info.get('version')}"
                    )
                    return
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError):
            pass
        time.sleep(5)
    raise SystemExit(f"PyPI did not expose {DIST_NAME} {version} within {timeout}s.")


def publish(root: Path) -> None:
    print("\n=== Publication preflight ===")
    if shutil.which("gh") is None:
        raise SystemExit("GitHub CLI (`gh`) is required for --publish.")
    run(["gh", "auth", "status"], root)

    branch = git(root, "branch", "--show-current", capture=True)
    if branch != "main":
        raise SystemExit(f"Expected main branch, currently on {branch!r}.")

    origin = git(root, "remote", "get-url", "origin", capture=True)
    if EXPECTED_REPO not in origin:
        raise SystemExit(f"Unexpected origin remote: {origin}")

    if git(root, "tag", "--list", TAG, capture=True):
        raise SystemExit(f"{TAG} already exists locally; refusing to retag.")
    if git(root, "ls-remote", "--tags", "origin", f"refs/tags/{TAG}", capture=True):
        raise SystemExit(f"{TAG} already exists on origin; refusing to retag.")

    # The user explicitly invoked --publish. Show exactly what will be committed
    # before staging it.
    print("\n=== 1.0 changes ===")
    run(["git", "status", "--short"], root)

    git(root, "add", "-A")
    # Generated build directories are gitignored; make doubly sure they are not staged.
    staged = git(root, "diff", "--cached", "--name-only", capture=True)
    if not staged:
        raise SystemExit("No finalised 1.0 changes are staged.")

    # Never ship a copied repair/finaliser helper.
    staged_helpers = [
        line for line in staged.splitlines()
        if "stemlab-1.0.0-resume" in line or "stemlab-1.0.0-finalize" in line
    ]
    if staged_helpers:
        git(root, "restore", "--staged", *staged_helpers)
        print("excluded local finaliser helper(s) from commit")

    git(root, "commit", "-m", "Prepare StemLab 1.0.0")
    commit = git(root, "rev-parse", "HEAD", capture=True)
    git(root, "push", "origin", "main")

    run(
        [
            "gh", "repo", "edit", EXPECTED_REPO,
            "--description",
            "StemLab: DanceFlow audio analysis for BPM and motion-response workflows, including WordPress DanceMoves.",
            "--homepage", "https://kieransimkin.co.uk/",
        ],
        root,
    )
    ensure_pypi_environment(root)

    print("\n=== Non-publishing release dry run ===")
    run(["gh", "workflow", "run", "release.yml", "--ref", "main"], root)
    dry_run = wait_for_run(
        root,
        workflow="release.yml",
        event="workflow_dispatch",
        commit=commit,
        head_branch="main",
    )
    run(["gh", "run", "watch", str(dry_run), "--exit-status"], root)

    # Dry run has exercised the heavyweight release-build/Nuitka path. Only now
    # create the immutable public version tag.
    print("\n=== Publishing StemLab 1.0.0 ===")
    git(root, "tag", "-a", TAG, "-m", "StemLab 1.0.0")
    git(root, "push", "origin", TAG)

    release_run = wait_for_run(
        root,
        workflow="release.yml",
        event="push",
        commit=commit,
        head_branch=TAG,
    )
    ci_run = wait_for_run(
        root,
        workflow="ci.yml",
        event="push",
        commit=commit,
        head_branch=TAG,
    )

    print(f"Release workflow run: {release_run}")
    run(["gh", "run", "watch", str(release_run), "--exit-status"], root)

    print(f"Versioned container CI run: {ci_run}")
    run(["gh", "run", "watch", str(ci_run), "--exit-status"], root)

    print("\n=== Publication verification ===")
    run(["gh", "release", "view", TAG, "--repo", EXPECTED_REPO], root)
    wait_for_pypi(VERSION)

    # The CI job is itself authoritative for GHCR + Docker Hub push success.
    # If Docker is available locally, additionally verify the public GHCR tag.
    if shutil.which("docker"):
        run(
            [
                "docker", "buildx", "imagetools", "inspect",
                f"ghcr.io/kieransimkin/stemlab:{VERSION}",
            ],
            root,
        )

    print("\nStemLab 1.0.0 is published.")
    print("GitHub Release: https://github.com/kieransimkin/stemlab/releases/tag/v1.0.0")
    print("PyPI: https://pypi.org/project/danceflow-stemlab/1.0.0/")
    print("GHCR: ghcr.io/kieransimkin/stemlab:1.0.0")
    print("Docker Hub: versioned image confirmed by the successful CI publish job.")


def main() -> int:
    parser = argparse.ArgumentParser(
        description=(
            "Resume the partially-applied StemLab 1.0 finalisation, repair the "
            "missed module import, fully validate it, and optionally publish."
        )
    )
    parser.add_argument("repository", nargs="?", default=".")
    parser.add_argument("--publish", action="store_true")
    args = parser.parse_args()

    root = Path(args.repository).expanduser().resolve()
    if not (root / ".git").is_dir() or not (root / "pyproject.toml").is_file():
        parser.error(f"Not a StemLab checkout: {root}")

    repair_imports(root)
    assert_finalised_layout(root)
    assert_identity(root)

    install_validation_deps(root)
    validate_source(root)
    build_and_validate_distribution(root)

    print("\nAll local 1.0 source and distribution checks passed.")

    if args.publish:
        publish(root)
    else:
        print(
            "Run this same script with --publish to commit, perform the GitHub "
            "Release dry run, tag v1.0.0 and verify publication."
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
