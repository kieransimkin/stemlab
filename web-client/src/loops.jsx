import React, { useEffect, useMemo, useState } from "react";
import { TIMELINE_LOOP_API_VERSION } from "react-timeline-sequence";

// An older installed timeline must fail the build, not silently ignore the new props.
if (TIMELINE_LOOP_API_VERSION !== 1) throw new Error("StemLab requires timeline loop API v1; see docs/loops.md");

export function mapAnalysisLoops(report, hash) {
  if (!report || report.schema !== "stemlab.loops.v1") return [];
  const sampleRate = report.sample_rate;
  if (!Number.isSafeInteger(sampleRate) || sampleRate <= 0) return [];
  return (report.loops || []).flatMap(loop => {
    if (!/^(verse|chorus)-\d+-\d+$/.test(loop.id)
      || !Number.isSafeInteger(loop.start_sample) || !Number.isSafeInteger(loop.end_sample)
      || loop.start_sample < 0 || loop.end_sample <= loop.start_sample
      || loop.end_sample > report.source_frames) return [];
    const version = encodeURIComponent(`${report.source_sha256}:${loop.start_sample}:${loop.end_sample}`);
    return [{
      id: loop.id,
      label: `${loop.section_label} · ${loop.bars} bar${loop.bars === 1 ? "" : "s"}`,
      startSample: loop.start_sample,
      endSample: loop.end_sample,
      sampleRate,
      // Exact native-rate PCM excerpt, computed read-only whether or not --export-loops was used.
      audioSrc: `/api/${hash}/loops/${encodeURIComponent(loop.id)}/audio?v=${version}`,
      downloadUrl: loop.file && /^audio\/[a-zA-Z0-9._-]+\.wav$/.test(loop.file)
        ? `/${hash}/deep/loops/${loop.file.split("/").map(encodeURIComponent).join("/")}` : undefined,
    }];
  });
}

export function useAnalysisLoops(hash) {
  const [snapshot, setSnapshot] = useState({ report: null, error: "" });
  useEffect(() => {
    let active = true;
    let timer;
    let previous = "";
    const controller = new AbortController();
    setSnapshot({ report: null, error: "" });
    const refresh = async () => {
      try {
        const response = await fetch(`/${hash}/deep/loops/loops.json`, {
          cache: "no-store", signal: controller.signal,
        });
        if (!active) return;
        if (response.status === 404) {
          previous = "";
          setSnapshot({ report: null, error: "" });
        } else {
          if (!response.ok) throw new Error(`Loop report: HTTP ${response.status}`);
          const report = await response.json();
          if (report.schema !== "stemlab.loops.v1") throw new Error("Unsupported loop report schema");
          const signature = JSON.stringify(report);
          if (active && signature !== previous) {
            setSnapshot({ report, error: "" });
            previous = signature;
          }
        }
      } catch (error) {
        if (active && error.name !== "AbortError") {
          previous = "";
          setSnapshot({ report: null, error: error.message });
        }
      } finally {
        if (active) timer = window.setTimeout(refresh, 2500);
      }
    };
    void refresh();
    return () => { active = false; controller.abort(); window.clearTimeout(timer); };
  }, [hash]);
  const loops = useMemo(() => mapAnalysisLoops(snapshot.report, hash), [snapshot.report, hash]);
  return { ...snapshot, loops };
}

export function LoopSummary({ state, hash }) {
  const report = state.report;
  if (state.error) return <p role="alert" className="stemlab-loop-summary">{state.error}</p>;
  if (!report) return <p className="stemlab-loop-summary">No loop report yet. New analyses discover loops automatically; for existing results run <code>stemlab loops RESULTS_DIR</code>.</p>;
  return <details className="stemlab-loop-summary" open={report.unresolved_sections.length > 0}>
    <summary>{report.loop_count} loop(s) · {report.unresolved_sections.length} unresolved section(s) · <a href={`/${hash}/deep/loops/loops.json`} target="_blank" rel="noopener">Sample report</a></summary>
    <p>Choose a loop region or use the Loop selector, tick Enable loop, then press Play. Previewing writes no files.</p>
    {report.unresolved_sections.map(section => <p key={section.index}><strong>{section.label}:</strong> {section.reason}</p>)}
  </details>;
}
