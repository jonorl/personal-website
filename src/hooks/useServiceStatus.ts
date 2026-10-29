import { createContext, useContext } from "react";
import { STATS_ORIGIN } from "./useServerMetrics";
import type { ServiceId } from "../const/types";

export const STATUS_POLL_MS = 30_000;
export const STATUS_URL = `${STATS_ORIGIN}/api/status`;

export interface ServiceHealth {
  up: boolean;
  ms: number | null;
}

export interface ServiceStatus {
  checkedAt: string | null;
  services: Partial<Record<ServiceId, ServiceHealth>>;
}

export const emptyStatus: ServiceStatus = { checkedAt: null, services: {} };
export const StatusContext = createContext<ServiceStatus>(emptyStatus);

export const useServiceStatus = () => useContext(StatusContext);
