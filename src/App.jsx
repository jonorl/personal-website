import { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Github, Linkedin, Mail, ArrowRight, Download, ExternalLink, Sparkles } from "lucide-react";

// ---- Quick-start instructions ----
// 1) Drop this component into a Vite + React project as src/App.jsx and run `npm run dev`.
// 2) Swap placeholder content (name, links, projects).
// 3) Keep it static: host on Netlify/Vercel/GitHub Pages. No backend needed.
// 4) The subtle "pizzazz" here: a spotlight cursor effect, tasteful micro-animations, and tilt-on-hover project cards.

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlight = useMotionTemplate`radial-gradient(600px 600px at ${mouseX}px ${mouseY}px, rgba(120,119,198,0.25), transparent 60%)`;

  function handleMouseMove(e) {
    const { clientX, clientY } = e;
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

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
      <div onMouseMove={handleMouseMove} className="relative min-h-screen bg-white text-slate-800 dark:bg-[#0b0f17] dark:text-slate-100 selection:bg-indigo-200 selection:text-indigo-950">
        {/* Spotlight */}
        <motion.div
          style={{ backgroundImage: spotlight }}
          className="pointer-events-none fixed inset-0 z-0"
          aria-hidden
        />

        {/* Decorative gradient blob */}
        <div className="pointer-events-none absolute -top-24 right-[-10%] h-[40rem] w-[40rem] rounded-full bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl" />

        {/* Nav */}
        <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-16 items-center justify-between">
              <a href="#home" className="group inline-flex items-center gap-2 font-semibold">
                <Sparkles className="h-5 w-5 transition-transform group-hover:rotate-12" />
                <span>Jonathan Orlowski</span>
              </a>
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#projects" className="hover:text-indigo-500">Projects</a>
                <a href="#about" className="hover:text-indigo-500">About</a>
                <a href="#contact" className="hover:text-indigo-500">Contact</a>
                <a href="#resume" className="hover:text-indigo-500">Résumé</a>
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
                <a href="#projects" className="hover:text-indigo-400">Projects</a>
                <a href="#about" className="hover:text-indigo-400">About</a>
                <a href="#contact" className="hover:text-indigo-400">Contact</a>
                <a href="#resume" className="hover:text-indigo-400">Résumé</a>
              </div>
            </div>
          )}
        </header>

        {/* Hero */}
        <section id="home" className="relative z-10">
          <div className="mx-auto max-w-6xl px-4 py-24 sm:py-28">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl/tight font-semibold sm:text-5xl/tight"
                >
                  Building clean, fast, human-centred web apps.
                </motion.h1>
                <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
                  Full‑stack developer focused on React, Node/Express, and PostgreSQL. I love crafting small interactions that make products feel alive, while keeping the codebase tidy and scalable.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                    See my work <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                    <Mail className="h-4 w-4" /> Contact
                  </a>
                  <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                    <Linkedin className="h-4 w-4" /> LinkedIn
                  </a>
                </div>
              </div>

              {/* Avatar / card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="group relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-fuchsia-500/10" />
                  <div className="relative">
                    <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500 p-1">
                      <div className="h-full w-full rounded-full bg-white/90 dark:bg-black/60 backdrop-blur flex items-center justify-center text-xs uppercase tracking-wide">
                        Your<br/>Avatar
                      </div>
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">React • Node • PostgreSQL</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Kampala, Uganda · Open to remote
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      {[
                        "React / Vite",
                        "TypeScript",
                        "Tailwind CSS",
                        "Express.js",
                        "PostgreSQL",
                        "Prisma ORMs",
                      ].map((tag) => (
                        <li key={tag} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center">
                          {tag}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-semibold">Selected Projects</h3>
              <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 hover:text-indigo-500">
                View all <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <TiltCard key={p.title} {...p} />
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <h3 className="text-2xl font-semibold">About</h3>
            <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
              I enjoy building pragmatic, user‑friendly products: clean UI, clear state management, and performance. I value accessible defaults (keyboard nav, color contrast), thorough testing where it matters, and docs that future me can understand.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">• Strong focus on DX & maintainability (sensible folder structure, linting, pre-commit hooks).</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">• Performance minded: code‑splitting, lazy loading, memoization where it counts.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">• Comfortable across the stack: React, Express, PostgreSQL/Prisma.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">• Shipping mindset: iterate quickly, add polish last.</li>
            </ul>
          </div>
        </section>

        {/* Resume & Contact */}
        <section id="resume" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-semibold">Résumé</h3>
                <p className="mt-3 text-slate-600 dark:text-slate-300">
                  Grab a one‑page PDF with skills, selected projects, and links.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a href="/resume.pdf" className="inline-flex items-center gap-2 rounded-2xl bg-indigo-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
                  <a href="#contact" className="inline-flex items-center gap-2 rounded-2xl border border-white/20 px-4 py-2 hover:bg-white/10">
                    <Mail className="h-4 w-4" /> Contact
                  </a>
                </div>
              </div>
              <div id="contact" className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <h3 className="text-xl font-semibold">Contact</h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Email is best. I read everything.</p>
                <div className="mt-4">
                  <a href="mailto:jon@example.com" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 hover:bg-white/20">
                    <Mail className="h-4 w-4" /> jon@example.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500">
            © {new Date().getFullYear()} Jonathan Orlowski. Built with React & Tailwind.
          </div>
        </footer>
      </div>
    </div>
  );
}

function TiltCard({ title, description, tech, href }) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
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
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => { setHover(false); setTransform("rotateX(0deg) rotateY(0deg)"); }}
        onMouseMove={onMove}
        style={{ transform, transformStyle: 'preserve-3d' }}
        className="relative h-56 rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform will-change-transform"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div style={{ transform: 'translateZ(30px)' }} className="relative">
          <h4 className="text-lg font-semibold flex items-center gap-2">
            {title}
            <ExternalLink className="h-4 w-4 opacity-60 group-hover:opacity-100" />
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

const projects = [
  {
    title: "Messaging App (Guest Mode)",
    description: "Real‑time messaging with guest login, image attachments, JWT auth, and skeleton loaders for slow DBs.",
    tech: ["React", "Express", "JWT", "Cloudinary", "WebSockets"],
    href: "https://your-demo-url.example.com",
  },
  {
    title: "Blog API + Frontend",
    description: "Odin Project blog API with a clean React frontend, comments, and markdown posts.",
    tech: ["Node", "Express", "PostgreSQL", "Prisma"],
    href: "https://your-demo-url.example.com",
  },
  {
    title: "Calculator (Keyboard‑friendly)",
    description: "A polished calculator with keyboard shortcuts, dark theme, and accessible focus states.",
    tech: ["React", "Vite", "Tailwind"],
    href: "https://jonorl.github.io/calculator/",
  },
  {
    title: "Knight's Tour Helper",
    description: "BFS search visualizer that finds the shortest route for a knight on a chessboard.",
    tech: ["React", "Algorithms", "Data Structures"],
    href: "https://your-demo-url.example.com",
  },
  {
    title: "Image Gallery Hover",
    description: "Flask backend + JS frontend that loads thumbnails and shows full‑size on hover.",
    tech: ["Flask", "JavaScript"],
    href: "https://your-demo-url.example.com",
  },
  {
    title: "Deals Tracker",
    description: "Data analysis project on how quickly game prices drop; scrapes DekuDeals and cross‑refs IGDB.",
    tech: ["Python", "Pandas", "Scraping"],
    href: "https://your-demo-url.example.com",
  },
];
