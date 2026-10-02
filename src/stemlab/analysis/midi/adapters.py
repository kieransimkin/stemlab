"""Calls to upstream inference APIs. Executed only inside isolated workers.

No third-party source or weights are vendored. Custom checkpoints/configs must
be trusted: upstream model packages are executable code, not a security sandbox.
"""
from __future__ import annotations

import hashlib
import importlib
import importlib.metadata
import importlib.resources
import json
import os
import tempfile
import urllib.request
from pathlib import Path
from typing import Any

from .registry import MIDI_MODELS

_MT3_WEIGHTS = {
    "mr_mt3": (
        "https://huggingface.co/gudgud1014/MR-MT3/resolve/main/mt3.pth",
        "b8a3807ed265059abd25ad7f68142c06c35e8f6144dcaa45bd55946a3745398f",
    ),
    "yourmt3": (
        "https://huggingface.co/spaces/mimbres/YourMT3/resolve/main/amt/logs/2024/"
        "mc13_256_g4_all_v7_mt3f_sqr_rms_moe_wf4_n8k2_silu_rope_rp_b36_nops/"
        "checkpoints/last.ckpt",
        "ae38e415c79efd5592dcb9b658cdb99ddb11d4c4e1eaa364cab04a052473fc25",
    ),
}
_PIANO_NAME = "CRNN_note_F1=0.9677_pedal_F1=0.9186.pth"
_PIANO_URL = ("https://zenodo.org/records/4034264/files/"
              "CRNN_note_F1%3D0.9677_pedal_F1%3D0.9186.pth?download=1")
_MAX_CHECKPOINT_BYTES = 2 * 1024 ** 3


def digest(path: Path, algorithm: str = "sha256") -> str:
    value = hashlib.new(algorithm)
    with path.open("rb") as handle:
        for block in iter(lambda: handle.read(1024 * 1024), b""):
            value.update(block)
    return value.hexdigest()


def _fetch(url: str, target: Path, expected: str | None = None,
           algorithm: str = "sha256", minimum: int = 1) -> Path:
    """Bounded, verified, atomic download; never overwrite an existing cache file."""
    if target.exists():
        if not target.is_file() or target.stat().st_size < minimum:
            raise ValueError(f"Incomplete checkpoint: {target}; remove it explicitly to retry")
        if expected and digest(target, algorithm) != expected:
            raise ValueError(f"Checkpoint checksum mismatch: {target}")
        return target
    target.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temp = tempfile.mkstemp(prefix="checkpoint-", suffix=".part", dir=target.parent)
    try:
        checksum = hashlib.new(algorithm)
        size = 0
        request = urllib.request.Request(url, headers={"User-Agent": "StemLab MIDI"})
        with os.fdopen(descriptor, "wb") as output, urllib.request.urlopen(request, timeout=60) as response:
            if not response.geturl().startswith("https://"):
                raise ValueError("Checkpoint redirect must remain HTTPS")
            for block in iter(lambda: response.read(1024 * 1024), b""):
                size += len(block)
                if size > _MAX_CHECKPOINT_BYTES:
                    raise ValueError("Checkpoint exceeds the 2 GiB download limit")
                checksum.update(block)
                output.write(block)
        if size < minimum or (expected and checksum.hexdigest() != expected):
            raise ValueError("Checkpoint size or checksum verification failed")
        # Publish atomically; another successful downloader may win this race.
        if target.exists():
            return _fetch(url, target, expected, algorithm, minimum)
        os.replace(temp, target)
        return target
    finally:
        Path(temp).unlink(missing_ok=True)


def _cache() -> Path:
    from platformdirs import user_cache_path
    return Path(os.environ.get("STEMLAB_CACHE", str(user_cache_path("stemlab")))) / "midi"


