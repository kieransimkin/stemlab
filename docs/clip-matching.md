# Recover an excerpt's source clock

`stemlab match-clip MASTER CLIP --output NEW.json` compares a local audio or video
soundtrack with a source recording. It runs no learned models, separation, network
requests or downloads. Compressed video/audio needs FFmpeg; WAV and supported
audio formats use libsndfile. Stereo channels remain separate so opposing phase
cannot disappear in a mono downmix.

The JSON report binds both files by SHA-256 and records their analysed interval,
sample rate, precision, correlation candidates, uniqueness margin and five
independent timing checks. A matched result supplies `offset`, `duration` and
`playerStart`. Use `--clip-start` and `--clip-end` to select a known soundtrack
interval after preroll or before an unrelated outro. Source offset corresponds to
the selected interval's start; `playerStart` corresponds to its clip time.

Default analysis is 8 kHz, a 0.125 ms sample grid. This is measurement precision,
not a guarantee of native sample accuracy or media-player clock accuracy. The
matcher tolerates gain, short boundary fades and ordinary encoding, requires at
least two seconds, and limits decoded files to 30 minutes. It rejects weak,
ambiguous, conflicting or out-of-bounds mappings. Repeated passages, different
edits, loops with discontinuities, speed changes and unrelated performances may
remain unresolved. Inspect the evidence and original creation receipts rather
than lowering thresholds merely to obtain a mapping.

A waveform match does not confer publication rights, artist approval, track
identity or bit identity with an uncompressed master. Establish those separately.
It never edits lyrics, cue files, masters, existing reports or a public page.
An unresolved report is still saved; the CLI exits with status 2. Existing output
files cannot be overwritten.

## Reproducible synthetic example

Run `python scripts/demo_clip_matching.py NEW_DIRECTORY`, then:

```sh
stemlab match-clip NEW_DIRECTORY/source.wav NEW_DIRECTORY/excerpt.wav \
  --output NEW_DIRECTORY/match.json
```

The deterministic stereo fixture's expected offset is 5.31275 seconds and its
duration is four seconds. It contains no private or third-party media.
