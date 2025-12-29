import { MapPin, Package, Users, type LucideIcon } from "lucide-react"

/**
 * HOVER CARD CONFIGURATION
 *
 * Edit this file to customize what fields appear in the state hover cards.
 * Each field is independently configurable with its own icon, label, and render logic.
 */

// =============================================================================
// DATA INTERFACE - Define your data shape here
// =============================================================================

/**
 * The data structure for each state's hover card.
 * Modify this interface to match your data source.
 */
export interface HoverCardData {
  // Required: State identification
  stateName: string
  stateCode: string

  // Custom fields - add/remove as needed
  topProducts: string[] // Example: list of items displayed as badges
  customerCount: number // Example: numeric stat displayed prominently
}

// =============================================================================
// FIELD CONFIGURATION - Define which fields to display
// =============================================================================

export type FieldType = "badges" | "stat" | "text" | "list"

export interface HoverCardField {
  /** Unique key matching a property in HoverCardData */
  key: keyof Omit<HoverCardData, "stateName" | "stateCode">
  /** Display label shown above the field */
  label: string
  /** Lucide icon component */
  icon: LucideIcon
  /** How to render this field */
  type: FieldType
  /** For badges: max items before showing "+X more" */
  maxItems?: number
  /** For stat: suffix text (e.g., "total", "active", "users") */
  suffix?: string
  /** For stat: whether to format with commas */
  formatNumber?: boolean
}

/**
 * CONFIGURE YOUR HOVER CARD FIELDS HERE
 *
 * Add, remove, or reorder fields to customize the hover card display.
 * Fields appear in the order they are listed.
 */
export const HOVER_CARD_FIELDS: HoverCardField[] = [
  {
    key: "topProducts",
    label: "Top Products",
    icon: Package,
    type: "badges",
    maxItems: 4,
  },
  {
    key: "customerCount",
    label: "Customers",
    icon: Users,
    type: "stat",
    suffix: "total",
    formatNumber: true,
  },
]

// =============================================================================
// STYLING CONFIGURATION
// =============================================================================

export const HOVER_CARD_STYLES = {
  /** Badge styling for list items */
  badge: {
    background: "bg-violet-500/20",
    text: "text-violet-300",
    border: "", // Add border classes if needed
  },
  /** Icon colors */
  icons: {
    header: "text-violet-500",
    field: "text-slate-500",
  },
  /** Text colors */
  text: {
    title: "text-white",
    subtitle: "text-slate-300",
    stat: "text-white",
    statSuffix: "text-slate-400", // lighter gray for stat suffix ("total")
    empty: "text-slate-500",
  },
}

// =============================================================================
// HEADER CONFIGURATION
// =============================================================================

export const HOVER_CARD_HEADER = {
  /** Icon shown next to state name */
  icon: MapPin,
  /** Whether to show state code below name */
  showStateCode: true,
}
