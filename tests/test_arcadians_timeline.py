"""Core publication gates: schema fixtures are SYNTHETIC, never release evidence."""
from __future__ import annotations

from pathlib import Path
import shutil
import sys

import pytest

from stemlab.static_timeline import digest, export_timeline, read_json, write_json
from stemlab.vamp_runtime import VAMP_REQUIRED_OUTPUTS
from test_static_timeline import build_small_analysis

# Keep checkout imports usable without installing the project first.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'scripts'))
import assemble_arcadians_site as assembly
import build_arcadians_timeline as builder
import publish_arcadians_pages as publisher

ROOT = Path(__file__).resolve().parents[1]

SHA = 'b' * 40


def core_fixture(root: Path):
    """Payload shape/absence tests only, no synthetic data passed off as inference."""
    root = build_small_analysis(root)
    report = read_json(root / 'analysis.json')
    stems = []
    for name in builder.STEMS:
        path = root / 'stems/htdemucs_6s' / (name + '.wav')
        path.parent.mkdir(parents=True, exist_ok=True)
        shutil.copyfile(root / 'input/synthetic.wav', path)
        stems.append({'stem': name, 'path': path.relative_to(root).as_posix()})
        spec = root / 'spectrograms/htdemucs_6s' / (name + '.npz')
        spec.parent.mkdir(exist_ok=True)
        shutil.copyfile(root / 'spectrograms/master.npz', spec)
    report['models'] = [{'spec': {'slug': 'htdemucs_6s'}, 'stems': stems}]
    write_json(root / 'analysis.json', report)
    for model in builder.BEATS:
        write_json(root / f'beats/{model}.json', {'model': model, 'beats': [0, .5, 1, 1.5, 2, 2.5, 3]})
    from stemlab.beats.inputs import beat_inputs
    from stemlab.types import StemArtifact
    inputs = beat_inputs(root/report['source']['copied_path'],
        [StemArtifact('htdemucs_6s', item['stem'], root/item['path']) for item in stems])
    for source in inputs:
        for detector in ('beatnet', 'beat_this'):
            name = detector if source.kind == 'master' else detector+'__'+source.id
            write_json(root / f'beats/{name}.json', {'model': name, 'beats': [0, .5, 1, 1.5, 2, 2.5, 3],
                'metadata': {'detector': detector, 'source': source.metadata(root)}})
    write_json(root / 'speech/whisper.json', {'words': [{'start': 1, 'end': 2, 'word': 'TEST'}],
                                           'condition_on_previous_text': False})
    write_json(root / 'speech/speech_regions.json', [{'start': 0, 'end': 3}])
    analyses = []
    for index, transform in enumerate(VAMP_REQUIRED_OUTPUTS):
        relative = f'vamp/data/test-{index}.json'
        write_json(root / relative, {'transform': transform, 'events': [], 'fixture': 'schema only'})
        analyses.append({'transform': transform, 'files': {'json': str(root / relative)}})
    write_json(root / 'vamp/report.json', {'analyses': analyses, 'errors': [], 'skipped': [], 'missing_outputs': []})
    for name in builder.DEEP:
        if name != 'loops':
            write_json(root / f'deep/{name}/{name}.json', {})
    write_json(root / 'deep/harmony/harmony.json', {'chords': {'collapsed_progression': [{'start': 0, 'end': 4, 'label': 'C'}]}})
    write_json(root / 'deep/structure/structure.json', {'segments': [{'start': 0, 'end': 4, 'label': 'Test verse'}]})
    write_json(root / 'deep/song_map/song_map.json', {'sections': [{'start': 0, 'end': 4, 'label': 'Test section'}]})
    write_json(root / 'deep/sonic/sonic.json', {'loudness': {'integrated_lufs_bs1770': -18}, 'duration_seconds': 4})
    write_json(root / 'deep/rhythm/rhythm.json', {'tempo': {'median_bpm': 120}})
    write_json(root / 'deep/lyrics/lyrics.json', {'line_count': 1})
    write_json(root / 'deep/semantic_text/semantic_text.json', {'theme_similarity': [{'theme': 'test', 'similarity': .1}]})
    write_json(root / 'deep/summary.json', {'analyses': {
        name: {'available': True, 'path': f'deep/{name}/{name}.json'} for name in builder.DEEP}, 'errors': []})
    canonical = read_json(root / 'canonical.json')
    canonical.update(bpm=145, sections=[{'start': 0, 'end': 4, 'label': 'Test reference'}])
    write_json(root / 'canonical.json', canonical)
    return root, report['source']['sha256']


@pytest.fixture
def complete(tmp_path):
    return core_fixture(tmp_path / 'core')


