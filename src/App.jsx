import React, { useState, useEffect } from "react";
import { HelmetProvider, Helmet } from 'react-helmet-async';
import Home from "./pages/Home";
import IncomeTax from "./pages/IncomeTax";
import ZakatCalculator from "./pages/ZakatCalculator";
import GoldZakat from "./pages/GoldZakat";
import SilverZakat from "./pages/SilverZakat";
import BankInterest from "./pages/BankInterest";
import SalaryCalculator from "./pages/SalaryCalculator";
import WithholdingTax from "./pages/WithholdingTax";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import SimLoadTax from "./pages/SimLoadTax";
import Footer from "./components/Footer";
import Blogs from "./pages/blogs/Blogs";
import IncomeTaxSlabs2026 from "./pages/blogs/IncomeTaxSlabs2026";
import BecomeFiler from "./pages/blogs/BecomeFiler";
import TaxReturnDeadline from "./pages/blogs/TaxReturnDeadline";
import ZakatGuide from "./pages/blogs/ZakatGuide";
import SalaryTaxGuide from "./pages/blogs/SalaryTaxGuide";
import "./App.css";

const BASE_URL = "https://pktaxcalc.com";
const OG_IMAGE = `${BASE_URL}/og-image.png`;

const routes = {
  "/": {
    component: Home,
    title: "Pakistan Tax & Zakat Calculator 2026-27 | Free Tax Calculation Tools",
    desc: "Free online calculators for Income Tax, Zakat, Gold Zakat, Bank Profit, Salary and more for Pakistan. Based on Pakistan Finance Bill 2026 tax slabs.",
  },
  "/income-tax": {
    component: IncomeTax,
    title: "Income Tax Calculator Pakistan 2026-27 | FBR Tax Slabs",
    desc: "Calculate your income tax for FY 2026-27 based on FBR Finance Bill 2026 slabs. Accurate tax for salaried individuals and business owners in Pakistan.",
  },
  "/zakat": {
    component: ZakatCalculator,
    title: "Zakat Calculator Pakistan 2026 | Cash & Assets Nisab Check",
    desc: "Calculate Zakat on cash, savings, and assets using the latest Nisab threshold in Pakistan. Simple and accurate Zakat calculator.",
  },
  "/gold-zakat": {
    component: GoldZakat,
    title: "Gold Zakat Calculator Pakistan 2026 | Grams & Tola",
    desc: "Calculate Zakat on gold jewellery and coins using today's gold rate. Accurate Nisab-based Zakat calculation for gold in Pakistan.",
  },
  "/silver-zakat": {
    component: SilverZakat,
    title: "Silver Zakat Calculator Pakistan 2026 | Nisab Threshold",
    desc: "Calculate Zakat on silver using current silver rates and Nisab threshold. Free silver Zakat calculator for Pakistan.",
  },
  "/bank-interest": {
    component: BankInterest,
    title: "Bank Profit Calculator Pakistan 2026 | HBL MCB UBL Meezan",
    desc: "Calculate bank profit, savings account interest and term deposit returns for Pakistani banks. Withholding tax included.",
  },
  "/salary": {
    component: SalaryCalculator,
    title: "Salary Calculator Pakistan 2026-27 | Net Take-Home Pay",
    desc: "Calculate your net take-home salary after income tax, EOBI, SESSI deductions for Pakistan. Monthly and annual breakdown.",
  },
  "/withholding-tax": {
    component: WithholdingTax,
    title: "Withholding Tax Calculator Pakistan 2026 | 23 Categories",
    desc: "Calculate withholding tax on contracts, rent, imports, bank profits and more under Pakistan tax law 2026. Filer vs non-filer rates.",
  },
  "/about": {
    component: About,
    title: "About PK Tax Calc | Pakistan Free Tax Calculator",
    desc: "Learn about PK Tax Calc — Pakistan's free tax and Zakat calculator based on Finance Bill 2026. Our mission, data sources and commitment to accuracy.",
  },
  "/contact": {
    component: Contact,
    title: "Contact Us | PK Tax Calc",
    desc: "Contact PK Tax Calc for questions, error reports or feature suggestions. Pakistan tax and Zakat calculator support.",
  },
  "/privacy-policy": {
    component: PrivacyPolicy,
    title: "Privacy Policy | PK Tax Calc",
    desc: "Privacy Policy for PK Tax Calc. How we handle your data and cookies.",
  },
  "/blogs": {
    component: Blogs,
    title: "Pakistan Tax Blog 2026 | Guides & Resources | PK Tax Calc",
    desc: "Latest articles about income tax, salary tax, withholding tax and financial guides in Pakistan.",
  },
  "/blog/income-tax-slabs-2026": {
    component: IncomeTaxSlabs2026,
    title: "Income Tax Slabs Pakistan FY 2026-27 | Complete FBR Guide",
    desc: "Complete breakdown of FBR tax slabs for FY 2026-27. Income tax rates and brackets for salaried and business individuals in Pakistan.",
  },
  "/blog/become-filer": {
    component: BecomeFiler,
    title: "How to Become a Tax Filer in Pakistan 2026 | ATL Guide",
    desc: "Step-by-step guide to registering on FBR IRIS and joining the Active Taxpayer List. Benefits of becoming a filer in Pakistan.",
  },
  "/blog/tax-return-deadline": {
    component: TaxReturnDeadline,
    title: "Tax Return Deadline Pakistan 2026 | FBR Filing Dates",
    desc: "Important FBR tax return dates, deadlines and penalties for late filing in Pakistan for FY 2026-27.",
  },
  "/blog/zakat-guide": {
    component: ZakatGuide,
    title: "Zakat on Gold, Cash and Savings Pakistan 2026 | Complete Guide",
    desc: "Complete guide to calculating your annual Zakat on gold, silver, cash, savings and business assets in Pakistan.",
  },
  "/blog/salary-tax-guide": {
    component: SalaryTaxGuide,
    title: "How to Calculate Salary Tax in Pakistan 2026-27 | Guide",
    desc: "Learn how employers deduct monthly salary tax and how to calculate your annual income tax liability in Pakistan.",
  },
  "/sim-load-tax": {
  component: SimLoadTax,
  title: "SIM Load Tax Calculator Pakistan 2026 | Mobile Recharge Tax",
  desc: "Calculate mobile load tax in Pakistan including advance tax and service tax for Jazz, Zong, Ufone and Telenor."
},
};

export default function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPath(to);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const route = routes[path] || routes["/"];
  const PageComponent = route.component;
  const canonicalUrl = `${BASE_URL}${path === "/" ? "" : path}`;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{route.title}</title>
        <meta name="description" content={route.desc} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={route.title} />
        <meta property="og:description" content={route.desc} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PK Tax Calc" />
        <meta property="og:locale" content="en_PK" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={route.title} />
        <meta name="twitter:description" content={route.desc} />
        <meta name="twitter:image" content={OG_IMAGE} />
      </Helmet>

      <div className="app">
        <Navbar navigate={navigate} currentPath={path} />
        <main className="main-content">
          <PageComponent navigate={navigate} />
        </main>
        <Footer navigate={navigate} />
      </div>
    </HelmetProvider>
  );
}