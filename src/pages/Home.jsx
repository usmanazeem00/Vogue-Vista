import React, { useState, useRef } from "react";
import {
  fmt, calcTaxBreakdown, DEFAULT_TAX_YEAR, SILVER_RATE_PER_TOLA, GOLD_RATE_PER_TOLA, METAL_RATES_DATE,
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { JsonLd, SITE_URL, SITE_NAME } from "../lib/seo";
import { FaqSection } from "../components/Content";

const calcs = [
  { icon: "🧾", title: "Income Tax Calculator",   path: "/income-tax",      type: "tax",        badge: "2026-27 slabs",  desc: "Yearly and monthly income tax for salaried and business individuals, with the slab-by-slab working." },
  { icon: "💼", title: "Salary Tax Calculator",   path: "/salary",          type: "salary",     badge: "Take-home pay",  desc: "Tax your employer should deduct each month, and take-home pay after EOBI and provident fund." },
  { icon: "☪️", title: "Zakat Calculator",        path: "/zakat",           type: "zakat",      badge: "Nisab check",    desc: "Zakat on cash, bank balances, gold, silver, shares and business stock, minus debts due now." },
  { icon: "🥇", title: "Gold Zakat",              path: "/gold-zakat",      type: "gold",       badge: "Tola & grams",   desc: "Zakat on gold jewellery, coins and bars for 24K, 22K, 21K and 18K at today's Sarafa rate." },
  { icon: "🥈", title: "Silver Zakat",            path: "/silver-zakat",    type: "silver",     badge: "52.5 tola",      desc: "Zakat on silver and the silver Nisab in rupees, the threshold most used for savings." },
  { icon: "💻", title: "Freelancer Tax",          path: "/freelancer-tax",  type: "freelancer", badge: "Section 154A",   desc: "Tax on Upwork, Fiverr and foreign-client income: 0.25% with PSEB, 1% without, plus local income." },
  { icon: "🏦", title: "Bank Profit",             path: "/bank-interest",   type: "bank",       badge: "15% / 30% WHT",  desc: "Profit on savings accounts and term deposits after withholding tax for filers and non-filers." },
  { icon: "📋", title: "Withholding Tax",         path: "/withholding-tax", type: "wht",        badge: "Filer vs non-filer", desc: "WHT on bank profit, dividends, property, cash withdrawals, contracts and IT exports." },
  { icon: "🏆", title: "Prize Bond Tax",          path: "/prize-bond-tax",  type: "prize-bond", badge: "Section 156",    desc: "Tax deducted from prize bond winnings and the net cash you receive." },
  { icon: "📱", title: "Mobile Load Tax",         path: "/sim-load-tax",    type: "sim",        badge: "Rs 100 = ?",     desc: "Balance credited on a Jazz, Zong, Ufone or Telenor recharge after tax." },
];

const guides = [
  { title: "Income Tax Slabs 2026-27", path: "/blog/income-tax-slabs-2026", desc: "Salaried and business slabs for Tax Year 2027 and what changed." },
  { title: "Tax on Salary: Monthly Table", path: "/blog/salary-tax-guide", desc: "Tax on salaries from Rs 50,000 to Rs 1,000,000 a month." },
  { title: "Tax Return Last Date 2026", path: "/blog/tax-return-deadline", desc: "Deadline extended to 15 October 2026 — what you need to know." },
  { title: "Zakat Nisab 2026", path: "/blog/zakat-nisab", desc: "Gold and silver Nisab in rupees, and which to use." },
  { title: "How to Become a Filer", path: "/blog/become-filer", desc: "Register on IRIS and join the Active Taxpayers List." },
  { title: "Filer vs Non-Filer", path: "/blog/filer-vs-non-filer", desc: "What non-filers pay extra on banking, property and more." },
];

const silverNisab = 52.5 * SILVER_RATE_PER_TOLA;
const goldNisab = 7.5 * GOLD_RATE_PER_TOLA;

const faqs = [
  {
    q: "How much income is tax-free in Pakistan in 2026-27?",
    a: "The first Rs 600,000 of taxable income a year (Rs 50,000 a month) is tax-free for salaried and business individuals. Salaried income above that is taxed at 1% up to Rs 1.2m, 11% up to Rs 2.2m, 20% up to Rs 3.2m, 25% up to Rs 4.1m, 29% up to Rs 5.6m, 32% up to Rs 7m and 35% above Rs 7m, each on the part of income inside that band.",
  },
  {
    q: "What changed in Budget 2026-27 for salaried people?",
    a: "Finance Act 2026 cut the rates on salaried income above Rs 2.2 million, added a 29% band and a new 32% band so the 35% rate starts only above Rs 7 million, and abolished the surcharge on income above Rs 10 million. Rates up to Rs 2.2 million did not change.",
  },
  {
    q: "What is the Zakat Nisab in Pakistan in 2026?",
    a: `Nisab is 52.5 tola (612.36 g) of silver or 7.5 tola (87.48 g) of gold. At Sarafa rates of ${METAL_RATES_DATE} that is about ${fmt(silverNisab)} (silver) or ${fmt(goldNisab)} (gold). Most scholars in Pakistan advise the silver Nisab for cash and savings. Zakat is 2.5% of net Zakatable wealth.`,
  },
  {
    q: "What is the last date to file the 2026 tax return?",
    a: "FBR extended the deadline for Tax Year 2026 returns from 30 September to 15 October 2026 for salaried and other individuals and AOPs. Filing late means a penalty and a Rs 25,000 surcharge to get back on the Active Taxpayers List.",
  },
  {
    q: "Are these calculators official FBR tools?",
    a: "No. PK Tax Calc is an independent website and is not affiliated with FBR or any government body. We follow the Finance Act and FBR publications and show the date each page was last checked, but you should confirm important figures on FBR's website or with a tax adviser.",
  },
];

export default function Home() {
  const [qIncome, setQIncome] = useState("");
  const [qPeriod, setQPeriod] = useState("monthly");
  const [qType, setQType] = useState("salaried");
  const [qResult, setQResult] = useState(null);
  const resultRef = useRef(null);

  const quickCalculate = () => {
    let annual = parseFloat(String(qIncome).replace(/,/g, "")) || 0;
    if (qPeriod === "monthly") annual = annual * 12;
    const { total } = calcTaxBreakdown(annual, qType === "salaried", DEFAULT_TAX_YEAR);
    setQResult({ annual, tax: total, monthlyTax: total / 12, netAnnual: annual - total, monthly: (annual - total) / 12 });
    setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const siteSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}/`,
        name: SITE_NAME,
        inLanguage: "en-PK",
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        email: "hello.pktaxcalc@gmail.com",
      },
    ],
  };

  return (
    <div>
      <JsonLd data={siteSchema} />

      {/* Scoped override to keep the hero compact without touching the shared stylesheet */}
      <style>{`
        .home-hero { padding: 40px 20px 28px !important; min-height: 0 !important; }
        .home-hero-inner h1 { font-size: clamp(1.5rem, 4vw, 2.1rem) !important; line-height: 1.25 !important; margin-bottom: 10px !important; }
        .home-hero-inner p { font-size: 1rem !important; margin-bottom: 18px !important; }
        .hero-stats { margin-top: 16px !important; gap: 12px !important; }
        .hero-stat .stat-val { font-size: 1.3rem !important; }
      `}</style>

      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-pill">Finance Act 2026 · Tax Year 2027 · Free</div>
          <h1>Pakistan Tax & Zakat Calculators for 2026-27</h1>
          <p>Work out income tax on your salary, take-home pay, Zakat and withholding tax using the current FBR rates. No sign-up, and nothing you enter leaves your browser.</p>
          <div className="hero-stats">
            {[["10", "Calculators"], ["Rs 600k", "Tax-free limit"], ["2.5%", "Zakat rate"], ["2026-27", "Tax year"]].map(([v, l]) => (
              <div className="hero-stat" key={l}>
                <span className="stat-val">{v}</span>
                <span className="stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick calculator — answers the most common query without a click ── */}
      <section className="calc-layout" style={{ marginTop: -20 }}>
        <div>
          <div className="calc-card fade-in">
            <h2>Quick Income Tax Calculator</h2>
            <p className="section-desc" style={{ marginTop: -8, marginBottom: 16 }}>
              Enter your salary to see your 2026-27 tax instantly.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="q-period">Income Period</label>
                <select id="q-period" value={qPeriod} onChange={(e) => setQPeriod(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual (Yearly)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="q-income">{qType === "salaried" ? "Taxable Salary" : "Business Income"} (Rs)</label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    id="q-income"
                    type="number"
                    inputMode="numeric"
                    placeholder={qPeriod === "monthly" ? "e.g. 150000" : "e.g. 1800000"}
                    value={qIncome}
                    onChange={(e) => setQIncome(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Taxpayer Type</label>
              <div className="radio-group">
                {[["salaried", "👔 Salaried"], ["business", "🏪 Business / Self-Employed"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="qIncomeType" value={v} checked={qType === v} onChange={() => setQType(v)} />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-calc" onClick={quickCalculate}>Calculate Tax →</button>
            <button className="btn-reset" onClick={() => { setQIncome(""); setQResult(null); }}>Reset</button>

            <p style={{ marginTop: 14 }}>
              Want the slab-by-slab working or a 2025-26 comparison?{" "}
              <Link to="/income-tax">Open the full income tax calculator →</Link>
            </p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {qResult ? (
              <>
                <div className="result-header">
                  <h3>Estimated Tax (2026-27)</h3>
                  <div className="result-main-amount">
                    {qPeriod === "monthly" ? fmt(qResult.monthlyTax) : fmt(qResult.tax)}
                  </div>
                  <div className="result-main-label">
                    {qPeriod === "monthly" ? "Monthly Income Tax" : "Annual Income Tax"}
                  </div>
                </div>
                <div className="result-body">
                  <div className="result-row highlight"><span className="label">Monthly Income After Tax</span><span className="value">{fmt(qResult.monthly)}</span></div>
                  <div className="result-row"><span className="label">Annual Income</span><span className="value">{fmt(qResult.annual)}</span></div>
                  <div className="result-row tax-row"><span className="label">Annual Tax</span><span className="value">{fmt(qResult.tax)}</span></div>
                  <div className="result-row highlight"><span className="label">Annual Income After Tax</span><span className="value">{fmt(qResult.netAnnual)}</span></div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">🧾</div>
                <p>Enter your salary and click Calculate to see your estimated tax.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">All Calculators</div>
        <h2 className="section-title">What do you want to calculate?</h2>
        <p className="section-desc">Every calculator runs in your browser — nothing you enter is sent or stored.</p>
        <div className="calc-grid">
          {calcs.map(c => (
            <Link key={c.path} to={c.path} className={`calc-tile ${c.type}`}>
              <div className="tile-badge">{c.badge}</div>
              <div className="tile-icon" aria-hidden="true">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="tile-arrow">Calculate now →</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Why PK Tax Calc</div>
        <h2 className="section-title">Built around Pakistan's 2026-27 rules</h2>
        <p className="section-desc">
          Generic salary calculators are often out of date or built for another country. Ours use the
          Finance Act 2026 slab tables, FBR's withholding rates for filers and non-filers, the EOBI
          contribution rules on Pakistani payslips, and tola-based Zakat Nisab — and each page shows the date
          its rates were last checked and where they come from.
        </p>
        <p className="section-desc">
          The 2026-27 budget changed salaried tax above Rs 2.2 million: the 23% and 30% rates fell to 20% and
          25%, new 29% and 32% bands were added, and the surcharge above Rs 10 million was removed. The
          income tax and freelancer calculators still let you switch to 2025-26 if you're checking an old
          payslip or return. See <Link to="/about">how we check our rates</Link>.
        </p>
      </section>

      <section className="features-strip">
        <div className="features-strip-inner">
          {[
            { icon: "✅", h: "Current rates", p: "Finance Act 2026 slabs and Tax Year 2027 withholding rates, with a review date on every page." },
            { icon: "🔒", h: "Private", p: "Calculations run in your browser. Your figures are never sent or stored." },
            { icon: "📱", h: "Mobile first", p: "Designed for phones, where most people check their tax." },
            { icon: "🆓", h: "Free", p: "No subscription, no sign-up, no paywall." },
          ].map(f => (
            <div className="feature-item" key={f.h}>
              <div className="feature-icon" aria-hidden="true">{f.icon}</div>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 800, color: "var(--ink)", marginBottom: 6 }}>{f.h}</h3>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Guides</div>
        <h2 className="section-title">Tax and Zakat guides</h2>
        <p className="section-desc">Plain-English explanations with worked examples in rupees.</p>

        <div className="calc-grid">
          {guides.map(g => (
            <Link key={g.path} to={g.path} className="calc-tile">
              <div className="tile-icon" aria-hidden="true">📝</div>
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
              <div className="tile-arrow">Read guide →</div>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <Link
            to="/blogs"
            className="btn-calc"
            style={{ width: "auto", padding: "14px 28px", display: "inline-block", textAlign: "center", textDecoration: "none" }}
          >
            View all guides
          </Link>
        </div>
      </section>

      <FaqSection faqs={faqs} title="Common questions" />
    </div>
  );
}
