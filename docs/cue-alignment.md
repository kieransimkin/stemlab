# Snap timed cues to detected beats

StemLab / DanceFlow · [Kieran Simkin](https://kieransimkin.co.uk/) ·
[My Songs](https://kieransimkin.co.uk/my-songs/)

`stemlab snap-cues` adjusts **only leading LRC timestamps**. Cue text such as
`[SECTION: INTRO]`, `[ENTRY: VOCAL INTRO]`, `[DROP: CHORUS 1]` and
`[BREAK: SPOKEN BREAKDOWN]` is opaque text and is not rewritten or reclassified.
It reads an existing detector/consensus grid; it does not run models, synthesize
beats from a BPM value, change the detected grid to fit cues, quantise audio, or
alter source audio or canonical metadata.

`stemlab generate-cues` exports All-In-One functional section starts (or the
selected song-map source) as a new provisional LRC and applies the same nearby
beat policy. Model labels are retained verbatim, distant boundaries are not
forced, provenance hashes are recorded, and listening review remains required.

```bash
stemlab generate-cues analysis-master -o generated-cues --title "Song title"
```

## Reuse saved analysis

```bash
stemlab snap-cues analysis-master "musical cues.lrc"

# New destination and a ±100 ms definition of "nearby":
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-review --tolerance-ms 100

# Pick one detector, rather than the automatic preference:
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-beat-this --beat-model beat_this

# Bar starts only, using actual downbeat timestamps:
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-bars --downbeats
```

The default output directory is `RESULTS/cues/<cue-file-stem>`. Output must be a
**new directory**; use another `-o` for a repeated run. No file or older result is
overwritten. Installing the patched checkout is sufficient; there is no new
Python dependency or model download.

For a detector JSON without a complete analysis folder:

```bash
stemlab snap-cues beats/beat_this.json "musical cues.lrc" -o cue-review --sample-rate 44100
```

The JSON must contain numeric `beats` and, for `--downbeats`, `downbeats` arrays in
seconds. A tempo or a beat count is not a grid. `--sample-rate` is optional and
only supplies native sample-frame reporting; it must describe the same audio.
When analysis metadata already declares a source rate, a conflicting override
is rejected. No user cue file is distributed as a repository test fixture.

## Highlight cues without a nearby beat

The default tolerance is **150 ms in either direction**, inclusive of exactly
150 ms. It is a configurable review threshold, not a detector-confidence score.
For each cue, the tool records the closest detected event, the original gap,
the actual adjustment, the output timestamp, and any review issues.

| Outcome | Default action | Review display |
| --- | --- | --- |
| A beat is within tolerance | Snap to that timestamp | OK, unless another issue applies |
| Already exactly on a beat | Retain its timing | OK |
| Closest beat is farther away | Keep the original timestamp | REVIEW / `no_nearby_beat` and gap in ms |
| No usable detected events | Keep the original timestamp | REVIEW / `no_detected_beats` |
| Cue is outside the known audio duration | Keep its timestamp, even in forced mode | REVIEW / `outside_audio` |
| Two originally different cue times snap to the same beat | Keep both labels and occurrences | REVIEW / `shared_beat` |
| Compatibility serialization rounds a timestamp off its beat | Write the requested precision | REVIEW / `rounded_off_beat` and error in ms |

The terminal prints a Rich table with explicit **REVIEW** labels. The standalone
`review.html` highlights review rows in red as well as labelling them; it requires
no server or external resources. `review.txt` works without colour. These are
**review reports**, not a newly implemented timeline or screenshots of the React
component. A detector failure, sparse consensus or intentional offbeat cue can
all produce a warning: the warning does not establish that a musical event is
wrong or that the detector is correct.

To move distant cues as well:

```bash
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-forced --force-snap
```

**A forced distant snap remains flagged.** Its `has_nearby_beat` remains false,
its `action` becomes `forced`, and its original gap remains in the report.
Neither missing beats nor out-of-range cues are invented/clamped to satisfy this
option. Without forcing, the safe default intentionally leaves unmatched cues
off-grid, rather than silently moving a scene transition across a quiet section.

Use `--fail-on-review` for a validation gate. The outputs are still written,
but exit status is 2 when any cue needs review. A normal successful scan exits 0,
including one with reported warnings; invalid input, an unavailable explicitly
selected detector, or an output conflict fails nonzero without replacing inputs.

## Precision: exact beats versus LRC player compatibility

`--precision exact` is the default. It writes the **full stored decimal beat
timestamp**, not a value rounded back to the original two decimal places. For
example, a stored beat at `72.43809523809524` becomes `[01:12.43809523809524]`.
The exact timestamp string is also retained in JSON as
`nearest_beat_seconds_exact`. The sidecar's numeric seconds are convenient for
clients; use its exact string when reproducing the decimal serialization.

```bash
# For older LRC consumers, explicitly accept and report timestamp rounding:
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-ms --precision milliseconds
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-cs --precision centiseconds
```

A centisecond timestamp has only 10 ms resolution; it cannot in general represent
an arbitrary detected beat exactly. Long decimal fractions are an extended LRC
representation and not supported by every player. StemLab's canonical LRC
importer is updated to accept them. For an external consumer, test its parser or
use the JSON report; do not claim exactness after truncation/rounding. No text
precision makes a beat detector's estimate acoustically exact.

When the native sample rate is known, `nearest_beat_sample` and `output_sample`
are zero-based audio frames (one frame across all channels), rounded to nearest
with ties upward. A detector event may lie between samples. The LRC targets its
reported time, not an invented sample-aligned replacement. Source sample rate,
frame count and identity are taken from analysis metadata; the standalone scan
does not decode or rehash the audio, so the user must select the correct analysis
for the cue file.

## Files written

```text
cue-review/
    musical cues.beat-snapped.lrc
    report.json
    review.html
    review.txt
```

`report.json` contains schema `stemlab.cue-snap.v1`, source/output LRC SHA-256s,
the selected grid identity and digest, original and output timestamps,
nearest-beat indices (zero-based), sample frames when known, shifts/gaps, actions,
issue codes, and counts. `all_cues_on_detected_beats` is independent of `status`:
a forced run can put all cues on beats while still having `status=review_required`.

The standalone grid digest covers the original selected JSON file bytes. For a
new pipeline run it covers the serialized detector payload used in that run;
the grid path is null to distinguish it from a file-byte digest. The original
analysis manifest is left unchanged by a standalone rescan. New pipeline runs
include the result in their normal top-level manifest.

Only leading timestamp tokens are changed. Metadata, bracketed labels, blank
lines, line order, trailing newline presence, UTF-8 BOMs and BOM-marked UTF-16
are preserved. Multiple leading timestamps on one line are retained separately.
Intentionally simultaneous timestamps are supported; no label is deduplicated.
Malformed timestamps and enhanced karaoke `<mm:ss>` word timestamps are rejected
instead of partially rewriting the file. Convert legacy encodings to UTF-8 before
use; the tool never does a lossy conversion.

`[offset:N]` is treated as a global **advance** in milliseconds:
`audio_time = LRC_timestamp - N / 1000`. The tag is preserved, and rewritten raw
timestamps compensate for it exactly once. Multiple offset tags are refused as
ambiguous. A beat requiring a negative raw timestamp under that offset is kept
unmodified and flagged. Offset conventions differ in third-party players; verify
the consuming application. The canonical importer now follows this same explicit
convention rather than ignoring the offset.

## Add cue alignment to a new analysis

```bash
stemlab analyze master.wav -o analysis-master --profile practical --snap-cues "musical cues.lrc"

stemlab analyze master.wav -o analysis-master --profile practical --snap-cues "musical cues.lrc" --cue-tolerance-ms 100 --cue-beat-model consensus
```

Further switches are `--cue-downbeats`, `--cue-force-snap` and
`--cue-precision exact|milliseconds|centiseconds`. Alignment runs **after beat
consensus, using only this run's successful detector results**; it never reuses
stale beat JSON from a previous run. It works independently of the deep pass, but
requires the beat or structure detector to remain enabled. The default pipeline
without `--snap-cues` is unchanged.

The analysis stores `cue_alignment`, prints the review table, writes its files
under `cues/<cue-file-stem>/`, and records processing failures in pipeline errors.
Review warnings are not model failures and do not trigger `--strict` by themselves.
Use standalone `--fail-on-review` when automation requires a nonzero review gate.

Automatic grid preference is consensus, All-In-One, Beat Transformer, Beat This!,
BeatNet, then other valid detector result files in stable order. An empty or
malformed automatic candidate can fall back, with the reason recorded. Explicit
model selection does not fall back to another detector. No cue is used to choose
a supposedly better-fitting model. The same grid is used for all cues.

## Verification

```bash
python -m pytest tests/test_cues.py tests/test_cue_integration.py tests/test_canonical.py tests/test_canonical_extended.py
ruff check src/stemlab/cues.py src/stemlab/cue_cli.py tests/test_cues.py tests/test_cue_integration.py
```

Tests use controlled detector timestamps, including irregular grids, missing
beats, exact-boundary tolerance, duplicate assignments, Unicode, offset tags,
precise decimal serialization, actual file writes and CLI/pipeline wiring. They
do not assess acoustic detector accuracy. Keep the original cue file and listen
around flagged musical transitions before adopting the rewritten version.
