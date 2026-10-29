/** Keys of the health checks the metrics API runs; see `services` in /api/status. */
export type ServiceId = "agentic-ai" | "voice-clone" | "fugazzeta" | "pollution" | "carmen" | "teatro";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  href: string;
  /** Left out for work whose source isn't public. */
  githubHref?: string;
  /** Who the work was for, shown under the title; for projects that weren't my own. */
  credit?: string;
  /** A second repository holding the project's mobile app. */
  mobileHref?: string;
  /** A screenshot shown beside the text; 960 × 600. */
  image?: string;
  imageAlt?: string;
  /** A muted looping clip shown in place of the image, which becomes its poster; 960 × 600. */
  video?: string;
  /** Spans both grid columns, which also keeps an odd number of cards from leaving a gap. */
  featured?: boolean;
  /** Shows a live/down light driven by this back end's /health. */
  serviceId?: ServiceId;
}
