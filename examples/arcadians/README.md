# Arcadians reference song

`Arcadians` by Kieran Simkin is the bundled StemLab reference song for exercising
the known-information API and synchronized timeline layers.

Included reference material:

- analysis audio: `Arcadians - 320kbps.mp3`
- canonical BPM: **145.0**
- canonical lyrics: `lyrics.txt`
- manually edited canonical timing: `canonical-lyric-timing.lrc`
- canonical metadata payload: `canonical.json`
- release/asset evidence: `asset-manifest.json`
- canonical cover art: `cover.jpg`

The included MP3 has SHA-256
`5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de`.
The canonical lossless master is intentionally identified separately by SHA-256
`b72436c8d3741a86b75af603f702e063b3c5be96738dd02181f32b74bdea1366`
and has a duration of `273.604558` seconds at 44.1 kHz stereo.

The LRC is the exact artist-edited canonical timing file. Blank timestamp lines
are treated as clear/end cues for the preceding lyric. `canonical.json` and the
web UI fixture contain the same timing normalized into start/end events.

To exercise the CLI directly:

```bash
stemlab analyze "examples/arcadians/Arcadians - 320kbps.mp3" \
  --output ./analysis-arcadians --profile practical --device auto
```

In the web UI, click **Load Arcadians example** before selecting/uploading the
example MP3. The BPM, canonical lyrics and canonical timing are then stored
against the uploaded audio hash and appear as synchronized reference layers.

## Official Arcadians release links

- EPK / song page: https://kieransimkin.co.uk/arcadians/
- Kieran Simkin: https://kieransimkin.co.uk/
- Full catalogue: https://kieransimkin.co.uk/my-songs/
- Release date: **25 September 2026**
- BPM: **145**
- ISRC: **QT6EB2639508**
- UPC: **882557810017**

The reference fixture also includes the artist's canonical section map: Intro → Verse 1 →
Pre-Chorus → Build 1 → Drop 1 → Post-Drop → Verse 2 → Build 2 → Final Drop → Outro.
StemLab's All-In-One output is retained separately so machine boundaries can be compared
with—not substituted for—the artist-authored structure.
