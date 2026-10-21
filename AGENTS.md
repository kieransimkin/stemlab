# Agent instructions for StemLab

- Read README.md, docs/, plugins/stemlab/skills/ and the CLI help before selecting an analysis route. Check analysis, timing, evidence, MIDI, loop and agent integrations.
- Use the relevant existing capabilities as fully as the task warrants. Always look for a useful improvement to this tool. Fix a reusable gap here rather than copying its engine or carrying a private workaround; record why no change is justified when that is the result.
- Submit improvements as PRs to https://github.com/kieransimkin/stemlab/pulls. Never leave a completed reusable improvement only in a local fork. Keep changes focused and preserve the tool's identity and compatibility contracts.
- Add relevant regression coverage, documentation and a reproducible example when behaviour changes. Run the applicable pytest suites and release/plugin identity checks described in .github/workflows/ci.yml and .github/workflows/release.yml.
- Keep credentials, account data, private media and rights records out of source, fixtures, logs and packages. Use synthetic fixtures or explicitly authorised public examples and preserve their provenance/licences.
- Use [CONTRIBUTING.md](CONTRIBUTING.md) for review. Maintainers publish accepted, validated improvements as a fresh matching GitHub release and verify configured registry destinations. Preserve existing tags and release assets; publication and deployment remain subject to applicable authorisation.
- Website: https://kieransimkin.co.uk/danceflow/

## Keep README documentation current

- Whenever a feature is added or changed, update the relevant README.md in the same change to reflect the resulting behaviour. This applies to every feature addition or modification, including APIs, commands, configuration, defaults, integrations and removals.
- Update affected feature descriptions, usage instructions, options, examples and limitations. For tools or packages with their own README.md, update that README as well as the repository README when its overview or usage is affected.
- Check the README against the implemented and verified behaviour before committing, opening or merging a PR, publishing a release or handing off the work. A feature change is incomplete until its README documentation is current; a changelog or other documentation does not replace this requirement.

## Released viewers and coordinated CI/CD

- Read [docs/released-viewers.md](docs/released-viewers.md) before changing dependency, build or release behaviour. The sibling layout is `DanceRudiments/`, `react-timeline-sequence/`, and `stemlab/` under one parent.
- Release the two companions first (React Timeline Sequence, then DanceRudiments), verify their configured publication workflows and public registries, then synchronize/rebuild/test/release StemLab. A merge or tag alone is not a verified release.
- StemLab must target the **latest stable official releases**. No unreleased main commit, mutable development override, local `file:` archive or vendor package may substitute for a missing release. Latest is resolved before the build and locked to exact published versions, release commits and registry hashes for that run; fail visibly on stale or incompatible dependencies rather than falling back silently.
- Use the canonical `stemlab/scripts/Release-DanceFlow.ps1` coordinator from the shared parent directory. Preview first; `-Execute` explicitly performs scoped commits, normal pushes and fresh tags; `-Resume` must preserve source identities and existing tags/assets. Never force-push, move release tags, commit unrelated work, bypass failed checks or change approvals/protections/credentials to manufacture a pass.
- Update this repository's README.md and AGENTS.md in the same change whenever release policy, dependency rules, automation, commands, controls or validation change. Keep relevant package/feature READMEs current too. A separate guide or changelog does not replace the root README update.
- Preserve the master-plus-drums/percussion beat-routing contract, 64-pips-per-beat native recording clock, per-dimension bars and combined waveform/spectrogram lanes. New UI features must be supplied by released shared APIs and genuinely rebuilt frontend assets, not copied engines or marker strings.
- Distinguish source CI, package publication, full-song inference, browser/audio QA, artifact packaging, actual Pages deployment and live URL/audio verification. Keep all five Arcadians pages together, including the full-master Fourier selector for 4, 8, 16, 32, 64 and 128 channels. Every resolution must pass native/full-dimensional bar and HTTP audio checks before packaging; preserve every sample in losslessly compressed recording downloads. Do not report unexecuted, skipped or older-commit checks as success. CI playback evidence is not subjective listening QA.

