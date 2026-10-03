import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import { fmt, calcWht } from "../../utils/taxUtils";

const META = ROUTE_META["/blog/wht-cash-withdrawal-2026"];
const AMOUNTS = [50000, 76000, 150000, 500000, 1000000];

const faqs = [
  {
    q: "What is the tax on cash withdrawal for non-filers in 2026?",
    a: "0.8% under Section 231AB, charged when the total cash a non-filer withdraws in a day exceeds Rs 50,000. Filers on the Active Taxpayers List pay nothing.",
  },
  {
    q: "Is the 0.8% charged on the whole amount or only above Rs 50,000?",
    a: "On the whole amount. Once the day's total goes above Rs 50,000, the bank deducts 0.8% of the full total — for example Rs 608 on Rs 76,000.",
  },
  {
    q: "Is the Rs 50,000 limit per transaction or per day?",
    a: "Per day. Withdrawals are added together across ATM, cheque and counter transactions on the same day, so splitting a withdrawal doesn't avoid the tax.",
  },
  {
    q: "Can I get the cash withdrawal tax back?",
    a: "Yes, it is an advance tax. If you file your income tax return, the amount shown on your bank's withholding certificate is adjusted against your yearly tax, and refunded if it exceeds what you owe.",
  },
];

export default function WhtCashWithdrawal2026() {
  return (
    <ArticleLayout
      badge="Banking Tax · Section 231AB"
      title="Tax on Cash Withdrawal in Pakistan (2026): 0.8% for Non-Filers"
      intro="Non-filers pay 0.8% on the whole amount when cash withdrawn in a day exceeds Rs 50,000. Filers pay nothing."
      updated={META.updated}
      appliesTo="Tax Year 2027"
      sources={[
        { label: "Income Tax Ordinance 2001, Section 231AB and First Schedule (Finance Act 2026)" },
        { label: "Federal Board of Revenue (FBR)", url: "https://www.fbr.gov.pk" },
      ]}
      related={[
        { to: "/blog/filer-vs-non-filer", label: "Filer vs non-filer: all rates" },
        { to: "/withholding-tax", label: "Withholding tax calculator" },
        { to: "/blog/become-filer", label: "How to become a filer" },
      ]}
    >
      <Callout>
        <strong>The rule:</strong> if you're not on the Active Taxpayers List and your cash withdrawals in one day
        add up to more than Rs 50,000, the bank deducts <strong>0.8% of the full amount</strong>. Filers: 0%.
      </Callout>

      <h2>How much is deducted</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Cash withdrawn in a day</th><th>Filer</th><th>Non-filer</th></tr></thead>
          <tbody>
            {AMOUNTS.map((a) => (
              <tr key={a}><td>{fmt(a)}</td><td>Rs 0</td><td>{fmt(calcWht("cash_withdrawal", a, false).wht)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>At exactly Rs 50,000 there is no tax — the limit has to be exceeded.</p>

      <h2>Worked example</h2>
      <p>
        A non-filer withdraws Rs 30,000 from an ATM in the morning and Rs 120,000 over the counter in the
        afternoon. The day's total is Rs 150,000, which exceeds Rs 50,000, so the bank deducts 0.8% × 150,000 ={" "}
        <strong>Rs 1,200</strong>. A filer withdrawing the same amounts pays nothing.
      </p>

      <h2>Who doesn't pay</h2>
      <ul>
        <li>People on the Active Taxpayers List.</li>
        <li>Federal and provincial governments, and foreign diplomats and missions.</li>
        <li>Anyone holding an exemption certificate from the Commissioner.</li>
      </ul>

      <h2>Can it be claimed back?</h2>
      <p>
        Yes. Tax under Section 231AB is an advance tax. Banks issue a withholding certificate; enter the amount
        in your return and it reduces the tax you owe. This is one more reason to{" "}
        <Link to="/blog/become-filer">become a filer</Link> — you stop paying it in future and recover what was
        deducted.
      </p>

      <FaqSection faqs={faqs} title="Cash withdrawal tax questions" />
    </ArticleLayout>
  );
}
