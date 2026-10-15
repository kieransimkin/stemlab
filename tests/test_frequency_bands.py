"""Known-frequency, clock, stereo and native-export checks for Fourier dimensions."""
import json
import os
from dataclasses import replace

import numpy as np
import pytest
import soundfile as sf
from typer.testing import CliRunner

from stemlab.analysis.frequency_bands import FourierBand, band_envelopes, frequency_edges
from stemlab.analysis.rudiment_recordings import AxisSpec, EnvelopeBank, extract_recording, fourier_axes
from stemlab.analysis.rudiment_batch import export_single
from stemlab.util import sha256_file

try:
    from dancerudiments_authoring.recording import load_recording
except ImportError:
    if os.environ.get('STEMLAB_REQUIRE_RECORDINGS') == '1':
        raise
    pytest.skip('Optional recording API not installed', allow_module_level=True)


def write_audio(tmp_path, x, *, name='master.wav', sr=8192):
    path = tmp_path/name
    sf.write(path, x, sr, subtype='DOUBLE')
    return path


def tone(frequency, duration=2., amplitude=.8, sr=8192):
    return amplitude*np.sin(2*np.pi*frequency*np.arange(int(duration*sr))/sr)


def test_32_buckets_are_32_named_dimensions_with_native_playback(tmp_path):
    p = write_audio(tmp_path, np.where(np.arange(16384) < 8192, tone(576), tone(2624)))
    axes = fourier_axes(p, 32, fft_size=1024)
    bank = EnvelopeBank([p], bpm=120)
    recording = bank.compose(axes, normalization='none')
    values = np.asarray(recording.samples)
    assert recording.dimensions == tuple(f'band_{i:03d}' for i in range(32))
    assert values.shape == (256, 32)
    assert values[32:96, 4] == pytest.approx(2*.8/np.sqrt(2)-1, abs=1e-11)
    assert values[160:224, 20] == pytest.approx(2*.8/np.sqrt(2)-1, abs=1e-11)
    assert values[32:96, 20] == pytest.approx(-1., abs=1e-11)
    assert values[160:224, 4] == pytest.approx(-1., abs=1e-11)
    assert len(bank.fourier_cache) == 1 and len(bank.cache) == 0 and bank.cache_hits == 31
    assert bank.cached_values == values.size
    native = recording.to_native()
    for index in (0, 63, 255):
        assert native.sample(recording.clock.start_pip+index) == list(recording.samples[index])
    with pytest.raises((ValueError, IndexError)):
        native.sample(recording.clock.start_pip+256)
    item = recording.provenance['axes'][4]
    assert (item['frequency_low_hz'], item['frequency_high_hz']) == (512., 640.)
    assert item['fft_resolution_hz'] == 8
    assert item['source_sha256'] == sha256_file(p)
    assert item['output_scale'] == 'bipolar'


@pytest.mark.parametrize('kind', ['dc', 'nyquist', 'sine'])
def test_full_band_rms_calibration_including_dc_and_nyquist(tmp_path, kind):
    x = np.full(16384, .4) if kind == 'dc' else .4*(-1.)**np.arange(16384) if kind == 'nyquist' else tone(576, amplitude=.4)
    p = write_audio(tmp_path, x)
    bank = EnvelopeBank([p], bpm=120)
    values, _ = bank.envelope(fourier_axes(p, 1, fft_size=1024)[0])
    assert values[32:224] == pytest.approx(.4 if kind != 'sine' else .4/np.sqrt(2), abs=1e-12)


def test_stereo_powers_do_not_cancel_antiphase_or_double_level(tmp_path):
    x = tone(576)
    mono = write_audio(tmp_path, x)
    stereo = write_audio(tmp_path, np.column_stack((x, -x)), name='antiphase.wav')
    a = extract_recording(fourier_axes(mono, 8), bpm=120)
    b = extract_recording(fourier_axes(stereo, 8), bpm=120)
    np.testing.assert_array_equal(a.samples, b.samples)


