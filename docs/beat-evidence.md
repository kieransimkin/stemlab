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
