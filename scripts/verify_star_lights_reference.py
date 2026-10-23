#!/usr/bin/env python3
"""Verify the public 192k song example and optional original WAV, using only stdlib."""
from __future__ import annotations
import argparse
import hashlib
import json
from pathlib import Path
import struct
import wave

EXAMPLE = Path(__file__).resolve().parents[1] / 'examples' / 'star-lights-glow-mystery-liquid-kick'


def digest(path: Path) -> str:
    sha = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            sha.update(chunk)
    return sha.hexdigest()


def check_file(base: Path, doc: dict) -> bytes:
    path = base / doc['path']
    if not path.is_file():
        raise ValueError('missing song reference: ' + str(path))
    if path.stat().st_size != doc['bytes'] or digest(path) != doc['sha256']:
        raise ValueError('song reference digest/size disagrees: ' + doc['path'])
    return path.read_bytes()


def get_id3(data: bytes) -> tuple[dict[str, bytes], int]:
    if data[:3] != b'ID3' or data[3] != 3 or data[4] != 0:
        raise ValueError('expected ID3v2.3 with no unsupported flags')
    if any(b & 0x80 for b in data[6:10]):
        raise ValueError('invalid ID3 sync-safe length')
    size = (data[6] << 21) | (data[7] << 14) | (data[8] << 7) | data[9]
    tag_end = 10 + size
    if tag_end > len(data):
        raise ValueError('truncated ID3 tag')
    frames = {}
    pos = 10
    while pos + 10 <= tag_end and data[pos:pos + 4] != b'\0' * 4:
        code = data[pos:pos + 4].decode('ascii')
        frame_len = int.from_bytes(data[pos + 4:pos + 8], 'big')
        if not 0 < frame_len <= tag_end - pos - 10:
            raise ValueError('bad ID3 frame: ' + code)
        frames[code] = data[pos + 10:pos + 10 + frame_len]
        pos += frame_len + 10
    return frames, tag_end


def id3_string(data: bytes) -> str:
    encoding = data[0]
    return data[1:].decode({0:'latin-1', 1:'utf-16', 2:'utf-16-be', 3:'utf-8'}[encoding]).strip('\0')


def check_cbr_audio(data: bytes, start: int) -> int:
    """Scan every MPEG-1 Layer III frame; reject mixed rates/bitrates/truncation."""
    bitrates = (0,32,40,48,56,64,80,96,112,128,160,192,224,256,320,0)
    samplerates = (44100,48000,32000,0)
    pos = start
    count = 0
    while pos < len(data):
        if pos + 4 > len(data):
            raise ValueError('incomplete MPEG frame header')
        value = struct.unpack_from('>I', data, pos)[0]
        if value & 0xFFE00000 != 0xFFE00000 or ((value >> 19) & 3) != 3 or ((value >> 17) & 3) != 1:
            raise ValueError('invalid MPEG-1 Layer III frame at offset ' + str(pos))
        bitrate = bitrates[(value >> 12) & 15]
        rate = samplerates[(value >> 10) & 3]
        if bitrate != 192 or rate != 44100:
            raise ValueError('non-192kbps CBR or non-44.1kHz audio at frame ' + str(count))
        padding = (value >> 9) & 1
        size = 144000 * bitrate // rate + padding
        if size < 4 or pos + size > len(data):
            raise ValueError('truncated MPEG frame')
        pos += size
        count += 1
    if count < 1000:
        raise ValueError('far too few audio frames for the verified source')
    return count


def verify(base: Path = EXAMPLE, source_wav: Path | None = None) -> dict:
    evidence = json.loads((base / 'evidence.json').read_text(encoding='utf-8'))
    canonical = json.loads((base / 'canonical.json').read_text(encoding='utf-8'))
    if evidence['schema'] != 'stemlab.song-source-reference.v1':
        raise ValueError('unsupported song reference')
    if canonical['title'] != evidence['title'] or canonical['artist'] != evidence['artist'] or canonical['bpm'] is not None:
        raise ValueError('canonical metadata must preserve identity and unknown BPM')
    source = evidence['canonical_lossless_master']
    audio_meta = evidence['listening_and_analysis_derivative']
    if audio_meta['encoded_from_lossless_master_sha256'] != source['sha256']:
        raise ValueError('MP3 provenance is not linked to original source WAV')
    audio = check_file(base, audio_meta)
    artwork = check_file(base, evidence['artwork'])
    frames, offset = get_id3(audio)
    expected = {'TIT2':'title','TPE1':'artist','TPE2':'album_artist','TALB':'album','TIT3':'subtitle','TRCK':'track_number'}
    for frame, field in expected.items():
        if id3_string(frames[frame]) != evidence['id3'][field]:
            raise ValueError('incorrect MP3 tag ' + frame)
    # The JPEG begins after APIC's MIME/picture type and UTF-16 description.
    apic = frames['APIC']
    if not apic[1:].startswith(b'image/jpeg\0') or b'\xff\xd8\xff' not in apic:
        raise ValueError('missing embedded front-cover JPEG')
    if apic[apic.find(b'\xff\xd8\xff'):] != artwork:
        raise ValueError('embedded APIC differs from canonical cover.jpg')
    count = check_cbr_audio(audio, offset)
    if source_wav is not None:
        if source_wav.stat().st_size != source['bytes'] or digest(source_wav) != source['sha256']:
            raise ValueError('original lossless master WAV does not match SHA-256')
        with wave.open(str(source_wav), 'rb') as master:
            if (master.getframerate(), master.getnchannels(), master.getsampwidth(), master.getnframes()) != (
                source['sample_rate_hz'], source['channels'], 2, source['num_sample_frames']):
                raise ValueError('original WAV PCM identity differs')
    return {'result':'verified','title':canonical['title'],'mpeg_frames':count,
            'mp3_sha256':audio_meta['sha256'],'master_sha256':source['sha256']}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source-wav', type=Path, default=None)
    args = parser.parse_args()
    print(json.dumps(verify(source_wav=args.source_wav),indent=2))

if __name__ == '__main__':
    main()
