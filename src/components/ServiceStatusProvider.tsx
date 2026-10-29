import { useEffect, useState, type ReactNode } from "react";
import { StatusContext, STATUS_POLL_MS, STATUS_URL, emptyStatus, type ServiceStatus } from "../hooks/useServiceStatus";

// One poll for the whole page, rather than one per card.
export default function ServiceStatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ServiceStatus>(emptyStatus);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch(STATUS_URL);
        if (!res.ok) throw new Error("non-2xx");
        const data = await res.json();
        // An older metrics API has no /api/status; leave every light grey rather than calling everything down.
        if (!cancelled && data && typeof data.services === "object") setStatus(data);
      } catch {
        if (!cancelled) setStatus(emptyStatus);
      }
    }

    poll();
    const id = setInterval(poll, STATUS_POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, []);

  return <StatusContext.Provider value={status}>{children}</StatusContext.Provider>;
}
