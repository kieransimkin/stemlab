"""Find audio-peak / DanceRudiments motion candidates without cloning the motion engine.

DanceRudiments owns all patterns, metadata and exact-pip movement sampling. This
module only extracts audio evidence and ranks *hypotheses* for motion alignment.
No model downloads, separation, or changes to the source audio are performed.
"""
from __future__ import annotations

import html
import json
import math
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

import numpy as np
import soundfile as sf
from scipy.ndimage import gaussian_filter1d
from scipy.signal import find_peaks

from stemlab.types import BeatResult, StemArtifact
from stemlab.util import write_json
from .rhythm import _select_grid

COLLECTIONS = ("initial", "expansion", "atlas", "continuum", "club", "dancefloor")
SIGNALS = ("position_excursion", "movement_speed", "turn_acceleration")


@dataclass(frozen=True)
class RudimentConfig:
    top_per_stem: int = 20
    max_patterns: int = 0  # zero = entire available DanceRudiments catalogue
    collection: str | None = None
    subdivisions: int = 16
    window_beats: int = 16
    hop_beats: int = 4
    min_similarity: float = 0.68
    min_window_peaks: int = 5
    max_period_beats: int = 16

    def __post_init__(self) -> None:
        if self.top_per_stem < 1 or not 0 <= self.max_patterns <= 20000:
            raise ValueError("top_per_stem must be positive; max_patterns 0..20000")
        if self.collection is not None and self.collection not in COLLECTIONS:
            raise ValueError("Unknown DanceRudiments collection: " + str(self.collection))
        if self.subdivisions not in (8, 16, 32):
            raise ValueError("subdivisions must be 8, 16 or 32")
        if not 0 <= self.min_similarity <= 1 or not math.isfinite(self.min_similarity):
            raise ValueError("min_similarity must be in [0, 1]")
        if self.window_beats < 4 or self.hop_beats < 1 or self.max_period_beats < 1:
            raise ValueError("window/hop/period beat counts must be positive")


def load_catalogue(config: RudimentConfig, *, runtime: Any = None) -> tuple[Any, list[dict]]:
    """Load optional official DanceRudiments extension; never reproduce its catalogue."""
    if runtime is None:
        try:
            import dancerudiments as runtime
        except ImportError as exc:
            raise RuntimeError('DanceRudiments is optional: install pip install "danceflow-stemlab[rudiments]"') from exc
    if int(runtime.PIPS_PER_BEAT) != 64:
        raise RuntimeError("Unsupported DanceRudiments pip resolution (expected 64)")
    items = list(runtime.catalogue())
    if config.collection:
        try:
            from dancerudiments_authoring import collections
        except ImportError as exc:
            raise RuntimeError("DanceRudiments package must include its authoring collections") from exc
        selected = {p.name for p in getattr(collections, config.collection + "_pack")().patterns}
        items = [item for item in items if item["name"] in selected]
    items = sorted(items, key=lambda p: p["name"])
    if config.max_patterns:
        items = items[:config.max_patterns]
    return runtime, items


