import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";
import {
  fmt, fmtPlain, GOLD_RATE_PER_TOLA, SILVER_RATE_PER_TOLA, METAL_RATES_DATE, TOLA_GRAMS,
} from "../../utils/taxUtils";

const META = ROUTE_META["/blog/zakat-nisab"];
const silverNisab = 52.5 * SILVER_RATE_PER_TOLA;
const goldNisab = 7.5 * GOLD_RATE_PER_TOLA;

const faqs = [
  {
    q: "What is the Nisab for Zakat in 2026 in Pakistan?",
    a: `Using Sarafa rates of ${METAL_RATES_DATE}: about ${fmt(silverNisab)} on the silver standard (52.5 tola) and about ${fmt(goldNisab)} on the gold standard (7.5 tola). The rupee value moves every day with metal prices.`,
  },
  {
    q: "Which Nisab should I use — gold or silver?",
    a: "If all your Zakatable wealth is gold, the gold Nisab applies. If you have cash, savings, business stock or a mix of assets, most scholars in Pakistan advise the silver Nisab, which is lower and means more Zakat reaches people in need.",
  },
  {
    q: "Is the Nisab the same as the amount banks use for Zakat deduction?",
    a: "Not necessarily. The government notifies a Nisab figure each year for compulsory Zakat deduction from bank accounts on 1 Ramadan, based on silver prices at the time. Your personal Nisab should use the price of silver or gold on your own Zakat date.",
  },
  {
    q: "What if my wealth drops below Nisab during the year?",
    a: "In the Hanafi view, what matters is that you have Nisab at the start and end of the lunar year; dips in between don't reset the year unless your Zakatable wealth falls to zero.",
  },
];

export default function ZakatNisab() {
  return (
    <ArticleLayout
      badge="Zakat · Nisab 2026"
      title="Zakat Nisab 2026 in Pakistan: Gold and Silver Nisab in Rupees"
      intro="Nisab is the minimum wealth on which Zakat becomes due. Here is what 7.5 tola of gold and 52.5 tola of silver are worth in rupees, which standard to use, and how to work it out on your Zakat date."
      updated={META.updated}
      sources={[
        { label: `Karachi Sarafa benchmark rates, ${METAL_RATES_DATE}: 24K gold Rs ${fmtPlain(GOLD_RATE_PER_TOLA)}/tola, silver Rs ${fmtPlain(SILVER_RATE_PER_TOLA)}/tola` },
        { label: "Nisab weights: 87.48 g gold and 612.36 g silver (1 tola = 11.664 g)" },
      ]}
      related={[
        { to: "/zakat", label: "Zakat calculator (enter today's rate)" },
        { to: "/silver-zakat", label: "Silver Zakat calculator" },
        { to: "/gold-zakat", label: "Gold Zakat calculator" },
        { to: "/blog/zakat-guide", label: "How to calculate Zakat step by step" },
      ]}
    >
      <Callout>
        <strong>Nisab on {METAL_RATES_DATE}:</strong> silver standard about <strong>{fmt(silverNisab)}</strong>{" "}
        (52.5 tola × Rs {fmtPlain(SILVER_RATE_PER_TOLA)}); gold standard about <strong>{fmt(goldNisab)}</strong>{" "}
        (7.5 tola × Rs {fmtPlain(GOLD_RATE_PER_TOLA)}). Recalculate with the rate on the day you pay.
      </Callout>

      <h2>Nisab by weight</h2>
      <div className="table-wrap">
        <table className="slab-table">
          <thead><tr><th>Standard</th><th>Tola</th><th>Grams</th><th>Value on {METAL_RATES_DATE}</th></tr></thead>
          <tbody>
            <tr><td>Silver</td><td>52.5</td><td>612.36 g</td><td>{fmt(silverNisab)}</td></tr>
            <tr><td>Gold</td><td>7.5</td><td>87.48 g</td><td>{fmt(goldNisab)}</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        Pakistani jewellers quote prices per tola (11.664 g) and per 10 grams. To convert a 10-gram price to a
        tola price, multiply by {(TOLA_GRAMS / 10).toFixed(4)}.
      </p>

      <h2>How to work out Nisab on your Zakat date</h2>
      <p className="formula">Silver Nisab = 52.5 × today's silver rate per tola</p>
      <p className="formula">Gold Nisab = 7.5 × today's 24K gold rate per tola</p>
      <p>
        Check the rate from your local Sarafa association or jeweller on the day. The{" "}
        <Link to="/zakat">Zakat calculator</Link> lets you type today's rates and recalculates both Nisab
        values for you.
      </p>

      <h2>Gold or silver: which Nisab applies?</h2>
      <ul>
        <li><strong>Only gold, nothing else Zakatable:</strong> use the gold Nisab (7.5 tola).</li>
        <li><strong>Only silver:</strong> use the silver Nisab (52.5 tola).</li>
        <li><strong>Cash, savings, business stock, or any mix:</strong> most scholars in Pakistan, following the Hanafi school, advise the silver Nisab. Because it is far lower, it brings more people into paying Zakat.</li>
      </ul>
      <p>
        The difference matters. Someone with Rs 600,000 in savings and nothing else is above the silver Nisab
        but well below the gold Nisab — under the silver standard they owe Rs 15,000 Zakat.
      </p>

      <h2>Why the rupee value changes</h2>
      <p>
        Nisab is fixed in weight, not money, so its rupee value follows the price of gold and silver. Gold has
        risen sharply in 2026, which has widened the gap between the two standards: the gold Nisab is now about{" "}
        {Math.round(goldNisab / silverNisab)} times the silver Nisab.
      </p>

      <FaqSection faqs={faqs} title="Nisab questions" />
    </ArticleLayout>
  );
}
