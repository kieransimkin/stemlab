# StemLab variable-tempo / Beat 1 correction patch

Baseline reviewed: `kieransimkin/stemlab` `main` at commit
`e43bf9ada5abf7dc941ec2823c8ade9df52c5ca2` (2026-10-16).

This ZIP contains a **source installer** instead of a fragile Git diff: it
validates all original context strings before writing anything and handles both
Windows CRLF and LF line endings. It adds new Python/JS modules and tests and
updates the CLI's web server, Vite React entrypoint, README, AGENTS and CI.
It does not change the sibling React timeline or DanceMoves repositories.

## Windows PowerShell

1. Extract the ZIP into the **root** of your StemLab checkout, retaining its
   `new/` directory next to the installer script.
2. Run these commands from that repository root:

```powershell
python .\apply-stemlab-beat-map.py --check
python .\apply-stemlab-beat-map.py
npm ci
npm run build:web
python -m pytest tests/test_beat_map.py tests/test_web_frontend.py tests/test_static_timeline.py
node --test tests/web/beat-map.test.mjs tests/web/beat-offsets.test.mjs
git diff --check
git status --short
```

Review the resulting commit diff and commit the **real newly built**
`src/stemlab/web/app.js` and `src/stemlab/web/timeline.css` with the Python, JS,
README, docs and CI changes. The release workflows deliberately reject stale
browser bundles. Don't commit the ZIP/installer (they are only distribution
helpers) or local audio/checkpoints.

Once installed, serve StemLab normally, load an analysed master, and select
**Show editor** in the **Beat correction** panel below the timeline. The editor
loads all available consensus beats as sample-precise anchors by default.
It doesn't create an invented tempo or overwrite consensus evidence.

**Export Beat 1 + full beat timeline JSON** downloads a single complete file.
**Copy JSON value** copies the same JSON object. Beat 1 starts at pip zero and
both the exact signed synchronisation phase and all irregular timestamps are
included. The saved correction is stored at `timing/beat-timeline.json`.

## Important DanceMoves compatibility boundary

The released DanceMoves 3.3 importer validates `stemlab.beat-alignment.v1`, a
constant-tempo reading. It cannot import or execute this full irregular
`stemlab.beat-timeline.v1` directly. A companion DanceMoves parser and
variable-tempo playback clock update is required; see
`docs/beat-timeline.md`. Do not paste this v1 beat-timeline export into the
older WordPress field or treat a constant-BPM fallback as the corrected map.

## Verification performed in this environment

- New standalone Python logic: 16 tests passed.
- New pure JavaScript beat editor math: 5 Node tests passed.
- JSX/ES2022 syntax transpilation: 0 diagnostics.
- Installer context and dry-run checks against a synthetic mock checkout passed.

The **actual user checkout, built Vite/browser UI, Windows browser interactions,
full repo CI and DanceMoves consumer runtime have not been tested here**.
The absence of npm registry access in this environment prevents a verified
rebuilt web bundle. Do not describe the patch as fully CI-qualified until the
rebuild and all relevant GitHub Actions checks pass on the new commit.
