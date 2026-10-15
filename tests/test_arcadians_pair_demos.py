"""Synthetic integration checks for the two extra Pages galleries and exact-stem handoff."""
from __future__ import annotations

import os
from pathlib import Path
import sys

import numpy as np
import pytest
import soundfile as sf

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'scripts'))
import build_arcadians_pair_demos as builder
import build_arcadians_demo as master_builder
import publish_arcadians_pages as publisher
from stemlab.static_timeline import write_json, read_json, digest
from test_arcadians_pages_publish import valid_qa

ROOT = Path(__file__).resolve().parents[1]
SHA = 'a'*40
COMPANION = 'b'*40


def require_native():
    try:
        import dancerudiments_authoring.harness  # noqa: F401
        import dancerudiments  # noqa: F401
    except ImportError:
        if os.environ.get('STEMLAB_REQUIRE_RECORDINGS') == '1':
            raise
        pytest.skip('Optional DanceRudiments recording companion not installed')


def make_bundle(tmp_path):
    analysis = tmp_path/'analysis'
    (analysis/'input').mkdir(parents=True)
    sr=8000
    t=np.arange(sr*2)/sr
    tracks=[(.12+.09*np.sin((i+1)*np.pi*t))*np.sin(2*np.pi*(80+i*511)*t) for i in range(6)]
    master=analysis/'input/synthetic.mp3'
    sf.write(master, np.column_stack((sum(tracks), -sum(tracks))), sr, format='MP3')
    sha=digest(master)
    stems=[]
    for name, wave in zip(sorted(builder.STEM_NAMES), tracks):
        path=analysis/f'stems/htdemucs_6s/{name}.wav'
        path.parent.mkdir(parents=True, exist_ok=True)
        sf.write(path, np.column_stack((wave, -wave)), sr, subtype='FLOAT')
        stems.append(dict(stem=name, model='htdemucs_6s', path=path.relative_to(analysis).as_posix()))
    write_json(analysis/'analysis.json', dict(source=dict(copied_path='input/synthetic.mp3',sha256=sha),
        models=[dict(spec={'slug':'htdemucs_6s'},stems=stems,error=None)]))
    coverage=dict(status='complete',source_sha256=sha,analysis_commit=SHA,recipe='SYNTHETIC schema fixture')
    bundle=tmp_path/'bundle'
    builder.prepare_sources(analysis,bundle,SHA,coverage=coverage,expected_sha=sha)
    return bundle,sha


@pytest.fixture(scope='module')
def galleries(tmp_path_factory):
    require_native()
    root=tmp_path_factory.mktemp('synthetic-pair-demo')
    bundle,sha=make_bundle(root)
    site=root/'site'
    master_builder.build_site(bundle/'input/audio.mp3',site,source_commit=SHA,companion_commit=COMPANION,
        release_tag='synthetic-test',companion_license='TEST fixture',expected_sha256=sha,title='Synthetic fixture',progress=lambda _:None)
    result=builder.build_pair_demos(bundle,site,source_commit=SHA,companion_commit=COMPANION,
        companion_license='TEST fixture',expected_sha=sha,title='Synthetic fixture',progress=lambda _:None)
    return root,bundle,site,sha,result


def test_prepare_copies_exact_audio_and_preserves_float_stems(tmp_path):
    bundle,sha=make_bundle(tmp_path)
    data=builder.verify_sources(bundle,SHA,expected_sha=sha)
    assert len(data['files']) == 7
    assert all(x['subtype'] == 'FLOAT' for x in data['files'] if x['key'] != 'master')
    assert len({x['sha256'] for x in data['files']}) == 7
    assert not any(p.suffix == '.flac' for p in bundle.rglob('*'))
    assert not any(p.is_symlink() for p in bundle.rglob('*'))