def checkpoint_for(model: str, override: str | None, allow_downloads: bool) -> Path:
    if override:
        path = Path(override).expanduser().resolve()
        if not path.is_file() or not path.stat().st_size:
            raise ValueError("Checkpoint must be a nonempty local file")
        return path
    if model in _MT3_WEIGHTS:
        url, expected = _MT3_WEIGHTS[model]
        path = _cache() / model / ("last.ckpt" if model == "yourmt3" else "mt3.pth")
        if not path.exists() and not allow_downloads:
            raise RuntimeError("Checkpoint is not cached; use --allow-model-downloads or --checkpoint MODEL=PATH")
        # Digest comes from mt3-infer's published checkpoint registry; a URL
        # change cannot silently change the weight bytes used by this adapter.
        return _fetch(url, path, expected)
    if model == "piano_transcription":
        path = _cache() / model / _PIANO_NAME
        if path.exists():
            # Our receipt pins the bytes fetched from the immutable Zenodo record.
            receipt = path.with_suffix(".checksum.json")
            expected = json.loads(receipt.read_text(encoding="utf-8")) if receipt.is_file() else {}
            if not expected.get("sha256"):
                raise ValueError("Cached piano checkpoint lacks its receipt; use an explicit --checkpoint")
            return _fetch(_PIANO_URL, path, expected["sha256"], minimum=160_000_000)
        if not allow_downloads:
            raise RuntimeError("Piano checkpoint is not cached; use --allow-model-downloads or --checkpoint")
        # Verify the checksum published by the original depositor. No guessed
        # fingerprint and no invocation of upstream's implicit wget/os.system.
        request = urllib.request.Request("https://zenodo.org/api/records/4034264",
                                         headers={"User-Agent": "StemLab MIDI"})
        with urllib.request.urlopen(request, timeout=30) as response:
            metadata = json.loads(response.read(1024 * 1024))
        record = next(x for x in metadata["files"] if x["key"] == _PIANO_NAME)
        algorithm, expected = record["checksum"].split(":", 1)
        if algorithm not in {"md5", "sha256"}:
            raise ValueError("Unsupported Zenodo checksum algorithm")
        _fetch(_PIANO_URL, path, expected, algorithm, minimum=160_000_000)
        path.with_suffix(".checksum.json").write_text(
            json.dumps({"sha256": digest(path), "zenodo_checksum": record["checksum"],
                        "url": _PIANO_URL}) + "\n", encoding="utf-8")
        return path
    raise ValueError(f"No downloadable checkpoint registered for {model}")


def _require(model: str) -> None:
    spec = MIDI_MODELS[model]
    try:
        importlib.import_module(spec.module)
    except ImportError as exc:
        raise RuntimeError(f"{spec.title} runtime missing or incompatible. Install StemLab's "
                           f"[{spec.extra}] extra in the selected backend Python. Original error: {exc}") from exc


def _torch_device(requested: str) -> str:
    import torch
    if requested == "auto":
        return "cuda" if torch.cuda.is_available() else "cpu"
    if requested == "mps":
        raise ValueError("These transcription adapters currently support CPU/CUDA, not MPS")
    if requested.startswith("cuda") and not torch.cuda.is_available():
        raise RuntimeError("CUDA explicitly requested but unavailable in this backend environment")
    return requested


def _audio(path: Path, sample_rate: int | None, mono: bool = True):
    import librosa
    import numpy as np
    import soundfile as sf
    audio, rate = sf.read(str(path), dtype="float32", always_2d=True)
    if not audio.size or not np.isfinite(audio).all():
        raise ValueError("Audio must be nonempty and finite")
    if mono:
        audio = audio.mean(axis=1)
    if sample_rate and rate != sample_rate:
        audio = librosa.resample(audio, orig_sr=rate, target_sr=sample_rate, axis=0)
        rate = sample_rate
    return np.ascontiguousarray(audio, dtype=np.float32), int(rate)


