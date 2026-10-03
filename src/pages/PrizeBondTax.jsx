import React, { useState, useRef } from "react";
import { Link } from "../lib/nav";
import { FaqSection, ReviewNote } from "../components/Content";
import { RATES_REVIEWED_ISO } from "../utils/taxUtils";

const TAX_RATE_FILER = 0.15;
const TAX_RATE_NON_FILER = 0.30;
const QUICK_AMOUNTS = [1000, 10000, 50000, 200000, 1500000];

export default function PrizeBondTax() {
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("filer"); // 'filer' or 'non-filer'
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const faqs = [
    {
      q: "What is the tax rate on prize bond winnings in Pakistan?",
      a: "As per the latest FBR rules, active taxpayers (Filers) are charged a 15% withholding tax on prize bond winnings, while non-filers are charged double at 30%."
    },
    {
      q: "Is prize bond tax refundable or adjustable?",
      a: "No. The tax deducted on prize bond winnings under Section 156 of the Income Tax Ordinance is a Final Tax Regime (FTR) deduction. It cannot be refunded or adjusted against your other income tax liabilities."
    },
    {
      q: "How much tax is deducted if a filer wins a Rs. 1,500,000 prize?",
      a: "An active filer will face a 15% deduction, which amounts to Rs. 225,000, leaving a net cash payout of Rs. 1,275,000."
    },
    {
      q: "How much tax is deducted if a non-filer wins a Rs. 1,500,000 prize?",
      a: "A non-filer will face a 30% deduction, which amounts to Rs. 450,000, leaving a net cash payout of Rs. 1,050,000 (losing an extra Rs. 225,000 compared to a filer)."
    },
    {
      q: "Does the tax rate vary depending on the bond denomination?",
      a: "No. The tax percentage depends solely on your FBR Active Taxpayer List (ATL) status at the time of claiming the prize, not on whether it is a Rs. 100, Rs. 750, or premium prize bond."
    },
    {
      q: "Who deducts this tax when I claim my prize?",
      a: "The tax is deducted directly at source by the State Bank of Pakistan (SBP) or the National Savings (CDNS) office before they disburse the net prize money to you."
    }
  ];

  const calculate = (customAmount, currentStatus) => {
    const selectedAmount = customAmount !== undefined ? customAmount : parseFloat(amount) || 0;
    const selectedStatus = currentStatus !== undefined ? currentStatus : status;

    if (customAmount !== undefined) setAmount(String(customAmount));

    const currentRate = selectedStatus === "filer" ? TAX_RATE_FILER : TAX_RATE_NON_FILER;
    const totalTax = selectedAmount * currentRate;
    const netPayout = selectedAmount - totalTax;

    setResult({
      winnings: selectedAmount,
      totalTax,
      balance: netPayout,
      taxRate: currentRate * 100,
      status: selectedStatus
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
            Section 156 · Final tax · Tax Year 2027
          </div>

          <h1>Prize Bond Tax Calculator Pakistan 2026</h1>

          <p>
            Instantly figure out how much tax will be deducted at source and see 
            your actual cash payout for any prize bond win based on your Filer status.
          </p>
        </div>
      </section>

      <div className="calc-layout">
        <div>
          <div className="calc-card fade-in">
            <h2>Enter Winnings Details</h2>

            <div className="form-group">
              <label>Gross Prize Amount (Rs)</label>
              <div className="input-prefix">
                <span>Rs</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1500000"
                />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: 16 }}>
              <label>Taxpayer Status (FBR ATL)</label>
              <div className="status-toggle-container">
                <button
                  type="button"
                  className={`status-btn ${status === "filer" ? "active" : ""}`}
                  onClick={() => {
                    setStatus("filer");
                    if (amount || result) calculate(undefined, "filer");
                  }}
                >
                  Active Filer (15%)
                </button>
                <button
                  type="button"
                  className={`status-btn ${status === "non-filer" ? "active" : ""}`}
                  onClick={() => {
                    setStatus("non-filer");
                    if (amount || result) calculate(undefined, "non-filer");
                  }}
                >
                  Non-Filer (30%)
                </button>
              </div>
            </div>

            <style>{`
              .status-toggle-container {
                display: flex;
                gap: 10px;
                margin-top: 6px;
              }
              .status-btn {
                flex: 1;
                padding: 10px;
                border: 1px solid #d8e2dc;
                background: #ffffff;
                color: #4a4a4a;
                font-weight: 600;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s ease;
              }
              .status-btn.active {
                background: #1f8a5f;
                border-color: #1f8a5f;
                color: #ffffff;
              }
              .quick-amounts {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin: 18px 0 20px;
              }
              .btn-quick-amount {
                appearance: none;
                border: 1px solid #d8e2dc;
                background: #f4f8f6;
                color: #1f4d3d;
                font-size: 0.85rem;
                font-weight: 600;
                padding: 8px 14px;
                border-radius: 999px;
                cursor: pointer;
                transition: border-color 0.15s ease, background 0.15s ease, transform 0.1s ease;
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

            <div className="quick-amounts">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  type="button"
                  className={
                    "btn-quick-amount" +
                    (result && result.winnings === val ? " is-active" : "")
                  }
                  onClick={() => calculate(val)}
                >
                  Rs {val.toLocaleString()}
                </button>
              ))}
            </div>

            <button className="btn-calc" onClick={() => calculate()}>
              Calculate Payout →
            </button>

            <button
              className="btn-reset"
              onClick={() => {
                setAmount("");
                setStatus("filer");
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
                  <h3>Your Payout Summary</h3>

                  <div className="result-main-amount">
                    Rs {result.balance ? result.balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "0.00"}
                  </div>

                  <div className="result-main-label">Take-Home Cash Payout</div>
                </div>

                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Gross Winnings</span>
                    <span className="value">Rs {result.winnings.toLocaleString()}</span>
                  </div>

                  <div className="result-row tax-row">
                    <span className="label">WHT Deducted ({result.status})</span>
                    <span className="value">
                      Rs {result.totalTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="result-row">
                    <span className="label">Tax Percentage</span>
                    <span className="value">
                      {result.taxRate.toFixed(0)}%
                    </span>
                  </div>

                  <div className="result-row highlight">
                    <span className="label">Net Amount Disbursed</span>
                    <span className="value">
                      Rs {result.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="result-placeholder">
                <div className="icon">🏆</div>
                <p>
                  Enter your gross prize amount and select your active taxpayer 
                  status to instantly track final cash receipts.
                </p>
              </div>
            )}
          </div>

          <div className="info-card">
            <h4>📌 Quick Benchmarks (Filer)</h4>
            <ul>
              <li>Rs 200,000 prize → Rs 170,000 received</li>
              <li>Rs 500,000 prize → Rs 425,000 received</li>
              <li>Rs 1,500,000 prize → Rs 1,275,000 received</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="calc-grid-section content-section">
        <div className="section-eyebrow">Explained</div>
        <h2 className="section-title">How tax on prize bond winnings works</h2>
        <div className="prose">
          <p>
            When you claim a prize bond prize, the State Bank office or bank branch that pays you deducts
            withholding tax under Section 156 of the Income Tax Ordinance before handing over the money.
            The rate depends only on whether you are on FBR's Active Taxpayers List (ATL) when you claim:
            <strong> 15% for filers</strong> and <strong>30% for non-filers</strong>.
          </p>
          <p className="formula">Net prize = prize amount × (1 − 15% or 30%)</p>
          <h3>Example: Rs 1,500,000 first prize</h3>
          <p>
            A filer receives Rs 1,275,000 after Rs 225,000 tax. A non-filer receives Rs 1,050,000 after
            Rs 450,000 tax — Rs 225,000 less for the same winning bond. If you are close to claiming a large
            prize and aren't a filer, it is usually worth <Link to="/blog/become-filer">filing a return</Link> first.
          </p>
          <h3>Can I claim the tax back?</h3>
          <p>
            No. Tax on prize bond winnings is a final tax: it settles your liability on the prize and can't be
            adjusted against other income or refunded. You still declare the prize, and the tax deducted, in
            your next return and wealth statement.
          </p>
          <h3>Premium prize bonds</h3>
          <p>
            Registered premium prize bonds also pay periodic profit into your bank account. That profit is
            taxed separately as profit on debt (15% / 30%), like <Link to="/bank-interest">bank profit</Link>.
          </p>
          <ReviewNote
            updated={RATES_REVIEWED_ISO}
            appliesTo="Tax Year 2027"
            sources={[
              { label: "Income Tax Ordinance 2001, Section 156 and First Schedule (Finance Act 2026)" },
              { label: "National Savings (CDNS)", url: "https://savings.gov.pk" },
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
          Easily evaluate income slabs, salary breakdowns, cell network receipts, and religious obligations via updated web templates.
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
              title: "Mobile Load Tax Calculator",
              path: "/sim-load-tax",
              icon: "📱",
              desc: "Determine cellular usable balance remaining after advance withholding cuts."
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