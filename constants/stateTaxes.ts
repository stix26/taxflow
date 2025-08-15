export interface StateTaxBracket {
  min: number;
  max: number;
  rate: number;
}

export interface StateTaxInfo {
  name: string;
  abbreviation: string;
  hasIncomeTax: boolean;
  flatRate?: number;
  brackets?: StateTaxBracket[];
  standardDeduction?: {
    single: number;
    marriedJoint: number;
    marriedSeparate: number;
    headOfHousehold: number;
  };
  personalExemption?: {
    single: number;
    marriedJoint: number;
    marriedSeparate: number;
    headOfHousehold: number;
    dependent: number;
  };
}

// 2024 State Tax Information
export const STATE_TAX_DATA: Record<string, StateTaxInfo> = {
  AL: {
    name: 'Alabama',
    abbreviation: 'AL',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 500, rate: 0.02 },
      { min: 500, max: 3000, rate: 0.04 },
      { min: 3000, max: Infinity, rate: 0.05 }
    ],
    standardDeduction: { single: 2500, marriedJoint: 7500, marriedSeparate: 3750, headOfHousehold: 2500 },
    personalExemption: { single: 1500, marriedJoint: 3000, marriedSeparate: 1500, headOfHousehold: 1500, dependent: 1000 }
  },
  AK: {
    name: 'Alaska',
    abbreviation: 'AK',
    hasIncomeTax: false
  },
  AZ: {
    name: 'Arizona',
    abbreviation: 'AZ',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 27808, rate: 0.0259 },
      { min: 27808, max: 69675, rate: 0.0334 },
      { min: 69675, max: 104835, rate: 0.0417 },
      { min: 104835, max: Infinity, rate: 0.045 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  AR: {
    name: 'Arkansas',
    abbreviation: 'AR',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 4300, rate: 0.02 },
      { min: 4300, max: 8500, rate: 0.04 },
      { min: 8500, max: 12800, rate: 0.059 },
      { min: 12800, max: Infinity, rate: 0.0595 }
    ],
    standardDeduction: { single: 2340, marriedJoint: 4680, marriedSeparate: 2340, headOfHousehold: 3440 }
  },
  CA: {
    name: 'California',
    abbreviation: 'CA',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 10099, rate: 0.01 },
      { min: 10099, max: 23942, rate: 0.02 },
      { min: 23942, max: 37788, rate: 0.04 },
      { min: 37788, max: 52455, rate: 0.06 },
      { min: 52455, max: 66295, rate: 0.08 },
      { min: 66295, max: 338639, rate: 0.093 },
      { min: 338639, max: 406364, rate: 0.103 },
      { min: 406364, max: 677278, rate: 0.113 },
      { min: 677278, max: Infinity, rate: 0.123 }
    ],
    standardDeduction: { single: 5202, marriedJoint: 10404, marriedSeparate: 5202, headOfHousehold: 10726 }
  },
  CO: {
    name: 'Colorado',
    abbreviation: 'CO',
    hasIncomeTax: true,
    flatRate: 0.044,
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  CT: {
    name: 'Connecticut',
    abbreviation: 'CT',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10000, max: 50000, rate: 0.05 },
      { min: 50000, max: 100000, rate: 0.055 },
      { min: 100000, max: 200000, rate: 0.06 },
      { min: 200000, max: 250000, rate: 0.065 },
      { min: 250000, max: 500000, rate: 0.069 },
      { min: 500000, max: Infinity, rate: 0.0699 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  DE: {
    name: 'Delaware',
    abbreviation: 'DE',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 2000, rate: 0.022 },
      { min: 2000, max: 5000, rate: 0.039 },
      { min: 5000, max: 10000, rate: 0.048 },
      { min: 10000, max: 20000, rate: 0.052 },
      { min: 20000, max: Infinity, rate: 0.066 }
    ],
    standardDeduction: { single: 3250, marriedJoint: 6500, marriedSeparate: 3250, headOfHousehold: 3250 }
  },
  FL: {
    name: 'Florida',
    abbreviation: 'FL',
    hasIncomeTax: false
  },
  GA: {
    name: 'Georgia',
    abbreviation: 'GA',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 750, rate: 0.01 },
      { min: 750, max: 2250, rate: 0.02 },
      { min: 2250, max: 3750, rate: 0.03 },
      { min: 3750, max: 5250, rate: 0.04 },
      { min: 5250, max: 7000, rate: 0.05 },
      { min: 7000, max: Infinity, rate: 0.0575 }
    ],
    standardDeduction: { single: 4600, marriedJoint: 6000, marriedSeparate: 3000, headOfHousehold: 4600 },
    personalExemption: { single: 2700, marriedJoint: 5400, marriedSeparate: 2700, headOfHousehold: 2700, dependent: 3000 }
  },
  HI: {
    name: 'Hawaii',
    abbreviation: 'HI',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 2400, rate: 0.014 },
      { min: 2400, max: 4800, rate: 0.032 },
      { min: 4800, max: 9600, rate: 0.055 },
      { min: 9600, max: 14400, rate: 0.064 },
      { min: 14400, max: 19200, rate: 0.068 },
      { min: 19200, max: 24000, rate: 0.072 },
      { min: 24000, max: 36000, rate: 0.076 },
      { min: 36000, max: 48000, rate: 0.079 },
      { min: 48000, max: 150000, rate: 0.0825 },
      { min: 150000, max: 175000, rate: 0.09 },
      { min: 175000, max: 200000, rate: 0.10 },
      { min: 200000, max: Infinity, rate: 0.11 }
    ],
    standardDeduction: { single: 2200, marriedJoint: 4400, marriedSeparate: 2200, headOfHousehold: 3212 }
  },
  ID: {
    name: 'Idaho',
    abbreviation: 'ID',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 1568, rate: 0.01 },
      { min: 1568, max: 3135, rate: 0.03 },
      { min: 3135, max: 4703, rate: 0.045 },
      { min: 4703, max: 6270, rate: 0.06 },
      { min: 6270, max: Infinity, rate: 0.0695 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  IL: {
    name: 'Illinois',
    abbreviation: 'IL',
    hasIncomeTax: true,
    flatRate: 0.0495,
    standardDeduction: { single: 2375, marriedJoint: 4750, marriedSeparate: 2375, headOfHousehold: 2375 },
    personalExemption: { single: 2425, marriedJoint: 4850, marriedSeparate: 2425, headOfHousehold: 2425, dependent: 2425 }
  },
  IN: {
    name: 'Indiana',
    abbreviation: 'IN',
    hasIncomeTax: true,
    flatRate: 0.0323,
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 },
    personalExemption: { single: 1000, marriedJoint: 2000, marriedSeparate: 1000, headOfHousehold: 1000, dependent: 1500 }
  },
  IA: {
    name: 'Iowa',
    abbreviation: 'IA',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 1743, rate: 0.0033 },
      { min: 1743, max: 4358, rate: 0.0067 },
      { min: 4358, max: 8716, rate: 0.0225 },
      { min: 8716, max: 19619, rate: 0.0414 },
      { min: 19619, max: 32659, rate: 0.0563 },
      { min: 32659, max: 65318, rate: 0.0596 },
      { min: 65318, max: 98039, rate: 0.0625 },
      { min: 98039, max: Infinity, rate: 0.0853 }
    ],
    standardDeduction: { single: 2130, marriedJoint: 5240, marriedSeparate: 2620, headOfHousehold: 3130 }
  },
  KS: {
    name: 'Kansas',
    abbreviation: 'KS',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 15000, rate: 0.031 },
      { min: 15000, max: 30000, rate: 0.0525 },
      { min: 30000, max: Infinity, rate: 0.057 }
    ],
    standardDeduction: { single: 3500, marriedJoint: 8000, marriedSeparate: 4000, headOfHousehold: 5800 },
    personalExemption: { single: 2250, marriedJoint: 4500, marriedSeparate: 2250, headOfHousehold: 2250, dependent: 2250 }
  },
  KY: {
    name: 'Kentucky',
    abbreviation: 'KY',
    hasIncomeTax: true,
    flatRate: 0.045,
    standardDeduction: { single: 2770, marriedJoint: 5540, marriedSeparate: 2770, headOfHousehold: 2770 }
  },
  LA: {
    name: 'Louisiana',
    abbreviation: 'LA',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 12500, rate: 0.0185 },
      { min: 12500, max: 50000, rate: 0.035 },
      { min: 50000, max: Infinity, rate: 0.0425 }
    ],
    standardDeduction: { single: 4500, marriedJoint: 9000, marriedSeparate: 4500, headOfHousehold: 6750 },
    personalExemption: { single: 4500, marriedJoint: 9000, marriedSeparate: 4500, headOfHousehold: 4500, dependent: 1000 }
  },
  ME: {
    name: 'Maine',
    abbreviation: 'ME',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 24500, rate: 0.058 },
      { min: 24500, max: 58050, rate: 0.0675 },
      { min: 58050, max: Infinity, rate: 0.0715 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  MD: {
    name: 'Maryland',
    abbreviation: 'MD',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 1000, rate: 0.02 },
      { min: 1000, max: 2000, rate: 0.03 },
      { min: 2000, max: 3000, rate: 0.04 },
      { min: 3000, max: 100000, rate: 0.0475 },
      { min: 100000, max: 125000, rate: 0.05 },
      { min: 125000, max: 150000, rate: 0.0525 },
      { min: 150000, max: 250000, rate: 0.055 },
      { min: 250000, max: Infinity, rate: 0.0575 }
    ],
    standardDeduction: { single: 2400, marriedJoint: 4850, marriedSeparate: 2400, headOfHousehold: 2400 },
    personalExemption: { single: 3200, marriedJoint: 6400, marriedSeparate: 3200, headOfHousehold: 3200, dependent: 3200 }
  },
  MA: {
    name: 'Massachusetts',
    abbreviation: 'MA',
    hasIncomeTax: true,
    flatRate: 0.05,
    standardDeduction: { single: 4400, marriedJoint: 8800, marriedSeparate: 4400, headOfHousehold: 6900 },
    personalExemption: { single: 4400, marriedJoint: 8800, marriedSeparate: 4400, headOfHousehold: 4400, dependent: 1000 }
  },
  MI: {
    name: 'Michigan',
    abbreviation: 'MI',
    hasIncomeTax: true,
    flatRate: 0.0425,
    standardDeduction: { single: 5050, marriedJoint: 10100, marriedSeparate: 5050, headOfHousehold: 5050 },
    personalExemption: { single: 5050, marriedJoint: 10100, marriedSeparate: 5050, headOfHousehold: 5050, dependent: 5050 }
  },
  MN: {
    name: 'Minnesota',
    abbreviation: 'MN',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 29458, rate: 0.0535 },
      { min: 29458, max: 96770, rate: 0.068 },
      { min: 96770, max: 171220, rate: 0.0785 },
      { min: 171220, max: Infinity, rate: 0.0985 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  MS: {
    name: 'Mississippi',
    abbreviation: 'MS',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 5000, rate: 0.03 },
      { min: 5000, max: 10000, rate: 0.04 },
      { min: 10000, max: Infinity, rate: 0.05 }
    ],
    standardDeduction: { single: 2300, marriedJoint: 4600, marriedSeparate: 2300, headOfHousehold: 3400 },
    personalExemption: { single: 6000, marriedJoint: 12000, marriedSeparate: 6000, headOfHousehold: 6000, dependent: 1500 }
  },
  MO: {
    name: 'Missouri',
    abbreviation: 'MO',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 1121, rate: 0.015 },
      { min: 1121, max: 2242, rate: 0.02 },
      { min: 2242, max: 3363, rate: 0.025 },
      { min: 3363, max: 4484, rate: 0.03 },
      { min: 4484, max: 5605, rate: 0.035 },
      { min: 5605, max: 6726, rate: 0.04 },
      { min: 6726, max: 7847, rate: 0.045 },
      { min: 7847, max: 8968, rate: 0.05 },
      { min: 8968, max: Infinity, rate: 0.054 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  MT: {
    name: 'Montana',
    abbreviation: 'MT',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 3100, rate: 0.01 },
      { min: 3100, max: 5500, rate: 0.02 },
      { min: 5500, max: 8400, rate: 0.03 },
      { min: 8400, max: 11300, rate: 0.04 },
      { min: 11300, max: 14500, rate: 0.05 },
      { min: 14500, max: 18700, rate: 0.06 },
      { min: 18700, max: Infinity, rate: 0.0675 }
    ],
    standardDeduction: { single: 5040, marriedJoint: 10080, marriedSeparate: 5040, headOfHousehold: 7380 },
    personalExemption: { single: 2980, marriedJoint: 5960, marriedSeparate: 2980, headOfHousehold: 2980, dependent: 2980 }
  },
  NE: {
    name: 'Nebraska',
    abbreviation: 'NE',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 3700, rate: 0.0246 },
      { min: 3700, max: 22170, rate: 0.0351 },
      { min: 22170, max: 35730, rate: 0.0501 },
      { min: 35730, max: Infinity, rate: 0.0684 }
    ],
    standardDeduction: { single: 7350, marriedJoint: 18700, marriedSeparate: 9350, headOfHousehold: 10800 },
    personalExemption: { single: 151, marriedJoint: 302, marriedSeparate: 151, headOfHousehold: 151, dependent: 151 }
  },
  NV: {
    name: 'Nevada',
    abbreviation: 'NV',
    hasIncomeTax: false
  },
  NH: {
    name: 'New Hampshire',
    abbreviation: 'NH',
    hasIncomeTax: false
  },
  NJ: {
    name: 'New Jersey',
    abbreviation: 'NJ',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 20000, rate: 0.014 },
      { min: 20000, max: 35000, rate: 0.0175 },
      { min: 35000, max: 40000, rate: 0.035 },
      { min: 40000, max: 75000, rate: 0.0553 },
      { min: 75000, max: 500000, rate: 0.0637 },
      { min: 500000, max: 1000000, rate: 0.0897 },
      { min: 1000000, max: Infinity, rate: 0.1075 }
    ],
    standardDeduction: { single: 1000, marriedJoint: 2000, marriedSeparate: 1000, headOfHousehold: 1000 },
    personalExemption: { single: 1000, marriedJoint: 2000, marriedSeparate: 1000, headOfHousehold: 1000, dependent: 1500 }
  },
  NM: {
    name: 'New Mexico',
    abbreviation: 'NM',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 5500, rate: 0.017 },
      { min: 5500, max: 11000, rate: 0.032 },
      { min: 11000, max: 16000, rate: 0.047 },
      { min: 16000, max: 210000, rate: 0.049 },
      { min: 210000, max: Infinity, rate: 0.059 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  NY: {
    name: 'New York',
    abbreviation: 'NY',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 8500, rate: 0.04 },
      { min: 8500, max: 11700, rate: 0.045 },
      { min: 11700, max: 13900, rate: 0.0525 },
      { min: 13900, max: 80650, rate: 0.055 },
      { min: 80650, max: 215400, rate: 0.06 },
      { min: 215400, max: 1077550, rate: 0.0685 },
      { min: 1077550, max: 5000000, rate: 0.0965 },
      { min: 5000000, max: 25000000, rate: 0.103 },
      { min: 25000000, max: Infinity, rate: 0.109 }
    ],
    standardDeduction: { single: 8000, marriedJoint: 16050, marriedSeparate: 8000, headOfHousehold: 11200 }
  },
  NC: {
    name: 'North Carolina',
    abbreviation: 'NC',
    hasIncomeTax: true,
    flatRate: 0.0475,
    standardDeduction: { single: 12750, marriedJoint: 25500, marriedSeparate: 12750, headOfHousehold: 19125 }
  },
  ND: {
    name: 'North Dakota',
    abbreviation: 'ND',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 41775, rate: 0.0110 },
      { min: 41775, max: 101050, rate: 0.0204 },
      { min: 101050, max: 204200, rate: 0.0227 },
      { min: 204200, max: 445000, rate: 0.0264 },
      { min: 445000, max: Infinity, rate: 0.0290 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  OH: {
    name: 'Ohio',
    abbreviation: 'OH',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 26050, rate: 0.0285 },
      { min: 26050, max: 41600, rate: 0.0333 },
      { min: 41600, max: 83350, rate: 0.0380 },
      { min: 83350, max: 104250, rate: 0.0428 },
      { min: 104250, max: Infinity, rate: 0.0476 }
    ],
    standardDeduction: { single: 2400, marriedJoint: 4800, marriedSeparate: 2400, headOfHousehold: 3550 },
    personalExemption: { single: 2400, marriedJoint: 4800, marriedSeparate: 2400, headOfHousehold: 2400, dependent: 2400 }
  },
  OK: {
    name: 'Oklahoma',
    abbreviation: 'OK',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 1000, rate: 0.0025 },
      { min: 1000, max: 2500, rate: 0.0075 },
      { min: 2500, max: 3750, rate: 0.0175 },
      { min: 3750, max: 4900, rate: 0.0275 },
      { min: 4900, max: 7200, rate: 0.0375 },
      { min: 7200, max: Infinity, rate: 0.05 }
    ],
    standardDeduction: { single: 6350, marriedJoint: 12700, marriedSeparate: 6350, headOfHousehold: 9350 },
    personalExemption: { single: 1000, marriedJoint: 2000, marriedSeparate: 1000, headOfHousehold: 1000, dependent: 1000 }
  },
  OR: {
    name: 'Oregon',
    abbreviation: 'OR',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 4050, rate: 0.0475 },
      { min: 4050, max: 10200, rate: 0.0675 },
      { min: 10200, max: 25550, rate: 0.0875 },
      { min: 25550, max: 64000, rate: 0.099 },
      { min: 64000, max: Infinity, rate: 0.099 }
    ],
    standardDeduction: { single: 2605, marriedJoint: 5210, marriedSeparate: 2605, headOfHousehold: 4160 }
  },
  PA: {
    name: 'Pennsylvania',
    abbreviation: 'PA',
    hasIncomeTax: true,
    flatRate: 0.0307,
    standardDeduction: { single: 0, marriedJoint: 0, marriedSeparate: 0, headOfHousehold: 0 }
  },
  RI: {
    name: 'Rhode Island',
    abbreviation: 'RI',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 68200, rate: 0.0375 },
      { min: 68200, max: 155050, rate: 0.0475 },
      { min: 155050, max: Infinity, rate: 0.0599 }
    ],
    standardDeduction: { single: 9550, marriedJoint: 19100, marriedSeparate: 9550, headOfHousehold: 14200 }
  },
  SC: {
    name: 'South Carolina',
    abbreviation: 'SC',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 3200, rate: 0.0 },
      { min: 3200, max: 16040, rate: 0.03 },
      { min: 16040, max: Infinity, rate: 0.07 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  SD: {
    name: 'South Dakota',
    abbreviation: 'SD',
    hasIncomeTax: false
  },
  TN: {
    name: 'Tennessee',
    abbreviation: 'TN',
    hasIncomeTax: false
  },
  TX: {
    name: 'Texas',
    abbreviation: 'TX',
    hasIncomeTax: false
  },
  UT: {
    name: 'Utah',
    abbreviation: 'UT',
    hasIncomeTax: true,
    flatRate: 0.0495,
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  VT: {
    name: 'Vermont',
    abbreviation: 'VT',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 42150, rate: 0.0335 },
      { min: 42150, max: 102200, rate: 0.066 },
      { min: 102200, max: 208450, rate: 0.076 },
      { min: 208450, max: Infinity, rate: 0.0875 }
    ],
    standardDeduction: { single: 7150, marriedJoint: 14300, marriedSeparate: 7150, headOfHousehold: 10550 }
  },
  VA: {
    name: 'Virginia',
    abbreviation: 'VA',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 3000, rate: 0.02 },
      { min: 3000, max: 5000, rate: 0.03 },
      { min: 5000, max: 17000, rate: 0.05 },
      { min: 17000, max: Infinity, rate: 0.0575 }
    ],
    standardDeduction: { single: 4500, marriedJoint: 9000, marriedSeparate: 4500, headOfHousehold: 6750 },
    personalExemption: { single: 930, marriedJoint: 1860, marriedSeparate: 930, headOfHousehold: 930, dependent: 930 }
  },
  WA: {
    name: 'Washington',
    abbreviation: 'WA',
    hasIncomeTax: false
  },
  WV: {
    name: 'West Virginia',
    abbreviation: 'WV',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 10000, rate: 0.03 },
      { min: 10000, max: 25000, rate: 0.04 },
      { min: 25000, max: 40000, rate: 0.045 },
      { min: 40000, max: 60000, rate: 0.06 },
      { min: 60000, max: Infinity, rate: 0.065 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  WI: {
    name: 'Wisconsin',
    abbreviation: 'WI',
    hasIncomeTax: true,
    brackets: [
      { min: 0, max: 13810, rate: 0.0354 },
      { min: 13810, max: 27630, rate: 0.0465 },
      { min: 27630, max: 304170, rate: 0.0627 },
      { min: 304170, max: Infinity, rate: 0.0765 }
    ],
    standardDeduction: { single: 13850, marriedJoint: 27700, marriedSeparate: 13850, headOfHousehold: 20800 }
  },
  WY: {
    name: 'Wyoming',
    abbreviation: 'WY',
    hasIncomeTax: false
  }
};

