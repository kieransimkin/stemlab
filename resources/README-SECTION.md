**Tempo precision update:** Classical autocorrelation and comb-filter lag peaks
now retain their original 100 Hz integer-bin BPM while also reporting a bounded
sub-frame estimate. Local tempo windows use the same refinement, and tempo
families expose source-wide observed-onset-path coverage as a review diagnostic,
not as calibrated confidence or automatic BPM approval. Predicted beats,
observed onset candidates and inferred ordinal gaps remain distinct. See
[beat-evidence documentation](docs/beat-evidence.md#sub-frame-tempo-precision-and-beat-counting).
