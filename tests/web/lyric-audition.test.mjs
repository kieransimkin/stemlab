import {test} from 'node:test';
import assert from 'node:assert/strict';
import {auditionLines, auditionWords, auditionChannels, channelLoops} from '../../web-client/src/lyric-audition.js';
test('canonical starts/ends and empty clear cues retain original source seconds',()=>{
 assert.deepEqual(auditionLines({lyric_timing:[{start:1,end:2,text:'First'},{start:3,text:''},{start:null,text:'invalid'}]}),
   [{start:1,end:2,label:'First'},{start:3,label:''}]);
});
test('full edited items take precedence even when empty or outside the visible window',()=>{
 const canonical={lyric_timing:[{start:1,text:'Old'}]},edited=[{start:200,end:202,label:'Edited'}];
 assert.equal(auditionLines(canonical,edited),edited);assert.deepEqual(auditionLines(canonical,[]),[]);
});
test('complete per-word items retain their line association independently of editor visibility',()=>{
 const doc={sample_rate:48000,words:[
  {id:'word-1',line_id:'line-1',start_frame:48000,end_frame:72000,word:'Light'},
  {id:'bad',line_id:'line-1',start_frame:90000,end_frame:80000,word:'reversed'},
 ]};
 assert.deepEqual(auditionWords(doc),[{id:'word-1',lineId:'line-1',start:1,end:1.5,label:'Light'}]);
});
test('only genuine full-duration channels are offered, including master first',()=>{
 const master={id:'__source__',audioSrc:'/source'},stem={id:'vocals',audioSrc:'/vocals',duration:10};
 assert.deepEqual(auditionChannels([stem,{id:'short',audioSrc:'/clip',duration:3},master],10),[master,stem]);
});
test('stem playback cannot reuse master loop excerpts or mislabeled downloads',()=>{
 const loops=[{id:'one',startSample:10,endSample:20,sampleRate:10,audioSrc:'/master-excerpt',downloadUrl:'/master.wav'}];
 assert.equal(channelLoops(loops,true),loops);
 assert.deepEqual(channelLoops(loops,false),[{id:'one',startSample:10,endSample:20,sampleRate:10}]);
 assert.equal(loops[0].audioSrc,'/master-excerpt');
});
