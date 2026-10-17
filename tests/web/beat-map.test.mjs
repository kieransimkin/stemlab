import assert from 'node:assert/strict';
import test from 'node:test';
import {
  validateBeatTimeline, beatSeconds, tempoBetween, moveBeat, setIntervalBpm,
  shiftPhase, insertBeat, deleteBeat, setBeatOne, matchConsensus, phaseDeviation,
} from '../../web-client/src/beat-map.js';
const hash = 'a'.repeat(64);
const map = () => ({schema:'stemlab.beat-timeline.v1',pips_per_beat:64,
  source_audio:{sha256:hash,num_frames:24000,sample_rate:8000,num_channels:1},
  consensus_sha256:hash,origin_beat:0,review_status:'estimated',
  beats:[1000,5000,9000,14000].map((frame,beat)=>({beat,frame,source:'consensus',reference_frame:frame}))});

test('original consensus anchors remain exact and phase curve handles irregular BPM',()=>{
  const source=map();validateBeatTimeline(source);
  assert.equal(tempoBetween(source,0),120);
  assert.ok(Math.abs(tempoBetween(source,2) - 96) < .01);
  assert.equal(beatSeconds(source,0),.125);
  assert.ok(phaseDeviation(source)[3].value < 0);
});
test('dragging a beat preserves reference timestamps in provenance',()=>{
  const orig=map(), corrected=moveBeat(orig,2,1.15);
  assert.equal(corrected.beats[2].frame,9200);
  assert.equal(corrected.beats[2].reference_frame,9000);
  assert.equal(corrected.beats[2].source,'corrected');
  assert.equal(orig.beats[2].frame,9000);
  assert.deepEqual(matchConsensus(corrected),orig);
});
test('BPM envelope moves all later beats preserving subsequent interval spacing',()=>{
  const orig=map(), edited=setIntervalBpm(orig,1,100);
  assert.equal(edited.beats[1].frame,5000);
  assert.equal(edited.beats[2].frame,9800);
  assert.equal(edited.beats[3].frame,14800);
  assert.equal(tempoBetween(edited,1),100);
});
test('global pip phase shift, manual beats and selecting beat 1',()=>{
  const doc=map(), shifted=shiftPhase(doc,8);
  assert.equal(shifted.beats[0].frame,1500);
  const inserted=insertBeat(doc,.9);
  assert.equal(inserted.beats[2].source,'manual');
  assert.equal(inserted.beats[3].beat,3);
  const removed=deleteBeat(inserted,2);
  assert.equal(removed.beats.length,4);
  const rebased=setBeatOne(doc,1);
  assert.equal(rebased.origin_beat,1);
});
test('reject timestamp crossing, unexpected master or confirmation authority',()=>{
  assert.throws(()=>moveBeat(map(),1,1.5));
  assert.throws(()=>setIntervalBpm(map(),0,0));
  assert.throws(()=>shiftPhase(map(),-32));
  assert.throws(()=>insertBeat(map(),99));
  const invalid=map();invalid.beats[1].source='manual';
  assert.throws(()=>validateBeatTimeline(invalid));
});
