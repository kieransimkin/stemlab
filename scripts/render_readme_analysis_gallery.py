"""Generate documentation ILLUSTRATIONS, not React frontend screenshots.

Only Arcadians sections, lyric timing/text and BPM use stored reference metadata.
Other patterns are schematic; no audio is decoded and no analysis models run.
Run from a StemLab checkout: python scripts/render_readme_analysis_gallery.py
"""
from __future__ import annotations

import json
import math
import textwrap
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'screenshots'
REF = ROOT / 'src' / 'stemlab' / 'web' / 'arcadians-reference.json'
BG = '#0b1020'
PANEL = '#17213b'
TEXT = '#e5ecff'
MUTED = '#acbbda'
PALETTE = ['#8fc7ff', '#7cff9d', '#f8c14d', '#ff9bbb', '#bba4ff']


def text(parts, x, y, value, size=17, fill=TEXT, weight='normal'):
    parts.append(
        f'<text x="{x:.2f}" y="{y:.2f}" fill="{fill}" font-size="{size}" '
        f'font-weight="{weight}" font-family="Arial, Helvetica, sans-serif">'
        f'{escape(str(value))}</text>'
    )


def rect(parts, x, y, width, height, fill=PANEL, radius=9, opacity=1):
    parts.append(
        f'<rect x="{x:.2f}" y="{y:.2f}" width="{width:.2f}" '
        f'height="{height:.2f}" rx="{radius}" fill="{fill}" opacity="{opacity}"/>'
    )


def begin(title, subtitle):
    p = ['<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="940" '
         'viewBox="0 0 1600 940" role="img">',
         f'<title>{escape(title)}</title>',
         '<desc>Documentation illustration, not a screenshot. Only explicitly '
         'marked Arcadians reference metadata is real; other patterns are schematic.</desc>']
    rect(p, 0, 0, 1600, 940, BG, radius=0)
    text(p, 38, 43, 'STEMLAB / DANCEFLOW', 17, PALETTE[1], 'bold')
    text(p, 38, 89, title, 29, TEXT, 'bold')
    text(p, 38, 122, subtitle, 17, MUTED)
    rect(p, 38, 144, 1524, 48, '#392b18')
    text(p, 54, 174, 'ILLUSTRATION ONLY — not the React component; no audio analysis or neural inference performed.', 17, '#ffe0a0')
    text(p, 38, 911, 'Kieran Simkin · Arcadians reference metadata where labelled · Other data is schematic, not measured.', 16, MUTED)
    return p


def ruler(p, start, end, y=237):
    for i in range(9):
        x = 310 + 1240 * i / 8
        t = start + (end-start) * i / 8
        label = f'{int(t // 60):02d}:{int(t % 60):02d}'
        text(p, x-7, y-10, label, 14, MUTED)
        p.append(f'<path d="M{x:.2f},{y} V670" stroke="#273652" stroke-width="1"/>')


def lane(p, y, label, detail):
    rect(p, 38, y, 250, 74)
    text(p, 52, y+28, label, 17, TEXT, 'bold')
    for i, line in enumerate(textwrap.wrap(detail, 30)[:2]):
        text(p, 52, y+49+i*16, line, 13, MUTED)


def blocks(p, values, y, start, end, height=52):
    for i, value in enumerate(values):
        left, right = max(start, float(value['start'])), min(end, float(value['end']))
        if right <= left:
            continue
        x = 310+1240*(left-start)/(end-start)
        w = 1240*(right-left)/(end-start)
        rect(p, x, y, max(1, w-2), height, PALETTE[i % len(PALETTE)], radius=5)
        label = str(value.get('label', value.get('text', '')))
        if w > 35:
            width = max(3, int(w/8.3)-2)
            label = label if len(label) <= width else label[:max(1,width-1)]+'…'
            text(p, x+7, y+29, label, 14, '#101a2c', 'bold')


