// ===== FORMATTING =====
export const fmt = (n) =>
  "Rs " + Math.round(n).toLocaleString("en-PK");

export const fmtPlain = (n) =>
  Math.round(n).toLocaleString("en-PK");

// =============================================================
// TAX YEAR SELECTOR
// TY2027 = FY 2026-27  (Finance Act 2026, 1 July 2026 – 30 June 2027)
// TY2026 = FY 2025-26  (Finance Act 2025, 1 July 2025 – 30 June 2026)
// =============================================================
export const TAX_YEARS = [
  { id: "TY2027", label: "2026-27 (Tax Year 2027) — Current" },
  { id: "TY2026", label: "2025-26 (Tax Year 2026)" },
];
export const DEFAULT_TAX_YEAR = "TY2027";

// Date the rates on this site were last checked against published sources.
export const RATES_REVIEWED = "3 October 2026";
export const RATES_REVIEWED_ISO = "2026-10-03";

// =============================================================
// SALARIED SLABS — TY2026 (Finance Act 2025, July 2025 – June 2026)
// Division I, Part I, First Schedule (salaried)
// =============================================================
export const SALARIED_SLABS_TY2026 = [
  { min: 0,        max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,   max: 1200000,   rate: 0.01, fixed: 0 },       // 1% of excess over 600k
  { min: 1200001,  max: 2200000,   rate: 0.11, fixed: 6000 },    // Rs 6,000 + 11%
  { min: 2200001,  max: 3200000,   rate: 0.23, fixed: 116000 },  // Rs 116,000 + 23%
  { min: 3200001,  max: 4100000,   rate: 0.30, fixed: 346000 },  // Rs 346,000 + 30%
  { min: 4100001,  max: Infinity,  rate: 0.35, fixed: 616000 },  // Rs 616,000 + 35%
];

// =============================================================
// SALARIED SLABS — TY2027 (Finance Act 2026, effective 1 July 2026)
// Rates cut from Rs 2.2m upward; new 32% bracket for Rs 5.6m–7m;
// surcharge on income above Rs 10m abolished.
// =============================================================
export const SALARIED_SLABS_TY2027 = [
  { min: 0,        max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,   max: 1200000,   rate: 0.01, fixed: 0 },       // 1% of excess over 600k
  { min: 1200001,  max: 2200000,   rate: 0.11, fixed: 6000 },    // Rs 6,000 + 11%
  { min: 2200001,  max: 3200000,   rate: 0.20, fixed: 116000 },  // Rs 116,000 + 20% (was 23%)
  { min: 3200001,  max: 4100000,   rate: 0.25, fixed: 316000 },  // Rs 316,000 + 25% (was 30%)
  { min: 4100001,  max: 5600000,   rate: 0.29, fixed: 541000 },  // Rs 541,000 + 29% (was 35%)
  { min: 5600001,  max: 7000000,   rate: 0.32, fixed: 976000 },  // Rs 976,000 + 32% (new bracket)
  { min: 7000001,  max: Infinity,  rate: 0.35, fixed: 1424000 }, // Rs 1,424,000 + 35%
];

// =============================================================
// BUSINESS / NON-SALARIED INDIVIDUAL SLABS
// Applies to sole proprietors, professionals, AOP members and
// freelancers' local-client income. Unchanged for TY2026 and TY2027.
// =============================================================
export const BUSINESS_SLABS_TY2026 = [
  { min: 0,        max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,   max: 1200000,   rate: 0.15, fixed: 0 },        // 15%
  { min: 1200001,  max: 1600000,   rate: 0.20, fixed: 90000 },    // Rs 90,000 + 20%
  { min: 1600001,  max: 3200000,   rate: 0.30, fixed: 170000 },   // Rs 170,000 + 30%
  { min: 3200001,  max: 5600000,   rate: 0.40, fixed: 650000 },   // Rs 650,000 + 40%
  { min: 5600001,  max: Infinity,  rate: 0.45, fixed: 1610000 },  // Rs 1,610,000 + 45%
];

export const BUSINESS_SLABS_TY2027 = BUSINESS_SLABS_TY2026; // unchanged