def run_backend(request: dict[str, Any], midi_path: Path) -> dict[str, Any]:
    slug = request["model"]
    if slug not in MIDI_MODELS:
        raise ValueError("Unknown MIDI backend")
    _require(slug)
    source = Path(request["source"])
    allow = request["allow_downloads"]
    custom = request.get("checkpoint")
    requested = request.get("device", "auto")
    metadata: dict[str, Any] = {"model": slug, "device_requested": requested, "allow_downloads": allow}
    if slug == "basic_pitch":
        from basic_pitch import ICASSP_2022_MODEL_PATH
        from basic_pitch.inference import Model, predict
        if requested not in {"auto", "cpu"}:
            raise ValueError("Basic Pitch chooses its own inference runtime; use device=auto or cpu")
        weights = Path(custom) if custom else Path(ICASSP_2022_MODEL_PATH)
        if not weights.exists():
            raise RuntimeError("Basic Pitch's bundled checkpoint is missing; reinstall basic-pitch")
        model = Model(weights)
        _, midi, _ = predict(source, model)
        midi.write(str(midi_path))
        metadata["device"] = "upstream-selected runtime (GPU hidden for cpu request)"
        metadata["runtime_type"] = str(getattr(model, "model_type", "not reported"))
    elif slug == "piano_transcription":
        from piano_transcription_inference import PianoTranscription, sample_rate
        weights = checkpoint_for(slug, custom, allow)
        # Upstream attempts wget when a file is smaller than 160 MB even if a
        # checkpoint path is supplied. Reject before its constructor can do that.
        if weights.stat().st_size < 160_000_000:
            raise ValueError("Piano checkpoint is incomplete (<160 MB); refusing upstream's implicit download")
        device = _torch_device(requested)
        audio, _ = _audio(source, int(sample_rate))
        model = PianoTranscription(checkpoint_path=str(weights), device=device)
        model.transcribe(audio, str(midi_path))
        metadata["device"] = device
    elif slug == "transkun":
        import moduleconf
        import torch
        from transkun.Data import writeMidi
        # Follow the official inference flow, but decode PCM/WAV/FLAC directly
        # instead of routing all input through the upstream MP3-specific reader.
        package = importlib.resources.files("transkun")
        weights = Path(custom) if custom else Path(str(package / "pretrained/2.0.pt"))
        conf_path = (Path(request["transkun_config"]) if request.get("transkun_config")
                     else Path(str(package / "pretrained/2.0.conf")))
        if not weights.is_file() or not conf_path.is_file():
            raise RuntimeError("Transkun packaged weights/config missing; reinstall transkun==2.0.1")
        device = _torch_device(requested)
        conf = moduleconf.parseFromFile(str(conf_path))["Model"]
        model = conf.module.TransKun(conf=conf.config).to(device)
        checkpoint = torch.load(str(weights), map_location=device, weights_only=True)
        state = checkpoint.get("best_state_dict", checkpoint.get("state_dict"))
        if state is None:
            raise ValueError("Transkun checkpoint has no supported state dict")
        model.load_state_dict(state, strict=True)
        model.eval()
        audio, _ = _audio(source, int(model.fs), mono=False)
        with torch.inference_mode():
            notes = model.transcribe(torch.from_numpy(audio).to(device), stepInSecond=None,
                                     segmentSizeInSecond=None, discardSecondHalf=False)
        writeMidi(notes).write(str(midi_path))
        metadata.update(device=device, config_sha256=digest(conf_path), config_path=str(conf_path))
    else:
        from mt3_infer import load_model
        weights = checkpoint_for(slug, custom, allow)
        device = _torch_device(requested)
        audio, rate = _audio(source, 16000)
        # All checkpoint provisioning is done above, including checksum checks.
        # Do not allow the wrapper to clone repositories or pick a default model.
        model = load_model(model=slug, checkpoint_path=str(weights), device=device,
                           auto_download=False, cache=False)
        midi = model.transcribe(audio, sr=rate)
        midi.save(str(midi_path))
        metadata.update(device=device, inference_sample_rate=rate, wrapper="mt3-infer")
    metadata["checkpoint_path"] = str(weights)
    if weights.is_file():
        metadata["checkpoint_sha256"] = digest(weights)
    else:
        metadata["checkpoint_files"] = [
            {"path": p.relative_to(weights).as_posix(), "sha256": digest(p)}
            for p in sorted(weights.rglob("*")) if p.is_file()
        ]
    versions = {}
    for name in (MIDI_MODELS[slug].package, "numpy", "librosa", "torch", "mido", "soundfile"):
        try:
            versions[name] = importlib.metadata.version(name)
        except importlib.metadata.PackageNotFoundError:
            pass
    metadata["package_versions"] = versions
    return metadata
