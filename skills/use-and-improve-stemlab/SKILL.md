---
name: use-and-improve-stemlab
description: Use StemLab as the default engine for analysing masters, stems, rhythm, tempo, structure, harmony, vocals, lyrics, sonic features, and loopable short-video sections; improve StemLab when a reusable analysis gap or verified workaround is found. Do not use for simple playback, transcoding, or trimming with no analysis requirement.
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
8. For loop discovery, inspect existing results first and prefer `stemlab loops <results>` so learned models are not rerun. Set `--max-seconds` only to a user-chosen or destination-verified duration budget while retaining the independent complete-bar `--max-bars` gate; never invent a smaller platform cap or mandatory intro/outro margin. Verify the actual publishing route's current limit when needed. Export WAVs only when needed. Treat `deep/loops/loops.json` as authoritative; unresolved sections and zero accepted loops are valid outcomes.
9. Prefer StemLab's real React timeline for visual inspection and loop audition when available, while using JSON for exact numerical claims. Playback transport behavior alone is not listening QA.

## Capability and improvement rule

StemLab is the default home for reusable audio-analysis techniques. It covers multi-model separation; master and stem spectrograms and waveforms; independent beat detectors; fixed-grid precision; stable, gradual, abrupt and phase-skip tempo analysis; onset, groove and meter evidence; structure, harmony, tuning, melody and notes; loudness, dynamics, timbre and stereo features; timeline-preserving vocal isolation and word timestamps; repetition-safe ASR and repetition diagnostics; lyric prosody and semantics; fused song maps; portable Sonic Visualiser evidence; and native-sample, complete-bar loop discovery with vocal-boundary, beat-grid and multichannel waveform-seam checks.

Loop reports use schema `stemlab.loops.v1`. Preserve source identity, native sample rate, section occurrence, detector provenance, start-inclusive/end-exclusive sample bounds, grid and join diagnostics, vocal evidence, rejection counts and unresolved sections. An accepted record is a technical candidate, not proof of narrative suitability or an inaudible repeat; listen across the wrap.

Release policy, distributor state, release ordering, manual locks, and campaign decisions stay in their surrounding workflows. A track-specific recovery script may remain external until its method proves reusable.

When a reusable technique is missing:

- confirm the gap against the current checkout and avoid duplicating an existing output;
- implement the smallest general StemLab capability with deterministic output, provenance, and focused tests;
- preserve old evidence and compare the result on a realistic master or synthetic fixture;
- run relevant tests and lint, update documentation, and record limitations;
- prepare a feature branch and pull request, but obtain action-time confirmation before publishing it;
- update `## Potential problems` after a verified failure and successful reusable remedy.

Do not silently replace StemLab with a one-off script. A cheaper diagnostic script is acceptable, but if its method enters a retained analysis result, integrate it into StemLab or record why it remains track-specific.

For loop-point discovery, distinguish an already repeated musical passage from
two candidate cut points that could make a new loop. Preserve strict accepted
loops, but use `stemlab loops --mode exploratory --search-scope whole_song`
to inspect labelled near-misses anywhere in the master. Compare waveform and
spectral-context rankings under the same bar/seconds cap; neither ranking
waives vocal, grid, sample-join or repeated-playback QA. Treat exploratory
audio as private raw auditions, never as finished seamless edits.

## Potential problems

### A rerendered loop WAV no longer matches its old whole-file hash

