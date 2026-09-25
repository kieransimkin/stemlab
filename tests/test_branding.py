from stemlab.branding import ARCADIANS_EPK_URL, AUTHOR_NAME, AUTHOR_SITE, MY_SONGS_URL, attribution


def test_attribution_contains_public_artist_links():
    data = attribution()
    assert AUTHOR_NAME == "Kieran Simkin"
    assert data["website"] == AUTHOR_SITE
    assert data["my_songs"] == MY_SONGS_URL
    assert data["showcase"]["url"] == ARCADIANS_EPK_URL
    assert MY_SONGS_URL.startswith("https://kieransimkin.co.uk/")
