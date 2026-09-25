"""Canonical StemLab author, project and showcase links.

Keep public-facing URLs centralised here so package metadata, the web UI,
release notes and generated reports all agree about authorship and provenance.
"""

AUTHOR_NAME = "Kieran Simkin"
AUTHOR_SITE = "https://kieransimkin.co.uk/"
MY_SONGS_URL = "https://kieransimkin.co.uk/my-songs/"
ABOUT_URL = "https://kieransimkin.co.uk/about-me/"
CONTACT_URL = "https://kieransimkin.co.uk/contact/"
ARCADIANS_EPK_URL = "https://kieransimkin.co.uk/arcadians/"
REPOSITORY_URL = "https://github.com/kieransimkin/stemlab"
ISSUES_URL = "https://github.com/kieransimkin/stemlab/issues"

PUBLIC_LINKS = {
    "author": AUTHOR_SITE,
    "songs": MY_SONGS_URL,
    "about": ABOUT_URL,
    "contact": CONTACT_URL,
    "arcadians": ARCADIANS_EPK_URL,
    "repository": REPOSITORY_URL,
    "issues": ISSUES_URL,
}


def attribution() -> dict[str, object]:
    """Machine-readable attribution embedded in generated analysis reports."""
    return {
        "author": AUTHOR_NAME,
        "website": AUTHOR_SITE,
        "my_songs": MY_SONGS_URL,
        "repository": REPOSITORY_URL,
        "showcase": {
            "title": "Arcadians",
            "url": ARCADIANS_EPK_URL,
        },
    }
