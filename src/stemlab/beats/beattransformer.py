from __future__ import annotations

import importlib
import sys
from pathlib import Path

import numpy as np

from stemlab.audio import load_audio
from stemlab.bootstrap import ensure_beat_transformer_repo
from stemlab.types import BeatResult, StemArtifact
from stemlab.util import device_string
from .base import BeatBackend
from .common import save_result, tempo_from_beats


class BeatTransformerBackend(BeatBackend):
    FPS = 44100 / 1024

    def __init__(self, bootstrap_external: bool = True, ensemble: bool = True):
        self.bootstrap_external = bootstrap_external
        self.ensemble = ensemble

    @staticmethod
    def _pick(stems: list[StemArtifact], name: str) -> Path | None:
        priority = ["bs_roformer_sw", "scnet_xl_ihf", "htdemucs_ft", "openunmix_umxhq", "mvsep_mega53"]
        for model in priority:
            for s in stems:
                if s.model == model and s.stem.lower() == name:
                    return s.path
        for s in stems:
            if s.stem.lower() == name:
                return s.path
        return None

    def _five_channel_mel(self, master: Path, stems: list[StemArtifact]):
        import torch
        import torchaudio

        paths = {n: self._pick(stems, n) for n in ("vocals", "drums", "bass", "piano", "other", "guitar")}
        required = ["vocals", "drums", "bass", "piano", "other"]
        if any(paths[n] is None for n in required):
            missing = [n for n in required if paths[n] is None]
            raise RuntimeError(
                "Beat Transformer needs five compatible demixed inputs. Missing: " + ", ".join(missing)
                + ". Run BS-RoFormer-SW first."
            )
        waves = {}
        for name, p in paths.items():
            if p is not None:
                w, _ = load_audio(p, target_sr=44100, mono=True)
                waves[name] = w[0]
        # The original model was trained with Spleeter 5-stem. Merge separated guitar back into 'other'.
        if "guitar" in waves:
            n = min(len(waves["other"]), len(waves["guitar"]))
            waves["other"] = waves["other"][:n] + waves["guitar"][:n]
        n = min(len(waves[k]) for k in required)
        transform = torchaudio.transforms.MelSpectrogram(
            sample_rate=44100, n_fft=4096, hop_length=1024, n_mels=128,
            f_min=30.0, f_max=11000.0, power=2.0, center=True,
        )
        specs = []
        for name in required:
            pwr = transform(waves[name][:n]).clamp_min(1e-10)
            # librosa.power_to_db(..., ref=np.max, top_db=80) equivalent per instrument.
            db = 10.0 * torch.log10(pwr)
            db = db - db.max()
            db = torch.clamp(db, min=-80.0)
            specs.append(db.transpose(0, 1))  # time, mel
        length = min(s.shape[0] for s in specs)
        return torch.stack([s[:length] for s in specs], dim=0).unsqueeze(0)  # 1,5,T,128

    def _decode(self, beat_act: np.ndarray, down_act: np.ndarray):
        try:
            import madmom
            beat_tracker = madmom.features.beats.DBNBeatTrackingProcessor(
                min_bpm=55.0, max_bpm=215.0, fps=self.FPS,
                transition_lambda=100, observation_lambda=6, threshold=0.2,
            )
            down_tracker = madmom.features.downbeats.DBNDownBeatTrackingProcessor(
                beats_per_bar=[3, 4], min_bpm=55.0, max_bpm=215.0, fps=self.FPS,
                transition_lambda=100, observation_lambda=6, threshold=0.2,
            )
            beats = np.asarray(beat_tracker(beat_act), dtype=float)
            combined = np.stack((np.maximum(beat_act - down_act, 0.0), down_act), axis=-1)
            de = np.asarray(down_tracker(combined))
            downs = de[de[:, 1] == 1, 0] if de.size else np.empty(0)
            return beats.tolist(), downs.astype(float).tolist(), "madmom-dbn"
        except Exception:
            from scipy.signal import find_peaks
            min_dist = max(1, int(self.FPS * 60.0 / 240.0))
            bi, _ = find_peaks(beat_act, height=0.20, distance=min_dist)
            di, _ = find_peaks(down_act, height=0.20, distance=max(min_dist, int(self.FPS * 0.55)))
            beats = bi / self.FPS
            downs_raw = di / self.FPS
            snapped = []
            for d in downs_raw:
                if len(beats):
                    j = int(np.argmin(np.abs(beats - d)))
                    if abs(beats[j] - d) <= 0.15:
                        snapped.append(float(beats[j]))
            return beats.astype(float).tolist(), sorted(set(snapped)), "scipy-peak-fallback"

    def analyze(self, audio_path: Path, output_dir: Path, stems: list[StemArtifact] | None = None) -> BeatResult:
        import torch

        stems = stems or []
        repo = ensure_beat_transformer_repo(self.bootstrap_external)
        code = repo / "code"
        checkpoints = repo / "checkpoints"
        if not checkpoints.exists():
            checkpoints = repo / "checkpoint"
        if str(code) not in sys.path:
            sys.path.insert(0, str(code))
        module = importlib.import_module("DilatedTransformer")
        model_cls = module.Demixed_DilatedTransformerModel
        x = self._five_channel_mel(audio_path, stems)
        dev = device_string("auto")
        if dev == "mps":
            dev = "cpu"
        ckpts = sorted(checkpoints.glob("fold_*_trf_param.pt"))
        if not ckpts:
            raise RuntimeError(f"No Beat Transformer fold checkpoints found under {checkpoints}")
        if not self.ensemble:
            ckpts = ckpts[:1]
        beat_sum = None
        down_sum = None
        with torch.inference_mode():
            for ckpt in ckpts:
                model = model_cls(
                    attn_len=5, instr=5, ntoken=2, dmodel=256, nhead=8,
                    d_hid=1024, nlayers=9, norm_first=True,
                ).to(dev).eval()
                payload = torch.load(str(ckpt), map_location="cpu", weights_only=True)
                model.load_state_dict(payload["state_dict"] if isinstance(payload, dict) and "state_dict" in payload else payload)
                pred, _ = model(x.float().to(dev))
                p = torch.sigmoid(pred[0]).detach().cpu().numpy()
                beat_sum = p[:, 0] if beat_sum is None else beat_sum + p[:, 0]
                down_sum = p[:, 1] if down_sum is None else down_sum + p[:, 1]
                del model
                if dev == "cuda":
                    torch.cuda.empty_cache()
        beat_act = beat_sum / len(ckpts)
        down_act = down_sum / len(ckpts)
        output_dir.mkdir(parents=True, exist_ok=True)
        np.savez_compressed(
            output_dir / "beat_transformer_activations.npz",
            beat=beat_act.astype(np.float16), downbeat=down_act.astype(np.float16), fps=np.float32(self.FPS),
        )
        beats, downs, decoder = self._decode(beat_act, down_act)
        return save_result(
            BeatResult(
                "beat_transformer", beats, downs, tempo_from_beats(beats),
                {"folds": len(ckpts), "fps": self.FPS, "decoder": decoder, "input": "5 demixed mel streams"},
            ),
            output_dir,
        )
