"""Synthetic tests for the real-song benchmark harness; no public audio downloaded."""
from __future__ import annotations

import hashlib
import importlib.util
import json
from pathlib import Path

import numpy as np
import pytest

from stemlab.analysis.beat_evidence import RhythmInput

SCRIPT=Path(__file__).resolve().parents[1]/'scripts/benchmark_example_beats.py'
SPEC=importlib.util.spec_from_file_location('example_beat_benchmark',SCRIPT)
benchmark=importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(benchmark)


def fixtures(tmp_path, monkeypatch):
    root=tmp_path/'repo'
    arc=root/'examples/arcadians'
    truth=root/'examples/the-truth-is-a-virus'
    (truth/'beats').mkdir(parents=True)
    arc.mkdir(parents=True)
    (arc/'Arcadians - 320kbps.mp3').write_bytes(b'synthetic audio only')
    (truth/'master.mp3').write_bytes(b'synthetic audio only')
    (arc/'reference.json').write_text(json.dumps({'example_audio':{
        'sha256':benchmark.EXAMPLES['arcadians'][1]}, 'bpm':145}))
    beat_files={}
    for model in ('beat_this','beatnet'):
        path=truth/'beats'/f'{model}.json'
        beats=np.arange(.12,12,.5).tolist()
        path.write_text(json.dumps({'model':model,'beats':beats,'downbeats':beats[::4],
                                    'tempo_bpm':120.0,'metadata':{}}))
        beat_files[f'beats/{model}.json']=hashlib.sha256(path.read_bytes()).hexdigest()
    (truth/'evidence.json').write_text(json.dumps({
        'analysed_tagged_mp3_sha256':benchmark.EXAMPLES['truth'][1],
        'files':beat_files}))

    # Only the audio decoder is replaced; the real classical beat methods and
    # saved-model comparison remain active. No synthetic fixture is called a song.
    def fake_read_source(path,kind,name):
        assert kind=='audio'
        t=np.arange(0,12,.0125)
        pulses=np.zeros(len(t))
        for beat in np.arange(.2,11.8,.5):
            pulses += np.exp(-.5*((t-beat)/.032)**2)
        return RhythmInput(name,'synthetic',t,{'onsets':pulses},'f'*64,'synthetic')
    import stemlab.analysis.beat_evidence as engine
    monkeypatch.setattr(engine,'read_source',fake_read_source)
    actual_hash=benchmark.sha256
    monkeypatch.setattr(benchmark,'sha256',lambda p: (
        benchmark.EXAMPLES['arcadians' if p.name.startswith('Arcadians') else 'truth'][1]
        if p.suffix=='.mp3' else actual_hash(p)))
    return root


def test_example_benchmark_preserves_sources_and_writes_separate_summary(tmp_path, monkeypatch):
    root=fixtures(tmp_path,monkeypatch)
    expected_input=(root/'examples/arcadians/reference.json').read_bytes()
    output=tmp_path/'results'
    result=benchmark.benchmark(root,output,min_bpm=95,max_bpm=155,include_plp=False)
    assert result['status']=='source_verified_offline_full_master_measurement_not_ground_truth'
    assert result['songs']['arcadians']['reference_bpm']==145
    assert result['songs']['truth']['reference_status']=='saved_neural_beat_grid_fit_not_artist_confirmed'
    assert len(result['songs']['truth']['hypotheses'])>=2
    assert (output/'truth_vs_saved_models.json').is_file()
    assert (output/'arcadians_classical.json').is_file()
    assert (root/'examples/arcadians/reference.json').read_bytes()==expected_input
    with pytest.raises(FileExistsError):
        benchmark.benchmark(root,output,min_bpm=95,max_bpm=155,include_plp=False)


def test_benchmark_refuses_unpinned_mp3s(tmp_path,monkeypatch):
    root=fixtures(tmp_path,monkeypatch)
    monkeypatch.setattr(benchmark,'sha256',lambda _: '0'*64)
    with pytest.raises(ValueError,match='source file hash mismatch|source checksum unexpectedly changed|source evidence checksum unexpectedly changed|Frozen'):
        benchmark.benchmark(root,tmp_path/'out',min_bpm=95,max_bpm=155,include_plp=False)
    assert not (tmp_path/'out').exists()


def test_optional_star_lights_mix_is_reanalysed_only_with_exact_evidence(tmp_path, monkeypatch):
    root = fixtures(tmp_path, monkeypatch)
    example = root / 'examples/star-lights-glow-mystery-liquid-kick'
    example.mkdir()
    (example/'master.mp3').write_bytes(b'synthetic optional test MP3')
    (example/'evidence.json').write_text(json.dumps({
        'listening_and_analysis_derivative': {
            'path':'master.mp3', 'sha256':benchmark.STAR_LIGHTS[1]}}))
    existing = benchmark.sha256
    monkeypatch.setattr(benchmark,'sha256',lambda p: (
        benchmark.STAR_LIGHTS[1] if p.name=='master.mp3' and 'star-lights' in str(p)
        else existing(p)))
    result=benchmark.benchmark(root,tmp_path/'optional',min_bpm=95,max_bpm=155,include_plp=False)
    assert result['songs']['star_lights_glow']['reference_bpm'] is None
    assert result['songs']['star_lights_glow']['reference_status']=='unconfirmed_mix_specific_bpm'
    assert (tmp_path/'optional/star_lights_glow_classical.json').exists()
