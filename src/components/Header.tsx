import { Dispatch, SetStateAction } from "react";
import { MonitorCheck } from "lucide-react";
import { useTheme } from "../hooks/useTheme";

interface HeaderProps {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
}

const links = [
  { href: "#infra", label: "Infra & DevOps" },
  { href: "#in-production", label: "In Production" },
  { href: "#real-world", label: "Real-World" },
  { href: "#ai-projects", label: "AI/ML Projects" },
  { href: "#fun", label: "Just for Fun" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
  { href: "#CV", label: "CV" },
];

// In-page links are plain anchors so the URL and back button follow them; index.css handles the smooth scroll.
export default function Header({ menuOpen, setMenuOpen }: HeaderProps) {
  const { dark, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-[9999] backdrop-blur supports-[backdrop-filter]:bg-white/40 dark:supports-[backdrop-filter]:bg-black/20 border-b border-slate-200 dark:border-white/10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#home" className="group inline-flex items-center gap-2 font-semibold">
            <MonitorCheck className="h-5 w-5 transition-transform group-hover:rotate-12" />
            <span>Jonathan Orlowski</span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="hover:text-zinc-500">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={toggle}
              className="rounded-2xl border border-slate-300 dark:border-white/20 px-3 py-1 text-xs hover:bg-slate-100 dark:hover:bg-white/10"
            >
              {dark ? "Light mode" : "Dark mode"}
            </button>
            <button
              onClick={() => setMenuOpen((m) => !m)}
              className="lg:hidden rounded-2xl border border-slate-300 dark:border-white/20 px-3 py-1 text-xs hover:bg-slate-100 dark:hover:bg-white/10"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              Menu
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-menu" className="lg:hidden border-t border-slate-200 dark:border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
            {links.map(({ href, label }) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} className="hover:text-zinc-400">{label}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}