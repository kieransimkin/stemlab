#!/usr/bin/env bash
set -euo pipefail

# Install the official Vamp Plugin Pack v2.0 into /root/.vamp. The upstream
# Linux distribution is a GUI AppImage installer, so this script runs it in a
# temporary Xvfb display and presses the default Install/OK buttons. The build
# fails unless the melody/harmony plugins StemLab needs are visible afterwards.

version="2.0"
installer="/tmp/vamp-plugin-pack-installer-${version}"
url="https://github.com/vamp-plugins/vamp-plugin-pack/releases/download/v${version}/vamp-plugin-pack-installer-${version}"
required=(
  'vamp:nnls-chroma:chordino:simplechord'
  'vamp:nnls-chroma:nnls-chroma:chroma'
  'vamp:pyin:pyin:smoothedpitchtrack'
  'vamp:pyin:pyin:notes'
  'vamp:qm-vamp-plugins:qm-keydetector:key'
  'vamp:qm-vamp-plugins:qm-tonalchange:changepositions'
  'vamp:silvet:silvet:notes'
  'vamp:segmentino:segmentino:segmentation'
)

have_required() {
    local list
    list="$(sonic-annotator -l 2>/dev/null || true)"
    local item
    for item in "${required[@]}"; do
        grep -Fqx "$item" <<<"$list" || return 1
    done
}

if have_required; then
    echo "Required Vamp plugins already installed"
    exit 0
fi

mkdir -p /root/.vamp /tmp/vamp-installer
curl -fL --retry 5 --retry-delay 2 "$url" -o "$installer"
chmod +x "$installer"

cd /tmp/vamp-installer
"$installer" --appimage-extract >/dev/null

Xvfb :99 -screen 0 1280x800x24 >/tmp/xvfb.log 2>&1 &
xvfb_pid=$!
trap 'kill "$xvfb_pid" 2>/dev/null || true' EXIT
export DISPLAY=:99
export QT_QPA_PLATFORM=xcb

./squashfs-root/AppRun >/tmp/vamp-installer.log 2>&1 &
installer_pid=$!

# Wait for the main dialog, focus it, and activate the default Install button.
window=""
for _ in $(seq 1 60); do
    window="$(xdotool search --name 'Vamp Plugin Pack Installer' 2>/dev/null | head -n 1 || true)"
    [[ -n "$window" ]] && break
    sleep 1
done
if [[ -z "$window" ]]; then
    cat /tmp/vamp-installer.log >&2 || true
    echo "Vamp Plugin Pack installer window did not appear" >&2
    exit 1
fi

xdotool windowactivate --sync "$window" || true
xdotool key Return || true

# The installer ends with a modal completion message. Pressing Return while it
# runs is harmless for the progress dialog and closes the final OK dialog.
for _ in $(seq 1 120); do
    if ! kill -0 "$installer_pid" 2>/dev/null; then
        break
    fi
    sleep 1
    xdotool key Return 2>/dev/null || true
done

if kill -0 "$installer_pid" 2>/dev/null; then
    echo "Vamp Plugin Pack installer did not finish in time" >&2
    kill "$installer_pid" 2>/dev/null || true
    exit 1
fi
wait "$installer_pid"

if ! have_required; then
    echo "Vamp Plugin Pack installation completed but required outputs are missing" >&2
    sonic-annotator -l >&2 || true
    exit 1
fi

echo "Vamp Plugin Pack ${version} installed and verified"
