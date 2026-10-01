# BeatNet compatibility

## Current StemLab route

BeatNet 1.1.3's published wheel contains working inference code and bundled
model weights, but its dependency metadata pins `numba==0.54.1` and NumPy below
1.21. That cannot be resolved alongside current SciPy, Librosa or
`madmom-prebuilt`.

StemLab therefore keeps the decoder dependencies conventional and handles the
BeatNet wheel as a pinned external runtime:

```bash
pip install "danceflow-stemlab[beats]"
stemlab bootstrap beatnet
stemlab doctor
```

The bootstrap downloads the official PyPI 1.1.3 pure-Python wheel, verifies
SHA-256 `1ecfa17bdcbe899975a88bdb6efebd6970d846a4f3b6cfd5c6f320647c641c7e`,
and extracts only its `BeatNet/` package and bundled weights into StemLab's
platform cache. It does not install or resolve the wheel's obsolete metadata.
The offline DBN adapter uses `madmom-prebuilt==0.17.post1`; streaming still
requires PyAudio and is outside StemLab's analysis route.

`stemlab analyze --no-bootstrap` does not download the wheel. If the runtime is
not already available, StemLab records BeatNet as unavailable and continues
when normal non-strict error handling is enabled.

## Verified result

On 1 October 2026, the real BeatNet 1.1.3 model ran through StemLab on CPython
3.13.14 with NumPy 2.4.6 and `madmom-prebuilt` 0.17.post1. A deterministic
16-second 120 BPM click track produced 32 beats, 16 downbeats and a 120.0 BPM
tempo estimate. StemLab wrote both `beatnet.json` and `beatnet.tsv`. This proves
the runtime, offline DBN inference and serialization path; it is not a claim
about BeatNet's accuracy on every song.

## Upstream proposal

An upstream BeatNet change is still worthwhile. Issue
[#35](https://github.com/mjhydri/BeatNet/issues/35) records the released
Numba-pin installation failure. The unreleased upstream `main` branch has
already relaxed the old NumPy/Numba requirements, but still declares the
historical `madmom` distribution.

A focused pull request should:

- use a maintained modern-Python madmom distribution for offline DBN inference,
  or make the DBN decoder an explicit optional extra;
- keep PyAudio optional for non-streaming modes;
- test installation and one offline inference on Python 3.11, 3.12 and 3.13;
- remove test-only packages from runtime dependencies; and
- publish a release so normal package resolvers receive the corrected metadata.

Until that is released and independently verified, StemLab's pinned bootstrap
remains the reproducible route.

## Potential problems

### Resolver says BeatNet and madmom-prebuilt are incompatible

- **Symptom:** the resolver reports that BeatNet requires `numba==0.54.1` and
  NumPy below 1.21 while `madmom-prebuilt` requires NumPy 1.22.4 or newer.
- **Cause:** BeatNet 1.1.3's package metadata is older than its current source
  requirements.
- **Correction:** install StemLab's `beats` extra, then run
  `stemlab bootstrap beatnet`; do not ask pip or uv to resolve BeatNet 1.1.3.
- **Verification:** `stemlab doctor` reports `ready (installed or verified
  StemLab cache)` and a real offline/DBN smoke run writes BeatNet JSON and TSV.
- **Limit:** this deliberately bypasses dependency metadata, not wheel integrity;
  the exact upstream wheel hash remains mandatory.

## Blogworthiness assessment

**Pass.** The work turns a reproducible modern-Python dependency deadlock into a
verified, hash-pinned runtime path, includes a real model inference result, and
offers a concrete upstream packaging improvement that should help other BeatNet
users. The public account must avoid implying catalogue-wide accuracy from the
synthetic smoke test.
