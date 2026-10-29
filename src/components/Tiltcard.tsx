import { useEffect, useRef, useState, MouseEvent } from "react";
import { ExternalLink, Smartphone } from "lucide-react";
import { FaGithub } from 'react-icons/fa';
import StatusLight from "./StatusLight";
import type { Project } from "../const/types";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
// Sits above the title link's overlay so these stay separately clickable.
const iconLink = "relative z-10 opacity-60 hover:opacity-100 focus-visible:opacity-100";

export default function TiltCard({ title, description, tech, href, githubHref, credit, mobileHref, image, imageAlt, video, featured, serviceId }: Project) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [transform, setTransform] = useState("rotateX(0deg) rotateY(0deg)");

  // Started here rather than with autoPlay, so the clip stays on its poster for anyone who asked for less motion.
  useEffect(() => {
    const clip = videoRef.current;
    if (!clip || reducedMotion()) return;
    // Browsers only allow unprompted playback when muted, and a hydrated <video muted> doesn't always say so.
    clip.muted = true;
    clip.play().catch(() => {});
  }, []);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || reducedMotion()) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rx = ((y / rect.height) - 0.5) * -10; // tilt up/down
    const ry = ((x / rect.width) - 0.5) * 10;  // tilt left/right
    setTransform(`rotateX(${rx}deg) rotateY(${ry}deg)`);
  }

  return (
    <div className={`group ${featured ? "md:col-span-2" : ""}`}>
      <div
        ref={ref}
        onMouseLeave={() => { setTransform("rotateX(0deg) rotateY(0deg)"); }}
        onMouseMove={onMove}
        style={{ transform, transformStyle: 'preserve-3d' }}
        className="relative min-h-40 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-5 transition-transform will-change-transform focus-within:ring-2 focus-within:ring-zinc-400"
      >
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        <div style={{ transform: 'translateZ(30px)' }} className={image || video ? "relative grid gap-5 md:grid-cols-2 md:items-center" : "relative"}>
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              {/* The transform above makes this div the overlay's containing block, so the negative inset
                  (the card's p-5) stretches the link back out over the whole card. */}
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 outline-none after:absolute after:-inset-5 after:rounded-2xl"
              >
                {title}
                <ExternalLink aria-hidden="true" className="h-4 w-4 opacity-60 group-hover:opacity-100" />
              </a>
              {githubHref && (
                <a href={githubHref} target="_blank" rel="noreferrer" aria-label={`${title} source on GitHub`} className={iconLink}>
                  <FaGithub aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
              {mobileHref && (
                <a href={mobileHref} target="_blank" rel="noreferrer" aria-label={`${title} mobile app source on GitHub`} className={iconLink}>
                  <Smartphone aria-hidden="true" className="h-4 w-4" />
                </a>
              )}
              {serviceId && <span className="relative z-10"><StatusLight serviceId={serviceId} /></span>}
            </h3>
            {credit && <p className="mt-1 text-xs text-slate-500">{credit}</p>}
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              {tech.map((t) => (
                <span key={t} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 px-2 py-1">{t}</span>
              ))}
            </div>
          </div>
          {video ? (
            <video
              ref={videoRef}
              src={video}
              poster={image}
              aria-label={imageAlt}
              width={960}
              height={600}
              muted
              loop
              playsInline
              className="w-full h-auto rounded-xl border border-slate-200 dark:border-white/10"
            />
          ) : image && (
            <img
              src={image}
              alt={imageAlt ?? ""}
              width={960}
              height={600}
              loading="lazy"
              className="w-full h-auto rounded-xl border border-slate-200 dark:border-white/10"
            />
          )}
        </div>
      </div>
    </div>
  );

}