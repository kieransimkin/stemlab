# Arcadians release demos and GitHub Pages

The public site now combines the movement comparison described here with a
[complete full-song analysis timeline](arcadians-timeline.md). The root links to
both; neither publisher deploys a movement-only artifact over the combined site.

Every new StemLab release builds a **48-movement Arcadians comparison** using the
same packaged DanceRudiments visualizer and C++/WebAssembly recording sampler as
`stemlab generate-batch`. The original MP3 is included beside the page and selected
automatically. Visitors press **Play**; they do not need to find or upload a song.

The release builder reads the exact bundled
`examples/arcadians/Arcadians - 320kbps.mp3`, checked against SHA-256
`5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de`.
It does not substitute synthetic audio, re-encode the source, download models or
claim that filtered master signals are separated stems. The bundled example has
no separated stems. Each release covers the **full decoded song**, not a short
smoke-test excerpt.

## Hearing and viewing the demo

After the first successful Pages-enabled release, the public entry point is:

**https://kieransimkin.github.io/stemlab/arcadians/**

The site root redirects to this gallery. Links are relative, so both the project
URL prefix and the downloaded archive work. `audio.mp3` is copied byte-for-byte
from the source and travels with the HTML, recording JSON files and notices.

The shared **Play/Pause**, **Restart** and seek controls use the audio element's
playback time as their clock. Seeking in the native audio controls also moves the
visualizations. Native audio controls expose volume and mute. There is no autoplay,
second MIDI accompaniment or independent animation timer running out of sync with
the song. Up to four movements can be compared; larger recordings allow any
stored dimensions to be chosen for the X/Y/Z projection. Review/export controls
remain those of DanceRudiments.

The clock is **145 BPM, artist-confirmed**, with **64 pips per quarter note** and
**float64 values** using the companion's twelve-decimal recording convention.
Beat-zero phase is explicitly **unverified** with origin zero: confirmed tempo
and the artist's lyric timings do not establish the first beat/downbeat.
The recording is non-looping and stops at the end of the captured audio.

## Batch recipe

The release recipe is fixed for reproducibility: 48 candidates, seed 17,
dimensions 2, 3 and 6, peak/mean-absolute-amplitude routes, zero-phase filters and
per-axis normalization. The generator's default presets cover unfiltered audio,
180/350 Hz low-pass, 1600/3000 Hz high-pass and 180–3000 Hz band-pass routes,
including different axis orientations. Per-axis normalization makes the motions
visible but does not preserve relative bass/treble levels.

Individual JSON files retain full-dimensional samples, source hashes, filters and
normalization details. The page deduplicates shared columns. All generated
movements must be dynamic and all 48 must be present or the build fails.
This is an audio-amplitude movement demonstration, not full-body choreography or
an assessment of artistic dance quality.

## Release workflow

`.github/workflows/release.yml` calls `arcadians-demo.yml` before building release
packages. That reusable workflow first completes and browser-tests the
`arcadians-core-v2` CPU analysis timeline. See [the exact recipe and cost/scope
notes](arcadians-timeline.md). Its subsequent movement job:

1. Checks out the release's StemLab code and the exact companion commit stored in
   `.github/dancerudiments-recording-ref`.
2. Builds the real native companion, checks its recording APIs, runs regression
   tests, verifies the source MP3, and generates the full-song batch with audio.
3. Runs the companion's native recording/harness regression tests. The browser
   check serves the actual shared visualizer under `/stemlab/`, verifies all 48
   candidates' full-dimensional native sample vectors at three positions,
   projections and review export/import, then checks MP3 decoding, non-silent
   source data, synchronized play/pause, restart, seeking in both directions and
   non-looping completion. End-of-track checks wait for the real media event
   rather than assuming it must arrive within a fixed 180 ms delay.
4. Verifies the timeline snapshot and its separate HTTP browser QA, binds it to
   the same source revision, and assembles all four viewers plus a landing page.
   Packages only the combined verified site. The normal release archive/manifest assembly
   includes the new assets before GitHub publication.

The release build depends on successful demo generation and browser checks even
when Pages is disabled. A missing MP3, bad checksum, missing companion API, static
candidate or failed browser check is an error, not a skipped demonstration.

The companion pin defaults to `fa3395534dab0feaa8c1d861a512fc941b76bbec`, the pushed
recording/harness update. This avoids the earlier failure caused by StemLab CI
checking out DanceRudiments before that update was pushed. The ordinary recording
integration workflow now uses this pin by default too; its existing manual input
and repository variable remain available for explicit compatibility experiments.
The release demo itself always uses the checked-in pin.

