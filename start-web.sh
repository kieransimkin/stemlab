#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

port=8000
results="results"
profile="full"
device="auto"
scheduler_jobs=1
docker_mode=0
no_browser=0

usage() {
    cat <<'EOF'
Usage: ./start-web.sh [options]

Options:
  --port PORT              HTTP port (default: 8000)
  --results DIR            Results directory (default: ./results)
  --profile PROFILE        StemLab profile: full, practical or fast
  --device DEVICE          auto, cpu, cuda or cuda:N
  --scheduler-jobs N       Concurrent analyses (default: 1)
  --docker                 Run the Docker Compose web service
  --no-browser             Do not open a browser automatically
  -h, --help               Show this help

Examples:
  ./start-web.sh
  ./start-web.sh --profile practical
  ./start-web.sh --docker
  ./start-web.sh --docker --device cpu
EOF
}

while [[ $# -gt 0 ]]; do
    case "$1" in
        --port) port="${2:?missing port}"; shift 2 ;;
        --results) results="${2:?missing results directory}"; shift 2 ;;
        --profile) profile="${2:?missing profile}"; shift 2 ;;
        --device) device="${2:?missing device}"; shift 2 ;;
        --scheduler-jobs) scheduler_jobs="${2:?missing job count}"; shift 2 ;;
        --docker) docker_mode=1; shift ;;
        --no-browser) no_browser=1; shift ;;
        -h|--help) usage; exit 0 ;;
        *) echo "Unknown argument: $1" >&2; usage >&2; exit 2 ;;
    esac
done

if ! [[ "$port" =~ ^[0-9]+$ ]] || (( port < 1 || port > 65535 )); then
    echo "Port must be between 1 and 65535." >&2
    exit 2
fi
if ! [[ "$scheduler_jobs" =~ ^[0-9]+$ ]] || (( scheduler_jobs < 1 )); then
    echo "scheduler-jobs must be at least 1." >&2
    exit 2
fi

url="http://127.0.0.1:${port}/"
child_pid=""

cleanup() {
    local code=$?
    trap - INT TERM EXIT
    if [[ -n "${child_pid:-}" ]] && kill -0 "$child_pid" 2>/dev/null; then
        printf '\nStopping StemLab...\n'
        kill -TERM "$child_pid" 2>/dev/null || true
        wait "$child_pid" 2>/dev/null || true
    fi
    exit "$code"
}
trap cleanup INT TERM EXIT

open_browser() {
    (( no_browser == 1 )) && return 0

    if command -v xdg-open >/dev/null 2>&1; then
        xdg-open "$url" >/dev/null 2>&1 &
    elif command -v gio >/dev/null 2>&1; then
        gio open "$url" >/dev/null 2>&1 &
    elif command -v sensible-browser >/dev/null 2>&1; then
        sensible-browser "$url" >/dev/null 2>&1 &
    else
        echo "No desktop browser opener found; open $url manually."
    fi
}

wait_until_ready() {
    local deadline=$((SECONDS + 180))
    while (( SECONDS < deadline )); do
        if ! kill -0 "$child_pid" 2>/dev/null; then
            wait "$child_pid" || true
            echo "StemLab exited before the web service became ready." >&2
            return 1
        fi
        if curl -fsS --max-time 2 "${url}healthz" >/dev/null 2>&1; then
            return 0
        fi
        sleep 0.5
    done
    echo "Timed out waiting for ${url}healthz" >&2
    return 1
}

printf '\nStemLab web service\n'
printf 'Browser URL: %s\n' "$url"
printf 'Press Ctrl+C to stop the service.\n\n'

if (( docker_mode == 1 )); then
    command -v docker >/dev/null 2>&1 || {
        echo "Docker was not found." >&2
        exit 1
    }
    docker compose version >/dev/null

    mkdir -p "$results"
    export STEMLAB_WEB_PORT="$port"
    export STEMLAB_RESULTS_HOST_DIR="$(cd "$results" && pwd)"
    export STEMLAB_SERVICE_PROFILE="$profile"
    export STEMLAB_SERVICE_DEVICE="$device"
    export STEMLAB_SERVICE_MAX_JOBS="$scheduler_jobs"

    if [[ "$device" == "cpu" ]]; then
        docker compose --profile cpu up --build web-cpu &
    else
        docker compose up --build web &
    fi
    child_pid=$!
else
    mkdir -p "$results"
    export PYTHONPATH="$ROOT/src${PYTHONPATH:+:$PYTHONPATH}"

    if [[ -x "$ROOT/.venv/bin/python" ]]; then
        python_cmd=("$ROOT/.venv/bin/python")
    elif command -v python3 >/dev/null 2>&1; then
        python_cmd=(python3)
    elif command -v python >/dev/null 2>&1; then
        python_cmd=(python)
    else
        echo "Python was not found. Activate the StemLab environment or create .venv first." >&2
        exit 1
    fi

    "${python_cmd[@]}" -m stemlab.cli serve \
        --host 0.0.0.0 \
        --port "$port" \
        --results "$results" \
        --scheduler-jobs "$scheduler_jobs" \
        --profile "$profile" \
        --device "$device" &
    child_pid=$!
fi

wait_until_ready
printf '\nStemLab is ready: %s\n' "$url"
open_browser

set +e
wait "$child_pid"
status=$?
set -e
child_pid=""
trap - INT TERM EXIT
exit "$status"
