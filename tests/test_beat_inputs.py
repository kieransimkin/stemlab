"""Routing/order and source attribution with fake detectors, not model inference."""
from __future__ import annotations

import json

import numpy as np
import pytest
import soundfile as sf

from stemlab import pipeline
from stemlab.beats.common import consensus_result
from stemlab.beats.inputs import beat_inputs, is_percussion
from stemlab.types import BeatResult, PipelineConfig, SeparationResult, StemArtifact


@pytest.mark.parametrize('label', ['Drums', 'DRUM', 'acoustic_drums', 'Percussion',
    'PERCUSSIVE', 'drum-kit', 'kick drum', 'snare', 'hi-hat', 'shaker'])
def test_labelled_percussion_selected(label):
    assert is_percussion(label)


@pytest.mark.parametrize('label', ['bass', 'vocals', 'guitar', 'drumless', 'no_drums',
    'without percussion', 'non-percussive', 'drumstick soloist', 'instrumental', 'other'])
def test_non_percussion_and_negative_labels_not_selected(label):
    assert not is_percussion(label)


def test_all_separator_sources_selected_with_unique_ids_and_path_deduplication(tmp_path):
    master = tmp_path/'input/master.wav'
    stems = [StemArtifact('a', 'drums', tmp_path/'a/drums.wav'),
             StemArtifact('b', 'drums', tmp_path/'b/drums.wav'),
             StemArtifact('a', 'percussion', tmp_path/'a/percussion.wav'),
             StemArtifact('a', 'drum_alias', tmp_path/'a/drums.wav'),
             StemArtifact('a', 'bass', tmp_path/'a/bass.wav')]
    inputs = beat_inputs(master, stems)
    assert len(inputs) == 4 and inputs[0].kind == 'master'
    assert len({s.id for s in inputs}) == 4
    assert {s.separator for s in inputs[1:]} == {'a', 'b'}
    assert beat_inputs(master, list(reversed(stems))) == inputs


def stub_pipeline(tmp_path, monkeypatch, *, fail=None, continue_on_error=True, stems=True):
    events = []
    master = tmp_path/'song.wav'
    sf.write(master, np.ones(16000)*.1, 8000, subtype='FLOAT')
    config = PipelineConfig(master, tmp_path/'analysis', ('htdemucs_6s',) if stems else (),
        continue_on_error=continue_on_error, make_spectrograms=False, run_whisper=False,
        run_vamp=False, run_structure=False, run_deep_analysis=False)

    class Separator:
        def separate(self, master, folder, model, device):
            folder.mkdir(parents=True, exist_ok=True)
            results = []
            for label in ('drums', 'percussion', 'vocals'):
                path = folder/(label+'.wav')
                sf.write(path, np.ones(16000)*.1, 8000, subtype='FLOAT')
                results.append(StemArtifact(model, label, path))
            events.append(('separated',))
            return SeparationResult(model, results)

    class Detector:
        requires_demixed_stems = False
        model = 'beatnet'
        def __init__(self, **kwargs):
            pass
        def analyze(self, source, output, stems):
            events.append(('beat', self.model, source.name, len(stems)))
            if source.name == fail:
                raise RuntimeError('deliberate stem failure')
            # Deliberately use the same upstream filename every time.
            (output/(self.model+'.json')).write_text('temporary backend output')
            return BeatResult(self.model, [.1, .6, 1.1, 1.6], [.1], 120.)

    class BeatThis(Detector):
        model = 'beat_this'

    class Demixed(Detector):
        model = 'beat_transformer'
        requires_demixed_stems = True

    monkeypatch.setattr(pipeline, 'make_backend', lambda *a, **kw: Separator())
    monkeypatch.setattr(pipeline, 'BeatNetBackend', Detector)
    monkeypatch.setattr(pipeline, 'BeatThisBackend', BeatThis)
    monkeypatch.setattr(pipeline, 'BeatTransformerBackend', Demixed)
    def session(folder, *a, **kw):
        paths = folder/'session.sv', folder/'session.xml'
        for path in paths:
            path.write_text('synthetic test')
        return paths
    monkeypatch.setattr(pipeline, 'build_session', session)
    return config, events


