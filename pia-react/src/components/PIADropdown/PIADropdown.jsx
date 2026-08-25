import { useState, useRef, useEffect } from 'react'

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
    <div ref={dropdownRef} className="pia-dropdown" style={{ position: 'relative', width: '100%', marginBottom: '20px' }}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 18px',
          backgroundColor: isOpen ? '#ffffff' : '#F5F3ED',
          border: isOpen ? '1.5px solid #C49B5D' : '1px solid rgba(31, 46, 35, 0.15)',
          borderRadius: '4px',
          color: value ? '#1F2E23' : 'rgba(31, 46, 35, 0.45)',
          fontSize: '14px',
          fontFamily: 'var(--font-primary)',
          cursor: 'pointer',
          outline: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(196, 155, 93, 0.18)' : 'none',
          transition: 'all 0.25s ease',
          textAlign: 'left',
          userSelect: 'none',
        }}
      >
        <span style={{ fontWeight: value ? 500 : 400 }}>{selectedLabel}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C49B5D"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
            flexShrink: 0,
            marginLeft: '10px',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Floating Options Menu */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#1F2E23',
            border: '1px solid rgba(196, 155, 93, 0.35)',
            borderRadius: '6px',
            boxShadow: '0 12px 36px rgba(0, 0, 0, 0.35), 0 4px 12px rgba(0, 0, 0, 0.2)',
            padding: '6px',
            margin: 0,
            listStyle: 'none',
            maxHeight: '260px',
            overflowY: 'auto',
            animation: 'piaDropdownSlide 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {options.map((opt, i) => {
            const isSelected = value === opt
            return (
              <li
                key={i}
                onClick={() => handleSelect(opt)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  color: isSelected ? '#C49B5D' : '#F5F3ED',
                  backgroundColor: isSelected ? 'rgba(196, 155, 93, 0.15)' : 'transparent',
                  fontFamily: 'var(--font-primary)',
                  fontSize: '13.5px',
                  fontWeight: isSelected ? 500 : 400,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  transition: 'all 0.18s ease',
                  userSelect: 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(196, 155, 93, 0.12)'
                    e.currentTarget.style.color = '#C49B5D'
                    e.currentTarget.style.paddingLeft = '18px'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#F5F3ED'
                    e.currentTarget.style.paddingLeft = '14px'
                  }
                }}
              >
                <span>{opt}</span>
                {isSelected && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C49B5D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
