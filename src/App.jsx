import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Download, ExternalLink, MonitorCheck, Brain } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const AVATAR = "https://res.cloudinary.com/dqqdfeuo1/image/upload/v1755504750/P_20240508_152743_kjd1p0.jpg"
  const MotionH1 = motion.h1;
  const MotionDiv = motion.div;

  // AI/ML Projects
  const aiProjects = [
    {
      title: "Agentic AI Workflow",
      description: "Checks the latest news headlines from an API, chooses the best title, compares it against what is in memory for the last few days, then creates and descriptions and returns an image.",
      tech: ["n8n / LangChain", "Gemini", "Groq Llama", "Flux1 Schenll", "Hugging Face", "Cloudinary", "Docker", "PostgreSQL"],
      href: "https://agentic-ai-news-to-image.pages.dev/",
      githubHref: "https://github.com/jonorl/agentic-ai-news-to-image",
    },
    {
      title: "Voice Clone",
      description: "Voice clone demo for voice in Spanish (Argentinean accent) using XTTS v2 + fine tuning. Model Trained using local hardware.",
      tech: ["Pytorch", "Coqui XTTS v2", "Hugging Faces", "Gradio"],
      href: "https://voice-clone-pepe.pages.dev/",
      githubHref: "https://github.com/jonorl/voice-clone",
    },
    {
      title: "Mini-LLM Text Generator",
      description: " Brief experiment using Simpsons scripts and based on GPT-2 mini. Trained using local hardware.",
      tech: ["Pytorch", "GPT-2", "Tokenizers", "Hugging Faces", "Gradio"],
      href: "https://simpsons-gpt.pages.dev/",
      githubHref: "https://github.com/jonorl/simpsons-GPT",
    },
    {
      title: "Image Classification",
      description: "Binary image classification for pizza based on convnext_tiny architecture.",
      tech: ["FastAI", "convnext_tiny", "Pytorch", "Hugging Faces", "Gradio"],
      href: "https://fugazzeta.pages.dev/",
      githubHref: "https://github.com/jonorl/fugazzeta-frontend",
    },
  ];

  // Full-stack projects
  const fullStackProjects = [
    {
      title: "OdinBook (x.com clone)",
      description: "Final project for The Odin Project. A whole social media site with Guest/Google/Github logins. Follow, like, repost and share features. Image uploads to Cloudinary",
      tech: ["React", "Express", "JWT", "OAuth2", "Cloudinary"],
      href: "https://odin-book.pages.dev/",
      githubHref: "https://github.com/jonorl/odin-book",
    },
    {
      title: "Messaging App",
      description: "Real-time messaging with guest login, image attachments, JWT auth, and a chat-bot.",
      tech: ["Node", "Express", "PostgreSQL", "Prisma"],
      href: "https://message-app-top.netlify.app/",
      githubHref: "https://github.com/jonorl/messaging-app",
    },
    {
      title: "Blog-API",
      description: "Mono-repo blog project with both a user and CMS frontends + backend. TinyMCE added for better text formatting",
      tech: ["React", "Vite", "Tailwind", "TinyMCE"],
      href: "https://users-frontend.netlify.app/",
      githubHref: "https://github.com/jonorl/blog-API",
    },
    {
      title: "Where's Bluey (Where's Wally/Waldo clone)",
      description: "Interactive children's game including backend-driven timer and leaderboard. Now refactored using Typescript",
      tech: ["Typescript", "Node", "Express", "PostgreSQL", "Prisma"],
      href: "https://wheres-bluey.netlify.app/",
      githubHref: "https://github.com/jonorl/wheres-bluey/tree/ts-conversion",
    },
  ];

  // Simple smooth scroll for anchor links
  useEffect(() => {
    const handler = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      e.preventDefault();
      const id = anchor.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMenuOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className={dark ? "dark" : ""}>
      <div className="relative min-h-screen bg-white text-slate-800 dark:bg-[#0b0f17] dark:text-slate-100 selection:bg-zinc-200 selection:text-zinc-950">


        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -top-24 h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-zinc-500/20 via-sky-500/10 to-teal-500/20 blur-3xl" />

        {/* Nav */}
        <header className="sticky top-0 z-9999 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-16 items-center justify-between">
              <a href="#home" className="group inline-flex items-center gap-2 font-semibold">
                <MonitorCheck className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>Jonathan Orlowski</span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#ai-projects" className="hover:text-zinc-500">AI/ML Projects</a>
                <a href="#fullstack-projects" className="hover:text-zinc-500">Full-Stack Projects</a>
                <a href="#about" className="hover:text-zinc-500">About</a>
                <a href="#contact" className="hover:text-zinc-500">Contact</a>
                <a href="#CV" className="hover:text-zinc-500">CV</a>
              </nav>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDark((d) => !d)}
                  className="rounded-2xl border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                  aria-label="Toggle theme"
                >
                  {dark ? "Dark" : "Light"}
                </button>
                <button
                  onClick={() => setMenuOpen((m) => !m)}
                  className="md:hidden rounded-2xl border border-white/20 px-3 py-1 text-xs hover:bg-white/10"
                  aria-label="Toggle menu"
                >
                  Menu
                </button>
              </div>
            </div>
          </div>
          {/* Mobile menu */}
          {menuOpen && (
            <div className="md:hidden border-t border-white/10">
              <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
                <a href="#ai-projects" className="hover:text-zinc-400">AI/ML Projects</a>
                <a href="#fullstack-projects" className="hover:text-zinc-400">Full-Stack Projects</a>
                <a href="#about" className="hover:text-zinc-400">About</a>
                <a href="#contact" className="hover:text-zinc-400">Contact</a>
                <a href="#CV" className="hover:text-zinc-400">CV</a>
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
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
              <MotionDiv
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="group relative mx-auto max-w-sm overflow-hidden border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                  <div className="inset-0 bg-gradient-to-br from-zinc-500/10 via-transparent to-sky-500/10" />
                  <div className="relative">
                    <div className="mx-auto m-0 h-auto w-28 rounded-full bg-gradient-to-tr from-zinc-500 to-sky-500 p-1">
                      <img
                        src={AVATAR}
                        alt="Jonathan Orlowski"
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <h4 className="mt-4 text-center text-lg font-semibold">Jonathan Orlowski</h4>
                    <p className="mt-1 text-center text-sm text-slate-500">MLOps-Oriented Software Engineer</p>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
                      {[
                        "PyTorch & TensorFlow",
                        "React & Node",
                        "PostgreSQL",
                        "Docker",
                        "PowerAutomate & n8n",
                        "PowerBI",
                      ].map((tag) => (
                        <li key={tag} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* AI/ML Projects */}
        <section id="ai-projects" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex items-end justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold flex items-center gap-2">
                  AI/ML Projects
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                  Machine learning models deployed to production with full demo websites
                </p>
              </div>
              <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 hover:text-zinc-500">
                View all <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {aiProjects.map((p) => (
                <TiltCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* Full-Stack Projects */}
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
                View all <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {fullStackProjects.map((p) => (
                <TiltCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h3 className="text-2xl font-semibold">About</h3>
            <p className="mt-4  text-slate-600 dark:text-slate-300">
              I'm Jon, and I've spent the last few years making a deliberate transition from business intelligence management
              to software engineering, with a recent focus on ML operations and deployment. Born in Argentina, now splitting
              time between London and Kampala due to family commitments, which has given me plenty of practice working across
              time zones and cultures.
            </p>
            <p className="mt-4  text-slate-600 dark:text-slate-300">
              What sets me apart? I approach ML deployment with a BI mindset. I naturally think about data pipelines, model
              monitoring, performance metrics, and how systems behave in production (not just in notebooks). I have first-hand
              experience in digitalisation projects, roadmapping and understanding the business value of technical implementations.
            </p>
            <p className="mt-4  text-slate-600 dark:text-slate-300">
              Currently building ML projects that demonstrate end-to-end deployment-from model training to production serving
              with monitoring. Always interested in connecting with ML engineers, MLOps practitioners, or companies
              looking for someone who can bridge technical ML work and production operations.
            </p>
            <ul className="list-none mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">ML deployment: Docker, model serving, monitoring</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Full-stack foundation: React, Express, PostgreSQL</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Data-driven approach from BI background</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Production-ready mindset: reliability & scalability</li>
            </ul>
          </div>
        </section>

        {/* CV & Contact */}
        <section id="CV" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold">CV</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Grab a one‑page PDF with my full work experience and skills.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/CV.pdf" className="inline-flex items-center gap-2 rounded-2xl bg-zinc-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                </div>
              </div>
              <div id="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">Contact</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Email is best. I read everything.</p>
                <div className="mt-4">
                  <a href="mailto:jonorl@gmail.com" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 hover:bg-white/20">
                    <Mail className="h-4 w-4" /> jonorl@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
            <p className="leading-relaxed">
              © {new Date().getFullYear()} Jonathan Orlowski. Built with React+Vite & Tailwind.
              <a
                href="https://github.com/jonorl/personal-website"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center align-middle ml-2 hover:text-white/80"
              >
                <FaGithub className="mb-1" aria-label="GitHub" />
              </a>
            </p>
          </div>
        </footer>


      </div>
    </div>
  );
}

function TiltCard({ title, description, tech, href, githubHref }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  function onMove(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10; // tilt up/down
    const ry = ((x / rect.width) - 0.5) * 10;  // tilt left/right
    setTransform(`rotateX(${rx}deg) rotateY(${ry}deg)`);
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div
        ref={ref}
        onMouseLeave={() => { setTransform("rotateX(0deg) rotateY(0deg)"); }}
        onMouseMove={onMove}
        style={{ transform, transformStyle: 'preserve-3d' }}
        className="relative h-56 rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform will-change-transform"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div style={{ transform: 'translateZ(30px)' }} className="relative">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            {title}
            <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
            <FaGithub
              className="h-4 w-4 opacity-60 group-hover:opacity-100 cursor-pointer hover:opacity-80"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(githubHref, '_blank', 'noreferrer');
              }}
            />
          </h4>
          <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">{description}</p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            {tech.map((t) => (
              <span key={t} className="rounded-xl border border-white/10 bg-white/5 px-2 py-1">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
}