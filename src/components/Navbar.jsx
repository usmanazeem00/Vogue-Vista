import React, { useState, useRef, useEffect } from "react";
import { Link } from "../lib/nav";

const navItems = [
  { label: "Income Tax", path: "/income-tax" },
  { label: "Salary", path: "/salary" },
  { label: "Zakat", path: "/zakat" },
  { label: "Gold Zakat", path: "/gold-zakat" },
  { label: "Bank Profit", path: "/bank-interest" },
  { label: "WHT", path: "/withholding-tax" },
  { label: "Tax Slabs", path: "/blog/income-tax-slabs-2026" },
];

// Grouped under "More" so the desktop nav row doesn't overflow.
const moreItems = [
  { label: "Freelancer Tax", path: "/freelancer-tax" },
  { label: "Silver Zakat", path: "/silver-zakat" },
  { label: "Prize Bond Tax", path: "/prize-bond-tax" },
  { label: "Mobile Load Tax", path: "/sim-load-tax" },
  { label: "All Guides", path: "/blogs" },
];

export default function Navbar({ currentPath }) {
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

  useEffect(() => {
    setOpen(false);
    setMoreOpen(false);
  }, [currentPath]);

  const isMoreActive = moreItems.some(m => m.path === currentPath);
  const cls = (p) => (currentPath === p ? "active" : undefined);

  return (
    <nav className="navbar" aria-label="Main">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo" aria-label="PK Tax Calc home">
          <div className="nav-logo-icon" aria-hidden="true">🇵🇰</div>
          <div>
            <div className="nav-logo-text">PK Tax Calc</div>
            <div className="nav-logo-sub">Tax Year 2027 · Pakistan</div>
          </div>
        </Link>
        <ul className="nav-links">
          {navItems.map(n => (
            <li key={n.path}>
              <Link to={n.path} className={cls(n.path)}>{n.label}</Link>
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
            {/* Always in the DOM so the links are crawlable; shown on click. */}
            <div className="nav-more-dropdown" hidden={!moreOpen}>
              {moreItems.map(n => (
                <Link key={n.path} to={n.path} className={cls(n.path)}>
                  {n.label}
                </Link>
              ))}
            </div>
          </li>
        </ul>
        <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open}>
          {open ? "✕" : "☰"}
        </button>
      </div>
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <Link to="/">🏠 Home</Link>
        {[...navItems, ...moreItems].map(n => (
          <Link key={n.path} to={n.path} className={cls(n.path)}>
            {n.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
