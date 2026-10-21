import React,{useCallback,useEffect,useMemo,useRef,useState} from 'react';
import {SECTION_NAMES,CUE_TYPES,canonicalCue,createAtPlayhead,deleteTimingEvent,updateTimingEvent,toFrame} from './timing-workflow.js';
import './timing-editor.css';

const api = async (hash,method='GET',body=null,endpoint='')=>{
 const response=await fetch(`/api/${hash}/song-timing${endpoint}`,{
  method,headers:body?{'Content-Type':'application/json'}:undefined,
  body:body?JSON.stringify(body):undefined,cache:'no-store',
 });
 const result=await response.json();if(!response.ok)throw new Error(result.detail||`Timing edits HTTP ${response.status}`);
 return result;
};
const sourceSeconds=(row,sr)=>row/sr;
const filename=(kind,hash)=>`stemlab-${hash.slice(0,12)}-${kind}`;
function download(body,name,mime){
 const blob=new Blob([body],{type:mime}),url=URL.createObjectURL(blob),a=document.createElement('a');
 try{a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();}
 finally{window.setTimeout(()=>URL.revokeObjectURL(url),1000);}
}

export function useTimingEditor(hash,duration,beatEditor,enabled=true){
 const [doc,setDoc]=useState(null),[saved,setSaved]=useState(false),[revision,setRevision]=useState(null);
 const [dirty,setDirty]=useState(false),[working,setWorking]=useState(false),[open,setOpen]=useState(false);
 const [selected,setSelected]=useState({kind:'line',id:null}),[note,setNote]=useState('');
 const [snap,setSnap]=useState(false),[snapTolerance,setSnapTolerance]=useState(.15);
 const [gridVisible,setGridVisible]=useState(false);
 const [visible,setVisible]=useState({start:0,end:Infinity});
 const [newText,setNewText]=useState(''),[newWord,setNewWord]=useState(''),[newType,setNewType]=useState('SECTION'),[newSection,setNewSection]=useState('INTRO');
 const [fileKind,setFileKind]=useState('lines');
 const [exportKind,setExportKind]=useState('bundle');
 const playhead=useRef(0),input=useRef(null),docRef=useRef(null),activeHash=useRef(hash),busy=useRef(false);
 docRef.current=doc;
 const reload=useCallback(async(force=false)=>{
   if(!force&&docRef.current&&dirty&&!window.confirm('Discard unsaved song timing changes?'))return;
   try{const res=await api(hash);if(!res.available){setNote(res.reason||'Waiting for exact source audio');return;}
     if(activeHash.current!==hash)return;
     setDoc(res.document);setSaved(res.saved);setRevision(res.revision);setDirty(false);
     setSelected({kind:'line',id:res.document.lines[0]?.id??null});
     setNote(res.warnings?.join(' · ')||'Song timing loaded · source evidence unchanged');
   }catch(e){setNote(e.message);}
 },[hash,dirty]);
 useEffect(()=>{
   if(!enabled)return;
   activeHash.current=hash;setDoc(null);setRevision(null);setDirty(false);setSelected({kind:'line',id:null});
   void reload(true);
   const timer=window.setInterval(()=>{if(!docRef.current&&!busy.current)void reload(true);},5000);
   return()=>window.clearInterval(timer);
 },[hash]);
 const edit=useCallback(fn=>{
  try{const source=docRef.current;if(!source)return;const next=fn(source);setDoc(next);setDirty(true);setNote('Unsaved song timing edits · original evidence preserved');}
  catch(e){setNote(e.message);}
 },[]);
 const sr=doc?.sample_rate||1,mediaDuration=doc?doc.num_frames/sr:Math.max(0,duration);
 const selectedLine=doc?.lines.find(row=>row.id=== (selected.kind==='line'?selected.id:doc?.words.find(x=>x.id===selected.id)?.line_id))??doc?.lines[0]??null;
 const activeKind=selected.kind;
 const selectedRow=doc?.[activeKind==='line'?'lines':activeKind==='word'?'words':'cues'].find(x=>x.id===selected.id)??null;
 const canVariable=Boolean(beatEditor?.map?.beats?.length&&beatEditor?.map?.source_audio?.sha256===hash);
 const beatRevision=beatEditor?.revision??null;
 const variableSelected=doc?.clock_mode==='variable';
 const clock=useMemo(()=>{
  if(!doc)return null;
  if(doc.clock_mode==='variable')return canVariable?{...beatEditor.map,mode:'variable'}:null;
  return {mode:'fixed',bpm:doc.fixed_clock.bpm,firstBeatSeconds:doc.fixed_clock.first_beat_frame/sr};
 },[doc,canVariable,beatEditor?.map,sr]);
 const setClockMode=mode=>{
  edit(x=>({...x,clock_mode:mode,beat_revision:mode==='variable'?beatRevision:null,review_status:'draft'}));
 };
 const setFixed=(name,value)=>edit(x=>({...x,fixed_clock:{...x.fixed_clock,[name]:value},review_status:'draft'}));
 const editEvent=(kind,row)=>edit(x=>updateTimingEvent(x,kind,row));
 const create=kind=>edit(x=>createAtPlayhead(x,kind,playhead.current,{
  text:newText,word:newWord,lineId:selectedLine?.id,type:newType,section:newSection,
 }));
 const editLabel=(kind,id,label)=>edit(x=>{
  if(!label.trim()||/\r|\n|[\x00-\x1f]/.test(label))throw new Error('Text must be nonempty, without newlines');
  const key=kind==='line'?'lines':'words';const field=kind==='line'?'text':'word';
  return {...x,[key]:x[key].map(row=>row.id===id?{...row,[field]:label.trim()}:row),review_status:'draft'};
 });
 const renameCue=(id,type,section)=>edit(x=>{
  const parsed=canonicalCue(type,section);
  return {...x,cues:x.cues.map(row=>row.id===id?{...row,type:parsed.type,section:parsed.section}:row),review_status:'draft'};
 });
 const save=async()=>{
  if(!doc)return;setWorking(true);busy.current=true;
  try{
   if(variableSelected&&(beatEditor?.dirty||!canVariable))throw new Error('Save/reload the corrected beat map first; an enabled variable clock must refer to the current real beat map');
   const res=await api(hash,'PUT',{document:doc,expected_revision:revision});
   setDoc(res.document);setRevision(res.revision);setSaved(true);setDirty(false);setNote('Saved exact source-frame corrections · original canonical, cue and ASR files unchanged');
  }catch(e){setNote(e.message);}finally{setWorking(false);busy.current=false;}
 };
 const exportAll=async()=>{
  if(!doc)return;setWorking(true);busy.current=true;
  try{
   if(variableSelected&&(beatEditor?.dirty||!canVariable))throw new Error('Save and verify the exact beat map before exporting variable-clock timing');
   const exported=await api(hash,'POST',{document:doc},'/preview');
   const items={
     bundle:[JSON.stringify(exported,null,2)+'\n',filename('timing-bundle',hash)+'.json','application/json'],
     lines:[exported.line_lrc,filename('lines',hash)+'.lrc','text/plain;charset=utf-8'],
     words:[exported.word_tsv,filename('words',hash)+'.tsv','text/tab-separated-values;charset=utf-8'],
     wordjson:[JSON.stringify(exported.word_json,null,2)+'\n',filename('words',hash)+'.json','application/json'],
     cues:[exported.cue_lrc,filename('cues',hash)+'.lrc','text/plain;charset=utf-8'],
   };
   download(...items[exportKind]);
   setNote(`Exported ${exportKind} · source-bound clock and all timing forms remain available via the bundle`);
  }catch(e){setNote(e.message)}finally{setWorking(false);busy.current=false;}
 };
 const importFile=async event=>{
  const file=event.target.files?.[0];event.target.value='';if(!file||!doc)return;
  if(file.size>1_048_576){setNote('Timing import limited to 1 MiB');return;}
  const ext=file.name.split('.').at(-1).toLowerCase();
  setWorking(true);busy.current=true;
  try{
   const res=await api(hash,'POST',{document:doc,kind:fileKind,format:ext,text:await file.text()},'/import');
   setDoc(res.document);setDirty(true);setNote(`Imported ${fileKind} for review; not saved until Save corrections`);
  }catch(e){setNote(e.message);}finally{setWorking(false);busy.current=false;}
 };
 const inView=row=>{
  const start=row.start_frame??row.frame,end=row.end_frame??start;
  return start/sr<=visible.end+.01 && end/sr>=visible.start-.01;
 };
 const toEvent=(row,kind)=>({id:row.id,label:kind==='cue'?`[${row.type}: ${row.section}]`:kind==='word'?row.word:row.text,
  ...(kind==='cue'?{type:row.type,section:row.section}:{}),
  start:sourceSeconds(row.start_frame??row.frame,sr),
  ...(kind==='cue'?{}:{end:sourceSeconds(row.end_frame,sr)}),
  ...(kind==='word'?{parentId:row.line_id}:{})});
 const lineRows=doc?.lines||[],wordRows=(doc?.words||[]).filter(row=>row.line_id===selectedLine?.id);
 const lane=(kind,rows,parent=null)=>({
  id:`timing:${kind}`,kind:`timing-${kind}`,title:kind==='line'?'Lyric lines · editable':kind==='word'?`Words · ${selectedLine?.text||'select a line'}`:'Cue sections · editable',
  meta:`${rows.length} ${kind} events · drag or arrow to adjust · ${clock?.mode||'no clock'} match`,height:kind==='word'?88:94,
  content:{type:'timing',kind,clock,editable:true,snap,toleranceSeconds:snapTolerance,
   items:rows.filter(inView).slice(0,1600).map(row=>toEvent(row,kind)),
   parents:parent?parent.map(row=>({id:row.id,start:row.start_frame/sr,end:row.end_frame/sr})):undefined,
   selectedId:selected.kind===kind?selected.id:null,
   onSelect:id=>setSelected({kind,id}),
   onEdit:event=>editEvent(kind,event)},
 });
 const lanes=doc&&open?[
  lane('line',lineRows),lane('word',wordRows,lineRows),lane('cue',doc.cues),
 ]:[];
 const panel=<section className="stemlab-timing-panel" aria-label="Editable lyric, word and cue timing">
  <header><strong>Song timing · line lyrics, words &amp; cue sections</strong>
   <span>{doc?`${doc.lines.length} lines · ${doc.words.length} words · ${doc.cues.length} cues · ${dirty?'unsaved':'saved/seeded'}`:'Awaiting master'}</span>
   <button type="button" onClick={()=>setOpen(v=>!v)}>{open?'Hide timing editor':'Show timing editor'}</button>
  </header>
  {open&&doc&&<>
   <p>Line, word and cue edits are kept in a separate source-bound document. Choose a lyric line to adjust its individual words. Cue names must follow the established [SECTION: VERSE 1] / [DROP: CHORUS 1] convention.</p>
   <div className="stemlab-timing-fields">
    <label>Timing clock <select aria-label="Timing clock" value={doc.clock_mode} onChange={e=>setClockMode(e.target.value)}>
      <option value="fixed">Fixed BPM + Beat 1 offset</option>
      <option value="variable" disabled={!canVariable}>Corrected variable BPM beat map</option>
    </select></label>
    <label>Fixed BPM <input type="number" min="20" max="400" step=".001" value={doc.fixed_clock.bpm}
      onChange={e=>setFixed('bpm',Number(e.target.value))}/></label>
    <label>Fixed Beat 1 (seconds) <input type="number" min="0" max={mediaDuration} step=".001" value={doc.fixed_clock.first_beat_frame/sr}
      onChange={e=>setFixed('first_beat_frame',toFrame(e.target.value,sr))}/></label>
    <label><input type="checkbox" checked={snap} onChange={e=>setSnap(e.target.checked)}/>Snap near real/fixed beats</label>
    <label>Snap tolerance (ms) <input type="number" min="0" max="1000" step="10" value={Math.round(snapTolerance*1000)}
      onChange={e=>setSnapTolerance(Math.max(0,Math.min(1,Number(e.target.value)/1000)))}/></label>
    <label><input type="checkbox" checked={gridVisible} onChange={e=>setGridVisible(e.target.checked)}/>Beat grid overlay</label>
   </div>
   {variableSelected&&!canVariable&&<p role="alert">Variable BPM is selected but its source-bound beat map is unavailable; no silent fixed-BPM downgrade.</p>}
   {variableSelected&&beatEditor?.dirty&&<p role="alert">Save the beat-map corrections before saving/exporting lyric and cue timing changes.</p>}
   {variableSelected&&canVariable&&doc.beat_revision!==beatRevision&&<p role="alert">The saved beat-map revision has changed. Review its timing, then explicitly rebind these lyrics and cues to that revision. <button type="button" disabled={beatEditor.dirty} onClick={()=>edit(x=>({...x,beat_revision:beatRevision,review_status:'draft'}))}>Rebind to reviewed beat-map revision</button></p>}
   <div className="stemlab-timing-fields">
    <label>Selected line <select aria-label="Selected lyric line" value={selectedLine?.id||''} onChange={e=>setSelected({kind:'line',id:e.target.value})}>
     <option value="">Choose line</option>{doc.lines.map(row=><option key={row.id} value={row.id}>{row.text.slice(0,75)}</option>)}
    </select></label>
    {selectedRow&&activeKind!=='cue'&&<label>{activeKind==='line'?'Line text':'Word text'}
     <input aria-label="Selected text" value={activeKind==='line'?selectedRow.text:selectedRow.word}
      onChange={e=>editLabel(activeKind,selectedRow.id,e.target.value)}/></label>}
    {selectedRow&&activeKind==='cue'&&<>
      <label>Cue type <select value={selectedRow.type} onChange={e=>renameCue(selectedRow.id,e.target.value,selectedRow.section)}>
       {CUE_TYPES.map(x=><option key={x} value={x}>{x}</option>)}
      </select></label>
      <label>Standard section <select value={SECTION_NAMES.find(x=>selectedRow.section===x||selectedRow.section.startsWith(x+' '))||'INTRO'}
       onChange={e=>renameCue(selectedRow.id,selectedRow.type,e.target.value)}>
       {SECTION_NAMES.map(x=><option key={x} value={x}>{x}</option>)}
      </select></label>
      <label>Section number / suffix <select aria-label="Cue section suffix" value={selectedRow.section.match(/ (\d+|A|B|FINAL)$/)?.[1]||''}
       onChange={e=>{const base=SECTION_NAMES.find(x=>selectedRow.section===x||selectedRow.section.startsWith(x+' '))||'INTRO';renameCue(selectedRow.id,selectedRow.type,base+(e.target.value?' '+e.target.value:''));}}>
        <option value="">None</option>{Array.from({length:64},(_,i)=>String(i+1)).concat(['A','B','FINAL']).map(x=><option key={x} value={x}>{x}</option>)}
       </select></label>
    </>}
   </div>
   <div className="stemlab-timing-fields">
    <label>New line text <input value={newText} placeholder="Lyrics line" onChange={e=>setNewText(e.target.value)}/></label>
    <button type="button" onClick={()=>create('line')}>Add line at playhead</button>
    <label>New word <input value={newWord} placeholder="Single word" onChange={e=>setNewWord(e.target.value)}/></label>
    <button type="button" disabled={!selectedLine} onClick={()=>create('word')}>Add word inside selected line</button>
   </div>
   <div className="stemlab-timing-fields">
    <label>New cue type <select value={newType} onChange={e=>setNewType(e.target.value)}>{CUE_TYPES.map(x=><option key={x}>{x}</option>)}</select></label>
    <label>Section <select value={newSection} onChange={e=>setNewSection(e.target.value)}>{SECTION_NAMES.map(x=><option key={x}>{x}</option>)}</select></label>
    <button type="button" onClick={()=>create('cue')}>Add cue at playhead</button>
    <button type="button" disabled={!selectedRow} onClick={()=>edit(x=>deleteTimingEvent(x,activeKind,selected.id))}>Delete selected {activeKind}</button>
    <label><input type="checkbox" checked={doc.review_status==='artist_confirmed'} onChange={e=>edit(x=>({...x,review_status:e.target.checked?'artist_confirmed':'draft'}))}/>Artist-reviewed timing</label>
   </div>
   <div className="stemlab-timing-actions">
    <button type="button" disabled={working||!dirty} onClick={save}>Save source-frame corrections</button>
    <label>Export format <select value={exportKind} onChange={e=>setExportKind(e.target.value)}>
     <option value="bundle">Complete JSON bundle</option><option value="lines">Line LRC</option>
     <option value="words">Word TSV</option><option value="wordjson">Word JSON</option>
     <option value="cues">Named cue LRC</option>
    </select></label>
    <button type="button" disabled={working} onClick={exportAll}>Download selection</button>
    <label>Import track <select value={fileKind} onChange={e=>setFileKind(e.target.value)}>
     <option value="lines">Per-line LRC</option><option value="words">Per-word LRC/TSV/JSON</option><option value="cues">Section-cue LRC</option>
    </select></label>
    <button type="button" disabled={working} onClick={()=>input.current?.click()}>Choose timing file</button>
    <input ref={input} type="file" hidden accept={fileKind==='words'?'.lrc,.tsv,.json':'.lrc'} onChange={importFile}/>
    <button type="button" disabled={working} onClick={()=>reload()}>Reload saved</button>
   </div>
   <small>Word positions must stay inside their lyric line. An off-grid word/cue is preserved until you explicitly drag or enable nearby-beat snapping. Pips=64/beat, DanceMoves ticks=16/beat. LRC/TSV exports round timestamps; the JSON retains native frames.</small>
  </>}
  {open&&!doc&&<p>Waiting for decoded source audio; no lyric or cue times are invented.</p>}
  {note&&<output role="status" className="stemlab-timing-status">{note}</output>}
 </section>;
 return {clock,lanes,panel,gridVisible,onWindowChange:setVisible,onTimeChange:t=>{playhead.current=t;}};
}
