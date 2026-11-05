# Beat, BPM and loop hypotheses for rigged DanceRudiments motions

StemLab can analyse an **uncompiled, timestamped** `dancerudiments.rig-capture`
(schema 1) produced by the existing DanceRudiments Blender FBX, BVH, GLB or
BLEND action extractor, or its Rigify capture bridge. This is **kinematic**
evidence, not audio/music beat tracking. It runs offline with NumPy and uses no
model downloads, Blender runtime or native playback sampler.

```sh
# First extract the actual animated Action, not just the character's bind pose.
blender --background --factory-startup --python DanceRudiments/tools/blender_motion_import.py -- extract dance.fbx --source-id local_dance --output-dir extracted --sample-fps 60

# Review the extracted index.json and choose its .capture.json file.
stemlab analyze-rig-motion extracted/motion.capture.json --output analysis/motion-rhythm.json --estimated-beat-map analysis/estimated-source-beats.json --min-bpm 60 --max-bpm 200
```

### Direct analysis of published Kandi Boom motion packages

The released gallery uses *time-only, individually hashed, chunked*
DanceRudiments motion packages rather than a single `.capture.json` file. The
command can analyse these **without downloading or importing the original BVH**:

```sh
# With a compatible official DanceRudiments Python authoring package installed:
stemlab analyze-rig-motion generated/mesh-demo-assets/motions/boxbot --output analysis/kandi-salsa.json
stemlab analyze-rig-motion generated/mesh-demo-assets/motions/prism --output analysis/kandi-ballet.json
```

The adapter uses the existing `MotionPackage` loader: it validates the manifest,
numbered rig profile and hashes of **every** selected compressed recording. It
requires a complete consecutive original action, consistent 64-pip time-only
clock, original clip identity, numbered chunk ordering and explicit `music_timing_verified: false`.
If a package contains more than one original action, supply `--action-id` with
its exact `original_clip_id`. Mixed/missing chunks, retimed music-verified
recordings, inconsistent clocks or missing calibration provenance are errors.
No model/Blender/native sampler or external network access is used.

The original converter T-pose calibration frame is omitted from the **analysis**
using its verified source frame interval; the stored recording and absolute pip
origin are unchanged. The JSON records the source manifest SHA-256, original
action identity, complete input clip IDs and their hashes, original pip range and
number of omitted calibration pips. BPM and loop suggestions remain unverified
and do not imply safe pose blending, root travel compensation or foot planting.

The second command works on the exact capture path emitted by the first command;
`motion.capture.json` above is a placeholder, not a promised extractor filename.
Use `--output` without `--estimated-beat-map` to produce just the evidence. Both
outputs must be new paths; inputs are not modified. A capture with no dynamic
continuous controls produces a report with no BPM or loop suggestions; an
explicit estimated-map request fails without a tempo hypothesis.

## Interchange with the DanceRudiments compiler

The optional beat map uses the existing `dancerudiments.beat-map` schema 1,
64 pips per beat, and bounded piecewise-linear `seconds/beat` anchors. It sets
both `bpm_status` and `phase_status` to `estimated`, and `extrapolate` to `false`.
The anchors are **hypothesised regular-grid points**, not observed music beats.
No automatic beat-1, bar/meter, audio sync, approval or source stretching is
implied. Human correction and/or corroboration with StemLab's **audio** beat
analysis remains necessary for trustworthy music synchronisation.

After review, a source map can be supplied to the existing authoring compiler:

```sh
python DanceRudiments/tools/rig_motion.py compile extracted/motion.capture.json compiled/dance.motion.json --name dance --source-beat-map analysis/estimated-source-beats.json --bpm 124 --samples 512
```

The chosen 512-pip / eight-beat source span must fit inside the captured frames
and the beat map. Compilation remains explicit; simply analysing a capture does
not alter or loop it. The compiler's `--bpm` is the **target nominal** BPM, not
additional evidence for the source.

## How the estimates work

1. Validate the source profile's declared SHA-256 and exact channel ordering;
   reject malformed timestamps, non-finite physical samples, invalid
   quaternion norms, discontinuous sampling and excessive inputs. Physical
   discrete switches are not mistaken for rhythmic onsets.
2. Compute joint-control-group speeds, treating a quaternion and its negation
   as the same orientation. Compare changes in movement energy and per-group
   periodicity, rather than letting a slow torso drown out rhythmic foot or hand
   controls.
3. Find local kinematic accents and compare candidate quarter-note intervals
   within `--min-bpm` / `--max-bpm`. Retain several ranked BPM/phase hypotheses,
   the number of supporting independent control groups, and half/double-time
   uncertainty. The tempo ranking combines autocorrelation peaks with a
   windowed spectrum of the same control envelopes. Checking both sides of
   each search bound prevents a clipped slope from becoming a peak. A broad
   prior centred at 120 BPM helps choose between related rates, and a strong
   subdivision supports a rate only when that rate has its own evidence.
   Clear slow and fast pulses can still lead the ranking. The scores are
   relative ranking evidence. Beat phase and meter remain hypotheses.
4. Independently test repeated **poses** for periods up to 12 seconds so loop
   candidates can survive an uncertain beat grid. Long recordings use up to
   three 90-second windows spanning the start and end, with a middle window
   when needed. The report lists the actual windows and the source window of
   each retained period.
5. Score possible beat-aligned or unquantized loop windows by pose distance,
   tangential velocity mismatch, discrete selector equality, root translation,
   and repeated-phrase evidence when another cycle is present. Seam scoring
   uses bounded batches at the original timestamps.

