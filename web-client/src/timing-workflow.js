/** Stemlab source-frame editing; no audio or detector files are modified. */
export const CUE_TYPES = Object.freeze(['SECTION','ENTRY','DROP','BREAK']);
export const SECTION_NAMES = Object.freeze([
 'INTRO','VOCAL INTRO','VERSE','PRE-CHORUS','CHORUS','POST-CHORUS','BUILD','DROP','FINAL DROP',
 'POST-DROP','BRIDGE','BREAK','BREAKDOWN','SPOKEN BREAKDOWN','INSTRUMENTAL','INTERLUDE','SOLO',
 'HOOK','REFRAIN','MIDDLE EIGHT','OUTRO',
]);
export const toFrame = (seconds,sampleRate) => Math.round(Number(seconds)*sampleRate);
export const fromFrame = (frame,sampleRate) => frame/sampleRate;
export function shortWordTransitions(doc,{warningTicks=5,severeTicks=3,ticksPerBeat=16}={}){
 if(!doc||doc.clock_mode!=='fixed')return [];
 const sr=Number(doc.sample_rate),bpm=Number(doc.fixed_clock?.bpm);
 if(!Number.isFinite(sr)||sr<=0||!Number.isFinite(bpm)||bpm<=0)return [];
 const lines=new Map(doc.lines.map(row=>[row.id,row]));
 const byLine=new Map();
 for(const word of doc.words){
  if(!byLine.has(word.line_id))byLine.set(word.line_id,[]);
  byLine.get(word.line_id).push(word);
 }
 const flags=[];
 for(const [lineId,words] of byLine){
  words.sort((a,b)=>a.start_frame-b.start_frame);
  for(let i=1;i<words.length;i++){
   const previous=words[i-1],current=words[i];
   const seconds=(current.start_frame-previous.start_frame)/sr;
   const ticks=seconds*bpm/60*ticksPerBeat;
   if(ticks>=warningTicks)continue;
   flags.push({
    lineId,line:lines.get(lineId)?.text||lineId,
    fromId:previous.id,toId:current.id,fromWord:previous.word,toWord:current.word,
    seconds,ticks,severity:ticks<severeTicks?'severe':'warning',
   });
  }
 }
 return flags;
}
export function canonicalCue(type,section){
 const kind=String(type).trim().toUpperCase();
 const name=String(section).trim().toUpperCase().replace(/ +/g,' ');
 if(!CUE_TYPES.includes(kind))throw new Error('Cue type must be SECTION, ENTRY, DROP or BREAK');
 const match=/^([A-Z][A-Z -]*?)(?: ([1-9][0-9]{0,2}|A|B|FINAL))?$/.exec(name);
 if(!match || !SECTION_NAMES.includes(match[1]) || name.length>64)
  throw new Error('Use a standard section (INTRO, VERSE 1, CHORUS, BUILD 1, DROP 1, OUTRO, etc.)');
 return {type:kind,section:name,label:`[${kind}: ${name}]`};
}
const copy=doc=>({...doc,lines:doc.lines.map(x=>({...x})),words:doc.words.map(x=>({...x})),cues:doc.cues.map(x=>({...x})),fixed_clock:{...doc.fixed_clock}});
function between(value,min,max,label){if(!Number.isSafeInteger(value)||value<min||value>max)throw new Error(`${label} cannot cross its parent, another event or source duration`);return value;}
function ordered(rows,field='start_frame'){
 return rows.every((row,i)=>i===0||row[field]>=rows[i-1][field]);
}
export function updateTimingEvent(doc,kind,changed){
 const next=copy(doc),sr=doc.sample_rate,limit=doc.num_frames;
 if(!Number.isSafeInteger(sr)||!Number.isSafeInteger(limit)||sr<1||limit<2)throw new Error('Invalid source-frame metadata');
 if(kind==='cue'){
  const index=next.cues.findIndex(x=>x.id===changed.id);
  if(index<0)throw new Error('Cue not found');
  const current=next.cues[index];
  const info=canonicalCue(changed.type??current.type,changed.section??current.section);
  const frame=between(toFrame(changed.start,sr),0,limit-1,'Cue');
  next.cues[index]={...next.cues[index],frame,type:info.type,section:info.section};
  if(!ordered(next.cues,'frame'))throw new Error('Cue movement must preserve chronological order');
 } else if(kind==='line'){
  const i=next.lines.findIndex(x=>x.id===changed.id);
  if(i<0)throw new Error('Lyric line not found');
  const prior=next.lines[i],start=between(toFrame(changed.start,sr),0,limit-1,'Line');
  const end=between(toFrame(changed.end,sr),start+1,limit,'Line');
  if(i>0 && start<next.lines[i-1].end_frame || i+1<next.lines.length && end>next.lines[i+1].start_frame)
   throw new Error('Lyric line cannot cross neighbouring line bounds');
  next.lines[i]={...prior,start_frame:start,end_frame:end};
  const delta=start-prior.start_frame;
  const sameWidth=end-start===prior.end_frame-prior.start_frame;
  // Dragging a line transports its child words; resizing retains absolute word timing.
  for(const word of next.words)if(word.line_id===prior.id){
   if(sameWidth){word.start_frame+=delta;word.end_frame+=delta;}
   if(word.start_frame<start||word.end_frame>end)throw new Error('Line edit would cut off a word; adjust its words first');
  }
 } else if(kind==='word'){
  const i=next.words.findIndex(x=>x.id===changed.id);
  if(i<0)throw new Error('Word not found');
  const row=next.words[i],parent=next.lines.find(x=>x.id===row.line_id);
  if(!parent)throw new Error('Word parent line missing');
  const start=between(toFrame(changed.start,sr),parent.start_frame,parent.end_frame-1,'Word');
  const end=between(toFrame(changed.end,sr),start+1,parent.end_frame,'Word');
  const siblings=next.words.filter(x=>x.line_id===row.line_id);
  const pos=siblings.findIndex(x=>x.id===row.id);
  if(pos>0&&start<siblings[pos-1].end_frame || pos+1<siblings.length&&end>siblings[pos+1].start_frame)
   throw new Error('Word cannot overlap a neighbour within the same lyric line');
  next.words[i]={...row,start_frame:start,end_frame:end};
 } else throw new Error('Expected line, word or cue edit');
 next.review_status='draft';return next;
}
export function createAtPlayhead(doc,kind,seconds,options={}){
 const next=copy(doc),sr=doc.sample_rate,frame=between(toFrame(seconds,sr),0,doc.num_frames-1,'Playhead');
 const used=new Set([...doc.lines,...doc.words,...doc.cues].map(x=>x.id));
 const prefix={line:'line',word:'word',cue:'cue'}[kind];if(!prefix)throw new Error('Unknown timing track');
 let id;for(let n=1;n<=100000;n++){id=`${prefix}-edit-${n}`;if(!used.has(id))break;}
 if(used.has(id))throw new Error('Too many events');
 if(kind==='cue'){
  const {type,section}=canonicalCue(options.type||'SECTION',options.section||'INTRO');
  next.cues.push({id,frame,type,section});next.cues.sort((a,b)=>a.frame-b.frame);
 } else if(kind==='line'){
  const text=String(options.text||'').trim();if(!text)throw new Error('Type lyric text before adding a line');
  const later=doc.lines.find(row=>row.start_frame>frame);
  const prior=[...doc.lines].reverse().find(row=>row.start_frame<=frame);
  if(prior && frame<prior.end_frame)throw new Error('Playhead is inside an existing line');
  const end=Math.min(doc.num_frames,later?.start_frame??doc.num_frames,frame+Math.round(sr*2));
  if(end<=frame)throw new Error('No room for a new line');
  next.lines.push({id,start_frame:frame,end_frame:end,text});next.lines.sort((a,b)=>a.start_frame-b.start_frame);
 } else {
  const parent=next.lines.find(x=>x.id===options.lineId);
  if(!parent)throw new Error('Select a lyric line before adding its word');
  const text=String(options.word||'').trim();if(!text)throw new Error('Type word text before adding a word');
  if(frame<parent.start_frame || frame>=parent.end_frame)throw new Error('Playhead must be within selected lyric line');
  const siblings=next.words.filter(x=>x.line_id===parent.id);
  const later=siblings.find(x=>x.start_frame>frame);
  const prior=[...siblings].reverse().find(x=>x.start_frame<=frame);
  if(prior&&prior.end_frame>frame)throw new Error('Playhead is already within another word');
  const end=Math.min(parent.end_frame,later?.start_frame??parent.end_frame,frame+Math.round(sr*.25));
  if(end<=frame)throw new Error('No room within the selected lyric line');
  next.words.push({id,line_id:parent.id,start_frame:frame,end_frame:end,word:text});
  next.words.sort((a,b)=>a.start_frame-b.start_frame);
 }
 next.review_status='draft';return next;
}
export function deleteTimingEvent(doc,kind,id){
 const next=copy(doc);const key={line:'lines',word:'words',cue:'cues'}[kind];if(!key)throw new Error('Invalid track');
 if(kind==='line' && next.words.some(row=>row.line_id===id))throw new Error('Delete or reassign words before deleting their line');
 next[key]=next[key].filter(item=>item.id!==id);next.review_status='draft';return next;
}
