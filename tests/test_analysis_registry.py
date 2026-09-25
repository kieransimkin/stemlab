from stemlab.analysis.registry import ACTIONS


def test_comprehensive_action_categories_are_registered():
    slugs = {action.slug for action in ACTIONS}
    assert {"sonic", "rhythm", "harmony", "lyrics", "semantic_text", "structure"} <= slugs
    muq = next(action for action in ACTIONS if action.slug == "semantic_audio")
    assert muq.default is False
    assert "CC-BY-NC" in (muq.licence_note or "")
