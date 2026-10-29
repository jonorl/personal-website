import type { Project } from "./types";

export const funProjects: Project[] = [
    {
      title: "Where in the World?",
      description: "A remake of the 1990 Where in the World is Carmen Sandiego? with family and friends as the thieves, in English or Spanish. Rust and macroquad compiled to WebAssembly (a 1.3 MB download), playable on desktop and phones; an Axum/Postgres API on the VPS keeps each detective's rank across devices.",
      tech: ["Rust", "WebAssembly", "macroquad", "Axum", "PostgreSQL", "Docker", "Cloudflare Pages"],
      href: "https://jonathan-orlowski.dev/carmen",
      githubHref: "https://github.com/jonorl/carmen",
      image: "/projects/carmen.gif",
      imageAlt: "A case from start to finish: the briefing, a flight, a henchman, the crime computer, a warning in the final city, the chase and the jail.",
      featured: true,
      serviceId: "carmen",
    },
  ];
