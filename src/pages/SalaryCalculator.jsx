import React, { useState, useRef } from "react";
import {
  fmt, calcTaxBreakdown, EOBI_EMPLOYEE, EOBI_EMPLOYER, EOBI_WAGE_BASE, RATES_REVIEWED_ISO,
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const salaryFaqs = [
  {
    q: "How much tax is deducted from a Rs 100,000 salary in Pakistan?",
    a: "On Rs 100,000 a month (Rs 1.2 million a year) the 2026-27 tax is Rs 6,000 a year, or Rs 500 a month, assuming the whole amount is taxable. Your take-home is lower again if EOBI or provident fund is deducted.",
  },
  {
    q: "How is EOBI deducted from salary?",
    a: `EOBI is charged on the minimum wage, not on your actual salary. The employee pays 1% and the employer 5%, so with a Rs ${EOBI_WAGE_BASE.toLocaleString("en-PK")} minimum wage the employee share is Rs ${EOBI_EMPLOYEE.toLocaleString("en-PK")} a month whether you earn Rs 50,000 or Rs 500,000. It funds an old-age pension from EOBI.`,
  },
  {
    q: "Are PESSI or SESSI deducted from my salary?",
    a: "Normally no. Provincial social security (PESSI in Punjab, SESSI in Sindh and similar schemes elsewhere) is paid by the employer for covered workers. If your payslip still shows a deduction, enter it under 'Other monthly deductions'.",
  },
  {
    q: "Is medical allowance taxable?",
    a: "Medical allowance is exempt up to 10% of basic salary where the employer doesn't also provide free medical treatment or reimbursement. Any amount above 10% of basic is taxable. That is why the calculator asks for your basic salary.",
  },
  {
    q: "Is provident fund deducted before or after tax?",
    a: "Your own provident fund contribution comes out of your taxable salary — it does not reduce income tax. It is still your money, saved in the fund and paid back with profit when you leave or retire.",
  },
];

const EMPTY = {
  grossSalary: "",
  basicSalary: "",
  medicalAllowance: "",
  eobi: true,
  providentFund: false,
  pfPercent: "8.33",
  otherDeductions: "",
};

const num = (v) => parseFloat(String(v).replace(/,/g, "")) || 0;

export default function SalaryCalculator() {
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const gross = num(form.grossSalary);
    const basic = num(form.basicSalary) || gross;
    const medical = num(form.medicalAllowance);
    const other = num(form.otherDeductions);

    const medicalExempt = Math.min(medical, basic * 0.1);
    const taxableMonthly = Math.max(0, gross - medicalExempt);
    const taxableAnnual = taxableMonthly * 12;
    const tax = calcTaxBreakdown(taxableAnnual, true);
    const monthlyTax = tax.total / 12;

    const eobiEmployee = form.eobi ? EOBI_EMPLOYEE : 0;
    const pfAmount = form.providentFund ? basic * (parseFloat(form.pfPercent) / 100) : 0;

    const totalDeductions = monthlyTax + eobiEmployee + pfAmount + other;
    const netSalary = gross - totalDeductions;

    setResult({
      gross, basic, medicalExempt, taxableMonthly, taxableAnnual,
      monthlyTax, annualTax: tax.total, topRate: tax.slab.rate,
      eobiEmployee, pfAmount, other, totalDeductions, netSalary,
    });
    setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y = resultRef.current.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Tax Year 2027 · Salaried Slabs · EOBI · Provident Fund</div>
          <h1>Salary Tax Calculator Pakistan 2026-27</h1>
          <p>Work out the income tax your employer should deduct each month and your take-home pay after EOBI and provident fund.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Salary & Deductions</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sal-gross">Gross Monthly Salary <span>(Rs)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input id="sal-gross" type="number" inputMode="numeric" placeholder="e.g. 150000" value={form.grossSalary} onChange={e => set("grossSalary", e.target.value)} />
                </div>
                <p className="hint">Total monthly pay including allowances</p>
              </div>
              <div className="form-group">
                <label htmlFor="sal-basic">Basic Salary <span>(optional)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input id="sal-basic" type="number" inputMode="numeric" placeholder="e.g. 100000" value={form.basicSalary} onChange={e => set("basicSalary", e.target.value)} />
                </div>
                <p className="hint">From your payslip. If blank, gross is used.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="sal-medical">Medical Allowance <span>(monthly, included in gross)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="sal-medical" type="number" inputMode="numeric" placeholder="e.g. 10000" value={form.medicalAllowance} onChange={e => set("medicalAllowance", e.target.value)} />
              </div>
              <p className="hint">Tax-free up to 10% of basic salary</p>
            </div>

            <div className="form-group">
              <label>Deductions from your pay</label>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 8 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 400 }}>
                  <input type="checkbox" checked={form.eobi} onChange={e => set("eobi", e.target.checked)} style={{ accentColor: "var(--g-600)", width: 18, height: 18 }} />
                  EOBI — employee share Rs {EOBI_EMPLOYEE.toLocaleString("en-PK")}/month (1% of minimum wage)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontWeight: 400 }}>
                  <input type="checkbox" checked={form.providentFund} onChange={e => set("providentFund", e.target.checked)} style={{ accentColor: "var(--g-600)", width: 18, height: 18 }} />
                  Provident Fund (your contribution)
                </label>
              </div>
            </div>

            {form.providentFund && (
              <div className="form-group">
                <label htmlFor="sal-pf">Provident Fund <span>(% of basic salary)</span></label>
                <select id="sal-pf" value={form.pfPercent} onChange={e => set("pfPercent", e.target.value)}>
                  <option value="5">5%</option>
                  <option value="8.33">8.33% (one month's basic per year)</option>
                  <option value="10">10%</option>
                  <option value="12">12%</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="sal-other">Other Monthly Deductions <span>(optional — loan, social security, etc.)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="sal-other" type="number" inputMode="numeric" placeholder="0" value={form.otherDeductions} onChange={e => set("otherDeductions", e.target.value)} />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Take-Home Salary →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY); setResult(null); }}>Reset</button>
          </div>

          {result && (
            <div className="calc-card fade-in" style={{ marginTop: 24 }}>
              <h2>Monthly and Annual Breakdown</h2>
              <div style={{ overflowX: "auto" }}>
                <table className="slab-table">
                  <thead><tr><th>Component</th><th>Monthly</th><th>Annual</th></tr></thead>
                  <tbody>
                    <tr><td>Gross Salary</td><td>{fmt(result.gross)}</td><td>{fmt(result.gross * 12)}</td></tr>
                    {result.medicalExempt > 0 && <tr><td>Tax-free medical allowance</td><td>- {fmt(result.medicalExempt)}</td><td>- {fmt(result.medicalExempt * 12)}</td></tr>}
                    <tr><td>Taxable Salary</td><td>{fmt(result.taxableMonthly)}</td><td>{fmt(result.taxableAnnual)}</td></tr>
                    <tr><td style={{ color: "var(--danger)" }}>Income Tax</td><td style={{ color: "var(--danger)" }}>- {fmt(result.monthlyTax)}</td><td style={{ color: "var(--danger)" }}>- {fmt(result.annualTax)}</td></tr>
                    {result.eobiEmployee > 0 && <tr><td>EOBI (employee)</td><td>- {fmt(result.eobiEmployee)}</td><td>- {fmt(result.eobiEmployee * 12)}</td></tr>}
                    {result.pfAmount > 0 && <tr><td>Provident Fund</td><td>- {fmt(result.pfAmount)}</td><td>- {fmt(result.pfAmount * 12)}</td></tr>}
                    {result.other > 0 && <tr><td>Other deductions</td><td>- {fmt(result.other)}</td><td>- {fmt(result.other * 12)}</td></tr>}
                    <tr className="active-slab"><td><strong>Net Take-Home</strong></td><td><strong>{fmt(result.netSalary)}</strong></td><td><strong>{fmt(result.netSalary * 12)}</strong></td></tr>
                  </tbody>
                </table>
              </div>
              {result.eobiEmployee > 0 && <p className="hint" style={{ marginTop: 10 }}>Your employer also pays EOBI of {fmt(EOBI_EMPLOYER)}/month on your behalf (not deducted from you).</p>}
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
                  {result.other > 0 && <div className="result-row"><span className="label">Other</span><span className="value">- {fmt(result.other)}</span></div>}
                  <div className="result-row tax-row"><span className="label">Total Deductions</span><span className="value">- {fmt(result.totalDeductions)}</span></div>
                  <div className="result-row highlight"><span className="label">Take-Home Pay</span><span className="value">{fmt(result.netSalary)}</span></div>
                  <div className="result-row"><span className="label">Tax as % of Gross</span><span className="value">{result.gross > 0 ? ((result.monthlyTax / result.gross) * 100).toFixed(1) : 0}%</span></div>
                  <div className="result-row"><span className="label">Your Top Slab Rate</span><span className="value">{(result.topRate * 100).toFixed(0)}%</span></div>
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">💼</div><p>Enter your salary details to calculate your take-home pay.</p></div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Deduction notes</h4>
            <ul>
              <li><strong>Income tax:</strong> 2026-27 salaried slabs; first Rs 50,000/month tax-free</li>
              <li><strong>EOBI:</strong> 1% of minimum wage from you, 5% from employer</li>
              <li><strong>Medical:</strong> tax-free up to 10% of basic</li>
              <li><strong>PF:</strong> set by your employer's fund rules</li>
            </ul>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/blog/salary-tax-guide", label: "📊 Tax on every salary: monthly table" },
              { to: "/income-tax", label: "🧾 Income tax calculator (salaried & business)" },
              { to: "/blog/salary-deduction-breakdown", label: "📄 Payslip deductions explained" },
              { to: "/blog/income-tax-slabs-2026", label: "📑 Tax slabs 2026-27" },
              { to: "/blog/become-filer", label: "✅ How to become a filer" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="How take-home salary is calculated in Pakistan">
        <p>
          Your take-home pay is your gross salary minus income tax and any deductions your employer
          makes for EOBI, provident fund or loans. The calculator follows the same order a payroll
          department does:
        </p>
        <ol>
          <li>Start with gross monthly salary (basic plus allowances).</li>
          <li>Remove the tax-free part of medical allowance (up to 10% of basic) to get taxable salary.</li>
          <li>Multiply by 12 and apply the <Link to="/blog/income-tax-slabs-2026">2026-27 salaried tax slabs</Link> to get annual tax, then divide by 12.</li>
          <li>Subtract monthly tax, your EOBI share and your provident fund contribution.</li>
        </ol>

        <h3>Why EOBI is the same on every salary</h3>
        <p>
          EOBI contributions are worked out on the minimum wage rather than your actual pay, so the
          employee share is a flat amount (currently Rs {EOBI_EMPLOYEE.toLocaleString("en-PK")} a month on a
          Rs {EOBI_WAGE_BASE.toLocaleString("en-PK")} minimum wage). It changes when the government revises the
          minimum wage, so check the figure on your payslip if it differs.
        </p>

        <h3>Provident fund and social security</h3>
        <p>
          Provident fund is set by your employer's fund rules — commonly 8.33% or 10% of basic salary from
          you, matched by the company. Provincial social security (PESSI, SESSI and similar) is an employer
          contribution for covered workers and is not normally deducted from your pay.
        </p>

        <p>
          Want to see the tax for many salaries at once? The{" "}
          <Link to="/blog/salary-tax-guide">monthly salary tax table</Link> lists the 2026-27 tax for
          salaries from Rs 50,000 to Rs 1,000,000 a month.
        </p>

        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          appliesTo="Tax Year 2027 (July 2026 – June 2027)"
          sources={[
            { label: "Finance Act 2026 — salaried income tax rates" },
            { label: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk" },
            { label: "Employees' Old-Age Benefits Institution (EOBI)", url: "https://www.eobi.gov.pk" },
          ]}
        />
      </ContentSection>

      <FaqSection faqs={salaryFaqs} title="Salary tax questions" />
    </div>
  );
}
