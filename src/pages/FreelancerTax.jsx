import React, { useState, useRef } from "react";
import {
  fmt, calcTaxBreakdown, TAX_YEARS, DEFAULT_TAX_YEAR, RATES_REVIEWED_ISO
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const PSEB_RATE = 0.0025;   // 0.25% — PSEB-registered, Section 154A, extended to 30 June 2029
const NON_PSEB_RATE = 0.01; // 1% — not PSEB-registered, Section 154A

const EMPTY = {
  period: "monthly",
  exportIncome: "",
  localIncome: "",
  psebRegistered: "yes",
  bankingChannel: "yes",
  taxYear: DEFAULT_TAX_YEAR,
};

const faqs = [
  {
    q: "What is the freelancer tax rate in Pakistan for 2026-27?",
    a: "IT and IT-enabled export income received through banking channels is taxed under Section 154A: 0.25% if you are registered with the Pakistan Software Export Board (PSEB), and 1% if you are not. The bank deducts it when your remittance arrives. The Finance Act 2026 extended the 0.25% rate to 30 June 2029.",
  },
  {
    q: "Is the 0.25% deduction my full tax?",
    a: "For PSEB-registered freelancers the 0.25% is a final tax on that export income — it is not added to the normal slabs. You still have to file an annual return to stay on the Active Taxpayers List and to declare the income and your wealth.",
  },
  {
    q: "What counts as export income for a freelancer?",
    a: "Payment for IT or IT-enabled services delivered to clients abroad — for example through Upwork, Fiverr or direct foreign clients — that reaches your Pakistani bank account through a normal banking channel (bank transfer, or Payoneer/Wise withdrawn to a local bank).",
  },
  {
    q: "What if I receive money outside the banking system?",
    a: "The concessional rates depend on proceeds coming in through banking channels. Money received informally, or kept abroad, doesn't qualify and would be taxed under the normal business slabs. The calculator applies the slabs when you choose 'No'.",
  },
  {
    q: "How is income from Pakistani clients taxed?",
    a: "Payments from local clients aren't exports, so they are taxed under the normal non-salaried slabs (0% up to Rs 600,000, then 15% to 45%). Local companies may also deduct withholding tax under Section 153 when they pay you, which you adjust in your return.",
  },
  {
    q: "How do I register with PSEB as a freelancer?",
    a: "Apply on PSEB's website as an individual freelancer. You'll need your CNIC, an NTN (free, from FBR IRIS), a Pakistani bank account and evidence of your freelance work. PSEB charges a registration fee and the registration must be renewed.",
  },
];

export default function FreelancerTax() {
  const [form, setForm] = useState(EMPTY);
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

    const qualifies = form.bankingChannel === "yes";
    const rate = form.psebRegistered === "yes" ? PSEB_RATE : NON_PSEB_RATE;

    let exportTax;
    let localTax;
    if (qualifies) {
      exportTax = exportAnnual * rate;
      localTax = calcTaxBreakdown(localAnnual, false, form.taxYear).total;
    } else {
      // Without the banking-channel condition, all income falls under the
      // normal non-salaried slabs together.
      const all = calcTaxBreakdown(exportAnnual + localAnnual, false, form.taxYear).total;
      const share = exportAnnual + localAnnual > 0 ? exportAnnual / (exportAnnual + localAnnual) : 0;
      exportTax = all * share;
      localTax = all - exportTax;
    }

    const totalIncome = exportAnnual + localAnnual;
    const totalTax = exportTax + localTax;
    const netAnnual = totalIncome - totalTax;
    setResult({
      exportAnnual, localAnnual, exportTax, localTax,
      totalIncome, totalTax, netAnnual, monthlyNet: netAnnual / 12,
      effectiveRate: totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0,
      qualifies, rate,
      psebSaving: qualifies && rate === NON_PSEB_RATE ? exportAnnual * (NON_PSEB_RATE - PSEB_RATE) : 0,
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
          <div className="hero-badge">Section 154A · Tax Year 2027 · 0.25% extended to 2029</div>
          <h1>Freelancer Tax Calculator Pakistan 2026-27</h1>
          <p>
            Work out the tax on Upwork, Fiverr, Payoneer or direct foreign-client income — 0.25% with PSEB
            registration, 1% without — plus tax on any local-client income.
          </p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Your Freelance Income</h2>

            <div className="form-group">
              <label htmlFor="fl-year">Tax Year</label>
              <select id="fl-year" value={form.taxYear} onChange={e => { set("taxYear", e.target.value); setResult(null); }}>
                {TAX_YEARS.map(y => (
                  <option key={y.id} value={y.id}>{y.label}</option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fl-period">Income Period</label>
                <select id="fl-period" value={form.period} onChange={e => set("period", e.target.value)}>
                  <option value="monthly">Monthly</option>
                  <option value="annual">Annual (Yearly)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="fl-export">Foreign-Client Income <span>(in Rs)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    id="fl-export"
                    type="number"
                    inputMode="numeric"
                    placeholder={form.period === "monthly" ? "e.g. 250000" : "e.g. 3000000"}
                    value={form.exportIncome}
                    onChange={e => set("exportIncome", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="fl-local">Local Client Income <span>(optional, paid in PKR)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input
                  id="fl-local"
                  type="number"
                  inputMode="numeric"
                  placeholder="e.g. 0"
                  value={form.localIncome}
                  onChange={e => set("localIncome", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Registered with PSEB?</label>
              <div className="radio-group">
                {[["yes", "✅ Yes — 0.25%"], ["no", "❌ No — 1%"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="psebRegistered" value={v} checked={form.psebRegistered === v} onChange={() => set("psebRegistered", v)} />
                    {l}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Foreign income received through a Pakistani bank?</label>
              <div className="radio-group">
                {[["yes", "✅ Yes"], ["no", "❌ No / informally"]].map(([v, l]) => (
                  <label key={v} className="radio-option">
                    <input type="radio" name="bankingChannel" value={v} checked={form.bankingChannel === v} onChange={() => set("bankingChannel", v)} />
                    {l}
                  </label>
                ))}
              </div>
              <p className="hint">Bank transfer, or Payoneer / Wise withdrawn to your local account.</p>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Freelancer Tax →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY); setResult(null); }}>Reset</button>
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
                </div>

                <div className="result-body">
                  <div className="result-row"><span className="label">Foreign Income (Annual)</span><span className="value">{fmt(result.exportAnnual)}</span></div>
                  <div className="result-row tax-row">
                    <span className="label">{result.qualifies ? `Tax at ${(result.rate * 100).toFixed(2)}%` : "Tax at normal slabs"}</span>
                    <span className="value">{fmt(result.exportTax)}</span>
                  </div>
                  {result.localAnnual > 0 && (
                    <>
                      <div className="result-row"><span className="label">Local Income (Annual)</span><span className="value">{fmt(result.localAnnual)}</span></div>
                      <div className="result-row tax-row"><span className="label">Tax on Local Income</span><span className="value">{fmt(result.localTax)}</span></div>
                    </>
                  )}
                  <div className="result-row highlight"><span className="label">Net Annual Income</span><span className="value">{fmt(result.netAnnual)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Monthly Income</span><span className="value">{fmt(result.monthlyNet)}</span></div>
                  <div className="result-row"><span className="label">Effective Tax Rate</span><span className="value">{result.effectiveRate.toFixed(2)}%</span></div>
                  {result.psebSaving > 0 && (
                    <div className="result-row"><span className="label">PSEB registration would save</span><span className="value">{fmt(result.psebSaving)}/yr</span></div>
                  )}
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">💻</div>
                <p>Enter your freelance income and click Calculate.</p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Key points</h4>
            <ul>
              <li>0.25% (PSEB) rate extended to 30 June 2029 by Finance Act 2026</li>
              <li>The bank deducts the tax when the remittance arrives</li>
              <li>You must still file a return to stay on the ATL</li>
              <li>Local-client income uses the normal business slabs</li>
            </ul>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/income-tax", label: "🧾 Income tax calculator" },
              { to: "/blog/income-tax-slabs-2026", label: "📑 Business tax slabs 2026-27" },
              { to: "/blog/become-filer", label: "✅ Get an NTN and become a filer" },
              { to: "/withholding-tax", label: "📋 Withholding tax rates" },
              { to: "/bank-interest", label: "🏦 Profit on your savings" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="How freelancer tax works in Pakistan">
        <p>
          Freelancers who sell IT or IT-enabled services to clients abroad don't use the normal income tax
          slabs on that income. Under Section 154A of the Income Tax Ordinance, the bank that receives your
          foreign remittance deducts a flat percentage of the gross amount: 0.25% if you hold a valid PSEB
          registration, or 1% if you don't.
        </p>
        <h3>Example: Rs 300,000 a month from Upwork</h3>
        <p>
          That's Rs 3.6 million a year. With PSEB registration the tax is 0.25% × 3,600,000 = <strong>Rs 9,000</strong>;
          without it, 1% = <strong>Rs 36,000</strong>. The same Rs 3.6 million earned from local clients would be
          taxed under the business slabs at about {fmt(calcTaxBreakdown(3600000, false).total)}.
        </p>
        <h3>Local clients are a separate calculation</h3>
        <p>
          Income from Pakistani clients paid in rupees is not an export, so it is taxed under the{" "}
          <Link to="/blog/income-tax-slabs-2026">non-salaried slabs</Link>. That's why the calculator keeps the
          two streams separate.
        </p>
        <h3>Steps to stay compliant</h3>
        <ol>
          <li>Get an NTN on FBR IRIS (free) and <Link to="/blog/become-filer">file your return</Link> each year.</li>
          <li>Register with PSEB to qualify for 0.25% instead of 1%.</li>
          <li>Bring your earnings into a Pakistani bank account through normal banking channels.</li>
          <li>Keep invoices and bank advices (PRCs) as evidence of export income.</li>
        </ol>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          appliesTo="Tax Year 2027 and Tax Year 2026"
          sources={[
            { label: "Income Tax Ordinance 2001, Section 154A (as amended by Finance Act 2026)" },
            { label: "Pakistan Software Export Board (PSEB)", url: "https://www.pseb.org.pk" },
            { label: "FBR IRIS", url: "https://iris.fbr.gov.pk" },
          ]}
        />
      </ContentSection>

      <FaqSection faqs={faqs} title="Freelancer tax questions" />
    </div>
  );
}
