"""Exercise the Codex viewer using the real browser bundle and synthetic audio.

Requires Playwright plus Chromium. No neural models, no registry publication.
Outputs are clearly labelled synthetic QA, never purported Arcadians measurements.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import tempfile
from pathlib import Path

from stemlab.codex.bridge import StemLabBridge
from stemlab.codex.timeline import WEB_ROOT
from capture_loop_workflow import capture_workflow
from loop_demo import create_fixture


def main() -> None:
    from playwright.sync_api import sync_playwright

    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, default=Path("build/codex-timeline-qa"))
    parser.add_argument("--chromium", help="Optional already installed Chromium executable")
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="stemlab-timeline-qa-") as name:
        workspace = Path(name).resolve()
        digest, root = create_fixture(workspace)
        report = json.loads((root / "deep/loops/loops.json").read_text(encoding="utf-8"))
        bridge = StemLabBridge(workspace, read_only=True)
        errors: list[str] = []
        try:
            view = bridge.open_timeline(digest)
            with sync_playwright() as playwright:
                options = {"headless": True}
                if args.chromium:
                    options["executable_path"] = args.chromium
                browser = playwright.chromium.launch(**options)
                try:
                    page = browser.new_page(viewport={"width": 1600, "height": 1100},
                                            device_scale_factor=1)
                    page.on("pageerror", lambda error: errors.append(str(error)))
                    try:
                        page.goto(view["url"], wait_until="domcontentloaded")
                    except Exception as exc:
                        message = str(exc).replace(view["url"], "<private-local-viewer>")
                        raise RuntimeError("Browser navigation failed; no capture completed: " + message) from None
                    result = capture_workflow(page, args.output, report)
                    assert not errors, errors
                    result.update({
                        "renderer": "real bundled react-timeline-sequence / StemLab frontend",
                        "capture_mode": "normal browser HTTP navigation to the Codex read-only viewer",
                        "page_errors": errors,
                        "asset_sha256": {name: hashlib.sha256((WEB_ROOT / name).read_bytes()).hexdigest()
                                         for name in ("app.js", "timeline.css")},
                    })
                    # Never retain the private session token in a screenshot manifest.
                    (args.output / "timeline-validation.json").write_text(
                        json.dumps(result, indent=2) + "\n", encoding="utf-8")
                    print(json.dumps(result, indent=2))
                finally:
                    browser.close()
        finally:
            bridge.close()


if __name__ == "__main__":
    main()
