"""Reproducible synthetic master/stems, single N-D recording and comparison batch.
No music downloads, model inference, or third-party recordings are involved.
"""
from pathlib import Path
import argparse
import json
import numpy as np
import soundfile as sf
from stemlab.util import sha256_file
from stemlab.analysis.rudiment_recordings import AxisSpec
from stemlab.analysis.rudiment_batch import export_single, generate_batch
from stemlab.analysis.rudiment_pairs import generate_stem_batch, generate_average_comparison_batch


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--max-candidates', type=int, default=48)
    args = parser.parse_args()
    root = args.output
    if root.exists():
        parser.error('Choose a new output directory')
    source = root/'source'
    source.mkdir(parents=True)
    sr, bpm = 16000, 120
    t = np.arange(sr*8)/sr
    rng = np.random.default_rng(17)
    tracks = {
        'bass': .4*np.sin(2*np.pi*65.4*t)*np.exp(-np.mod(t, .5)*10),
        'treble': .16*np.sin(2*np.pi*3800*t)*np.exp(-np.mod(t+.25, .5)*35),
        'lead': .2*np.sin(2*np.pi*440*t)*(.35+.65*np.sin(np.pi*t/2)**2),
        'drums': .2*rng.normal(size=len(t))*np.exp(-np.mod(t+.1, 1)*50),
    }
    master = sum(tracks.values())
    gain = .9/max(1., np.max(np.abs(master)))
    for name, samples in dict(master=master, **tracks).items():
        sf.write(source/(name+'.wav'), samples*gain, sr, subtype='PCM_16')
    manifest = dict(source=dict(copied_path='master.wav', sha256=sha256_file(source/'master.wav')),
                    models=[dict(spec={'slug': 'synthetic'}, stems=[dict(stem=n, path=n+'.wav') for n in tracks])],
                    beats=[dict(model='synthetic_score', tempo_bpm=bpm, beats=16)])
    (source/'analysis.json').write_text(json.dumps(manifest, indent=2)+'\n')
    (source/'beats').mkdir()
    (source/'beats/synthetic_score.json').write_text(json.dumps(dict(model='synthetic_score', tempo_bpm=bpm, beats=np.arange(0,8,.5).tolist()))+'\n')
    timing = dict(bpm=bpm, bpm_status='confirmed', bpm_source='synthetic score', beat_zero_seconds=0., phase_status='supplied')
    export_single(source/'master.wav', root/'bass-treble', [
        AxisSpec('bass', source/'master.wav', low_pass=180),
        AxisSpec('treble', source/'master.wav', high_pass=3000, mode='average'),
    ], timing=timing, normalization='per-axis', include_audio=True, name='bass_treble')
    single = export_single(source/'master.wav', root/'single', [
        AxisSpec('bass', source/'master.wav', low_pass=180),
        AxisSpec('treble', source/'master.wav', high_pass=3000, mode='average'),
        AxisSpec('drums', source/'drums.wav'), AxisSpec('lead', source/'lead.wav'),
        AxisSpec('overall', source/'master.wav', mode='average'),
        AxisSpec('reverse_bass', source/'bass.wav', gain=-1),
    ], timing=timing, normalization='per-axis', include_audio=True)
    batch = generate_batch(source, root/'batch', bpm=bpm, confirmed=True, beat_zero=0.,
                           dimensions=(2,3,6), max_candidates=args.max_candidates, seed=17,
                           include_audio=True, progress=print)
    stem_pairs = generate_stem_batch(source, root/'stem-pairs', bpm=bpm, confirmed=True,
        max_candidates=36, include_audio=True)
    averages = generate_average_comparison_batch(source, root/'averages', bpm=bpm, confirmed=True,
        max_pairs=18, include_audio=True)
    print(json.dumps(dict(single=single['harness'], batch=batch['harness'],
                         stem_pairs=stem_pairs['harness'], averages=averages['harness']), indent=2))


if __name__ == '__main__':
    main()
