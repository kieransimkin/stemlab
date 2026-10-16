# BPM-synchronised recordings, visualizer and batch generation

`record-rudiment` exports independently routed audio dimensions and an interactive
DanceRudiments comparison harness. `generate-batch` explores a bounded variety of
filtered/unfiltered master/stem combinations. Neither command performs separation,
downloads neural models, copies the movement catalogue or changes source audio.

## Install both companion updates

The format, native sampler and visualizer belong to **DanceRudiments**. StemLab
owns audio extraction and candidate generation, and uses the optional package.
The published `dancerudiments 0.2.4` predates this API; apply/build the companion
DanceRudiments patch first, then the StemLab patch:

```sh
python -m pip install /path/to/updated/DanceRudiments
python -m pip install -e /path/to/updated/stemlab
stemlab record-rudiment --help
stemlab generate-batch --help
```

Building the native extension from source requires a C++17 compiler. The generic
recording WASM accessor is already packaged and verified by checksum: end users
**do not need Emscripten or clang to generate a comparison page**. A source-only
`PYTHONPATH=/path/to/DanceRudiments/python` also enables offline authoring/export;
native Python playback additionally requires the updated compiled extension.
Existing optional `[rudiments]` matching stays unchanged. A missing/old recording
API fails clearly rather than activating a private StemLab fallback.

## BPM and beat phase

Raw audio **requires `--bpm NUMBER`**. It is marked `estimated` unless the caller
also supplies `--bpm-confirmed`. Saved analyses may reuse a successful beat
model's `tempo_bpm`, or derive a median estimate from its timed beats. Automatic
selection prefers consensus, then All-In-One, then the model with most timed
beats. `--beat-model MODEL` selects a particular saved detector. Stale beat JSON
not listed by the current `analysis.json` cannot supply a tempo. Without usable
BPM evidence, the command fails; it never quietly assumes 120 BPM.

`--beat-zero SECONDS` supplies the source time of musical beat zero. Otherwise,
a saved beat sequence can supply an **estimated** phase; origin zero with no
phase evidence remains **unverified**. Confirming BPM does not confirm phase.
Negative initial pip indices retain material before a later first beat.

One beat is a quarter note. Fixed musical resolution is **64 pips per beat**;
the rate in seconds is `64 * BPM / 60` (128 Hz at 120 BPM). Exact rational absolute
sample boundaries prevent accumulated rounded-hop drift. This is a constant-BPM
recording, not a variable-tempo map: changing tempo/phase requires re-export.

## Fourier frequency bands to N dimensions

```sh
# A master OR a standalone stem file; no separation/model inference runs.
stemlab record-rudiment master.wav --bpm 145 --frequency-bands 32 \
  --fft-size 2048 --normalize global --output ./frequency-32
# Saved analysis: retain its BPM evidence and select one existing source.
stemlab record-rudiment ./analysis --frequency-bands 32 \
  --frequency-source htdemucs_6s/drums --normalize global --output ./drum-frequency-32
# Finer low-frequency resolution and musical logarithmic spacing.
stemlab record-rudiment bass.wav --bpm 145 --frequency-bands 32 \
  --frequency-min 20 --frequency-max 4000 --frequency-scale log \
  --fft-size 16384 --normalize global --output ./log-frequency-32
```

**N buckets produce exactly N dimensions**, named `band_000`, `band_001`, etc.,
in ascending-frequency order. This option is on `record-rudiment`; existing
time-domain single/batch/stem-pair extraction is unchanged. `--frequency-source`
defaults to `master`; it also accepts an unambiguous saved stem or an audio path
under the existing source-resolution rules. Raw stem files work directly as the
positional input. No new separation, weights, inference or resampling is needed.

| Option | Meaning |
| --- | --- |
| `--frequency-bands N` | 1..1024 output dimensions, subject to native recording/cache limits and available FFT bins. |
| `--fft-size N` | Power of two, 16..65536 source frames; default 2048. Frequency resolution is sample rate / N Hz. |
| `--frequency-min HZ` | Lower edge, default 0 Hz (DC). |
| `--frequency-max HZ` | Upper edge, default the selected source's Nyquist frequency. |
| `--frequency-scale linear\|log` | Equal-width Hz buckets by default; log requires a positive minimum. |
| `--frequency-source SOURCE` | One existing master, saved stem or audio path; default master. |
| `--gain band_000=-1` | Existing signed bipolar gain, repeated for specific band dimensions. |

