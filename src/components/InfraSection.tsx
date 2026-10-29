import type { ReactNode } from "react";
import { ArrowLeftRight, ArrowUpDown, BellRing, Cloud, DatabaseBackup, GitBranch, Server as ServerIcon } from "lucide-react";
import { useServerMetrics } from "../hooks/useServerMetrics";
import { useServiceStatus } from "../hooks/useServiceStatus";
import MetricTile from "./MetricTile";
import { alerts, edge, pipeline, POLL_INTERVAL_MS, practices, servers, type Server } from "../const/infra";

const panel = "rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5";
const chip = "rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2 py-0.5 text-[11px] text-slate-600 dark:text-slate-300";

function PanelTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold">
      <span aria-hidden="true" className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-1.5">{icon}</span>
      {children}
    </h3>
  );
}

function ServerBox({ name, host, role, stacks }: Server) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
      <div className="flex items-center gap-2">
        <ServerIcon aria-hidden="true" className="h-4 w-4 text-teal-600 dark:text-teal-500" />
        <h4 className="text-sm font-semibold">{name} VPS</h4>
      </div>
      <p className="mt-0.5 text-[11px] text-slate-500">{host}</p>
      <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{role}</p>
      <dl className="mt-3 flex flex-col gap-2.5">
        {stacks.map(({ folder, services }) => (
          <div key={folder}>
            <dt className="mb-1 font-mono text-[10px] uppercase tracking-wider text-slate-500">{folder}</dt>
            <dd className="flex flex-wrap gap-1.5">
              {services.map((s) => <span key={s} className={chip}>{s}</span>)}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// A labelled gap between the tiers of the diagram, standing in for the arrows.
function Link({ icon, children, className = "" }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 text-[11px] text-slate-500 ${className}`}>
      <span aria-hidden="true">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

export default function InfraSection() {
  const { metrics, status } = useServerMetrics();
  const { services } = useServiceStatus();
  const checks = Object.values(services);
  const healthy = checks.filter((s) => s.up).length;

  return (
    <section id="infra" className="relative z-10 border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">

        <h2 className="text-2xl font-semibold">Infrastructure &amp; DevOps</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Every back end on this page is self-hosted on two VPSes that watch each other, configured from Git and
          deployed by GitHub Actions, with alerts and nightly off-site backups.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {practices.map((tag) => (
            <span key={tag} className="text-xs rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-1 text-slate-500 dark:text-slate-400">
              {tag}
            </span>
          ))}
        </div>

        {/* Architecture */}
        <div className={`mt-8 ${panel}`}>
          <PanelTitle icon={<Cloud className="h-4 w-4" />}>How it fits together</PanelTitle>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-4">
            <div className="flex items-center gap-2">
              <Cloud aria-hidden="true" className="h-4 w-4 text-sky-500" />
              <h4 className="text-sm font-semibold">Cloudflare</h4>
              <span className="text-[11px] text-slate-500">DNS, proxy and TLS at the edge</span>
            </div>
            <div className="mt-3 grid gap-2 sm:grid-cols-3">
              {edge.map(({ name, detail }) => (
                <div key={name} className="rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-3 py-2">
                  <p className="text-xs font-semibold">{name}</p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </div>

          <Link icon={<ArrowUpDown className="h-3.5 w-3.5" />} className="py-3">
            API calls to each server's Caddy · nightly backups up to R2
          </Link>

          <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr]">
            <ServerBox {...servers[0]} />
            <Link icon={<ArrowLeftRight className="h-3.5 w-3.5" />} className="md:w-28 md:flex-col md:self-center md:text-center">
              Each probes the other every minute
            </Link>
            <ServerBox {...servers[1]} />
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          {/* Deploys */}
          <div className={panel}>
            <PanelTitle icon={<GitBranch className="h-4 w-4" />}>How a change reaches a server</PanelTitle>
            <ol className="flex flex-col gap-3">
              {pipeline.map(({ step, detail }, i) => (
                <li key={step} className="flex gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-teal-500/40 text-[10px] text-teal-600 dark:text-teal-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold">{step}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[11px] text-slate-500">
              Project repos run their tests, push an image to GHCR, roll it out over SSH and check /health afterwards.
            </p>
          </div>

          {/* Alerts */}
          <div className={panel}>
            <PanelTitle icon={<BellRing className="h-4 w-4" />}>What emails me</PanelTitle>
            <ul className="flex flex-col gap-3">
              {alerts.map(({ title, rule }) => (
                <li key={title} className="flex gap-3">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <div>
                    <p className="text-xs font-semibold">{title}</p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400">{rule}</p>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[11px] text-slate-500">
              Grafana alert rules, provisioned from the repos. Each server raises site-down alerts for the other, so
              one that dies completely still gets reported.
            </p>
          </div>

          {/* Backups */}
          <div className={panel}>
            <PanelTitle icon={<DatabaseBackup className="h-4 w-4" />}>Backups</PanelTitle>
            <ul className="flex flex-col gap-3 text-[11px] text-slate-600 dark:text-slate-400">
              <li>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Nightly at 02:00</p>
                Every Postgres database, found by asking Postgres so a new one is never missed, plus n8n, the mail
                store, uploads and the trained models.
              </li>
              <li>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">14 days local, 30 in R2</p>
                Copied rather than synced, so an emptied folder on a server can't empty the bucket.
              </li>
              <li>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Proof it ran</p>
                The script records its last success as a metric, which is what the overdue alert watches.
              </li>
            </ul>
          </div>
        </div>

        {/* Live status widget */}
        <div className={`mt-6 ${panel}`}>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${status === "ok"
                  ? "bg-teal-400 motion-safe:animate-pulse"
                  : status === "error"
                    ? "bg-red-400"
                    : "bg-zinc-500"
                }`}
            />
            <span className="text-sm font-semibold">Live server status</span>
            <span className="text-xs text-slate-500">Contabo</span>
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

          {checks.length > 0 && (
            <p className="mt-4 text-xs text-slate-500">
              {healthy} of {checks.length} project back ends passing their health checks
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
