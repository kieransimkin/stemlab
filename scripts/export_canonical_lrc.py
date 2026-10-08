"""Export full canonical lyric lines from reconciled StemLab word evidence."""
import argparse
import json
from pathlib import Path

from stemlab.lyric_lrc import export_lrc

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("alignment", type=Path)
parser.add_argument("output", type=Path)
parser.add_argument("--title", required=True)
parser.add_argument("--artist", required=True)
parser.add_argument("--anchors", type=Path, help="Hash-verified observed-word recovery anchors; never arbitrary timestamps")
args = parser.parse_args()
result = export_lrc(args.alignment, args.output, title=args.title, artist=args.artist, anchors_path=args.anchors)
print(json.dumps({key: value for key, value in result.items() if key != "cues"}, indent=2))
