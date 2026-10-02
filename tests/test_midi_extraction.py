# ruff: noqa: E402
# Optional dependencies must be checked before importing integration helpers.
"""Real MIDI/WAV I/O; neural predictions are explicit test doubles in unit tests."""
import hashlib
import importlib.util
import json
import sys
import numpy as np
import pytest
import soundfile as sf
pytest.importorskip('pretty_midi', reason='Install the midi extra')
pytest.importorskip('psutil', reason='Install the midi extra')
import mido
from stemlab.analysis.midi import MidiConfig, analyze_midi, transcribe_path
from stemlab.analysis.midi import runner
from stemlab.analysis.midi.artifacts import read_performance
from stemlab.util import write_json

def audio(path, sr=44100):
    path.parent.mkdir(parents=True, exist_ok=True)
    t = np.arange(sr * 3) / sr
    y = 0.03 * np.sin(2 * np.pi * 220 * t)
    sf.write(path, np.column_stack([y, -0.8 * y]), sr, subtype='FLOAT')
    return path

def performance(path):
    midi = mido.MidiFile(ticks_per_beat=480)
    tempo = mido.MidiTrack()
    midi.tracks.append(tempo)
    tempo.extend([mido.MetaMessage('set_tempo', tempo=500000, time=0), mido.MetaMessage('set_tempo', tempo=1000000, time=480)])
    notes = mido.MidiTrack()
    midi.tracks.append(notes)
    notes.extend([mido.MetaMessage('track_name', name='Fixture piano'), mido.Message('program_change', program=0, channel=0), mido.Message('note_on', channel=0, note=60, velocity=90, time=480), mido.Message('control_change', channel=0, control=64, value=127, time=0), mido.Message('pitchwheel', channel=0, pitch=100, time=100), mido.Message('note_off', channel=0, note=60, velocity=0, time=380), mido.Message('control_change', channel=0, control=64, value=0, time=0)])
    drums = mido.MidiTrack()
    midi.tracks.append(drums)
    drums.extend([mido.Message('note_on', channel=9, note=36, velocity=100, time=480), mido.Message('note_off', channel=9, note=36, time=100)])
    midi.save(path)

def fake_worker(request, folder, config):
    performance(folder / 'transcription.mid')
    write_json(folder / 'backend.json', {'test_double': True, 'model': request['model']})
    (folder / 'backend.log').write_text('Fixture predictor, no neural inference\n')
    return {'test_double': True, 'model': request['model']}

def saved(root):
    master = audio(root / 'input/master.wav')
    piano = audio(root / 'stems/piano.wav')
    write_json(root / 'analysis.json', {'source': {'copied_path': 'input/master.wav', 'sha256': hashlib.sha256(master.read_bytes()).hexdigest()}, 'models': [{'stems': [{'model': 'fixture', 'stem': 'piano', 'path': 'stems/piano.wav'}]}]})
    return (master, piano)

def test_tempo_conversion_native_sample_indices_and_controllers(tmp_path):
    path = tmp_path / 'transcription.mid'
    performance(path)
    original = path.read_bytes()
    report = read_performance(path, 44100, 132300)
    piano = next((n for n in report['notes'] if n['midi_pitch'] == 60))
    assert piano['start'] == 0.5 and piano['end'] == 1.5
    assert piano['start_sample'] == 22050 and piano['end_sample'] == 66150
    assert any((n['is_drum'] for n in report['notes']))
    assert report['tracks'][0]['control_changes'][0]['number'] == 64
    assert report['tracks'][0]['pitch_bends'][0]['pitch'] == 100
    assert len(report['tempo_map']) == 2
    assert original == path.read_bytes()

def test_invalid_midi_fails(tmp_path):
    path = tmp_path / 'bad.mid'
    path.write_text('This is not a MIDI file at all')
    with pytest.raises(ValueError, match='Standard MIDI'):
        read_performance(path, 44100, 100)

def test_empty_midi_is_honest_not_inference_failure(tmp_path):
    path = tmp_path / 'empty.mid'
    midi = mido.MidiFile()
    midi.tracks.append(mido.MidiTrack([mido.MetaMessage('end_of_track')]))
    midi.save(path)
    result = read_performance(path, 8000, 8000)
    assert result['note_count'] == 0 and result['warnings']

def test_model_tails_not_silently_clipped(tmp_path):
    path = tmp_path / 'long.mid'
    performance(path)
    result = read_performance(path, 44100, 44100)
    assert any((n['outside_source'] for n in result['notes']))
    assert max((n['end_sample'] for n in result['notes'])) == 66150

def test_audio_to_all_models_real_outputs_and_png(tmp_path, monkeypatch):
    monkeypatch.setattr(runner, 'invoke_worker', fake_worker)
    master = audio(tmp_path / 'mix.wav')
    before = master.read_bytes()
    models = ('basic_pitch', 'piano_transcription', 'transkun', 'mr_mt3', 'yourmt3')
    report = transcribe_path(master, tmp_path / 'output', config=MidiConfig(models=models))
    assert report['completed_count'] == 5 and report['status'] == 'completed'
    assert master.read_bytes() == before
    for item in report['analyses']:
        for name in ('midi', 'notes', 'csv', 'piano_roll'):
            p = tmp_path / 'output' / item['files'][name]
            assert p.stat().st_size > 0
        assert (tmp_path / 'output' / item['files']['piano_roll']).read_bytes().startswith(b'\x89PNG')
    assert json.loads((tmp_path / 'output/manifest.json').read_text())['files']

