import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, Download, ExternalLink, MonitorCheck } from "lucide-react";
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const AVATAR = "https://res.cloudinary.com/dqqdfeuo1/image/upload/v1755504750/P_20240508_152743_kjd1p0.jpg"
  const MotionH1 = motion.h1;
  const MotionDiv = motion.div;

  // Hard-coded projects
  const projects = [
    {
      title: "OdinBook (x.com clone)",
      description: "Final project for The Odin Project. A whole social media site with Guest/Google/Github logins. Follow, like, repost and sahre features. Image uploads to Cloudinary",
      tech: ["React", "Express", "JWT", "OAuth2", "Cloudinary"],
      href: "https://odin-book.pages.dev/",
    },
    {
      title: "Messaging App",
      description: "Real-time messaging with guest login, image attachments, JWT auth, and a chat-bot.",
      tech: ["Node", "Express", "PostgreSQL", "Prisma"],
      href: "https://message-app-top.netlify.app/",
    },
    {
      title: "Blog-API",
      description: "Mono-repo blog project with both a user and CMS frontends + backend. TinyMCE added for better text formatting",
      tech: ["React", "Vite", "Tailwind", "TinyMCE"],
      href: "https://users-frontend.netlify.app/",
    },
    {
      title: "Where's Bluey (Where's Wally/Waldo clone)",
      description: "Interactive children's game including backend-driven timer and leaderboard.",
      tech: ["Node", "Express", "PostgreSQL", "Prisma"],
      href: "https://wheres-bluey.netlify.app/",
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
                <a href="#projects" className="hover:text-zinc-500">Projects</a>
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
                <a href="#projects" className="hover:text-zinc-400">Projects</a>
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
                  Full-stack dev focused on performance and data – with the mindset of a BI professional.
                </MotionH1>
                <p className="mt-4 max-w-prose text-slate-600 dark:text-slate-300">
                  After 10+ years turning business data into actionable insights, I've pivoted to building the applications that create that data.
                  I bring an analytical approach to development–thinking about performance metrics, user behavior patterns, and scalable architecture from day one.
                </p>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl bg-zinc-600 px-4 py-2 text-white shadow hover:shadow-lg hover:-translate-y-0.5 transition">
                    See my work <ArrowRight className="h-4 w-4" />
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
                        className="aspect-square w-full h-full rounded-full object-cover bg-white/90 dark:bg-black/60 backdrop-blur flex items-center justify-center text-xs uppercase tracking-wide"
                        src={AVATAR}
                        alt="avatar"
                      />
                    </div>
                    <h2 className="mt-4 text-xl font-semibold">React • Node • PostgreSQL</h2>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      London, UK / Kampala, Uganda · Open to remote
                    </p>
                    <ul className="mt-4 grid grid-cols-2 gap-2 text-sm">
                      {[
                        "React / Vite",
                        "Javascript",
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
              </MotionDiv>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="relative z-10 border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <div className="flex items-end justify-between gap-4">
              <h3 className="text-2xl font-semibold">Selected Projects</h3>
              <a href="https://github.com/jonorl" target="_blank" rel="noreferrer" className="text-sm inline-flex items-center gap-1 hover:text-zinc-500">
                View all <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-2">
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
            <p className="mt-4  text-slate-600 dark:text-slate-300">
              I'm Jon, and I've spent the last few years making a deliberate transition from business intelligence management to full-stack development.
              Born in Argentina, now splitting time between London and Kampala due to family commitments, which has given me plenty of practice working across time zones and cultures.
            </p>
            <p className="mt-4  text-slate-600 dark:text-slate-300">What sets me apart? I approach development with a BI mindset. I naturally think about data flow, performance bottlenecks, and how users actually behave
              (not just how we think they should). I have first-hand experience in digitalisation projects, roadmapping and UX design.</p>
            <p className="mt-4  text-slate-600 dark:text-slate-300">Currently building projects that demonstrate both technical skill and business understanding. Always interested in connecting with fellow developers,
              startup founders, or companies looking for someone who can bridge the gap between technical implementation and business outcomes.</p>
            <ul className="list-none mt-6 grid gap-3 sm:grid-cols-2">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Strong focus on UX & maintainability.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Performance minded: code‑splitting, context API, memoization.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Comfortable across the stack: React, Express, PostgreSQL/Prisma.</li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">Shipping mindset: iterate quickly, add polish last.</li>
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
                  Grab a one‑page PDF with skills, selected projects, and links.
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
                  <a href="mailto:jon@example.com" className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 hover:bg-white/20">
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
              © {new Date().getFullYear()} Jonathan Orlowski. Built with React & Tailwind.
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

function TiltCard({ title, description, tech, href }) {
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

