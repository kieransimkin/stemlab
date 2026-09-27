import numpy as np
import soundfile as sf

from stemlab.analysis.sonic import analyze_sonic_features
from stemlab.analysis.rhythm import analyze_rhythm
from stemlab.analysis.tempo_regimes import analyze_tempo_regimes, constant_beat_fit
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
    assert rhythm["tempo_regimes"]["sections"][0]["beat_fit"]["precision_grade"] == "tight"


def test_constant_grid_precision_and_abrupt_tempo_change():
    constant = np.arange(32, dtype=float) * 0.5
    fit = constant_beat_fit(constant)
    assert fit is not None
    assert fit["proposed_bpm"] == 120.0
    assert fit["p95_absolute_beat_error_ms"] == 0.0
    assert fit["precision_grade"] == "tight"

    first = np.arange(24, dtype=float) * 0.5
    second = first[-1] + 0.5 + np.arange(1, 25, dtype=float) * 0.4
    result = analyze_tempo_regimes(np.concatenate([first, second]).tolist())
    abrupt = [event for event in result["events"] if event["kind"] == "abrupt"]
    assert abrupt
    assert abrupt[0]["from_bpm"] == 120.0
    assert abrupt[0]["to_bpm"] == 150.0


def test_gradual_change_and_same_bpm_phase_skip():
    periods = np.linspace(0.6, 0.4, 48)
    ramp = np.concatenate([[0.0], np.cumsum(periods)])
    ramp_result = analyze_tempo_regimes(ramp.tolist())
    assert any(event["kind"] == "gradual" for event in ramp_result["events"])

    base = np.arange(40, dtype=float) * 0.5
    shifted = base.copy()
    shifted[20:] += 0.125
    phase_result = analyze_tempo_regimes(shifted.tolist())
    phase = [event for event in phase_result["events"] if event["kind"] == "phase_skip"]
    assert phase
    assert abs(phase[0]["phase_shift_beats"] - 0.25) < 0.02
    assert phase[0]["tempo_difference_percent"] <= 3.5
