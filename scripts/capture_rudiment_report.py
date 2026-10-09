"""Capture *real Chromium* screenshots of a measured StemLab rudiment report.

Usage: python scripts/capture_rudiment_report.py RESULTS/deep/rudiments
       --output docs/screenshots --chromium /usr/bin/chromium
Requires playwright, plus an installed Chromium; no fabricated UI elements.
"""
from __future__ import annotations

import argparse
import base64
import shutil
from pathlib import Path


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("report", type=Path, help="Directory containing index.html")
    parser.add_argument("--output", type=Path, default=Path("docs/screenshots"))
    parser.add_argument("--chromium", type=str, default=None)
    args = parser.parse_args()
    page_file = args.report.resolve() / "index.html"
    if not page_file.is_file():
        parser.error("Missing measured rudiment report HTML: " + str(page_file))
    args.output.mkdir(parents=True, exist_ok=True)
    from playwright.sync_api import sync_playwright
    with sync_playwright() as api:
        options = {"headless": True}
        binary = args.chromium or shutil.which("chromium") or shutil.which("chromium-browser")
        if binary:
            options["executable_path"] = binary
        browser = api.chromium.launch(**options)
        try:
            page = browser.new_page(viewport={"width": 1440, "height": 790}, device_scale_factor=1)
            # Chromium may prohibit file:// navigation in CI. Render the exact
            # generated report into its DOM with only local image bytes inlined.
            markup = page_file.read_text(encoding="utf-8")
            chart = page_file.parent / "overview.png"
            if chart.is_file():
                chart_uri = "data:image/png;base64," + base64.b64encode(chart.read_bytes()).decode("ascii")
                markup = markup.replace("src='overview.png'", "src='" + chart_uri + "'")
            page.set_content(markup, wait_until="load")
            if page.locator("img").count():
                page.wait_for_function("() => [...document.images].every(i => i.complete && i.naturalWidth)")
            page.screenshot(path=str(args.output / "arcadians-rudiments-report.png"))
            page.locator("table").first.scroll_into_view_if_needed()
            page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            page.screenshot(path=str(args.output / "arcadians-rudiments-ranked.png"))
            print("Screenshots captured from", page_file)
        finally:
            browser.close()


if __name__ == "__main__":
    main()
