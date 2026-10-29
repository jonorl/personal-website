import express from "express";
import fs from "fs/promises";
import os from "os";
import cors from "cors";

// The VPS passes the environment in through Compose; .env is only for local runs.
try {
  process.loadEnvFile();
} catch {
  // No .env file, which is normal in production.
}

const app = express();

// A fixed list rather than an environment variable: an unset variable used to fall through to cors()'s default of
// allowing every origin.
const ALLOWED_ORIGINS = process.env.NODE_ENV === "production"
  ? ["https://jonathan-orlowski.dev"]
  : [/^http:\/\/localhost:\d+$/];
app.use(cors({ origin: ALLOWED_ORIGINS }));

// Sampled on a timer and served from memory, so a request never touches the file system and visitors can't make
// the server do more work by asking more often. The page polls every 10 seconds.
const METRICS_INTERVAL_MS = 5_000;

// /proc/stat counts jiffies since boot, so CPU use is the difference between two samples.
async function readCpuTimes() {
  const statData = await fs.readFile("/proc/stat", "utf8");
  const fields = statData.split("\n").find(line => line.startsWith("cpu ")).split(/\s+/).slice(1).map(Number);
  // iowait counts as idle; steal and the rest are time the CPU wasn't free for this server.
  const [, , , idle, iowait] = fields;
  return { idle: idle + iowait, total: fields.slice(0, 8).reduce((a, b) => a + b, 0) };
}

async function readMemory() {
  const memData = await fs.readFile("/proc/meminfo", "utf8");
  const memInfo = Object.fromEntries(
    memData.split("\n")
      .filter(Boolean)
      .map(l => l.split(":").map(s => s.trim()))
  );
  const memTotal = parseInt(memInfo.MemTotal);
  const memAvail = parseInt(memInfo.MemAvailable);
  return Math.round(((memTotal - memAvail) / memTotal) * 100);
}

// statfs rather than df: Alpine's busybox df has no --output, so that always fell back to 0. Used over used +
// available, as df reports it, since root's reserved blocks aren't available to anyone else.
async function readDisk() {
  const { blocks, bfree, bavail } = await fs.statfs("/");
  const used = blocks - bfree;
  return Math.round((used / (used + bavail)) * 100);
}

function formatUptime() {
  const uptimeSecs = os.uptime();
  const days = Math.floor(uptimeSecs / 86400);
  const hours = Math.floor((uptimeSecs % 86400) / 3600);
  return `${days}d ${hours}h`;
}

let metrics = null;
let lastCpu = null;

async function sampleMetrics() {
  try {
    const cpuTimes = await readCpuTimes();
    const totalDelta = lastCpu ? cpuTimes.total - lastCpu.total : 0;
    const cpu = totalDelta > 0 ? Math.round((1 - (cpuTimes.idle - lastCpu.idle) / totalDelta) * 100) : 0;
    lastCpu = cpuTimes;
    metrics = { cpu, memory: await readMemory(), disk: await readDisk(), uptime: formatUptime() };
  } catch (error) {
    console.error("Metrics Error:", error);
    metrics = null;
  }
}

// The first sample has nothing to compare CPU against, so a second follows a second later.
sampleMetrics().then(() => setTimeout(sampleMetrics, 1000));
setInterval(sampleMetrics, METRICS_INTERVAL_MS);

// version lets the deploy's smoke test tell the new container from the old one.
app.get("/health", (_req, res) => {
  res.json({ status: "ok", version: process.env.GIT_SHA ?? "dev" });
});

app.get("/api/metrics", (_req, res) => {
  if (!metrics) return res.status(503).json({ error: "Metrics not available yet" });
  res.json(metrics);
});

// Checked here rather than from the browser: not every API sends CORS headers, and the page then makes one request
// instead of one per project. The list is fixed so the endpoint can't be used to probe arbitrary URLs.
const HEALTH_CHECKS = {
  "agentic-ai": "https://api.jonathan-orlowski.dev/health",
  "voice-clone": "https://voice.jonathan-orlowski.dev/health",
  fugazzeta: "https://pizza.jonathan-orlowski.dev/health",
  pollution: "https://pollution.jonathan-orlowski.dev/health",
  carmen: "https://carmen-api.jonathan-orlowski.dev/health",
  teatro: "https://api.teatrodislocador.ar/health",
};
const STATUS_INTERVAL_MS = 30_000;
const HEALTH_TIMEOUT_MS = 10_000;

// Refreshed on a timer, not per request, so visitors can't make this server hammer the APIs.
let status = { checkedAt: null, services: {} };

async function checkHealth() {
  const results = await Promise.all(Object.entries(HEALTH_CHECKS).map(async ([id, url]) => {
    const started = Date.now();
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS) });
      return [id, { up: res.ok, ms: Date.now() - started }];
    } catch {
      return [id, { up: false, ms: null }];
    }
  }));
  status = { checkedAt: new Date().toISOString(), services: Object.fromEntries(results) };
}

checkHealth();
setInterval(checkHealth, STATUS_INTERVAL_MS);

app.get("/api/status", (_req, res) => {
  res.json(status);
});

const PORT_METRICS = process.env.PORT_METRICS || 3002;

app.listen(PORT_METRICS, '0.0.0.0', () =>
  console.log(`Listening on port ${PORT_METRICS}`)
);