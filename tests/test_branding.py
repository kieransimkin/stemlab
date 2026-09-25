from stemlab.branding import (
    ARCADIANS_EPK_URL,
    AUTHOR_NAME,
    AUTHOR_SITE,
    DISTRIBUTION_NAME,
    MY_SONGS_URL,
    PARENT_PROJECT_NAME,
    PROJECT_NAME,
    RELATED_PLUGIN_NAME,
    RELATED_PLUGIN_PLATFORM,
    attribution,
)


def test_attribution_contains_project_and_artist_identity():
    data = attribution()

    assert PROJECT_NAME == "StemLab"
    assert DISTRIBUTION_NAME == "danceflow-stemlab"
    assert PARENT_PROJECT_NAME == "DanceFlow"
    assert RELATED_PLUGIN_NAME == "DanceMoves"
    assert RELATED_PLUGIN_PLATFORM == "WordPress"

    assert AUTHOR_NAME == "Kieran Simkin"
    assert data["website"] == AUTHOR_SITE
    assert data["my_songs"] == MY_SONGS_URL
    assert data["showcase"]["url"] == ARCADIANS_EPK_URL
    assert data["parent_project"] == "DanceFlow"
    assert data["related_components"][0]["name"] == "DanceMoves"
