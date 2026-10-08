"""Reconcile saved StemLab ASR to locked lyrics without model reruns."""
import argparse
import json
from pathlib import Path
from stemlab.word_alignment import export_alignment

parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('analysis', type=Path)
parser.add_argument('lyrics', type=Path)
parser.add_argument('output', type=Path)
args = parser.parse_args()
print(json.dumps(export_alignment(args.analysis, args.lyrics, args.output), indent=2))