// Convenience aliases pointing to the current year (update each July)
export const SALARIED_SLABS = SALARIED_SLABS_TY2027;
export const BUSINESS_SLABS = BUSINESS_SLABS_TY2027;

// =============================================================
// CALCULATION FUNCTIONS
// =============================================================
export function getSlabs(isSalaried, taxYear = DEFAULT_TAX_YEAR) {
  if (isSalaried) {
    return taxYear === "TY2027" ? SALARIED_SLABS_TY2027 : SALARIED_SLABS_TY2026;
  }
  return taxYear === "TY2027" ? BUSINESS_SLABS_TY2027 : BUSINESS_SLABS_TY2026;
}

// The amount the slab percentage is charged on starts at the previous
// slab's upper limit (e.g. "1% of the amount exceeding Rs 600,000").
const slabBase = (slab) => (slab.min > 0 ? slab.min - 1 : 0);

// Base tax from the slab table (before any surcharge).
export function calcIncomeTax(income, isSalaried = true, taxYear = DEFAULT_TAX_YEAR) {
  const slabs = getSlabs(isSalaried, taxYear);
  for (const slab of slabs) {
    if (income <= slab.max) {
      return slab.fixed + Math.max(0, income - slabBase(slab)) * slab.rate;
    }
  }
  return 0;
}

export function getActiveSlab(income, isSalaried = true, taxYear = DEFAULT_TAX_YEAR) {
  const slabs = getSlabs(isSalaried, taxYear);
  for (const slab of slabs) {
    if (income <= slab.max) return slab;
  }
  return slabs[slabs.length - 1];
}

// Surcharge on individuals with taxable income above Rs 10 million:
//   TY2026 — 9% of tax for salaried, 10% for other individuals/AOPs.
//   TY2027 — abolished by Finance Act 2026.
export const SURCHARGE_THRESHOLD = 10000000;
export function calcSurcharge(tax, income, isSalaried, taxYear = DEFAULT_TAX_YEAR) {
  if (taxYear === "TY2027") return 0;
  if (income <= SURCHARGE_THRESHOLD) return 0;
  return tax * (isSalaried ? 0.09 : 0.10);
}

// Tax including surcharge, plus the slab-by-slab working.
export function calcTaxBreakdown(income, isSalaried = true, taxYear = DEFAULT_TAX_YEAR) {
  const slabs = getSlabs(isSalaried, taxYear);
  const bands = [];
  for (const slab of slabs) {
    const lower = slabBase(slab);
    if (income <= lower) break;
    const upper = Math.min(income, slab.max);
    bands.push({ lower, upper, rate: slab.rate, tax: (upper - lower) * slab.rate });
  }
  const tax = calcIncomeTax(income, isSalaried, taxYear);
  const surcharge = calcSurcharge(tax, income, isSalaried, taxYear);
  const total = tax + surcharge;
  return {
    bands,
    tax,
    surcharge,
    total,
    slab: getActiveSlab(income, isSalaried, taxYear),
    effectiveRate: income > 0 ? (total / income) * 100 : 0,
  };
}

// =============================================================
// ZAKAT
// Nisab: gold 7.5 tola = 87.48 g; silver 52.5 tola = 612.36 g
// Default metal prices are indicative only — the calculators ask the
// user for today's Sarafa rate.
// =============================================================
export const TOLA_GRAMS = 11.664;
export const NISAB_GOLD_GRAMS   = 87.48;   // 7.5 tola
export const NISAB_SILVER_GRAMS = 612.36;  // 52.5 tola

// Karachi Sarafa benchmark, 3 October 2026: 24K gold Rs 440,636/tola,
// silver Rs 6,578/tola.
export const METAL_RATES_DATE = "3 October 2026";
export const GOLD_RATE_PER_TOLA   = 440636;
export const SILVER_RATE_PER_TOLA = 6578;
export const GOLD_RATE_PER_GRAM   = Math.round(GOLD_RATE_PER_TOLA / TOLA_GRAMS);   // ≈ 37,777
export const SILVER_RATE_PER_GRAM = Math.round(SILVER_RATE_PER_TOLA / TOLA_GRAMS); // ≈ 564

