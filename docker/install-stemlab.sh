#!/usr/bin/env bash
set -euo pipefail

repo="${STEMLAB_REPO:-https://github.com/kieransimkin/stemlab.git}"
requested_ref="${STEMLAB_REF:-latest}"
destination="/opt/stemlab"
api="https://api.github.com/repos/kieransimkin/stemlab/releases/latest"

resolve_ref() {
    if [[ "$requested_ref" != "latest" ]]; then
        printf '%s\n' "$requested_ref"
        return
    fi

    # Use the latest published GitHub release when one exists. StemLab did not
    # yet have a GitHub Release when this Docker support was authored, so main
    # is an intentional fallback rather than a build failure.
    local tag
    tag="$(curl -fsSL "$api" 2>/dev/null | jq -r '.tag_name // empty' || true)"
    if [[ -n "$tag" ]]; then
        printf '%s\n' "$tag"
    else
        printf '%s\n' main
    fi
}

ref="$(resolve_ref)"
echo "Installing StemLab from $repo ref=$ref"
rm -rf "$destination"

if ! git clone --depth 1 --branch "$ref" "$repo" "$destination"; then
    if [[ "$requested_ref" == "latest" && "$ref" != "main" ]]; then
        echo "Latest release tag clone failed; falling back to main" >&2
        rm -rf "$destination"
        git clone --depth 1 --branch main "$repo" "$destination"
        ref=main
    else
        exit 1
    fi
fi

python -m pip install --no-deps -e "$destination"
printf '%s\n' "$ref" > /opt/stemlab-installed-ref.txt
git -C "$destination" rev-parse HEAD > /opt/stemlab-installed-commit.txt
stemlab --help >/dev/null
