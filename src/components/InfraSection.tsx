import { motion } from "framer-motion";
import { useServerMetrics } from "./MetricTile";
import MetricTile from "./MetricTile";
import { infraStacks, POLL_INTERVAL_MS } from "../const/infraStacks";

export default function InfraSection() {
  const { metrics, status } = useServerMetrics();
  const MotionDiv = motion.div;

  return (
    <section id="infra" className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-20">

        {/* Header */}
        <h3 className="text-2xl font-semibold flex items-center ">
          <div />
          Infrastructure &amp; DevOps
        </h3>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          All 8 projects self-hosted on a single VPS - pre-built GHCR images,
          GitOps-managed infrastructure, and a full observability stack.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "CI/CD → GHCR on every push",
            "GitOps via private repo",
            "Ordered boot: infra → monitoring → projects",
            "Automated PG17 backups: local + Cloudflare R2",
          ].map((tag) => (
            <span
              key={tag}
              className="text-xs rounded-xl border border-white/10 bg-white/5 px-3 py-1 text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>


        {/* Compose stacks */}
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {infraStacks.map(({ filename, label, Icon, description, services }, i) => (
            <MotionDiv
              key={filename}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="rounded-xl border border-white/10 bg-white/5 p-2 flex-shrink-0">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 truncate">
                    {filename}
                  </p>
                  <p className="text-sm font-semibold">{label}</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                {description}
              </p>

              <ul className="flex flex-col gap-1.5">
                {services.map((svc) => (
                  <li key={svc} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-teal-500/70 flex-shrink-0" />
                    {svc}
                  </li>
                ))}
              </ul>
            </MotionDiv>
          ))}
        </div>

        {/* Live status widget */}
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`h-2 w-2 rounded-full flex-shrink-0 ${status === "ok"
                  ? "bg-teal-400 animate-pulse"
                  : status === "error"
                    ? "bg-red-400"
                    : "bg-zinc-500"
                }`}
            />
            <span className="text-sm font-semibold">Live server status</span>
            <span className="text-xs text-slate-500 ml-auto">
              refreshes every {POLL_INTERVAL_MS / 1000}s
            </span>
          </div>

          {status === "loading" && (
            <p className="text-xs text-slate-500">Connecting to metrics endpoint…</p>
          )}

          {status === "error" && (
            <p className="text-xs text-slate-500">
              Metrics endpoint unreachable — server may be updating.
            </p>
          )}

          {status === "ok" && metrics && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <MetricTile label="CPU" value={`${metrics.cpu}%`} warn={metrics.cpu >= 80} />
              <MetricTile label="Memory" value={`${metrics.memory}%`} warn={metrics.memory >= 85} />
              <MetricTile label="Uptime" value={metrics.uptime} warn={false} />
              <MetricTile label="Disk" value={`${metrics.disk}%`} warn={metrics.disk >= 80} />
            </div>
          )}
        </div>

      </div>
    </section>
  );
}