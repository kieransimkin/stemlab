"""Serve a generated timeline example directory on loopback with media byte ranges."""
from __future__ import annotations

import argparse
from functools import partial
from http.server import ThreadingHTTPServer
from pathlib import Path

from arcadians_http import ProjectHandler


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('directory', type=Path, help='Generated public site, never a private analysis root')
    parser.add_argument('--port', type=int, default=8768)
    args = parser.parse_args()
    root = args.directory.resolve(strict=True)
    if not (root/'index.html').is_file():
        raise ValueError('Serve only a prepared site with an explicit index.html')

    class Handler(ProjectHandler):
        prefix = '/'

    server = ThreadingHTTPServer(('127.0.0.1', args.port), partial(Handler, directory=str(root)))
    print(f'Timeline examples: http://127.0.0.1:{server.server_port}/ (Ctrl+C to stop)', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
