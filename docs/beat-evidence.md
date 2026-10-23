# Cross-input rhythm evidence and beat counting (experimental)

**This is a read-only comparison layer, not a new canonical beat map.** StemLab's
existing Beat This!, BeatNet, Beat Transformer, All-In-One, consensus,
user-corrected tempo map, and the DanceRudiments 64-pip transport are unchanged.
Classical signal-processing decoders now make independent *method hypotheses*
from audio, N-dimensional rudiments and timestamped rig movement. The same
method run on three features is **not three independent detector votes**.

## Commands

From a current StemLab source installation (`pip install -e .`):

```sh
# Four classical methods + dynamic-programming onset evidence and local tempo windows
stemlab compare-beats --input audio:master=song.wav \
  --output analysis/master-rhythm-comparison.json

# A source-time capture and 64-pip DanceRudiments recording can be compared
# without loading the mesh, native sampler or downloaded checkpoints.
stemlab compare-beats \
  --input capture:human=extracted/dance.capture.json \
  --input recording:rudiment=generated/pattern.recording.json \
  --output analysis/movement-evidence.json

# The existing rig package loader must be installed for this input. It verifies
# every selected chunk, exact profile fingerprint, original action and source clock.
stemlab compare-beats --input package:salsa=generated/mesh-demo-assets/motions/boxbot \
  --output analysis/kandi-evidence.json

# Re-use already-saved neural inference rather than invoking/downloading models.
stemlab compare-beats --input audio:master=song.wav \
  --model-result beatthis=analysis/beats/beat_this.json \
  --model-result beatnet=analysis/beats/beatnet.json \
  --output analysis/with-models.json
```

All paths above are illustrative. If the song/capture/model outputs **really have
a common time origin**, affirm exact offsets in seconds with `--align` for each
source (including zero offsets):

```sh
stemlab compare-beats --input audio:master=master.wav \
  --input capture:rig=captured.capture.json \
  --align master=0 --align rig=0.235 \
  --output analysis/synchronized-comparison.json
```

Without explicit offsets, BPM-family similarity may be reported but **phase
agreement stays unavailable**. The report never overwrites an input or output.
`--min-bpm` and `--max-bpm` default to 60 and 200; supported bounds are 30..300.
`--no-plp` excludes the optional librosa local-pulse method. Outputs are plain
JSON, source-hashed, capped at 900 seconds of analysis, and do not contain raw
waveform audio or complete mesh motion samples. Model-result import is offline.

## Sub-frame tempo precision and beat counting

Autocorrelation, multi-tap comb filtering and the eight-second local tempo
windows are evaluated at a 100 Hz feature frame rate, then the strongest
interior lag peak is refined with a **bounded three-bin parabola**. Both the
original integer lag/BPM and the interpolated lag remain in the JSON; edge,
flat or out-of-range maxima retain the original bin. This reduces systematic
integer-lag rounding (for example, 42 frames is 142.857 BPM whereas a true
145 BPM beat is about 41.38 frames), but does **not** establish that the music
is at the quarter-note level instead of half time.

The dynamic-programming onset path also exports
`beat_count_diagnostics`: inferred slots inside the observed path, source-wide
predicted slots, and estimates of unobserved leading/trailing positions.
Onset candidates are **not** human-annotated beats. Missing positions are not
fabricated as independent measurements, and a full-song count is not guaranteed
without musical tempo and beat-one confirmation. Each tempo family also reports
per-feature observed-onset-path coverage (and which features exceed 80% of the
source grid). These are **review cues**, not detector votes, calibrated confidence,
or an automatic preferred BPM; shared audio features are correlated.

To regression-test the precision boundaries, run
`python -m pytest tests/test_beat_subframe_precision.py -q`.

## Five complementary traditional decoders

- **Unbiased autocorrelation** of an onset/motion salience trace locates likely
  recurrent beat periods without assuming the first beat.
- **Multi-tap comb periodicity** rewards recurrences at one, two and three
  candidate beat intervals; half/double ambiguity is retained.
