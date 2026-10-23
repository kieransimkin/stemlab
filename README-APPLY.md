# Stemlab sub-frame precision: repository-divergence-safe installer

This replaces `stemlab_beat_precision_code.patch` from the previous ZIP. Do **not** run `git apply` on the old patch. It was generated from a reconstructed file in which the onset peak assignment was `peaks, _`, whereas the real Stemlab source contains `peaks, props`. That difference appears in the first patch hunk's context and makes `git apply` fail even on the latest `main` commit.

This package uses a **local Git three-way text merge** (`git merge-file -p`) instead of context-sensitive patch application. It compares the original reconstruction, the proposed precision upgrade, and *your currently checked-out file*, retaining unrelated edits. It checks all five proposed file changes before writing anything. Overlapping conflicting changes are refused; the installer does not discard edits or leave conflict markers in source files.

## Apply in PowerShell

Extract the ZIP into the `stemlab` repository root, preserving the `resources/` subdirectory. From that root, run:

```powershell
.\Apply-StemlabPrecision-Merge.ps1 -CheckOnly
.\Apply-StemlabPrecision-Merge.ps1 -RunTests
```

Or invoke the cross-platform script directly:

```powershell
python .\Apply-StemlabPrecision-Merge.py --check
python .\Apply-StemlabPrecision-Merge.py --apply
```

Review the changes before committing:

```powershell
git status --short
git diff --check
git diff -- src/stemlab/analysis/beat_evidence.py scripts/benchmark_example_beats.py
git add src/stemlab/analysis/beat_evidence.py scripts/benchmark_example_beats.py tests/test_beat_subframe_precision.py README.md docs/beat-evidence.md
git commit -m "Refine sub-frame tempo estimates and audit beat counts"
git push
```

Only commit after tests succeed. The installer neither commits nor pushes. You may leave the extracted installer files untracked; do not include them in the commit.

## What's included

- Bounded three-point sub-frame parabolic interpolation for ACF/comb lag peaks and local tempo windows; coarse lag and BPM retained.
- Auditable beat count: actual observed onset candidates, implied intermediate beat slots, and predicted leading/trailing positions.
- Full-source coverage by input feature, without confusing coverage with confidence or treating half/double-time as distinct musical evidence.
- Regression tests, benchmark report fields, and documentation updates.

## Verification

- Applied cleanly to a repository fixture with the conflicting `peaks, props` assignment while preserving it.
- Idempotence: second check produced no new changes.
- Line-ending preservation: checked with CRLF-formatted source.
- 39 focused Python tests passed on the merged fixture.
- No live checkout, real-audio benchmark or full GitHub CI was run with this new installer. Those still need executing in your repository.

The output of the source benchmark remains a diagnostic, not authoritative BPM or beat-one ground truth. No recording or artist-confirmed timing is modified.
