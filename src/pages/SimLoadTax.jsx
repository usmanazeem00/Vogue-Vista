import React, { useState, useRef } from "react";
import { Link } from "../lib/nav";
import { FaqSection, ReviewNote } from "../components/Content";
import { RATES_REVIEWED_ISO } from "../utils/taxUtils";

// 15% advance tax on the tax-exclusive value = 15/115 of the recharge.
const WHT_SHARE = 15 / 115;
// 19.5% sales tax charged on usage, i.e. 19.5/119.5 of the remaining balance.
const SALES_TAX_SHARE = 19.5 / 119.5;
const QUICK_AMOUNTS = [100, 500, 1000, 2000];

export default function SimLoadTax() {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const faqs = [
    {
      q: "How much balance do I get on a Rs 100 recharge?",
      a: "Rs 86.96 is credited. Rs 13.04 is deducted as advance income tax (15% of the service value). Sales tax of 19.5% is then charged as you use the balance, so the usable value of Rs 100 is about Rs 72.77."
    },
    {
      q: "Do Jazz, Zong, Ufone and Telenor charge the same tax?",
      a: "Yes. The rates are set by law, not by the operator, so every network deducts the same 15% advance tax at recharge and charges the same sales tax on usage."
    },
    {
      q: "Why is tax deducted from mobile recharge?",
      a: "Mobile operators are withholding agents. They collect advance income tax under Section 236 when you recharge and sales tax when you use services, and deposit both with the government."
    },
    {
      q: "Can I get the mobile load tax back?",
      a: "If you file an income tax return, the 15% advance tax collected on your recharges can be adjusted against your yearly tax liability. Sales tax on usage cannot be claimed back by individuals."
    },
    {
      q: "Does it matter how I recharge (card, EasyLoad, JazzCash)?",
      a: "No. The same deduction applies to scratch cards, EasyLoad, and mobile wallets such as JazzCash and Easypaisa."
    },
    {
      q: "How much is deducted on a Rs 1,000 recharge?",
      a: "Rs 130.43 is deducted at recharge, so Rs 869.57 is credited. After sales tax on usage, the usable value is about Rs 728."
    }
  ];

  const calculate = (load) => {
    const value = load !== undefined ? load : parseFloat(amount) || 0;
    if (load !== undefined) setAmount(String(load));

    const totalTax = value * WHT_SHARE;
    const balance = value - totalTax;
    const usable = balance * (1 - SALES_TAX_SHARE);

    setResult({
      load: value,
      totalTax,
      balance,
      usable,
      taxRate: WHT_SHARE * 100
    });

    setTimeout(() => {
      if (window.innerWidth <= 768 && resultRef.current) {
        const y =
          resultRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          80;

        window.scrollTo({
          top: y,
          behavior: "smooth"
        });
      }
    }, 100);
  };


  return (
    <div>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">
            Section 236 · 15% advance tax · Tax Year 2027
          </div>

          <h1>Mobile Load Tax Calculator Pakistan (Jazz, Zong, Ufone, Telenor)</h1>

          <p>
            See exactly how much balance you actually receive after tax on
            a Jazz, Zong, Ufone or Telenor prepaid recharge — instantly,
            with no signup.
          </p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Recharge Amount</h2>

            <div className="form-group">
              <label>Recharge Amount (Rs)</label>

              <div className="input-prefix">
                <span>Rs</span>

                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="100"
                />
              </div>
            </div>

            <div className="quick-amounts">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={
                    "btn-quick-amount" +
                    (result && result.load === val ? " is-active" : "")
                  }
                  onClick={() => calculate(val)}
                >
                  Rs {val}
                </button>
              ))}
            </div>

            <style>{`
              .quick-amounts {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 14px 0 20px;
              }
              .btn-quick-amount {
                appearance: none;
                border: 1px solid #d8e2dc;
                background: #f4f8f6;
                color: #1f4d3d;
                font-size: 0.85rem;
                font-weight: 600;
                padding: 8px 16px;
                border-radius: 999px;
                cursor: pointer;
                transition: border-color 0.15s ease, background 0.15s ease,
                  transform 0.1s ease;
                line-height: 1;
              }
              .btn-quick-amount:hover {
                border-color: #1f8a5f;
                background: #e8f3ee;
              }
              .btn-quick-amount:active {
                transform: scale(0.97);
              }
              .btn-quick-amount.is-active {
                background: #1f8a5f;
                border-color: #1f8a5f;
                color: #ffffff;
              }
            `}</style>

            <button className="btn-calc" onClick={() => calculate()}>
              Calculate →
            </button>

            <button
              className="btn-reset"
              onClick={() => {
                setAmount("");
                setResult(null);
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <div className="sidebar">
          <div className="result-panel fade-in-delay" ref={resultRef}>
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Recharge Summary</h3>

                  <div className="result-main-amount">
                    Rs {result.balance ? result.balance.toFixed(2) : "0.00"}
                  </div>

                  <div className="result-main-label">Balance Credited</div>
                </div>

                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Recharge Amount</span>
                    <span className="value">Rs {result.load.toFixed(2)}</span>
                  </div>

                  <div className="result-row tax-row">
                    <span className="label">Advance Tax at Recharge</span>
                    <span className="value">
                      Rs {result.totalTax.toFixed(2)}
                    </span>
                  </div>

                  <div className="result-row">
                    <span className="label">Deducted (% of recharge)</span>
                    <span className="value">
                      {result.taxRate.toFixed(2)}%
                    </span>
                  </div>

                  <div className="result-row highlight">
                    <span className="label">Balance Credited</span>
                    <span className="value">
                      Rs {result.balance.toFixed(2)}
                    </span>
                  </div>

                  <div className="result-row">
                    <span className="label">Usable value after 19.5% sales tax</span>
                    <span className="value">
                      ≈ Rs {result.usable.toFixed(2)}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">📱</div>
                <p>
                  Enter a recharge amount or tap a quick amount above to see
                  the balance you'll actually receive.
                </p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Example</h4>
            <ul>
              <li>Rs 100 load → Rs 86.96 credited</li>
              <li>Rs 500 load → Rs 434.78 credited</li>
              <li>Rs 1,000 load → Rs 869.57 credited</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="calc-grid-section content-section">
        <div className="section-eyebrow">Explained</div>
        <h2 className="section-title">Mobile load tax in Pakistan — how it works</h2>
        <div className="prose">
          <p>
            Two different taxes reduce your mobile balance, at two different moments:
          </p>
          <ol>
            <li>
              <strong>Advance income tax at recharge (Section 236).</strong> 15% is charged on the value of
              the service, which works out to 13.04% of the amount you pay (15 ÷ 115). On a Rs 100 recharge,
              Rs 13.04 is deducted and Rs 86.96 is credited.
            </li>
            <li>
              <strong>Sales tax when you use the balance.</strong> Provincial sales tax / FED of 19.5% is
              charged as you make calls, send SMS or buy bundles. Over the whole Rs 86.96 that is about
              Rs 14.19, so the usable value of Rs 100 is roughly Rs 72.77.
            </li>
          </ol>
          <p className="formula">Balance credited = recharge × 100 ÷ 115</p>
          <p>
            The rates are set by law, not by the operator, so they are the same on Jazz, Zong, Ufone and
            Telenor and whether you recharge by card, EasyLoad, JazzCash or Easypaisa. Operators collect the
            tax and deposit it with FBR.
          </p>
          <h3>Can filers claim it back?</h3>
          <p>
            The 15% under Section 236 is an advance tax. If you file a return, the tax shown in your telecom
            withholding statement can be adjusted against your yearly liability. Sales tax on usage can't be
            claimed by individuals. A much higher 75% advance tax applies only to people FBR has placed on its
            Income Tax General Order list for not filing.
          </p>
          <ReviewNote
            updated={RATES_REVIEWED_ISO}
            appliesTo="Tax Year 2027"
            sources={[
              { label: "Income Tax Ordinance 2001, Section 236 and First Schedule (Finance Act 2026)" },
              { label: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk" },
            ]}
          />
        </div>
      </section>

      <FaqSection faqs={faqs} title="Common questions" />

      <section className="calc-grid-section">
        <div className="section-eyebrow">More Free Tools</div>

        <h2 className="section-title">
          Explore Our Other Pakistan Tax Calculators
        </h2>

        <p className="section-desc">
          Calculate income tax, salary deductions, withholding tax and Zakat
          using our free Pakistan finance tools.
        </p>

        <div className="calc-grid">
          {[
            {
              title: "Income Tax Calculator",
              path: "/income-tax",
              icon: "🧾",
              desc: "Calculate annual income tax using the latest FBR tax slabs."
            },
            {
              title: "Salary Calculator",
              path: "/salary",
              icon: "💼",
              desc: "Find your net take-home salary after deductions."
            },
            {
              title: "Withholding Tax Calculator",
              path: "/withholding-tax",
              icon: "📋",
              desc: "Calculate withholding taxes on various transactions."
            },
            {
              title: "Zakat Calculator",
              path: "/zakat",
              icon: "☪️",
              desc: "Calculate Zakat on cash, gold, silver and savings."
            }
          ].map((tool) => (
            <Link key={tool.path} to={tool.path} className="calc-tile">
              <div className="tile-icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
              <div className="tile-arrow">Open Calculator →</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}