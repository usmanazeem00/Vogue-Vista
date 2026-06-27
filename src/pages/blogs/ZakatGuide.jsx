import React from "react";

export default function ZakatGuide() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Zakat Guide</div>
          <h1>Zakat on Gold, Cash and Savings</h1>
          <p>
            Learn how to calculate Zakat on your gold, cash, savings, and other
            assets according to Islamic principles.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>What is Zakat?</h2>

          <p>
            Zakat is one of the five pillars of Islam and is an annual
            obligation for eligible Muslims who possess wealth above a certain
            threshold known as the <strong>Nisab</strong>. It is a form of
            charity that helps support those in need and promotes the fair
            distribution of wealth within society.
          </p>

          <p>
            In most cases, the amount of Zakat payable is{" "}
            <strong>2.5% (1/40th)</strong> of your eligible wealth that has been
            in your possession for one lunar year.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Assets Subject to Zakat
          </h2>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Cash in hand and bank balances.</li>
            <li>Gold and silver jewellery.</li>
            <li>Business inventory and stock for sale.</li>
            <li>Investments and shares held for trading.</li>
            <li>Foreign currency and savings certificates.</li>
            <li>Money lent to others that is expected to be repaid.</li>
            <li>Profit from investments and savings accounts.</li>
          </ul>

          <h2 style={{ marginTop: 40 }}>
            Assets Generally Not Subject to Zakat
          </h2>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Your primary residence.</li>
            <li>Personal-use vehicles.</li>
            <li>Household furniture and appliances.</li>
            <li>Clothing and personal belongings.</li>
            <li>Tools and equipment used for work.</li>
          </ul>

          <h2 style={{ marginTop: 40 }}>
            Understanding Nisab
          </h2>

          <p>
            Nisab is the minimum amount of wealth a Muslim must possess before
            Zakat becomes obligatory. It is traditionally calculated based on
            the value of either:
          </p>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>87.48 grams of gold, or</li>
            <li>612.36 grams of silver.</li>
          </ul>

          <p>
            If your total Zakatable assets exceed the Nisab threshold for one
            lunar year, you are required to pay Zakat.
          </p>

          <h2 style={{ marginTop: 40 }}>
            How to Calculate Your Zakat
          </h2>

          <ol style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Add all your cash, savings, gold, silver, and investments.</li>
            <li>Include business inventory and receivable debts.</li>
            <li>Subtract any immediate liabilities or debts due.</li>
            <li>Multiply the remaining amount by 2.5%.</li>
          </ol>

          <p style={{ marginTop: 15 }}>
            <strong>Formula:</strong> Total Zakatable Assets − Liabilities ×
            2.5%
          </p>

          <h2 style={{ marginTop: 40 }}>
            Zakat on Gold and Silver
          </h2>

          <p>
            Gold and silver are among the most common assets on which Zakat is
            paid. The current market value of your gold and silver should be
            used when calculating Zakat rather than the price at which they were
            originally purchased.
          </p>

          <p>
            Whether your gold is in the form of jewellery, bars, or coins, it
            should generally be included in your Zakat calculation if it exceeds
            the Nisab threshold according to your preferred scholarly opinion.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Why Use a Zakat Calculator?
          </h2>

          <p>
            Calculating Zakat manually can become difficult when you have
            multiple bank accounts, investments, and different types of assets.
            A Zakat calculator helps you estimate your obligation quickly and
            accurately, ensuring that you fulfil this important religious duty
            with confidence.
          </p>

          <div
            style={{
              marginTop: 35,
              padding: "20px",
              background: "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <strong>Disclaimer:</strong> Zakat calculations may vary depending
            on individual circumstances and scholarly opinions. For specific
            religious guidance, please consult a qualified Islamic scholar or
            Mufti.
          </div>
        </div>
      </div>
    </>
  );
}