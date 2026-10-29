import type { Project } from "./types";

export const realWorldProjects: Project[] = [
    {
      title: "Air Quality Monitor (IoT)",
      description: "Home-built sensor measuring the air in my Kampala office. Rust firmware on an ESP32-S3 reads a laser particle counter and posts minute averages over HTTPS to a Fastify/Prisma API on the VPS; a three.js dashboard draws them live in five 3D views, on the web and in an Android app.",
      tech: ["Rust", "ESP32", "TypeScript", "Fastify", "Prisma", "PostgreSQL", "React", "three.js", "React Native", "Docker", "Cloudflare"],
      href: "https://jonathan-orlowski.dev/pollution/",
      githubHref: "https://github.com/jonorl/pollution",
      image: "/projects/pollution.webp",
      video: "/projects/pollution.mp4",
      imageAlt: "The live dashboard cycling through its five views: the 24-hour clock ring, the lungs, the 14-day landscape, the size mix and the calendar.",
      featured: true,
      serviceId: "pollution",
    },
    {
      title: "NordVPN on a webOS TV",
      description: "Split tunnelling for one device: only the TV's traffic goes through NordVPN over WireGuard on an Asuswrt-Merlin router, with a kill switch so nothing leaks while the tunnel is down. A watchdog switches away from servers that stop answering, and a small TV app picks or rotates the server from the remote.",
      tech: ["WireGuard", "Asuswrt-Merlin", "Shell", "socat", "webOS", "JavaScript", "ShellCheck"],
      // There's no live demo, so the card opens the repository too.
      href: "https://github.com/jonorl/NordVPN-WebOS",
      githubHref: "https://github.com/jonorl/NordVPN-WebOS",
      image: "/projects/nordvpn-webos.webp",
      imageAlt: "The TV app, connected through a Manchester server, with favourite and recent locations below.",
      featured: true,
    },
  ];
