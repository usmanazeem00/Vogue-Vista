import React, { useState, useRef } from "react";
import { fmt, RATES_REVIEWED_ISO } from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const WHT_FILER = 0.15;
const WHT_NON_FILER = 0.30;

const EMPTY = {
  principal: "",
  rate: "",
  period: "12",
  periodUnit: "months",
  compounding: "none",
  filerStatus: "filer",
};

const faqs = [
  {
    q: "How much tax is deducted on bank profit in Pakistan?",
    a: "Banks deduct 15% withholding tax from profit paid to individuals on the Active Taxpayers List, and 30% from non-filers (Section 151). For individuals this is a final tax on yearly profit up to Rs 5 million, so you don't pay anything more on it when you file.",
  },
  {
    q: "Is tax deducted on Islamic (Meezan, Bank Islami) savings accounts too?",
    a: "Yes. Profit on Islamic savings accounts and term deposits is taxed at the same 15% / 30% rates. The Sharia structure changes how the return is earned, not how it is taxed.",
  },
  {
    q: "Is Zakat also deducted from my savings account?",
    a: "Banks deduct compulsory Zakat at 2.5% on the first day of Ramadan from savings and profit-bearing accounts above the government's notified Nisab, unless you have submitted a Zakat exemption declaration (CZ-50). Current accounts are not subject to this deduction.",
  },
  {
    q: "What is the minimum profit rate on savings accounts?",
    a: "The State Bank requires banks to pay at least a minimum profit rate, linked to the SBP policy rate, on conventional savings deposits. From 1 August 2026 this applies only to individual accounts with an average balance of up to Rs 10 million. Ask your bank for its current rate.",
  },
];

