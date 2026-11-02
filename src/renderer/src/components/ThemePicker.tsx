import { useEffect, useRef, useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { getTheme, THEMES, type ThemeDefinition, type ThemeId } from '../hooks/useTheme'

interface ThemePickerProps {
  theme: ThemeId
  onSelect: (id: ThemeId) => void
}

function swatch(theme: ThemeDefinition): string {
  const [base, mid, glow] = theme.swatches
  return `linear-gradient(135deg, ${base} 0%, ${mid} 54%, ${glow} 100%)`
}

export function ThemePicker({ theme, onSelect }: ThemePickerProps): ReactElement {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const active = getTheme(theme)

  useEffect(() => {
    if (!open) return

    const handlePointerDown = (event: PointerEvent): void => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div className={`theme-picker${open ? ' is-open' : ''}`} ref={rootRef}>
      <button
        type="button"
        className="theme-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Theme: ${active.name}`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="theme-trigger-swatch" style={{ background: swatch(active) }} />
        <span className="theme-trigger-text">
          <span className="theme-trigger-label">Theme</span>
          <span className="theme-trigger-name">{active.name}</span>
        </span>
        <Icon name="chevron" size={14} className="theme-trigger-caret" />
      </button>

      {open && (
        <div className="theme-menu" role="listbox" aria-label="Color theme">
          <div className="theme-menu-head">
            <span>Appearance</span>
            <span>06 palettes</span>
          </div>

          {THEMES.map((item, index) => {
            const selected = item.id === theme
            return (
              <button
                key={item.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`theme-option${selected ? ' is-selected' : ''}`}
                onClick={() => {
                  onSelect(item.id)
                  setOpen(false)
                }}
              >
                <span className="theme-option-swatch" style={{ background: swatch(item) }} />
                <span className="theme-option-info">
                  <span className="theme-option-name">{item.name}</span>
                  <span className="theme-option-tagline">{item.tagline}</span>
                </span>
                <span className="theme-option-index">{String(index + 1).padStart(2, '0')}</span>
                {selected && <Icon name="check" size={13} className="theme-option-check" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
