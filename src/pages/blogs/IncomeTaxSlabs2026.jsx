import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import {
  fmt, fmtPlain, calcTaxBreakdown,
  SALARIED_SLABS_TY2027, SALARIED_SLABS_TY2026, BUSINESS_SLABS_TY2027,
} from "../../utils/taxUtils";

const META = ROUTE_META["/blog/income-tax-slabs-2026"];

const base = (s) => (s.min > 0 ? s.min - 1 : 0);
const rangeLabel = (s) =>
  s.min === 0 ? "Up to 600,000" : s.max === Infinity ? `Above ${fmtPlain(base(s))}` : `${fmtPlain(s.min)} – ${fmtPlain(s.max)}`;
const taxLabel = (s) =>
  s.rate === 0 ? "0%" : `${s.fixed ? `Rs ${fmtPlain(s.fixed)} + ` : ""}${(s.rate * 100).toFixed(0)}% of amount above Rs ${fmtPlain(base(s))}`;

function SlabTable({ slabs }) {
  return (
    <div className="table-wrap">
      <table className="slab-table">
        <thead><tr><th>Taxable income per year (Rs)</th><th>Income tax</th></tr></thead>
        <tbody>
          {slabs.map((s) => (
            <tr key={s.min}><td>{rangeLabel(s)}</td><td>{taxLabel(s)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const MONTHLY_SALARIES = [50000, 75000, 100000, 150000, 200000, 300000, 400000, 500000, 750000, 1000000];

const faqs = [
  {
    q: "What are the income tax slabs for 2026-27 in Pakistan?",
    a: "For salaried individuals in Tax Year 2027: 0% up to Rs 600,000; 1% from Rs 600,001 to 1.2m; 11% to 2.2m; 20% to 3.2m; 25% to 4.1m; 29% to 5.6m; 32% to 7m; and 35% above Rs 7 million — each rate applying only to income inside that band.",
  },
  {
    q: "Which tax year is 2026-27?",
    a: "Pakistan's tax year is named after the year in which it ends. The financial year 1 July 2026 to 30 June 2027 is Tax Year 2027, and the return for it is due by 30 September 2027.",
  },
  {
    q: "Did the business (non-salaried) slabs change in 2026-27?",
    a: "No. The non-salaried slabs for individuals and AOPs are the same as 2025-26: 0% up to Rs 600,000, then 15%, 20%, 30%, 40% and 45% above Rs 5.6 million.",
  },
  {
    q: "Is there still a surcharge on high incomes?",
    a: "Finance Act 2026 abolished the surcharge on individuals with taxable income above Rs 10 million. In 2025-26 salaried individuals paid a 9% surcharge (10% for others) on their tax at that level.",
  },
  {
    q: "Is a salary of Rs 50,000 a month taxable?",
    a: "No. Rs 50,000 a month is Rs 600,000 a year, which is exactly the tax-free limit. Tax starts on income above that — Rs 60,000 a month pays Rs 100 a month.",
  },
];

export default function IncomeTaxSlabs2026() {
  return (
    <ArticleLayout
      badge="Finance Act 2026 · Tax Year 2027"
      title="Income Tax Slabs 2026-27 for Salaried and Business Individuals"
      intro="The FBR tax slabs that apply to income earned from 1 July 2026 to 30 June 2027, what changed from last year, and how much tax common salaries pay."
      updated={META.updated}
      appliesTo="Tax Year 2027 (1 July 2026 – 30 June 2027)"
      sources={[
        { label: "Finance Act 2026 — First Schedule, Part I, Division I" },
        { label: "Finance Act 2025 (for the 2025-26 comparison)" },
        { label: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk" },
      ]}
      related={[
        { to: "/income-tax", label: "Income tax calculator 2026-27" },
        { to: "/blog/salary-tax-guide", label: "Tax on salary: monthly table and examples" },
        { to: "/salary", label: "Take-home salary calculator" },
        { to: "/freelancer-tax", label: "Freelancer tax calculator" },
        { to: "/blog/tax-return-deadline", label: "Tax return last date" },
      ]}
    >
      <Callout>
        <strong>Short answer:</strong> for 2026-27, salaried income up to Rs 600,000 a year is tax-free. Above
        that the rates are 1%, 11%, 20%, 25%, 29%, 32% and 35%. The 35% rate now starts above Rs 7 million (it
        started at Rs 4.1 million last year), and the surcharge on income above Rs 10 million has been abolished.
      </Callout>

      <h2>Salaried individuals: tax slabs 2026-27</h2>
      <p>
        These rates apply if salary is more than 75% of your taxable income. Your employer uses them to work out
        the tax deducted from your pay each month.
      </p>
      <SlabTable slabs={SALARIED_SLABS_TY2027} />

      <h2>Business and other non-salaried individuals</h2>
      <p>
        If you are self-employed, run a business, earn mainly from rent or professional fees, or your salary is
        75% or less of your taxable income, these rates apply. They are unchanged from 2025-26.
      </p>
      <SlabTable slabs={BUSINESS_SLABS_TY2027} />
      <p>
        Freelancers exporting IT services through banking channels are usually taxed separately at 0.25% or 1%
        of receipts — see the <Link to="/freelancer-tax">freelancer tax calculator</Link>.
      </p>

      <h2>Tax on common salaries in 2026-27</h2>
      <p>
        Monthly tax for the full salary treated as taxable, compared with the 2025-26 slabs. For your own
        figure, including EOBI and provident fund, use the <Link to="/salary">salary calculator</Link>.
      </p>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Monthly salary</th><th>Tax per month 2026-27</th><th>Tax per month 2025-26</th><th>Monthly saving</th></tr></thead>
          <tbody>
            {MONTHLY_SALARIES.map((m) => {
              const now = calcTaxBreakdown(m * 12, true, "TY2027").total / 12;
              const before = calcTaxBreakdown(m * 12, true, "TY2026").total / 12;
              return (
                <tr key={m}>
                  <td>{fmt(m)}</td>
                  <td>{fmt(now)}</td>
                  <td>{fmt(before)}</td>
                  <td>{before - now > 0.5 ? fmt(before - now) : "—"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>What changed from 2025-26</h2>
      <p>The first three salaried bands are unchanged. The relief is for income above Rs 2.2 million a year (about Rs 183,000 a month):</p>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Annual income band</th><th>2025-26 rate</th><th>2026-27 rate</th></tr></thead>
          <tbody>
            <tr><td>Rs 2.2m – 3.2m</td><td>23%</td><td>20%</td></tr>
            <tr><td>Rs 3.2m – 4.1m</td><td>30%</td><td>25%</td></tr>
            <tr><td>Rs 4.1m – 5.6m</td><td>35%</td><td>29%</td></tr>
            <tr><td>Rs 5.6m – 7m</td><td>35%</td><td>32% (new band)</td></tr>
            <tr><td>Above Rs 7m</td><td>35%</td><td>35%</td></tr>
            <tr><td>Surcharge above Rs 10m</td><td>9% of tax (salaried)</td><td>Abolished</td></tr>
          </tbody>
        </table>
      </div>
      <p>For reference, the full 2025-26 salaried table was:</p>
      <SlabTable slabs={SALARIED_SLABS_TY2026} />

      <h2>How to read a slab</h2>
      <p>
        Each slab has a fixed amount — the tax on all income below that slab — plus a percentage of the income
        above the slab's starting point. You never pay the top rate on your whole income.
      </p>
      <p className="formula">Tax = fixed amount + rate × (annual income − slab starting point)</p>
      <p>
        <strong>Example:</strong> a yearly salary of Rs 3,000,000 falls in the Rs 2,200,001–3,200,000 slab.
        Tax = Rs 116,000 + 20% × (3,000,000 − 2,200,000) = Rs 276,000 a year, or Rs 23,000 a month. The step-by-step
        method, with more examples, is in our <Link to="/blog/salary-tax-guide">salary tax guide</Link>.
      </p>

      <h2>Tax year vs financial year</h2>
      <p>
        FBR names each tax year after the year it ends in. Income earned from 1 July 2026 to 30 June 2027 is
        <strong> Tax Year 2027</strong>; the return for it is due by 30 September 2027. The return you may be
        filing now is for Tax Year 2026 (July 2025 – June 2026), which uses the 2025-26 slabs above. Its
        deadline has been <Link to="/blog/tax-return-deadline">extended to 15 October 2026</Link>.
      </p>

      <h2>What the slabs don't cover</h2>
      <ul>
        <li>Bank profit, dividends and prize bond winnings, which are taxed at source at fixed rates (<Link to="/withholding-tax">see withholding tax rates</Link>).</li>
        <li>Capital gains on property and securities, which have their own rates.</li>
        <li>Tax credits (for example for approved donations or pension fund contributions) that reduce the tax you finally owe.</li>
      </ul>

      <FaqSection faqs={faqs} title="Tax slab questions" eyebrow="FAQ" />
    </ArticleLayout>
  );
}
