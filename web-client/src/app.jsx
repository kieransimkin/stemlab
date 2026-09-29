import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { TimelineSequence, formatTimelineTime } from "react-timeline-sequence";
import "react-timeline-sequence/styles.css";
import { LoopSummary, useAnalysisLoops } from "./loops";

const $ = selector => document.querySelector(selector);
const uploadView = $("#uploadView");
const timelineView = $("#timelineView");
const dropZone = $("#dropZone");
const fileInput = $("#fileInput");
const chooseButton = $("#chooseButton");
const uploadProgressWrap = $("#uploadProgressWrap");
const uploadProgress = $("#uploadProgress");
const uploadLabel = $("#uploadLabel");
const connectionBadge = $("#connectionBadge");
const canonicalBpmInput = $("#canonicalBpm");
const canonicalLyricsInput = $("#canonicalLyrics");
const canonicalTimingInput = $("#canonicalTiming");
const knownInfoStatus = $("#knownInfoStatus");
const loadArcadiansReference = $("#loadArcadiansReference");
const loadArcadiansHero = $("#loadArcadiansHero");

const oldTimelineMarkup = Array.from(timelineView.children);
const timelineRoot = document.createElement("div");
timelineRoot.id = "timelineRoot";
timelineView.replaceChildren(timelineRoot);
for (const node of oldTimelineMarkup) node.remove();
const root = createRoot(timelineRoot);

const AUDIO_EXTENSIONS = new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);
let referenceMetadata = {};

function fileExt(path) {
  const base = String(path).split("/").pop() || "";
  const position = base.lastIndexOf(".");
  return position >= 0 ? base.slice(position + 1).toLowerCase() : "";
}

