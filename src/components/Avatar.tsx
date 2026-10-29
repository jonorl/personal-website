import { motion } from "motion/react";

// Taken from the projects on this page, so every tag has something behind it.
const skills = [
  "Rust",
  "TypeScript & React",
  "Node",
  "Python & PyTorch",
  "PostgreSQL",
  "Docker & Caddy",
  "Prometheus & Grafana",
  "n8n",
];

export default function Avatar() {
  const MotionDiv = motion.div;

  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="relative"
    >
      <div className="group relative mx-auto max-w-sm overflow-hidden border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
        <div className="mx-auto m-0 h-auto w-28 rounded-full bg-gradient-to-tr from-zinc-500 to-sky-500 p-1">
          <img
            src="/avatar.webp"
            alt="Jonathan Orlowski"
            width={224}
            height={298}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
        <p className="mt-4 text-center text-lg font-semibold">Jonathan Orlowski</p>
        <p className="mt-1 text-center text-sm text-slate-500">Software Engineer · London &amp; Kampala</p>
        <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {skills.map((tag) => (
            <li key={tag} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </MotionDiv>
  )
}
