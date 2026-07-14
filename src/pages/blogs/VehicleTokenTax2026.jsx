import React from "react";
import { Helmet } from "react-helmet-async";

const wht231B = [
  { cc: "Up to 850cc", rate: "0.5%" },
  { cc: "851cc – 1,000cc", rate: "1%" },
  { cc: "1,001cc – 1,300cc", rate: "1.5%" },
  { cc: "1,301cc – 1,600cc", rate: "2%" },
  { cc: "1,601cc – 1,800cc", rate: "3%" },
  { cc: "1,801cc – 2,000cc", rate: "5%" },
  { cc: "2,001cc – 2,500cc", rate: "7%" },
  { cc: "2,501cc – 3,000cc", rate: "9%" },
  { cc: "Above 3,000cc", rate: "12%" },
];

const annualTokenTax = [
  { cc: "Up to 1,000cc", annual: "Rs 800", lumpSum: "Rs 10,000" },
  { cc: "1,001cc – 1,199cc", annual: "Rs 1,500", lumpSum: "Rs 18,000" },
  { cc: "1,200cc – 1,299cc", annual: "Rs 1,750", lumpSum: "Rs 20,000" },
  { cc: "1,300cc – 1,499cc", annual: "Rs 2,500", lumpSum: "Rs 30,000" },
  { cc: "1,500cc – 1,599cc", annual: "Rs 3,750", lumpSum: "Rs 45,000" },
  { cc: "1,600cc – 1,999cc", annual: "Rs 4,500", lumpSum: "Rs 60,000" },
  { cc: "Above 2,000cc", annual: "Rs 10,000", lumpSum: "Rs 120,000" },
];

export default function VehicleTokenTax2026({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/vehicle-token-tax-2026";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is vehicle token tax in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vehicle token tax (motor vehicle tax) is an annual tax collected by provincial excise and taxation departments to keep a vehicle legally registered on the road. It's separate from the federal FBR advance tax collected on registration and transfer."
        }
      },
      {
        "@type": "Question",
        "name": "Do non-filers pay more token tax in Pakistan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Under FBR rules, non-filers pay significantly higher advance tax at registration and transfer, and up to 200% more on the federal advance tax component compared to active filers."
        }
      },
      {
        "@type": "Question",
        "name": "Is token tax the same in every province?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Punjab, Sindh, Islamabad, and Khyber Pakhtunkhwa each set their own provincial token tax schedules, so the exact annual amount can differ by region even for the same engine capacity."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Vehicle Token Tax Pakistan 2026 — Rates by Engine Capacity</title>
        <meta
          name="description"
          content="Vehicle token tax Pakistan 2026: FBR advance tax rates on registration, transfer, and annual motor vehicle tax by engine capacity, plus filer vs non-filer differences."
        />
        <link rel="canonical"  href={pageUrl} />
        <meta property="og:title" content="Vehicle Token Tax Pakistan 2026" />
        <meta
          property="og:description"
          content="Full breakdown of vehicle token tax and FBR advance tax rates in Pakistan for 2026, by engine capacity and filer status."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Vehicle Tax 2026</div>
          <h1>Vehicle Token Tax Pakistan 2026</h1>
          <p>
            A breakdown of the annual motor vehicle tax and FBR advance tax rates by engine
            capacity, and why filer status changes what you actually pay.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>Two Separate Taxes on Your Vehicle</h2>
          <p>
            Vehicle owners in Pakistan deal with two distinct taxes: the <strong>provincial token
            tax</strong> (annual motor vehicle tax collected by your provincial excise department)
            and the <strong>federal FBR advance tax</strong> collected under Section 231B at
            registration/transfer and Section 234 alongside annual renewal. Provincial rates vary
            by region (Punjab, Sindh, Islamabad, KP each publish their own schedule), so always
            confirm the exact figure with your local excise office.
          </p>
        </div>

        <div className="calc-card">
          <h2>Annual Motor Vehicle Tax by Engine Capacity (Section 234)</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="slab-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Engine Capacity</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Annual</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Lump Sum</th>
                </tr>
              </thead>
              <tbody>
                {annualTokenTax.map((r) => (
                  <tr key={r.cc}>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.cc}</td>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.annual}</td>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.lumpSum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="calc-card">
          <h2>FBR Advance Tax at Registration (Section 231B)</h2>
          <p>
            Collected as a percentage of vehicle value at first registration, in addition to
            provincial token tax:
          </p>
          <div style={{ overflowX: "auto" }}>
            <table className="slab-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "10px" }}>Engine Capacity</th>
                  <th style={{ textAlign: "left", padding: "10px" }}>Rate (of value)</th>
                </tr>
              </thead>
              <tbody>
                {wht231B.map((r) => (
                  <tr key={r.cc}>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.cc}</td>
                    <td style={{ padding: "10px", borderTop: "1px solid #eee" }}>{r.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: "12px" }}>
            <strong>Non-filers pay this rate increased by 200%.</strong> This tax reduces by 10%
            each year from the vehicle's first registration date.
          </p>
        </div>

        <div className="calc-card">
          <h2>Filer vs Non-Filer: Why It Matters</h2>
          <p>
            Being off the Active Taxpayer List doesn't just cost you at registration — it also
            applies to transfer of ownership and leasing. Read our{" "}
            
              <a href="/blog/filer-vs-non-filer"
              onClick={(e) => {
                e.preventDefault();
                navigate("/blog/filer-vs-non-filer");
              }}
            >
              Filer vs Non-Filer guide
            </a>{" "}
            to see the full picture across banking, property, and vehicles.
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
              
                <a href="/blog/become-filer"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/blog/become-filer");
                }}
              >
                How to Become a Filer in Pakistan
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}