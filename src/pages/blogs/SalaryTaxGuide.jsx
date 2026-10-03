import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import { fmt, calcTaxBreakdown } from "../../utils/taxUtils";

const META = ROUTE_META["/blog/salary-tax-guide"];

const SALARIES = [
  50000, 60000, 70000, 80000, 90000, 100000, 125000, 150000, 175000, 200000,
  250000, 300000, 350000, 400000, 450000, 500000, 600000, 750000, 1000000,
];

const monthlyTax = (m) => calcTaxBreakdown(m * 12, true).total / 12;

const faqs = [
  {
    q: "How much tax is deducted from a Rs 100,000 salary in Pakistan?",
    a: `Rs ${Math.round(monthlyTax(100000)).toLocaleString("en-PK")} a month in 2026-27. Rs 100,000 a month is Rs 1.2 million a year; tax is 1% of the Rs 600,000 above the tax-free limit, which is Rs 6,000 a year.`,
  },
  {
    q: "How much tax is deducted from a Rs 200,000 salary?",
    a: `Rs ${Math.round(monthlyTax(200000)).toLocaleString("en-PK")} a month. The yearly salary of Rs 2.4m is in the 20% band: Rs 116,000 + 20% × (2,400,000 − 2,200,000) = Rs 156,000 a year.`,
  },
  {
    q: "Is a Rs 50,000 monthly salary taxable?",
    a: "No. Rs 50,000 a month is Rs 600,000 a year, which is the tax-free limit for 2026-27.",
  },
  {
    q: "Do filers and non-filers pay different tax on salary?",
    a: "No. Tax on salary is worked out from the same slabs for everyone. Filer status matters for other withholding taxes — bank profit, property, cash withdrawals — and you still need to file a return to stay on the Active Taxpayers List.",
  },
  {
    q: "Why does my payslip show a different tax figure?",
    a: "Employers estimate tax for the whole year and spread it over the remaining months, so bonuses, increments, arrears or joining mid-year change the monthly figure. Tax-free medical allowance (up to 10% of basic) and tax credits also reduce it. The yearly total should match once all salary for the year is counted.",
  },
];

export default function SalaryTaxGuide() {
  return (
    <ArticleLayout
      badge="Salary Tax · Tax Year 2027"
      title="Tax on Salary in Pakistan 2026-27: Monthly Table and Examples"
      intro="How much income tax is deducted from your salary each month under the 2026-27 slabs, how to work it out yourself, and why your payslip may differ."
      updated={META.updated}
      appliesTo="Salaries paid from 1 July 2026 to 30 June 2027"
      sources={[
        { label: "Finance Act 2026 — salaried rates (First Schedule, Part I, Division I)" },
        { label: "Income Tax Ordinance 2001, Section 149 (deduction from salary)" },
      ]}
      related={[
        { to: "/salary", label: "Salary tax and take-home calculator" },
        { to: "/blog/income-tax-slabs-2026", label: "Income tax slabs 2026-27" },
        { to: "/blog/salary-deduction-breakdown", label: "Payslip deductions: tax, EOBI and provident fund" },
        { to: "/blog/become-filer", label: "How to become a filer" },
      ]}
    >
      <Callout>
        <strong>Short answer:</strong> salaries up to Rs 50,000 a month are tax-free in 2026-27. A Rs 100,000
        salary pays {fmt(monthlyTax(100000))} a month, Rs 150,000 pays {fmt(monthlyTax(150000))}, and
        Rs 300,000 pays {fmt(monthlyTax(300000))}.
      </Callout>

      <h2>Monthly salary tax table 2026-27</h2>
      <p>
        Tax for the full monthly salary treated as taxable (no tax-free allowances), with the 2025-26 figure for
        comparison. "After tax" is before EOBI, provident fund or other deductions.
      </p>
      <div className="table-wrap">
        <table className="slab-table">
          <thead>
            <tr><th>Monthly salary</th><th>Tax / month</th><th>After tax</th><th>Effective rate</th><th>2025-26 tax / month</th></tr>
          </thead>
          <tbody>
            {SALARIES.map((m) => {
              const t = monthlyTax(m);
              const old = calcTaxBreakdown(m * 12, true, "TY2026").total / 12;
              return (
                <tr key={m}>
                  <td>{fmt(m)}</td>
                  <td>{fmt(t)}</td>
                  <td>{fmt(m - t)}</td>
                  <td>{((t / m) * 100).toFixed(1)}%</td>
                  <td>{fmt(old)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>How to calculate salary tax step by step</h2>
      <ol>
        <li><strong>Find your taxable monthly salary.</strong> Start from gross pay and remove tax-free items — mainly medical allowance up to 10% of basic salary.</li>
        <li><strong>Multiply by 12</strong> to get annual taxable salary.</li>
        <li><strong>Find your slab</strong> in the <Link to="/blog/income-tax-slabs-2026">2026-27 salaried table</Link>.</li>
        <li><strong>Apply the formula:</strong> fixed amount + slab rate × (annual salary − slab starting point).</li>
        <li><strong>Divide by 12</strong> for the monthly deduction.</li>
      </ol>
      <p className="formula">Monthly tax = [fixed amount + rate × (annual salary − slab start)] ÷ 12</p>

      <h2>Worked examples</h2>
      <h3>Rs 80,000 a month</h3>
      <p>
        Annual salary Rs 960,000 is in the 1% slab: 1% × (960,000 − 600,000) = Rs 3,600 a year, or{" "}
        <strong>Rs 300 a month</strong>.
      </p>
      <h3>Rs 150,000 a month with Rs 10,000 medical allowance</h3>
      <p>
        Suppose basic salary is Rs 100,000, so medical allowance is tax-free up to Rs 10,000. Taxable salary is
        Rs 140,000 a month, or Rs 1,680,000 a year, in the 11% slab: Rs 6,000 + 11% × (1,680,000 − 1,200,000) =
        Rs 58,800 a year, or <strong>Rs 4,900 a month</strong> — Rs 1,100 a month less than if the whole
        Rs 150,000 were taxable.
      </p>
      <h3>Rs 500,000 a month</h3>
      <p>
        Annual salary Rs 6,000,000 is in the new 32% slab: Rs 976,000 + 32% × (6,000,000 − 5,600,000) =
        Rs 1,104,000 a year, or <strong>Rs 92,000 a month</strong>. Under last year's slabs this salary paid
        {" "}{fmt(calcTaxBreakdown(6000000, true, "TY2026").total / 12)} a month.
      </p>

      <h2>Why your employer's figure may be different</h2>
      <ul>
        <li><strong>Bonuses and increments:</strong> the employer re-estimates your yearly salary and spreads the extra tax over the remaining months.</li>
        <li><strong>Joining or leaving mid-year:</strong> tax is based on the salary you'll actually receive in the tax year, and your new employer needs your previous employer's tax certificate.</li>
        <li><strong>Tax credits and adjustments:</strong> you can ask your employer to account for certain credits (such as approved pension fund contributions) or for tax already paid elsewhere.</li>
      </ul>
      <p>
        At the end of the year your employer gives you a tax deduction certificate. Use it when you{" "}
        <Link to="/blog/become-filer">file your return on IRIS</Link>; any over-deduction can be claimed as a refund.
      </p>

      <FaqSection faqs={faqs} title="Salary tax questions" />
    </ArticleLayout>
  );
}
