import { FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
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
  )
}