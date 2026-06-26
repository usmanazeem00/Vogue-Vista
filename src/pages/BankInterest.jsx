import React, { useState } from "react";
import AdSlot from "../components/AdSlot";
import { fmt } from "../utils/taxUtils";

const BANK_RATES = [
  { name: "HBL — Savings Account", rate: 9.0 },
  { name: "MCB — Savings Account", rate: 9.0 },
  { name: "UBL — Savings Account", rate: 9.0 },
  { name: "Allied Bank — Savings", rate: 9.0 },
  { name: "Bank Alfalah — Savings", rate: 8.5 },
  { name: "Meezan Bank — Savings (Islamic)", rate: 6.5 },

  { name: "HBL — 1-Year Term Deposit", rate: 10.5 },
  { name: "MCB — 1-Year Term Deposit", rate: 10.25 },
  { name: "UBL — 1-Year Term Deposit", rate: 10.5 },

  { name: "National Savings — Regular Income Certificate", rate: 12.24 },
  { name: "National Savings — Special Savings Account", rate: 12.40 },

  { name: "Custom Rate", rate: null },
];
export default function BankInterest({ navigate }) {
  const [form, setForm] = useState({
    bankPreset: "0",
    principal: "",
    rate: "",
    period: "12",
    periodUnit: "months",
    compounding: "none",
    filerStatus: "filer",
  });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const onBankChange = (idx) => {
    const b = BANK_RATES[parseInt(idx)];
    set("bankPreset", idx);
    if (b.rate !== null) set("rate", b.rate.toString());
  };

  const calculate = () => {
    const P = parseFloat(form.principal.replace(/,/g, "")) || 0;
    const r = parseFloat(form.rate) || 0;
    const months = form.periodUnit === "years"
      ? parseFloat(form.period) * 12
      : parseFloat(form.period);
    const rMonthly = r / 100 / 12;

    let grossProfit;
    if (form.compounding === "monthly") {
      grossProfit = P * Math.pow(1 + rMonthly, months) - P;
    } else {
      grossProfit = P * (r / 100) * (months / 12);
    }

    const whtRate = form.filerStatus === "filer" ? 0.15 : 0.35;
    const wht = grossProfit * whtRate;
    const netProfit = grossProfit - wht;
    const totalAmount = P + netProfit;
    const effectiveRate = P > 0 ? (netProfit / P / (months / 12)) * 100 : 0;

    setResult({ P, grossProfit, wht, netProfit, totalAmount, months, whtRate, effectiveRate, r });
  };

  return (
    <div>
      <section className="page-hero">
      <div className="page-hero-inner">
        <div className="hero-badge">All Major Banks · WHT Deduction · 2026</div>
        <h1>Bank Profit Calculator Pakistan 2026</h1>
        <p>Calculate profit on savings accounts and term deposits for Pakistani banks, including withholding tax deductions for filers and non-filers.</p>
      </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Bank Profit Calculator</h2>

            <div className="form-group">
              <label>Select Bank / Account Type</label>
              <select value={form.bankPreset} onChange={e => onBankChange(e.target.value)}>
                {BANK_RATES.map((b, i) => (
                  <option key={i} value={i}>{b.name}{b.rate ? ` — ${b.rate}%` : ""}</option>
                ))}
              </select>
              <p className="hint">Rates are approximate. Check with your bank for exact current rates.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Principal Amount <span>(Rs)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input type="number" placeholder="e.g. 1,000,000" value={form.principal} onChange={e => set("principal", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label>Annual Rate <span>(%)</span></label>
                <div className="input-prefix">
                  <span>%</span>
                  <input type="number" placeholder="e.g. 14.5" step="0.25" value={form.rate} onChange={e => set("rate", e.target.value)} style={{ paddingLeft: 32 }} />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Investment Period</label>
                <input type="number" placeholder="e.g. 12" value={form.period} onChange={e => set("period", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Period Unit</label>
                <select value={form.periodUnit} onChange={e => set("periodUnit", e.target.value)}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Compounding</label>
                <select value={form.compounding} onChange={e => set("compounding", e.target.value)}>
                  <option value="none">Simple (No Compounding)</option>
                  <option value="monthly">Monthly Compounding</option>
                </select>
              </div>
              <div className="form-group">
                <label>Tax Filer Status</label>
                <select value={form.filerStatus} onChange={e => set("filerStatus", e.target.value)}>
                  <option value="filer">Filer (WHT 15%)</option>
                  <option value="nonfiler">Non-Filer (WHT 35%)</option>
                </select>
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Bank Profit →</button>
            <button className="btn-reset" onClick={() => { setForm({ bankPreset: "0", principal: "", rate: "", period: "12", periodUnit: "months", compounding: "none", filerStatus: "filer" }); setResult(null); }}>Reset</button>
          </div>

          {/* Bank rates comparison */}
          <div className="calc-card" style={{ marginTop: 24 }}>
            <h2>Indicative Bank Profit Rates 2026</h2>
            <p className="hint" style={{ marginBottom: 12 }}>*Rates are approximate and change with SBP policy rate. Contact your bank for current rates.</p>
            <table className="slab-table">
              <thead><tr><th>Bank / Account</th><th>Est. Rate</th><th>Type</th></tr></thead>
              <tbody>
                {BANK_RATES.filter(b => b.rate).map((b, i) => (
                  <tr key={i}><td>{b.name}</td><td>{b.rate}% p.a.</td><td>{b.name.includes("Meezan") ? "Sharia" : "Conventional"}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay">
            {result ? (
              <>
                <div className="result-header" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
                  <h3>Profit Summary</h3>
                  <div className="result-main-amount">{fmt(result.netProfit)}</div>
                  <div className="result-main-label">Net Profit (after {(result.whtRate * 100).toFixed(0)}% WHT)</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Principal</span><span className="value">{fmt(result.P)}</span></div>
                  <div className="result-row"><span className="label">Rate</span><span className="value">{result.r}% p.a.</span></div>
                  <div className="result-row"><span className="label">Period</span><span className="value">{result.months} months</span></div>
                  <div className="result-row highlight"><span className="label">Gross Profit</span><span className="value">{fmt(result.grossProfit)}</span></div>
                  <div className="result-row tax-row"><span className="label">WHT Deducted</span><span className="value">- {fmt(result.wht)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Profit</span><span className="value">{fmt(result.netProfit)}</span></div>
                  <div className="result-row"><span className="label">Total Amount</span><span className="value">{fmt(result.totalAmount)}</span></div>
                  <div className="result-row"><span className="label">Effective Rate</span><span className="value">{result.effectiveRate.toFixed(2)}%</span></div>
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">🏦</div><p>Enter your deposit details to see your profit and tax deduction.</p></div>
            )}
          </div>

          <AdSlot size="300x250" />

          <div className="info-card">
            <h4>📌 Bank WHT Rates 2026</h4>
            <ul>
              <li>Filer: <strong>15%</strong> WHT on bank profit</li>
              <li>Non-Filer: <strong>35%</strong> WHT on bank profit</li>
              <li>Filing your return saves significant tax on savings</li>
              <li>Sharia-compliant accounts avoid interest (Riba)</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/withholding-tax")}>📋 Withholding Tax</button></li>
              <li><button onClick={() => navigate("/income-tax")}>🧾 Income Tax</button></li>
              <li><button onClick={() => navigate("/zakat")}>☪️ Zakat on Savings</button></li>
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