def test_saved_stem_selection_and_prior_evidence_untouched(tmp_path, monkeypatch):
    monkeypatch.setattr(runner, 'invoke_worker', fake_worker)
    old = tmp_path / 'old'
    saved(old)
    before = {str(p): p.read_bytes() for p in old.rglob('*') if p.is_file()}
    report = transcribe_path(old, tmp_path / 'new', config=MidiConfig(models=('transkun', 'yourmt3'), make_plots=False))
    assert report['completed_count'] == 2
    assert report['analyses'][0]['source_stem'] == 'piano'
    assert report['analyses'][1]['source_stem'] == 'master'
    assert before == {str(p): p.read_bytes() for p in old.rglob('*') if p.is_file()}

def test_failure_isolation_and_partial_status(tmp_path, monkeypatch):

    def predictor(request, folder, config):
        if request['model'] == 'yourmt3':
            raise RuntimeError('fixture failure')
        return fake_worker(request, folder, config)
    monkeypatch.setattr(runner, 'invoke_worker', predictor)
    master = audio(tmp_path / 'mix.wav')
    report = transcribe_path(master, tmp_path / 'out', config=MidiConfig(models=('yourmt3', 'mr_mt3'), make_plots=False))
    assert report['status'] == 'completed_with_errors' and report['completed_count'] == 1
    assert report['errors'][0]['message'] == 'fixture failure'

def test_strict_preserves_report_and_raises(tmp_path, monkeypatch):

    def fail(*args):
        raise RuntimeError('strict fixture')
    monkeypatch.setattr(runner, 'invoke_worker', fail)
    with pytest.raises(RuntimeError):
        transcribe_path(audio(tmp_path / 'x.wav'), tmp_path / 'out', config=MidiConfig(continue_on_error=False))
    report = json.loads((tmp_path / 'out/report.json').read_text())
    assert report['status'] == 'failed' and len(report['errors']) == 1

def test_nonempty_output_not_overwritten(tmp_path):
    master = audio(tmp_path / 'mix.wav')
    out = tmp_path / 'out'
    out.mkdir()
    (out / 'keep.txt').write_text('keep')
    with pytest.raises(FileExistsError):
        transcribe_path(master, out)
    assert (out / 'keep.txt').read_text() == 'keep'

def test_no_matching_sources_is_not_success(tmp_path, monkeypatch):
    master = audio(tmp_path / 'mix.wav')
    report = analyze_midi(master, tmp_path / 'out', config=MidiConfig(models=('transkun',)))
    assert report['status'] == 'no_matching_sources' and report['skipped']

@pytest.mark.parametrize('relative', ['../external.wav', '/tmp/external.wav'])
def test_manifest_path_escape_rejected(tmp_path, relative):
    saved(tmp_path / 'old')
    path = tmp_path / 'old/analysis.json'
    data = json.loads(path.read_text())
    data['source']['copied_path'] = relative
    path.write_text(json.dumps(data))
    with pytest.raises(ValueError, match='inside'):
        transcribe_path(tmp_path / 'old', tmp_path / 'new')
    assert not (tmp_path / 'new').exists()

def test_stale_source_hash_rejected(tmp_path):
    master, _ = saved(tmp_path / 'old')
    sf.write(master, np.zeros(900), 8000)
    with pytest.raises(ValueError, match='SHA-256'):
        transcribe_path(tmp_path / 'old', tmp_path / 'new')

def test_symlinked_stem_escape_rejected(tmp_path):
    _, piano = saved(tmp_path / 'old')
    external = audio(tmp_path / 'elsewhere.wav')
    piano.unlink()
    try:
        piano.symlink_to(external)
    except OSError:
        pytest.skip('Symlinks unavailable')
    with pytest.raises(ValueError, match='outside'):
        transcribe_path(tmp_path / 'old', tmp_path / 'new')

def test_missing_backend_fails_in_real_subprocess(tmp_path):
    if importlib.util.find_spec('basic_pitch'):
        pytest.skip('This test requires a missing optional backend')
    master = audio(tmp_path / 'mix.wav')
    report = transcribe_path(master, tmp_path / 'out', config=MidiConfig(make_plots=False, timeout_seconds=20))
    assert report['status'] == 'failed'
    assert '[amt]' in report['errors'][0]['message']
    assert (tmp_path / 'out' / report['analyses'][0]['log']).read_text()

def test_backend_timeout_reaps_child(tmp_path, monkeypatch):
    launched = []
    original = runner.subprocess.Popen

    def sleeping_child(command, **kwargs):
        proc = original([sys.executable, '-I', '-c', 'import time; time.sleep(30)'], **kwargs)
        launched.append(proc)
        return proc
    monkeypatch.setattr(runner.subprocess, 'Popen', sleeping_child)
    with pytest.raises(TimeoutError):
        runner.invoke_worker({'model': 'basic_pitch'}, tmp_path, MidiConfig(timeout_seconds=1))
    assert launched[0].poll() is not None

def test_source_change_during_inference_is_failure(tmp_path, monkeypatch):
    master = audio(tmp_path / 'mix.wav')

    def changed(request, folder, config):
        result = fake_worker(request, folder, config)
        sf.write(request['source'], np.zeros(100), 8000)
        return result
    monkeypatch.setattr(runner, 'invoke_worker', changed)
    report = transcribe_path(master, tmp_path / 'out', config=MidiConfig(make_plots=False))
    assert report['status'] == 'failed' and 'changed' in report['errors'][0]['message']
