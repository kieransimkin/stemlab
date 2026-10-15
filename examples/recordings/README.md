# Synthetic recording examples

Run the generator from a StemLab checkout with the optional recording-enabled
DanceRudiments companion installed:

```bash
python examples/recordings/generate_demo.py --output ./synthetic-demo
```

Choose a new output directory. No song or model download is needed. The generator
synthesizes four tracks and a master at 120 BPM, then writes a bass/treble example,
a six-dimensional recording and a 48-candidate mixed-dimension batch. Open the
`index.html` inside each example and press Play to hear its synthesized source.

## Additional outputs

The synthetic generator also exports `stem-pairs/index.html` (36 recordings from
different input tracks) and `averages/index.html` (18 fixed pairs × six peak,
average and centered moving-average settings). These use the shared native
DanceRudiments harness and include the synthesized audio; they are not separated
Arcadians stems. See [the modes and real-song CI pages](../../docs/recording-pairs.md).
