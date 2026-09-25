const $ = (selector) => document.querySelector(selector);

const uploadView = $("#uploadView");
const timelineView = $("#timelineView");
const dropZone = $("#dropZone");
const fileInput = $("#fileInput");
const chooseButton = $("#chooseButton");
const uploadProgressWrap = $("#uploadProgressWrap");
const uploadProgress = $("#uploadProgress");
const uploadLabel = $("#uploadLabel");

const audio = $("#audioPlayer");
const playButton = $("#playButton");
const fitButton = $("#fitButton");
const zoomSlider = $("#zoomSlider");
const followPlayhead = $("#followPlayhead");
const timelineScroller = $("#timelineScroller");
const timelineInner = $("#timelineInner");
const lanesNode = $("#lanes");
const rulerTrack = $("#rulerTrack");
const playhead = $("#playhead");
const timeDisplay = $("#timeDisplay");
const windowDisplay = $("#windowDisplay");
const songName = $("#songName");
const songHash = $("#songHash");
const jobState = $("#jobState");
const laneCount = $("#laneCount");
const logNode = $("#log");
const connectionBadge = $("#connectionBadge");

const LABEL_WIDTH = () => parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--label-width")) || 230;
const AUDIO_EXTENSIONS = new Set(["wav", "flac", "mp3", "ogg", "opus", "m4a", "aif", "aiff"]);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  })[ch]);
}

