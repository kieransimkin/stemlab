"""Reproduce phrase search on synthetic chord/attack contexts; no private media."""
import argparse
from pathlib import Path

import numpy as np
import soundfile as sf

from stemlab.analysis.phrase_loops import PhraseLoopConfig, analyze_phrase_loops
from stemlab.types import BeatResult, StemArtifact


def main():
    parser=argparse.ArgumentParser(__doc__)
    parser.add_argument('--output',type=Path,default=Path('phrase-demo'))
    parser.add_argument('--half-bar-endings',action='store_true')
    parser.add_argument('--max-bar-phase-error',type=float)
    args=parser.parse_args()
    args.output.mkdir(parents=True,exist_ok=True)
    sr=8000
    t=np.arange(sr*40)/sr
    frequencies=np.array([261.6256,220,349.2282,195.9977])[(t//2).astype(int)%4]
    phase=np.cumsum(frequencies)/sr
    y=((.3*np.exp(-7*(t%0.5))+.015)*np.sin(2*np.pi*phase)).astype('float32')
    master=args.output/'synthetic.wav'
    vocal=args.output/'synthetic-vocals.wav'
    sf.write(master,y,sr,subtype='FLOAT')
    sf.write(vocal,np.full_like(y,.05),sr,subtype='FLOAT')
    lines=[dict(start=i*2,end=(i+1)*2,text=f'Synthetic line {i%4}') for i in range(20)]
    if args.half_bar_endings:
        for i,line in enumerate(lines):
            if i%3==1:
                line['end']-=1
    report=analyze_phrase_loops(master,args.output/'phrases',
        canonical={'lyric_timing':lines},
        beat_results=[BeatResult('supplied_synthetic',list(np.arange(0,40.01,.5)),
                                list(np.arange(0,40.01,2)),120)],
        stems=[StemArtifact('synthetic','vocals',vocal)],export_audio=True,
        config=PhraseLoopConfig(max_bar_phase_error=args.max_bar_phase_error))
    print(f"{report['candidate_count']} exploratory candidates; no listening approval.")
    print(args.output/'phrases/phrase_loops.json')
    print(f"Bar-position exclusions: {report['rejected_candidates'].get('bar_phase_mismatch',0)}")


if __name__=='__main__':
    main()
