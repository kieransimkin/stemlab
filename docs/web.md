# StemLab web service

> **Kieran Simkin** · https://kieransimkin.co.uk/ · My Songs: https://kieransimkin.co.uk/my-songs/ · Arcadians: https://kieransimkin.co.uk/arcadians/ · Source: https://github.com/kieransimkin/stemlab


## Windows

Double-click `start-web.cmd`, or run:

```powershell
.\start-web.cmd
```

The script waits for `/healthz`, prints the URL, and opens the browser. Options
are passed to the PowerShell implementation:

```powershell
.\start-web.cmd -Port 8080 -Profile practical
.\start-web.cmd -Docker
.\start-web.cmd -Docker -Device cpu
.\start-web.cmd -NoBrowser
```

## Linux

```bash
chmod +x ./start-web.sh
./start-web.sh
```

Useful variants:

```bash
./start-web.sh --port 8080 --profile practical
./start-web.sh --docker
./start-web.sh --docker --device cpu
./start-web.sh --no-browser
```

Both local launchers use `http://127.0.0.1:<port>/` as the browser URL, wait
until the server health check succeeds, and keep the service attached to the
terminal so Ctrl+C stops it.

## Docker Compose

The Compose file exposes a GPU-backed `web` service on host port 8000 by
default:

```bash
docker compose up --build web
```

CPU-only:

```bash
docker compose --profile cpu up --build web-cpu
```

Change the public port with `STEMLAB_WEB_PORT`, for example:

```bash
STEMLAB_WEB_PORT=8080 docker compose up --build web
```

Results are persisted to `./results` by default. Set
`STEMLAB_RESULTS_HOST_DIR` to choose another host directory.

The container prints the host-facing browser URL at startup and exposes a
Docker health check against `/healthz`. The host starter scripts can run the
same Compose services with `-Docker` / `--docker` and open the browser
automatically.


## HTTP / Socket.IO service

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

The bundled **Arcadians** reference is intentionally a dual showcase: it demonstrates
StemLab against artist-supplied ground truth while also presenting the release itself.
See the official [Arcadians EPK](https://kieransimkin.co.uk/arcadians/) and
[Kieran Simkin's full My Songs catalogue](https://kieransimkin.co.uk/my-songs/).
The web demo carries canonical release metadata and artist-edited structural waypoints,
so learned section boundaries can be compared against the authoritative song map.


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
