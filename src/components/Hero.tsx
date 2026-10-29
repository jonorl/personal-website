import { motion } from "motion/react";
import { Mail, LayoutGrid } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Avatar from "./Avatar";
import { useServiceStatus } from "../hooks/useServiceStatus";

// The same health checks as the project cards, as evidence for the claim in the paragraph above it.
function LiveHealth() {
  const { services } = useServiceStatus();
  const checks = Object.values(services);
  if (checks.length === 0) return null;
  const healthy = checks.filter((s) => s.up).length;

  return (
    <a href="#infra" className="mt-4 inline-flex items-center gap-2 text-sm text-slate-500 hover:text-zinc-400">
      <span aria-hidden="true" className={`h-2 w-2 rounded-full ${healthy === checks.length ? "bg-teal-400 animate-pulse" : "bg-amber-400"}`} />
      {healthy} of {checks.length} back ends healthy right now
    </a>
  );
}

export default function Hero() {
  const MotionH1 = motion.h1;

  return (
    <section id="home" className="relative z-10">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-18">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <MotionH1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl/tight font-semibold sm:text-5xl/tight"
            >
              Software engineer who builds it, ships it and keeps it running
            </MotionH1>
            <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
              Ten years in business intelligence taught me that software only matters once people rely on it. Now I
              build the whole thing: the model or the firmware, the API, the front end and the servers underneath.
              Everything on this page is live, monitored and backed up on two servers I run myself.
            </p>
            <LiveHealth />
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#in-production" className="inline-flex items-center gap-2 rounded-2xl bg-zinc-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                <LayoutGrid className="h-4 w-4" /> Projects
              </a>
              <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                <Mail className="h-4 w-4" /> Contact
              </a>
              <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                <FaGithub className="h-4 w-4" /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/jonathan-orlowski-58910b21/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                <FaLinkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>
          <Avatar />
        </div>
      </div>
    </section>
  )
}
