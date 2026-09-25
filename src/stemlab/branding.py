"""Canonical StemLab project identity, author attribution and public links."""

PROJECT_NAME = "StemLab"
DISTRIBUTION_NAME = "danceflow-stemlab"
PARENT_PROJECT_NAME = "DanceFlow"
RELATED_PLUGIN_NAME = "DanceMoves"
RELATED_PLUGIN_PLATFORM = "WordPress"
WORKFLOW_NAME = "DanceFlow BPM and motion-response workflow"
PROJECT_DESCRIPTION = (
    "StemLab is the audio-analysis engine in DanceFlow's BPM and motion-response "
    "workflow, including downstream use by the WordPress DanceMoves plugin."
)

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
    """Machine-readable identity embedded in generated analysis/release metadata."""
    return {
        "project": PROJECT_NAME,
        "distribution": DISTRIBUTION_NAME,
        "parent_project": PARENT_PROJECT_NAME,
        "workflow": WORKFLOW_NAME,
        "description": PROJECT_DESCRIPTION,
        "author": AUTHOR_NAME,
        "website": AUTHOR_SITE,
        "my_songs": MY_SONGS_URL,
        "repository": REPOSITORY_URL,
        "related_components": [
            {
                "name": RELATED_PLUGIN_NAME,
                "platform": RELATED_PLUGIN_PLATFORM,
                "role": "motion-response / WordPress integration",
            }
        ],
        "showcase": {
            "title": "Arcadians",
            "url": ARCADIANS_EPK_URL,
        },
    }
