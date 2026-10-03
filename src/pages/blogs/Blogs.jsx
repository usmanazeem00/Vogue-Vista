import React from "react";
import { Link } from "../../lib/nav";
import { ROUTE_META } from "../../routeMeta";
import { formatDate } from "../../components/Content";

const groups = [
  {
    title: "Income tax and salary",
    items: [
      { path: "/blog/income-tax-slabs-2026", desc: "Salaried and business slabs for Tax Year 2027, and what changed from last year." },
      { path: "/blog/salary-tax-guide", desc: "Monthly tax on salaries from Rs 50,000 to Rs 1,000,000, with the formula and examples." },
      { path: "/blog/salary-deduction-breakdown", desc: "Income tax, EOBI and provident fund on one payslip, at three salary levels." },
    ],
  },
  {
    title: "Filing and filer status",
    items: [
      { path: "/blog/tax-return-deadline", desc: "Tax Year 2026 deadline extended to 15 October 2026." },
      { path: "/blog/become-filer", desc: "Register on IRIS, file your return and get on the Active Taxpayers List." },
      { path: "/blog/filer-vs-non-filer", desc: "What non-filers pay extra on bank profit, property, cash withdrawals and more." },
      { path: "/blog/late-filing-penalties-2026", desc: "The late-filing penalty and the new Rs 25,000 ATL surcharge." },
    ],
  },
  {
    title: "Withholding taxes",
    items: [
      { path: "/blog/wht-cash-withdrawal-2026", desc: "0.8% for non-filers on cash withdrawals above Rs 50,000 a day." },
      { path: "/blog/vehicle-token-tax-2026", desc: "Token tax and FBR advance tax on vehicles by engine size." },
    ],
  },
  {
    title: "Zakat",
    items: [
      { path: "/blog/zakat-guide", desc: "Which assets count, how to deduct debts, and a worked example." },
      { path: "/blog/zakat-nisab", desc: "Gold and silver Nisab in rupees, and which one to use." },
      { path: "/blog/zakat-on-provident-fund-eobi", desc: "Whether locked-in retirement savings count toward Zakat." },
    ],
  },
];

export default function Blogs() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Guides · Updated for 2026-27</div>
          <h1>Pakistan Tax & Zakat Guides</h1>
          <p>
            Plain-English explanations of FBR rules and Zakat, with worked examples in rupees and a link to the
            matching calculator.
          </p>
        </div>
      </section>

      {groups.map((g) => (
        <section className="calc-grid-section" key={g.title} style={{ paddingTop: 32, paddingBottom: 8 }}>
          <h2 className="section-title">{g.title}</h2>
          <div className="calc-grid">
            {g.items.map((item) => {
              const meta = ROUTE_META[item.path];
              return (
                <Link key={item.path} to={item.path} className="calc-tile">
                  <div className="tile-icon" aria-hidden="true">📝</div>
                  <h3>{meta.crumb}</h3>
                  <p>{item.desc}</p>
                  <p style={{ fontSize: "0.75rem", marginTop: 8 }}>Updated {formatDate(meta.updated)}</p>
                  <div className="tile-arrow">Read guide →</div>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      <div style={{ height: 48 }} />
    </>
  );
}