function fmtTime(seconds) {
  seconds = Math.max(0, Number(seconds) || 0);
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds - Math.floor(seconds)) * 1000);
  return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${String(millis).padStart(3, "0")}`;
}

function fileExt(path) {
  const base = String(path).split("/").pop() || "";
  const pos = base.lastIndexOf(".");
  return pos >= 0 ? base.slice(pos + 1).toLowerCase() : "";
}

function basename(path) {
  return String(path).split("/").pop() || String(path);
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

function uploadFile(file) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `/upload/${encodeURIComponent(file.name)}`);
    xhr.setRequestHeader("Content-Type", file.type || "application/octet-stream");
    xhr.upload.onprogress = event => {
      uploadProgressWrap.classList.remove("hidden");
      const ratio = event.lengthComputable ? event.loaded / event.total : 0;
      uploadProgress.style.width = `${Math.round(ratio * 100)}%`;
      uploadLabel.textContent = event.lengthComputable
        ? `${Math.round(ratio * 100)}% · ${(event.loaded / 1048576).toFixed(1)} / ${(event.total / 1048576).toFixed(1)} MiB`
        : `${(event.loaded / 1048576).toFixed(1)} MiB uploaded`;
    };
    xhr.onerror = () => reject(new Error("Upload failed"));
    xhr.onload = () => {
      let payload = {};
      try { payload = JSON.parse(xhr.responseText); } catch {}
      if (xhr.status < 200 || xhr.status >= 300) {
        reject(new Error(payload.detail || `Upload failed (${xhr.status})`));
        return;
      }
      resolve(payload);
    };
    xhr.send(file);
  });
}

class Timeline {
  constructor() {
    this.hash = null;
    this.filename = null;
    this.duration = 0;
    this.fitPps = 4;
    this.pps = 8;
    this.zoomValue = 20;
    this.lanes = new Map();
    this.files = new Map();
    this.socket = null;
    this.raf = null;
    this.refreshTimer = null;
    this.autoScrollLock = false;
    this.bindUI();
  }

  bindUI() {
    playButton.addEventListener("click", () => {
      if (!this.duration) return;
      if (audio.paused) audio.play().catch(error => this.appendLog("stderr", error.message));
      else audio.pause();
    });
    audio.addEventListener("play", () => {
      playButton.textContent = "❚❚";
      this.startAnimation();
    });
    audio.addEventListener("pause", () => {
      playButton.textContent = "▶";
      this.drawPlayhead();
    });
    audio.addEventListener("ended", () => {
      playButton.textContent = "▶";
      this.drawPlayhead();
    });
    audio.addEventListener("loadedmetadata", () => {
      this.duration = Number(audio.duration) || this.duration || 0;
      this.recomputeFit();
      this.setZoom(this.zoomValue, false);
      this.drawRuler();
      this.drawPlayhead();
      this.refreshWindowReadout();
      this.ensureSourceLane();
    });
    fitButton.addEventListener("click", () => this.fit());
    zoomSlider.addEventListener("input", event => this.setZoom(Number(event.target.value), true));
    timelineScroller.addEventListener("scroll", () => this.refreshWindowReadout());
    timelineScroller.addEventListener("click", event => this.seekFromPointer(event));
    window.addEventListener("resize", () => {
      const oldFit = this.fitPps;
      this.recomputeFit();
      if (this.zoomValue <= 1 || Math.abs(this.pps - oldFit) < 0.05) this.fit();
      this.refreshWindowReadout();
    });
  }

  async open(hash, filename) {
    this.hash = hash;
    this.filename = filename || "uploaded audio";
    songName.textContent = this.filename;
    songHash.textContent = hash;
    uploadView.classList.add("hidden");
    timelineView.classList.remove("hidden");

    audio.src = `/api/${hash}/source`;
    audio.load();

    this.connectSocket();
    await this.refreshTimeline();

    clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(() => this.refreshTimeline().catch(() => {}), 2500);
  }

  connectSocket() {
    if (this.socket) this.socket.disconnect();
    if (typeof window.io !== "function") {
      connectionBadge.textContent = "polling";
      connectionBadge.classList.add("muted");
      this.appendLog("stderr", "Socket.IO browser client unavailable; timeline inventory polling remains active.");
      return;
    }
    this.socket = window.io({ path: "/socket.io" });
    this.socket.on("connect", () => {
      connectionBadge.textContent = "live";
      connectionBadge.classList.remove("muted");
      this.socket.emit("subscribe", { hash: this.hash });
    });
    this.socket.on("disconnect", () => {
      connectionBadge.textContent = "reconnecting";
      connectionBadge.classList.add("muted");
    });
    this.socket.on("process_output", event => {
      this.appendLog(event.stream || "stdout", event.line || "");
    });
    this.socket.on("process_history", event => {
      for (const line of event.stdout || []) this.appendLog("stdout", line);
      for (const line of event.stderr || []) this.appendLog("stderr", line);
    });
    this.socket.on("new_file", event => {
      if (!event.path) return;
      this.addFile({ path: event.path, bytes: event.bytes, mtime_ns: event.mtime_ns });
    });
    this.socket.on("job_status", event => {
      this.setJobStatus(event.status || {});
      this.refreshTimeline().catch(() => {});
    });
    this.socket.on("job_timeout", event => {
      this.appendLog("stderr", `Job timeout: ${event.message || "analysis exceeded timeout"}`);
    });
  }

  async refreshTimeline() {
    if (!this.hash) return;
    const response = await fetch(`/api/${this.hash}/timeline`, { cache: "no-store" });
    if (!response.ok) return;
    const state = await response.json();
    this.setJobStatus(state.status || {});
    if (!this.duration && state.duration_seconds) {
      this.duration = Number(state.duration_seconds);
      this.recomputeFit();
      this.setZoom(this.zoomValue, false);
    }
    for (const file of state.files || []) this.addFile(file);
  }

  setJobStatus(status) {
    const state = status.state || "submitted";
    jobState.textContent = state;
    jobState.className = `badge ${state}`;
  }

  recomputeFit() {
    if (!this.duration) return;
    const available = Math.max(320, timelineScroller.clientWidth - LABEL_WIDTH() - 16);
    this.fitPps = Math.max(0.4, available / this.duration);
  }

  fit() {
    this.recomputeFit();
    this.zoomValue = 0;
    zoomSlider.value = "0";
    this.setPps(this.fitPps, 0);
  }

  setZoom(value, preserveCenter = true) {
    this.zoomValue = value;
    const multiplier = Math.pow(2, value / 18);
    const next = Math.max(this.fitPps || 0.4, (this.fitPps || 0.4) * multiplier);
    let centerTime = 0;
    if (preserveCenter && this.pps > 0) {
      centerTime = Math.max(0, (timelineScroller.scrollLeft + timelineScroller.clientWidth / 2 - LABEL_WIDTH()) / this.pps);
    }
    this.setPps(next, preserveCenter ? centerTime : null);
  }

  setPps(pps, centerTime = null) {
    this.pps = Math.max(0.2, pps);
    const trackWidth = Math.max(1, this.duration * this.pps);
    document.documentElement.style.setProperty("--track-width", `${trackWidth}px`);
    this.drawRuler();
    this.drawPlayhead();
    if (centerTime !== null) {
      requestAnimationFrame(() => {
        timelineScroller.scrollLeft = Math.max(0, LABEL_WIDTH() + centerTime * this.pps - timelineScroller.clientWidth / 2);
        this.refreshWindowReadout();
      });
    }
  }

  drawRuler() {
    rulerTrack.innerHTML = "";
    if (!this.duration || !this.pps) return;
    const candidateSteps = [0.1, 0.25, 0.5, 1, 2, 5, 10, 15, 30, 60, 120, 300, 600];
    const step = candidateSteps.find(value => value * this.pps >= 70) || candidateSteps.at(-1);
    const minor = step / 5;
    const fragment = document.createDocumentFragment();

    for (let t = 0; t <= this.duration + 1e-6; t += minor) {
      const major = Math.abs((t / step) - Math.round(t / step)) < 1e-5;
      const tick = document.createElement("div");
      tick.className = `tick ${major ? "major" : ""}`;
      tick.style.left = `${t * this.pps}px`;
      fragment.appendChild(tick);
      if (major) {
        const label = document.createElement("div");
        label.className = "tick-label";
        label.style.left = `${t * this.pps}px`;
        label.textContent = fmtTime(t).slice(0, -4);
        fragment.appendChild(label);
      }
    }
    rulerTrack.appendChild(fragment);
  }

  seekFromPointer(event) {
    if (!this.duration || event.target.closest(".lane-label")) return;
    const rect = timelineScroller.getBoundingClientRect();
    const contentX = event.clientX - rect.left + timelineScroller.scrollLeft - LABEL_WIDTH();
    if (contentX < 0) return;
    const time = Math.max(0, Math.min(this.duration, contentX / this.pps));
    audio.currentTime = time;
    this.drawPlayhead();
  }

  startAnimation() {
    cancelAnimationFrame(this.raf);
    const step = () => {
      this.drawPlayhead();
      if (!audio.paused && !audio.ended) this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }

  drawPlayhead() {
    const time = Number(audio.currentTime) || 0;
    playhead.style.left = `${LABEL_WIDTH() + time * this.pps}px`;
    timeDisplay.textContent = `${fmtTime(time)} / ${fmtTime(this.duration)}`;

    if (!audio.paused && followPlayhead.checked && !this.autoScrollLock) {
      const x = LABEL_WIDTH() + time * this.pps;
      const left = timelineScroller.scrollLeft;
      const right = left + timelineScroller.clientWidth;
      const margin = Math.min(180, timelineScroller.clientWidth * 0.2);
      if (x > right - margin) {
        this.autoScrollLock = true;
        timelineScroller.scrollLeft = Math.max(0, x - timelineScroller.clientWidth + margin);
        this.autoScrollLock = false;
      }
    }
    this.refreshWindowReadout();
  }

  refreshWindowReadout() {
    if (!this.duration || !this.pps) return;
    const leftPixels = Math.max(0, timelineScroller.scrollLeft - LABEL_WIDTH());
    const rightPixels = Math.max(0, timelineScroller.scrollLeft + timelineScroller.clientWidth - LABEL_WIDTH());
    const start = Math.max(0, Math.min(this.duration, leftPixels / this.pps));
    const end = Math.max(start, Math.min(this.duration, rightPixels / this.pps));
    windowDisplay.textContent = `${fmtTime(start)} — ${fmtTime(end)}`;
  }

  appendLog(stream, line) {
    if (!line) return;
    const row = document.createElement("div");
    row.className = stream === "stderr" ? "stderr" : "stdout";
    row.textContent = `[${stream}] ${line}`;
    logNode.appendChild(row);
    while (logNode.children.length > 800) logNode.firstChild.remove();
    logNode.scrollTop = logNode.scrollHeight;
  }

  createLane(key, title, meta, kind) {
    if (this.lanes.has(key)) return this.lanes.get(key);
    const lane = document.createElement("div");
    lane.className = `lane lane-${kind}`;
    lane.dataset.key = key;

    const label = document.createElement("div");
    label.className = "lane-label";
    label.innerHTML = `<div class="title">${escapeHtml(title)}</div><div class="meta">${escapeHtml(meta || kind)}</div>`;

    const track = document.createElement("div");
    track.className = "lane-track";
    lane.append(label, track);
    lanesNode.appendChild(lane);

    const item = { lane, label, track, kind, rendered: false };
    this.lanes.set(key, item);
    laneCount.textContent = `${this.lanes.size} lane${this.lanes.size === 1 ? "" : "s"}`;
    return item;
  }

  ensureSourceLane() {
    if (!this.hash || !this.duration) return;
    const key = "__source__";
    const lane = this.createLane(key, "MASTER · uploaded source", this.filename, "waveform");
    if (lane.rendered) return;
    lane.rendered = true;
    this.renderWaveform(lane.track, "__source__");
  }

  addFile(file) {
    if (!file?.path || this.files.has(file.path)) return;
    this.files.set(file.path, file);
    const path = file.path;
    const ext = fileExt(path);
    const key = `file:${path}`;

    if (path === "canonical.json") {
      return;
    }

    if (AUDIO_EXTENSIONS.has(ext)) {
      const lane = this.createLane(key, prettyPath(path), "audio waveform", "waveform");
      lane.rendered = true;
      this.renderWaveform(lane.track, path);
      return;
    }

    if (path.startsWith("spectrograms/") && ext === "npz") {
      const lane = this.createLane(key, prettyPath(path), "spectrogram data · exact song timeline", "spectrogram");
      lane.rendered = true;
      this.renderSpectrogram(lane.track, path);
      return;
    }

    if (path.startsWith("spectrograms/") && ext === "png") {
      const lane = this.createLane(key, prettyPath(path), "rendered spectrogram PNG", "image");
      lane.rendered = true;
      const image = new Image();
      image.className = "preview-image";
      image.src = `/${this.hash}/${path.split("/").map(encodeURIComponent).join("/")}`;
      lane.track.appendChild(image);
      return;
    }

    if (path.startsWith("beats/") && ext === "json") {
      const lane = this.createLane(key, prettyPath(path), "beat / downbeat events", "events");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderBeats(lane.track, data)).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path.startsWith("vamp/data/") && ext === "json") {
      const lane = this.createLane(key, prettyPath(path), "Vamp feature analysis", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderVamp(lane.track, data)).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "speech/whisper.json") {
      const lane = this.createLane(key, "Speech · Whisper words", "word-aligned transcript", "words");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderWords(lane.track, data.words || [])).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }


    if (path === "deep/structure/structure.json") {
      const lane = this.createLane(key, "Deep · functional structure", "All-In-One · functional song sections", "deep-structure");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderSegments(lane.track, data.segments || [])).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/song_map/song_map.json") {
      const lane = this.createLane(key, "Deep · song map", "section-level sonic / rhythm / harmony / lyric fusion", "deep-structure");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderSegments(lane.track, data.sections || [])).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/harmony/harmony.json") {
      const lane = this.createLane(key, "Deep · harmony", "collapsed chord progression + key evidence", "deep-harmony");
      lane.rendered = true;
      this.fetchJson(path).then(data => {
        const chords = data.chords?.collapsed_progression || [];
        if (chords.length) this.renderSegments(lane.track, chords);
        else this.renderDeepSummary(lane.track, [
          ["key", data.vamp_key || data.independent_key_candidates_from_nnls_chroma?.[0]?.key || "—"],
          ["tuning", data.tuning_hz ? `${Number(data.tuning_hz).toFixed(1)} Hz` : "—"],
        ]);
      }).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/lyrics/lyrics.json") {
      const lane = this.createLane(key, "Deep · rhyme & prosody", "phonetic rhyme, repetition and delivery", "deep-lyrics");
      lane.rendered = true;
      this.fetchJson(path).then(data => {
        const timed = (data.lines || []).filter(item => Number.isFinite(Number(item.start)) && Number.isFinite(Number(item.end)));
        if (timed.length) this.renderSegments(lane.track, timed.map(item => ({...item, label: item.text})));
        else this.renderDeepSummary(lane.track, [
          ["rhyme scheme", data.rhyme?.scheme || "—"],
          ["lines", data.line_count ?? "—"],
          ["words", data.word_count ?? "—"],
        ]);
      }).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/sonic/sonic.json") {
      const lane = this.createLane(key, "Deep · sonic profile", "loudness · dynamics · timbre · stereo", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderDeepSummary(lane.track, [
        ["LUFS", this.deepNumber(data.loudness?.integrated_lufs_bs1770, 1)],
        ["crest", this.deepNumber(data.loudness?.crest_factor_db, 1, " dB")],
        ["RMS range", this.deepNumber(data.loudness?.short_term_rms_range_db_p95_p10, 1, " dB")],
        ["centroid", this.deepNumber(data.timbre?.spectral_centroid_hz_mean, 0, " Hz")],
        ["stereo corr", this.deepNumber(data.stereo?.left_right_correlation, 2)],
      ])).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/rhythm/rhythm.json") {
      const lane = this.createLane(key, "Deep · groove", "meter · stability · swing · syncopation evidence", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderDeepSummary(lane.track, [
        ["tempo", this.deepNumber(data.tempo?.median_bpm, 2, " BPM")],
        ["meter", data.meter?.estimated_beats_per_bar ? `${data.meter.estimated_beats_per_bar}/4-ish` : "—"],
        ["swing", this.deepNumber(data.groove?.swing_ratio_long_to_short, 2, ":1")],
        ["offbeat energy", this.deepNumber(data.groove?.offbeat_onset_energy_ratio, 3)],
        ["onsets/s", this.deepNumber(data.groove?.onset_density_per_second, 2)],
      ])).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/semantic_text/semantic_text.json") {
      const lane = this.createLane(key, "Deep · lyric semantics", "sentence embedding theme similarities · not probabilities", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => this.renderDeepSummary(
        lane.track,
        (data.theme_similarity || []).slice(0, 7).map(item => [item.theme, this.deepNumber(item.similarity, 3)])
      )).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/semantic_audio/semantic_audio.json") {
      const lane = this.createLane(key, "Deep · audio semantics", "MuQ-MuLan zero-shot similarities · CC-BY-NC weights", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => {
        const items = Object.entries(data.prompt_sets || {}).flatMap(([category, values]) =>
          (values || []).slice(0, 2).map(item => [`${category}: ${item.prompt}`, this.deepNumber(item.similarity, 3)])
        );
        this.renderDeepSummary(lane.track, items);
      }).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    if (path === "deep/summary.json") {
      const lane = this.createLane(key, "Deep · analysis summary", "cross-domain action inventory", "feature");
      lane.rendered = true;
      this.fetchJson(path).then(data => {
        const items = Object.entries(data.analyses || {}).map(([name, rec]) => [name, rec.available ? "ready" : "unavailable"]);
        if ((data.errors || []).length) items.push(["errors", data.errors.length]);
        this.renderDeepSummary(lane.track, items);
      }).catch(error => this.renderArtifact(lane.track, path, error.message));
      return;
    }

    const lane = this.createLane(key, prettyPath(path), `${ext || "file"} · ${Number(file.bytes || 0).toLocaleString()} bytes`, "artifact");
    lane.rendered = true;
    this.renderArtifact(lane.track, path);
  }

  async fetchJson(path) {
    const response = await fetch(`/${this.hash}/${path.split("/").map(encodeURIComponent).join("/")}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  }

  async renderWaveform(track, path) {
    const params = new URLSearchParams({ path, points: "12000" });
    const response = await fetch(`/api/${this.hash}/waveform?${params}`);
    if (!response.ok) {
      this.renderArtifact(track, path, `waveform unavailable (${response.status})`);
      return;
    }
    const data = await response.json();
    if (!this.duration && data.duration_seconds) {
      this.duration = data.duration_seconds;
      this.recomputeFit();
      this.setZoom(this.zoomValue, false);
    }

    const canvas = document.createElement("canvas");
    canvas.className = "waveform-canvas";
    const width = Math.max(1, data.min.length);
    canvas.width = width;
    canvas.height = 180;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#79c0ff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    const mid = canvas.height / 2;
    const scale = canvas.height * 0.46;
    for (let i = 0; i < width; i++) {
      const x = i + 0.5;
      ctx.moveTo(x, mid - (Number(data.max[i]) || 0) * scale);
      ctx.lineTo(x, mid - (Number(data.min[i]) || 0) * scale);
    }
    ctx.stroke();
    track.appendChild(canvas);
  }

  async renderSpectrogram(track, path, attempt = 0) {
    const params = new URLSearchParams({ path, max_width: "8192", max_height: "768" });
    const response = await fetch(`/api/${this.hash}/spectrogram?${params}`, { cache: "no-store" });
    if (!response.ok) {
      if (attempt < 5 && [409, 423, 500].includes(response.status)) {
        setTimeout(() => this.renderSpectrogram(track, path, attempt + 1), 1500 * (attempt + 1));
        return;
      }
      this.renderArtifact(track, path, `spectrogram unavailable (${response.status})`);
      return;
    }
    const blob = await response.blob();
    const image = new Image();
    image.className = "spectrogram-image";
    image.src = URL.createObjectURL(blob);
    image.onload = () => URL.revokeObjectURL(image.src);
    track.appendChild(image);
  }

  renderBeats(track, data) {
    const beats = Array.isArray(data.beats) ? data.beats : [];
    const downbeats = new Set((data.downbeats || []).map(value => Number(value).toFixed(3)));
    for (const value of beats) {
      const time = Number(value);
      if (!Number.isFinite(time) || !this.duration) continue;
      const marker = document.createElement("div");
      marker.className = `marker ${downbeats.has(time.toFixed(3)) ? "downbeat" : ""}`;
      marker.style.left = `${(time / this.duration) * 100}%`;
      track.appendChild(marker);
    }
  }

  renderWords(track, words) {
    for (const word of words) {
      const start = Number(word.start);
      const end = Number(word.end);
      if (!Number.isFinite(start) || !this.duration) continue;
      const block = document.createElement("div");
      block.className = "event-block";
      block.style.left = `${(start / this.duration) * 100}%`;
      block.style.width = `${Math.max(0.08, ((Math.max(start + 0.03, end) - start) / this.duration) * 100)}%`;
      block.textContent = String(word.word || "").trim();
      block.title = `${block.textContent} · ${fmtTime(start)}`;
      track.appendChild(block);
    }
  }

  renderVamp(track, data) {
    const events = Array.isArray(data.events) ? data.events : [];
    const kind = String(data.kind || "");

    if (kind === "curve") {
      this.renderCurve(track, events);
      return;
    }
    if (kind === "matrix") {
      this.renderMatrix(track, events);
      return;
    }
    if (kind === "notes") {
      this.renderNotes(track, events);
      return;
    }
    if (kind === "segments") {
      this.renderSegments(track, events);
      return;
    }
    if (kind === "events") {
      for (const event of events) {
        const start = Number(event.start);
        if (!Number.isFinite(start) || !this.duration) continue;
        const marker = document.createElement("div");
        marker.className = "marker";
        marker.style.left = `${(start / this.duration) * 100}%`;
        track.appendChild(marker);
      }
      return;
    }

    const label = events[0]?.label || events[0]?.values?.join(", ") || data.title || "analysis";
    const band = document.createElement("div");
    band.className = "artifact-band";
    band.textContent = label;
    track.appendChild(band);
  }

  renderSegments(track, events) {
    for (const event of events) {
      const start = Number(event.start);
      let end = Number(event.end);
      if (!Number.isFinite(start) || !this.duration) continue;
      if (!Number.isFinite(end) || end <= start) end = Math.min(this.duration, start + 0.5);
      const block = document.createElement("div");
      block.className = "event-block";
      block.style.left = `${(start / this.duration) * 100}%`;
      block.style.width = `${Math.max(0.08, ((end - start) / this.duration) * 100)}%`;
      block.textContent = event.label || event.values?.[0] || "";
      block.title = `${block.textContent} · ${fmtTime(start)} — ${fmtTime(end)}`;
      track.appendChild(block);
    }
  }

  renderNotes(track, events) {
    const notes = events
      .map(event => ({ event, freq: Number(event.values?.[0]) }))
      .filter(item => Number.isFinite(item.freq) && item.freq > 0);
    if (!notes.length) return;
    const minLog = Math.log2(Math.max(20, Math.min(...notes.map(item => item.freq))));
    const maxLog = Math.log2(Math.max(...notes.map(item => item.freq), 100));
    for (const { event, freq } of notes) {
      const start = Number(event.start) || 0;
      let end = Number(event.end);
      if (!Number.isFinite(end) || end <= start) end = start + 0.12;
      const norm = (Math.log2(freq) - minLog) / Math.max(0.01, maxLog - minLog);
      const block = document.createElement("div");
      block.className = "note-block";
      block.style.left = `${(start / this.duration) * 100}%`;
      block.style.width = `${Math.max(0.04, ((end - start) / this.duration) * 100)}%`;
      block.style.top = `${8 + (1 - norm) * 72}px`;
      block.title = `${event.label || freq.toFixed(1) + " Hz"} · ${fmtTime(start)}`;
      track.appendChild(block);
    }
  }

  renderCurve(track, events) {
    const points = events
      .map(event => [Number(event.start), Number(event.values?.[0])])
      .filter(([time, value]) => Number.isFinite(time) && Number.isFinite(value) && value > 0);
    if (!points.length || !this.duration) return;
    const values = points.map(point => point[1]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const width = 2000;
    const height = 180;
    const coords = points.map(([time, value]) => {
      const x = (time / this.duration) * width;
      const y = height - ((value - min) / Math.max(1e-9, max - min)) * (height - 12) - 6;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    }).join(" ");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("curve-svg");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.setAttribute("preserveAspectRatio", "none");
    svg.innerHTML = `<polyline fill="none" stroke="#7ee787" stroke-width="2" vector-effect="non-scaling-stroke" points="${coords}"/>`;
    track.appendChild(svg);
  }

  renderMatrix(track, events) {
    const rows = events.map(event => event.values || []).filter(values => values.length);
    if (!rows.length) return;
    const bins = Math.max(...rows.map(values => values.length));
    const canvas = document.createElement("canvas");
    canvas.className = "matrix-canvas";
    canvas.width = Math.min(4096, rows.length);
    canvas.height = Math.min(256, bins);
    const ctx = canvas.getContext("2d");
    const image = ctx.createImageData(canvas.width, canvas.height);

    for (let x = 0; x < canvas.width; x++) {
      const sourceX = Math.min(rows.length - 1, Math.floor(x * rows.length / canvas.width));
      const values = rows[sourceX];
      const localMax = Math.max(1e-9, ...values.map(value => Number(value) || 0));
      for (let y = 0; y < canvas.height; y++) {
        const bin = Math.min(values.length - 1, Math.floor((canvas.height - 1 - y) * values.length / canvas.height));
        const v = Math.max(0, Math.min(1, (Number(values[bin]) || 0) / localMax));
        const idx = (y * canvas.width + x) * 4;
        image.data[idx] = Math.round(40 + 180 * v);
        image.data[idx + 1] = Math.round(35 + 110 * v);
        image.data[idx + 2] = Math.round(80 + 170 * v);
        image.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(image, 0, 0);
    track.appendChild(canvas);
  }

  deepNumber(value, digits = 2, suffix = "") {
    const number = Number(value);
    return Number.isFinite(number) ? `${number.toFixed(digits)}${suffix}` : "—";
  }

  renderDeepSummary(track, items) {
    const band = document.createElement("div");
    band.className = "deep-summary-band";
    for (const [label, value] of items || []) {
      if (value === undefined || value === null || value === "") continue;
      const chip = document.createElement("div");
      chip.className = "deep-summary-chip";
      const strong = document.createElement("strong");
      strong.textContent = `${label}: `;
      chip.append(strong, document.createTextNode(String(value)));
      band.appendChild(chip);
    }
    if (!band.children.length) {
      const chip = document.createElement("div");
      chip.className = "deep-summary-chip";
      chip.textContent = "analysis available";
      band.appendChild(chip);
    }
    track.appendChild(band);
  }

  renderArtifact(track, path, note = "") {
    if (track.querySelector(".artifact-band")) return;
    const band = document.createElement("div");
    band.className = "artifact-band";
    const href = path && path !== "__source__"
      ? `/${this.hash}/${path.split("/").map(encodeURIComponent).join("/")}`
      : `/api/${this.hash}/source`;
    band.innerHTML = `<span>${escapeHtml(note || "Generated analysis artifact")}</span><a href="${href}" target="_blank" rel="noopener">open</a>`;
    track.appendChild(band);
  }
}

const timeline = new Timeline();

async function startUpload(file) {
  if (!file) return;
  uploadProgress.style.width = "0%";
  uploadLabel.textContent = `Uploading ${file.name}`;
  uploadProgressWrap.classList.remove("hidden");
  try {
    const response = await uploadFile(file);
    uploadProgress.style.width = "100%";
    uploadLabel.textContent = "Upload complete · attaching to analysis";
    await timeline.open(response.hash, response.filename || file.name);
  } catch (error) {
    uploadLabel.textContent = error.message;
    uploadProgress.style.width = "0%";
  }
}

chooseButton.addEventListener("click", event => {
  event.stopPropagation();
  fileInput.click();
});
fileInput.addEventListener("change", () => startUpload(fileInput.files?.[0]));
dropZone.addEventListener("click", event => {
  if (event.target === chooseButton || event.target.closest(".known-info")) return;
  fileInput.click();
});
dropZone.addEventListener("keydown", event => {
  if (event.key === "Enter" || event.key === " ") fileInput.click();
});
for (const name of ["dragenter", "dragover"]) {
  dropZone.addEventListener(name, event => {
    event.preventDefault();
    dropZone.classList.add("dragging");
  });
}
for (const name of ["dragleave", "drop"]) {
  dropZone.addEventListener(name, event => {
    event.preventDefault();
    dropZone.classList.remove("dragging");
  });
}
dropZone.addEventListener("drop", event => startUpload(event.dataTransfer?.files?.[0]));

const hashFromLocation = new URLSearchParams(location.search).get("hash");
if (hashFromLocation && /^[0-9a-f]{64}$/i.test(hashFromLocation)) {
  timeline.open(hashFromLocation.toLowerCase(), "Existing analysis").catch(console.error);
}
