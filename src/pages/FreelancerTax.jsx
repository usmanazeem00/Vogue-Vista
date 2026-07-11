import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  fmt, calcIncomeTax, TAX_YEARS, DEFAULT_TAX_YEAR
} from "../utils/taxUtils";

const PSEB_RATE = 0.0025;   // 0.25% — PSEB-registered, Section 154A, extended to 30 June 2029
const NON_PSEB_RATE = 0.01; // 1% — not PSEB-registered, Section 154A

export default function FreelancerTax({ navigate }) {
  const [form, setForm] = useState({
    period: "monthly",
    exportIncome: "",
    localIncome: "",
    psebRegistered: "yes",
    meets80Rule: "yes",
    taxYear: DEFAULT_TAX_YEAR,
  });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    let exportAnnual = parseFloat(String(form.exportIncome).replace(/,/g, "")) || 0;
    let localAnnual = parseFloat(String(form.localIncome).replace(/,/g, "")) || 0;
    if (form.period === "monthly") {
      exportAnnual = exportAnnual * 12;
      localAnnual = localAnnual * 12;
    }

    // If the 80% banking-channel rule isn't met, the concessional FTR doesn't apply —
    // fall back to standard progressive business slabs on the export income instead.
    const qualifiesForFTR = form.meets80Rule === "yes";
    const rate = form.psebRegistered === "yes" ? PSEB_RATE : NON_PSEB_RATE;

    const exportTax = qualifiesForFTR
      ? exportAnnual * rate
      : calcIncomeTax(exportAnnual, false, form.taxYear);

    const localTax = calcIncomeTax(localAnnual, false, form.taxYear);

    const totalIncome = exportAnnual + localAnnual;
    const totalTax = exportTax + localTax;
    const netAnnual = totalIncome - totalTax;
    const monthlyNet = netAnnual / 12;
    const effectiveRate = totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

    setResult({
      exportAnnual, localAnnual, exportTax, localTax,
      totalIncome, totalTax, netAnnual, monthlyNet, effectiveRate,
      qualifiesForFTR, rate
    });

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
        "@type": "WebPage",
        "@id": "https://pktaxcalc.com/freelancer-tax",
        "url": "https://pktaxcalc.com/freelancer-tax",
        "name": "Freelancer Tax Calculator Pakistan 2026-27 | Upwork, Fiverr, Payoneer",
        "description": "Free freelancer tax calculator for Pakistan FY 2026-27. Calculate your Section 154A tax on Upwork, Fiverr, Payoneer and Wise income — PSEB vs non-PSEB rates.",
        "dateModified": "2026-07-11",
        "isPartOf": { "@id": "https://pktaxcalc.com" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pktaxcalc.com" },
            { "@type": "ListItem", "position": 2, "name": "Freelancer Tax Calculator", "item": "https://pktaxcalc.com/freelancer-tax" }
          ]
        }
      },
      {
        "@type": "WebApplication",
        "name": "Pakistan Freelancer Tax Calculator 2026-27",
        "url": "https://pktaxcalc.com/freelancer-tax",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "description": "Free calculator for Pakistani freelancers earning from Upwork, Fiverr, Payoneer, and Wise. Covers Section 154A PSEB (0.25%) and non-PSEB (1%) rates plus local client income.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
        "featureList": [
          "Section 154A export income tax (0.25% PSEB / 1% non-PSEB)",
          "Local client income under standard business slabs",
          "80% banking channel rule check",
          "Monthly and annual breakdown",
          "Tax year 2026-27 (Finance Bill 2026) support"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the freelancer tax rate in Pakistan for 2026-27?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Under Section 154A of the Income Tax Ordinance, PSEB-registered freelancers pay a flat 0.25% final tax on foreign (export) income received through approved banking channels. Freelancers not registered with PSEB pay 1%. Finance Bill 2026 extended the 0.25% rate until 30 June 2029."
            }
          },
          {
            "@type": "Question",
            "name": "Is the 0.25% or 1% freelancer tax a final tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Tax deducted under Section 154A is a Final Tax Regime (FTR), meaning it fully settles your tax liability on that export income — it isn't added on top of the progressive income tax slabs. You must still file an annual tax return to stay on the Active Taxpayer List."
            }
          },
          {
            "@type": "Question",
            "name": "What counts as export income for freelancers?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Income from foreign clients on platforms like Upwork, Fiverr, or via direct wire, received through approved banking channels such as a Pakistani bank account, Payoneer linked to a local account, or Wise, counts as IT export income eligible for Section 154A treatment."
            }
          },
          {
            "@type": "Question",
            "name": "What is the 80% banking channel rule?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "At least 80% of your total export remittances for the tax year must be received through approved Pakistani banking channels to qualify for the concessional Section 154A rate. Income left in foreign platform wallets or received informally doesn't count toward this threshold."
            }
          },
          {
            "@type": "Question",
            "name": "How is income from local Pakistani clients taxed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Local-client income paid in PKR doesn't qualify for the Section 154A export rate. It's taxed under the standard progressive business/non-salaried income tax slabs, the same as any other self-employed income in Pakistan."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to register with PSEB as a freelancer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PSEB registration isn't legally mandatory, but it's required to access the lower 0.25% rate instead of 1%. Registration requires a CNIC, an NTN, a bank account, and proof of freelance work, with a Rs 1,000 fee."
            }
          }
        ]
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Freelancer Tax Calculator Pakistan 2026-27 | Upwork, Fiverr, Payoneer</title>
        <meta name="description" content="Free freelancer tax calculator for Pakistan FY 2026-27. Calculate your Section 154A tax on Upwork, Fiverr, Payoneer and Wise income — PSEB (0.25%) vs non-PSEB (1%) rates." />
        <link rel="canonical" href="https://pktaxcalc.com/freelancer-tax" />
        <meta property="og:title" content="Freelancer Tax Calculator Pakistan 2026-27 | Upwork, Fiverr, Payoneer" />
        <meta property="og:description" content="Calculate your Section 154A freelancer tax for FY 2026-27 — PSEB vs non-PSEB rates, plus local client income. Free, instant, no signup." />
        <meta property="og:url" content="https://pktaxcalc.com/freelancer-tax" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <a href="#" onClick={(e) => { e.preventDefault(); navigate("/"); }}>Home</a>
        <span aria-hidden="true"> / </span>
        <span>Freelancer Tax Calculator</span>
      </nav>

      <style>{`
        .breadcrumb-nav {
          background: transparent;
          padding: 10px 24px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.65);
        }
        .breadcrumb-nav a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }
        .breadcrumb-nav a:hover {
          text-decoration: underline;
        }
        .ftr-badge {
          display: inline-block;
          margin-top: 8px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
        }
        .ftr-badge.qualifies {
          background: #1f8a5f;
          color: #fff;
        }
        .ftr-badge.no-qualify {
          background: #b5522f;
          color: #fff;
        }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Section 154A · FY 2026-27 · Extended to 2029</div>
          <h1>Freelancer Tax Calculator Pakistan 2026-27</h1>
          <p>
            Calculate your exact tax on Upwork, Fiverr, Payoneer and Wise income —
            PSEB vs non-PSEB rates, plus any local-client income, in one place.
          </p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Your Freelance Income</h2>

            <div className="form-group">
              <label>Tax Year</label>
              <select value={form.taxYear} onChange={e => { set("taxYear", e.target.value); setResult(null); }}>
                {TAX_YEARS.map(y => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Income Period</label>
                <select value={form.period} onChange={e => set("period", e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual (Yearly)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Export Income <span>(foreign clients, Rs)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    type="number"
                    placeholder={form.period === "monthly" ? "e.g. 250,000" : "e.g. 3,000,000"}
                    value={form.exportIncome}
                    onChange={e => set("exportIncome", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Local Client Income <span>(optional, paid in PKR)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input
                  type="number"
                  placeholder="e.g. 0"
                  value={form.localIncome}
                  onChange={e => set("localIncome", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>PSEB Registered?</label>
              <div className="radio-group">
                {[["yes", "✅ Yes — 0.25% rate"], ["no", "❌ No — 1% rate"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input
                      type="radio"
                      name="psebRegistered"
                      value={v}
                      checked={form.psebRegistered === v}
                      onChange={() => set("psebRegistered", v)}
                    />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>
                80% Banking Channel Rule Met?{" "}
                <span>(at least 80% of export income via bank/Payoneer/Wise)</span>
              </label>
              <div className="radio-group">
                {[["yes", "✅ Yes"], ["no", "❌ No"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input
                      type="radio"
                      name="meets80Rule"
                      value={v}
                      checked={form.meets80Rule === v}
                      onChange={() => set("meets80Rule", v)}
                    />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Freelancer Tax →</button>
            <button
              className="btn-reset"
              onClick={() => {
                setForm({ period: "monthly", exportIncome: "", localIncome: "", psebRegistered: "yes", meets80Rule: "yes", taxYear: DEFAULT_TAX_YEAR });
                setResult(null);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Tax Summary</h3>
                  <div className="result-main-amount">
                    {form.period === "monthly" ? fmt(result.totalTax / 12) : fmt(result.totalTax)}
                  </div>
                  <div className="result-main-label">
                    {form.period === "monthly" ? "Monthly Total Tax" : "Annual Total Tax"}
                  </div>
                  <div className={`ftr-badge ${result.qualifiesForFTR ? "qualifies" : "no-qualify"}`}>
                    {result.qualifiesForFTR
                      ? `Final Tax Regime applied — ${(result.rate * 100).toFixed(2)}%`
                      : "80% rule not met — standard slabs applied instead"}
                  </div>
                </div>

                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Export Income (Annual)</span>
                    <span className="value">{fmt(result.exportAnnual)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Export Tax</span>
                    <span className="value">{fmt(result.exportTax)}</span>
                  </div>
                  {result.localAnnual > 0 && (
                    <>
                      <div className="result-row">
                        <span className="label">Local Income (Annual)</span>
                        <span className="value">{fmt(result.localAnnual)}</span>
                      </div>
                      <div className="result-row tax-row">
                        <span className="label">Local Income Tax</span>
                        <span className="value">{fmt(result.localTax)}</span>
                      </div>
                    </>
                  )}
                  <div className="result-row highlight">
                    <span className="label">Net Annual Income</span>
                    <span className="value">{fmt(result.netAnnual)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Net Monthly Income</span>
                    <span className="value">{fmt(result.monthlyNet)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Effective Tax Rate</span>
                    <span className="value">{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">💻</div>
                <p>Enter your freelance income and click Calculate to see your tax breakdown.</p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Important Notes</h4>
            <ul>
              <li>0.25% (PSEB) / 1% (non-PSEB) rate extended to 30 June 2029 under Finance Bill 2026</li>
              <li>Section 154A tax is <strong>final</strong> — no additional slab tax on export income</li>
              <li>You must still file an annual return to stay on the Active Taxpayer List</li>
              <li>Local-client (PKR) income uses standard business slabs, not Section 154A</li>
              <li>80% of export income must arrive via approved banking channels to qualify</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/income-tax")}>🧾 Income Tax Calculator</button></li>
              <li><button onClick={() => navigate("/withholding-tax")}>📋 Withholding Tax Calculator</button></li>
              <li><button onClick={() => navigate("/salary")}>💼 Salary Calculator</button></li>
            </ul>
          </div>
        </div>
      </div>

      <section className="calc-grid-section">
        <div className="section-eyebrow">How It Works</div>
        <h2 className="section-title">How Freelancer Tax Works in Pakistan</h2>
        <p className="section-desc">
          Pakistani freelancers who export services to foreign clients — through
          Upwork, Fiverr, direct wire transfers, or wallets like Payoneer and
          Wise — fall under a different, simpler tax regime than local
          business income. Instead of progressive slabs, Section 154A of the
          Income Tax Ordinance applies a flat withholding rate to your gross
          export income, deducted automatically by your bank when the
          remittance lands.
        </p>

        <h3 style={{ marginTop: 24 }}>PSEB registration changes your rate</h3>
        <p className="section-desc">
          If you're registered with the Pakistan Software Export Board (PSEB),
          your rate drops to 0.25%. Without PSEB registration, the same
          export income is taxed at 1%. Finance Bill 2026 confirmed this
          concessional structure will continue until 30 June 2029, so it's
          not a short-term incentive.
        </p>

        <h3 style={{ marginTop: 24 }}>The 80% rule matters</h3>
        <p className="section-desc">
          To qualify for either rate under the Final Tax Regime, at least 80%
          of your export remittances for the year need to come through
          approved banking channels — a Pakistani bank account, Payoneer
          linked to a local account, or Wise. Income sitting in foreign
          wallets, or moved informally, doesn't count toward this threshold
          and can push you back onto standard progressive tax treatment.
        </p>

        <h3 style={{ marginTop: 24 }}>Local clients are a separate calculation</h3>
        <p className="section-desc">
          If you also serve Pakistani clients and get paid in PKR, that
          portion of your income isn't eligible for the Section 154A rate —
          it's taxed under the same progressive business slabs as any other
          self-employed income, which is why the calculator above keeps the
          two income streams separate.
        </p>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: July 2026, against Finance Bill 2026 and Section 154A
          of the Income Tax Ordinance, 2001. This tool gives an estimate for
          planning purposes and isn't a substitute for professional tax advice.
        </p>
      </section>
    </div>
  );
}