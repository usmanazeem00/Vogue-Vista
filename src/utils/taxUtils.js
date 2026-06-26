// ===== FORMATTING =====
export const fmt = (n) =>
  "Rs " + Math.round(n).toLocaleString("en-PK");

export const fmtPlain = (n) =>
  Math.round(n).toLocaleString("en-PK");

// =============================================================
// TAX YEAR SELECTOR
// TY2026 = FY 2025-26  (Finance Act 2025, effective July 2025)
// TY2027 = FY 2026-27  (Finance Bill 2026, effective July 2026)
// =============================================================
export const TAX_YEARS = [
  { id: "TY2027", label: "2026-27 (Finance Bill 2026) — Current" },
  { id: "TY2026", label: "2025-26 (Finance Act 2025)" },
];
export const DEFAULT_TAX_YEAR = "TY2027";

// =============================================================
// SALARIED SLABS — TY2026 (Finance Act 2025, July 2025–June 2026)
// Source: Finance Act 2025 / hisaabkar.pk verified slabs
// =============================================================
export const SALARIED_SLABS_TY2026 = [
  { min: 0,        max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,   max: 1200000,   rate: 0.05, fixed: 0 },       // 5% on excess over 600k
  { min: 1200001,  max: 2200000,   rate: 0.15, fixed: 30000 },   // Rs 30,000 + 15%
  { min: 2200001,  max: 3200000,   rate: 0.25, fixed: 180000 },  // Rs 180,000 + 25%
  { min: 3200001,  max: 4100000,   rate: 0.30, fixed: 430000 },  // Rs 430,000 + 30%
  { min: 4100001,  max: Infinity,  rate: 0.35, fixed: 700000 },  // Rs 700,000 + 35%
];

// =============================================================
// SALARIED SLABS — TY2027 (Finance Bill 2026, effective July 2026)
// Key changes: rates cut from 2.2m upward; new 32% bracket 5.6m-7m;
// 9% surcharge on income > 10m abolished entirely.
// Source: Finance Bill 2026 presented June 12, 2026
// =============================================================
export const SALARIED_SLABS_TY2027 = [
  { min: 0,        max: 600000,    rate: 0,    fixed: 0 },
  { min: 600001,   max: 1200000,   rate: 0.01, fixed: 0 },       // 1% on excess over 600k
  { min: 1200001,  max: 2200000,   rate: 0.11, fixed: 6000 },    // Rs 6,000 + 11%
  { min: 2200001,  max: 3200000,   rate: 0.20, fixed: 116000 },  // Rs 116,000 + 20% (was 23%)
  { min: 3200001,  max: 4100000,   rate: 0.25, fixed: 316000 },  // Rs 316,000 + 25% (was 30%)
  { min: 4100001,  max: 5600000,   rate: 0.29, fixed: 541000 },  // Rs 541,000 + 29% (was 35%)
  { min: 5600001,  max: 7000000,   rate: 0.32, fixed: 976000 },  // Rs 976,000 + 32% NEW bracket
  { min: 7000001,  max: Infinity,  rate: 0.35, fixed: 1424000 }, // Rs 1,424,000 + 35% (no surcharge)
];

// =============================================================
// BUSINESS / NON-SALARIED SLABS — TY2026 (Finance Act 2025)
// Also applies to sole proprietors, freelancers, AOPs.
// Finance Bill 2026 did NOT change business slabs — same for TY2027.
// Source: hisaabkar.pk Finance Act 2025 verified slabs
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

// Convenience aliases pointing to latest year (update each July)
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

