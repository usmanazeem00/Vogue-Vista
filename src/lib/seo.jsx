import React, { createContext, useContext, useEffect } from "react";

export const SITE_URL = "https://pktaxcalc.com";
export const SITE_NAME = "PK Tax Calc";

// During prerendering a collector object is provided here and <Seo> writes
// the page's head tags into it. In the browser it is null and <Seo> updates
// document.head after each navigation instead.
export const HeadContext = createContext(null);

export const absoluteUrl = (path) => SITE_URL + (path === "/" ? "/" : path);

function headEntries({ title, description, path, type = "website", noindex = false }) {
  const url = absoluteUrl(path);
  return {
    title,
    metas: [
      ["name", "description", description],
      ["name", "robots", noindex ? "noindex, follow" : "index, follow, max-image-preview:large"],
      ["property", "og:type", type],
      ["property", "og:url", url],
      ["property", "og:title", title],
      ["property", "og:description", description],
      ["property", "og:site_name", SITE_NAME],
      ["property", "og:locale", "en_PK"],
      ["name", "twitter:card", "summary"],
      ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ],
    canonical: noindex ? null : url,
  };
}

const escapeHtml = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Used by the prerender script to write the head tags into static HTML.
export function headToHtml(props) {
  const h = headEntries(props);
  const lines = [`<title>${escapeHtml(h.title)}</title>`];
  for (const [attr, key, value] of h.metas) {
    lines.push(`<meta ${attr}="${key}" content="${escapeHtml(value)}" data-seo>`);
  }
  if (h.canonical) lines.push(`<link rel="canonical" href="${h.canonical}" data-seo>`);
  return lines.join("\n    ");
}

function applyHead(props) {
  const h = headEntries(props);
  document.title = h.title;
  for (const [attr, key, value] of h.metas) {
    let el = document.head.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute("content", value);
  }
  let link = document.head.querySelector('link[rel="canonical"]');
  if (h.canonical) {
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", h.canonical);
  } else if (link) {
    link.remove();
  }
}

export function Seo({ title, description, path, type, noindex }) {
  const collector = useContext(HeadContext);
  if (collector) collector.head = { title, description, path, type, noindex };
  useEffect(() => {
    applyHead({ title, description, path, type, noindex });
  }, [title, description, path, type, noindex]);
  return null;
}

// JSON-LD rendered into the page body, so it is present in the prerendered
// HTML and always matches the visible content of the page.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
