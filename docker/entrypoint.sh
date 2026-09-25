#!/usr/bin/env bash
set -euo pipefail

if [[ $# -gt 0 ]]; then
    exec "$@"
fi

/opt/stemlab-docker/verify-environment.sh runtime

if [[ "${STEMLAB_BOOTSTRAP_MODELS:-1}" == "1" ]]; then
    echo "=== Bootstrapping StemLab external model runtimes ==="
    stemlab bootstrap all
fi

if [[ "${STEMLAB_AUTO_TEST:-1}" != "1" ]]; then
    echo "Environment ready. STEMLAB_AUTO_TEST=0, so no audio analysis was run."
    exec bash
fi

audio="${STEMLAB_AUDIO_FILE:-}"
if [[ -n "$audio" && "$audio" != /* ]]; then
    audio="/music/$audio"
fi

if [[ -z "$audio" ]]; then
    audio="$(find /music -maxdepth 2 -type f \
        \( -iname '*.wav' -o -iname '*.flac' -o -iname '*.mp3' -o -iname '*.ogg' -o -iname '*.aif' -o -iname '*.aiff' \) \
        -print -quit 2>/dev/null || true)"
fi

if [[ -z "$audio" || ! -f "$audio" ]]; then
    cat <<'MSG'
StemLab Docker environment is ready, but no music file was found.
Place any WAV/FLAC/MP3/OGG/AIFF file in ./music and run:

    docker compose run --rm stemlab

or set STEMLAB_AUDIO_FILE to a filename in that directory.
MSG
    exit 0
fi

profile="${STEMLAB_TEST_PROFILE:-fast}"
device="${STEMLAB_DEVICE:-auto}"
name="$(basename "$audio")"
name="${name%.*}"
out="/output/${name}-${profile}"

rm -rf "$out"
echo "=== Smoke-testing StemLab ==="
echo "audio:   $audio"
echo "profile: $profile"
echo "device:  $device"
echo "output:  $out"

stemlab analyze "$audio" --output "$out" --profile "$profile" --device "$device"

echo "=== StemLab smoke test completed ==="
ls -la "$out"
