# Phrase loops and musical restarts

`stemlab phrase-loops RESULTS` proposes **line-complete audition candidates**
from explicit `canonical.json` lyric timing. It answers a different question
from conservative `stemlab loops`: which complete lyric passages are worth
trying when the return to the beginning matters more than a small sample-step
or nearly matching beat phase? It never upgrades an unresolved strict loop.

```sh
stemlab phrase-loops analysis --min-seconds 5 --max-seconds 30 --top 6 --export-audio
stemlab phrase-loops analysis --feedback artist-ratings.json --export-audio
python scripts/phrase_loop_demo.py --output phrase-demo
```

Saved beat/section/vocal evidence is reused; no model reruns, native
DanceRudiments runtime or new network dependency are required. The attack
descriptor reuses StemLab's existing RMS-rise event extractor from its
DanceRudiments-matching analysis. DanceRudiments motion patterns are not
reimplemented or used as a substitute for musical listening.

## What changes the ranking

- Candidate cuts come from ordered canonical line starts and explicit line
  ends, preserving repeated occurrences and any interior zero-length caption.
  At least four lines and 5–30 seconds are the defaults. No semantic closure,
  4/4 meter or missing word time is invented.
- Compare **before with before and after with after** at the two cuts. Chroma
  and log-band context are measured over 350 ms on either side. A last-note
  tail versus first-note attack comparison alone can favour a poor restart.
- Compare RMS-rise attack salience around both cuts over four local measured
  beats (two before and two after), retaining rhythmic accent placement.
- Musical context contributes .75 of cost, local measured beat phase .10,
  similarity to explicitly good/okay durations .10, and raw sample seam .05.
  Within musical context, attacks have .40 weight, chroma .30, spectral bands
  .20 and level mismatch .10. Missing attacks stay null; available weights are
  renormalised and reported. These are fixed descriptive weights, not a
  trained model, calibrated confidence or an automatic modification of the
  existing strict/spectral-context algorithms.
- Greedy selection suppresses alternatives sharing more than 60% of the
  shorter interval. This prevents a list of nested cuts from one passage.

## Explicit artist feedback

The optional JSON must identify the **exact master hash and native frame
bounds**. Wrong hashes, malformed bounds and unsupported ratings are rejected.
Use the sample numbers in the audition report, never resampled browser frames.

```json
{
  "schema": "stemlab.loop_feedback.v1",
  "source_sha256": "REPLACE_WITH_EXACT_MASTER_SHA256",
  "ratings": [
    {"start_sample": 64000, "end_sample": 128000,
     "rating": "good", "reason": "unknown"},
    {"start_sample": 160000, "end_sample": 192000,
     "rating": "bad", "reason": "musical_restart"}
  ]
}
```

Ratings are `good`, `okay` or `bad`; reasons are `unknown`, `musical_restart` or
`section_unsuitable`. Previously rated near-duplicates (intersection over union
at least .90) are not suggested again, regardless of rating. Good/okay durations
are soft references; a rating does not approve later changed cuts.
`bad` + `section_unsuitable` excludes overlapping cuts and exact ordered
canonical-word repeats of that passage. This is explicit filtering, not
inferred section classification or a general dislike prediction.

## Evidence and limitations

The separate `deep/phrase_loops/phrase_loops.json` uses
`stemlab.phrase_loops.v1`, is indexed in the existing summary/manifest, and
contains the exact master hash, native bounds, full lyric occurrences, restart
features, measured beat phase, waveform join and vocal checks, feedback
summary, scored-pool size and rejected counts. Strict `deep/loops/loops.json`
is preserved. The existing strict-loop timeline does not claim these new
exploratory phrases as accepted regions; use exact exported WAVs to audition.

Exports are opt-in exact float32 decoded master slices, preserving native
rate, channel alignment and duration. No snap, fade, crossfade, stretch or
normalisation is applied. Phrase suggestions always retain listening and
complete-bar holds, plus failed vocal/waveform gates where applicable.
Line completeness, same-phase context and high chroma similarity cannot prove
a satisfying musical cadence, clear consonants, correct narrative closure or
listener preference. Edge cuts lacking recorded context are not scored.
One song's ratings do not establish general accuracy; synthetic held-out
contexts test the mechanism and real suggestions still require listening.

```sh
python -m pytest tests/test_phrase_loops.py tests/test_loops.py tests/test_loop_integration.py
```
