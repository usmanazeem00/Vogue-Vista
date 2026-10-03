import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import { fmt, calcTaxBreakdown, EOBI_EMPLOYEE, EOBI_EMPLOYER, EOBI_WAGE_BASE } from "../../utils/taxUtils";

const META = ROUTE_META["/blog/salary-deduction-breakdown"];

// Worked examples use the same rules as the Salary Calculator: basic salary is
// two-thirds of gross, medical allowance is 10% of basic (fully tax-free), PF
// is 8.33% of basic, EOBI is the flat employee share.
function buildExample(gross) {
  const basic = Math.round(gross * (2 / 3));
  const medical = Math.round(basic * 0.1);
  const taxable = gross - medical;
  const monthlyTax = calcTaxBreakdown(taxable * 12, true).total / 12;
  const pf = basic * 0.0833;
  const total = monthlyTax + EOBI_EMPLOYEE + pf;
  return { gross, basic, medical, monthlyTax, eobi: EOBI_EMPLOYEE, pf, total, net: gross - total };
}

const examples = [100000, 200000, 400000].map((g) => ({ label: `${fmt(g)} / month`, data: buildExample(g) }));

const faqs = [
  {
    q: "Why is my take-home pay lower than the salary in my offer letter?",
    a: "Offer letters usually quote gross salary. Income tax, your EOBI share and your provident fund contribution come out before pay reaches your account. At Rs 100,000 a month total deductions are small (around 6–7% with provident fund); at Rs 400,000 a month income tax alone takes around 14% of gross.",
  },
  {
    q: "Which deductions apply to every salaried employee?",
    a: "Income tax applies once your taxable salary is above Rs 50,000 a month. EOBI applies to most employees of registered private-sector establishments. Provident fund depends on your employer's fund rules. Provincial social security (PESSI, SESSI) is paid by the employer and isn't normally deducted from your pay.",
  },
  {
    q: "Does provident fund reduce my income tax?",
    a: "No. Your own provident fund contribution is paid out of taxable salary. The employer's contribution to a recognised fund is generally exempt up to a limit, and the fund is paid back to you with profit when you leave or retire.",
  },
];

export default function SalaryDeductionBreakdown() {
  return (
    <ArticleLayout
      badge="Payslip · Tax Year 2027"
      title="Salary Deductions in Pakistan 2026-27: Tax, EOBI and Provident Fund"
      intro="What comes off a Pakistani payslip, why, and how much — with full worked examples at three salary levels."
      updated={META.updated}
      appliesTo="Salaries paid from July 2026 to June 2027"
      sources={[
        { label: "Finance Act 2026 — salaried income tax rates" },
        { label: "Employees' Old-Age Benefits Institution (EOBI)", url: "https://www.eobi.gov.pk" },
        { label: "Income Tax Ordinance 2001, Second Schedule (medical allowance exemption)" },
      ]}
      related={[
        { to: "/salary", label: "Salary tax and take-home calculator" },
        { to: "/blog/salary-tax-guide", label: "Monthly salary tax table" },
        { to: "/blog/income-tax-slabs-2026", label: "Income tax slabs 2026-27" },
        { to: "/blog/zakat-on-provident-fund-eobi", label: "Is Zakat due on provident fund?" },
      ]}
    >
      <Callout>
        <strong>In short:</strong> a typical Pakistani payslip has three deductions — income tax (by far the
        largest above Rs 150,000 a month), a flat EOBI contribution of Rs {EOBI_EMPLOYEE.toLocaleString("en-PK")}{" "}
        and, if your employer runs one, provident fund of around 8.33% of basic salary.
      </Callout>

      <h2>Worked examples</h2>
      <p>
        Assumptions: basic salary is two-thirds of gross (a common split), medical allowance is 10% of basic
        and fully tax-free, provident fund is 8.33% of basic, and EOBI applies.
      </p>
      <div className="table-wrap">
        <table className="slab-table">
          <thead>
            <tr><th>Component</th>{examples.map(ex => <th key={ex.label}>{ex.label}</th>)}</tr>
          </thead>
          <tbody>
            <tr><td>Gross salary</td>{examples.map(ex => <td key={ex.label}>{fmt(ex.data.gross)}</td>)}</tr>
            <tr><td>of which basic</td>{examples.map(ex => <td key={ex.label}>{fmt(ex.data.basic)}</td>)}</tr>
            <tr><td>Income tax</td>{examples.map(ex => <td key={ex.label}>- {fmt(ex.data.monthlyTax)}</td>)}</tr>
            <tr><td>EOBI (employee)</td>{examples.map(ex => <td key={ex.label}>- {fmt(ex.data.eobi)}</td>)}</tr>
            <tr><td>Provident fund (8.33% of basic)</td>{examples.map(ex => <td key={ex.label}>- {fmt(ex.data.pf)}</td>)}</tr>
            <tr className="active-slab"><td><strong>Take-home</strong></td>{examples.map(ex => <td key={ex.label}><strong>{fmt(ex.data.net)}</strong></td>)}</tr>
            <tr><td>Deductions as % of gross</td>{examples.map(ex => <td key={ex.label}>{((ex.data.total / ex.data.gross) * 100).toFixed(1)}%</td>)}</tr>
          </tbody>
        </table>
      </div>
      <p>
        Your own split of basic and allowances will differ — enter your payslip figures in the{" "}
        <Link to="/salary">salary calculator</Link> for an exact result.
      </p>

      <h2>What each deduction is</h2>
      <h3>Income tax</h3>
      <p>
        Your employer works out your yearly tax from the <Link to="/blog/income-tax-slabs-2026">2026-27
        salaried slabs</Link> and deducts one-twelfth each month (Section 149). It is the only deduction that
        grows quickly with salary. Medical allowance up to 10% of basic is tax-free, which is why the split
        between basic and allowances matters.
      </p>
      <h3>EOBI</h3>
      <p>
        The Employees' Old-Age Benefits Institution runs a pension scheme for private-sector workers.
        Contributions are worked out on the minimum wage, not your actual pay: 1% from you
        (Rs {EOBI_EMPLOYEE.toLocaleString("en-PK")} a month on a Rs {EOBI_WAGE_BASE.toLocaleString("en-PK")} minimum
        wage) and 5% from your employer (Rs {EOBI_EMPLOYER.toLocaleString("en-PK")}). The amount changes when
        the minimum wage is revised.
      </p>
      <h3>Provident fund</h3>
      <p>
        Provident fund isn't required by law for most private employers. Where it exists, the fund rules set
        the contribution — commonly 8.33% or 10% of basic salary from you, matched by the employer. It is your
        savings, paid out with profit when you leave or retire.
      </p>
      <h3>Provincial social security</h3>
      <p>
        PESSI (Punjab), SESSI (Sindh) and similar provincial schemes provide medical and injury benefits to
        covered workers. Contributions are paid by the employer and are not normally deducted from your salary.
      </p>

      <FaqSection faqs={faqs} title="Payslip questions" />
    </ArticleLayout>
  );
}
