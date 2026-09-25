#!/usr/bin/env bash
set -euo pipefail

version="1.7"
url="https://github.com/sonic-visualiser/sonic-annotator/releases/download/sonic-annotator-${version}/sonic-annotator-${version}.0-linux64-static.tar.gz"
root="/opt/sonic-annotator-${version}"

if command -v sonic-annotator >/dev/null 2>&1; then
    sonic-annotator --version
    exit 0
fi

mkdir -p "$root"
curl -fL --retry 5 --retry-delay 2 "$url" -o /tmp/sonic-annotator.tar.gz
tar -xzf /tmp/sonic-annotator.tar.gz -C "$root" --strip-components=1
rm -f /tmp/sonic-annotator.tar.gz

binary="$(find "$root" -type f -name sonic-annotator -perm /111 | head -n 1)"
if [[ -z "$binary" ]]; then
    echo "Sonic Annotator executable not found after extraction" >&2
    exit 1
fi
ln -sf "$binary" /usr/local/bin/sonic-annotator
sonic-annotator --version
