"""Install the latest stable RELEASED viewers and rebuild StemLab; never use sibling source archives.

Release DanceRudiments and react-timeline-sequence first, then run this script
without checkout arguments. Commit the npm manifests, release metadata, release
commit pin, optional dependency minimum and rebuilt frontend together.
"""
import sys

from viewer_releases import main

if __name__ == '__main__':
    raise SystemExit(main(['sync', *sys.argv[1:]]))
