"use client"

import type React from "react"

import { useState, useMemo, useEffect, useRef } from "react"
import USAMap from "react-usa-map"
import { MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { StateInfoHoverCard, useStateHoverCard, type DemoStateInfoData } from "./state-info-hover-card"
import { STATE_DATA, US_STATES } from "@/lib/data"

/**
 * Interactive USA Map Demo
 *
 * Features:
 * - State selection dropdown
 * - Clickable states with visual feedback
 * - Liquid glass effect on unselected states
 * - Dark mode only: lighter selected states, darker unselected
 * - Liquid glass hover cards with Top Products and Customer counts
 * - Selected state indicator below map
 */
export function DemoMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  const colors = useMemo(
    () => ({
      unselected: "#3d2a5c",
      selected: "#c4b5fd",
      default: "#2d2244",
    }),
    [],
  )

  // Remove native SVG title tooltips after map renders
  useEffect(() => {
    if (mapContainerRef.current) {
      const svg = mapContainerRef.current.querySelector("svg")
      if (svg) {
        const titles = svg.querySelectorAll("title")
        titles.forEach((title) => title.remove())

        const allElements = svg.querySelectorAll("*")
        allElements.forEach((element) => {
          element.removeAttribute("title")
          element.removeAttribute("data-title")
        })

        svg.removeAttribute("title")
      }
    }
  }, [])

  // Hover card hook with no delay
  const {
    hoverData,
    position,
    show: showHoverCard,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  } = useStateHoverCard(0)

  // Build state info data for hover cards
  const stateInfoMap = useMemo(() => {
    const map: Record<string, DemoStateInfoData> = {}

    Object.entries(STATE_DATA).forEach(([stateCode, data]) => {
      map[stateCode] = {
        stateName: data.stateName,
        stateCode: data.stateCode,
        topProducts: data.topProducts,
        customerCount: data.customerCount,
      }
    })

    return map
  }, [])

  // Get state map config with visual hierarchy and liquid glass styling
  const getStateMapConfig = () => {
    const config: Record<string, { fill: string }> = {}

    // All states get the unselected liquid glass color
    Object.keys(STATE_DATA).forEach((state) => {
      config[state] = {
        fill: colors.unselected,
      }
    })

    // Selected state gets prominent color (lighter in dark mode)
    if (selectedState) {
      config[selectedState] = {
        fill: colors.selected,
      }
    }

    return config
  }

  const handleStateClick = (event: React.MouseEvent<SVGPathElement>) => {
    const stateAbbr = (event.target as SVGPathElement).dataset.name
    if (stateAbbr) {
      setSelectedState(stateAbbr)
    }
  }

  const handleDropdownStateChange = (state: string) => {
    setSelectedState(state || null)
  }

  const handleMapMouseMove = (event: React.MouseEvent) => {
    const target = event.target as SVGPathElement
    const stateAbbr = target.dataset?.name

    if (stateAbbr && stateInfoMap[stateAbbr]) {
      handleMouseEnter(event, stateInfoMap[stateAbbr])
      handleMouseMove(event)
    } else {
      handleMouseLeave()
    }
  }

  // Dynamic CSS for liquid glass effect on states
  const liquidGlassStyles = `
    /* Base state styling with liquid glass effect */
    [data-slot="usa-map-container"] > svg path {
      pointer-events: auto !important;
      cursor: pointer;
      transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
      transform-origin: center;
      transform-box: fill-box;
    }

    /* ===== DARK MODE ===== */
    /* Unselected states - dark translucent glass */
    [data-slot="usa-map-container"] > svg path[fill="${colors.unselected}"] {
      filter: 
        drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))
        drop-shadow(inset 0 1px 0 rgba(255, 255, 255, 0.05));
      stroke: rgba(196, 181, 253, 0.2);
      stroke-width: 1;
    }

    /* Unselected hover - glass illuminates with bright white border */
    [data-slot="usa-map-container"] > svg path[fill="${colors.unselected}"]:hover {
      filter: 
        brightness(1.4) 
        saturate(1.5)
        drop-shadow(0 4px 20px rgba(139, 92, 246, 0.35))
        drop-shadow(0 0 12px rgba(255, 255, 255, 0.15));
      stroke: rgba(255, 255, 255, 0.7);
      stroke-width: 1.5;
    }

    /* Selected state - bright/lighter in dark mode */
    [data-slot="usa-map-container"] > svg path[fill="${colors.selected}"] {
      filter: 
        drop-shadow(0 0 20px rgba(196, 181, 253, 0.6))
        drop-shadow(0 4px 30px rgba(139, 92, 246, 0.4))
        drop-shadow(inset 0 1px 2px rgba(255, 255, 255, 0.2));
      stroke: rgba(255, 255, 255, 0.5);
      stroke-width: 1.5;
    }

    /* Selected hover - NO CHANGE (prevent UI shifts) */
    [data-slot="usa-map-container"] > svg path[fill="${colors.selected}"]:hover {
      filter: 
        drop-shadow(0 0 20px rgba(196, 181, 253, 0.6))
        drop-shadow(0 4px 30px rgba(139, 92, 246, 0.4))
        drop-shadow(inset 0 1px 2px rgba(255, 255, 255, 0.2));
      stroke: rgba(255, 255, 255, 0.5);
      stroke-width: 1.5;
    }

    /* Active/click state for all */
    [data-slot="usa-map-container"] > svg path:active {
      transform: scale(0.97);
    }

    /* Hide SVG titles */
    [data-slot="usa-map-container"] svg title {
      pointer-events: none !important;
      display: none !important;
    }

    /* Hide Washington D.C. indicator */
    [data-slot="usa-map-container"] > svg path[data-name="DC"],
    [data-slot="usa-map-container"] > svg circle,
    [data-slot="usa-map-container"] > svg ellipse {
      display: none !important;
    }
  `

  return (
    <>
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        data-slot="usa-map-container"
        className="relative rounded-xl p-4 md:p-6 lg:p-8 flex-1 flex items-center justify-center [&>svg]:w-full [&>svg]:h-auto [&>svg]:max-h-[600px] overflow-hidden"
        onMouseMove={handleMapMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 pointer-events-none rounded-xl" />

        {/* Dynamic CSS for liquid glass states */}
        <style>{liquidGlassStyles}</style>

        <USAMap
          customize={getStateMapConfig()}
          defaultFill={colors.default}
          width={900}
          height={550}
          title=""
          onClick={handleStateClick}
        />
      </div>

      {/* Hover Card */}
      <StateInfoHoverCard data={hoverData} position={position} show={showHoverCard} variant="glass" />

      {/* Selected State Indicator */}
      <AnimatePresence>
        {selectedState && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 px-4 py-2 text-center flex-row justify-center"
          >
            <MapPin className="text-violet-400" size={16} />
            <span className="text-base">
              <span className="text-foreground font-semibold text-lg">{US_STATES[selectedState]}</span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
