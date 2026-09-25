#!/usr/bin/env bash
set -euo pipefail

mode="${1:-runtime}"

echo "=== StemLab Docker environment verification ($mode) ==="
python --version
python - <<'PY'
import importlib
mods = [
    'torch', 'torchaudio', 'numpy', 'scipy', 'soundfile', 'matplotlib',
    'demucs', 'openunmix', 'faster_whisper', 'beat_this', 'BeatNet',
    'bs_roformer', 'madmom', 'typer', 'rich',
    'fastapi', 'uvicorn', 'socketio',
]
for name in mods:
    module = importlib.import_module(name)
    version = getattr(module, '__version__', '')
    print(f'{name}: OK {version}')

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
