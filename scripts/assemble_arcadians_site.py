"""Combine two verified demos into ONE Pages artifact; never replace one with the other."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import shutil
import sys

# Keep checkout imports usable without installing the project first.
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / 'src'))
from stemlab.static_timeline import digest, read_json, verify_snapshot, write_json
from build_arcadians_demo import ARCADIANS_SHA256, verify_site

ROOT = Path(__file__).resolve().parents[1]


def verify_timeline_qa(site: Path, qa_path: Path, source_sha: str) -> dict:
    verify_snapshot(site)
    snapshot = read_json(site / 'snapshot.json')
    qa = read_json(qa_path)
    required = ('no_autoplay', 'play_pause', 'seek', 'audio_clock', 'zoom_fit',
                'images_loaded', 'all_expected_lanes', 'no_backend_requests')
    if (snapshot['coverage'].get('status') != 'complete'
            or snapshot['source_sha256'] != ARCADIANS_SHA256
            or snapshot['source_commit'] != source_sha
            or qa.get('format') != 'stemlab.timeline-browser-check'
            or qa.get('status') != 'passed' or qa.get('mode') != 'http-project-pages-prefix'
            or (snapshot['loop_count'] > 0 and qa.get('loop_audition') is not True)
            or qa.get('snapshot_sha256') != digest(site / 'snapshot.json')
            or qa.get('source_sha256') != ARCADIANS_SHA256
            or any(qa.get(k) is not True for k in required)
            or qa.get('page_errors') != [] or qa.get('bad_responses') != []
            or qa.get('external_requests') != []):
        raise ValueError('Only a complete, real Arcadians timeline with matching HTTP browser QA is publishable')
    return snapshot


def assemble(site: Path, timeline: Path, qa: Path, source_sha: str) -> dict:
    verify_site(site)
    snapshot = verify_timeline_qa(timeline, qa, source_sha)
    provenance = read_json(site / 'arcadians/release-demo.json')
    if provenance['stemlab_commit'] != source_sha:
        raise ValueError('Movement/timeline export revisions differ')
    destination = site / 'timeline/arcadians'
    if destination.exists():
        raise FileExistsError('Site already has a timeline; do not merge stale files')
    destination.parent.mkdir()
    shutil.copytree(timeline, destination)
    provenance['timeline'] = {'path': 'timeline/arcadians/', 'snapshot_sha256': digest(destination / 'snapshot.json'),
                              'coverage': snapshot['coverage']}
    write_json(site / 'arcadians/release-demo.json', provenance)
    (site / 'index.html').write_text('''<!doctype html>
<html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Arcadians · StemLab demos · Kieran Simkin</title>
<style>body{font:18px/1.7 system-ui;max-width:58rem;margin:4rem auto;padding:1rem;background:#101a25;color:#eef4fa}a{color:#9cd9ff}article{padding:1.5rem;border:1px solid #456;margin:1rem 0;border-radius:1rem}</style>
<h1>Arcadians · StemLab</h1><p>Music by Kieran Simkin · 145 BPM · full song</p>
<article><h2><a href="timeline/arcadians/">Open the complete analysis timeline</a></h2>
<p>The real React timeline: master and six separated stems, spectrograms, beats, lyrics,
structure, harmony, sonic evidence and loop discovery. Press Play to listen.</p></article>
<article><h2><a href="arcadians/">Open the movement comparison</a></h2>
<p>48 master-derived DanceRudiments movements, synchronized with the original MP3.</p></article>
<p>Artist references and model hypotheses are distinct. Inferred results are not ground truth.
Audio and lyrics retain their original rights; software licensing does not license the song.</p>
<p><a href="https://kieransimkin.co.uk/arcadians/">Arcadians EPK</a> ·
<a href="https://github.com/kieransimkin/stemlab">StemLab source</a></p></html>\n''', encoding='utf-8')
    return verify_site(site)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--site', type=Path, required=True)
    parser.add_argument('--timeline', type=Path, required=True)
    parser.add_argument('--qa', type=Path, required=True)
    parser.add_argument('--source-sha', required=True)
    args = parser.parse_args()
    print(json.dumps(assemble(args.site, args.timeline, args.qa, args.source_sha), indent=2))


if __name__ == '__main__':
    main()
