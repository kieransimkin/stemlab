"""Exact user-supplied song identity; deterministic stdlib-only regression checks."""
from pathlib import Path
import json
import sys
import unittest

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'src'))
sys.path.insert(0, str(ROOT / 'scripts'))
from verify_star_lights_reference import EXAMPLE, verify  # noqa: E402
from stemlab.canonical import load_canonical  # noqa: E402


class StarLightsReferenceTests(unittest.TestCase):
    def test_canonical_master_derivative_id3_and_fixed_bitrate(self):
        result = verify()
        self.assertEqual(result['result'], 'verified')
        self.assertGreater(result['mpeg_frames'], 8000)
        self.assertEqual(result['master_sha256'],
                         '9de00a34643a61eada7bec26da050ad6857d6ea31306ab9104b51cd214799284')
        self.assertEqual(result['mp3_sha256'],
                         '48393fbb5ef5a1afc184ea388ce760612fe0c249c5c2f7caa57e563c6bd2e098')
        canonical = load_canonical(EXAMPLE)
        self.assertEqual(canonical['title'], 'Star Lights Glow (Mystery Liquid Kick)')
        self.assertEqual(canonical['artist'], 'Bass Ben & Friends')
        self.assertIsNone(canonical['bpm'])

    def test_mix_identity_and_unconfirmed_tempo_remain_explicit(self):
        evidence = json.loads((EXAMPLE / 'evidence.json').read_text(encoding='utf-8'))
        self.assertEqual(evidence['selected_mix'], 'Mystery Liquid Kick')
        self.assertIsNone(evidence['musical_analysis']['canonical_bpm'])
        self.assertEqual(evidence['musical_analysis']['downbeat_phase'], 'unverified')
        self.assertEqual(evidence['listening_and_analysis_derivative']['bitrate_bps'], 192000)
        self.assertEqual(evidence['canonical_lossless_master']['num_sample_frames'], 9878444)
        self.assertEqual(evidence['artwork']['sha256'],
                         '664bc2b9bc31407af556ab453fc316cae3d45241c5672c7e019195ce254b6196')


if __name__ == '__main__':
    unittest.main()
