import React, { useState,useRef} from "react";
// import AdSlot from "../components/AdSlot";
import { Helmet } from "react-helmet-async";
import { fmt, calcIncomeTax } from "../utils/taxUtils";

const salaryFaqs = [
  { q: "How is EOBI deducted from salary in Pakistan?",
    a: "EOBI (Employees' Old-Age Benefits Institution) deducts 1% of wages from the employee, capped at Rs 370/month, while the employer contributes a further 5%, capped at Rs 1,850/month. It applies to most formal-sector employees and funds an old-age pension." },
  { q: "What is the difference between SESSI and PESSI?",
    a: "SESSI (Sindh Employees' Social Security Institution) and PESSI (Punjab Employees Social Security Institution) are the same type of social security scheme, just administered separately by province. Both deduct roughly 1% from the employee, funding medical and injury benefits." },
  { q: "Is Provident Fund contribution mandatory in Pakistan?",
    a: "Provident Fund isn't mandated by federal law for every employer, but many companies offer it as a retirement benefit, typically matching an employee contribution of 8.33% to 12% of basic salary. The exact percentage depends on your company's policy, not a fixed government rate." },
  { q: "Are medical and conveyance allowances taxed in Pakistan?",
    a: "Medical allowance is exempt from income tax up to 10% of basic salary, and conveyance allowance is exempt up to Rs 10,000 per month. Any amount above these limits is added back to taxable income." },
];

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
  const [openFaq, setOpenFaq] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Helper to keep SPA navigation working while still rendering a real <a href>
  // so crawlers can discover and follow the link.
  const go = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pktaxcalc.com/salary",
        url: "https://pktaxcalc.com/salary",
        name: "Salary Calculator Pakistan 2026-27 | Net Take-Home Pay",
        description: "Calculate your net take-home salary in Pakistan after income tax, EOBI, SESSI/PESSI and Provident Fund deductions for FY 2026-27.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://pktaxcalc.com" },
            { "@type": "ListItem", position: 2, name: "Salary Calculator", item: "https://pktaxcalc.com/salary" }
          ]
        }
      },
      {
        "@type": "WebApplication",
        name: "Pakistan Salary Calculator 2026-27",
        url: "https://pktaxcalc.com/salary",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        description: "Free Pakistan salary calculator covering income tax, EOBI, SESSI/PESSI and Provident Fund deductions for FY 2026-27.",
        offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" }
      },
      {
        "@type": "FAQPage",
        mainEntity: salaryFaqs.map(f => ({
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
        <title>Salary Calculator Pakistan 2026-27 | Net Take-Home Pay</title>
        <meta
          name="description"
          content="Calculate your net take-home salary in Pakistan after income tax, EOBI, SESSI/PESSI and Provident Fund deductions for FY 2026-27."
        />
        <link rel="canonical" href="https://pktaxcalc.com/salary" />
        <meta property="og:title" content="Salary Calculator Pakistan 2026-27 | Net Take-Home Pay" />
        <meta
          property="og:description"
          content="Calculate your exact monthly take-home salary after tax, EOBI, SESSI/PESSI and Provident Fund deductions."
        />
        <meta property="og:url" content="https://pktaxcalc.com/salary" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <a href="/" onClick={go("/")}>Home</a>
        <span aria-hidden="true"> / </span>
        <span>Salary Calculator</span>
      </nav>

      <style>{`
        .breadcrumb-nav {
          background: var(--brand-dark, #0e3b2c);
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
      `}</style>

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
              <li><a href="/income-tax" onClick={go("/income-tax")}>🧾 Income Tax</a></li>
              <li><a href="/withholding-tax" onClick={go("/withholding-tax")}>📋 Withholding Tax</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* <div className="container" style={{ padding: "24px 20px" }}>
        <AdSlot size="responsive" />
      </div> */}

      {/* ── Extra unique content: depth for ranking, not just a bare calculator ── */}
      <section className="calc-grid-section">
        <div className="section-eyebrow">How It Works</div>
        <h2 className="section-title">How Take-Home Salary Is Calculated in Pakistan</h2>
        <p className="section-desc">
          Your net salary is your gross pay minus income tax and any
          applicable social security or retirement deductions. The calculator
          above starts from your gross monthly salary, subtracts the portion
          of your medical and conveyance allowances that's tax-exempt to find
          your taxable income, applies the FBR income tax slabs to that
          amount, and then deducts EOBI, Provident Fund, and SESSI/PESSI
          contributions where selected — whatever's left is your take-home
          pay.
        </p>

        <h3 style={{ marginTop: 24 }}>Understanding EOBI, PF, and SESSI/PESSI</h3>
        <p className="section-desc">
          EOBI (Employees' Old-Age Benefits Institution) deducts 1% of wages
          from you, capped at Rs 370 a month, with your employer adding a
          further 5%, capped at Rs 1,850 — this funds a government pension
          you can draw on retirement. Provident Fund is a separate retirement
          savings scheme set by your employer's own policy, usually 5–12% of
          basic salary, matched by the company. SESSI in Sindh and PESSI in
          Punjab are provincial social security schemes, each deducting
          roughly 1% of gross salary in exchange for medical and injury
          benefit coverage.
        </p>

        <h3 style={{ marginTop: 24 }}>Why medical and conveyance allowances matter</h3>
        <p className="section-desc">
          Splitting your gross pay into basic salary plus medical and
          conveyance allowances can lower your tax bill, because these
          allowances are partly tax-exempt: medical allowance up to 10% of
          basic salary, and conveyance up to Rs 10,000 a month. Any amount you
          receive above these limits gets added back into taxable income, so
          it's worth checking your payslip breakdown rather than assuming the
          whole allowance is tax-free.
        </p>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: July 2026, against Finance Bill 2026, FBR's published
          slab tables, and current EOBI/PESSI/SESSI contribution rates. This
          tool gives an estimate for planning purposes and isn't a substitute
          for professional payroll or tax advice.
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="faq-section">
        <div className="faq-inner">
          <div className="section-eyebrow">FAQ</div>
          <h2 className="section-title" style={{ marginBottom: 32 }}>Common questions</h2>
          {salaryFaqs.map((f, i) => (
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
    </div>
  );
}