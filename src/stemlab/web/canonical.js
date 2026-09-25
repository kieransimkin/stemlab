const canonicalBpmInput = document.querySelector("#canonicalBpm");
const canonicalLyricsInput = document.querySelector("#canonicalLyrics");
const canonicalTimingInput = document.querySelector("#canonicalTiming");
const knownInfoStatus = document.querySelector("#knownInfoStatus");
const loadArcadiansReference = document.querySelector("#loadArcadiansReference");
const canonicalHashNode = document.querySelector("#songHash");
const canonicalLanesNode = document.querySelector("#lanes");
const canonicalTimelineInner = document.querySelector("#timelineInner");
const canonicalLaneCount = document.querySelector("#laneCount");
const canonicalAudio = document.querySelector("#audioPlayer");

let canonicalHash = "";
let canonicalData = { bpm: null, lyrics: null, lyric_timing: [] };
let canonicalSocket = null;
let canonicalPoll = null;
let canonicalBeatAnchor = null;
let canonicalBeatSource = null;

function canonicalEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[ch]);
}

function canonicalPayloadFromForm() {
  const bpmRaw = canonicalBpmInput?.value?.trim() || "";
  const lyrics = canonicalLyricsInput?.value || "";
  const timing = canonicalTimingInput?.value || "";
  return {
    bpm: bpmRaw ? Number(bpmRaw) : null,
    lyrics: lyrics.trim() || null,
    lyric_timing: timing.trim() || [],
  };
}

function hasCanonicalInput(payload) {
  return Number.isFinite(Number(payload.bpm))
    || Boolean(payload.lyrics)
    || Boolean(typeof payload.lyric_timing === "string" && payload.lyric_timing.trim())
    || Boolean(Array.isArray(payload.lyric_timing) && payload.lyric_timing.length);
}

async function putCanonical(hash, payload) {
  const response = await fetch(`/api/${hash}/canonical`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.detail || `Could not save canonical metadata (${response.status})`);
  }
  return result.canonical || result;
}

async function getCanonical(hash) {
  const response = await fetch(`/api/${hash}/canonical`, { cache: "no-store" });
  if (!response.ok) return { bpm: null, lyrics: null, lyric_timing: [] };
  return response.json();
}

function timelineDuration() {
  const duration = Number(canonicalAudio?.duration);
  return Number.isFinite(duration) && duration > 0 ? duration : 0;
}

function ensureCanonicalLane(key, title, meta, kind) {
  let lane = canonicalLanesNode?.querySelector(`[data-key="${key}"]`);
  if (lane) return lane.querySelector(".lane-track");

  lane = document.createElement("div");
  lane.className = `lane lane-${kind} canonical-lane`;
  lane.dataset.key = key;

  const label = document.createElement("div");
  label.className = "lane-label";
  label.innerHTML = `<div class="title">${canonicalEscape(title)}</div><div class="meta">${canonicalEscape(meta)}</div>`;

  const track = document.createElement("div");
  track.className = "lane-track";
  lane.append(label, track);

  const firstNonCanonical = Array.from(canonicalLanesNode.children)
    .find(child => !child.classList.contains("canonical-lane"));
  canonicalLanesNode.insertBefore(lane, firstNonCanonical || null);
  updateCanonicalLaneCount();
  return track;
}

function clearCanonicalLane(key) {
  canonicalLanesNode?.querySelector(`[data-key="${key}"]`)?.remove();
  updateCanonicalLaneCount();
}

function updateCanonicalLaneCount() {
  if (!canonicalLaneCount || !canonicalLanesNode) return;
  const count = canonicalLanesNode.querySelectorAll(".lane").length;
  canonicalLaneCount.textContent = `${count} lane${count === 1 ? "" : "s"}`;
}

function ensureBeatGridOverlay() {
  let overlay = document.querySelector("#canonicalBeatGrid");
  if (overlay) return overlay;
  overlay = document.createElement("div");
  overlay.id = "canonicalBeatGrid";
  overlay.className = "canonical-beat-grid";
  canonicalTimelineInner.insertBefore(overlay, document.querySelector("#playhead"));
  return overlay;
}

function renderCanonicalLyrics() {
  if (!canonicalData.lyrics) {
    clearCanonicalLane("canonical:lyrics");
    return;
  }
  const track = ensureCanonicalLane(
    "canonical:lyrics",
    "Canonical lyrics",
    "known reference text",
    "canonical-lyrics"
  );
  track.innerHTML = "";
  const band = document.createElement("div");
  band.className = "canonical-lyrics-band";
  band.textContent = canonicalData.lyrics;
  band.title = canonicalData.lyrics;
  track.appendChild(band);
}