## Standalone CLI release contract

- Treat `.github/workflows/binary.yml` as a required release gate. Do not restore
  `continue-on-error` or a placeholder binary note.
- Build the one-file CLI with PyInstaller on Python 3.11+ because BeatNet's maintained offline DBN
  path uses `madmom-prebuilt`; normal project CI may still test Python 3.10.
- BeatNet must come from `ensure_beatnet_runtime()`: the official 1.1.3 wheel is
  SHA-256 verified before its package/model data is embedded. Never ask pip to
  resolve BeatNet's obsolete NumPy/Numba dependency metadata.
- Smoke-test the produced executable with a fresh external cache and require its
  embedded BeatNet runtime to be reported ready before uploading the artifact.

## DanceRudiments output scale

All StemLab-generated DanceRudiments recording coordinates are mandatory bipolar
float64 values in [-1,+1]. `none`, `global`, and `per-axis` select only the
amplitude reference used by the affine mapping; they must never bypass the final
bipolar projection. Non-silent axes map zero amplitude to -1 and their selected
reference to +1, then apply signed gain and clipping. Completely silent axes stay
at 0. Single, batch, stem-pair, average-comparison, legacy and harness exports
must all pass through `EnvelopeBank.compose`; do not add a parallel exporter.

Fourier frequency buckets also use that composition route: N buckets must export
exactly N named dimensions on the same 64-pip clock. Preserve window-corrected
one-sided band RMS, independent channel powers, source-rate/excerpt boundaries and
frequency-bin provenance. Empty/unresolved buckets are errors, not invented data.
Run `tests/test_frequency_bands.py` with the mandatory released native recording
API in the recording CI job when changing this feature.

## Beat alignment and public reference

`beat-offset` must preserve source hashes, canonical authority, all actual saved
detector/source runs and raw consensus tempo. Keep half/double-time interpretations
normal and explicit; do not fabricate beats or approve a new BPM/phase. Reuse
`constant_beat_fit` for the separately labelled estimated grid, including its
end-drift guards. Preserve sequential and inferred integer-gap hypotheses when
missing detections explain a poor fit; never add timestamps or relabel inferred
ordinals as detections. Require the first-anchored error guard before selecting
that fitted hypothesis. Keep 64-pip offsets distinct from 16-tick browser clocks, exact
fractional offsets distinct from integer rounding, and beat phase distinct from
audio/lyric/cue/recording source time.

Use released shared marker `className` APIs for both grids; genuinely rebuild and
record the frontend. Test selectors, exact backend rows, painted colours/styles
and unchanged transport. Run `tests/test_beat_offsets.py`, both `tests/web` suites
and static/server integration checks. Keep the five Arcadians pages plus the
checksum-pinned The Truth is a Virus reference together. Require matching HTTP
playback/grid QA for the reference before release/Pages publication. Its CI-built
viewer consumes frozen real detections; never relabel those as fresh inference.
The lightweight combined-site job must install FastAPI, required by the static
timeline adapter's shared display helpers. Build the frozen beat reference in
the early model-free preflight before expensive full-song inference.
Demonstrations and screenshots on the artist website belong on the WordPress
StemLab page, preserving its independent exact-payload public-save requirement.

For lyric recovery, the speech mask is a speech-activity hypothesis and may
remove singing. Compare the explicit full-audio mode when warranted, preserve
the original evidence and source clock, retain repetition-safe decoding and
keep canonical wording, observed anchors, the 70% threshold and listening QA
authoritative. [Measured example and limits](docs/screenshots/lyric-input-comparison.png)
illustrate the difference; word coverage is not acoustic accuracy.
Full-audio transcription uses faster-whisper's own decoder and NumPy/file
writing without importing Torch. Preserve this route and its no-Torch test;
automatic device selection queries the actual CTranslate2 backend.
Observed single-word edge punctuation may normalize for lexical comparison;
never change canonical text/evidence or split a multiword stamp into invented times.

