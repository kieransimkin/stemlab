import {test} from 'node:test';
import assert from 'node:assert/strict';
import {beatGrid, beatGridComparison} from '../../web-client/src/beat-offsets.js';

const report = {
  schema: 'stemlab.beat-offsets.v1', pips_per_beat: 64,
  bpm_bases: [{id: 'canonical', status: 'available', bpm: 120}, {id: 'combined', status: 'available', bpm: 60}],
  analyses: [{analysis_id: 'consensus', kind: 'consensus', status: 'available'}, {analysis_id: 'beatnet', status: 'available'}],
  comparisons: [{analysis_id: 'consensus', bpm_basis: 'canonical', bpm: 120, status: 'available', beat_zero_seconds: .25, offset_pips: -32},
    {analysis_id: 'beatnet', bpm_basis: 'combined', bpm: 60, status: 'available', beat_zero_seconds: .125, offset_pips: -8}]
};
test('backend offset origin is used and original grid remains at source zero', () => {
  const before = JSON.stringify(report);
  const view = beatGridComparison(report, 120, 2);
  assert.equal(view.original[0].time, 0);
  assert.equal(view.aligned[0].time, .25);
  assert.equal(view.aligned[1].time, .75);
  assert.equal(view.row.offset_pips, -32);
  assert.equal(view.original[0].className, 'stemlab-grid-original');
  assert.equal(view.aligned[0].className, 'stemlab-grid-aligned');
  assert.equal(JSON.stringify(report), before);
});
test('both BPM and independent detector selection change the selected backend row', () => {
  const view = beatGridComparison(report, 120, 2, 'combined', 'beatnet');
  assert.equal(view.aligned[0].time, .125);
  assert.equal(view.aligned[1].time, 1.125);
  assert.equal(view.original[1].time, 1);
});
test('unavailable evidence and unknown clocks never invent an aligned grid', () => {
  const view = beatGridComparison({...report, pips_per_beat: 16}, 120, 2);
  assert.equal(view.aligned.length, 0);
  assert.equal(view.original.length, 5);
  assert.equal(beatGridComparison(null, null, 2).grid.length, 0);
});
test('markers are bounded, drift-free and large display grids are thinned', () => {
  assert.equal(beatGrid(120, 3, 2, 'aligned').length, 0);
  assert.equal(beatGrid(NaN, 0, 2, 'original').length, 0);
  const markers = beatGrid(120, .125, 1e6, 'aligned');
  assert.ok(markers.length <= 25000);
  assert.ok(markers.at(-1).time <= 1e6);
  assert.equal(beatGridComparison(report, 120, 1e6).thinned, true);
});
