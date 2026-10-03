import React, { useState, useRef } from "react";
import { fmt, WHT_CATEGORIES, calcWht, RATES_REVIEWED_ISO } from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const pct = (r) => `${+(r * 100).toFixed(2)}%`;

const faqs = [
  {
    q: "What is withholding tax in Pakistan?",
    a: "Withholding tax (WHT) is income tax deducted at source by a bank, employer, buyer or other withholding agent when a payment is made, and deposited with FBR on your behalf. Depending on the payment it is either a final tax, a minimum tax, or an advance tax that you adjust against your total liability when you file your return.",
  },
  {
    q: "Why do non-filers pay higher withholding tax?",
    a: "The Tenth Schedule of the Income Tax Ordinance generally doubles the withholding rate for anyone not on FBR's Active Taxpayers List (ATL). For property purchases the gap is much bigger: 1.25% for filers against 10.5% for non-filers on property under Rs 100 million.",
  },
  {
    q: "Can I get withholding tax back?",
    a: "Advance tax (for example on cash withdrawals, property or mobile bills) can be claimed against your tax liability in your annual return, and refunded if it exceeds what you owe. Final tax — such as on prize bonds, dividends and most bank profit — cannot be adjusted or refunded.",
  },
  {
    q: "How do I check if I am a filer?",
    a: "Send an SMS with 'ATL' followed by a space and your 13-digit CNIC to 9966, or use the ATL search on FBR's website. The list is updated weekly.",
  },
];