- **Inter-onset-interval voting** examines different peak spacings and explicitly
  weights possible missing events rather than fabricating observed beats.
- **Predominant local pulse (PLP)** estimates a smooth pulse from a local Fourier
  tempogram. It can diverge from the global periodicity hypothesis.
- **Dynamic-programming onset path** selects source-observed peak candidates
  with a periodicity reward. It records integer ordinal gaps, rather than
  inserting invented onset timestamps. Its separate constant-tempo grid remains
  an estimated prediction, not another set of observed events.

Each trace also has independent **8-second local autocorrelation tempo windows**
with 4-second hop. Local results reveal possible ramps/drift without coercing
an irregular source into a confirmed fixed BPM. Beats-per-accent-cycle proposals
(3, 4, 5, 6, 7) are *not* time signatures and must not be called downbeats.


## Octave-aware BPM, source-wide counting and robust model fits

`tempo_families` groups BPM values that are related by a power of two but
retains every method and source-feature identity. A 72.5/145 BPM pairing is an
**unresolved metrical level**, not two votes against the same actual tempo.
`tempo_family_status` explicitly reports a family conflict or half/double
ambiguity. Scores from ACF, PLP, comb and DP have different scales and remain
uncalibrated; correlated features and algorithms never become extra votes.

The DP onset path now maximizes whole-path evidence, requires minimum coverage
of the **original source time span**, and publishes the estimated full-source
beat count separately from matched observed onset candidates and missing
ordinal positions. Short perfect fragments cannot masquerade as full-song
beat detection. Model-result import preserves every detector event and derives
a robust Huber-regression grid: it reports original timestamp count, an
explicit missing-ordinal *hypothesis*, median/p95 phase residual, first/second
half tempo drift, and ambiguous half/double alternatives. An irregular grid
remains `nonconstant_or_poorly_fitted_grid_review_required`.

`local_tempo_warnings` explicitly distinguish a likely octave metrical switch
from a non-harmonic local disagreement. Neither is itself verified tempo
modulation; bar meter and first downbeat remain unknown without annotations.
Cross-source comparisons report an independent detector lineage and mark
estimated phase overlap at different metrical levels as **conditional**, even
when both inputs have user-supplied clock offsets.

## Reviewed annotations and held-out score calibration

`compare-beats` accepts optional `--annotation NAME=FILE` for a track with a
matching exact SHA-256. The annotation JSON must have `format` set to
`stemlab.beat-annotation.v1`, `schema_version: 1`, `clock: source_seconds`,
`status: human_reviewed`, `annotator`, `source_sha256`, `beats` and optionally
`downbeats`. It must contain at least five distinct ordered beat timestamps.
A BPM label without beat timestamps is **not** an acceptable annotation.

```sh
stemlab compare-beats --input audio:master=master.wav \
  --annotation master=reviewed-beats.json --output comparison-with-metrics.json
```

The evaluation reports one-to-one beat-timing precision/recall/F-measure,
median timing residual and continuous-match length **conditional on that
annotation**, not inherent confidence. The `calibrate_held_out` Python API
fits monotonic score/reliability tables only from separately annotated train
tracks and evaluates them on independent held-out tracks. It rejects overlapping
track identities, requires at least 8 training and 4 held-out examples per
method by default, and reports a held-out Brier score. Without such an
annotated corpus, `calibrated_confidence_status` is explicitly unavailable.

## Real-song repeatable benchmark

From a local source checkout containing the hash-pinned MP3s:

```sh
python scripts/benchmark_example_beats.py --repo-root . \
  --output-dir .cache/beat-benchmark-v2 --min-bpm 60 --max-bpm 200
```

This does full-song feature extraction without re-running neural checkpoints.
It checks source hashes for **Arcadians** (145 BPM reference metadata),
**The Truth is a Virus** (unconfirmed BPM, with frozen saved neural events),
and, when present, **Star Lights Glow (Mystery Liquid Kick)** (unconfirmed BPM
and distinct source identity from its Anthem mix). All outputs go to a new
local directory. Song BPM reference metadata does not establish annotated
individual beat times or downbeat phase. Real-song accuracy requires reviewed
beat-level annotation and external listening/visual inspection.

