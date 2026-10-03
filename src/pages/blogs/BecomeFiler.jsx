import React from "react";
import { Link } from "../../lib/nav";
import { ArticleLayout, FaqSection, Callout } from "../../components/Content";
import { ROUTE_META } from "../../routeMeta";

const META = ROUTE_META["/blog/become-filer"];

const faqs = [
  {
    q: "How long does it take to become a filer?",
    a: "Registering on IRIS takes a few minutes once your mobile number and email are verified. After you file your return, your name is added to the Active Taxpayers List in FBR's next weekly update (published every Monday).",
  },
  {
    q: "Can I become a filer if my income is below Rs 600,000?",
    a: "Yes. You can file a return with income below the taxable limit — sometimes called a nil return — and still appear on the ATL, which gives you filer rates on withholding taxes.",
  },
  {
    q: "Is NTN the same as being a filer?",
    a: "No. Registering gives you an NTN (for individuals, your CNIC number), but you only become an active filer once you file the return for the latest tax year by the due date (or pay the ATL surcharge if you file late).",
  },
  {
    q: "How do I check my filer status?",
    a: "Send 'ATL' followed by a space and your 13-digit CNIC to 9966, or search your CNIC on FBR's Active Taxpayers List page online.",
  },
  {
    q: "Do I need a tax consultant to file?",
    a: "Not for a simple salaried return — many people file themselves on IRIS or the Tax Asaan app. A consultant is worth considering if you have business income, multiple properties, foreign income or a complicated wealth statement.",
  },
];

export default function BecomeFiler() {
  return (
    <ArticleLayout
      badge="Filer Guide · 2026"
      title="How to Become a Filer in Pakistan (2026)"
      intro="Register on FBR's IRIS portal, file your income tax return and get on the Active Taxpayers List — step by step, with what you need before you start."
      updated={META.updated}
      appliesTo="Tax Year 2026 returns (due 15 October 2026)"
      sources={[
        { label: "FBR IRIS portal", url: "https://iris.fbr.gov.pk" },
        { label: "FBR Active Taxpayers List", url: "https://www.fbr.gov.pk" },
        { label: "Income Tax Ordinance 2001, Sections 114, 181 and 182A" },
      ]}
      related={[
        { to: "/blog/tax-return-deadline", label: "Tax return last date 2026" },
        { to: "/blog/filer-vs-non-filer", label: "Filer vs non-filer: what you save" },
        { to: "/blog/late-filing-penalties-2026", label: "Late filing penalty and ATL surcharge" },
        { to: "/income-tax", label: "Income tax calculator" },
      ]}
    >
      <Callout>
        <strong>In short:</strong> a "filer" is anyone on FBR's Active Taxpayers List (ATL). To get there, register
        on IRIS with your CNIC, file your income tax return and wealth statement for the latest tax year, and
        your name is added in the next weekly ATL update.
      </Callout>

      <h2>What you need before you start</h2>
      <ul>
        <li>Your CNIC, and a mobile number and email address registered in your own name.</li>
        <li>Salary certificate / tax deduction certificate from your employer, if salaried.</li>
        <li>Bank statements and the tax deducted on bank profit (banks issue withholding certificates).</li>
        <li>Details of property, vehicles, investments, cash and loans on 30 June for the wealth statement.</li>
        <li>Tax paid elsewhere during the year — vehicle token tax, electricity and phone bills — which counts as advance tax.</li>
      </ul>

      <h2>Step 1: Register on IRIS</h2>
      <p>
        Go to <a href="https://iris.fbr.gov.pk" target="_blank" rel="noopener noreferrer">iris.fbr.gov.pk</a> and
        choose <em>Registration for unregistered person</em>. Enter your CNIC, mobile number and email; FBR sends
        verification codes to both. Your password and PIN arrive after verification. For individuals, the NTN is
        your CNIC number.
      </p>

      <h2>Step 2: Complete your profile</h2>
      <p>
        Add your address, employer or business details, and bank accounts. Salaried people can usually skip the
        business section.
      </p>

      <h2>Step 3: File the income tax return</h2>
      <p>
        Under <em>Declaration</em>, open the return for the tax year (the return due now is Tax Year 2026,
        covering July 2025 – June 2026). Enter your salary, other income, and the tax already deducted from you.
        IRIS works out the tax payable or refundable. If tax is due, generate a PSID and pay it through your
        bank's app before submitting.
      </p>

      <h2>Step 4: File the wealth statement</h2>
      <p>
        List your assets and liabilities as on 30 June and reconcile how your wealth changed during the year
        (income, expenses, gifts, loans). The wealth statement must be filed with the return.
      </p>

      <h2>Step 5: Check the Active Taxpayers List</h2>
      <p>
        FBR updates the ATL every Monday. Once your return is in, check by sending <strong>ATL &lt;space&gt;
        13-digit CNIC</strong> to <strong>9966</strong>. Banks and property registrars use this list to decide
        whether to charge you filer or non-filer rates.
      </p>

      <h2>What being a filer saves you</h2>
      <p>
        Non-filers pay double withholding tax on bank profit (30% instead of 15%), dividends and prize bonds,
        0.8% on cash withdrawals above Rs 50,000 a day, and much more on property purchases (10.5% instead of
        1.25%). The <Link to="/blog/filer-vs-non-filer">filer vs non-filer comparison</Link> has the full table,
        and the <Link to="/withholding-tax">withholding tax calculator</Link> shows the difference on your own
        amounts.
      </p>

      <h2>Staying a filer</h2>
      <p>
        ATL status is for one year. You must file every year by the deadline — 15 October 2026 for this year's
        return — to stay on it. Filing late means paying the ATL surcharge (Rs 25,000 for individuals) to be
        restored; see <Link to="/blog/late-filing-penalties-2026">late filing penalties</Link>.
      </p>

      <FaqSection faqs={faqs} title="Filer questions" />
    </ArticleLayout>
  );
}
