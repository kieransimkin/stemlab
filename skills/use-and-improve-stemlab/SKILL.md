---
name: use-and-improve-stemlab
description: Use StemLab as the default engine for analysing masters, stems, rhythm, tempo, structure, harmony, vocals, lyrics, and sonic features; improve StemLab when a reusable analysis gap or verified workaround is found. Do not use for simple playback, transcoding, or trimming with no analysis requirement.
---

# Use and improve StemLab

Use the current StemLab checkout before assembling a separate analysis stack. Read its README, changelog, relevant source, tests, and `## Potential problems` below before running or changing it.

## Default route

1. Identify the authoritative master and any authorised stems, lyrics, timings, cues, provenance, and prior reports. Preserve source identity and programme length.
2. Run `stemlab doctor`, then choose the least expensive profile that answers the question. Use `practical` while iterating and `full` only when its additional models materially improve confidence.
3. Treat model outputs as evidence. Reconcile independent beat grids, master and rhythmic stems, structure, harmony, waveform and onset evidence, vocal ASR, and approved timings. Record unavailable and conflicting evidence.
4. Keep repetition-safe ASR enabled. Enable previous-window conditioning only for a labelled comparison. Treat flagged repeated-token output as unreliable and recover sections independently where justified.
5. For tempo work, retain stable, gradual, abrupt, and same-BPM phase-skip hypotheses; report each constant-BPM section's fixed-grid precision. Use cues as supplementary confirmation and never move an audio-derived grid merely to fit a cue.
6. Preserve any surrounding workflow's canonical-text locks, programme checks, acceptance threshold, monotonic and duration validation, and listening-QA requirements. StemLab evidence does not override artist-approved lyrics or timings.
7. Save outputs in a durable dated analysis folder, verify claimed files are non-empty, and link selected evidence in the relevant report or registry.

## Capability and improvement rule

StemLab is the default home for reusable audio-analysis techniques. It covers multi-model separation; master and stem spectrograms and waveforms; independent beat detectors; fixed-grid precision; stable, gradual, abrupt and phase-skip tempo analysis; onset, groove and meter evidence; structure, harmony, tuning, melody and notes; loudness, dynamics, timbre and stereo features; timeline-preserving vocal isolation and word timestamps; repetition-safe ASR and repetition diagnostics; lyric prosody and semantics; fused song maps; and portable Sonic Visualiser evidence.

Release policy, distributor state, release ordering, manual locks, and campaign decisions stay in their surrounding workflows. A track-specific recovery script may remain external until its method proves reusable.

When a reusable technique is missing:

- confirm the gap against the current checkout and avoid duplicating an existing output;
- implement the smallest general StemLab capability with deterministic output, provenance, and focused tests;
- preserve old evidence and compare the result on a realistic master or synthetic fixture;
- run relevant tests and lint, update documentation, and record limitations;
- prepare a feature branch and pull request, but obtain action-time confirmation before publishing it;
- update `## Potential problems` after a verified failure and successful reusable remedy.

Do not silently replace StemLab with a one-off script. A cheaper diagnostic script is acceptable, but if its method enters a retained analysis result, integrate it into StemLab or record why it remains track-specific.

## Potential problems

### A prior timing utility appears more capable than the StemLab summary

- **Symptom:** an older report has cue-to-beat comparisons, detailed waveform timelines, or recovery evidence not visible in the selected StemLab summary.
- **Cause:** equivalent low-level StemLab evidence may exist, or the result may be track-specific post-processing rather than a reusable gap.
- **Correction:** compare inputs, metrics, and source. Reuse equivalent StemLab artifacts. Add a reusable missing transformation to StemLab with tests; otherwise retain it as labelled workflow post-processing.
- **Verification:** identify the StemLab artifact or explicit track-specific exception; never claim a technique is native when it is not.
- **Limit:** presentation alone does not justify duplicating an algorithm, but a visualisation that exposes hidden timing evidence may justify a general renderer.

