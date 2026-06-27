import React, { useState } from "react";

const navItems = [
  { label: "Income Tax", path: "/income-tax" },
  { label: "Zakat", path: "/zakat" },
  { label: "Gold Zakat", path: "/gold-zakat" },
  { label: "Silver Zakat", path: "/silver-zakat" },
  { label: "Bank Profit", path: "/bank-interest" },
  { label: "Salary", path: "/salary" },
  { label: "WHT", path: "/withholding-tax" },
  { label: "Blog", path: "/blogs" },
];

export default function Navbar({ navigate, currentPath }) {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo" onClick={() => { navigate("/"); setOpen(false); }}>
          <div className="nav-logo-icon">🇵🇰</div>
          <div>
            <div className="nav-logo-text">PK Tax Calc</div>
            <div className="nav-logo-sub">Finance Bill 2026 · Pakistan</div>
          </div>
        </div>
        <ul className="nav-links">
          {navItems.map(n => (
            <li key={n.path}>
              <button
                className={currentPath === n.path ? "active" : ""}
                onClick={() => navigate(n.path)}
              >{n.label}</button>
            </li>
          ))}
        </ul>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu">
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <button onClick={() => { navigate("/"); setOpen(false); }}>🏠 Home</button>
        {navItems.map(n => (
          <button key={n.path} onClick={() => { navigate(n.path); setOpen(false); }}>
            {n.label}
          </button>
        ))}
      </div>
    </nav>
  );
}