function renderCanonicalTiming() {
  const events = Array.isArray(canonicalData.lyric_timing) ? canonicalData.lyric_timing : [];
  if (!events.length) {
    clearCanonicalLane("canonical:timing");
    return;
  }
  const duration = timelineDuration();
  if (!duration) return;

  const track = ensureCanonicalLane(
    "canonical:timing",
    "Canonical lyric timing",
    `${events.length} timed lyric event${events.length === 1 ? "" : "s"}`,
    "canonical-timing"
  );
  track.innerHTML = "";

  for (const event of events) {
    const start = Number(event.start);
    const end = Number(event.end);
    if (!Number.isFinite(start) || start < 0) continue;
    const safeEnd = Number.isFinite(end) && end > start ? end : start + 0.75;
    const block = document.createElement("div");
    block.className = "event-block canonical-lyric-event";
    block.style.left = `${Math.max(0, Math.min(100, start / duration * 100))}%`;
    block.style.width = `${Math.max(0.08, (safeEnd - start) / duration * 100)}%`;
    block.textContent = String(event.text || "");
    block.title = `${block.textContent} · ${start.toFixed(3)}s — ${safeEnd.toFixed(3)}s`;
    track.appendChild(block);
  }
}

async function findFirstDetectedBeat(files) {
  const beatFiles = (files || [])
    .map(file => file.path)
    .filter(path =>
      /^beats\/.*\.json$/i.test(path)
      || path === "vamp/data/vamp_beats.json"
    );

  const preferred = [
    "beats/consensus.json",
    "beats/beat_transformer.json",
    "beats/beat_this.json",
    "beats/beatnet.json",
    "vamp/data/vamp_beats.json",
  ];

  beatFiles.sort((a, b) => {
    const ai = preferred.indexOf(a);
    const bi = preferred.indexOf(b);
    return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi) || a.localeCompare(b);
  });

  let fallback = null;
  for (const path of beatFiles) {
    try {
      const response = await fetch(
        `/${canonicalHash}/${path.split("/").map(encodeURIComponent).join("/")}`,
        { cache: "no-store" }
      );
      if (!response.ok) continue;
      const data = await response.json();

      let beats = [];
      if (Array.isArray(data.beats)) {
        beats = data.beats.map(Number).filter(Number.isFinite);
      } else if (Array.isArray(data.events)) {
        beats = data.events.map(event => Number(event.start)).filter(Number.isFinite);
      }
      if (!beats.length) continue;

      const first = Math.min(...beats.filter(value => value >= 0));
      if (!Number.isFinite(first)) continue;

      if (path === "beats/consensus.json") {
        return { time: first, source: path };
      }
      if (!fallback || first < fallback.time) {
        fallback = { time: first, source: path };
      }
    } catch {
      // A file can be announced before its writer has completely flushed it.
    }
  }
  return fallback;
}

function renderCanonicalBeatGrid() {
  const overlay = ensureBeatGridOverlay();
  overlay.innerHTML = "";

  const bpm = Number(canonicalData.bpm);
  const duration = timelineDuration();

  if (!Number.isFinite(bpm) || bpm <= 0) {
    clearCanonicalLane("canonical:bpm");
    overlay.classList.add("hidden");
    return;
  }

  const meta = canonicalBeatAnchor == null
    ? `${bpm} BPM · waiting for first detected beat`
    : `${bpm} BPM · anchor ${canonicalBeatAnchor.toFixed(3)}s · ${canonicalBeatSource || "detected beat"}`;

  const track = ensureCanonicalLane("canonical:bpm", "Canonical BPM", meta, "canonical-bpm");
  track.innerHTML = "";

  if (!duration || canonicalBeatAnchor == null) {
    const waiting = document.createElement("div");
    waiting.className = "artifact-band canonical-bpm-waiting";
    waiting.textContent = `${bpm} BPM — grid will begin at the first detected beat`;
    track.appendChild(waiting);
    overlay.classList.add("hidden");
    return;
  }

  overlay.classList.remove("hidden");
  const interval = 60 / bpm;
  const fragment = document.createDocumentFragment();
  const laneFragment = document.createDocumentFragment();

  let beatIndex = 0;
  for (
    let time = canonicalBeatAnchor;
    time <= duration + 1e-7;
    time += interval, beatIndex += 1
  ) {
    const left = Math.max(0, Math.min(100, time / duration * 100));

    const line = document.createElement("div");
    line.className = `canonical-grid-line ${beatIndex === 0 ? "anchor" : ""}`;
    line.style.left = `${left}%`;
    fragment.appendChild(line);

    const marker = document.createElement("div");
    marker.className = `marker canonical-bpm-marker ${beatIndex === 0 ? "anchor" : ""}`;
    marker.style.left = `${left}%`;
    marker.title = `Canonical beat ${beatIndex + 1} · ${time.toFixed(3)}s`;
    laneFragment.appendChild(marker);
  }

  overlay.appendChild(fragment);
  track.appendChild(laneFragment);
}

