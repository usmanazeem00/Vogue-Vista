import React from "react";

const blogs = [
  {
    title: "Income Tax Slabs Pakistan FY 2026-27",
    desc: "Complete breakdown of the new FBR tax slabs.",
    path: "/blog/income-tax-slabs-2026"
  },
  {
    title: "How to Calculate Salary Tax in Pakistan",
    desc: "Step-by-step salary tax calculation examples.",
    path: "/blog/salary-tax-guide"
  },
  {
    title: "How to Become a Filer in Pakistan",
    desc: "Benefits and complete registration process.",
    path: "/blog/become-filer"
  },
  {
    title: "Tax Return Deadline in Pakistan",
    desc: "Important dates and penalties.",
    path: "/blog/tax-return-deadline"
  },
  {
    title: "Late Filing Penalties & ATL Surcharge 2026",
    desc: "What missing the deadline actually costs, and how to fix it.",
    path: "/blog/late-filing-penalties-2026"
  },
  {
    title: "Filer vs Non-Filer in Pakistan",
    desc: "Full rate comparison across banking, vehicles, and prizes.",
    path: "/blog/filer-vs-non-filer"
  },
  {
    title: "Vehicle Token Tax Pakistan 2026",
    desc: "Motor vehicle tax rates by engine capacity, explained.",
    path: "/blog/vehicle-token-tax-2026"
  },
  {
    title: "Withholding Tax on Cash Withdrawal 2026",
    desc: "Section 231AB rate, threshold, and filer savings.",
    path: "/blog/wht-cash-withdrawal-2026"
  },
  {
    title: "Zakat on Gold, Cash & Savings",
    desc: "Learn how to calculate your Zakat correctly.",
    path: "/blog/zakat-guide"
  }
];

export default function Blogs({ navigate }) {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Financial Guides</div>
          <h1>PK Tax Calc Blog</h1>
          <p>
            Guides about taxes, FBR rules, Zakat and personal finance in
            Pakistan.
          </p>
        </div>
      </section>

      <div className="calc-grid-section">
        <div className="calc-grid">
          {blogs.map((b) => (
            <div
              key={b.path}
              className="calc-tile"
              onClick={() => navigate(b.path)}
            >
              <div className="tile-icon">📝</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <div className="tile-arrow">
                Read Article →
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}