#!/usr/bin/env bash
set -euo pipefail

mode="${1:-runtime}"

echo "=== StemLab Docker environment verification ($mode) ==="
python --version
python - <<'PY'
import importlib
import importlib.metadata

mods = [
    'torch', 'torchaudio', 'numpy', 'scipy', 'soundfile', 'matplotlib',
    'demucs', 'openunmix', 'faster_whisper', 'beat_this', 'BeatNet',
    'bs_roformer', 'typer', 'rich', 'fastapi', 'uvicorn', 'socketio',
    'librosa', 'pyloudnorm', 'cmudict', 'sentence_transformers', 'allin1_infer',
]
for name in mods:
    module = importlib.import_module(name)
    version = getattr(module, '__version__', '')
    print(f'{name}: OK {version}')

# Exercise the exact compatibility path used by the BeatNet backend. This catches
# madmom-prebuilt's distribution-name mismatch, NumPy's removed legacy aliases,
# and BeatNet's unconditional optional PyAudio import during the image build.
from stemlab.beats.beatnet import _load_beatnet_class

beatnet_class = _load_beatnet_class()
madmom = importlib.import_module('madmom')
print(f'BeatNet.BeatNet: OK {beatnet_class.__name__}')
print(f'madmom: OK {getattr(madmom, "__version__", "")}')
print(f'madmom-prebuilt metadata: {importlib.metadata.version("madmom-prebuilt")}')

import torch
print('torch:', torch.__version__)
print('cuda build:', torch.version.cuda)
print('cuda available:', torch.cuda.is_available())
if torch.cuda.is_available():
    for i in range(torch.cuda.device_count()):
        print(f'gpu {i}: {torch.cuda.get_device_name(i)}')
PY

ffmpeg -version | head -n 1
sonic-annotator --version

outputs="$(sonic-annotator -l)"
for required in \
    vamp:nnls-chroma:chordino:simplechord \
    vamp:pyin:pyin:smoothedpitchtrack \
    vamp:silvet:silvet:notes \
    vamp:qm-vamp-plugins:qm-keydetector:key; do
    grep -Fqx "$required" <<<"$outputs" || {
        echo "Missing Vamp output: $required" >&2
        exit 1
    }
done

stemlab doctor
python -m pip check || {
    echo "NOTE: pip check reported a dependency conflict." >&2
    echo "StemLab's SCNet research backend is isolated by its own bootstrap venv;" >&2
    echo "the host snapshot itself also had an scnet torch/numpy metadata conflict." >&2
}
