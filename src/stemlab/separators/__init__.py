from __future__ import annotations

from .bsroformer import BSRoformerBackend
from .demucs import DemucsBackend
from .openunmix import OpenUnmixBackend
from .scnet import SCNetBackend


def make_backend(name: str, bootstrap_external: bool = True):
    if name == "bs_roformer":
        return BSRoformerBackend()
    if name == "demucs":
        return DemucsBackend()
    if name == "openunmix":
        return OpenUnmixBackend()
    if name == "scnet":
        return SCNetBackend(bootstrap_external=bootstrap_external)
    raise KeyError(name)
