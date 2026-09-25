from __future__ import annotations

from dataclasses import asdict, dataclass


@dataclass(frozen=True)
class AnalysisAction:
    slug: str
    category: str
    title: str
    default: bool
    dependency: str
    output: str
    description: str
    upstream: str | None = None
    licence_note: str | None = None

    def to_dict(self) -> dict:
        return asdict(self)


ACTIONS: tuple[AnalysisAction, ...] = (
    AnalysisAction(
        "sonic",
        "sonic",
        "Loudness, dynamics, timbre and stereo",
        True,
        "librosa + pyloudnorm",
        "deep/sonic/sonic.json",
        "BS.1770 integrated loudness, sample/oversampled peak, crest factor, short-term range, spectral centroid/bandwidth/rolloff/flatness/contrast and stereo correlation/width.",
        "https://github.com/csteinmetz1/pyloudnorm",
    ),
    AnalysisAction(
        "rhythm",
        "rhythmic",
        "Groove and meter evidence fusion",
        True,
        "librosa + StemLab beat detectors",
        "deep/rhythm/rhythm.json",
        "Meter estimate, tempo stability/drift, onset density, periodicity, offbeat-energy syncopation proxy, swing placement and grid error.",
    ),
    AnalysisAction(
        "harmony",
        "harmonic",
        "Chord/key/progression evidence fusion",
        True,
        "Vamp Plugin Pack + numpy",
        "deep/harmony/harmony.json",
        "Collapses Chordino segments, extracts progression n-grams and chord durations, harmonic rhythm, tuning, tonal changes, pitch-class entropy and an independent chroma-based key ranking.",
    ),
    AnalysisAction(
        "lyrics",
        "lyrical",
        "Rhyme, repetition and prosody",
        True,
        "cmudict",
        "deep/lyrics/lyrics.json",
        "Phonetic end-rhyme scheme/classes, internal-to-end rhyme density, syllable/word delivery rate, repeated hooks/ngrams and lexical statistics from canonical lyrics or Whisper fallback.",
    ),
    AnalysisAction(
        "semantic_text",
        "semantic",
        "Lyric semantic embeddings",
        True,
        "sentence-transformers",
        "deep/semantic_text/semantic_text.json",
        "Theme similarities, semantic continuity and unsupervised line clusters. Scores remain labelled as embedding similarity rather than probabilities.",
        "https://www.sbert.net/",
    ),
    AnalysisAction(
        "structure",
        "structural/rhythmic",
        "All-In-One functional song structure",
        True,
        "all-in-one-infer >= 3.1",
        "deep/structure/structure.json",
        "Modern PyTorch-compatible Harmonix model for BPM, beats, downbeats and intro/verse/chorus/bridge/outro-style functional sections, with raw activations.",
        "https://github.com/openmirlab/all-in-one-infer",
    ),
    AnalysisAction(
        "song_map",
        "cross-domain",
        "Section-level song map",
        True,
        "StemLab evidence fusion",
        "deep/song_map/song_map.json",
        "Uses canonical, All-In-One or Segmentino sections and summarizes sonic energy/timbre, onsets/beats, chords and timed lyrics inside each section; compares learned boundaries against canonical artist structure when both exist.",
    ),
    AnalysisAction(
        "semantic_audio",
        "semantic",
        "MuQ-MuLan zero-shot audio/text semantics",
        False,
        "muq",
        "deep/semantic_audio/semantic_audio.json",
        "CLIP-like music/text similarities for mood, style and production descriptors.",
        "https://github.com/tencent-ailab/MuQ",
        "Released model weights are CC-BY-NC 4.0; opt-in only.",
    ),
    AnalysisAction(
        "basic_pitch",
        "melodic/harmonic",
        "Basic Pitch stem transcription",
        False,
        "basic-pitch (Python < 3.12 recommended)",
        "deep/basic_pitch/report.json",
        "Neural note/MIDI/pitch-bend transcription on isolated guitar/piano/bass/vocal stems; complements pYIN and Silvet.",
        "https://github.com/spotify/basic-pitch",
        "Apache-2.0 code/model project; runtime compatibility is the reason it is opt-in.",
    ),
)
