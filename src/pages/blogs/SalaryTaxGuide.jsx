import React from "react";

export default function SalaryTaxGuide() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero-inner">
          <div className="hero-badge">Salary Tax Guide</div>
          <h1>How to Calculate Salary Tax in Pakistan</h1>
          <p>
            Learn how employers calculate monthly and annual income tax on
            salaries in Pakistan and understand your take-home pay.
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: "60px 24px" }}>
        <div className="calc-card">
          <h2>What is Salary Tax?</h2>

          <p>
            Salary tax is the income tax deducted from an employee's salary
            according to the income tax slabs announced by the Government of
            Pakistan and administered by the Federal Board of Revenue (FBR).
            Employers are responsible for calculating and deducting tax every
            month and depositing it with the FBR on behalf of their employees.
          </p>

          <p>
            Understanding how salary tax works can help you estimate your
            monthly deductions, plan your finances, and verify whether the tax
            deducted by your employer is accurate.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Step 1: Calculate Your Annual Gross Salary
          </h2>

          <p>
            The first step is to determine your total annual salary before any
            deductions. This usually includes:
          </p>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Basic salary</li>
            <li>House rent allowance</li>
            <li>Medical allowance</li>
            <li>Bonuses and incentives</li>
            <li>Other taxable allowances and benefits</li>
          </ul>

          <p style={{ marginTop: 15 }}>
            <strong>Formula:</strong> Monthly Gross Salary × 12 = Annual Gross
            Salary
          </p>

          <h2 style={{ marginTop: 40 }}>
            Step 2: Find the Applicable Tax Slab
          </h2>

          <p>
            Pakistan follows a progressive tax system, which means higher income
            levels are taxed at higher rates. Once your annual salary is known,
            it is matched against the latest FBR tax slabs to determine the tax
            payable.
          </p>

          <p>
            Different tax rates apply to different portions of your income, so
            only the amount that falls within a particular slab is taxed at that
            slab's rate.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Step 3: Calculate Annual Income Tax
          </h2>

          <p>
            After determining the applicable tax slabs, your annual income tax
            is calculated by applying the prescribed rates to the taxable
            portions of your income.
          </p>

          <p>
            The final amount represents your estimated income tax liability for
            the entire tax year.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Step 4: Calculate Monthly Tax Deduction
          </h2>

          <p>
            Employers generally spread the annual tax liability evenly across
            the year by deducting one-twelfth of the annual tax amount every
            month.
          </p>

          <p style={{ marginTop: 15 }}>
            <strong>Formula:</strong> Annual Income Tax ÷ 12 = Monthly Tax
            Deduction
          </p>

          <h2 style={{ marginTop: 40 }}>
            Example Calculation
          </h2>

          <p>
            Suppose your monthly gross salary is Rs. 200,000.
          </p>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Monthly Gross Salary: Rs. 200,000</li>
            <li>Annual Gross Salary: Rs. 2,400,000</li>
            <li>Applicable tax is calculated according to the latest tax slabs.</li>
            <li>The resulting annual tax is divided by 12.</li>
          </ul>

          <p style={{ marginTop: 15 }}>
            The exact tax amount depends on the latest Finance Act and any tax
            relief measures announced by the government.
          </p>

          <h2 style={{ marginTop: 40 }}>
            Factors That Affect Your Salary Tax
          </h2>

          <ul style={{ paddingLeft: 20, marginTop: 15 }}>
            <li>Annual salary amount.</li>
            <li>Latest FBR tax slabs and rates.</li>
            <li>Tax credits and exemptions, if applicable.</li>
            <li>Bonuses and additional compensation.</li>
            <li>Changes in salary during the year.</li>
          </ul>

          <h2 style={{ marginTop: 40 }}>
            Why Use a Salary Tax Calculator?
          </h2>

          <p>
            A salary tax calculator helps employees instantly estimate their
            monthly and annual tax liability without manually applying multiple
            tax slabs. It can also help you compare salary offers and understand
            your expected take-home salary before accepting a new job.
          </p>

          <p>
            Our Pakistan Salary Tax Calculator is regularly updated with the
            latest FBR tax rates and provides quick and accurate tax estimates
            in just a few seconds.
          </p>

          <div
            style={{
              marginTop: 35,
              padding: "20px",
              background: "#f8fafc",
              borderRadius: "12px",
            }}
          >
            <strong>Tip:</strong> If you receive bonuses, annual increments, or
            allowances during the year, your employer may adjust your monthly
            tax deductions to ensure the correct annual tax is collected.
          </div>
        </div>
      </div>
    </>
  );
}