/* eslint-disable no-console */
// Prerenders every route in src/routeMeta.js to static HTML after
// `react-scripts build`, so crawlers get the full page content, title,
// description, canonical and structured data without running JavaScript.
// Also writes sitemap.xml from the same route list.
//
//   node scripts/prerender.js                 → prerender build/ + build/sitemap.xml
//   node scripts/prerender.js --sitemap-only  → write public/sitemap.xml only

const fs = require("fs");
const path = require("path");
const Module = require("module");
const babel = require("@babel/core");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const BUILD = path.join(ROOT, "build");

// ── Compile src/ on the fly (JSX + ES modules) and ignore CSS imports ──
const presets = [
  [require.resolve("@babel/preset-env"), { targets: { node: "current" }, modules: "commonjs" }],
  [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
];
const defaultJs = Module._extensions[".js"];
function compile(module, filename) {
  if (!filename.startsWith(SRC)) return defaultJs(module, filename);
  const source = fs.readFileSync(filename, "utf8");
  const { code } = babel.transformSync(source, { filename, babelrc: false, configFile: false, presets });
  module._compile(code, filename);
}
Module._extensions[".js"] = compile;
Module._extensions[".jsx"] = compile;
Module._extensions[".css"] = () => {};

const { ROUTE_META, ROUTE_PATHS, NOT_FOUND_META } = require(path.join(SRC, "routeMeta.js"));
const { SITE_URL } = require(path.join(SRC, "lib", "seo.jsx"));

function buildSitemap() {
  const urls = ROUTE_PATHS.filter((p) => !ROUTE_META[p].noindex).map((p) => {
    const m = ROUTE_META[p];
    return [
      "  <url>",
      `    <loc>${SITE_URL}${p === "/" ? "/" : p}</loc>`,
      `    <lastmod>${m.updated}</lastmod>`,
      `    <changefreq>${m.changefreq || "monthly"}</changefreq>`,
      `    <priority>${m.priority || "0.5"}</priority>`,
      "  </url>",
    ].join("\n");
  });
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
}

if (process.argv.includes("--sitemap-only")) {
  fs.writeFileSync(path.join(ROOT, "public", "sitemap.xml"), buildSitemap());
  console.log(`Wrote public/sitemap.xml (${ROUTE_PATHS.length} URLs)`);
  process.exit(0);
}

const React = require("react");
const { renderToString } = require("react-dom/server");
const App = require(path.join(SRC, "App.jsx")).default;
const { HeadContext, headToHtml } = require(path.join(SRC, "lib", "seo.jsx"));

const templatePath = path.join(BUILD, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("build/index.html not found — run `react-scripts build` first.");
  process.exit(1);
}
// Keep a pristine copy so re-running the script never prerenders twice.
const pristinePath = path.join(BUILD, ".template.html");
if (!fs.existsSync(pristinePath)) fs.copyFileSync(templatePath, pristinePath);
const template = fs.readFileSync(pristinePath, "utf8");

function renderPage(routePath, meta) {
  const collector = {};
  const appHtml = renderToString(
    React.createElement(HeadContext.Provider, { value: collector }, React.createElement(App, { initialPath: routePath }))
  );
  const head = collector.head || {
    title: meta.title, description: meta.description, path: routePath, noindex: meta.noindex,
  };

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<meta[^>]*data-seo[^>]*>/g, "")
    .replace(/<link[^>]*data-seo[^>]*>/g, "");
  html = html.replace("</head>", `${headToHtml(head)}</head>`);

  const rootTag = '<div id="root"></div>';
  if (!html.includes(rootTag)) throw new Error("Could not find empty #root in build/index.html");
  html = html.replace(rootTag, `<div id="root" data-path="${routePath}">${appHtml}</div>`);
  return html;
}

function outFile(routePath) {
  // With "cleanUrls" in vercel.json, /income-tax is served from income-tax.html.
  if (routePath === "/") return path.join(BUILD, "index.html");
  return path.join(BUILD, `${routePath.slice(1)}.html`);
}

let count = 0;
for (const routePath of ROUTE_PATHS) {
  const file = outFile(routePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, renderPage(routePath, ROUTE_META[routePath]));
  count++;
}

// 404 page: Vercel serves build/404.html with a real 404 status for unknown URLs.
fs.writeFileSync(path.join(BUILD, "404.html"), renderPage("/404", NOT_FOUND_META));

fs.writeFileSync(path.join(BUILD, "sitemap.xml"), buildSitemap());
fs.unlinkSync(pristinePath);

console.log(`Prerendered ${count} pages + 404.html, wrote sitemap.xml`);
