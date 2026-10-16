"""Signed-waveform resampling DSP without the optional DanceRudiments package."""
from fractions import Fraction
from types import SimpleNamespace

import numpy as np
import pytest
import soundfile as sf
from scipy.signal import butter

from stemlab.analysis.rudiment_recordings import sample_signed_waveform


def sample(path, bpm=120, *, beat_zero=0., start=0., end=3.,
           user_sos=None, block_frames=17, phase='zero'):
    pip_seconds = Fraction(60, 64) / Fraction(str(bpm))
    first = (Fraction(str(start)) - Fraction(str(beat_zero))) // pip_seconds
    last = -(-(Fraction(str(end)) - Fraction(str(beat_zero))) // pip_seconds)
    clock = SimpleNamespace(start_pip=first, beat_zero_seconds=beat_zero,
                            pip_seconds=pip_seconds)
    info = sf.info(path)
    return sample_signed_waveform(
        path, clock, last - first, start=Fraction(str(start)),
        end=Fraction(str(end)), sr=info.samplerate, frames=info.frames,
        user_sos=user_sos, phase=phase, block_frames=block_frames)


def write(tmp_path, data, rate=8000):
    p = tmp_path / 'input.wav'
    sf.write(p, np.asarray(data), rate, subtype='DOUBLE')
    return p


def test_signed_waveform_follows_pip_centres_without_drift(tmp_path):
    sr = 8000
    t = np.arange(sr * 3) / sr
    p = write(tmp_path, .5 * np.sin(2 * np.pi * 8 * t))
    actual, stats = sample(p)
    centres = (np.arange(len(actual)) + .5) / 128
    expected = .5 * np.sin(2 * np.pi * 8 * centres)
    np.testing.assert_allclose(actual[35:-35], expected[35:-35], atol=.0002, rtol=0)
    assert actual[40:200].min() < -.49 and actual[40:200].max() > .49
    assert stats['sampled_centres'] == len(actual)
    assert stats['antialias_filter_order'] == 12
    assert stats['native_rate_hz'] == 128


def test_aliased_audio_is_suppressed_before_interpolation(tmp_path):
    sr = 8000
    t = np.arange(sr * 3) / sr
    p = write(tmp_path, np.sin(2 * np.pi * 400 * t))
    raw, _ = sample(p)
    assert np.sqrt(np.mean(raw[35:-35] ** 2)) < .001


def test_stereo_downmix_keeps_signed_pcm_and_cancels_antiphase(tmp_path):
    sr = 8000
    t = np.arange(sr * 3) / sr
    p = write(tmp_path, np.column_stack((
        .25 * np.sin(2 * np.pi * 8 * t) + .5 * np.sin(2 * np.pi * 400 * t),
        .25 * np.sin(2 * np.pi * 8 * t) - .5 * np.sin(2 * np.pi * 400 * t),
    )))
    signed, _ = sample(p)
    expected = .25 * np.sin(2 * np.pi * 8 * (np.arange(len(signed)) + .5) / 128)
    np.testing.assert_allclose(signed[35:-35], expected[35:-35], atol=.002, rtol=0)
    anti = write(tmp_path, np.column_stack((np.sin(2 * np.pi * 8 * t),
                                           -np.sin(2 * np.pi * 8 * t))))
    cancelled, _ = sample(anti)
    assert np.max(np.abs(cancelled)) < 1e-10


def test_user_filters_operate_before_resampling(tmp_path):
    sr = 8000
    t = np.arange(sr * 3) / sr
    p = write(tmp_path, .45 * np.sin(2 * np.pi * 3 * t) +
              .35 * np.sin(2 * np.pi * 24 * t))
    low, _ = sample(p, user_sos=butter(6, 10, btype='lowpass', fs=sr, output='sos'))
    high, _ = sample(p, user_sos=butter(6, 10, btype='highpass', fs=sr, output='sos'))
    centres = (np.arange(len(low)) + .5) / 128
    i = slice(35, -35)
    low_tone = np.sin(2 * np.pi * 3 * centres[i])
    high_tone = np.sin(2 * np.pi * 24 * centres[i])

    def component(a, tone):
        return float(np.dot(a[i], tone) / np.dot(tone, tone))

    assert component(low, low_tone) > .40
    assert abs(component(low, high_tone)) < .02
    assert component(high, high_tone) > .30
    assert abs(component(high, low_tone)) < .02


@pytest.mark.parametrize('phase', ['zero', 'causal'])
def test_disk_block_size_does_not_change_samples(tmp_path, phase):
    rng = np.random.default_rng(14)
    p = write(tmp_path, rng.normal(scale=.2, size=(8000 * 3, 2)))
    small, _ = sample(p, phase=phase, block_frames=17)
    large, _ = sample(p, phase=phase, block_frames=99999)
    np.testing.assert_allclose(small, large, atol=1e-12, rtol=0)


def test_excerpt_boundaries_are_zero_padded(tmp_path):
    p = write(tmp_path, np.ones(8000 * 3) * .3)
    values, stats = sample(p, start=.37, end=.91)
    assert stats['padded_centres'] >= 1
    assert values[-1] == 0.
    np.testing.assert_allclose(values[5:-5], .3, atol=.001)


def test_noninteger_bpm_and_nonzero_beat_origin(tmp_path):
    sr, bpm, beat_zero = 8000, 123.456, .137
    t = np.arange(sr * 3) / sr
    p = write(tmp_path, .4 * np.sin(2 * np.pi * 3 * t))
    actual, stats = sample(p, bpm, beat_zero=beat_zero)
    pip_seconds = Fraction(60, 64) / Fraction(str(bpm))
    first = (-Fraction(str(beat_zero))) // pip_seconds
    centres = np.array([float(Fraction(str(beat_zero)) +
                              (first + i + Fraction(1, 2)) * pip_seconds)
                        for i in range(len(actual))])
    expected = .4 * np.sin(2 * np.pi * 3 * centres)
    np.testing.assert_allclose(actual[40:-40], expected[40:-40], atol=.0002, rtol=0)
    assert stats['padded_centres'] >= 1
