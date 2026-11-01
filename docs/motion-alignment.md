# Source-bound motion/audio alignment and review

The offline alignment workflow compares **source-observed motion events and
saved audio detections**. It preserves original clocks and media, proposes
offsets and rate changes, identifies ambiguous repeated phases, and writes a
separate review revision. It does not infer musical approval from a correlation
score. All algorithms run locally without model downloads. The implementation
uses NumPy; the standalone CLI additionally needs Typer and Rich.

## Complete workflow

1. Extract the original animated action in DanceRudiments. Generate its
   `dancerudiments.world-motion-evidence` sidecar using the canonical world-space
   evaluator when the source hierarchy is supported.
2. Run `analyze-rig-motion` with `--world-motion`, choose a tempo strategy and
   export source events with `--events-output` and an explicit `--clock-id`.
   Keep all original control and world/contact hypotheses.
3. Obtain audio events from an existing StemLab model result or observed-onset
   path in `stemlab.rhythm-evidence.v1`. A predicted regular beat grid alone is
   not usable evidence. The audio source identity and its full source bounds
   must be explicit.
4. Supply an explicit relationship and initial clock mapping. Confirm original
   source bytes using `--motion-source` and `--audio-source`. Inspect the ranked
   constant/variable mappings and their source event correspondences.
5. Audition the actual motion and music. Select a candidate or provide manual
   source anchors. Save a review revision. Confirm beat one and meter separately
   when known; accepting a source-clock mapping does not imply either.

```sh
stemlab analyze-rig-motion capture.json --world-motion world-motion-evidence.json \
  --tempo-strategy consensus --output motion-rhythm.json \
  --events-output motion-events.json --clock-id motion-original

stemlab prepare-alignment-events beats/beat_this.master.json --source master.wav \
  --clock-id master-original --audio-start 0 --audio-end 180 \
  --output audio-events.json

stemlab align-motion-audio motion-events.json audio-events.json \
  --motion-source capture.json --audio-source master.wav --clock-map clock-map.json \
  --max-offset 2 --rate 0.5 --rate 1 --rate 2 --output alignment.json

stemlab confirm-motion-alignment alignment.json --candidate affine-EXACT_ID \
  --reviewer "Reviewer name" --output alignment-review-1.json
```

Use the actual audio duration instead of the illustrative `180`. IDs are copied
from `alignment.json`, not fabricated. Add `--beat-one 0.373 --meter 4/4` only
after explicitly confirming those values. Every output must be a new path.
The lightweight alternate entry point is
`python -m stemlab.motion_alignment_cli`; it exposes the three alignment
commands without importing audio decoders, Torch or the main pipeline.

## Event interchange: `stemlab.event-evidence.v1`

```json
{
  "format": "stemlab.event-evidence.v1",
  "schema_version": 1,
  "kind": "motion",
  "source": {
    "sha256": "EXACT_SHA256_OF_ORIGINAL_CAPTURE_FILE",
    "clock_id": "motion-original",
    "seconds_range": [0.0, 20.0],
    "valid_segments_seconds": [[0.0, 9.0], [10.0, 20.0]]
  },
  "streams": [{
    "id": "foot_plants",
    "family": "contact_heuristic_from_same_capture",
    "event_type": "observed_feature_peak",
    "events": [
      {"seconds": 0.4, "strength": 0.8},
      {"seconds": 0.9, "strength": 0.9}
    ]
  }]
}
```

The placeholders above are explanatory: the implementation requires lowercase
64-character SHA-256 values. `kind` is `motion` or `audio`. Each source has a
nonnegative original-seconds range and ordered, disjoint valid intervals.
Events must be strictly increasing inside those intervals. An event's optional
`strength` defaults to 1 and must lie in `[0,1]`; zero-strength events remain in
the input but are excluded from fitting. Source indices still refer to the
original event arrays.

`event_type` is `observed_feature_peak`, `model_inference` or
`human_annotation`. Algorithmically predicted grid points are rejected.
Different decoders of one feature must share a `family`; world speed,
root-relative speed and body height share `world_kinematics`. Multiple limbs or
related algorithms do not create independent votes. Even differently labelled
motion features still derive from the same capture, and remain physical rather
than musical evidence.

Bounds: at most 24 streams, 6,000 events per stream, 24,000 events per source,
256 coverage intervals and 32 MiB per JSON file. Eight representative streams
per source participate in bounded matching: distinct families first, then event
count. The result names every selected and omitted stream. Original input
hashes cover the complete evidence, including omitted streams.

### Converting existing reports

Python APIs:

