import type { Project } from "./types";

export const productionProjects: Project[] = [
    {
      title: "EU Youth Alumni Platform",
      credit: "At GOPA Pro, for the European Commission",
      description: "The platform of The Circle of EU Youth Alumni, a growing network of members around the world, in four languages. I lead its architecture, and started with no repository, no CI/CD, no documentation and no automation. Since then: a Git workflow with reviewed pull requests, CI, a staging copy with anonymised data, automated deploys and numbered migrations; a React app inside WordPress; a daily Mailchimp sync; events with QR check-in and certificates; and two-step sign-in.",
      tech: ["WordPress", "PHP", "React", "TypeScript", "Vite", "MySQL", "Python", "Mailchimp API", "GitHub Actions"],
      href: "https://youthalumni.eu",
      image: "/projects/youth-alumni.webp",
      video: "/projects/youth-alumni.mp4",
      imageAlt: "A scroll down the platform's home page: the magazine, joining The Circle, inviting an alumnus, the opportunities board and upcoming events.",
      featured: true,
    },
    {
      title: "Teatro Dislocador",
      credit: "Client project",
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
