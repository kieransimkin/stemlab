# StemLab

StemLab is an assessment-oriented Python/PyTorch audio pipeline. Given one master WAV and a named output directory it runs a deliberately diverse set of high-capacity source-separation models, a smaller low-latency comparison model, speech/VAD + Whisper analysis, spectrogram generation, three independent beat/downbeat systems, and a Sonic Visualiser session that ties the results together on one timeline.

> **Model weights are not redistributed by this project.** They are fetched from their upstream registries/releases on first use. This avoids silently republishing checkpoints whose licensing may differ from the source code license, and lets upstream integrity metadata be used where available.

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

The preferred vocal stem is passed through the Silero VAD implementation bundled with `faster-whisper`. Speech regions are used to create a timeline-preserving `spoken_word.wav` (non-speech is zeroed rather than concatenated), then Whisper is run with word timestamps. Outputs include `whisper.json`, `speech_regions.json`, `transcript.txt`, `transcript.srt`, and `words.tsv`.

Beat analysis runs:

- **BeatNet** in offline/DBN mode.
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

## Install

Python 3.10 or 3.11 is recommended because the legacy BeatNet/madmom ecosystem is less predictable on newer Python versions.

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
  sonic_visualiser/
    session.sv
    session.xml
    open_sonic_visualiser.bat
    open_sonic_visualiser.sh
  analysis.json
  manifest.json
```

`session.sv` is genuine Sonic Visualiser bzip2-compressed session XML. It contains a master pane with beat/downbeat/Whisper time-instant layers and one synchronized waveform + Sonic Visualiser spectrogram pane for every separated stem. The uncompressed `session.xml` is retained for inspection/debugging. The Windows `.bat` looks on `PATH` and in the usual Program Files locations.

## HTTP / Socket.IO microservice

Install the server dependencies through the full environment or the dedicated
extra:

```bash
pip install -e ".[server]"
# or
pip install -e ".[all]"
```

Start the service with one ASGI process and let StemLab's own scheduler control
analysis concurrency:

```bash
stemlab serve --results ./results --host 0.0.0.0 --port 8000   --scheduler-jobs 1 --profile full --device auto
```

Opening `http://localhost:8000/` serves a modern upload/timeline workspace.
After an HTTP PUT completes and returns its SHA-256, the browser immediately
switches into a Sonic-Visualiser-style sequence view. Every generated analysis
artifact is represented by a lane on one shared horizontal song timeline.
Waveforms, spectrograms, beats/downbeats, Whisper words, Vamp curves,
notes/segments and generic artifacts all share the same playhead, seek
position, horizontal pan and zoom.

The browser listens to the existing Socket.IO room for the uploaded hash.
`new_file` events add lanes while analysis is still running, while
`process_output`, `process_history` and `job_status` update the live log and
status display. A lightweight inventory poll means refreshing or reconnecting
to an existing hash reconstructs lanes already present on disk.

Additional timeline endpoints are exposed under `/api`:

```text
GET /api/<hash>/timeline
GET /api/<hash>/source
GET /api/<hash>/waveform?path=...
GET /api/<hash>/spectrogram?path=spectrograms/...npz
```

Optional known reference information can be supplied before upload: canonical
BPM, canonical lyrics, and canonical lyric timing. Lyric timing accepts LRC or
JSON events. The values are stored as `results/<hash>/canonical.json` and appear
as synchronized reference lanes in every browser attached to that hash.

When canonical BPM is present, StemLab draws a fixed beat grid at exactly
`60 / BPM` seconds per beat. The grid is phase-aligned to the first detected
beat, preferring the detector consensus as soon as it exists. This makes the
known tempo directly comparable with the independent beat trackers.

`examples/arcadians/` contains the bundled reference song **Arcadians** by
Kieran Simkin: a 320 kbps analysis MP3, the canonical 145 BPM, definitive
lyrics, the exact manually timed LRC, cover art, asset evidence, and metadata
identifying the canonical lossless master. The upload page's **Load Arcadians
example** button fills all three known-information fields from the same
reference data.

Upload arbitrary audio bytes with HTTP PUT. The filename is retained only as
human-readable metadata; the content SHA-256 is the job identity:

```bash
curl -T song.flac http://localhost:8000/upload/song.flac
```

The response contains the 64-character content hash. A result tree is created
at `results/<hash>/`, and is browsable while analysis is running:

```text
GET /<hash>
GET /<hash>/analysis.json
GET /<hash>/manifest.json
GET /<hash>/stems/...
```

Socket.IO clients connect to the normal `/socket.io` endpoint and emit:

```json
{"event": "subscribe", "data": {"hash": "<sha256>"}}
```

Subscribers to the same hash share the same running analysis and may connect
from multiple clients. The service emits `job_status`, `process_output`,
`process_history`, `new_file`, and `job_timeout` events. `process_output`
contains the originating `stdout` or `stderr` stream. `new_file` contains the
relative path and HTTP URL as soon as the scheduler sees a new generated file.

Only one active analysis is permitted for a given SHA-256. Re-uploading
identical bytes attaches to the existing job instead of starting another one.
Completed hashes are served from cache. A stale job may be restarted only after
a timeout calculated as at least ten times the average successful analysis
duration, with a conservative 24-hour floor by default.

The service intentionally uses one Uvicorn worker; use
`--scheduler-jobs` to change the number of concurrent StemLab CLI processes.
Multiple Uvicorn workers would create independent schedulers and defeat the
one-job-per-hash guarantee.

Useful environment variables include `STEMLAB_RESULTS_DIR`,
`STEMLAB_SERVICE_MAX_JOBS`, `STEMLAB_SERVICE_PROFILE`,
`STEMLAB_SERVICE_DEVICE`, `STEMLAB_SERVICE_CLI_ARGS`,
`STEMLAB_SERVICE_MIN_TIMEOUT_SECONDS`, `STEMLAB_SERVICE_TIMEOUT_MULTIPLIER`,
`STEMLAB_SERVICE_MAX_UPLOAD_BYTES`, and `STEMLAB_SERVICE_HISTORY_LINES`.

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

The full run is intentionally expensive. Mega-53 is the dominant VRAM/storage pass and dozens of stems mean dozens of additional spectrogram files and Sonic Visualiser panes. Use `--profile practical` while iterating and `--profile full` for the assessment capture.

## Binary/release CI

`.github/workflows/release.yml` runs for every published GitHub Release. It builds wheel/sdist artifacts and a Linux x86-64 **Nuitka one-file executable**, then writes both `SHA256SUMS` and `release-assets.json` containing file names, sizes and SHA-256 digests before uploading all assets to the release.

A terminology caveat matters here: upstream PyTorch, torchaudio, CUDA and audio-codec wheels contain native shared libraries. A genuinely fully-static executable containing that stack is not realistically produced from the stock wheels. The workflow therefore requests a static Python runtime from Nuitka where available and packages the remaining native runtime into the one-file executable. It is self-contained for distribution, but it is **not an ELF with zero dynamic dependencies**. Producing the latter would require custom static builds of PyTorch/libtorch and its native dependency tree for one fixed platform, and would make CUDA support especially problematic.

Model weights remain lazy downloads and are intentionally not embedded in release binaries.

## Reproducibility and licensing

`analysis.json` records model/backend metadata and errors; `manifest.json` hashes every output artifact. Model checkpoints, research code and datasets retain their upstream terms. In particular, do not assume that an MIT-licensed inference wrapper automatically grants redistribution rights for every checkpoint it can download.
