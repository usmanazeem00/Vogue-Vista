import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

export default function TaxReturnDeadline({navigate}) {
  const pageUrl = "https://pktaxcalc.com/blog/tax-return-deadline";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the last date to file tax return in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The FBR income tax return last date for Tax Year 2026 is 30 September 2026 for salaried individuals and Associations of Persons (AOPs). Companies with a 30 June year-end have until 31 December 2026."
        }
      },
      {
        "@type": "Question",
        "name": "Can the tax return deadline 2026 be extended?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FBR has extended deadlines in some past years via official notification, but this is not guaranteed. It's safest to file before 30 September 2026 rather than relying on an extension."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if I miss the tax return last date?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Late filers face a monetary penalty and lose Active Taxpayer List (ATL) status, which means higher withholding tax rates on banking, property, and vehicle transactions."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Tax Return Last Date 2026 Pakistan — FBR Deadline (30 Sept)</title>
        <meta
          name="description"
          content="Tax return last date 2026 in Pakistan is 30 September 2026 for individuals & AOPs, 31 December 2026 for companies. Penalties, ATL status, and how to file on IRIS."
        />
        <link rel="canonical" href={pageUrl} />

        {/* Open Graph */}
        <meta property="og:title" content="Tax Return Last Date 2026 Pakistan — FBR Deadline" />
        <meta
          property="og:description"
          content="Official FBR last date for income tax return filing in 2026, penalties for missing it, and how to file on time."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />

        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Tax Return 2026</div>
          <h1>Tax Return Last Date 2026 Pakistan</h1>
          <p>
            The FBR tax return last date for Tax Year 2026 is <strong>30 September 2026</strong> for
            salaried individuals and AOPs, and <strong>31 December 2026</strong> for companies.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>Last Date to File Tax Return in 2026</h2>
          <p>
            Tax Year 2026 covers income earned between 1 July 2025 and 30 June 2026. If you're asking
            "what is the last date for income tax return 2026," the statutory FBR deadline is:
          </p>
          <ul>
            <li><strong>Individuals &amp; salaried persons:</strong> 30 September 2026</li>
            <li><strong>Associations of Persons (AOPs):</strong> 30 September 2026</li>
            <li><strong>Companies (30 June year-end):</strong> 31 December 2026</li>
          </ul>
        </div>

        <div className="calc-card">
          <h2>Is There a Return File Extension in 2026?</h2>
          <p>
            FBR has extended the deadline in some past years through an official SRO notification,
            but extensions are never guaranteed. In Tax Year 2025, FBR explicitly refused to extend
            the date. Treat 30 September as final and file early to avoid IRIS portal congestion.
          </p>
        </div>

        <div className="calc-card">
          <h2>Penalty for Missing the Tax Return Last Date</h2>
          <p>
            Missing the deadline results in a late filing penalty and removal from the Active
            Taxpayer List (ATL) — which means higher withholding tax on your bank transactions,
            property purchases, and vehicle registration until you file.
          </p>
        </div>

        <div className="calc-card">
          <h2>How to File Before the Last Date</h2>
          <p>
            Log in to{" "}
            <a href="https://iris.fbr.gov.pk" target="_blank" rel="noopener noreferrer">
              iris.fbr.gov.pk
            </a>{" "}
            with your NTN/CNIC, go to Declaration → Income Tax Return → Tax Year 2026, complete the
            income and wealth statement sections, and submit. Want to estimate what you owe first?
            Use our{" "}
                      <a
          href="/salary"
          onClick={(e) => {
            e.preventDefault();
            navigate("/salary");
          }}
        >
         <strong> Salary Tax Calculator</strong>
        </a>
          </p>
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          
         <ul className="related-links">
  <li>
    <a
      href="/blog/income-tax-slabs-2026"
      onClick={(e) => {
        e.preventDefault();
        navigate("/blog/income-tax-slabs-2026");
      }}
    >
      Income Tax Slabs Pakistan FY 2026-27
    </a>
  </li>

  <li>
    <a
      href="/blog/salary-tax-guide"
      onClick={(e) => {
        e.preventDefault();
        navigate("/blog/salary-tax-guide");
      }}
    >
      How to Calculate Salary Tax in Pakistan
    </a>
  </li>

  <li>
    <a
      href="/blog/become-filer"
      onClick={(e) => {
        e.preventDefault();
        navigate("/blog/become-filer");
      }}
    >
      How to Become a Filer in Pakistan
    </a>
  </li>

  <li>
    <a
      href="/blog/zakat-guide"
      onClick={(e) => {
        e.preventDefault();
        navigate("/blog/zakat-guide");
      }}
    >
      Zakat on Gold, Cash &amp; Savings
    </a>
  </li>
</ul>
        </div>
      </div>
    </>
  );
}