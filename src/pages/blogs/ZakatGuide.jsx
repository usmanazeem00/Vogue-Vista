import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import { fmt, SILVER_RATE_PER_TOLA, METAL_RATES_DATE } from "../../utils/taxUtils";

const META = ROUTE_META["/blog/zakat-guide"];
const silverNisab = 52.5 * SILVER_RATE_PER_TOLA;

const faqs = [
  {
    q: "When should I pay Zakat?",
    a: "Zakat is due once a full lunar year (hawl) has passed since your wealth first reached Nisab. Most people fix one Islamic date each year — often in Ramadan — and calculate their wealth on that date.",
  },
  {
    q: "Is Zakat due on money saved for Hajj, a house or a wedding?",
    a: "Yes. Savings are Zakatable whatever you plan to use them for, as long as you still own them on your Zakat date.",
  },
  {
    q: "Is Zakat due on shares and mutual funds?",
    a: "Shares bought to sell are Zakatable on their full market value. For long-term holdings many scholars allow Zakat on your share of the company's Zakatable assets instead; if you don't know that figure, paying on market value is the cautious approach. Mutual fund units are usually valued at their redemption price.",
  },
  {
    q: "Can I pay Zakat to my relatives?",
    a: "You can pay Zakat to eligible relatives in need, such as siblings, but not to your parents, grandparents, children or grandchildren, or (in the Hanafi view) your spouse, because you are already responsible for supporting them.",
  },
  {
    q: "Does the bank's Zakat deduction count?",
    a: "Yes. The 2.5% that banks deduct from savings accounts on 1 Ramadan counts as Zakat on that balance. Subtract it from the total you calculate so you don't pay twice on the same money.",
  },
];

