import React, { useState, useRef } from "react";
import {
  fmt, SILVER_RATE_PER_TOLA, NISAB_SILVER_GRAMS, ZAKAT_RATE, TOLA_GRAMS,
  METAL_RATES_DATE, RATES_REVIEWED_ISO,
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const EMPTY = { unit: "tola", quantity: "", rateTola: "", otherAssets: "" };
const NISAB_TOLA = 52.5;

const faqs = [
  {
    q: "What is the silver Nisab in Pakistan today?",
    a: `Silver Nisab is 52.5 tola (612.36 grams). At the Sarafa rate of ${METAL_RATES_DATE} (Rs ${SILVER_RATE_PER_TOLA.toLocaleString("en-PK")} per tola) it is about ${fmt(NISAB_TOLA * SILVER_RATE_PER_TOLA)}. Multiply 52.5 by today's silver rate per tola for the exact figure.`,
  },
  {
    q: "Why is the silver Nisab used for cash and savings?",
    a: "Silver Nisab is far lower than gold Nisab, so using it means more people pay Zakat and more reaches those in need. For this reason most scholars in Pakistan advise it whenever wealth is a mix of cash, savings, gold or business stock.",
  },
  {
    q: "How much Zakat is due on 52.5 tola of silver?",
    a: `2.5% of its value. At Rs ${SILVER_RATE_PER_TOLA.toLocaleString("en-PK")} per tola, 52.5 tola is worth ${fmt(NISAB_TOLA * SILVER_RATE_PER_TOLA)}, so Zakat is about ${fmt(NISAB_TOLA * SILVER_RATE_PER_TOLA * ZAKAT_RATE)}.`,
  },
];

export default function SilverZakat() {
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const qty = parseFloat(form.quantity) || 0;
    const rateTola = parseFloat(form.rateTola) || SILVER_RATE_PER_TOLA;
    const ratePerGram = rateTola / TOLA_GRAMS;
    const grams = form.unit === "tola" ? qty * TOLA_GRAMS : qty;
    const silverValue = grams * ratePerGram;
    const otherAssets = parseFloat(form.otherAssets) || 0;
    const total = silverValue + otherAssets;
    const nisabValue = NISAB_SILVER_GRAMS * ratePerGram;
    const zakatDue = total >= nisabValue && total > 0;
    const zakat = zakatDue ? total * ZAKAT_RATE : 0;
    setResult({ grams, silverValue, total, nisabValue, zakatDue, zakat, rateTola });
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
          <div className="hero-badge">Silver Nisab · 52.5 Tola · 2.5%</div>
          <h1>Silver Zakat Calculator Pakistan</h1>
          <p>Calculate Zakat on silver in tola or grams, and check your wealth against the silver Nisab — the threshold most scholars in Pakistan use for cash and savings.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Silver Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sz-unit">Weight Unit</label>
                <select id="sz-unit" value={form.unit} onChange={e => set("unit", e.target.value)}>
                  <option value="tola">Tola (11.664 g)</option>
                  <option value="grams">Grams (g)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="sz-qty">Silver Weight</label>
                <input id="sz-qty" type="number" inputMode="decimal" placeholder={form.unit === "tola" ? "e.g. 60" : "e.g. 700"} value={form.quantity} onChange={e => set("quantity", e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="sz-rate">Silver Rate <span>(Rs per tola)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="sz-rate" type="number" inputMode="numeric" placeholder={SILVER_RATE_PER_TOLA.toLocaleString("en-PK")} value={form.rateTola} onChange={e => set("rateTola", e.target.value)} />
              </div>
              <p className="hint">Blank = Sarafa rate of {METAL_RATES_DATE}</p>
            </div>
            <div className="form-group">
              <label htmlFor="sz-other">Other Zakatable Assets <span>(cash, savings, gold — optional)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="sz-other" type="number" inputMode="numeric" placeholder="0" value={form.otherAssets} onChange={e => set("otherAssets", e.target.value)} />
              </div>
            </div>
            <button className="btn-calc" onClick={calculate}>Calculate Silver Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY); setResult(null); }}>Reset</button>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header" style={{ background: "linear-gradient(135deg, #475569 0%, #64748b 100%)" }}>
                  <h3>Silver Zakat</h3>
                  <div className="result-main-amount">{fmt(result.zakat)}</div>
                  <div className="result-main-label">{result.zakatDue ? "Zakat Due (2.5%)" : "Below Nisab"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Silver Weight</span><span className="value">{result.grams.toFixed(2)} g</span></div>
                  <div className="result-row"><span className="label">Rate Used</span><span className="value">{fmt(result.rateTola)}/tola</span></div>
                  <div className="result-row highlight"><span className="label">Silver Value</span><span className="value">{fmt(result.silverValue)}</span></div>
                  <div className="result-row"><span className="label">Total Zakatable</span><span className="value">{fmt(result.total)}</span></div>
                  <div className="result-row"><span className="label">Nisab (52.5 tola)</span><span className="value">{fmt(result.nisabValue)}</span></div>
                  <div className="result-row"><span className="label">Nisab Reached?</span><span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>{result.zakatDue ? "✅ Yes" : "❌ No"}</span></div>
                  {result.zakatDue && <div className="result-row highlight"><span className="label">Total Zakat</span><span className="value">{fmt(result.zakat)}</span></div>}
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">🥈</div><p>Enter silver weight and rate to calculate Zakat.</p></div>
            )}
          </div>

          <div className="nisab-box" style={{ background: "linear-gradient(135deg, #caced2 0%, #838383 100%)" }}>
            <h4 style={{ color: "black" }}>⚖️ Silver Nisab</h4>
            <div className="nisab-grid">
              <div className="nisab-item"><span className="nisab-val">52.5 tola</span><span className="nisab-lbl">612.36 g</span></div>
              <div className="nisab-item"><span className="nisab-val">{fmt(NISAB_TOLA * SILVER_RATE_PER_TOLA)}</span><span className="nisab-lbl">{METAL_RATES_DATE}</span></div>
            </div>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/zakat", label: "☪️ Full Zakat calculator" },
              { to: "/gold-zakat", label: "🥇 Gold Zakat calculator" },
              { to: "/blog/zakat-nisab", label: "⚖️ Zakat Nisab 2026 explained" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="Zakat on silver and the silver Nisab">
        <p className="formula">Silver Nisab = 52.5 tola × today's silver rate per tola</p>
        <p>
          At Rs {SILVER_RATE_PER_TOLA.toLocaleString("en-PK")} per tola, the silver Nisab is{" "}
          {fmt(NISAB_TOLA * SILVER_RATE_PER_TOLA)}. Anyone whose net Zakatable wealth — cash, savings, gold,
          silver and business stock together — stays at or above this for a lunar year owes 2.5% of it.
          Because silver prices move, check the rate on the day you calculate.
        </p>
        <p>
          For a mix of assets, the <Link to="/zakat">Zakat calculator</Link> adds everything up and subtracts
          debts for you. The <Link to="/blog/zakat-nisab">Nisab guide</Link> explains when the gold Nisab is
          used instead.
        </p>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          sources={[{ label: `Default silver rate: Karachi Sarafa benchmark, ${METAL_RATES_DATE}` }]}
        />
      </ContentSection>

      <FaqSection faqs={faqs} title="Silver Zakat questions" />
    </div>
  );
}
