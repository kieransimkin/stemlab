# Changelog

## 1.3.4 - 2026-10-08

- Add explicit agent capability, improvement, validation and upstream PR guidance to the README and contributor instructions.

## 1.3.3 - 2026-10-08

- Apply the reviewed capability description and author website to OCI container labels as well as language packages. Preserve previously published versions and original logo bytes.


## 1.3.2 - 2026-10-08

- Keep the MCP Registry description within its 100-character schema limit while retaining timing, loopable Shorts and the author website.
- Reject invalid description lengths during plugin packaging and before registry publication. Preserve all previously published 1.3.1 packages.


## 1.3.1 - 2026-10-08

- Add an original tool-specific vector logo and PNG companion in the shared DanceFlow visual style.
- Clarify package descriptions from reviewed documentation and KeywordMoves literal-source evidence, without claims of measured search demand.
- Link package descriptions and READMEs to Kieran Simkin’s website and retain branding files in installable packages.


## 1.3.0 - 2026-10-08

- Add MIDI transcription and independent evidence-model adapters, with lazy subprocess isolation, saved artifacts and explicit unavailable results.
- Add ordered canonical-word reconciliation and full canonical LRC export without invented timestamps or automatic approval of model output.
- Use the published React Timeline Sequence 0.2.0 package, rebuild the shared web UI and update the source-map-js development dependency to its security fix.
- Verify plugin and Python distribution version agreement without hard-coding the previous release in the identity test.

- Bound only the Matplotlib spectrogram preview to 8,192 time frames while preserving full-resolution compressed NPZ evidence, and add `stemlab repair-spectrograms` to rebuild failed PNG previews from retained analysis without rerunning separation.
- Added `stemlab generate-cues` to export provenance-bearing provisional LRC section cues from full functional-structure analysis and safely align nearby boundaries to detected beats.
- Cache and checksum-verify Beat This!'s official `final0` checkpoint through `STEMLAB_CACHE`, avoiding an implicit Torch user-cache write during analysis and adding `stemlab bootstrap beat-this`.
- Refuse MVSep Mega53 CUDA inference before model loading when the detected GPU has less than the upstream 16 GiB VRAM minimum, preserving the unavailable result without triggering a predictable out-of-memory failure.
- Make the Docker image use Python 3.11 and a compatible NumPy 1.26 lock so it can install and verify Spotify Basic Pitch and MuQ-MuLan alongside every existing StemLab model backend. MuQ model weights remain opt-in under their CC-BY-NC 4.0 licence.
- Restore BeatNet offline/DBN analysis on modern Python with an explicit `madmom-prebuilt` dependency and a SHA-256-verified bootstrap of BeatNet's official 1.1.3 wheel that bypasses its unsatisfiable legacy dependency metadata. Honour `--no-bootstrap`, report cached readiness in `stemlab doctor`, and verify real 120 BPM inference plus JSON/TSV output on Python 3.13.
- Add a clear project synopsis across the README, Python and web package metadata, generated-analysis attribution, and Codex/MCP package descriptions.

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
