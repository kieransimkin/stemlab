# StemLab Docker Compose environment

This environment is designed from the supplied known-working Windows snapshot.
It uses Python 3.13, PyTorch 2.14, the same pinned top-level Python package
versions where they are portable, Sonic Annotator 1.7, and Vamp Plugin Pack
2.0. It also installs the current StemLab GitHub release; when the repository
has no published GitHub Release it falls back to `main`.

## GPU run

Requires Docker Desktop / Docker Engine with NVIDIA Container Toolkit GPU
support. Put any music file in `./music`, then run:

```bash
docker compose build --pull
docker compose run --rm stemlab
```

The default smoke test uses the `fast` StemLab profile so it can verify the
complete CLI without forcing the 53-stem model to run on an 8 GB GPU. To run a
larger profile:

```bash
STEMLAB_TEST_PROFILE=practical docker compose run --rm stemlab
STEMLAB_TEST_PROFILE=full docker compose run --rm stemlab
```

The full profile may require substantially more VRAM than an RTX 4060 Ti 8 GB,
particularly for Mega-53. Backend failures are still written to
`analysis.json`, consistent with normal StemLab behaviour.

## CPU run

```bash
docker compose --profile cpu run --rm stemlab-cpu
```

## Select a specific file

```bash
STEMLAB_AUDIO_FILE=my-song.wav docker compose run --rm stemlab
```

## Use a specific StemLab tag or commit

```bash
STEMLAB_REF=v0.2.0 docker compose build --no-cache stemlab
```

`STEMLAB_REF=latest` is the default. It queries the GitHub releases API during
build and falls back to `main` if no GitHub Release exists.

## Caches and outputs

Model and Hugging Face downloads are stored in named Docker volumes so that
large model weights are not downloaded for every run. Analysis output is
written to `./docker-output` by default.

The image runs `stemlab bootstrap all` on first execution. This prepares SCNet,
Beat Transformer, and verifies the Vamp stack before analysing audio.
