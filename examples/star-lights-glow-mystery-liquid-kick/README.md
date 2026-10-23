# Star Lights Glow (Mystery Liquid Kick) — canonical StemLab example

**Track:** Star Lights Glow (Mystery Liquid Kick)  
**Artist / album artist:** Bass Ben & Friends  
**Album:** Star Lights Glow  
**Track number:** 1 (supplied WAV filename prefix)  
**Duration:** 3:44.001 (lossless source), 44.1 kHz stereo 16-bit PCM

## Evidence and provenance

The exact uploaded WAV is the **canonical lossless source**. It is not committed
(the repository ignores `*.wav`). `evidence.json` records its byte hash, PCM
format, frame count and source identity. The repository bundles `master.mp3` as
a **192 kbps constant-bitrate playback/analysis derivative** of that WAV, with
ID3v2.3 title, artist, album, album artist, mix subtitle and track metadata.
The embedded front-cover artwork is byte-identical to `cover.jpg` (2048×2048).

`canonical.json` uses StemLab's existing canonical metadata format; it intentionally
leaves BPM, release date, ISRC and UPC empty because none was supplied or
artist-confirmed. The `Mystery Liquid Kick` mix is a separate identity from the
`Anthem` mix. Do not copy a beat map or provenance from the other mix.

**Media rights:** These media files were user-supplied for inclusion. No separate
redistribution licence has been provided. The repository's MIT software licence
does not grant an audio or artwork licence. Confirm public redistribution rights
before publishing a public GitHub release or deployment.

## Validation

```bash
python scripts/verify_star_lights_reference.py
# Optional: verify the exact lossless source if locally available
python scripts/verify_star_lights_reference.py --source-wav "01 - Star Lights glow (Mystery Liquid Kick).wav"
python -m unittest discover -s tests -p "test_star_lights_reference.py" -v
```

Use the committed derivative for low-cost StemLab analysis and UI playback:

```bash
stemlab analyze examples/star-lights-glow-mystery-liquid-kick/master.mp3 \
  --output ./analysis-star-lights-glow --profile practical
```

For canonical analysis that preserves original source frame identities, use the
lossless WAV instead, validating it against `evidence.json` first. StemLab does
not inherit downbeat phase, BPM, matched rudiments or other-song data just from
this reference. Songs remain opt-in; nothing is bundled into installed StemLab
Python packages or Unity WebGL until that integration is explicitly built.
