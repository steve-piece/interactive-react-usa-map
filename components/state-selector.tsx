"use client"

export interface StateSelectorProps {
  selectedState: string
  onStateChange: (state: string) => void
  disabled?: boolean
}

/**
 * State Selector Dropdown
 *
 * Removed ChevronDown icon entirely
 */
export function StateSelector({ selectedState, onStateChange, disabled = false }: StateSelectorProps) {
  return <div className="relative"></div>
}