def pattern(p, y, seed):
    """Schematic colour pattern; explicitly not a spectrogram measurement."""
    for i in range(80):
        for j in range(7):
            intensity = abs(math.sin((i+j+seed)*0.33))
            fill = ['#243c69', '#466496', '#598eb9', '#86bfd0', '#dcbb7c'][int(intensity*4)]
            rect(p, 310+15.5*i, y+10*j, 15.7, 10.3, fill, radius=0)
    rect(p, 318, y+7, 410, 26, '#101a2c')
    text(p, 326, y+26, 'SCHEMATIC PATTERN — not audio-derived', 14, TEXT)


def card(p, x, y, width, title, lines, colour=0, height=164):
    rect(p, x, y, width, height)
    rect(p, x, y, width, 5, PALETTE[colour], radius=2)
    text(p, x+17, y+34, title, 19, TEXT, 'bold')
    yy = y+62
    for line in lines:
        for wrapped in textwrap.wrap(line, max(16,int((width-34)/8.5))):
            text(p, x+17, yy, wrapped, 15, MUTED)
            yy += 21
        yy += 6


def save(p, name):
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT/name).write_text('\n'.join(p+['</svg>'])+'\n', encoding='utf-8')


def overview(data):
    sections = data.get('sections', [])
    duration = max([float(s['end']) for s in sections] + [float(e['end']) for e in data['lyric_timing']])
    p = begin('Arcadians: reference sections and analysis lane concepts',
              'Sections and BPM are artist-authored reference data; coloured patterns below are not actual stem renders.')
    ruler(p, 0, duration)
    lane(p, 253, 'REFERENCE SECTIONS', 'Artist-supplied metadata')
    blocks(p, sections, 263, 0, duration)
    lane(p, 336, 'REFERENCE TEMPO', f"{data['bpm']:g} BPM; no beat detector run")
    rect(p, 310, 345, 1240, 52, '#101a2c')
    for i in range(int(duration*float(data['bpm'])/60)+1):
        x = 310+1240*(i*60/float(data['bpm']))/duration
        p.append(f'<path d="M{x:.2f},349 V393" stroke="#8fc7ff" opacity="0.5"/>')
    lane(p, 419, 'MASTER', 'Spectrogram layout concept')
    pattern(p, 419, 1)
    lane(p, 502, 'VOCALS', 'Stem layout concept only')
    pattern(p, 502, 4)
    lane(p, 585, 'DRUMS', 'Stem layout concept only')
    pattern(p, 585, 7)
    card(p, 38, 700, 490, 'Inspect alignment', ['Compare the master, stems and beat grids on one clock. Actual results require running StemLab.'], 1)
    card(p, 547, 700, 490, 'Locate the source artifacts', ['spectrograms/*.png and *.npz', 'beats/*.json and *.tsv', 'deep/structure/structure.json'], 0)
    card(p, 1056, 700, 494, 'Reference versus prediction', ['The 145 BPM reference grid shown starts at zero for illustration; it is not detected beat or downbeat evidence.'], 2)
    save(p, 'analysis-overview-arcadians.svg')


def lyrics(data):
    events = data['lyric_timing']
    start = max(0, float(events[0]['start'])-2)
    end = float(events[7]['end'])+1
    p = begin('Arcadians: canonical lyric timing and transcript comparison',
              'The lyric text and line times below are real reference metadata; no Whisper transcript has been inferred.')
    ruler(p, start, end)
    lane(p, 258, 'CANONICAL LYRICS', 'Artist-supplied line timings')
    blocks(p, events, 268, start, end)
    lane(p, 350, 'WHISPER WORDS', 'Not generated for this gallery')
    rect(p, 310, 350, 1240, 74)
    text(p, 331, 390, 'Run the speech route to populate the actual word-aligned transcript; reference lines are not word estimates.', 17, MUTED)
    lane(p, 442, 'VOCAL ACTIVITY', 'No activity detector run')
    rect(p, 310, 442, 1240, 74)
    text(p, 331, 482, 'No vocal-clear windows claimed. Missing speech detection does not prove the absence of singing.', 17, MUTED)
    card(p, 38, 553, 740, 'Reference excerpt', [str(e['text']) for e in events[:5]], 1, height=302)
    card(p, 804, 553, 746, 'Analysis and outputs', ['speech/whisper.json — actual words, segments and diagnostics', 'speech/transcript.srt and words.tsv — exported timings', 'deep/lyrics/lyrics.json — rhyme, repetition and delivery metrics', 'Canonical references and inferred timings should remain distinguishable.'], 0, height=302)
    save(p, 'analysis-lyrics-arcadians.svg')


