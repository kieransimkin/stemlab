# StemLab container publishing

> **Kieran Simkin** · https://kieransimkin.co.uk/ · My Songs: https://kieransimkin.co.uk/my-songs/ · Arcadians: https://kieransimkin.co.uk/arcadians/ · Source: https://github.com/kieransimkin/stemlab


CI publishes the tested Linux AMD64 image after both Python matrix jobs pass.

## GitHub Container Registry

Successful pushes to `main` publish:

```text
ghcr.io/kieransimkin/stemlab:main
ghcr.io/kieransimkin/stemlab:edge
ghcr.io/kieransimkin/stemlab:sha-<commit>
```

Tags matching `v*` additionally publish the tag, semantic-version aliases, and
`latest`. GHCR uses the workflow's built-in `GITHUB_TOKEN`; no extra secret is
required.

## Docker Hub

Docker Hub publishing is optional. Configure these repository Actions secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

When both are present, the same image is also pushed to:

```text
<DOCKERHUB_USERNAME>/stemlab
```

Use a Docker Hub access token with push permission rather than an account
password.

## Reproducibility

The image build receives the exact `github.sha` as `STEMLAB_REF`.
`docker/install-stemlab.sh` now accepts branches, tags, and exact commit SHAs,
so the image embeds exactly the revision that passed CI.
