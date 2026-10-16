import React from "react";

export function BeatOffsetControls({ comparison, onBasis, onAnalysis }) {
  const { bases, basis, analyses, analysis, row, thinned } = comparison;
  return <section className="stemlab-beat-offset-controls" aria-label="BPM grid comparison">
    <div className="stemlab-beat-offset-selectors">
      <label>BPM grid <select aria-label="BPM grid basis" value={basis?.id || ""} onChange={event => onBasis(event.target.value)} disabled={!bases.length}>
        {!bases.length && <option value="">BPM unavailable</option>}
        {bases.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}
      </select></label>
      <label>First beat from <select aria-label="First beat analysis" value={analysis?.analysis_id || ""} onChange={event => onAnalysis(event.target.value)} disabled={!analyses.length}>
        {!analyses.length && <option value="">Detected beat unavailable</option>}
        {analyses.map(item => <option key={item.analysis_id} value={item.analysis_id}>{item.analysis_id}</option>)}
      </select></label>
    </div>
    <p className="stemlab-grid-legend"><span className="stemlab-legend-original">Original grid · source time 0</span>
      <span className="stemlab-legend-aligned">Offset grid · detected first beat = pip 0</span></p>
    <output aria-live="polite" data-testid="beat-offset-value">{row
      ? `${row.offset_pips.toFixed(6)} pips · first detected beat ${row.first_beat_seconds.toFixed(6)}s · nearest whole offset ${row.integer_offset_pips} pips (${(row.integer_residual_seconds * 1000).toFixed(3)} ms residual)`
      : "Waiting for usable beat evidence; no aligned grid is inferred."}</output>
    {analysis?.constant_grid_fit && <p className="small">Selected detector fit: {analysis.constant_grid_fit.proposed_bpm.toFixed(4)} BPM ·
      95% beat error {analysis.constant_grid_fit.p95_absolute_beat_error_ms.toFixed(3)} ms · grade {analysis.constant_grid_fit.precision_grade}.
      {basis?.fit ? ` Consensus grid fit grade: ${basis.fit.precision_grade}.` : ""}</p>}
    <p className="small">Half- and double-time readings are normal. Observed beats stay in their own lanes;
      tempo-family options compare ×½ / ×1 / ×2 interpretations. Constant grids and detector phases remain estimates.
      {thinned ? " Dense grids are thinned for display only." : ""}</p>
  </section>;
}
