import React from "react";
import { Link } from "../lib/nav";

const columns = [
  {
    title: "Tax Calculators",
    links: [
      ["/income-tax", "Income Tax Calculator"],
      ["/salary", "Salary Tax Calculator"],
      ["/freelancer-tax", "Freelancer Tax"],
      ["/withholding-tax", "Withholding Tax"],
      ["/bank-interest", "Bank Profit"],
      ["/prize-bond-tax", "Prize Bond Tax"],
      ["/sim-load-tax", "Mobile Load Tax"],
    ],
  },
  {
    title: "Zakat",
    links: [
      ["/zakat", "Zakat Calculator"],
      ["/gold-zakat", "Gold Zakat"],
      ["/silver-zakat", "Silver Zakat"],
      ["/blog/zakat-nisab", "Zakat Nisab 2026"],
      ["/blog/zakat-guide", "How to Calculate Zakat"],
    ],
  },
  {
    title: "Tax Guides",
    links: [
      ["/blog/income-tax-slabs-2026", "Income Tax Slabs 2026-27"],
      ["/blog/salary-tax-guide", "Tax on Salary Table"],
      ["/blog/tax-return-deadline", "Tax Return Last Date"],
      ["/blog/become-filer", "How to Become a Filer"],
      ["/blog/filer-vs-non-filer", "Filer vs Non-Filer"],
      ["/blogs", "All Guides"],
    ],
  },
  {
    title: "About",
    links: [
      ["/about", "About Us"],
      ["/contact", "Contact Us"],
      ["/privacy-policy", "Privacy Policy"],
      ["/terms", "Terms of Use"],
      ["/disclaimer", "Disclaimer"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="disclaimer">
          ⚠️ <strong>Disclaimer:</strong> PK Tax Calc gives estimates for information and planning only. Tax law changes often — check FBR's official notifications or a qualified tax adviser before filing. Zakat figures are estimates; consult a qualified scholar for your situation. We are an independent website and are not affiliated with FBR or any government body.
        </div>
        <div className="footer-grid footer-grid-5">
          <div className="footer-brand">
            <div className="brand-name">🇵🇰 PK Tax Calc</div>
            <p>Free tax and Zakat calculators for Pakistan, with rates checked against the Finance Act 2026 and FBR publications.</p>
          </div>
          {columns.map((col) => (
            <div className="footer-col" key={col.title}>
              <h5>{col.title}</h5>
              <ul>
                {col.links.map(([to, label]) => (
                  <li key={to}><Link to={to}>{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2026 PK Tax Calc. Calculations for Tax Year 2027 (FY 2026-27).</p>
          <p>
            Rates based on the Finance Act 2026 and FBR publications. Not affiliated with FBR or any government body.
          </p>
        </div>
      </div>
    </footer>
  );
}
