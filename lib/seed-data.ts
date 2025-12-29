// Seed data for all 50 US states with demo products and customer counts

export interface StateData {
  stateName: string;
  stateCode: string;
  topProducts: string[];
  customerCount: number;
}

// Product catalog for seed data variety
const PRODUCTS = [
  "Widget Pro",
  "Gadget X",
  "SuperTool",
  "MegaDevice",
  "PowerUnit",
  "FlexKit",
  "SmartHub",
  "QuickLink",
  "EcoSaver",
  "TurboMax",
  "UltraGrip",
  "PrimeSolution",
  "CorePlus",
  "NexGen",
  "AlphaWare",
];

// Generate varied products for each state
function getRandomProducts(seed: number): string[] {
  const count = 2 + (seed % 4); // 2-5 products per state
  const shuffled = [...PRODUCTS].sort(() => (seed * 17) % 2 - 0.5);
  return shuffled.slice(0, count);
}

// Generate varied customer counts based on state population patterns
function getCustomerCount(stateCode: string): number {
  const populationTiers: Record<string, number> = {
    // High population states
    CA: 45230,
    TX: 38450,
    FL: 31280,
    NY: 28940,
    PA: 18520,
    IL: 17340,
    OH: 16280,
    GA: 15120,
    NC: 14890,
    MI: 13560,
    // Medium population states
    NJ: 12340,
    VA: 11890,
    WA: 10560,
    AZ: 10230,
    MA: 9870,
    TN: 9450,
    IN: 8920,
    MO: 8340,
    MD: 8120,
    WI: 7890,
    CO: 7650,
    MN: 7420,
    SC: 7180,
    AL: 6890,
    LA: 6540,
    KY: 6230,
    OR: 5980,
    OK: 5670,
    CT: 5340,
    UT: 5120,
    // Lower population states
    IA: 4780,
    NV: 4560,
    AR: 4230,
    MS: 3980,
    KS: 3750,
    NM: 3480,
    NE: 3240,
    ID: 2980,
    WV: 2670,
    HI: 2450,
    NH: 2230,
    ME: 1980,
    RI: 1760,
    MT: 1540,
    DE: 1320,
    SD: 1180,
    ND: 1050,
    AK: 890,
    VT: 780,
    WY: 650,
  };

  return populationTiers[stateCode] || Math.floor(1000 + Math.random() * 5000);
}

export const US_STATES: Record<string, string> = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
};

// Generate seed data for all 50 states
export function generateStateSeedData(): Record<string, StateData> {
  const data: Record<string, StateData> = {};

  Object.entries(US_STATES).forEach(([code, name], index) => {
    data[code] = {
      stateCode: code,
      stateName: name,
      topProducts: getRandomProducts(index * 7 + 13),
      customerCount: getCustomerCount(code),
    };
  });

  return data;
}

// Pre-generated seed data
export const STATE_SEED_DATA = generateStateSeedData();

// US States array for dropdown
export const US_STATES_ARRAY = Object.entries(US_STATES)
  .map(([code, name]) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name));