```python
from stemlab.analysis.motion_alignment import (
    events_from_rig_report, events_from_rhythm_report, make_event_evidence,
)

motion_events = events_from_rig_report(rig_report, clock_id="motion-original")
audio_events = events_from_rhythm_report(
    beat_result, source_sha256=exact_master_sha256, clock_id="master-original",
    seconds_range=[0, source_duration_seconds],
)
```

The rig adapter uses the original capture-file hash or verified package-manifest
hash, preserves covered control-accent timestamps, and adds separate validated
world/contact event streams. It does not use the estimated beat map as detector
output. Control accents inside source gaps remain in the original analysis, but
are excluded from alignment export with an explicit count. Capture reports
provide `source_valid_segments_seconds` even without a world sidecar: a gap is
strictly greater than three times the global median frame interval. Isolated
frames remain in analysis coverage metadata as `[t,t]`; their zero-duration
intervals are omitted from alignment coverage and counted separately. A report
with only isolated frames cannot provide a continuous alignment interval.
The audio adapter accepts an individual saved `BeatResult` with `model`
and `beats`, or observed-onset timestamps in a rhythm-evidence report. Raw saved
model JSON lacks an independently verified master association, so its source
association is recorded as explicitly supplied by the caller. Existing
`rhythm-evidence` audio hashes must match the supplied audio hash. Inputs and
detector timestamps remain unchanged.

## Initial clock map: `stemlab.motion-clock-map.v1`

```json
{
  "format": "stemlab.motion-clock-map.v1",
  "schema_version": 1,
  "motion_source_sha256": "EXACT_MOTION_SOURCE_SHA256",
  "audio_source_sha256": "EXACT_AUDIO_SOURCE_SHA256",
  "motion_clock_id": "motion-original",
  "audio_clock_id": "master-original",
  "motion_origin_seconds": 0.0,
  "audio_origin_seconds": 0.0,
  "seconds_scale": 1.0,
  "relationship": "same_performance"
}
```

Both hashes and both clock IDs must match the evidence. Origins must lie in
valid source coverage. `relationship` is `same_performance` when the streams
belong to an identified original performance, or `creative_retiming` when
matching an independently sourced motion to new music. This explicit statement
does not independently establish provenance or copyright permission.

For a candidate rate multiplier `r` and inferred offset adjustment `d`:

`audio_seconds = audio_origin + seconds_scale × r × (motion_seconds − motion_origin) + d`

`seconds_scale` is a declared source-clock ratio. Candidate `rate_multipliers`
default to `0.5, 1, 2`. An **audio-seconds-per-motion-second** scale of 2 means
motion plays at half speed; the inverse is exposed as
`playback_rate_motion_seconds_per_audio_second`. Physical playback speed and a
musician's half/double interpretation of the beat are separate concepts. No
timestamp is invented to settle metrical ambiguity.

## Matching and result semantics

`align_motion_audio(motion, audio, clock_mapping, *, motion_source,
audio_source, max_offset_seconds=2, tolerance_seconds=.07,
rate_multipliers=(.5,1,2), variable_tempo=True)` returns
`stemlab.motion-alignment.v1`.

The routine streams SHA-256 over both original files and refuses changed or
misidentified sources. Event-difference histograms propose bounded signed lags.
At most 32 offsets per rate are evaluated. Matching is monotone and one-to-one;
missing detections remain missing. Each stream pair reports original event
indices, recall in both directions, event F-measure, median/p95 timing error and
the fraction of source overlap covered by matched events. Scores combine event
agreement and support span; a short perfect fragment does not earn full-source
credit. They are uncalibrated diagnostics, not probabilities.

For aggregation, the best stream in each family pair is retained; multiple
related decoders cannot increase the vote count. The report preserves every
evaluated stream comparison. Counts and error statistics use all matched events;
each comparison shows at most 64 evenly selected original index pairs, with
`matched_event_indices_sampled` explicitly set when bounded. The complete
source event arrays remain untouched. A repeated click-like pulse can align at several
whole-cycle shifts: those periodic aliases remain explicitly ambiguous even
when boundary coverage slightly favours one shift.

Variable-tempo proposals use a bounded monotone event path with skipped-event
penalties, local rate and rate-change guards. They retain exact observed event
correspondences and use alternating correspondences as interpolation anchors.
Remaining correspondences test interpolation error; because path selection saw
all events, this check is explicitly **not an independent test-set score**.
A variable proposal is retained only when it improves the stated event score
and unused-anchor p95 error remains within the requested tolerance. The variable
path limit is 2,500 events per stream per segment; larger streams keep the
constant-rate results and disclose the work bound.

