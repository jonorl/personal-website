import { motion } from "framer-motion";
import { Mail, Brain } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Avatar from "./Avatar";

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
              MLOps-Oriented Software Engineer with a BI background
            </MotionH1>
            <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
              Bridging the gap between ML development and production deployment. After 10+ years in business intelligence,
              I now build and deploy ML systems with a focus on reliability, monitoring, and scalable infrastructure.
            </p>
            <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
              I bring full-stack fundamentals, deployment + maintenance expertise, and an analytical mindset to ML operations-thinking
              about model performance, data pipelines, and production readiness from day one.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a href="#ai-projects" className="inline-flex items-center gap-2 rounded-2xl bg-zinc-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                <Brain className="h-4 w-4" /> AI/ML Projects
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
          {/* Avatar / card */}
          <Avatar />

        </div>
      </div>
    </section>
  )
}