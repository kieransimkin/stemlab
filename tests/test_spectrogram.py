import json

import numpy as np

from stemlab.spectrogram import _downsample_plot_frames
from stemlab.spectrogram_repair import repair_failed_spectrograms


def test_downsample_plot_frames_is_bounded_and_keeps_endpoints():
    plot = np.arange(3 * 101, dtype=np.float32).reshape(3, 101)
    times = np.linspace(0, 10, 101)
    reduced, reduced_times = _downsample_plot_frames(plot, times, 8)
    assert reduced.shape == (3, 8)
    assert reduced_times[0] == times[0]
    assert reduced_times[-1] == times[-1]
    assert np.array_equal(reduced[:, 0], plot[:, 0])
    assert np.array_equal(reduced[:, -1], plot[:, -1])


def test_repair_failed_spectrogram_from_retained_npz(tmp_path):
    stem = tmp_path / "stems" / "model" / "vocals.wav"
    stem.parent.mkdir(parents=True)
    stem.write_bytes(b"retained stem")
    data_path = tmp_path / "spectrograms" / "model" / "vocals.npz"
    data_path.parent.mkdir(parents=True)
    np.savez_compressed(
        data_path,
        magnitude_db=np.zeros((4, 33), dtype=np.float16),
        times_seconds=np.linspace(0, 1, 33),
        sample_rate=np.int32(44100),
        n_fft=np.int32(6),
        hop_length=np.int32(2),
    )
    analysis = {
        "errors": [
            {"stage": "spectrogram:model:vocals", "message": "memory"},
            {"stage": "separation:unavailable", "message": "expected"},
        ],
        "models": [{"stems": [{"model": "model", "stem": "vocals", "path": "stems/model/vocals.wav"}]}],
        "spectrograms": [],
    }
    (tmp_path / "analysis.json").write_text(json.dumps(analysis), encoding="utf-8")
    (tmp_path / "manifest.json").write_text(json.dumps({"attribution": {"project": "StemLab"}, "error_count": 2}), encoding="utf-8")

    report = repair_failed_spectrograms(tmp_path, max_plot_frames=8)

    assert report["repaired_count"] == 1
    assert report["remaining_error_count"] == 1
    assert data_path.with_suffix(".png").is_file()
    saved = json.loads((tmp_path / "analysis.json").read_text(encoding="utf-8"))
    assert saved["spectrograms"][0]["plot_frames"] == 8
    assert saved["errors"][0]["stage"] == "separation:unavailable"
    manifest = json.loads((tmp_path / "manifest.json").read_text(encoding="utf-8"))
    assert manifest["attribution"]["project"] == "StemLab"
    assert manifest["error_count"] == 1
