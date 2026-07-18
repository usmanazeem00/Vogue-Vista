import React, { useState,useRef } from "react";
import { Helmet } from "react-helmet-async";
import AdSlot from "../components/AdSlot";
import { fmt, calcIncomeTax, DEFAULT_TAX_YEAR } from "../utils/taxUtils";

const calcs = [
  { icon: "🧾", title: "Income Tax Calculator", path: "/income-tax", type: "tax",   badge: "FBR 2026-27", desc: "Calculate your annual income tax based on Finance Bill 2026 slabs. Covers salaried & business income." },
  { icon: "☪️", title: "Zakat Calculator",       path: "/zakat",       type: "zakat", badge: "Nisab 2026",   desc: "Zakat on cash, savings, stocks, gold, silver and receivables — with Nisab check included." },
  { icon: "📱", title: "SIM Load Tax",           path: "/sim-load-tax", type: "sim",   badge: "Mobile Recharge", desc: "Calculate mobile load tax in Pakistan including advance tax and service tax for Jazz, Zong, Ufone and Telenor." },
  { icon: "💼", title: "Salary Calculator",      path: "/salary",      type: "salary",badge: "Net Pay",      desc: "Your exact take-home after income tax, EOBI, SESSI and provident fund. Monthly + annual view." },
  { 
    icon: "🏆", 
    title: "Prize Bond Tax", 
    path: "/prize-bond-tax", 
    type: "prize-bond", 
    badge: "Prize Bond Tax", 
    desc: "Calculate FBR withholding tax deductions on national prize bond winnings. Instantly compare net take-home cash payouts." 
  },
  { icon: "🥇", title: "Gold Zakat",             path: "/gold-zakat",  type: "gold",  badge: "Live Rate",    desc: "Zakat on gold jewellery, coins and bars. Supports 24K, 22K, 21K, 18K purity in grams or tola." },
  { icon: "🥈", title: "Silver Zakat",           path: "/silver-zakat",type: "silver",badge: "Live Rate",    desc: "Calculate Zakat on silver with current Sarafa rate. Uses the most conservative Nisab threshold." },
  { icon: "🏦", title: "Bank Profit",            path: "/bank-interest",type:"bank",  badge: "All Banks",    desc: "Calculate profit on savings & term deposits for HBL, MCB, UBL, Meezan and more. WHT included." },
  { icon: "📋", title: "Withholding Tax",        path: "/withholding-tax",type:"wht", badge: "23 Categories",desc: "WHT on contracts, rent, dividends, property, exports, freelance and more — filer vs non-filer." },
  { icon: "💻", title: "Freelancer Tax",         path: "/freelancer-tax", type: "freelancer", badge: "Section 154A", desc: "Calculate your Upwork, Fiverr and Payoneer tax — PSEB 0.25% vs non-PSEB 1%, plus local client income." },
];

const blogPosts = [
  { title: "Income Tax Slabs Pakistan FY 2026-27", path: "/blog/income-tax-slabs-2026" },
  { title: "How to Become a Filer in Pakistan", path: "/blog/become-filer" },
  { title: "How to Calculate Salary Tax", path: "/blog/salary-tax-guide" }
];

