# Stem pairs and amplitude-mode comparisons

These commands reuse StemLab separation/DSP and the optional DanceRudiments
recording schema, native engine and shared visualizer. No second movement engine
or separator is introduced. The companion revision remains the existing pinned
recording-enabled commit; no further DanceRudiments patch is needed.

## Separate once, pair different stems

```bash
stemlab generate-stem-batch song.wav --bpm 145 --bpm-confirmed \
  --model htdemucs_6s --device cpu --analysis-output ./song-stems \
  --max-candidates 120 --include-audio --output ./stem-pairs
```

A raw song is separated once with the selected existing backend. The lightweight
preparation runs separation only, not Whisper, semantic analysis or beat models.
The initial model download still requires that backend's normal dependencies.
BPM, output directory and companion support are checked before preparation. Raw
audio requires `--bpm`; saved analysis can supply a measured estimate. An explicit
value is marked confirmed only when `--bpm-confirmed` is also supplied.

To reuse existing stems, supply the saved analysis directory instead of the song:

```bash
stemlab generate-stem-batch ./song-stems --bpm 145 \
  --max-candidates 120 --include-audio --output ./stem-pairs-reused
```

Each recording has exactly two dimensions: X and Y use **different stem roles**,
never the master disguised as a second stem or two byte-identical sources. All
ordered raw pairs are offered first, including axis swaps, then filtered variants
are spread round-robin across pairs. A six-stem source has 30 ordered raw pairs.
Default generation targets 120 recordings, bounded by available routes and the
32-million-value batch budget. Seed 17 makes filtered selection reproducible.

Without `--analysis-output`, temporary stems are removed after successful export
or failure. With it, the analysis is retained separately; neither an existing
output nor a nested public/analysis directory is overwritten.

## Peak, average and moving average are different modes

`peak` selects the largest absolute sample across audio channels within each
recording pip. `average` is the mean absolute sample across the observed frames
and channels **inside that one pip**. `moving-average` smooths the resulting
per-pip mean-absolute envelope across a separate, configurable window. It never
averages signed waveform samples, which could cancel, or smooths both directions
together. Low/high-pass filtering always happens first.

```bash
stemlab record-rudiment ./song-stems --bpm 145 \
  --axis x=drums --axis y=bass --mode moving-average \
  --moving-average-beats .25 --axis-window-beats y=.5 \
  --low-pass y=350 --include-audio --output ./smooth-pair
```

The window is measured in musical beats and rounded half-up to the nearest
recording pip, with a one-pip minimum. It must be positive and at most 64 beats;
the default is 1/4 beat. At 64 pips/beat, 1/8, 1/4, 1/2 and 1 beat correspond to
8, 16, 32 and 64 pips. The report stores requested/effective widths and seconds.
Use `--axis-mode` and `--axis-window-beats` for independent axis settings.
`generate-batch` and `generate-stem-batch` also accept the new mode.

Smoothing is **centered and offline**, without a causal half-window delay. Even
widths use half-weight outer bins to retain symmetry. At the file or selected
excerpt edges, only available bins contribute; there is no wrap or artificial
zero-padding fade. A one-pip window is identical to `average`. The sampling clock
stays 64 pips/beat and the schema retains float64 values rounded to 12 decimals.
Larger smoothing windows reduce transients; they do not change recording duration,
BPM, source time, or turn the constant-BPM clock into a variable-tempo map.

## Controlled comparison batch

```bash
stemlab generate-average-comparison ./song-stems --bpm 145 \
  --max-pairs 32 --window-beats .125 --window-beats .25 \
  --window-beats .5 --window-beats 1 \
  --include-audio --output ./mode-comparisons
```

