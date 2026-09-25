from __future__ import annotations

from pathlib import Path

import numpy as np

from .audio import load_audio


def generate_spectrogram(
    audio_path: Path,
    png_path: Path,
    data_path: Path,
    *,
    n_fft: int = 2094,
    hop_length: int = 126,
    max_plot_frames: int = 5000,
) -> dict:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    import torch
    import torchaudio

    wav, sr = load_audio(audio_path, mono=True)
    x = wav[0]
    window = torch.hann_window(n_fft, device=x.device)
    z = torch.stft(
        x,
        n_fft=n_fft,
        hop_length=hop_length,
        window=window,
        center=True,
        return_complex=True,
    )
    power = z.abs().square()
    db = torchaudio.functional.amplitude_to_DB(
        power,
        multiplier=10.0,
        amin=1e-10,
        db_multiplier=float(torch.log10(torch.clamp(power.max(), min=1e-10))),
        top_db=100.0,
    ).cpu().numpy().astype(np.float32)
    times = np.arange(db.shape[1], dtype=np.float64) * hop_length / sr
    freqs = np.arange(db.shape[0], dtype=np.float64) * sr / n_fft

    data_path.parent.mkdir(parents=True, exist_ok=True)
    # Float16 dramatically reduces 50+ stem analysis size while retaining useful dB precision.
    np.savez_compressed(
        data_path,
        magnitude_db=db.astype(np.float16),
        times_seconds=times,
        frequencies_hz=freqs,
        sample_rate=np.int32(sr),
        n_fft=np.int32(n_fft),
        hop_length=np.int32(hop_length),
    )

    plot = db
    plot_times = times
    if plot.shape[1] > max_plot_frames:
        stride = int(np.ceil(plot.shape[1] / max_plot_frames))
        plot = plot[:, ::stride]
        plot_times = times[::stride]

    png_path.parent.mkdir(parents=True, exist_ok=True)
    fig = plt.figure(figsize=(16, 6), dpi=150)
    ax = fig.add_subplot(111)
    ax.imshow(
        plot,
        origin="lower",
        aspect="auto",
        extent=[float(plot_times[0] if len(plot_times) else 0), float(plot_times[-1] if len(plot_times) else 0), 0, sr / 2],
        interpolation="nearest",
    )
    ax.set_yscale("symlog", linthresh=100)
    ax.set_xlabel("Time (s)")
    ax.set_ylabel("Frequency (Hz)")
    ax.set_title(audio_path.name)
    fig.tight_layout()
    fig.savefig(png_path)
    plt.close(fig)
    return {
        "audio": str(audio_path),
        "png": str(png_path),
        "data": str(data_path),
        "sample_rate": sr,
        "n_fft": n_fft,
        "hop_length": hop_length,
        "frames": int(db.shape[1]),
        "bins": int(db.shape[0]),
    }