export default function ZakatGuide() {
  return (
    <ArticleLayout
      badge="Zakat Guide"
      title="How to Calculate Zakat in Pakistan: Step by Step"
      intro="Which assets count, which don't, how to deduct debts, and a full worked example in rupees — following the approach most widely used in Pakistan."
      updated={META.updated}
      sources={[
        { label: "Nisab weights: 87.48 g gold (7.5 tola), 612.36 g silver (52.5 tola)" },
        { label: `Silver rate: Karachi Sarafa benchmark, ${METAL_RATES_DATE}` },
        { label: "Zakat and Ushr Ordinance 1980 (bank deduction and CZ-50 declaration)" },
      ]}
      related={[
        { to: "/zakat", label: "Zakat calculator" },
        { to: "/blog/zakat-nisab", label: "Zakat Nisab 2026 in rupees" },
        { to: "/gold-zakat", label: "Gold Zakat calculator" },
        { to: "/blog/zakat-on-provident-fund-eobi", label: "Zakat on provident fund and EOBI" },
      ]}
    >
      <Callout>
        <strong>In short:</strong> on your Zakat date, add up your cash, bank balances, gold, silver, shares and
        business stock, subtract debts payable now, and if the total is at or above Nisab (about{" "}
        {fmt(silverNisab)} using silver as of {METAL_RATES_DATE}), pay 2.5% of it.
      </Callout>

      <h2>Step 1: Pick your Zakat date</h2>
      <p>
        Zakat becomes due when your wealth has stayed at or above Nisab for one lunar year. In practice, choose
        the Islamic date on which you first had Nisab — or a fixed date such as 1 Ramadan — and calculate on
        that date every year.
      </p>

      <h2>Step 2: Add up what is Zakatable</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Include</th><th>Value at</th></tr></thead>
          <tbody>
            <tr><td>Cash at home and in wallets (including foreign currency)</td><td>Amount held</td></tr>
            <tr><td>Bank balances — current, savings, term deposits</td><td>Balance on your Zakat date</td></tr>
            <tr><td>Gold and silver, including jewellery (Hanafi view)</td><td>Today's selling price</td></tr>
            <tr><td>Shares, mutual funds, savings certificates, prize bonds</td><td>Market / encashment value</td></tr>
            <tr><td>Business stock held for sale</td><td>Current sale value</td></tr>
            <tr><td>Money lent that you expect to get back</td><td>Amount owed</td></tr>
            <tr><td>Committee (BC) contributions paid in, not yet received</td><td>Amount paid in</td></tr>
          </tbody>
        </table>
      </div>

      <h2>Step 3: Leave out what isn't Zakatable</h2>
      <ul>
        <li>Your home, and property you live in or rent out (rent you've saved is counted as cash).</li>
        <li>Personal car, furniture, clothes and household items.</li>
        <li>Tools, machinery and equipment used in your business.</li>
        <li>Plots bought to live on or with no intention to sell. A plot bought to resell is business stock and is Zakatable.</li>
      </ul>

      <h2>Step 4: Subtract debts due now</h2>
      <p>
        Deduct money you must pay soon: this month's loan instalment, unpaid bills, rent due, or money owed to
        suppliers. For long-term loans such as a house loan, most scholars allow you to deduct only the
        instalments currently due, not the whole outstanding balance.
      </p>

      <h2>Step 5: Compare with Nisab and pay 2.5%</h2>
      <p className="formula">Zakat = (Zakatable assets − debts due now) × 2.5%</p>
      <p>
        If the net figure is below Nisab, no Zakat is due. Most scholars in Pakistan advise using the silver
        Nisab when your wealth is a mix of assets; the <Link to="/blog/zakat-nisab">Nisab guide</Link> explains
        the difference.
      </p>

      <h2>Worked example</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Item</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Cash at home</td><td>Rs 80,000</td></tr>
            <tr><td>Savings account</td><td>Rs 650,000</td></tr>
            <tr><td>Gold jewellery (jeweller's buying price)</td><td>Rs 1,200,000</td></tr>
            <tr><td>Shares (market value)</td><td>Rs 300,000</td></tr>
            <tr><td>Money lent to a cousin, expected back</td><td>Rs 100,000</td></tr>
            <tr><td><strong>Total Zakatable assets</strong></td><td><strong>Rs 2,330,000</strong></td></tr>
            <tr><td>Less: car loan instalment and bills due this month</td><td>− Rs 130,000</td></tr>
            <tr><td><strong>Net Zakatable wealth</strong></td><td><strong>Rs 2,200,000</strong></td></tr>
            <tr className="active-slab"><td><strong>Zakat at 2.5%</strong></td><td><strong>Rs 55,000</strong></td></tr>
          </tbody>
        </table>
      </div>
      <p>
        If the bank deducted Rs 16,250 Zakat from the savings account on 1 Ramadan (2.5% of Rs 650,000), the
        remaining Zakat to pay would be Rs 38,750. Try your own figures in the{" "}
        <Link to="/zakat">Zakat calculator</Link>.
      </p>

      <h2>Compulsory Zakat deduction by banks</h2>
      <p>
        Under the Zakat and Ushr Ordinance, banks deduct 2.5% Zakat on 1 Ramadan from savings and profit-bearing
        accounts whose balance is at or above the Nisab amount notified by the government. Current accounts are
        not subject to this deduction. If you prefer to pay Zakat yourself, or follow a school of thought that
        differs, you can submit a Zakat declaration (form CZ-50) to your bank before Ramadan.
      </p>

      <h2>Gold jewellery: scholarly views</h2>
      <p>
        The Hanafi school, followed by most Muslims in Pakistan, treats all gold and silver — including jewellery
        worn regularly — as Zakatable. The Shafi'i, Maliki and Hanbali schools generally exempt jewellery for
        normal personal use. Follow the scholar you rely on; the{" "}
        <Link to="/gold-zakat">gold Zakat calculator</Link> handles purity and tola conversions.
      </p>

      <FaqSection faqs={faqs} title="Zakat questions" />
    </ArticleLayout>
  );
}
