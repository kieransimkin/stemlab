# WordPress update: BeatNet on current Python

- Target post: `1239`, “Introducing StemLab: a closer look inside a song”
- Public URL: <https://kieransimkin.co.uk/2026/10/01/introducing-stemlab-music-analysis/>
- Change: insert the section below immediately before the existing final availability paragraph.
- Unchanged: title, excerpt, slug, publication date, category, tags and all existing body copy.
- Evidence: `docs/beatnet.md` and the verified 1 October 2026 smoke run.
- Publication state: saved to post `1239` on 1 October 2026 after exact editor readback.
- Public verification: independently reloaded public URL showed the section once, retained the issue link, and had no horizontal overflow at the default desktop viewport or 390px mobile width.
- Limitation: the only available in-app browser session was authenticated, so a genuinely signed-out browser render could not be completed without disturbing that session.

## Exact WordPress block source

```html
<!-- wp:heading -->
<h2 class="wp-block-heading">Getting BeatNet working on current Python</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>One practical snag was BeatNet. Its current PyPI release pins an old combination of Numba and NumPy that cannot be resolved alongside the maintained <code>madmom-prebuilt</code> package. The model code itself still works on current Python once that old package metadata is kept separate from the runtime.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In my current development checkout, StemLab now treats BeatNet as a pinned external runtime. It downloads the official BeatNet 1.1.3 wheel, checks the SHA-256 published by PyPI, and exposes only the code and bundled weights from its cache. Offline DBN decoding uses <code>madmom-prebuilt</code>. If the runtime is missing or the hash is wrong, StemLab reports it as unavailable rather than pretending that detector ran.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I tested the real model on CPython 3.13.14 with a deterministic 16-second click track at 120 BPM. BeatNet returned 120.0 BPM, 32 beats and 16 downbeats, and StemLab wrote both its JSON and TSV results. That proves the installation, inference and output path; it does not prove that BeatNet will be right about every song.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This is still worth fixing upstream. BeatNet's open <a href="https://github.com/mjhydri/BeatNet/issues/35">installation issue</a> records the released Numba-pin problem, while the current source has already relaxed the worst of those old pins. A focused pull request could finish the job by using a modern offline decoder dependency, keeping PyAudio optional, and testing Python 3.11 to 3.13 before a fresh release. Until that happens, StemLab's verified bootstrap keeps the workaround narrow and reproducible.</p>
<!-- /wp:paragraph -->
```
