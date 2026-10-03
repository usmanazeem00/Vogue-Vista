import React from "react";
import { Link } from "../lib/nav";
import { JsonLd } from "../lib/seo";

export const formatDate = (iso) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  });

// Visible FAQ list. Answers are always in the HTML (native <details>), and the
// FAQPage schema is generated from the same array so the two can't diverge.
export function FaqSection({ faqs, title = "Frequently asked questions", eyebrow = "FAQ", schema = true }) {
  return (
    <section className="faq-section">
      <div className="faq-inner">
        <div className="section-eyebrow">{eyebrow}</div>
        <h2 className="section-title" style={{ marginBottom: 24 }}>{title}</h2>
        {faqs.map((f) => (
          <details key={f.q} className="faq-item">
            <summary className="faq-q">
              {f.q}
              <span className="faq-chevron" aria-hidden="true">▼</span>
            </summary>
            <div className="faq-a">{f.a}</div>
          </details>
        ))}
      </div>
      {schema && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}
    </section>
  );
}

// Sidebar list of related pages.
export function RelatedLinks({ title = "Related", links }) {
  return (
    <div className="sidebar-card">
      <h4>{title}</h4>
      <ul className="quick-link-list">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// "Last reviewed" + sources block shown under calculators and articles.
export function ReviewNote({ updated, appliesTo, sources = [], children }) {
  return (
    <div className="review-note">
      <p>
        <strong>Last reviewed:</strong> {formatDate(updated)}
        {appliesTo && <> · <strong>Applies to:</strong> {appliesTo}</>}
      </p>
      {children && <p>{children}</p>}
      {sources.length > 0 && (
        <>
          <p style={{ marginTop: 8 }}><strong>Sources</strong></p>
          <ul>
            {sources.map((s) => (
              <li key={s.label}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ) : (
                  s.label
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      <p style={{ marginTop: 8 }}>
        Estimates for planning only — not tax or religious advice. See our{" "}
        <Link to="/disclaimer">disclaimer</Link>, and{" "}
        <Link to="/contact">tell us</Link> if you spot an error.
      </p>
    </div>
  );
}

// Explanatory content block used below calculators.
export function ContentSection({ eyebrow, title, children }) {
  return (
    <section className="calc-grid-section content-section">
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      {title && <h2 className="section-title">{title}</h2>}
      <div className="prose">{children}</div>
    </section>
  );
}

// Layout for guides: hero, byline with date + tax year, body, related links.
export function ArticleLayout({ badge, title, intro, updated, appliesTo, sources, related, children }) {
  return (
    <article>
      <section className="page-hero">
        <div className="page-hero-inner">
          {badge && <div className="hero-badge">{badge}</div>}
          <h1>{title}</h1>
          {intro && <p>{intro}</p>}
        </div>
      </section>

      <div className="article-wrap">
        <p className="article-byline">
          By the PK Tax Calc team · Updated <time dateTime={updated}>{formatDate(updated)}</time>
          {appliesTo && <> · {appliesTo}</>}
        </p>

        <div className="prose">{children}</div>

        {related && related.length > 0 && (
          <div className="calc-card related-guides">
            <h2>Keep reading</h2>
            <ul className="related-links">
              {related.map((r) => (
                <li key={r.to}>
                  <Link to={r.to}>{r.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        <ReviewNote updated={updated} sources={sources} />
      </div>
    </article>
  );
}

// Simple callout box for key answers / tips inside articles.
export function Callout({ children, tone = "info" }) {
  return <div className={`callout callout-${tone}`}>{children}</div>;
}
