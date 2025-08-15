import { FAQ } from "@/components/Accordion";

export type Article = {
  id: string;
  title: string;
  body: string;
  author: string;
  publishedDate: string;
  category: string;
};

const faqs: FAQ[] = [
  {
    id: "1",
    q: "Is it really free to start?",
    a: "Yes. You can start and see your refund estimate for free. You'll only pay when you file.",
  },
  {
    id: "2",
    q: "Can I import last year's return?",
    a: "You can quickly enter prior-year numbers manually now. Automated import is coming soon.",
  },
  {
    id: "3",
    q: "How do I get live support?",
    a: "Use the Support tab to search FAQs or contact us. Priority chat is available during peak season.",
  },
  {
    id: "4",
    q: "Is my data secure?",
    a: "We use industry-standard encryption in transit and at rest, with strict access controls.",
  },
];

export const HELP_ARTICLES: Article[] = [
  {
    id: "a1",
    title: "When do I get my refund?",
    body: "Most refunds arrive in less than 21 days after IRS acceptance. Direct deposit is faster than paper checks. You can track your refund status using the IRS Where's My Refund tool.\n\nThe exact timing depends on several factors:\n\n• **Filing method**: E-filed returns are processed faster than paper returns\n• **Payment method**: Direct deposit arrives 1-2 weeks faster than paper checks\n• **Return complexity**: Simple returns process faster than complex ones with multiple forms\n• **IRS processing volume**: Peak season (January-April) may have delays\n\nTo check your refund status, visit IRS.gov and use the 'Where's My Refund' tool. You'll need your Social Security number, filing status, and exact refund amount.",
    author: "Sarah Mitchell",
    publishedDate: "2024-01-15",
    category: "Refunds"
  },
  {
    id: "a2",
    title: "What documents do I need to file?",
    body: "Gathering the right documents before you start filing can save you time and ensure accuracy. Here's what you'll typically need:\n\n**Income Documents:**\n• W-2 forms from all employers\n• 1099 forms (1099-INT, 1099-DIV, 1099-MISC, etc.)\n• K-1 forms from partnerships or S-corporations\n• Social Security benefits statements (SSA-1099)\n\n**Deduction Documents:**\n• Mortgage interest statements (1098)\n• Student loan interest statements\n• Charitable donation receipts\n• Medical expense receipts\n• State and local tax payment records\n\n**Personal Information:**\n• Social Security cards for you, spouse, and dependents\n• Valid photo ID\n• Bank account information for direct deposit\n• Prior year tax return for reference",
    author: "Michael Chen",
    publishedDate: "2024-01-10",
    category: "Filing Requirements"
  },
  {
    id: "a3",
    title: "Can I amend my tax return?",
    body: "Yes, you can amend your tax return using Form 1040X if you need to make corrections. You have up to 3 years from the original filing date to amend.\n\n**Common reasons to amend:**\n• Forgot to report income\n• Missed deductions or credits\n• Filing status change\n• Incorrect dependent information\n• Math errors (though IRS usually corrects these automatically)\n\n**How to amend:**\n1. Wait until your original return is processed\n2. Complete Form 1040X\n3. Attach any supporting documents\n4. Mail the form (e-filing not available for amendments)\n\n**Processing time:** Amended returns typically take 8-12 weeks to process. You can check the status using the IRS 'Where's My Amended Return' tool.",
    author: "Jennifer Rodriguez",
    publishedDate: "2024-01-20",
    category: "Amendments"
  },
  {
    id: "a4",
    title: "What is the standard deduction for 2023?",
    body: "The standard deduction is a fixed dollar amount that reduces your taxable income. For 2023 tax returns, the amounts are:\n\n**Standard Deduction Amounts:**\n• Single or Married Filing Separately: $13,850\n• Married Filing Jointly: $27,700\n• Head of Household: $20,800\n\n**Additional Standard Deduction:**\nIf you're 65 or older, or blind, you get an additional amount:\n• Single/Head of Household: +$1,850\n• Married: +$1,500 per person\n\n**Should you itemize?**\nYou should itemize deductions only if they exceed your standard deduction amount. Common itemized deductions include:\n• State and local taxes (up to $10,000)\n• Mortgage interest\n• Charitable contributions\n• Medical expenses over 7.5% of AGI",
    author: "David Park",
    publishedDate: "2024-01-05",
    category: "Deductions"
  },
  {
    id: "a5",
    title: "How do I claim the Child Tax Credit?",
    body: "The Child Tax Credit can significantly reduce your tax bill. Here's what you need to know:\n\n**Credit Amount:**\n• Up to $2,000 per qualifying child\n• Up to $1,600 may be refundable (Additional Child Tax Credit)\n\n**Qualifying Child Requirements:**\n• Under age 17 at the end of the tax year\n• Your son, daughter, stepchild, foster child, brother, sister, or descendant\n• Must have lived with you for more than half the year\n• Must have a valid Social Security number\n• Cannot provide more than half of their own support\n\n**Income Limits:**\nThe credit phases out at higher income levels:\n• Single: Begins at $200,000\n• Married Filing Jointly: Begins at $400,000\n\n**How to Claim:**\nThe credit is automatically calculated when you enter your qualifying children's information in your tax software.",
    author: "Lisa Thompson",
    publishedDate: "2024-01-12",
    category: "Credits"
  },
  {
    id: "a6",
    title: "What expenses can I deduct for home office?",
    body: "If you use part of your home exclusively for business, you may be able to deduct home office expenses.\n\n**Qualification Requirements:**\n• Exclusive use: The space must be used ONLY for business\n• Regular use: You must use the space for business on a regular basis\n• Principal place of business: It's your main place of business, or you use it regularly to meet clients\n\n**Two Methods to Calculate:**\n\n**1. Simplified Method:**\n• Deduct $5 per square foot\n• Maximum 300 square feet ($1,500 max deduction)\n• Easier record-keeping\n\n**2. Actual Expense Method:**\n• Calculate percentage of home used for business\n• Deduct that percentage of:\n  - Mortgage interest or rent\n  - Property taxes\n  - Utilities\n  - Repairs and maintenance\n  - Depreciation\n\n**Use Form 8829** to calculate and report your home office deduction.",
    author: "Robert Kim",
    publishedDate: "2024-01-18",
    category: "Business Deductions"
  },
  {
    id: "a7",
    title: "How do I report cryptocurrency transactions?",
    body: "Cryptocurrency transactions are taxable events that must be reported to the IRS.\n\n**Taxable Events Include:**\n• Selling crypto for cash\n• Trading one cryptocurrency for another\n• Using crypto to purchase goods or services\n• Receiving crypto as payment for services\n• Mining or staking rewards\n\n**Tax Treatment:**\n• **Capital gains/losses**: When you sell or exchange crypto\n• **Ordinary income**: Mining rewards, staking rewards, payments received\n\n**Required Forms:**\n• **Form 8949**: Report each transaction\n• **Schedule D**: Summarize capital gains and losses\n• **Schedule 1**: Report ordinary income from crypto\n\n**Record Keeping:**\nMaintain detailed records for each transaction:\n• Date acquired and date sold/exchanged\n• Purchase price (basis)\n• Sale price or fair market value\n• Description of the cryptocurrency\n\n**Important**: The IRS asks about crypto activity on Form 1040, so answer truthfully.",
    author: "Amanda Foster",
    publishedDate: "2024-01-25",
    category: "Investments"
  },
  {
    id: "a8",
    title: "What is the Earned Income Tax Credit (EITC)?",
    body: "The Earned Income Tax Credit is a refundable credit designed to help low-to-moderate income workers and families.\n\n**2023 Maximum Credit Amounts:**\n• No qualifying children: $560\n• 1 qualifying child: $3,995\n• 2 qualifying children: $6,604\n• 3+ qualifying children: $7,430\n\n**Income Limits (2023):**\n**Single/Head of Household:**\n• No children: $17,640\n• 1 child: $46,560\n• 2 children: $52,918\n• 3+ children: $56,838\n\n**Married Filing Jointly (add $6,610 to above limits)**\n\n**Qualifying Child Requirements:**\n• Relationship: Son, daughter, adopted child, stepchild, foster child, or descendant\n• Age: Under 19 (or under 24 if full-time student, or any age if permanently disabled)\n• Residency: Lived with you in the US for more than half the year\n\n**Key Benefits:**\n• Refundable credit (you can get money back even if you owe no tax)\n• Reduces tax owed dollar-for-dollar\n• No limit on the number of years you can claim it",
    author: "Carlos Martinez",
    publishedDate: "2024-01-08",
    category: "Credits"
  },
  {
    id: "a9",
    title: "Can I deduct medical expenses?",
    body: "You can deduct medical expenses that exceed 7.5% of your adjusted gross income (AGI) if you itemize deductions.\n\n**Qualifying Medical Expenses:**\n• Doctor, dentist, and hospital visits\n• Prescription medications\n• Medical equipment (wheelchairs, crutches, etc.)\n• Vision and dental care\n• Mental health services\n• Long-term care services\n• Health insurance premiums (in some cases)\n• Transportation for medical care\n\n**How the Deduction Works:**\n1. Add up all qualifying medical expenses\n2. Calculate 7.5% of your AGI\n3. Subtract #2 from #1\n4. The result is your deductible medical expenses\n\n**Example:**\n• AGI: $50,000\n• Medical expenses: $5,000\n• 7.5% of AGI: $3,750\n• Deductible amount: $1,250\n\n**Important Notes:**\n• You must itemize to claim this deduction\n• Keep detailed records and receipts\n• Expenses must be primarily for medical care\n• You can include expenses for yourself, spouse, and dependents",
    author: "Dr. Patricia Wong",
    publishedDate: "2024-01-14",
    category: "Medical Deductions"
  },
  {
    id: "a10",
    title: "How do I handle estimated tax payments?",
    body: "If you expect to owe $1,000 or more in taxes when you file, you may need to make quarterly estimated tax payments.\n\n**Who Needs to Pay:**\n• Self-employed individuals\n• Business owners\n• Investors with significant capital gains\n• Anyone without enough tax withheld from paychecks\n\n**2024 Due Dates:**\n• Q1: April 15, 2024\n• Q2: June 17, 2024\n• Q3: September 16, 2024\n• Q4: January 15, 2025\n\n**How Much to Pay:**\nGenerally, you need to pay the smaller of:\n• 90% of current year's tax liability, OR\n• 100% of last year's tax (110% if prior year AGI > $150,000)\n\n**How to Calculate:**\n1. Estimate your adjusted gross income\n2. Calculate expected tax liability\n3. Subtract withholdings and credits\n4. Divide remaining amount by number of quarters left\n\n**Payment Methods:**\n• Online at IRS.gov (EFTPS)\n• Phone: 1-888-PAY-1040\n• Mail with Form 1040ES vouchers\n\n**Penalty Avoidance:**\nMake payments on time and in the correct amounts to avoid underpayment penalties.",
    author: "Thomas Anderson",
    publishedDate: "2024-01-22",
    category: "Estimated Taxes"
  },
  {
    id: "a11",
    title: "What is the difference between tax deductions and credits?",
    body: "Understanding the difference between deductions and credits can help you maximize your tax savings.\n\n**Tax Deductions:**\n• Reduce your taxable income\n• Savings = Deduction × Your tax rate\n• Example: $1,000 deduction in 22% bracket saves $220\n\n**Tax Credits:**\n• Directly reduce tax owed\n• Savings = Full credit amount\n• Example: $1,000 credit saves $1,000\n\n**Types of Credits:**\n\n**Refundable Credits:**\n• Can result in a refund even if you owe no tax\n• Examples: Earned Income Credit, Additional Child Tax Credit\n\n**Non-Refundable Credits:**\n• Can only reduce tax owed to zero\n• Examples: Child Tax Credit (partial), Education Credits\n\n**Common Deductions:**\n• Standard deduction or itemized deductions\n• Student loan interest\n• IRA contributions\n• Health Savings Account contributions\n\n**Common Credits:**\n• Child Tax Credit\n• American Opportunity Credit\n• Lifetime Learning Credit\n• Child and Dependent Care Credit\n\n**Strategy Tip:**\nCredits are generally more valuable than deductions because they provide dollar-for-dollar tax reduction.",
    author: "Rachel Green",
    publishedDate: "2024-01-11",
    category: "Tax Basics"
  },
  {
    id: "a12",
    title: "How do I report rental property income?",
    body: "Rental property income and expenses are reported on Schedule E (Supplemental Income and Loss).\n\n**Rental Income Includes:**\n• Monthly rent payments\n• Security deposits (if not returned)\n• Advance rent payments\n• Tenant-paid expenses you're responsible for\n• Services provided in lieu of rent\n\n**Deductible Rental Expenses:**\n• Mortgage interest\n• Property taxes\n• Insurance premiums\n• Repairs and maintenance\n• Property management fees\n• Advertising for tenants\n• Legal and professional fees\n• Utilities (if you pay them)\n• Depreciation\n\n**Repairs vs. Improvements:**\n• **Repairs**: Deductible in full the year incurred (fixing a leak, painting)\n• **Improvements**: Must be depreciated over time (new roof, major renovations)\n\n**Depreciation:**\n• Residential rental property: 27.5 years\n• Commercial property: 39 years\n• Use Form 4562 for depreciation calculations\n\n**Record Keeping:**\n• Keep detailed records of all income and expenses\n• Separate business and personal expenses\n• Save receipts and invoices\n• Track mileage for property-related travel",
    author: "Mark Johnson",
    publishedDate: "2024-01-16",
    category: "Rental Property"
  },
  {
    id: "a13",
    title: "What happens if I file my taxes late?",
    body: "Filing your tax return late can result in penalties and interest charges, but there are ways to minimize the impact.\n\n**Failure-to-File Penalty:**\n• 5% of unpaid taxes for each month (or part of month) late\n• Maximum penalty: 25% of unpaid taxes\n• Minimum penalty: $485 if return is over 60 days late\n\n**Failure-to-Pay Penalty:**\n• 0.5% of unpaid taxes for each month late\n• Maximum penalty: 25% of unpaid taxes\n\n**Interest:**\n• Charged on both unpaid taxes and penalties\n• Rate is determined quarterly by the IRS\n• Compounds daily\n\n**How to Minimize Penalties:**\n\n**1. File for an Extension:**\n• Form 4868 gives you 6 additional months\n• Must be filed by original due date\n• Extension to file is NOT an extension to pay\n\n**2. Pay What You Can:**\n• Pay as much as possible by the original due date\n• Reduces failure-to-pay penalty and interest\n\n**3. Request Penalty Relief:**\n• First-time penalty abatement\n• Reasonable cause (illness, natural disaster, etc.)\n• Statutory exceptions\n\n**If You're Due a Refund:**\n• No failure-to-file penalty\n• But you won't get your refund until you file\n• Must file within 3 years to claim refund",
    author: "Susan Davis",
    publishedDate: "2024-01-19",
    category: "Filing Issues"
  },
  {
    id: "a14",
    title: "Can I deduct student loan interest?",
    body: "Yes, you can deduct up to $2,500 in student loan interest paid during the tax year, even if you don't itemize deductions.\n\n**Qualifying Requirements:**\n• Loan must have been used for qualified education expenses\n• You must be legally obligated to pay the interest\n• Your filing status cannot be married filing separately\n• You cannot be claimed as a dependent on someone else's return\n\n**Income Limits (2023):**\n• **Single/Head of Household**: Phases out between $75,000-$90,000 AGI\n• **Married Filing Jointly**: Phases out between $155,000-$185,000 AGI\n\n**What Qualifies:**\n• Interest on federal and private student loans\n• Interest on loans for tuition, fees, room and board\n• Interest on loans for books, supplies, equipment\n• Interest on loans for other necessary education expenses\n\n**What You'll Receive:**\n• Form 1098-E from your loan servicer\n• Shows amount of interest paid during the year\n• You can deduct interest even if someone else makes payments on your behalf\n\n**Important Notes:**\n• This is an 'above-the-line' deduction (reduces AGI)\n• Available even if you take the standard deduction\n• Deduction is per tax return, not per loan\n• Voluntary interest payments also qualify",
    author: "Kevin Liu",
    publishedDate: "2024-01-13",
    category: "Education"
  },
  {
    id: "a15",
    title: "How do I claim education credits?",
    body: "Education credits can significantly reduce your tax bill. There are two main credits available:\n\n**American Opportunity Tax Credit (AOTC):**\n• Up to $2,500 per eligible student\n• Available for first 4 years of post-secondary education\n• 40% is refundable (up to $1,000)\n• Covers tuition, fees, and required course materials\n\n**AOTC Income Limits (2023):**\n• Single: Phases out $80,000-$90,000\n• Married Filing Jointly: Phases out $160,000-$180,000\n\n**Lifetime Learning Credit:**\n• Up to $2,000 per tax return (not per student)\n• Available for all years of post-secondary education\n• Non-refundable credit\n• Covers tuition and fees only\n\n**LLC Income Limits (2023):**\n• Single: Phases out $80,000-$90,000\n• Married Filing Jointly: Phases out $160,000-$180,000\n\n**Qualifying Expenses:**\n• Tuition and required fees\n• Required books and supplies (AOTC only)\n• Must be paid to eligible institutions\n\n**Important Rules:**\n• Cannot claim both credits for the same student\n• Cannot claim if someone else claims student as dependent\n• Must receive Form 1098-T from school\n• Use Form 8863 to calculate credits",
    author: "Dr. Emily Carter",
    publishedDate: "2024-01-17",
    category: "Education"
  },
  {
    id: "a16",
    title: "What is the Alternative Minimum Tax (AMT)?",
    body: "The Alternative Minimum Tax is a parallel tax calculation designed to ensure high-income taxpayers pay a minimum amount of tax.\n\n**How AMT Works:**\n1. Calculate regular taxable income\n2. Add back certain deductions and preferences\n3. Subtract AMT exemption\n4. Apply AMT tax rates (26% or 28%)\n5. Compare to regular tax\n6. Pay the higher amount\n\n**2023 AMT Exemption:**\n• Single: $81,300\n• Married Filing Jointly: $126,500\n• Married Filing Separately: $63,250\n\n**Common AMT Adjustments:**\n• State and local tax deductions\n• Miscellaneous itemized deductions\n• Personal exemptions (for older returns)\n• Incentive stock options\n• Private activity bond interest\n• Depreciation differences\n\n**AMT Tax Rates:**\n• 26% on AMT income up to $220,700\n• 28% on AMT income over $220,700\n\n**Who's Affected:**\n• High-income taxpayers\n• Those with large state/local tax deductions\n• Taxpayers with significant miscellaneous deductions\n• Those exercising incentive stock options\n\n**AMT Credit:**\n• May be able to claim credit in future years\n• Helps recover AMT paid due to timing differences\n• Use Form 8801 to calculate\n\n**Planning Tip:**\nConsider timing of certain deductions and income to minimize AMT impact.",
    author: "Jonathan Miller",
    publishedDate: "2024-01-21",
    category: "Advanced Tax Topics"
  },
  {
    id: "a17",
    title: "How do I handle divorce and taxes?",
    body: "Divorce significantly impacts your tax situation. Here's what you need to know:\n\n**Filing Status:**\n• Your marital status on December 31 determines your filing status\n• If divorced by year-end, you're considered unmarried for the entire year\n• May qualify for Head of Household if you have qualifying dependents\n\n**Alimony (Divorces finalized before 2019):**\n• **Payer**: Can deduct alimony payments\n• **Recipient**: Must report as taxable income\n• Must be cash payments under divorce decree\n• Payments must end at recipient's death\n\n**Alimony (Divorces finalized 2019 and later):**\n• **Payer**: Cannot deduct alimony payments\n• **Recipient**: Alimony is not taxable income\n\n**Child Support:**\n• Never deductible by payer\n• Never taxable to recipient\n• Clearly distinguish from alimony in agreements\n\n**Dependency Exemptions:**\n• Custodial parent generally claims the child\n• Non-custodial parent can claim if custodial parent signs Form 8332\n• Only one parent can claim Child Tax Credit\n\n**Property Transfers:**\n• Generally not taxable between spouses during divorce\n• Recipient takes over the giver's basis\n• Important for future capital gains calculations\n\n**Legal Fees:**\n• Generally not deductible\n• Exception: Fees for tax advice may be deductible",
    author: "Maria Gonzalez",
    publishedDate: "2024-01-24",
    category: "Life Changes"
  },
  {
    id: "a18",
    title: "Can I deduct charitable contributions?",
    body: "Yes, you can deduct charitable contributions if you itemize deductions and donate to qualified organizations.\n\n**Qualified Organizations:**\n• 501(c)(3) nonprofit organizations\n• Religious organizations\n• Government entities\n• Veterans organizations\n• Fraternal societies (if used for charitable purposes)\n\n**Types of Contributions:**\n\n**Cash Contributions:**\n• Limited to 60% of AGI\n• Includes donations by check, credit card, or payroll deduction\n• Must have written record for any amount\n\n**Property Contributions:**\n• Generally limited to 50% of AGI\n• Fair market value at time of donation\n• Special rules for appreciated property\n\n**Documentation Requirements:**\n\n**Under $250:**\n• Bank record or written receipt from charity\n\n**$250 or More:**\n• Written acknowledgment from charity\n• Must include amount and description\n• Statement of goods/services received\n\n**Over $500:**\n• Must file Form 8283\n• Detailed records required\n\n**Over $5,000:**\n• Qualified appraisal required\n• Appraisal summary attached to return\n\n**Special Rules:**\n• Clothing and household items must be in good condition\n• Vehicle donations have special requirements\n• Contributions to individuals are not deductible\n• Political contributions are not deductible",
    author: "Rev. James Wilson",
    publishedDate: "2024-01-09",
    category: "Charitable Giving"
  },
  {
    id: "a19",
    title: "What is a Health Savings Account (HSA)?",
    body: "A Health Savings Account offers triple tax benefits and is one of the most tax-advantaged accounts available.\n\n**Triple Tax Benefits:**\n1. **Tax-deductible contributions**\n2. **Tax-free growth** of investments\n3. **Tax-free withdrawals** for qualified medical expenses\n\n**2023 Contribution Limits:**\n• Individual coverage: $3,850\n• Family coverage: $7,750\n• Additional $1,000 if age 55 or older\n\n**Eligibility Requirements:**\n• Must be covered by High Deductible Health Plan (HDHP)\n• Cannot have other health coverage\n• Cannot be enrolled in Medicare\n• Cannot be claimed as dependent on someone else's return\n\n**2023 HDHP Requirements:**\n• **Individual**: Minimum deductible $1,500, max out-of-pocket $7,500\n• **Family**: Minimum deductible $3,000, max out-of-pocket $15,000\n\n**Qualified Medical Expenses:**\n• Doctor visits and hospital stays\n• Prescription medications\n• Dental and vision care\n• Mental health services\n• Long-term care premiums\n• COBRA premiums\n• Medicare premiums (except Medigap)\n\n**Investment Options:**\n• Many HSAs offer investment options after minimum balance\n• Funds can grow tax-free for decades\n• No required minimum distributions\n\n**Retirement Benefits:**\n• After age 65, can withdraw for any purpose (taxed as ordinary income)\n• Still tax-free for medical expenses at any age",
    author: "Dr. Nancy Phillips",
    publishedDate: "2024-01-26",
    category: "Health Savings"
  },
  {
    id: "a20",
    title: "How do I report stock sales and investments?",
    body: "Investment transactions must be reported on your tax return, and the tax treatment depends on how long you held the investment.\n\n**Required Forms:**\n• **Form 8949**: Report each transaction\n• **Schedule D**: Summarize gains and losses\n• **Form 1099-B**: Received from broker\n\n**Holding Periods:**\n\n**Short-term (1 year or less):**\n• Taxed as ordinary income\n• Rates up to 37%\n\n**Long-term (more than 1 year):**\n• Preferential tax rates\n• 0%, 15%, or 20% depending on income\n\n**2023 Long-term Capital Gains Rates:**\n• **0% rate**: Single up to $44,625, MFJ up to $89,250\n• **15% rate**: Single $44,626-$492,300, MFJ $89,251-$553,850\n• **20% rate**: Above these thresholds\n\n**Cost Basis:**\n• Your original purchase price plus commissions\n• Adjusted for stock splits, dividends, etc.\n• Use specific identification or FIFO method\n\n**Wash Sale Rule:**\n• Cannot claim loss if you buy substantially identical security within 30 days\n• Loss is added to basis of new shares\n• Applies 30 days before and after sale\n\n**Tax-Loss Harvesting:**\n• Sell losing investments to offset gains\n• Up to $3,000 excess losses can offset ordinary income\n• Remaining losses carry forward to future years\n\n**Record Keeping:**\n• Keep purchase and sale confirmations\n• Track all corporate actions\n• Maintain records for at least 3 years after filing",
    author: "Steven Chang",
    publishedDate: "2024-01-23",
    category: "Investments"
  },
  {
    id: "a21",
    title: "What are the retirement account contribution limits?",
    body: "Contributing to retirement accounts is one of the best ways to reduce your current tax bill while saving for the future.\n\n**2023 Contribution Limits:**\n\n**Traditional and Roth IRA:**\n• Under age 50: $6,500\n• Age 50 and older: $7,500 (includes $1,000 catch-up)\n\n**401(k), 403(b), 457 Plans:**\n• Under age 50: $22,500\n• Age 50 and older: $30,000 (includes $7,500 catch-up)\n\n**SIMPLE IRA:**\n• Under age 50: $15,500\n• Age 50 and older: $19,000 (includes $3,500 catch-up)\n\n**SEP-IRA:**\n• Lesser of 25% of compensation or $66,000\n• Self-employed: 20% of net self-employment income\n\n**Income Limits for IRA Deductibility (2023):**\n\n**Traditional IRA (with workplace plan):**\n• Single: Phases out $73,000-$83,000\n• MFJ: Phases out $116,000-$136,000\n\n**Roth IRA Contributions:**\n• Single: Phases out $138,000-$153,000\n• MFJ: Phases out $218,000-$228,000\n\n**Key Strategies:**\n• Maximize employer match first\n• Consider Roth vs. traditional based on current/future tax rates\n• Use backdoor Roth if over income limits\n• Don't forget spousal IRA contributions\n\n**Deadlines:**\n• IRA contributions: Tax filing deadline (with extensions)\n• 401(k) contributions: December 31",
    author: "Rebecca Taylor",
    publishedDate: "2024-01-27",
    category: "Retirement Planning"
  },
  {
    id: "a22",
    title: "How do I handle self-employment taxes?",
    body: "Self-employed individuals must pay both the employer and employee portions of Social Security and Medicare taxes.\n\n**Self-Employment Tax Rate:**\n• **Social Security**: 12.4% on earnings up to $160,200 (2023)\n• **Medicare**: 2.9% on all earnings\n• **Additional Medicare**: 0.9% on earnings over $200,000 (single) / $250,000 (MFJ)\n• **Total**: 15.3% on most self-employment income\n\n**Who Must Pay:**\n• Net self-employment earnings of $400 or more\n• General partners in partnerships\n• LLC members (unless they elect corporate taxation)\n\n**Calculating Self-Employment Tax:**\n1. Calculate net profit from Schedule C\n2. Multiply by 92.35% (accounts for employer portion deduction)\n3. Apply self-employment tax rates\n4. Use Schedule SE\n\n**Deduction for Employer Portion:**\n• Can deduct half of self-employment tax\n• Reduces adjusted gross income\n• Reported on Schedule 1\n\n**Quarterly Estimated Payments:**\n• Required if you expect to owe $1,000 or more\n• Include both income tax and self-employment tax\n• Use Form 1040ES\n• Due dates: 4/15, 6/15, 9/15, 1/15\n\n**Record Keeping:**\n• Track all business income and expenses\n• Separate business and personal expenses\n• Keep receipts and invoices\n• Consider using accounting software\n\n**Tax Planning Tips:**\n• Consider retirement plan contributions\n• Maximize business deductions\n• Track business mileage\n• Consider health insurance deduction",
    author: "Michelle Brown",
    publishedDate: "2024-01-28",
    category: "Self-Employment"
  },
  {
    id: "a23",
    title: "What is the Premium Tax Credit?",
    body: "The Premium Tax Credit helps make health insurance purchased through the Health Insurance Marketplace more affordable.\n\n**How It Works:**\n• Credit is based on your income and family size\n• Can be taken in advance (paid directly to insurer)\n• Or claimed when you file your tax return\n• Must reconcile advance payments on your return\n\n**Eligibility Requirements:**\n• Must purchase insurance through the Marketplace\n• Household income between 100%-400% of Federal Poverty Level\n• Cannot be eligible for other qualifying coverage\n• Must file a tax return to claim the credit\n\n**2023 Income Limits (400% of Federal Poverty Level):**\n• Individual: $54,360\n• Family of 2: $73,240\n• Family of 3: $92,120\n• Family of 4: $110,000\n\n**Advance vs. Year-End Credit:**\n\n**Advance Payments:**\n• Paid directly to insurance company\n• Reduces monthly premiums\n• Must estimate income for the year\n\n**Year-End Credit:**\n• Claimed on tax return\n• Based on actual income\n• May result in larger refund\n\n**Reconciliation (Form 8962):**\n• Required if you received advance payments\n• Compare advance payments to actual credit\n• May owe repayment if income was higher than estimated\n• May get additional credit if income was lower\n\n**Repayment Limits:**\n• Limited based on income level\n• No repayment required if income under 400% FPL\n\n**Important**: Report any income or family size changes to the Marketplace during the year.",
    author: "Daniel Rodriguez",
    publishedDate: "2024-01-29",
    category: "Health Insurance"
  },
  {
    id: "a24",
    title: "How do I handle foreign income and accounts?",
    body: "U.S. citizens and residents must report worldwide income, but there are provisions to avoid double taxation.\n\n**Reporting Requirements:**\n\n**Foreign Earned Income:**\n• Report on Form 1040\n• May qualify for Foreign Earned Income Exclusion\n• Use Form 2555 for exclusion\n\n**Foreign Bank Accounts (FBAR):**\n• Required if total foreign accounts exceed $10,000 at any time\n• File FinCEN Form 114 electronically\n• Due April 15 (automatic extension to October 15)\n• Separate from tax return\n\n**Form 8938 (FATCA):**\n• Higher reporting thresholds than FBAR\n• Filed with tax return\n• Includes foreign financial assets\n\n**Foreign Earned Income Exclusion (2023):**\n• Exclude up to $120,000 of foreign earned income\n• Must meet physical presence or bona fide residence test\n• Cannot claim foreign tax credit on excluded income\n\n**Physical Presence Test:**\n• Present in foreign country 330 full days in 12-month period\n• Days can span multiple tax years\n\n**Bona Fide Residence Test:**\n• Resident of foreign country for uninterrupted period\n• Must include entire tax year\n• Based on facts and circumstances\n\n**Foreign Tax Credit:**\n• Credit for foreign taxes paid\n• Alternative to foreign earned income exclusion\n• Use Form 1116\n• Can carry back 1 year or forward 10 years\n\n**Penalties:**\n• FBAR: Up to $12,921 per account (non-willful)\n• Form 8938: Up to $60,000\n• Failure to report foreign income: 20% accuracy penalty",
    author: "Alexander Kim",
    publishedDate: "2024-01-30",
    category: "International Tax"
  },
  {
    id: "a25",
    title: "What should I do if I receive an IRS notice?",
    body: "Receiving an IRS notice can be stressful, but most issues can be resolved quickly if you respond appropriately.\n\n**Don't Panic:**\n• Most notices are about minor issues\n• The IRS sends over 200 million notices annually\n• Many are simply informational\n\n**Read Carefully:**\n• Understand what the notice is asking\n• Note any deadlines for response\n• Check if you agree with the proposed changes\n\n**Common Types of Notices:**\n\n**CP2000 - Underreporter Inquiry:**\n• IRS computer matching found discrepancies\n• Compare with your records\n• Respond even if you agree\n\n**CP14 - Balance Due:**\n• You owe additional tax\n• Pay immediately to minimize interest and penalties\n• Set up payment plan if needed\n\n**CP21/CP22 - Math Error:**\n• IRS corrected calculation errors\n• Usually results in refund adjustment\n• No response needed unless you disagree\n\n**How to Respond:**\n\n**If You Agree:**\n• Pay any amount owed\n• Sign and return response form\n• Keep copies of everything\n\n**If You Disagree:**\n• Gather supporting documentation\n• Write detailed explanation\n• Include copies (not originals) of documents\n• Send via certified mail\n\n**Payment Options:**\n• Online at IRS.gov\n• Phone: 1-888-PAY-1040\n• Installment agreement\n• Offer in compromise (if qualified)\n\n**Get Help:**\n• Tax professional\n• IRS Taxpayer Advocate Service\n• Low Income Taxpayer Clinics\n\n**Prevention:**\n• File accurate returns\n• Keep good records\n• Report all income\n• Double-check math",
    author: "Catherine Lee",
    publishedDate: "2024-01-31",
    category: "IRS Notices"
  },
  // --- Added 75 more concise articles below ---
  { id: "a26", title: "Understanding Form W-4", body: "Form W-4 tells your employer how much tax to withhold.\n\n• Update after life changes\n• Use IRS Withholding Estimator\n• Aim to avoid big refunds or balances", author: "Olivia Perez", publishedDate: "2024-02-01", category: "Withholding" },
  { id: "a27", title: "Do I need to file a state return?", body: "Most taxpayers file where they live and work.\n\n• Check residency rules\n• Part-year and nonresident returns may apply\n• Some states have no income tax", author: "James Carter", publishedDate: "2024-02-02", category: "State Taxes" },
  { id: "a28", title: "Reporting gig economy income", body: "Income from platforms like rideshare and delivery is taxable.\n\n• Track mileage and expenses\n• Expect 1099-K/1099-NEC\n• Pay quarterly estimates", author: "Ava Thompson", publishedDate: "2024-02-03", category: "Self-Employment" },
  { id: "a29", title: "Choosing your filing status", body: "Filing status affects brackets and credits.\n\n• Single, MFJ, MFS, HOH, Qualifying Widow(er)\n• HOH requires a qualifying dependent\n• Compare taxes under each", author: "Noah Williams", publishedDate: "2024-02-04", category: "Tax Basics" },
  { id: "a30", title: "1099-K changes explained", body: "Third-party platforms may issue 1099-K at lower thresholds.\n\n• Report income even without a form\n• Track cost basis for sales\n• Keep good records", author: "Sophia Nguyen", publishedDate: "2024-02-05", category: "Income Reporting" },
  { id: "a31", title: "Should I take the standard deduction?", body: "Most taxpayers benefit from standard deduction.\n\n• Itemize if deductions exceed standard\n• Compare both paths\n• Keep receipts if itemizing", author: "Liam Johnson", publishedDate: "2024-02-06", category: "Deductions" },
  { id: "a32", title: "Maximizing the Saver’s Credit", body: "Low-to-moderate income savers may qualify.\n\n• Contribute to IRA/401(k)\n• Credit up to 50% of contributions\n• Income limits apply", author: "Mia Patel", publishedDate: "2024-02-07", category: "Credits" },
  { id: "a33", title: "Child and Dependent Care Credit", body: "Credit for work-related care expenses.\n\n• Requires earned income\n• Use Form 2441\n• Track provider info and EIN", author: "Ethan Brooks", publishedDate: "2024-02-08", category: "Credits" },
  { id: "a34", title: "Education savings: 529 plans", body: "Earnings grow tax-free for qualified expenses.\n\n• State deductions/credits may apply\n• Qualified K-12 limits\n• Keep distribution records", author: "Charlotte King", publishedDate: "2024-02-09", category: "Education" },
  { id: "a35", title: "Sales of personal items", body: "Occasional sales may be taxable if you profit.\n\n• Keep purchase records\n• Report gains; losses generally not deductible\n• 1099-K may be issued", author: "Benjamin Scott", publishedDate: "2024-02-10", category: "Income Reporting" },
  { id: "a36", title: "Side hustle bookkeeping basics", body: "Separate business and personal finances.\n\n• Use a business account\n• Track income/expenses monthly\n• Save receipts digitally", author: "Zoe Rivera", publishedDate: "2024-02-11", category: "Self-Employment" },
  { id: "a37", title: "Roth vs. Traditional IRA", body: "Choose based on current vs. future tax rates.\n\n• Roth: tax-free withdrawals\n• Traditional: upfront deduction\n• Consider backdoor Roth", author: "William Clark", publishedDate: "2024-02-12", category: "Retirement Planning" },
  { id: "a38", title: "Reporting stock grants (RSUs)", body: "RSUs tax at vesting as ordinary income.\n\n• Basis equals income at vest\n• Watch for double counting on 1099-B\n• Use supplemental statements", author: "Amelia Wright", publishedDate: "2024-02-13", category: "Compensation" },
  { id: "a39", title: "Home sale exclusion", body: "Exclude up to $250k/$500k of gain if eligible.\n\n• Own and use 2 of last 5 years\n• Prorations for partial eligibility\n• Report if you receive 1099-S", author: "Elijah Moore", publishedDate: "2024-02-14", category: "Real Estate" },
  { id: "a40", title: "Energy credits for home improvements", body: "Credits for efficient upgrades.\n\n• Save invoices and manufacturer certs\n• Annual and lifetime limits apply\n• Use Form 5695", author: "Harper Diaz", publishedDate: "2024-02-15", category: "Credits" },
  { id: "a41", title: "Mileage vs. actual vehicle expenses", body: "Choose the method that yields higher deduction.\n\n• Standard mileage rate\n• Actual expenses require records\n• Consistency rules apply", author: "Lucas Bennett", publishedDate: "2024-02-16", category: "Business Deductions" },
  { id: "a42", title: "Freelancer quarterly taxes", body: "Avoid penalties by paying as you go.\n\n• Estimate income each quarter\n• Include SE tax\n• Use EFTPS/Direct Pay", author: "Aria Flores", publishedDate: "2024-02-17", category: "Self-Employment" },
  { id: "a43", title: "Health FSA vs. HSA", body: "Both cut taxes for medical costs.\n\n• FSA: use-it-or-lose-it limits\n• HSA: portable with triple tax benefit\n• Check plan compatibility", author: "Henry Adams", publishedDate: "2024-02-18", category: "Health Savings" },
  { id: "a44", title: "1099-NEC vs. 1099-MISC", body: "Independent contractor income on 1099-NEC.\n\n• 1099-MISC for other payments\n• Report on Schedule C\n• Track payer TINs", author: "Ella Parker", publishedDate: "2024-02-19", category: "Income Reporting" },
  { id: "a45", title: "Adoption tax credit basics", body: "Credit can offset qualified adoption expenses.\n\n• Nonrefundable with carryforward\n• Special needs rules\n• Use Form 8839", author: "Jackson Lee", publishedDate: "2024-02-20", category: "Family" },
  { id: "a46", title: "Identity Protection PIN (IP PIN)", body: "IP PIN helps prevent tax-related identity theft.\n\n• Get one at IRS.gov\n• Renew annually\n• Keep it confidential", author: "Grace Turner", publishedDate: "2024-02-21", category: "Security" },
  { id: "a47", title: "Reporting unemployment income", body: "Unemployment compensation is taxable.\n\n• Expect Form 1099-G\n• Consider withholding\n• State rules vary", author: "Sebastian Hall", publishedDate: "2024-02-22", category: "Income Reporting" },
  { id: "a48", title: "Hobby vs. business income", body: "Intent to make a profit matters.\n\n• Business allows deductions\n• Hobby income taxable; no expense deduction\n• Keep documentation", author: "Victoria Evans", publishedDate: "2024-02-23", category: "Self-Employment" },
  { id: "a49", title: "Inherited IRA rules", body: "Beneficiaries face different distribution timelines.\n\n• 10-year rule for many non-spouse heirs\n• RMDs may apply\n• Track basis and titling", author: "Daniel Price", publishedDate: "2024-02-24", category: "Retirement Planning" },
  { id: "a50", title: "HSAs in retirement", body: "Keep receipts for future tax-free reimbursements.\n\n• Medicare coordination\n• No RMDs for HSAs\n• Qualified expenses list", author: "Chloe Ramirez", publishedDate: "2024-02-25", category: "Health Savings" },
  { id: "a51", title: "Reporting tips income", body: "Tips are taxable and should be reported.\n\n• Keep a daily log\n• Allocate to Social Security/Medicare\n• Use Form 4137 if needed", author: "Matthew Ross", publishedDate: "2024-02-26", category: "Income Reporting" },
  { id: "a52", title: "Small business depreciation", body: "Section 179 and bonus depreciation accelerate write-offs.\n\n• Check limits and phase-outs\n• Listed property rules\n• Keep asset registers", author: "Penelope Ward", publishedDate: "2024-02-27", category: "Business Deductions" },
  { id: "a53", title: "Net operating losses (NOLs)", body: "NOLs can offset income in other years.\n\n• Carryforward rules\n• Limitations under §172\n• Keep calculation worksheets", author: "Owen Hughes", publishedDate: "2024-02-28", category: "Advanced Tax Topics" },
  { id: "a54", title: "Tax credits for caregivers", body: "Explore dependent care and other supports.\n\n• CDCC for work-related care\n• Medical deductions for certain costs\n• HOH status may apply", author: "Nora Scott", publishedDate: "2024-02-29", category: "Family" },
  { id: "a55", title: "Reporting foreign tax paid", body: "Use the foreign tax credit or deduction.\n\n• Generally better to claim the credit\n• Form 1116 rules\n• Per-country vs. overall limits", author: "Wyatt Baker", publishedDate: "2024-03-01", category: "International Tax" },
  { id: "a56", title: "Backdoor Roth mechanics", body: "Nondeductible IRA contribution + Roth conversion.\n\n• Beware pro-rata rule\n• Track basis on Form 8606\n• Consider timing", author: "Lily Collins", publishedDate: "2024-03-02", category: "Retirement Planning" },
  { id: "a57", title: "Qualified business income (QBI) deduction", body: "Up to 20% deduction for pass-through income.\n\n• Phase-outs for specified services\n• W-2 wage and basis tests\n• Use Form 8995/8995-A", author: "Jack Murphy", publishedDate: "2024-03-03", category: "Business Deductions" },
  { id: "a58", title: "Depreciation recapture basics", body: "Gains may be taxed as ordinary income.\n\n• Applies on sale of depreciated property\n• Track accumulated depreciation\n• Forms vary by asset", author: "Hannah Martin", publishedDate: "2024-03-04", category: "Investments" },
  { id: "a59", title: "Estimated tax safe harbors", body: "Meet safe harbors to avoid penalties.\n\n• 90% current-year tax\n• 100%/110% prior-year tax\n• Annualized income method", author: "Aiden Rivera", publishedDate: "2024-03-05", category: "Estimated Taxes" },
  { id: "a60", title: "Filing after a disaster", body: "Relief may include extended deadlines.\n\n• Keep FEMA/IRS notices\n• Casualty loss rules\n• Check IRS Disaster Assistance page", author: "Layla Cooper", publishedDate: "2024-03-06", category: "Filing Issues" },
  { id: "a61", title: "Stock options: ISOs vs. NSOs", body: "Different tax treatment and AMT impact.\n\n• ISOs may trigger AMT at exercise\n• NSOs taxed as ordinary income\n• Track holding periods", author: "Julian Perez", publishedDate: "2024-03-07", category: "Compensation" },
  { id: "a62", title: "S-corporation basics", body: "Pass-through entity with payroll requirements.\n\n• Reasonable compensation\n• Shareholder basis tracking\n• State-level differences", author: "Addison Foster", publishedDate: "2024-03-08", category: "Business Structure" },
  { id: "a63", title: "Donor-advised funds (DAFs)", body: "Bunch deductions and grant over time.\n\n• Donate appreciated assets\n• Immediate deduction\n• Low-cost giving strategy", author: "Levi Gray", publishedDate: "2024-03-09", category: "Charitable Giving" },
  { id: "a64", title: "Capital loss carryforwards", body: "Unused losses offset future gains.\n\n• Up to $3,000 against ordinary income\n• Track on Schedule D\n• Keep brokerage statements", author: "Paisley Hughes", publishedDate: "2024-03-10", category: "Investments" },
  { id: "a65", title: "Sales tax deduction vs. state income tax", body: "Choose whichever is larger when itemizing.\n\n• SALT cap applies\n• Keep big-ticket purchase records\n• Use IRS tables as baseline", author: "Christopher Young", publishedDate: "2024-03-11", category: "Deductions" },
  { id: "a66", title: "Tax planning for freelancers", body: "Plan cash flow around quarterly payments.\n\n• Set aside 25–35% of income\n• Automate transfers\n• Review annually", author: "Samantha Walker", publishedDate: "2024-03-12", category: "Self-Employment" },
  { id: "a67", title: "Reporting rental losses", body: "Passive loss rules limit deductions.\n\n• $25k exception for active participants\n• Phase-out by AGI\n• Real estate professional rules", author: "David Allen", publishedDate: "2024-03-13", category: "Rental Property" },
  { id: "a68", title: "HSAs for families", body: "Coordinate contributions and spending.\n\n• Family limit applies across accounts\n• Track dependent expenses\n• Keep receipts", author: "Madison Torres", publishedDate: "2024-03-14", category: "Health Savings" },
  { id: "a69", title: "Wash sale rule examples", body: "Avoid disallowed losses.\n\n• 30-day window before/after\n• Substantially identical securities\n• Basis adjustments", author: "Joseph Rivera", publishedDate: "2024-03-15", category: "Investments" },
  { id: "a70", title: "Household employee taxes", body: "Nanny tax rules may apply.\n\n• Thresholds for withholding\n• Schedule H filing\n• Get an EIN", author: "Scarlett Reed", publishedDate: "2024-03-16", category: "Household Employees" },
  { id: "a71", title: "Medical FSA strategies", body: "Estimate conservatively to avoid forfeitures.\n\n• Use grace period/rollover if offered\n• Eligible expense lists\n• Save receipts", author: "Evan Phillips", publishedDate: "2024-03-17", category: "Health Savings" },
  { id: "a72", title: "1098-T and education credits", body: "Match school statements to payments made.\n\n• Timing matters\n• Scholarships reduce qualified expenses\n• Keep bursar records", author: "Abigail Brown", publishedDate: "2024-03-18", category: "Education" },
  { id: "a73", title: "Charitable bunching strategy", body: "Combine multiple years of gifts into one.\n\n• Itemize in bunching year\n• Use DAFs\n• Track acknowledgments", author: "Logan Morales", publishedDate: "2024-03-19", category: "Charitable Giving" },
  { id: "a74", title: "State residency audits", body: "Moving states? Document your domicile.\n\n• Change voter registration and licenses\n• Move financial accounts\n• Keep housing records", author: "Avery Jenkins", publishedDate: "2024-03-20", category: "State Taxes" },
  { id: "a75", title: "Quarterly tax worksheet", body: "Simple framework to estimate payments.\n\n• Project income and deductions\n• Apply current tax tables\n• Revisit each quarter", author: "Hudson Bell", publishedDate: "2024-03-21", category: "Estimated Taxes" },
  { id: "a76", title: "SALT cap workarounds", body: "Evaluate carefully and mind state rules.\n\n• Pass-through entity taxes (PTET)\n• Charitable fund schemes scrutiny\n• Consult a professional", author: "Bella Cooper", publishedDate: "2024-03-22", category: "Deductions" },
  { id: "a77", title: "Capital gains on collectibles", body: "Higher maximum rate may apply.\n\n• 28% collectibles rate\n• Track basis accurately\n• Use Schedule D details", author: "Luke Turner", publishedDate: "2024-03-23", category: "Investments" },
  { id: "a78", title: "Estimated tax for retirees", body: "Pensions and IRA withdrawals may need estimates.\n\n• Adjust withholding\n• Use quarterly vouchers\n• Avoid penalties", author: "Hailey Brooks", publishedDate: "2024-03-24", category: "Retirement Planning" },
  { id: "a79", title: "Net investment income tax (NIIT)", body: "3.8% tax on certain investment income.\n\n• Thresholds by filing status\n• Applies to passive income\n• Plan distributions", author: "Anthony Diaz", publishedDate: "2024-03-25", category: "Investments" },
  { id: "a80", title: "AMT credit recovery", body: "You may reclaim prior-year AMT via credit.\n\n• Timing difference focus\n• Form 8801\n• Track carryforwards", author: "Camila Gomez", publishedDate: "2024-03-26", category: "Advanced Tax Topics" },
  { id: "a81", title: "Foreign earned income exclusion tips", body: "Qualify via physical presence or bona fide residence.\n\n• Keep travel logs\n• Housing exclusion\n• Coordinate with FTC", author: "Thomas Nguyen", publishedDate: "2024-03-27", category: "International Tax" },
  { id: "a82", title: "Paycheck checkup mid-year", body: "Adjust withholding to stay on track.\n\n• Avoid surprises in April\n• Use updated W-4\n• Reflect life changes", author: "Natalie Ross", publishedDate: "2024-03-28", category: "Withholding" },
  { id: "a83", title: "Basis tracking for S-corp shareholders", body: "Basis limits losses and distributions.\n\n• Track stock and debt basis\n• Annual statements\n• Prevent suspended losses", author: "Andrew Green", publishedDate: "2024-03-29", category: "Business Structure" },
  { id: "a84", title: "Like-kind exchanges (1031)", body: "Defers gains on real property exchanges.\n\n• Qualified intermediaries\n• Strict timelines\n• Limited to real estate", author: "Hannah White", publishedDate: "2024-03-30", category: "Real Estate" },
  { id: "a85", title: "Refund offset explained", body: "Refunds may be applied to other debts.\n\n• Past-due taxes, child support\n• Bureau of Fiscal Service handles\n• Check notices for details", author: "Connor Mitchell", publishedDate: "2024-03-31", category: "Refunds" },
  { id: "a86", title: "Cash vs. accrual accounting", body: "Choose the method that fits your business.\n\n• Timing of income/expenses\n• Small business exceptions\n• Consistency rules", author: "Lucy Howard", publishedDate: "2024-04-01", category: "Self-Employment" },
  { id: "a87", title: "State estimated taxes", body: "Don’t forget state-level estimates.\n\n• Due dates differ\n• Safe harbors vary\n• Use state portals", author: "Christian Ward", publishedDate: "2024-04-02", category: "State Taxes" },
  { id: "a88", title: "Education loan forgiveness taxability", body: "Federal vs. state treatment differs.\n\n• Federal exclusion window\n• Check state conformity\n• 1099-C implications", author: "Sadie Rivera", publishedDate: "2024-04-03", category: "Education" },
  { id: "a89", title: "Estimated tax annualization method", body: "Useful for uneven income.\n\n• Schedule AI\n• Seasonal businesses\n• Reduce penalties", author: "Nolan Perry", publishedDate: "2024-04-04", category: "Estimated Taxes" },
  { id: "a90", title: "Charitable mileage rules", body: "Different rate from business mileage.\n\n• Fixed statutory rate\n• Substantiation required\n• Volunteer expenses", author: "Elena Cruz", publishedDate: "2024-04-05", category: "Charitable Giving" },
  { id: "a91", title: "Schedule C essentials", body: "Report business income and expenses.\n\n• Keep a P&L\n• Categorize expenses\n• Home office considerations", author: "Aaron Kelly", publishedDate: "2024-04-06", category: "Self-Employment" },
  { id: "a92", title: "K-1 forms explained", body: "Pass-through entities issue K-1s.\n\n• Partnerships, S-corps, trusts\n• Late K-1s may require extension\n• Basis alignment", author: "Isla Ramirez", publishedDate: "2024-04-07", category: "Investments" },
  { id: "a93", title: "Tax documents checklist", body: "Organize forms before you start.\n\n• W-2s, 1099s, 1098s\n• Brokerage and bank statements\n• Prior-year return", author: "Elias Barnes", publishedDate: "2024-04-08", category: "Filing Requirements" },
  { id: "a94", title: "State-specific education benefits", body: "Some states offer tuition credits/deductions.\n\n• Check eligibility\n• Residency rules\n• Coordinate with federal credits", author: "Mila Chapman", publishedDate: "2024-04-09", category: "Education" },
  { id: "a95", title: "Filing an extension", body: "Extra time to file, not to pay.\n\n• Form 4868 by April deadline\n• Estimate and pay balance due\n• State extensions may differ", author: "Robert Powell", publishedDate: "2024-04-10", category: "Filing Issues" },
  { id: "a96", title: "Choosing a tax preparer", body: "Look for credentials and transparency.\n\n• PTIN required\n• Ask about fees\n• Keep engagement letters", author: "Piper Johnston", publishedDate: "2024-04-11", category: "Tax Basics" },
  { id: "a97", title: "When to amend a return", body: "Correct material errors, not math.\n\n• New income forms\n• Missed credits/deductions\n• Changed filing status", author: "Jace Coleman", publishedDate: "2024-04-12", category: "Amendments" },
  { id: "a98", title: "Tracking charitable donations", body: "Substantiate cash and noncash gifts.\n\n• Acknowledgment letters\n• Appraisals over $5,000\n• Photos for noncash items", author: "Raelynn Fisher", publishedDate: "2024-04-13", category: "Charitable Giving" },
  { id: "a99", title: "Quarterly tax calendar", body: "Mark your dates to avoid late fees.\n\n• Federal and state schedules\n• Automatic reminders\n• Adjust for weekends/holidays", author: "Bentley Hayes", publishedDate: "2024-04-14", category: "Estimated Taxes" },
  { id: "a100", title: "Tax record retention", body: "Keep most records at least 3 years.\n\n• 7 years for bad debt/loss claims\n• Property basis records until sold\n• Secure digital backups", author: "Jasmine Patel", publishedDate: "2024-04-15", category: "Tax Basics" },
];

export default faqs;
