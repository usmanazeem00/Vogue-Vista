import React, { useState, useRef } from "react";
import {
  fmt, ZAKAT_RATE, NISAB_GOLD_GRAMS, NISAB_SILVER_GRAMS, TOLA_GRAMS,
  GOLD_RATE_PER_TOLA, SILVER_RATE_PER_TOLA, METAL_RATES_DATE, RATES_REVIEWED_ISO,
} from "../utils/taxUtils";
import { Link } from "../lib/nav";
import { FaqSection, RelatedLinks, ReviewNote, ContentSection } from "../components/Content";

// ─── MUST be outside ZakatCalculator so React doesn't remount on every keystroke ───
function AssetInput({ label, field, hint, value, onChange }) {
  return (
    <div className="form-group">
      <label htmlFor={`zk-${field}`}>
        {label} {hint && <span>({hint})</span>}
      </label>
      <div className="input-prefix">
        <span>Rs</span>
        <input
          id={`zk-${field}`}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          placeholder="0"
          value={value}
          onChange={e => onChange(field, e.target.value.replace(/[^0-9.]/g, ""))}
        />
      </div>
    </div>
  );
}

const n = (v) => parseFloat(String(v).replace(/[^0-9.]/g, "")) || 0;

const EMPTY_FORM = {
  nisabType: "silver",
  silverTola: "", goldTola: "",
  cash: "", savings: "", stocks: "", businessGoods: "",
  goldValue: "", silverValue: "", receivables: "", otherAssets: "",
  loans: "", otherLiabilities: "",
};

const faqs = [
  {
    q: "What is the Zakat rate?",
    a: "Zakat is 2.5% (one-fortieth) of your net Zakatable wealth, payable once a lunar year has passed while your wealth was at or above Nisab.",
  },
  {
    q: "Should I use the gold or silver Nisab?",
    a: "Most Pakistani scholars, following the Hanafi school, advise using the silver Nisab when your wealth is a mix of cash, savings and other assets, because it is lower and so more people pay Zakat to the poor. If you own only gold, the gold Nisab (7.5 tola) applies to it. Ask a scholar you trust if unsure.",
  },
  {
    q: "Which debts can I subtract?",
    a: "Subtract debts and bills that are due now or within the coming months — for example a loan instalment, unpaid utility bills or money owed to a supplier. Long-term loans such as a house loan are usually deducted only for the instalments currently due, not the full outstanding balance.",
  },
  {
    q: "Do I pay Zakat on my house, car or jewellery I wear?",
    a: "No Zakat is due on your home, personal car, furniture or clothes. Gold and silver jewellery is Zakatable in the Hanafi school even if worn; some other schools exempt jewellery for personal use.",
  },
  {
    q: "My bank deducted Zakat on 1 Ramadan. Do I still need to pay?",
    a: "Banks deduct compulsory Zakat on savings accounts above the government's notified Nisab on the first day of Ramadan. That amount counts toward your Zakat on that balance, so subtract it from what this calculator shows. You can submit a Zakat declaration (CZ-50) to your bank if you prefer to pay yourself.",
  },
];