const faqs = [
  { q: "What is the income tax threshold in Pakistan for 2026-27?",
    a: "Income up to Rs 600,000 per year remains fully exempt. Finance Bill 2026 then applies reduced progressive rates: 1% up to 1.2m, 11% up to 2.2m, 20% up to 3.2m, 25% up to 4.1m, 29% up to 5.6m, 32% up to 7m, and 35% above 7m. The 9% surcharge on income above Rs 10 million has been fully abolished." },
  { q: "What is the Nisab for Zakat in Pakistan 2026?",
    a: "Nisab can be calculated using gold (87.48g / 7.5 tola) or silver (612.36g / 52.5 tola). Silver Nisab is recommended by most scholars as it's lower and more inclusive — at current 2026 rates approximately Rs 195,000–200,000. Once your net Zakatable assets reach Nisab and one lunar year has passed, 2.5% Zakat is due." },
  { q: "What changed in Budget 2026-27 for salaried people?",
    a: "Finance Bill 2026 (announced June 12, 2026) brought the biggest salary tax relief in years: rates cut for all brackets above Rs 2.2m, a new 32% bracket added for Rs 5.6m–7m, and the 9% surcharge on high earners abolished. Property WHT for buyers also dropped from 2.5% to 1.25%." },
  { q: "Do I need to file an income tax return in Pakistan?",
    a: "Yes — if your annual income exceeds Rs 600,000, you must file a return on the FBR IRIS portal. Deadline is September 30, 2026. Being a 'filer' on the Active Taxpayer List gives you significantly lower withholding tax rates on banking, property, dividends and dozens of other transactions." },
  { q: "Is bank profit (interest) halal in Pakistan?",
    a: "Conventional bank interest (Sood) is generally considered impermissible in Islam. Many Pakistani banks now offer Sharia-compliant Mudarabah profit-sharing accounts. Meezan Bank, Bank Islami, Dubai Islamic Bank and others operate fully on Islamic finance principles. Consult a qualified Islamic scholar for your specific situation." },
  { q: "How is Zakat calculated on gold jewellery?",
    a: "If your gold (combined with other Zakatable assets) reaches Nisab (87.48g of pure gold equivalent) and one lunar year has passed, 2.5% of the total market value is due as Zakat. Our Gold Zakat calculator supports all purities (18K–24K) and lets you enter today's Sarafa rate." },
];

