// Single source of truth for every indexable URL on the site.
// Used by the app (titles, descriptions, breadcrumbs, schema) and by
// scripts/prerender.js (static HTML + sitemap.xml), so they never drift.
//
// type: "calculator" | "article" | "page"
// parent: breadcrumb parent path ("/" for top-level pages)
// updated: ISO date of the last substantive content change

const GUIDES = { path: "/blogs", crumb: "Tax Guides" };

export const ROUTE_META = {
  "/": {
    type: "page",
    title: "Pakistan Tax Calculator 2026-27: Income Tax, Salary & Zakat",
    description:
      "Free calculators updated for Finance Act 2026: income tax on your salary, monthly take-home pay, Zakat on gold and savings, and withholding tax. No sign-up.",
    crumb: "Home",
    updated: "2026-10-03",
    priority: "1.0",
    changefreq: "weekly",
  },

  // ── Calculators ────────────────────────────────────────────
  "/income-tax": {
    type: "calculator",
    title: "Income Tax Calculator Pakistan 2026-27 (Finance Act 2026 Slabs)",
    description:
      "Enter your monthly or yearly income to see your tax under the 2026-27 FBR slabs, with slab-by-slab working, effective rate and a 2025-26 comparison. Free.",
    crumb: "Income Tax Calculator",
    appName: "Pakistan Income Tax Calculator 2026-27",
    updated: "2026-10-03",
    priority: "0.95",
  },
  "/salary": {
    type: "calculator",
    title: "Salary Tax Calculator Pakistan 2026-27: Monthly Take-Home Pay",
    description:
      "Find your take-home salary after income tax, EOBI and provident fund. Uses the 2026-27 salaried slabs and shows how much tax your employer should deduct each month.",
    crumb: "Salary Calculator",
    appName: "Pakistan Salary Tax Calculator 2026-27",
    updated: "2026-10-03",
    priority: "0.9",
  },
  "/freelancer-tax": {
    type: "calculator",
    title: "Freelancer Tax Calculator Pakistan 2026-27: 0.25% PSEB vs 1%",
    description:
      "Upwork, Fiverr or direct foreign clients? Calculate tax on IT export remittances under Section 154A (0.25% with PSEB, 1% without) plus tax on local-client income.",
    crumb: "Freelancer Tax Calculator",
    appName: "Pakistan Freelancer Tax Calculator 2026-27",
    updated: "2026-10-03",
    priority: "0.85",
  },
  "/withholding-tax": {
    type: "calculator",
    title: "Withholding Tax Calculator Pakistan 2026-27: Filer vs Non-Filer",
    description:
      "Calculate WHT on bank profit, dividends, prize bonds, property, cash withdrawals, contracts and IT exports. Filer and non-filer rates for Tax Year 2027 side by side.",
    crumb: "Withholding Tax Calculator",
    appName: "Pakistan Withholding Tax Calculator 2026-27",
    updated: "2026-10-03",
    priority: "0.85",
  },
  "/zakat": {
    type: "calculator",
    title: "Zakat Calculator Pakistan 2026: Cash, Gold, Silver & Savings",
    description:
      "Add up cash, bank balances, gold, silver, shares and business stock, subtract debts due now, and see if you have reached Nisab and how much Zakat you owe.",
    crumb: "Zakat Calculator",
    appName: "Pakistan Zakat Calculator",
    updated: "2026-10-03",
    priority: "0.85",
  },
  "/gold-zakat": {
    type: "calculator",
    title: "Gold Zakat Calculator Pakistan: Per Tola & Gram (24K to 18K)",
    description:
      "Zakat on gold jewellery, coins and bars in tola or grams for 24K, 22K, 21K and 18K. Enter today's Sarafa rate to check gold Nisab (7.5 tola) and 2.5% Zakat.",
    crumb: "Gold Zakat Calculator",
    appName: "Gold Zakat Calculator Pakistan",
    updated: "2026-10-03",
    priority: "0.8",
  },
  "/silver-zakat": {
    type: "calculator",
    title: "Silver Zakat Calculator Pakistan: 52.5 Tola Nisab in Rupees",
    description:
      "Work out Zakat on silver in tola or grams and see the silver Nisab (52.5 tola / 612.36 g) in rupees. Enter your local silver rate for an exact figure.",
    crumb: "Silver Zakat Calculator",
    appName: "Silver Zakat Calculator Pakistan",
    updated: "2026-10-03",
    priority: "0.8",
  },
  "/bank-interest": {
    type: "calculator",
    title: "Bank Profit Calculator Pakistan: Profit After Tax (15% / 30%)",
    description:
      "Profit on a savings account or term deposit after withholding tax: 15% for filers, 30% for non-filers. Shows gross and net profit and what filing saves you.",
    crumb: "Bank Profit Calculator",
    appName: "Pakistan Bank Profit Calculator",
    updated: "2026-10-03",
    priority: "0.8",
  },
  "/prize-bond-tax": {
    type: "calculator",
    title: "Prize Bond Tax Calculator Pakistan 2026: 15% Filer, 30% Non-Filer",
    description:
      "Enter your prize amount to see the tax deducted under Section 156 and the net cash you receive: 15% for filers, 30% for non-filers. The deduction is a final tax.",
    crumb: "Prize Bond Tax Calculator",
    appName: "Prize Bond Tax Calculator Pakistan",
    updated: "2026-10-03",
    priority: "0.75",
  },
  "/sim-load-tax": {
    type: "calculator",
    title: "Mobile Load Tax Calculator: Balance on Rs 100 Recharge (2026)",
    description:
      "How much balance do you really get on Jazz, Zong, Ufone or Telenor? 15% advance tax is taken at recharge (Rs 13.04 per Rs 100), then 19.5% sales tax as you use it.",
    crumb: "Mobile Load Tax Calculator",
    appName: "Mobile Load Tax Calculator Pakistan",
    updated: "2026-10-03",
    priority: "0.75",
  },

  // ── Guides ─────────────────────────────────────────────────
  "/blogs": {
    type: "page",
    title: "Pakistan Tax & Zakat Guides 2026-27 | PK Tax Calc",
    description:
      "Plain-English guides to FBR tax slabs, salary tax, filer status, return deadlines, withholding tax and Zakat in Pakistan, each linked to a free calculator.",
    crumb: "Tax Guides",
    updated: "2026-10-03",
    priority: "0.7",
    changefreq: "weekly",
  },
  "/blog/income-tax-slabs-2026": {
    type: "article",
    parent: GUIDES,
    title: "Income Tax Slabs 2026-27 Pakistan: Salaried & Business (FBR)",
    description:
      "FBR tax slabs for Tax Year 2027: salaried (0% to 35%, new 32% bracket) and business individuals, with tax at common salaries and what changed from 2025-26.",
    crumb: "Income Tax Slabs 2026-27",
    updated: "2026-10-03",
    priority: "0.85",
  },
  "/blog/salary-tax-guide": {
    type: "article",
    parent: GUIDES,
    title: "Tax on Salary in Pakistan 2026-27: Monthly Tax Table & Examples",
    description:
      "How much tax is deducted from a Rs 100,000, 150,000 or 300,000 salary? Monthly salary tax table for 2026-27, the formula step by step, and worked examples.",
    crumb: "Salary Tax Guide",
    updated: "2026-10-03",
    priority: "0.8",
  },
  "/blog/salary-deduction-breakdown": {
    type: "article",
    parent: GUIDES,
    title: "Salary Deductions in Pakistan 2026-27: Tax, EOBI & Provident Fund",
    description:
      "What comes off a Pakistani payslip and why: income tax, EOBI, provident fund and other deductions, with full worked examples at three salary levels.",
    crumb: "Salary Deductions Explained",
    updated: "2026-10-03",
    priority: "0.65",
  },
  "/blog/tax-return-deadline": {
    type: "article",
    parent: GUIDES,
    title: "Tax Return Last Date 2026 Extended to 15 October | FBR",
    description:
      "FBR extended the Tax Year 2026 return deadline from 30 September to 15 October 2026 for individuals and AOPs. Who it covers and what filing late costs.",
    crumb: "Tax Return Deadline 2026",
    updated: "2026-10-03",
    priority: "0.8",
  },
  "/blog/become-filer": {
    type: "article",
    parent: GUIDES,
    title: "How to Become a Filer in Pakistan (2026): IRIS Steps & ATL Check",
    description:
      "Register on FBR IRIS, file your return and get on the Active Taxpayers List. Step-by-step process, what you need, and how to check your filer status by SMS.",
    crumb: "How to Become a Filer",
    updated: "2026-10-03",
    priority: "0.75",
  },
  "/blog/filer-vs-non-filer": {
    type: "article",
    parent: GUIDES,
    title: "Filer vs Non-Filer Tax Rates Pakistan 2026-27: Full Comparison",
    description:
      "What non-filers pay vs filers in 2026-27 on bank profit, cash withdrawals, property, prizes and dividends, with the rupee difference on real amounts.",
    crumb: "Filer vs Non-Filer",
    updated: "2026-10-03",
    priority: "0.75",
  },
  "/blog/late-filing-penalties-2026": {
    type: "article",
    parent: GUIDES,
    title: "Late Tax Return Penalty Pakistan 2026: Rs 25,000 ATL Surcharge",
    description:
      "Missed the deadline? The Section 182 late-filing penalty, the new Rs 25,000 ATL surcharge for individuals, and the steps to get back on the Active Taxpayers List.",
    crumb: "Late Filing Penalties",
    updated: "2026-10-03",
    priority: "0.65",
  },
  "/blog/wht-cash-withdrawal-2026": {
    type: "article",
    parent: GUIDES,
    title: "Cash Withdrawal Tax Pakistan 2026: 0.8% for Non-Filers (231AB)",
    description:
      "Non-filers pay 0.8% on the whole amount when cash withdrawn in a day exceeds Rs 50,000. Filers pay nothing. Rules, worked examples and how to claim it back.",
    crumb: "Cash Withdrawal Tax",
    updated: "2026-10-03",
    priority: "0.65",
  },
  "/blog/vehicle-token-tax-2026": {
    type: "article",
    parent: GUIDES,
    title: "Vehicle Token Tax Pakistan 2026: Rates by Engine Capacity",
    description:
      "How annual vehicle token tax and FBR advance tax on registration work in Pakistan, rates by engine capacity, and why filer status changes what you pay.",
    crumb: "Vehicle Token Tax",
    updated: "2026-07-18",
    priority: "0.6",
  },
  "/blog/zakat-guide": {
    type: "article",
    parent: GUIDES,
    title: "How to Calculate Zakat in Pakistan: Step-by-Step with Examples",
    description:
      "Which assets count, which don't, how to deduct debts, gold jewellery opinions and bank Zakat deduction, with a full worked example in rupees.",
    crumb: "Zakat Guide",
    updated: "2026-10-03",
    priority: "0.75",
  },
  "/blog/zakat-nisab": {
    type: "article",
    parent: GUIDES,
    title: "Zakat Nisab 2026 Pakistan: Gold & Silver Nisab in Rupees",
    description:
      "Nisab is 7.5 tola of gold or 52.5 tola of silver. See what that is in rupees at current Sarafa rates, which one to use, and how to work it out on the day you pay.",
    crumb: "Zakat Nisab",
    updated: "2026-10-03",
    priority: "0.75",
  },
  "/blog/zakat-on-provident-fund-eobi": {
    type: "article",
    parent: GUIDES,
    title: "Is Provident Fund or EOBI Money Subject to Zakat? | Pakistan",
    description:
      "Whether locked-in retirement savings like provident fund, gratuity and EOBI count toward your Zakat, and what changes once you withdraw them.",
    crumb: "Zakat on Provident Fund & EOBI",
    updated: "2026-07-18",
    priority: "0.6",
  },

  // ── Site pages ─────────────────────────────────────────────
  "/about": {
    type: "page",
    title: "About PK Tax Calc: Who We Are & How We Check Rates",
    description:
      "Who runs PK Tax Calc, where our tax rates come from, how often they are reviewed, and how to report a mistake. Independent and not affiliated with FBR.",
    crumb: "About",
    updated: "2026-10-03",
    priority: "0.4",
    changefreq: "yearly",
  },
  "/contact": {
    type: "page",
    title: "Contact PK Tax Calc",
    description:
      "Report a calculation error, an outdated rate or suggest a calculator. Email PK Tax Calc directly; we usually reply within two working days.",
    crumb: "Contact",
    updated: "2026-10-03",
    priority: "0.4",
    changefreq: "yearly",
  },
  "/privacy-policy": {
    type: "page",
    title: "Privacy Policy | PK Tax Calc",
    description:
      "How PK Tax Calc handles data: calculator inputs never leave your browser. Cookies, advertising, analytics and your choices explained.",
    crumb: "Privacy Policy",
    updated: "2026-10-03",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/terms": {
    type: "page",
    title: "Terms of Use | PK Tax Calc",
    description:
      "The terms that apply when you use PK Tax Calc's free tax and Zakat calculators and guides, including limits of liability and acceptable use.",
    crumb: "Terms of Use",
    updated: "2026-10-03",
    priority: "0.3",
    changefreq: "yearly",
  },
  "/disclaimer": {
    type: "page",
    title: "Disclaimer: Tax & Zakat Estimates | PK Tax Calc",
    description:
      "PK Tax Calc gives estimates for planning, not tax or religious advice. How our figures can differ from FBR's and what to check before you file or pay Zakat.",
    crumb: "Disclaimer",
    updated: "2026-10-03",
    priority: "0.3",
    changefreq: "yearly",
  },
};

export const NOT_FOUND_META = {
  type: "page",
  title: "Page Not Found | PK Tax Calc",
  description: "The page you were looking for doesn't exist. Try one of our Pakistan tax and Zakat calculators instead.",
  crumb: "Page not found",
  noindex: true,
};

export const ROUTE_PATHS = Object.keys(ROUTE_META);
