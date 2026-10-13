"""Create a deterministic stereo excerpt; never overwrite existing fixtures."""
from pathlib import Path
import sys

import numpy as np
import soundfile as sf


def main():
    target = Path(sys.argv[1])
    target.mkdir(parents=True, exist_ok=False)
    sample_rate = 8000
    source = np.random.default_rng(4701).normal(0, 0.1, (15 * sample_rate, 2))
    start = 42502
    excerpt = source[start:start + 4 * sample_rate].copy() * 0.7
    fade = sample_rate // 5
    excerpt[:fade] *= np.linspace(0, 1, fade)[:, None]
    excerpt[-fade:] *= np.linspace(1, 0, fade)[:, None]
    sf.write(target / 'source.wav', source, sample_rate, subtype='FLOAT')
    sf.write(target / 'excerpt.wav', excerpt, sample_rate, subtype='FLOAT')
    print('Expected offset: 5.31275 seconds; duration: 4 seconds')


if __name__ == '__main__':
    main()
