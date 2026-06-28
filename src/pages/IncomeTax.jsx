import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  fmt, fmtPlain, calcIncomeTax, getSlabs, getActiveSlab,
  TAX_YEARS, DEFAULT_TAX_YEAR
} from "../utils/taxUtils";

export default function IncomeTax({ navigate }) {
  const [form, setForm] = useState({
    incomeType: "salaried",
    period: "monthly",
    income: "",
    otherIncome: "",
    taxYear: DEFAULT_TAX_YEAR,
  });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    let annual = parseFloat(form.income.replace(/,/g, "")) || 0;
    const other = parseFloat(form.otherIncome.replace(/,/g, "")) || 0;
    if (form.period === "monthly") annual = annual * 12;
    annual += other;
    const isSalaried = form.incomeType === "salaried";
    const tax = calcIncomeTax(annual, isSalaried, form.taxYear);
    const activeSlab = getActiveSlab(annual, isSalaried, form.taxYear);
    const effectiveRate = annual > 0 ? (tax / annual) * 100 : 0;
    const monthly = annual / 12;
    const monthlyTax = tax / 12;
    const netAnnual = annual - tax;
    setResult({ annual, tax, effectiveRate, activeSlab, monthly, monthlyTax, netAnnual, isSalaried });
    setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const slabs = getSlabs(form.incomeType === "salaried", form.taxYear);
  const yearLabel = TAX_YEARS.find(y => y.id === form.taxYear)?.label || "";

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pktaxcalc.com/income-tax",
        "url": "https://pktaxcalc.com/income-tax",
        "name": "Income Tax Calculator Pakistan 2026-27 | FBR Tax Slabs",
        "description": "Calculate your income tax for FY 2026-27 based on FBR Finance Bill 2026 slabs. Accurate tax for salaried individuals and business owners in Pakistan.",
        "isPartOf": { "@id": "https://pktaxcalc.com" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pktaxcalc.com" },
            { "@type": "ListItem", "position": 2, "name": "Income Tax Calculator", "item": "https://pktaxcalc.com/income-tax" }
          ]
        }
      },
      {
        "@type": "WebApplication",
        "name": "Pakistan Income Tax Calculator 2026-27",
        "url": "https://pktaxcalc.com/income-tax",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "description": "Free Pakistan income tax calculator for FY 2026-27. Covers salaried and business income using official FBR Finance Bill 2026 slabs.",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "PKR" },
        "featureList": [
          "Salaried income tax calculation",
          "Business income tax calculation",
          "Monthly and annual tax breakdown",
          "Effective tax rate calculation",
          "FBR Finance Bill 2026 slabs",
          "Tax year 2025-26 and 2026-27 support"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the income tax threshold in Pakistan for 2026-27?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Income up to Rs 600,000 per year is fully exempt from income tax in Pakistan for FY 2026-27. Above this, progressive rates apply under Finance Bill 2026: 1% up to Rs 1.2m, 11% up to Rs 2.2m, 20% up to Rs 3.2m, 25% up to Rs 4.1m, 29% up to Rs 5.6m, 32% up to Rs 7m, and 35% above Rs 7m."
            }
          },
          {
            "@type": "Question",
            "name": "What is the difference between salaried and business income tax in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Salaried individuals in Pakistan pay lower income tax rates than business or self-employed individuals. FBR maintains separate tax slab tables for both categories. Salaried income is taxed at source by the employer via monthly deduction, while business owners file and pay tax annually via the IRIS portal."
            }
          },
          {
            "@type": "Question",
            "name": "What changed in Budget 2026-27 for salaried people in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Finance Bill 2026 brought major relief for salaried taxpayers: tax rates were cut for all income brackets above Rs 2.2m, a new 32% bracket was introduced for income between Rs 5.6m and Rs 7m, and the 9% surcharge on income above Rs 10 million was fully abolished effective July 1, 2026."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate my monthly income tax in Pakistan?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To calculate monthly income tax in Pakistan: multiply your monthly salary by 12 to get annual income, apply the FBR tax slabs for FY 2026-27 to find annual tax liability, then divide by 12 for the monthly deduction. Our salary tax calculator does this automatically including EOBI and SESSI deductions."
            }
          },
          {
            "@type": "Question",
            "name": "Do I need to file a tax return if my employer deducts tax?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Even if your employer deducts income tax monthly, you must still file an annual tax return on the FBR IRIS portal by September 30, 2026. Filing keeps you on the Active Taxpayer List (ATL), which gives you lower withholding tax rates on banking transactions, property purchases, dividends and more."
            }
          }
        ]
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Income Tax Calculator Pakistan 2026-27 | FBR Tax Slabs</title>
        <meta name="description" content="Calculate your income tax for FY 2026-27 based on FBR Finance Bill 2026 slabs. Accurate tax for salaried individuals and business owners in Pakistan." />
        <link rel="canonical" href="https://pktaxcalc.com/income-tax" />
        <meta property="og:title" content="Income Tax Calculator Pakistan 2026-27 | FBR Tax Slabs" />
        <meta property="og:description" content="Calculate your income tax for FY 2026-27 based on FBR Finance Bill 2026 slabs. Free, accurate, no signup required." />
        <meta property="og:url" content="https://pktaxcalc.com/income-tax" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Income Tax Calculator Pakistan 2026-27 | FBR Tax Slabs" />
        <meta name="twitter:description" content="Calculate your Pakistan income tax instantly. FBR Finance Bill 2026 slabs, salaried and business income." />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">FBR Finance Bill 2026 · FY 2026-27</div>
          <h1>Income Tax Calculator Pakistan 2026-27</h1>
          <p>Calculate your exact income tax liability based on the latest FBR Finance Bill 2026 slabs for salaried individuals and business owners.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Your Income Details</h2>

            <div className="form-group">
              <label>Tax Year</label>
              <select value={form.taxYear} onChange={e => { set("taxYear", e.target.value); setResult(null); }}>
                {TAX_YEARS.map(y => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Taxpayer Type</label>
              <div className="radio-group">
                {[["salaried", "👔 Salaried Individual"], ["business", "🏪 Business / Self-Employed"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="incomeType" value={v}
                      checked={form.incomeType === v}
                      onChange={() => set("incomeType", v)} />
                    {l}
                  </label>
                ))}
              </div>
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
                <label>
                  {form.incomeType === "salaried" ? "Gross Salary" : "Business Income"}
                  <span> (Rs)</span>
                </label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    type="number"
                    placeholder={form.period === "monthly" ? "e.g. 150,000" : "e.g. 1,800,000"}
                    value={form.income}
                    onChange={e => set("income", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Other Taxable Income <span>(optional — rent, freelance, etc.)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input
                  type="number"
                  placeholder="e.g. 200,000"
                  value={form.otherIncome}
                  onChange={e => set("otherIncome", e.target.value)}
                />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Income Tax →</button>
            <button className="btn-reset" onClick={() => { setForm({ incomeType: "salaried", period: "annual", income: "", otherIncome: "", taxYear: DEFAULT_TAX_YEAR }); setResult(null); }}>
              Reset
            </button>
          </div>

          <div className="calc-card fade-in" style={{ marginTop: 24 }}>
            <h2>Tax Slabs {yearLabel} — {form.incomeType === "salaried" ? "Salaried" : "Business"}</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="slab-table">
                <thead>
                  <tr>
                    <th>Taxable Income (Rs)</th>
                    <th>Rate</th>
                    <th>Fixed Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {slabs.map((s, i) => {
                    const isActive = result && result.annual >= s.min && result.annual <= s.max;
                    return (
                      <tr key={i} className={isActive ? "active-slab" : ""}>
                        <td>
                          {fmtPlain(s.min)} – {s.max === Infinity ? "Above" : fmtPlain(s.max)}
                          {isActive && " ✓"}
                        </td>
                        <td>{s.rate === 0 ? "Nil" : `${(s.rate * 100).toFixed(0)}%`}</td>
                        <td>{s.fixed === 0 ? "—" : fmt(s.fixed)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="hint" style={{ marginTop: 12 }}>✓ Highlighted row is your applicable tax slab.</p>
            {form.taxYear === "TY2027" && form.incomeType === "salaried" && (
              <div style={{ marginTop: 12, padding: "10px 14px", background: "var(--g-50)", borderRadius: "var(--r-sm)", fontSize: "0.82rem", color: "var(--g-900)" }}>
                🎉 <strong>Finance Bill 2026:</strong> Rates reduced above Rs 2.2m. 9% surcharge on income &gt; Rs 10m fully abolished. Effective July 1, 2026.
              </div>
            )}
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Tax Summary</h3>
                  <div className="result-main-amount">{form.period === "monthly" ? fmt(result.monthlyTax) : fmt(result.tax)}</div>
                  <div className="result-main-label">{form.period === "monthly" ? "Monthly Income Tax" : "Annual Income Tax"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Gross Annual Income</span>
                    <span className="value">{fmt(result.annual)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Annual Tax</span>
                    <span className="value">{fmt(result.tax)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Net Annual Income</span>
                    <span className="value">{fmt(result.netAnnual)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Monthly Gross</span>
                    <span className="value">{fmt(result.monthly)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Monthly Tax</span>
                    <span className="value">{fmt(result.monthlyTax)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Monthly Net Pay</span>
                    <span className="value">{fmt(result.monthly - result.monthlyTax)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Effective Tax Rate</span>
                    <span className="value">{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Marginal Rate</span>
                    <span className="value">{(result.activeSlab.rate * 100).toFixed(0)}%</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">🧾</div>
                <p>Enter your income and click Calculate to see your tax breakdown.</p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Important Notes</h4>
            <ul>
              <li>Tax slabs are for FY 2026-27 (Finance Bill 2026, effective July 2026)</li>
              <li>Salaried persons pay lower rates than business/non-salaried income</li>
              <li>File your return on <strong>IRIS portal</strong> by September 30, 2026</li>
              <li>Being a filer reduces WHT on many transactions</li>
              <li>9% surcharge on income &gt; Rs 10m abolished from TY2027</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/salary")}>💼 Salary &amp; Deductions Calculator</button></li>
              <li><button onClick={() => navigate("/withholding-tax")}>📋 Withholding Tax Calculator</button></li>
              <li><button onClick={() => navigate("/zakat")}>☪️ Zakat Calculator</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}