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

# The Linux "static" distribution is an AppImage. BuildKit containers do not
# expose /dev/fuse, so running the AppImage directly fails even when libfuse2
# is installed. Extract the AppImage once and invoke its AppRun entry point
# from the extracted AppDir instead.
appimage_root="$root/appimage"
rm -rf "$appimage_root"
mkdir -p "$appimage_root"

if ! (cd "$appimage_root" && "$binary" --appimage-extract >/dev/null); then
    echo "Failed to extract Sonic Annotator AppImage" >&2
    exit 1
fi

app_run="$appimage_root/squashfs-root/AppRun"
if [[ ! -x "$app_run" ]]; then
    echo "Sonic Annotator AppImage AppRun not found after extraction" >&2
    exit 1
fi

cat >/usr/local/bin/sonic-annotator <<EOF
#!/usr/bin/env bash
exec "$app_run" "\$@"
EOF
chmod +x /usr/local/bin/sonic-annotator

sonic-annotator --version
