import React from "react";
import { Link } from "../lib/nav";
import { formatDate } from "../components/Content";
import { ROUTE_META } from "../routeMeta";

export function LegalPage({ badge, title, intro, updated, children }) {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">{badge}</div>
          <h1>{title}</h1>
          <p>{intro}</p>
        </div>
      </section>
      <div className="article-wrap">
        <div className="calc-card">
          <p className="article-byline">Last updated: {formatDate(updated)}</p>
          <div className="prose">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default function Disclaimer() {
  return (
    <LegalPage
      badge="Legal"
      title="Disclaimer"
      intro="What PK Tax Calc's figures are — and aren't — and what to check before you rely on them."
      updated={ROUTE_META["/disclaimer"].updated}
    >
      <h2>Estimates, not advice</h2>
      <p>
        The calculators and guides on PK Tax Calc give estimates for general information and planning. They are
        not tax, legal, financial or religious advice, and they don't create any adviser–client relationship.
      </p>

      <h2>Not affiliated with FBR or the government</h2>
      <p>
        PK Tax Calc is an independent website. It is not operated by, endorsed by or connected to the Federal
        Board of Revenue (FBR), the State Bank of Pakistan, EOBI, any provincial government or any bank. Official
        rates, forms and deadlines are published by those bodies, and their publications prevail over anything on
        this site.
      </p>

      <h2>Why your actual figure may differ</h2>
      <ul>
        <li>Tax law changes through Finance Acts, SROs and circulars, sometimes mid-year. Each page shows the date its rates were last reviewed.</li>
        <li>The calculators use simplifying assumptions — for example they don't include every exemption, tax credit, allowance or special category.</li>
        <li>Your employer, bank or FBR may apply rules or adjustments specific to your case.</li>
        <li>Default gold and silver prices are benchmark rates on a stated date; actual market and jeweller prices vary.</li>
      </ul>

      <h2>Zakat</h2>
      <p>
        Zakat calculations follow the approach most widely used in Pakistan (Hanafi). Scholars differ on some
        questions, such as jewellery and long-term investments. For a ruling on your own situation, consult a
        qualified scholar or Darul Ifta.
      </p>

      <h2>Before you file or pay</h2>
      <p>
        Check important figures against FBR's IRIS portal and official notifications, your employer's tax
        certificate, or a qualified tax practitioner. PK Tax Calc is not liable for any loss arising from reliance
        on its content. See also our <Link to="/terms">terms of use</Link>.
      </p>

      <h2>Found an error?</h2>
      <p>
        Please <Link to="/contact">tell us</Link>. We review every report and correct confirmed errors.
      </p>
    </LegalPage>
  );
}
