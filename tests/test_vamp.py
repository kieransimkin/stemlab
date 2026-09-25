from stemlab.vamp import parse_sonic_annotator_csv


def test_parse_sonic_annotator_csv_labels_values_and_end_times():
    text = (
        '0.000000000,0.500000000,"C"\n'
        '0.500000000,1.000000000,440.0\n'
        '1.000000000,1.500000000,523.25,96.0,"C5"\n'
    )
    events = parse_sonic_annotator_csv(text)
    assert events[0] == {
        "start": 0.0,
        "end": 0.5,
        "values": [],
        "label": "C",
    }
    assert events[1]["values"] == [440.0]
    assert events[2]["values"] == [523.25, 96.0]
    assert events[2]["label"] == "C5"
