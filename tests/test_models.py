from stemlab.models import FAST_MODEL, FULL_PROFILE, HIGH_PARAMETER_MODELS, MODEL_REGISTRY


def test_full_profile_has_four_high_plus_fast():
    assert len(HIGH_PARAMETER_MODELS) == 4
    assert len(FULL_PROFILE) == 5
    assert FAST_MODEL in FULL_PROFILE
    assert all(m in MODEL_REGISTRY for m in FULL_PROFILE)


def test_mega53_is_dynamic():
    assert MODEL_REGISTRY["mvsep_mega53"].stems is None
