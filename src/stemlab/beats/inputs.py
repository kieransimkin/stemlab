"""Select explicitly labelled percussion inputs without inferring roles from audio.

Sources retain their separator identity. Two separators' drum estimates are two
hypotheses, not two independent beat detectors when constructing consensus.
"""
from __future__ import annotations

from dataclasses import dataclass
import hashlib
from pathlib import Path
import re

from stemlab.types import BeatResult, StemArtifact
from stemlab.util import sha256_file, slugify

# Separator labels only: never substring-match a filename such as "drumless".
_PERCUSSION = {'drum', 'drums', 'drumkit', 'percussion', 'percussive', 'kick', 'snare',
               'hihat', 'cymbal', 'cymbals', 'tom', 'toms', 'tambourine', 'bongo',
               'bongos', 'conga', 'congas', 'shaker', 'shakers', 'clap', 'claps'}
_NEGATIVE = {'no', 'non', 'without', 'minus', 'drumless', 'percussionless'}


def is_percussion(stem: str) -> bool:
    tokens = set(re.findall(r'[a-z0-9]+', stem.casefold()))
    return (not tokens & _NEGATIVE and
            bool(tokens & _PERCUSSION or {'hi', 'hat'} <= tokens))


@dataclass(frozen=True)
class BeatInput:
    id: str
    path: Path
    kind: str
    separator: str | None = None
    stem: str | None = None

    def metadata(self, root: Path) -> dict:
        path = self.path.resolve()
        try:
            relative = path.relative_to(root.resolve()).as_posix()
        except ValueError:
            relative = str(path)
        return {'id': self.id, 'kind': self.kind, 'separator': self.separator,
                'stem': self.stem, 'path': relative, 'sha256': sha256_file(path)}


def beat_inputs(master: Path, stems: list[StemArtifact]) -> list[BeatInput]:
    """Master first, then all labelled percussion stems in stable order.

    Duplicate resolved paths run only once. No arbitrary stem count limit, stem
    synthesis, HPSS substitution, or hidden preferred-separator selection.
    """
    result = [BeatInput('master', master.resolve(), 'master')]
    seen = {master.resolve()}
    for stem in sorted(stems, key=lambda s: (s.model, s.stem, str(s.path))):
        path = stem.path.resolve()
        if not is_percussion(stem.stem) or path in seen:
            continue
        seen.add(path)
        # Include the actual stem filename for the rare repeated model/label case.
        identity = '\0'.join((stem.model, stem.stem, path.name))
        suffix = hashlib.sha256(identity.encode()).hexdigest()[:12]
        readable = slugify(stem.model+'-'+stem.stem)[:70]
        identifier = readable+'-'+suffix
        used = {item.id for item in result}
        base, serial = identifier, 2
        while identifier in used:
            identifier = base+'-'+str(serial)
            serial += 1
        result.append(BeatInput(identifier, path, 'stem', stem.model, stem.stem))
    return result


def attributed_result(result: BeatResult, source: BeatInput, root: Path,
                      *, demixed: bool = False) -> BeatResult:
    """Keep legacy master IDs and add unique source-qualified stem IDs."""
    detector = result.metadata.get('detector', result.model)
    name = result.model if source.kind == 'master' else result.model+'__'+source.id
    provenance = source.metadata(root)
    if demixed:
        provenance.update(id='demixed', kind='demixed',
                          note='Five demixed instrument streams; path is the master reference, not a single-waveform inference')
    return BeatResult(name, result.beats, result.downbeats, result.tempo_bpm,
                      {**result.metadata, 'detector': detector, 'source': provenance,
                       'time_reference': 'seconds from original master start; no phase shifting or tempo correction'})