Each pair produces a **complete group**: peak, average, then every requested
moving-average window. The defaults are four smoothing windows (1/8, 1/4, 1/2,
1 beat), so 32 pairs produce up to 192 recordings. The source pair, axis order,
filter cutoffs, gains and normalization reference remain fixed within each group.
Every mode uses the unsmoothed peak's amplitude reference, so quieter/smoother
motion is not independently boosted to disguise the smoothing. The final movement
coordinates are always bipolar [-1,+1]: `--normalize global` shares one reference
between X/Y, `per-axis` is the default, and `none` uses PCM unity as the reference.
Because the same affine bipolar mapping is reused across each comparison family,
peak/average/moving-average differences remain directly comparable.

Master/stem, stem/stem and two differently filtered routes of the same source
are included. Raw pairs are followed by each source's bass/treble pair and then
seeded filtered combinations. Use `--master-only` for master routes without
separation, or `--stems-only` to exclude the master from a saved analysis. A raw
song is separated by default unless `--master-only` is used.

```bash
stemlab generate-average-comparison song.wav --bpm 145 --master-only \
  --low-pass 180 --high-pass 3000 --max-pairs 6 --include-audio \
  --output ./master-filter-comparisons
```

There are at most 1,024 candidates per batch and 16 distinct smoothing windows;
windows that quantize to the same pip width are rejected. Budgets count whole
groups, never drop individual modes. Numerically identical or static variants
are kept and marked, rather than biasing comparisons by removing only weak modes.
The JSON report identifies every route, setting, duplicate, skipped filter,
extraction/cache count and reason generation stopped.

Open `index.html` in each output. The shared DanceRudiments visualizer supports
family/pair filtering, four-way comparison, native sampling, seeking and review
notes. Select a pair's family to compare its settings. The original track is
copied unchanged only with `--include-audio`; press Play to start. Existing
privacy/licensing rules apply to audio and derived recordings.

## Four Arcadians Pages examples

The existing combined **Arcadians release demo** workflow publishes:

| Path under the StemLab Pages site | Output |
|---|---|
| `arcadians/` | Existing 48 master-derived movements |
| `arcadians-stems/` | 60 2D recordings: 30 ordered raw stem pairs and 30 filtered pair variants |
| `arcadians-averages/` | 30 input pairs × six settings = 180 comparison recordings |
| `timeline/arcadians/` | Complete `arcadians-core-v2` React analysis timeline |

The complete-analysis job passes the exact original MP3 and six normalized float
WAV stems to the downstream recording job in a dedicated, checksum-verified
artifact outside the public site. The pair generators reuse them; no second
separator invocation or FLAC listening derivatives drive these movements.
Both new pages include the original Arcadians MP3, artist-confirmed 145 BPM,
explicitly unverified beat-zero phase and no autoplay. The landing page links all
four examples and the original demonstrator remains available at the same URL.

Each additional gallery must pass its own HTTP/native/audio-clock browser checks;
the comparison page additionally checks pair filtering. Publication checks compare
JSON records against the actual UI's binary columns, fixed-pair settings and input
hashes. The publisher requires both new QA reports and verifies the public HTML,
provenance and partial MP3 response for each new page. An old two-viewer artifact
cannot silently pass the updated publisher. All four viewers are deployed together.

The combined site's bound is 900 MiB, with a 90 MiB individual-file limit. This
allows the additional full-song JSON while remaining below GitHub Pages' 1 GB
published-site limit. A budget breach fails publication rather than dropping
comparison settings. Raw separation handoff and model caches are not public.

After pushing, start **one fresh Arcadians release demo** on `main`, or use the
normal tagged-release workflow. The standalone timeline workflow does not deploy
all viewers. Existing Pages enablement/approval requirements are unchanged.

## Reproducible synthetic example

```bash
python examples/recordings/generate_demo.py --output ./synthetic-demo
```

This also writes `stem-pairs/` and `averages/`. Its four tracks are explicitly
synthesized input files, not inferred Arcadians stems or evidence of model quality.
Tests distinguish real numerical/native processing from fake detector calls and
schema-only completeness fixtures.