@pytest.mark.parametrize('damage',['source','revision','stem','duration','manifest','duplicate'])
def test_source_handoff_rejects_incorrect_or_tampered_data(tmp_path,damage):
    bundle,sha=make_bundle(tmp_path)
    if damage == 'source':
        (bundle/'input/audio.mp3').write_bytes(b'wrong')
    elif damage == 'revision':
        with pytest.raises(ValueError,match='revision'):
            builder.verify_sources(bundle,'c'*40,expected_sha=sha)
        return
    elif damage == 'manifest':
        (bundle/'source-bundle.json').unlink()
    else:
        p=bundle/'stems/htdemucs_6s/bass.wav'
        if damage == 'stem':
            p.unlink()
        elif damage == 'duration':
            sf.write(p,np.zeros(10),8000,subtype='FLOAT')
        else:
            p.write_bytes((bundle/'stems/htdemucs_6s/drums.wav').read_bytes())
    with pytest.raises((OSError,ValueError)):
        builder.verify_sources(bundle,SHA,expected_sha=sha)


def test_actual_builder_produces_both_complete_galleries(galleries):
    _,bundle,site,sha,result=galleries
    assert result['arcadians-stems']['candidate_count'] == 60
    assert result['arcadians-averages']['candidate_count'] == 180
    report=read_json(site/'arcadians-averages/report.json')
    assert report['pair_count'] == 30
    assert len(report['variants']) == 6
    assert any(p['sources']==['master','master'] for p in report['pairs'])
    for name in builder.GALLERIES:
        assert builder.verify_pair_gallery(site/name,expected_sha=sha,source_commit=SHA)['dimensions'] == [2]
        assert digest(site/name/'audio.mp3') == digest(bundle/'input/audio.mp3')
        assert 'All demos' in (site/name/'index.html').read_text()
    checked=master_builder.verify_site(site,expected_sha256=sha)
    assert checked['candidates'] == 48
    assert checked['files'] == 57+60+7+180+7


def test_packaged_site_keeps_all_recordings_and_excludes_source_bundle(galleries,tmp_path):
    import zipfile
    _,_,site,sha,_=galleries
    master_builder.package_site(site,tmp_path/'package',expected_sha256=sha)
    with zipfile.ZipFile(tmp_path/'package/StemLab-Arcadians-visualizer.zip') as z:
        names=set(z.namelist())
        assert all(name+'/index.html' in names for name in ('arcadians',*builder.GALLERIES))
        assert not any('source-bundle' in name or 'stems/htdemucs' in name for name in names)
        assert len([name for name in names if '/recordings/' in name]) == 48+60+180


def test_gallery_rejects_recording_tampering(galleries,tmp_path):
    import shutil
    _,_,site,sha,_=galleries
    g=tmp_path/'tampered'
    shutil.copytree(site/'arcadians-averages',g)
    p=g/'recordings/candidate_0003.json'
    doc=read_json(p)
    doc['samples'][2][0]=.987654321
    write_json(p,doc)
    with pytest.raises(ValueError,match='hash'):
        builder.verify_pair_gallery(g,expected_sha=sha,source_commit=SHA)


def test_publisher_requires_both_new_galleries_and_their_exact_http_qa(galleries,tmp_path,monkeypatch):
    _,_,site,sha,_=galleries
    actual=builder.verify_pair_gallery
    monkeypatch.setattr(publisher,'verify_pair_gallery',lambda path,source_commit:actual(path,source_commit=source_commit,expected_sha=sha))
    monkeypatch.setattr(publisher,'ARCADIANS_SHA256',sha)
    for name,count in zip(builder.GALLERIES,(60,180)):
        qa=valid_qa()
        p=read_json(site/name/'release-demo.json')
        qa.update(gallery=name,pair_family_filter=True,html_sha256=digest(site/name/'index.html'),candidates=count,sample_vectors_checked=count*3,
                  audio_sha256=sha,decoded={'channels':2,'peak':.5,'rms':.1,'duration':p['source']['duration_seconds']})
        qa['http_ranges']['audio_bytes']=(site/name/'audio.mp3').stat().st_size
        write_json(tmp_path/(name+'-audio-browser.json'),qa)
    publisher.verify_pair_artifacts(site,tmp_path,SHA)
    p=tmp_path/'arcadians-averages-audio-browser.json'
    qa=read_json(p)
    qa['gallery']='arcadians-stems'
    write_json(p,qa)
    with pytest.raises(ValueError,match='different gallery'):
        publisher.verify_pair_artifacts(site,tmp_path,SHA)
    qa['gallery']='arcadians-averages'
    qa['mode']='in-memory'
    write_json(p,qa)
    with pytest.raises(ValueError,match='HTTP'):
        publisher.verify_pair_artifacts(site,tmp_path,SHA)


