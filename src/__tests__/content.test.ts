import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { aiProjects } from "../const/aiProjects";
import { realWorldProjects } from "../const/realWorldProjects";
import { clientProjects } from "../const/clientProjects";
import { funProjects } from "../const/funProjects";
import type { Project } from "../const/types";

const root = process.cwd();
const publicFile = (p: string) => join(root, "public", p);

const projects: Project[] = [...aiProjects, ...realWorldProjects, ...clientProjects, ...funProjects];

describe("project data", () => {
  test.each(projects.map((p) => [p.title, p]))("%s has every required field", (_title, p) => {
    expect(p.title.trim()).not.toBe("");
    expect(p.description.trim()).not.toBe("");
    expect(p.tech.length).toBeGreaterThan(0);
    expect(p.href).toMatch(/^https:\/\//);
    expect(p.githubHref).toMatch(/^https:\/\/github\.com\/jonorl\//);
    if (p.mobileHref) expect(p.mobileHref).toMatch(/^https:\/\/github\.com\/jonorl\//);
  });

  test("titles are unique, since they are the React keys", () => {
    const titles = projects.map((p) => p.title);
    expect(new Set(titles).size).toBe(titles.length);
  });

  test("every image and video exists in public/", () => {
    for (const p of projects) {
      for (const media of [p.image, p.video]) {
        if (media) expect(existsSync(publicFile(media))).toBe(true);
      }
    }
  });

  test("featured projects have something to show beside the text", () => {
    for (const p of projects.filter((p) => p.featured)) {
      expect(p.image ?? p.video).toBeDefined();
      expect(p.imageAlt?.trim()).toBeTruthy();
    }
  });
});

describe("files for crawlers and agents", () => {
  const llms = readFileSync(publicFile("llms.txt"), "utf8");

  test("llms.txt is Markdown with an H1 and links", () => {
    expect(llms).toMatch(/^# \S/);
    expect(llms).toMatch(/\[[^\]]+\]\(https?:\/\/[^)]+\)/);
  });

  // llms.txt is written by hand, so this catches a project added to the site but not to it.
  test.each(projects.map((p) => [p.title, p.href]))("llms.txt links to %s", (_title, href) => {
    expect(llms).toContain(`(${href})`);
  });

  test("robots.txt is plain text rather than the HTML fallback", () => {
    const robots = readFileSync(publicFile("robots.txt"), "utf8");
    expect(robots).toMatch(/^User-agent:/m);
    expect(robots).not.toMatch(/<html/i);
  });

  test("index.html has a meta description and canonical URL", () => {
    const html = readFileSync(join(root, "index.html"), "utf8");
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
    expect(description).toBeDefined();
    // Search engines cut descriptions off at around 160 characters.
    expect(description!.length).toBeLessThanOrEqual(160);
    expect(html).toContain('<link rel="canonical" href="https://jonathan-orlowski.dev/">');
  });
});
