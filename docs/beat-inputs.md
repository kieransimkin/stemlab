# Master and percussion beat analysis

The normal `stemlab analyze` pipeline completes the selected separator(s) and
normalizes their stems before invoking beat detection. BeatNet and BeatThis then
run on the **master and every stem explicitly labelled drums/percussion**, not
only a preferred separator's drums. Drum-component labels such as kick, snare,
hi-hat, toms and shaker also qualify. Matching is case-insensitive and token-based;
`drumless`, `no_drums`, `non-percussive` and unrelated pitched/vocal stems do not.
There is no signal classifier, HPSS surrogate or invented percussion stem.

```bash
stemlab analyze song.wav --model htdemucs_6s --output ./analysis-song
```

Existing separator dependencies/download policy applies. `--no-beats` continues
to disable BeatNet, BeatThis and Beat Transformer. The independently selectable
All-In-One functional-structure route may still produce its own master beat grid.
A master-only configuration runs without automatically downloading a separator.

## Outputs and attribution

Master files keep their existing names, such as `beats/beatnet.json` and
`beats/beat_this.json`. Stem results have collision-resistant source-qualified
names: `beatnet__SEPARATOR-STEM-ID.json`, with matching TSVs. Each JSON records
`metadata.detector`, `metadata.source` (kind, separator, stem, path, SHA-256) and
its unshifted master-time reference. All runs appear in `analysis.json`; the React
timeline and static export discover their separate event lanes automatically.
The existing recording commands accept these IDs through `--beat-model`.

All-In-One structure stays a master-track analysis. **Beat Transformer is not a
single-waveform model**: it consumes five demixed instrument streams and therefore
runs once with the real stem set. It is explicitly labelled `kind: demixed`, not
passed different filenames and misleadingly counted as new drum-only estimates.
Its master path is a reference to the song, not a claim of mix-only inference.

Single-waveform trackers receive the actual selected stem audio and no replacement
master/stem set. Independently normalized stems are the same ones saved by the
existing pipeline. They are not time-stretched or shifted, and mismatched durations
are rejected rather than aligned by guesswork. Repeated paths are processed once;
distinct separator hypotheses remain distinguishable.

## Consensus and failures

Each **detector family gets at most one vote per temporal cluster**, across all
of its master/stem passes. The required majority is based on distinct detector
families, never the number of stems. Twelve drum passes from BeatNet cannot outvote
a disagreement from BeatThis and Beat Transformer. The report retains all input
IDs and each event's detector support. This is an estimated consensus, not a
probability, independence guarantee or override of artist-confirmed timing.

With `continue_on_error=True`, failures include both detector and input ID and do
not prevent other inputs from being tried. Strict mode still fails immediately.
No file is written under another input's name to fill a missing result.

The Arcadians `arcadians-core-v2` release recipe now requires separately attributed
BeatNet and BeatThis output for both the master and its real HTDemucs drums before
publishing the complete timeline. Old master-only recipe output cannot satisfy
that requirement. A correct source/role/hash is checked, not merely a filename.
