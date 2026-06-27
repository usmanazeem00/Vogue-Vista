import React, { useState, useRef } from "react";
// import AdSlot from "../components/AdSlot";
import {
  fmt, fmtPlain, calcIncomeTax, getSlabs, getActiveSlab,
  TAX_YEARS, DEFAULT_TAX_YEAR
} from "../utils/taxUtils";

export default function IncomeTax({ navigate }) {
  const [form, setForm] = useState({
    incomeType: "salaried",
    period: "annual",
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

  setResult({
    annual,
    tax,
    effectiveRate,
    activeSlab,
    monthly,
    monthlyTax,
    netAnnual,
    isSalaried,
  });

setTimeout(() => {
  if (window.innerWidth <= 768 && resultRef.current) {
    const y =
      resultRef.current.getBoundingClientRect().top +
      window.pageYOffset -
      80;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  }
}, 100);
};

  const slabs = getSlabs(form.incomeType === "salaried", form.taxYear);
  const yearLabel = TAX_YEARS.find(y => y.id === form.taxYear)?.label || "";

  return (
    <div>
      <section className="page-hero">
      <div className="page-hero-inner">
        <div className="hero-badge">FBR Finance Bill 2026 · FY 2026-27</div>
        <h1>Income Tax Calculator Pakistan 2026-27</h1>
        <p>Calculate your exact income tax liability based on the latest FBR Finance Bill 2026 slabs for salaried individuals and business owners.</p>
      </div>
      </section>

      <div className="calc-layout">
        {/* Calculator */}
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
                  <option value="annual">Annual (Yearly)</option>
                  <option value="monthly">Monthly</option>
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

          {/* Tax Slabs Table */}
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

        {/* Sidebar */}
        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Tax Summary</h3>
                  <div className="result-main-amount">{fmt(result.tax)}</div>
                  <div className="result-main-label">Annual Income Tax</div>
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

          {/* <AdSlot size="300x250" /> */}

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
              <li><button onClick={() => navigate("/salary")}>💼 Salary & Deductions Calculator</button></li>
              <li><button onClick={() => navigate("/withholding-tax")}>📋 Withholding Tax Calculator</button></li>
              <li><button onClick={() => navigate("/zakat")}>☪️ Zakat Calculator</button></li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="container" style={{ padding: "24px 20px" }}>
        <AdSlot size="responsive" />
      </div> */}
    </div>
  );
}