export default function WithholdingTax() {
  const [form, setForm] = useState({ category: WHT_CATEGORIES[0].id, amount: "", filer: "filer" });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const amount = parseFloat(String(form.amount).replace(/,/g, "")) || 0;
    const isFiler = form.filer === "filer";
    const r = calcWht(form.category, amount, isFiler);
    const other = calcWht(form.category, amount, !isFiler);
    setResult({ ...r, amount, isFiler, difference: Math.abs(other.wht - r.wht) });
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
          <div className="hero-badge">Tax Year 2027 · Finance Act 2026 · Filer vs Non-Filer</div>
          <h1>Withholding Tax Calculator Pakistan 2026-27</h1>
          <p>Calculate the WHT deducted on bank profit, dividends, prize bonds, property, cash withdrawals, contracts and IT exports — and how much more a non-filer pays.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>WHT Calculator</h2>

            <div className="form-group">
              <label>Your FBR status</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="filer" value="filer" checked={form.filer === "filer"} onChange={() => set("filer", "filer")} />
                  ✅ Filer (on the ATL)
                </label>
                <label className="radio-option">
                  <input type="radio" name="filer" value="nonfiler" checked={form.filer === "nonfiler"} onChange={() => set("filer", "nonfiler")} />
                  ❌ Non-Filer
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="wht-cat">Transaction</label>
              <select id="wht-cat" value={form.category} onChange={e => set("category", e.target.value)}>
                {WHT_CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label} — {pct(form.filer === "filer" ? c.filer : c.nonFiler)}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="wht-amount">Amount <span>(Rs)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="wht-amount" type="number" inputMode="numeric" placeholder="e.g. 500000" value={form.amount} onChange={e => set("amount", e.target.value)} />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate WHT →</button>
            <button className="btn-reset" onClick={() => { setForm({ category: WHT_CATEGORIES[0].id, amount: "", filer: "filer" }); setResult(null); }}>Reset</button>
          </div>

          <div className="calc-card" style={{ marginTop: 24 }}>
            <h2>Withholding Tax Rates 2026-27 (Tax Year 2027)</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="slab-table">
                <thead><tr><th>Transaction</th><th>Section</th><th>Filer</th><th>Non-Filer</th></tr></thead>
                <tbody>
                  {WHT_CATEGORIES.map((c) => (
                    <tr key={c.id}>
                      <td>{c.label}</td>
                      <td>{c.section}</td>
                      <td>{pct(c.filer)}</td>
                      <td style={{ color: c.nonFiler > c.filer ? "var(--danger)" : undefined }}>{pct(c.nonFiler)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hint" style={{ marginTop: 10 }}>
              Rates for the most common transactions. FBR's withholding tax rate card lists many more categories and sub-cases.
            </p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>WHT Summary</h3>
                  <div className="result-main-amount">{fmt(result.wht)}</div>
                  <div className="result-main-label">Withholding Tax ({pct(result.rate)})</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Transaction</span><span className="value" style={{ fontSize: "0.8rem", textAlign: "right", maxWidth: 170 }}>{result.cat.label}</span></div>
                  <div className="result-row"><span className="label">Amount</span><span className="value">{fmt(result.amount)}</span></div>
                  <div className="result-row"><span className="label">Rate ({result.isFiler ? "filer" : "non-filer"})</span><span className="value">{pct(result.rate)}</span></div>
                  <div className="result-row tax-row"><span className="label">WHT Deducted</span><span className="value">- {fmt(result.wht)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Amount</span><span className="value">{fmt(result.net)}</span></div>
                  {result.difference > 0 && (
                    <div className="result-row">
                      <span className="label">{result.isFiler ? "A non-filer would pay" : "As a filer you'd save"}</span>
                      <span className="value">{fmt(result.difference)} {result.isFiler ? "more" : ""}</span>
                    </div>
                  )}
                </div>
                <p className="hint" style={{ padding: "0 20px 16px" }}>
                  Section {result.cat.section}: {result.cat.nature}.
                  {result.cat.threshold && result.taxable === 0 && " No tax: the amount is not above Rs 50,000."}
                </p>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">📋</div><p>Choose a transaction, enter the amount and click Calculate.</p></div>
            )}
          </div>

          <div className="info-card warning">
            <h4>⚠️ Not on the ATL?</h4>
            <p>Non-filers pay double on bank profit (30% vs 15%) and dividends, and 10.5% instead of 1.25% when buying property. <Link to="/blog/become-filer">How to become a filer →</Link></p>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/blog/filer-vs-non-filer", label: "⚖️ Filer vs non-filer: full comparison" },
              { to: "/bank-interest", label: "🏦 Bank profit after tax" },
              { to: "/blog/wht-cash-withdrawal-2026", label: "💵 Cash withdrawal tax (231AB)" },
              { to: "/prize-bond-tax", label: "🏆 Prize bond tax" },
              { to: "/freelancer-tax", label: "💻 Freelancer / IT export tax" },
              { to: "/income-tax", label: "🧾 Income tax calculator" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="Explained" title="How withholding tax works in Pakistan">
        <p>
          Withholding tax is collected at the point of payment. Your bank deducts it from profit before
          crediting your account, a property registrar collects it before transfer, and a company deducts it
          from a contractor's invoice. The person deducting it deposits it with FBR against your CNIC or NTN,
          and it appears in your IRIS profile.
        </p>
        <h3>Final, minimum or advance tax</h3>
        <ul>
          <li><strong>Final tax</strong> — settles your liability on that income completely. Examples: prize bonds (Section 156), most dividends, and bank profit up to Rs 5 million a year.</li>
          <li><strong>Minimum tax</strong> — you pay at least this much on the receipt even if your normal slab tax would be lower. Examples: contracts and services under Section 153.</li>
          <li><strong>Advance tax</strong> — a prepayment adjusted when you file your return, and refundable if it exceeds your liability. Examples: cash withdrawals (231AB), property (236K/236C), mobile bills (236).</li>
        </ul>
        <h3>Example: Rs 1,000,000 in a savings account</h3>
        <p>
          At an illustrative 10% profit rate, yearly profit is Rs 100,000. A filer has Rs 15,000 deducted and
          keeps Rs 85,000; a non-filer has Rs 30,000 deducted and keeps Rs 70,000. Filing a return is worth
          Rs 15,000 a year on this balance alone — work out your own figure with the{" "}
          <Link to="/bank-interest">bank profit calculator</Link>.
        </p>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          appliesTo="Tax Year 2027 (1 July 2026 – 30 June 2027)"
          sources={[
            { label: "Income Tax Ordinance 2001, as amended by Finance Act 2026 — First and Tenth Schedules" },
            { label: "FBR withholding tax rate card", url: "https://www.fbr.gov.pk" },
          ]}
        >
          Rates change with each Finance Act and some categories have sub-cases this calculator doesn't
          cover. Check FBR's current rate card for large or unusual transactions.
        </ReviewNote>
      </ContentSection>

      <FaqSection faqs={faqs} title="Withholding tax questions" />
    </div>
  );
}