Every candidate has `mapping_segments`; each segment has source bounds and
ordered `{motion_seconds,audio_seconds}` anchors. Variable candidates also
identify the original event indices at each anchor. Source gaps split segments.
`map_motion_seconds(candidate, times)` returns `NaN` outside covered segments
and never extrapolates into absent source data.
Generated affine boundary anchors are clipped to their exact validated audio
bounds only when arithmetic overshoot is within a small ULP allowance. This
does not relax validation of saved revisions or manual anchors: even a reviewed
endpoint just outside source coverage is rejected.

`result_status` is `insufficient_event_support`,
`ambiguous_candidates_require_review`, or `candidate_requires_review`.
`selected_candidate_id` is always initially null, and
`music_timing_verified` is always false. Candidate generation does not silently
apply an offset, time warp, audio beat map or source stretching.

## Review revisions

`create_alignment_revision(report, report_sha256=..., candidate_id=...,
reviewer=..., decision="accept_mapping", beat_one_audio_seconds=None,
meter=None, manual_anchors=None, previous_revision=None)` creates
`stemlab.motion-alignment-review.v1`.

The revision records the exact report-file hash, canonical report-content hash,
both source hashes, candidate, reviewer, timestamp, monotonically increasing
revision number and previous revision hash. Decisions are `accept_mapping`,
`reject`, or `needs_review`. A mapping acceptance leaves beat one and meter
unconfirmed unless each is explicitly supplied. It never verifies loop seams
or retargeted geometry. A subsequent revision cannot change the identity of
the report it reviews.

Manual anchors replace the accepted candidate mapping only inside their
explicit source coverage. They must increase strictly in both clocks; bridging
a source gap is rejected. Use separate covered segments/candidates when source
footage is missing. Rejected/unresolved revisions cannot supply an accepted
mapping or musical confirmations.

`validate_alignment_revision(report, revision, report_sha256=...)` verifies
saved or UI-exported revisions before consumption, including source/report
identity, bounds, gaps, anchor ordering and the separate confirmation fields.
The canonical JSON content hash is SHA-256 over sorted keys, compact separators,
ASCII JSON and finite values. Files, original reports and source media remain
unchanged.

## Reproducible synthetic example

This small example deliberately uses source identity placeholders containing
synthetic text, not fake audio or a downloaded dance. Its known asymmetric
event sequence has a 373 ms offset, allowing a precise pipeline check without
claiming musical accuracy on a real performance.

```python
from pathlib import Path
import numpy as np
from stemlab.analysis.motion_alignment import (
    CLOCK_FORMAT, align_motion_audio, file_hash, make_event_evidence, write_document,
)

out = Path("synthetic-alignment-example")
out.mkdir(exist_ok=False)
motion_source, audio_source = out / "motion.source", out / "audio.source"
motion_source.write_text("synthetic motion identity")
audio_source.write_text("synthetic audio identity")
times = np.cumsum(np.tile([.41, .62, .47, .55, .72, .38, .58], 5))

def evidence(kind, path, events):
    return make_event_evidence(
        kind=kind, source_sha256=file_hash(path), clock_id=kind + "-original",
        seconds_range=[0, 24], streams=[{
            "id": kind + "-events", "family": kind + "-fixture",
            "event_type": "observed_feature_peak",
            "events": [{"seconds": float(t), "strength": 1.0} for t in events],
        }], provenance={"synthetic": True},
    )

motion = evidence("motion", motion_source, times)
audio = evidence("audio", audio_source, times + .373)
clock = {
    "format": CLOCK_FORMAT, "schema_version": 1,
    "motion_source_sha256": motion["source"]["sha256"],
    "audio_source_sha256": audio["source"]["sha256"],
    "motion_clock_id": "motion-original", "audio_clock_id": "audio-original",
    "motion_origin_seconds": 0, "audio_origin_seconds": 0,
    "seconds_scale": 1, "relationship": "same_performance",
}
result = align_motion_audio(
    motion, audio, clock, motion_source=motion_source, audio_source=audio_source,
    max_offset_seconds=.8, rate_multipliers=(1,), variable_tempo=False,
)
assert abs(result["candidates"][0]["intercept_seconds"] - .373) < .002
assert result["music_timing_verified"] is False
write_document(out / "alignment.json", result)
```

Run the regression suites with:

```sh
python -m pytest tests/test_motion_alignment.py tests/test_rig_world_evidence.py \
  tests/test_rig_motion_analysis.py tests/test_rig_motion_package.py
```

They cover signed offsets, half/double rates, variable tempo, periodic ambiguity,
missing events, source gaps, no-motion/no-overlap abstention, zero strengths,
correlated streams, changed source bytes, changed clocks, duplicate JSON keys,
invalid sidecar arrays, explicit review and nonclobbering CLI output. These are
controlled regression fixtures; real-song beat accuracy, human choreography
quality and retargeted Kandi Boom mesh acceptance remain separate evaluations.
