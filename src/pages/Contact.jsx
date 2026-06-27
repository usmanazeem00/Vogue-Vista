import React, { useState } from "react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  // Opens default mail client — no backend needed
  const handleSubmit = () => {
    const { name, email, subject, message } = form;
    if (!name || !email || !message) {
      alert("Please fill in your name, email and message.");
      return;
    }
    
    const subjectLabels = {
      general: "General Enquiry",
      error: "Calculation Error Report",
      suggestion: "Feature Suggestion",
      adsense: "Advertising / Partnership",
    };
    const mailSubject = encodeURIComponent(`[PK Tax Calc] ${subjectLabels[subject]} — from ${name}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    window.location.href = `mailto:hello.pktaxcalc@gmail.com?subject=${mailSubject}&body=${mailBody}`;
    setSent(true);
  };

  return (
    <div>
      <section className="page-hero">
        <div className="hero-badge">Get in Touch</div>
        <h1>Contact Us</h1>
        <p>Report a calculation error, suggest a feature, or ask a question. We read every message.</p>
      </section>

      <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 20px 80px" }}>
        {sent ? (
          <div className="calc-card fade-in" style={{ textAlign: "center", padding: "60px 40px" }}>
            <div style={{ fontSize: "3rem", marginBottom: 20 }}>✅</div>
            <h2 style={{ fontFamily: "var(--font-display)", marginBottom: 12 }}>Message Ready to Send</h2>
            <p style={{ color: "var(--slate-500)", marginBottom: 24 }}>
              Your email client should have opened with the message pre-filled.
              If it didn't open, email us directly at <strong>hello.pktaxcalc@gmail.com</strong>
            </p>
            <button className="btn-calc" style={{ width: "auto", padding: "12px 32px" }}
              onClick={() => setSent(false)}>Send Another Message</button>
          </div>
        ) : (
          <div className="calc-card fade-in">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", color: "var(--slate-900)", marginBottom: 24, paddingBottom: 16, borderBottom: "2px solid var(--green-100)" }}>
              Send Us a Message
            </h2>

            <div className="form-row">
              <div className="form-group">
                <label>Your Name</label>
                <input type="text" placeholder="Muhammad Ali" value={form.name} onChange={e => set("name", e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="name@example.com" value={form.email} onChange={e => set("email", e.target.value)} />
              </div>
            </div>

            <div className="form-group">
              <label>Subject</label>
              <select value={form.subject} onChange={e => set("subject", e.target.value)}>
                <option value="general">General Enquiry</option>
                <option value="error">Report a Calculation Error</option>
                <option value="suggestion">Feature Suggestion</option>
                <option value="adsense">Advertising / Partnership</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows={6}
                placeholder="Describe your question, error or suggestion in detail..."
                value={form.message}
                onChange={e => set("message", e.target.value)}
                style={{
                  width: "100%", padding: "11px 16px",
                  border: "1.5px solid var(--slate-300)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.95rem", color: "var(--slate-800)",
                  resize: "vertical", fontFamily: "inherit",
                  outline: "none", transition: "border-color 0.15s"
                }}
                onFocus={e => e.target.style.borderColor = "var(--green-600)"}
                onBlur={e => e.target.style.borderColor = "var(--slate-300)"}
              />
            </div>

            <button className="btn-calc" onClick={handleSubmit}>Send Message →</button>

            <p style={{ fontSize: "0.8rem", color: "var(--slate-400)", marginTop: 12, textAlign: "center" }}>
              This will open your email client. Alternatively, email us at{" "}
              <a href="mailto:hello.pktaxcalc@gmail.com" style={{ color: "var(--green-600)" }}>
                hello.pktaxcalc@gmail.com
              </a>
            </p>
          </div>
        )}

        {/* Contact Info Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 24 }}>
          <div className="info-card">
            <h4>📧 Email</h4>
            <p>
              <a href="mailto:hello.pktaxcalc@gmail.com" style={{ color: "var(--green-600)", fontWeight: 600 }}>
                hello.pktaxcalc@gmail.com
              </a>
              <br />We typically respond within 24-48 hours.
            </p>
          </div>
          <div className="info-card">
            <h4>⚡ Common Topics</h4>
            <ul>
              <li>Wrong tax calculation</li>
              <li>Outdated FBR slabs</li>
              <li>New calculator request</li>
              <li>Zakat ruling question</li>
            </ul>
          </div>
        </div>

        <div className="info-card" style={{ marginTop: 16 }}>
          <h4>📌 Before You Contact Us</h4>
          <ul>
            <li>For official tax filing help, visit <strong>iris.fbr.gov.pk</strong> or call FBR helpline <strong>051-111-772-772</strong></li>
            <li>For Zakat rulings, consult a qualified Islamic scholar or your local mosque</li>
            <li>For banking queries, contact your bank directly</li>
            <li>We are not affiliated with FBR or any government body</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