async function refreshCanonicalFromTimeline() {
  if (!canonicalHash) return;
  const response = await fetch(`/api/${canonicalHash}/timeline`, { cache: "no-store" });
  if (!response.ok) return;
  const state = await response.json();

  if (state.canonical) {
    canonicalData = state.canonical;
  }

  if (Number(canonicalData.bpm) > 0) {
    const serverAnchor = Number(state.first_detected_beat);
    if (Number.isFinite(serverAnchor) && serverAnchor >= 0) {
      canonicalBeatAnchor = serverAnchor;
      canonicalBeatSource = state.first_detected_beat_source || "detected beat";
    } else {
      const anchor = await findFirstDetectedBeat(state.files || []);
      if (anchor) {
        canonicalBeatAnchor = anchor.time;
        canonicalBeatSource = anchor.source;
      }
    }
  }

  renderCanonicalLayers();
}

function renderCanonicalLayers() {
  renderCanonicalLyrics();
  renderCanonicalTiming();
  renderCanonicalBeatGrid();
  updateCanonicalLaneCount();
}

function connectCanonicalSocket() {
  if (canonicalSocket) {
    canonicalSocket.disconnect();
    canonicalSocket = null;
  }
  if (!canonicalHash || typeof window.io !== "function") return;

  canonicalSocket = window.io({ path: "/socket.io" });
  canonicalSocket.on("connect", () => {
    canonicalSocket.emit("subscribe", { hash: canonicalHash });
  });
  canonicalSocket.on("canonical_metadata", event => {
    if (event?.canonical) {
      canonicalData = event.canonical;
      renderCanonicalLayers();
    }
  });
  canonicalSocket.on("new_file", event => {
    if (
      /^beats\/.*\.json$/i.test(event?.path || "")
      || event?.path === "vamp/data/vamp_beats.json"
    ) {
      refreshCanonicalFromTimeline().catch(() => {});
    }
  });
}

async function activateCanonicalForHash(hash) {
  if (!/^[0-9a-f]{64}$/i.test(hash || "")) return;
  canonicalHash = hash.toLowerCase();
  canonicalBeatAnchor = null;
  canonicalBeatSource = null;

  const payload = canonicalPayloadFromForm();
  try {
    if (hasCanonicalInput(payload)) {
      canonicalData = await putCanonical(canonicalHash, payload);
      if (knownInfoStatus) knownInfoStatus.textContent = "Known information saved with this song hash.";
    } else {
      canonicalData = await getCanonical(canonicalHash);
    }
  } catch (error) {
    if (knownInfoStatus) knownInfoStatus.textContent = error.message;
  }

  connectCanonicalSocket();
  await refreshCanonicalFromTimeline();

  clearInterval(canonicalPoll);
  canonicalPoll = setInterval(() => {
    refreshCanonicalFromTimeline().catch(() => {});
  }, 2500);
}

const hashObserver = new MutationObserver(() => {
  const hash = canonicalHashNode?.textContent?.trim() || "";
  if (hash && hash !== canonicalHash) {
    activateCanonicalForHash(hash).catch(console.error);
  }
});
if (canonicalHashNode) {
  hashObserver.observe(canonicalHashNode, { childList: true, characterData: true, subtree: true });
}

canonicalAudio?.addEventListener("loadedmetadata", () => renderCanonicalLayers());

const initialHash = canonicalHashNode?.textContent?.trim() || "";
if (/^[0-9a-f]{64}$/i.test(initialHash)) {
  activateCanonicalForHash(initialHash).catch(console.error);
}


loadArcadiansReference?.addEventListener("click", async event => {
  event.preventDefault();
  event.stopPropagation();
  try {
    const response = await fetch("/assets/arcadians-reference.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load Arcadians reference (${response.status})`);
    const reference = await response.json();

    if (canonicalBpmInput) canonicalBpmInput.value = reference.bpm ?? "";
    if (canonicalLyricsInput) canonicalLyricsInput.value = reference.lyrics ?? "";
    if (canonicalTimingInput) {
      canonicalTimingInput.value = Array.isArray(reference.lyric_timing) && reference.lyric_timing.length
        ? JSON.stringify(reference.lyric_timing, null, 2)
        : "";
    }
    if (knownInfoStatus) {
      knownInfoStatus.textContent = reference.lyric_timing?.length
        ? "Loaded Arcadians canonical BPM, lyrics and timing."
        : "Loaded Arcadians canonical BPM and lyrics; exact canonical LRC is identified in the example metadata.";
    }
  } catch (error) {
    if (knownInfoStatus) knownInfoStatus.textContent = error.message;
  }
});
