/** Nonuniform 64-pip clock editing. All mutations work in integer source frames.
 * Consensus reference frames are immutable; only the correction map changes.
 */
export const BEAT_TIMELINE_SCHEMA = 'stemlab.beat-timeline.v1';
export const PIPS_PER_BEAT = 64;

const integer = value => Number.isSafeInteger(value);
const clamp = (value, lo, hi) => Math.min(hi, Math.max(lo, value));

export function validateBeatTimeline(map) {
  if (!map || map.schema !== BEAT_TIMELINE_SCHEMA || map.pips_per_beat !== PIPS_PER_BEAT ||
      !Number.isSafeInteger(map.source_audio?.sample_rate) || map.source_audio.sample_rate < 1 ||
      !Number.isSafeInteger(map.source_audio?.num_frames) || map.source_audio.num_frames < 2 ||
      !/^[0-9a-f]{64}$/.test(map.source_audio?.sha256 || '') ||
      !/^[0-9a-f]{64}$/.test(map.consensus_sha256 || '') ||
      !Array.isArray(map.beats) || map.beats.length < 2 || map.beats.length > 25000 ||
      !integer(map.origin_beat)) throw new Error('Not a valid source-bound StemLab beat timeline');
  const last = { beat: -1, frame: -1 };
  for (const row of map.beats) {
    if (!integer(row.beat) || !integer(row.frame) || row.beat <= last.beat ||
        row.frame <= last.frame || row.frame >= map.source_audio.num_frames ||
        !['consensus', 'corrected', 'manual'].includes(row.source) ||
        (row.reference_frame !== null && (!integer(row.reference_frame) || row.reference_frame < 0 || row.reference_frame >= map.source_audio.num_frames)) ||
        (row.source === 'consensus' && row.frame !== row.reference_frame) ||
        (row.source === 'manual' && row.reference_frame !== null)) {
      throw new Error('Beat indices and source sample frames must increase; original consensus timestamps stay immutable');
    }
    last.beat = row.beat; last.frame = row.frame;
  }
  if (!map.beats.some(row => row.beat === map.origin_beat)) throw new Error('Beat 1 must identify a real anchor');
  return map;
}

const clone = map => ({...map, beats:map.beats.map(row => ({...row}))});
const safe = map => validateBeatTimeline(map);
export const beatSeconds = (map, index) => map.beats[index].frame / map.source_audio.sample_rate;
export const tempoBetween = (map, i) => (i < 0 || i + 1 >= map.beats.length) ? null :
  60 * map.source_audio.sample_rate * (map.beats[i + 1].beat - map.beats[i].beat) /
  (map.beats[i + 1].frame - map.beats[i].frame);
export const nearestFrame = (map, seconds) => Math.round(seconds * map.source_audio.sample_rate);

export function moveBeat(map, index, seconds) {
  const doc = clone(map);
  if (!integer(index) || index < 0 || index >= doc.beats.length) throw new Error('Select a beat');
  const frame = nearestFrame(doc, seconds);
  const previous = doc.beats[index - 1]?.frame ?? -1;
  const next = doc.beats[index + 1]?.frame ?? doc.source_audio.num_frames;
  if (!integer(frame) || frame <= previous || frame >= next) throw new Error('Beat must remain between its neighbours');
  const row = doc.beats[index];
  row.frame = frame;
  row.source = frame === row.reference_frame ? 'consensus' : row.reference_frame === null ? 'manual' : 'corrected';
  return safe(doc);
}

export function setIntervalBpm(map, index, bpm) {
  if (!Number.isFinite(bpm) || bpm <= 0 || bpm > 1200) throw new Error('BPM must be 0..1200');
  const doc = clone(map);
  if (!integer(index) || index < 0 || index + 1 >= doc.beats.length) throw new Error('Choose an interval');
  const first = doc.beats[index], second = doc.beats[index + 1];
  const newFrames = Math.round(60 * (second.beat - first.beat) * doc.source_audio.sample_rate / bpm);
  if (newFrames < 1) throw new Error('BPM exceeds available sample precision');
  const shift = first.frame + newFrames - second.frame;
  for (let i = index + 1; i < doc.beats.length; i++) {
    const row = doc.beats[i];
    row.frame += shift;
    row.source = row.reference_frame === null ? 'manual' : row.frame === row.reference_frame ? 'consensus' : 'corrected';
  }
  return safe(doc);
}

