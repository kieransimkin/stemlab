import io
import json
import numpy as np
import pytest
import soundfile as sf
from stemlab.analysis.loops import LoopConfig, analyze_loops, analyze_existing_loops, grid_metrics, optimize_join, preview_loop
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import sha256_file

def fixture(tmp_path, sr=8000, seconds=20, stereo=False):
    t = np.arange(sr * seconds) / sr
    y = (0.05 * np.sin(2 * np.pi * 50 * t)).astype('float32')
    if stereo:
        y = np.column_stack((y, -y))
    master = tmp_path / 'master.wav'
    vocal = tmp_path / 'vocals.wav'
    sf.write(master, y, sr, subtype='FLOAT')
    sf.write(vocal, np.zeros_like(y), sr, subtype='FLOAT')
    beats = BeatResult('all_in_one', list(np.arange(0, seconds + 0.01, 0.5)), list(np.arange(0, seconds + 0.01, 2)), 120)
    sections = {'section_source': 'test', 'sections': [{'start': 0, 'end': 8, 'label': 'Verse 1'}, {'start': 8, 'end': 16, 'label': 'Chorus 1'}]}
    stems = [StemArtifact('test', 'vocals', vocal)]
    return (master, y, beats, sections, stems)

def run(tmp_path, **kwargs):
    master, y, beats, sections, stems = fixture(tmp_path)
    report = analyze_loops(master, tmp_path / 'deep/loops', song_map=sections, beat_results=[beats], stems=stems, **kwargs)
    return (report, master, y)

def test_every_occurrence_and_native_exact_export(tmp_path):
    report, _master, y = run(tmp_path, export_audio=True)
    assert report['target_section_count'] == report['loop_count'] == 2
    assert not report['unresolved_sections']
    for loop in report['loops']:
        a, b = (loop['start_sample'], loop['end_sample'])
        assert b - a == loop['grid_end_sample'] - loop['grid_start_sample']
        assert b - a == loop['bars'] * 2 * report['sample_rate']
        data, sr = sf.read(tmp_path / 'deep/loops' / loop['file'], dtype='float32')
        np.testing.assert_array_equal(data, y[a:b])
        assert sr == report['sample_rate']
    json.loads((tmp_path / 'deep/loops/loops.json').read_text())

def test_default_does_not_write_audio(tmp_path):
    report, _, _ = run(tmp_path)
    assert report['loop_count'] == 2
    assert not list((tmp_path / 'deep/loops').rglob('*.wav'))
    assert all((x['file'] is None for x in report['loops']))

def test_no_vocal_evidence_is_not_safe(tmp_path):
    master, _, beats, sections, _ = fixture(tmp_path)
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=[], whisper_result={'words': [{'start': 3, 'end': 4}]})
    assert not report['loops']
    assert len(report['unresolved_sections']) == 2

@pytest.mark.parametrize('mode', ['stereo_antiphase', 'right_only', 'continuous'])
def test_vocals_veto_cut_even_when_mono_average_would_hide_them(tmp_path, mode):
    master, _, beats, sections, stems = fixture(tmp_path, stereo=True)
    y = np.full((8000 * 20, 2), 0.1, dtype='float32')
    if mode == 'stereo_antiphase':
        y[:, 1] *= -1
    if mode == 'right_only':
        y[:, 0] = 0
    sf.write(stems[0].path, y, 8000, subtype='FLOAT')
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert report['loop_count'] == 0

def test_timing_union_not_whisper_override(tmp_path):
    report, _, _ = run(tmp_path, whisper_result={'words': [{'start': 18, 'end': 19}]}, canonical={'lyric_timing': [{'start': 0, 'end': 8}]})
    assert all((x['section_kind'] != 'verse' for x in report['loops']))
    assert report['vocal_timing_sources'] == ['canonical', 'whisper_words']

def test_short_stem_and_lead_only_do_not_prove_silence(tmp_path):
    master, _, beats, sections, stems = fixture(tmp_path)
    sf.write(stems[0].path, np.zeros(8000), 8000)
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert not report['loops'] and report['vocal_diagnostics']
    stems[0].stem = 'lead_vocals'
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert not report['loops']

def test_bad_grids_are_not_silently_cleaned(tmp_path):
    master, _, beats, sections, stems = fixture(tmp_path)
    beats.beats[4] = beats.beats[3]
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert not report['loops'] and report['grid_diagnostics']

