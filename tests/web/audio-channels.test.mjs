import {test} from 'node:test';
import assert from 'node:assert/strict';
import {groupAudioLanes} from '../../web-client/src/audio-channels.js';
const wave=path=>({id:path==='__source__'?path:'file:'+path,title:path,content:{type:'waveform',min:[-.5],max:[.5]}});
const spec=path=>({id:'file:'+path,title:path,content:{type:'image',src:'data/'+path,alt:path}});
test('master and six stems have one lane each',()=>{
 const rows=[wave('__source__'),spec('spectrograms/master.npz')];
 for(const name of ['vocals','drums','bass','guitar','piano','other'])rows.push(wave('stems/htd/'+name+'.wav'),spec('spectrograms/htd/'+name+'.npz'));
 const result=groupAudioLanes(rows);assert.equal(result.length,7);
 assert.ok(result.every(l=>l.content.type==='audio'&&l.content.waveform&&l.content.spectrogram));
 assert.equal(result[0].id,'__source__');
});
test('no mutation and independent arrival order',()=>{
 const a=wave('stems/htd/drums.wav'),b=spec('spectrograms/htd/drums.npz');
 const saved=JSON.stringify([a,b]);assert.deepEqual(groupAudioLanes([a,b]),groupAudioLanes([b,a]));
 assert.equal(JSON.stringify([a,b]),saved);
});
test('per-separator identities never combine different drums',()=>{
 const rows=[wave('stems/a/drums.wav'),wave('stems/b/drums.wav'),spec('spectrograms/a/drums.npz')];
 const result=groupAudioLanes(rows);assert.equal(result.length,2);assert.ok(result[0].content.spectrogram);assert.equal(result[1].content.spectrogram,undefined);
});
test('original uploaded master takes precedence over input copy',()=>{
 const result=groupAudioLanes([wave('input/song.mp3'),wave('__source__'),spec('spectrograms/master.npz')]);
 assert.equal(result.length,1);assert.equal(result[0].id,'__source__');
});
test('speech audio matches the speech spectrum',()=>{
 assert.equal(groupAudioLanes([wave('speech/spoken_word.wav'),spec('spectrograms/speech/spoken_word.npz')]).length,1);
});
test('provenance maps nonstandard filenames rather than prettified names',()=>{
 const rows=[wave('stems/model/raw name.wav'),spec('spectrograms/model/slug.npz'),{id:'file:analysis.json',sourceMap:[{audio:'stems/model/raw name.wav',data:'spectrograms/model/slug.npz'}],content:{type:'artifact'}}];
 const result=groupAudioLanes(rows);assert.equal(result.length,2);assert.ok(result[1].content.waveform&&result[1].content.spectrogram);
});
test('standalone PNGs are not aligned overlays; NPZ removes redundant PNG',()=>{
 const rows=[wave('__source__'),spec('spectrograms/master.png')];
 assert.equal(groupAudioLanes(rows).length,2);
 const result=groupAudioLanes([...rows,spec('spectrograms/master.npz')]);assert.equal(result.length,1);
 assert.ok(result[0].content.spectrogram.src.endsWith('.npz'));
});
test('loading and failed waveforms remain visible, with disabled unavailable view',()=>{
 const rows=[{id:'file:stems/a/drums.wav',content:{type:'artifact',note:'waveform unavailable (500)'}},spec('spectrograms/a/drums.npz')];
 const result=groupAudioLanes(rows);assert.equal(result.length,1);assert.equal(result[0].content.waveform,undefined);assert.match(result[0].meta,/500/);
});
test('all beat lanes survive grouping',()=>{
 const beats=['beatnet','beatnet__drums','beat_this','beat_this__percussion'].map(name=>({id:'file:beats/'+name+'.json',content:{type:'markers',items:[{time:1}]}}));
 assert.deepEqual(groupAudioLanes(beats),beats);
});
