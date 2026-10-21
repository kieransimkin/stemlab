import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  beatSeconds, tempoBetween, moveBeat, setIntervalBpm, shiftPhase,
  insertBeat, deleteBeat, setBeatOne, matchConsensus, phaseDeviation,
  correctedGrid, validateBeatTimeline,
} from './beat-map.js';
import './beat-map.css';

const MIN_BPM = 20;
const MAX_BPM = 400;
const constrain = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
const tempoPosition = bpm => 100 * (1 - Math.log(constrain(bpm, MIN_BPM, MAX_BPM) / MIN_BPM) / Math.log(MAX_BPM / MIN_BPM));
const atY = (y, rect) => MIN_BPM * (MAX_BPM/MIN_BPM) ** constrain(1 - (y-rect.top)/rect.height, 0, 1);

async function api(hash, method='GET', doc) {
  const response = await fetch(`/api/${hash}/beat-timeline${method === 'POST' ? '/preview' : ''}`,
    {method, headers:{'Content-Type':'application/json'}, body:doc === undefined ? undefined : JSON.stringify(doc), cache:'no-store'});
  const payload = await response.json().catch(()=>({}));
  if (!response.ok) throw new Error(payload.detail || `Beat timeline HTTP ${response.status}`);
  return payload;
}

function BeatAnchors({map, duration, visible, selected, onSelect, onEdit, onInsert}) {
  const sr = map.source_audio.sample_rate;
  const beats = map.beats;
  const subset = beats.map((row, i) => ({row, i})).filter(({row}) => {
    const time = row.frame/sr;
    return time >= visible.start-.1 && time <= visible.end+.1;
  });
  const stride = Math.max(1, Math.ceil(subset.length / 2000));
  return <div className="stemlab-beatmap-track" aria-label="Editable sample-accurate beat anchors"
    onDoubleClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      onInsert((event.clientX-rect.left)/rect.width*duration);
      event.stopPropagation();
    }}>
    {subset.filter((_,i)=>i%stride===0).map(({row,i}) =>
      <button key={row.beat} type="button"
        className={`stemlab-beatmap-anchor ${row.source} ${selected===i?'selected':''} ${row.beat===map.origin_beat?'origin':''}`}
        aria-label={`Beat ${row.beat}, ${beatSeconds(map,i).toFixed(6)} seconds, ${row.source}; drag or use arrow keys`}
        aria-pressed={selected===i}
        title={`Beat ${row.beat}: frame ${row.frame} · ${(row.frame/sr).toFixed(6)} s · ${row.source}${row.reference_frame===null?'':` · reference ${row.reference_frame}`}`}
        style={{left:`${row.frame/(sr*Math.max(duration,1e-9))*100}%`}}
        onPointerDown={event => {event.currentTarget.setPointerCapture(event.pointerId);onSelect(i);event.stopPropagation();}}
        onPointerMove={event => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          const rect = event.currentTarget.parentElement.getBoundingClientRect();
          onEdit(i,(event.clientX-rect.left)/rect.width*duration);
          event.stopPropagation();
        }}
        onPointerUp={event => {event.currentTarget.releasePointerCapture(event.pointerId);event.stopPropagation();}}
        onClick={event => {onSelect(i);event.stopPropagation();}}
        onKeyDown={event => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();event.stopPropagation();
          const step = event.shiftKey ? Math.max(1, Math.round(sr/1000)) : 1;
          onEdit(i, (row.frame+(event.key==='ArrowLeft'?-step:step))/sr);
        }}
      ><span>{row.beat===map.origin_beat?'1':''}</span></button>)}
    </div>;
}

