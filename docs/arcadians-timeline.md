# Complete Arcadians timeline on GitHub Pages

The Arcadians demo workflow builds **four viewers in one public site**:

- `timeline/arcadians/`: StemLab's existing React timeline, with the full song and
  a completed `arcadians-core-v2` analysis.
- `arcadians/`: the existing 48-movement DanceRudiments comparison and original MP3.
- `arcadians-stems/`: 60 movements using different real stems for X and Y.
- `arcadians-averages/`: 180 fixed-pair peak/average/moving-average comparisons.

The root is a landing page linking to all four examples. Both the manual Pages publisher and
release publisher upload this same combined artifact. No source checkout, model
cache, backend server or separate Pages branch is published. These paths describe
what this change deploys; a code patch alone does not make the new timeline live.

## What “complete” means

The recipe covers the entire checksum-locked Arcadians MP3 (not an excerpt) using
one six-stem separation and all the core analysis families below. It is **not**
StemLab's five-separator `full` comparison profile, and does not imply every optional
experimental model has been run.

| Family | Required evidence |
| --- | --- |
| Source and stems | Original master plus HTDemucs `htdemucs_6s`: vocals, drums, bass, guitar, piano, other. Every stem must span the master duration. |
| Audio display | Master/stem waveforms and spectrograms; the VAD-derived spoken-word track where produced. |
| Beat timing | BeatNet and BeatThis on master and each percussion stem, BeatTransformer on the demixed streams, All-In-One and detector-family consensus outputs. The artist-confirmed 145 BPM remains a distinct reference, not a substitute for detection. |
| Words and structure | Whisper `small`, word timestamps, previous-text conditioning disabled; Silero VAD; All-In-One functional sections; artist-edited lyrics, timing and sections retained separately. |
| Harmony and pitch | All 13 existing curated Vamp outputs: Chordino, NNLS chroma/bass chroma/tuning, QM key/tonal-change/bar/beat, pYIN pitch/notes, Silvet notes and Segmentino. |
| Derived analysis | Loudness/dynamics/timbre/stereo, rhythm/groove, harmony, lyric rhyme/prosody, MiniLM text semantics, song map and loop discovery. |

Optional alternate separator comparisons, additional MIDI transcribers, specialist
evidence backends and non-commercial MuQ audio semantics are **not selected**.
Their absence is disclosed in the public coverage metadata rather than hidden.

“Complete” means the selected analysis ran and produced its required evidence;
it is not a guarantee that a model's transcription, chords, beat phase or musical
interpretation is correct. Embedding similarities are not probabilities. A valid
loop scan may return zero accepted loops: unresolved sections remain visible, and
no loops are invented to fill the demonstration.

## Run and publish

After merging the change, start **a new Actions → Arcadians release demo → Run
workflow → main**. This is the combined build workflow, not just the timeline-only
workflow. A new tagged release invokes that same combined build automatically.

The sequence is:

1. Lightweight export/publication contract tests run first. Pull requests get
   these tests without a multi-model analysis or any publication permissions.
2. The reusable **Arcadians complete analysis timeline** job builds the existing
   StemLab Docker environment from the exact checkout, selects CPU PyTorch wheels,
   installs the existing Sonic Annotator/Vamp stack, and runs the complete recipe.
   The original MP3 is mounted read-only because `.dockerignore` excludes music.
3. The completeness gate checks real result payloads and full source identity,
   exports the timeline, and runs Chromium against ordinary HTTP at
   `/stemlab/timeline/arcadians/`. The test requires all expected lanes, loaded
   images, working original audio, play/pause, display/audio clock agreement,
   forward/backward seeking, Fit/Zoom and accepted-loop playback when available.
   It rejects backend, Socket.IO and external CDN requests.
4. The movement build generates/tests the existing 48 full-song movements, then
   reuses the exact float stems for the 60 stem-pair and 180 mode-comparison
   recordings. It validates both new galleries separately before adding the
   verified timeline and four-example landing page. The source revisions,
   the original MP3 hash and timeline snapshot checksum must agree.
5. The existing publisher deploys the combined site and verifies public HTML,
   timeline JavaScript/CSS/data and partial MP3 responses after deployment.

Keep **Pages → Source → GitHub Actions**, `STEMLAB_PAGES_ENABLED=true` for automatic
publication, and the existing `github-pages` environment rules for `main`/release
tags. No new secret is introduced and approval rules are not changed.

Explicit manual publication still uses **Publish Arcadians demo to Pages**, with
the new successful combined run ID, or blank for the latest successful run. Old
movement-only runs are now rejected: deploying one would erase the timeline.
No version bump or package release is necessary for manual demo publication.

The independent **Arcadians complete analysis timeline** workflow is build-only,
useful for debugging the analysis; it does not publish a partial site by itself.

## Runtime and artifacts

This is deliberately a real CPU analysis job, not the previous lightweight
master-peak extraction. It downloads the selected upstream model weights and may
be substantially slower than the movement demo. Its timeout is 330 minutes; this
is a limit, not a measured runtime estimate. Upstream availability, installation
and inference must succeed. There is no synthetic fallback or “skip missing
models” publication path. No neural inference runs in a visitor's browser.

The combined workflow publishes these artifacts:

- `stemlab-arcadians-pages`: the only public upload tree, containing all four viewers.
- `stemlab-arcadians-browser-qa`: separate movement and timeline browser reports.
- `stemlab-arcadians-release-assets`: the combined `StemLab-Arcadians-visualizer.zip`,
  file checksums and build provenance, also attached to tagged releases.
