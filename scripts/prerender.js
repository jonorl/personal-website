// Fills dist/index.html's empty root with the rendered page, so crawlers and link previews that don't run
// JavaScript still see the content. Runs after both Vite builds; see "build" in package.json.
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dist = (p) => fileURLToPath(new URL(`../dist/${p}`, import.meta.url));
const ssrDir = fileURLToPath(new URL("../dist-ssr/", import.meta.url));

const { render } = await import(`${ssrDir}entry-server.js`);
const template = readFileSync(dist("index.html"), "utf8");
const empty = '<div id="root"></div>';
if (!template.includes(empty)) throw new Error(`dist/index.html has no ${empty} to fill`);

writeFileSync(dist("index.html"), template.replace(empty, `<div id="root">${render()}</div>`));
rmSync(ssrDir, { recursive: true, force: true });
