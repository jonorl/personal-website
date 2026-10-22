import { useEffect, useState } from "react";
import { POLL_INTERVAL_MS } from "../const/infraStacks";

export type ServerStatus = "loading" | "error" | "ok";

export interface ServerMetrics {
  cpu: number;
  memory: number;
  uptime: string;
  disk: number;
}

interface UseServerMetricsResult {
  metrics: ServerMetrics | null;
  status: ServerStatus;
}

// ─── config ──────────────────────────────────────────────────────────────────
export const METRICS_URL = process.env.NODE_ENV === "production" 
    ? "https://stats.jonathan-orlowski.dev/api/metrics"
    : "http://localhost:3002/api/metrics"
// ─────────────────────────────────────────────────────────────────────────────
 
export function useServerMetrics(): UseServerMetricsResult {
  const [metrics, setMetrics] = useState<ServerMetrics | null>(null);
  const [status, setStatus] = useState<ServerStatus>("loading"); // "loading" | "ok" | "error"
 
  useEffect(() => {
    let cancelled = false;
 
    async function fetch_() {
      try {
        const res = await fetch(METRICS_URL);
        if (!res.ok) throw new Error("non-2xx");
        const data = await res.json();
        if (!cancelled) { setMetrics(data); setStatus("ok"); }
      } catch {
        if (!cancelled) setStatus("error");
      }
    }
 
    fetch_();
    const id = setInterval(fetch_, POLL_INTERVAL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, []);
 
  return { metrics, status };
}
