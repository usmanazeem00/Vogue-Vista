import React from "react";
import { Link } from "../lib/nav";
import { RATES_REVIEWED, METAL_RATES_DATE } from "../utils/taxUtils";

const sectionTitle = {
  fontFamily: "var(--font-hero)", fontSize: "1.3rem", color: "var(--ink)",
  marginBottom: 16, paddingBottom: 12, borderBottom: "2px solid var(--g-100)",
};

export default function About() {
  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">About Us</div>
          <h1>About PK Tax Calc</h1>
          <p>Free, independent tax and Zakat calculators for people in Pakistan — with our sources and review dates in the open.</p>
        </div>
      </section>

      <div style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px 80px" }}>
        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>What we do</h2>
          <div className="prose">
            <p>
              PK Tax Calc helps salaried employees, freelancers, small business owners and families in Pakistan
              answer everyday money questions quickly: how much tax comes off a salary, what a non-filer pays
              extra, how much Zakat is due on savings and gold. Each calculator is paired with a plain-English
              explanation of the rule behind it, so you can check the working rather than trust a number blindly.
            </p>
            <p>
              PK Tax Calc is an independent website. We don't present the site as professional tax or
              religious advice — which is why every page links to its sources and tells you when to check
              with FBR, a tax adviser or a scholar.
            </p>
          </div>
        </div>

        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>How we check our rates</h2>
          <div className="prose">
            <ul>
              <li><strong>Income tax slabs</strong> come from the rates schedule of the current Finance Act (Finance Act 2026 for Tax Year 2027). We update them after each federal budget is passed.</li>
              <li><strong>Withholding tax rates</strong> come from the First and Tenth Schedules of the Income Tax Ordinance 2001 as amended, and FBR's withholding rate card.</li>
              <li><strong>Deadlines and circulars</strong> are checked against FBR announcements; for example, the extension of the 2026 return deadline to 15 October.</li>
              <li><strong>Gold and silver prices</strong> used as defaults in the Zakat calculators are Sarafa benchmark rates on a stated date. You can always type today's rate.</li>
              <li><strong>Zakat rules</strong> follow the approach most widely used in Pakistan (Hanafi). Where schools differ, such as Zakat on jewellery, we say so.</li>
            </ul>
            <p>
              Every calculator and guide shows a "last reviewed" date. The current rates were last reviewed on{" "}
              <strong>{RATES_REVIEWED}</strong>; default metal prices are from {METAL_RATES_DATE}.
            </p>
          </div>
        </div>

        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>Corrections</h2>
          <div className="prose">
            <p>
              Tax rules change often and mistakes happen. If you find a figure that doesn't match FBR's
              publications or your payslip, please <Link to="/contact">contact us</Link> with the page and, if
              possible, the source. We check every report and correct confirmed errors, updating the page's
              review date.
            </p>
          </div>
        </div>

        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={sectionTitle}>Privacy and cost</h2>
          <div className="prose">
            <p>
              The calculators run entirely in your browser — the salary, savings or gold figures you type are
              never sent to us. The site is free to use with no sign-up. To cover running costs we may show
              advertising; ads never influence our figures. See the <Link to="/privacy-policy">privacy policy</Link>.
            </p>
          </div>
        </div>

        <div className="info-card warning">
          <h4>⚠️ Independent — not affiliated with FBR</h4>
          <p>
            PK Tax Calc is not affiliated with the Federal Board of Revenue, the Government of Pakistan or any
            bank. Results are estimates for planning. Read the full <Link to="/disclaimer">disclaimer</Link>.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "var(--ink-500)", marginBottom: 20 }}>Have a question or found an error?</p>
          <Link to="/contact" className="btn-calc" style={{ width: "auto", padding: "12px 32px", display: "inline-block", textDecoration: "none" }}>
            Contact Us →
          </Link>
        </div>
      </div>
    </div>
  );
}