export const NISAB_GOLD_PKR   = NISAB_GOLD_GRAMS   * GOLD_RATE_PER_GRAM;
export const NISAB_SILVER_PKR = NISAB_SILVER_GRAMS * SILVER_RATE_PER_GRAM;

export const ZAKAT_RATE = 0.025; // 2.5%

// =============================================================
// PAYROLL
// EOBI is charged on the notified minimum wage, not actual salary:
// employee 1%, employer 5%.
// =============================================================
export const EOBI_WAGE_BASE = 40000;
export const EOBI_EMPLOYEE = EOBI_WAGE_BASE * 0.01; // Rs 400/month
export const EOBI_EMPLOYER = EOBI_WAGE_BASE * 0.05; // Rs 2,000/month

// =============================================================
// WITHHOLDING TAX — Tax Year 2027 (Finance Act 2026)
// Non-filer = person not on the Active Taxpayers List (ATL); the
// Tenth Schedule generally doubles the filer rate.
// `threshold` = no tax at or below this amount; above it the rate
// applies to the whole amount (as with Section 231AB).
// =============================================================
export const WHT_CATEGORIES = [
  { id: "bank_profit",   section: "151",      label: "Bank profit / profit on debt (individuals)", filer: 0.15,   nonFiler: 0.30,  nature: "Final tax on profit up to Rs 5m a year; adjustable above that" },
  { id: "dividend",      section: "150",      label: "Dividends (general)",                       filer: 0.15,   nonFiler: 0.30,  nature: "Final tax" },
  { id: "prize_bond",    section: "156",      label: "Prize bond / crossword winnings",           filer: 0.15,   nonFiler: 0.30,  nature: "Final tax" },
  { id: "lottery",       section: "156",      label: "Raffle, lottery, quiz or sales promotion prize", filer: 0.20, nonFiler: 0.40, nature: "Final tax" },
  { id: "cash_withdrawal", section: "231AB",  label: "Cash withdrawal (daily total above Rs 50,000)", filer: 0,   nonFiler: 0.008, threshold: 50000, nature: "Advance tax, adjustable" },
  { id: "property_buy",  section: "236K",     label: "Property purchase (buyer)",                 filer: 0.0125, nonFiler: 0.105, nature: "Advance tax, adjustable. Non-filer rate shown is for property under Rs 100m" },
  { id: "property_sell", section: "236C",     label: "Property sale (seller)",                    filer: 0.0275, nonFiler: 0.115, nature: "Advance tax, adjustable" },
  { id: "contract_company", section: "153(1)(c)", label: "Contracts — paid to a company",        filer: 0.075,  nonFiler: 0.15,  nature: "Minimum tax" },
  { id: "contract_individual", section: "153(1)(c)", label: "Contracts — paid to an individual / AOP", filer: 0.08, nonFiler: 0.16, nature: "Minimum tax" },
  { id: "services_it",   section: "153(1)(b)", label: "IT and IT-enabled services (local)",       filer: 0.04,   nonFiler: 0.08,  nature: "Minimum tax" },
  { id: "it_export_pseb", section: "154A",    label: "IT export proceeds — PSEB registered",      filer: 0.0025, nonFiler: 0.0025, nature: "Final tax (extended to 30 June 2029)" },
  { id: "it_export",     section: "154A",     label: "IT export proceeds — not PSEB registered",  filer: 0.01,   nonFiler: 0.01,  nature: "Deducted by the bank when the remittance arrives" },
  { id: "mobile",        section: "236",      label: "Mobile & internet (prepaid load / bills)",  filer: 0.15,   nonFiler: 0.75,  nature: "Advance tax; non-filer rate applies only if FBR adds you to its Income Tax General Order list" },
];

export function calcWht(categoryId, amount, isFiler) {
  const cat = WHT_CATEGORIES.find((c) => c.id === categoryId) || WHT_CATEGORIES[0];
  const rate = isFiler ? cat.filer : cat.nonFiler;
  const taxable = cat.threshold && amount <= cat.threshold ? 0 : amount;
  const wht = taxable * rate;
  return { cat, rate, taxable, wht, net: amount - wht };
}