The exact 64-pip clock is unchanged. Each pip measures one periodic-Hann-windowed
real FFT centered at `floor((pip start frame + pip end frame)/2)` in native source
frames. One-sided power counts DC/Nyquist once and other bins twice. Per-band RMS
is `sqrt(sum(bin power)/(FFT size * sum(Hann**2)))`, averaging **channel powers**
before RMS. Antiphase stereo does not cancel. For a sustained sine away from
boundaries, its complete band measures peak amplitude / sqrt(2). A full-band DC
or Nyquist component retains its amplitude. These values pass through the same
`EnvelopeBank.compose` bipolar projection as every other recording.

Band edges are left-closed/right-open; the last band includes its upper edge,
including Nyquist when selected. FFT bins are assigned by their center frequency,
once only. This is a windowed spectral measurement: finite frequency resolution
and leakage remain, and a longer window trades timing precision for frequency
precision. It does not reconstruct isolated band WAVs or identify instruments.
The centered window uses earlier/later samples inside the selected excerpt;
samples outside the excerpt/source are zero, never wrapped or borrowed. Edge
windows therefore have reduced measured energy. Empty padded pips remain zero.

`--normalize global` preserves inter-band strength and makes one shared peak
reference. `none` retains PCM-unity RMS as its reference; `per-axis` independently
expands each band and may amplify leakage/noise. All three still produce bipolar
[-1,+1] values; fully silent axes remain 0. Inspect unscaled peaks and actual
source hashes. Time-domain `--axis`, filter, mode and smoothing options cannot be
combined with `--frequency-bands`; conflicting options fail rather than being
silently ignored. Legacy XYZ export remains limited to at most three dimensions.

All bands share one cached Fourier pass. Each axis records exact frequency edges,
selected FFT bin bounds, window/calibration, source identity/rate/channels,
normalization and boundary/clock provenance. Existing new-directory transaction,
value budgets, source-change checks, native playback and shared per-dimension bars
remain authoritative. A bounded FFT frame also limits source-channel memory use.

```sh
python examples/recordings/generate_frequency_demo.py --output ./fourier-demo
python -m pytest tests/test_frequency_bands.py tests/test_rudiment_recordings.py
```

The demo synthesizes an antiphase stereo sweep and exports a 32-dimensional
recording plus the actual shared harness; it uses no private master. Tests verify
known-tone separation, calibrated RMS/Parseval power, DC/Nyquist, phase-independent
stereo, exact clock/excerpt boundaries, cache/budget gates and native N-D playback.

### Fourier resolution problems

If a selected frequency bucket contains no FFT-bin center, the command fails
before exporting a recording. Reduce the number of buckets, increase `--fft-size`
or widen the selected frequency range. For logarithmic bands near 20 Hz, the
default 2048-frame window may be too coarse; a larger window can resolve the
requested buckets, with the documented loss of temporal precision. This is a
resolution limit, not missing source audio; do not invent/interpolate a band.

## Signed waveform resampling

For a master or separated stem, `--mode waveform` exports actual **signed
PCM** as `dancerudiments.recording` float64 samples at **64 pips per beat**:
`64 * BPM / 60` samples/second (128 Hz at 120 BPM). It is not a fixed 64 Hz
rate. An explicit BPM is required for standalone audio; saved analyses can
reuse detected beat evidence. Every output retains the original beat origin,
BPM provenance, and the recording's non-looping playback semantics.

```sh
stemlab record-rudiment master.wav --bpm 145 --mode waveform \
  --axis x=master --low-pass x=35 --output ./master-waveform
stemlab record-rudiment ./analysis --mode waveform \
  --axis x=htdemucs_6s/bass --high-pass x=12 --output ./bass-waveform
# Combine modes on a shared clock, applying filter only to waveform X.
stemlab record-rudiment ./analysis --axis x=master --axis-mode x=waveform \
  --axis y=htdemucs_6s/drums --axis-mode y=peak \
  --low-pass x=30 --output ./wave-and-energy
```

