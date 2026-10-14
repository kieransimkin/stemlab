"""Local Pages-prefix test server with byte ranges for media seeking.

This is a loopback-only QA helper, not a production web server. Range handling
is deliberately single-part; unsupported or malformed ranges are ignored (200).
Satisfiable byte ranges return exactly the requested bytes (206), and valid but
unsatisfiable ranges return 416. HEAD returns full-resource headers without a body.
"""
from __future__ import annotations

from http.server import SimpleHTTPRequestHandler
import os
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit, urlunsplit


class ProjectHandler(SimpleHTTPRequestHandler):
    """Serve only the supplied site, preserving /stemlab/ in redirects and HEAD."""

    prefix = '/stemlab/'

    def do_GET(self):
        try:
            super().do_GET()
        except (BrokenPipeError, ConnectionResetError):
            # Media clients legitimately cancel a preload when seeking elsewhere.
            pass

    def do_HEAD(self):
        try:
            super().do_HEAD()
        except (BrokenPipeError, ConnectionResetError):
            pass

    def send_head(self):
        self._remaining = 0
        parts = urlsplit(self.path)
        decoded = unquote(parts.path)
        if decoded == '/favicon.ico':
            self.send_response(204)
            self.end_headers()
            return None
        if not decoded.startswith(self.prefix):
            self.send_error(404)
            return None
        relative = decoded[len(self.prefix):]
        if ('\x00' in relative or '\\' in relative or relative.startswith('/')
                or '..' in relative.split('/')):
            self.send_error(404)
            return None
        root = Path(self.directory).resolve()
        try:
            path = (root / relative).resolve()
            if not path.is_relative_to(root):
                self.send_error(404)
                return None
            if path.is_dir():
                if not parts.path.endswith('/'):
                    self.send_response(301)
                    self.send_header('Location', urlunsplit(parts._replace(path=parts.path + '/')))
                    self.send_header('Content-Length', '0')
                    self.end_headers()
                    return None
                # No directory listings: only an explicitly generated index.
                path = (path / 'index.html').resolve()
            if not path.is_relative_to(root) or not path.is_file():
                self.send_error(404)
                return None
            source = path.open('rb')
        except (OSError, ValueError, RuntimeError):
            self.send_error(404)
            return None
        try:
            info = os.fstat(source.fileno())
            size = info.st_size
            modified = self.date_time_string(info.st_mtime)
            requested = self.headers.get('Range') if self.command == 'GET' else None
            # Only a matching Last-Modified validator may qualify If-Range here;
            # no ETag is advertised. A stale/unsupported validator gets the whole file.
            if self.headers.get('If-Range') not in (None, modified):
                requested = None
            try:
                span = _byte_range(requested, size)
            except ValueError:
                self.send_response(416)
                self.send_header('Accept-Ranges', 'bytes')
                self.send_header('Content-Range', f'bytes */{size}')
                self.send_header('Content-Length', '0')
                self.end_headers()
                source.close()
                return None
            start, end = span if span is not None else (0, size - 1)
            self._remaining = end - start + 1
            source.seek(start)
            self.send_response(206 if span is not None else 200)
            self.send_header('Content-Type', self.guess_type(str(path)))
            self.send_header('Content-Length', str(self._remaining))
            self.send_header('Accept-Ranges', 'bytes')
            self.send_header('Last-Modified', modified)
            if span is not None:
                self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
            self.end_headers()
            return source
        except BaseException:
            source.close()
            raise

    def copyfile(self, source, outputfile):
        # Never send the rest of the MP3 after a partial response's advertised end.
        while self._remaining:
            block = source.read(min(64 * 1024, self._remaining))
            if not block:
                raise OSError('The served file changed while reading it')
            outputfile.write(block)
            self._remaining -= len(block)

    def log_message(self, *_args):
        pass


def _byte_range(header: str | None, size: int) -> tuple[int, int] | None:
    """Inclusive byte span, None for ignored syntax, ValueError for unsatisfiable."""
    if header is None:
        return None
    # Ignore unsupported units, multipart and malformed requests rather than
    # pretending a multipart body was produced. Bound integer parsing work.
    match = re.fullmatch(r'bytes=([0-9]{0,20})-([0-9]{0,20})', header.strip())
    if not match or not any(match.groups()):
        return None
    first, last = match.groups()
    if not first:
        suffix = int(last)
        if suffix == 0 or size == 0:
            raise ValueError('Unsatisfiable suffix range')
        return max(0, size - suffix), size - 1
    start = int(first)
    end = int(last) if last else size - 1
    if start >= size or end < start:
        raise ValueError('Unsatisfiable byte range')
    return start, min(end, size - 1)
