# StemLab

[![StemLab logo](https://raw.githubusercontent.com/kieransimkin/stemlab/v1.3.3/docs/branding/logo.png)](https://kieransimkin.co.uk/danceflow/)

By **[Kieran Simkin](https://kieransimkin.co.uk/)** · [DanceFlow ecosystem](https://kieransimkin.co.uk/danceflow/) · [Vector logo and usage guide](docs/branding/README.md).

Local music analysis for stems, timing, beats, harmony, lyrics, MIDI and loopable sections for Shorts. https://kieransimkin.co.uk/


<!-- mcp-name: io.github.kieransimkin/stemlab -->

> **StemLab by [Kieran Simkin](https://kieransimkin.co.uk/)** · [My Songs portfolio](https://kieransimkin.co.uk/my-songs/) · [Arcadians EPK](https://kieransimkin.co.uk/arcadians/) · [Source](https://github.com/kieransimkin/stemlab)

> **Packaging identity:** the canonical project name is **StemLab**. StemLab is part of the **Dance Flow** project. The PyPI distribution is named `danceflow-stemlab` solely because Python package-registry names are globally unique. The Python import, CLI, GitHub repository and container image remain `stemlab`.


## Agents and contributors

Agents using StemLab should inspect its available capabilities, use them fully where they fit the task, and look for useful improvements wherever possible. When a required feature is missing, or a reusable reliability, usability, performance or documentation gap is found, improve this tool rather than maintaining a separate workaround. If no worthwhile change is justified, explain why.

Submit every improvement as a pull request to [stemlab](https://github.com/kieransimkin/stemlab/pulls), with relevant tests, documentation and a reproducible example. Follow [CONTRIBUTING.md](CONTRIBUTING.md) and [AGENTS.md](AGENTS.md) for the contribution and validation workflow.

Project website: [https://kieransimkin.co.uk/danceflow/](https://kieransimkin.co.uk/danceflow/).

## Synopsis

**StemLab is a local, evidence-led music analysis toolkit that turns a master recording into inspectable stems, timing, structure, harmony, lyric and sonic evidence, then finds complete-bar loopable sections for Shorts and other short-form videos.**

It combines independent separation and music-information-retrieval routes rather than treating any single model as the answer. Results remain traceable through source hashes, manifests, JSON/TSV/NPZ artefacts, portable Sonic Visualiser sessions and a shared React timeline for playback and comparison. StemLab can run as a CLI, Python library, web service, container or local Codex MCP plugin. It is the music-understanding layer of Kieran Simkin's **DanceFlow** workflow and can supply downstream motion systems such as the WordPress **DanceMoves** plugin, while remaining useful on its own.

> **Model weights are not redistributed by this project.** They are fetched from their upstream registries/releases on first use. This avoids silently republishing checkpoints whose licensing may differ from the source code license, and lets upstream integrity metadata be used where available.

## DanceFlow and DanceMoves

DanceFlow is the wider BPM and motion-response workflow. **StemLab** is its
music-understanding layer; the WordPress **DanceMoves** plugin is a related
downstream motion-response component. StemLab has no WordPress dependency and
communicates through normal analysis artifacts and service APIs, so it remains
independently useful and reproducible.

See [docs/danceflow.md](docs/danceflow.md) for the component boundary.

StemLab's browser workspace imports the reusable
[`react-timeline-sequence`](https://www.npmjs.com/package/react-timeline-sequence)
control for audio playback, the shared playhead, seeking, zoom and generic
sequence lanes. StemLab retains the upload and analysis-specific adapters.

## Curated default model set (September 2026)

| StemLab id | Role | Outputs | Why it is included |
|---|---|---|---|
| `bs_roformer_sw` | high-capacity | vocals, drums, bass, guitar, piano, other (+ upstream instrumental) | Current production-oriented BS-RoFormer inference package recommends this six-stem checkpoint. |
| `mvsep_mega53` | high-capacity / broad taxonomy | 53 raw stems (discovered dynamically) | Extremely broad one-checkpoint stem inventory for later assessment. Upstream warns it is memory-heavy and recommends at least 16 GB VRAM. |
| `scnet_xl_ihf` | high-capacity | vocals, drums, bass, other | The MSST published checkpoint table reports a 10.08 dB average MUSDB test SDR and 9.92 dB Multisong average for this model. |
| `htdemucs_ft` | high-capacity established baseline | drums, bass, other, vocals | Fine-tuned HTDemucs remains a useful independent architecture/baseline rather than another RoFormer variant. |
| `openunmix_umxhq` | compact / low-latency candidate | vocals, drums, bass, other | Compact PyTorch/Open-Unmix baseline. StemLab runs `niter=0` to favour latency. “Realtime” is hardware- and buffer-dependent: benchmark it on the intended target. |

An optional `htdemucs_6s` model is registered for guitar/piano comparison but is not part of the default top-four group.

Relevant upstreams:

- https://github.com/openmirlab/bs-roformer-infer
- https://github.com/ZFTurbo/Music-Source-Separation-Training
- https://github.com/adefossez/demucs
- https://github.com/sigsep/open-unmix-pytorch

## Analysis performed

For every successful separator, **every WAV it emits** is retained. Stem names are discovered from files rather than truncated to a hard-coded four-stem schema, which is important for MVSep Mega 53. For the master and every stem, StemLab writes both a PNG spectrogram and compressed `.npz` spectrogram data (time axis, frequency axis, dB matrix, FFT metadata).

Full-resolution spectrogram evidence stays in the `.npz`; the PNG renderer is bounded to 8,192 time frames so long tracks cannot expand into multi-gigabyte Matplotlib RGBA buffers. If an older run retained the NPZ but failed while drawing the PNG, repair it in place without rerunning models:

```powershell
stemlab repair-spectrograms "path\to\analysis-results"
```

The preferred vocal stem is passed through the Silero VAD implementation bundled with `faster-whisper`. Speech regions are used to create a timeline-preserving `spoken_word.wav` (non-speech is zeroed rather than concatenated), then Whisper is run with word timestamps. Outputs include `whisper.json`, `speech_regions.json`, `transcript.txt`, `transcript.srt`, and `words.tsv`.

Whisper runs in repetition-safe mode by default (`condition_on_previous_text=False`) to prevent a repeated syllable in one window contaminating later windows. `whisper.json` records that setting and includes repeated-token diagnostics. Use `--whisper-condition-on-previous-text` only for an explicit comparison run; a flagged transcript remains evidence requiring section-wise recovery or listening QA, not a trustworthy lyric source.

Beat analysis runs:

- **BeatNet** in offline/DBN mode through StemLab's checksum-verified runtime bootstrap. StemLab uses the maintained `madmom-prebuilt` wheel and bypasses only BeatNet 1.1.3's obsolete NumPy/Numba package metadata.
- **Beat This!** using the `final0` checkpoint and its minimal postprocessor.
- **Beat Transformer**, using the original released model code/checkpoints. The model was trained on five demixed mel streams, so StemLab maps BS-RoFormer-SW to vocals, drums, bass, piano, and `other + guitar`, makes 128-bin mel-power spectrograms at the original 44.1 kHz / 4096 FFT / 1024-hop settings, and averages all eight released fold checkpoints by default. It uses the original madmom DBN decoder if madmom is importable, otherwise a documented SciPy peak-picking fallback.

Beat outputs are stored as JSON, TSV, and (for Beat Transformer) activation NPZ data.

StemLab also supports the official **Vamp Plugin Pack**, executed through
**Sonic Annotator**. The curated Vamp pass focuses on musically useful outputs:
Chordino chord transcription and harmonic-change likelihood; NNLS chroma and
bass chroma; Queen Mary key and tonal-change detection; concert-pitch tuning;
pYIN melody/F0 and monophonic note transcription on the preferred separated
vocal stem; Silvet polyphonic note transcription; Segmentino song-structure
segmentation; and the Queen Mary Vamp beat/bar tracker. Raw CSV, pinned
transform files, JSON, NPZ and plots are retained under `vamp/`, with the most
useful melody/harmony layers also embedded in the Sonic Visualiser session.

## Comprehensive sonic, harmonic, rhythmic and semantic analysis

StemLab 1.0 consolidates a higher-level evidence-fusion pass without discarding any of the
existing low-level outputs. The default deep pass now includes:

| Action | Evidence / model | Main output |
|---|---|---|
| Sonic profile | `pyloudnorm` BS.1770 + librosa DSP | LUFS, dynamics, true-peak estimate, timbre and stereo |
| Groove / meter | all successful beat grids + onset analysis | tempo stability, meter, swing, offbeat energy and quantisation error |
| Tempo regimes | beat-grid BIC models + fixed-grid residuals | stable sections, gradual ramps, abrupt changes, same-BPM phase skips and per-section precision |
| Harmony | Chordino + NNLS chroma + QM key/tuning | chord progression, harmonic rhythm, key evidence and tonal changes |
| Functional structure | All-In-One-Infer 3.1 | BPM, beats/downbeats and intro/verse/chorus/bridge/outro-style sections |
| Rhyme / prosody | CMU Pronouncing Dictionary + timing | rhyme scheme, internal rhyme, syllables, repetitions and delivery rate |
| Lyric semantics | SentenceTransformers | theme similarity, continuity and unsupervised line clusters |
| Song map | StemLab evidence fusion | section-level sonic/rhythm/chord/lyric summaries on one timeline |

Optional actions include **Basic Pitch** polyphonic MIDI/note transcription on isolated
instrument stems and **MuQ-MuLan** zero-shot audio/text semantics. MuQ-MuLan's released
weights are CC-BY-NC 4.0, so that route is deliberately opt-in and its licence is embedded
in every result. Embedding similarities are labelled as similarities, never probabilities.

Inspect the routes and their dependencies with:

```bash
stemlab analysis-actions
```

Useful switches include `--no-structure`, `--no-text-semantics`, `--audio-semantics`,
`--basic-pitch`, and `--all-in-one-embeddings`.

The derived artifacts live under `deep/` (`sonic/`, `rhythm/`, `harmony/`, `structure/`,
`lyrics/`, `semantic_text/`, optional `semantic_audio/` and `basic_pitch/`, plus
`song_map/song_map.json` and `summary.json`).

## Find DanceRudiments matching candidates from each stem

Install the separately maintained **optional** native package with
`python -m pip install -e ".[rudiments]"`. StemLab calls
[`dancerudiments.catalogue()` and `dancerudiments.sample()`](https://github.com/kieransimkin/DanceRudiments)
directly—no cloned movement functions or bundled catalogue. It extracts per-stem
RMS attack peaks, maps them onto detected beats, and ranks 16-beat windows
against position/speed/acceleration salience of actual native motion samples.
Scores are **comparative similarities**, not probabilities or guarantees of a good motion.

```sh
# Match the mix plus every saved stem without running separation again.
stemlab rudiments ./analysis-master --top 20
# Limit an existing analysis to two stems, or choose one of six official collections.
stemlab rudiments ./analysis-master --stem drums --stem bass --collection club
# Include matching as an opt-in part of a new full analysis.
stemlab analyze master.wav --output ./analysis-master --rudiments
# The bundled Arcadians MP3 has a documented BPM but no pre-separated stems.
stemlab rudiments 'examples/arcadians/Arcadians - 320kbps.mp3' \
  --bpm 145 --collection initial --top 28 --output ./arcadians-rudiments
```

### Measured Arcadians benchmark

The mix-only offline benchmark found **1,821** energy-rise peaks and **15 candidate
patterns at ≥0.68** similarity among the authentic 28-pattern DanceRudiments
initial collection, led by `groove_b_played` (0.739), `groove_b_grid` (0.737),
and `lfo_morph` (0.724). The benchmark read DanceRudiments' officially compiled
sample tables through an **offline adapter**; the native C++-extension test is
separate and skips when that optional package is not installed. The BPM grid
starts at zero with **unverified beat phase**. No stem separation was claimed.

These are **actual Chromium screenshots** of the measured local HTML report,
not schematic illustrations or captures of the main React timeline.

![Actual Arcadians audio attack peaks overlaid with a matching DanceRudiments motion descriptor in local report](docs/screenshots/arcadians-rudiments-report.png)

![Actual ranked Arcadians DanceRudiments candidate table captured in Chromium](docs/screenshots/arcadians-rudiments-ranked.png)

The analysis writes `deep/rudiments/report.json`, `index.html`, and `overview.png`.
See **[method, score caveats, provenance, examples and screenshot reproduction](docs/rudiments.md)**.

**Native CI coverage:** the main GitHub Actions `CI` workflow now has a dedicated
Python 3.10/3.11 job that installs the official DanceRudiments *binary wheel*,
requires the actual C++ module, and runs the Arcadians test with skipping disabled.
Fewer than **12 real-audio matches** fails CI; passing runs publish the JSON,
HTML and measured overlay PNG as downloadable CI artifacts. See the
[native CI validation instructions](docs/rudiments.md#native-github-actions-gate).

## Timeline analysis gallery

The browser workspace is intended to make the analysis output inspectable, not just downloadable. The illustrations below explain the main analysis families using the same shared timeline vocabulary as the frontend: one clock, one playhead, zoomable lanes, and consistent section alignment across spectrogram, beat, lyric and deep-analysis layers.

**Illustrations, not captured frontend screenshots.** These SVGs are generated by
`scripts/render_readme_analysis_gallery.py`; the script does not execute the React
timeline component, decode audio, run separation or perform neural inference.
Only the Arcadians section labels, lyric text/timing and reference BPM come from
the included artist-authored metadata. Other plotted patterns and example chord
labels are explicitly schematic, not measured results for Arcadians. In
particular, these pictures are not evidence of vocal-free cuts, measured tempo
stability, chord/key estimates or loudness values. Actual frontend captures remain
outstanding.

### 1. Separation, spectrograms, beats and sections

![Illustration: Arcadians reference sections and reference tempo above schematic spectrogram lanes](docs/screenshots/analysis-overview-arcadians.svg)

This is the core inspection view. It explains how StemLab lines up:

- the **AI / reference section map** (`deep/structure/` and `deep/song_map/`),
- the **beat and bar grid** from BeatNet, Beat This! and Beat Transformer (`beats/*.json`, `beats/*.tsv`),
- the **master spectrogram**, and
- each **stem spectrogram** written under `spectrograms/`.

In practice, this is the view you use first when checking whether a separator, beat model or section model has produced outputs that are musically believable.

### 2. Lyrics, speech regions and transcript QA

![Illustration: Arcadians canonical lyric timing and transcript analysis concepts](docs/screenshots/analysis-lyrics-arcadians.svg)

StemLab keeps lyric and speech analysis on the same clock as the audio:

- **reference lyric timing** from a known-correct LRC or JSON source,
- **Whisper word timing** from the preferred vocal stem,
- **speech-region / VAD evidence** indicating detected speech activity; this alone does not establish the absence of singing,
- the derived `spoken_word.wav` timeline-preserving speech isolate, and
- downstream rhyme, prosody and repetition-safety diagnostics under `speech/` and `deep/lyrics/`.

The important idea is that you can compare what the model heard against what the artist supplied, then immediately relate both to loop boundaries, choreography cues or lyric-sheet QA.

### 3. Harmony, melody and song-map fusion

![Illustration: schematic harmony and song-map concepts, not Arcadians analysis](docs/screenshots/analysis-harmony-songmap.svg)

StemLab's harmonic and structural analysis is wider than a single chord track. The harmony/song-map family brings together:

- **chord and harmonic-change evidence** from the curated Vamp pass,
- **key, tonal-change and tuning outputs**,
- **melody / F0 style lanes** derived from vocal analysis,
- the **section-level song map** that fuses structure, rhythm, harmony and lyric evidence into one readable narrative.

These outputs live primarily under `vamp/`, `deep/harmony/` and `deep/song_map/`, and they are the layer that makes the raw low-level DSP outputs easier to interpret in musical terms.

### 4. Sonic profile, rhythm regimes and semantics

![Illustration: sonic, rhythm and semantic analysis categories without measured values](docs/screenshots/analysis-sonic-rhythm.svg)

The higher-level deep pass also tracks how a song feels over time:

- **sonic profile** summaries (loudness, peaks, dynamics, timbre and stereo behaviour),
- **groove / rhythmic metrics** such as swing tendency, offbeat energy and quantisation error,
- **tempo-regime detection** for stable regions, ramps and abrupt changes,
- **semantic summaries** from lyric/text analysis and, optionally, zero-shot audio semantics.

This is the analysis family that turns StemLab from a simple BPM-and-stems tool into a richer musical understanding layer for DanceFlow and downstream motion-response systems.

### 5. Where loops fit in

The loop-discovery patch does not replace the earlier analyses; it depends on them. Loop selection uses:

- **section labels** to find candidate verse and chorus spans,
- the **beat grid** to align cuts to complete bars,
- **full-vocal stem and available timing evidence** to avoid detected vocalisations; VAD alone is insufficient,
- and **waveform seam checks** to reduce discontinuities; accepted joins still need listening checks.

That means the loop lane is best understood as an *applied synthesis* of the structure, rhythm and vocal analyses already present in StemLab.

## Loop discovery and playback

StemLab now attempts at least one complete-bar loop for every identified verse
and chorus occurrence. It checks the beat grid, vocal-clear cut neighborhoods
and every audio channel's waveform seam. Unsafe or unsupported sections are
reported rather than forced. Start/end sample frames, quality diagnostics and
provenance are written to `deep/loops/loops.json` and `loops.tsv` by default.

```bash
# New analysis: loop metadata is included in the default deep pass.
stemlab analyze master.wav -o analysis-master --profile practical

# Also save exact native-rate WAV slices.
stemlab analyze master.wav -o analysis-master --profile practical --export-loops

# Reuse existing separation, structure and beat results; no models rerun.
stemlab loops analysis-master --export-loops

# Keep all candidates within a chosen short-video edit budget, in seconds.
stemlab loops analysis-master --max-seconds 30 --per-section 3

# Audition possible new cut pairs anywhere in the song, even where the passage
# does not already repeat. These near-misses are NOT accepted seamless loops.
stemlab loops analysis-master --mode exploratory --search-scope whole_song \
  --max-seconds 30 --per-section 20 --exploratory-algorithm spectral_context
```

In the existing analysis frontend, choose a highlighted loop region or the Loop
selector, tick **Enable loop**, then press **Play**. The same playhead, seeking,
zoom and spectrogram timeline remain in use. Previewing a loop does not require
exported WAVs and writes no files. **Zoom to loop** focuses the shared timeline.

See [the complete loop workflow](docs/loops.md) for installation of both patches,
sample indexing, thresholds, limitations and reproducible screenshot examples.

![Loop selection and playback in the existing analysis frontend](docs/screenshots/loops-playing.png)

## Audio-to-MIDI model comparison

MIDI extraction is an **optional, independent model pass**. It adds Transkun V2
and high-resolution note/pedal piano transcription, plus MR-MT3 and YourMT3
multi-instrument transcription, alongside Spotify Basic Pitch. Automatic source
selection uses piano/keyboard stems for the piano specialists, pitched stems for
Basic Pitch and the mix for MT3-family models. Missing stems are reported, never
silently substituted. The legacy `--basic-pitch` command remains supported.

```bash
# Install the chosen runtime; the standard profiles do not install MIDI models.
python -m pip install -e ".[midi-transkun]"
stemlab midi-models

# Use an existing separated piano, without rerunning any earlier analysis.
stemlab midi analysis-master --model transkun

# Or transcribe a directly supplied piano recording to a new folder.
stemlab midi piano.wav -o midi-piano --model transkun

# Full mix comparison requires the separately installed midi-mt3 extra.
# Both requested checkpoints need explicit first-use download consent.
stemlab midi mix.wav -o midi-comparison --model mr_mt3 --model yourmt3 --allow-model-downloads
```

Each model/source gets its original `.mid`, tempo-aware `notes.json` and
`notes.csv`, an optional real note `piano-roll.png`, source/checkpoint hashes,
package versions and a worker log. Native MIDI controllers, pitch bends, tempo
changes and drums are preserved. Note sample numbers are original-rate
**estimates**, not a claim that the transcription is sample-accurate ground truth.
The MIDI clock is not used to overwrite StemLab's measured beat grid.

New analyses can opt in with repeated `--midi-model` switches and
`--midi-allow-downloads`. Existing Codex installations gain a workspace-scoped
`stemlab_start_midi_scan` job tool after updating the Python installation and
restarting the session. Models remain optional and no Python dependencies are
automatically installed. Incompatible research runtimes can use separate
`--backend-python MODEL=PATH` interpreters.

See [the MIDI guide](docs/midi.md) for all models, installation choices, checkpoint
and licensing caveats, saved-stem targeting, Codex usage, exact output semantics,
real-inference smoke commands and test limitations. The React timeline remains
the analysis inspector; this patch adds no MIDI synthesizer or new interactive
piano-roll lane. Static note plots are not frontend screenshots.

## Align timed musical cues to detected beats

Use saved analysis to snap an LRC cue file without rerunning models or editing audio:

```bash
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-review
stemlab snap-cues analysis-master "musical cues.lrc" -o cue-review-100ms --tolerance-ms 100
stemlab generate-cues analysis-master -o generated-cues --title "Song title"
```

Only timestamps change: bracketed labels such as `[DROP: CHORUS 1]`, metadata,
encoding and line layout are preserved. A cue with **no detected beat within
±150 ms** is highlighted as **REVIEW**, with its nearest-beat gap, and kept unchanged
by default. `--force-snap` moves distant cues too but retains their warnings.
`--downbeats` restricts targets to reported bar starts; `--beat-model` selects a
specific detector. No constant-tempo beats are invented to fill detection gaps.

Each new output folder contains the rewritten `.beat-snapped.lrc`, `report.json`,
a colour-coded `review.html`, and `review.txt`. Exact mode preserves the stored
beat timestamp; explicit millisecond/centisecond compatibility modes report
rounding. Source-rate sample-frame estimates are included when the rate is known.
Use `--fail-on-review` to write results and exit 2 when review is needed.
Generated section-cue files use a title-specific, WordPress-safe filename so
multiple releases can be uploaded and mapped without ambiguous duplicate names.
For the retained 3 October 2026 future-release batch,
`scripts/run-upcoming-full-cues.ps1` resumes full analyses without overwriting an
incomplete directory, and `scripts/summarize-upcoming-cues.ps1` reads each closed
manifest/report to produce one reproducible hash, cue-action and error-count row
per release. The summary script refuses missing or ambiguous generated LRCs.

For a new analysis, add `--snap-cues "musical cues.lrc"` and optionally
`--cue-tolerance-ms 100`. Cue alignment uses that run's detected events and appears
in `analysis.json`. See [the cue alignment guide](docs/cue-alignment.md) for exact
precision, offsets, all switches, safety rules and interpretation of warnings.

## Complementary evidence models

StemLab now has an optional **evidence-model layer** for models that add a different
kind of musical evidence instead of duplicating the normal separation or MIDI
backends. Nothing in this layer is enabled by a normal profile.

```bash
stemlab evidence-models

# Singing/speech/music activity + continuous pitch on saved vocals.
stemlab evidence analysis-master -o evidence-vocals \
  --model firered_aed --model swift_f0 \
  --model-path firered_aed=/models/FireRedVAD/AED

# Align approved lyrics without replacing them.
stemlab evidence analysis-master -o evidence-align \
  --model qwen_forced_aligner --canonical-text lyrics.txt --allow-model-downloads

# Independent harmony evidence.
stemlab evidence analysis-master -o evidence-chords --model lv_chordia
```

The built-in registry covers **FireRed AED**, **HeartTranscriptor**, **Qwen3
ForcedAligner**, **SwiftF0**, **SongFormer**, **lv-chordia** and **ADTOF PyTorch**.
It also exposes explicit external-runtime bridges for **GAME**, **SheetSage2**,
**MOSS-Music** and **AudioSep** so large or restricted research dependencies never
get silently bundled into StemLab. Outputs stay independent: singing activity,
forced alignment, pitch, structure, chords and drum hits are review evidence, not
a hidden combined ground-truth score.

Saved analyses automatically route vocal models to a preferred full vocal stem,
drum transcription to a drum stem, continuous pitch to pitched stems, and
structure/harmony models to the master. Missing specialist stems are reported.
Use `--backend-python MODEL=/path/to/python` for conflicting research environments.

See [the evidence-model guide](docs/evidence-models.md) for model terms, routing,
external bridges and interpretation rules. `scripts/benchmark_evidence_corpus.py`
probes an authorised evaluation collection without copying audio into the repo.

## Install

Python 3.11 is recommended for the broad optional-model ecosystem. The `beats` and `all` extras install Beat This! plus the compatible `madmom-prebuilt` decoder. BeatNet 1.1.3 itself still publishes obsolete NumPy/Numba dependency pins, so StemLab downloads its official pure-Python wheel separately, verifies the published SHA-256, and exposes only the BeatNet code and bundled model weights from its cache. This route is supported on Python 3.11-3.13; a missing BeatNet result must not be mistaken for a successful detector run.

From PyPI, install the released StemLab distribution with:

```bash
pip install danceflow-stemlab
```

The installed Python package and command remain `stemlab`. For development from a source checkout:

```bash
python -m venv .venv
. .venv/bin/activate              # Windows: .venv\Scripts\activate
python -m pip install -U pip
pip install -e ".[all]"
```

SCNet and Beat Transformer are research repositories rather than stable pip inference APIs. They are isolated/downloaded on demand. To prepare everything in advance:

```bash
stemlab bootstrap all
```

For BeatNet alone:

```bash
pip install "danceflow-stemlab[beats]"
stemlab bootstrap beatnet
stemlab doctor
```

`stemlab doctor` reports BeatNet as ready only when the normal package or the
verified StemLab cache can actually be found. `analyze --no-bootstrap` never
downloads BeatNet and records the unavailable backend instead.

For only the Vamp analysis stack:

```bash
stemlab bootstrap vamp
```

`bootstrap vamp` downloads the pinned Sonic Annotator runtime and launches the
official Vamp Plugin Pack installer. Complete the installer once, then rerun the
command if needed to verify that the requested plugin outputs are visible.

## CLI

Full requested analysis:

```bash
stemlab analyze master.wav --output ./analysis-master --profile full --device auto
```

Useful alternatives:

```bash
# Skip the 53-stem model for a materially lighter run
stemlab analyze master.wav -o ./analysis-master --profile practical

# Run only selected separators
stemlab analyze master.wav -o ./analysis-master \
  --model bs_roformer_sw --model scnet_xl_ihf --model openunmix_umxhq

# Fail immediately rather than recording a backend failure and continuing
stemlab analyze master.wav -o ./analysis-master --strict

# Skip Vamp if the plugin pack is intentionally not installed
stemlab analyze master.wav -o ./analysis-master --no-vamp

stemlab models
stemlab doctor
```

By default model weights and external research code are cached outside the output folder; all **generated analysis artifacts and datasets** are written inside the output folder. The copied master is also placed in `input/` so the Sonic Visualiser session is portable as one directory.

## Output layout

```text
analysis-master/
  input/master.wav
  stems/
    bs_roformer_sw/*.wav
    mvsep_mega53/*.wav
    scnet_xl_ihf/*.wav
    htdemucs_ft/*.wav
    openunmix_umxhq/*.wav
  spectrograms/
    master.png
    master.npz
    <model>/<stem>.png
    <model>/<stem>.npz
    speech/spoken_word.png
    speech/spoken_word.npz
  speech/
    spoken_word.wav
    speech_regions.json
    whisper.json
    transcript.txt
    transcript.srt
    words.tsv
  beats/
    beatnet.json / beatnet.tsv
    beat_this.json / beat_this.tsv
    beat_transformer.json / beat_transformer.tsv
    beat_transformer_activations.npz
  vamp/
    report.json
    transforms/*.n3
    raw/*.csv
    data/*.json
    data/*.npz
    plots/*.png
  deep/
    sonic/
    rhythm/
    harmony/
    structure/
    lyrics/
    semantic_text/
    song_map/
    rudiments/             # optional native DanceRudiments candidate report
      report.json
      index.html
      overview.png
    summary.json
  sonic_visualiser/
    session.sv
    session.xml
    open_sonic_visualiser.bat
    open_sonic_visualiser.sh
  analysis.json
  manifest.json
```

`session.sv` is genuine Sonic Visualiser bzip2-compressed session XML. It contains a master pane with beat/downbeat/Whisper time-instant layers and one synchronized waveform + Sonic Visualiser spectrogram pane for every separated stem. The uncompressed `session.xml` is retained for inspection/debugging. The Windows `.bat` looks on `PATH` and in the usual Program Files locations.

## Web service

StemLab includes an upload/timeline web UI plus HTTP and Socket.IO APIs for
content-addressed analysis jobs. See [docs/web.md](docs/web.md) for launchers,
endpoints, events and the Arcadians reference workflow.

## Documentation

- [DanceFlow workflow and DanceMoves relationship](docs/danceflow.md)
- [Web service](docs/web.md)
- [Containers](docs/containers.md)
- [Publishing and releases](docs/publishing.md)
- [BeatNet compatibility](docs/beatnet.md)
- [Changelog](CHANGELOG.md)

## Codex plugin and MCP server

**Inspect through the real React timeline first.** The Codex plugin now exposes
`stemlab_open_timeline` to serve saved results in StemLab's bundled
`react-timeline-sequence` frontend. Use an available local browser to compare
waveform, spectrogram, beat and section lanes, select/enable loops, zoom and audition
the repeat. Exact JSON reports support numerical claims; saved PNGs are a fallback
when browser access is unavailable. Screenshots must come from the rendered
component, never a redraw. `stemlab_close_timeline` closes the private, read-only
viewer without changing results. See [the inspection workflow](docs/codex-plugin.md#preferred-inspection-existing-react-timeline).

Use StemLab from Codex to analyse timing, inspect real evidence and find/export
loopable music sections for Shorts videos. This is a local stdio MCP server plus
an installable skill bundle, not a remote audio-upload service or a video editor.
It reuses the existing pipeline and preserves prior result folders.

```bash
# From this patched checkout, in an activated environment:
python -m pip install -e ".[codex]"
stemlab-codex configure --workspace "/absolute/path/to/music-workspace"
stemlab-codex doctor
codex plugin marketplace add .
```

Install StemLab from the local plugin directory on a supported Codex host; for
CLI-only use, register the MCP command directly. See [setup and tools](docs/codex-plugin.md)
for Windows paths, model extras, consent, polling and exact sample conventions.

Release builds validate the MCP integration and attach a versioned plugin ZIP,
checksums and MCP Registry metadata to the GitHub release. A release-only
`codex-plugins` branch provides a marketplace channel after PyPI publication.
This does **not** automatically submit to OpenAI's public Plugins Directory.
[Distribution and optional MCP Registry publishing](docs/codex-publishing.md)
explains the separate channels and approval requirements.

## Codex skill

The repository includes a reusable Codex skill at
[`skills/use-and-improve-stemlab`](skills/use-and-improve-stemlab/SKILL.md).
It makes StemLab the default analysis engine, selects a proportionate profile,
preserves evidence boundaries, and routes reusable capability gaps back into
StemLab with tests instead of creating an undocumented parallel stack.

## Python API

```python
from pathlib import Path
from stemlab.models import FULL_PROFILE
from stemlab.pipeline import run_pipeline
from stemlab.types import PipelineConfig

result = run_pipeline(PipelineConfig(
    input_wav=Path("master.wav"),
    output_dir=Path("analysis-master"),
    models=FULL_PROFILE,
    device="auto",
))
```

## External runtime/cache details

The BS-RoFormer adapter uses `bs-roformer-infer`, which manages its own checkpoint registry and SHA-256 verification. SCNet is pinned to the v1.0.15 `SCNet XL IHF` release asset URLs; StemLab records computed hashes after download. Beat Transformer is cloned from its original upstream and consumes the released fold checkpoints from that repository. Set `STEMLAB_CACHE=/some/path` to relocate StemLab's external cache.

The full run is intentionally expensive. Mega-53 is the dominant VRAM/storage pass and dozens of stems mean dozens of additional spectrogram files and Sonic Visualiser panes. Use `--profile practical` while iterating and `--profile full` for exhaustive analysis.

## Releases

Version tags publish StemLab to GitHub Releases, PyPI (`danceflow-stemlab`),
GHCR and Docker Hub after validation. See
[docs/publishing.md](docs/publishing.md) for the release contract and Trusted
Publishing setup.

## Reproducibility and licensing

`analysis.json` records model/backend metadata and errors; `manifest.json` hashes every output artifact. Model checkpoints, research code and datasets retain their upstream terms. In particular, do not assume that an MIT-licensed inference wrapper automatically grants redistribution rights for every checkpoint it can download.
