# DanceRudiments matching — audio stem peaks → candidate motion patterns

StemLab can rank candidate DanceRudiments rhythmic motions against short time windows of the **original mix and each separated stem**. This is an opt-in feature requiring the independently maintained [`dancerudiments`](https://github.com/kieransimkin/DanceRudiments) package. It uses DanceRudiments' **actual C++ `catalogue()` / `sample(name, integer_pip)`** calls. StemLab contains **no motion-pattern copies, reimplementation of the movement functions, nor baked pattern catalogue**.

```sh
python -m pip install -e '.[rudiments]'
# On a full StemLab analysis: existing separation/beat outputs are reused.
stemlab rudiments ./analysis-arcadians --top 20
# No stems available? Analyse the artist-bundled Arcadians MP3 as a MIX ONLY:
stemlab rudiments 'examples/arcadians/Arcadians - 320kbps.mp3' \
  --bpm 145 --output ./arcadians-rudiments --collection initial --top 28
# Add candidate matching to an ordinary run (off by default).
stemlab analyze input.wav -o ./analysis --profile practical --rudiments
```

Windows users can substitute the normal Windows quoting/line continuation syntax. First install the optional extra into the same environment that runs `stemlab`.

## Interpretation and methodology

1. StemLab decodes each WAV/MP3 from disk in blocks, finds significant **positive rises in RMS energy** (attacks), and retains their times and relative prominence. This is not a raw sample-max detector, which would wrongly treat every oscillation of a bass note as a new rhythmic event. Source audio is never modified.
2. Reuse the saved consensus/preferred detected-beat timestamps, with per-beat interpolation to preserve local tempo. Without existing detectors a caller may supply `--bpm` and optionally `--first-beat-seconds`; the resulting regular grid is labelled `explicit_bpm_unverified_phase` and is **not artist-verified downbeat alignment**. If no valid grid exists, matching fails with actionable guidance; it does not invent one.
3. Use DanceRudiments' native catalogue and C++ sampler at integer positions on its documented 64-pip-per-beat grid. For each motion, derive three *descriptors* of that **native sampled shape**: absolute position excursion, speed, and change in velocity (turn/acceleration). These descriptors, not a Python replacement for movement playback, are what we match to musical attacks.
4. For each 16-beat window (every four beats), and phase shifts spaced at quarter-beat granularity over at most four beats, compute a centred normalized correlation of the stem's attack salience with each motion descriptor. Keep the best descriptor/window/phase for each pattern and source. `similarity=(correlation+1)/2` is in [0,1] and is **only a descriptive ranking**, not a probability or calibrated confidence; searching many windows and rotations creates incidental coincidences. The default filter is 0.68. Motion periods longer than 16 beats, near-constant and unsupported signals are reported as skipped rather than silently truncated.
5. Multiple independent separated stems are **compared** via the fraction of quantized peak bins supported by two or more stems. The mix is never counted as an independent stem vote. StemLab also ranks an explicit **cross-stem consensus curve**, favouring peaks supported by two or more independent stems without assuming equal recording gains. The report contains top matching patterns for each stem and the consensus, each with its own evidence window. A matching pattern is a *candidate for audition/visual testing*, not proof that the song uses that rhythm or that the motion will look good.

`--collection` can restrict evaluation to `initial`, `expansion`, `atlas`, `continuum`, `club`, or `dancefloor`, selected from DanceRudiments' **own** compiled packs; the default evaluates the complete published native catalogue. `--max-patterns 0` means no cap; a positive cap processes the first N catalogue items sorted by identifier. `--top` bounds result size per stem. `--stem drums --stem bass` restricts a saved analysis; otherwise every available saved stem and the master are included. Avoid interpreting different model outputs of the *same physical source* as independent scientific evidence.

## Outputs

```text
analysis-results/deep/rudiments/
    report.json     # metadata, scores, matched time/beat windows per source
    index.html      # local, read-only report; no JavaScript/network assets
    overview.png    # real measured attacks overlaid with C++-sampled motion salience
```

Running directly on an audio file writes those three artifacts into `--output`. The same path appears in the deep-analysis action registry and `deep/summary.json` when `stemlab analyze --rudiments` is used. Failures in the optional stage are recorded in the existing deep-analysis errors, not mistaken for a completed match.

## Arcadians reproducible validation

The repository includes an artist-owned, SHA-256 identified 320 kbps Arcadians MP3. The artist-authored tempo is **145 BPM**. It is **not** accompanied by a verified beat-phase annotation or a previously generated set of separated stems. Thus the standalone demonstration runs on **the mix**, with a regular unverified-phase grid.

Measured in an offline development benchmark using DanceRudiments' authentic **compiled initial collection (28 patterns)** and its exact exported sample values (not an installed C++ runtime), the audio yielded:

- **1,821** onset/energy-rise peaks;
- **15** candidates at the default 0.68 similarity filter, out of 28 patterns;
- Top patterns: `groove_b_played` (0.739), `groove_b_grid` (0.737), `lfo_morph` (0.724), `lfo_soft_gate` (0.711), `groove_a_grid` (0.705).

These benchmark numbers are observations using the **offline adapter**, not claims that native `dancerudiments` was installed/tested in that offline runner. The normal test suite still skips the native-only test when the optional package is missing; the dedicated CI job below turns this into a **hard failure** rather than silently skipping it.

### Native GitHub Actions gate

The **`CI` → `native rudiments`** matrix jobs (Python 3.10 and 3.11, Linux) independently install StemLab with `.[dev,rudiments]`, requesting a *released native wheel* (no DanceRudiments source-build fallback). Each job:

1. Requires that `dancerudiments` is a real C++ extension exposing 64 pips per beat, that the separate official `dancerudiments_authoring` package is importable, and that all 28 initial-collection patterns are present in the native catalogue.
2. Sets `STEMLAB_REQUIRE_NATIVE_RUDIMENTS=1` and runs both synthetic regression tests and `test_arcadians_rudiments.py`. In this mode import errors **fail the test** instead of calling `pytest.importorskip`; the bundled MP3's SHA-256 is verified, along with >=1,000 measured peaks, >=12 distinct matching patterns and a top score >=0.68.
3. Exercises the *public `stemlab rudiments` CLI* on the real bundled MP3, checks the saved JSON against the same candidate floor, and saves the measured `report.json`, `index.html`, and `overview.png` as a GitHub Actions artifact. The measured counts appear in the job summary.

This job is part of the **main CI workflow**, not a separate optional check. The ordinary StemLab installation remains independent of DanceRudiments.

Reproduce locally from the repository root:

```sh
python -m pip install --only-binary=dancerudiments -e '.[dev,rudiments]'
STEMLAB_REQUIRE_NATIVE_RUDIMENTS=1 python -m pytest -v -s \
  tests/test_rudiment_matches.py tests/test_arcadians_rudiments.py
```

In PowerShell, set `$env:STEMLAB_REQUIRE_NATIVE_RUDIMENTS = '1'` before running `python -m pytest ...`.


The README images are **actual Chromium screenshots** from the local HTML report generated by the offline Arcadians benchmark, not illustrations, synthetic audio, or screenshots of the main React timeline. They show measured mix transients and authentic compiled DanceRudiments data. To reproduce screenshots once the dependency is installed:

```sh
stemlab rudiments 'examples/arcadians/Arcadians - 320kbps.mp3' \
  --bpm 145 --collection initial --top 28 --output ./arcadians-rudiments
python scripts/capture_rudiment_report.py ./arcadians-rudiments \
  --output docs/screenshots --chromium /usr/bin/chromium
```

Set `--chromium` to the Chrome/Chromium binary on your platform, or omit it if Chromium is already installed and locatable. This screenshot utility is optional, and does not alter analysis products.

## Licensing / caveats

- StemLab has no DanceRudiments runtime requirement unless explicitly installed with the extra. The separate package defines its own native/pack licensing and third-party notices, which still apply when a pattern is suggested. Nothing is vendored here.
- 16-beat correlation windows may miss multi-bar, polyrhythmic, or long-evolving motions. High scores are not causal evidence or guarantees of aesthetic compatibility. Analyse predicted matches visually/listen to the isolated stem.
- An offline Arcadians benchmark can check the mix without GPU/weights, but actual **per-stem** results require user-provided stems or a previous successful separator run.
