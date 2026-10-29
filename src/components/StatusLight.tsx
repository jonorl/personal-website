import { useServiceStatus } from "../hooks/useServiceStatus";
import type { ServiceId } from "../const/types";

export default function StatusLight({ serviceId }: { serviceId: ServiceId }) {
  const { services } = useServiceStatus();
  const health = services[serviceId];

  const [label, dot, title] = !health
    ? ["Checking", "bg-zinc-500", "Waiting for the health check"]
    : health.up
      ? ["Live", "bg-teal-400 animate-pulse", `Health check passing${health.ms !== null ? ` (${health.ms} ms)` : ""}`]
      : ["Down", "bg-red-400", "Health check failing"];

  return (
    <span
      title={title}
      className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] font-normal text-slate-500 dark:text-slate-400"
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
