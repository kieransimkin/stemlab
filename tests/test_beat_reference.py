"""Real pinned public evidence, with no learned-model downloads or inference."""
from pathlib import Path
import shutil
import sys

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parents[1]/'scripts'))
from build_beat_example import FIXTURE, SOURCE_SHA, build, verify_evidence, verify_example
from stemlab.static_timeline import read_json


def test_public_reference_retains_raw_and_fitted_tempos_and_unknown_canonical(tmp_path):
    snapshot = build(tmp_path/'site', 'c'*40)
    assert snapshot['source_sha256'] == SOURCE_SHA
    assert verify_example(tmp_path/'site', 'c'*40)['coverage']['recipe'] == 'reference-beat-analysis-v1'
    state = read_json(tmp_path/'site/data/timeline.json')
    bases = {row['id']: row for row in state['beat_offsets']['bpm_bases']}
    assert bases['canonical']['status'] == 'unavailable'
    assert bases['combined']['bpm'] == pytest.approx(109.0909090909093)
    assert bases['combined_fit']['bpm'] == 109.0013
    assert bases['combined_fit']['fit']['p95_absolute_beat_error_ms'] == 17.627
    assert bases['combined_fit']['fit']['precision_grade'] == 'loose'


def test_reference_rejects_changed_detection_without_fabricating_replacement(tmp_path):
    fixture = tmp_path/'fixture'
    shutil.copytree(FIXTURE, fixture)
    (fixture/'beats/beat_this.json').write_text('{}', encoding='utf-8')
    with pytest.raises(ValueError, match='pinned identity'):
        verify_evidence(fixture)


def test_reference_requires_exact_source_revision(tmp_path):
    with pytest.raises(ValueError, match='exact source commit'):
        build(tmp_path/'site', 'main')
    assert not (tmp_path/'site').exists()
