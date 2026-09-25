import pytest

from stemlab.beats.common import consensus_result
from stemlab.types import BeatResult


def test_consensus_uses_majority_and_median_timestamp():
    results = [
        BeatResult("beatnet", [1.00, 2.00, 3.00], [1.00, 3.00], 60.0),
        BeatResult("beat_this", [1.02, 2.03, 2.99], [1.02, 2.99], 60.0),
        BeatResult("beat_transformer", [0.98, 2.50, 3.01], [0.98, 3.01], 60.0),
    ]

    result = consensus_result(results, tolerance=0.08)

    assert result is not None
    assert result.model == "consensus"
    assert result.beats == pytest.approx([1.00, 2.015, 3.00], abs=1e-6)
    assert result.downbeats == pytest.approx([1.00, 3.00], abs=1e-6)
    assert [event["support"] for event in result.metadata["beat_support"]] == [3, 2, 3]
    assert result.metadata["required_support"] == 2
