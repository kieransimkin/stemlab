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
   uncertainty. No downbeat classifier is claimed.
4. Independently test repeated **poses** (up to 12-second periods within the
   first 90 seconds) so loop candidates can survive an uncertain beat grid.
5. Score possible beat-aligned or unquantized loop windows by pose distance,
   tangential velocity mismatch, discrete selector equality, root translation,
   and repeated-phrase evidence when another cycle is present.

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
