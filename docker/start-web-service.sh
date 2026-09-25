#!/usr/bin/env bash
set -euo pipefail

port="${STEMLAB_INTERNAL_PORT:-8000}"
public_port="${STEMLAB_PUBLIC_PORT:-8000}"
profile="${STEMLAB_SERVICE_PROFILE:-full}"
device="${STEMLAB_SERVICE_DEVICE:-auto}"
jobs="${STEMLAB_SERVICE_MAX_JOBS:-1}"
results="${STEMLAB_RESULTS_DIR:-/results}"

mkdir -p "$results"

/opt/stemlab-docker/verify-environment.sh runtime

cat <<EOF

============================================================
 StemLab web service
 Browser URL: http://localhost:${public_port}/
 Container:   http://0.0.0.0:${port}/
 Results:     ${results}
 Profile:     ${profile}
 Device:      ${device}
 Jobs:        ${jobs}
============================================================

EOF

exec stemlab serve \
    --host 0.0.0.0 \
    --port "$port" \
    --results "$results" \
    --scheduler-jobs "$jobs" \
    --profile "$profile" \
    --device "$device"
