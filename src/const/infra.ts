export const POLL_INTERVAL_MS = 10_000;

export const practices = [
  "Servers configured from Git, secrets only on the servers",
  "Config validated before every deploy",
  "GitHub Actions pinned to commits",
  "Dependabot on every repo",
];

export const edge = [
  { name: "Pages", detail: "Every front end, built on each push" },
  { name: "Worker", detail: "Serves each Pages app under a path of this domain" },
  { name: "R2", detail: "Off-site backups, one prefix per server" },
];

export interface Server {
  name: string;
  host: string;
  role: string;
  // Mirrors the Compose folders in each server's repo.
  stacks: { folder: string; services: string[] }[];
}

export const servers: Server[] = [
  {
    name: "Contabo",
    host: "Ubuntu 24.04 · Docker Compose",
    role: "My projects' back ends, n8n and mail",
    stacks: [
      { folder: "infra/", services: ["Caddy", "PostgreSQL 17", "n8n", "Stalwart mail", "Metrics API"] },
      { folder: "monitoring/", services: ["Prometheus", "Grafana", "cAdvisor", "node-exporter", "Blackbox"] },
      { folder: "projects/", services: ["Agentic news API", "Voice Clone model", "Fugazzeta model", "Air quality API", "Game rankings API"] },
    ],
  },
  {
    name: "Hetzner",
    host: "Ubuntu 24.04 · Docker Compose",
    role: "Teatro Dislocador, kept apart from my own projects",
    stacks: [
      { folder: "infra/", services: ["Caddy (Cloudflare-only origin)", "PostgreSQL 17"] },
      { folder: "monitoring/", services: ["Prometheus", "Grafana", "cAdvisor", "node-exporter", "Blackbox"] },
      { folder: "backend/", services: ["Teatro Dislocador API"] },
    ],
  },
];

export const pipeline = [
  { step: "Push", detail: "Every change to a server goes through its Git repo" },
  { step: "Validate", detail: "Compose files, Caddyfile, Prometheus and Blackbox configs, ShellCheck" },
  { step: "Drift guard", detail: "Stops if the server's checkout has local changes" },
  { step: "Deploy", detail: "Fast-forward pull, then docker compose up for each stack" },
  { step: "Restart", detail: "Only the services whose config changed in that push" },
];

export const alerts = [
  { title: "Site down", rule: "Failing for 3 minutes, checked from the other server" },
  { title: "Certificate expiring", rule: "Under 14 days left" },
  { title: "Disk almost full", rule: "Over 85% for 10 minutes" },
  { title: "Backup overdue", rule: "No successful backup for 26 hours" },
];
