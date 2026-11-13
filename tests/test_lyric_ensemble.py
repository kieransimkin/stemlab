import json

import numpy as np
import soundfile as sf
from typer.testing import CliRunner

from stemlab.cli import app
from stemlab.util import sha256_file


def test_saved_ensemble_keeps_crop_evidence_and_hands_off_to_display(tmp_path):
    master = tmp_path / "master.wav"
    sf.write(master, np.zeros(32_000), 16_000)
    digest = sha256_file(master)
    request = tmp_path / "request.json"
    result = tmp_path / "ensemble.json"
    display = tmp_path / "display.json"
    document = dict(schema="stemlab.lyric-boundary-request.v1", source_sha256=digest,
                    num_frames=32_000, sample_rate=16_000, canonical_text="Go\n\nAgain")
    qwen = dict(source="qwen-run", family="qwen", strength=.99, frame=10_000,
                crop_repeat=dict(original_crop_frames=[10_000, 28_000], repeat_crop_frames=[2_800, 28_000], frame=2_800))
    whisper = dict(source="whisper-run", family="whisper", strength=.7)
    document["words"] = [
        dict(line=1, word="Go", onset=[qwen, dict(whisper, frame=11_000)], release=[dict(whisper, frame=17_000)]),
        dict(line=3, word="Again", onset=[], release=[]),
    ]
    request.write_text(json.dumps(document), encoding="utf-8")
    original = request.read_bytes()
    cli = CliRunner()
    args = ["lyric-ensemble", str(request), "--master", str(master), "-o", str(result)]
    run = cli.invoke(app, args)
    assert run.exit_code == 0, run.output
    saved = json.loads(result.read_text(encoding="utf-8"))
    assert saved["words"][0]["onset"]["frame"] == 11_000
    assert saved["words"][0]["crop_checks"][0]["review_reasons"] == ["follows_decode_crop_edge"]
    assert saved["words"][1]["onset"] is None
    assert request.read_bytes() == original and sha256_file(master) == digest
    run = cli.invoke(app, ["lyric-display", str(result), "-o", str(display)])
    assert run.exit_code == 0, run.output
    lines = json.loads(display.read_text(encoding="utf-8"))["lines"]
    assert [(r["physical_lyric_line"], r["display_start"], r["display_clear"]) for r in lines] == [
        (1, 11_000 / 16_000, 17_000 / 16_000), (3, None, None),
    ]
    other_master = tmp_path / "other.wav"
    sf.write(other_master, np.full(32_000, .1), 16_000)
    bad_output = tmp_path / "no-output.json"
    run = cli.invoke(app, ["lyric-ensemble", str(request), "--master", str(other_master), "-o", str(bad_output)])
    assert run.exit_code != 0 and not bad_output.exists()
