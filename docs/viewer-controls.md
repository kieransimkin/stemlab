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

## Install the released shared APIs

Release the updated React Timeline Sequence and DanceRudiments packages first,
then synchronize StemLab with their **latest stable official releases**:

```powershell
python scripts/configure_viewer_build.py
python scripts/check_viewer_build.py --latest
```

Use Node.js 24. No sibling checkout arguments or vendor-tarball fallback are
supported. The helper genuinely rebuilds StemLab against the published npm
package, checks its display API, and writes registry-backed release identities
and build hashes. Commit package.json/package-lock.json, pyproject.toml, both
`.github/viewer-*.json` receipts, the derived release-commit pin and rebuilt
`app.js`/`timeline.css` together. Native recording jobs install and hash-check the
published PyPI wheel, not the sibling source tree.

Use the parent-folder PowerShell coordinator to prepare the companion releases,
wait for publication, then update and release StemLab. The tagged release builds
the four combined Pages examples and requires their normal HTTP/browser checks.
See [released-viewers.md](released-viewers.md) for preview/execute/resume, version
selection, credential prerequisites and the daily latest-release update workflow.
Do not separately start a duplicate manual demo while the tagged build runs.

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
