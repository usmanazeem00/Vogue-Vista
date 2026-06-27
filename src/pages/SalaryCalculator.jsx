import React, { useState,useRef} from "react";
// import AdSlot from "../components/AdSlot";
import { fmt, calcIncomeTax } from "../utils/taxUtils";

export default function SalaryCalculator({ navigate }) {
  const [form, setForm] = useState({
    grossSalary: "",
    medicalAllowance: "",
    conveyance: "",
    eobi: true,
    providentFund: false,
    pfPercent: "8.33",
    sessi: false,
    province: "punjab",
  });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const gross = parseFloat(form.grossSalary.replace(/,/g, "")) || 0;
    const medical = parseFloat(form.medicalAllowance.replace(/,/g, "")) || 0;
    const conveyance = parseFloat(form.conveyance.replace(/,/g, "")) || 0;

    // EOBI: 1% of minimum wage or actual (employee contribution)
    const eobiEmployee = form.eobi ? Math.min(gross * 0.01, 370) : 0;
    const eobiEmployer = form.eobi ? Math.min(gross * 0.05, 1850) : 0;

    // PF: variable %
    const pfAmount = form.providentFund ? gross * (parseFloat(form.pfPercent) / 100) : 0;

    // SESSI (Sindh) / PESSI (Punjab) — approximately 1% of gross
    const sessiEmployee = form.sessi ? gross * 0.01 : 0;

    // Income tax — exempt: medical (up to 10% of basic), conveyance (up to 10k/month)
    const taxableMonthly = gross - Math.min(medical, gross * 0.1) - Math.min(conveyance, 10000);
    const taxableAnnual = taxableMonthly * 12;
    const annualTax = calcIncomeTax(taxableAnnual, true);
    const monthlyTax = annualTax / 12;

    const totalDeductions = monthlyTax + eobiEmployee + pfAmount + sessiEmployee;
    const netSalary = gross - totalDeductions;

    setResult({
      gross, medical, conveyance, taxableMonthly, taxableAnnual,
      monthlyTax, annualTax,
      eobiEmployee, eobiEmployer, pfAmount, sessiEmployee,
      totalDeductions, netSalary
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

  return (
    <div>
      <section className="page-hero">
        <div className="hero-badge">Net Take-Home · EOBI · PF · 2026-27</div>
        <h1>Salary Calculator Pakistan 2026-27</h1>
        <p>Calculate your exact monthly take-home salary after income tax, EOBI, SESSI/PESSI and Provident Fund deductions.</p>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Salary & Deductions</h2>

            <div className="form-group">
              <label>Gross Monthly Salary <span>(Rs)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input type="number" placeholder="e.g. 150,000" value={form.grossSalary} onChange={e => set("grossSalary", e.target.value)} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Medical Allowance <span>(monthly)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input type="number" placeholder="e.g. 15,000" value={form.medicalAllowance} onChange={e => set("medicalAllowance", e.target.value)} />
                </div>
                <p className="hint">Exempt up to 10% of basic salary</p>
              </div>
              <div className="form-group">
                <label>Conveyance Allowance <span>(monthly)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input type="number" placeholder="e.g. 10,000" value={form.conveyance} onChange={e => set("conveyance", e.target.value)} />
                </div>
                <p className="hint">Exempt up to Rs 10,000/month</p>
              </div>
            </div>

            <div className="form-group">
              <label>Province / Social Security</label>
              <select value={form.province} onChange={e => set("province", e.target.value)}>
                <option value="punjab">Punjab (PESSI)</option>
                <option value="sindh">Sindh (SESSI)</option>
                <option value="kpk">KPK (KPESSI)</option>
                <option value="balochistan">Balochistan</option>
              </select>
            </div>

            <div className="form-group">
              <label>Optional Deductions</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 400 }}>
                  <input type="checkbox" checked={form.eobi} onChange={e => set("eobi", e.target.checked)} style={{ accentColor: "var(--green-600)", width: 18, height: 18 }} />
                  EOBI (Employee Old-Age Benefits — 1% of salary, max Rs 370/month)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 400 }}>
                  <input type="checkbox" checked={form.sessi} onChange={e => set("sessi", e.target.checked)} style={{ accentColor: "var(--green-600)", width: 18, height: 18 }} />
                  Social Security (Employee contribution ~1%)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 400 }}>
                  <input type="checkbox" checked={form.providentFund} onChange={e => set("providentFund", e.target.checked)} style={{ accentColor: "var(--green-600)", width: 18, height: 18 }} />
                  Provident Fund (Employee contribution)
                </label>
              </div>
            </div>

            {form.providentFund && (
              <div className="form-group">
                <label>Provident Fund % <span>(of gross salary)</span></label>
                <select value={form.pfPercent} onChange={e => set("pfPercent", e.target.value)}>
                  <option value="5">5%</option>
                  <option value="8.33">8.33% (1 month / year)</option>
                  <option value="10">10%</option>
                  <option value="12">12%</option>
                </select>
              </div>
            )}

            <button className="btn-calc" onClick={calculate}>Calculate Take-Home Salary →</button>
            <button className="btn-reset" onClick={() => { setForm({ grossSalary: "", medicalAllowance: "", conveyance: "", eobi: true, providentFund: false, pfPercent: "8.33", sessi: false, province: "punjab" }); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className="calc-card fade-in" style={{ marginTop: 24 }}>
              <h2>Annual Salary Breakdown</h2>
              <table className="slab-table">
                <thead><tr><th>Component</th><th>Monthly</th><th>Annual</th></tr></thead>
                <tbody>
                  <tr><td>Gross Salary</td><td>{fmt(result.gross)}</td><td>{fmt(result.gross * 12)}</td></tr>
                  <tr><td>Taxable Income</td><td>{fmt(result.taxableMonthly)}</td><td>{fmt(result.taxableAnnual)}</td></tr>
                  <tr><td style={{ color: "var(--red-600)" }}>Income Tax</td><td style={{ color: "var(--red-600)" }}>- {fmt(result.monthlyTax)}</td><td style={{ color: "var(--red-600)" }}>- {fmt(result.annualTax)}</td></tr>
                  {result.eobiEmployee > 0 && <tr><td>EOBI (Employee)</td><td>- {fmt(result.eobiEmployee)}</td><td>- {fmt(result.eobiEmployee * 12)}</td></tr>}
                  {result.pfAmount > 0 && <tr><td>Provident Fund</td><td>- {fmt(result.pfAmount)}</td><td>- {fmt(result.pfAmount * 12)}</td></tr>}
                  {result.sessiEmployee > 0 && <tr><td>Social Security</td><td>- {fmt(result.sessiEmployee)}</td><td>- {fmt(result.sessiEmployee * 12)}</td></tr>}
                  <tr className="active-slab"><td><strong>Net Take-Home</strong></td><td><strong>{fmt(result.netSalary)}</strong></td><td><strong>{fmt(result.netSalary * 12)}</strong></td></tr>
                </tbody>
              </table>
              {result.eobiEmployee > 0 && <p className="hint" style={{ marginTop: 10 }}>Employer also contributes EOBI: {fmt(result.eobiEmployer)}/month (not shown in your deductions)</p>}
            </div>
          )}
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Net Monthly Salary</h3>
                  <div className="result-main-amount">{fmt(result.netSalary)}</div>
                  <div className="result-main-label">Take-Home Pay Per Month</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Gross Salary</span><span className="value">{fmt(result.gross)}</span></div>
                  <div className="result-row tax-row"><span className="label">Income Tax</span><span className="value">- {fmt(result.monthlyTax)}</span></div>
                  {result.eobiEmployee > 0 && <div className="result-row"><span className="label">EOBI</span><span className="value">- {fmt(result.eobiEmployee)}</span></div>}
                  {result.pfAmount > 0 && <div className="result-row"><span className="label">Provident Fund</span><span className="value">- {fmt(result.pfAmount)}</span></div>}
                  {result.sessiEmployee > 0 && <div className="result-row"><span className="label">Social Security</span><span className="value">- {fmt(result.sessiEmployee)}</span></div>}
                  <div className="result-row tax-row"><span className="label">Total Deductions</span><span className="value">- {fmt(result.totalDeductions)}</span></div>
                  <div className="result-row highlight"><span className="label">Take-Home Pay</span><span className="value">{fmt(result.netSalary)}</span></div>
                  <div className="result-row"><span className="label">Effective Tax Rate</span><span className="value">{result.gross > 0 ? ((result.monthlyTax / result.gross) * 100).toFixed(1) : 0}%</span></div>
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">💼</div><p>Enter your salary details to calculate your net take-home pay.</p></div>
            )}
          </div>

          {/* <AdSlot size="300x250" /> */}

          <div className="info-card">
            <h4>📌 Deduction Notes</h4>
            <ul>
              <li><strong>EOBI:</strong> Employee 1% + Employer 5% of minimum wage</li>
              <li><strong>Medical:</strong> Exempt up to 10% of basic salary</li>
              <li><strong>Conveyance:</strong> Exempt up to Rs 10,000/month</li>
              <li><strong>PF:</strong> Employee contribution varies by company policy</li>
            </ul>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/income-tax")}>🧾 Income Tax</button></li>
              <li><button onClick={() => navigate("/withholding-tax")}>📋 Withholding Tax</button></li>
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
