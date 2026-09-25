from stemlab.canonical import normalise_canonical_metadata


def test_canonical_preserves_arcadians_release_metadata_and_sections():
    value = normalise_canonical_metadata({
        "bpm": 145,
        "title": "Arcadians",
        "artist": "Kieran Simkin",
        "release_date": "2026-09-25",
        "my_songs_url": "https://kieransimkin.co.uk/my-songs/",
        "epk_url": "https://kieransimkin.co.uk/arcadians/",
        "sections": [
            {"start": 0, "label": "Intro"},
            {"start": 57.46, "end": 70.82, "label": "Verse 1"},
        ],
    })
    assert value["title"] == "Arcadians"
    assert value["artist"] == "Kieran Simkin"
    assert value["sections"][0]["end"] == 57.46
    assert value["sections"][1]["label"] == "Verse 1"
