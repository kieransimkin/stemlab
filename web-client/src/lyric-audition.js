/** Adapt saved/edited lines to the released control's original audio clock.
 * An empty edited track is authoritative; never substitute the old canonical text.
 * Do not use viewport-filtered timing lanes to drive subtitles. */
export function auditionLines(canonical, edited = null) {
  if (edited !== null) return edited;
  return (Array.isArray(canonical?.lyric_timing) ? canonical.lyric_timing : []).flatMap(row => {
    if (row.start === null || row.start === undefined || row.start === "") return [];
    const start = Number(row.start);
    if (!Number.isFinite(start) || start < 0) return [];
    const item = {start, label:String(row.text ?? "")};
    if (row.end !== null && row.end !== undefined && row.end !== "") item.end = Number(row.end);
    return [item];
  });
}

/** Only full-duration channels discovered from this analysis share lyric time. */
export function auditionChannels(lanes, duration) {
  return lanes.filter(lane => typeof lane.audioSrc === "string" && lane.audioSrc &&
    (lane.id === "__source__" || Number.isFinite(lane.duration) &&
      duration > 0 && Math.abs(lane.duration - duration) <= .05))
    .slice().sort((a,b) => a.id === "__source__" ? -1 : b.id === "__source__" ? 1 : a.id.localeCompare(b.id));
}

/** Loop excerpt files/downloads belong to the master, not an arbitrary stem. */
export function channelLoops(loops, isMaster) {
  return isMaster ? loops : loops.map(({audioSrc, downloadUrl, ...loop}) => loop);
}
