from stemlab.manifest import write_manifest


def test_manifest_hashes_files(tmp_path):
    (tmp_path / "a.txt").write_text("abc", encoding="utf-8")
    path = write_manifest(tmp_path)
    text = path.read_text(encoding="utf-8")
    assert "a.txt" in text
    assert "ba7816bf8f01cfea" in text
