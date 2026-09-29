"""Reproducible synthetic frontend fixture, NOT model-accuracy evidence.

python scripts/loop_demo.py --output /tmp/stemlab-loop-demo --serve
Uses real StemLab loop discovery, preview API and the existing analysis frontend.
Only audio/beat/section inputs are synthetic; no neural models are run.
"""
from __future__ import annotations
import argparse
import json
import shutil
from pathlib import Path
import numpy as np
import soundfile as sf
from scipy.signal import stft
from stemlab.analysis.loops import analyze_existing_loops
from stemlab.util import sha256_file

def create_fixture(destination: Path) -> tuple[str, Path]:
    destination.mkdir(parents=True, exist_ok=True)
    sr = 16000
    t = np.arange(sr * 28, dtype=float) / sr
    phase = t % 0.5
    kick = 0.16 * np.sin(2 * np.pi * 60 * t) * np.exp(-phase * 26)
    bass = 0.06 * np.sin(2 * np.pi * 100 * t)
    vocal = np.zeros_like(t)
    mask = (t % 2 > 0.5) & (t % 2 < 1.2) & (t < 16) | (t >= 15.9) & (t < 24.1)
    vocal[mask] = 0.08 * np.sin(2 * np.pi * 230 * t[mask])
    audio = np.column_stack((bass + kick + vocal, 0.92 * bass + kick + 0.9 * vocal)).astype('float32')
    provisional = destination / 'synthetic-loop-qa.wav'
    sf.write(provisional, audio, sr, subtype='FLOAT')
    digest = sha256_file(provisional)
    root = destination / digest
    (root / 'input').mkdir(parents=True, exist_ok=True)
    (root / '.source').mkdir(exist_ok=True)
    shutil.copyfile(provisional, root / 'input/synthetic-loop-qa.wav')
    shutil.copyfile(provisional, root / '.source/upload.wav')
    provisional.unlink()
    (root / 'stems/fixture').mkdir(parents=True, exist_ok=True)
    sf.write(root / 'stems/fixture/vocals.wav', np.column_stack((vocal, vocal)), sr, subtype='FLOAT')
    (root / 'beats').mkdir(exist_ok=True)
    (root / 'deep/song_map').mkdir(parents=True, exist_ok=True)

    def write(name, value):
        (root / name).write_text(json.dumps(value, indent=2) + '\n', encoding='utf-8')
    sections = [{'start': 0, 'end': 8, 'label': 'Verse 1 · synthetic'}, {'start': 8, 'end': 16, 'label': 'Chorus 1 · synthetic'}, {'start': 16, 'end': 24, 'label': 'Verse 2 · continuous vocal surrogate'}]
    write('deep/song_map/song_map.json', {'section_source': 'supplied synthetic annotations', 'sections': sections})
    write('beats/fixture.json', {'model': 'fixture_grid', 'beats': np.arange(0, 28.01, 0.5).tolist(), 'downbeats': np.arange(0, 28.01, 2).tolist(), 'tempo_bpm': 120})
    write('canonical.json', {'title': 'Synthetic loop QA — supplied grid, not an artist recording'})
    write('analysis.json', {'source': {'copied_path': 'input/synthetic-loop-qa.wav', 'sha256': digest}, 'models': [{'stems': [{'model': 'fixture', 'stem': 'vocals', 'path': 'stems/fixture/vocals.wav'}]}], 'fixture_note': 'Synthetic audio and supplied section/grid annotations; no neural inference.'})
    (root / 'spectrograms').mkdir(exist_ok=True)
    for name, data in [('master', audio[:, 0]), ('vocals', vocal)]:
        frequencies, times, z = stft(data, fs=sr, nperseg=512, noverlap=384)
        power = np.abs(z) ** 2
        db = 10 * np.log10(np.maximum(power, 1e-12) / max(float(power.max()), 1e-12))
        np.savez_compressed(root / f'spectrograms/{name}.npz', magnitude_db=np.maximum(db, -100).astype('float32'), times_seconds=times, frequencies_hz=frequencies, sample_rate=sr, n_fft=512, hop_length=128)
    report = analyze_existing_loops(root, export_audio=True)
    assert report['loop_count'] == 2 and len(report['unresolved_sections']) == 1, report
    return (digest, root)

def demo_app(results: Path):
    from fastapi import FastAPI, HTTPException
    from fastapi.responses import FileResponse
    from stemlab.webui import install_routes, index_response, _public_result_path
    app = FastAPI()

    class Status:

        def status(self, song_hash):
            return {'state': 'completed', 'message': 'Synthetic QA fixture; no models run'}
    install_routes(app, results_dir_provider=lambda: results, scheduler_provider=Status)
    app.get('/')(index_response)

    @app.get('/{song_hash}/{rel_path:path}')
    def result_file(song_hash: str, rel_path: str):
        try:
            _, path = _public_result_path(results, song_hash, rel_path)
            if not path.is_file():
                raise FileNotFoundError()
        except (ValueError, FileNotFoundError) as exc:
            raise HTTPException(404, 'Not found') from exc
        return FileResponse(path)
    return app

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, default=Path('loop-demo-results'))
    parser.add_argument('--serve', action='store_true')
    parser.add_argument('--port', type=int, default=8765)
    args = parser.parse_args()
    digest, _ = create_fixture(args.output.resolve())
    print(f'http://127.0.0.1:{args.port}/?hash={digest}', flush=True)
    if args.serve:
        import uvicorn
        uvicorn.run(demo_app(args.output.resolve()), host='127.0.0.1', port=args.port)
if __name__ == '__main__':
    main()
