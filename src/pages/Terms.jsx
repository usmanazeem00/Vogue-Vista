import React from "react";
import { Link } from "../lib/nav";
import { LegalPage } from "./Disclaimer";
import { ROUTE_META } from "../routeMeta";

export default function Terms() {
  return (
    <LegalPage
      badge="Legal"
      title="Terms of Use"
      intro="The terms that apply when you use pktaxcalc.com."
      updated={ROUTE_META["/terms"].updated}
    >
      <h2>1. Acceptance</h2>
      <p>
        By using pktaxcalc.com ("PK Tax Calc", "we", "us") you agree to these terms. If you don't agree, please
        don't use the site.
      </p>

      <h2>2. Use of the calculators and guides</h2>
      <p>
        You may use the calculators and read the guides free of charge for personal and internal business
        purposes. Results are estimates provided for information only, as explained in our{" "}
        <Link to="/disclaimer">disclaimer</Link>. You are responsible for checking any figure before relying on it
        for a tax return, payroll, Zakat payment or other decision.
      </p>

      <h2>3. No professional advice</h2>
      <p>
        Nothing on this site is tax, legal, financial or religious advice. PK Tax Calc is independent and not
        affiliated with FBR or any government body.
      </p>

      <h2>4. Accuracy and changes</h2>
      <p>
        We try to keep rates and content current and show when each page was last reviewed, but we don't
        guarantee that the site is complete, accurate or available at all times. We may change, suspend or
        remove any part of the site without notice.
      </p>

      <h2>5. Intellectual property</h2>
      <p>
        The site's text, design and code belong to PK Tax Calc unless stated otherwise. You may quote short
        extracts with a link back to the source page. Copying substantial parts of the site or its calculators
        without permission is not allowed.
      </p>

      <h2>6. Acceptable use</h2>
      <p>
        Don't misuse the site — for example by trying to disrupt it, scraping it at a volume that affects other
        users, or using it for anything unlawful.
      </p>

      <h2>7. Third-party links and advertising</h2>
      <p>
        The site links to external sites such as FBR and IRIS and may show advertising from third parties. We
        aren't responsible for the content or practices of those sites or advertisers. See our{" "}
        <Link to="/privacy-policy">privacy policy</Link> for how advertising cookies work.
      </p>

      <h2>8. Limitation of liability</h2>
      <p>
        To the extent permitted by law, PK Tax Calc is not liable for any loss or damage arising from use of, or
        reliance on, the site or its content.
      </p>

      <h2>9. Governing law</h2>
      <p>These terms are governed by the laws of Pakistan.</p>

      <h2>10. Contact</h2>
      <p>
        Questions about these terms: <Link to="/contact">contact us</Link> or email hello.pktaxcalc@gmail.com.
      </p>
    </LegalPage>
  );
}
