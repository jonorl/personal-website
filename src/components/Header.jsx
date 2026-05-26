import { Mail, Download, ExternalLink, MonitorCheck } from "lucide-react";

export default function Header({dark, menuOpen, setDark}) {
  return (
    <header className="sticky top-0 z-9999 backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="group inline-flex items-center gap-2 font-semibold">
            <MonitorCheck className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>Jonathan Orlowski</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#ai-projects" className="hover:text-zinc-500">Infra & DevOps</a>
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
            <a href="#ai-projects" className="hover:text-zinc-400">Infra & DevOps</a>
            <a href="#ai-projects" className="hover:text-zinc-400">AI/ML Projects</a>
            <a href="#fullstack-projects" className="hover:text-zinc-400">Full-Stack Projects</a>
            <a href="#about" className="hover:text-zinc-400">About</a>
            <a href="#contact" className="hover:text-zinc-400">Contact</a>
            <a href="#CV" className="hover:text-zinc-400">CV</a>
          </div>
        </div>
      )}
    </header>
  )
}