import React, { useState ,useRef} from "react";
// import AdSlot from "../components/AdSlot";
import { fmt, NISAB_SILVER_PKR, NISAB_GOLD_PKR, ZAKAT_RATE } from "../utils/taxUtils";

// ─── MUST be outside ZakatCalculator so React doesn't remount on every keystroke ───
function AssetInput({ label, field, hint, value, onChange }) {
  return (
    <div className="form-group">
      <label>
        {label} {hint && <span>({hint})</span>}
      </label>
      <div className="input-prefix">
        <span>Rs</span>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
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
  cash: "", savings: "", stocks: "", businessGoods: "",
  goldValue: "", silverValue: "", receivables: "", otherAssets: "",
  loans: "", otherLiabilities: "",
};

export default function ZakatCalculator({ navigate }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [result, setResult] = useState(null);
 const resultRef = useRef(null);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const calculate = () => {
    const assets =
      n(form.cash) + n(form.savings) + n(form.stocks) + n(form.businessGoods) +
      n(form.goldValue) + n(form.silverValue) + n(form.receivables) + n(form.otherAssets);
    const liabilities = n(form.loans) + n(form.otherLiabilities);
    const netAssets = Math.max(0, assets - liabilities);
    const nisab = form.nisabType === "gold" ? NISAB_GOLD_PKR : NISAB_SILVER_PKR;
    const zakatDue = netAssets >= nisab;
    const zakat = zakatDue ? netAssets * ZAKAT_RATE : 0;
    setResult({ assets, liabilities, netAssets, nisab, zakatDue, zakat });
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
          <div className="hero-badge">2.5% Zakat Rate · Nisab 2026</div>
          <h1>Zakat Calculator Pakistan 2026</h1>
          <p>Calculate your annual Zakat on all eligible assets. Covers cash, savings, stocks, gold, silver and business goods.</p>
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
                  🥈 Silver Nisab ({fmt(NISAB_SILVER_PKR)})
                </label>
                <label className="radio-option">
                  <input type="radio" name="nisab" value="gold"
                    checked={form.nisabType === "gold"}
                    onChange={() => set("nisabType", "gold")} />
                  🥇 Gold Nisab ({fmt(NISAB_GOLD_PKR)})
                </label>
              </div>
              <p className="hint">Silver Nisab is lower and more conservative — most scholars recommend this.</p>
            </div>

            <div style={{ background: "var(--g-50)", borderRadius: "var(--r-sm)", padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--g-900)", marginBottom: 12, fontSize: "0.9rem" }}>💰 Zakatable Assets</div>
              <div className="form-row">
                <AssetInput label="Cash at Home"    field="cash"          hint="notes, coins"       value={form.cash}          onChange={set} />
                <AssetInput label="Bank Savings"    field="savings"       hint="all accounts"       value={form.savings}       onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Stocks / Shares" field="stocks"        hint="market value"       value={form.stocks}        onChange={set} />
                <AssetInput label="Business Goods"  field="businessGoods" hint="inventory for sale" value={form.businessGoods} onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Gold (value)"    field="goldValue"     hint="market rate"        value={form.goldValue}     onChange={set} />
                <AssetInput label="Silver (value)"  field="silverValue"   hint="market rate"        value={form.silverValue}   onChange={set} />
              </div>
              <div className="form-row">
                <AssetInput label="Receivables"     field="receivables"   hint="money owed to you"  value={form.receivables}   onChange={set} />
                <AssetInput label="Other Assets"    field="otherAssets"   hint="other Zakatable"    value={form.otherAssets}   onChange={set} />
              </div>
            </div>

            <div style={{ background: "var(--danger-bg)", borderRadius: "var(--r-sm)", padding: "16px 20px", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, color: "var(--danger)", marginBottom: 12, fontSize: "0.9rem" }}>📉 Deductible Liabilities</div>
              <div className="form-row">
                <AssetInput label="Loans Payable"     field="loans"            hint="short-term only" value={form.loans}            onChange={set} />
                <AssetInput label="Other Liabilities" field="otherLiabilities" hint="bills due"        value={form.otherLiabilities} onChange={set} />
              </div>
            </div>

            <button className="btn-calc" onClick={calculate}>Calculate Zakat →</button>
            <button className="btn-reset" onClick={() => { setForm(EMPTY_FORM); setResult(null); }}>Reset</button>
          </div>

          <div className="info-card" style={{ marginTop: 20 }}>
            <h4>☪️ What assets are Zakatable?</h4>
            <ul>
              <li><strong>Yes:</strong> Cash, bank savings, gold & silver, stocks held for trade, business inventory, loans given to others</li>
              <li><strong>No:</strong> Personal home, car for personal use, clothes, household furniture, fixed assets not for sale</li>
              <li>Zakat is 2.5% of net Zakatable assets held for one full lunar year (Hawl)</li>
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
                  <div className="result-main-label">{result.zakatDue ? "Annual Zakat Payable (2.5%)" : "Below Nisab Threshold"}</div>
                </div>
                <div className="result-body">
                  <div className="result-row"><span className="label">Total Assets</span><span className="value">{fmt(result.assets)}</span></div>
                  <div className="result-row tax-row"><span className="label">Liabilities</span><span className="value">– {fmt(result.liabilities)}</span></div>
                  <div className="result-row highlight"><span className="label">Net Zakatable Assets</span><span className="value">{fmt(result.netAssets)}</span></div>
                  <div className="result-row"><span className="label">Nisab Threshold</span><span className="value">{fmt(result.nisab)}</span></div>
                  <div className="result-row">
                    <span className="label">Nisab Reached?</span>
                    <span className="value" style={{ color: result.zakatDue ? "var(--g-700)" : "var(--danger)" }}>
                      {result.zakatDue ? "✅ Yes" : "❌ Not yet"}
                    </span>
                  </div>
                  {result.zakatDue && (
                    <div className="result-row highlight"><span className="label">Monthly Installment</span><span className="value">{fmt(result.zakat / 12)}</span></div>
                  )}
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <span className="icon">☪️</span>
                <p>Enter your assets and liabilities to calculate your Zakat obligation.</p>
              </div>
            )}
          </div>

          {/* <AdSlot size="300x250" /> */}

          <div className="nisab-box">
            <h4>⚖️ Nisab Thresholds 2026</h4>
            <div className="nisab-grid">
              <div className="nisab-item"><span className="nisab-val">{fmt(NISAB_GOLD_PKR)}</span><span className="nisab-lbl">Gold Nisab (7.5 tola)</span></div>
              <div className="nisab-item"><span className="nisab-val">{fmt(NISAB_SILVER_PKR)}</span><span className="nisab-lbl">Silver Nisab (52.5 tola)</span></div>
            </div>
          </div>

          <div className="sidebar-card">
            <h4>Related Calculators</h4>
            <ul className="quick-link-list">
              <li><button onClick={() => navigate("/gold-zakat")}>🥇 Gold Zakat Calculator</button></li>
              <li><button onClick={() => navigate("/silver-zakat")}>🥈 Silver Zakat Calculator</button></li>
              <li><button onClick={() => navigate("/income-tax")}>🧾 Income Tax Calculator</button></li>
            </ul>
          </div>
        </div>
      </div>
{/* 
      <div className="container" style={{ padding: "24px 20px" }}>
        <AdSlot size="responsive" />
      </div> */}
    </div>
  );
}