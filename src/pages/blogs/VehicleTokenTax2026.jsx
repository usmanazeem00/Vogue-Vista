import React from "react";
import { Link } from "../../lib/nav";
import { FaqSection, ReviewNote } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";

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

const faqs = [
  {
    q: "What is vehicle token tax in Pakistan?",
    a: "Token tax (motor vehicle tax) is collected each year by your provincial Excise and Taxation department to keep a vehicle registered. It is separate from the federal advance income tax collected by FBR at registration, transfer and with the annual token.",
  },
  {
    q: "Do non-filers pay more?",
    a: "Yes, on the federal part. The advance income tax collected at registration and with the annual token is much higher for people not on the Active Taxpayers List. The provincial token tax itself is the same for filers and non-filers.",
  },
  {
    q: "Is token tax the same in every province?",
    a: "No. Punjab, Sindh, Khyber Pakhtunkhwa, Balochistan and Islamabad each publish their own token tax schedules, so the amount can differ for the same engine size. Check your provincial Excise department.",
  },
];

export default function VehicleTokenTax2026() {


  return (
    <>

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
            
              <Link to="/blog/filer-vs-non-filer">
              Filer vs Non-Filer guide
            </Link>{" "}
            to see the full picture across banking, property, and vehicles.
          </p>
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          <ul className="related-links">
            <li>
              
                <Link to="/blog/filer-vs-non-filer">
                Filer vs Non-Filer in Pakistan
              </Link>
            </li>
            <li>
              
                <Link to="/blog/become-filer">
                How to Become a Filer in Pakistan
              </Link>
            </li>
          </ul>
        </div>
        <ReviewNote updated={ROUTE_META["/blog/vehicle-token-tax-2026"].updated}>
          Vehicle tax rates are set separately by FBR (advance income tax) and by each province (token tax),
          and change with budgets. Confirm the amount for your vehicle with your provincial Excise and Taxation
          department or on your token challan before paying.
        </ReviewNote>
      </div>

      <FaqSection faqs={faqs} title="Vehicle tax questions" />
    </>
  );
}