For output index `i`, the signal is sampled at the **centre of native pip i**:
`beat_zero_seconds + (start_pip + i + 0.5) * 60 / (64 * BPM)`.
Positions are computed from the absolute rational BPM clock (no accumulating
rounded frame hops), then linearly interpolated. User-specified low/high-pass
Butterworth filters (or both as a band-pass) operate on original-rate audio
**before** the mandatory 12th-order anti-alias low-pass at 75% of the
movement Nyquist. `--filter-phase zero` is the zero-phase default;
`--filter-phase causal` permits phase delay. The source remains unchanged.

Channels are averaged as **signed** PCM before resampling, so antiphase
stereo can cancel; use peak/average/Fourier for channel-independent energy.
Values outside the requested excerpt/source are zero-padded, with boundary
and filter details recorded in axis provenance. `--normalize none` preserves
PCM unity, `global` uses one absolute peak across axes, and `per-axis` uses
independent absolute peaks; `--gain` multiplies signed coordinates. Waveform
zero remains 0, negative half-cycles remain negative, values clip to [-1,1].
The original envelope/Fourier modes continue to map non-silent zero *energy*
to -1 instead. Both routes share `EnvelopeBank.compose`, native JSON output,
bounded caching and the DanceRudiments HTML/WASM harness.

The destination Nyquist is far below standard audio frequencies: higher
frequencies **must** be removed to prevent aliasing. A high-pass cutoff above
that Nyquist may produce an almost silent waveform after downsampling; this
is expected. Use envelope modes to drive motion from higher-frequency music.

## Single recording: bass on X, treble on Y

```sh
stemlab record-rudiment master.wav --bpm 145 \
  --axis x=master --low-pass x=180 \
  --axis y=master --high-pass y=3000 --axis-mode y=average \
  --include-audio --output ./bass-treble
```

Open `bass-treble/index.html`. **Output is a new directory**, not a JSON filename.
It contains the harness, its audit JSON, `report.json`, and
`recordings/audio_recording.json`. Add `--no-harness` for data only. Add `--legacy`
for an additional unchanged XYZ compiled pack (1..3 axes, at most 65,535 pips).
Existing output directories are refused; generation is staged and only published
when successful. Source files and earlier exports are not overwritten.

`--include-audio` explicitly copies the unmodified master into the output directory.
Without it no original audio is copied; select the matching local track in the
harness, or inspect the silent animation. Do not publish copied music unless you
have permission. The HTML itself contains the movement data and all visualizer
assets, requires no CDN and makes no external requests. With copied audio, keep
the entire output directory together.

## Independently route any number of dimensions

```sh
stemlab record-rudiment ./analysis --bpm 145 --bpm-confirmed \
  --axis x=master --low-pass x=180 \
  --axis y=master --high-pass y=3000 \
  --axis z=bs_roformer_sw/drums \
  --axis rotation=bs_roformer_sw/bass --axis-mode rotation=average \
  --axis vocal_energy=bs_roformer_sw/vocals \
  --axis overall=master --axis-mode overall=average \
  --gain rotation=-1 --output ./six-dimensions
```

`--axis NAME=SOURCE` is repeatable and determines dimension order. A source may be
`master`, a unique stem name, `MODEL/STEM`, or an audio file path. Relative paths
are relative to the analysis directory or the input audio's parent. Quote paths
with spaces. Ambiguous stem aliases are errors; the exporter does not silently
choose one separator. Without `--axis`, a file produces a master dimension and
an analysis produces master plus every successful saved model's stems.

There is no XYZ dimension ceiling. The format bounds resource use to 8,388,608
scalar values and 64 MiB per recording JSON. The native N-D recording sampler is
non-looping and supports more than the legacy 65,535-pip loop period. All axes
remain in the data; the visualizer lets you choose which ones to project onto X,
Y and Z. Axis projection does not discard the other dimensions.

