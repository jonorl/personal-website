import express from "express";
import fs from "fs/promises";
import os from "os";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(cors({
  origin: process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL_METRICS 
    : true
}));
app.use(express.json());

const CPU_SAMPLE_MS = 1000;

// /proc/stat counts jiffies since boot, so one reading only gives the average since boot.
async function readCpuTimes() {
  const statData = await fs.readFile("/proc/stat", "utf8");
  const fields = statData.split("\n").find(line => line.startsWith("cpu ")).split(/\s+/).slice(1).map(Number);
  // iowait counts as idle; steal and the rest are time the CPU wasn't free for this server.
  const [, , , idle, iowait] = fields;
  return { idle: idle + iowait, total: fields.slice(0, 8).reduce((a, b) => a + b, 0) };
}

// version lets the deploy's smoke test tell the new container from the old one.
app.get("/health", (_req, res) => {
  res.json({ status: "ok", version: process.env.GIT_SHA ?? "dev" });
});

app.get("/api/metrics", async (_req, res) => {
  try {
    // 1. CPU, over the last second
    const before = await readCpuTimes();
    await new Promise(resolve => setTimeout(resolve, CPU_SAMPLE_MS));
    const after = await readCpuTimes();
    const totalDelta = after.total - before.total;
    const cpu = totalDelta > 0 ? Math.round((1 - (after.idle - before.idle) / totalDelta) * 100) : 0;

    // 2. Memory
    const memData = await fs.readFile("/proc/meminfo", "utf8");
    const memInfo = Object.fromEntries(
      memData.split("\n")
        .filter(Boolean)
        .map(l => l.split(":").map(s => s.trim()))
    );
    const memTotal = parseInt(memInfo.MemTotal);
    const memAvail = parseInt(memInfo.MemAvailable);
    const memory = Math.round(((memTotal - memAvail) / memTotal) * 100);

    // 3. Disk. statfs rather than df: Alpine's busybox df has no --output, so that always fell back to 0.
    // Used over used + available, as df reports it, since root's reserved blocks aren't available to anyone else.
    let disk = 0;
    try {
      const { blocks, bfree, bavail } = await fs.statfs("/");
      const used = blocks - bfree;
      disk = Math.round((used / (used + bavail)) * 100);
    } catch (e) {
      console.error("Disk read failed, defaulting to 0:", e.message);
    }

    // 4. Uptime
    const uptimeSecs = os.uptime();
    const days = Math.floor(uptimeSecs / 86400);
    const hours = Math.floor((uptimeSecs % 86400) / 3600);
    const uptime = `${days}d ${hours}h`;

    res.json({ cpu, memory, disk, uptime });
  } catch (error) {
    console.error("Metrics Error:", error);
    res.status(500).json({ error: error.message });
  }
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