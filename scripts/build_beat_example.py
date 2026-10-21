"""Regenerate the approved real-song reference from frozen, hash-pinned detections."""
from __future__ import annotations

import argparse
import json
from pathlib import Path
import re
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'src'))
from stemlab.analysis.beat_offsets import compare_beat_offsets
from stemlab.static_timeline import digest, export_timeline, read_json, verify_snapshot

ROOT = Path(__file__).resolve().parents[1]
FIXTURE = ROOT/'examples/the-truth-is-a-virus'
SLUG = 'the-truth-is-a-virus'
SOURCE_SHA = 'b11ac7c48df227ac51d94c05a245d3138acf1a002f851c55d98fd7fb7f0de510'


def verify_evidence(fixture: Path = FIXTURE):
    evidence = read_json(fixture/'evidence.json')
    expected = {'analysis.json', 'canonical.json', 'master.mp3', 'beats/beat_this.json',
                'beats/beatnet.json', 'beats/consensus.json'}
    if set(evidence.get('files', {})) != expected:
        raise ValueError('Reference example requires the exact approved evidence inventory')
    for name, sha in evidence['files'].items():
        if (fixture/name).is_symlink() or digest(fixture/name) != sha:
            raise ValueError('Reference evidence differs from its pinned identity: '+name)
    if digest(fixture/'master.mp3') != SOURCE_SHA:
        raise ValueError('Reference example is not the approved public master')
    report = compare_beat_offsets(fixture, audio=fixture/'master.mp3')
    available = {row['analysis_id'] for row in report['analyses'] if row['status'] == 'available'}
    fit = next(row for row in report['bpm_bases'] if row['id'] == 'combined_fit')
    if (available != {'beat_this', 'beatnet', 'consensus'} or not 108.9 < fit['bpm'] < 109.1
            or fit['fit']['p95_absolute_beat_error_ms'] > 25
            or read_json(fixture/'canonical.json').get('bpm') is not None):
        raise ValueError('Reference fit, detector inventory or authority status changed')
    return evidence, report


def build(output: Path, source_commit: str, *, fixture: Path = FIXTURE):
    if not re.fullmatch('[a-f0-9]{40}', source_commit):
        raise ValueError('Require an exact source commit')
    evidence, _ = verify_evidence(fixture)
    audition_path = fixture / 'lyric-audition.json'
    audition = read_json(audition_path) if audition_path.is_file() else None
    artwork = fixture / 'cover.jpg' if (fixture / 'cover.jpg').is_file() else None
    if audition is not None and (artwork is None or digest(artwork) != audition.get('artwork_sha256')):
        raise ValueError('Reference artwork differs from its audition identity')
    result = export_timeline(fixture, output, include_audio=True, source_commit=source_commit,
        artwork=artwork, audition=audition,
        byte_exact_json={name: sha for name, sha in evidence['files'].items() if name.endswith('.json')},
        coverage={'status': 'saved-snapshot', 'recipe': 'reference-beat-analysis-v1',
                  'scope': 'Real frozen BeatThis/BeatNet master evidence and consensus; CI regenerates fits, pip offsets and this viewer. No other model-family completeness or artist BPM approval is claimed.',
                  'evidence_sha256': digest(fixture/'evidence.json'), 'evidence_files': evidence['files']})
    verify_example(output, source_commit)
    return result


def verify_example(output: Path, source_commit: str):
    verify_snapshot(output)
    snapshot = read_json(output/'snapshot.json')
    state = read_json(output/'data/timeline.json')
    if (snapshot['source_sha256'] != SOURCE_SHA or snapshot['source_commit'] != source_commit
            or snapshot['coverage'].get('recipe') != 'reference-beat-analysis-v1'
            or snapshot['coverage'].get('evidence_sha256') != digest(FIXTURE/'evidence.json')
            or snapshot['coverage'].get('evidence_files') != read_json(FIXTURE/'evidence.json')['files']
            or state['canonical'].get('bpm') is not None):
        raise ValueError('Reference timeline source, recipe, revision or authority mismatch')
    for name in ('analysis.json', 'canonical.json', 'beats/beat_this.json', 'beats/beatnet.json', 'beats/consensus.json'):
        if digest(output/'data'/name) != digest(FIXTURE/name):
            raise ValueError('Published detector/reference evidence changed: '+name)
    report = state['beat_offsets']
    expected = compare_beat_offsets(FIXTURE)
    # Audio verification differs deliberately; all scientific results must match.
    for key in ('bpm_bases', 'analyses', 'comparisons', 'pips_per_beat'):
        if report[key] != expected[key]:
            raise ValueError('Reference beat-offset calculations differ from pinned evidence')
    return snapshot


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--source-commit', required=True)
    args = parser.parse_args()
    print(json.dumps(build(args.output, args.source_commit), indent=2))


if __name__ == '__main__':
    main()
