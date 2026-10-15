# Shared viewer display controls

## Timeline: one audio channel, two aligned layers

The live React timeline and `export-timeline` use the same renderer. Each master
or stem has one audio lane with a left-heading **Waveform / Spectrogram / Both**
selector. **Both** is the default when both are present, with the waveform above
the spectrogram. Spectrograms use the existing time-aligned NPZ rendering
endpoint/export; decorated PNG charts are not stretched underneath a waveform.
A standalone PNG remains a separate artifact when no aligned NPZ exists.

Source identity includes the separator and stem role. Two separators' drums are
not merged with each other. Exact `analysis.json` spectrogram provenance is used
when available; master and normalized stem path conventions provide the fallback.
Late file discovery augments the existing lane instead of duplicating it.
Unavailable views are disabled; other beat, word, harmony and evidence lanes stay.

Each channel has an independent **Height** slider and reset button, bounded to
128–640 CSS pixels. Audio lanes start at 160 pixels. Display heights and view
choices survive live inventory updates but reset on another source or reload.

| Gesture over the timeline, outside form controls | Result |
| --- | --- |
| Wheel | Pan horizontally through time; do not seek the audio. |
| Ctrl/Command + wheel | Zoom time at the pointer. |
| Alt + wheel | Zoom the height of the lane under the pointer. |
| Shift + wheel | Scroll vertically between channels. |

Ctrl/Command wins if modifiers are combined. Manual pan/time zoom disables
Follow until the user enables it again. Fit, the zoom slider, scrollbars and
heading height sliders remain available. No display operation modifies audio,
analysis, confirmed BPM or movement values.

## DanceRudiments: X–Y or per-dimension bars

The **Movement view** selector belongs to DanceRudiments' packaged shared
harness. **X–Y plot** retains its trajectory and selectable X/Y/Z projection;
**Bar graph** shows a separate labelled signed bar and numerical value for
every stored dimension, not only the selected projection. All bars share the
fixed -1 to +1 sample scale; the existing visual amplitude slider scales geometry
only. Negative values extend below the zero line. Wider recordings scroll
horizontally without dropping channels.

The switch is available on catalogue, single-recording and comparison pages.
It keeps the same native C++/WebAssembly sampler and audio clock, including
while playback is running. It does not restart playback or change review choices.
X–Y is the initial default; a supported browser may remember a collection's mode.
Already-generated HTML is immutable: regenerate it to include the switch.

## Beat analysis includes BOTH source types

The pipeline first separates/normalizes the selected stems, then runs BeatNet
and BeatThis on the master **and** every explicitly labelled drum/percussion
stem. Estimates are stored independently with source provenance. Consensus
balances detector families, not the number of stems. The artist's confirmed BPM
is retained separately. See [beat-inputs.md](beat-inputs.md).

Beat Transformer continues to use its genuine multistem input once; All-In-One
structure analysis remains on the master. Arcadians' HTDemucs six-stem result has
a drums stem; that does not imply it also has a separate percussion stem.

## Apply this three-repository source update

Apply the supplied DanceRudiments patch to its checkout and the
react-timeline-sequence patch to its checkout. Commit and push those companion
changes first, keeping each working tree clean. No package release is required.
Then apply the StemLab patch and run from the StemLab checkout:

```powershell
python scripts/configure_viewer_build.py --timeline ../react-timeline-sequence --dancerudiments ../DanceRudiments
python scripts/check_viewer_build.py
```

Node.js 22, npm, Git, and Python are needed. The helper checks official remote
origins, clean source trees and display API markers, fetches the exact companion
commits, runs the timeline package's typecheck/tests/Vite build, and retains its
built package under `vendor/` with a SHA-256 record. It installs that relative
archive into StemLab and runs StemLab's genuine Vite web build and grouping tests.
It writes the actual pushed DanceRudiments SHA to the existing recording pin.
It does **not** push, commit, publish packages, create releases or deploy Pages.

Review and commit **all** resulting changes: source/tests/docs/workflows,
`package.json`, `package-lock.json`, `vendor/`,
`.github/dancerudiments-recording-ref`, `src/stemlab/web/app.js` and
`src/stemlab/web/timeline.css`. Do not commit only the source patch: the web client
requires the newly built shared package and bundle. No nonexistent npm version
or invented remote commit is used. CI `npm ci` uses the retained exact archive.

Start one fresh **Arcadians release demo** run on main after pushing StemLab.
The combined build retains the same four Pages routes and tests the new
controls before publication. An early guard rejects stale bundles/dependencies
before expensive inference. Normal GitHub HTTP/browser checks are still mandatory.

## Relative source-bundle handoff correction

The gallery CLI passes `recording-sources` as a relative path. The old verifier
compared that path to an absolute catalogue path and incorrectly reported a
hash/path mismatch. It now compares resolved paths and verifies checksums
separately, retaining containment, symlink, duration, float-stem and provenance
checks. Relative-path success and tampering rejection have regression tests.

## Sample-exact loop regression

The static-export loop test compares decoded samples, channel count, sample rate,
frame count and FLOAT/WAV encoding exactly. It no longer requires independently
written WAV files' PEAK-chunk creation timestamps to match. The audio exporter,
loop bounds and sample tolerances are unchanged.