def test_meter_and_phase_skip_rejected():
    beats = np.arange(17) * 0.5
    down = np.array([0, 4, 8, 12, 16])
    assert grid_metrics(beats, down, 0, 4, LoopConfig()) is not None
    bad = beats.copy()
    bad[8:] += 0.07
    assert grid_metrics(bad, down, 0, 4, LoopConfig()) is None
    assert grid_metrics(beats, np.array([0, 3, 7]), 0, 2, LoopConfig()) is None

def test_slow_tempo_ramp_fails_grid_residual():
    beats = np.cumsum(np.r_[0, np.linspace(0.48, 0.52, 32)])
    assert grid_metrics(beats, np.arange(0, 33, 4), 0, 8, LoopConfig()) is None

def test_three_beats_per_bar_not_hardcoded_four(tmp_path):
    master, _, beats, sections, stems = fixture(tmp_path)
    beats.downbeats = list(np.arange(0, 20, 1.5))
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert report['loops']
    assert all((x['grid']['beats_per_bar'] == 3 for x in report['loops']))

def test_boundary_zero_and_eof_are_valid(tmp_path):
    master, _, beats, _, stems = fixture(tmp_path, seconds=8)
    sections = {'sections': [{'start': 0, 'end': 8, 'label': 'Verse'}]}
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems, config=LoopConfig(snap_ms=0))
    assert report['loop_count'] == 1
    assert report['loops'][0]['start_sample'] == 0
    assert report['loops'][0]['end_sample'] == 8 * 8000

def test_no_sections_no_invented_verse(tmp_path):
    master, _, beats, _, stems = fixture(tmp_path)
    sections = {'sections': [{'start': 0, 'end': 8, 'label': 'pre-chorus'}, {'start': 8, 'end': 16, 'label': 'postchorus'}]}
    report = analyze_loops(master, tmp_path / 'out', song_map=sections, beat_results=[beats], stems=stems)
    assert report['target_section_count'] == 0 and (not report['loops'])

def test_join_checks_worst_channel_and_constant_length():
    y = np.zeros((1000, 2), dtype='float32')
    y[600:800, 1] = 0.5
    assert optimize_join(y, 1000, 0, 800, 0, 800, LoopConfig(snap_ms=0)) is None

@pytest.mark.parametrize('options', [{'snap_ms': float('nan')}, {'max_bars': 0}, {'max_join_step': 0}, {'max_bars': 16.0}, {'loops_per_section': 1.0}, {'snap_ms': '5'}, {'loops_per_section': True}])
def test_bad_config(options):
    with pytest.raises(ValueError):
        LoopConfig(**options)

def test_preview_exact_and_stale_source_rejected(tmp_path):
    report, master, y = run(tmp_path)
    analysis = {'source': {'copied_path': 'master.wav', 'sha256': sha256_file(master)}}
    (tmp_path / 'analysis.json').write_text(json.dumps(analysis))
    loop = report['loops'][0]
    raw, name = preview_loop(tmp_path, loop['id'])
    data, sr = sf.read(io.BytesIO(raw), dtype='float32')
    np.testing.assert_array_equal(data, y[loop['start_sample']:loop['end_sample']])
    assert sr == report['sample_rate']
    assert name.endswith('.wav')
    with pytest.raises(ValueError):
        preview_loop(tmp_path, '../../secret')
    sf.write(master, np.zeros(500), 8000)
    with pytest.raises(ValueError, match='stale'):
        preview_loop(tmp_path, loop['id'])

def test_existing_results_and_manifest(tmp_path):
    master, _, beats, sections, _stems = fixture(tmp_path)
    (tmp_path / 'beats').mkdir()
    (tmp_path / 'deep/song_map').mkdir(parents=True)
    (tmp_path / 'deep/song_map/song_map.json').write_text(json.dumps(sections))
    (tmp_path / 'beats/all_in_one.json').write_text(json.dumps(beats.__dict__))
    analysis = {'source': {'copied_path': 'master.wav', 'sha256': sha256_file(master)}, 'deep_analysis': None, 'models': [{'stems': [{'model': 'test', 'stem': 'vocals', 'path': 'vocals.wav'}]}]}
    (tmp_path / 'analysis.json').write_text(json.dumps(analysis))
    report = analyze_existing_loops(tmp_path)
    assert report['loop_count'] == 2
    manifest = json.loads((tmp_path / 'manifest.json').read_text())
    assert 'deep/loops/loops.json' in [x['path'] for x in manifest['files']]