def test_pipeline_separates_before_master_and_every_percussion_pass(tmp_path, monkeypatch):
    config, events = stub_pipeline(tmp_path, monkeypatch)
    report = pipeline.run_pipeline(config)
    assert events[0] == ('separated',)
    assert [(x[1], x[2]) for x in events[1:]] == [
        ('beatnet', 'song.wav'), ('beat_this', 'song.wav'), ('beat_transformer', 'song.wav'),
        ('beatnet', 'drums.wav'), ('beat_this', 'drums.wav'),
        ('beatnet', 'percussion.wav'), ('beat_this', 'percussion.wav')]
    assert [x[3] for x in events[1:]] == [0, 0, 3, 0, 0, 0, 0]
    assert len(report['beats']) == 8 and not report['errors']
    assert len(report['beat_inputs']) == 3
    names = {r['model'] for r in report['beats']}
    assert {'beatnet', 'beat_this', 'beat_transformer', 'consensus'} <= names
    assert len(names) == 8
    for result in report['beats']:
        saved = json.loads((config.output_dir/'beats'/(result['model']+'.json')).read_text())
        if result['model'] == 'consensus':
            assert saved['metadata']['required_support'] == 2
            assert saved['metadata']['beat_support'][0]['support'] == 3
        else:
            assert saved['metadata']['source']['sha256']
            assert saved['metadata']['source']['path']
            assert saved['metadata']['detector'] in ('beatnet', 'beat_this', 'beat_transformer')
            assert saved['metadata']['source']['kind'] == ('demixed' if result['model'] == 'beat_transformer'
                else 'stem' if '__' in result['model'] else 'master')
    assert not list(config.output_dir.glob('.beat-pass-*'))


def test_per_source_failure_preserves_other_results_and_provenance(tmp_path, monkeypatch):
    config, events = stub_pipeline(tmp_path, monkeypatch, fail='drums.wav')
    report = pipeline.run_pipeline(config)
    assert len(report['errors']) == 2
    assert all('drums' in e['stage'] for e in report['errors'])
    assert len([r for r in report['beats'] if 'percussion' in r['model']]) == 2
    assert any(r['model'] == 'beatnet' for r in report['beats'])


def test_strict_failures_not_silenced(tmp_path, monkeypatch):
    config, _ = stub_pipeline(tmp_path, monkeypatch, fail='drums.wav', continue_on_error=False)
    with pytest.raises(RuntimeError, match='deliberate'):
        pipeline.run_pipeline(config)
    assert not (config.output_dir/'analysis.json').exists()


def test_no_stems_still_analyzes_actual_master(tmp_path, monkeypatch):
    config, events = stub_pipeline(tmp_path, monkeypatch, stems=False)
    report = pipeline.run_pipeline(config)
    assert len(report['beat_inputs']) == 1
    assert {event[2] for event in events} == {'song.wav'}


def test_duplicate_stem_runs_never_inflate_detector_consensus():
    results = [BeatResult('net_master', [1., 2.], [], 60, {'detector': 'beatnet'}),
               BeatResult('this_master', [1.02, 5.], [], 60, {'detector': 'beat_this'}),
               BeatResult('transformer', [1.01, 5.01], [], 60, {'detector': 'beat_transformer'})]
    results += [BeatResult('net_stem_'+str(i), [2.01], [], 60, {'detector': 'beatnet'}) for i in range(12)]
    result = consensus_result(results)
    assert result.beats == pytest.approx([1.01, 5.005])
    assert result.metadata['required_support'] == 2
    assert all(event['support'] <= 3 for event in result.metadata['beat_support'])


def test_repeated_labels_and_filenames_cannot_overwrite_each_other(tmp_path):
    inputs = beat_inputs(tmp_path/'input/master.wav', [
        StemArtifact('separator', 'drums', tmp_path/'one/drums.wav'),
        StemArtifact('separator', 'drums', tmp_path/'two/drums.wav')])
    assert len({item.id for item in inputs}) == 3
