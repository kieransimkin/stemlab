"""Native-rate signed waveform and envelope extraction on the DanceRudiments clock."""
from __future__ import annotations
from dataclasses import dataclass, asdict
from fractions import Fraction
import importlib
import json
import math
from pathlib import Path
import re
import tempfile

import numpy as np
import soundfile as sf
from scipy.signal import butter, sosfilt, sosfilt_zi
from stemlab.util import sha256_file
from .frequency_bands import FourierBand, frequency_edges, band_envelopes

BLOCK_FRAMES = 131072
MAX_CACHED_VALUES = 32_000_000


def recording_api():
    try:
        return importlib.import_module('dancerudiments_authoring.recording')
    except ImportError as exc:
        raise RuntimeError('Install the companion DanceRudiments recording/harness update; '
                           'older packages do not contain it. StemLab does not substitute a private format.') from exc


def finite(value, label):
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValueError(f'{label} must be finite')
    return float(value)


@dataclass(frozen=True)
class AxisSpec:
    name: str
    source: Path
    mode: str = 'peak'
    low_pass: float | None = None
    high_pass: float | None = None
    filter_order: int = 4
    gain: float = 1.
    moving_average_beats: float = 0.25
    fourier: FourierBand | None = None

    def __post_init__(self):
        if not isinstance(self.name, str) or not re.fullmatch(r'[a-z][a-z0-9_]{0,127}', self.name):
            raise ValueError('Axis names must match [a-z][a-z0-9_]{0,127}')
        object.__setattr__(self, 'source', Path(self.source).expanduser().resolve())
        if self.mode not in ('peak', 'average', 'moving-average', 'waveform', 'fourier'):
            raise ValueError('Mode must be peak, average, moving-average, waveform or fourier')
        if (self.fourier is not None and not isinstance(self.fourier, FourierBand)) or (self.mode == 'fourier') != (self.fourier is not None):
            raise ValueError('Fourier mode requires a FourierBand specification; other modes cannot use it')
        if self.fourier is not None and (self.low_pass is not None or self.high_pass is not None):
            raise ValueError('Fourier bands cannot be combined with time-domain low/high-pass filters')
        window = finite(self.moving_average_beats, 'moving_average_beats')
        if not 0 < window <= 64:
            raise ValueError('Moving-average window must be >0 and <=64 beats')
        if type(self.filter_order) is not int or not 1 <= self.filter_order <= 12:
            raise ValueError('Filter order must be an integer in 1..12')
        for key in ('low_pass', 'high_pass'):
            v = getattr(self, key)
            if v is not None and finite(v, key) <= 0:
                raise ValueError('Filter cutoffs must be positive')
        if self.low_pass is not None and self.high_pass is not None and self.high_pass >= self.low_pass:
            raise ValueError('Band-pass requires high_pass < low_pass')
        finite(self.gain, 'gain')


def fourier_axes(source, bands=32, *, fft_size=2048, minimum=0., maximum=None, spacing='linear'):
    """One ascending-frequency dimension per bucket, using a single source pass."""
    source = Path(source).expanduser().resolve()
    info = sf.info(str(source))
    edges = frequency_edges(info.samplerate, bands, minimum=minimum, maximum=maximum, spacing=spacing)
    specs = [FourierBand(i, edges, fft_size) for i in range(bands)]
    specs[0].bins(info.samplerate)  # Reject unresolved/empty buckets before export.
    return [AxisSpec(f'band_{i:03d}', source, mode='fourier', fourier=spec) for i, spec in enumerate(specs)]


def moving_average_pips(beats: float, pips_per_beat: int = 64) -> int:
    """Round half up to the nearest recording pip; never alter the recording clock."""
    window = finite(beats, 'moving_average_beats')
    if not 0 < window <= 64:
        raise ValueError('Moving-average window must be >0 and <=64 beats')
    return max(1, math.floor(window * pips_per_beat + 0.5))