def test_recipe_runs_all_core_stages_and_no_implicit_optional_models(tmp_path):
    config = builder.recipe(tmp_path / 'audio.mp3', tmp_path / 'analysis')
    assert config.models == ('htdemucs_6s',)
    assert config.device == 'cpu' and config.continue_on_error is False
    assert config.whisper_model == 'small' and config.whisper_condition_on_previous_text is False
    assert config.run_vamp and config.run_structure and config.run_beats and config.run_whisper
    assert config.run_text_semantics and config.run_deep_analysis and config.make_spectrograms and config.run_loops
    assert not config.run_audio_semantics and not config.midi_models and not config.evidence_models


def test_core_gate_accepts_complete_schema_and_legitimate_zero_loops(complete):
    root, sha = complete
    coverage = builder.require_core(root, expected_sha=sha)
    assert coverage['status'] == 'complete' and coverage['loop_count'] == 0
    assert len(coverage['stems']) == 6 and len(coverage['beat_models']) == 5
    assert coverage['vamp_transforms'] == 13 and coverage['source_frames'] == 64000


def test_production_gate_rejects_synthetic_source(complete):
    root, _ = complete
    with pytest.raises(ValueError, match='checksum-locked'):
        builder.require_core(root)


@pytest.mark.parametrize('mutation', ['stem', 'duration', 'whisper', 'spectrogram', 'beat', 'beat_order',
    'vamp', 'vamp_data', 'deep', 'harmony', 'structure', 'sonic', 'lyrics', 'semantics', 'song_map',
    'canonical', 'error', 'in_progress', 'loops', 'loop_source'])
def test_core_fails_closed_for_missing_evidence(complete, mutation):
    root, sha = complete
    if mutation == 'stem':
        (root / 'stems/htdemucs_6s/bass.wav').unlink()
    elif mutation == 'duration':
        import soundfile as sf
        import numpy as np
        sf.write(root / 'stems/htdemucs_6s/bass.wav', np.zeros(1000), 16000)
    elif mutation == 'whisper':
        write_json(root / 'speech/whisper.json', {'words': [], 'condition_on_previous_text': False})
    elif mutation == 'spectrogram':
        (root / 'spectrograms/master.npz').unlink()
    elif mutation in ('beat', 'beat_order'):
        write_json(root / 'beats/beat_this.json', {'beats': [] if mutation == 'beat' else [1, 0, .5]})
    elif mutation == 'vamp':
        write_json(root / 'vamp/report.json', {'analyses': [], 'skipped': ['missing']})
    elif mutation == 'vamp_data':
        (root / 'vamp/data/test-0.json').unlink()
    elif mutation == 'deep':
        write_json(root / 'deep/summary.json', {'analyses': {}})
    elif mutation in ('harmony', 'structure', 'sonic', 'lyrics', 'song_map'):
        write_json(root / f'deep/{mutation}/{mutation}.json', {})
    elif mutation == 'semantics':
        write_json(root / 'deep/semantic_text/semantic_text.json', {})
    elif mutation == 'canonical':
        write_json(root / 'canonical.json', {'bpm': 145})
    elif mutation in ('error', 'in_progress'):
        doc = read_json(root / 'analysis.json')
        doc.update(errors=['failed'] if mutation == 'error' else [], completed_at=None if mutation == 'in_progress' else 'done')
        write_json(root / 'analysis.json', doc)
    else:
        doc = read_json(root / 'deep/loops/loops.json')
        doc['source_frames' if mutation == 'loops' else 'source_sha256'] = 1 if mutation == 'loops' else 'x'*64
        write_json(root / 'deep/loops/loops.json', doc)
    with pytest.raises((ValueError, OSError)):
        builder.require_core(root, expected_sha=sha)


def qa_fixture(site):
    snapshot = read_json(site / 'snapshot.json')
    return {'format': 'stemlab.timeline-browser-check', 'status': 'passed', 'mode': 'http-project-pages-prefix',
            'snapshot_sha256': digest(site / 'snapshot.json'), 'source_sha256': snapshot['source_sha256'],
            **{k: True for k in ('no_autoplay', 'play_pause', 'seek', 'audio_clock', 'zoom_fit',
                                 'images_loaded', 'all_expected_lanes', 'no_backend_requests')},
            'page_errors': [], 'bad_responses': [], 'external_requests': []}


@pytest.fixture
def gate_fixture(complete, tmp_path, monkeypatch):
    root, sha = complete
    coverage = builder.require_core(root, expected_sha=sha)
    site = tmp_path / 'timeline'
    export_timeline(root, site, include_audio=True, source_commit=SHA, coverage=coverage)
    qa_path = tmp_path / 'arcadians-timeline-browser.json'
    write_json(qa_path, qa_fixture(site))
    # Schema-only fixture: production has no CLI/environment option to change this hash.
    monkeypatch.setattr(assembly, 'ARCADIANS_SHA256', sha)
    return site, qa_path