def test_summed_band_power_equals_window_weighted_time_domain_power(tmp_path):
    x = np.random.default_rng(62).uniform(-.7, .7, (4096, 2))
    p = write_audio(tmp_path, x)
    spec = FourierBand(0, frequency_edges(8192, 32), 1024)
    values, _, starts, stops = band_envelopes(p, np.array([2016, 2080]), 0, len(x), spec)
    window = np.hanning(1025)[:-1]
    expected = np.mean(np.sum((x[1536:2560]*window[:, None])**2, axis=0)/np.sum(window**2))
    assert np.sum(values**2) == pytest.approx(expected, abs=1e-14)
    assert np.array_equal(stops[:-1], starts[1:])
    assert starts[0] == 0 and stops[-1] == 513


@pytest.mark.parametrize('normalization', ['none', 'global', 'per-axis'])
def test_silence_and_bipolar_gain_use_shared_composition(tmp_path, normalization):
    p = write_audio(tmp_path, np.zeros(512))
    recording = extract_recording(fourier_axes(p, 32), bpm=120, normalization=normalization)
    assert np.count_nonzero(recording.samples) == 0
    assert all(a['silent_axis'] for a in recording.provenance['axes'])
    sound = write_audio(tmp_path, tone(576), name='tone.wav')
    axes = fourier_axes(sound, 1, fft_size=1024)
    a = extract_recording(axes, bpm=120, normalization=normalization)
    b = extract_recording([replace(axes[0], gain=-1)], bpm=120, normalization=normalization)
    np.testing.assert_array_equal(np.asarray(a.samples), -np.asarray(b.samples))
    assert np.abs(a.samples).max() <= 1


def test_excerpt_does_not_read_neighbouring_programme(tmp_path):
    x = tone(576)
    y = x.copy()
    y[:4096] = 1
    y[8192:] = -1
    a = write_audio(tmp_path, x)
    b = write_audio(tmp_path, y, name='different_outside_excerpt.wav')
    kwargs = dict(bpm=123.456, beat_zero_seconds=.013, start_seconds=.5, end_seconds=1.)
    one = extract_recording(fourier_axes(a, 32, fft_size=1024), **kwargs)
    two = extract_recording(fourier_axes(b, 32, fft_size=1024), **kwargs)
    np.testing.assert_array_equal(one.samples, two.samples)
    ordinary = extract_recording([AxisSpec('amplitude', a)], **kwargs)
    assert one.clock == ordinary.clock and len(one.samples) == len(ordinary.samples)
    assert one.provenance['axes'][0]['partial_windows'] >= 1


def test_padding_has_neutral_silence_without_spectral_tail_in_empty_pips(tmp_path):
    short = write_audio(tmp_path, tone(576, duration=.5))
    long = write_audio(tmp_path, tone(576, duration=1.), name='long.wav')
    bank = EnvelopeBank([short, long], bpm=120, length_policy='pad')
    envelope, stats = bank.envelope(fourier_axes(short, 1)[0])
    assert np.count_nonzero(envelope[64:]) == 0 and stats['empty_windows'] == 64


@pytest.mark.parametrize('kwargs', [dict(bands=0), dict(bands=True), dict(bands=1025),
    dict(fft_size=1000), dict(minimum=-1), dict(maximum=5000), dict(maximum=float('nan')),
    dict(spacing='mel'), dict(spacing='log'), dict(bands=32, fft_size=16)])
def test_invalid_or_unresolved_bands_are_errors(tmp_path, kwargs):
    p = write_audio(tmp_path, np.zeros(512))
    with pytest.raises(ValueError):
        fourier_axes(p, **kwargs)


def test_log_bins_and_explicit_limits(tmp_path):
    p = write_audio(tmp_path, tone(576))
    axes = fourier_axes(p, 8, fft_size=4096, minimum=32, maximum=2048, spacing='log')
    edges = axes[0].fourier.edges_hz
    assert edges[0] == 32 and edges[-1] == 2048
    np.testing.assert_allclose(np.array(edges[1:])/edges[:-1], [edges[1]/edges[0]]*8)
    assert len(extract_recording(axes, bpm=120).dimensions) == 8


