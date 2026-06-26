import React from "react";

export default function PrivacyPolicy() {
  const lastUpdated = "December 2024";

  return (
    <div>
      <section className="page-hero">
        <div className="hero-badge">Legal</div>
        <h1>Privacy Policy</h1>
        <p>How PK Tax Calc collects, uses and protects your information.</p>
      </section>

      <div style={{ maxWidth: 800, margin: "40px auto", padding: "0 20px 80px" }}>
        <div className="calc-card fade-in">
          <p style={{ color: "var(--slate-500)", fontSize: "0.875rem", marginBottom: 32 }}>
            Last updated: {lastUpdated}
          </p>

          <Section title="1. Introduction">
            Welcome to PK Tax Calc ("we", "our", or "us"), accessible at pktaxcalc.com. We are committed
            to protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you visit our website. Please read this policy carefully.
          </Section>

          <Section title="2. Information We Collect">
            <strong>Information you enter into calculators:</strong> All tax, salary, and Zakat figures
            you type into our calculators are processed entirely within your browser. This data is
            never transmitted to our servers, stored, or shared with any third party. We have no
            access to the financial figures you enter.
            <br /><br />
            <strong>Automatically collected information:</strong> When you visit our site, we may
            automatically collect certain information including your IP address, browser type,
            operating system, referring URLs, pages visited, and time spent on pages. This is
            standard web server log data used for analytics.
          </Section>

          <Section title="3. Cookies and Tracking Technologies">
            We use cookies and similar tracking technologies to improve your experience:
            <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
              <li><strong>Essential cookies:</strong> Required for basic site functionality.</li>
              <li><strong>Analytics cookies (Google Analytics):</strong> We use Google Analytics to
              understand how visitors interact with our site. This collects anonymized data about
              page views, session duration, and traffic sources. You can opt out at
              tools.google.com/dlpage/gaoptout.</li>
              <li><strong>Advertising cookies (Google AdSense):</strong> We display advertisements
              provided by Google AdSense. Google uses cookies to serve ads based on your prior
              visits to our website and other sites. Google's use of advertising cookies enables
              it and its partners to serve ads based on your visit to our site and other sites
              on the Internet. You may opt out of personalized advertising by visiting
              www.aboutads.info.</li>
            </ul>
          </Section>

          <Section title="4. Google AdSense and Third-Party Advertising">
            We participate in the Google AdSense program. Third-party vendors, including Google,
            use cookies to serve ads on our site. Google's use of the DART cookie enables it to
            serve ads to our users based on their visit to our site and other sites on the Internet.
            Users may opt out of the use of the DART cookie by visiting the Google ad and content
            network privacy policy at: www.google.com/privacy_ads.html.
            <br /><br />
            We have no control over the content of advertisements displayed by Google AdSense.
          </Section>

          <Section title="5. How We Use Your Information">
            We use the automatically collected information to:
            <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
              <li>Operate and maintain our website</li>
              <li>Monitor and analyze usage and trends to improve the site</li>
              <li>Detect and prevent technical issues</li>
              <li>Display relevant advertisements through Google AdSense</li>
            </ul>
            We do not sell, trade, or otherwise transfer your personally identifiable information
            to outside parties.
          </Section>

          <Section title="6. Data Security">
            Since all calculator inputs are processed locally in your browser and never sent to
            our servers, the financial data you enter is inherently secure. We do not store any
            personal financial information. For general site data, we implement reasonable
            technical and organizational security measures.
          </Section>

          <Section title="7. Third-Party Links">
            Our website may contain links to third-party websites such as FBR (fbr.gov.pk), State
            Bank of Pakistan (sbp.org.pk), and IRIS portal (iris.fbr.gov.pk). We are not responsible
            for the privacy practices of these external sites and encourage you to review their
            privacy policies.
          </Section>

          <Section title="8. Children's Privacy">
            Our service is not directed to children under the age of 13. We do not knowingly
            collect personally identifiable information from children under 13. If you are a parent
            or guardian and believe your child has provided us with personal information, please
            contact us so we can delete such information.
          </Section>

          <Section title="9. Your Rights">
            Depending on your location, you may have the right to:
            <ul style={{ marginTop: 12, paddingLeft: 20, lineHeight: 2 }}>
              <li>Access personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Opt out of personalized advertising</li>
            </ul>
            To exercise these rights, please contact us at the email below.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy from time to time. We will notify you of any changes
            by posting the new policy on this page with an updated date. We encourage you to review
            this policy periodically.
          </Section>

          <Section title="11. Contact Us">
            If you have any questions about this Privacy Policy, please contact us:
            <br /><br />
            <strong>Email:</strong> privacy@pktaxcalc.com<br />
            <strong>Website:</strong> pktaxcalc.com/contact
          </Section>

          <div className="info-card" style={{ marginTop: 32 }}>
            <h4>⚠️ Disclaimer</h4>
            <p>
              PK Tax Calc provides tax and Zakat calculators for informational purposes only.
              The calculations are based on publicly available FBR tax laws and Islamic finance
              principles. This is not professional tax or legal advice. Always verify with FBR's
              official website or a qualified tax consultant before filing. For Zakat, consult a
              qualified Islamic scholar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "1.1rem",
        color: "var(--green-800)",
        marginBottom: 10,
        paddingBottom: 8,
        borderBottom: "1px solid var(--green-100)"
      }}>{title}</h2>
      <p style={{ color: "var(--slate-600)", fontSize: "0.9rem", lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}
