import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Server, Box, BarChart3 } from "lucide-react";
 
// ─── config ──────────────────────────────────────────────────────────────────
export const METRICS_URL = process.env.NODE_ENV === "production" 
    ? "https://stats.jonathan-orlowski.dev/api/metrics"
    : "http://localhost:3002/api/metrics"
    console.log(METRICS_URL)
export const POLL_INTERVAL_MS = 10_000;
// ─────────────────────────────────────────────────────────────────────────────
 
export const stacks = [
  {
    filename: "docker-compose.infra.yml",
    label: "Infrastructure",
    Icon: Server,
    description:
      "Shared layer - reverse proxy with auto TLS and a single Postgres instance serving all apps, plus n8n.",
    services: ["Caddy (reverse proxy + TLS)", "PostgreSQL 17", "n8n workflow engine" ,"Web metrics (see below)"],
  },
  {
    filename: "docker-compose.apps.yml",
    label: "Applications",
    Icon: Box,
    description:
      "All 8 portfolio projects running as isolated containers, routed through Caddy.",
    services: ["4 AI Gradio containers", "4 full stack projects", "Images hosted on GHCR"],
  },
  {
    filename: "docker-compose.monitoring.yml",
    label: "Observability",
    Icon: BarChart3,
    description:
      "Prometheus scrapes cAdvisor and node-exporter every 15 s; Grafana visualises the lot.",
    services: ["Grafana", "Prometheus", "cAdvisor", "node-exporter"],
  },
];
 
export function useServerMetrics() {
  const [metrics, setMetrics] = useState(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"
 
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
 
export default function MetricTile({ label, value, warn }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${warn ? "text-amber-400" : "text-teal-400"}`}>
        {value}
      </p>
    </div>
  );
}
