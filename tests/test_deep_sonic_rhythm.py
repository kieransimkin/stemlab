import numpy as np
import soundfile as sf

from stemlab.analysis.audio_features import analyze_sonic_features
from stemlab.analysis.rhythm import analyze_rhythm
from stemlab.types import BeatResult


def _test_audio(path, sr=22050, duration=4.0):
    t = np.arange(int(sr * duration)) / sr
    x = 0.12 * np.sin(2 * np.pi * 220 * t)
    for beat in np.arange(0, duration, .5):
        i = int(beat * sr)
        n = min(256, len(x) - i)
        x[i:i+n] += 0.5 * np.hanning(n)
    sf.write(path, np.stack([x, .9 * x], axis=1).astype("float32"), sr)


def test_sonic_and_rhythm_outputs(tmp_path):
    audio = tmp_path / "test.wav"
    _test_audio(audio)
    sonic = analyze_sonic_features(audio, tmp_path / "sonic")
    assert sonic["loudness"]["integrated_lufs_bs1770"] is not None
    assert sonic["stereo"]["left_right_correlation"] > .95

    beat_times = [i * .5 for i in range(8)]
    beat_result = BeatResult("consensus", beat_times, [0.0, 2.0], 120.0)
    rhythm = analyze_rhythm(audio, [beat_result], tmp_path / "rhythm")
    assert rhythm["tempo"]["median_bpm"] == 120.0
    assert rhythm["meter"]["estimated_beats_per_bar"] == 4
