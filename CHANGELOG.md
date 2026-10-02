# Changelog

## Unreleased

- Restore BeatNet offline/DBN analysis on modern Python with an explicit `madmom-prebuilt` dependency and a SHA-256-verified bootstrap of BeatNet's official 1.1.3 wheel that bypasses its unsatisfiable legacy dependency metadata. Honour `--no-bootstrap`, report cached readiness in `stemlab doctor`, and verify real 120 BPM inference plus JSON/TSV output on Python 3.13.

## 1.2.0 - 2026-10-01

- Add an explicitly exploratory whole-master cut-point search for new potential loops, with separate waveform and spectral-context rankings, per-candidate failed-gate evidence, and no relaxation of accepted-loop status.
- Add an optional native-sample loop-duration limit to new analyses, rescans, the Python finder and Codex tools, with boundary validation and per-section rejection evidence for short-video planning.
- Add section-level acoustic-versus-timing boundary counts to explain unresolved scans without weakening safety gates, and allow explicitly labelled hook search windows.

## 1.1.2 - 2026-10-01

- Fix the Sonic Annotator CSV invocation to use its supported `--csv-omit-filename` option, restoring Vamp analysis in the pinned 1.7 runtime.
- Make the `beats` and `all` extras installable with the current StemLab core by excluding BeatNet's incompatible legacy NumPy/Numba pin. BeatNet remains an explicitly unavailable adapter unless separately provisioned; Beat This! and the Vamp beat tracker remain usable.

## 1.1.1 - 2026-09-30

- Shorten the official MCP Registry description to satisfy its 100-character schema limit.

## 1.1.0 — 2026-09-30

- Add native, complete-bar loop discovery for eligible verse and chorus occurrences, retaining exact source-sample bounds, beat-grid diagnostics, full-vocal boundary evidence, multichannel waveform seam checks and unresolved-section reasons.
- Add optional exact WAV loop export and loop-only rescanning of saved analyses without rerunning separation or learned models.
- Add loop selection, audition and zoom support to the shared React timeline.
- Add the local StemLab Codex plugin and MCP server for bounded analysis jobs, saved-artifact inspection and private timeline viewing.
- Add release-gated Codex marketplace and opt-in official MCP Registry publication, tied to the matching PyPI version and GitHub OIDC ownership.
- Include the My Songs portfolio in README, Python package and plugin metadata.

## 1.0.1 — 2026-09-28

- Restrict container image builds and publication to the release workflow, after the GitHub Release has been created; ordinary CI no longer has package-write permission.
- Extract the browser audio transport, playhead, zoom, seeking and generic lane renderers into the independent `react-timeline-sequence` React package, then consume the public npm package (`^0.1.3`) from StemLab's web client.
- Add beat-grid tempo-regime analysis for stable sections, gradual ramps, abrupt changes and persistent same-BPM phase skips.
- Report fixed-BPM section precision with residual percentiles, RMSE, interval error, end drift and a documented shorthand grade.
- Make repetition-safe Whisper decoding the default, record the prior-window setting, and flag suspicious repeated-token loops for section-wise recovery.
- Add the `use-and-improve-stemlab` Codex skill for evidence-led analysis and reusable capability improvements.

## 1.0.0 — 2026-09-25

First stable StemLab release.

### Analysis

- Multi-model source separation with BS-RoFormer, SCNet, Demucs and Open-Unmix.
- Independent beat/downbeat estimation and detector consensus.
- Vamp/Sonic Annotator harmony, melody, note and structural analysis.
- All-In-One functional structure analysis.
- Loudness, dynamics, timbre and stereo analysis.
- Groove, meter, swing and timing evidence.
- Functional harmony, progression and cadence summaries.
- Phonetic rhyme, repetition, prosody and lyric semantic analysis.
- Section-level song-map fusion.
- Optional MuQ-MuLan and Basic Pitch analysis routes.

### DanceFlow

- Defines StemLab as the audio-analysis engine in the wider DanceFlow BPM and
  motion-response workflow.
- Documents the relationship to the WordPress DanceMoves plugin while keeping
  StemLab standalone and WordPress-independent.

### Distribution

- Canonical product/project name remains **StemLab**.
- PyPI distribution: `danceflow-stemlab`.
- Python package and CLI: `stemlab`.
- Versioned GitHub Release, PyPI, GHCR and Docker Hub publishing workflows.
- Kieran Simkin attribution, website, My Songs and Arcadians showcase retained
  throughout package/release metadata.

### Repository

- Removed historical patch archives, old build artifacts and environment
  snapshots.
- Clarified sonic-analysis versus Sonic Visualiser module naming.
- Consolidated long-form operational documentation under `docs/`.
- Added repository-hygiene and stable-identity regression tests.
