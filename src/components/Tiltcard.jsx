import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from 'react-icons/fa';

export default function TiltCard({ title, description, tech, href, githubHref }) {
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
        className="relative min-h-40 rounded-2xl border border-white/10 bg-white/5 p-5 transition-transform will-change-transform"
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