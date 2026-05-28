import { Mail, Download } from "lucide-react";

export default function CVandContact() {
  return (
    <section id="CV" className="relative z-10 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-4 py-10">
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
  )
}