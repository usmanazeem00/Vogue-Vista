import React from "react";
import { Helmet } from "react-helmet-async";

const comparisons = [
  { activity: "Bank profit on deposits", filer: "15%", nonFiler: "30%" },
  { activity: "Cash withdrawal (per day, above threshold)", filer: "0%", nonFiler: "0.8%" },
  { activity: "Vehicle registration advance tax", filer: "Standard rate", nonFiler: "+200%" },
  { activity: "Prize bond / crossword winnings", filer: "15%", nonFiler: "30%" },
  { activity: "Raffle, lottery, sales promotion prize", filer: "20%", nonFiler: "40%" },
];

export default function FilerVsNonFiler({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/filer-vs-non-filer";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the difference between a filer and non-filer in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A filer is someone whose name appears on FBR's Active Taxpayer List (ATL) because they filed their income tax return on time. A non-filer has either never filed or missed the deadline without paying the ATL restoration surcharge, and pays significantly higher withholding tax on most transactions."
        }
      },
      {
        "@type": "Question",
        "name": "How much more tax does a non-filer pay in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Non-filers commonly pay double the withholding tax rate of filers on bank profit, prize winnings, and dividends, and up to 200% more on vehicle registration advance tax."
        }
      },
      {
        "@type": "Question",
        "name": "Is it worth becoming a filer just to save on withholding tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "For most people with a bank account, vehicle, or property, yes — the withholding tax savings alone often exceed the cost and effort of registering and filing an annual return."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Filer vs Non-Filer in Pakistan — Full Comparison 2026</title>
        <meta
          name="description"
          content="Filer vs non-filer in Pakistan explained: withholding tax rate differences on banking, vehicles, property, and prizes, and how to check your status."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Filer vs Non-Filer in Pakistan" />
        <meta
          property="og:description"
          content="A complete side-by-side comparison of what filers and non-filers pay in Pakistan on common transactions."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Filer Status</div>
          <h1>Filer vs Non-Filer in Pakistan</h1>
          <p>
            Being a "filer" isn't about how much tax you owe — it's about whether your name is on
            FBR's Active Taxpayer List. Here's what that actually changes.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>What Makes You a Filer</h2>
          <p>
            You're a filer the moment your name appears on the Active Taxpayer List (ATL) — which
            happens automatically when you file your income tax return by the due date. Even a
            "nil" return with zero taxable income puts you on the ATL and gives you filer status.
          </p>
        </div>

        <div className="calc-card">
          <h2>Rate Comparison: Filer vs Non-Filer</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="slab-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Transaction</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Filer</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Non-Filer</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((r) => (
                  <tr key={r.activity}>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.activity}</td>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.filer}</td>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.nonFiler}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "12px" }}>
            See full detail on{" "}
            
              <a href="/blog/wht-cash-withdrawal-2026"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/wht-cash-withdrawal-2026");
              }}
            >
              cash withdrawal tax
            </a>{" "}
            and{" "}
            
              <a href="/blog/vehicle-token-tax-2026"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/vehicle-token-tax-2026");
              }}
            >
              vehicle token tax
            </a>{" "}
            rates.
          </p>
        </div>

        <div className="calc-card">
          <h2>How to Check Your Status</h2>
          <p>
            Text "ATL (space) your 13-digit CNIC" to 9966, or check online via FBR's ATL portal.
            Status updates weekly, every Monday.
          </p>
        </div>

        <div className="calc-card">
          <h2>Already Missed the Deadline?</h2>
          <p>
            See our{" "}
            
              <a href="/blog/late-filing-penalties-2026"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/late-filing-penalties-2026");
              }}
            >
              Late Filing Penalties &amp; ATL Surcharge guide
            </a>{" "}
            for exactly what it costs to restore your status.
          </p>
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          <ul className="related-links">
            <li>
              
                <a href="/blog/become-filer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog/become-filer");
                }}
              >
                How to Become a Filer in Pakistan
              </a>
            </li>
            <li>
              
                <a href="/blog/tax-return-deadline"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog/tax-return-deadline");
                }}
              >
                Tax Return Last Date 2026 Pakistan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}