export default function Home({ navigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  // ── Quick upfront income tax calculator (homepage) ──
  const [qIncome, setQIncome] = useState("");
  const [qPeriod, setQPeriod] = useState("monthly");
  const [qType, setQType] = useState("salaried");
  const [qResult, setQResult] = useState(null);
  const resultRef = useRef(null);

  // Helper to keep SPA navigation working while still rendering a real
  // <a href> so crawlers can discover and follow the link.
  const go = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const quickCalculate = () => {
    let annual = parseFloat(String(qIncome).replace(/,/g, "")) || 0;
    if (qPeriod === "monthly") annual = annual * 12;
    const isSalaried = qType === "salaried";
    const tax = calcIncomeTax(annual, isSalaried, DEFAULT_TAX_YEAR);
    const monthlyTax = tax / 12;
    const netAnnual = annual - tax;
    const monthly = netAnnual / 12;
    setQResult({ annual, tax, monthlyTax, netAnnual,monthly });
        setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pktaxcalc.com/#website",
        url: "https://pktaxcalc.com/",
        name: "PkTaxCalc — Pakistan Tax & Zakat Calculators",
        description:
          "Free income tax, Zakat, salary and withholding tax calculators for Pakistan, updated for FY 2026-27.",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://pktaxcalc.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": "https://pktaxcalc.com/",
        url: "https://pktaxcalc.com/",
        name: "Pakistan Tax & Zakat Calculators 2026-27 | PkTaxCalc",
        description:
          "Free calculators for income tax, Zakat, salary and withholding tax in Pakistan — updated for FY 2026-27. No signup needed.",
        isPartOf: { "@id": "https://pktaxcalc.com/#website" }
      },
      {
        "@type": "ItemList",
        itemListElement: calcs.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.title,
          url: `https://pktaxcalc.com${c.path}`
        }))
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Pakistan Tax & Zakat Calculators 2026-27 | PkTaxCalc</title>
        <meta
          name="description"
          content="Free calculators for income tax, Zakat, salary and withholding tax in Pakistan — updated for FY 2026-27. No signup needed."
        />
        <link rel="canonical" href="https://pktaxcalc.com/" />
        <meta property="og:title" content="Pakistan Tax & Zakat Calculators 2026-27 | PkTaxCalc" />
        <meta
          property="og:description"
          content="Free calculators for income tax, Zakat, salary and withholding tax in Pakistan — updated for FY 2026-27."
        />
        <meta property="og:url" content="https://pktaxcalc.com/" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      {/* Scoped override to bring the hero down to a reasonable size without
          touching the shared stylesheet (which may set .home-hero elsewhere) */}
      <style>{`
        .home-hero {
          padding: 40px 20px 28px !important;
          min-height: 0 !important;
        }
        .home-hero-inner h1 {
          font-size: clamp(1.5rem, 4vw, 2.1rem) !important;
          line-height: 1.25 !important;
          margin-bottom: 10px !important;
        }
        .home-hero-inner p {
          font-size: 1rem !important;
          margin-bottom: 18px !important;
        }
        .hero-stats {
          margin-top: 16px !important;
          gap: 12px !important;
        }
        .hero-stat .stat-val {
          font-size: 1.3rem !important;
        }
      `}</style>

      {/* ── HERO (single H1 lives here) ── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-pill">Finance Bill 2026 · Official Slabs · Free</div>
          <h1>Pakistan's Free Tax & Zakat Calculators — FY 2026-27</h1>
          <p>Accurate income tax, Zakat, salary and withholding tax calculations for FY 2026-27. No account required.</p>
          <div className="hero-stats">
            {[["9","Calculators"],["2.5%","Zakat Rate"],["FY 26-27","Tax Year"],["100%","Free"]].map(([v,l]) => (
              <div className="hero-stat" key={l}>
                <span className="stat-val">{v}</span>
                <span className="stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPFRONT QUICK CALCULATOR — no click-through needed ── */}
      <section className="calc-layout" style={{ marginTop: -20 }}>
        <div>
          <div className="calc-card fade-in">
            <h2>Quick Income Tax Calculator</h2>
            <p className="section-desc" style={{ marginTop: -8, marginBottom: 16 }}>
              Enter your salary below to see your tax instantly — no need to open another page.
            </p>

            <div className="form-row">
              <div className="form-group">
                <label>Income Period</label>
                <select value={qPeriod} onChange={(e) => setQPeriod(e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual (Yearly)</option>
                </select>
              </div>
              <div className="form-group">
                <label>{qType === "salaried" ? "Gross Salary" : "Business Income"} (Rs)</label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    type="number"
                    placeholder={qPeriod === "monthly" ? "e.g. 150,000" : "e.g. 1,800,000"}
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
                    <input
                      type="radio"
                      name="qIncomeType"
                      value={v}
                      checked={qType === v}
                      onChange={() => setQType(v)}
                    />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-calc" onClick={quickCalculate}>Calculate Tax →</button>
            <button
              className="btn-reset"
              onClick={() => { setQIncome(""); setQResult(null); }}
            >
              Reset
            </button>

            <p style={{ marginTop: 14 }}>
              Need monthly slab breakdowns, EOBI/SESSI deductions, or multiple tax years?{" "}
              <a href="/income-tax" onClick={go("/income-tax")}>
                Open the full Income Tax Calculator →
              </a>
            </p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {qResult ? (
              <>
                <div className="result-header">
                  <h3>Estimated Tax</h3>
                  <div className="result-main-amount">
                    {qPeriod === "monthly" ? fmt(qResult.monthlyTax) : fmt(qResult.tax)}
                  </div>
                  <div className="result-main-label">
                    {qPeriod === "monthly" ? "Monthly Income Tax" : "Annual Income Tax"}
                  </div>
                </div>
                <div className="result-body">
                    <div className="result-row highlight">
                    <span className="label">Monthly Income After Tax</span>
                    <span className="value">{fmt(qResult.monthly)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Gross Annual Income</span>
                    <span className="value">{fmt(qResult.annual)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Annual Tax</span>
                    <span className="value">{fmt(qResult.tax)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Net Annual Income</span>
                    <span className="value">{fmt(qResult.netAnnual)}</span>
                  </div>
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

      {/* ── TOP AD ── */}
      {/* <div className="container">
        <AdSlot size="responsive" className="ad-slot-728" />
      </div> */}

      {/* ── CALC GRID ── */}
      <section className="calc-grid-section">
        <div className="section-eyebrow">All Calculators</div>
        <h2 className="section-title">What else do you want to calculate?</h2>
        <p className="section-desc">Free, private and accurate. Results appear instantly in your browser — nothing is stored.</p>
        <div className="calc-grid">
          {calcs.map(c => (
            <a
              key={c.path}
              href={c.path}
              className={`calc-tile ${c.type}`}
              onClick={go(c.path)}
            >
              <div className="tile-badge">{c.badge}</div>
              <div className="tile-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="tile-arrow">Calculate now →</div>
            </a>
          ))}
        </div>
      </section>

      {/* ── MID AD ── */}
      {/* <div className="container">
        <AdSlot size="responsive" />
      </div> */}

      {/* ── HOW IT WORKS / WHY TRUST THESE NUMBERS — real content depth ── */}
      <section className="calc-grid-section">
        <div className="section-eyebrow">Why PkTaxCalc</div>
        <h2 className="section-title">Built specifically for Pakistan's FY 2026-27 rules</h2>
        <p className="section-desc">
          PkTaxCalc gives salaried employees, business owners, and freelancers
          in Pakistan a fast way to check their numbers for FY 2026-27 —
          income tax, Zakat on cash, gold and silver, salary deductions like
          EOBI and Provident Fund, and withholding tax across more than 20
          transaction types, all free and with no account required.
        </p>
        <p className="section-desc">
          Most generic salary or tax calculators online are either outdated or
          built for a different country's tax code. PkTaxCalc is updated
          directly against Finance Bill 2026, FBR's published slab tables, and
          the EOBI/PESSI/SESSI contribution rates that actually apply to
          Pakistani payslips — so the numbers you get match what your employer
          or FBR would calculate.
        </p>

        <h3 style={{ marginTop: 24 }}>How the calculators stay current</h3>
        <p className="section-desc">
          Every year's federal budget changes income tax slabs, exemption
          limits, and withholding rates. When Finance Bill 2026 was announced
          on June 12, 2026, we rebuilt the slab tables the same week —
          including the new 32% bracket for income between Rs 5.6 million and
          Rs 7 million, and the removal of the 9% surcharge above Rs 10
          million. You can still switch back to the prior tax year if you're
          reconciling an old payslip.
        </p>

        <h3 style={{ marginTop: 24 }}>Who uses these calculators</h3>
        <p className="section-desc">
          Salaried employees use the Salary and Income Tax calculators to
          check what their employer should be deducting each month. Freelancers
          on Upwork, Fiverr, and Payoneer use the Freelancer Tax calculator to
          plan for the PSEB reduced rate. Business owners and landlords use
          the Withholding Tax calculator across contracts, rent, dividends,
          and property transactions. And anyone holding cash, gold, silver, or
          savings uses the Zakat calculators each Ramadan to work out what's
          due once Nisab is crossed.
        </p>
      </section>

      {/* ── FEATURES STRIP ── */}
      <section className="features-strip">
        <div className="features-strip-inner">
          {[
            { icon:"✅", h:"Accurate Tax Slabs",   p:"All slabs from Finance Bill 2026. Updated within 24 hrs of every budget announcement." },
            { icon:"🔒", h:"Fully Private",   p:"Calculations run in your browser. Your income figures are never transmitted or stored." },
            { icon:"📱", h:"Mobile First",    p:"Works perfectly on phones — because most Pakistanis calculate on the go." },
            { icon:"🆓", h:"Always Free",     p:"No subscription, no sign-up, no paywall." },
          ].map(f => (
            <div className="feature-item" key={f.h}>
              <div className="feature-icon">{f.icon}</div>
              <h4>{f.h}</h4>
              <p>{f.p}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Learn & Save Taxes</div>
        <h2 className="section-title">Latest Tax Guides</h2>
        <p className="section-desc">Learn about income tax, FBR filing, Zakat and financial planning in Pakistan.</p>

        <div className="calc-grid">
          {blogPosts.map(blog => (
            <a key={blog.path} href={blog.path} className="calc-tile" onClick={go(blog.path)}>
              <div className="tile-icon">📝</div>
              <h3>{blog.title}</h3>
              <p>Read our complete guide and examples.</p>
              <div className="tile-arrow">Read article →</div>
            </a>
          ))}
        </div>

        <div style={{ marginTop: 32, textAlign: "center" }}>
          <a
            className="btn-calc"
            style={{ width: "auto", padding: "14px 28px", display: "inline-block", textAlign: "center" }}
            href="/blogs"
            onClick={go("/blogs")}
          >
            View All Articles
          </a>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-inner">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>Common questions</h2>
          {faqs.map((f, i) => (
            <div key={i} className="faq-item" itemScope itemType="https://schema.org/Question">
              <div
                className={`faq-q${openFaq === i ? " open" : ""}`}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                itemProp="name"
              >
                {f.q}
                <span className="faq-chevron">▼</span>
              </div>
              {openFaq === i && (
                <div className="faq-a" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <span itemProp="text">{f.a}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── BOTTOM AD ── */}
      {/* <div className="container" style={{ paddingBottom: 48 }}>
        <AdSlot size="responsive" />
      </div> */}
    </div>
  );
}