// Runs after `vite build`. Writes one static HTML file per public page, plus
// an empty shell for the dashboard and a real 404 page.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssr = path.resolve("dist-ssr");
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, routes } = await import(pathToFileURL(path.join(ssr, "entry-server.js")).href);

// The untouched build output: an empty root for routes that render in the browser only.
fs.writeFileSync(path.join(dist, "shell.html"), template);

for (const route of routes) {
  const html = template
    .replace('<html lang="en">', '<html lang="en" class="rc">')
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace('<div id="root"></div>', `<div id="root">${render(route.path)}</div>`);
  if (!html.includes('class="rc-root"')) throw new Error(`Prerender produced no content for ${route.path}`);
  const file = path.join(dist, route.file);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerendered ${route.path} -> ${route.file} (${(html.length / 1024).toFixed(1)} kB)`);
}

fs.rmSync(ssr, { recursive: true, force: true });
