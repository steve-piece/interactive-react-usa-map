# Interactive USA Map Component

A fully interactive, dark-themed USA map built with React and Next.js. Features liquid glass styling, configurable hover cards, and smooth animations.

## Features

- Click any state to select and highlight it
- Hover over states to view detailed information cards
- Liquid glass visual effects with smooth animations
- Fully responsive design
- TypeScript support
- Easy customization via configuration files

---

## Quick Start

Fork this template and start customizing:

1. **Change hover card data** - Edit `lib/hover-card-config.ts`
2. **Add your own state data** - Edit `lib/data.ts`
3. **Customize colors** - Edit the `colors` object in `components/demo-map.tsx`

---

## Customization Guide

### 1. Hover Card Fields

Edit `lib/hover-card-config.ts` to configure which fields appear:

\`\`\`typescript
export interface HoverCardData {
  stateName: string
  stateCode: string
  // Add your custom fields:
  revenue: number
  activeUsers: number
  topCategories: string[]
}

export const HOVER_CARD_FIELDS: HoverCardField[] = [
  {
    key: "revenue",
    label: "Revenue",
    icon: DollarSign,
    type: "stat",
    suffix: "USD",
    formatNumber: true,
  },
  {
    key: "topCategories",
    label: "Categories",
    icon: Tag,
    type: "badges",
    maxItems: 3,
  },
]
\`\`\`

**Field types:** `stat` (large number), `badges` (colored pills), `text`, `list`

### 2. State Data

Edit `lib/data.ts` with your data:

\`\`\`typescript
export const STATE_DATA: Record<string, HoverCardData> = {
  CA: {
    stateName: "California",
    stateCode: "CA",
    revenue: 125000,
    activeUsers: 4523,
    topCategories: ["Tech", "Finance"],
  },
  // ... more states
}
\`\`\`

### 3. Map Colors

Edit the `colors` object in `components/demo-map.tsx`:

\`\`\`typescript
const colors = useMemo(
  () => ({
    unselected: "#3d2a5c", // Default state color
    selected: "#c4b5fd",   // Selected state color
    default: "#2d2244",    // Fallback color
  }),
  [],
)
\`\`\`

### 4. Background Color

Edit in `app/globals.css`:

\`\`\`css
body {
  background: linear-gradient(135deg, #1e1b2e 0%, #2d2244 50%, #1e1b2e 100%);
}
\`\`\`

---

## File Structure

\`\`\`
├── components/
│   ├── demo-map.tsx              # Main map component
│   └── state-info-hover-card.tsx # Hover card component
├── lib/
│   ├── data.ts                   # State data (customize this)
│   └── hover-card-config.ts      # Hover card config
\`\`\`

---

## License

MIT
