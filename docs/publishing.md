# Publishing StemLab

**StemLab** is the canonical project and product name. It is the audio-analysis component of the wider **DanceFlow** BPM and motion-response workflow, with the WordPress **DanceMoves** plugin as a related downstream component.

StemLab is part of the wider **Dance Flow** project. Because the bare `stemlab`
name is already allocated on PyPI, its Python distribution uses the globally
unique registry identifier **`danceflow-stemlab`**.

That packaging identifier does not rename the project.

| Identity | Value |
| --- | --- |
| Canonical project/product | **StemLab** |
| Parent project | **Dance Flow** |
| PyPI distribution | `danceflow-stemlab` |
| Install command | `pip install danceflow-stemlab` |
| Python import | `import stemlab` |
| CLI | `stemlab` |
| GitHub repository | `kieransimkin/stemlab` |
| Container image | `stemlab` |
| GitHub release title | `StemLab <version>` |

## Destinations

A successful version tag such as `v1.0.0` publishes StemLab to:

- PyPI as the `danceflow-stemlab` distribution.
- GitHub Releases as **StemLab**, with wheel, sdist, Linux one-file CLI,
  checksums, release manifest and attribution material.
- GitHub Container Registry as the `stemlab` image.
- Docker Hub as the `stemlab` image when the Docker Hub secrets are configured.

The existing CI workflow handles GHCR and Docker Hub. The Release workflow
handles GitHub Releases and PyPI.

## One-time PyPI Trusted Publisher setup

StemLab uses PyPI Trusted Publishing (OIDC), so no persistent PyPI API token is
stored in GitHub Secrets.

Configure a pending GitHub publisher in your PyPI account using these values:

| Field | Value |
| --- | --- |
| PyPI project name | `danceflow-stemlab` |
| GitHub owner | `kieransimkin` |
| GitHub repository | `stemlab` |
| Workflow filename | `release.yml` |
| Environment | `pypi` |

The PyPI project will be created as `danceflow-stemlab` on the first successful
Trusted Publishing upload. Its README and metadata identify the software itself
as **StemLab**.

## GitHub environment

Create the GitHub Actions environment:

`Repository Settings -> Environments -> New environment -> pypi`

Required reviewers are optional but recommended for publishing protection.

## Releasing StemLab 1.0.0

The version in `pyproject.toml` must equal the tag without the leading `v`.

```bash
git pull
git status
git tag -a v1.0.0 -m "StemLab 1.0.0"
git push origin v1.0.0
```

The tag starts:

1. **CI** — tests StemLab and publishes versioned `stemlab` images to GHCR and
   Docker Hub.
2. **Release** — tests StemLab again, builds the wheel/sdist and standalone CLI,
   creates the **StemLab 1.0.0** GitHub Release, and publishes the
   `danceflow-stemlab` Python distribution to PyPI using OIDC.

## Manual workflow runs

`workflow_dispatch` builds and validates the release artifacts, but it does not
publish to PyPI or create a GitHub Release. Publication requires a `v*` tag.

## Public attribution

Release material retains the canonical StemLab name and includes:

- Kieran Simkin
- https://kieransimkin.co.uk/
- https://kieransimkin.co.uk/my-songs/
- https://kieransimkin.co.uk/arcadians/
- https://github.com/kieransimkin/stemlab
