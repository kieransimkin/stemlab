import assert from 'node:assert/strict';
import test from 'node:test';
import {canonicalCue,createAtPlayhead,updateTimingEvent,deleteTimingEvent} from '../../web-client/src/timing-workflow.js';
const base=()=>({sample_rate:8000,num_frames:40000,clock_mode:'fixed',fixed_clock:{bpm:120,first_beat_frame:1000},
  review_status:'draft',lines:[{id:'line-0001',start_frame:8000,end_frame:16000,text:'Hello world'}],words:[],cues:[]});
test('standard section names retain known entry, drop, break and numbered labels',()=>{
 assert.equal(canonicalCue('section','verse 1').label,'[SECTION: VERSE 1]');
 assert.equal(canonicalCue('entry','vocal intro').label,'[ENTRY: VOCAL INTRO]');
 assert.equal(canonicalCue('DROP','CHORUS 1').label,'[DROP: CHORUS 1]');
 for(const name of ['Stupid category','INTRO][DROP: OUTRO','VERSes','']) assert.throws(()=>canonicalCue('SECTION',name));
});
test('per-word edit remains inside selected line; lines move child word frames',()=>{
 let doc=createAtPlayhead(base(),'word',1.25,{lineId:'line-0001',word:'Hello'});
 assert.equal(doc.words[0].start_frame,10000);
 doc=updateTimingEvent(doc,'line',{id:'line-0001',start:1.25,end:2.25});
 assert.equal(doc.words[0].start_frame,12000);
 assert.throws(()=>updateTimingEvent(doc,'word',{id:doc.words[0].id,start:0.2,end:.4}));
 assert.throws(()=>deleteTimingEvent(doc,'line','line-0001'),/words/);
});
test('cue moves preserve order, even when the view supplies only id and time',()=>{
 let d=createAtPlayhead(base(),'cue',1.1,{type:'SECTION',section:'INTRO'});
 d=createAtPlayhead(d,'cue',2,{type:'BREAK',section:'SPOKEN BREAKDOWN'});
 assert.equal(d.cues.length,2);
 assert.throws(()=>updateTimingEvent(d,'cue',{id:d.cues[0].id,start:3,type:'SECTION',section:'VERSE 1'}),/chronological/);
 d=updateTimingEvent(d,'cue',{id:d.cues[0].id,start:1.5,type:'DROP',section:'CHORUS 1'});
 assert.equal(d.cues[0].section,'CHORUS 1');
 d=updateTimingEvent(d,'cue',{id:d.cues[0].id,start:1.6});
 assert.equal(d.cues[0].type,'DROP');assert.equal(d.cues[0].section,'CHORUS 1');
});
