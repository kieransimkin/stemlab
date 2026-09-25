import hashlib
from pathlib import Path

from stemlab.canonical import _parse_lrc


ROOT = Path(__file__).resolve().parents[1]
EXAMPLE = ROOT / "examples" / "arcadians"


def test_arcadians_canonical_lrc_matches_locked_reference():
    path = EXAMPLE / "canonical-lyric-timing.lrc"
    raw = path.read_bytes()
    assert hashlib.sha256(raw).hexdigest() == (
        "92b46abc4caf1caa8eddf7c306a9e767f8d0bbefed3b39d38e4b4f96981e9de7"
    )
    events = _parse_lrc(raw.decode("utf-8-sig"))
    assert len(events) == 48
    assert events[0] == {
        "start": 2.89,
        "end": 7.76,
        "text": "No crown, no concrete",
    }
    assert events[-1] == {
        "start": 235.39,
        "end": 246.59,
        "text": "Arcadia never died",
    }


def test_arcadians_example_audio_identity():
    path = EXAMPLE / "Arcadians - 320kbps.mp3"
    assert hashlib.sha256(path.read_bytes()).hexdigest() == (
        "5a3d17d8b5b27d62a6bb9fa1f654c403db0341da826d650cc282dfa5758ee6de"
    )
