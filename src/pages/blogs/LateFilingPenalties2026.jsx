import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";

const META = ROUTE_META["/blog/late-filing-penalties-2026"];

const faqs = [
  {
    q: "What is the ATL surcharge in 2026?",
    a: "From 1 July 2026 the surcharge to be added to the Active Taxpayers List after filing late is Rs 25,000 for individuals, Rs 50,000 for AOPs and Rs 100,000 for companies — up from Rs 1,000, Rs 10,000 and Rs 20,000.",
  },
  {
    q: "What is the penalty for filing a tax return late?",
    a: "Section 182 sets a penalty of 0.1% of the tax payable for each day of default, subject to minimum and maximum amounts that depend on the type of taxpayer. The minimums have been changed by several recent Finance Acts, so check the current figure on IRIS or with a tax adviser before paying.",
  },
  {
    q: "I have no tax payable. Do I still pay a penalty?",
    a: "The daily penalty is a percentage of tax payable, but the minimum penalty can still apply, and you still need to pay the ATL surcharge to appear on the list.",
  },
  {
    q: "How far back can I file a late return?",
    a: "Returns for past tax years can still be filed on IRIS. The sooner you file, the less penalty builds up and the sooner you can restore filer rates.",
  },
];

export default function LateFilingPenalties2026() {
  return (
    <ArticleLayout
      badge="Penalties · 2026"
      title="Late Tax Return Penalty and ATL Surcharge in Pakistan (2026)"
      intro="Missed the deadline? What filing late costs, why the new Rs 25,000 ATL surcharge matters more than before, and how to get back on the Active Taxpayers List."
      updated={META.updated}
      appliesTo="Tax Year 2026 returns filed after 15 October 2026"
      sources={[
        { label: "Income Tax Ordinance 2001 — Section 182 (penalties) and Section 182A (late filers / ATL)" },
        { label: "Finance Act 2026 — revised ATL surcharge" },
        { label: "FBR IRIS portal", url: "https://iris.fbr.gov.pk" },
      ]}
      related={[
        { to: "/blog/tax-return-deadline", label: "Tax return last date 2026" },
        { to: "/blog/filer-vs-non-filer", label: "Filer vs non-filer rates" },
        { to: "/blog/become-filer", label: "How to file on IRIS" },
      ]}
    >
      <Callout tone="warning">
        <strong>Deadline:</strong> the Tax Year 2026 return deadline was extended to <strong>15 October 2026</strong>.
        File by then and none of the costs below apply.
      </Callout>

      <h2>The two costs of filing late</h2>
      <h3>1. ATL surcharge (Section 182A)</h3>
      <p>
        Filing late doesn't put you on the Active Taxpayers List by itself. To be added, you also pay a
        surcharge, which the Finance Act 2026 raised sharply from 1 July 2026:
      </p>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Taxpayer</th><th>Before</th><th>From 1 July 2026</th></tr></thead>
          <tbody>
            <tr><td>Individual</td><td>Rs 1,000</td><td><strong>Rs 25,000</strong></td></tr>
            <tr><td>Association of persons (AOP)</td><td>Rs 10,000</td><td><strong>Rs 50,000</strong></td></tr>
            <tr><td>Company</td><td>Rs 20,000</td><td><strong>Rs 100,000</strong></td></tr>
          </tbody>
        </table>
      </div>

      <h3>2. Late filing penalty (Section 182)</h3>
      <p>
        The penalty is 0.1% of tax payable for each day the return is late, with a minimum and maximum set in
        the law. The minimums are lower for salaried individuals with modest income than for other taxpayers.
        These figures have been changed several times recently, so confirm the exact amount on IRIS before you pay.
      </p>

      <h2>Why ATL status matters more than the fine</h2>
      <p>
        Until you're back on the list, you pay non-filer rates: 30% instead of 15% on{" "}
        <Link to="/bank-interest">bank profit</Link>, 0.8% on cash withdrawals above Rs 50,000 a day, and much
        higher advance tax on property and <Link to="/blog/vehicle-token-tax-2026">vehicles</Link>. For many
        people that costs more than the surcharge within a year.
      </p>

      <h2>How to fix it</h2>
      <ol>
        <li>File the overdue return and wealth statement on IRIS.</li>
        <li>Pay any tax due and the Section 182 penalty through a PSID.</li>
        <li>Generate and pay a separate PSID for the ATL surcharge.</li>
        <li>Check your status after FBR's next weekly ATL update (Mondays) by SMS: ATL &lt;space&gt; CNIC to 9966.</li>
      </ol>

      <FaqSection faqs={faqs} title="Late filing questions" />
    </ArticleLayout>
  );
}
