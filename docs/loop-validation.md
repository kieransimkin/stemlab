# Loop feature validation

## Baselines

- StemLab: `0c1c918ed0e8b4355040e0bfe99c2eff64cde22c` (1.0.1).
- react-timeline-sequence: `ff693db4888427eb541f45b7a992c771393516ef` (0.1.3).

These were the coordinated development baselines used before the feature entered
StemLab 1.1.0. Generated screenshots belong to the StemLab validation fixture,
and reusable transport/UI source belongs to the React component.

## Checks executed

**36 Python tests passed**, covering the new analyzer, saved-result reuse,
manifest refresh, CLI option validation, actual FastAPI preview endpoint, registry,
canonical sections, song-map fusion and beat-consensus regressions:

```bash
python -m pytest tests/test_loops.py tests/test_loop_integration.py \
  tests/test_analysis_registry.py tests/test_song_map.py \
  tests/test_canonical.py tests/test_canonical_extended.py tests/test_beat_consensus.py
```

The analyzer tests include exact native-sample exports, metadata-only defaults,
end-exclusive duration preservation, non-4/4 bars, boundaries at zero/EOF,
continuous/right-only/antiphase vocals, missing/short/lead-only evidence, vocal
interval unions, malformed grids, tempo ramps, phase skips, worst-channel seam
checks, invalid settings and stale-source rejection.

**19 JavaScript audio-engine tests passed.** The exact TypeScript engine was
transpiled using TypeScript's compiler and executed with Node's test runner.
Web Audio is represented by a test double in these *unit tests*; browser QA below
uses Chromium's real implementation. Coverage includes native-unit conversion,
invalid and duplicate regions, native loop flags, master-relative fallback,
pause/resume/cache, cancellation and selection races, disposal, fetch errors,
duration validation, empty decodes, size bounds and credentials.

After the normal package build, reproduce them with:

```bash
node --test tests/loop-audio.node.mjs
```

**Chromium workflow checks passed with no JavaScript page errors:** no autoplay,
select/enable/play, native repeat wrap, switch while playing, paused clock,
paused seek, full-song playback restoration, and fit/zoom range readout. The
fixture produced two accepted loops and one deliberately unresolved section.
See `screenshots/workflow-validation.json` and `scripts/capture_loop_workflow.py`.

Python source compilation and syntax checks on the generated frontend JavaScript
also passed. Both Git patches were applied to clean copies of their verified
baseline files and the results compared byte-for-byte with the prepared changes.

## Build and coverage limits

Package downloads and normal browser URL navigation were unavailable in the
build environment. The full npm dependency installation, `npm run typecheck`,
Vitest suite and standard Vite production build were **not run**. The added
`tests/loops.test.tsx` tests are included for that normal CI run, not counted as
executed tests above. Ruff was not available either.

To exercise the real UI offline, the unchanged React/ReactDOM and generic lane
runtime were retained from StemLab's verified release bundle. All five changed
source modules (loop engine, transport hook, timeline component, loop adapter and
full StemLab frontend) were compiled using TypeScript and included in the updated
bundle. That bundle and its CSS were executed in Chromium; they are included so
an installed StemLab checkout can use the feature immediately. The documented
local-tarball procedure rebuilds the same source with the normal npm/Vite stack.

Browser QA loaded the real DOM/assets in memory and bridged fetch requests to the
real local FastAPI fixture. Source audio and spectrogram responses were supplied
as data URLs. No generated picture replaces a screenshot and no neural analysis
results were invented. The demo uses synthetic audio and supplied annotations,
not an artist recording. This does not constitute real-song model-accuracy,
auditory quality or full deployment/Socket.IO validation.