## User-edited variable tempo and Beat 1 alignment

The corrected beat timeline (`stemlab.beat-timeline.v1`) preserves all original
consensus detector timestamps as read-only evidence and places any user edits in
`timing/beat-timeline.json`. Clock corrections use exact source sample frames,
strictly ordered beat indices, 64 pips/beat, and integrated piecewise phase.
The first-beat sync phase offset is **signed**, may be fractional, and must not
be rounded to integer pips (or 16-tick DanceMoves units) silently. Keep audio,
lyric/cue and recording time on the untouched original source clock. New web
features use the released shared timeline's custom lane API; rebuild/commit its
real compiled assets. DanceMoves 3.3.x only understands constant-tempo beat
alignment v1: never mislabel an irregular v1 timeline as that older schema.

## Lyric and cue timing edits

Use the source-bound, separately revisioned `timing/song-timing-edits.json`.
Keep original canonical lyrics, ASR, cues and master unchanged. Word starts and
ends are restricted to their own line; cue names must be [SECTION: VERSE 1],
[ENTRY: VOCAL INTRO], [DROP: CHORUS 1] etc. Validate on the server before
saving/importing/exporting, and do not invent a beat in a variable-map gap.
Never substitute a development shared timeline for its latest stable released
version. Regenerate viewer receipts and built assets after the new timeline
release is officially published.

## Full ecosystem and release preflight

Before every new workflow run, check the latest stable official release and observe the actual runtime used by the job. Follow [the shared preflight](https://github.com/kieransimkin/DanceFlow/blob/main/docs/workflows/release-preflight.md) and this project's [people-and-agent guide](docs/ECOSYSTEM.md). Review the complete relevant capability inventory rather than only a familiar command. Consider every DanceFlow component against the actual task; use and compose all applicable supported capabilities, and improve a concrete reusable gap in its canonical repository. Record why existing capabilities suffice when no change is justified. No catalogue checklist expands the task, authorises model downloads/training, or proves integration. Preserve exact source/package identity, clocks, model-local storage, privacy, costs, immutable releases and separate deployment gates.

## Preflight temporary-directory access

The Arcadians publication recipe is `arcadians-core-v3`: preserve the existing
six-stem/core evidence families and add genuine Basic Pitch outputs for all five
pitched stems. Require source hashes, successful per-stem status, native MIDI
parsing and matching note tables. Publish only the bounded report/note/MIDI
allowlist; worker requests, logs and model caches remain private. Drum separation
does not establish drum MIDI transcription. Preserve original files and export
to new directories. Keep the existing five viewers and beat reference together.
Rebuild the released timeline bundle after adding MIDI lanes, and require real
HTTP MIDI-download and painted note-lane checks before Pages deployment.

Before any long, costly, model-backed, media-rendering, build, test, packaging or release command that creates private or atomic temporary directories, run a disposable preflight with the exact runtime, user or sandbox, and intended output parent. The probe must create a unique directory, write and read a file, atomically rename it, then remove the file and directory.

Keep temporary data and caches under the owning project on `Z:`; model weights and model-specific caches remain under that project's ignored `models/`. If the probe returns `WinError 5`, access denied, a rename failure or a cleanup failure, stop before the expensive command. Preserve the exact error and use the documented narrowly approved unrestricted recovery from the outset only when the task requires it. Use a fresh output directory and do not repeat the already-failing full job in the restricted shell.

After any unrestricted recovery, verify that the final output is readable and writable from the normal managed environment. If it is not, copy the completed bytes into a pre-created project-local directory that passed the probe, verify hashes, and retain the original failure and recovery evidence. Do not edit global ACLs, switch caches to `C:`, terminate unrelated processes or claim the underlying permission problem is fixed. Repositories that own temporary-directory creation should provide and test a reusable preflight helper rather than relying only on this instruction.
