import React, { useState, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import Home from "./pages/Home";
import IncomeTax from "./pages/IncomeTax";
import ZakatCalculator from "./pages/ZakatCalculator";
import GoldZakat from "./pages/GoldZakat";
import SilverZakat from "./pages/SilverZakat";
import BankInterest from "./pages/BankInterest";
import SalaryCalculator from "./pages/SalaryCalculator";
import WithholdingTax from "./pages/WithholdingTax";
import SimLoadTax from "./pages/SimLoadTax";
import FreelancerTax from "./pages/FreelancerTax";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";

const routes = {
  "/": { component: Home, title: "Pakistan Tax & Zakat Calculator 2026-27 | Free Tax Calculation Tools", desc: "Free online calculators for Income Tax, Zakat, Gold Zakat, Bank Profit, Salary and more for Pakistan. Based on Pakistan Finance Bill 2026 tax slabs." },
  "/income-tax": { component: IncomeTax, title: "Income Tax Calculator Pakistan 2026-27 (Free) | FBR Slabs", desc: "Free income tax calculator for Pakistan FY 2026-27. Enter your salary or business income and get your exact tax instantly, based on official FBR Finance Bill 2026 slabs." },
  "/zakat": { component: ZakatCalculator, title: "Zakat Calculator Pakistan 2026 | Cash & Assets", desc: "Calculate Zakat on cash, savings, and assets using the latest Nisab threshold in Pakistan. Simple and accurate Zakat calculator." },
  "/gold-zakat": { component: GoldZakat, title: "Gold Zakat Calculator Pakistan 2026 | Grams & Tola", desc: "Calculate Zakat on gold jewellery and coins using today's gold rate. Accurate Nisab-based Zakat calculation for gold in Pakistan." },
  "/silver-zakat": { component: SilverZakat, title: "Silver Zakat Calculator Pakistan 2026 | Nisab", desc: "Calculate Zakat on silver using current silver rates and Nisab threshold. Free silver Zakat calculator for Pakistan." },
  "/bank-interest": { component: BankInterest, title: "Bank Profit Calculator Pakistan 2026 | All Banks", desc: "Calculate bank profit, savings account interest and term deposit returns for Pakistani banks. Compare profit rates easily." },
  "/salary": { component: SalaryCalculator, title: "Salary Calculator Pakistan 2026-27 | Net Take-Home Pay", desc: "Calculate your net take-home salary after income tax, EOBI, SESSI deductions for Pakistan. Monthly and annual breakdown." },
  "/withholding-tax": { component: WithholdingTax, title: "Withholding Tax Calculator Pakistan 2026 | FBR WHT", desc: "Calculate withholding tax on contracts, rent, imports, bank profits and more under Pakistan tax law 2026." },
  "/sim-load-tax": { component: SimLoadTax, title: "Mobile Load Tax Calculator Pakistan 2026 | Jazz, Zong, Ufone, Telenor", desc: "Find out exactly how much balance you get after tax on a Jazz, Zong, Ufone or Telenor recharge in Pakistan. Free, instant, updated for 2026." },
  "/freelancer-tax": { component: FreelancerTax, title: "Freelancer Tax Calculator Pakistan 2026-27 | Upwork, Fiverr, Payoneer", desc: "Free freelancer tax calculator for Pakistan FY 2026-27. Calculate your Section 154A tax on Upwork, Fiverr, Payoneer and Wise income — PSEB (0.25%) vs non-PSEB (1%) rates." },
  "/about": { component: About, title: "About PK Tax Calc | Pakistan Tax Calculator", desc: "Learn about PK Tax Calc — Pakistan's free, tax and Zakat calculator based on Finance Bill 2026. Our mission, data sources and commitment to accuracy." },
  "/contact": { component: Contact, title: "Contact Us | PK Tax Calc", desc: "Contact PK Tax Calc for questions, error reports or feature suggestions. Pakistan tax and Zakat calculator support." },
  "/privacy-policy": { component: PrivacyPolicy, title: "Privacy Policy | PK Tax Calc", desc: "Privacy Policy for PK Tax Calc. How we handle your data, and cookies." },
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

  useEffect(() => {
    document.title = route.title;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = route.desc;

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `https://pktaxcalc.com${path}`;
  }, [path, route]);

  return (
    <HelmetProvider>
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