"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import {
  type HoverCardData,
  HOVER_CARD_FIELDS,
  HOVER_CARD_STYLES,
  HOVER_CARD_HEADER,
  type HoverCardField,
} from "@/lib/hover-card-config"

const stateInfoHoverCardVariants = cva(
  "fixed z-50 rounded-xl md:rounded-2xl p-3 md:p-4 pointer-events-none w-fit max-w-[calc(100vw-2rem)] sm:max-w-[280px]",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border border-border shadow-lg",
        info: "bg-blue-950/95 border border-blue-800 shadow-lg",
        glass:
          "bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl backdrop-saturate-150 border border-white/10 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

// Re-export the data type for external use
export type { HoverCardData as DemoStateInfoData }

export interface StateInfoHoverCardProps extends VariantProps<typeof stateInfoHoverCardVariants> {
  data: HoverCardData | null
  position: { x: number; y: number }
  show: boolean
  className?: string
}

/**
 * Renders a single field based on its configuration
 */
function RenderField({ field, data }: { field: HoverCardField; data: HoverCardData }) {
  const value = data[field.key]
  const Icon = field.icon

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Icon className={cn("shrink-0", HOVER_CARD_STYLES.icons.field)} size={14} />
        <span className={cn("text-xs font-medium", HOVER_CARD_STYLES.text.subtitle)}>{field.label}</span>
      </div>

      {field.type === "badges" && Array.isArray(value) && (
        <>
          {value.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {value.slice(0, field.maxItems || 4).map((item) => (
                <span
                  key={item}
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    HOVER_CARD_STYLES.badge.background,
                    HOVER_CARD_STYLES.badge.text,
                    HOVER_CARD_STYLES.badge.border,
                  )}
                >
                  {item}
                </span>
              ))}
              {value.length > (field.maxItems || 4) && (
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    HOVER_CARD_STYLES.badge.background,
                    HOVER_CARD_STYLES.badge.text,
                  )}
                >
                  +{value.length - (field.maxItems || 4)}
                </span>
              )}
            </div>
          ) : (
            <p className={cn("text-xs", HOVER_CARD_STYLES.text.empty)}>No {field.label.toLowerCase()}</p>
          )}
        </>
      )}

      {field.type === "stat" && typeof value === "number" && (
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-bold tabular-nums", HOVER_CARD_STYLES.text.stat)}>
            {field.formatNumber ? value.toLocaleString() : value}
          </span>
          {field.suffix && <span className={cn("text-xs", HOVER_CARD_STYLES.text.statSuffix)}>{field.suffix}</span>}
        </div>
      )}

      {field.type === "text" && typeof value === "string" && (
        <p className={cn("text-sm", HOVER_CARD_STYLES.text.subtitle)}>{value}</p>
      )}

      {field.type === "list" && Array.isArray(value) && (
        <ul className="space-y-1">
          {value.map((item, i) => (
            <li key={i} className={cn("text-xs", HOVER_CARD_STYLES.text.subtitle)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/**
 * State Info Hover Card
 *
 * A configurable hover card that displays state information.
 * Edit `lib/hover-card-config.ts` to customize fields, icons, and styling.
 */
export function StateInfoHoverCard({ data, position, show, variant, className }: StateInfoHoverCardProps) {
  if (!data || !show) return null

  const HeaderIcon = HOVER_CARD_HEADER.icon

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          data-slot="state-info-hover-card"
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className={cn(stateInfoHoverCardVariants({ variant }), className)}
          style={{
            left: typeof window !== "undefined" ? Math.min(position.x + 32, window.innerWidth - 300) : position.x + 32,
            top: Math.max(position.y + 16, 10),
          }}
        >
          {/* State Header */}
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
            <HeaderIcon className={cn("shrink-0", HOVER_CARD_STYLES.icons.header)} size={16} />
            <div>
              <h4 className={cn("text-sm font-semibold", HOVER_CARD_STYLES.text.title)}>{data.stateName}</h4>
              {HOVER_CARD_HEADER.showStateCode && (
                <p className={cn("text-xs font-mono", HOVER_CARD_STYLES.text.subtitle)}>{data.stateCode}</p>
              )}
            </div>
          </div>

          {/* Dynamic Fields */}
          <div className="space-y-3">
            {HOVER_CARD_FIELDS.map((field) => (
              <RenderField key={field.key} field={field} data={data} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/**
 * Hook to manage hover card state with delay
 */
export function useStateHoverCard(delay = 0) {
  const [hoverData, setHoverData] = useState<HoverCardData | null>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [show, setShow] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (event: React.MouseEvent, data: HoverCardData) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    setPosition({ x: event.clientX, y: event.clientY })
    setHoverData(data)

    if (delay === 0) {
      setShow(true)
    } else {
      const id = setTimeout(() => {
        setShow(true)
      }, delay)
      setTimeoutId(id)
    }
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setShow(false)
    setHoverData(null)
  }

  const handleMouseMove = (event: React.MouseEvent) => {
    setPosition({ x: event.clientX, y: event.clientY })
  }

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [timeoutId])

  return {
    hoverData,
    position,
    show,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  }
}

export { stateInfoHoverCardVariants }