def smooth_envelope(values: np.ndarray, window_pips: int) -> np.ndarray:
    """Centered boxcar of the per-pip mean-absolute envelope, not signed PCM.

    Even windows use half weight at each outer bin, preserving symmetry about
    the current pip. At excerpt/file boundaries only available bins contribute;
    there is no wrap or artificial zero padding. O(n), including very wide windows.
    """
    x = np.asarray(values, dtype=np.float64)
    if x.ndim != 1 or not len(x) or not np.isfinite(x).all():
        raise ValueError('Smoothing requires a finite, non-empty 1D envelope')
    if type(window_pips) is not int or window_pips < 1:
        raise ValueError('window_pips must be a positive integer')
    if window_pips == 1:
        return x.copy()
    radius = window_pips // 2
    i = np.arange(len(x), dtype=np.int64)
    lo, hi = np.maximum(0, i-radius), np.minimum(len(x), i+radius+1)
    prefix = np.concatenate(([0.], np.cumsum(x, dtype=np.float64)))
    sums = prefix[hi] - prefix[lo]
    weights = (hi-lo).astype(np.float64)
    if window_pips % 2 == 0:
        left, right = i-radius, i+radius
        valid = left >= 0
        sums[valid] -= 0.5 * x[left[valid]]
        weights[valid] -= 0.5
        valid = right < len(x)
        sums[valid] -= 0.5 * x[right[valid]]
        weights[valid] -= 0.5
    # Input envelopes are non-negative; clamp sub-ULP cancellation at silence.
    result = sums / weights
    if np.all(x >= 0):
        result = np.maximum(result, 0.)
    return checked(result)


def filter_sos(axis, sr):
    for v in (axis.low_pass, axis.high_pass):
        if v is not None and v >= sr/2:
            raise ValueError(f'{axis.name}: cutoff must be below Nyquist ({sr/2:g} Hz)')
    if axis.high_pass is not None and axis.low_pass is not None:
        return butter(axis.filter_order, [axis.high_pass, axis.low_pass], btype='bandpass', fs=sr, output='sos')
    if axis.low_pass is not None or axis.high_pass is not None:
        return butter(axis.filter_order, axis.low_pass or axis.high_pass,
                      btype='lowpass' if axis.low_pass is not None else 'highpass', fs=sr, output='sos')
    return None


def checked(block):
    if not np.all(np.isfinite(block)):
        raise ValueError('Audio/filter output contains non-finite samples')
    return block


def audio_blocks(path, sos=None, phase='zero', block_frames=BLOCK_FRAMES):
    """Streaming SOS; zero-phase odd padding matches scipy.sosfiltfilt using a disk spool."""
    with sf.SoundFile(str(path)) as f:
        if sos is None or phase == 'causal':
            state = np.zeros((len(sos), 2, f.channels)) if sos is not None else None
            for block in f.blocks(blocksize=block_frames, dtype='float64', always_2d=True):
                block = checked(block)
                if sos is not None:
                    block, state = sosfilt(sos, block, axis=0, zi=state)
                yield checked(block)
            return
        edge = min(f.frames-1, int(3*(2*len(sos)+1-min((sos[:, 2] == 0).sum(), (sos[:, 5] == 0).sum()))))
        first = checked(f.read(edge+1, dtype='float64', always_2d=True))
        f.seek(f.frames-edge-1)
        last = checked(f.read(edge+1, dtype='float64', always_2d=True))
        left, right = 2*first[0]-first[1:][::-1], 2*last[-1]-last[:-1][::-1]
        zi = sosfilt_zi(sos)[:, :, None]
        with tempfile.TemporaryDirectory(prefix='stemlab-filter-') as folder:
            spool = np.memmap(Path(folder)/'audio.f64', mode='w+', dtype='float64', shape=(f.frames+2*edge, f.channels))
            try:
                state = zi*(left[0] if edge else first[0])[None, None, :]
                position = 0
                def store(block):
                    nonlocal state, position
                    if len(block):
                        result, state = sosfilt(sos, checked(block), axis=0, zi=state)
                        spool[position:position+len(block)] = checked(result)
                        position += len(block)
                store(left)
                f.seek(0)
                for block in f.blocks(blocksize=block_frames, dtype='float64', always_2d=True):
                    store(block)
                store(right)
                state = zi*np.array(spool[-1])[None, None, :]
                end = len(spool)
                while end:
                    begin = max(0, end-block_frames)
                    result, state = sosfilt(sos, spool[begin:end][::-1], axis=0, zi=state)
                    spool[begin:end] = checked(result[::-1])
                    end = begin
                for begin in range(0, f.frames, block_frames):
                    yield np.array(spool[edge+begin:edge+min(f.frames, begin+block_frames)])
            finally:
                spool._mmap.close()


