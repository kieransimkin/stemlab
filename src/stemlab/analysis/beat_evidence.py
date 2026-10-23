"""Independent, auditable rhythm hypotheses from audio and DanceRudiments sources.

No detector is allowed to set a canonical beat timeline. Model-derived times,
physical motion accents, and nominal Recording clocks are different evidence.
Kieran Simkin — https://kieransimkin.co.uk/my-songs/
"""
from __future__ import annotations

from dataclasses import dataclass, field
import hashlib
import json
import math
from pathlib import Path
from typing import Any

import numpy as np
from scipy import signal as sp_signal

FORMAT = "stemlab.rhythm-evidence.v1"
FPS = 100
MAX_SECONDS = 900
MAX_VALUES = 8_388_608
MAX_BYTES = 64 * 1024 * 1024


def _finite(value: Any) -> float:
    if isinstance(value, bool) or not isinstance(value, (int, float)) or not math.isfinite(value):
        raise ValueError("Expected a finite numeric value")
    return float(value)


def _json_bytes(path: Path) -> tuple[dict, str]:
    if not path.is_file() or not 0 < path.stat().st_size <= MAX_BYTES:
        raise ValueError("Missing, empty or oversized rhythm input")
    data = path.read_bytes()
    def pairs(items):
        obj = {}
        for key, value in items:
            if key in obj:
                raise ValueError("Duplicate rhythm JSON key")
            obj[key] = value
        return obj
    def bad_constant(value):
        raise ValueError("Invalid JSON constant: " + value)
    document = json.loads(data, object_pairs_hook=pairs, parse_constant=bad_constant)
    if not isinstance(document, dict):
        raise ValueError("Rhythm JSON root must be an object")
    return document, hashlib.sha256(data).hexdigest()


@dataclass(frozen=True)
class RhythmInput:
    """One monotonic clock and independent physical/sonic feature streams."""
    name: str
    kind: str
    seconds: np.ndarray
    features: dict[str, np.ndarray]
    sha256: str
    clock_basis: str
    metadata: dict[str, Any] = field(default_factory=dict)

    def __post_init__(self):
        if not isinstance(self.name, str) or not self.name or len(self.name) > 128:
            raise ValueError("Input needs a short identifying name")
        t = np.asarray(self.seconds, dtype=np.float64)
        if (t.ndim != 1 or not 12 <= len(t) <= 300_000 or
                not np.isfinite(t).all() or not np.all(np.diff(t) > 0) or
                not 3 <= t[-1] - t[0] <= MAX_SECONDS or np.max(np.diff(t)) > .35):
            raise ValueError("Rhythm input requires 3..900 seconds of ordered continuous timestamps")
        if not isinstance(self.features, dict) or not 1 <= len(self.features) <= 64:
            raise ValueError("Require 1..64 named feature streams")
        for name, values in self.features.items():
            v = np.asarray(values, dtype=np.float64)
            if (not isinstance(name, str) or not name or v.shape != t.shape or
                    not np.isfinite(v).all()):
                raise ValueError("Feature must be named finite samples on the same clock")
        if (not isinstance(self.sha256, str) or len(self.sha256) != 64 or
                any(c not in '0123456789abcdef' for c in self.sha256)):
            raise ValueError("Source needs a lowercase SHA-256 fingerprint")
        object.__setattr__(self, "seconds", t)
        object.__setattr__(self, "features", {k: np.asarray(v, dtype=np.float64)
                                               for k, v in self.features.items()})


def _normalise(signal: np.ndarray) -> np.ndarray:
    v = np.asarray(signal, dtype=float)
    v = np.maximum(v - np.percentile(v, 15), 0)
    divisor = float(np.percentile(v, 95))
    if divisor <= 1e-9:
        return np.zeros_like(v)
    v = np.minimum(v / divisor, 4)
    return np.maximum(sp_signal.savgol_filter(v, 5, 2), 0) if len(v) >= 5 else v


