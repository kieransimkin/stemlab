"""Check the actual rebuilt frontend and its registry-backed release identities."""
from viewer_releases import check, main

__all__ = ['check']

if __name__ == '__main__':
    import sys
    raise SystemExit(main(['check', *sys.argv[1:]]))
