from __future__ import annotations

import importlib.metadata
import importlib.util
import sys
from pathlib import Path
from types import ModuleType
from typing import Any

import numpy as np

from stemlab.types import BeatResult, StemArtifact
from .base import BeatBackend
from .common import save_result, tempo_from_beats


def _ensure_numpy_legacy_aliases() -> None:
    """Provide aliases still referenced by madmom's NumPy compatibility layer."""
    if "float" not in np.__dict__:
        setattr(np, "float", np.float64)
    if "int" not in np.__dict__:
        setattr(np, "int", np.int_)


def _install_pyaudio_stub() -> bool:
    """Let BeatNet's offline mode import when optional PyAudio is not installed."""
    if "pyaudio" in sys.modules or importlib.util.find_spec("pyaudio") is not None:
        return False

    pyaudio = ModuleType("pyaudio")

    class UnavailablePyAudio:
        def __init__(self, *_args: Any, **_kwargs: Any) -> None:
            raise RuntimeError("PyAudio is unavailable; BeatNet streaming mode cannot be used")

    pyaudio.PyAudio = UnavailablePyAudio
    pyaudio.paFloat32 = 0
    pyaudio.paContinue = 0
    sys.modules["pyaudio"] = pyaudio
    return True


def _load_beatnet_class() -> Any:
    """Import BeatNet with the compatibility required by madmom-prebuilt.

    madmom-prebuilt exposes the ``madmom`` module but its installed distribution
    is named ``madmom-prebuilt``. madmom asks importlib.metadata for ``madmom``
    during import, so temporarily map that lookup to the actual distribution.
    BeatNet also imports PyAudio unconditionally even though offline analysis
    does not use it.
    """
    _ensure_numpy_legacy_aliases()
    installed_pyaudio_stub = _install_pyaudio_stub()
    original_distribution = importlib.metadata.distribution

    def compatible_distribution(name: str):
        try:
            return original_distribution(name)
        except importlib.metadata.PackageNotFoundError:
            if name != "madmom":
                raise
            return original_distribution("madmom-prebuilt")

    importlib.metadata.distribution = compatible_distribution
    try:
        from BeatNet.BeatNet import BeatNet

        return BeatNet
    finally:
        importlib.metadata.distribution = original_distribution
        if installed_pyaudio_stub:
            sys.modules.pop("pyaudio", None)


class BeatNetBackend(BeatBackend):
    def analyze(
        self,
        audio_path: Path,
        output_dir: Path,
        stems: list[StemArtifact] | None = None,
    ) -> BeatResult:
        BeatNet = _load_beatnet_class()

        estimator = BeatNet(1, mode="offline", inference_model="DBN", plot=[], thread=False)
        events = np.asarray(estimator.process(str(audio_path)))
        if events.ndim == 1:
            events = events.reshape(-1, 2)
        beats = [float(x) for x in events[:, 0]] if len(events) else []
        downbeats = (
            [float(t) for t, idx in events[:, :2] if int(round(float(idx))) == 1]
            if len(events)
            else []
        )
        return save_result(
            BeatResult(
                "beatnet",
                beats,
                downbeats,
                tempo_from_beats(beats),
                {"mode": "offline", "decoder": "DBN"},
            ),
            output_dir,
        )
