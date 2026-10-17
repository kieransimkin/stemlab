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

## DanceMoves fixed and variable tempo handoff

The older `stemlab.beat-alignment.v1` remains a **fixed-BPM** reading; do not
paste full beat maps into that field. DanceMoves also implements an **optional**
`stemlab.beat-timeline.v1` importer. Select the exact analysed WordPress master
attachment (matching SHA-256), enable the corrected variable-tempo map and paste
the full JSON into the separate timeline field. If disabled, the old BPM/offset
clock remains unchanged. Each audio master uses source seconds for lyrics and
cues; the irregular beat anchors change rhythmic motion only. Refer to
DanceMoves' own source/WordPress documentation and release status before
installing this feature on a site.

Stemlab's Song timing editor additionally exports standalone line-LRC,
word-TSV/JSON, and cue-LRC, with separate source-bound fixed or variable clock
metadata. WordPress pages must attach each to the matching song, using the
separate line, word and cue fields. Music/cue timestamps are not time-warped.

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

## Editable song timing: fixed/variable BPM, lyrics, words and cue sections

The Stemlab browser workspace has **Song timing** alongside **Beat correction**.
It uses the shared `react-timeline-sequence` 0.4+ timing lanes, not a second
playhead or bespoke renderer. Its three editable tracks are per-line lyric
blocks, words belonging to the selected line, and cue section boundaries.
The same original master audio, transport and zoom apply to all three.

The timing clock is either an explicit **fixed BPM + Beat 1 offset** or the
current SHA-bound **corrected variable BPM** timeline. Variable mapping integrates
the exact existing consensus/corrected sample frames, and never inserts
imaginary beats into missing spans. Switching clock mode does not move cue,
line, or word timestamps. An optional 150-ms snap tolerance (editable) applies
*only to edits that the user makes*; it is disabled by default. Timing tooltips
show whether and by how many signed milliseconds a marker misses a real or
fixed-grid beat. A changed beat map must be saved before saving timing edits
bound to that variable map.

Editable word starts/ends are constrained within the selected lyric line.
Dragging a complete line carries its words; changing a line boundary never
silently clips words. The editor includes add-at-playhead, delete, section
rename, line/word text, import, artist review status and save/reload controls.
Cue renames are restricted to `[TYPE: STANDARD SECTION]`: the supported types
are `SECTION`, `ENTRY`, `DROP`, `BREAK`. Names use the recognised INTRO, VERSE,
PRE-CHORUS, CHORUS, BUILD, DROP, FINAL DROP, BREAKDOWN, OUTRO, etc., with
optional numbering. Examples:

```text
[00:00.125][SECTION: INTRO]
[00:57.460][SECTION: VERSE 1]
[01:25.000][ENTRY: VOCAL INTRO]
[01:44.010][DROP: CHORUS 1]
[02:34.440][BREAK: SPOKEN BREAKDOWN]
```

The edit document is stored separately as `timing/song-timing-edits.json`,
schema `stemlab.timing-edits.v1`: source SHA-256, sample rate/frame count,
`fixed_clock`, clock mode, revision-pinned beat map, lines/words/cues with
integer native source frames, and artist review status. **Original audio,
`canonical.json`, ASR evidence, source LRC and beat detector results remain
unchanged.** The web service supports:

- `GET/PUT /api/{sha256}/song-timing` (optimistic revision guard),
- `POST /api/{sha256}/song-timing/import` (LRC lyric lines, LRC/TSV/JSON words,
  canonical cue-section LRC; importing lines with existing words is refused),
- `POST /api/{sha256}/song-timing/preview` (strict validation and export without saving).

**Export DanceMoves timing bundle** provides a JSON source identity and fixed
or full variable BPM map alongside line-LRC, per-word TSV and JSON, and cue-LRC
content. For DanceMoves' separate full beat-map field, use the original Beat
correction editor's `stemlab.beat-timeline.v1` export (or the bundle's nested
`clock.beat_timeline`), not the enclosing song-timing bundle JSON. Word timings are kept in original source seconds; LRC/TSV representations
round to compatible decimal positions while the JSON retains exact native
frames. Uploaded word and cue files are independently validated by DanceMoves;
pasting a full variable timeline into the old fixed beat-alignment field is
not supported. Users must assign each file to the matching verified song.

For a fresh checkout, **release `react-timeline-sequence` v0.4+ first**. Stemlab
only consumes the latest *published* stable shared component, never an untagged
source copy. After publication run `python scripts/configure_viewer_build.py`
(which updates official viewer receipts and compiled assets), then run:

```bash
python -m pytest tests/test_timing_edits.py tests/test_beat_map.py
node --test tests/web/timing-workflow.test.mjs tests/web/beat-map.test.mjs
python scripts/check_viewer_build.py --latest
npm ci && npm run build:web
python scripts/check_viewer_build.py
```

Commit the released npm/lock/version receipt, generated `src/stemlab/web/app.js`
and `timeline.css`, source, docs and tests together; never commit patch payloads,
model weights or local development dependency overrides.
