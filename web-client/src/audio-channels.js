/** Group matching audio/NPZ lanes without resampling either representation.
 * Keep separator-qualified source identities; never match prettified titles.
 * Use analysis provenance when present (including non-standard stem filenames).
 * Decorative PNGs with axes/padding are NOT time-aligned backgrounds.
 */
const audioExtensions = /\.(wav|flac|mp3|ogg|opus|m4a|aif|aiff)$/i;
function audioKey(path) {
  if (path === "__source__" || path.startsWith("input/")) return "master";
  if (path.startsWith("stems/")) return path.slice(6).replace(audioExtensions, "");
  if (path.startsWith("speech/") && audioExtensions.test(path)) return path.replace(audioExtensions, "");
  return null;
}
export function groupAudioLanes(lanes) {
  const groups = new Map(), other = [], sourceMap = new Map();
  for (const lane of lanes) for (const record of Array.isArray(lane.sourceMap) ? lane.sourceMap : []) {
    if (typeof record?.audio === "string" && typeof record.data === "string") {
      const key = audioKey(record.audio.replace(/\\/g, "/"));
      if (key) {
        sourceMap.set(record.data.replace(/\\/g, "/"), key);
        if (typeof record.png === "string") sourceMap.set(record.png.replace(/\\/g, "/"), key);
      }
    }
  }
  const group = key => {
    if (!groups.has(key)) groups.set(key, {key});
    return groups.get(key);
  };
  for (const lane of lanes) {
    const path = (lane.id?.replace(/^file:/, "") || "").replace(/\\/g, "/");
    const key = audioKey(path);
    const spec = path.startsWith("spectrograms/")
      ? sourceMap.get(path) || path.slice(13).replace(/\.(npz|png)$/i, "") : null;
    if (key && (lane.content?.type === "waveform" || lane.content?.type === "artifact")) {
      const item = group(key);
      if (!item.audio || lane.id === "__source__") item.audio = lane;
    } else if (spec && path.endsWith(".npz") && lane.content?.type === "image") {
      group(spec).spectrum = lane;
    } else if (spec && path.endsWith(".png") && lane.content?.type === "image") {
      group(spec).png = lane;
    } else other.push(lane);
  }
  for (const item of groups.values()) {
    if (!item.audio && !item.spectrum) {if (item.png) other.push(item.png); continue;}
    const primary = item.audio || item.spectrum;
    const wave = item.audio?.content?.type === "waveform" ? item.audio.content : null;
    const failure = item.audio?.content?.type === "artifact" ? item.audio.content.note : null;
    other.push({...primary,
      id:item.key === "master" ? "__source__" : `audio:${item.key}`,
      title:item.key === "master" ? "MASTER · uploaded source" : item.key.replace(/\//g, " · ").replace(/_/g, " "),
      kind:"audio", height:160,
      meta:failure || (wave && item.spectrum ? "waveform + aligned spectrogram" : wave ? "waveform · spectrogram pending" : "spectrogram · waveform pending"),
      content:{type:"audio", view:"both",
        waveform:wave ? {min:wave.min, max:wave.max, colour:wave.colour} : undefined,
        spectrogram:item.spectrum ? {src:item.spectrum.content.src, alt:item.spectrum.content.alt} : undefined},
    });
    if (!item.spectrum && item.png) other.push(item.png);
  }
  return other;
}
