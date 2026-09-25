# StemLab containers

StemLab publishes a tested Linux AMD64 image after the Python CI matrix passes.

The image is the container form of **StemLab**, the audio-analysis component of
the wider DanceFlow BPM and motion-response workflow.

## GitHub Container Registry

Pushes to `main` publish:

```text
ghcr.io/kieransimkin/stemlab:main
ghcr.io/kieransimkin/stemlab:edge
ghcr.io/kieransimkin/stemlab:sha-<commit>
```

Version tags additionally publish semantic-version aliases and `latest`.

## Docker Hub

When `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN` are configured, CI publishes
the same image to:

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
