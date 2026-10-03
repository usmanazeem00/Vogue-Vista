import React from "react";
import { Link } from "../lib/nav";

const popular = [
  ["/income-tax", "Income tax calculator 2026-27"],
  ["/salary", "Salary tax and take-home calculator"],
  ["/zakat", "Zakat calculator"],
  ["/blog/income-tax-slabs-2026", "Income tax slabs 2026-27"],
  ["/blogs", "All tax and Zakat guides"],
];

export default function NotFound() {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Error 404</div>
          <h1>Page not found</h1>
          <p>The page you were looking for doesn't exist or has moved.</p>
        </div>
      </section>
      <div className="article-wrap">
        <div className="calc-card">
          <h2>Try one of these instead</h2>
          <ul className="related-links">
            {popular.map(([to, label]) => (
              <li key={to}><Link to={to}>{label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
