"""Bounded, source-rate Fourier band RMS on an existing recording's pip grid."""
from __future__ import annotations

from dataclasses import dataclass
import math

import numpy as np
import soundfile as sf


@dataclass(frozen=True)
class FourierBand:
    index: int
    edges_hz: tuple[float, ...]
    fft_size: int = 2048

    def __post_init__(self):
        edges = tuple(float(v) for v in self.edges_hz)
        if not 2 <= len(edges) <= 1025 or not all(math.isfinite(v) for v in edges):
            raise ValueError('Fourier bands require 2..1025 finite edges')
        if edges[0] < 0 or any(a >= b for a, b in zip(edges, edges[1:])):
            raise ValueError('Fourier frequency edges must be nonnegative and strictly increasing')
        if type(self.index) is not int or not 0 <= self.index < len(edges)-1:
            raise ValueError('Invalid Fourier band index')
        if type(self.fft_size) is not int or not 16 <= self.fft_size <= 65536 or self.fft_size & (self.fft_size-1):
            raise ValueError('FFT size must be a power of two in 16..65536')
        object.__setattr__(self, 'edges_hz', edges)

    def bins(self, sample_rate):
        if self.edges_hz[-1] > sample_rate/2:
            raise ValueError('Fourier frequency range exceeds the source Nyquist frequency')
        frequencies = np.fft.rfftfreq(self.fft_size, 1/sample_rate)
        starts = np.searchsorted(frequencies, self.edges_hz[:-1], side='left')
        stops = np.searchsorted(frequencies, self.edges_hz[1:], side='left')
        stops[-1] = np.searchsorted(frequencies, self.edges_hz[-1], side='right')
        if np.any(starts >= stops):
            raise ValueError('Empty Fourier band: reduce the bucket count, increase FFT size or widen the frequency range')
        return starts, stops


def frequency_edges(sample_rate, bands=32, *, minimum=0., maximum=None, spacing='linear'):
    if type(bands) is not int or not 1 <= bands <= 1024:
        raise ValueError('Frequency bucket count must be an integer in 1..1024')
    maximum = sample_rate/2 if maximum is None else maximum
    if any(isinstance(v, bool) or not isinstance(v, (int, float)) or not math.isfinite(v) for v in (minimum, maximum)):
        raise ValueError('Frequency limits must be finite numbers')
    if not 0 <= minimum < maximum <= sample_rate/2:
        raise ValueError('Require 0 <= minimum < maximum <= source Nyquist frequency')
    if spacing not in ('linear', 'log') or (spacing == 'log' and minimum <= 0):
        raise ValueError('Frequency spacing must be linear, or log with a positive minimum')
    edges = (np.linspace if spacing == 'linear' else np.geomspace)(minimum, maximum, bands+1)
    # Preserve exact requested endpoint identity rather than a rounded geomspace endpoint.
    edges[0], edges[-1] = minimum, maximum
    return tuple(float(v) for v in edges)


def band_envelopes(path, edges, lower, upper, spec):
    """One centered periodic-Hann rFFT per pip, all bands/channels in one pass.

    One-sided squared magnitudes retain DC/Nyquist once and other bins twice.
    Dividing by N * sum(window**2) gives window-weighted mean-square amplitude.
    Average channel powers before taking RMS; never sum antiphase PCM channels.
    """
    with sf.SoundFile(str(path)) as audio:
        sample_rate = audio.samplerate
        starts, stops = spec.bins(sample_rate)
        if spec.fft_size * audio.channels > 2_097_152:
            raise ValueError('Fourier frame memory budget exceeded; reduce FFT size or source channels')
        count, bands = len(edges)-1, len(starts)
        values = np.zeros((count, bands), dtype=np.float64)
        window = np.hanning(spec.fft_size+1)[:-1]
        divisor = spec.fft_size * np.sum(window**2)
        weights = np.full(spec.fft_size//2+1, 2.)
        weights[[0, -1]] = 1.
        observed = np.maximum(0, np.minimum(edges[1:], upper)-np.maximum(edges[:-1], lower))
        for i in np.flatnonzero(observed):
            center = (int(edges[i])+int(edges[i+1]))//2
            begin = center-spec.fft_size//2
            left, right = max(begin, lower), min(begin+spec.fft_size, upper)
            frame = np.zeros((spec.fft_size, audio.channels), dtype=np.float64)
            if left < right:
                audio.seek(left)
                block = audio.read(right-left, dtype='float64', always_2d=True)
                if len(block) != right-left or not np.isfinite(block).all():
                    raise ValueError('Fourier source contains non-finite samples or changed during extraction')
                frame[left-begin:right-begin] = block
            with np.errstate(over='ignore', invalid='ignore'):
                spectrum = np.fft.rfft(frame*window[:, None], axis=0)
                power = np.mean(np.abs(spectrum)**2, axis=1)*weights
                # Contiguous bin sums avoid subtracting nearly equal cumulative powers.
                values[i] = np.sqrt(np.add.reduceat(power[:stops[-1]], starts)/divisor)
            if not np.isfinite(values[i]).all():
                raise ValueError('Fourier output contains non-finite values')
    stats = dict(empty_windows=int(np.count_nonzero(observed == 0)),
                 partial_windows=int(np.count_nonzero((observed > 0) & (observed < np.diff(edges)))),
                 contributing_frames=int(observed.sum()), fft_size=spec.fft_size,
                 fft_window='periodic Hann', fft_resolution_hz=sample_rate/spec.fft_size,
                 fft_window_seconds=spec.fft_size/sample_rate,
                 fft_alignment='center at floor((pip start frame + pip end frame)/2)',
                 fft_boundary='zero outside requested excerpt/source; no wrap',
                 amplitude_definition='sqrt(sum(one-sided bin power)/(N*sum(Hann**2))); mean channel power',
                 frequency_interval='left-closed/right-open; last band includes upper endpoint')
    return values, stats, starts, stops
