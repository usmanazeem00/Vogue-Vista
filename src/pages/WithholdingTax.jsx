import React, { useState } from "react";
import AdSlot from "../components/AdSlot";
import { fmt, WHT_CATEGORIES } from "../utils/taxUtils";

export default function WithholdingTax({ navigate }) {
  const [form, setForm] = useState({ category: "0", amount: "", filerStatus: "filer" });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const getCategories = (filerStatus) => {
    return WHT_CATEGORIES.filter(c => {
      if (filerStatus === "filer") return !c.id.includes("nonfiler");
      return !c.id.includes("filer") || c.id === "filer";
    });
  };

  const allCats = WHT_CATEGORIES;

  const calculate = () => {
    const cat = allCats[parseInt(form.category)];
    const amount = parseFloat(form.amount.replace(/,/g, "")) || 0;
    if (!cat.rate) {
      setResult({ error: true, msg: "This category requires a separate calculation. Use the Income Tax calculator for salary WHT." });
      return;
    }
    const wht = amount * cat.rate;
    const net = amount - wht;
    setResult({ cat, amount, wht, net, rate: cat.rate });
  };

  return (
    <div>
      <section className="page-hero">
        <div className="hero-badge">FY 2026-27 · 18 Categories · Filer vs Non-Filer</div>
        <h1>Withholding Tax Calculator Pakistan 2024</h1>
        <p>Calculate withholding tax (WHT) on contracts, rent, bank profit, dividends, imports, property and more. Separate rates for filers and non-filers.</p>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>WHT Calculator</h2>

            <div className="form-group">
              <label>Tax Filer Status</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="filer" value="filer" checked={form.filerStatus === "filer"} onChange={() => set("filerStatus", "filer")} />
                  ✅ Filer (registered with FBR)
                </label>
                <label className="radio-option">
                  <input type="radio" name="filer" value="nonfiler" checked={form.filerStatus === "nonfiler"} onChange={() => set("filerStatus", "nonfiler")} />
                  ❌ Non-Filer
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Transaction Category</label>
              <select value={form.category} onChange={e => set("category", e.target.value)}>
                {allCats.map((c, i) => (
                  <option key={i} value={i}>
                    {c.label} {c.rate ? `— ${(c.rate * 100).toFixed(1)}%` : "— See Income Tax"}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Transaction Amount <span>(Rs)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input type="number" placeholder="e.g. 500,000" value={form.amount} onChange={e => set("amount", e.target.value)} />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate WHT →</button>
            <button className="btn-reset" onClick={() => { setForm({ category: "0", amount: "", filerStatus: "filer" }); setResult(null); }}>Reset</button>
          </div>

          {/* WHT Rates Table */}
          <div className="calc-card" style={{ marginTop: 24 }}>
            <h2>WHT Rate Table 2024-25</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="slab-table">
                <thead><tr><th>Category</th><th>Filer</th><th>Non-Filer</th></tr></thead>
                <tbody>
                  {[
                    ["Contracts", "7.5%", "15%"],
                      ["Services", "8%", "16%"],
                      ["Dividends", "15%", "30%"],
                      ["Rent (Commercial)", "15%", "30%"],
                      ["Bank Profit / Interest", "20%", "40%"],
                      ["Imports", "5%", "8%"],
                      ["Property Sale", "3%", "6%"],
                      ["Exports", "1%", "1%"],
                      ["Prize / Lottery", "15%", "30%"],
                      ["Cash Withdrawal (>50K)", "0%", "0.8%"]
                  ].map((r, i) => <tr key={i}><td>{r[0]}</td><td>{r[1]}</td><td style={{ color: "var(--red-600)" }}>{r[2]}</td></tr>)}
                </tbody>
              </table>
            </div>
            <p className="hint" style={{ marginTop: 10 }}>Non-filer rates are significantly higher — file your return at iris.fbr.gov.pk to get filer rates.</p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay">
            {result ? (
              result.error ? (
                <div className="result-placeholder">
                  <div className="icon">ℹ️</div>
                  <p>{result.msg}</p>
                </div>
              ) : (
                <>
                  <div className="result-header">
                    <h3>WHT Summary</h3>
                    <div className="result-main-amount">{fmt(result.wht)}</div>
                    <div className="result-main-label">Withholding Tax ({(result.rate * 100).toFixed(1)}%)</div>
                  </div>
                  <div className="result-body">
                    <div className="result-row"><span className="label">Category</span><span className="value" style={{ fontSize: "0.8rem", textAlign: "right", maxWidth: 160 }}>{result.cat.label}</span></div>
                    <div className="result-row"><span className="label">Gross Amount</span><span className="value">{fmt(result.amount)}</span></div>
                    <div className="result-row"><span className="label">WHT Rate</span><span className="value">{(result.rate * 100).toFixed(1)}%</span></div>
                    <div className="result-row tax-row"><span className="label">WHT Deducted</span><span className="value">- {fmt(result.wht)}</span></div>
                    <div className="result-row highlight"><span className="label">Net Amount</span><span className="value">{fmt(result.net)}</span></div>
                  </div>
                </>
              )
            ) : (
              <div className="result-placeholder"><div className="icon">📋</div><p>Select category, enter amount and click Calculate to see WHT.</p></div>
            )}
          </div>

          <AdSlot size="300x250" />

          <div className="info-card warning">
            <h4>⚠️ Become a Filer & Save!</h4>
            <p>Non-filers pay up to <strong>2× more</strong> WHT on bank profit (35% vs 15%), dividends (30% vs 15%), and rent (30% vs 15%). Register free at <strong>iris.fbr.gov.pk</strong></p>
          </div>

          <div className="info-card">
            <h4>📌 What is Withholding Tax?</h4>
            <p>WHT is deducted at the source of income before you receive it. For most transactions, it is an <strong>advance tax</strong> — adjustable against your total tax liability when you file your annual return. For some categories (like dividends), it is a <strong>final tax</strong>.</p>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/income-tax")}>🧾 Income Tax</button></li>
              <li><button onClick={() => navigate("/bank-interest")}>🏦 Bank Profit</button></li>
              <li><button onClick={() => navigate("/salary")}>💼 Salary</button></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "24px 20px" }}>
        <AdSlot size="responsive" />
      </div>
    </div>
  );
}
