import React, { useState, useRef, useEffect } from "react";

const navItems = [
  { label: "Income Tax", path: "/income-tax" },
  { label: "Zakat", path: "/zakat" },
  { label: "Gold Zakat", path: "/gold-zakat" },
  { label: "Silver Zakat", path: "/silver-zakat" },
  { label: "Bank Profit", path: "/bank-interest" },
  { label: "Salary", path: "/salary" },
  { label: "WHT", path: "/withholding-tax" },
];

// Grouped under "More" instead of appended inline — the nav row was already
// overflowing on desktop with 8 items, so adding 2 more directly would make
// it worse rather than better.
const moreItems = [
  { label: "Freelancer Tax", path: "/freelancer-tax" },
  { label: "SIM Load Tax", path: "/sim-load-tax" },
  { label: "Blog", path: "/blogs" },
];

export default function Navbar({ navigate, currentPath }) {
  const [open, setOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const isMoreActive = moreItems.some(m => m.path === currentPath);

  return (
    <nav className="navbar">
      <style>{`
        .nav-more-wrap {
          position: relative;
          display: inline-block;
        }
        .nav-more-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          background: #0e3b2c;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          min-width: 170px;
          padding: 6px;
          z-index: 50;
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }
        .nav-more-dropdown button {
          display: block;
          width: 100%;
          text-align: left;
          padding: 8px 12px;
          border-radius: 6px;
          background: transparent;
          border: none;
          color: rgba(255,255,255,0.85);
          font-size: 0.9rem;
          cursor: pointer;
        }
        .nav-more-dropdown button:hover {
          background: rgba(255,255,255,0.08);
        }
        .nav-more-dropdown button.active {
          color: #fff;
          font-weight: 600;
        }
      `}</style>

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
          <li className="nav-more-wrap" ref={moreRef}>
            <button
              className={isMoreActive ? "active" : ""}
              onClick={() => setMoreOpen(o => !o)}
              aria-haspopup="true"
              aria-expanded={moreOpen}
            >
              More {moreOpen ? "▲" : "▼"}
            </button>
            {moreOpen && (
              <div className="nav-more-dropdown">
                {moreItems.map(n => (
                  <button
                    key={n.path}
                    className={currentPath === n.path ? "active" : ""}
                    onClick={() => { navigate(n.path); setMoreOpen(false); }}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            )}
          </li>
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
        {moreItems.map(n => (
          <button key={n.path} onClick={() => { navigate(n.path); setOpen(false); }}>
            {n.label}
          </button>
        ))}
      </div>
    </nav>
  );
}