import React from "react";
import { Helmet } from "react-helmet-async";

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

export default function ZakatOnProvidentFundEobi({ navigate }) {
  const pageUrl = "https://pktaxcalc.com/blog/zakat-on-provident-fund-eobi";

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
        name: "Is Provident Fund or EOBI Money Subject to Zakat? | Pakistan Guide",
        description:
          "Whether locked-in retirement savings like Provident Fund and EOBI count toward your Zakat calculation in Pakistan, and when they become Zakatable after withdrawal.",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://pktaxcalc.com" },
            { "@type": "ListItem", position: 2, name: "Guides", item: "https://pktaxcalc.com/blogs" },
            { "@type": "ListItem", position: 3, name: "Zakat on Provident Fund & EOBI", item: pageUrl }
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
        <title>Is Provident Fund or EOBI Money Subject to Zakat?</title>
        <meta
          name="description"
          content="Whether locked-in retirement savings like Provident Fund and EOBI count toward your Zakat in Pakistan, and when they become Zakatable after withdrawal."
        />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:title" content="Is Provident Fund or EOBI Money Subject to Zakat?" />
        <meta
          property="og:description"
          content="A practical guide to whether retirement savings like PF and EOBI count in your Zakat calculation, and when that changes."
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
        <span>Zakat on Provident Fund & EOBI</span>
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
            <a href="/zakat" onClick={go("/zakat")}>
              <strong>Zakat Calculator</strong>
            </a>{" "}
            to combine it with your other cash, gold, and savings. If you're still contributing and
            want to see how PF affects your monthly take-home pay, the{" "}
            <a href="/salary" onClick={go("/salary")}>
              <strong>Salary Calculator</strong>
            </a>{" "}
            breaks that down too.
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
              <a href="/blog/zakat-guide" onClick={go("/blog/zakat-guide")}>
                Zakat on Gold, Cash &amp; Savings
              </a>
            </li>
            <li>
              <a href="/blog/salary-deduction-breakdown" onClick={go("/blog/salary-deduction-breakdown")}>
                Salary Breakdown: Tax + EOBI + PF + SESSI
              </a>
            </li>
            <li>
              <a href="/blog/salary-tax-guide" onClick={go("/blog/salary-tax-guide")}>
                How to Calculate Salary Tax in Pakistan
              </a>
            </li>
          </ul>
        </div>

        <p className="reviewed-note" style={{ marginTop: 20, fontSize: "0.85rem", opacity: 0.7 }}>
          Last reviewed: July 2026. This article explains general reasoning commonly used by
          Hanafi-school scholars on retirement savings and Zakat — individual Provident Fund trust
          structures and personal circumstances vary. It is educational content, not a religious
          ruling; consult a qualified Islamic scholar or your local Darul Ifta for guidance specific
          to your situation.
        </p>
      </div>
    </>
  );
}