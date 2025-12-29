/**
 * Database configuration and data fetching utilities
 *
 * This file provides a clean interface for connecting your map to production data.
 * Replace the demo implementation with your actual database queries.
 */

// =============================================================================
// DATA INTERFACE - Customize fields to match your database schema
// =============================================================================

export interface StateData {
  stateName: string
  stateCode: string
  topProducts: string[]
  customerCount: number
}

// =============================================================================
// US STATES REFERENCE - Standard state codes and names
// =============================================================================

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
}

export const US_STATES_ARRAY = Object.entries(US_STATES)
  .map(([code, name]) => ({ code, name }))
  .sort((a, b) => a.name.localeCompare(b.name))

// =============================================================================
// DEMO DATA
// =============================================================================

const DEMO_PRODUCTS = [
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
]

// Approximate customer counts by state population
const POPULATION_TIERS: Record<string, number> = {
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
}

function generateDemoData(): Record<string, StateData> {
  const data: Record<string, StateData> = {}

  Object.entries(US_STATES).forEach(([code, name], index) => {
    const shuffled = [...DEMO_PRODUCTS].sort(() => ((index * 17) % 2) - 0.5)
    data[code] = {
      stateCode: code,
      stateName: name,
      topProducts: shuffled.slice(0, 2 + (index % 4)),
      customerCount: POPULATION_TIERS[code] || 2500,
    }
  })

  return data
}

// STATE_DATA - Your map data source
export const STATE_DATA = generateDemoData()