def test_combined_gate_binds_http_evidence_to_exact_snapshot(gate_fixture):
    site, qa = gate_fixture
    assert assembly.verify_timeline_qa(site, qa, SHA)['source_commit'] == SHA


@pytest.mark.parametrize('field,value', [('mode', 'in-memory'), ('status', 'failed'),
    ('snapshot_sha256', 'a'*64), ('source_sha256', 'a'*64), ('seek', False),
    ('audio_clock', False), ('page_errors', ['error']), ('bad_responses', [[404, '/audio']]),
    ('no_backend_requests', False), ('external_requests', ['https://cdn'])])
def test_unsafe_or_incomplete_qa_cannot_be_published(gate_fixture, field, value):
    site, path = gate_fixture
    qa = read_json(path)
    qa[field] = value
    write_json(path, qa)
    with pytest.raises(ValueError, match='publishable'):
        assembly.verify_timeline_qa(site, path, SHA)


def test_timeline_publication_checks_matching_html_bundle_data_and_audio(gate_fixture, monkeypatch):
    site, _ = gate_fixture
    requested = []
    prefix = 'https://example.github.io/stemlab/timeline/arcadians/'
    def request(url, *, headers=None, limit=None):
        requested.append(url)
        path = site / url.removeprefix(prefix)
        content = path.read_bytes()
        if headers:
            assert headers == {'Range': 'bytes=0-31'} and limit == 32
            return 206, {'Content-Range': f'bytes 0-31/{len(content)}'}, content[:32]
        return 200, {}, content
    monkeypatch.setattr(publisher, 'public_request', request)
    publisher.verify_live_timeline('https://example.github.io/stemlab/', site, SHA)
    assert len(requested) == 8
    assert prefix + 'assets/app.js' in requested
    with pytest.raises(ValueError, match='stale'):
        publisher.verify_live_timeline('https://example.github.io/stemlab/', site, 'c'*40)


def test_deployment_refuses_movement_only_old_artifact(tmp_path, monkeypatch):
    from test_arcadians_pages_publish import PROVENANCE, valid_qa, SHA as OLD_SHA
    (tmp_path / 'arcadians').mkdir()
    write_json(tmp_path / 'arcadians/release-demo.json', PROVENANCE)
    (tmp_path / 'arcadians/audio.mp3').write_bytes(b'publicaudio')
    write_json(tmp_path / 'qa.json', valid_qa())
    monkeypatch.setattr(publisher, 'verify_site', lambda _: {'candidates': 48})
    with pytest.raises(ValueError, match='Missing public artifact'):
        publisher.verify_artifacts(tmp_path, tmp_path / 'qa.json', OLD_SHA)


def test_assembler_keeps_both_demos_and_binds_their_revisions(gate_fixture, tmp_path, monkeypatch):
    site, qa = gate_fixture
    movements = tmp_path / 'movements'
    (movements / 'arcadians').mkdir(parents=True)
    write_json(movements / 'arcadians/release-demo.json', {'stemlab_commit': SHA})
    calls = []
    monkeypatch.setattr(assembly, 'verify_site', lambda x: calls.append(x) or {'status': 'passed'})
    assembly.assemble(movements, site, qa, SHA)
    assert len(calls) == 2
    assert (movements / 'timeline/arcadians/index.html').is_file()
    landing = (movements / 'index.html').read_text()
    assert 'href="timeline/arcadians/"' in landing and 'href="arcadians/"' in landing
    metadata = read_json(movements / 'arcadians/release-demo.json')
    assert metadata['timeline']['snapshot_sha256'] == digest(site / 'snapshot.json')
    with pytest.raises(FileExistsError):
        assembly.assemble(movements, site, qa, SHA)