export function calculateStateTax(
  state: string,
  taxableIncome: number,
  filingStatus: 'single' | 'married' | 'hoh',
  dependentsCount: number = 0
): number {
  const stateInfo = STATE_TAX_DATA[state.toUpperCase()];
  
  if (!stateInfo || !stateInfo.hasIncomeTax) {
    return 0;
  }

  let stateTaxableIncome = taxableIncome;

  // Apply state standard deduction if available
  if (stateInfo.standardDeduction) {
    const deduction = filingStatus === 'married' 
      ? stateInfo.standardDeduction.marriedJoint
      : filingStatus === 'hoh'
      ? stateInfo.standardDeduction.headOfHousehold
      : stateInfo.standardDeduction.single;
    
    stateTaxableIncome = Math.max(0, stateTaxableIncome - deduction);
  }

  // Apply personal exemptions if available
  if (stateInfo.personalExemption) {
    const exemption = filingStatus === 'married'
      ? stateInfo.personalExemption.marriedJoint
      : filingStatus === 'hoh'
      ? stateInfo.personalExemption.headOfHousehold
      : stateInfo.personalExemption.single;
    
    const dependentExemptions = dependentsCount * (stateInfo.personalExemption.dependent || 0);
    stateTaxableIncome = Math.max(0, stateTaxableIncome - exemption - dependentExemptions);
  }

  // Calculate tax based on flat rate or brackets
  if (stateInfo.flatRate) {
    return stateTaxableIncome * stateInfo.flatRate;
  }

  if (stateInfo.brackets) {
    let tax = 0;
    for (const bracket of stateInfo.brackets) {
      if (stateTaxableIncome <= bracket.min) break;
      
      const taxableAtBracket = Math.min(
        stateTaxableIncome - bracket.min,
        bracket.max - bracket.min
      );
      
      tax += taxableAtBracket * bracket.rate;
      
      if (stateTaxableIncome <= bracket.max) break;
    }
    return tax;
  }

  return 0;
}

export function getStateList(): { name: string; abbreviation: string }[] {
  return Object.values(STATE_TAX_DATA).map(state => ({
    name: state.name,
    abbreviation: state.abbreviation
  })).sort((a, b) => a.name.localeCompare(b.name));
}

export function getStateName(abbreviation: string): string {
  const state = STATE_TAX_DATA[abbreviation.toUpperCase()];
  return state ? state.name : abbreviation;
}

export function hasStateTax(state: string): boolean {
  const stateInfo = STATE_TAX_DATA[state.toUpperCase()];
  return stateInfo ? stateInfo.hasIncomeTax : false;
}