# StemLab Docker Compose environment

> **Kieran Simkin** · https://kieransimkin.co.uk/ · My Songs: https://kieransimkin.co.uk/my-songs/ · Arcadians: https://kieransimkin.co.uk/arcadians/ · Source: https://github.com/kieransimkin/stemlab


The container is a deterministic StemLab runtime for the DanceFlow audio-analysis component. It uses Python 3.11, pinned runtime dependencies, Sonic Annotator and the Vamp Plugin Pack. Python 3.11 keeps Spotify Basic Pitch available while retaining current wheels for the rest of the analysis stack. The image is built from the current repository checkout, so local Docker builds test the exact source tree you are about to commit.

The image includes the dependency path for every registered separation model,
all beat backends, Faster Whisper, All-In-One structure analysis, lyric semantic
embeddings, Spotify Basic Pitch and MuQ-MuLan audio semantics. Model weights are
still fetched from their authoritative upstream locations on first use. MuQ's
released weights are CC-BY-NC 4.0, remain opt-in through `--audio-semantics`,
and are not downloaded during the image build.

StemLab 1.2's MIDI and evidence registries are available through the CLI, but
the image does not preinstall every research backend. Piano Transcription,
Transkun, MR-MT3, YourMT3, FireRedAED, HEART, Qwen forced alignment, SwiftF0,
SongFormer, LVChordia and ADTOF have separate dependency, checkpoint or licence
requirements and may conflict with the core environment. Provision only the
needed backend and pass `--backend-python MODEL=PATH`; a registry listing is not
evidence that its runtime and weights are ready.

## Validate the CI container locally

On Windows PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\docker\ci-local.ps1
```

This builds the image from the current working tree and runs the same
`verify-environment.sh` check used during the Docker build. Run it before
pushing Docker-related changes.

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
particularly for Mega-53. It contains the five main separation routes. The
registered experimental six-source Demucs route remains available explicitly
with `--model htdemucs_6s`; its piano stem is not silently promoted into the
default full profile. Backend failures are still written to `analysis.json`,
consistent with normal StemLab behaviour.

Enable the two opt-in analysis routes explicitly:

```bash
stemlab analyze /music/song.wav --output /output/song \
  --profile full --basic-pitch --audio-semantics
```

## CPU run

```bash
docker compose --profile cpu run --rm stemlab-cpu
```

## Select a specific file

```bash
STEMLAB_AUDIO_FILE=my-song.wav docker compose run --rm stemlab
```

## Build a specific StemLab tag or commit

Check out the desired tag or commit first, then build normally:

```bash
git checkout v1.0.0
docker compose build --no-cache stemlab
```

The Docker build no longer re-clones GitHub. This avoids differences between
the checked-out source, local uncommitted fixes, and the source placed in the
container.

## Caches and outputs

Model and Hugging Face downloads are stored in named Docker volumes so that
large model weights are not downloaded for every run. Analysis output is
written to `./docker-output` by default.

The image runs `stemlab bootstrap all` on first execution. This prepares SCNet,
Beat Transformer, and verifies the Vamp stack before analysing audio.
