"""Measured synthetic envelopes and native recordings, not model-inference evidence."""
from __future__ import annotations

from dataclasses import replace
import json
import os
from pathlib import Path
from unittest.mock import patch

import numpy as np
import pytest
import soundfile as sf
from typer.testing import CliRunner

from stemlab.analysis.rudiment_recordings import AxisSpec, EnvelopeBank, smooth_envelope, moving_average_pips
from stemlab.analysis.rudiment_pairs import generate_stem_batch, generate_average_comparison_batch, separation_config
from stemlab.recording_cli import resolve_axes
from stemlab.util import sha256_file

try:
    from dancerudiments_authoring.recording import load_recording
except ImportError:
    if os.environ.get('STEMLAB_REQUIRE_RECORDINGS') == '1':
        raise
    pytest.skip('Optional DanceRudiments recording companion not installed', allow_module_level=True)


def make_sources(root, *, stems=3, seconds=.5, sr=8000):
    root = Path(root)
    (root/'input').mkdir(parents=True)
    (root/'stems/test').mkdir(parents=True)
    t = np.arange(int(seconds*sr))/sr
    waves = [(.18+.09*np.sin(2*np.pi*(2+i)*t)) * np.sin(2*np.pi*(130+i*871)*t) for i in range(stems)]
    master = root/'input/master.wav'
    sf.write(master, np.stack((sum(waves), -sum(waves)), axis=1), sr, subtype='FLOAT')
    artifacts = []
    for i, wave in enumerate(waves):
        p = root/f'stems/test/stem_{i}.wav'
        sf.write(p, np.stack((wave, -wave), axis=1), sr, subtype='FLOAT')
        artifacts.append({'model': 'test', 'stem': f'stem_{i}', 'path': p.relative_to(root).as_posix()})
    (root/'analysis.json').write_text(json.dumps({'source': {'copied_path': 'input/master.wav',
        'sha256': sha256_file(master)}, 'models': [{'spec': {'slug': 'test'}, 'stems': artifacts}],
        'beats': [{'model': 'test', 'tempo_bpm': 120, 'beats': [0, .5, 1]}]}))
    return root


@pytest.mark.parametrize('width', [1, 2, 3, 4, 16, 63, 4096])
def test_centered_average_matches_direct_reference(width):
    data = np.random.default_rng(1).random(37)
    result = smooth_envelope(data, width)
    half = width//2
    expected = []
    for i in range(len(data)):
        bins = np.arange(max(0, i-half), min(len(data), i+half+1))
        weights = np.ones(len(bins))
        if width % 2 == 0:
            weights[np.abs(bins-i) == half] = .5
        expected.append(np.average(data[bins], weights=weights))
    assert result == pytest.approx(expected, abs=1e-12)
    assert len(result) == len(data)
    assert smooth_envelope(np.ones(7)*.7, width) == pytest.approx([.7]*7, abs=1e-12)


@pytest.mark.parametrize('width', [2, 3, 4, 16, 63])
def test_smoothing_has_no_phase_shift_or_wrap(width):
    impulse = np.zeros(129)
    impulse[64] = 1
    result = smooth_envelope(impulse, width)
    assert result == pytest.approx(result[::-1])
    assert np.dot(np.arange(129), result)/result.sum() == pytest.approx(64)
    assert result.max() < 1
    impulse[:] = 0
    impulse[0] = 1
    assert smooth_envelope(impulse, width)[-1] == 0


@pytest.mark.parametrize('window', [0, -1, float('nan'), float('inf'), True, 65])
def test_bad_window_rejected(window):
    with pytest.raises(ValueError):
        moving_average_pips(window)
    with pytest.raises(ValueError):
        AxisSpec('x', Path('x'), moving_average_beats=window)


def test_quantization_and_short_file():
    assert moving_average_pips(.25) == 16
    assert moving_average_pips(1/128) == 1
    assert moving_average_pips(2.5/64) == 3
    assert smooth_envelope([.6], 16).tolist() == [.6]


