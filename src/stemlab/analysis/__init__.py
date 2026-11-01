"""High-level musical analysis built on StemLab's existing evidence layers."""

__all__ = ["run_comprehensive_analysis"]


def __getattr__(name):
    # Offline rig/event analysis must not import audio decoders or model stacks.
    # Preserve the public convenience import, loading its dependencies on use.
    if name == "run_comprehensive_analysis":
        from .runner import run_comprehensive_analysis
        return run_comprehensive_analysis
    raise AttributeError(name)
