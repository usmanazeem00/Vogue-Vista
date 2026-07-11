import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const TAX_RATE = 0.1304;
const LAST_UPDATED = "July 2026";
const QUICK_AMOUNTS = [100, 500, 1000, 2000];

export default function SimLoadTax({ navigate }) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const faqs = [
    {
      q: "How much balance do I get after loading Rs. 100 in Pakistan?",
      a: "After tax deductions, you receive approximately Rs. 86.96 from a Rs. 100 recharge, since Rs. 13.04 (13.04%) is deducted as tax."
    },
    {
      q: "Do all mobile networks charge the same taxes?",
      a: "Yes. Jazz, Zong, Ufone and Telenor all apply the same 13.04% government-mandated deduction on prepaid recharge, since the tax is set by FBR, not by the telecom operator."
    },
    {
      q: "Why is tax deducted from mobile recharge?",
      a: "Telecom operators act as withholding agents, collecting withholding tax and Federal Excise Duty (FED) on behalf of FBR at the time of recharge, then depositing it with the government."
    },
    {
      q: "Is the mobile load tax refundable?",
      a: "If you are an active taxpayer (filer) with an NTN, the withholding portion is treated as advance tax and can be adjusted against your annual income tax liability when you file your return."
    },
    {
      q: "Does the tax rate change based on how I recharge (card, EasyLoad, JazzCash)?",
      a: "No. The 13.04% deduction applies uniformly whether you recharge via a scratch card, EasyLoad retailer, or a mobile wallet like JazzCash or Easypaisa."
    },
    {
      q: "How much tax do I pay on a Rs. 1000 recharge?",
      a: "On a Rs. 1000 recharge, approximately Rs. 130.40 is deducted as tax, leaving you a usable balance of about Rs. 869.60."
    },
    {
      q: "Is this the same as the tax on calls, SMS, and mobile data usage?",
      a: "No. This rate applies to the recharge itself. Additional General Sales Tax (GST) may also apply when you actually use your balance on calls, SMS, or data bundles, which this calculator does not model separately."
    }
  ];

  const calculate = (load) => {
    const value = load !== undefined ? load : parseFloat(amount) || 0;
    if (load !== undefined) setAmount(String(load));

    const totalTax = value * TAX_RATE;
    const balance = value - totalTax;

    setResult({
      load: value,
      totalTax,
      balance,
      taxRate: TAX_RATE * 100
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
        "@id": "https://pktaxcalc.com/sim-load-tax",
        url: "https://pktaxcalc.com/sim-load-tax",
        name: "Mobile Load Tax Calculator Pakistan 2026 - Jazz, Zong, Ufone, Telenor",
        description:
          "Free calculator showing the exact balance you receive after tax on Jazz, Zong, Ufone and Telenor prepaid mobile recharge in Pakistan.",
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
            name: "Mobile Load Tax Calculator",
            item: "https://pktaxcalc.com/sim-load-tax"
          }
        ]
      },
      {
        "@type": "WebApplication",
        name: "Mobile Load Tax Calculator Pakistan 2026",
        url: "https://pktaxcalc.com/sim-load-tax",
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
          Mobile Load Tax Calculator Pakistan 2026 | Jazz, Zong, Ufone, Telenor
        </title>

        <meta
          name="description"
          content="Find out exactly how much balance you get after tax on a Jazz, Zong, Ufone or Telenor recharge in Pakistan. Free, instant, updated for 2026."
        />

        <link rel="canonical" href="https://pktaxcalc.com/sim-load-tax" />

        <meta
          property="og:title"
          content="Mobile Load Tax Calculator Pakistan 2026 | Jazz, Zong, Ufone, Telenor"
        />

        <meta
          property="og:description"
          content="Calculate the real balance you receive after mobile recharge tax in Pakistan — updated for 2026."
        />

        <meta property="og:url" content="https://pktaxcalc.com/sim-load-tax" />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">
            Pakistan Telecom Taxes · Updated {LAST_UPDATED}
          </div>

          <h1>Mobile Load Tax Calculator Pakistan 2026 (Jazz, Zong, Ufone, Telenor)</h1>

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

                  <div className="result-main-label">Balance Received</div>
                </div>

                <div className="result-body">
                  <div className="result-row">
                    <span className="label">Recharge Amount</span>
                    <span className="value">Rs {result.load.toFixed(2)}</span>
                  </div>

                  <div className="result-row tax-row">
                    <span className="label">Total Tax Deducted</span>
                    <span className="value">
                      Rs {result.totalTax.toFixed(2)}
                    </span>
                  </div>

                  <div className="result-row">
                    <span className="label">Deduction Rate</span>
                    <span className="value">
                      {result.taxRate.toFixed(2)}%
                    </span>
                  </div>

                  <div className="result-row highlight">
                    <span className="label">Final Balance</span>
                    <span className="value">
                      Rs {result.balance.toFixed(2)}
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
              <li>Rs 100 load → Rs 86.96 received</li>
              <li>Rs 500 load → Rs 434.80 received</li>
              <li>Rs 1000 load → Rs 869.60 received</li>
            </ul>
          </div>
        </div>
      </div>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Mobile Recharge Taxes</div>

        <h2 className="section-title">Mobile Load Tax in Pakistan — How It Works</h2>

        <p className="section-desc">
          When you recharge your mobile phone in Pakistan, you don't receive
          the full amount. A combination of government taxes is deducted by
          the telecom operator before the credit reaches your account, so a
          Rs. 100 recharge shows up as noticeably less than Rs. 100 of usable
          balance.
        </p>

        <p style={{ marginTop: 20 }}>
          For a Rs. 100 recharge, you actually receive approximately Rs.
          86.96, with Rs. 13.04 (13.04%) lost to tax.
        </p>

        <h3 style={{ marginTop: 28 }}>What makes up the 13.04%?</h3>
        <p className="section-desc">
          The deduction combines withholding tax collected under Section 236
          of the Income Tax Ordinance, 2001, along with Federal Excise Duty
          (FED) that telecom operators are required to collect on prepaid
          recharge. Operators act only as collection agents — the money is
          deposited with the Federal Board of Revenue (FBR), not kept by
          Jazz, Zong, Ufone, or Telenor.
        </p>

        <h3 style={{ marginTop: 28 }}>Does this apply to Jazz, Zong, Ufone, and Telenor equally?</h3>
        <p className="section-desc">
          Yes. Because this is a federal tax rate set by FBR rather than a
          fee set by the operator, it applies uniformly across all major
          prepaid networks in Pakistan, regardless of which recharge method
          you use.
        </p>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: {LAST_UPDATED}. Tax rates are set by FBR and may
          change with future budget notifications — this tool is for
          informational estimates only and isn't tax advice.
        </p>
      </section>

      <section className="calc-grid-section">
        <div className="section-eyebrow">Frequently Asked Questions</div>

        <h2 className="section-title">Mobile Load Tax — Common Questions</h2>

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