def test_bank_uses_rectified_means_then_smoothing_and_reuses_extraction(tmp_path):
    root = make_sources(tmp_path/'a')
    p = root/'input/master.wav'
    axis = AxisSpec('x', p, mode='average', low_pass=180)
    bank = EnvelopeBank([p], bpm=120, block_frames=17)
    avg, _ = bank.envelope(axis)
    smooth, stats = bank.envelope(replace(axis, mode='moving-average', moving_average_beats=.25))
    assert smooth == pytest.approx(smooth_envelope(avg, 16), abs=1e-12)
    assert stats['moving_average_window_pips'] == 16
    assert stats['moving_average_seconds'] == .125
    bank.envelope(replace(axis, mode='moving-average'))
    assert len(bank.cache) == 1 and len(bank.smoothing_cache) == 1
    assert bank.cached_values == bank.count*3
    other = EnvelopeBank([p], bpm=120, block_frames=8192)
    assert other.envelope(replace(axis, mode='moving-average'))[0] == pytest.approx(smooth, abs=1e-12)


def test_pair_candidates_have_different_stems_and_reproducible_filters(tmp_path):
    root = make_sources(tmp_path/'a')
    reports = []
    for name in ('one', 'two'):
        reports.append(generate_stem_batch(root, tmp_path/name, bpm=120, max_candidates=18, harness=True, include_audio=True))
    report = reports[0]
    assert report['candidate_count'] == 18
    assert all(c['dimensions'] == 2 and len(set(c['sources'])) == 2 for c in report['candidates'])
    assert all('master' not in c['sources'] for c in report['candidates'])
    assert {tuple(c['sources']) for c in report['candidates'][:6]} == {
        (f'test/stem_{i}', f'test/stem_{j}') for i in range(3) for j in range(3) if i != j}
    assert any(c['filters'] != ['raw', 'raw'] for c in report['candidates'][6:])
    assert report['candidates'] == reports[1]['candidates']
    assert (tmp_path/'one/index.html').is_file()
    assert sha256_file(tmp_path/'one/audio.wav') == sha256_file(root/'input/master.wav')
    import dancerudiments
    r = load_recording(tmp_path/'one/recordings/candidate_0001.json')
    native = r.to_native()
    assert isinstance(native, dancerudiments.SampledRecording)
    assert native.sample(0) == list(r.samples[0])


def test_mode_groups_keep_sources_filters_gains_clock_and_scales_fixed(tmp_path):
    root = make_sources(tmp_path/'a')
    output = tmp_path/'comparison'
    report = generate_average_comparison_batch(root, output, max_pairs=14, windows_beats=(.125, .5), harness=False)
    assert report['candidate_count'] == 56
    assert any(p['sources'][0] == p['sources'][1] == 'master' for p in report['pairs'])
    assert report['normalization_reference'] == 'peak'
    assert report['smoothing_passes'] > 0
    candidates = {c['name']: c for c in report['candidates']}
    for group in report['pairs']:
        records = [load_recording(output/candidates[name]['file']) for name in group['candidates']]
        assert len(records) == 4
        assert [r.provenance['axes'][0]['mode'] for r in records] == ['peak', 'average', 'moving-average', 'moving-average']
        for r in records:
            assert r.dimensions == ('x', 'y') and r.clock == records[0].clock
            assert r.provenance['route_sources'] == group['sources']
            assert r.provenance['route_filters'] == group['filters']
            for j, axis in enumerate(r.provenance['axes']):
                first = records[0].provenance['axes'][j]
                for key in ('source_sha256', 'filter_order', 'low_pass', 'high_pass', 'gain', 'normalization_divisor'):
                    assert axis[key] == first[key]
        avg = np.array(records[1].samples)
        for r, width in zip(records[2:], (8, 32)):
            for j in range(2):
                assert np.array(r.samples)[:, j] == pytest.approx(smooth_envelope(avg[:, j], width), abs=3e-12)


def test_master_only_does_not_call_separation(tmp_path):
    root = make_sources(tmp_path/'a')
    with patch('stemlab.analysis.rudiment_pairs.separation_config', side_effect=AssertionError('No inference')):
        report = generate_average_comparison_batch(root, tmp_path/'out', bpm=145, master_only=True,
                                                  max_pairs=2, harness=False)
    assert len(report['sources']) == 1 and report['sources'][0]['key'] == 'master'
    assert report['candidate_count'] == 12


