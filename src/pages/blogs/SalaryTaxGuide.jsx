import React from "react";
import { Helmet } from "react-helmet-async";

export default function SalaryTaxGuide({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/salary-tax-guide";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I calculate salary tax in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Find your annual taxable salary, match it to the correct FY 2026-27 FBR slab, then apply that slab's fixed amount plus the percentage on income exceeding the slab's starting threshold. Divide by 12 for your monthly deduction."
        }
      },
      {
        "@type": "Question",
        "name": "Is a monthly salary of Rs 50,000 taxable in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Rs 50,000 per month equals Rs 600,000 annually, which falls within the tax-free threshold for FY 2026-27. No income tax is deducted at this level."
        }
      },
      {
        "@type": "Question",
        "name": "Who withholds salary tax in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Employers are legally required to withhold income tax from salary at source before paying the employee, based on the applicable FBR slab for that tax year."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>How to Calculate Salary Tax in Pakistan (FY 2026-27 Examples)</title>
        <meta
          name="description"
          content="Step-by-step guide to calculating salary tax in Pakistan for FY 2026-27, with worked examples for common salary levels and the current FBR slabs."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="How to Calculate Salary Tax in Pakistan" />
        <meta
          property="og:description"
          content="Step-by-step salary tax calculation examples using the FY 2026-27 FBR slabs."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Salary Tax Guide</div>
          <h1>How to Calculate Salary Tax in Pakistan</h1>
          <p>
            A step-by-step walkthrough for working out your monthly income tax deduction under the
            FY 2026-27 FBR slabs, with worked examples.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>Step 1: Find Your Annual Taxable Salary</h2>
          <p>
            Multiply your gross monthly salary by 12. This is your annual taxable income before
            allowable deductions.
          </p>
        </div>

        <div className="calc-card">
          <h2>Step 2: Match It to the Correct Slab</h2>
          <p>
            Compare your annual salary against the{" "}
            <a
              href="/blog/income-tax-slabs-2026"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/income-tax-slabs-2026");
              }}
            >
              FY 2026-27 income tax slabs
            </a>{" "}
            to find your bracket. Income up to Rs 600,000 a year is tax-free.
          </p>
        </div>

        <div className="calc-card">
          <h2>Step 3: Apply the Slab Formula</h2>
          <p>
            Each slab has a fixed base amount plus a percentage applied only to income above that
            slab's starting threshold — not your whole salary. Two worked examples:
          </p>
          <p>
            <strong>Example A — Rs 100,000/month (Rs 1,200,000/year):</strong> Falls in the Rs
            600,000–1,200,000 slab. Tax = 1% × (1,200,000 − 600,000) = Rs 6,000/year, or Rs 500/month.
          </p>
          <p>
            <strong>Example B — Rs 250,000/month (Rs 3,000,000/year):</strong> Falls in the Rs
            2,200,000–3,200,000 slab. Tax = Rs 116,000 + 20% × (3,000,000 − 2,200,000) = Rs 276,000/year,
            or Rs 23,000/month.
          </p>
        </div>

        <div className="calc-card">
          <h2>Step 4: Check for Filer vs Non-Filer Impact</h2>
          <p>
            Salary tax withholding is the same for filers and non-filers under FY 2026-27 rules.
            However, active filers get lower withholding on bank transactions, vehicle purchases,
            and property dealings — worth understanding if you haven't{" "}
            <a
              href="/blog/become-filer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/become-filer");
              }}
            >
              registered as a filer
            </a>{" "}
            yet.
          </p>
        </div>

        <div className="calc-card">
          <h2>Skip the Manual Math</h2>
          <p>
            Prefer an instant answer? Our{" "}
            <a
              href="/salary"
              onClick={(e) => {
                e.preventDefault();
                navigate("/salary");
              }}
            >
              <strong>Salary Tax Calculator</strong>
            </a>{" "}
            applies the current FY 2026-27 slabs automatically and shows your monthly tax and
            take-home pay.
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
                href="/blog/tax-return-deadline"
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