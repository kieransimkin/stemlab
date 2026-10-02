# Audio-to-MIDI extraction

StemLab by [Kieran Simkin](https://kieransimkin.co.uk/) ·
[My Songs](https://kieransimkin.co.uk/my-songs/) · part of DanceFlow.

This optional pass transcribes audio into **estimated note performances**. It
reuses the original master or saved separator outputs; it does not rerun source
separation just to produce MIDI. The new registry includes four additional model
routes and exposes the existing Basic Pitch model through the same interface.

## Models and appropriate inputs

| CLI model | Implementation | Automatic target in a saved analysis | Install extra |
| --- | --- | --- | --- |
| `basic_pitch` | Spotify Basic Pitch / ICASSP 2022 | Pitched stems, such as guitar, bass, piano and vocals | `midi,amt` |
| `piano_transcription` | High-resolution piano transcription with pedals, via `piano-transcription-inference==0.0.6` | Piano/keyboard stems | `midi-piano` |
| `transkun` | Transkun V2 packaged No Pedal Extension checkpoint, `transkun==2.0.1` | Piano/keyboard stems | `midi-transkun` |
| `mr_mt3` | MR-MT3, via `mt3-infer[torch]==0.2.0` | Full mix | `midi-mt3` |
| `yourmt3` | YourMT3 YPTF.MoE+Multi noPS, via the same wrapper | Full mix | `midi-mt3` |

Basic Pitch supports polyphonic pitched instruments and pitch bends, but its
upstream recommends one instrument at a time. The piano models are not generic
full-band transcribers. MT3-family models predict instrument-labelled MIDI parts,
including drums; these parts **are not newly separated audio stems**. Model
accuracy, instrument identity, velocity and note endings need musical review.

Everything here is **opt-in**. The normal analysis profiles, the `all` extra and
the old `--basic-pitch` route are unchanged. No model code, checkpoint, audio or
MIDI soundfont is copied into the StemLab distribution.

## Install only the backends needed

From the patched checkout, using its Python environment:

```bash
# Common MIDI parsing, export metadata and worker supervision only; no models.
python -m pip install -e ".[midi]"
stemlab midi-models

# Choose one or more appropriate extras (not all are mutually compatible).
python -m pip install -e ".[midi,amt]"
python -m pip install -e ".[midi-transkun]"
python -m pip install -e ".[midi-piano]"
python -m pip install -e ".[midi-mt3]"
```

These are separate installation choices, not a command sequence that every user
should run. Basic Pitch's retained `amt` extra is guarded to Python <3.12;
use Python 3.10/3.11 for that model. The high-resolution piano package is a legacy
research runtime. For dependency conflicts use separate backend environments,
not a global downgrade of StemLab's Torch, NumPy or librosa stack. Extras declare
the integration targets; they are **not a tested cross-platform lockfile**.

`stemlab midi-models` lists the registry and whether each Python module is
present. Presence does not prove that weights, GPU drivers or native extensions
can load. Missing packages are reported, never installed automatically.

## Transcribe one audio file

```bash
# Solo piano: weights are included with the installed Transkun package.
stemlab midi piano.wav -o midi-piano --model transkun

# Polyphonic multi-instrument mix: download the selected checkpoint on first use.
stemlab midi song.wav -o midi-song --model yourmt3 --allow-model-downloads

# Compare independent model predictions; output folders are kept separate.
stemlab midi song.wav -o midi-comparison --model mr_mt3 --model yourmt3 --allow-model-downloads

# An isolated guitar stem, with no second separation pass.
stemlab midi guitar.wav -o midi-guitar --model basic_pitch --device cpu
```

For a directly supplied audio file, `auto` intentionally gives that file to
**every selected model**. Select a piano recording/stem for a piano model. WAV
or FLAC is preferred; other formats depend on the installed audio decoder.
An explicit `-o` is required for a single audio file.

No source resampling is saved: only model input arrays are resampled as required
by the selected model. Note metadata is mapped back to the input's native sample
rate. There is no time stretching, silence removal or beat quantisation.

## Reuse existing StemLab results

```bash
# Auto: Basic Pitch receives pitched stems; Transkun receives piano stems;
# YourMT3 receives the mix. No separator/beat/lyric model is rerun.
stemlab midi analysis-master --model basic_pitch --model transkun --model yourmt3 --allow-model-downloads

# Piano model comparison, from the existing separated piano.
stemlab midi analysis-master -o midi-piano-comparison --model transkun --model piano_transcription --allow-model-downloads

# Limit a stem-based pass to named instruments.
stemlab midi analysis-master -o midi-guitar-bass --model basic_pitch --stem guitar --stem bass

# Override the automatic mix target for a multitrack model.
stemlab midi analysis-master -o midi-stems --model yourmt3 --target stems --max-stems 4 --allow-model-downloads
```

The default destination for a saved result folder is `RESULTS/deep/midi`. Use a
new `-o` for repeat runs. Nonempty destinations are refused, so successful older
extractions cannot be confused with new failures. Existing reports and audio are
not rewritten. A nested `manifest.json` covers the new extraction; a standalone
rescan does **not** rewrite the old analysis's top-level manifest.

`auto` chooses up to six suitable, distinct stem names per model, preferring
BS-RoFormer, SCNet and Demucs outputs over later duplicates. Speech-gated
`spoken_word` is not a full vocal performance and is not selected. Piano models
select piano/keyboard names only; Basic Pitch excludes drums. An unavailable
matching stem becomes a **reported skip**, not an unnoticed fallback to the mix.
Use `--target master` only as an explicit override. `--stem` cannot be combined
with `--target master`.

Saved manifests must refer to existing files inside their result folder; external
paths and escaping symlinks are refused. The copied master's SHA-256 must match
`analysis.json`. An externally supplied file is the supported route for audio
outside a saved analysis folder.

## Include MIDI in a new full analysis

```bash
stemlab analyze master.wav -o analysis-master --profile practical --midi-model basic_pitch --midi-model transkun

stemlab analyze master.wav -o analysis-master --profile practical --midi-model yourmt3 --midi-allow-downloads
```

`--midi-model` may be repeated. `--midi-target auto|master|stems` overrides source
selection. MIDI runs after the existing deep-analysis passes and appears in
`deep/summary.json` and `analysis.json`. Individual MIDI errors and missing-source
skips propagate into the deep diagnostics; `--strict` aborts on a failed request.

MIDI requires deep analysis. Requesting it with `--no-deep-analysis`, or requesting
Basic Pitch simultaneously through `--basic-pitch` and `--midi-model basic_pitch`,
is rejected before the pipeline starts. The MIDI-specific download flag controls
only this new pass; existing separation and other analysis download behaviour is
not changed by this patch.

The standalone `midi` command supports the fuller timeout, checkpoint, plotting
and per-model Python options below. Run separation once, then use that command
for environment-specific transcription work.

## Isolate conflicting model environments

Every model/source pair runs in a subprocess; model frameworks are not imported
by registry listing or into the main analysis worker. Install each model's
runtime in a suitable environment, then specify that environment's **Python
executable**, not its activation script or a shell command.

For example, install the parent MIDI infrastructure into StemLab's environment,
and provision separate virtual environments manually:

```bash
python -m venv .venv-basic
.venv-basic/bin/python -m pip install "basic-pitch>=0.4,<0.5" soundfile librosa platformdirs

python -m venv .venv-transkun
.venv-transkun/bin/python -m pip install "transkun==2.0.1" "setuptools<81" soundfile librosa platformdirs

# From the main StemLab environment:
stemlab midi analysis-master -o midi-isolated --model basic_pitch --model transkun --backend-python basic_pitch=.venv-basic/bin/python --backend-python transkun=.venv-transkun/bin/python
```

Create the Basic Pitch environment with Python 3.10/3.11. On Windows use
`.venv-basic\Scripts\python.exe` and `.venv-transkun\Scripts\python.exe`.
Quote the whole `MODEL=PATH` argument when its path contains spaces. Overrides
are validated and resolved before changing the worker's current directory.
The worker uses the patched adapter code with the dependencies from that
interpreter; it does not require a second StemLab installation there.

CPU and CUDA are supported by the PyTorch adapters. `auto` chooses CUDA when
available, otherwise CPU; an explicitly unavailable CUDA device is an error.
MPS is currently rejected. Basic Pitch selects its own runtime; choose `auto`
or `cpu`, not an explicit CUDA target for a mixed request containing Basic Pitch.

`--timeout 1800` is the default limit **per model and source**, not the entire
comparison. Workers run sequentially to avoid holding all model weights in GPU
memory at once. A timeout kills the owned worker tree. Logs are captured per
input and limited to 64 MiB. Subprocesses provide dependency/failure isolation,
**not a security sandbox for untrusted packages or checkpoints**.

## Checkpoint downloads, caching and trust

By default the pass will not download missing standalone checkpoints. Basic
Pitch and Transkun use weights bundled with their installed upstream packages;
installing those packages is itself a separate download action.

With `--allow-model-downloads` (or `--midi-allow-downloads` in `analyze`), MR-MT3
and YourMT3 are fetched from their original Hugging Face locations and verified
against SHA-256 values recorded in the wrapper's published checkpoint registry.
The high-resolution piano model comes from the depositor's Zenodo record; the
published checksum is checked before a local SHA-256 receipt is written.
Downloads are bounded and atomically published. A corrupt cached file causes an
error and is not silently overwritten. The cache is `midi/` below `STEMLAB_CACHE`,
or the platform's StemLab user cache when that variable is unset.

The adapter disables mt3-infer's implicit downloader and uses an explicit model
name. It rejects a truncated piano checkpoint **before** that older wrapper can
invoke its implicit `wget`. These controls govern the known adapter paths; use
an OS network policy as well when a fully network-isolated runtime is required.

Already provisioned, trusted weights can be supplied explicitly:

```bash
stemlab midi mix.wav -o midi-local --model mr_mt3 --checkpoint "mr_mt3=/models/mr-mt3/mt3.pth"

# Custom Transkun weights must be paired with their matching model config.
stemlab midi piano.wav -o midi-custom --model transkun --checkpoint "transkun=/models/2.0.pt" --transkun-config /models/2.0.conf
```

Custom overrides are files (Basic Pitch can use a single-file ONNX/TFLite model;
its default bundled model may be a directory). Custom model configuration can
load Python code. Use only trusted configurations and weights. Automatic
fingerprint verification applies to the registered downloads; a custom file's
SHA-256 is recorded as provenance, not vouched for by StemLab. Transkun uses a
weights-only Torch load and requires a matching state dict; the integration does
not globally disable Torch checkpoint security to make a mismatched file load.

## Outputs and timing conventions

A typical two-model output is:

```text
midi-comparison/
  report.json
  manifest.json
  transkun/01-bs_roformer_sw-piano/
    transcription.mid
    notes.json
    notes.csv
    piano-roll.png
    backend.json
    backend.log
    request.json
  yourmt3/01-source-master/
    transcription.mid
    notes.json
    notes.csv
    piano-roll.png
    backend.json
    backend.log
    request.json
```

The exact subfolder names include a collision-resistant ordinal, separator and
stem name. Failed inputs instead retain diagnostics (`failure.json` where
available, log and report entry). Native MIDI is never re-exported by the
metadata normalizer: its tracks, tempo events, drum channels, controllers and
pitch bends remain byte-for-byte as the model produced them.

`notes.json` contains estimated note onsets/offsets in seconds, `midi_pitch`,
velocity, normalized track index, program and drum flag, plus controller and
pitch-bend events, time signatures and the decoded MIDI tempo map. Non-drum
notes also have `frequency_hz`. Seconds are converted through the **entire MIDI
tempo map**, not a hard-coded 120 BPM. `start_sample` and `end_sample` are
nearest-frame estimates at the original source rate: inclusive start, exclusive
end, counting **sample frames**, not interleaved stereo channel values. A saved
stem uses that stem's native rate; read the per-file `sample_rate` rather than
assuming every separator retained the master's rate.

A MIDI file's tempo map is a serialization/performance clock and may be a model
default; it is **not evidence of the source's measured beat grid**. No notes are
snapped to StemLab's beats. Model tails beyond the source are preserved and
flagged; valid empty MIDI is reported as zero notes with a warning, not invented
notes or an accuracy success. Independent model outputs are not merged into a
claimed consensus.

`piano-roll.png` is rendered from the returned MIDI notes. It is a static note
plot, not a captured React frontend screenshot. Omit it with `--no-plots`.
The existing frontend's artifact links expose these output files; this patch
adds no MIDI synthesizer and does not claim a new native interactive piano-roll
lane. Use a DAW/MIDI editor for listening to a MIDI instrument rendering.

`report.json` records model, package versions, device, source hashes, checkpoint
fingerprints, durations, output paths and failures. CLI `midi` returns exit 0
only for `completed`; partial failure, no matching sources and failed models
return 1. Invalid arguments return 2. Without `--strict`, other requested models
continue after a failure. `--strict` retains the report then aborts.

## Codex integration

Installing the patched checkout with `.[codex,midi]` also exposes
`stemlab_start_midi_scan` in write-enabled sessions. Optional model runtimes must
be separately installed in that interpreter before use. The tool accepts a
workspace audio file or existing result directory and the model names, target,
stem filters, device, download consent, stem limit and plotting preference.
It starts an owned `midi` job and returns a job ID; use the existing status/log
methods, then artifact listing/report/image methods. Submission is not completed
inference. Read-only sessions omit the tool entirely.

A MIDI job uses a fresh result folder, copies only the master for portability,
references the original stems during inference and never changes the original
analysis. Saved evidence retains its hashes. The MCP API intentionally does not
accept arbitrary Python executable or checkpoint/config paths. Use the CLI for
custom trusted environments. Existing React timeline and loop tools are unchanged.

## Validation and real-model smoke tests

The deterministic tests cover model selection, CLI and pipeline wiring, Codex
job contracts, tempo-aware MIDI parsing, controllers and drums, original-rate
sample mapping, actual PNG generation, bounded downloads, corrupt caches,
missing packages, subprocess timeouts and preservation of old results. Upstream
API calls are checked with **explicit SDK/predictor doubles**. These tests do not
measure note accuracy or establish that every upstream dependency combination
installs on every OS.

```bash
python -m pip install -e ".[dev,server,midi]"
python -m pytest tests/test_midi_registry.py tests/test_midi_adapters.py tests/test_midi_extraction.py tests/test_midi_integration.py
ruff check src tests scripts

# Real inference: choose a real short audio file and an installed backend.
python scripts/smoke_midi.py piano.wav -o midi-smoke --model transkun
python scripts/smoke_midi.py mix.wav -o midi-smoke-mt3 --model mr_mt3 --allow-model-downloads
```

The smoke helper executes the real worker, verifies that each native MIDI and
note report exists and reports the source/checkpoint identities. It uses no
built-in fixture and does not claim musical correctness from a nonempty file.
The new MIDI CI workflow runs deterministic tests only; it deliberately does
not download hundreds of megabytes of checkpoints for each commit.

## Upstream references and licence boundaries

Interfaces and published package versions were checked on 2 October 2026:

- [Spotify Basic Pitch](https://github.com/spotify/basic-pitch): Apache-2.0;
  `inference.Model`, `inference.predict` and bundled ICASSP 2022 weights.
- [High-resolution inference wrapper](https://github.com/qiuqiangkong/piano_transcription_inference)
  and [original training project](https://github.com/bytedance/piano_transcription):
  the inference package advertises MIT; the training project is Apache-2.0.
  [Zenodo model record](https://zenodo.org/records/4034264) retains its own metadata.
- [Transkun](https://github.com/Yujia-Yan/Transkun) /
  [2.0.1 package](https://pypi.org/project/transkun/2.0.1/): MIT; direct model
  inference mirrors the public `transkun/transcribe.py` flow.
- [MR-MT3](https://github.com/gudgud96/MR-MT3): MIT model code.
- [YourMT3 inference Space](https://huggingface.co/spaces/mimbres/YourMT3):
  Apache-2.0-labelled Space code. The separate
  [YourMT3 GitHub repository](https://github.com/mimbres/YourMT3) declares GPL-3.0;
  do not assume these are interchangeable licence grants for all model assets.
- [MT3-Infer](https://github.com/openmirlab/mt3-infer) /
  [0.2.0 package](https://pypi.org/project/mt3-infer/0.2.0/): MIT wrapper **with
  mixed third-party source provenance**, including another vendored backend
  whose upstream has no declared licence. This patch does not select that
  `mt3_pytorch` backend, but installing the wrapper still installs its package
  tree. Review its notices before redistributing it or shipping containers.
- [pretty_midi](https://github.com/craffel/pretty-midi): tempo-aware native MIDI
  parsing; the original MIDI remains the authoritative model output.

A wrapper's licence is not a blanket grant for every downloaded checkpoint,
training dataset or input recording. This patch ships adapters and download
references only, not third-party model code/weights. It makes no claim of model
accuracy on Arcadians: a real Arcadians transcription needs an actual inference
run and listening review.
