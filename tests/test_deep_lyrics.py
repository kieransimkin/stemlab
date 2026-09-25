from stemlab.analysis.lyrics import analyze_lyrics


def test_phonetic_rhyme_and_repetition(tmp_path):
    lyrics = """Pan in the pines, river in the light
Wildflower fires in the velvet night
Hear the pipes through the valley below
Ancient rivers, timeless flow
Arcadia calling, we rise, we rise
Arcadia calling, we rise, we rise"""
    result = analyze_lyrics(lyrics, tmp_path)
    classes = result["rhyme"]["classes"]
    paired_words = [set(item["end_words"]) for item in classes]
    assert {"light", "night"} in paired_words
    assert {"below", "flow"} in paired_words
    assert any(item["count"] == 2 for item in result["repetition"]["repeated_lines"])