Files must already share a time origin. Different native sample rates work
without resampling. Unequal durations fail by default, apart from one-frame
rounding tolerance; explicitly choose `--length-policy pad` or `trim` otherwise.
`--start SECONDS --end SECONDS` restrict the exported excerpt on the original clock.
The command does not infer or repair offsets between independently edited files.

## Window and filter semantics

`--mode peak` takes the **maximum absolute amplitude** across observed samples and
channels within each half-open pip window. `--mode average` takes their **mean
absolute amplitude**. `--axis-mode NAME=peak|average` overrides one axis. These are
amplitude envelopes, not pitch/frequency estimates, signed waveform averaging,
RMS or transient-onset picking. Rectification happens per channel before channel
reduction, so antiphase stereo cannot cancel to silence.

`--low-pass NAME=Hz` and `--high-pass NAME=Hz` act on native-rate audio **before**
rectification/aggregation. Supplying both makes a band-pass, with high-pass cutoff
strictly below low-pass cutoff. Every cutoff must be positive and below that
source's Nyquist frequency. Example bass/treble frequencies are choices, not
universal musical boundaries. `--filter-order` is 1..12, default 4.

Default `--filter-phase zero` is forward/backward Butterworth SOS filtering.
Odd padding/initial states match SciPy `sosfiltfilt`; the magnitude response is
squared by the forward/backward pass. This avoids causal phase delay but does
not eliminate filter ringing or edge effects. Very short inputs use the largest
valid padding. `--filter-phase causal` deliberately permits causal phase delay.

Zero-phase processing uses a temporary disk-backed float64 spool, approximately
`frames * channels * 8` bytes for the active filtered source, then deletes it.
Unfiltered/causal audio streams without that spool. Filter state never resets
at block/pip boundaries. Partial boundary windows average observed samples only;
wholly missing windows are zero. Coverage counts remain in provenance.

Every exported DanceRudiments dimension is written on a mandatory **bipolar
-1 to +1 movement scale**. `--normalize` chooses the amplitude reference before
that projection: `none` uses PCM unity, `global` uses one shared peak across axes,
and `per-axis` uses each axis peak independently. For a non-silent axis, zero
amplitude maps to -1 and the selected reference maps to +1. Signed
`--gain NAME=NUMBER` is applied after this mapping, so a negative gain reverses
the axis; out-of-range gain results are clipped and counted. A completely silent
axis stays centered at 0 instead of inventing a direction. Values are float64,
clipped to [-1,+1] and rounded to twelve decimals before every JSON/legacy/harness
export.

## Generate a varied batch and comparison page

```sh
# Master plus every saved stem; no separation rerun.
stemlab generate-batch ./analysis --bpm 145 \
  --dimensions 2 --dimensions 3 --dimensions 6 \
  --max-candidates 96 --seed 17 --include-audio --output ./movement-batch

# A master and separate user-supplied stem files.
stemlab generate-batch master.wav --bpm 145 \
  --source bass=bass.wav --source drums=drums.wav --source vocals=vocals.wav \
  --output ./movement-batch-files
```

Open `movement-batch/index.html`. Default target size is
**`min(1024, max(48, 3 * source_count))`**; default dimension sizes are 2 and 3.
Repeat `--dimensions` for arbitrary sizes of two or more. `--max-candidates` explicitly
bounds a run. It must allow at least **two baseline candidates per source**, or
the command refuses before extraction rather than silently omitting stems.

Default source/filter routes are raw, low-pass 180/350 Hz, high-pass 1600/3000 Hz,
and band-pass 180..3000 Hz, each with **peak and average** windows. Presets that
cannot exist below a particular source's Nyquist limit are skipped and reported;
invalid user cutoff values are errors. Repeat batch `--low-pass HZ` and
`--high-pass HZ` to replace defaults; raw remains included. Note that single
export uses `NAME=Hz`, while batch presets use plain numeric Hz values.

Every source receives bass/treble and raw/filtered baselines, followed by seeded
mixed-source, mixed-filter, mode and orientation variations. The same source/
filter pass yields both peak and mean, and is cached for reuse. Baseline duplicates
or flat data remain explicitly labelled to preserve coverage; additional numerical
duplicates/static candidates are skipped. This is a bounded exploration, **not an
exhaustive Cartesian product** or a ranking that claims aesthetic quality.

