## Sub-frame tempo precision and beat counting

Autocorrelation, multi-tap comb filtering and the eight-second local tempo
windows are evaluated at a 100 Hz feature frame rate, then the strongest
interior lag peak is refined with a **bounded three-bin parabola**. Both the
original integer lag/BPM and the interpolated lag remain in the JSON; edge,
flat or out-of-range maxima retain the original bin. This reduces systematic
integer-lag rounding (for example, 42 frames is 142.857 BPM whereas a true
145 BPM beat is about 41.38 frames), but does **not** establish that the music
is at the quarter-note level instead of half time.

The dynamic-programming onset path also exports
`beat_count_diagnostics`: inferred slots inside the observed path, source-wide
predicted slots, and estimates of unobserved leading/trailing positions.
Onset candidates are **not** human-annotated beats. Missing positions are not
fabricated as independent measurements, and a full-song count is not guaranteed
without musical tempo and beat-one confirmation. Each tempo family also reports
per-feature observed-onset-path coverage (and which features exceed 80% of the
source grid). These are **review cues**, not detector votes, calibrated confidence,
or an automatic preferred BPM; shared audio features are correlated.

To regression-test the precision boundaries, run
`python -m pytest tests/test_beat_subframe_precision.py -q`.
