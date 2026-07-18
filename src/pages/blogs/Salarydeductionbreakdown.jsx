import React from "react";
import { Helmet } from "react-helmet-async";
import { fmt, calcIncomeTax } from "../../utils/taxUtils";

// Worked examples shown in the table below. EOBI/PF/SESSI logic mirrors the
// Salary Calculator page so the numbers stay consistent across the site.
function buildExample(gross, { pf = false, pfPercent = 8.33, sessi = false } = {}) {
  const eobiEmployee = Math.min(gross * 0.01, 370);
  const pfAmount = pf ? gross * (pfPercent / 100) : 0;
  const sessiEmployee = sessi ? gross * 0.01 : 0;
  // Assume no separate medical/conveyance split for these illustrative examples —
  // full gross is treated as taxable basic salary.
  const annualTax = calcIncomeTax(gross * 12, true);
  const monthlyTax = annualTax / 12;
  const totalDeductions = monthlyTax + eobiEmployee + pfAmount + sessiEmployee;
  const net = gross - totalDeductions;
  return { gross, monthlyTax, eobiEmployee, pfAmount, sessiEmployee, totalDeductions, net };
}

const examples = [
  { label: "Rs 100,000 / month", data: buildExample(100000, { pf: true, sessi: true }) },
  { label: "Rs 150,000 / month", data: buildExample(150000, { pf: true, sessi: true }) },
  { label: "Rs 300,000 / month", data: buildExample(300000, { pf: true, sessi: true }) },
];

const faqs = [
  { q: "Why is my take-home pay so much lower than my offered salary?",
    a: "The salary quoted in an offer letter is almost always the gross figure — before income tax, EOBI, Provident Fund, and social security are deducted. Depending on your income level and which optional deductions your employer runs, total deductions can range from roughly 3-4% at lower salaries to over 30% at higher salaries, mostly driven by income tax." },
  { q: "Do all four deductions (tax, EOBI, PF, SESSI) apply to every salaried employee?",
    a: "Income tax applies once your income exceeds the annual exemption threshold. EOBI is close to universal for formal-sector employees at registered establishments. Provident Fund depends entirely on your employer's own policy — it isn't a federal mandate. SESSI (Sindh) or PESSI (Punjab) applies if your employer is registered with the provincial social security institution." },
  { q: "Which deduction is usually the largest?",
    a: "For most salaried employees above roughly Rs 100,000/month, income tax is by far the largest deduction — EOBI is capped at Rs 370/month and SESSI/PESSI is roughly 1% of gross, while income tax scales up through FBR's slabs and can exceed 20-30% of gross at higher incomes." },
];

