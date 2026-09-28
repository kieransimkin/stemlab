from stemlab.speech import repetition_diagnostics


def test_repetition_diagnostics_flags_decoder_loop():
    result = repetition_diagnostics([{"text": "na " * 20 + "light will win"}])
    assert result["suspicious_decoder_repetition"] is True
    assert result["longest_identical_token_run"] == 20
    assert result["longest_run_token"] == "na"


def test_repetition_diagnostics_does_not_flag_normal_refrain():
    result = repetition_diagnostics([
        {"text": "light will win light will win"},
        {"text": "look within let the light begin"},
        {"text": "light will always win"},
    ])
    assert result["suspicious_decoder_repetition"] is False
    assert result["token_count"] == 16