def test_cache_budget_and_changed_sources_are_not_ignored(tmp_path, monkeypatch):
    import stemlab.analysis.rudiment_recordings as module
    p = write_audio(tmp_path, tone(576))
    axes = fourier_axes(p, 32)
    bank = EnvelopeBank([p], bpm=120)
    monkeypatch.setattr(module, 'MAX_CACHED_VALUES', 100)
    with pytest.raises(ValueError, match='budget'):
        bank.compose(axes)
    monkeypatch.setattr(module, 'MAX_CACHED_VALUES', 32_000_000)
    bank.compose(axes, normalization_reference='peak')
    p.write_bytes(b'changed')
    with pytest.raises(ValueError, match='changed'):
        bank.verify_sources()


@pytest.mark.parametrize('bad', [float('nan'), float('inf')])
def test_nonfinite_audio_fails_transactionally(tmp_path, bad):
    x = np.zeros(512)
    x[200] = bad
    p = write_audio(tmp_path, x)
    with pytest.raises(ValueError, match='non-finite'):
        export_single(p, tmp_path/'output', fourier_axes(p), timing={'bpm':120}, harness=False)
    assert not (tmp_path/'output').exists()


def test_cli_master_and_saved_stem_with_full_native_harness(tmp_path):
    from stemlab.cli import app
    runner = CliRunner()
    p = write_audio(tmp_path, tone(576, duration=.5))
    out = tmp_path/'output'
    args = ['record-rudiment', str(p), '--bpm', '120', '--frequency-bands', '32',
            '--normalize', 'global', '--gain', 'band_004=-1', '-o', str(out)]
    result = runner.invoke(app, args)
    assert result.exit_code == 0, result.output
    recording = load_recording(out/'recordings/audio_recording.json')
    assert len(recording.dimensions) == 32 and recording.clock.bpm == 120
    assert (out/'index.html').is_file() and not list(out.glob('*.wav'))
    assert json.loads((out/'report.json').read_text())['extraction_passes'] == 1
    assert recording.to_native().sample(0) == list(recording.samples[0])

    root = tmp_path/'saved'
    root.mkdir()
    master = write_audio(root, tone(576, duration=.5))
    stem = write_audio(root, tone(2624, duration=.5), name='drums.wav')
    manifest = dict(source=dict(copied_path='master.wav', sha256=sha256_file(master)),
                    models=[dict(spec=dict(slug='test'), stems=[dict(stem='drums', path='drums.wav')])])
    (root/'analysis.json').write_text(json.dumps(manifest))
    result = runner.invoke(app, ['record-rudiment', str(root), '--bpm', '120',
        '--frequency-bands', '32', '--frequency-source', 'test/drums', '--no-harness', '-o', str(tmp_path/'stem')])
    assert result.exit_code == 0, result.output
    recording = load_recording(tmp_path/'stem/recordings/audio_recording.json')
    assert all(a['source_sha256'] == sha256_file(stem) for a in recording.provenance['axes'])


@pytest.mark.parametrize('options', [[], ['--axis', 'x=master'], ['--mode', 'average'],
    ['--low-pass', 'band_000=200'], ['--fft-size', '1000'], ['--frequency-scale', 'log'],
    ['--gain', 'missing=1'], ['--legacy']])
def test_cli_invalid_requests_leave_no_output(tmp_path, options):
    from stemlab.cli import app
    p = write_audio(tmp_path, np.zeros(512))
    args = ['record-rudiment', str(p), '--frequency-bands', '32', '-o', str(tmp_path/'output')]
    if options:
        args += ['--bpm', '120']+options
    result = CliRunner().invoke(app, args)
    assert result.exit_code != 0 and not (tmp_path/'output').exists()


def test_fourier_options_need_frequency_bands(tmp_path):
    from stemlab.cli import app
    p = write_audio(tmp_path, np.zeros(512))
    result = CliRunner().invoke(app, ['record-rudiment', str(p), '--bpm', '120',
        '--fft-size', '4096', '-o', str(tmp_path/'output')])
    assert result.exit_code != 0 and 'require --frequency-bands' in result.output
