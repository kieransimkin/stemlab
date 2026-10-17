# Editable variable-tempo beat timeline and DanceMoves handoff

This feature is not a replacement for beat detectors. StemLab's existing
`beats/consensus.json` and individual detector files remain **read-only evidence**.
The browser editor proposes a separate nonuniform 64-pips-per-beat clock by
initially placing **every beat at the exact original consensus time**, rounded
once to the exact master audio's integer sample-frame boundary. There is no
smoothing or invented automatic beat inserted between detections. A beat may be
irregular on purpose; no global constant BPM is assumed or enforced.

## Browser editing

Start the StemLab web service (`stemlab serve --results ./results ...`), upload
or open an existing analysis, and select **Show editor** under *Beat correction*.
The editor becomes available after the real consensus and source audio exist.
It uses the released React timeline for shared audio, zoom, pan and playhead:

- **Corrected beats lane** — drag a beat marker horizontally on the original
  waveform/spectrogram timeline; Arrow Left/Right nudges by a single audio
  sample, Shift+Arrow nudges ~1 ms. Double-click between beats to insert a
  manual beat. Select or delete anchors, or place one at the current playhead.
- **BPM envelope lane** — each editable node controls its exact adjacent
  beat interval; vertical movement changes that local BPM and shifts later
  anchors without changing the intervals between those subsequent anchors.
  The numeric BPM field permits fine control. No audio time-stretching occurs.
- **Phase CV lane** — displays the instantaneous deviation, in native pips,
  from the opening constant tempo. Move any beat anchor to reshape local phase,
  or shift the whole beat timeline in fractional pip units.
- **Beat 1** — choose any existing anchor as beat-number zero/pip zero for the
  downstream rhythmic clock; this does **not** assert it is the first downbeat.
  The artist-reviewed checkbox explicitly distinguishes confirmation from
  detector-estimated timing.
- **Match consensus beats** — resets the observed anchors to the exact
  detector reference frames. Inserted manual anchors remain, if they still
  fit, otherwise the operation is rejected without destroying your edits.
  Undo and redo preserve a bounded history in the current browser session.

The corrected grid overlays the original/first-beat comparison without modifying
those readings. Zoom in to sample-resolvable positions for exact placement;
at full-song fit a pixel can represent tens or hundreds of milliseconds. Source
frame values are authoritative. The source programme, lyric/cue timestamps,
original detector files, and existing non-looping DanceRudiments recordings
retain their original audio timebase. Don't apply the phase correction twice.

## Single JSON value

**Export Beat 1 + full beat timeline JSON** downloads one complete JSON document.
**Copy JSON value** copies that exact document for integrations. **Import JSON**
validates the source hash and every beat against the exact selected master.
**Save corrections** writes `timing/beat-timeline.json` atomically, and uses an
optimistic revision check so a second editor cannot silently replace it.

Schema: `stemlab.beat-timeline.v1`. The document includes:

- `source_audio.sha256`, `sample_rate`, `num_frames`, `num_channels`;
- the original immutable `consensus_sha256` and corrected `beats`, each with
  integer `frame`, integer `beat`, `source` and optional `reference_frame`;
- `origin_beat`, `review_status`, and a detailed `beat_timeline` (exact audio
  frames/time in seconds and absolute native pip position);
- `tempo_segments` with exact rational and floating BPM for every adjacent
  anchor interval, preserving genuine speed changes and irregular timing;
- `sync.beat_1_start_seconds`, `sync.beat_1_source_frame`,
  `sync.beat_1_start_pips`, `sync.sync_phase_offset_pips` and
  `sync.exact_phase_offset_pips`. DanceMoves' 16-tick equivalents are exported
  as `beat_1_start_ticks` and `sync_phase_offset_ticks`.

Beat 1 always maps to native pip **zero**. Between two sample-frame anchors,
phase is exactly linear and BPM is the corresponding measured interval rate:

```text
pip(t) = 64 * (beat_i - origin_beat)
       + 64 * (beat_{i+1} - beat_i) * (t - frame_i)/(frame_{i+1} - frame_i)
```

For times before/after the anchored range, use the slope of the nearest
interval. The signed phase offset is the value of this continuous pip mapping
at **source frame 0**. `beat_1_start_pips` is its negative. These may be
fractional pips. No rounding to whole pips/ticks is applied; any integer
quantisation for specific renderers must be explicit and audited.

Example excerpt (the actual export includes all beat rows, provenance and tempo
segments):

```json
{
  "schema": "stemlab.beat-timeline.v1",
  "pips_per_beat": 64,
  "source_audio": {"sha256": "...exact master SHA-256...", "sample_rate": 48000, "num_frames": 1440000, "num_channels": 2},
  "origin_beat": 0,
  "review_status": "estimated",
  "sync": {
    "beat_1_source_frame": 6000,
    "beat_1_start_seconds": 0.125,
    "beat_1_start_pips": 16,
    "sync_phase_offset_pips": -16,
    "sync_phase_offset_ticks": -4,
    "exact_phase_offset_pips": "-16",
    "canonical_first_beat_pip": 0
  },
  "beat_timeline": [
    {"beat": 0, "source_frame": 6000, "time_seconds": 0.125, "pip": 0},
    {"beat": 1, "source_frame": 30000, "time_seconds": 0.625, "pip": 64}
  ]
}
```

The example is illustrative only, not a complete schema-valid document.

## DanceMoves integration requirement

**Important:** DanceMoves 3.3's currently deployed WordPress EPK reading expects
`stemlab.beat-alignment.v1` — a **constant-BPM phase reading** with a 16 KiB
limit, SHA-bound attachment and exact rational identity checks. It cannot
execute this variable-tempo `beat-timeline.v1` directly. Pasting this new JSON
into its existing Beat alignment field will be rejected; attempting to disguise
it as the older format would silently discard irregular beat timing.

To support the new export, DanceMoves needs a companion feature: recognise the
versioned `beat-timeline.v1` schema, validate the associated WordPress media
attachment hash, source frames, monotonicity, rational phase and the complete
input size (with a separate safe bound); preserve the full beat map after
sanitisation; and integrate the piecewise phase into its existing `sourceTick`
/ 16-tick, `rhythmicTime`, native-rudiment and playback-pulse consumers **only**
for that verified master. Clip/video offsets must be mapped to master time
first. Audio, lyric/cue and recording transport times must remain unchanged.
This requires DanceMoves tests for variable tempo, seek, loop, pause, player
switching and WordPress REST/editor approval. No automatic WordPress deployment
or writing to other repositories occurs from the StemLab export.

The existing StemLab `stemlab beat-offset` and DanceMoves v1 reading continue to
work for tracks that truly use a constant tempo.

## Developer checks

```sh
python -m pytest tests/test_beat_map.py
node --test tests/web/beat-map.test.mjs tests/web/beat-offsets.test.mjs
npm ci && npm run build:web
python -m pytest tests/test_web_frontend.py tests/test_static_timeline.py
```

Commit the **rebuilt** `src/stemlab/web/app.js` and
`src/stemlab/web/timeline.css` alongside the source, since CI checks their
exact agreement. The published shared timeline dependency is unchanged; the
editor uses its supported `type: "custom"` lane, `onWindowChange`, playhead and
transport callbacks rather than duplicating the timeline renderer.