def harmony():
    p = begin('Harmony, melody and section-level song-map fusion',
              'Generic schematic examples — these chords and note blocks are not measurements of Arcadians.')
    ruler(p, 0, 32)
    lane(p, 254, 'CHORDS', 'Illustrative progression')
    events = [{'start':i*4,'end':(i+1)*4,'label':label} for i,label in enumerate(['Am','F','C','G','Am','F','C','G'])]
    blocks(p, events, 264, 0, 32)
    lane(p, 350, 'MELODY / NOTES', 'Schematic note blocks')
    rect(p, 310, 344, 1240, 96, '#101a2c')
    for i in range(30):
        rect(p, 322+i*40, 366+[30,20,10,0,20,30][i%6], 30, 8, PALETTE[1], radius=3)
    lane(p, 468, 'SONG MAP', 'Section aggregation concept')
    blocks(p,[{'start':0,'end':8,'label':'Intro · example'}, {'start':8,'end':20,'label':'Verse · example'}, {'start':20,'end':32,'label':'Chorus · example'}],480,0,32)
    card(p, 38, 592, 490, 'Harmony', ['Vamp chord, chroma, bass-chroma, tuning and key evidence.', 'See vamp/data/ and deep/harmony/.'], 4, height=257)
    card(p, 547, 592, 490, 'Melody and transcription', ['pYIN F0 / monophonic notes and Silvet polyphonic notes.', 'Basic Pitch is an optional stem MIDI/note route.'], 1, height=257)
    card(p, 1056, 592, 494, 'Song map', ['Section summaries combine available sonic, rhythm, chord and lyric evidence.', 'deep/song_map/song_map.json'], 2, height=257)
    save(p, 'analysis-harmony-songmap.svg')


def sonic():
    p = begin('Sonic profile, rhythm regimes and optional semantics',
              'Analysis categories only — no loudness, tempo drift, similarity or stereo measurements are claimed here.')
    card(p, 38, 234, 490, 'Loudness and dynamics', ['Integrated loudness, sample and oversampled peak estimates, crest factor and short-term range.', 'deep/sonic/sonic.json'], 0, height=257)
    card(p, 547, 234, 490, 'Timbre and stereo', ['Centroid, bandwidth, rolloff, flatness and contrast.', 'Channel correlation and width evidence; inspect the actual outputs before interpreting.'], 1, height=257)
    card(p, 1056, 234, 494, 'Rhythm and tempo regimes', ['Meter, tempo stability, onset density, swing and syncopation proxies.', 'Tempo-regime results are embedded in deep/rhythm/rhythm.json.'], 2, height=257)
    card(p, 38, 541, 490, 'Lyric semantics', ['Text embedding theme similarities, continuity and clusters.', 'deep/semantic_text/semantic_text.json', 'Similarity is not probability.'], 4, height=307)
    card(p, 547, 541, 490, 'Optional audio semantics', ['MuQ-MuLan audio/text similarity; explicit opt-in.', 'deep/semantic_audio/semantic_audio.json', 'Check model licence restrictions before use.'], 3, height=307)
    card(p, 1056, 541, 494, 'Inspection and provenance', ['Read deep/summary.json for available actions and errors.', 'Use --audio-semantics or --basic-pitch only when those optional routes are intended.', 'No semantic model was run to create this illustration.'], 0, height=307)
    save(p, 'analysis-sonic-rhythm.svg')


def main():
    data = json.loads(REF.read_text(encoding='utf-8'))
    overview(data)
    lyrics(data)
    harmony()
    sonic()
    print(f'Wrote four clearly labelled illustrations to {OUT}')


if __name__ == '__main__':
    main()
