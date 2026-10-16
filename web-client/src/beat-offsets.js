/** Present backend calculations through the released timeline marker API. */
const validBpm = value => typeof value === "number" && Number.isFinite(value) && value > 0;
const names = { canonical: "Canonical", combined: "Consensus · observed tempo", combined_family: "Consensus · canonical tempo family", combined_fit: "Consensus · fitted constant grid" };

export function beatGrid(bpm, origin, duration, kind) {
  if (!validBpm(bpm) || !Number.isFinite(origin) || origin < 0 || !Number.isFinite(duration) || duration <= 0) return [];
  const count = Math.max(0, Math.floor((duration - origin) * bpm / 60 + 1e-9) + 1);
  // This is display thinning only; exact backend offsets and observed events stay intact.
  const stride = Math.max(1, Math.ceil(count / 25000));
  return Array.from({ length: Math.ceil(count / stride) }, (_, index) => {
    const beat = index * stride;
    return { time: origin + beat * 60 / bpm, emphasis: beat === 0,
      label: `${kind === "original" ? "Original" : "Aligned"} beat ${beat + 1}${beat === 0 && kind === "aligned" ? " · pip 0" : ""}`,
      className: `stemlab-grid-${kind}` };
  });
}

export function beatGridComparison(report, canonicalBpm, duration, basisId = "canonical", analysisId = "consensus") {
  const valid = report?.schema === "stemlab.beat-offsets.v1" && report.pips_per_beat === 64;
  let bases = valid ? (report.bpm_bases || []).filter(basis => basis.status === "available" && validBpm(basis.bpm)) : [];
  if (!bases.length && validBpm(canonicalBpm)) bases = [{ id: "canonical", bpm: canonicalBpm }];
  const basis = bases.find(item => item.id === basisId) || bases.find(item => item.id === "combined_fit") || bases[0] || null;
  const analyses = valid ? (report.analyses || []).filter(item => item.status === "available") : [];
  const analysis = analyses.find(item => item.analysis_id === analysisId) || analyses.find(item => item.kind === "consensus") || analyses[0] || null;
  const row = basis && analysis ? report.comparisons?.find(item => item.status === "available" && item.bpm_basis === basis.id && item.analysis_id === analysis.analysis_id) : null;
  const original = basis ? beatGrid(basis.bpm, 0, duration, "original") : [];
  const aligned = row && Number.isFinite(row.beat_zero_seconds) ? beatGrid(row.bpm, row.beat_zero_seconds, duration, "aligned") : [];
  return { bases: bases.map(item => ({ ...item, label: `${names[item.id] || item.id}${item.multiplier ? ` ×${item.multiplier}` : ""} · ${item.bpm.toFixed(4)} BPM` })),
    basis, analysis, analyses, row, original, aligned,
    thinned: !!basis && Math.floor(duration * basis.bpm / 60) + 1 > 25000,
    grid: [...original, ...aligned].sort((a, b) => a.time - b.time) };
}
