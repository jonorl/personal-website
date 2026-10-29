import type { Project } from "./types";

export const clientProjects: Project[] = [
    {
      title: "Teatro Dislocador",
      description: "Live site for an independent theatre in Argentina: a public site and an admin CMS on an Express/Prisma/Postgres API, containerised behind Caddy on its own VPS. The owner only posts on Instagram, so an n8n workflow has Gemini read each new post and publishes the shows and classes it finds, then retires them a month after the date.",
      tech: ["React", "TypeScript", "Tailwind", "Clerk", "Express", "Prisma", "PostgreSQL", "n8n", "Gemini", "Docker", "Caddy"],
      href: "https://teatrodislocador.ar",
      githubHref: "https://github.com/jonorl/teatro-dislocador",
      image: "/projects/teatro.webp",
      video: "/projects/teatro.mp4",
      imageAlt: "A scroll down the theatre's home page: the school, its shows, its history and the venue for hire.",
      featured: true,
      serviceId: "teatro",
    },
  ];
