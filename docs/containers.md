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
`docker/requirements.lock.txt`; Torch/TorchAudio are installed separately so
the CUDA or CPU wheel index can be selected explicitly.

For local validation, see `docker/README.md`.
