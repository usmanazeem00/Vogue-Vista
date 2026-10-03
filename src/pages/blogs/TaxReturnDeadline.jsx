import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";

const META = ROUTE_META["/blog/tax-return-deadline"];

const faqs = [
  {
    q: "What is the last date to file the income tax return for 2026?",
    a: "15 October 2026. FBR extended the original 30 September 2026 deadline for Tax Year 2026 returns of salaried and other individuals and associations of persons (AOPs). Companies with a 30 June year-end have until 31 December 2026.",
  },
  {
    q: "Which income does the 2026 return cover?",
    a: "Tax Year 2026 covers income earned from 1 July 2025 to 30 June 2026. It uses the 2025-26 slabs, not the new 2026-27 slabs.",
  },
  {
    q: "Will the deadline be extended again?",
    a: "There is no guarantee. FBR has refused extensions in some past years, so treat 15 October as final and file early — the IRIS portal is often slow in the last few days.",
  },
  {
    q: "What happens if I file after 15 October?",
    a: "You can still file, but you face a late-filing penalty under Section 182 and you won't appear on the Active Taxpayers List until you also pay the ATL surcharge — Rs 25,000 for individuals from Tax Year 2026 onward.",
  },
  {
    q: "Do I need to file if my employer already deducted tax?",
    a: "Yes, if your taxable income is above Rs 600,000 or you meet other filing conditions (for example owning a vehicle above 1000cc or property of a certain size). Filing also keeps you on the ATL, which lowers the withholding tax you pay on many transactions.",
  },
];

export default function TaxReturnDeadline() {
  return (
    <ArticleLayout
      badge="Deadline extended · Tax Year 2026"
      title="Tax Return Last Date 2026: Extended to 15 October"
      intro="FBR has moved the deadline for Tax Year 2026 income tax returns from 30 September to 15 October 2026 for individuals and AOPs."
      updated={META.updated}
      appliesTo="Returns for Tax Year 2026 (income from July 2025 to June 2026)"
      sources={[
        { label: "FBR Circular No. 3 of 2026-27 (30 September 2026), issued under Section 214A" },
        { label: "Radio Pakistan — FBR extends deadline for filing income tax return to 15 October", url: "https://www.radio.gov.pk/01-10-2026/fbr-extends-deadline-for-filing-income-tax-return-to-15th-oct" },
        { label: "Income Tax Ordinance 2001, Sections 118, 182 and 182A" },
        { label: "FBR IRIS portal", url: "https://iris.fbr.gov.pk" },
      ]}
      related={[
        { to: "/blog/become-filer", label: "How to file your return on IRIS and become a filer" },
        { to: "/blog/late-filing-penalties-2026", label: "Late filing penalty and Rs 25,000 ATL surcharge" },
        { to: "/blog/filer-vs-non-filer", label: "Filer vs non-filer: what you save" },
        { to: "/income-tax", label: "Income tax calculator (switch to 2025-26)" },
      ]}
    >
      <Callout>
        <strong>Last date: 15 October 2026</strong> for Tax Year 2026 returns of salaried people, other
        individuals and AOPs. Companies with a June year-end: 31 December 2026.
      </Callout>

      <h2>Key dates for Tax Year 2026</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Taxpayer</th><th>Original deadline</th><th>Current deadline</th></tr></thead>
          <tbody>
            <tr><td>Salaried individuals</td><td>30 September 2026</td><td><strong>15 October 2026</strong></td></tr>
            <tr><td>Other individuals (business, freelancers, landlords)</td><td>30 September 2026</td><td><strong>15 October 2026</strong></td></tr>
            <tr><td>Associations of persons (AOPs)</td><td>30 September 2026</td><td><strong>15 October 2026</strong></td></tr>
            <tr><td>Companies with 30 June year-end</td><td>31 December 2026</td><td>31 December 2026</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        FBR announced the extension on 30 September 2026 through Circular No. 3 of 2026-27, after requests from
        trade bodies and tax bar associations. It applies to everyone whose return was due on 30 September.
      </p>

      <h2>Which year's return is this?</h2>
      <p>
        The return due now is for <strong>Tax Year 2026</strong> — income earned between 1 July 2025 and
        30 June 2026. It uses the 2025-26 slabs (1%, 11%, 23%, 30% and 35% for salaried individuals). The new
        2026-27 slabs apply to next year's return, due in 2027. You can check last year's figure in the{" "}
        <Link to="/income-tax">income tax calculator</Link> by choosing 2025-26.
      </p>

      <h2>Who must file</h2>
      <ul>
        <li>Anyone whose taxable income for the year was above Rs 600,000.</li>
        <li>Anyone registered for income tax, or who owns a motor vehicle above 1000cc or immovable property above the prescribed size, among other conditions in Section 114.</li>
        <li>Anyone who wants to be on the Active Taxpayers List — even with income below the limit, filing gives you filer rates on bank profit, property and other transactions.</li>
      </ul>

      <h2>How to file before the deadline</h2>
      <ol>
        <li>Log in to <a href="https://iris.fbr.gov.pk" target="_blank" rel="noopener noreferrer">IRIS</a> with your CNIC and password (new users: register first — see our <Link to="/blog/become-filer">step-by-step guide</Link>).</li>
        <li>Open <em>Declaration → Income Tax Return</em> and choose the return for Tax Year 2026.</li>
        <li>Enter your salary and tax deducted (from your employer's certificate), other income, and tax already paid on bank profit, vehicles, phone bills and so on.</li>
        <li>Complete the wealth statement: assets and liabilities on 30 June 2026 and the reconciliation of your wealth.</li>
        <li>Pay any tax due through a PSID, then submit the return and the wealth statement.</li>
      </ol>

      <h2>If you miss 15 October</h2>
      <p>
        Late returns attract a penalty under Section 182, and you won't appear on the Active Taxpayers List until
        you pay the ATL surcharge — raised to <strong>Rs 25,000 for individuals</strong> (Rs 50,000 for AOPs,
        Rs 100,000 for companies) by the Finance Act 2026. Our{" "}
        <Link to="/blog/late-filing-penalties-2026">late filing guide</Link> explains the costs and steps.
      </p>

      <FaqSection faqs={faqs} title="Deadline questions" />
    </ArticleLayout>
  );
}