def test_workflow_builds_both_before_publication_and_never_requires_backend_at_runtime():
    import yaml
    def load(path):
        return yaml.load((ROOT / '.github/workflows' / path).read_text(), Loader=yaml.BaseLoader)
    demo, timeline, release = load('arcadians-demo.yml'), load('arcadians-timeline.yml'), load('release.yml')
    assert demo['jobs']['timeline']['uses'] == './.github/workflows/arcadians-timeline.yml'
    assert demo['jobs']['build']['needs'] == 'timeline'
    assert demo['jobs']['timeline']['needs'] == 'static-regressions'
    assert "!= 'pull_request'" in demo['jobs']['timeline']['if']
    assert '--in-memory' not in str(timeline)
    assert 'TORCH_INDEX_URL=https://download.pytorch.org/whl/cpu' in str(timeline)
    assert 'examples/arcadians:/opt/stemlab/examples/arcadians:ro' in str(timeline)
    steps = demo['jobs']['build']['steps']
    names = [s.get('name', '') for s in steps]
    assert names.index('Assemble all five verified viewers into one Pages site') < names.index('Freeze the tested public site as release assets')
    qa_upload = next(s for s in timeline['jobs']['build']['steps'] if s.get('with', {}).get('name') == 'stemlab-arcadians-timeline-qa')
    assert qa_upload['with']['path'].endswith('/qa/') and '\n' not in qa_upload['with']['path']
    publication = release['jobs']['arcadians-pages']['steps']
    # Checkout before downloading public-site: a late clean checkout erases it.
    assert publication[0]['uses'] == 'actions/checkout@v7'
    assert any('publish_arcadians_pages.py live' in s.get('run', '') for s in publication)
    assert release['jobs']['arcadians-demo']['uses'] == './.github/workflows/arcadians-demo.yml'


def test_combined_site_integrity_with_real_native_movement_builder(complete, tmp_path, monkeypatch):
    """Two actual exporters + native movement extraction, all explicitly synthetic."""
    pytest.importorskip('dancerudiments_authoring.harness')
    import numpy as np
    import soundfile as sf
    import build_arcadians_demo as movements
    root, _ = complete
    sr = 16000
    t = np.arange(sr * 4) / sr
    audio = .2*np.sin(2*np.pi*60*t)*np.exp(-(t % .4)*8) + .12*np.sin(2*np.pi*3400*t)*np.exp(-((t+.13) % .6)*19)
    master = root / 'input/synthetic.mp3'
    sf.write(master, np.column_stack([audio, audio*.8]), sr, format='MP3')
    sha = digest(master)
    analysis = read_json(root / 'analysis.json')
    analysis['source'].update(copied_path='input/synthetic.mp3', sha256=sha)
    from stemlab.beats.inputs import beat_inputs
    for detector in ('beatnet', 'beat_this'):
        path = root/f'beats/{detector}.json'
        document = read_json(path)
        document['metadata']['source'] = beat_inputs(master, [])[0].metadata(root)
        write_json(path, document)
    write_json(root / 'analysis.json', analysis)
    loops = read_json(root / 'deep/loops/loops.json')
    loops['source_sha256'] = sha
    write_json(root / 'deep/loops/loops.json', loops)
    timeline = tmp_path / 'native-timeline'
    export_timeline(root, timeline, include_audio=True, source_commit=SHA,
                    coverage=builder.require_core(root, expected_sha=sha))
    qa = tmp_path / 'qa.json'
    write_json(qa, qa_fixture(timeline))
    site = tmp_path / 'combined'
    movements.build_site(master, site, source_commit=SHA, companion_commit='a'*40,
                         release_tag='synthetic-contract-test', companion_license='Test fixture',
                         expected_sha256=sha, title='SYNTHETIC schema/native integration test', progress=lambda _: None)
    monkeypatch.setattr(assembly, 'ARCADIANS_SHA256', sha)
    monkeypatch.setattr(assembly, 'verify_site', lambda path: movements.verify_site(path, expected_sha256=sha))
    result = assembly.assemble(site, timeline, qa, SHA)
    assert result['candidates'] == 48 and result['files'] > 57
    movements.package_site(site, tmp_path / 'archive', expected_sha256=sha)
    import zipfile
    with zipfile.ZipFile(tmp_path / 'archive/StemLab-Arcadians-visualizer.zip') as archive:
        assert {'index.html', 'arcadians/audio.mp3', 'timeline/arcadians/index.html',
                'timeline/arcadians/media/source.mp3', 'timeline/arcadians/data/timeline.json'} <= set(archive.namelist())
    (site / 'timeline/arcadians/assets/app.js').write_text('tampered')
    with pytest.raises(ValueError, match='checksum'):
        movements.verify_site(site, expected_sha256=sha)


def test_core_v2_requires_separate_drum_beat_runs(complete):
    root, sha = complete
    files = list((root/'beats').glob('beat_this__*.json'))
    assert len(files) == 1
    files[0].unlink()
    with pytest.raises((ValueError, OSError)):
        builder.require_core(root, expected_sha=sha)


def test_core_rejects_drum_results_attributed_to_master(complete):
    root, sha = complete
    path = next((root/'beats').glob('beatnet__*.json'))
    data = read_json(path)
    data['metadata']['source']['kind'] = 'master'
    write_json(path, data)
    with pytest.raises(ValueError, match='misattributed'):
        builder.require_core(root, expected_sha=sha)