The new release assets are:

- `StemLab-Arcadians-visualizer.zip`: all four viewers and their audio/data; the timeline needs static HTTP(S) hosting, not a running StemLab server.
- `StemLab-Arcadians-files.sha256`: hashes of every public file.
- `StemLab-Arcadians-build.json`: input/build provenance and archive checksum.

The existing release-wide `SHA256SUMS` includes those assets. Browser screenshots
and reports are retained in a separate workflow artifact and never mixed with
public review data. The standalone **Arcadians release demo** workflow also allows
manual combined build/test runs. Pull requests run lightweight static/publication
contract tests without the full model analysis or publishing.

## Audio-seeking regression and failure evidence

The first real-song release-demo run generated all 48 movements but failed during
HTTP audio seeking. The old QA server inherited `SimpleHTTPRequestHandler` without
byte-range handling, so it sent the entire MP3 with status 200 even for a `Range`
request. The in-memory browser check bypassed this HTTP behaviour and could not
establish that seeking worked over HTTP.

The loopback-only QA server in `scripts/arcadians_http.py` now implements single
byte ranges (206 with exact `Content-Range`/`Content-Length`), suffix/open-ended
ranges, 416 for unsatisfiable ranges, and HEAD under the same project prefix.
Cancelled media preloads may close their connection; these expected disconnects
are handled without hiding unrelated server errors. Requests outside the supplied
site and directory listings are not served. This helper is not a production server.

Before launching Chromium, the gate verifies HEAD and three partial MP3 responses
against the source bytes. It then waits for seekable media and completed seeks,
retaining the existing 40 ms paused-seek and audio/movement clock tolerances. It
does not replace HTTP media with a Blob or waive playback checks in release CI.

Browser exceptions, including Playwright timeouts, now write `status: failed`,
the failing stage and target, audio `currentTime`, `readyState`, `networkState`,
`seekable` and `buffered` ranges, and page errors before closing the browser. The
requested screenshot is attempted on failure too. These files remain in the
`stemlab-arcadians-browser-qa` artifact, not the public site. Failures still stop
packaging and deployment. Progress is unbuffered in the demo workflow.

Run the lightweight transport/diagnostic regression tests without installing the
optional native companion or Chromium:

```sh
python -m pytest tests/test_arcadians_http.py
```

After applying a correction, start **a new** Arcadians release demo run from the
updated `main`. Re-running an old run retries its original commit, not the fix.
A successful standalone run produces preview artifacts; tagged-release Pages
publication remains separate as described below.

## Publish an already-tested demo now

The **Arcadians release demo** workflow builds and tests artifacts. It does not
itself deploy a public site. A successful run can therefore coexist with a Pages
404 until a deployment is made.

Use the separate **Publish Arcadians demo to Pages** workflow to publish those
artifacts without changing a version, tagging a release, or running extraction
again. Select `main`, then enter `demo_run_id` or leave it blank for the latest
successful combined manual demo on `main`:

```sh
gh workflow run arcadians-pages.yml --repo kieransimkin/stemlab --ref main
```

First select **Settings → Pages → Build and deployment → Source → GitHub Actions**.
In **Settings → Environments → github-pages**, ensure deployment rules permit
`main`, preserving any reviewers and other protection rules. Do not create a
blank Jekyll/static template or publish the source checkout. The new publisher
uploads only the verified `public-site` directory.

A manual publisher run is an explicit publication request and does not require the
`STEMLAB_PAGES_ENABLED` variable. Setting the repository variable to `true` opts
into automatic publication after future successful manual Arcadians demo runs.
Already-finished runs do not emit a new completion event merely because this
workflow was added: use **Run workflow** once to publish the existing result.

Old movement-only runs, including the historical `38514594498` example, are now
rejected: they lack the timeline and its matching HTTP QA. Build a new combined
demo from the updated `main` first.

Both publisher paths use the `stemlab-pages` concurrency group. Tagged releases
retain their original dependency ordering and opt-in, described below. An explicit
run ID deliberately allows publishing that selected older successful demo; omit
it when the latest successful preview is intended.

The new publisher checks the source workflow, same-repository `main` provenance,
artifact IDs/expiry, the combined public-file allowlist, all viewers' HTML and
original MP3 checksums, and both saved successful real-HTTP browser reports. It does not run code
from artifacts and never accepts pull-request/fork results. Browser QA downloads
stay outside the Pages upload. This workflow uses trusted default-branch code for
verification even when processing a `workflow_run` event.

