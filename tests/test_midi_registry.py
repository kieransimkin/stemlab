import sys
from pathlib import Path
import pytest
from stemlab.analysis.midi import MIDI_MODELS, MidiConfig
from stemlab.analysis.midi.registry import parse_overrides
from stemlab.analysis.midi.runner import select_sources
from stemlab.types import StemArtifact

def test_registry_is_explicit_and_model_free():
    assert set(MIDI_MODELS) == {'basic_pitch', 'piano_transcription', 'transkun', 'mr_mt3', 'yourmt3'}
    assert 'mt3_pytorch' not in MIDI_MODELS
    assert MidiConfig().allow_downloads is False
    assert all((spec.upstream.startswith('https://') for spec in MIDI_MODELS.values()))
    assert not any((name in sys.modules for name in ('mt3_infer', 'basic_pitch', 'transkun')))

@pytest.mark.parametrize('values', [{'models': ()}, {'models': ('missing',)}, {'models': ('basic_pitch', 'basic_pitch')}, {'models': ({},)}, {'target': 'unknown'}, {'target': {}}, {'max_stems': 0}, {'max_stems': True}, {'timeout_seconds': float('nan')}, {'timeout_seconds': '60'}, {'timeout_seconds': float('inf')}, {'timeout_seconds': 0}, {'device': 'cpu; echo hi'}, {'allow_downloads': 'false'}, {'stem_names': [None]}, {'stem_names': 'piano'}, {'target': 'master', 'stem_names': ('piano',)}, {'checkpoints': {'transkun': 'file'}}, {'backend_pythons': {'basic_pitch': ''}}, {'models': ('transkun',), 'checkpoints': {'transkun': 'file'}}, {'models': ('transkun',), 'transkun_config': 'file'}])
def test_invalid_config_fails_before_io(values):
    with pytest.raises(ValueError):
        MidiConfig(**values)

def test_override_split_preserves_equals_and_spaces(tmp_path):
    value = tmp_path / 'my piano=weights.onnx'
    assert parse_overrides([f'basic_pitch={value}'])['basic_pitch'] == str(value)
    with pytest.raises(ValueError):
        parse_overrides([f'basic_pitch={value}'] * 2)
    with pytest.raises(ValueError):
        parse_overrides(['basic_pitch'])

def test_paths_are_checked_before_inference(tmp_path):
    with pytest.raises(ValueError, match='does not exist'):
        MidiConfig(checkpoints={'basic_pitch': str(tmp_path / 'missing')}).validate_paths()

def stems():
    return [StemArtifact('htdemucs_ft', 'piano', Path('old.wav')), StemArtifact('bs_roformer_sw', 'piano', Path('preferred.wav')), StemArtifact('htdemucs_ft', 'guitar', Path('guitar.wav')), StemArtifact('htdemucs_ft', 'drums', Path('drums.wav')), StemArtifact('speech', 'vocals', Path('gated.wav'))]

def test_auto_selection_uses_mix_for_mt3_and_piano_for_specialists():
    master = Path('mix.wav')
    piano = select_sources(master, stems(), MIDI_MODELS['transkun'], MidiConfig())
    assert [s.path.name for s in piano] == ['preferred.wav']
    multi = select_sources(master, stems(), MIDI_MODELS['yourmt3'], MidiConfig())
    assert multi[0].path == master
    pitched = select_sources(master, stems(), MIDI_MODELS['basic_pitch'], MidiConfig())
    assert {s.stem for s in pitched} == {'piano', 'guitar'}

def test_no_silent_piano_fallback_on_saved_mix():
    assert not select_sources(Path('mix'), [], MIDI_MODELS['transkun'], MidiConfig())
    assert select_sources(Path('mix'), [], MIDI_MODELS['transkun'], MidiConfig(), True)

def test_filters_limits_and_explicit_stems():
    cfg = MidiConfig(target='stems', stem_names=('guitar',), max_stems=1)
    assert select_sources(Path('mix'), stems(), MIDI_MODELS['mr_mt3'], cfg)[0].stem == 'guitar'
    assert not select_sources(Path('mix'), stems(), MIDI_MODELS['transkun'], cfg)
