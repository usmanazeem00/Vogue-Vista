import React, { useState } from "react";
// import AdSlot from "../components/AdSlot";
import { fmt, SILVER_RATE_PER_GRAM, NISAB_SILVER_GRAMS, ZAKAT_RATE } from "../utils/taxUtils";

const TOLA_TO_GRAM = 11.664;
const RATE = 260; // Rs/gram default

export default function SilverZakat({ navigate }) {
  const [form, setForm] = useState({ unit: "grams", quantity: "", customRate: "", otherAssets: "" });
  const [result, setResult] = useState(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const qty = parseFloat(form.quantity) || 0;
    const rate = parseFloat(form.customRate) || RATE;
    const grams = form.unit === "tola" ? qty * TOLA_TO_GRAM : qty;
    const silverValue = grams * rate;
    const otherAssets = parseFloat(form.otherAssets) || 0;
    const total = silverValue + otherAssets;
    const nisabValue = NISAB_SILVER_GRAMS * rate;
    const zakatDue = total >= nisabValue;
    const zakat = zakatDue ? total * ZAKAT_RATE : 0;
    setResult({ grams, silverValue, total, nisabValue, zakatDue, zakat, rate });
  };

  return (
    <div>
      <section className="page-hero">
      <div className="page-hero-inner">
        <div className="hero-badge">Silver Nisab · 52.5 Tola · 2.5% · 2026</div>
        <h1>Silver Zakat Calculator Pakistan 2026</h1>
        <p>Calculate Zakat on silver using current silver rates. The silver Nisab is the more commonly used threshold for Zakat on all assets.</p>
      </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Silver Details</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Weight Unit</label>
                <select value={form.unit} onChange={e => set("unit", e.target.value)}>
                  <option value="grams">Grams (g)</option>
                  <option value="tola">Tola (مثقال)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Silver Quantity</label>
                <input type="number" placeholder={form.unit === "tola" ? "e.g. 52.5" : "e.g. 612"} value={form.quantity} onChange={e => set("quantity", e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Silver Rate <span>(Rs per gram)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input type="number" placeholder={`Default: ${RATE}`} value={form.customRate} onChange={e => set("customRate", e.target.value)} />
              </div>
              <p className="hint">Check current silver rate at your local jeweller or Sarafa Bazar</p>
            </div>
            <div className="form-group">
              <label>Other Zakatable Assets <span>(optional)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input type="number" placeholder="0" value={form.otherAssets} onChange={e => set("otherAssets", e.target.value)} />
              </div>
            </div>
            <button className="btn-calc" onClick={calculate}>Calculate Silver Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm({ unit: "grams", quantity: "", customRate: "", otherAssets: "" }); setResult(null); }}>Reset</button>
          </div>

          <div className="info-card" style={{ marginTop: 24, borderLeftColor: "#94a3b8" }}>
            <h4>🥈 Why Silver Nisab?</h4>
            <ul>
              <li>Silver Nisab = <strong>52.5 tola = 612.36 grams</strong></li>
              <li>Silver Nisab is much lower than gold Nisab, so more people become obligated to pay Zakat</li>
              <li>Most contemporary scholars recommend silver Nisab for cash & savings</li>
              <li>At approx Rs 260/gram, silver Nisab ≈ Rs 159,000</li>
            </ul>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay">
            {result ? (
              <>
                <div className="result-header" style={{ background: "linear-gradient(135deg, #475569 0%, #64748b 100%)" }}>
                  <h3>Silver Zakat</h3>
                  <div className="result-main-amount">{fmt(result.zakat)}</div>
                  <div className="result-main-label">{result.zakatDue ? "Zakat Due (2.5%)" : "Below Nisab"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Silver Weight</span><span className="value">{result.grams.toFixed(2)}g</span></div>
                  <div className="result-row"><span className="label">Rate Used</span><span className="value">{fmt(result.rate)}/g</span></div>
                  <div className="result-row highlight"><span className="label">Silver Value</span><span className="value">{fmt(result.silverValue)}</span></div>
                  <div className="result-row"><span className="label">Nisab (612.36g)</span><span className="value">{fmt(result.nisabValue)}</span></div>
                  <div className="result-row"><span className="label">Nisab Reached?</span><span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>{result.zakatDue ? "✅ Yes" : "❌ No"}</span></div>
                  {result.zakatDue && <div className="result-row highlight"><span className="label">Total Zakat</span><span className="value">{fmt(result.zakat)}</span></div>}
                </div>
              </>
            ) : (
              <div className="result-placeholder"><div className="icon">🥈</div><p>Enter silver quantity and rate to calculate Zakat.</p></div>
            )}
          </div>

          {/* <AdSlot size="300x250" /> */}

          <div className="nisab-box" style = {{background: "linear-gradient(135deg, #caced2 0%, #838383 100%)" }}>
            <h4 style={{ color: "black" }}>⚖️ Silver Nisab</h4>
            <div className="nisab-grid">
              <div className="nisab-item"><span className="nisab-val">52.5</span><span className="nisab-lbl">Tola</span></div>
              <div className="nisab-item"><span className="nisab-val">612g</span><span className="nisab-lbl">Grams</span></div>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/gold-zakat")}>🥇 Gold Zakat</button></li>
              <li><button onClick={() => navigate("/zakat")}>☪️ Full Zakat Calculator</button></li>
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