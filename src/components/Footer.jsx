import React from "react";

export default function Footer({ navigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="disclaimer">
          ⚠️ <strong>Disclaimer:</strong> This calculator is for informational and educational purposes only. Tax laws change frequently — always verify with FBR's official website or a qualified tax consultant before filing. Zakat calculations are estimates; consult a qualified scholar for your specific situation.
        </div>
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand-name">🇵🇰 PK Tax Calc</div>
            <p>Pakistan's free tax and Zakat calculator. Using official Finance Bill 2026 tax slabs. Trusted by thousands of Pakistanis.</p>
          </div>
          <div className="footer-col">
            <h5>Calculators</h5>
            <ul>
              <li><button onClick={() => navigate("/income-tax")}>Income Tax</button></li>
              <li><button onClick={() => navigate("/zakat")}>Zakat Calculator</button></li>
              <li><button onClick={() => navigate("/gold-zakat")}>Gold Zakat</button></li>
              <li><button onClick={() => navigate("/silver-zakat")}>Silver Zakat</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>More Tools</h5>
            <ul>
              <li><button onClick={() => navigate("/bank-interest")}>Bank Profit</button></li>
              <li><button onClick={() => navigate("/salary")}>Salary Calculator</button></li>
              <li><button onClick={() => navigate("/withholding-tax")}>Withholding Tax</button></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>Company</h5>
            <ul>
              <li><button onClick={() => navigate("/about")}>About Us</button></li>
              <li><button onClick={() => navigate("/contact")}>Contact Us</button></li>
              <li><button onClick={() => navigate("/privacy-policy")}>Privacy Policy</button></li>
              <li><button onClick={() => window.open("https://fbr.gov.pk", "_blank")}>FBR Website</button></li>
              <li><button onClick={() => window.open("https://iris.fbr.gov.pk", "_blank")}>IRIS Portal</button></li>
            </ul>
          </div>
                  <div className="footer-col">
  <h5>Resources</h5>
  <ul>
    <li>
      <button onClick={() => navigate("/blogs")}>
        Blog
      </button>
    </li>
    <li>
      <button onClick={() => navigate("/blog/income-tax-slabs-2026")}>
        Income Tax Slabs
      </button>
    </li>
    <li>
      <button onClick={() => navigate("/blog/become-filer")}>
        Become a Filer
      </button>
    </li>
    <li>
      <button onClick={() => navigate("/blog/zakat-guide")}>
        Zakat Guide
      </button>
    </li>
  </ul>
</div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PK Tax Calc. All calculations for FY 2026-27.</p>
          <p style={{ color: "var(--ink-500)", fontSize: "0.75rem" }}>
            <button onClick={() => navigate("/privacy-policy")} style={{ background: "none", border: "none", color: "var(--ink-400)", fontSize: "0.75rem", cursor: "pointer" }}>Privacy Policy</button>
            {" · "}
            <button onClick={() => navigate("/contact")} style={{ background: "none", border: "none", color: "var(--ink-400)", fontSize: "0.75rem", cursor: "pointer" }}>Contact</button>
            {" · "}
            Data sourced from FBR Finance Bill 2026
          </p>
        </div>
      </div>
    </footer>
  );
}