"""Generate source-bound synthetic observations; no private music or inference."""
import argparse
import hashlib
import json
from pathlib import Path
import wave

from stemlab.lyric_fusion import REQUEST_SCHEMA
from stemlab.word_alignment import reconcile

TEXT = "Signals cross the quiet night\nVoices find a clear way home\n"


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=False)
    analysis = args.output / "analysis"
    analysis.mkdir()
    master = analysis / "silence.wav"
    with wave.open(str(master), "wb") as stream:
        stream.setparams((1, 2, 1000, 0, "NONE", "not compressed"))
        stream.writeframes(b"\0\0" * 14000)
    sha = hashlib.sha256(master.read_bytes()).hexdigest()

    def write(path, value):
        path.write_text(json.dumps(value, indent=2) + "\n", encoding="utf-8")

    write(analysis / "analysis.json", {"source": {"sha256": sha, "copied_path": "silence.wav"}})
    (args.output / "lyrics.txt").write_text(TEXT, encoding="utf-8")
    candidates = []
    for identity, missing in (("view-a", (2, 8, 10)), ("view-b", (1, 7, 10))):
        observed = [dict(word=word, start=i + 1, end=i + 1.3, probability=.99)
                    for i, word in enumerate(TEXT.split()) if i not in missing]
        result = reconcile(TEXT, observed, 14)
        result["provenance"] = {"master_sha256": sha, "note": "Synthetic evidence; silent source."}
        write(args.output / (identity + ".json"), result)
        candidates.append({"id": identity, "view_id": identity, "path": identity + ".json",
                           "source_clock": "original_master_seconds"})
    write(args.output / "request.json", {"schema": REQUEST_SCHEMA, "analysis": "analysis",
                                        "lyrics": "lyrics.txt", "candidates": candidates})
    print(args.output / "request.json")


if __name__ == "__main__":
    main()