Batch normalisation defaults to **per-axis**, useful for seeing quieter routes.
It can also amplify tiny out-of-band residuals/background noise. Inspect the
recorded unscaled peaks, or select `--normalize none` / `global` to preserve level
relationships. Filter settings, source identities/rates/hashes, gains, window
modes, baseline status and normalisation remain inspectable in each JSON/report.

The batch budget is 32 million scalar values, with at most 1024 candidates and a
bounded attempt count. The harness deduplicates identical float64 columns and
caps unique binary data at 128 MiB. `report.json` records actual candidate count,
coverage, extraction passes, skipped filters and the limiting reason. Use a
shorter excerpt or a smaller batch for a large 53-stem/long-song job.

## The existing DanceRudiments visualizer, not a lookalike

Both the catalogue/release pages and recording pages use the **same packaged
HTML, CSS, beat-player and application assets** in DanceRudiments. StemLab calls
`dancerudiments_authoring.harness.build_recording_harness`; it does not embed a
second renderer or a movement implementation.

Recording mode retains the existing searchable cards, four-card comparison,
Keep/Maybe/Skip review controls, notes and review JSON import/download. Its shared
transport supports play/pause, restart, seeking and pip stepping. Nothing autoplays;
hiding the tab pauses playback. With music loaded, motion follows the audio
clock. Export BPM and beat origin are locked to prevent relabelling a different
tempo as the original extraction. Recordings stop at the end instead of wrapping.

The packaged native WASM accessor uses the same C++ `recording_component` as the
native N-D class. JavaScript selects stored column/axis descriptors, not a parallel
movement generator. X/Y/Z selectors expose every dimension; full recordings can
be downloaded independently. Background paths/waves may be display-decimated to
2048 points, but playback/full JSON retain every pip. A non-looping path is not
visually closed across its seam.

Review choices may use browser local storage where available; export review JSON
for a portable record. Browsers may restrict local storage or local-file media:
use an allowed local static server when necessary, without disabling security
policies. Source-file identity checks need Web Crypto support. The sample-data
HTML works offline; actual codec playback remains browser-dependent.

Legacy XYZ catalogue/bindings are unchanged. The new arbitrary-dimensional API
is available in native C++/Python and this recording harness; this change does not
claim new general-purpose N-D C# or TypeScript wrappers.

## Reproducible demo and validation

```sh
python examples/recordings/generate_demo.py --output ./recording-demo
python -m pytest tests/test_rudiment_recordings.py tests/test_rudiment_matches.py
```

The demo creates explicitly **synthetic** bass/treble/drum/lead audio and produces
an exact 2-D bass/treble page, a 6-D page, and 48 2/3/6-D batch candidates. It does
not infer stems or BPM from Arcadians. The supplied screenshot is a real Chromium
capture of those generated candidates, using the actual native/WASM visualizer.

![Real DanceRudiments comparison of generated synthetic-audio candidates](screenshots/recording-comparison.png)

Local browser QA used the project's explicit in-memory mode because local-file
navigation was blocked. It verified native samples, audio decoding/clock,
playback, seeking, projection, review download/import and non-looping completion;
it did not establish audible listening quality or local-file loading. Normal CI
uses the actual output files and does not opt into that fallback.

The recording CI workflow installs a hash-verified binary wheel of the latest
stable DanceRudiments release from PyPI. It rejects stale release metadata and
missing native/display APIs; it never falls back to main, a development-commit
variable or a source build. A checkout of the same immutable **release** commit
supplies regression scripts and licences only. Release the companions before
StemLab; see [the coordinated PowerShell release workflow](released-viewers.md).

## Arcadians release publication

StemLab's release process now generates a full-song, 48-candidate master-only
Arcadians batch at 145 BPM, copies the original MP3 unchanged, tests audio-driven
playback, and attaches the complete site to the release. GitHub Pages deployment
is opt-in after successful tagged releases. See [Arcadians release demo and Pages
setup](arcadians-release-demo.md). Public playback needs no user-supplied file.