- **Symptom:** on 1 October 2026, regenerating the same named Silly Sausage Britain loop and three-repeat audition changed both files' SHA-256 values, while the decoded samples compared exactly with the intended master slice and three-repeat concatenation.
- **Research and cause boundary:** searches of the [python-soundfile project and issues](https://github.com/bastibe/python-soundfile) found no credible exact-match explanation for this particular byte change. Different container headers are possible, but unverified; do not present that as the cause.
- **Corrective action that succeeded:** verify native sample rate, frame count and decoded-sample equality against the master; refresh the manifest with the newly observed whole-file hashes; keep the old hashes out of current identity claims.
- **Verification:** the release-local script passed its exact sample-array checks and the current files' hashes were read back into `candidate-manifest.json`.
- **Limits:** sample equality establishes the decoded export content, not why byte hashes changed, listening quality or public-use approval. Rehash after every rerender.

### Official Demucs model fetch stalls at zero bytes

- **Symptom:** on 1 October 2026, Python's model fetch remained at a zero-byte partial file while CPU separation waited for `htdemucs_ft` weights; the upstream model URL itself returned HTTP 200.
- **Research and cause boundary:** the [official Demucs project](https://github.com/facebookresearch/demucs) and [PyTorch Hub model-cache documentation](https://docs.pytorch.org/docs/stable/hub.html) confirm the model-cache location and download mechanism. The exact Python-network stall cause was not established, so do not label it a corrupted model or failed permission.
- **Corrective action that succeeded:** keep `TORCH_HOME` under `Z:\My Songs\Tools\stemlab\models\torch`, fetch the four official `htdemucs_ft` checkpoint files from `https://dl.fbaipublicfiles.com/demucs/hybrid_transformer/` with the approved `curl.exe` route, then verify each SHA-256 against the publisher's embedded filename digest before rerunning the same backend call. The full hashes and filenames are in `Z:\My Songs\Tools\README.md`; keep the cache out of Git and do not redistribute weights.
- **Verification:** the unchanged CPU separation completed and produced bass, drums, other and complete-vocals tracks matching the master duration and 44.1 kHz sample rate. The full-vocal gate then ran on the saved release-local stem.
- **Limits:** this remedies only an accessible official model fetch. It does not prove the separated vocals are perfect, clear sample rights, validate loop audibility or authorise public audio upload.

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

### Linux CI rejects a Windows-refreshed lockfile as out of sync

- **Symptom:** GitHub Actions on Ubuntu with npm 11.19.0 fails at `npm ci` with `EUSAGE`, says the manifest and lockfile are not in sync, and lists missing platform packages such as `@esbuild/linux-x64`, `@rollup/rollup-linux-x64-gnu` and `fsevents`, even though `npm ci` succeeds on the Windows development checkout.
- **Cause:** npm can prune other operating systems' optional packages when a lockfile is refreshed while `node_modules` already exists. The npm CLI maintainers track this cross-platform failure in [npm/cli#4828](https://github.com/npm/cli/issues/4828) and [npm/cli#7961](https://github.com/npm/cli/issues/7961); both were checked on 28 September 2026 and match the observed esbuild/Rollup package omissions.
- **Correction:** regenerate `package-lock.json` from `package.json` in a genuinely empty temporary directory with the verified project-wide npm 12 CLI, validate representative Windows, Linux and other-platform optional entries, then replace the repository lockfile. Do not regenerate it from the populated Windows `node_modules` tree.
- **Verification:** npm 12.1.0 then completed a clean `npm ci`, Vite rebuilt the browser bundle without changing the checked-in assets, and all four focused web integration tests passed.
- **Limit:** this corrects a cross-platform lockfile. It does not make every optional native package installable on every operating system; npm still selects the compatible artifact for the current runner.

### A normal main-branch CI run starts publishing container images

- **Symptom:** merging an ordinary pull request to `main` starts a `Build and publish container` job, logs in to GHCR and Docker Hub, and begins pushing `main`, `edge` and commit tags even though no release was created.
- **Cause:** the container job lived in `ci.yml` with `if: github.event_name != 'pull_request'`, so every push and manual CI run was eligible and ordinary CI held `packages: write` permission.
- **Correction:** remove all container steps and package-write permission from `ci.yml`. Keep the image job in `release.yml`, require a `v*` tag, and make it depend on the successful `github-release` job. This same-workflow dependency is deliberate: GitHub documents that most events created with `GITHUB_TOKEN` do not start another workflow, so a separate release-event workflow would be unreliable for the repository's automated release creation (<https://docs.github.com/en/enterprise-cloud@latest/actions/how-tos/write-workflows/choose-when-workflows-run/trigger-a-workflow>, checked 28 September 2026).
- **Verification:** the unintended main run was cancelled while its image build/publish step was still running, before its publication summary. Both YAML files parsed successfully; the parsed CI jobs were only `web` and `test`; the parsed release jobs included `container-publish`; the release-only regression test passed; and StemLab's full 45-test suite plus Ruff passed. After merge, confirm the main CI run still contains only web and Python test jobs. A future tagged release must show the image job starting only after `Publish StemLab GitHub Release` succeeds.
- **Limit:** the release job still publishes to GHCR and optionally Docker Hub. `workflow_dispatch` validates release artifacts but the tag guard prevents it from publishing packages or images.

### The local release smoke test lacks wheel or Twine

- **Symptom:** `python -m build --no-isolation` stops with `ERROR Unmet dependencies` and reports `wheel` as not installed, or the project environment reports `No module named twine` after a successful build.
- **Cause:** StemLab's retained analysis virtual environment contains the test/build frontend but deliberately does not include every packaging utility. PyPA documents that `--no-isolation` requires callers to preinstall every declared build dependency (<https://build.pypa.io/en/stable/how-to/troubleshooting.html>, checked 28 September 2026).
- **Correction:** use the default isolated `python -m build` in a version-specific ignored output directory. Verify the wheel and sdist filenames, distribution name, version metadata and bundled web assets locally. Treat Twine validation as unavailable locally unless a verified project-wide Twine installation exists; the release workflow installs Twine and must pass `twine check` before any publication job can start.
- **Verification:** the isolated build installed `setuptools 84.0.0` and `wheel 0.48.0`, produced the `danceflow_stemlab-1.0.1` wheel and sdist, and the follow-up archive inspection confirmed version `1.0.1` plus the bundled timeline JavaScript and CSS.
- **Limit:** direct archive inspection is not a substitute for `twine check`; do not tag the release unless the release workflow retains its Twine gate, and verify that gate before treating publication as successful.

### Repository checks try to access the network in a restricted environment

- **Symptom:** `uv run` attempts to resolve build requirements from PyPI even though a populated project environment already exists.
- **Cause:** `uv run` normally checks and synchronises the project environment before executing the command.
- **Correction:** use the existing environment with `uv run --no-sync --offline ...`; add a project-local `--cache-dir` when the user cache is not writable.
- **Verification:** the requested command starts without a network request; report any later test or sandbox failure separately from dependency resolution.
- **Limit:** `--no-sync` relies on the existing environment and is not evidence that a fresh installation can be resolved or built.

### Updated Codex integration tests require `httpx2`

- **Symptom:** Starlette raises `The starlette.testclient module requires the httpx2 package to be installed` during test collection.
- **Cause:** `httpx2` is declared in StemLab's `dev` dependency group, but a retained virtual environment predating that declaration has not been synchronised.
- **Research:** Starlette's official TestClient documentation identifies `httpx2` as the TestClient dependency; checked 30 September 2026: <https://www.starlette.io/testclient/>.
- **Correction:** install the declared dependency into the project-local environment, preferably by synchronising the dev group or with `uv pip install --python .venv/Scripts/python.exe httpx2`. Do not install it machine-wide merely for the tests.
- **Verification:** rerun the unchanged Codex and loop integration tests; collection and tests must complete.
- **Limit:** dependency presence does not establish that optional model weights or external analysis runtimes are ready.

### Windows cancellation test intercepts its own `taskkill` process

- **Symptom (30 September 2026):** `test_capacity_cancel_and_shutdown` timed out while `subprocess.run(["taskkill", ...])` appeared to wait on the test's 30-second sleeping worker.
- **Cause:** the test replaced `subprocess.Popen` on the shared standard-library module; `subprocess.run` also constructs its child through that symbol, so the mock intercepted the production `taskkill` fallback.
- **Research:** Python's subprocess documentation confirms that `run()` is the high-level child-process API and that Windows `kill()` aliases `terminate()`; checked 30 September 2026: <https://docs.python.org/3/library/subprocess.html>.
- **Correction:** import the worker-launch `Popen` symbol directly into `stemlab.codex.jobs` and patch that narrow symbol in the test. Leave `subprocess.run` real so the Windows process-tree termination path is exercised.
- **Verification:** all six Codex job tests and the complete 145-test suite passed on Windows.
- **Limit:** this verifies the Windows test and actual `taskkill` fallback. Linux uses its separate process-group signal path in CI.

### Release tests retain pre-loop dependency and text-decoding assumptions

- **Symptom (30 September 2026):** the full suite expected the old public timeline package specifier and decoded the UTF-8 README using Windows' default code page.
- **Cause:** the loop patch deliberately pinned a reviewed `react-timeline-sequence` commit, while two new assertions still described the earlier npm-only dependency and platform-default text decoding.
- **Correction:** assert the exact reviewed commit and lockfile integrity, and specify UTF-8 for public-description checks. Keep documentation explicit that the source pin remains until the same loop API is published and verified on npm.
- **Verification:** clean `npm ci`, the production Vite build, Ruff and the complete Python suite passed; the bundled frontend rebuilt successfully.
- **Limit:** a future return to an npm release must update the manifest, lockfile, documentation and assertion together, then repeat the clean build.

### Windows MCP protocol assertion compares an escaped JSON envelope

- **Symptom (30 September 2026):** the Windows Codex-plugin matrix failed because the literal workspace path was not a substring of `json.dumps(response)`, while the same test passed on POSIX.
- **Cause:** Windows backslashes are escaped again when the outer MCP response is serialised for comparison. The assertion inspected transport encoding rather than the returned capability value.
- **Correction:** select the MCP text content block, parse its JSON payload, convert the returned workspace to `Path`, and compare it with the resolved expected path.
- **Verification:** require both read-only and writable stdio protocol variants to pass on Windows and Linux before release.
- **Limit:** this corrects a cross-platform assertion; it does not relax workspace confinement or path validation.