function prettyPath(path) {
  return String(path)
    .replace(/^stems\//, "")
    .replace(/^spectrograms\//, "")
    .replace(/^vamp\/data\//, "Vamp · ")
    .replace(/^beats\//, "Beats · ")
    .replace(/^speech\//, "Speech · ")
    .replace(/^deep\//, "Deep · ")
    .replace(/[_-]+/g, " ");
}

function resultUrl(hash, path) {
  return `/${hash}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function artifact(hash, path, note = "Generated analysis artifact") {
  return { type: "artifact", note, href: path === "__source__" ? `/api/${hash}/source` : resultUrl(hash, path) };
}

async function fetchJson(hash, path) {
  const response = await fetch(resultUrl(hash, path), { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

function number(value, digits = 2, suffix = "") {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? `${parsed.toFixed(digits)}${suffix}` : "—";
}

function summaryLane(id, title, meta, items, kind = "feature") {
  const available = items.filter(([, value]) => value !== undefined && value !== null && value !== "");
  return {
    id,
    title,
    meta,
    kind,
    content: {
      type: "summary",
      items: (available.length ? available : [["status", "analysis available"]]).map(([label, value]) => ({ label, value })),
    },
  };
}

function segmentBlocks(events) {
  return (events || []).flatMap(event => {
    const start = Number(event.start);
    if (!Number.isFinite(start)) return [];
    const end = Number(event.end);
    return [{
      start,
      end: Number.isFinite(end) && end > start ? end : start + 0.5,
      label: event.label || event.text || event.values?.[0] || "",
    }];
  });
}

function vampContent(data) {
  const events = Array.isArray(data.events) ? data.events : [];
  switch (String(data.kind || "")) {
    case "curve":
      return { type: "curve", points: events.flatMap(event => {
        const time = Number(event.start);
        const value = Number(event.values?.[0]);
        return Number.isFinite(time) && Number.isFinite(value) && value > 0 ? [{ time, value }] : [];
      }) };
    case "matrix":
      return { type: "matrix", rows: events.map(event => event.values || []).filter(values => values.length) };
    case "notes":
      return { type: "notes", items: events.flatMap(event => {
        const value = Number(event.values?.[0]);
        const start = Number(event.start);
        if (!Number.isFinite(value) || value <= 0 || !Number.isFinite(start)) return [];
        const end = Number(event.end);
        return [{ start, end: Number.isFinite(end) && end > start ? end : start + 0.12, value, label: event.label }];
      }) };
    case "segments":
      return { type: "blocks", items: segmentBlocks(events) };
    case "events":
      return { type: "markers", items: events.flatMap(event => Number.isFinite(Number(event.start)) ? [{ time: Number(event.start) }] : []) };
    default:
      return { type: "artifact", note: events[0]?.label || events[0]?.values?.join(", ") || data.title || "analysis" };
  }
}

async function waveformLane(hash, id, title, meta, path) {
  const parameters = new URLSearchParams({ path, points: "12000" });
  const response = await fetch(`/api/${hash}/waveform?${parameters}`);
  if (!response.ok) return { id, title, meta, kind: "artifact", content: artifact(hash, path, `waveform unavailable (${response.status})`) };
  const data = await response.json();
  return { id, title, meta, kind: "waveform", content: { type: "waveform", min: data.min || [], max: data.max || [] }, duration: Number(data.duration_seconds) || 0 };
}

async function laneFromFile(hash, file) {
  const path = file.path;
  const id = `file:${path}`;
  const extension = fileExt(path);
  if (path === "canonical.json" || path.startsWith("deep/loops/")) return null;

  if (AUDIO_EXTENSIONS.has(extension)) return waveformLane(hash, id, prettyPath(path), "audio waveform", path);
  if (path.startsWith("spectrograms/") && extension === "npz") {
    const parameters = new URLSearchParams({ path, max_width: "8192", max_height: "768" });
    return { id, title: prettyPath(path), meta: "spectrogram data · exact song timeline", kind: "spectrogram", content: { type: "image", src: `/api/${hash}/spectrogram?${parameters}`, alt: `${prettyPath(path)} spectrogram` } };
  }
  if (path.startsWith("spectrograms/") && extension === "png") {
    return { id, title: prettyPath(path), meta: "rendered spectrogram PNG", kind: "image", content: { type: "image", src: resultUrl(hash, path), alt: `${prettyPath(path)} rendered spectrogram` } };
  }

  try {
    if (path.startsWith("beats/") && extension === "json") {
      const data = await fetchJson(hash, path);
      const downbeats = new Set((data.downbeats || []).map(value => Number(value).toFixed(3)));
      return { id, title: prettyPath(path), meta: "beat / downbeat events", kind: "events", content: { type: "markers", items: (data.beats || []).flatMap(value => {
        const time = Number(value);
        return Number.isFinite(time) ? [{ time, emphasis: downbeats.has(time.toFixed(3)), label: downbeats.has(time.toFixed(3)) ? "Downbeat" : "Beat" }] : [];
      }) } };
    }
    if (path.startsWith("vamp/data/") && extension === "json") {
      const data = await fetchJson(hash, path);
      return { id, title: prettyPath(path), meta: "Vamp feature analysis", kind: "feature", content: vampContent(data) };
    }
    if (path === "speech/whisper.json") {
      const data = await fetchJson(hash, path);
      return { id, title: "Speech · Whisper words", meta: "word-aligned transcript", kind: "words", content: { type: "blocks", items: (data.words || []).flatMap(word => {
        const start = Number(word.start);
        const end = Number(word.end);
        return Number.isFinite(start) ? [{ start, end: Number.isFinite(end) ? Math.max(start + 0.03, end) : start + 0.03, label: String(word.word || "").trim() }] : [];
      }) } };
    }
    if (path === "deep/structure/structure.json" || path === "deep/song_map/song_map.json") {
      const data = await fetchJson(hash, path);
      const songMap = path.includes("song_map");
      return { id, title: songMap ? "Deep · song map" : "Deep · functional structure", meta: songMap ? "section-level sonic / rhythm / harmony / lyric fusion" : "All-In-One · functional song sections", kind: "deep-structure", content: { type: "blocks", items: segmentBlocks(songMap ? data.sections : data.segments) } };
    }
    if (path === "deep/harmony/harmony.json") {
      const data = await fetchJson(hash, path);
      const chords = data.chords?.collapsed_progression || [];
      if (chords.length) return { id, title: "Deep · harmony", meta: "collapsed chord progression + key evidence", kind: "deep-harmony", content: { type: "blocks", items: segmentBlocks(chords) } };
      return summaryLane(id, "Deep · harmony", "collapsed chord progression + key evidence", [["key", data.vamp_key || data.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"], ["tuning", data.tuning_hz ? `${Number(data.tuning_hz).toFixed(1)} Hz` : "—"]], "deep-harmony");
    }
    if (path === "deep/lyrics/lyrics.json") {
      const data = await fetchJson(hash, path);
      const timed = (data.lines || []).filter(item => Number.isFinite(Number(item.start)) && Number.isFinite(Number(item.end)));
      if (timed.length) return { id, title: "Deep · rhyme & prosody", meta: "phonetic rhyme, repetition and delivery", kind: "deep-lyrics", content: { type: "blocks", items: segmentBlocks(timed) } };
      return summaryLane(id, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", [["rhyme scheme", data.rhyme?.scheme || "—"], ["lines", data.line_count ?? "—"], ["words", data.word_count ?? "—"]], "deep-lyrics");
    }
    if (path === "deep/sonic/sonic.json") {
      const data = await fetchJson(hash, path);
      return summaryLane(id, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", [["LUFS", number(data.loudness?.integrated_lufs_bs1770, 1)], ["crest", number(data.loudness?.crest_factor_db, 1, " dB")], ["RMS range", number(data.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")], ["centroid", number(data.timbre?.spectral_centroid_hz_mean, 0, " Hz")], ["stereo corr", number(data.stereo?.left_right_correlation, 2)]]);
    }
    if (path === "deep/rhythm/rhythm.json") {
      const data = await fetchJson(hash, path);
      return summaryLane(id, "Deep · groove", "meter · stability · swing · syncopation evidence", [["tempo", number(data.tempo?.median_bpm, 2, " BPM")], ["meter", data.meter?.estimated_beats_per_bar ? `${data.meter.estimated_beats_per_bar}/4-ish` : "—"], ["swing", number(data.groove?.swing_ratio_long_to_short, 2, ":1")], ["offbeat energy", number(data.groove?.offbeat_onset_energy_ratio, 3)], ["onsets/s", number(data.groove?.onset_density_per_second, 2)]]);
    }
    if (path === "deep/semantic_text/semantic_text.json") {
      const data = await fetchJson(hash, path);
      return summaryLane(id, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", (data.theme_similarity || []).slice(0, 7).map(item => [item.theme, number(item.similarity, 3)]));
    }
    if (path === "deep/semantic_audio/semantic_audio.json") {
      const data = await fetchJson(hash, path);
      const items = Object.entries(data.prompt_sets || {}).flatMap(([category, values]) => (values || []).slice(0, 2).map(item => [`${category}: ${item.prompt}`, number(item.similarity, 3)]));
      return summaryLane(id, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", items);
    }
    if (path === "deep/summary.json") {
      const data = await fetchJson(hash, path);
      const items = Object.entries(data.analyses || {}).map(([name, record]) => [name, record.available ? "ready" : "unavailable"]);
      if ((data.errors || []).length) items.push(["errors", data.errors.length]);
      return summaryLane(id, "Deep · analysis summary", "cross-domain action inventory", items);
    }
  } catch (error) {
    return { id, title: prettyPath(path), meta: "analysis artifact", kind: "artifact", content: artifact(hash, path, error.message) };
  }

  return { id, title: prettyPath(path), meta: `${extension || "file"} · ${Number(file.bytes || 0).toLocaleString()} bytes`, kind: "artifact", content: artifact(hash, path) };
}

function canonicalLayers(canonical, anchor, anchorSource, duration) {
  const lanes = [];
  const bpm = Number(canonical?.bpm);
  if (Number.isFinite(bpm) && bpm > 0) {
    const markers = [];
    if (Number.isFinite(anchor) && duration > 0) {
      const interval = 60 / bpm;
      for (let time = anchor, index = 0; time <= duration + 1e-7; time += interval, index += 1) markers.push({ time, emphasis: index === 0, label: `Canonical beat ${index + 1}` });
    }
    lanes.push({ id: "canonical:bpm", title: "Canonical BPM", meta: Number.isFinite(anchor) ? `${bpm} BPM · anchor ${anchor.toFixed(3)}s · ${anchorSource || "detected beat"}` : `${bpm} BPM · waiting for first detected beat`, kind: "canonical-bpm", height: 104, content: markers.length ? { type: "markers", items: markers } : { type: "artifact", note: `${bpm} BPM — grid will begin at the first detected beat` } });
  }
  if (canonical?.lyrics) lanes.push({ id: "canonical:lyrics", title: "Canonical lyrics", meta: "known reference text", kind: "canonical-lyrics", height: 104, content: { type: "text", text: canonical.lyrics } });
  const timing = Array.isArray(canonical?.lyric_timing) ? canonical.lyric_timing : [];
  if (timing.length) lanes.push({ id: "canonical:timing", title: "Canonical lyric timing", meta: `${timing.length} timed lyric event${timing.length === 1 ? "" : "s"}`, kind: "canonical-timing", height: 104, content: { type: "blocks", items: timing.flatMap(event => {
    const start = Number(event.start);
    const end = Number(event.end);
    return Number.isFinite(start) && start >= 0 ? [{ start, end: Number.isFinite(end) && end > start ? end : start + 0.75, label: String(event.text || ""), className: "stemlab-canonical-lyric" }] : [];
  }) } });
  const grid = lanes.find(lane => lane.id === "canonical:bpm")?.content?.items || [];
  return { lanes, grid };
}

function Log({ lines }) {
  return <details open className="stemlab-log"><summary>Analysis log</summary><div className="log">{lines.map((line, index) => <div key={index} className={line.stream === "stderr" ? "stderr" : "stdout"}>[{line.stream}] {line.text}</div>)}</div></details>;
}

function StemLabTimeline({ hash, filename }) {
  const loopState = useAnalysisLoops(hash);
  const [lanes, setLanes] = useState([]);
  const [duration, setDuration] = useState(0);
  const [status, setStatus] = useState({ state: "submitted" });
  const [canonical, setCanonical] = useState({ bpm: null, lyrics: null, lyric_timing: [] });
  const [anchor, setAnchor] = useState(null);
  const [anchorSource, setAnchorSource] = useState(null);
  const [logs, setLogs] = useState([]);
  const filesSeen = useRef(new Set());

  const appendLog = useCallback((stream, text) => {
    if (!text) return;
    setLogs(previous => [...previous.slice(-799), { stream: stream === "stderr" ? "stderr" : "stdout", text }]);
  }, []);

  const addFile = useCallback(async file => {
    if (!file?.path || filesSeen.current.has(file.path)) return;
    filesSeen.current.add(file.path);
    const lane = await laneFromFile(hash, file);
    if (!lane) return;
    if (lane.duration) setDuration(current => current || lane.duration);
    setLanes(previous => previous.some(item => item.id === lane.id) ? previous : [...previous, lane]);
  }, [hash]);

  const refresh = useCallback(async () => {
    const response = await fetch(`/api/${hash}/timeline`, { cache: "no-store" });
    if (!response.ok) return;
    const state = await response.json();
    setStatus(state.status || { state: "submitted" });
    if (state.duration_seconds) setDuration(Number(state.duration_seconds));
    if (state.canonical) setCanonical(state.canonical);
    const nextAnchor = state.first_detected_beat == null ? NaN : Number(state.first_detected_beat);
    if (Number.isFinite(nextAnchor) && nextAnchor >= 0) {
      setAnchor(nextAnchor);
      setAnchorSource(state.first_detected_beat_source || "detected beat");
    }
    for (const file of state.files || []) void addFile(file);
  }, [addFile, hash]);

  useEffect(() => {
    filesSeen.current = new Set();
    setLanes([]);
    waveformLane(hash, "__source__", "MASTER · uploaded source", filename, "__source__").then(lane => {
      if (lane.duration) setDuration(lane.duration);
      setLanes(previous => [lane, ...previous.filter(item => item.id !== lane.id)]);
    }).catch(error => appendLog("stderr", error.message));
    void refresh();
    const interval = window.setInterval(() => void refresh(), 2500);
    let socket = null;
    if (typeof window.io === "function") {
      socket = window.io({ path: "/socket.io" });
      socket.on("connect", () => {
        connectionBadge.textContent = "live";
        connectionBadge.classList.remove("muted");
        socket.emit("subscribe", { hash });
      });
      socket.on("disconnect", () => {
        connectionBadge.textContent = "reconnecting";
        connectionBadge.classList.add("muted");
      });
      socket.on("process_output", event => appendLog(event.stream || "stdout", event.line || ""));
      socket.on("process_history", event => {
        for (const line of event.stdout || []) appendLog("stdout", line);
        for (const line of event.stderr || []) appendLog("stderr", line);
      });
      socket.on("new_file", event => void addFile(event));
      socket.on("job_status", event => { setStatus(event.status || {}); void refresh(); });
      socket.on("canonical_metadata", event => { if (event?.canonical) setCanonical(event.canonical); });
      socket.on("job_timeout", event => appendLog("stderr", `Job timeout: ${event.message || "analysis exceeded timeout"}`));
    } else {
      connectionBadge.textContent = "polling";
      connectionBadge.classList.add("muted");
      appendLog("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.");
    }
    return () => {
      window.clearInterval(interval);
      socket?.disconnect();
    };
  }, [addFile, appendLog, filename, hash, refresh]);

  const references = useMemo(() => canonicalLayers(canonical, anchor, anchorSource, duration), [anchor, anchorSource, canonical, duration]);
  // File discovery is asynchronous. Keep the musical evidence above raw artifacts.
  const lanePriority = lane => lane.id === "__source__" ? 0
    : lane.kind === "deep-structure" ? 10 : lane.kind === "events" ? 20
    : lane.kind === "spectrogram" ? 30 : lane.kind === "waveform" ? 40 : 90;
  const allLanes = [...references.lanes, ...[...lanes].sort((a, b) => lanePriority(a) - lanePriority(b) || a.id.localeCompare(b.id))];
  const state = status.state || "submitted";
  return <TimelineSequence
    className="stemlab-timeline"
    audioSrc={`/api/${hash}/source`}
    duration={duration}
    title={canonical.title || filename}
    subtitle={hash}
    loops={loopState.loops}
    lanes={allLanes}
    grid={references.grid}
    onDurationChange={setDuration}
    onPlaybackError={error => appendLog("stderr", error instanceof Error ? error.message : String(error))}
    headerEnd={<><span className={`badge ${state}`}>{state}</span><span className="small">{allLanes.length} lane{allLanes.length === 1 ? "" : "s"}</span></>}
    footer={<><LoopSummary state={loopState} hash={hash} /><Log lines={logs} /><span className="dock-links"><a href="https://kieransimkin.co.uk/my-songs/" target="_blank" rel="noopener">Kieran Simkin · My Songs ↗</a></span></>}
  />;
}

function canonicalPayloadFromForm() {
  const bpm = canonicalBpmInput?.value?.trim() || "";
  const lyrics = canonicalLyricsInput?.value || "";
  const timing = canonicalTimingInput?.value || "";
  return { ...referenceMetadata, bpm: bpm ? Number(bpm) : null, lyrics: lyrics.trim() || null, lyric_timing: timing.trim() || [] };
}

function hasCanonicalInput(payload) {
  return Number.isFinite(Number(payload.bpm)) || Boolean(payload.lyrics) || Boolean(typeof payload.lyric_timing === "string" && payload.lyric_timing.trim()) || Boolean(Array.isArray(payload.lyric_timing) && payload.lyric_timing.length);
}

async function saveCanonical(hash) {
  const payload = canonicalPayloadFromForm();
  if (!hasCanonicalInput(payload)) return;
  const response = await fetch(`/api/${hash}/canonical`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.detail || `Could not save canonical metadata (${response.status})`);
  knownInfoStatus.textContent = "Known information saved with this song hash.";
}

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("PUT", `/upload/${encodeURIComponent(file.name)}`);
    request.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    request.upload.onprogress = event => {
      uploadProgressWrap.classList.remove("hidden");
      const ratio = event.lengthComputable ? event.loaded / event.total : 0;
      uploadProgress.style.width = `${Math.round(ratio * 100)}%`;
      uploadLabel.textContent = event.lengthComputable ? `${Math.round(ratio * 100)}% · ${(event.loaded / 1048576).toFixed(1)} / ${(event.total / 1048576).toFixed(1)} MiB` : `${(event.loaded / 1048576).toFixed(1)} MiB uploaded`;
    };
    request.onerror = () => reject(new Error("Upload failed"));
    request.onload = () => {
      let payload = {};
      try { payload = JSON.parse(request.responseText); } catch {}
      if (request.status < 200 || request.status >= 300) reject(new Error(payload.detail || `Upload failed (${request.status})`));
      else resolve(payload);
    };
    request.send(file);
  });
}

async function openTimeline(hash, filename) {
  uploadView.classList.add("hidden");
  timelineView.classList.remove("hidden");
  root.render(<StemLabTimeline key={hash} hash={hash} filename={filename || "uploaded audio"} />);
}

async function startUpload(file) {
  if (!file) return;
  uploadProgress.style.width = "0%";
  uploadLabel.textContent = `Uploading ${file.name}`;
  uploadProgressWrap.classList.remove("hidden");
  try {
    const response = await uploadFile(file);
    uploadProgress.style.width = "100%";
    uploadLabel.textContent = "Upload complete · attaching to analysis";
    await saveCanonical(response.hash);
    await openTimeline(response.hash, response.filename || file.name);
  } catch (error) {
    uploadLabel.textContent = error.message;
    uploadProgress.style.width = "0%";
  }
}

async function loadArcadiansFixture(event) {
  event?.preventDefault();
  event?.stopPropagation();
  try {
    const response = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load Arcadians reference (${response.status})`);
    const reference = await response.json();
    referenceMetadata = {};
    for (const field of ["title", "artist", "release_date", "isrc", "upc", "website", "my_songs_url", "epk_url", "cover_art_url", "source_url", "sections"]) {
      if (reference[field] !== undefined && reference[field] !== null) referenceMetadata[field] = reference[field];
    }
    canonicalBpmInput.value = reference.bpm ?? "";
    canonicalLyricsInput.value = reference.lyrics ?? "";
    canonicalTimingInput.value = Array.isArray(reference.lyric_timing) && reference.lyric_timing.length ? JSON.stringify(reference.lyric_timing, null, 2) : "";
    $(".known-info").open = true;
    knownInfoStatus.textContent = reference.lyric_timing?.length ? `Loaded ${reference.title || "Arcadians"}: canonical release metadata, sections, ${reference.bpm} BPM, lyrics and timing.` : `Loaded ${reference.title || "Arcadians"} canonical reference metadata.`;
  } catch (error) {
    knownInfoStatus.textContent = error.message;
  }
}

chooseButton.addEventListener("click", event => { event.stopPropagation(); fileInput.click(); });
fileInput.addEventListener("change", () => void startUpload(fileInput.files?.[0]));
dropZone.addEventListener("click", event => { if (event.target !== chooseButton && !event.target.closest(".known-info")) fileInput.click(); });
dropZone.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") fileInput.click(); });
for (const name of ["dragenter", "dragover"]) dropZone.addEventListener(name, event => { event.preventDefault(); dropZone.classList.add("dragging"); });
for (const name of ["dragleave", "drop"]) dropZone.addEventListener(name, event => { event.preventDefault(); dropZone.classList.remove("dragging"); });
dropZone.addEventListener("drop", event => void startUpload(event.dataTransfer?.files?.[0]));
loadArcadiansReference?.addEventListener("click", loadArcadiansFixture);
loadArcadiansHero?.addEventListener("click", loadArcadiansFixture);

const hashFromLocation = new URLSearchParams(location.search).get("hash");
if (hashFromLocation && /^[0-9a-f]{64}$/i.test(hashFromLocation)) void openTimeline(hashFromLocation.toLowerCase(), "Existing analysis");

export { formatTimelineTime };
