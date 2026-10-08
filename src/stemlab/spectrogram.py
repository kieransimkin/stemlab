from __future__ import annotations

from pathlib import Path

import numpy as np

from .audio import load_audio


def _downsample_plot_frames(
    plot: np.ndarray,
    times: np.ndarray,
    max_plot_frames: int,
) -> tuple[np.ndarray, np.ndarray]:
    """Bound Matplotlib's render input while preserving the full saved evidence."""
    if max_plot_frames < 2:
        raise ValueError("max_plot_frames must be at least 2")
    if plot.shape[1] != len(times):
        raise ValueError("spectrogram frame count and time count differ")
    if plot.shape[1] <= max_plot_frames:
        return plot, times
    indices = np.linspace(0, plot.shape[1] - 1, max_plot_frames, dtype=np.int64)
    return plot[:, indices], times[indices]


def render_spectrogram_png(
    db: np.ndarray,
    times: np.ndarray,
    sample_rate: int,
    png_path: Path,
    *,
    title: str,
    max_plot_frames: int = 8192,
) -> int:
    """Render a bounded preview and return the number of plotted time frames."""
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    plot, plot_times = _downsample_plot_frames(db, times, max_plot_frames)
    png_path.parent.mkdir(parents=True, exist_ok=True)
    fig = plt.figure(figsize=(16, 6), dpi=150)
    try:
        ax = fig.add_subplot(111)
        ax.imshow(
            plot,
            origin="lower",
            aspect="auto",
            extent=[float(plot_times[0] if len(plot_times) else 0), float(plot_times[-1] if len(plot_times) else 0), 0, sample_rate / 2],
            interpolation="nearest",
        )
        ax.set_yscale("symlog", linthresh=100)
        ax.set_xlabel("Time (s)")
        ax.set_ylabel("Frequency (Hz)")
        ax.set_title(title)
        fig.tight_layout()
        fig.savefig(png_path)
    finally:
        plt.close(fig)
    return int(plot.shape[1])


def generate_spectrogram(
    audio_path: Path,
    png_path: Path,
    data_path: Path,
    *,
    n_fft: int = 2094,
    hop_length: int = 126,
    max_plot_frames: int = 8192,
) -> dict:
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

    plotted_frames = render_spectrogram_png(
        db, times, sr, png_path, title=audio_path.name, max_plot_frames=max_plot_frames
    )
    return {
        "audio": str(audio_path),
        "png": str(png_path),
        "data": str(data_path),
        "sample_rate": sr,
        "n_fft": n_fft,
        "hop_length": hop_length,
        "frames": int(db.shape[1]),
        "plot_frames": plotted_frames,
        "bins": int(db.shape[0]),
    }
