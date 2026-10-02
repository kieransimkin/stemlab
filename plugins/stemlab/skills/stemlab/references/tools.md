# Tool reference

All paths refer to the explicitly configured server workspace, not the plugin cache.

| Tool | Purpose |
|---|---|
| `stemlab_capabilities` | Native action/model registry and dependency-presence checks; no downloads. |
| `stemlab_open_timeline` | **Preferred inspection:** private loopback viewer using the existing React timeline, including loop playback. No models or file writes. |
| `stemlab_close_timeline` | Stop the local viewer; no saved data changes. |
| `stemlab_inspect_audio` | Native rate, frame count, channels, duration and SHA-256. |
| `stemlab_start_analysis` | Starts the existing pipeline with typed options in a new output directory. |
| `stemlab_start_midi_scan` | Audio-to-MIDI from a local file or saved stems in a new job; inspect `deep/midi/report.json`, native MIDI and note/piano-roll artifacts. |
| `stemlab_start_loop_scan` | Reuses prior evidence; optionally exports WAVs in a new directory. |
| `stemlab_job_status` | Returns current or retained terminal state and backend error count. |
| `stemlab_job_logs` | Bounded log pages; byte offsets and next offset. |
| `stemlab_list_jobs` | Paginated workspace job history. |
| `stemlab_cancel_job` | Cancels only a child owned by this server session. |
| `stemlab_list_artifacts` | Paginated result paths, sizes and local file URIs. |
| `stemlab_read_artifact` | Bounded text/JSON/CSV/TSV/lyric excerpts. |
| `stemlab_read_image` | Supporting/fallback PNG evidence, at most 4 MiB and 16 megapixels. Prefer the real timeline for inspection. |
| `stemlab_read_loops` | Sample bounds, provenance, loop count and unresolved count. |

A `stemlab://guide` resource and `analyze_song` prompt provide the workflow conventions.
Read-only mode omits the analysis, loop-scan, MIDI-scan and cancel tools, while retaining read-only
viewer sessions. Viewer open/close tools have side-effect annotations because they
manage a loopback listener, even though they never write analysis data.

Analysis options mirror PipelineConfig. `allow_model_downloads` is consent, not a
network sandbox switch; false refuses inference even if some weights are cached.
`allow_external_bootstrap` authorizes the existing trusted upstream runtime installers.
Model names must be in StemLab's registry. `models` overrides the selected profile.
Text semantics is off by default here. `noncommercial_audio_semantics=true` is an
explicit opt-in to MuQ's non-commercial weights, not a licence grant.

Loop limits match native LoopConfig: `max_bars` 1–64, `per_section` 1–8. Export is off
by default. For each accepted loop, `[start_sample:end_sample]` is the original
native-rate slice. Do not claim perfect audibility, inferred downbeats or vocal
silence where the underlying report does not support them.


`stemlab_open_timeline(results_path, lifetime_seconds=1800)` returns a private
URL. The lifetime is 60–3600 seconds; one active viewer is allowed per MCP process.
It reuses an existing session for the same result; opening another result closes
the previous viewer. URLs work only on the runtime machine and must not be shared
publicly. The bridge does not install or control a browser. Use the available host
browser for real render inspection/capture; otherwise report the limitation and
fall back to saved evidence. Numeric report fields remain authoritative for samples.
