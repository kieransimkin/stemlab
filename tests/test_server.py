import pytest

pytest.importorskip("fastapi")
pytest.importorskip("socketio")

from stemlab.server import _job_timeout_seconds, _normalise_hash, _safe_filename


def test_normalise_hash_accepts_sha256_and_rejects_paths():
    value = "A" * 64
    assert _normalise_hash(value) == "a" * 64
    with pytest.raises(ValueError):
        _normalise_hash("../../etc/passwd")


def test_safe_filename_is_identification_only_and_filesystem_safe():
    assert _safe_filename(r"..\Some Song (final)!!.WAV") == "Some_Song_final_.WAV"
    assert "/" not in _safe_filename("dir/name.flac")
    assert "\\" not in _safe_filename(r"dir\name.flac")


def test_timeout_is_never_below_ten_times_average():
    durations = [100.0, 200.0, 300.0]
    assert _job_timeout_seconds(durations, 60.0, 1.0) == 2000.0
    assert _job_timeout_seconds(durations, 5000.0, 10.0) == 5000.0


def test_timeout_uses_floor_without_history():
    assert _job_timeout_seconds([], 86400.0, 10.0) == 86400.0
