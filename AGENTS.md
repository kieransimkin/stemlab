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
- Distinguish source CI, package publication, full-song inference, browser/audio QA, artifact packaging, actual Pages deployment and live URL/audio verification. Keep all four Arcadians pages together; do not report unexecuted, skipped or older-commit checks as success. CI playback evidence is not subjective listening QA.

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
