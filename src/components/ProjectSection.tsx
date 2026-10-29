import { ExternalLink } from "lucide-react";
import TiltCard from "./Tiltcard";
import type { Project } from "../const/types";

interface ProjectSectionProps {
  id: string;
  title: string;
  subtitle: string;
  projects: Project[];
  /** Only the first section links to GitHub, so the link isn't repeated down the page. */
  viewAll?: boolean;
}

export default function ProjectSection({ id, title, subtitle, projects, viewAll }: ProjectSectionProps) {
  return (
    <section id={id} className="relative z-10 border-t border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{subtitle}</p>
          </div>
          {viewAll && (
            <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" aria-label="View all projects on GitHub" className="text-sm inline-flex items-center gap-1 hover:text-zinc-500">
              <span className="hidden sm:inline">View all</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <TiltCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}
