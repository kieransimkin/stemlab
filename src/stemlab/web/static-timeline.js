/* Static GET snapshot adapter; the original React bundle owns all rendering/playback. */
(() => {
  "use strict";
  const node = document.getElementById("stemlab-static-data");
  const data = JSON.parse(node.textContent);
  if (data.schema !== "stemlab.static-timeline.v1" || !/^[a-f0-9]{64}$/.test(data.hash)) {
    throw new Error("Invalid StemLab static snapshot");
  }
  const base = new URL(".", document.baseURI);
  const routes = Object.freeze(data.routes);
  const nativeTimeout = window.setTimeout.bind(window);
  function url(value) {
    const u = new URL(value, base);
    if (u.origin !== base.origin) throw new Error("External snapshot route refused");
    let key = decodeURIComponent(u.pathname);
    if (/\/(waveform|spectrogram)$/.test(key)) key += "?path=" + u.searchParams.get("path");
    const target = routes[key];
    if (!target || target.startsWith("/") || target.split("/").some(p => !p || p === "..") || target.includes(":")) {
      throw new Error("Unmapped static timeline route: " + key);
    }
    const resolved = new URL(target.split("/").map(encodeURIComponent).join("/"), base);
    resolved.searchParams.set("v", data.version);
    return resolved.href;
  }
  Object.defineProperty(window, "__stemlabStatic", {value: Object.freeze({
    url,
    interval: () => 0,
    timeout: (fn, delay, ...args) => delay === 2500 ? 0 : nativeTimeout(fn, delay, ...args),
    sourceHash: data.hash,
    artworkUrl: data.artwork ? new URL(data.artwork, base).href : undefined,
    lyricItems: data.lyric_items ?? null,
    search: "?hash=" + data.hash,
    apiRequired: false,
  }), writable: false});
  document.getElementById("uploadView").hidden = true;
})();
