import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";

const TAX_RATE_FILER = 0.15;
const TAX_RATE_NON_FILER = 0.30;
const LAST_UPDATED = "July 2026";
const QUICK_AMOUNTS = [1000, 10000, 50000, 200000, 1500000];

export default function PrizeBondTax({ navigate }) {
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

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://pktaxcalc.com/prize-bond-tax",
        url: "https://pktaxcalc.com/prize-bond-tax",
        name: "Prize Bond Tax Calculator Pakistan 2026 - Filer & Non-Filer WHT",
        description:
          "Calculate FBR withholding tax deductions on prize bond winnings in Pakistan. Free tool for both Filers (15%) and Non-Filers (30%).",
        dateModified: "2026-07-01"
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://pktaxcalc.com/"
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Prize Bond Tax Calculator",
            item: "https://pktaxcalc.com/prize-bond-tax"
          }
        ]
      },
      {
        "@type": "WebApplication",
        name: "Prize Bond Tax Calculator Pakistan 2026",
        url: "https://pktaxcalc.com/prize-bond-tax",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "PKR"
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a
          }
        }))
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>
          Prize Bond Tax Calculator Pakistan 2026 | Filer vs Non-Filer WHT
        </title>

        <meta
          name="description"
          content="Find out your exact net prize money payout after FBR tax deductions on prize bond winnings in Pakistan. Dynamic calculations for Filers and Non-Filers."
        />

        <link rel="canonical" href="https://pktaxcalc.com/prize-bond-tax" />

        <meta
          property="og:title"
          content="Prize Bond Tax Calculator Pakistan 2026 | Filer vs Non-Filer"
        />

        <meta
          property="og:description"
          content="Calculate your tax deduction and take-home prize cash based on your current FBR tax status — updated for 2026."
        />

        <meta property="og:url" content="https://pktaxcalc.com/prize-bond-tax" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">
            FBR National Savings Taxes · Updated {LAST_UPDATED}
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

      <section className="calc-grid-section">
        <div className="section-eyebrow">National Savings WHT</div>

        <h2 className="section-title">Prize Bond Tax Deductions — How FBR Evaluates Winnings</h2>

        <p className="section-desc">
          When you pull a winning ticket from a Pakistani prize bond draw, you do not keep the 
          entire bounty. Under Section 156 of the Income Tax Ordinance, the Federal Board of 
          Revenue (FBR) mandates withholding tax (WHT) deductions at the spot of collection.
        </p>

        <p style={{ marginTop: 20 }}>
          Your active tax filing profile drastically affects how much cash makes it back home. Active 
          registered <strong>Filers</strong> enjoy a base rate of <strong>15%</strong>, while individuals 
          not present on the Active Taxpayer List (<strong>Non-Filers</strong>) are hit with a heavy 
          punitive rate of <strong>30%</strong>.
        </p>

        <h3 style={{ marginTop: 28 }}>Is this tax adjustable in annual returns?</h3>
        <p className="section-desc">
          No. Unlike salary or cellular load withholding components which can frequently count as advance adjustable payments 
          against annual asset disclosures, prize bond wins belong to the <strong>Final Tax Regime (FTR)</strong>. 
          The value processed out at source serves as your absolute settlement for that transaction, meaning you cannot claim 
          credits or refunds against it later.
        </p>

        <h3 style={{ marginTop: 28 }}>Premium Prize Bonds vs Standard Deminonations</h3>
        <p className="section-desc">
          Whether you hold standard paper bonds (Rs. 100 up to Rs. 1,500) or electronic Premium Prize Bonds 
          (Rs. 25,000 and Rs. 40,000), the percentage rules remain uniform. However, premium registrations 
          additionally yield quarterly profits directly deposited to your bank account, which fall under separate profit-on-debt WHT 
          structures.
        </p>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: {LAST_UPDATED}. Statutory guidelines are managed dynamically by FBR budget announcements. 
          This tool generates general informational estimations and must not supersede qualified fiscal advisory.
        </p>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Frequently Asked Questions</div>

        <h2 className="section-title">Prize Bond Winnings Tax — Common Questions</h2>

        <div className="faq-list">
          {faqs.map((f, i) => (
            <div className="faq-item" key={i} style={{ marginTop: 16 }}>
              <h3 style={{ marginBottom: 6 }}>{f.q}</h3>
              <p className="section-desc">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

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
            <article
              key={tool.path}
              className="calc-tile"
              onClick={() => navigate(tool.path)}
              style={{ cursor: "pointer" }}
            >
              <div className="tile-icon">{tool.icon}</div>
              <h3>{tool.title}</h3>
              <p>{tool.desc}</p>
              <div className="tile-arrow">Open Calculator →</div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}