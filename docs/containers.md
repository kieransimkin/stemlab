# StemLab containers

StemLab publishes a tested Linux AMD64 image only after the release workflow
has successfully created the corresponding GitHub Release.

The image is the container form of **StemLab**, the audio-analysis component of
the wider DanceFlow BPM and motion-response workflow.

## GitHub Container Registry

Ordinary branch pushes, pull requests, manual CI runs and tag CI runs do not
build or publish container images. A successful versioned GitHub Release
publishes:

```text
ghcr.io/kieransimkin/stemlab:v<version>
ghcr.io/kieransimkin/stemlab:<version>
ghcr.io/kieransimkin/stemlab:<major>.<minor>
ghcr.io/kieransimkin/stemlab:latest
ghcr.io/kieransimkin/stemlab:sha-<commit>
```

## Docker Hub

When `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are configured, the release
workflow publishes the same versioned aliases to:

```text
<DOCKERHUB_USERNAME>/stemlab
```

Use a Docker Hub access token with push permission rather than an account
password.

## Reproducibility

The Docker build uses the exact checkout supplied by GitHub Actions and records
`github.sha` in the image build metadata. It does not clone a second copy of
StemLab during the build.

The Docker-specific Python dependency set is pinned in
`docker/requirements.lock.txt`; Torch/TorchAudio/TorchVision are installed together so
the CUDA or CPU wheel index can be selected explicitly.

The image uses Python 3.11 so its verified dependency set can include Spotify
Basic Pitch as well as every standard StemLab backend. It also installs MuQ for
the opt-in MuQ-MuLan audio-semantic route. MuQ's released model weights are
CC-BY-NC 4.0 and are never fetched merely by building the image; use
`--audio-semantics` only when that licence is suitable. The environment verifier
imports both optional runtimes and reconciles every registered separation model
to a supported container backend.

The CLI also exposes the 1.2 MIDI and complementary-evidence registries. Those
research integrations are intentionally not all baked into one image: several
need incompatible environments, explicit upstream repositories, restricted
weights or case-specific licence review. Use a separately provisioned
`--backend-python MODEL=PATH` for the selected backend. The container's verified
full feature set means StemLab's standard analysis profiles plus Basic Pitch and
opt-in MuQ-MuLan; it does not mean every registry entry is inference-ready.

For local validation, see `docker/README.md`.