export function shiftPhase(map, pips) {
  if (!Number.isFinite(pips) || Math.abs(pips) > 100000) throw new Error('Phase shift is out of bounds');
  const doc = clone(map);
  const firstBpm = tempoBetween(doc, 0);
  const frames = Math.round((pips / PIPS_PER_BEAT) * (60 / firstBpm) * doc.source_audio.sample_rate);
  for (const row of doc.beats) {
    row.frame += frames;
    row.source = row.reference_frame === null ? 'manual' : row.frame === row.reference_frame ? 'consensus' : 'corrected';
  }
  return safe(doc);
}

export function insertBeat(map, seconds) {
  const doc = clone(map), frame = nearestFrame(doc, seconds);
  if (!integer(frame) || frame < 0 || frame >= doc.source_audio.num_frames) throw new Error('Beat outside source');
  let i = doc.beats.findIndex(row => row.frame > frame);
  if (i < 0) i = doc.beats.length;
  if (i === 0 || i === doc.beats.length || doc.beats[i - 1].frame === frame) {
    throw new Error('Insert between two existing anchors; use the timeline selection to move end beats');
  }
  const before = doc.beats[i - 1];
  const after = doc.beats[i];
  const missing = after.beat - before.beat > 1;
  const number = before.beat + 1;
  if (!missing) {
    if (doc.origin_beat >= after.beat) doc.origin_beat += 1;
    for (let j = i; j < doc.beats.length; j++) doc.beats[j].beat += 1;
  }
  doc.beats.splice(i, 0, {beat:number, frame, source:'manual', reference_frame:null});
  return safe(doc);
}

export function deleteBeat(map, index) {
  const doc = clone(map);
  if (!integer(index) || index < 0 || index >= doc.beats.length || doc.beats.length <= 2) {
    throw new Error('Keep at least two beat anchors');
  }
  const [removed] = doc.beats.splice(index, 1);
  if (removed.beat === doc.origin_beat) doc.origin_beat = doc.beats[Math.min(index, doc.beats.length-1)].beat;
  return safe(doc);
}

export function setBeatOne(map, index) {
  const doc = clone(map);
  if (!integer(index) || index < 0 || index >= doc.beats.length) throw new Error('Select Beat 1');
  doc.origin_beat = doc.beats[index].beat;
  return safe(doc);
}

export function matchConsensus(map) {
  const doc = clone(map);
  for (const row of doc.beats) if (row.reference_frame !== null) {
    row.frame = row.reference_frame;
    row.source = 'consensus';
  }
  return safe(doc);
}

/** Relative to the first segment, for displaying a phase-error CV curve.
 * Export's authoritative phase is integrated on the server; neither changes audio.
 */
export function phaseDeviation(map) {
  const bpm = tempoBetween(map, 0);
  const anchor = map.beats.find(row => row.beat === map.origin_beat);
  return map.beats.map(row => ({time:row.frame / map.source_audio.sample_rate,
    value: PIPS_PER_BEAT * (row.beat - map.origin_beat) -
           (row.frame-anchor.frame) * bpm * PIPS_PER_BEAT / (map.source_audio.sample_rate*60)}));
}

export function correctedGrid(map, window, max = 3000) {
  if (!map?.beats?.length) return [];
  const sr = map.source_audio.sample_rate;
  const lo = Number.isFinite(window?.start) ? window.start : 0;
  const hi = Number.isFinite(window?.end) && window.end > lo ? window.end : Number.MAX_VALUE;
  const beats = map.beats.filter(row => row.frame / sr >= lo - .05 && row.frame / sr <= hi + .05);
  const stride = Math.max(1, Math.ceil(beats.length / max));
  return beats.filter((_, i) => i % stride === 0).map(row => ({
    time:row.frame/sr, emphasis:row.beat === map.origin_beat,
    label:`Corrected beat ${row.beat} · native pip ${(row.beat-map.origin_beat)*PIPS_PER_BEAT}`,
    className:'stemlab-grid-corrected',
  }));
}