- `stemlab-arcadians-complete-analysis`: original analysis outputs, including the
  original float stem WAVs, retained as an Actions artifact for seven days. This is
  not the public Pages directory and does not include downloaded model weights.

The complete timeline also has its own intermediate site and QA artifacts. Failed
analysis/browser runs retain diagnostics where available and block assembly and
publication. Existing hosted pages are not replaced by an incomplete build.

The original MP3 is copied unchanged. For a reasonably sized public site, separated
stem listening files are **24-bit PCM FLAC derivatives**, with unchanged sample
rate, channel count and duration. Converting the float WAVs to PCM24 is explicitly
recorded; it is not claimed to preserve arbitrary floating-point precision. Source
float stems remain in the original-analysis artifact. Dense spectrogram data are
exported as time-aligned PNG strips using the same helper as the live viewer.

Every public file is inventoried and hashed; source-local paths and configuration
are removed from public JSON, and private folders/logs/checkpoints are not copied.
Per-file and combined-site budgets remain 90 MiB and 900 MiB. Exceeding the budget
fails explicitly instead of truncating the song or silently dropping an analysis.

## Export any existing StemLab analysis

With StemLab and the `server` extra installed for the shared waveform/spectrogram
helpers (no server needs to be running):

```sh
stemlab export-timeline ./analysis-arcadians \
  --include-audio --output ./arcadians-timeline-site
```

The output directory must be new and outside the analysis directory. Audio/lyrics
inclusion is explicit: only share material you are authorised to publish.
Generic exports describe saved evidence and **do not** claim the Arcadians core
recipe was completed. Missing loop evidence is not rewritten as a successful
zero-loop scan.

Upload the output directory to a static HTTP(S) host. Opening via `file://` is not
the supported timeline route: browser module/fetch restrictions vary. Static
hosting is sufficient; StemLab, Socket.IO and an API server are not needed by the
viewer. Play starts only on user input.

For an already completed core analysis, the recipe builder can validate and
re-export it without running models again:

```sh
python scripts/build_arcadians_timeline.py --reuse \
  --results ./complete-core-analysis --output ./new-timeline-site \
  --source-commit "$(git rev-parse HEAD)"
```

Reuse requires the original `core-run.json` recipe stamp and all completeness
checks. The analysis commit and dependency versions are preserved independently
of the current export commit, rather than relabelling old inference as a new run.

## Browser implementation and QA scope

The export reuses the exact checked-in React/`react-timeline-sequence` bundle. A
build-time adapter relocates its legacy root-relative GET URLs into a manifest of
local files and disables inventory polling; it does not create another timeline
or audio player. The original bundle checksum and relocated URL count are recorded.
Asset/data URLs carry a content-derived revision so cached files from an older
analysis of the same song are not mixed into a new export. Unsupported bundle changes fail closed and must update the adapter/browser tests.

The browser gate checks timeline/display agreement within 100 ms. A mouse click
at full-song Fit has one CSS pixel of time resolution, so its target-position
check accounts for one pixel separately; this is not a relaxation of audio-clock
synchronization. Accepted-loop preview reuses StemLab's sample-exact extraction.

`--in-memory` is only an explicitly labelled restricted-environment browser test.
It is never used by the workflow and its reports cannot authorize publication.
Post-deployment probes validate the actual public files and seekable source, not
subjective listening quality. Test results should distinguish static rendering,
actual model inference, HTTP loading, deployment and audible listening.

## Decoder preflight and CI output ownership

TorchCodec 0.17.0 is installed from the selected PyTorch CPU/CUDA wheel index.
The image verifier decodes a generated MP3 through `torchaudio.load`; the real-song
builder checks the original MP3 with that same API before running models. The
source hash, sample rate and stereo/full-song duration are preserved. No decoder
fallback, substituted WAV, truncated song or model bypass is used.

Docker writes some atomic JSON files with mode 0600. An `always()` step restores
the runner's ownership of the dedicated Arcadians output tree before browser tests
and artifact uploads. Permissions stay private; neither `chmod 777` nor access to
unrelated runner directories is required. The full-analysis gate remains mandatory.

Use **Arcadians release demo** to build and publish all four examples. The standalone
**Arcadians complete analysis timeline** is for diagnostic builds and its own
artifacts, not a second required dispatch. Start a fresh `main` run after changing
code; retrying an older run keeps its original revision.

### Late lyric-semantic import failure

A generic `Could not import module 'PreTrainedModel'` can hide
`ModuleNotFoundError: No module named 'pkg_resources'` from resampy's lazy
filter loader. The Docker lock now keeps resampy 0.4.2 with Setuptools 81.0.0
for Basic Pitch compatibility, and the image verifier executes both real Kaiser
resamplers before importing the text-model classes in a fresh offline process.
See [the runtime check](../docker/README.md#audio-first-semantic-runtime-check).
The original MP3, required analysis stages, ownership repair and publication
gates are unchanged; partial analysis artifacts are not publishable timelines.

## Core v2 and reuse of the separated stems

The v2 recipe additionally requires separate, source-hash-attributed BeatNet and
BeatThis results for the master and the actual drum stem. The timeline preserves
the separate event lanes. Beat Transformer remains one demixed-input analysis,
and consensus counts detector families rather than raw stem pass count.

The `--recording-sources` option exports an exact-float-stem handoff **outside**
the public timeline. The combined demo workflow uses it for the separate stem
pair and smoothing comparison galleries, without rerunning separation. These
recordings are not driven by the timeline's quantized FLAC listening copies.
See [the four-page deployment](recording-pairs.md) and [beat input policy](beat-inputs.md).
