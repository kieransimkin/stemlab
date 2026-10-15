"""Synthetic stereo Fourier sweep; no external media, models or private sources."""
import argparse
from pathlib import Path

import numpy as np
import soundfile as sf

from stemlab.analysis.rudiment_batch import export_single
from stemlab.analysis.rudiment_recordings import fourier_axes


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    if args.output.exists():
        parser.error('Choose a new output directory')
    args.output.mkdir(parents=True)
    rate, duration = 16384, 8
    t = np.arange(rate*duration)/rate
    growth = np.log(74)/duration
    phase = 2*np.pi*100/growth*(np.exp(growth*t)-1)
    x = .6*np.sin(phase)*(.5+.5*np.sin(np.pi*t)**2)
    source = args.output/'synthetic-antiphase-sweep.wav'
    sf.write(source, np.column_stack((x, -x)), rate, subtype='FLOAT')
    report = export_single(source, args.output/'bands32', fourier_axes(source, 32),
        timing=dict(bpm=120, bpm_status='confirmed', bpm_source='synthetic score',
                    beat_zero_seconds=0., phase_status='supplied'),
        normalization='global', include_audio=True, name='fourier_32')
    assert len(report['candidates'][0]['dimensions']) == 32
    print(args.output/'bands32/index.html')


if __name__ == '__main__':
    main()
