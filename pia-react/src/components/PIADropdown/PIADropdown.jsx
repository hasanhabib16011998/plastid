'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function PIADropdown({ name, value, onChange, options, placeholder = 'Select Service' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (optionValue) => {
    onChange({
      target: {
        name,
        value: optionValue,
      },
    })
    setIsOpen(false)
  }

  const selectedLabel = value || placeholder

  return (
    <div ref={dropdownRef} className="relative w-full mb-5">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded text-sm font-sans text-left cursor-pointer outline-none select-none transition-all ${
          isOpen
            ? 'bg-white border-[1.5px] border-brass shadow-[0_0_0_3px_rgba(196,155,93,0.18)]'
            : 'bg-alabaster border border-black/15'
        } ${value ? 'text-obsidian font-medium' : 'text-black/45 font-normal'}`}
      >
        <span>{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`text-brass shrink-0 ml-2.5 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <ul className="absolute top-[calc(100%+6px)] left-0 right-0 z-[9999] bg-obsidian border border-brass/35 rounded-md shadow-2xl p-1.5 m-0 list-none max-h-64 overflow-y-auto">
          {options.map((opt, i) => {
            const isSelected = value === opt
            return (
              <li
                key={i}
                onClick={() => handleSelect(opt)}
                className={`px-3.5 py-2.5 rounded text-[13.5px] font-sans cursor-pointer flex items-center justify-between select-none transition-all ${
                  isSelected
                    ? 'text-brass bg-brass/15 font-medium'
                    : 'text-alabaster hover:bg-brass/10 hover:text-brass hover:pl-4 font-normal'
                }`}
              >
                <span>{opt}</span>
                {isSelected && <Check size={14} className="text-brass shrink-0" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