After `deploy-pages` succeeds, the final step retries the **actual public URL**
until the landing/comparison HTML and timeline HTML/JavaScript/CSS/data match
the tested artifact, the public source
commit matches, and a 32-byte MP3 request returns the correct 206/range/body.
A missing or stale page, 404, or broken audio transport fails publication
verification instead of being reported as a working live demo. This final step is
an HTTP availability/integrity check, not a new browser or subjective listening test.

The one-time Pages enablement cannot be performed with the default `GITHUB_TOKEN`.
The workflow therefore reports an actionable setup error; it does not ask for a
new personal access token or alter environment approvals.

Local regression tests (no token, Chromium or native companion required):

```sh
python -m pytest tests/test_arcadians_pages_publish.py tests/test_arcadians_http.py \
  tests/test_codex_release.py
```

## One-time Pages setup

In `kieransimkin/stemlab`, set **Settings → Pages → Build and deployment → Source**
to **GitHub Actions**. Add the Actions repository variable
**`STEMLAB_PAGES_ENABLED` = `true`**. This mirrors DanceRudiments' opt-in deployment.

The `github-pages` environment must allow your release tags (for example, selected
**Tag** rule `v*`). A policy allowing only `main` can block a tag-triggered deployment.
Keep any required approval/reviewer protections. No workflow changes environment
protection rules or broadens repository permissions automatically.

After these changes, publish a fresh version using StemLab's normal version/tag
process. Do not reuse or move an old release tag. The release publishing path deploys only a successful tagged release
in `kieransimkin/stemlab`; the separate manual/automatic demo publisher described
above can publish a successful combined preview without a package release. Pull
requests do not publish. Pages runs after the GitHub Release is created. A Pages failure leaves
the tested downloadable release assets available, but does not mean deployment
succeeded. Re-running an older release can replace the site with that release's
demo: each release keeps its own ZIP regardless of what is currently hosted.

The deploy job gets `pages: write` and `id-token: write` and uses the protected
`github-pages` environment. It uploads **only the dedicated generated site**,
never the repository, caches, source manifests, credentials or private media.
It rejects unexpected files/symlinks and caps public files at 90 MiB each and the
site at 900 MiB. Audio is published only because the artist requested this demo;
the code's MIT licence does not relicense the recording.

## Reproduce the movement builder locally

These commands test the movement portion only. For a publishable combined site,
first build/test the [complete timeline](arcadians-timeline.md) and use
`scripts/assemble_arcadians_site.py` as the combined workflow does.

With the updated companion installed, run from a full StemLab Git checkout:

```sh
python scripts/build_arcadians_demo.py build \
  --output dist/arcadians-pages \
  --source-commit "$(git rev-parse HEAD)" \
  --companion-commit "$(cat .github/dancerudiments-recording-ref)" \
  --companion-license ../DanceRudiments/LICENSE \
  --release-tag local-preview
python scripts/check_arcadians_audio.py dist/arcadians-pages \
  --report dist/arcadians-audio-browser.json
python scripts/build_arcadians_demo.py verify dist/arcadians-pages
python scripts/build_arcadians_demo.py package dist/arcadians-pages \
  --output dist/arcadians-release
```

The build reads the real bundled song from the checkout. The Python source
distribution does not necessarily include that MP3; do not replace it with another
file. Outputs must be new directories and are never silently overwritten.
Tests use explicitly synthetic MP3 fixtures, never label those as Arcadians, and
do not constitute a listening review. `--in-memory` is an explicit option for
restricted local browser environments only; **release CI never uses it** and
must verify actual HTTP project-prefix loading with the bundled MP3.

References:

- [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Deployment environment protection](https://docs.github.com/en/actions/reference/workflows-and-actions/deployments-and-environments)
- [Arcadians source and timing reference](../examples/arcadians/README.md)
- [Recording extraction and batch modes](rudiment-recordings.md)

## Additional stem-pair and amplitude-mode galleries

The combined workflow now publishes `arcadians-stems/` (60 distinct-stem 2D
recordings) and `arcadians-averages/` (180 recordings in 30 fixed-input comparison
groups) alongside the original two viewers. It downloads a dedicated seven-file
source bundle from the complete-analysis job, verifies the source SHA-256,
separator roles, float format and durations, then reuses it for both generators.
Each new page gets separate HTTP/browser/audio/native tests and public URL checks.
The publisher rejects older artifacts without these new galleries and reports.

See [recording-pairs.md](recording-pairs.md) for CLI commands, centering/edge rules,
fixed normalization references, exact default windows and publication budgets.
