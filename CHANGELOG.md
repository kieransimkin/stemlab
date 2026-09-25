# Changelog

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
