import React from "react";
//import AdSlot from "../components/AdSlot";

export default function About({ navigate }) {
  return (
    <div>
      <section className="page-hero">
        <div className="hero-badge">About Us</div>
        <h1>About PK Tax Calc</h1>
        <p>Pakistan's free, accurate and FBR-compliant tax and Zakat calculator.</p>
      </section>

      <div style={{ maxWidth: 860, margin: "40px auto", padding: "0 20px 80px" }}>
        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", color: "var(--slate-900)", marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid var(--green-100)" }}>
            Our Mission
          </h2>
          <p style={{ fontSize: "1rem", color: "var(--slate-600)", lineHeight: 1.9, marginBottom: 16 }}>
            PK Tax Calc was built with a simple goal: make Pakistani tax and Zakat calculations
            accessible, accurate, and free for every Pakistani — whether you're a salaried employee
            in Lahore, a business owner in Karachi, or a freelancer in Islamabad.
          </p>
          <p style={{ fontSize: "1rem", color: "var(--slate-600)", lineHeight: 1.9 }}>
            Tax law in Pakistan is complicated. FBR updates slabs every year, withholding tax rates
            differ for filers and non-filers, and Zakat calculations involve multiple asset types
            and scholarly opinions. We bring all of that together in one place — for free.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
          {[
            { icon: "🧾", title: "Income Tax", desc: "FBR-compliant slabs for salaried and business taxpayers, updated every Finance Act." },
            { icon: "☪️", title: "Zakat", desc: "Comprehensive Zakat calculator covering cash, gold, silver, stocks, and business goods." },
            { icon: "💼", title: "Salary", desc: "Net take-home calculator including EOBI, provident fund, and social security deductions." },
            { icon: "📋", title: "Withholding Tax", desc: "18 WHT categories with separate filer and non-filer rates to help you understand deductions." },
          ].map(f => (
            <div key={f.title} style={{ background: "var(--slate-50)", borderRadius: "var(--radius-md)", padding: "20px", border: "1.5px solid var(--slate-100)" }}>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{f.icon}</div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8, color: "var(--slate-800)" }}>{f.title}</h3>
              <p style={{ fontSize: "0.85rem", color: "var(--slate-500)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--slate-900)", marginBottom: 20, paddingBottom: 16, borderBottom: "2px solid var(--green-100)" }}>
            Our Commitment to Accuracy
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              ["📖 FBR Source Data", "All income tax slabs and withholding tax rates are taken directly from the FBR Finance Act and Income Tax Ordinance 2001 (as amended). We update figures every year after the Federal Budget."],
              ["☪️ Islamic Finance Standards", "Zakat calculations follow the Hanafi school of thought, which is the most widely followed in Pakistan. We clearly note where scholarly opinions differ (e.g., on gold jewellery)."],
              ["🔒 Your Privacy First", "Every calculation runs entirely in your browser. We never see, store or transmit your income or asset figures. No account is required."],
              ["⚡ Always Free", "PK Tax Calc is and will remain free to use. The site is supported by display advertising (Google AdSense). No paywalls, no premium features, no subscriptions."],
            ].map(([title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 16 }}>
                <div style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{title.split(" ")[0]}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--slate-800)", marginBottom: 4 }}>{title.substring(3)}</div>
                  <p style={{ fontSize: "0.875rem", color: "var(--slate-500)", lineHeight: 1.7 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="calc-card fade-in" style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--slate-900)", marginBottom: 16, paddingBottom: 16, borderBottom: "2px solid var(--green-100)" }}>
            Data Sources
          </h2>
          <table className="slab-table">
            <thead><tr><th>Calculator</th><th>Data Source</th><th>Last Updated</th></tr></thead>
            <tbody>
              {[
                ["Income Tax Slabs", "FBR Finance Act 2024", "July 2024"],
                ["Withholding Tax", "FBR Income Tax Ordinance 2001 (amended)", "July 2024"],
                ["EOBI Rate", "Employees' Old-Age Benefits Institution", "2024"],
                ["Gold Nisab", "Sarafa Bazar / Jewellers Association rates", "Indicative"],
                ["Silver Nisab", "Pakistan Silver Market rates", "Indicative"],
                ["Bank Rates", "Public disclosures of major Pakistani banks", "Indicative"],
              ].map(r => (
                <tr key={r[0]}><td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="info-card warning">
          <h4>⚠️ Important Disclaimer</h4>
          <p>
            PK Tax Calc is for <strong>informational purposes only</strong>. Tax calculations are
            estimates based on publicly available FBR law. Individual circumstances may vary. Always
            verify with a qualified tax consultant or chartered accountant before filing your tax return.
            Zakat amounts should be verified with a qualified Islamic scholar for your specific situation.
            We are not affiliated with FBR, the Government of Pakistan, or any bank.
          </p>
        </div>

        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "var(--slate-500)", marginBottom: 20 }}>Have a question or found an error?</p>
          <button
            className="btn-calc"
            style={{ width: "auto", padding: "12px 32px" }}
            onClick={() => navigate("/contact")}
          >
            Contact Us →
          </button>
        </div>
      </div>
{/* 
      <div className="container" style={{ padding: "0 20px 40px" }}>
        <AdSlot size="responsive" />
      </div> */}
    </div>
  );
}