def ceil_fraction(v):
    return -(-v.numerator//v.denominator)


def sample_edges(clock, count, sr):
    origin = (Fraction(str(clock.beat_zero_seconds))+clock.start_pip*clock.pip_seconds)*sr
    step = clock.pip_seconds*sr
    if step < 1:
        raise ValueError('BPM-synchronised sampling rate exceeds the input audio rate')
    denominator = math.lcm(origin.denominator, step.denominator)
    a = origin.numerator*(denominator//origin.denominator)
    b = step.numerator*(denominator//step.denominator)
    try:
        return np.fromiter((-(-(a+i*b)//denominator) for i in range(count+1)), dtype=np.int64, count=count+1)
    except OverflowError as exc:
        raise ValueError('Clock exceeds supported audio-frame range') from exc


def sample_signed_waveform(path, clock, count, *, start, end, sr, frames,
                           user_sos=None, phase='zero', block_frames=BLOCK_FRAMES):
    """Anti-aliased signed PCM on the 64-pips-per-beat clock, at pip centres."""
    native_rate = 1. / float(clock.pip_seconds)
    cutoff = native_rate * .375  # 75% of the output Nyquist
    antialias = butter(12, cutoff, btype='lowpass', fs=sr, output='sos')
    sos = antialias if user_sos is None else np.vstack((user_sos, antialias))
    origin = (Fraction(str(clock.beat_zero_seconds)) +
              (clock.start_pip + Fraction(1, 2)) * clock.pip_seconds) * sr
    step = clock.pip_seconds * sr
    if step < 1:
        raise ValueError('BPM-synchronised sampling rate exceeds the input audio rate')
    centres = float(origin) + np.arange(count, dtype=np.float64) * float(step)
    valid = ((centres >= float(start * sr)) & (centres < float(end * sr)) &
             (centres >= 0.) & (centres < frames))
    floor = np.floor(centres).astype(np.int64)
    fraction = centres - floor
    left, right = np.zeros(count), np.zeros(count)
    position = 0
    for block in audio_blocks(path, sos, phase, block_frames):
        # One signed movement coordinate: mean the PCM channels BEFORE sampling.
        mono = block.mean(axis=1, dtype=np.float64)
        lo, hi = np.searchsorted(floor, [position, position + len(mono)])
        indices = np.arange(lo, hi)
        indices = indices[valid[indices]]
        left[indices] = mono[floor[indices] - position]
        # Fetch the right interpolation frame even across disk-block boundaries.
        lo, hi = np.searchsorted(floor, [position - 1, position + len(mono) - 1])
        indices = np.arange(lo, hi)
        indices = indices[valid[indices]]
        right[indices] = mono[floor[indices] + 1 - position]
        position += len(mono)
    values = checked((1. - fraction) * left + fraction * right)
    return values, dict(
        sampled_centres=int(np.count_nonzero(valid)),
        padded_centres=int(count - np.count_nonzero(valid)),
        native_rate_hz=native_rate,
        antialias_cutoff_hz=cutoff,
        antialias_filter_order=12,
        waveform_sample_position='pip centre (beat_zero + (start_pip + index + 0.5) * 60/(64*BPM))',
        waveform_resampler='anti-aliased linear interpolation of signed PCM',
        waveform_channels='arithmetic mean of signed source channels',
    )


class EnvelopeBank:
    """Cache each source/filter pass once, producing both peak and average envelopes."""
    def __init__(self, sources, *, bpm=None, bpm_source='user', bpm_status='estimated',
                 beat_zero_seconds=0., phase_status='unverified', start_seconds=0., end_seconds=None,
                 length_policy='strict', filter_phase='zero', progress=None, block_frames=BLOCK_FRAMES):
        if bpm is None or finite(bpm, 'BPM') <= 0:
            raise ValueError('A BPM estimate or confirmed value is required')
        if length_policy not in ('strict', 'pad', 'trim') or filter_phase not in ('zero', 'causal'):
            raise ValueError('Invalid length policy or filter phase')
        if type(block_frames) is not int or block_frames < 1:
            raise ValueError('block_frames must be a positive integer')
        self.api = recording_api()
        base = self.api.RecordingClock(bpm, bpm_source, bpm_status, beat_zero_seconds, phase_status)
        self.infos = {Path(p).resolve(): sf.info(str(p)) for p in sources}
        if not self.infos or any(i.frames < 1 or i.samplerate < 1 for i in self.infos.values()):
            raise ValueError('Every selected source must contain audio samples')
        durations = [Fraction(i.frames, i.samplerate) for i in self.infos.values()]
        tolerance = max(Fraction(1, i.samplerate) for i in self.infos.values())
        if length_policy == 'strict' and max(durations)-min(durations) > tolerance:
            raise ValueError('Source durations differ; explicitly select length-policy pad/trim or align the files')
        duration = min(durations) if length_policy == 'trim' else max(durations)
        self.start = Fraction(str(finite(start_seconds, 'start_seconds')))
        self.end = duration if end_seconds is None else Fraction(str(finite(end_seconds, 'end_seconds')))
        if not 0 <= self.start < self.end <= duration:
            raise ValueError('Require 0 <= start < end <= selected audio duration')
        origin = Fraction(str(beat_zero_seconds))
        first = (self.start-origin)//base.pip_seconds
        self.count = ceil_fraction((self.end-origin)/base.pip_seconds)-first
        if self.count < 1 or self.count > self.api.MAX_RECORDING_VALUES:
            raise ValueError('Recording exceeds the value budget; export a shorter excerpt')
        self.clock = self.api.RecordingClock(bpm, bpm_source, bpm_status, beat_zero_seconds, phase_status, first)
        if first+self.count > 2147483647:
            raise ValueError('Recording exceeds the signed int32 pip range')
        self.edges = {i.samplerate: sample_edges(self.clock, self.count, i.samplerate) for i in self.infos.values()}
        self.hashes = {p: sha256_file(p) for p in self.infos}
        self.cache = {}
        self.smoothing_cache = {}
        self.fourier_cache = {}
        self.waveform_cache = {}
        self.filter_phase, self.length_policy = filter_phase, length_policy
        self.progress, self.block_frames = progress or (lambda message: None), block_frames
        self.cache_hits = 0

    def waveform(self, axis):
        key = (axis.source, axis.low_pass, axis.high_pass, axis.filter_order)
        if key not in self.waveform_cache:
            if self.cached_values + self.count > MAX_CACHED_VALUES:
                raise ValueError('Waveform-cache budget exceeded; shorten the excerpt')
            info = self.infos[axis.source]
            user_sos = filter_sos(axis, info.samplerate)
            self.progress(f'Resampling signed waveform {axis.source.name}: '
                          f'low-pass={axis.low_pass}, high-pass={axis.high_pass}')
            self.waveform_cache[key] = sample_signed_waveform(
                axis.source, self.clock, self.count, start=self.start, end=self.end,
                sr=info.samplerate, frames=info.frames, user_sos=user_sos,
                phase=self.filter_phase, block_frames=self.block_frames)
        else:
            self.cache_hits += 1
        return self.waveform_cache[key]

    def envelope(self, axis):
        if axis.mode == 'waveform':
            return self.waveform(axis)
        if axis.fourier is not None:
            spec = axis.fourier
            key = (axis.source, spec.fft_size, spec.edges_hz)
            if key in self.fourier_cache:
                self.cache_hits += 1
            else:
                if self.cached_values + self.count*(len(spec.edges_hz)-1) > MAX_CACHED_VALUES:
                    raise ValueError('Envelope-cache budget exceeded; shorten the excerpt or reduce frequency buckets')
                info = self.infos[axis.source]
                self.progress(f'Fourier analysis of {axis.source.name}: {len(spec.edges_hz)-1} bands, FFT {spec.fft_size}')
                self.fourier_cache[key] = band_envelopes(axis.source, self.edges[info.samplerate],
                    max(0, ceil_fraction(self.start*info.samplerate)),
                    min(info.frames, ceil_fraction(self.end*info.samplerate)), spec)
            values, stats, starts, stops = self.fourier_cache[key]
            i = spec.index
            return values[:, i], dict(stats, frequency_low_hz=spec.edges_hz[i],
                frequency_high_hz=spec.edges_hz[i+1], fft_bin_start=int(starts[i]),
                fft_bin_end_exclusive=int(stops[i]), band_index=i, band_count=values.shape[1])
        key = (axis.source, axis.low_pass, axis.high_pass, axis.filter_order)
        if key in self.cache:
            self.cache_hits += 1
        else:
            if self.cached_values + self.count*2 > MAX_CACHED_VALUES:
                raise ValueError('Envelope-cache budget exceeded; shorten the excerpt or reduce source/filter variants')
            info = self.infos[axis.source]
            sos = filter_sos(axis, info.samplerate)
            self.progress(f'Extracting {axis.source.name}: low-pass={axis.low_pass}, high-pass={axis.high_pass}')
            edges = self.edges[info.samplerate]
            lower = max(0, ceil_fraction(self.start*info.samplerate))
            upper = min(info.frames, ceil_fraction(self.end*info.samplerate))
            peak, sums, counts = np.zeros(self.count), np.zeros(self.count), np.zeros(self.count, dtype=np.int64)
            position = 0
            for block in audio_blocks(axis.source, sos, self.filter_phase, self.block_frames):
                first, last = max(lower, position), min(upper, position+len(block))
                if first < last:
                    absolute = np.abs(block)
                    maxima, means = absolute.max(axis=1), absolute.mean(axis=1)
                    lo = max(0, int(np.searchsorted(edges, first, side='right'))-1)
                    hi = min(self.count, int(np.searchsorted(edges, last, side='left')))
                    for i in range(lo, hi):
                        a, b = max(first, edges[i]), min(last, edges[i+1])
                        if a < b:
                            peak[i] = max(peak[i], float(maxima[a-position:b-position].max()))
                            sums[i] += means[a-position:b-position].sum(dtype=np.float64)
                            counts[i] += b-a
                position += len(block)
            np.divide(sums, counts, out=sums, where=counts > 0)
            stats = dict(empty_windows=int(np.count_nonzero(counts == 0)),
                         partial_windows=int(np.count_nonzero((counts > 0) & (counts < np.diff(edges)))),
                         contributing_frames=int(counts.sum()))
            self.cache[key] = (checked(peak), checked(sums), stats)
        p, a, stats = self.cache[key]
        if axis.mode != 'moving-average':
            return (p if axis.mode == 'peak' else a), stats
        window = moving_average_pips(axis.moving_average_beats)
        smooth_key = (*key, window)
        if smooth_key not in self.smoothing_cache:
            if self.cached_values + self.count > MAX_CACHED_VALUES:
                raise ValueError('Envelope-cache budget exceeded; reduce smoothing variants or excerpt length')
            self.smoothing_cache[smooth_key] = smooth_envelope(a, window)
        return self.smoothing_cache[smooth_key], dict(stats,
            moving_average_window_pips=window,
            moving_average_effective_beats=window/64,
            moving_average_seconds=float(self.clock.pip_seconds)*window,
            moving_average_alignment='centered; half-weight endpoints for even windows',
            moving_average_boundary='available bins only; no wrap; excerpt-local')

    @property
    def cached_values(self):
        return (self.count*(2*len(self.cache) + len(self.smoothing_cache)) +
                sum(v[0].size for v in self.fourier_cache.values()) +
                sum(v[0].size for v in self.waveform_cache.values()))

    def compose(self, axes, *, name='audio_recording', normalization='none', metadata=None,
                normalization_reference='self', _data_only=False):
        if not axes or len({a.name for a in axes}) != len(axes):
            raise ValueError('At least one axis with unique names is required')
        if normalization not in ('none', 'global', 'per-axis'):
            raise ValueError('Normalization must be none/global/per-axis')
        if len(axes)*self.count > self.api.MAX_RECORDING_VALUES:
            raise ValueError('Recording exceeds the shared value budget')
        values = np.empty((self.count, len(axes)), dtype=np.float64)
        provenance = []
        for j, axis in enumerate(axes):
            values[:, j], stats = self.envelope(axis)
            info = self.infos[axis.source]
            item = asdict(axis)
            item.update(source=axis.source.name, source_sha256=self.hashes[axis.source],
                        source_sample_rate=info.samplerate, source_channels=info.channels,
                        source_frames=info.frames, source_subtype=info.subtype, **stats)
            provenance.append(item)
        if normalization_reference not in ('self', 'peak'):
            raise ValueError('Normalization reference must be self or peak')
        # Unlike rectified envelopes, waveforms can be entirely negative.
        peaks = np.array([np.max(np.abs(values[:, j])) if a.mode == 'waveform'
                          else np.max(values[:, j]) for j, a in enumerate(axes)])
        reference = peaks
        if normalization_reference == 'peak':
            from dataclasses import replace
            refs = [self.envelope(a if a.fourier is not None or a.mode in ('peak', 'waveform')
                                  else replace(a, mode='peak'))[0] for a in axes]
            reference = np.array([np.max(np.abs(v)) if a.mode == 'waveform'
                                  else np.max(v) for a, v in zip(axes, refs)])
        denominators = reference if normalization == 'per-axis' else np.full(len(axes), reference.max() if normalization == 'global' else 1.)
        for j, axis in enumerate(axes):
            scale = float(denominators[j])
            signal_peak = float(reference[j])
            if signal_peak <= 0:
                # A silent dimension has no meaningful direction; keep it centered.
                values[:, j] = 0.
                clipped = 0
            else:
                if not math.isfinite(scale) or scale <= 0:
                    raise ValueError('Normalization reference must be finite and positive for non-silent axes')
                # Signed waveform coordinates retain polarity and zero at zero;
                # rectified envelope/Fourier axes use the original affine map.
                with np.errstate(over='ignore', invalid='ignore'):
                    if axis.mode == 'waveform':
                        values[:, j] = (values[:, j] / scale) * axis.gain
                    else:
                        values[:, j] = (2. * (values[:, j] / scale) - 1.) * axis.gain
                clipped = int(np.count_nonzero(np.abs(values[:, j]) > 1))
            provenance[j].update(
                normalization_divisor=scale,
                unscaled_peak=float(peaks[j]),
                clipped_windows=clipped,
                output_scale='bipolar',
                output_range=[-1., 1.],
                silent_axis=signal_peak <= 0,
                output_mapping=('signed PCM / normalization reference; zero remains zero'
                                if axis.mode == 'waveform' else
                                '0 amplitude -> -1; normalization reference -> +1'),
            )
        values = np.round(np.clip(values, -1., 1.), 12)
        meta = dict(metadata or {})
        meta.update(producer='StemLab', axes=provenance, normalization=normalization,
                    normalization_reference=normalization_reference,
                    output_scale='bipolar', output_range=[-1., 1.],
                    output_mapping=('waveform: signed PCM/reference with zero at 0; '
                                    'envelope/Fourier: 0 amplitude -> -1, reference -> +1; '
                                    'gain and clipping after mapping; silent axes -> 0'
                                    if any(a.mode == 'waveform' for a in axes) else
                                    '0 amplitude -> -1; selected normalization reference -> +1; signed gain applied after mapping; silent axes -> 0'),
                    filter_phase=self.filter_phase, length_policy=self.length_policy,
                    requested_start_seconds=float(self.start), requested_end_seconds=float(self.end),
                    mean_definition='mean absolute amplitude across observed frames and channels',
                    window_interval='left-closed/right-open; partial averages use observed frames only',
                    clock_note='Constant BPM; not a variable-tempo map',
                    dynamic=bool(np.any(np.ptp(values, axis=0) > 1e-9)))
        if _data_only:
            return np.round(values, 12), meta
        return self.api.Recording(name, tuple(a.name for a in axes), values.tolist(), self.clock,
                                  json.dumps(meta, allow_nan=False))

    def verify_sources(self):
        for path, digest in self.hashes.items():
            if sha256_file(path) != digest:
                raise ValueError('Source audio changed during extraction: '+path.name)


def extract_recording(axes, *, name='audio_recording', normalization='none', **kwargs):
    bank = EnvelopeBank([a.source for a in axes], **kwargs)
    result = bank.compose(axes, name=name, normalization=normalization)
    bank.verify_sources()
    return result


def read_manifest(root):
    path = Path(root)/'analysis.json'
    if not path.is_file() or path.stat().st_size > 32*1024*1024:
        raise ValueError('Choose a StemLab analysis containing analysis.json')
    data = json.loads(path.read_text(encoding='utf-8'))
    if not isinstance(data, dict):
        raise ValueError('analysis.json must be an object')
    return data


def resolve_tempo(source, *, bpm=None, confirmed=False, beat_zero=None, beat_model='auto'):
    if confirmed and bpm is None:
        raise ValueError('--bpm-confirmed requires an explicit --bpm')
    origin, phase = 0., 'unverified'
    if bpm is not None:
        if finite(bpm, 'BPM') <= 0:
            raise ValueError('BPM must be positive')
        if beat_model != 'auto':
            raise ValueError('Choose --bpm or --beat-model, not both')
        result = dict(bpm=bpm, bpm_source='user', bpm_status='confirmed' if confirmed else 'estimated')
    elif Path(source).is_dir():
        root = Path(source).resolve()
        choices = []
        for item in read_manifest(root).get('beats', []):
            if not isinstance(item, dict) or item.get('error'):
                continue
            model = str(item.get('model', ''))
            if not re.fullmatch('[a-zA-Z0-9_-]+', model) or (beat_model != 'auto' and model != beat_model):
                continue
            data = dict(item)
            p = (root/'beats'/(model+'.json')).resolve()
            if p.is_relative_to(root) and p.is_file() and p.stat().st_size <= 32*1024*1024:
                value = json.loads(p.read_text(encoding='utf-8'))
                if isinstance(value, dict) and value.get('model', model) == model:
                    data.update(value)
            try:
                times = np.asarray(data['beats'], dtype=float) if isinstance(data.get('beats'), list) else np.empty(0)
            except (ValueError, TypeError):
                continue
            if times.ndim != 1 or not np.all(np.isfinite(times)) or np.any(np.diff(times) <= 0):
                continue
            tempo = data.get('tempo_bpm')
            if tempo is None and len(times) >= 2:
                tempo = float(60/np.median(np.diff(times)))
            if isinstance(tempo, bool) or not isinstance(tempo, (int, float)) or not math.isfinite(tempo) or tempo <= 0:
                continue
            choices.append((2 if model == 'consensus' else 1 if model == 'all_in_one' else 0,
                            len(times), model, tempo, times))
        if not choices:
            raise ValueError('No usable saved BPM estimate. Provide --bpm before exporting')
        _, _, model, tempo, times = max(choices, key=lambda v: v[:3])
        result = dict(bpm=tempo, bpm_source='saved:'+model, bpm_status='estimated')
        if len(times):
            origin, phase = float(times[0]), 'estimated'
    else:
        raise ValueError('A BPM estimate or confirmed value is required: supply --bpm')
    if beat_zero is not None:
        origin, phase = finite(beat_zero, 'beat-zero'), 'supplied'
    result.update(beat_zero_seconds=origin, phase_status=phase)
    return result


def source_catalogue(source):
    source = Path(source).expanduser().resolve()
    if source.is_file():
        return {'master': source}
    from .midi.runner import saved_sources
    master, stems = saved_sources(source)  # retains existing containment and copied-master SHA checks
    result = {'master': master}
    for stem in stems:
        key = f'{stem.model}/{stem.stem}'
        if key in result:
            raise ValueError('Duplicate saved source '+key)
        result[key] = stem.path
    return result
