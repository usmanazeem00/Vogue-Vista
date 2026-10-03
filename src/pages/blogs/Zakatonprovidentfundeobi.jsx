import React from "react";
import { Link } from "../../lib/nav";
import { FaqSection, ReviewNote } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";

const faqs = [
  {
    q: "Is my Provident Fund balance Zakatable while I'm still employed?",
    a: "Most scholars treat Provident Fund as not currently Zakatable while it remains locked with your employer and you cannot access or control it — ownership without the ability to use the wealth is generally excluded from the Zakat calculation until you actually receive it."
  },
  {
    q: "What happens when I withdraw my Provident Fund at retirement or resignation?",
    a: "Once withdrawn and in your possession, the amount becomes ordinary cash savings like any other Zakatable asset. From that point, it's counted in your Zakat calculation alongside your other cash and savings, and Zakat becomes due on it once a full lunar year has passed since you gained control of it."
  },
  {
    q: "Is EOBI pension money subject to Zakat?",
    a: "The same principle applies: EOBI contributions sit with the institution and aren't accessible to you until you begin receiving your pension. Before that point, most scholars would exclude it from your Zakat calculation. Once pension payments start reaching your account, those amounts are treated as regular income and become part of your Zakatable cash once received and held for a lunar year."
  },
  {
    q: "Does the employer's matching contribution to Provident Fund count as my wealth for Zakat?",
    a: "Only the portion you actually own and can eventually claim matters, and that's determined by your Provident Fund trust deed or company policy — some schemes vest the employer's contribution over time. Until you have an unconditional right to withdraw an amount, it isn't part of your Zakatable wealth."
  },
  {
    q: "Should I ask a scholar before deciding?",
    a: "Yes. This article explains the general Hanafi-school reasoning that most retirement funds use, but individual PF trust structures, vesting schedules, and personal circumstances vary. For a specific ruling on your own situation, consult a qualified Islamic scholar or your local Darul Ifta."
  }
];

export default function ZakatOnProvidentFundEobi() {



  return (
    <>


      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Zakat · Retirement Savings</div>
          <h1>Is Provident Fund or EOBI Money Subject to Zakat?</h1>
          <p>
            Most Zakat guides cover gold, silver, and cash. Here's the question they skip: what
            about retirement money sitting in Provident Fund or EOBI that you can't touch yet?
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>The Short Answer</h2>
          <p>
            While your Provident Fund or EOBI contributions remain locked away and inaccessible to
            you — meaning you can't withdraw or use the money — most scholars exclude it from your
            Zakat calculation. Zakat is due on wealth you actually own and have the ability to
            control, not on entitlements you'll only receive in the future. Once you withdraw the
            funds and they're in your possession, that changes.
          </p>
        </div>

        <div className="calc-card">
          <h2>Why Ownership and Control Both Matter</h2>
          <p>
            Islamic scholars generally require two conditions before Zakat applies to an asset:
            you must own it, and you must have the practical ability to access and use it. A
            Provident Fund balance technically belongs to you in the sense that it will eventually
            be paid out, but for as long as it's held by your employer's trust and you can't
            withdraw it on demand, it doesn't meet the "accessible wealth" standard most Hanafi
            scholars apply — the same reasoning used for other locked-in or restricted assets like
            unpaid salary or unrecoverable debts.
          </p>
        </div>

        <div className="calc-card">
          <h2>What Changes at Withdrawal</h2>
          <p>
            The moment you receive your Provident Fund payout — whether at retirement, resignation,
            or an early withdrawal your company policy allows — the money becomes ordinary cash in
            your possession. From that point forward, it's treated exactly like any other savings:
            it counts toward your total Zakatable wealth, and Zakat becomes due on it once a full
            lunar year has passed while it (combined with your other Zakatable assets) remains at
            or above Nisab.
          </p>
          <p>
            EOBI follows the same logic. Contributions sitting with EOBI aren't accessible to you
            before retirement, so they're generally excluded beforehand. Once your monthly pension
            payments start arriving in your account, each payment becomes part of your regular cash
            balance and is treated like any other income for Zakat purposes going forward.
          </p>
        </div>

        <div className="calc-card">
          <h2>A Practical Example</h2>
          <p>
            Suppose you retire and receive a lump-sum Provident Fund payout of Rs 2,000,000. Before
            withdrawal, that amount wasn't part of your Zakat calculation. After withdrawal, if you
            keep it in savings, it's added to your other cash and assets — if your combined
            Zakatable wealth is at or above the Nisab threshold and a lunar year passes while it
            stays there, 2.5% of the total (including this amount) becomes due, not just 2.5% of
            the Provident Fund payout in isolation.
          </p>
        </div>

        <div className="calc-card">
          <h2>Check Your Own Numbers</h2>
          <p>
            If you've recently received a Provident Fund or EOBI payout and want to see how it
            affects what you owe, use our{" "}
            <Link to="/zakat">
              <strong>Zakat Calculator</strong>
            </Link>{" "}
            to combine it with your other cash, gold, and savings. If you're still contributing and
            want to see how PF affects your monthly take-home pay, the{" "}
            <Link to="/salary">
              <strong>Salary Calculator</strong>
            </Link>{" "}
            breaks that down too.
          </p>
        </div>

        <div className="calc-card">
          <h2>Related Guides</h2>
          <ul className="related-links">
            <li><Link to="/blog/zakat-guide">How to calculate Zakat step by step</Link></li>
            <li><Link to="/blog/zakat-nisab">Zakat Nisab 2026 in rupees</Link></li>
            <li><Link to="/blog/salary-deduction-breakdown">Salary deductions: tax, EOBI and provident fund</Link></li>
          </ul>
        </div>

        <ReviewNote updated={ROUTE_META["/blog/zakat-on-provident-fund-eobi"].updated}>
          This article explains reasoning commonly used by Hanafi scholars on retirement savings and Zakat.
          Provident fund trust rules and personal circumstances vary — it is educational content, not a
          religious ruling; consult a qualified scholar or Darul Ifta for your situation.
        </ReviewNote>
      </div>

      <FaqSection faqs={faqs} title="Provident fund and Zakat questions" />
    </>
  );
}