export default function ZakatCalculator() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const silverTola = n(form.silverTola) || SILVER_RATE_PER_TOLA;
  const goldTola = n(form.goldTola) || GOLD_RATE_PER_TOLA;
  const nisabSilver = (NISAB_SILVER_GRAMS / TOLA_GRAMS) * silverTola; // 52.5 tola
  const nisabGold = (NISAB_GOLD_GRAMS / TOLA_GRAMS) * goldTola;       // 7.5 tola

  const calculate = () => {
    const assets =
      n(form.cash) + n(form.savings) + n(form.stocks) + n(form.businessGoods) +
      n(form.goldValue) + n(form.silverValue) + n(form.receivables) + n(form.otherAssets);
    const liabilities = n(form.loans) + n(form.otherLiabilities);
    const netAssets = Math.max(0, assets - liabilities);
    const nisab = form.nisabType === "gold" ? nisabGold : nisabSilver;
    const zakatDue = netAssets >= nisab && netAssets > 0;
    const zakat = zakatDue ? netAssets * ZAKAT_RATE : 0;
    setResult({ assets, liabilities, netAssets, nisab, zakatDue, zakat });
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
          <div className="hero-badge">2.5% Zakat · Gold & Silver Nisab · Pakistan</div>
          <h1>Zakat Calculator Pakistan 2026</h1>
          <p>Add up what you own, subtract what you owe now, and see whether you've reached Nisab and how much Zakat is due. Covers cash, bank balances, gold, silver, shares and business stock.</p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Zakat Assets & Liabilities</h2>

            <div className="form-group">
              <label>Nisab Standard</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input type="radio" name="nisab" value="silver"
                    checked={form.nisabType === "silver"}
                    onChange={() => set("nisabType", "silver")} />
                  🥈 Silver — 52.5 tola ({fmt(nisabSilver)})
                </label>
                <label className="radio-option">
                  <input type="radio" name="nisab" value="gold"
                    checked={form.nisabType === "gold"}
                    onChange={() => set("nisabType", "gold")} />
                  🥇 Gold — 7.5 tola ({fmt(nisabGold)})
                </label>
              </div>
              <p className="hint">Silver Nisab is generally advised for mixed assets. Values use Sarafa rates of {METAL_RATES_DATE}; enter today's rate below for an exact figure.</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zk-silverTola">Silver rate today <span>(Rs per tola)</span></label>
                <input id="zk-silverTola" type="text" inputMode="numeric" placeholder={SILVER_RATE_PER_TOLA.toLocaleString("en-PK")} value={form.silverTola} onChange={e => set("silverTola", e.target.value.replace(/[^0-9.]/g, ""))} />
              </div>
              <div className="form-group">
                <label htmlFor="zk-goldTola">Gold rate today <span>(Rs per tola, 24K)</span></label>
                <input id="zk-goldTola" type="text" inputMode="numeric" placeholder={GOLD_RATE_PER_TOLA.toLocaleString("en-PK")} value={form.goldTola} onChange={e => set("goldTola", e.target.value.replace(/[^0-9.]/g, ""))} />
              </div>
            </div>

            <div style={{ background: "var(--g-50)", borderRadius: "var(--r-sm)", padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--g-900)", marginBottom: 12, fontSize: "0.9rem" }}>💰 Zakatable Assets</div>
              <div className="form-row">
                <AssetInput label="Cash in Hand"    field="cash"          hint="notes, coins, foreign cash" value={form.cash}          onChange={set} />
                <AssetInput label="Bank Balances"   field="savings"       hint="all accounts"       value={form.savings}       onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Shares / Funds"  field="stocks"        hint="market value"       value={form.stocks}        onChange={set} />
                <AssetInput label="Business Stock"  field="businessGoods" hint="goods for sale"     value={form.businessGoods} onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Gold (value)"    field="goldValue"     hint="today's selling rate" value={form.goldValue}   onChange={set} />
                <AssetInput label="Silver (value)"  field="silverValue"   hint="today's selling rate" value={form.silverValue} onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Money Owed to You" field="receivables" hint="expected to be repaid" value={form.receivables} onChange={set} />
                <AssetInput label="Other Assets"    field="otherAssets"   hint="e.g. committee paid in" value={form.otherAssets} onChange={set} />
              </div>
              <p className="hint">Not sure of your gold's value? Use the <Link to="/gold-zakat">gold Zakat calculator</Link> to convert tola/grams and karat into rupees.</p>
            </div>

            <div style={{ background: "var(--danger-bg)", borderRadius: "var(--r-sm)", padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--danger)", marginBottom: 12, fontSize: "0.9rem" }}>📉 Debts Due Now</div>
              <div className="form-row">
                <AssetInput label="Loans / Instalments Due" field="loans"            hint="currently payable" value={form.loans}            onChange={set} />
                <AssetInput label="Unpaid Bills"            field="otherLiabilities" hint="utilities, rent, suppliers" value={form.otherLiabilities} onChange={set} />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY_FORM); setResult(null); }}>Reset</button>
          </div>

          <div className="info-card" style={{ marginTop: 20 }}>
            <h4>☪️ What is Zakatable?</h4>
            <ul>
              <li><strong>Include:</strong> cash, bank balances, gold and silver (including jewellery in the Hanafi view), shares and funds, business stock, money others owe you</li>
              <li><strong>Exclude:</strong> your home, personal car, furniture, clothes, tools and business equipment</li>
              <li>Zakat is due when net wealth stays at or above Nisab for one lunar year (hawl)</li>
            </ul>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header"
                  style={result.zakatDue ? {} : { background: "linear-gradient(135deg, #475569 0%, #334155 100%)" }}>
                  <h3>{result.zakatDue ? "Zakat Due" : "Zakat Status"}</h3>
                  <div className="result-main-amount">{result.zakatDue ? fmt(result.zakat) : "Nil"}</div>
                  <div className="result-main-label">{result.zakatDue ? "Zakat Payable (2.5%)" : "Below Nisab"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Total Assets</span><span className="value">{fmt(result.assets)}</span></div>
                  <div className="result-row tax-row"><span className="label">Debts Due</span><span className="value">– {fmt(result.liabilities)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Zakatable Wealth</span><span className="value">{fmt(result.netAssets)}</span></div>
                  <div className="result-row"><span className="label">Nisab ({form.nisabType})</span><span className="value">{fmt(result.nisab)}</span></div>
                  <div className="result-row">
                    <span className="label">Nisab Reached?</span>
                    <span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>
                      {result.zakatDue ? "✅ Yes" : "❌ Not yet"}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <span className="icon">☪️</span>
                <p>Enter your assets and debts to calculate your Zakat.</p>
              </div>
            )}
          </div>

          <div className="nisab-box">
            <h4>⚖️ Nisab today</h4>
            <div className="nisab-grid">
              <div className="nisab-item"><span className="nisab-val">{fmt(nisabSilver)}</span><span className="nisab-lbl">Silver (52.5 tola)</span></div>
              <div className="nisab-item"><span className="nisab-val">{fmt(nisabGold)}</span><span className="nisab-lbl">Gold (7.5 tola)</span></div>
            </div>
          </div>

          <RelatedLinks
            title="Related"
            links={[
              { to: "/blog/zakat-nisab", label: "⚖️ Zakat Nisab 2026 in rupees" },
              { to: "/blog/zakat-guide", label: "📖 How to calculate Zakat (with example)" },
              { to: "/gold-zakat", label: "🥇 Gold Zakat calculator" },
              { to: "/silver-zakat", label: "🥈 Silver Zakat calculator" },
              { to: "/blog/zakat-on-provident-fund-eobi", label: "🏦 Zakat on provident fund & EOBI" },
            ]}
          />
        </div>
      </div>

      <ContentSection eyebrow="How it works" title="How Zakat is calculated">
        <p className="formula">Zakat = 2.5% × (Zakatable assets − debts due now), if the result is at or above Nisab</p>
        <ol>
          <li>Pick your Zakat date — usually the same Islamic date each year, often in Ramadan.</li>
          <li>On that date, add the value of your cash, bank balances, gold, silver, shares and business stock, plus money you expect to get back.</li>
          <li>Subtract debts and bills that are payable now.</li>
          <li>If the result is at or above Nisab, pay 2.5% of it.</li>
        </ol>
        <h3>Example</h3>
        <p>
          Ayesha has Rs 150,000 cash, Rs 400,000 in the bank and gold jewellery her jeweller values at Rs 1,000,000
          at today's rate. She owes a Rs 50,000 instalment this month. Net wealth is Rs 1,500,000, which is
          above both Nisab values, so her Zakat is 2.5% × 1,500,000 = <strong>Rs 37,500</strong>.
        </p>
        <p>
          Read the full <Link to="/blog/zakat-guide">Zakat guide</Link> for more cases (business stock, shares,
          loans given), or see <Link to="/blog/zakat-nisab">current Nisab values</Link> explained.
        </p>
        <ReviewNote
          updated={RATES_REVIEWED_ISO}
          sources={[
            { label: `Gold and silver: Karachi Sarafa benchmark rates, ${METAL_RATES_DATE}` },
            { label: "Nisab weights: 87.48 g gold (7.5 tola), 612.36 g silver (52.5 tola)" },
          ]}
        >
          This calculator follows the approach most widely used in Pakistan (Hanafi). For your own situation,
          especially business assets or jewellery, ask a qualified scholar.
        </ReviewNote>
      </ContentSection>

      <FaqSection faqs={faqs} title="Zakat questions" />
    </div>
  );
}
