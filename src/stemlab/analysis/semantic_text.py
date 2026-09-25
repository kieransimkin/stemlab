from __future__ import annotations

from pathlib import Path
from typing import Any

import numpy as np

from stemlab.util import write_json

THEME_PROMPTS = [
    "nature and the natural world",
    "technology and machines",
    "love and intimacy",
    "friendship and shared experience",
    "memory and nostalgia",
    "freedom and resistance",
    "identity and self-understanding",
    "politics and social commentary",
    "spirituality and transcendence",
    "place, travel and landscape",
    "loss, grief and mortality",
    "celebration and collective energy",
    "humour, absurdity and satire",
    "work, bureaucracy and institutions",
    "time, change and impermanence",
]


def _cosine_rows(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    a = np.asarray(a, dtype=np.float32)
    b = np.asarray(b, dtype=np.float32)
    a = a / np.maximum(np.linalg.norm(a, axis=-1, keepdims=True), 1e-9)
    b = b / np.maximum(np.linalg.norm(b, axis=-1, keepdims=True), 1e-9)
    return a @ b.T


def analyze_text_semantics(
    text: str,
    output_dir: Path,
    *,
    model_name: str = "sentence-transformers/all-MiniLM-L6-v2",
    theme_prompts: list[str] | None = None,
) -> dict[str, Any]:
    """Embed lyrics/transcript and expose theme similarity + semantic sections.

    Scores are cosine similarities to descriptive prompts, not calibrated
    probabilities. Keeping that distinction in the output avoids turning an
    embedding-space heuristic into an overconfident classifier.
    """
    from sentence_transformers import SentenceTransformer

    output_dir.mkdir(parents=True, exist_ok=True)
    prompts = theme_prompts or THEME_PROMPTS
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if not lines:
        raise ValueError("No text available for semantic analysis")

    model = SentenceTransformer(model_name)
    text_emb = model.encode([text], normalize_embeddings=True, show_progress_bar=False)
    prompt_emb = model.encode(prompts, normalize_embeddings=True, show_progress_bar=False)
    scores = _cosine_rows(text_emb, prompt_emb)[0]
    ranked = sorted(zip(prompts, scores.tolist()), key=lambda item: item[1], reverse=True)

    line_emb = model.encode(lines, normalize_embeddings=True, show_progress_bar=False)
    consecutive_similarity = None
    if len(lines) > 1:
        consecutive_similarity = float(np.mean(np.sum(line_emb[:-1] * line_emb[1:], axis=1)))

    clusters: list[dict[str, Any]] = []
    if len(lines) >= 4:
        try:
            from sklearn.cluster import KMeans

            k = min(6, max(2, int(round((len(lines) / 2.0) ** 0.5))))
            labels = KMeans(n_clusters=k, random_state=7, n_init="auto").fit_predict(line_emb)
            for cluster_id in range(k):
                idx = np.flatnonzero(labels == cluster_id)
                if not len(idx):
                    continue
                centre = np.mean(line_emb[idx], axis=0)
                centre /= max(float(np.linalg.norm(centre)), 1e-9)
                sims = line_emb[idx] @ centre
                representative = int(idx[int(np.argmax(sims))])
                clusters.append(
                    {
                        "cluster": cluster_id,
                        "line_indexes": [int(i) for i in idx],
                        "representative_line_index": representative,
                        "representative_line": lines[representative],
                        "size": int(len(idx)),
                    }
                )
        except Exception:
            clusters = []

    result = {
        "model": model_name,
        "score_semantics": "cosine similarity in sentence-embedding space; not probability",
        "theme_similarity": [
            {"theme": label, "similarity": float(score)} for label, score in ranked
        ],
        "semantic_continuity": {
            "mean_consecutive_line_similarity": consecutive_similarity,
        },
        "line_clusters": clusters,
        "lines": lines,
        "embedding_file": "text_embeddings.npz",
    }
    np.savez_compressed(
        output_dir / "text_embeddings.npz",
        full_text=text_emb.astype(np.float32),
        lines=line_emb.astype(np.float32),
        themes=prompt_emb.astype(np.float32),
        theme_labels=np.asarray(prompts, dtype=str),
    )
    write_json(output_dir / "semantic_text.json", result)
    return result