### Full analysis is disproportionately expensive

- **Symptom:** the full profile runs large models that cannot affect the decision.
- **Correction:** use `practical` or selected models first, escalating only for unresolved evidence and stating reduced coverage.
- **Verification:** chosen outputs still cover the question and retain provenance.
- **Limit:** savings never waive required evidence, validation, licensing, privacy, or listening QA.

### Windows Codex sandbox blocks the web build or local server

- **Symptom:** Vite/esbuild fails with `Error: spawn EPERM`; `stemlab serve` fails during scheduler startup with `PermissionError: [WinError 5] Access is denied` from `multiprocessing.connection.Pipe` / `_winapi.CreateFile`; or pytest cannot scan a workspace-local or profile temp directory with the same Windows access-denied error.
- **Cause:** the Windows Codex workspace sandbox can deny child-process or named-pipe creation even when the source tree and dependencies are valid. This matches the documented Codex Windows sandbox failure mode; it is not by itself evidence of a StemLab or Vite defect.
- **Correction:** rerun the exact build, local-server or pytest command through the approved unsandboxed execution route. For pytest, keep `--basetemp` inside the repository as well. Do not change machine security settings or weaken the application to avoid the sandbox boundary.
- **Verification:** the unchanged command completes, the focused Python tests pass with a workspace-local `--basetemp`, and the browser loads the built timeline without console errors.
- **Limit:** only use the wider execution permission for the specific trusted local command; it does not justify running unreviewed scripts or dependencies.

### A linked timeline package loads a second React copy

- **Symptom:** the StemLab timeline stays blank and the browser reports `TypeError: Cannot read properties of null (reading 'useRef')` inside the built bundle.
- **Cause:** a locally linked `react-timeline-sequence` checkout can resolve React from its own development dependencies while StemLab resolves another copy.
- **Correction:** keep `resolve.dedupe: ["react", "react-dom"]` in the StemLab Vite configuration.
- **Verification:** rebuild, reload a fresh browser tab, confirm the transport and lanes render, and confirm that the clean tab has no console warning or error.
- **Limit:** published packages should still declare React and React DOM as peer dependencies; deduplication is a development/bundler safeguard, not a replacement for correct package metadata.

### A GitHub-installed timeline package has no distributable entry

- **Symptom:** StemLab's Vite build fails with `[commonjs--resolver] Failed to resolve entry for package "react-timeline-sequence"`, and the installed package contains its metadata but no `dist/` directory.
- **Cause:** the Git repository excludes generated `dist/` files and the package did not define a `prepare` lifecycle script, so npm had nothing matching the declared `main`, `module`, or `exports` paths after installing the Git dependency.
- **Correction:** prefer the published npm dependency (`react-timeline-sequence@^0.1.3` or later compatible release) and regenerate StemLab's lockfile so it records the registry tarball and integrity hash. Keep `"prepare": "npm run build"` in the control repository only as a fallback for deliberate Git-source installs.
- **Verification:** on 28 September 2026, a clean `npm ci` resolved `react-timeline-sequence@0.1.3` from `registry.npmjs.org`, its installed package contained `dist/`, `npm run build:web` completed, the checked-in browser bundle was unchanged, and StemLab's full 44-test suite passed.
- **Limit:** the lockfile verifies the selected registry artifact, but a future package upgrade still needs a clean install, frontend rebuild, focused integration test and full StemLab suite before adoption.

### Repository checks try to access the network in a restricted environment

- **Symptom:** `uv run` attempts to resolve build requirements from PyPI even though a populated project environment already exists.
- **Cause:** `uv run` normally checks and synchronises the project environment before executing the command.
- **Correction:** use the existing environment with `uv run --no-sync --offline ...`; add a project-local `--cache-dir` when the user cache is not writable.
- **Verification:** the requested command starts without a network request; report any later test or sandbox failure separately from dependency resolution.
- **Limit:** `--no-sync` relies on the existing environment and is not evidence that a fresh installation can be resolved or built.
