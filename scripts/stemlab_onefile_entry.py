"""Small external entry point for the Nuitka one-file build.

Keep this outside the stemlab package so Nuitka compiles a normal program entry
point instead of treating ``stemlab/__main__.py`` as a package main module.
"""

from stemlab.cli import app


if __name__ == "__main__":
    app()
