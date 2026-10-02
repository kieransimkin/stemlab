# Complementary evidence models

StemLab keeps optional model outputs as independent evidence. They do **not** replace the master, canonical lyrics, measured beat grid, or artist-approved timing.

## Models

| id | role | preferred input | installation / terms |
| --- | --- | --- | --- |
| `firered_aed` | speech / singing / music intervals | full vocal stem, otherwise master | `.[evidence-vocals]`; Apache-2.0 code/model; explicit AED model directory |
| `heart_transcriptor` | singing-focused lyric recognition | separated vocals | install `heartlib` from HeartMuLa and provide HeartTranscriptor checkpoint; Apache-2.0 current release |
| `qwen_forced_aligner` | align approved text to audio | separated vocals | `.[evidence-align]`; Apache-2.0; supply canonical text |
| `swift_f0` | continuous monophonic pitch/confidence | vocals or another pitched stem | `.[evidence-pitch]`; MIT |
| `songformer` | independent functional sections | master | separately provisioned SongFormer checkout; CC-BY-4.0 code, but checkpoint / representation terms must be reviewed |
| `lv_chordia` | independent neural chord sequence | master | `.[evidence-chords]`; MIT package with bundled weights |
| `adtof_drums` | kick/snare/tom/hat/cymbal events | separated drums, otherwise master | install ADTOF-pytorch separately; ADTOF lineage is CC BY-NC-SA 4.0 |

No restricted model is enabled by a normal StemLab profile or by the `all` extra.

## Inspect availability

```bash
stemlab evidence-models
```

Package presence is only a runtime hint; it does not prove that checkpoints, GPU drivers, auxiliary repos, or model licences are ready.

## Reuse an existing analysis

```bash
# Singing/music/speech activity and continuous pitch on the preferred vocal stem.
stemlab evidence analysis-master -o evidence-vocal \
  --model firered_aed --model swift_f0 \
  --model-path firered_aed=/models/FireRedVAD/AED

# Compare approved lyrics to a forced alignment.
stemlab evidence analysis-master -o evidence-align \
  --model qwen_forced_aligner \
  --canonical-text lyrics.txt --allow-model-downloads

# Independent chord evidence.
stemlab evidence analysis-master -o evidence-chords --model lv_chordia
```

For directly supplied audio, every selected model receives that file and `-o` is required. For a saved analysis, automatic routing prefers the best full vocal stem for vocal models, a pitched stem for SwiftF0, a drum stem for ADTOF, and the master for structure/harmony models. Missing specialist stems are reported rather than silently replaced, except the explicitly documented `*_or_master` routes.

Each model/source pair is isolated in a subprocess and gets its own `request.json`, `backend.log`, `backend.json`, structured output and provenance in `report.json`. Use `--backend-python MODEL=/path/to/python` when a research dependency conflicts with the main StemLab environment.

## New analyses

`--evidence-model` can be repeated:

```bash
stemlab analyze master.wav -o analysis-master --profile practical \
  --evidence-model firered_aed --evidence-model swift_f0 \
  --evidence-model-path firered_aed=/models/FireRedVAD/AED
```

The pass runs after stems, lyrics and the normal deep analysis inputs exist. Qwen can use canonical text supplied with `--evidence-canonical-text`; when StemLab already has canonical lyrics, the deep runner can reuse them.

## Interpretation rules

- **FireRed AED:** `singing` near a loop/cue boundary is a review reason, not proof that the detector is acoustically perfect. Its published speech-VAD score is not a music-cut benchmark.
- **HeartTranscriptor:** recognition is an alternative hypothesis. Never replace artist-approved lyrics from it automatically.
- **Qwen forced alignment:** an alignment answers *where supplied text appears*. It is not lyric recognition and it must expose unmatched/failed regions.
- **SwiftF0:** pitch confidence is not a vocal detector. Instruments can also be pitched.
- **SongFormer:** preserve its sections beside All-In-One and canonical labels; disagreement is useful evidence.
- **lv-chordia:** use chord progressions to review loop continuity; do not require identical end/start chord labels as a simplistic acceptance test.
- **ADTOF:** percussion hits support rhythmic review but never manufacture or replace beats.

## Downloads and trust

`--allow-model-downloads` removes StemLab's offline environment guard for model workers. It is explicit because model code/checkpoints are third-party executable inputs. FireRed and Heart currently require an explicit local model directory in this integration; Qwen may resolve its model id through its upstream library when downloads are enabled. SongFormer is deliberately bridged through a separately provisioned command rather than cloned by StemLab.

## SongFormer bridge

The upstream project currently exposes a research-oriented inference checkout rather than a compact stable PyPI API. Configure its own environment and set an explicit command template containing `{input}` and `{output}`:

```bash
export STEMLAB_SONGFORMER_COMMAND='python /opt/SongFormer/run_one.py --input {input} --output {output}'
stemlab evidence analysis-master -o evidence-structure --model songformer \
  --backend-python songformer=/opt/songformer-env/bin/python
```

The output is expected in the upstream MSA text form (`start_seconds label`). StemLab records that raw file and a normalized JSON boundary list.

## Evaluation corpus

`scripts/benchmark_evidence_corpus.py` probes an authorised collection without copying audio into the repository. With `--probe-only` it validates decodability, sample rate, channel count, duration and hashes. With model arguments it can run the same evidence command over a local corpus in suitable environments. Keep corpus audio outside source control.

## Experimental third-group bridges

The following routes deliberately use explicit host-provisioned command templates. This keeps large, custom-code or restricted research stacks out of StemLab's normal dependency graph while still standardising provenance and result handling.

| model | command variable | role | terms |
| --- | --- | --- | --- |
| `game_vocal_notes` | `STEMLAB_GAME_VOCAL_NOTES_COMMAND` | singing-note / word-note evidence | GAME code is MIT; verify the exact checkpoint terms |
| `sheetsage2` | `STEMLAB_SHEETSAGE2_COMMAND` | editable lead-sheet evidence | released checkpoint is CC-BY-NC-4.0 |
| `moss_music` | `STEMLAB_MOSS_MUSIC_COMMAND` | music captioning / grounded questions | Apache-2.0 model release |
| `audiosep` | `STEMLAB_AUDIOSEP_COMMAND` | language-prompted source extraction | MIT code; review checkpoint/dependency terms |

A template receives `{input}`, `{output}`, `{text}` and `{prompt}` substitutions and must write a bounded JSON object/array to `{output}`. Example:

```bash
export STEMLAB_MOSS_MUSIC_COMMAND='python /opt/moss/run.py --audio {input} --question {prompt} --json {output}'
stemlab evidence song.wav -o evidence-moss --model moss_music \
  --prompt 'Describe how the arrangement changes between verse and chorus.'
```

These bridges are not shell-evaluated (`shell=False`). They are also **not exposed as arbitrary command/path parameters through the Codex MCP tool**. Configure trusted commands on the host, then restart the plugin. Prompted-separation outputs are derived inspection material and must never replace the unmodified master for seam/click validation.
