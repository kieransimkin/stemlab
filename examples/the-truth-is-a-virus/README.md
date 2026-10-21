# The Truth is a Virus: real beat-analysis reference

Kieran Simkin selected this already-released song as the public contrasting
example on 16 October 2026. The included tagged MP3 is byte-identical to the
current public EPK audio (SHA-256 `b11ac7c48df227ac51d94c05a245d3138acf1a002f851c55d98fd7fb7f0de510`).
Song/audio rights remain with their original holders; the repository's software
licence does not grant an audio licence.

`evidence.json` pins the exact master and frozen real BeatThis/BeatNet detections,
their strict majority-vote consensus and metadata. These were produced through
the installed released StemLab 1.5.0 backends; they are not synthetic timestamps.
CI runs the current StemLab offset/fit/export code on this retained evidence and
browser-tests the actual shared React viewer. No learned-model rerun or complete
core-analysis claim is made for this reference. Canonical BPM stays unconfirmed.

```sh
python scripts/build_beat_example.py --output dist/truth-reference --source-commit FULL_40_CHARACTER_COMMIT
python scripts/check_arcadians_timeline.py dist/truth-reference --report dist/truth-beat-browser.json
stemlab beat-offset examples/the-truth-is-a-virus --audio examples/the-truth-is-a-virus/master.mp3 --output dist/truth-offsets
```

See [the interpretation and limitations](../../docs/beat-offsets.md).

The subtitle audition adds a separate `lyric-audition.json` and approved `cover.jpg`.
It preserves all six frozen evidence files unchanged. The 57 explicit lyric
intervals come from the artist-confirmed canonical LRC adopted on 5 September
2026; source and artwork hashes are retained in that reference. This adds no BPM
or detector authority. See [the illustrated audition guide](../../docs/lyric-audition.md).

![Actual rebuilt lyric audition for this reference](../../docs/screenshots/lyric-audition-truth.png)
