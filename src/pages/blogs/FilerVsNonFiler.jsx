import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import { fmt, WHT_CATEGORIES, calcWht } from "../../utils/taxUtils";

const META = ROUTE_META["/blog/filer-vs-non-filer"];
const pct = (r) => `${+(r * 100).toFixed(2)}%`;

const SHOWN = ["bank_profit", "dividend", "prize_bond", "lottery", "cash_withdrawal", "property_buy", "property_sell", "contract_individual", "mobile"];

const EXAMPLES = [
  { id: "bank_profit", amount: 150000, label: "Rs 150,000 yearly bank profit" },
  { id: "cash_withdrawal", amount: 200000, label: "Rs 200,000 cash withdrawn in a day" },
  { id: "property_buy", amount: 10000000, label: "Buying a Rs 1 crore house" },
  { id: "prize_bond", amount: 750000, label: "Rs 750,000 prize bond win" },
];

const faqs = [
  {
    q: "What is the difference between a filer and a non-filer?",
    a: "A filer is someone whose name is on FBR's Active Taxpayers List (ATL) because they filed the latest income tax return on time (or paid the surcharge after filing late). Everyone else is a non-filer and pays higher withholding tax on most transactions.",
  },
  {
    q: "How much more tax does a non-filer pay?",
    a: "Usually double: 30% instead of 15% on bank profit and dividends, 30% instead of 15% on prize bonds. Some gaps are much wider — 10.5% instead of 1.25% when buying property, and 0.8% on cash withdrawals that filers don't pay at all.",
  },
  {
    q: "Is salary tax higher for non-filers?",
    a: "No. Tax deducted from salary uses the same slabs for everyone. But a salaried non-filer still pays the higher rates on their bank profit, property and other transactions.",
  },
  {
    q: "Can a non-filer buy property or a car?",
    a: "The Finance Act 2026 restricts non-filers from buying property above set values and keeps much higher advance tax on vehicle registration. In practice, anyone planning a large purchase should file a return first.",
  },
];

export default function FilerVsNonFiler() {
  return (
    <ArticleLayout
      badge="Filer Status · Tax Year 2027"
      title="Filer vs Non-Filer Tax Rates in Pakistan (2026-27)"
      intro="Being a filer isn't about how much tax you owe — it's whether your name is on FBR's Active Taxpayers List. Here is what that changes, in percentages and in rupees."
      updated={META.updated}
      appliesTo="Tax Year 2027 (July 2026 – June 2027)"
      sources={[
        { label: "Income Tax Ordinance 2001 — First and Tenth Schedules (Finance Act 2026)" },
        { label: "FBR Active Taxpayers List", url: "https://www.fbr.gov.pk" },
      ]}
      related={[
        { to: "/blog/become-filer", label: "How to become a filer" },
        { to: "/withholding-tax", label: "Withholding tax calculator" },
        { to: "/blog/wht-cash-withdrawal-2026", label: "Cash withdrawal tax (231AB)" },
        { to: "/blog/vehicle-token-tax-2026", label: "Vehicle token tax" },
        { to: "/blog/late-filing-penalties-2026", label: "Late filing penalty and ATL surcharge" },
      ]}
    >
      <Callout>
        <strong>In short:</strong> non-filers pay roughly double withholding tax on most income and transactions,
        and far more on property. Filing even a simple return each year usually saves more than it costs.
      </Callout>

      <h2>What makes you a filer</h2>
      <p>
        You are a filer when your name appears on the Active Taxpayers List (ATL). That happens when you file your
        income tax return for the latest tax year by the due date. Even a return with income below the taxable
        limit puts you on the list. If you file late, you're added only after paying the ATL surcharge.
      </p>

      <h2>Rate comparison 2026-27</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Transaction</th><th>Section</th><th>Filer</th><th>Non-filer</th></tr></thead>
          <tbody>
            {WHT_CATEGORIES.filter((c) => SHOWN.includes(c.id)).map((c) => (
              <tr key={c.id}><td>{c.label}</td><td>{c.section}</td><td>{pct(c.filer)}</td><td>{pct(c.nonFiler)}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        Mobile: the 75% non-filer rate applies only to people FBR has listed in its Income Tax General Order for
        not filing. Property: the 10.5% non-filer buyer rate is for property under Rs 100 million.
      </p>

      <h2>What it costs in rupees</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Example</th><th>Filer pays</th><th>Non-filer pays</th><th>Difference</th></tr></thead>
          <tbody>
            {EXAMPLES.map((e) => {
              const f = calcWht(e.id, e.amount, true).wht;
              const n = calcWht(e.id, e.amount, false).wht;
              return <tr key={e.id}><td>{e.label}</td><td>{fmt(f)}</td><td>{fmt(n)}</td><td>{fmt(n - f)}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <p>
        Try your own amounts in the <Link to="/withholding-tax">withholding tax calculator</Link> or the{" "}
        <Link to="/bank-interest">bank profit calculator</Link>.
      </p>

      <h2>How to check your status</h2>
      <p>
        Send <strong>ATL &lt;space&gt; 13-digit CNIC</strong> to <strong>9966</strong>, or search your CNIC on
        FBR's ATL page. The list is updated every Monday.
      </p>

      <h2>Not on the list?</h2>
      <p>
        If you've never filed, follow our <Link to="/blog/become-filer">step-by-step filer guide</Link>. If you
        missed this year's deadline (15 October 2026 for Tax Year 2026), you can still file, but you'll need to
        pay the ATL surcharge — see <Link to="/blog/late-filing-penalties-2026">late filing penalties</Link>.
      </p>

      <FaqSection faqs={faqs} title="Filer status questions" />
    </ArticleLayout>
  );
}