## Modality-specific observations and clocks

| Kind | Input | Evidence and caution |
| --- | --- | --- |
| `audio` | WAV/FLAC readable by `soundfile` | Original sample-rate hash, bass/mid/treble log-spectral flux and RMS attacks; common source-second clock |
| `recording` | `dancerudiments.recording` schema 1 | Per-channel movement slopes and turning points on its **declared** 64-pip nominal clock; any recovered absolute BPM is *conditional on the recorded BPM*, not fresh music tempo |
| `capture` | `dancerudiments.rig-capture` | Reuses validated exact profile and physical channels; kinematic novelty, group speed, and kinetic velocity minima/pauses; no source retarget, no contact or audio inference |
| `package` | Exact optional motion-package directory or `manifest.json` | Reuses the existing verified StemLab/DanceRudiments package analyser and its detected physical accents; these are **derived features**, not independent new frame observations |
| `model-result` | Existing StemLab `BeatResult` JSON | Original beat/downbeat/tempo predictions and optional source hash; no inference run; no assumption of ground-truth or shared origin |

Rig-velocity-minimum evidence follows the kinematic-beat literature: movement
arrests/reversals may coincide with music beats; the audio beat is still a
*distinct event*. Scalar control speed is only a proxy for full 3D world-space
joint velocity. True world-space foot contacts, toe-off and foot-slip scoring
are **not yet implemented**. Sampling a video via PrismMoves/PixelCue is a later
*optical-flow* evidence route, not a substitute for exact skeletal timestamps.

## JSON contract and interpretation

The v1 source record has `format: stemlab.rhythm-evidence.v1`, name, kind,
SHA-256, clock basis and method-specific hypotheses. Each hypothesis stores
its decoder, source feature, numerical BPM, first predicted grid position,
`grid_seconds`, total predicted beat count, a **non-calibrated** numerical
score, half/double alternatives, and optional inferred accent-cycle lengths.
No downbeats are synthesized. DP separately lists `onset_aligned_beat_candidates_seconds`
and `observed_onset_ordinal_positions`, including skipped ordinals where appropriate.
`local_tempo_windows` retain independent short-window observations. At most 12
features are analysed by first-difference salience; `skipped_features_due_to_cpu_limit`
names every omitted stream, while the original input is unchanged.

The comparison wrapper `stemlab.rhythm-comparison.v1` embeds the source reports,
harmonic relationships and (only with supplied offsets) predicted-grid phase
differences. Matching **2:1 tempos is explicitly labelled as a metrical-level
relationship**, not direct tempo agreement or proof of synchronization. Its
`result_status` is `review_required_not_canonical_consensus`.

**Do not promote this result into** `stemlab.beat-timeline.v1`,
`dancerudiments.beat-map`, approved downbeats, a loop selection, or a released
music-synchronised mesh without separately reviewing and confirming it.
Source audio frames, 64-pip recording coordinates, fractional beat offsets and
model-predicted beats retain separate provenance.

## Reproducing the synthetic gates

```sh
python -m pytest tests/test_beat_evidence.py -q
python -m ruff check src tests scripts
```

The tests cover five methods, 120 BPM phase and count, four-beat accent cycling
without fictional downbeats, constant/silent motion, half-tempo relationships,
tempo ramps, saved neural results, synthesized bass drum WAV, rig capture and
rudiment clocks, source fingerprinting, duplicate/invalid inputs, explicit
cross-source offsets, and non-clobbering CLI output. No real choreography,
third-party audio, model weights or network access is needed.

This feature is a *development source addition*, not an official released
integration. Passing focused synthetic tests is not proof of real-song beat
accuracy, Rigify-world-space contact quality, Chromium playback or successful
release deployment. Run repository CI, release preflight and browser/recording
gates before publishing.
