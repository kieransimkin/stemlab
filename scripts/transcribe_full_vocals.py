"""Retained StemLab full-vocal ASR comparison: no speech-only VAD masking."""
import argparse
import csv
import hashlib
import json
import os
from pathlib import Path
import torch

# Keep installed CUDA DLL directories alive for CTranslate2's lazy encoder.
_dll_handles = []
if os.name == 'nt':
    _torch_lib = Path(torch.__file__).parent/'lib'
    if (_torch_lib/'cublas64_12.dll').exists():
        _dll_handles.append(os.add_dll_directory(str(_torch_lib)))
        os.environ['PATH'] = str(_torch_lib) + os.pathsep + os.environ.get('PATH', '')
from faster_whisper import WhisperModel  # noqa: E402 - CUDA DLL setup must precede imports
from stemlab.speech import repetition_diagnostics  # noqa: E402
from stemlab.word_alignment import reconcile  # noqa: E402

p = argparse.ArgumentParser(description=__doc__)
p.add_argument('analysis', type=Path)
p.add_argument('lyrics', type=Path)
p.add_argument('output', type=Path)
p.add_argument('--model', required=True, type=Path)
p.add_argument('--clip-timestamps', default='0', help='Whisper master-clock start,end pairs for targeted section recovery; default full vocal audio')
args = p.parse_args()
if args.output.exists():
    raise ValueError('Output exists; refusing overwrite')
analysis = json.loads((args.analysis/'analysis.json').read_text(encoding='utf-8'))
vocals = args.analysis/analysis['speech']['source_vocals']
model = WhisperModel(str(args.model), device='cuda', compute_type='float16', local_files_only=True)
segments, info = model.transcribe(str(vocals), language='en', beam_size=5,
                                 word_timestamps=True, vad_filter=False,
                                 condition_on_previous_text=False, temperature=0,
                                 clip_timestamps=args.clip_timestamps)
rows, words = [], []
for s in segments:
    sw = [dict(word=w.word.strip(), start=float(w.start), end=float(w.end),
               probability=float(w.probability)) for w in s.words or []]
    words.extend(sw)
    rows.append(dict(start=s.start, end=s.end, text=s.text, words=sw))
    print(f'{s.start:.2f}-{s.end:.2f}', flush=True)
speech = dict(model=str(args.model), words=words, segments=rows,
              clip_timestamps=args.clip_timestamps,
              condition_on_previous_text=False, vad_filter=False,
              repetition_diagnostics=repetition_diagnostics(rows),
              duration=info.duration, vocals=str(vocals),
              vocals_sha256=hashlib.sha256(vocals.read_bytes()).hexdigest())
args.output.mkdir(parents=True)
(args.output/'whisper.json').write_text(json.dumps(speech, indent=2)+'\n', encoding='utf-8')
result = reconcile(args.lyrics.read_text(encoding='utf-8-sig'), words,
                   analysis['source']['audio']['duration_seconds'])
result['provenance'] = dict(master_sha256=analysis['source']['sha256'],
    lyrics_sha256=hashlib.sha256(args.lyrics.read_bytes()).hexdigest(),
    vocals_sha256=speech['vocals_sha256'], model=str(args.model),
    vad_filter=False, condition_on_previous_text=False)
(args.output/'word-timings.json').write_text(json.dumps(result, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
with (args.output/'word-timings.tsv').open('w', newline='', encoding='utf-8') as f:
    writer = csv.DictWriter(f, fieldnames=list(result['words'][0]), delimiter='\t')
    writer.writeheader()
    writer.writerows(result['words'])
(args.output/'manifest.json').write_text(json.dumps({f.name:hashlib.sha256(f.read_bytes()).hexdigest()
    for f in args.output.iterdir()}, indent=2)+'\n', encoding='utf-8')
print(json.dumps({k:v for k,v in result.items() if k not in ('words','canonical_text')}, indent=2))
