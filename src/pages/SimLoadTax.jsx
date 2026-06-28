import React, { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


const TAX_RATE = 0.1304;

export default function SimLoadTax({navigate}) {
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState(null);
  const resultRef = useRef(null);

  const faqs = [
    {
      q: "How much balance do I get after loading Rs. 100 in Pakistan?",
      a: "After taxes and deductions, you receive approximately Rs. 86.96 from a Rs. 100 recharge."
    },
    {
      q: "Do all mobile networks charge the same taxes?",
      a: "Jazz, Zong, Ufone and Telenor generally apply similar government taxes, although provincial rates may differ."
    },
    {
      q: "Why is tax deducted from mobile recharge?",
      a: "Telecom operators collect government taxes on behalf of FBR and provincial authorities."
    }
  ];

  const calculate = () => {
    const load = parseFloat(amount) || 0;

    const totalTax = load * TAX_RATE;
    const balance = load - totalTax;

    setResult({
      load,
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
        name: "SIM Load Tax Calculator Pakistan 2026",
        description:
          "Calculate the actual mobile balance received after taxes on Jazz, Zong, Ufone and Telenor recharge in Pakistan."
      },
      {
        "@type": "WebApplication",
        name: "SIM Load Tax Calculator Pakistan 2026",
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
          SIM Load Tax Calculator Pakistan 2026 | Mobile Recharge Tax
        </title>

        <meta
          name="description"
          content="Calculate the actual balance received after mobile recharge in Pakistan. Find taxes deducted on Jazz, Zong, Ufone and Telenor loads."
        />

        <link
          rel="canonical"
          href="https://pktaxcalc.com/sim-load-tax"
        />

        <meta
          property="og:title"
          content="SIM Load Tax Calculator Pakistan 2026"
        />

        <meta
          property="og:description"
          content="Calculate mobile recharge taxes and actual balance received after load."
        />

        <meta
          property="og:url"
          content="https://pktaxcalc.com/sim-load-tax"
        />

        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">
            Pakistan Telecom Taxes · Updated 2026
          </div>

          <h1>Mobile Load | Sim Load Tax Calculator Pakistan 2026</h1>

          <p>
            Calculate how much mobile balance you actually receive
            after taxes on Jazz, Zong, Ufone and Telenor recharge.
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

            <button
              className="btn-calc"
              onClick={calculate}
            >
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
          <div
            className="result-panel fade-in-delay"
            ref={resultRef}
          >
            {result ? (
              <>
                <div className="result-header">
                  <h3>Your Recharge Summary</h3>

                  <div className="result-main-amount">
                    Rs {result.balance?result.balance.toFixed(2):"0.00"}
                  </div>

                  <div className="result-main-label">
                    Balance Received
                  </div>
                </div>

                <div className="result-body">
                  <div className="result-row">
                    <span className="label">
                      Recharge Amount
                    </span>
                    <span className="value">
                      Rs {result.load.toFixed(2)}
                    </span>
                  </div>

                  <div className="result-row tax-row">
                    <span className="label">
                      Total Tax Deducted
                    </span>
                    <span className="value">
                      Rs {result.totalTax.toFixed(2)}
                    </span>
                  </div>

                  <div className="result-row">
                    <span className="label">
                      Deduction Rate
                    </span>
                    <span className="value">
                      {result.taxRate.toFixed(2)}%
                    </span>
                  </div>

                  <div className="result-row highlight">
                    <span className="label">
                      Final Balance
                    </span>
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
                  Enter recharge amount and click Calculate
                  to see the balance received.
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
        <div className="section-eyebrow">
          Mobile Recharge Taxes
        </div>

        <h2 className="section-title">
          Mobile Load Tax in Pakistan
        </h2>

        <p className="section-desc">
          When you recharge your mobile phone in Pakistan,
          you don't receive the full amount. Government taxes
          and telecom deductions are applied before the credit
          reaches your account.
        </p>

        <p style={{ marginTop: 20 }}>
          For a Rs. 100 recharge, you actually receive
          approximately Rs. 86.96, with Rs. 13.04 lost to
          taxes.
        </p>
      </section>
      <section className="calc-grid-section">
  <div className="section-eyebrow">
    More Free Tools
  </div>

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
      <div className="tile-arrow">
        Open Calculator →
      </div>
    </article>
  ))}
</div>

</section>
    </div>
  );
}