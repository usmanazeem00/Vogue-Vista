import React, { useState, useRef } from "react";
import {
  fmt, GOLD_RATE_PER_TOLA, NISAB_GOLD_GRAMS, ZAKAT_RATE, TOLA_GRAMS,
  METAL_RATES_DATE, RATES_REVIEWED_ISO,
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

const purityFactor = { "24k": 1, "22k": 22 / 24, "21k": 21 / 24, "18k": 18 / 24 };

const EMPTY = { unit: "tola", purity: "22k", quantity: "", rateTola: "", otherAssets: "" };

const faqs = [
  {
    q: "What is the Nisab of gold in Pakistan?",
    a: `Gold Nisab is 7.5 tola (87.48 grams) of gold. At the 24K Sarafa rate of ${METAL_RATES_DATE} (Rs ${GOLD_RATE_PER_TOLA.toLocaleString("en-PK")} per tola) that is about ${fmt(7.5 * GOLD_RATE_PER_TOLA)}. Multiply 7.5 by today's rate per tola for the current figure.`,
  },
  {
    q: "How much Zakat is due on 1 tola of gold?",
    a: `If Zakat is due on your wealth, it is 2.5% of the gold's value. For 1 tola of 24K gold at Rs ${GOLD_RATE_PER_TOLA.toLocaleString("en-PK")} that is about ${fmt(GOLD_RATE_PER_TOLA * ZAKAT_RATE)}. For 22K, multiply by 22/24 first. On its own, 1 tola is below Nisab — Zakat is due only if your total wealth reaches Nisab.`,
  },
  {
    q: "Is Zakat due on gold jewellery that I wear?",
    a: "In the Hanafi school, followed by most people in Pakistan, yes — gold jewellery is Zakatable whether worn or stored. The Shafi'i, Maliki and Hanbali schools generally exempt jewellery for normal personal use. Follow the opinion of the scholar you rely on.",
  },
  {
    q: "Should I use the buying or selling rate of gold?",
    a: "Use the price you could sell your gold for today (the jeweller's buying rate), not the price you paid. Jewellers often deduct for impurities and making charges, so the sale value of jewellery is usually below the headline 24K rate.",
  },
  {
    q: "I have only a little gold but also savings. Is Zakat due?",
    a: "When you have gold together with cash or savings, they are added together and checked against the silver Nisab (52.5 tola), which is much lower. That is why the calculator lets you add other assets.",
  },
];

export default function GoldZakat() {
  const [form, setForm] = useState(EMPTY);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const qty = parseFloat(form.quantity) || 0;
    const rateTola = parseFloat(form.rateTola) || GOLD_RATE_PER_TOLA;
    const ratePerGram = rateTola / TOLA_GRAMS;
    const grams = form.unit === "tola" ? qty * TOLA_GRAMS : qty;
    const pure24kGrams = grams * purityFactor[form.purity];
    const goldValue = pure24kGrams * ratePerGram;
    const otherAssets = parseFloat(form.otherAssets) || 0;
    const totalZakatable = goldValue + otherAssets;
    const nisabValue = NISAB_GOLD_GRAMS * ratePerGram;
    const zakatDue = totalZakatable >= nisabValue && totalZakatable > 0;
    const zakat = zakatDue ? totalZakatable * ZAKAT_RATE : 0;
    const goldZakat = zakatDue ? goldValue * ZAKAT_RATE : 0;

    setResult({ grams, pure24kGrams, goldValue, totalZakatable, nisabValue, zakatDue, zakat, goldZakat, rateTola, otherAssets });
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
          <div className="hero-badge">Gold Zakat · 2.5% · Nisab 7.5 Tola</div>
          <h1>Gold Zakat Calculator Pakistan</h1>
          <p>Calculate Zakat on gold jewellery, coins and bars in tola or grams, for 24K, 22K, 21K and 18K gold, at today's Sarafa rate.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Gold Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gz-unit">Weight Unit</label>
                <select id="gz-unit" value={form.unit} onChange={e => set("unit", e.target.value)}>
                  <option value="tola">Tola (11.664 g)</option>
                  <option value="grams">Grams (g)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gz-purity">Gold Purity</label>
                <select id="gz-purity" value={form.purity} onChange={e => set("purity", e.target.value)}>
                  <option value="24k">24 Karat (pure)</option>
                  <option value="22k">22 Karat</option>
                  <option value="21k">21 Karat</option>
                  <option value="18k">18 Karat</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gz-qty">Gold Weight <span>({form.unit === "tola" ? "tola" : "grams"})</span></label>
                <input
                  id="gz-qty"
                  type="number"
                  inputMode="decimal"
                  placeholder={form.unit === "tola" ? "e.g. 5" : "e.g. 58.3"}
                  value={form.quantity}
                  onChange={e => set("quantity", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gz-rate">24K Gold Rate <span>(Rs per tola)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    id="gz-rate"
                    type="number"
                    inputMode="numeric"
                    placeholder={GOLD_RATE_PER_TOLA.toLocaleString("en-PK")}
                    value={form.rateTola}
                    onChange={e => set("rateTola", e.target.value)}
                  />
                </div>
                <p className="hint">Blank = Sarafa rate of {METAL_RATES_DATE}</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="gz-other">Other Zakatable Assets <span>(cash, savings — optional)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input id="gz-other" type="number" inputMode="numeric" placeholder="0" value={form.otherAssets} onChange={e => set("otherAssets", e.target.value)} />
              </div>
              <p className="hint">For gold plus other assets, the <Link to="/zakat">full Zakat calculator</Link> lets you use the silver Nisab.</p>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Gold Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY); setResult(null); }}>Reset</button>
          </div>

          <div className="calc-card" style={{ marginTop: 24 }}>
            <h2>Gold Purity Reference</h2>
            <div style={{ overflowX: "auto" }}>
              <table className="slab-table">
                <thead><tr><th>Karat</th><th>Pure gold</th><th>Value of 1 tola*</th><th>Common use</th></tr></thead>
                <tbody>
                  {[
                    ["24K", 1, "Bars, coins"],
                    ["22K", 22 / 24, "Most jewellery in Pakistan"],
                    ["21K", 21 / 24, "Jewellery"],
                    ["18K", 18 / 24, "Jewellery with stones"],
                  ].map(([k, f, use]) => (
                    <tr key={k}><td>{k}</td><td>{(f * 100).toFixed(1)}%</td><td>{fmt(GOLD_RATE_PER_TOLA * f)}</td><td>{use}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hint" style={{ marginTop: 10 }}>*At the 24K rate of {METAL_RATES_DATE}. Jewellers' buying prices are usually lower.</p>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header" style={{ background: "linear-gradient(135deg, #92400e 0%, #b45309 100%)" }}>
                  <h3>Gold Zakat Summary</h3>
                  <div className="result-main-amount">{fmt(result.zakat)}</div>
                  <div className="result-main-label">{result.zakatDue ? "Total Zakat Due (2.5%)" : "Below Nisab — No Zakat"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Weight</span><span className="value">{result.grams.toFixed(2)} g ({(result.grams / TOLA_GRAMS).toFixed(2)} tola)</span></div>
                  <div className="result-row"><span className="label">Pure 24K Equivalent</span><span className="value">{result.pure24kGrams.toFixed(2)} g</span></div>
                  <div className="result-row"><span className="label">Rate Used (24K)</span><span className="value">{fmt(result.rateTola)}/tola</span></div>
                  <div className="result-row highlight"><span className="label">Gold Value</span><span className="value">{fmt(result.goldValue)}</span></div>
                  <div className="result-row"><span className="label">Gold Nisab (7.5 tola)</span><span className="value">{fmt(result.nisabValue)}</span></div>
                  <div className="result-row">
                    <span className="label">Nisab Reached?</span>
                    <span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>
                      {result.zakatDue ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                  {result.zakatDue && <>
                    <div className="result-row"><span className="label">Zakat on Gold</span><span className="value">{fmt(result.goldZakat)}</span></div>
                    {result.otherAssets > 0 && <div className="result-row"><span className="label">Zakat on Other Assets</span><span className="value">{fmt(result.zakat - result.goldZakat)}</span></div>}
                    <div className="result-row highlight"><span className="label">Total Zakat Due</span><span className="value">{fmt(result.zakat)}</span></div>
                  </>}
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">🥇</div>
                <p>Enter gold weight, purity and rate to calculate Zakat.</p>
              </div>
            )}
          </div>

          <div className="nisab-box">
            <h4>⚖️ Gold Nisab</h4>
            <div className="nisab-grid">
              <div className="nisab-item"><span className="nisab-val">7.5 tola</span><span className="nisab-lbl">87.48 g</span></div>
              <div className="nisab-item"><span className="nisab-val">{fmt(7.5 * GOLD_RATE_PER_TOLA)}</span><span className="nisab-lbl">{METAL_RATES_DATE}</span></div>
            </div>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/zakat", label: "☪️ Full Zakat calculator" },
              { to: "/silver-zakat", label: "🥈 Silver Zakat calculator" },
              { to: "/blog/zakat-nisab", label: "⚖️ Gold vs silver Nisab explained" },
              { to: "/blog/zakat-guide", label: "📖 How to calculate Zakat" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="How Zakat on gold is calculated">
        <p className="formula">Zakat on gold = weight × purity × today's 24K rate × 2.5%</p>
        <p>
          The calculator converts your gold to its pure (24K) equivalent, values it at the rate you enter, and
          checks it against the gold Nisab of 7.5 tola. If you also add cash or savings, they are included in
          the total.
        </p>
        <h3>Example: 5 tola of 22K jewellery</h3>
        <p>
          5 tola × 22/24 = 4.58 tola of pure gold. At Rs {GOLD_RATE_PER_TOLA.toLocaleString("en-PK")} per tola
          that is worth {fmt(5 * (22 / 24) * GOLD_RATE_PER_TOLA)}. This is below the gold Nisab on its own, but
          if the owner also has savings — or follows the silver Nisab for mixed assets — Zakat is due:
          2.5% of the gold's value is {fmt(5 * (22 / 24) * GOLD_RATE_PER_TOLA * ZAKAT_RATE)}.
        </p>
        <h3>1 tola in grams</h3>
        <p>
          One tola is 11.664 grams, so 7.5 tola = 87.48 g and 52.5 tola = 612.36 g. Jewellers in Pakistan
          also quote in masha and ratti: 1 tola = 12 masha = 96 ratti.
        </p>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          sources={[{ label: `Default gold rate: Karachi Sarafa 24K benchmark, ${METAL_RATES_DATE}` }]}
        >
          Gold prices change daily — enter today's rate from your jeweller or Sarafa association for an
          accurate figure.
        </ReviewNote>
      </ContentSection>

      <FaqSection faqs={faqs} title="Gold Zakat questions" />
    </div>
  );
}