def test_bpm_and_output_are_checked_before_model_download(tmp_path):
    p=tmp_path/'song.wav'
    sf.write(p, np.ones(800), 8000)
    with patch('stemlab.analysis.rudiment_pairs.separation_config', side_effect=AssertionError('No inference')):
        with pytest.raises(ValueError, match='BPM'):
            generate_stem_batch(p, tmp_path/'out', harness=False)
        occupied=tmp_path/'occupied'
        occupied.mkdir()
        with pytest.raises(FileExistsError):
            generate_stem_batch(p, occupied, bpm=120, harness=False)
        with pytest.raises(ValueError, match='window'):
            generate_average_comparison_batch(p, tmp_path/'out', bpm=120, windows_beats=(0,), harness=False)


def test_identical_stem_files_cannot_be_presented_as_different_inputs(tmp_path):
    import shutil
    root = make_sources(tmp_path/'a', stems=2)
    shutil.copyfile(root/'stems/test/stem_0.wav', root/'stems/test/stem_1.wav')
    with pytest.raises(ValueError, match='distinct stems'):
        generate_stem_batch(root, tmp_path/'out', bpm=120, harness=False)
    assert not (tmp_path/'out').exists()


def test_partial_mode_groups_are_never_exported(tmp_path, monkeypatch):
    import stemlab.analysis.rudiment_pairs as pairs
    root=make_sources(tmp_path/'a')
    # .5 seconds at 120 BPM: 64 pips * 2 dims * 6 variants = 768/group.
    monkeypatch.setattr(pairs, 'MAX_BATCH_VALUES', 800)
    report=generate_average_comparison_batch(root, tmp_path/'out', max_pairs=12, harness=False)
    assert report['candidate_count'] == 6 and report['pair_count'] == 1
    assert report['limit_reason'] == 'batch_value_budget'


def test_duplicate_and_static_modes_kept_for_fair_comparison(tmp_path):
    p = tmp_path/'constant.wav'
    sf.write(p, np.ones(800)*.2, 8000, subtype='FLOAT')
    root = make_sources(tmp_path/'a', stems=2)
    import shutil
    shutil.copyfile(p, root/'stems/test/stem_0.wav')
    report=generate_average_comparison_batch(root, tmp_path/'out', bpm=120, max_pairs=1,
        harness=False, length_policy='pad')
    assert report['candidate_count'] == 6


def test_separation_recipe_does_not_run_unrelated_models(tmp_path):
    c=separation_config(tmp_path/'song.mp3',tmp_path/'result','htdemucs_6s','cpu')
    assert c.models == ('htdemucs_6s',) and c.continue_on_error is False
    assert not any((c.make_spectrograms,c.run_whisper,c.run_vamp,c.run_beats,c.run_structure,c.run_deep_analysis,
                    c.run_text_semantics,c.run_audio_semantics,c.run_loops))


def test_per_axis_smoothing_windows(tmp_path):
    root=make_sources(tmp_path/'a')
    p=root/'input/master.wav'
    axes=resolve_axes(p,{'master':p},axes=['x=master','y=master'],mode='moving-average',
                      moving_average_beats=.25,axis_window=['y=1'])
    assert [a.moving_average_beats for a in axes] == [.25,1]
    with pytest.raises(ValueError,match='unknown axes'):
        resolve_axes(p,{'master':p},axes=['x=master'],axis_window=['y=1'])


def test_new_cli_saved_sources_and_master_only(tmp_path):
    from stemlab.cli import app
    root=make_sources(tmp_path/'a')
    for cmd, flags in [('generate-stem-batch',['--max-candidates','6']),
                       ('generate-average-comparison',['--master-only','--max-pairs','2','--window-beats','.25'])]:
        result=CliRunner().invoke(app,[cmd,str(root),'--output',str(tmp_path/cmd),'--no-harness',*flags])
        assert result.exit_code == 0, result.output
    result=CliRunner().invoke(app,['record-rudiment',str(root/'input/master.wav'),'--bpm','120',
        '--axis','x=master','--mode','moving-average','--moving-average-beats','.5',
        '--no-harness','--output',str(tmp_path/'single')])
    assert result.exit_code == 0, result.output
