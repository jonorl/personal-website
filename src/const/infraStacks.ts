import { Server, Box, BarChart3 } from "lucide-react";

export const POLL_INTERVAL_MS = 10_000;
export const infraStacks = [
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
      `Prometheus scrapes cAdvisor and node-exporter every ${POLL_INTERVAL_MS/1000} seconds; Grafana visualises the lot.`,
    services: ["Grafana", "Prometheus", "cAdvisor", "node-exporter"],
  },
];