def _audio_input(path: Path, name: str) -> RhythmInput:
    import soundfile as sf

    if not path.is_file() or path.stat().st_size > 300 * 1024 * 1024:
        raise ValueError("Audio source missing or exceeds 300 MiB input limit")
    info = sf.info(str(path))
    if not 8000 <= info.samplerate <= 192000 or not 1 <= info.channels <= 8:
        raise ValueError("Unsupported audio sample rate or channel count")
    if not 3 <= info.frames / info.samplerate <= MAX_SECONDS:
        raise ValueError("Audio duration must be between 3 and 900 seconds")
    # FLAC can expand far beyond its compressed file size; cap decoded inputs.
    if info.frames * info.channels > 64_000_000:
        raise ValueError("Decoded audio exceeds the 64-million-scalar safety limit")
    with sf.SoundFile(str(path)) as audio:
        x = audio.read(dtype="float32", always_2d=True).mean(axis=1)
    if not np.isfinite(x).all():
        raise ValueError("Audio contains non-finite samples")
    from math import gcd
    divider = gcd(info.samplerate, 11025)
    y = sp_signal.resample_poly(x, 11025 // divider, info.samplerate // divider)
    sample_rate, fft_size, hop = 11025, 1024, 128
    _, times, spec = sp_signal.stft(y, fs=sample_rate, nperseg=fft_size,
                                   noverlap=fft_size-hop, boundary="zeros", padded=True)
    freq = np.fft.rfftfreq(fft_size, 1 / sample_rate)
    power = np.abs(spec)
    # Frequency-separated positive spectral flux: bass, melodic attacks,
    # and cymbals are genuinely different acoustic feature streams.
    def flux(low, high):
        mask = (freq >= low) & (freq < high)
        envelope = np.log1p(power[mask] * 200)
        if not len(envelope):
            return np.zeros_like(times)
        return np.maximum(np.diff(envelope, axis=1, prepend=envelope[:, :1]), 0).mean(axis=0)
    features = {"bass_spectral_flux": flux(25, 180),
                "mid_spectral_flux": flux(180, 2000),
                "treble_spectral_flux": flux(2000, 5500)}
    rms = np.sqrt(np.mean(power**2, axis=0))
    features["broadband_rms_attack"] = np.maximum(np.diff(np.log1p(rms * 500), prepend=0), 0)
    digest = hashlib.sha256()
    with path.open('rb') as stream:
        for block in iter(lambda: stream.read(1024 * 1024), b''):
            digest.update(block)
    return RhythmInput(name, "audio", times, features, digest.hexdigest(), "audio_source_seconds",
                       {"sample_rate": info.samplerate, "frames": info.frames,
                        "channels": info.channels, "feature_hop_seconds": hop/sample_rate})


def _recording_input(path: Path, name: str) -> RhythmInput:
    # The published DanceRudiments data format is read-only. Its nominal BPM
    # supplies time coordinates; it is NOT independent tempo evidence.
    data, digest = _json_bytes(path)
    if (data.get("format") != "dancerudiments.recording" or data.get("schema_version") != 1 or
            data.get("pips_per_beat") != 64 or not isinstance(data.get("clock"), dict)):
        raise ValueError("Expected a DanceRudiments recording schema 1")
    clock = data["clock"]
    bpm = _finite(clock.get("bpm"))
    zero = _finite(clock.get("beat_zero_seconds"))
    start = clock.get("start_pip")
    if not 10 <= bpm <= 600 or type(start) is not int:
        raise ValueError("Invalid recording clock")
    samples = np.asarray(data.get("samples"), dtype=np.float64)
    dimensions = data.get("dimensions")
    if (not isinstance(dimensions, list) or not 1 <= len(dimensions) <= 2048 or
            not all(isinstance(s, str) and s for s in dimensions) or
            samples.ndim != 2 or samples.shape[1] != len(dimensions) or
            not 12 <= len(samples) <= 300_000 or samples.size > MAX_VALUES or
            not np.isfinite(samples).all() or np.max(np.abs(samples)) > 1+1e-10):
        raise ValueError("Invalid native 64-pip recording values/dimensions")
    t = zero + (start + np.arange(len(samples))) * 60.0/(64*bpm)
    speeds = np.abs(np.gradient(samples, axis=0))
    strengths = sorted(range(samples.shape[1]), key=lambda k: float(np.std(speeds[:, k])), reverse=True)
    features = {}
    for k in strengths[:12]:
        if np.ptp(samples[:, k]) > 1e-4:
            # Signed controls: both positive and negative strokes may be rhythmic.
            features[f"channel_{k+1}_motion"] = speeds[:, k]
            features[f"channel_{k+1}_turns"] = np.maximum(np.percentile(speeds[:, k], 75)-speeds[:, k], 0)
    if not features:
        features = {"silence": np.zeros(len(t))}
    return RhythmInput(name, "rudiment_recording", t, features, digest,
                       "nominal_recording_clock_not_independent_tempo",
                       {"recording_name": data.get("name"), "dimensions": dimensions,
                        "declared_bpm": bpm, "declared_bpm_status": clock.get("bpm_status"),
                        "source_start_pip": start})


def _capture_input(path: Path, name: str) -> RhythmInput:
    from stemlab.analysis.rig_motion import _read_capture, _signals

    data, times, poses, channels, digest = _read_capture(path)
    novelty, active, streams = _signals(times, poses, channels)
    if novelty is None:
        return RhythmInput(name, "rig_capture", times, {"static_motion": np.zeros(len(times))},
                           digest, "captured_source_seconds", {"profile_sha256": data["profile_sha256"]})
    midpoint = (times[1:] + times[:-1]) / 2
    combined = np.mean(np.asarray(streams), axis=0)
    # Classical kinetic beat cue: a motion often reverses or pauses at a beat.
    # Kinetic minima are intentionally kept separate from acceleration accents.
    features = {"kinetic_change": novelty,
                "kinetic_velocity_minima": np.maximum(np.percentile(combined, 85)-combined, 0)}
    selected = sorted(enumerate(streams), key=lambda x: float(np.std(x[1])), reverse=True)
    for i, stream in selected[:6]:
        features[f"control_{i+1}_speed"] = stream
        features[f"control_{i+1}_pause"] = np.maximum(np.percentile(stream, 85)-stream, 0)
    return RhythmInput(name, "rig_capture", midpoint, features, digest,
                       "captured_source_seconds", {"profile_sha256": data["profile_sha256"],
                                                   "type_uri": data["type_uri"],
                                                   "active_control_groups": len(active)})


def _package_input(path: Path, name: str) -> RhythmInput:
    # The existing package adapter checks every clip hash, named profile,
    # source identity, calibration offset, and contiguous source-time clock.
    from stemlab.analysis.rig_motion_package import analyze_rig_motion_package
    report = analyze_rig_motion_package(path)
    start, end = report["source_range_seconds"]
    t = np.arange(start, end, 1/FPS)
    curve = np.zeros(len(t), dtype=float)
    for event in report["motion_accents"]:
        ix = round((event["seconds"]-start)*FPS)
        if 0 <= ix < len(curve):
            curve[ix] += event["strength"]
    # This uses an earlier kinematic detector as the feature source. Do NOT
    # report these as independent skeletal observations or new measured beats.
    return RhythmInput(name, "motion_package", t, {"existing_rig_accents": curve},
                       report["source_manifest_sha256"], "source_seconds_after_calibration",
                       {"source_original_action_id": report["source_original_action_id"],
                        "source_clip_sha256": report["source_clip_sha256"],
                        "profile_sha256": report["profile_sha256"],
                        "derived_from": "stemlab.rig-motion-analysis"})


def read_source(path: Path | str, kind: str, name: str) -> RhythmInput:
    path = Path(path)
    routes = {"audio": _audio_input, "recording": _recording_input,
              "capture": _capture_input, "package": _package_input}
    if kind not in routes:
        raise ValueError("Unknown rhythm input kind; use audio, recording, capture, package")
    return routes[kind](path, name)


def _regular_series(source: RhythmInput, key: str) -> np.ndarray:
    start, end = float(source.seconds[0]), float(source.seconds[-1])
    t = np.arange(start, end + 1e-10, 1/FPS)
    y = np.interp(t, source.seconds, source.features[key])
    y = _normalise(y)
    # Tiny amounts of filter smoothing suppress isolated one-frame noise.
    return t, y


def _autocorrelation(y: np.ndarray, min_bpm: float, max_bpm: float):
    y = y - y.mean()
    ac = sp_signal.correlate(y, y, mode="full", method="fft")[len(y)-1:]
    overlap = np.arange(len(y), 0, -1)
    ac = ac / np.maximum(overlap, 1)
    if ac[0] <= 1e-10:
        return np.array([], dtype=int), np.array([]), np.array([])
    ac /= ac[0]
    low = max(2, math.ceil(FPS*60/max_bpm))
    high = min(len(ac)//3, math.floor(FPS*60/min_bpm))
    return np.arange(low, high+1), ac[low:high+1], ac


def _interval_evidence(y: np.ndarray, min_bpm: float, max_bpm: float):
    min_spacing = max(3, math.floor(FPS*.115))
    peaks, props = sp_signal.find_peaks(y, distance=min_spacing,
                                       prominence=max(.12, float(np.std(y)*.35)),
                                       height=max(.16, float(np.percentile(y, 55))))
    if len(peaks) < 5:
        return None
    buckets = np.arange(min_bpm, max_bpm+.01, .5)
    vote = np.zeros(len(buckets))
    # Long intervals with one or two omitted observations get their own
    # explicitly weighted subdivision hypotheses, not new detected events.
    for step in (1, 2, 3):
        d = (peaks[step:]-peaks[:-step])/FPS
        for missing_intervals in range(1, 5):
            candidate = 60*missing_intervals/d
            for tempo in candidate[(candidate>=min_bpm)&(candidate<=max_bpm)]:
                idx = round((tempo-min_bpm)/.5)
                vote[max(0,min(len(vote)-1,idx))] += 1/(step*missing_intervals)
    vote = sp_signal.savgol_filter(vote, 7, 2) if len(vote) >= 7 else vote
    best = int(np.argmax(vote))
    if vote[best] <= 1:
        return None
    return float(buckets[best]), float(vote[best]/max(len(peaks),1)), peaks


def _phase_grid(t: np.ndarray, y: np.ndarray, period: float):
    n = max(8, round(period*FPS))
    choices = np.linspace(0, period, n, endpoint=False)
    scores = []
    for offset in choices:
        first = float(t[0]+offset)
        times = np.arange(first, t[-1]+1e-8, period)
        if len(times) < 4:
            continue
        strength = float(np.mean(np.interp(times, t, y)))
        anti = float(np.mean(np.interp(times+period/2, t, y, right=0)))
        scores.append((strength - .35*anti, strength, first))
    if not scores:
        return None
    _, salience, first = max(scores)
    times = np.arange(first, t[-1]+1e-8, period)
    if len(times) > 5000:
        return None
    return float(first), [round(float(x), 6) for x in times], float(salience)


def _meter_candidates(y: np.ndarray, t: np.ndarray, grid: list[float]) -> list[dict]:
    """Accent-cycle length only; never claim a time signature or true downbeat."""
    if len(grid) < 12:
        return []
    strength = np.interp(np.asarray(grid), t, y)
    result = []
    for beats_per_cycle in (3, 4, 5, 6, 7):
        if len(strength) // beats_per_cycle < 4:
            continue
        means = [float(np.mean(strength[k::beats_per_cycle])) for k in range(beats_per_cycle)]
        leading = int(np.argmax(means))
        others = [v for k,v in enumerate(means) if k != leading]
        contrast = (means[leading] - float(np.mean(others)))/max(1e-8, float(np.mean(means)))
        if contrast >= .18:
            result.append({"beats_per_accent_cycle": beats_per_cycle,
                           "strongest_relative_beat": leading,
                           "contrast": round(float(contrast), 4),
                           "cycles_observed": len(strength)//beats_per_cycle,
                           "status": "hypothesis_not_meter_or_downbeat"})
    return sorted(result, key=lambda v: (-v["contrast"], -v["cycles_observed"]))[:3]


def _candidate(t: np.ndarray, y: np.ndarray, *, method: str, bpm: float,
               strength: float, parent: str):
    if not math.isfinite(bpm) or not 30 <= bpm <= 300:
        return None
    period = 60/bpm
    phase = _phase_grid(t, y, period)
    if phase is None:
        return None
    first, grid, salience = phase
    if len(grid) < 5:
        return None
    # These points are a predicted constant-tempo grid, not detections.
    return {"detector": method, "feature": parent, "family": "classical_signal_analysis",
            "bpm": round(float(bpm), 4), "first_grid_time_seconds": round(first, 6),
            "grid_seconds": grid, "beat_count_grid": len(grid),
            "score_uncalibrated": round(float(max(0,min(strength,1))), 5),
            "phase_salience_uncalibrated": round(salience, 5),
            "meter_candidates": _meter_candidates(y,t,grid),
            "metrical_alternatives": [round(v,4) for v in (bpm/2, bpm*2) if 30 <= v <= 300],
            "downbeats": [], "beats_are_observed": False,
            "tempo_status": "estimated", "phase_status": "estimated"}


def _classical_hypotheses(t: np.ndarray, y: np.ndarray, key: str,
                          min_bpm: float, max_bpm: float, include_plp: bool):
    if (float(np.ptp(y)) < .08 or len(y) < FPS*3 or np.percentile(y,95) < .12):
        return []
    lags, auto, full_ac = _autocorrelation(y, min_bpm, max_bpm)
    if not len(lags):
        return []
    choices = []
    def add(method, bpm, confidence):
        h = _candidate(t, y, method=method, bpm=bpm, strength=confidence, parent=key)
        if h:
            choices.append(h)
    i = int(np.argmax(auto))
    if auto[i] >= .1:
        add("unbiased_autocorrelation", 60*FPS/int(lags[i]), float(auto[i]))
    # Comb filter sums evidence at 1, 2 and 3 periods; it can prefer a
    # different metrical level from the first autocorrelation peak.
    comb = auto.copy()
    for harmonic, weight in ((2, .55), (3, .25)):
        indices = lags * harmonic
        valid = indices <= len(y) // 2
        comb[valid] += weight * full_ac[indices[valid]]
    j = int(np.argmax(comb))
    if comb[j] >= .15:
        add("multi_tap_comb", 60*FPS/int(lags[j]), float(comb[j]/1.8))
    intervals = _interval_evidence(y, min_bpm, max_bpm)
    if intervals is not None:
        tempo, support, peaks = intervals
        if support >= .2:
            add("inter_onset_intervals", tempo, support)
    if include_plp:
        import librosa
        try:
            pulse = librosa.beat.plp(onset_envelope=np.maximum(y,0), sr=FPS, hop_length=1,
                                    win_length=min(768, max(128,len(y)//4)),
                                    tempo_min=min_bpm, tempo_max=max_bpm)
            idx, _ = sp_signal.find_peaks(pulse, distance=max(4,math.floor(FPS*60/max_bpm*.7)),
                                         prominence=.14)
            if len(idx) > 5:
                intervals = np.diff(idx)/FPS
                target = float(60/np.median(intervals))
                if min_bpm <= target <= max_bpm:
                    add("predominant_local_pulse", target, float(np.mean(pulse[idx])))
        except (ValueError, FloatingPointError):
            pass  # model-free PLP could not extract reliable local pulses
    return choices


def _dp_beat_events(t: np.ndarray, y: np.ndarray, bpm: float):
    """Ellis-style continuity reward over *observed onset* candidates.

    Unlike a fixed inferred grid, this does not insert peaks into quiet gaps.
    Missing intervals are represented by ordinal increments >1.
    """
    peaks, _ = sp_signal.find_peaks(y, prominence=max(.15, float(np.std(y)*.45)),
                                    distance=round(FPS*.13),
                                    height=max(.2,float(np.percentile(y,65))))
    if len(peaks) < 5:
        return [], [], 0.
    if len(peaks) > 6000:
        peaks=peaks[np.argsort(y[peaks])[-6000:]]
        peaks.sort()
    period = 60/bpm
    points=t[peaks]
    reward=np.clip(y[peaks],0,3)
    scores=reward.copy()
    length=np.ones(len(peaks),dtype=int)
    parents=np.full(len(peaks),-1,dtype=int)
    hops=np.ones(len(peaks),dtype=int)
    for i in range(1,len(peaks)):
        j0=int(np.searchsorted(points,points[i]-period*3.35))
        for j in range(j0,i):
            ratio=(points[i]-points[j])/period
            multiple=int(round(ratio))
            if multiple<1 or multiple>3 or abs(ratio-multiple)>.23:
                continue
            candidate=scores[j]+reward[i]-1.5*abs(ratio-multiple)-.14*(multiple-1)
            if candidate>scores[i]:
                scores[i]=candidate; parents[i]=j; length[i]=length[j]+1; hops[i]=multiple
    valid=np.where(length>=5)[0]
    if not len(valid):
        return [], [], 0.
    end=int(max(valid,key=lambda k: (scores[k]/max(1,length[k]),length[k])))
    indices=[]
    while end>=0:
        indices.append(end)
        end=int(parents[end])
    indices.reverse()
    observed=[round(float(points[k]),6) for k in indices]
    ordinal=[0]
    for idx in indices[1:]:
        ordinal.append(ordinal[-1]+int(hops[idx]))
    # Score is coverage of periodic observed onsets within the predicted path.
    support=min(1.,len(indices)/max(1,ordinal[-1]+1))
    return observed, ordinal, round(float(support),4)


def _local_tempos(t: np.ndarray, y: np.ndarray, min_bpm: float, max_bpm: float):
    """Window-local ACF observations for drift checks, not a replacement BPM map."""
    if t[-1]-t[0]<12:
        return []
    windows=[]
    begin=float(t[0]); final=float(t[-1]); width=8.
    while begin+width<=final and len(windows)<230:
        segment=y[(t>=begin)&(t<begin+width)]
        if len(segment)>=FPS*7:
            lags, ac, _=_autocorrelation(segment,min_bpm,max_bpm)
            if len(lags) and float(np.max(ac))>=.16:
                j=int(np.argmax(ac))
                windows.append({"from_seconds":round(begin,3),
                                "to_seconds":round(begin+width,3),
                                "bpm":round(float(60*FPS/lags[j]),3),
                                "periodicity_uncalibrated":round(float(ac[j]),4),
                                "status":"local_tempo_hypothesis"})
        begin+=4.
    return windows


def analyze_input(source: RhythmInput, *, min_bpm: float = 60, max_bpm: float = 200,
                  include_plp: bool = True) -> dict:
    if not (30 <= min_bpm < max_bpm <= 300):
        raise ValueError("BPM range must be 30..300 and strictly increasing")
    hypotheses = []
    tempo_windows = {}
    # Bounded CPU analysis: rank by signal dynamics but preserve the full
    # source and name every omitted stream in the evidence. Do not silently
    # reduce the recording's actual dimensions or modify its native samples.
    ranked = sorted(source.features, key=lambda k:
                    (-float(np.std(np.diff(source.features[k]))), k))
    selected = ranked[:12]
    skipped = ranked[12:]
    # Return physically distinct streams with a source/feature parent tag.
    # Multiple decoders of the same trace MUST NOT count as independent votes.
    for feature in selected:
        t, y = _regular_series(source,feature)
        group=_classical_hypotheses(t,y,feature,min_bpm,max_bpm,include_plp)
        ac=next((h for h in group if h["detector"]=="unbiased_autocorrelation"),None)
        if ac is not None:
            events, ordinals, support=_dp_beat_events(t,y,ac["bpm"])
            if len(events)>=5:
                h=_candidate(t,y,method="dynamic_programming_onsets",bpm=ac["bpm"],
                             strength=support,parent=feature)
                if h is not None:
                    h["onset_aligned_beat_candidates_seconds"]=events
                    h["observed_onset_ordinal_positions"]=ordinals
                    h["beat_count_observed_candidates"]=len(events)
                    h["skipped_ordinal_positions"]=(ordinals[-1]+1)-len(events)
                    h["description"]="selected actual onset peaks; missing beats not inserted"
                    group.append(h)
        tempo_windows[feature]=_local_tempos(t,y,min_bpm,max_bpm)
        hypotheses.extend(group)
    # Detector disagreements are kept; the top score is only a review starting
    # point, and scores are not calibrated or comparable across methods.
    return {"format": FORMAT, "schema_version": 1,
            "input": {"name": source.name, "kind": source.kind, "sha256": source.sha256,
                      "clock_basis": source.clock_basis, "metadata": source.metadata,
                      "source_seconds_range": [float(source.seconds[0]), float(source.seconds[-1])]},
            "methods_run": sorted(set(h["detector"] for h in hypotheses)),
            "analysed_features": selected,
            "skipped_features_due_to_cpu_limit": skipped,
            "selection_rule": "top_12_by_first_difference_standard_deviation",
            "hypotheses": hypotheses,
            "local_tempo_windows": tempo_windows,
            "observed_events": [],
            "notes": ["All returned beat grids are estimated predictions, not independent observed beats.",
                      "No time signature, downbeat, or beat 1 is inferred from a simple accent cycle.",
                      "Features from one source or model family are correlated; do not majority-vote them."]}


def _harmonic_ratio(a: float, b: float) -> tuple[float, float]:
    choices = (0.25, 0.5, 1.0, 2.0, 4.0)
    ratio = b/a
    closest = min(choices, key=lambda k: abs(math.log(ratio/k)))
    return closest, 100*(ratio/closest-1)


def compare_reports(reports: list[dict], *, source_offsets: dict[str,float] | None = None) -> dict:
    """Retain detector evidence, and gate cross-modal alignment by explicit offsets.

    offsets are seconds added to local clock, anchored to the caller's chosen
    shared reference. No implied zero means synchronized inputs.
    """
    source_offsets = source_offsets or {}
    names = [r["input"]["name"] for r in reports]
    if len(set(names)) != len(names):
        raise ValueError("Comparison source names must be unique")
    if set(source_offsets)-set(names):
        raise ValueError("Unknown source offset")
    for name, offset in source_offsets.items():
        _finite(offset)
    pairs = []
    for i in range(len(reports)):
        for j in range(i+1,len(reports)):
            a,b=reports[i],reports[j]
            left,right=a["input"]["name"],b["input"]["name"]
            # Choose at most one best *per method family per source* for compact
            # diagnostics. This is a comparison, not a voting consensus.
            def top(report):
                groups={}
                for h in report["hypotheses"]:
                    key=h["detector"]
                    if key not in groups or h["score_uncalibrated"] > groups[key]["score_uncalibrated"]:
                        groups[key]=h
                return list(groups.values())
            for x in top(a):
                for y in top(b):
                    ratio,error=_harmonic_ratio(x["bpm"],y["bpm"])
                    if abs(error)>6:
                        continue
                    both_aligned = left in source_offsets and right in source_offsets
                    relation = {"sources": [left,right], "detectors": [x["detector"],y["detector"]],
                                "bpm": [x["bpm"],y["bpm"]], "ratio": ratio,
                                "harmonic_error_percent": round(error,3),
                                "shared_clock_alignment": "supplied" if both_aligned else "unverified",
                                "phase_agreement": None}
                    if both_aligned:
                        ga=np.asarray(x["grid_seconds"])+source_offsets[left]
                        gb=np.asarray(y["grid_seconds"])+source_offsets[right]
                        if len(ga) and len(gb):
                            closest=np.searchsorted(gb,ga)
                            nearest=np.minimum(np.abs(ga-gb[np.clip(closest,0,len(gb)-1)]),
                                               np.abs(ga-gb[np.clip(closest-1,0,len(gb)-1)]))
                            intersect=(ga>=gb[0])&(ga<=gb[-1])
                            if np.sum(intersect)>=4:
                                relation["phase_agreement"]={
                                    "fraction_within_70ms": round(float(np.mean(nearest[intersect]<=.07)),4),
                                    "median_nearest_grid_error_seconds": round(float(np.median(nearest[intersect])),5),
                                    "status":"estimated_grids_only_not_ground_truth"}
                    pairs.append(relation)
    return {"format":"stemlab.rhythm-comparison.v1", "schema_version":1,
            "source_reports":reports,"offsets_confirmed_by_user":source_offsets,
            "cross_source_comparisons":pairs,
            "result_status":"review_required_not_canonical_consensus"}


def read_saved_beat_result(path: Path | str, name: str) -> dict:
    """Import previously executed BeatThis/BeatNet/Transformer/etc. runs as votes.

    No checkpoint is downloaded and no source audio is silently attributed.
    A result's own beat timestamps are *model inferences*, not measured truth.
    """
    data, digest = _json_bytes(Path(path))
    detector = data.get("model")
    if not isinstance(detector, str) or not detector or detector == "consensus":
        raise ValueError("Expected a non-consensus StemLab BeatResult JSON")
    raw = data.get("beats")
    downs = data.get("downbeats")
    if not isinstance(raw, list) or not isinstance(downs, list) or len(raw) > 25_000 or len(downs) > 25_000:
        raise ValueError("Invalid model beat/downbeat lists")
    beats = np.asarray([_finite(x) for x in raw],dtype=float)
    downbeats = np.asarray([_finite(x) for x in downs],dtype=float)
    if ((len(beats) and (np.min(beats) < 0 or np.max(beats) > MAX_SECONDS or np.any(np.diff(beats) <= 0)))
            or (len(downbeats) and (np.min(downbeats) < 0 or np.max(downbeats) > MAX_SECONDS or np.any(np.diff(downbeats) <= 0)))):
        raise ValueError("Model timestamps must be finite, nonnegative, strictly ordered, within 900 seconds")
    if len(downbeats) and not len(beats):
        raise ValueError("Downbeat evidence without beat timestamps")
    if len(downbeats) and np.max([np.min(np.abs(beats-d)) for d in downbeats]) > .12:
        raise ValueError("Model downbeats do not coincide with its own beats")
    saved_bpm = data.get("tempo_bpm")
    if saved_bpm is not None:
        saved_bpm = _finite(saved_bpm)
        if not 0 < saved_bpm <= 500:
            raise ValueError("Invalid saved tempo")
    ibis = np.diff(beats)
    tempo = float(60/np.median(ibis)) if len(ibis) and np.median(ibis) > 0 else None
    if saved_bpm is not None and tempo is not None and abs(math.log(saved_bpm/tempo)) > .2:
        # Retain both estimates; a half/double or skipped-onset interpretation
        # must be surfaced, not silently relabelled as an agreement.
        metrical_disagreement = True
    else:
        metrical_disagreement = False
    bpm = saved_bpm or tempo
    meta = data.get("metadata")
    if not isinstance(meta, dict):
        raise ValueError("Saved BeatResult metadata must be an object")
    source = meta.get("source", {})
    if not isinstance(source, dict):
        source = {}
    confidence = None  # model scores are not calibrated probabilities
    hypothesis = []
    if bpm is not None and len(beats) >= 2:
        hypothesis = [{"detector": detector,"family": "pretrained_audio_model",
            "feature": "saved_model_inference", "bpm": round(bpm,4),
            "first_grid_time_seconds": round(float(beats[0]),6),
            "grid_seconds": [round(float(t),6) for t in beats],
            "beat_count_grid": len(beats), "score_uncalibrated": confidence,
            "phase_salience_uncalibrated": None, "meter_candidates": [],
            "metrical_alternatives": [round(q,4) for q in (bpm/2,bpm*2) if 30 <= q <= 300],
            "downbeats": [round(float(t),6) for t in downbeats],
            "beats_are_observed": False, "beats_are_model_estimates": True,
            "tempo_status": "estimated", "phase_status":"estimated",
            "model_tempo_differs_from_intervals":metrical_disagreement,
            "model_interval_bpm":round(tempo,4) if tempo else None}]
    return {"format":FORMAT,"schema_version":1,"input":{
            "name":name,"kind":"saved_model_result","sha256":digest,
            "clock_basis":"original_audio_source_seconds_claimed_by_model",
            "metadata":{"model":detector,"detector_family":meta.get("detector",detector),
                        "source_sha256":source.get("sha256"),
                        "source_binding_status":"provided_by_detector" if source.get("sha256") else "unverified"},
            "source_seconds_range":[float(beats[0]),float(beats[-1])] if len(beats) else None},
            "methods_run":[detector],"hypotheses":hypothesis,"observed_events":[],
            "notes":["Imported model timestamps are predictions, not observed ground truth.",
                     "No neural model was executed or downloaded by this importer."]}