export default function SalaryDeductionBreakdown({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/salary-deduction-breakdown";

  const go = (path) => (e) => {
    e.preventDefault();
    navigate(path);
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageUrl,
        url: pageUrl,
        name: "Salary Breakdown Pakistan 2026-27 — Tax + EOBI + PF + SESSI Explained",
        description:
          "See exactly how much tax, EOBI, Provident Fund and SESSI/PESSI take out of a Pakistani salary in 2026-27, with worked examples at Rs 100,000, 150,000 and 300,000.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://pktaxcalc.com" },
            { "@type": "ListItem", position: 2, name: "Salary Deduction Breakdown", item: pageUrl }
          ]
        }
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map(f => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a }
        }))
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Salary Breakdown Pakistan 2026-27 — Tax + EOBI + PF + SESSI</title>
        <meta
          name="description"
          content="See exactly how tax, EOBI, Provident Fund and SESSI/PESSI combine to reduce a Pakistani salary in 2026-27, with worked examples at 3 income levels."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Salary Breakdown Pakistan 2026-27 — Tax + EOBI + PF + SESSI" />
        <meta
          property="og:description"
          content="Full worked examples showing every deduction that comes out of a Pakistani payslip in 2026-27, together in one table."
        />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <nav aria-label="Breadcrumb" className="breadcrumb-nav">
        <a href="/" onClick={go("/")}>Home</a>
        <span aria-hidden="true"> / </span>
        <a href="/blogs" onClick={go("/blogs")}>Guides</a>
        <span aria-hidden="true"> / </span>
        <span>Salary Deduction Breakdown</span>
      </nav>

      <style>{`
        .breadcrumb-nav {
          background: var(--brand-dark, #0e3b2c);
          padding: 10px 24px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.65);
        }
        .breadcrumb-nav a {
          color: rgba(255, 255, 255, 0.85);
          text-decoration: none;
        }
        .breadcrumb-nav a:hover {
          text-decoration: underline;
        }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">FY 2026-27 · Worked Examples</div>
          <h1>Salary Breakdown Pakistan 2026-27: Tax, EOBI, PF & SESSI Together</h1>
          <p>
            Most guides explain income tax, EOBI, and Provident Fund one at a time. Here's what
            happens when all four deductions hit the same payslip — with real numbers.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>Why Your Payslip Looks Smaller Than Your Offer Letter</h2>
          <p>
            A salary offer of Rs 150,000 a month rarely means Rs 150,000 lands in your account.
            Between income tax, EOBI, Provident Fund, and SESSI/PESSI, several separate deductions
            stack on top of each other — and most articles explain only one at a time, which makes
            it hard to see the full picture. Below are worked examples at three common salary
            levels, assuming EOBI, a 1% social security contribution, and an 8.33% Provident Fund
            are all active — adjust the assumptions in the calculator link below to match your own
            payslip.
          </p>
        </div>

        <div className="calc-card">
          <h2>Worked Examples: Full Deduction Breakdown</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="slab-table">
              <thead>
                <tr>
                  <th>Component</th>
                  {examples.map(ex => <th key={ex.label}>{ex.label}</th>)}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Gross Salary</td>
                  {examples.map(ex => <td key={ex.label}>{fmt(ex.data.gross)}</td>)}
                </tr>
                <tr>
                  <td style={{ color: "var(--red-600)" }}>Income Tax</td>
                  {examples.map(ex => <td key={ex.label} style={{ color: "var(--red-600)" }}>- {fmt(ex.data.monthlyTax)}</td>)}
                </tr>
                <tr>
                  <td>EOBI (Employee)</td>
                  {examples.map(ex => <td key={ex.label}>- {fmt(ex.data.eobiEmployee)}</td>)}
                </tr>
                <tr>
                  <td>Provident Fund (8.33%)</td>
                  {examples.map(ex => <td key={ex.label}>- {fmt(ex.data.pfAmount)}</td>)}
                </tr>
                <tr>
                  <td>Social Security (~1%)</td>
                  {examples.map(ex => <td key={ex.label}>- {fmt(ex.data.sessiEmployee)}</td>)}
                </tr>
                <tr className="active-slab">
                  <td><strong>Net Take-Home</strong></td>
                  {examples.map(ex => <td key={ex.label}><strong>{fmt(ex.data.net)}</strong></td>)}
                </tr>
              </tbody>
            </table>
          </div>
          <p className="hint" style={{ marginTop: 12 }}>
            Figures assume medical and conveyance allowances aren't split out separately — if your
            payslip breaks those out, your actual tax will usually be slightly lower.
          </p>
        </div>

        <div className="calc-card">
          <h2>What Each Deduction Actually Pays For</h2>
          <p>
            <strong>Income tax</strong> is the only deduction that scales sharply with income — it's
            calculated on FBR's progressive slabs for FY 2026-27 and is usually the single biggest
            line item once gross salary passes roughly Rs 100,000-150,000 a month.
          </p>
          <p>
            <strong>EOBI</strong> (Employees' Old-Age Benefits Institution) deducts 1% of wages from
            you, capped at Rs 370/month, funding a government pension you can draw at retirement —
            your employer adds a further 5%, capped at Rs 1,850/month, which doesn't come out of
            your pay.
          </p>
          <p>
            <strong>Provident Fund</strong> isn't set by law — it's a retirement savings benefit your
            employer chooses to offer, usually matching your own contribution of 5-12% of basic
            salary.
          </p>
          <p>
            <strong>SESSI/PESSI</strong> (provincial social security) deducts roughly 1% of gross
            salary in exchange for medical and injury benefit coverage, if your employer is
            registered with the scheme.
          </p>
        </div>

        <div className="calc-card">
          <h2>See Your Own Numbers</h2>
          <p>
            These examples use standard assumptions — your actual deductions depend on your specific
            allowances, employer's PF policy, and province. Use our{" "}
            <a href="/salary" onClick={go("/salary")}>
              <strong>Salary Calculator</strong>
            </a>{" "}
            to enter your exact gross salary, allowances, and which deductions apply to you, and get
            your precise take-home pay instantly.
          </p>
        </div>

        <div className="calc-card">
          <h2>FAQ</h2>
          {faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: 20 }} itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name" style={{ fontSize: "1.05rem" }}>{f.q}</h3>
              <p itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <span itemProp="text">{f.a}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          <ul className="related-links">
            <li>
              <a href="/blog/salary-tax-guide" onClick={go("/blog/salary-tax-guide")}>
                How to Calculate Salary Tax in Pakistan
              </a>
            </li>
            <li>
              <a href="/blog/income-tax-slabs-2026" onClick={go("/blog/income-tax-slabs-2026")}>
                Income Tax Slabs Pakistan FY 2026-27
              </a>
            </li>
            <li>
              <a href="/blog/become-filer" onClick={go("/blog/become-filer")}>
                How to Become a Filer in Pakistan
              </a>
            </li>
          </ul>
        </div>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: July 2026, against Finance Bill 2026, FBR's published slab tables, and
          current EOBI/PESSI/SESSI contribution rates. This article gives an estimate for planning
          purposes and isn't a substitute for professional payroll or tax advice.
        </p>
      </div>
    </>
  );
}