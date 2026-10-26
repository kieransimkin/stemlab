# Combine the strongest lyric observations

`stemlab fuse-lyrics request.json --output combined-review` compares existing
canonical-word reconciliations and exports one provisional lyric timeline. It
runs no models and copies no audio. Each selected word keeps one actual observed
interval, its source, all alternatives and any timing disagreement.

![Actual source selections from the reproducible synthetic example](screenshots/lyric-fusion-selection.svg)

*Actual command output from synthetic observations over silent audio. The two
views fill different gaps; the final word stays untimed. This demonstrates
selection and provenance, not measured singing accuracy. No demonstration video
or generated artwork is included: this static comparison is the useful evidence.*

## Prepare compatible evidence

1. Identify the exact master and canonical text. Retain artist-confirmed timing
   corrections separately. Do not replace spelling with an ASR transcript.
2. Reuse saved separation/transcription runs. Compare full-audio singing input
   when a speech mask removed vocals. Reconcile each result using
   `stemlab.word_alignment.reconcile` and retain its native review reasons.
3. Verify that each reconciliation names the same master hash, canonical text
   and original source clock. Duration agreement alone does not establish this:
   a crop, Suno reconstruction, offset, stretched stem or different master needs
   explicit source-mapping work before it can participate. This command accepts
   only the unchanged full-master clock. It does not discover or apply offsets.
4. Group correlated runs using the same `view_id`, such as two decodes of the
   same separated vocal stem. Different stems decoded by one engine still share
   model biases. Agreement is corroboration, never calibrated probability.

The first candidate is the preferred baseline for ties and change reporting.
Every candidate must retain its complete canonical token inventory. The existing
70% canonical text-match gate is recomputed; decoder repetition and candidates
below that gate are excluded with a recorded reason. Text coverage is not
acoustic alignment accuracy. Invalid observed intervals are not selected.

## Request file

Paths are relative to the request file. The analysis must contain a copied master
within its own root; its actual SHA-256, sample rate and frame count are verified.
The candidate clock declaration is the caller's evidence-backed attestation.

```json
{
  "schema": "stemlab.lyric-fusion-request.v1",
  "analysis": "analysis",
  "lyrics": "canonical-lyrics.txt",
  "candidates": [
    {"id":"vocal-a-full", "view_id":"vocal-a", "path":"a-full.json", "source_clock":"original_master_seconds"},
    {"id":"vocal-b-full", "view_id":"vocal-b", "path":"b-full.json", "source_clock":"original_master_seconds"},
    {"id":"vocal-a-mask", "view_id":"vocal-a", "path":"a-mask.json", "source_clock":"original_master_seconds"}
  ],
  "onset_tolerance_ms": 120,
  "end_tolerance_ms": 200
}
```

Eligible exact observations without native review flags rank above flagged exact
and fuzzy observations. Agreement within the declared onset/end tolerances adds
support once per distinct view. A chronological maximum-weight path with a small
source-switch penalty favours coherent selections. It may leave a word untimed
when all of its intervals conflict with stronger neighbouring evidence. The
scores are an explicit heuristic, not confidence percentages. Agreement flags do
not erase conflicting alternatives. No averaging, interpolation, clamping,
beat-snapping or forced alignment occurs. Seconds are rounded only to native
sample frames. The bounded route accepts at most 16 candidates, 10,000 canonical
tokens, 4,096 eligible observations and 12 MiB per JSON input.

## Preserve artist corrections

Optional `"locks":"artist-locks.json"` supplies explicit word locks:

```json
{
  "schema":"stemlab.lyric-fusion-locks.v1",
  "authority":"artist_confirmed",
  "source_sha256":"<actual master sha256>",
  "canonical_text_sha256":"<sha256 of the exact decoded canonical UTF-8 text>",
  "sample_rate":44100,
  "num_frames":7056000,
  "words":[{"canonical_index":3,"word":"quiet","start_frame":176400,"end_frame":189630}]
}
```

The example numbers are illustrative. Do not invent artist authority. Locks
partition selection and remain exact. Incompatible, overlapping or reversed
locks fail; the command never shifts them. The combined result remains a draft
even when some words have approved locks.

## Review and deliver

The new output directory contains:

- `combined-timeline.json`: all canonical words, selected sample frames, sources,
  corroboration groups, alternatives, conflicts, unresolved gaps and line flags.
- `lyrics.lrc` and `subtitles.srt`: complete canonical text for anchored lines.
  Line bounds use the first/last observed word; missing edges stay flagged in
  JSON. Unanchored lines are omitted from these timed formats, never guessed.
- `word-timings.json`: only positive-duration selected observations, suitable for
  the native word-track adapter; it is explicitly incomplete and provisional.
- `word-provenance.tsv`: every canonical token, including untimed words.
- `selection.svg`, request/input hashes and `manifest.json`.

The output must be new; existing directories are never overwritten. All inputs
remain unchanged. BPM, beat phase, cues, audio, timing edits and WordPress-selected
attachments remain untouched. The underlying Python API is
`stemlab.lyric_fusion.combine(text, audio, candidates, locks=...)`.

Feed the selected source-frame lines/words into the existing released timeline's
lyric-audition adapter. Listen to conflict regions, technical names, repeated
hooks, line onsets/ends and gap fills in context. Preserve lead/backing identity
when evidence overlaps; the present fusion route deliberately selects one
chronological canonical track. It cannot resolve simultaneous vocal parts.
Retain `accepted:false` and `listening_qa:pending` until actual artist review.
Do not install the result as canonical or publish it merely because more words
have timestamps.

## Reproduce without private music

```bash
python examples/lyric-fusion/build_example.py --output .work/fusion-example
stemlab fuse-lyrics .work/fusion-example/request.json --output .work/fusion-review
pytest tests/test_lyric_fusion.py tests/test_word_alignment.py tests/test_timing_edits.py
```

The example builds synthetic native reconciliation files and a silent WAV. It
downloads no models. See [the example README](../examples/lyric-fusion/README.md).