function TempoEnvelope({map, duration, visible, selected, onSelect, onTempo}) {
  const sr = map.source_audio.sample_rate;
  const intervals = map.beats.slice(0,-1).map((row,i) => ({
    i, start:row.frame/sr, end:map.beats[i+1].frame/sr, bpm:tempoBetween(map,i),
  })).filter(x => x.end >= visible.start && x.start <= visible.end);
  const stride = Math.max(1, Math.ceil(intervals.length / 1800));
  const points = intervals.filter((_,i) => i%stride===0);
  return <div className="stemlab-beatmap-tempo" aria-label="Editable local BPM envelope">
    <svg className="stemlab-beatmap-tempo-line" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
      <polyline points={points.map(x=>`${((x.start+x.end)/2)/Math.max(duration,1e-9)*1000},${tempoPosition(x.bpm)}`).join(' ')}
        fill="none" stroke="#f4d76e" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
    </svg>
    <div className="stemlab-beatmap-extent" aria-hidden="true">400 BPM<br/>20 BPM</div>
    {points.map(x => <button type="button" key={x.i}
      className={`stemlab-beatmap-tempo-node ${selected===x.i?'selected':''}`}
      style={{left:`${((x.start+x.end)/2)/Math.max(duration,1e-9)*100}%`, top:`${tempoPosition(x.bpm)}%`}}
      title={`Interval ${x.i} → ${x.i+1}: ${x.bpm.toFixed(3)} BPM · drag vertically to change local tempo`}
      aria-label={`BPM envelope interval ${x.i}: ${x.bpm.toFixed(3)} BPM`}
      aria-pressed={selected===x.i}
      onPointerDown={e=>{e.currentTarget.setPointerCapture(e.pointerId);onSelect(x.i);e.stopPropagation();}}
      onPointerMove={e=>{
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
        const rect=e.currentTarget.parentElement.getBoundingClientRect();
        onTempo(x.i,atY(e.clientY,rect));e.stopPropagation();
      }}
      onPointerUp={e=>{e.currentTarget.releasePointerCapture(e.pointerId);e.stopPropagation();}}
      onClick={e=>{onSelect(x.i);e.stopPropagation();}}
      onKeyDown={e=>{
        if(e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return;
        e.preventDefault();e.stopPropagation();
        onTempo(x.i,Math.max(.01,x.bpm+(e.key==='ArrowUp'?1:-1)*(e.shiftKey ? 0.01 : 1)));
      }}>{x.bpm.toFixed(1)}</button>)}
  </div>;
}

export function useBeatMapEditor(hash, duration, enabled = true) {
  const [map,setMap] = useState(null);
  const [saved,setSaved] = useState(false);
  const [revision,setRevision] = useState(null);
  const [dirty,setDirty] = useState(false);
  const [ready,setReady] = useState(false);
  const [supported,setSupported] = useState(true);
  const [selected,setSelected] = useState(0);
  const [visible,setVisible] = useState({start:0,end:Infinity});
  const [opened,setOpened] = useState(false);
  const [gridVisible,setGridVisible] = useState(true);
  const [bpmInput,setBpmInput] = useState('');
  const [phaseInput,setPhaseInput] = useState('0');
  const [note,setNote] = useState('');
  const [working,setWorking] = useState(false);
  const [undo,setUndo] = useState([]);
  const [redo,setRedo] = useState([]);
  const fileRef=useRef(null);
  const playheadRef=useRef(0);
  const docRef=useRef(null);
  docRef.current=map;

  const load=useCallback(async(allowDiscard=false)=>{
    if(dirty && !allowDiscard && !window.confirm('Discard unsaved beat edits and reload the saved map?')) return;
    try {
      const res=await api(hash);
      if(!res.available) {setReady(false);return;}
      validateBeatTimeline(res.map);
      setMap(res.map);setReady(true);setSaved(res.saved);setRevision(res.revision);
      setDirty(false);setUndo([]);setRedo([]);setSelected(0);
      setBpmInput(tempoBetween(res.map,0)?.toFixed(3) || '');
      setNote(res.saved?'Loaded saved beat corrections':'Prepared an editable proposal at exact consensus sample frames');
    }catch(e){
      if (e.message.includes('HTTP 404') && !docRef.current) setSupported(false);
      else setNote(e.message);
    }
  },[hash,dirty]);
  useEffect(()=>{
    if (!enabled) return;
    let active=true;
    const start=async()=>{if(active)await load(true);};
    void start();
    // New analyses may not have written beats/consensus.json yet.
    const timer=window.setInterval(()=>{if(active&&!docRef.current)void start();},5000);
    return()=>{active=false;window.clearInterval(timer);};
    // Deliberately reset only for a different song hash; edits do not trigger refetch.
  },[hash]);

  const edit=useCallback(fn=>{
    try {
      const original=docRef.current;
      if(!original)return;
      const next=fn(original);
      if (original.review_status==='artist_confirmed' && next.review_status==='artist_confirmed' &&
          (next.beats !== original.beats || next.origin_beat !== original.origin_beat)) {
        next.review_status='estimated'; // A new correction requires renewed artist review.
      }
      validateBeatTimeline(next);
      setMap(next);
      setDirty(true);
      setUndo(stack=>[...stack.slice(-59),original]);
      setRedo([]);setNote('Unsaved beat-map edits · original consensus unchanged');
    }catch(e){setNote(e.message);}
  },[]);
  const undoEdit=()=>{
    if(!undo.length)return;
    setRedo(s=>[...s.slice(-59),map]);setMap(undo.at(-1));setUndo(s=>s.slice(0,-1));setDirty(true);
  };
  const redoEdit=()=>{
    if(!redo.length)return;
    setUndo(s=>[...s.slice(-59),map]);setMap(redo.at(-1));setRedo(s=>s.slice(0,-1));setDirty(true);
  };
  const selectBeat=index=>{setSelected(index);setBpmInput(tempoBetween(docRef.current,index)?.toFixed(3)||'');};
  const preview=async candidate=>{
    const res=await api(hash,'POST',candidate);
    validateBeatTimeline(res);
    return res;
  };
  const saveMap=async()=>{
    if(!map)return;
    setWorking(true);
    try {
      const res=await api(hash,'PUT',{map,expected_revision:revision});
      setMap(res.map);setSaved(true);setRevision(res.revision);setDirty(false);
      setUndo([]);setRedo([]);setNote('Beat corrections saved separately from the consensus detections');
    }catch(e){setNote(e.message)}finally{setWorking(false)}
  };
  const exportMap=async kind=>{
    if(!map)return;
    setWorking(true);
    try {
      const doc=await preview(map);
      const body=JSON.stringify(doc,null,2);
      if(kind==='copy'){
        await navigator.clipboard.writeText(body);
        setNote('Copied one complete beat-timeline JSON value with Beat 1 and pip phase synchronisation');
      }else{
        const file=new Blob([body+'\n'],{type:'application/json'});
        const url=URL.createObjectURL(file);
        const element=document.createElement('a');
        element.href=url;element.download=`stemlab-beat-timeline-${hash.slice(0,12)}.json`;
        document.body.appendChild(element);element.click();element.remove();
        URL.revokeObjectURL(url);
        setNote('Exported a single source-bound beat-timeline JSON file');
      }
    }catch(e){setNote(e.message)}finally{setWorking(false)}
  };
  const importMap=async event=>{
    const file=event.target.files?.[0];event.target.value='';
    if(!file)return;
    if(file.size>32*1024*1024){setNote('Import limited to 32 MiB');return;}
    setWorking(true);
    try{
      const json=JSON.parse(await file.text());
      const candidate=await preview(json);
      setMap(candidate);setDirty(true);setUndo(s=>map?[...s.slice(-59),map]:s);setRedo([]);
      setNote('Imported and validated: review changes before saving. Original consensus unchanged.');
    }catch(e){setNote(e.message)}finally{setWorking(false)}
  };
  const applyTempo=(i,bpm)=>edit(current=>setIntervalBpm(current,i,bpm));
  const reset=()=>edit(current=>matchConsensus(current));
  const anchors=map && opened && duration>0 ? [
    {id:'corrected:anchors',title:'Corrected beats',kind:'beatmap',height:80,
     meta:'Drag to place · arrows: 1 sample · Shift: 1 ms · double-click empty space to insert',
     content:{type:'custom',node:<BeatAnchors map={map} duration={duration} visible={visible}
       selected={selected} onSelect={selectBeat} onEdit={(i,time)=>edit(x=>moveBeat(x,i,time))}
       onInsert={time=>edit(x=>insertBeat(x,time))}/>}},
    {id:'corrected:tempo',title:'BPM envelope',kind:'beatmap',height:110,
     meta:'Actual interval tempo · drag vertically to change BPM (later beats follow)',
     content:{type:'custom',node:<TempoEnvelope map={map} duration={duration} visible={visible}
       selected={selected} onSelect={selectBeat} onTempo={applyTempo}/>}},
    {id:'corrected:phase',title:'Phase CV',kind:'beatmap',height:80,
     meta:'Relative pips vs the opening tempo · visible irregular drift',
     content:{type:'curve',points:phaseDeviation(map).filter((_,i)=>i%Math.max(1,Math.ceil(map.beats.length/4000))===0),colour:'#ecb7fd'}},
  ]:[];
  const grid=map&&gridVisible ? correctedGrid(map,visible):[];
  const row=map?.beats?.[Math.min(selected,map.beats.length-1)];
  const frameRate=map?.source_audio?.sample_rate||1;
  const selectionBpm=map && selected<map.beats.length-1 ? tempoBetween(map,selected):null;
  const panel=<section className="stemlab-beatmap-panel" aria-label="Editable variable tempo and Beat 1 phase">
    <header><strong>Beat correction · variable BPM &amp; phase</strong>
      {map && <span>{map.beats.length.toLocaleString()} anchors · {saved?'saved':'consensus draft'}{dirty?' · unsaved changes':''}</span>}
      <button type="button" onClick={()=>setOpened(x=>!x)}>{opened?'Hide editor':'Show editor'}</button></header>
    {opened && map && <>
      <p>Default = exact saved consensus beat placements. Change individual source-frame anchors, drag BPM envelope nodes, or shift global phase. This does not modify detector evidence or source audio.</p>
      <div className="stemlab-beatmap-fields">
        <label>Selected beat # <input aria-label="Selected beat number" type="number" min="0" step="1"
          value={row?.beat??0} onChange={e=>{const index=map.beats.findIndex(x=>x.beat===Number(e.target.value));if(index>=0)selectBeat(index);}}/></label>
        <output>Frame {row?.frame??0} · {row?(row.frame/frameRate).toFixed(6):'0'}s</output>
        <label>Local BPM <input aria-label="Selected interval BPM" type="number" min="0.01" max="1200" step="0.001"
          value={bpmInput} onChange={e=>setBpmInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')applyTempo(selected,Number(bpmInput));}} /></label>
        <button type="button" disabled={selected>=map.beats.length-1} onClick={()=>applyTempo(selected,Number(bpmInput))}>Apply BPM</button>
        <label>Phase shift (pips) <input aria-label="Global phase shift pips" type="number" step="0.25"
          value={phaseInput} onChange={e=>setPhaseInput(e.target.value)}/></label>
        <button type="button" onClick={()=>edit(x=>shiftPhase(x,Number(phaseInput)))}>Shift all beats</button>
      </div>
      <div className="stemlab-beatmap-actions">
        <button type="button" onClick={()=>edit(x=>moveBeat(x,selected,playheadRef.current))}>Place selected at playhead</button>
        <button type="button" onClick={()=>edit(x=>insertBeat(x,playheadRef.current))}>Insert at playhead</button>
        <button type="button" onClick={()=>edit(x=>setBeatOne(x,selected))}>Set selected as Beat 1</button>
        <button type="button" onClick={()=>edit(x=>deleteBeat(x,selected))}>Delete selected</button>
        <button type="button" disabled={!undo.length} onClick={undoEdit}>Undo</button>
        <button type="button" disabled={!redo.length} onClick={redoEdit}>Redo</button>
        <button type="button" onClick={reset}>Match consensus beats</button>
        <label><input type="checkbox" checked={gridVisible} onChange={e=>setGridVisible(e.target.checked)}/>Corrected grid</label>
        <label><input type="checkbox" checked={map.review_status==='artist_confirmed'}
          onChange={e=>edit(m=>({...m,review_status:e.target.checked?'artist_confirmed':'estimated'}))}/>Artist-reviewed Beat 1 / phase</label>
      </div>
      <div className="stemlab-beatmap-export">
        <button type="button" disabled={working||!dirty} onClick={saveMap}>Save corrections</button>
        <button type="button" disabled={working} onClick={()=>exportMap('download')}>Export Beat 1 + full beat timeline JSON</button>
        <button type="button" disabled={working} onClick={()=>exportMap('copy')}>Copy JSON value</button>
        <button type="button" disabled={working} onClick={()=>fileRef.current?.click()}>Import JSON</button>
        <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={importMap}/>
        <button type="button" onClick={()=>load()}>Reload saved/consensus</button>
      </div>
      <small>Current local BPM: {selectionBpm?.toFixed(3)??'last anchor'} · original consensus matches remain labelled separately. Native timebase: 64 pips/beat, imported DanceMoves clocks use 16 ticks/beat. DanceMoves supports optional beat-timeline.v1 variable playback where its new consumer is installed; beat-alignment.v1 remains a separate fixed-tempo format.</small>
    </>}
    {!ready && opened && <p>Waiting for an available consensus beat list (and exact master audio). No timing is invented.</p>}
    {note && <output role="status" className="stemlab-beatmap-status">{note}</output>}
  </section>;
  return {map,revision,saved,ready,dirty,lanes:anchors,grid,panel:supported?panel:null,
    onWindowChange:setVisible, onTimeChange:t=>{playheadRef.current=t;}};
}
