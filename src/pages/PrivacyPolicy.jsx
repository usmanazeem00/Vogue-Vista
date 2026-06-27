import React from "react";

export default function PrivacyPolicy() {
  const lastUpdated = "June 2026";

  return (
    <div>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Legal</div>
          <h1>Privacy Policy</h1>
          <p>How PK Tax Calc collects, uses, and protects your information.</p>
        </div>
      </section>

      <div
        style={{
          maxWidth: 800,
          margin: "40px auto",
          padding: "0 20px 80px",
        }}
      >
        <div className="calc-card fade-in">
          <p
            style={{
              color: "var(--slate-500)",
              fontSize: "0.875rem",
              marginBottom: 32,
            }}
          >
            Last updated: {lastUpdated}
          </p>

          <Section title="1. Introduction">
            Welcome to PK Tax Calc ("we", "our", or "us"), accessible at
            pktaxcalc.com. We are committed to protecting your privacy. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you visit our website. Please read this policy
            carefully.
          </Section>

          <Section title="2. Information We Collect">
            <strong>Information you enter into calculators:</strong> All tax,
            salary, and Zakat figures you enter into our calculators are
            processed entirely within your browser. This data is never
            transmitted to our servers, stored, or shared with any third party.
            We have no access to the financial figures you enter.
            <br />
            <br />
            <strong>Automatically collected information:</strong> When you visit
            our site, we may automatically collect certain information,
            including your IP address, browser type, operating system, referring
            URLs, pages visited, and time spent on pages. This information is
            used to understand website performance and improve user experience.
          </Section>

          <Section title="3. Cookies and Analytics">
            We use cookies and similar technologies to improve your experience
            on PK Tax Calc.
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                lineHeight: 2,
              }}
            >
              <li>
                <strong>Essential cookies:</strong> Required for basic website
                functionality and performance.
              </li>
              <li>
                <strong>Analytics cookies:</strong> We may use analytics tools
                to understand how visitors interact with our website, including
                pages visited, session duration, and traffic sources. This
                information is aggregated and does not personally identify you.
              </li>
            </ul>
            You can configure your browser to refuse cookies or notify you when
            cookies are being used. However, some parts of the website may not
            function properly if cookies are disabled.
          </Section>

          <Section title="4. Third-Party Services">
            We may use third-party services such as analytics providers, hosting
            providers, and performance monitoring tools to help operate and
            improve our website.
            <br />
            <br />
            These providers may collect certain technical information,
            including browser type, device information, IP address, and usage
            statistics, in accordance with their own privacy policies.
            <br />
            <br />
            We do not sell, trade, or rent your personal information to third
            parties.
          </Section>

          <Section title="5. How We Use Your Information">
            We use the automatically collected information to:
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                lineHeight: 2,
              }}
            >
              <li>Operate and maintain our website</li>
              <li>Monitor and analyze usage and trends</li>
              <li>Improve website performance and user experience</li>
              <li>Detect and prevent technical issues</li>
            </ul>
          </Section>

          <Section title="6. Data Security">
            Since all calculator inputs are processed locally in your browser
            and never sent to our servers, the financial data you enter remains
            private and secure. We do not store any personal financial
            information. For general website data, we implement reasonable
            technical and organizational security measures.
          </Section>

          <Section title="7. Third-Party Links">
            Our website may contain links to third-party websites such as FBR,
            State Bank of Pakistan, and the IRIS Portal. We are not responsible
            for the privacy practices or content of these external websites and
            encourage you to review their privacy policies.
          </Section>

          <Section title="8. Children's Privacy">
            Our service is not directed to children under the age of 13. We do
            not knowingly collect personally identifiable information from
            children under 13. If you believe a child has provided us with
            personal information, please contact us so that we can remove such
            information.
          </Section>

          <Section title="9. Your Rights">
            Depending on your location and applicable laws, you may have the
            right to:
            <ul
              style={{
                marginTop: 12,
                paddingLeft: 20,
                lineHeight: 2,
              }}
            >
              <li>Access information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information where applicable</li>
              <li>Restrict or object to certain processing activities</li>
              <li>Manage cookie preferences through your browser settings</li>
            </ul>
            To exercise these rights, please contact us using the information
            below.
          </Section>

          <Section title="10. Changes to This Policy">
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page along with an updated revision date. We
            encourage you to review this policy periodically.
          </Section>

          <Section title="11. Contact Us">
            If you have any questions about this Privacy Policy, please contact
            us:
            <br />
            <br />
            <strong>Email:</strong> hello.pktaxcalc@gmail.com
            <br />
            <strong>Website:</strong> https://pktaxcalc.com/contact
          </Section>

          <div className="info-card" style={{ marginTop: 32 }}>
            <h4>⚠️ Disclaimer</h4>
            <p>
              PK Tax Calc provides tax and Zakat calculators for informational
              purposes only. The calculations are based on publicly available
              FBR tax laws and Islamic finance principles. This website does not
              provide professional tax, financial, or legal advice. Always
              verify calculations with official FBR sources or a qualified tax
              professional before making financial or tax decisions. For Zakat,
              consult a qualified Islamic scholar if needed.
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
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "1.1rem",
          color: "var(--green-800)",
          marginBottom: 10,
          paddingBottom: 8,
          borderBottom: "1px solid var(--green-100)",
        }}
      >
        {title}
      </h2>
      <p
        style={{
          color: "var(--slate-600)",
          fontSize: "0.9rem",
          lineHeight: 1.8,
        }}
      >
        {children}
      </p>
    </div>
  );
}