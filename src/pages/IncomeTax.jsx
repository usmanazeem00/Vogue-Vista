import React, { useState, useRef } from "react";
import {
  fmt, fmtPlain, calcTaxBreakdown, getSlabs,
  TAX_YEARS, DEFAULT_TAX_YEAR, RATES_REVIEWED_ISO
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const FBR_SOURCES = [
  { label: "Finance Act 2026 — First Schedule, Part I, Division I (rates for individuals)" },
  { label: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk" },
  { label: "FBR IRIS portal (return filing)", url: "https://iris.fbr.gov.pk" },
];

const faqs = [
  {
    q: "How much income is tax-free in Pakistan for 2026-27?",
    a: "Taxable income up to Rs 600,000 a year (Rs 50,000 a month) is not taxed, for both salaried and business individuals. Above that, tax is charged progressively under the slabs for Tax Year 2027.",
  },
  {
    q: "What changed in the 2026-27 budget for salaried people?",
    a: "Finance Act 2026 cut the 23% rate to 20%, the 30% rate to 25%, and introduced a 29% band (Rs 4.1m–5.6m) and a new 32% band (Rs 5.6m–7m), so 35% now starts above Rs 7 million instead of Rs 4.1 million. The surcharge on income above Rs 10 million was abolished. The first three bands (0%, 1%, 11%) did not change.",
  },
  {
    q: "Am I taxed as salaried or as a business individual?",
    a: "You use the salaried slabs if salary is more than 75% of your taxable income. Otherwise the non-salaried (business) slabs apply, which are higher at most income levels — for example 15% instead of 1% on income between Rs 600,000 and Rs 1.2 million.",
  },
  {
    q: "Is tax charged on my whole salary at my top rate?",
    a: "No. Each slab's rate only applies to the part of your income inside that slab. That is why the slab table shows a fixed amount (the tax on everything below the slab) plus a percentage of the amount above the slab's starting point.",
  },
  {
    q: "How do I work out my monthly income tax?",
    a: "Multiply your monthly taxable salary by 12, apply the annual slab formula, then divide the annual tax by 12. Employers do the same, adjusting through the year if your pay changes. Choose 'Monthly' in the calculator above and it does this for you.",
  },
  {
    q: "Do I still need to file a return if my employer deducts tax?",
    a: "Yes, if your taxable income is above Rs 600,000 (and in several other cases, such as owning a car above 1000cc or property). Filing keeps you on the Active Taxpayers List, which lowers the withholding tax you pay on bank profit, property and cash withdrawals.",
  },
];

export default function IncomeTax() {
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
    const b = calcTaxBreakdown(annual, isSalaried, form.taxYear);
    const otherYear = form.taxYear === "TY2027" ? "TY2026" : "TY2027";
    const compare = calcTaxBreakdown(annual, isSalaried, otherYear);
    setResult({
      annual, isSalaried, ...b,
      monthly: annual / 12,
      monthlyTax: b.total / 12,
      netAnnual: annual - b.total,
      compareYear: otherYear,
      compareTotal: compare.total,
    });
    setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  const slabs = getSlabs(form.incomeType === "salaried", form.taxYear);
  const yearLabel = TAX_YEARS.find(y => y.id === form.taxYear)?.label || "";
  const yearShort = (id) => (id === "TY2027" ? "2026-27" : "2025-26");

  // Worked examples are computed from the same functions as the calculator.
  const ex1 = calcTaxBreakdown(1800000, true);
  const ex2 = calcTaxBreakdown(4800000, true);
  const ex2old = calcTaxBreakdown(4800000, true, "TY2026");

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Finance Act 2026 · Tax Year 2027 (July 2026 – June 2027)</div>
          <h1>Income Tax Calculator Pakistan 2026-27</h1>
          <p>Enter your salary or business income to see your income tax under the new 2026-27 FBR slabs — monthly and yearly, with the slab-by-slab working.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Your Income Details</h2>

            <div className="form-group">
              <label htmlFor="it-year">Tax Year</label>
              <select id="it-year" value={form.taxYear} onChange={e => { set("taxYear", e.target.value); setResult(null); }}>
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
              <p className="hint">Salaried slabs apply when salary is more than 75% of your taxable income.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="it-period">Income Period</label>
                <select id="it-period" value={form.period} onChange={e => set("period", e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual (Yearly)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="it-income">
                  {form.incomeType === "salaried" ? "Taxable Salary" : "Taxable Business Income"}
                  <span> (Rs)</span>
                </label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    id="it-income"
                    type="number"
                    inputMode="numeric"
                    placeholder={form.period === "monthly" ? "e.g. 150000" : "e.g. 1800000"}
                    value={form.income}
                    onChange={e => set("income", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="it-other">Other Taxable Income <span>(optional, yearly — e.g. rent)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input
                  id="it-other"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 200000"
                  value={form.otherIncome}
                  onChange={e => set("otherIncome", e.target.value)}
                />
              </div>
              <p className="hint">Income taxed separately under the final tax regime (bank profit, dividends, prize bonds) should not be added here.</p>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Income Tax →</button>
            <button className="btn-reset" onClick={() => { setForm({ incomeType: "salaried", period: "monthly", income: "", otherIncome: "", taxYear: DEFAULT_TAX_YEAR }); setResult(null); }}>
              Reset
            </button>
          </div>

          {result && result.bands.length > 0 && (
            <div className="calc-card fade-in" style={{ marginTop: 24 }}>
              <h2>How your tax was worked out</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="slab-table">
                  <thead>
                    <tr><th>Income band (Rs)</th><th>Rate</th><th>Tax on this band</th></tr>
                  </thead>
                  <tbody>
                    {result.bands.map((b) => (
                      <tr key={b.lower}>
                        <td>{fmtPlain(b.lower)} – {fmtPlain(b.upper)}</td>
                        <td>{b.rate === 0 ? "0%" : `${(b.rate * 100).toFixed(0)}%`}</td>
                        <td>{fmt(b.tax)}</td>
                      </tr>
                    ))}
                    {result.surcharge > 0 && (
                      <tr><td>Surcharge (income above Rs 10m)</td><td>{result.isSalaried ? "9%" : "10%"} of tax</td><td>{fmt(result.surcharge)}</td></tr>
                    )}
                    <tr className="active-slab"><td><strong>Total annual tax</strong></td><td></td><td><strong>{fmt(result.total)}</strong></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="calc-card fade-in" style={{ marginTop: 24 }}>
            <h2>Tax Slabs {yearLabel.split(" —")[0]} — {form.incomeType === "salaried" ? "Salaried" : "Business / Non-Salaried"}</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="slab-table">
                <thead>
                  <tr>
                    <th>Taxable income per year (Rs)</th>
                    <th>Tax</th>
                  </tr>
                </thead>
                <tbody>
                  {slabs.map((s, i) => {
                    const isActive = result && result.annual >= s.min && result.annual <= s.max;
                    const base = s.min > 0 ? s.min - 1 : 0;
                    return (
                      <tr key={i} className={isActive ? "active-slab" : ""}>
                        <td>
                          {s.min === 0 ? "Up to 600,000" : s.max === Infinity ? `Above ${fmtPlain(base)}` : `${fmtPlain(s.min)} – ${fmtPlain(s.max)}`}
                          {isActive && " ✓"}
                        </td>
                        <td>
                          {s.rate === 0 ? "0%" : `${s.fixed ? fmt(s.fixed) + " + " : ""}${(s.rate * 100).toFixed(0)}% of amount above Rs ${fmtPlain(base)}`}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="hint" style={{ marginTop: 12 }}>
              Full explanation and comparison with last year: <Link to="/blog/income-tax-slabs-2026">Income tax slabs 2026-27</Link>.
            </p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Tax Summary ({yearShort(form.taxYear)})</h3>
                  <div className="result-main-amount">{form.period === "monthly" ? fmt(result.monthlyTax) : fmt(result.total)}</div>
                  <div className="result-main-label">{form.period === "monthly" ? "Monthly Income Tax" : "Annual Income Tax"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Annual Taxable Income</span>
                    <span className="value">{fmt(result.annual)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Annual Tax</span>
                    <span className="value">{fmt(result.total)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Annual Income After Tax</span>
                    <span className="value">{fmt(result.netAnnual)}</span>
                  </div>
                  <div className="result-row tax-row">
                    <span className="label">Monthly Tax</span>
                    <span className="value">{fmt(result.monthlyTax)}</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Monthly Income After Tax</span>
                    <span className="value">{fmt(result.monthly - result.monthlyTax)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Effective Tax Rate</span>
                    <span className="value">{result.effectiveRate.toFixed(2)}%</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Marginal (Top) Rate</span>
                    <span className="value">{(result.slab.rate * 100).toFixed(0)}%</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Same income in {yearShort(result.compareYear)}</span>
                    <span className="value">{fmt(result.compareTotal)}/yr</span>
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
            <h4>📌 Key points for 2026-27</h4>
            <ul>
              <li>Tax Year 2027 covers income from 1 July 2026 to 30 June 2027</li>
              <li>First Rs 600,000 a year is tax-free</li>
              <li>Salaried top rate of 35% now starts above Rs 7 million</li>
              <li>Surcharge on income above Rs 10 million abolished</li>
              <li>Business slabs are unchanged from 2025-26</li>
            </ul>
          </div>

          <RelatedLinks
            title="Related calculators & guides"
            links={[
              { to: "/salary", label: "💼 Take-home salary calculator" },
              { to: "/blog/salary-tax-guide", label: "📊 Monthly salary tax table" },
              { to: "/blog/income-tax-slabs-2026", label: "📑 Tax slabs 2026-27 explained" },
              { to: "/freelancer-tax", label: "💻 Freelancer tax calculator" },
              { to: "/withholding-tax", label: "📋 Withholding tax calculator" },
              { to: "/blog/tax-return-deadline", label: "📅 Tax return last date" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="How income tax is calculated in Pakistan">
        <p>
          Pakistan taxes individuals progressively. Your yearly taxable income is split into bands,
          and each band is taxed at its own rate — so moving into a higher slab only raises the tax on
          the rupees inside that slab, never on your whole income. FBR publishes separate tables for
          salaried individuals and for business and other non-salaried individuals.
        </p>
        <p className="formula">
          Tax = fixed amount for your slab + slab rate × (income − slab starting point)
        </p>

        <h3>Example 1: Rs 150,000 a month salary</h3>
        <p>
          Yearly salary is Rs 1,800,000, which falls in the Rs 1,200,001–2,200,000 slab:
          Rs 6,000 + 11% × (1,800,000 − 1,200,000) = <strong>{fmt(ex1.total)} a year</strong>,
          or <strong>{fmt(ex1.total / 12)} a month</strong>. That is an effective rate of {ex1.effectiveRate.toFixed(1)}%,
          even though the top slab rate is 11%.
        </p>

        <h3>Example 2: Rs 400,000 a month salary</h3>
        <p>
          Yearly salary is Rs 4,800,000, in the Rs 4,100,001–5,600,000 slab:
          Rs 541,000 + 29% × (4,800,000 − 4,100,000) = <strong>{fmt(ex2.total)} a year</strong>
          ({fmt(ex2.total / 12)} a month). Under the 2025-26 slabs the same salary paid {fmt(ex2old.total)},
          so the 2026 budget saves this employee about {fmt(ex2old.total - ex2.total)} a year.
        </p>

        <h3>Salaried vs business income</h3>
        <p>
          If more than 75% of your taxable income is salary, the salaried slabs apply and your employer
          deducts the tax monthly under Section 149. Shopkeepers, professionals, landlords with no salary,
          and freelancers serving local clients use the non-salaried table, which starts at 15% and goes
          up to 45%. Foreign IT export income is usually taxed separately at 0.25% or 1% — use the{" "}
          <Link to="/freelancer-tax">freelancer tax calculator</Link> for that.
        </p>

        <h3>What this calculator does not include</h3>
        <ul>
          <li>Income under the final tax regime — bank profit, dividends and prize bonds are taxed at source (see the <Link to="/withholding-tax">withholding tax calculator</Link>).</li>
          <li>Tax credits for charitable donations, approved pension fund contributions and similar items, which reduce the final figure on your return.</li>
          <li>Withholding tax already paid (e.g. on mobile bills or vehicle tokens), which is adjusted against your liability when you file.</li>
        </ul>

        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          appliesTo="Tax Year 2027 (1 July 2026 – 30 June 2027) and Tax Year 2026"
          sources={FBR_SOURCES}
        />
      </ContentSection>

      <FaqSection faqs={faqs} title="Income tax questions" />
    </div>
  );
}
