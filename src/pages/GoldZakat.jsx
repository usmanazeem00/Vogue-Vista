import React, { useState,useRef} from "react";
// import AdSlot from "../components/AdSlot";
import { fmt, GOLD_RATE_PER_GRAM, NISAB_GOLD_GRAMS, ZAKAT_RATE } from "../utils/taxUtils";

const TOLA_TO_GRAM = 11.664;

export default function GoldZakat({ navigate }) {
  const [form, setForm] = useState({
    unit: "grams",
    purity: "24k",
    quantity: "",
    customRate: "",
    otherAssets: "",
  });
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const purityFactor = { "24k": 1, "22k": 22/24, "21k": 21/24, "18k": 18/24 };

  const calculate = () => {
    const qty = parseFloat(form.quantity) || 0;
    const rate = parseFloat(form.customRate) || GOLD_RATE_PER_GRAM;
    const purity = purityFactor[form.purity];
    const grams = form.unit === "tola" ? qty * TOLA_TO_GRAM : qty;
    const pure24kGrams = grams * purity;
    const goldValue = pure24kGrams * rate;
    const otherAssets = parseFloat(form.otherAssets) || 0;
    const totalZakatable = goldValue + otherAssets;
    const nisabValue = NISAB_GOLD_GRAMS * rate;
    const zakatDue = totalZakatable >= nisabValue;
    const zakat = zakatDue ? totalZakatable * ZAKAT_RATE : 0;
    const goldZakat = zakatDue ? goldValue * ZAKAT_RATE : 0;

    setResult({ grams, pure24kGrams, goldValue, totalZakatable, nisabValue, zakatDue, zakat, goldZakat, rate });
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
      <div className="page-hero-inner">
        <div className="hero-badge">Gold Zakat · 2.5% Rate · Nisab 7.5 Tola · 2026</div>
        <h1>Gold Zakat Calculator Pakistan 2026</h1>
        <p>Calculate Zakat on gold jewellery, coins and bars in grams or tola. Supports 24K, 22K, 21K and 18K gold purity.</p>
      </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Gold Details</h2>

            <div className="form-row">
              <div className="form-group">
                <label>Weight Unit</label>
                <select value={form.unit} onChange={e => set("unit", e.target.value)}>
                  <option value="grams">Grams (g)</option>
                  <option value="tola">Tola (مثقال)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Gold Purity</label>
                <select value={form.purity} onChange={e => set("purity", e.target.value)}>
                  <option value="24k">24 Karat (Pure Gold)</option>
                  <option value="22k">22 Karat</option>
                  <option value="21k">21 Karat</option>
                  <option value="18k">18 Karat</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Gold Quantity <span>({form.unit === "tola" ? "tola" : "grams"})</span></label>
                <input
                  type="number"
                  placeholder={form.unit === "tola" ? "e.g. 10" : "e.g. 116.6"}
                  value={form.quantity}
                  onChange={e => set("quantity", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Gold Rate <span>(Rs per gram, 24K)</span></label>
                <div className="input-prefix">
                  <span>Rs</span>
                  <input
                    type="number"
                    placeholder={`Default: ${GOLD_RATE_PER_GRAM.toLocaleString()}`}
                    value={form.customRate}
                    onChange={e => set("customRate", e.target.value)}
                  />
                </div>
                <p className="hint">Check today's rate at Sarafa Bazar or your jeweller</p>
              </div>
            </div>

            <div className="form-group">
              <label>Other Zakatable Assets <span>(cash, savings, etc. — optional)</span></label>
              <div className="input-prefix">
                <span>Rs</span>
                <input type="number" placeholder="0" value={form.otherAssets} onChange={e => set("otherAssets", e.target.value)} />
              </div>
              <p className="hint">Include if combining gold with cash/savings for Nisab calculation</p>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Gold Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm({ unit: "grams", purity: "24k", quantity: "", customRate: "", otherAssets: "" }); setResult(null); }}>Reset</button>
          </div>

          <div className="info-card gold" style={{ marginTop: 24 }}>
            <h4>🥇 Nisab for Gold Zakat</h4>
            <ul>
              <li>Gold Nisab = <strong>7.5 tola = 87.48 grams</strong> of pure (24K) gold</li>
              <li>If your gold (plus other assets) reaches Nisab and one lunar year (Hawl) has passed, Zakat is obligatory</li>
              <li>Jewellery used for personal adornment: scholars differ. Hanafi school says Zakat is still due; many Shafi'i scholars exempt it. Consult your scholar.</li>
              <li>Gold rate used: Default is Rs {GOLD_RATE_PER_GRAM.toLocaleString()}/gram (24K). Update with today's Sarafa rate.</li>
            </ul>
          </div>

          {/* Purity conversion table */}
          <div className="calc-card" style={{ marginTop: 24 }}>
            <h2>Gold Purity Reference</h2>
            <table className="slab-table">
              <thead><tr><th>Karat</th><th>Purity %</th><th>Pure Gold in 100g</th><th>Common Use</th></tr></thead>
              <tbody>
                {[
                  ["24K", "99.9%", "99.9g", "Coins, Bars, Investment"],
                  ["22K", "91.7%", "91.7g", "Jewellery (most common)"],
                  ["21K", "87.5%", "87.5g", "Jewellery"],
                  ["18K", "75.0%", "75.0g", "Jewellery, less yellow"],
                ].map(r => (
                  <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td></tr>
                ))}
              </tbody>
            </table>
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
                  <div className="result-row">
                    <span className="label">Weight in Grams</span>
                    <span className="value">{result.grams.toFixed(2)}g</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Pure 24K Equivalent</span>
                    <span className="value">{result.pure24kGrams.toFixed(2)}g</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Rate Used</span>
                    <span className="value">{fmt(result.rate)}/g</span>
                  </div>
                  <div className="result-row highlight">
                    <span className="label">Gold Market Value</span>
                    <span className="value">{fmt(result.goldValue)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Nisab (87.48g gold)</span>
                    <span className="value">{fmt(result.nisabValue)}</span>
                  </div>
                  <div className="result-row">
                    <span className="label">Nisab Reached?</span>
                    <span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>
                      {result.zakatDue ? "✅ Yes" : "❌ No"}
                    </span>
                  </div>
                  {result.zakatDue && <>
                    <div className="result-row">
                      <span className="label">Zakat on Gold</span>
                      <span className="value">{fmt(result.goldZakat)}</span>
                    </div>
                    <div className="result-row highlight">
                      <span className="label">Total Zakat Due</span>
                      <span className="value">{fmt(result.zakat)}</span>
                    </div>
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

          {/* <AdSlot size="300x250" /> */}

          <div className="nisab-box">
            <h4>⚖️ Gold Nisab</h4>
            <div className="nisab-grid">
              <div className="nisab-item">
                <span className="nisab-val">7.5</span>
                <span className="nisab-lbl">Tola</span>
              </div>
              <div className="nisab-item">
                <span className="nisab-val">87.48g</span>
                <span className="nisab-lbl">Grams (24K)</span>
              </div>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/silver-zakat")}>🥈 Silver Zakat</button></li>
              <li><button onClick={() => navigate("/zakat")}>☪️ Full Zakat Calculator</button></li>
              <li><button onClick={() => navigate("/bank-interest")}>🏦 Bank Profit</button></li>
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