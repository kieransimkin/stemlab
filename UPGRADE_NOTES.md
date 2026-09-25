# StemLab v0.2 comprehensive analysis upgrade

Audited base commit: `d0846004356510f83659c68bffe7b92efcf3bcd7` (2026-09-25).

Author: **Kieran Simkin**
Website: https://kieransimkin.co.uk/
My Songs: https://kieransimkin.co.uk/my-songs/
Arcadians EPK: https://kieransimkin.co.uk/arcadians/
Source: https://github.com/kieransimkin/stemlab

## Upgrade map

### Sonic / production

Adds deterministic master-level analysis with BS.1770 integrated loudness, sample and
oversampled peak, RMS/crest/dynamic-range evidence, clipping/silence statistics, spectral
centroid/bandwidth/rolloff/flatness/contrast, band energy and stereo correlation/width.
Time-series evidence is retained in NPZ form for section-level fusion.

### Rhythmic / groove

Fuses the existing detector grids with spectral onset evidence. Adds tempo stability and
drift, meter estimation, onset density, periodicity, beat/grid error, subdivision energy,
swing placement and a deliberately labelled off-beat/syncopation proxy. All-In-One can
also contribute a fourth independent beat/downbeat vote before consensus.

### Harmonic

Builds on Chordino, NNLS chroma, QM key/tuning and tonal-change data. Adds collapsed
progressions, duration weighting, harmonic rhythm, chord n-grams, independent chroma key
ranking, pitch-class entropy, key-relative Roman-function mapping, diatonic/chromatic root
use, root-motion statistics, tonic/dominant share and cadence candidates.

### Lyrics / rhyme / prosody

Prefers canonical artist lyrics and timing, falling back to Whisper. Adds phonetic end-rhyme
classes and scheme, near/internal rhyme evidence, syllables/stress, repeated hooks and
n-grams, lexical statistics and timed delivery measures.

### Structural

Adds `all-in-one-infer>=3.1` for BPM, beat/downbeat and functional section labels such as
intro/verse/chorus/bridge/outro, retaining raw activation arrays and optional embeddings.
It performs its own separation rather than consuming independently peak-normalised StemLab
stems, preserving the model's expected inter-stem relationships.

### Text semantics

Adds Sentence Transformer lyric/document embeddings, theme similarity, semantic continuity
and clustering. Scores are stored as similarities rather than being misrepresented as
probabilities.

### Audio semantics (explicit non-commercial research action)

Adds MuQ-MuLan zero-shot music/text similarity behind `--audio-semantics`. Public MuQ-MuLan
weights are CC-BY-NC 4.0, so this dependency is kept out of default/all installs and every
result records the licence and commercial-use warning.

### Note / MIDI transcription

Adds optional Spotify Basic Pitch transcription on isolated stems behind `--basic-pitch`.
The dependency remains a separate `amt` extra because Basic Pitch 0.4.0 officially targets
Python through 3.11 while StemLab's container currently uses Python 3.13.

### Unified song map

Combines sections, sonic curves, beats/onsets, chords and timed lyrics into a per-section
song map. Artist-supplied canonical sections take priority. When All-In-One also runs,
StemLab reports boundary differences instead of replacing the canonical structure.

## Arcadians showcase

The web landing page becomes a dual StemLab / Arcadians showcase using the bundled cover art,
an emerald EPK-style hero, release facts and direct EPK/My Songs links. The canonical fixture
is extended with release date, UPC/ISRC, official author links and ten artist-defined section
waypoints. Deep analysis artifacts render as synchronized timeline lanes as they appear.

## Packaging / releases

- package metadata names Kieran Simkin and links the website, My Songs, Arcadians EPK, About,
  Contact, repository and issues;
- generated `analysis.json`, deep-analysis summary and manifest carry attribution;
- Docker images receive OCI author/site/source labels;
- every GitHub release gets an attribution block while preserving existing release notes;
- release assets include `STEMLAB-ABOUT.txt`, `release-assets.json` with author/site metadata,
  and `SHA256SUMS`;
- README, web UI, container docs and Arcadians example docs surface the same public links.

## Install matrix

`pip install -e ".[all]"` installs the normal production stack plus All-In-One and text
semantics. It does **not** install MuQ-MuLan. Basic Pitch is installed separately with
`.[amt]` on supported Python versions. MuQ is installed separately with `.[semantic-nc]`.

## Validation

The patch kit includes focused tests for branding, action registration, extended canonical
metadata, sonic/rhythm output, functional harmony/cadences, rhyme/repetition and the unified
song map. The local patch worktree passes all eight focused tests under Python 3.13. The
heavyweight model adapters are dependency-gated because model weights/network downloads are
not available in the patch sandbox.

## Patch revision 0.2.2

The applier now strips trailing spaces/tabs and normalises touched text files to one newline at EOF before `git diff --check`. This fixes the release-workflow Markdown hard-break whitespace and repeated blank EOF lines produced by earlier patch revisions.