def _read_envelope(source: Path, *, hop_seconds: float = 0.012) -> tuple[np.ndarray, np.ndarray]:
    """Streaming per-hop RMS: bounded memory, real samples, no resampling."""
    with sf.SoundFile(str(source)) as reader:
        if reader.frames <= 0 or reader.samplerate <= 0:
            raise ValueError("Empty audio: " + str(source))
        hop = max(64, int(round(reader.samplerate * hop_seconds)))
        leftover = np.empty((0, reader.channels), dtype=np.float32)
        energies: list[np.ndarray] = []
        while True:
            chunk = reader.read(131072, dtype="float32", always_2d=True)
            if not len(chunk):
                break
            if len(leftover):
                chunk = np.concatenate((leftover, chunk))
            complete = (len(chunk) // hop) * hop
            if complete:
                frames = chunk[:complete].reshape(-1, hop, reader.channels)
                mono_power = np.mean(frames.astype(np.float64) ** 2, axis=(1, 2))
                energies.append(np.sqrt(mono_power).astype(np.float32))
            leftover = chunk[complete:]
        if len(leftover):
            energies.append(np.array([float(np.sqrt(np.mean(leftover.astype(np.float64) ** 2)))], dtype=np.float32))
        envelope = np.concatenate(energies) if energies else np.empty(0)
        # Hop starts approximate peak centres within ~6 ms.
        times = (np.arange(len(envelope), dtype=np.float64) + .5) * hop / reader.samplerate
    return times, envelope


def extract_peak_events(source: Path) -> dict[str, Any]:
    """Get transient *energy-rise* peaks, not every individual audio sample maximum."""
    times, raw = _read_envelope(Path(source))
    if not len(raw):
        return {"times": np.empty(0), "strengths": np.empty(0), "rms_bins": 0}
    curve = gaussian_filter1d(raw.astype(np.float64), 1.0)
    # Energy-rises distinguish attacks from sustained high-energy bass notes.
    delta = np.maximum(0.0, curve - np.r_[curve[:3], curve[:-3]])
    positive = delta[delta > 0]
    if not len(positive) or np.max(positive) <= 1e-10:
        return {"times": np.empty(0), "strengths": np.empty(0), "rms_bins": len(raw)}
    threshold = max(float(np.percentile(positive, 62)) * .60,
                    float(np.percentile(positive, 98)) * .055, 1e-9)
    minimum_hops = max(1, int(round(.055 / (times[1] - times[0])))) if len(times) > 1 else 1
    indices, props = find_peaks(delta, prominence=threshold, height=threshold,
                                distance=minimum_hops)
    if not len(indices):
        return {"times": np.empty(0), "strengths": np.empty(0), "rms_bins": len(raw)}
    strengths = np.sqrt(np.maximum(props["prominences"], 0))
    typical = max(float(np.percentile(strengths, 88)), 1e-12)
    return {"times": times[indices], "strengths": np.clip(strengths / typical, 0, 1.25),
            "rms_bins": len(raw)}


def _beat_grid(beat_results: Iterable[BeatResult], duration: float,
               *, bpm: float | None = None, start_seconds: float = 0.0) -> tuple[np.ndarray, str]:
    if bpm is not None:
        if not math.isfinite(bpm) or not 25 <= bpm <= 300:
            raise ValueError("Explicit BPM must be between 25 and 300")
        if not math.isfinite(start_seconds) or start_seconds < 0 or start_seconds >= duration:
            raise ValueError("Invalid explicit first-beat offset")
        values = np.arange(start_seconds, duration + 1e-6, 60.0 / bpm)
        source = "explicit_bpm_unverified_phase"
    else:
        selected = _select_grid(beat_results)
        if selected is None or len(selected.beats) < 17:
            raise ValueError("At least 17 detected beats required, or supply --bpm with a known tempo")
        values = np.asarray(selected.beats, dtype=np.float64)
        source = selected.model
    if len(values) < 17 or not np.all(np.isfinite(values)) or np.any(np.diff(values) <= 0):
        raise ValueError("Beat grid must contain 17+ increasing finite times")
    if np.any((np.diff(values) < .16) | (np.diff(values) > 2.5)):
        raise ValueError("Beat grid has discontinuities; use a continuous detector or explicit BPM")
    return values, source


def _peak_bins(events: dict, beats: np.ndarray, ppb: int) -> np.ndarray:
    size = (len(beats) - 1) * ppb
    values = np.zeros(size, dtype=np.float32)
    times = events["times"]
    if not len(times):
        return values
    mask = (times >= beats[0]) & (times < beats[-1])
    if not np.any(mask):
        return values
    positions = np.interp(times[mask], beats, np.arange(len(beats))) * ppb
    strengths = events["strengths"][mask]
    # Neighbour tolerance: a rapid transient may fall between 16th-note bins.
    for delta in range(-2, 3):
        indices = np.rint(positions).astype(int) + delta
        valid = (indices >= 0) & (indices < size)
        weight = math.exp(-.5 * (delta / 1.1) ** 2)
        np.maximum.at(values, indices[valid], strengths[valid] * weight)
    return np.clip(values, 0, 1).astype(np.float32)


def _motion_signatures(runtime: Any, item: dict, config: RudimentConfig) -> dict[str, np.ndarray]:
    pips = int(item["period_pips"])
    if pips < 4 or pips > config.max_period_beats * 64:
        return {}
    # Only the official C++ sampler determines the pattern. All pip indices are
    # integers; their period/shape is never reimplemented here.
    samples = np.asarray([runtime.sample(item["name"], int(pip)).as_tuple()
                          for pip in range(0, pips, 64 // config.subdivisions)], dtype=float)
    if not np.all(np.isfinite(samples)):
        return {}
    centre = samples.mean(axis=0)
    excursion = np.linalg.norm(samples - centre, axis=1)
    velocity = np.linalg.norm(samples - np.roll(samples, 1, axis=0), axis=1)
    acceleration = np.linalg.norm(np.roll(samples, -1, axis=0) - 2*samples +
                                  np.roll(samples, 1, axis=0), axis=1)
    output = {}
    for title, raw in zip(SIGNALS, (excursion, velocity, acceleration)):
        if np.ptp(raw) < 1e-8:
            continue
        smoothed = gaussian_filter1d(raw, .7, mode="wrap")
        low, high = np.percentile(smoothed, [10, 95])
        if high - low < 1e-8:
            continue
        output[title] = np.clip((smoothed - low) / (high - low), 0, 1).astype(np.float32)
    return output


def _audio_windows(signal: np.ndarray, config: RudimentConfig) -> tuple[np.ndarray, np.ndarray, np.ndarray]:
    width = config.window_beats * config.subdivisions
    hop = config.hop_beats * config.subdivisions
    if len(signal) < width:
        return np.empty((0, width), dtype=np.float32), np.empty(0, dtype=int), np.empty(0, dtype=int)
    starts = np.arange(0, len(signal) - width + 1, hop)
    windows = np.stack([signal[start:start+width] for start in starts]).astype(np.float32)
    counts = (windows >= .18).sum(axis=1)
    active = np.flatnonzero(counts >= config.min_window_peaks)
    return windows[active], starts[active], counts[active]


def _rank_one(source: dict, bank: list[tuple[dict, dict[str, np.ndarray]]],
              beats: np.ndarray, config: RudimentConfig) -> list[dict]:
    windows, starts, counts = _audio_windows(source["curve"], config)
    if not len(windows):
        return []
    centred = windows - windows.mean(axis=1, keepdims=True)
    norms = np.linalg.norm(centred, axis=1, keepdims=True)
    centred /= np.maximum(norms, 1e-8)
    matches = []
    size = config.window_beats * config.subdivisions
    for item, signals in bank:
        best = None
        for label, template in signals.items():
            if len(template) > size:  # avoid silently truncating long-period motions
                continue
            # Search shifts no finer than a quarter of a beat to control
            # phase fitting. Search at most four beats of the motif's phase.
            phase_step = max(1, config.subdivisions // 4)
            phases = np.arange(0, min(len(template), config.subdivisions * 4), phase_step)
            if len(phases) == 0:
                continue
            templates = np.stack([np.resize(np.roll(template, -int(p)), size) for p in phases])
            templates -= templates.mean(axis=1, keepdims=True)
            template_norms = np.linalg.norm(templates, axis=1, keepdims=True)
            valid = template_norms[:, 0] > 1e-8
            if not np.any(valid):
                continue
            templates = templates[valid] / template_norms[valid]
            p_valid = phases[valid]
            # Matrix multiplication evaluates every active song window with
            # every coarse phase without a Python loop per audio hit.
            scores = centred @ templates.T
            i, j = np.unravel_index(int(np.argmax(scores)), scores.shape)
            corr = float(np.clip(scores[i, j], -1, 1))
            sim = float((1 + corr) / 2)  # similarity only, NOT likelihood
            if sim < config.min_similarity:
                continue
            if best is None or sim > best["similarity"]:
                start_bin = int(starts[i])
                start_beat = start_bin // config.subdivisions
                end_beat = start_beat + config.window_beats
                best = {
                    "pattern": str(item["name"]),
                    "description": str(item.get("description", "")),
                    "period_beats": float(item["period_pips"] / 64),
                    "signal": label,
                    "similarity": round(sim, 5),
                    "correlation": round(corr, 5),
                    "phase_beats": float(p_valid[j] / config.subdivisions),
                    "start_beat": start_beat,
                    "end_beat": end_beat,
                    "start_seconds": round(float(beats[start_beat]), 4),
                    "end_seconds": round(float(beats[end_beat]), 4),
                    "audio_peak_bins": int(counts[i]),
                }
        if best is not None:
            matches.append(best)
    matches.sort(key=lambda r: (-r["similarity"], r["pattern"], r["start_beat"]))
    return matches[:config.top_per_stem]


def _save_chart(path: Path, sources: list[dict], bank: list, beats: np.ndarray,
                config: RudimentConfig) -> None:
    """Measured, reproducible peak lanes and genuine C++ motion-sample overlays."""
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt

    chosen = [s for s in sources if s["matches"]][:min(4, len(sources))]
    if not chosen:
        return
    fig, axs = plt.subplots(len(chosen), 1, figsize=(15, 2.65 * len(chosen)), squeeze=False)
    for ax, src in zip(axs[:, 0], chosen):
        m = src["matches"][0]
        start = m["start_beat"] * config.subdivisions
        width = config.window_beats * config.subdivisions
        audio = src["curve"][start:start + width]
        template = next(s[m["signal"]] for p, s in bank if p["name"] == m["pattern"])
        shift = round(m["phase_beats"] * config.subdivisions)
        motion = np.resize(np.roll(template, -shift), width)
        x = np.linspace(m["start_seconds"], m["end_seconds"], width, endpoint=False)
        ax.fill_between(x, audio, color="#30bdb1", alpha=.55, label="Audio attack-peak salience")
        ax.plot(x, motion, color="#f48d48", lw=1.5, label="DanceRudiments motion salience")
        ax.set_title(f"{src['model']}/{src['stem']} · {m['pattern']} · similarity {m['similarity']:.3f} · {m['signal']}", loc="left")
        ax.set_ylabel("Relative peak strength")
        ax.set_ylim(0, 1.25)
        ax.legend(loc="upper right", fontsize=8)
    axs[-1, 0].set_xlabel("Song time (seconds) · 16-beat windows; candidate similarity, not confidence")
    fig.tight_layout()
    path.parent.mkdir(parents=True, exist_ok=True)
    fig.savefig(path, dpi=125)
    plt.close(fig)


def _save_html(path: Path, report: dict) -> None:
    """Static local report; no network dependencies and safe HTML escaping."""
    source_cards = []
    for src in report["sources"]:
        rows = "".join(
            "<tr><td>{}</td><td>{:.3f}</td><td>{:.1f}–{:.1f}s</td><td>{}</td></tr>".format(
                html.escape(m["pattern"]), m["similarity"], m["start_seconds"],
                m["end_seconds"], html.escape(m["signal"].replace("_", " ")))
            for m in src["matches"][:12]
        )
        source_cards.append(
            f"<section><h2>{html.escape(src['model'])} / {html.escape(src['stem'])}</h2>"
            f"<p>{src['peak_count']} detected attacks · {len(src['matches'])} displayed candidate patterns</p>"
            f"<table><thead><tr><th>Pattern</th><th>Similarity</th><th>Window</th><th>Motion metric</th></tr></thead>"
            f"<tbody>{rows}</tbody></table></section>"
        )
    if report.get("cross_stem_candidates"):
        consensus_rows = "".join(
            "<tr><td>{}</td><td>{:.3f}</td><td>{:.1f}–{:.1f}s</td><td>{}</td></tr>".format(
                html.escape(m["pattern"]), m["similarity"], m["start_seconds"],
                m["end_seconds"], html.escape(m["signal"].replace("_", " ")))
            for m in report["cross_stem_candidates"][:12]
        )
        source_cards.insert(0, "<section><h2>Independent stem-peak consensus (candidate ranking)</h2>"
            "<p>Co-incident attack bins get increased weight; master mix not counted as a separate vote.</p>"
            "<table><thead><tr><th>Pattern</th><th>Similarity</th><th>Window</th><th>Motion metric</th>"
            f"</tr></thead><tbody>{consensus_rows}</tbody></table></section>")
    chart = "<img src='overview.png' alt='Measured attack peaks overlaid with sampled DanceRudiments motion'>" if report["plot"] else ""
    doc = ("<!doctype html><html lang='en'><head><meta charset='utf-8'><title>Stemlab DanceRudiments candidates</title>"
           "<meta name='viewport' content='width=device-width,initial-scale=1'>"
           "<style>body{background:#0d1321;color:#e9f0ff;font:15px system-ui;margin:32px auto;max-width:1280px;padding:0 24px}"
           "h1{font-size:30px}h2{font-size:18px;color:#9de2d8}small,p{color:#b5c5da}"
           "section{background:#1a2537;border:1px solid #33465c;border-radius:13px;margin:18px 0;padding:16px 24px}"
           "table{border-collapse:collapse;width:100%}td,th{text-align:left;border-bottom:1px solid #34475b;padding:8px}"
           "th{color:#f9bb75}img{width:100%;border-radius:10px}strong{color:#92ebd2}</style></head><body>"
           f"<h1>StemLab <strong>×</strong> DanceRudiments</h1>"
           f"<p>Real audio attacks · Native motion catalogue · {report['pattern_count_scored']} patterns evaluated · "
           f"{report['total_matches']} displayed candidates · grid: {html.escape(report['grid_source'])}</p>"
           "<small>Comparative ranking only; not an accurate motion fit, causal relationship, or calibrated probability.</small>"
           + chart + "".join(source_cards) + "</body></html>")
    path.write_text(doc, encoding="utf-8")


def analyze_rudiments(
    master: Path, output_dir: Path, *,
    beat_results: Iterable[BeatResult] = (), stems: Iterable[StemArtifact] = (),
    config: RudimentConfig | None = None, bpm: float | None = None,
    first_beat_seconds: float = 0, include_master: bool = True,
    runtime: Any = None, make_plot: bool = True,
) -> dict[str, Any]:
    """Report candidates per stem plus cross-stem coincident attack statistics."""
    config = config or RudimentConfig()
    master, output_dir = Path(master).resolve(), Path(output_dir).resolve()
    if not master.is_file():
        raise FileNotFoundError(master)
    info = sf.info(str(master))
    beats, grid_source = _beat_grid(beat_results, info.duration, bpm=bpm, start_seconds=first_beat_seconds)
    motion, catalogue = load_catalogue(config, runtime=runtime)
    if not catalogue:
        raise ValueError("Selected DanceRudiments catalogue is empty")
    bank = []
    skipped = 0
    for item in catalogue:
        signals = _motion_signatures(motion, item, config)
        if signals:
            bank.append((item, signals))
        else:
            skipped += 1
    sources = ([StemArtifact("mix", "master", master)] if include_master else []) + list(stems)
    if not sources:
        raise ValueError("No audio sources selected")
    results = []
    for src in sources:
        if not Path(src.path).is_file():
            raise FileNotFoundError(src.path)
        events = extract_peak_events(Path(src.path))
        curve = _peak_bins(events, beats, config.subdivisions)
        item = {"model": src.model, "stem": src.stem, "audio_path": str(Path(src.path).resolve()),
                "peak_count": int(len(events["times"])), "curve": curve,
                "matches": _rank_one({"curve": curve}, bank, beats, config)}
        results.append(item)
    output_dir.mkdir(parents=True, exist_ok=True)
    # A master mix is an observation, not an independent stem vote.
    independent = [r["curve"] for r in results if r["model"] != "mix"]
    peak_agreement = None
    cross_stem_candidates = []
    if len(independent) >= 2:
        stack = np.stack(independent)
        votes = np.sum(stack >= .35, axis=0)
        active = np.sum(votes > 0)
        peak_agreement = {"independent_stems": len(independent),
                          "bins_with_any_peak": int(active),
                          "bins_with_two_or_more_stems": int(np.sum(votes >= 2)),
                          "fraction_multistem_given_peak": round(float(np.sum(votes >= 2) / max(active, 1)), 5)}
        # Rank a second, explicitly labelled multi-stem *hypothesis*: use
        # salient events from any stem, but prefer independently coincident
        # attacks. No sum of arbitrary per-model audio gain is used.
        combined = np.max(stack, axis=0) * np.where(votes >= 2, 1.0, 0.6)
        cross_stem_candidates = _rank_one({"curve": combined.astype(np.float32)}, bank,
                                          beats, config)
    report = {
        "schema": "stemlab.dancerudiments.candidates.v1",
        "method": "RMS energy-rise peaks projected onto the selected beat grid; cosine/Pearson "
                  "similarity to position excursion, speed or turn acceleration obtained from "
                  "the optional official DanceRudiments C++ sampler. Max 4-beat quarter-beat phase search.",
        "score_note": "similarity=(1+Pearson correlation)/2, not probability or validated fit; "
                      "max-over-window/phase search can produce incidental coincidences",
        "grid_source": grid_source,
        "catalogue_provider": "dancerudiments.catalogue/sample (optional package)",
        "selected_collection": config.collection or "all",
        "pattern_count_catalogue": len(catalogue),
        "pattern_count_scored": len(bank),
        "pattern_count_skipped_constant_or_period": skipped,
        "window_beats": config.window_beats,
        "subdivisions_per_beat": config.subdivisions,
        "min_similarity": config.min_similarity,
        "source_count": len(results),
        "total_matches": sum(len(src["matches"]) for src in results),
        "cross_stem_peak_agreement": peak_agreement,
        "cross_stem_candidates": cross_stem_candidates,
        "plot": "overview.png" if any(src["matches"] for src in results) and make_plot else None,
        "sources": [{k: v for k, v in src.items() if k != "curve"} for src in results],
        "report_html": "index.html",
    }
    write_json(output_dir / "report.json", report)
    if report["plot"]:
        _save_chart(output_dir / "overview.png", results, bank, beats, config)
    _save_html(output_dir / "index.html", report)
    return report


def analyze_saved_rudiments(results: Path, *, output: Path | None = None,
                            config: RudimentConfig | None = None, stems_filter: tuple[str, ...] = (),
                            runtime: Any = None, make_plot: bool = True) -> dict:
    """Reuse verified StemLab result stems/beat JSON; never rerun inference."""
    from stemlab.analysis.midi.runner import saved_sources
    root = Path(results).expanduser().resolve()
    master, saved = saved_sources(root)  # path/sha checks already implemented by StemLab
    filters = {f.lower() for f in stems_filter}
    selected = [s for s in saved if not filters or s.stem.lower() in filters]
    if filters and not selected:
        raise ValueError("No saved stems match --stem filters")
    manifest = json.loads((root / "analysis.json").read_text(encoding="utf-8"))
    allowed_models = {str(item.get("model")) for item in manifest.get("beats", [])
                      if isinstance(item, dict) and item.get("model")}
    beats = []
    for path in sorted((root / "beats").glob("*.json")):
        if path.stem not in allowed_models:
            continue  # Ignore stale beat JSON from an older analysis in this directory.
        data = json.loads(path.read_text(encoding="utf-8"))
        if isinstance(data.get("beats"), list):
            beats.append(BeatResult(data.get("model", path.stem), data["beats"],
                                    data.get("downbeats") or [], data.get("tempo_bpm"),
                                    data.get("metadata") or {}))
    # When no beat JSON exists, allow the structure estimate only if it contains
    # explicit timed beats; never quietly substitute an unphased BPM estimate.
    return analyze_rudiments(master, output or root / "deep" / "rudiments", beat_results=beats,
                             stems=selected, config=config, runtime=runtime, make_plot=make_plot)
