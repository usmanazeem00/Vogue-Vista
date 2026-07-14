import React from "react";
import { Helmet } from "react-helmet-async";

export default function WhtCashWithdrawal2026({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/wht-cash-withdrawal-2026";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the withholding tax on cash withdrawal in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Under Section 231AB, banks deduct 0.8% advance tax on aggregate daily cash withdrawals exceeding Rs 50,000 from persons not appearing on the Active Taxpayer List (ATL). Filers pay 0% on cash withdrawals."
        }
      },
      {
        "@type": "Question",
        "name": "Does the cash withdrawal tax apply to filers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Active filers on the ATL are exempt from this tax regardless of how much they withdraw."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Rs 50,000 threshold per withdrawal or per day?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It's per day, aggregated across all withdrawals and all accounts held by the same person at that bank — not a single-transaction limit."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Withholding Tax on Cash Withdrawal Pakistan 2026 (Section 231AB)</title>
        <meta
          name="description"
          content="Cash withdrawal tax in Pakistan 2026: Section 231AB rate, the Rs 50,000 daily threshold, and how filer status makes this tax disappear entirely."
        />
        <link rel="canonical"  href={pageUrl} />
        <meta property="og:title" content="WHT on Cash Withdrawal Pakistan 2026" />
        <meta
          property="og:description"
          content="Section 231AB cash withdrawal tax explained: rate, threshold, and filer vs non-filer impact."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Banking Tax</div>
          <h1>Withholding Tax on Cash Withdrawal in Pakistan (2026)</h1>
          <p>
            Non-filers lose <strong>0.8%</strong> on daily cash withdrawals above{" "}
            <strong>Rs 50,000</strong>. Filers pay nothing.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>The Section 231AB Rule</h2>
          <p>
            Every banking company must deduct advance income tax at <strong>0.8%</strong> on the
            total (aggregate) cash withdrawn by a non-ATL person in a single day, once that total
            exceeds <strong>Rs 50,000</strong>. This applies across ATM, cheque, and over-the-counter
            withdrawals combined — not per transaction.
          </p>
        </div>

        <div className="calc-card">
          <h2>Worked Example</h2>
          <p>
            A non-filer withdraws Rs 150,000 in a single day across two visits to the bank. Tax
            applies only to the amount above Rs 50,000: 0.8% × Rs 100,000 = <strong>Rs 800</strong>{" "}
            deducted. A filer withdrawing the same amount pays <strong>Rs 0</strong>.
          </p>
        </div>

        <div className="calc-card">
          <h2>Who's Exempt</h2>
          <ul>
            <li>Active filers on the ATL — 0% regardless of withdrawal amount</li>
            <li>Federal and provincial governments</li>
            <li>Foreign diplomats and diplomatic missions in Pakistan</li>
            <li>Persons holding a Commissioner-issued income tax exemption certificate</li>
          </ul>
        </div>

        <div className="calc-card">
          <h2>This Is Recoverable — If You're a Filer</h2>
          <p>
            Tax deducted under Section 231AB is adjustable against your final tax liability when
            you file your annual return, meaning filers who are wrongly charged can claim it back.
            Non-filers cannot claim this deduction back since it's designed as a compliance
            incentive, not a refundable advance.
          </p>
          <p>
            Not registered yet? See{" "}
            
              <a href="/blog/become-filer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/become-filer");
              }}
            >
              How to Become a Filer in Pakistan
            </a>
            .
          </p>
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          <ul className="related-links">
            <li>
              
                <a href="/blog/filer-vs-non-filer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog/filer-vs-non-filer");
                }}
              >
                Filer vs Non-Filer in Pakistan
              </a>
            </li>
            <li>
              
                <a href="/blog/vehicle-token-tax-2026"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog/vehicle-token-tax-2026");
                }}
              >
                Vehicle Token Tax Pakistan 2026
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}