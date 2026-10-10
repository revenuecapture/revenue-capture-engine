// Build-time only. Renders each public page to HTML so the site ships real
// content in the document instead of an empty shell. See scripts/prerender.mjs.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./App";
import { pages } from "./site/content";

export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  );

export const routes = [
  ...pages.map((p) => ({ path: p.path, title: p.title, file: p.path === "/" ? "index.html" : `${p.path.slice(1)}/index.html` })),
  { path: "/privacy", title: "Privacy | revCap", file: "privacy/index.html" },
  { path: "/page-not-found", title: "Not found | revCap", file: "404.html" },
];
