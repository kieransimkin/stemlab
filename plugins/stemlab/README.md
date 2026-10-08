# StemLab local Codex plugin

[![StemLab logo](https://raw.githubusercontent.com/kieransimkin/stemlab/v1.3.1/plugins/stemlab/branding/logo.png)](https://kieransimkin.co.uk/danceflow/)

Local music analysis for stems, timing, beats, harmony, lyrics, MIDI and loopable sections for Shorts. https://kieransimkin.co.uk/

**Audio timing analysis and loopable sections for creating Shorts and other short-form videos.**

StemLab by **Kieran Simkin** — https://kieransimkin.co.uk/my-songs/
Part of the DanceFlow BPM and motion-response workflow, alongside WordPress DanceMoves.

This plugin bundles a skill and a local stdio MCP connection. It requires the
**patched StemLab checkout**, installed in a Python environment that Codex can launch.
It does not include Python or model weights. The installed StemLab Python runtime
already carries the real React timeline build; this plugin reuses that bundle
rather than shipping a second UI.

## Prepare the runtime

From the patched repository, with your environment activated:

```sh
python -m pip install -e ".[codex,all]"
python -m stemlab.codex configure --workspace "/absolute/path/to/music-workspace"
python -m stemlab.codex doctor
```

Use `[codex]` alone for report inspection and loop analysis on existing results;
optional separation/speech/beat backends must already be installed for new inference.
No model is downloaded at plugin installation. The existing `all` extra does not
include the opt-in MuQ or Basic Pitch routes.

`configure` records only a workspace and resource limits in the platform's
user-configuration directory (`stemlab/codex.json`). It does not change Codex
settings or grant approvals. Use `--replace` only after reviewing an existing file.

Launch the Codex host with `stemlab-codex` on PATH (activate the same environment
first). The portable manifest deliberately uses a bare executable; it does not
hard-code a developer's venv path or misuse the plugin cache as a workspace.

## Add the local marketplace

From the repository, or from the root of the extracted plugin archive:

```sh
codex plugin marketplace add .
codex plugin marketplace list
```

Install **StemLab** from **StemLab · DanceFlow / stemlab-local** in the local
Plugins Directory on a supported Codex/desktop host. Reload the host and start a
new session. Installation UI varies by surface/version; do not assume adding a
marketplace alone installs or enables a plugin. Current OpenAI documentation uses
that command to register authoring sources and the desktop directory to install.

This is local/team distribution, not publication in the public plugin directory.
No `.app.json`, fabricated registration ID, OAuth secret or public endpoint is used.

## Direct MCP alternative

When the local plugin directory is unavailable, register the same runtime directly:

```sh
codex mcp add stemlab -- /absolute/path/to/venv/bin/python -I -m stemlab.codex serve --workspace /absolute/path/to/music-workspace
codex mcp list
```

On Windows, use the absolute `venv\Scripts\python.exe` path and quote paths with spaces.
Use either plugin-managed MCP or direct MCP, not both for the same workspace.
The standalone MCP route provides tools but does not automatically install this skill.

## Safety and scope

Results are created under `WORKSPACE/stemlab-codex-results/<job-id>/`. Previous
analysis folders are read-only inputs to loop scans. Hidden paths, symlinks,
hardlinks, parent traversal and filesystem-root workspaces are rejected.

The server is an application-level path guard, **not** an OS security sandbox.
Use a dedicated trusted workspace and the host's normal sandbox/approvals. Do not
place secrets there. Dependency/model code still runs with the local Python
process's permissions. Downloads require consent; the server does not claim to
provide comprehensive offline/network isolation.

Jobs are supervised by the live server, with one concurrent job and a four-hour
timeout by default. Normal shutdown cancels owned jobs; a force-killed server may
leave an orphan process. A new server never kills a PID recovered from disk and
reports non-owned unfinished jobs as `unmanaged`. Inspect such processes locally.
No automatic retry, resume or future-notification promise is made.

The MCP transport uses stdin/stdout. `stemlab_open_timeline` separately starts a
read-only viewer bound only to `127.0.0.1` on an ephemeral port. Workers have
separate log files so inference output cannot corrupt protocol messages. Tool
responses containing lyrics/reports/images are sent to the model; local processing
does not mean that requested tool results remain private to the filesystem.

## Inspect in the React timeline first

Call `stemlab_open_timeline` on an existing results directory and open its private
URL using a local browser tool or manually. The viewer serves the same bundled
`react-timeline-sequence` frontend: shared playhead, waveform and spectrogram lanes,
beat/section alignment, zoom, loop selection, enabling and repeat playback. Select
a loop, tick **Enable loop**, **Zoom to loop**, then **Play** to audition. No audio
exports are required for preview. A URL being returned does not open a browser or
start playback.

Use exact JSON reports alongside the timeline. Saved PNGs are supporting/fallback
evidence, not a substitute for actual frontend screenshots. If the host has no
browser or cannot reach the runtime machine, state that limitation. Never claim
visual or listening QA just because an artifact exists.

The viewer has no upload, canonical-edit or analysis-start endpoints. It requires
a random access token, blocks cross-origin requests and outside-workspace paths,
expires after 30 minutes by default and closes with the MCP server. Use
`stemlab_close_timeline` when finished. Do not publish or forward its private URL.
