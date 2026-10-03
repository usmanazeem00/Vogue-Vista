import React, { useState, useEffect, useCallback } from "react";
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
import PrizeBondTax from "./pages/PrizeBondTax";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Blogs from "./pages/blogs/Blogs";
import IncomeTaxSlabs2026 from "./pages/blogs/IncomeTaxSlabs2026";
import BecomeFiler from "./pages/blogs/BecomeFiler";
import TaxReturnDeadline from "./pages/blogs/TaxReturnDeadline";
import ZakatGuide from "./pages/blogs/ZakatGuide";
import ZakatNisab from "./pages/blogs/ZakatNisab";
import SalaryTaxGuide from "./pages/blogs/SalaryTaxGuide";
import VehicleTokenTax2026 from "./pages/blogs/VehicleTokenTax2026";
import LateFilingPenalties2026 from "./pages/blogs/LateFilingPenalties2026";
import FilerVsNonFiler from "./pages/blogs/FilerVsNonFiler";
import WhtCashWithdrawal2026 from "./pages/blogs/WhtCashWithdrawal2026";
import SalaryDeductionBreakdown from "./pages/blogs/Salarydeductionbreakdown";
import ZakatOnProvidentFundEobi from "./pages/blogs/Zakatonprovidentfundeobi";
import { ROUTE_META, NOT_FOUND_META } from "./routeMeta";
import { NavContext, Link, normalizePath } from "./lib/nav";
import { Seo, JsonLd, SITE_URL, SITE_NAME, absoluteUrl } from "./lib/seo";
import "./App.css";

const PAGES = {
  "/": Home,
  "/income-tax": IncomeTax,
  "/salary": SalaryCalculator,
  "/freelancer-tax": FreelancerTax,
  "/withholding-tax": WithholdingTax,
  "/zakat": ZakatCalculator,
  "/gold-zakat": GoldZakat,
  "/silver-zakat": SilverZakat,
  "/bank-interest": BankInterest,
  "/prize-bond-tax": PrizeBondTax,
  "/sim-load-tax": SimLoadTax,
  "/blogs": Blogs,
  "/blog/income-tax-slabs-2026": IncomeTaxSlabs2026,
  "/blog/salary-tax-guide": SalaryTaxGuide,
  "/blog/salary-deduction-breakdown": SalaryDeductionBreakdown,
  "/blog/tax-return-deadline": TaxReturnDeadline,
  "/blog/become-filer": BecomeFiler,
  "/blog/filer-vs-non-filer": FilerVsNonFiler,
  "/blog/late-filing-penalties-2026": LateFilingPenalties2026,
  "/blog/wht-cash-withdrawal-2026": WhtCashWithdrawal2026,
  "/blog/vehicle-token-tax-2026": VehicleTokenTax2026,
  "/blog/zakat-guide": ZakatGuide,
  "/blog/zakat-nisab": ZakatNisab,
  "/blog/zakat-on-provident-fund-eobi": ZakatOnProvidentFundEobi,
  "/about": About,
  "/contact": Contact,
  "/privacy-policy": PrivacyPolicy,
  "/terms": Terms,
  "/disclaimer": Disclaimer,
};

const PUBLISHER = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

function breadcrumbTrail(path, meta) {
  const trail = [{ path: "/", crumb: "Home" }];
  if (meta.parent) trail.push(meta.parent);
  trail.push({ path, crumb: meta.crumb });
  return trail;
}

// Page-level structured data, built from the same registry as the visible
// breadcrumb and title so the two always match.
function pageSchema(path, meta) {
  const url = absoluteUrl(path);
  const graph = [];

  if (path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: breadcrumbTrail(path, meta).map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.crumb,
        item: absoluteUrl(c.path),
      })),
    });
  }

  if (meta.type === "article") {
    graph.push({
      "@type": "Article",
      "@id": `${url}#article`,
      headline: meta.title,
      description: meta.description,
      url,
      mainEntityOfPage: url,
      dateModified: meta.updated,
      inLanguage: "en-PK",
      author: PUBLISHER,
      publisher: PUBLISHER,
    });
  } else {
    graph.push({
      "@type": "WebPage",
      "@id": url,
      url,
      name: meta.title,
      description: meta.description,
      dateModified: meta.updated,
      inLanguage: "en-PK",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      ...(path !== "/" && { breadcrumb: { "@id": `${url}#breadcrumb` } }),
    });
  }

  if (meta.type === "calculator") {
    graph.push({
      "@type": "WebApplication",
      name: meta.appName || meta.crumb,
      url,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Any (runs in the browser)",
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function Breadcrumbs({ path, meta }) {
  const trail = breadcrumbTrail(path, meta);
  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-nav">
      <ol>
        {trail.map((c, i) =>
          i < trail.length - 1 ? (
            <li key={c.path}>
              <Link to={c.path}>{c.crumb}</Link>
            </li>
          ) : (
            <li key={c.path} aria-current="page">{c.crumb}</li>
          )
        )}
      </ol>
    </nav>
  );
}

export default function App({ initialPath }) {
  const [path, setPath] = useState(() =>
    normalizePath(initialPath !== undefined ? initialPath : window.location.pathname)
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to) => {
    const target = normalizePath(to);
    window.history.pushState({}, "", to);
    setPath(target);
    window.scrollTo({ top: 0 });
  }, []);

  const meta = ROUTE_META[path];
  const PageComponent = (meta && PAGES[path]) || NotFound;
  const pageMeta = meta || NOT_FOUND_META;

  return (
    <NavContext.Provider value={{ navigate, path }}>
      <Seo
        title={pageMeta.title}
        description={pageMeta.description}
        path={path}
        type={pageMeta.type === "article" ? "article" : "website"}
        noindex={!!pageMeta.noindex}
      />
      <div className="app">
        <Navbar navigate={navigate} currentPath={path} />
        <main className="main-content">
          {meta && path !== "/" && <Breadcrumbs path={path} meta={meta} />}
          <PageComponent navigate={navigate} />
        </main>
        <Footer navigate={navigate} />
      </div>
      {meta && <JsonLd data={pageSchema(path, meta)} />}
    </NavContext.Provider>
  );
}
