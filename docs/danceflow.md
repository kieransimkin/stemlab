# StemLab in the DanceFlow workflow

**StemLab** is the audio-analysis engine in Kieran Simkin's wider **DanceFlow**
BPM and motion-response workflow.

Its job is to turn a finished music track into machine-readable musical
evidence: separated stems, tempo and beat grids, downbeats, song structure,
harmony, timbre/dynamics, speech and lyrics, semantic features, and a unified
section-level song map.

The WordPress **DanceMoves** plugin is a related downstream component on the
motion-response side of DanceFlow. In that relationship:

```text
music
  │
  ▼
StemLab
  ├─ stems
  ├─ BPM / beats / downbeats
  ├─ structure / song map
  ├─ harmony / timbre
  └─ lyric / semantic analysis
  │
  ▼
DanceFlow workflow
  │
  ▼
DanceMoves (WordPress)
  └─ motion-aware / responsive experience
```

StemLab deliberately remains standalone. It has no WordPress runtime
dependency: downstream tools can consume its JSON/NPZ/TSV artifacts or use the
HTTP/Socket.IO service. This keeps music analysis reproducible and usable
outside WordPress while giving DanceFlow a consistent musical timeline for
motion response.
