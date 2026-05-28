import { ExternalLink } from "lucide-react";
import { fullStackProjects } from "../const/fullStackProjects";
import TiltCard from "./Tiltcard";

export default function FullStack() {
  return (
    <section id="fullstack-projects" className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold">Full-Stack Projects</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Web applications built with React, Node.js, and PostgreSQL
            </p>
          </div>
          <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 hover:text-zinc-500">
            <span className="hidden sm:inline">View all</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {fullStackProjects.map((p) => (
            <TiltCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  )
}