### Already decoded motion

For offline adapters with validated arrays, use
`stemlab.analysis.rig_motion.analyze_motion_channels`. Pass increasing
source timestamps in seconds, a frames-by-channels matrix, ordered channel
descriptors and the SHA-256 of the original source. Quaternion groups use
four columns ordered by array index. The adapter owns source decoding and
units. The evidence records `source_kind: motion_channels` and is unsuitable
as a compiler input or as a foot-contact check.

The JSON records source-file SHA-256, exact rig profile identity, motion accents,
BPM alternatives, source beat-map hypothesis, pose-recurrence periods, and each
loop's `[start_seconds, end_seconds)` boundary and diagnostic scores. Every
loop has `requires_review: true` and `repaired: false`; kinematic evidence does
**not** verify feet on floor, skin self-intersection, constraints, topology,
rendered retargeting, visual continuity, or rights to a motion recording. A
matching pose alone cannot guarantee a useful edit. Root drift is not silently
cancelled and no correction is baked.

A Kandi Boom character FBX with only its original bind-pose keys is not a dance
recording. Analyse an *animated* imported/retargeted Action, such as an expressly
permitted salsa or ballet capture. Character mesh and motion recordings remain
separate, optional assets, not part of StemLab's or DanceRudiments' default
catalogue. PrismMoves' rendered-frame analyses can be used later as an independent
visual-quality check; they are not an alternate bone-timing authority.

## Reproducible test

```sh
python -m pytest tests/test_rig_motion_analysis.py -q
```

The tests use generated, source-bounded synthetic motions only: rhythmic pulses,
repeated slow poses, constant controls, alternating quaternion signs, discrete
selectors, root drift and malformed captures. No third-party choreography or
Kandi Boom model files are downloaded.

## World-space and contact evidence

DanceRudiments owns the portable skeleton's hierarchy, rest transforms and
world-space evaluation. Its `dancerudiments.world-motion-evidence` schema 1
sidecar can be supplied for an **original capture**, not a compiled package:

```sh
stemlab analyze-rig-motion extracted/motion.capture.json \
  --world-motion analysis/world-motion-evidence.json \
  --tempo-strategy consensus --output analysis/with-contacts.json \
  --events-output analysis/motion-events.json --clock-id original-motion-seconds
```

The sidecar must identify the exact capture-file SHA-256, profile and semantic
type; every original frame timestamp, root position, envelope and contact state
must be present and finite. Coordinate axes, units and valid coverage are
explicit. Invalid identities, changed frames, malformed events and asserted
musical approval are errors. StemLab validates the interchange; it does not
duplicate the skeletal evaluator or independently recompute its geometry.

`control_evidence` retains the complete earlier control-space result.
`world_evidence` retains separate event streams, tempo alternatives, contact
boundary diagnostics and additional loop proposals. World-joint speed,
root-relative speed and body height share one kinematic lineage. Foot-plant
events are a separately labelled heuristic from that same capture, not an
independent musical annotation. Per-foot low-height stance and speed are not
proof of actual ground contact or a correctly retargeted/weighted character.

Stable event sequences refine the initial correlation-bin BPM using the shared
`constant_beat_fit` implementation and explicit inferred integer-gap alternatives.
Refinement requires source-event residual, first-anchored and endpoint-drift
guards. The coarse BPM and fit diagnostics remain in the candidate; timestamps
are never inserted or moved, and half/double metrical interpretations remain
separate. An accelerating or poorly fitted source is not forced into a precise
constant-tempo claim.

The effective `recommended_tempo`, `motion_accents`, `bpm_candidates` and
estimated beat map follow the selected strategy:

| Strategy | Behaviour |
| --- | --- |
| `consensus` (default) | Prefer a contact pulse corroborated by the leading control/world hypothesis at the same, half or double metrical level. Preserve octave ambiguity. Contradictory supported families abstain. Without contact hypotheses, retain control evidence, then world evidence as a fallback. |
| `control` | Select the original control-space hypothesis and accents. |
| `world` | Select the strongest world-kinematic feature's hypothesis and source peaks. |
| `contact` | Select the foot-plant hypothesis and actual detected plant events. |

Without a world sidecar the original control-only behaviour is preserved.
No strategy approves beat one, meter or music alignment, and corroboration never
inflates the source heuristic score or the 70% DanceRudiments conversion gate.
`select_rig_tempo_hypothesis(report, family="contact", candidate_index=0)` returns
a copy with an explicit alternative selected, preserving the originals.
With `family="consensus"`, corroboration is checked against that requested
contact candidate, not the first candidate's tempo. The
effective loop list contains compatible-duration candidates wholly within a
continuous source interval; remaining family
loops stay in `world_evidence.loop_candidates` for review. Contact-state checks
are attached to each loop and do not repair a seam or confirm foot placement.
Original control accents remain intact in `control_evidence`; the effective
selection and alignment export exclude accents in uncovered time spans.
`source_valid_segments_seconds` records coverage even without a world sidecar,
splitting gaps strictly greater than three times the global median frame step.
Isolated frames remain explicit singleton intervals in that source metadata.

For source-bound audio matching and explicit review revisions, see
[motion alignment](motion-alignment.md). The offline entry point
`python -m stemlab.rig_motion_cli` requires NumPy, Typer and Rich; importing its
analysis APIs no longer imports SoundFile, Torch or the audio-analysis runner.