export function calcIncomeTax(income, isSalaried = true, taxYear = DEFAULT_TAX_YEAR) {
  const slabs = getSlabs(isSalaried, taxYear);
  for (const slab of slabs) {
    if (income <= slab.max) {
      const taxableAboveMin = Math.max(0, income - slab.min);
      return slab.fixed + taxableAboveMin * slab.rate;
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

// Surcharge: abolished in TY2027 for salaried; 9% on income > 10m in TY2026
export function calcSurcharge(tax, income, isSalaried, taxYear = DEFAULT_TAX_YEAR) {
  if (taxYear === "TY2027" && isSalaried) return 0; // fully abolished Finance Bill 2026
  if (income > 10000000) return tax * 0.09;
  return 0;
}

// =============================================================
// ZAKAT
// Nisab: gold 7.5 tola = 87.48g; silver 52.5 tola = 612.36g
// Rates are indicative — user should verify with today's Sarafa rate
// =============================================================
export const NISAB_GOLD_GRAMS   = 87.48;   // 7.5 tola
export const NISAB_SILVER_GRAMS = 612.36;  // 52.5 tola

export const GOLD_RATE_PER_GRAM   = 26000; // Rs/gram 24K (updated for 2025-26)
export const SILVER_RATE_PER_GRAM = 320;   // Rs/gram (updated for 2025-26)

export const NISAB_GOLD_PKR   = NISAB_GOLD_GRAMS   * GOLD_RATE_PER_GRAM;
export const NISAB_SILVER_PKR = NISAB_SILVER_GRAMS * SILVER_RATE_PER_GRAM;

export const ZAKAT_RATE = 0.025; // 2.5%

// =============================================================
// WITHHOLDING TAX — TY2026 / TY2027 (Finance Act 2025 + Bill 2026)
// Notable changes vs TY2025:
//   Non-filer bank profit: 30% (was 35%) — Finance Act 2025
//   Cash withdrawal filer: 0.15% (was 0.1%), non-filer: 0.60%
//   Property purchase filer TY2027: 1.25% (from 2.5%) — Finance Bill 2026
//   Property sale filer TY2027: 2.75% (from 5.5%)      — Finance Bill 2026
//   IT/Freelance exports Section 154A: 0.25% (PSEB-registered)
//   Capital gains on premature debt disposal: 15% (new TY2026)
// =============================================================
export const WHT_CATEGORIES = [
  { id: "contract_filer",           label: "Contracts — Filer",                   rate: 0.075  },
  { id: "contract_nonfiler",        label: "Contracts — Non-Filer",               rate: 0.15   },
  { id: "services_filer",           label: "Services — Filer",                    rate: 0.08   },
  { id: "services_nonfiler",        label: "Services — Non-Filer",                rate: 0.16   },
  { id: "salary",                   label: "Salaries (Progressive Slab)",          rate: null   },
  { id: "dividend_filer",           label: "Dividend — Filer",                    rate: 0.15   },
  { id: "dividend_nonfiler",        label: "Dividend — Non-Filer",                rate: 0.30   },
  { id: "rent_filer",               label: "Rent (Commercial) — Filer",           rate: 0.15   },
  { id: "rent_nonfiler",            label: "Rent (Commercial) — Non-Filer",       rate: 0.30   },
  { id: "bank_profit_filer",        label: "Bank Profit — Filer",                 rate: 0.15   },
  { id: "bank_profit_nonfiler",     label: "Bank Profit — Non-Filer",             rate: 0.30   }, // was 35% in TY2025
  { id: "import_filer",             label: "Imports — Filer",                     rate: 0.05   },
  { id: "import_nonfiler",          label: "Imports — Non-Filer",                 rate: 0.08   },
  { id: "export",                   label: "Export Proceeds (Sec 154)",            rate: 0.01   },
  { id: "freelance_export",         label: "IT/Freelance Exports (Sec 154A)",      rate: 0.0025 }, // 0.25% PSEB-registered
  { id: "prize",                    label: "Prize / Lottery / Winnings",           rate: 0.25   },
  { id: "cash_withdrawal_filer",    label: "Cash Withdrawal >50K — Filer",        rate: 0.0015 }, // 0.15%
  { id: "cash_withdrawal_nonfiler", label: "Cash Withdrawal >50K — Non-Filer",    rate: 0.006  }, // 0.60%
  { id: "property_buy_filer",       label: "Property Purchase — Filer (TY2027)",  rate: 0.0125 }, // 1.25% new
  { id: "property_buy_nonfiler",    label: "Property Purchase — Non-Filer",       rate: 0.025  },
  { id: "property_sale_filer",      label: "Property Sale — Filer (TY2027)",      rate: 0.0275 }, // 2.75% new
  { id: "property_sale_nonfiler",   label: "Property Sale — Non-Filer",           rate: 0.055  },
  { id: "capital_gains_debt",       label: "Capital Gains — Debt (pre-mature)",   rate: 0.15   }, // new TY2026
];