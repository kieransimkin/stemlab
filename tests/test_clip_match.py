from pathlib import Path

import numpy as np
import pytest
import soundfile as sf
from scipy.signal import resample_poly
from typer.testing import CliRunner

from stemlab.clip_match import decode_audio, match_clip, match_samples


def recording(rate=4000, seconds=15):
    rng = np.random.default_rng(4701)
    return rng.normal(0, 0.1, (rate * seconds, 2))


def test_unique_gain_fade_noise_and_stereo_phase():
    rate = 4000
    source = recording(rate)
    source[:, 1] = -source[:, 0]
    offset = 21251
    clip = source[offset:offset + 4 * rate].copy() * 0.5
    clip[:rate // 4] *= np.linspace(0, 1, rate // 4)[:, None]
    clip[-rate // 4:] *= np.linspace(1, 0, rate // 4)[:, None]
    clip += np.random.default_rng(5).normal(0, 0.0001, clip.shape)
    report = match_samples(source, clip, rate)
    assert report['status'] == 'matched'
    assert report['mapping']['offset'] == offset / rate
    assert report['mapping']['duration'] == 4
    assert len(report['anchors']) == 5


def test_identical_repeated_passage_stays_ambiguous():
    rate = 4000
    source = recording(rate)
    source[8 * rate:12 * rate] = source[2 * rate:6 * rate]
    report = match_samples(source, source[2 * rate:6 * rate], rate)
    assert report['status'] == 'unresolved'
    assert report['mapping'] is None
    assert 'ambiguous' in report['reason']


@pytest.mark.parametrize('kind', ['silence', 'constant', 'different', 'edit', 'rate'])
def test_invalid_clock_relationship_is_not_auto_mapped(kind):
    rate = 4000
    source = recording(rate)
    clip = source[2 * rate:6 * rate].copy()
    if kind == 'silence':
        clip[:] = 0
    elif kind == 'constant':
        clip[:] = 0.1
    elif kind == 'different':
        clip = np.random.default_rng(3).normal(0, 0.1, clip.shape)
    elif kind == 'edit':
        clip[2 * rate:] = source[10 * rate:12 * rate]
    else:
        clip = resample_poly(clip, 101, 100, axis=0)
    result = match_samples(source, clip, rate)
    assert result['status'] == 'unresolved'
    assert result['mapping'] is None


@pytest.mark.parametrize('value', [float('nan'), float('inf'), -1, 0])
def test_invalid_thresholds(value):
    with pytest.raises(ValueError):
        match_samples(recording(), recording(seconds=3), 4000, min_correlation=value)


def test_local_hashes_range_and_rate_conversion(tmp_path):
    rate = 8000
    source = recording(rate)
    source_path, clip_path = tmp_path / 'source.wav', tmp_path / 'clip.wav'
    sf.write(source_path, source, rate, subtype='FLOAT')
    # One second of unrelated material before the matching four-second excerpt.
    clip = np.concatenate([recording(rate, 1), source[5 * rate:9 * rate]])
    sf.write(clip_path, resample_poly(clip, 3, 2, axis=0), 12000, subtype='FLOAT')
    result = match_clip(source_path, clip_path, clip_start=1, clip_end=5)
    assert result['status'] == 'matched'
    assert result['mapping'] == {'offset': 5.0, 'duration': 4.0, 'playerStart': 1.0}
    assert len(result['source']['sha256']) == len(result['clip']['sha256']) == 64
    assert result['schema'] == 'stemlab.clip-match.v1'
    with pytest.raises(ValueError):
        match_clip(source_path, clip_path, clip_end=7)
    with pytest.raises(ValueError):
        decode_audio(Path('https://example.invalid/source.mp4'))
    with pytest.raises(ValueError):
        decode_audio(source_path, max_seconds=2)


def test_cli_preserves_existing_inputs_and_reports_unresolved(tmp_path):
    from stemlab.cli import app

    source, clip, result = tmp_path / 'source.wav', tmp_path / 'clip.wav', tmp_path / 'match.json'
    sf.write(source, recording(), 4000, subtype='FLOAT')
    sf.write(clip, np.zeros((12000, 2)), 4000, subtype='FLOAT')
    runner = CliRunner()
    output = runner.invoke(app, ['match-clip', str(source), str(clip), '--output', str(result)])
    assert output.exit_code == 2
    assert result.is_file()
    before = source.read_bytes()
    output = runner.invoke(app, ['match-clip', str(source), str(clip), '--output', str(source)])
    assert output.exit_code == 2
    assert source.read_bytes() == before