export default function BankInterest() {
  const resultRef = useRef(null);
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const P = parseFloat(form.principal.replace(/,/g, "")) || 0;
    const r = parseFloat(form.rate) || 0;
    const months = form.periodUnit === "years"
      ? (parseFloat(form.period) || 0) * 12
      : (parseFloat(form.period) || 0);
    const rMonthly = r / 100 / 12;

    // Banks deduct tax from each profit payment, so with monthly compounding
    // only the after-tax profit is reinvested.
    const whtRate = form.filerStatus === "filer" ? WHT_FILER : WHT_NON_FILER;
    let grossProfit;
    if (form.compounding === "monthly") {
      grossProfit = 0;
      let balance = P;
      for (let i = 0; i < months; i++) {
        const p = balance * rMonthly;
        grossProfit += p;
        balance += p * (1 - whtRate);
      }
    } else {
      grossProfit = P * (r / 100) * (months / 12);
    }

    const wht = grossProfit * whtRate;
    const netProfit = grossProfit - wht;
    const totalAmount = P + netProfit;
    const effectiveRate = P > 0 && months > 0 ? (netProfit / P / (months / 12)) * 100 : 0;
    const otherRate = whtRate === WHT_FILER ? WHT_NON_FILER : WHT_FILER;
    const filerDifference = Math.abs(grossProfit * otherRate - wht);
    const monthlyNet = months > 0 ? netProfit / months : 0;

    setResult({ P, grossProfit, wht, netProfit, totalAmount, months, whtRate, effectiveRate, r, filerDifference, monthlyNet });
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
          <div className="hero-badge">Savings & Term Deposits · 15% / 30% WHT · 2026-27</div>
          <h1>Bank Profit Calculator Pakistan</h1>
          <p>Work out the profit on a savings account or term deposit (TDR) and how much the bank deducts as withholding tax — 15% for filers, 30% for non-filers.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Deposit Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bp-principal">Deposit Amount <span>(Rs)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input id="bp-principal" type="number" inputMode="numeric" placeholder="e.g. 1000000" value={form.principal} onChange={e => set("principal", e.target.value)} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="bp-rate">Annual Profit Rate <span>(%)</span></label>
                <div className="input-prefix">
                  <span>%</span>
                  <input id="bp-rate" type="number" inputMode="decimal" placeholder="e.g. 10" step="0.25" value={form.rate} onChange={e => set("rate", e.target.value)} style={{ paddingLeft: 32 }} />
                </div>
                <p className="hint">Use the rate your bank quotes for your account</p>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bp-period">Period</label>
                <input id="bp-period" type="number" inputMode="numeric" placeholder="e.g. 12" value={form.period} onChange={e => set("period", e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="bp-unit">Period Unit</label>
                <select id="bp-unit" value={form.periodUnit} onChange={e => set("periodUnit", e.target.value)}>
                  <option value="months">Months</option>
                  <option value="years">Years</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="bp-comp">Profit Handling</label>
                <select id="bp-comp" value={form.compounding} onChange={e => set("compounding", e.target.value)}>
                  <option value="none">Paid out (no compounding)</option>
                  <option value="monthly">Added to balance monthly</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="bp-filer">Your FBR Status</label>
                <select id="bp-filer" value={form.filerStatus} onChange={e => set("filerStatus", e.target.value)}>
                  <option value="filer">Filer — 15% WHT</option>
                  <option value="nonfiler">Non-Filer — 30% WHT</option>
                </select>
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Bank Profit →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY); setResult(null); }}>Reset</button>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #1e3a8a 100%)" }}>
                  <h3>Profit Summary</h3>
                  <div className="result-main-amount">{fmt(result.netProfit)}</div>
                  <div className="result-main-label">Net Profit (after {(result.whtRate * 100).toFixed(0)}% WHT)</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Deposit</span><span className="value">{fmt(result.P)}</span></div>
                  <div className="result-row"><span className="label">Rate / Period</span><span className="value">{result.r}% · {result.months} months</span></div>
                  <div className="result-row highlight"><span className="label">Gross Profit</span><span className="value">{fmt(result.grossProfit)}</span></div>
                  <div className="result-row tax-row"><span className="label">Tax Deducted</span><span className="value">- {fmt(result.wht)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Profit</span><span className="value">{fmt(result.netProfit)}</span></div>
                  <div className="result-row"><span className="label">Average per Month</span><span className="value">{fmt(result.monthlyNet)}</span></div>
                  <div className="result-row"><span className="label">Balance at End</span><span className="value">{fmt(result.totalAmount)}</span></div>
                  <div className="result-row"><span className="label">After-Tax Return</span><span className="value">{result.effectiveRate.toFixed(2)}% a year</span></div>
                  <div className="result-row">
                    <span className="label">{result.whtRate === WHT_FILER ? "A non-filer would lose" : "As a filer you'd keep"}</span>
                    <span className="value">{fmt(result.filerDifference)} more</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">🏦</div><p>Enter your deposit details to see profit after tax.</p></div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Bank profit tax 2026-27</h4>
            <ul>
              <li>Filer: <strong>15%</strong> (Section 151)</li>
              <li>Non-filer: <strong>30%</strong></li>
              <li>Final tax for individuals on profit up to Rs 5m a year</li>
              <li>SBP policy rate: 11.5% (held on 14 September 2026)</li>
            </ul>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/withholding-tax", label: "📋 All withholding tax rates" },
              { to: "/blog/filer-vs-non-filer", label: "⚖️ Filer vs non-filer" },
              { to: "/blog/become-filer", label: "✅ How to become a filer" },
              { to: "/zakat", label: "☪️ Zakat on savings" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="Explained" title="How tax on bank profit works in Pakistan">
        <p>
          When your bank credits profit to a savings account, term deposit or certificate, it first deducts
          withholding tax under Section 151 of the Income Tax Ordinance and deposits it with FBR in your name.
          The rate depends only on whether you are on the Active Taxpayers List on the date the profit is paid.
        </p>
        <p className="formula">Net profit = deposit × rate × (months ÷ 12) × (1 − 15% or 30%)</p>
        <h3>Example: Rs 2,000,000 in a 1-year term deposit at 10%</h3>
        <p>
          Gross profit is Rs 200,000. A filer has Rs 30,000 deducted and receives Rs 170,000. A non-filer has
          Rs 60,000 deducted and receives Rs 140,000 — Rs 30,000 less on the same deposit.
        </p>
        <h3>Is the tax final?</h3>
        <p>
          For individuals and AOPs whose yearly profit is up to Rs 5 million, the deduction is a final tax: you
          declare the profit in your return but don't pay more on it, and you can't claim it back. Above Rs 5
          million, the deduction becomes an advance tax adjusted in your return. If you missed being on the ATL
          when profit was paid, see our <Link to="/blog/late-filing-penalties-2026">guide to restoring filer status</Link>.
        </p>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          appliesTo="Tax Year 2027"
          sources={[
            { label: "Income Tax Ordinance 2001, Section 151 and First Schedule (Finance Act 2026)" },
            { label: "State Bank of Pakistan — monetary policy statements", url: "https://www.sbp.org.pk" },
          ]}
        >
          Profit rates differ by bank, account and balance, and change with the SBP policy rate. Confirm your
          rate with your bank.
        </ReviewNote>
      </ContentSection>

      <FaqSection faqs={faqs} title="Bank profit questions" />
    </div>
  );
}