def test_live_checks_new_html_and_seekable_audio(galleries,monkeypatch):
    _,_,site,_,_=galleries
    calls=[]
    def request(url,*,headers=None,limit=None):
        relative=url.split('/stemlab/',1)[1]
        calls.append(relative)
        data=(site/relative).read_bytes()
        if headers:
            return 206,{'Content-Range':f'bytes 0-31/{len(data)}'},data[:32]
        return 200,{},data
    monkeypatch.setattr(publisher,'public_request',request)
    for name in builder.GALLERIES:
        publisher.verify_live_pair('https://example.github.io/stemlab/',site/name,name,SHA)
    assert len(calls)==8
    assert calls[0]=='arcadians-stems/index.html' and calls[-1]=='arcadians-averages/audio.mp3'


def test_workflows_reuse_one_separation_and_gate_all_pages():
    import yaml
    def read(name):
        return yaml.load((ROOT/'.github/workflows'/name).read_text(), Loader=yaml.BaseLoader)
    timeline=read('arcadians-timeline.yml')
    demo=read('arcadians-demo.yml')
    recording=read('recordings.yml')
    assert '--recording-sources /work/recording-sources' in str(timeline)
    uploads=[s for s in timeline['jobs']['build']['steps'] if s.get('with',{}).get('name')=='stemlab-arcadians-recording-sources']
    assert len(uploads)==1 and uploads[0].get('if') != 'always()'
    assert demo['jobs']['build']['needs']=='timeline'
    steps=demo['jobs']['build']['steps']
    downloads=[s for s in steps if s.get('with',{}).get('name')=='stemlab-arcadians-recording-sources']
    assert len(downloads)==1 and downloads[0]['with']['path']=='recording-sources'
    assert 'dist/arcadians-pages' not in downloads[0]['with']['path']
    text=str(steps)
    assert '--gallery arcadians-stems' in text and '--gallery arcadians-averages' in text
    assert 'publish_arcadians_pages.py verify' in text
    assert text.index('publish_arcadians_pages.py verify') < text.index('build_arcadians_demo.py package')
    assert '--in-memory' not in text
    assert 'test_rudiment_pairs.py' in str(recording) and 'test_arcadians_pair_demos.py' in str(recording)


def test_source_bundle_relative_cli_path_matches_absolute_catalogue(tmp_path, monkeypatch):
    bundle, sha = make_bundle(tmp_path)
    expected = builder.verify_sources(bundle, SHA, expected_sha=sha)
    monkeypatch.chdir(tmp_path)
    actual = builder.verify_sources(Path('bundle'), SHA, expected_sha=sha)
    assert actual == expected


def test_relative_bundle_does_not_bypass_hash_checks(tmp_path, monkeypatch):
    bundle, sha = make_bundle(tmp_path)
    path = bundle / 'stems/htdemucs_6s/drums.wav'
    samples, rate = sf.read(path, dtype='float32', always_2d=True)
    sf.write(path, samples * .75, rate, subtype='FLOAT')
    monkeypatch.chdir(tmp_path)
    with pytest.raises(ValueError, match='hash mismatch: htdemucs_6s/drums'):
        builder.verify_sources(Path('bundle'), SHA, expected_sha=sha)
