"""Analyse complete, verified DanceRudiments motion packages without a new sampler.

The optional DanceRudiments authoring API validates manifest hashes, versioned
profiles, compressed clip payloads, numbered channels and native recording rows.
Its 60 BPM time-only transport is converted to **seconds**, not music beats.
"""
from __future__ import annotations

import hashlib
import math
from pathlib import Path

import numpy as np

from .rig_motion import MAX_VALUES, _analyze_poses


def analyze_rig_motion_package(path: Path | str, *, original_action_id: str | None = None,
                               min_bpm: float = 60, max_bpm: float = 200) -> dict:
    """Analyse one complete contiguous captured action across all its chunks.

    Multiple original actions require ``original_action_id``. No omitted chunk,
    silent retiming, inferred music phase, model download or scene retargeting.
    """
    try:
        from dancerudiments_authoring.motion_packages import MotionPackage
    except ImportError as exc:
        raise RuntimeError("Install the compatible released DanceRudiments Python authoring package "
                           "for motion-package analysis; raw rig captures need no extra package") from exc

    path = Path(path)
    manifest_path = path / "manifest.json" if path.is_dir() else path
    if manifest_path.name != "manifest.json":
        raise ValueError("Expected a DanceRudiments motion-package directory or manifest.json")
    with MotionPackage(path, cache_size=0) as package:
        manifest = package.manifest
        descriptions = package.catalogue()
        sources = {}
        for desc in descriptions:
            metadata = desc.get("metadata") or {}
            key = metadata.get("original_clip_id")
            if not isinstance(key, str) or not key:
                raise ValueError("A motion package must retain an explicit original_clip_id for each chunk")
            sources.setdefault(key, []).append(desc)
        if not sources:
            raise ValueError("No motion chunks available")
        if original_action_id is None:
            if len(sources) != 1:
                raise ValueError("Multiple original actions: specify --action-id (one of: " +
                                 ", ".join(sorted(sources)) + ")")
            original_action_id = next(iter(sources))
        if original_action_id not in sources:
            raise ValueError("Unknown original action ID for this package")
        group = sorted(sources[original_action_id], key=lambda c: c["start_pip"])
        if len(group) > 64 or sum(c["sample_count"] for c in group) > 200_000:
            raise ValueError("Action exceeds bounded offline motion-analysis limits")
        if sum(c["sample_count"] * len(manifest["dimensions"]) for c in group) > MAX_VALUES:
            raise ValueError("Action exceeds the native scalar analysis limit")

        profile = package.profile
        clip_ids, clip_hashes, rows, times = [], [], [], []
        next_pip, bpm0, zero0 = None, None, None
        for i, desc in enumerate(group):
            meta = desc.get("metadata") or {}
            if (meta.get("complete_action") is not True or meta.get("timing_kind") != "time-only"
                    or meta.get("music_timing_verified") is not False
                    or meta.get("original_clip_id") != original_action_id
                    or meta.get("chunk_count") != len(group) or meta.get("chunk_index") != i
                    or meta.get("trimmed_source_frames") != 0):
                raise ValueError("Incomplete or non-time-only source action; original timing was not verified")
            start = desc["start_pip"]
            if next_pip is not None and start != next_pip:
                raise ValueError("Missing/overlapping package motion chunk")
            motion = package.load(desc["id"])  # hashes, profile and samples checked by DanceRudiments
            clock = motion.recording.clock
            if (abs(clock.bpm - 60) > 1e-9 or not clock.bpm_source.startswith("time-only")
                    or clock.phase_status != "unverified"):
                raise ValueError("Expected explicit 60 BPM time-only coordinate, not music/phase timing")
            if bpm0 is None:
                bpm0, zero0 = clock.bpm, clock.beat_zero_seconds
            elif abs(clock.bpm - bpm0) > 1e-9 or abs(clock.beat_zero_seconds - zero0) > 1e-9:
                raise ValueError("Source time clock changes across chunks")
            duration = len(motion.recording.samples)
            normalized = np.asarray(motion.recording.samples, dtype=np.float64)
            if normalized.shape != (duration, len(profile.channels)):
                raise ValueError("Unexpected normalized sample shape")
            # Each group uses the *physical* profile units, not unrelated [-1,1]
            # channel amplitudes. The package loader has validated discrete
            # switches, quaternion norms and all normalized samples already.
            minima = np.array([c.minimum for c in profile.channels], dtype=np.float64)
            widths = np.array([c.maximum - c.minimum for c in profile.channels], dtype=np.float64)
            physical = minima + (normalized + 1) * (widths / 2)
            rows.append(physical)
            pips = start + np.arange(duration, dtype=np.float64)
            times.append(zero0 + pips * (60.0 / bpm0 / 64.0))
            clip_ids.append(desc["id"])
            clip_hashes.append(desc["sha256"])
            next_pip = start + duration

        values = np.concatenate(rows, axis=0)
        timestamps = np.concatenate(times, axis=0)
        if (not np.isfinite(values).all() or not np.isfinite(timestamps).all()
                or not np.all(np.diff(timestamps) > 0)):
            raise ValueError("Invalid reconstructed physical source clock")
        # The converter's first frame is a calibration T-pose rather than a dance
        # onset. Preserve original absolute time; exclude the calibration only
        # from analysis to avoid a spurious strong first accent / loop seam.
        source = manifest.get("provenance", {}).get("source", {})
        calibration_frames = source.get("calibration_frame_count", 0)
        source_frame_interval = source.get("effective_frame_time_seconds")
        if (type(calibration_frames) is not int or not 0 <= calibration_frames <= 60):
            raise ValueError("Invalid converter calibration frame count")
        if calibration_frames:
            from fractions import Fraction
            if not isinstance(source_frame_interval, str):
                raise ValueError("Calibration exclusion requires the verified original frame interval")
            try:
                frame_time = float(Fraction(source_frame_interval))
            except (ValueError, ZeroDivisionError, OverflowError) as exc:
                raise ValueError("Invalid source frame-time evidence") from exc
            if not math.isfinite(frame_time) or not 0 < frame_time <= .1:
                raise ValueError("Unsupported source frame interval")
            omit = math.ceil(calibration_frames * frame_time * 64 - 1e-12)
        else:
            omit = 0
        if omit:
            timestamps, values = timestamps[omit:], values[omit:]
        # A quaternion's negative represents the *same* rotation. The native
        # recording remains untouched; only this in-memory analysis view is
        # made sign-continuous across original package chunk boundaries.
        group_indices = {}
        for j, c in enumerate(profile.channels):
            if c.interpolation == "quaternion":
                group_indices.setdefault((c.bone, c.data_path), {})[c.array_index] = j
        for indexes in group_indices.values():
            if set(indexes) != {0, 1, 2, 3}:
                raise ValueError("Incomplete quaternion group in package profile")
            ix = [indexes[j] for j in range(4)]
            q = values[:, ix].copy()
            for j in range(1, len(q)):
                if np.dot(q[j - 1], q[j]) < 0:
                    q[j] *= -1
            values[:, ix] = q

        digest = hashlib.sha256(manifest_path.read_bytes()).hexdigest()
        data = {"profile_sha256": profile.fingerprint, "type_uri": profile.type_uri}
        report = _analyze_poses(data, timestamps, values,
                                [channel.to_dict() for channel in profile.channels], digest,
                                min_bpm=min_bpm, max_bpm=max_bpm, source_kind="motion_package")
        report.update(source_package_id=manifest["id"], source_package_version=manifest["version"],
                      source_manifest_sha256=digest, source_original_action_id=original_action_id,
                      source_clip_ids=clip_ids, source_clip_sha256=clip_hashes,
                      source_calibration_omitted_pips=omit,
                      source_timing_kind="time-only; no verified musical tempo or downbeat",
                      source_start_pip=group[0]["start_pip"], source_sample_count=next_pip-group[0]["start_pip"])
        report["limitations"].append("Input was a native 60 BPM seconds coordinate, not a music tempo; "
                                     "candidate BPM is independent kinematic inference.")
        return report
