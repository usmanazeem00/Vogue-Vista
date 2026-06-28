import React, { useState } from "react";
import AdSlot from "../components/AdSlot";

const calcs = [
  { icon: "🧾", title: "Income Tax Calculator", path: "/income-tax", type: "tax",   badge: "FBR 2026-27", desc: "Calculate your annual income tax based on Finance Bill 2026 slabs. Covers salaried & business income." },
  { icon: "☪️", title: "Zakat Calculator",       path: "/zakat",       type: "zakat", badge: "Nisab 2026",   desc: "Zakat on cash, savings, stocks, gold, silver and receivables — with Nisab check included." },
  { icon: "🥇", title: "Gold Zakat",             path: "/gold-zakat",  type: "gold",  badge: "Live Rate",    desc: "Zakat on gold jewellery, coins and bars. Supports 24K, 22K, 21K, 18K purity in grams or tola." },
  { icon: "🥈", title: "Silver Zakat",           path: "/silver-zakat",type: "silver",badge: "Live Rate",    desc: "Calculate Zakat on silver with current Sarafa rate. Uses the most conservative Nisab threshold." },
  { icon: "🏦", title: "Bank Profit",            path: "/bank-interest",type:"bank",  badge: "All Banks",    desc: "Calculate profit on savings & term deposits for HBL, MCB, UBL, Meezan and more. WHT included." },
  { icon: "💼", title: "Salary Calculator",      path: "/salary",      type: "salary",badge: "Net Pay",      desc: "Your exact take-home after income tax, EOBI, SESSI and provident fund. Monthly + annual view." },
  { icon: "📋", title: "Withholding Tax",        path: "/withholding-tax",type:"wht", badge: "23 Categories",desc: "WHT on contracts, rent, dividends, property, exports, freelance and more — filer vs non-filer." },
  { icon: "📱", title: "SIM Load Tax",           path: "/sim-load-tax", type: "sim",   badge: "Mobile Recharge", desc: "Calculate mobile load tax in Pakistan including advance tax and service tax for Jazz, Zong, Ufone and Telenor." },

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

  return (
    <div>
      {/* ── HERO ── */}
      <section className="home-hero">
        <div className="home-hero-inner">
          <div className="hero-pill">Finance Bill 2026 · Official Slabs · Free</div>
          <h1>Pakistan's Free<br /><em>Tax & Zakat</em> Calculators</h1>
          <p>Accurate income tax, Zakat, salary and withholding tax calculations for FY 2026-27. No account required.</p>
          <div className="hero-stats">
            {[["7","Calculators"],["2.5%","Zakat Rate"],["FY 26-27","Tax Year"],["100%","Free"]].map(([v,l]) => (
              <div className="hero-stat" key={l}>
                <span className="stat-val">{v}</span>
                <span className="stat-lbl">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOP AD ── */}
      {/* <div className="container">
        <AdSlot size="responsive" className="ad-slot-728" />
      </div>

      {/* ── CALC GRID ── */}
      <section className="calc-grid-section">
        <div className="section-eyebrow">All Calculators</div>
        <h2 className="section-title">What do you want to calculate?</h2>
        <p className="section-desc">Free, private and accurate. Results appear instantly in your browser — nothing is stored.</p>
        <div className="calc-grid">
          {calcs.map(c => (
            <article
              key={c.path}
              className={`calc-tile ${c.type}`}
              onClick={() => navigate(c.path)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === "Enter" && navigate(c.path)}
            >
              <div className="tile-badge">{c.badge}</div>
              <div className="tile-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <div className="tile-arrow">Calculate now →</div>
            </article>
          ))}
        </div>
      </section>

      {/* ── MID AD ── */}
      {/* <div className="container">
        <AdSlot size="responsive" />
      </div> */}

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
  <div className="section-eyebrow">
    Learn & Save Taxes
  </div>

  <h2 className="section-title">
    Latest Tax Guides
  </h2>

  <p className="section-desc">
    Learn about income tax, FBR filing, Zakat and financial planning in Pakistan.
  </p>

  <div className="calc-grid">
    {[
      {
        title: "Income Tax Slabs Pakistan FY 2026-27",
        path: "/blog/income-tax-slabs-2026"
      },
      {
        title: "How to Become a Filer in Pakistan",
        path: "/blog/become-filer"
      },
      {
        title: "How to Calculate Salary Tax",
        path: "/blog/salary-tax-guide"
      }
    ].map(blog => (
      <article
        key={blog.path}
        className="calc-tile"
        onClick={() => navigate(blog.path)}
      >
        <div className="tile-icon">📝</div>

        <h3>{blog.title}</h3>

        <p>
          Read our complete guide and examples.
        </p>

        <div className="tile-arrow">
          Read article →
        </div>
      </article>
    ))}
  </div>

  <div style={{ marginTop: 32, textAlign: "center" }}>
    <button
      className="btn-calc"
      style={{
        width: "auto",
        padding: "14px 28px"
      }}
      onClick={() => navigate("/blogs")}
    >
      View All Articles
    </button>
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