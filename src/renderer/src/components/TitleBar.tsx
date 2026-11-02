import { useEffect, useState, type ReactElement } from 'react'
import { Icon, LogoMark } from '../icons'

export function TitleBar(): ReactElement {
  const [maximized, setMaximized] = useState(false)
  const controls = window.devkit?.window

  useEffect(() => {
    if (!controls) return
    let active = true

    void controls.isMaximized().then((value) => {
      if (active) setMaximized(value)
    })

    const unsubscribe = controls.onMaximizeChange((value) => setMaximized(value))
    return () => {
      active = false
      unsubscribe()
    }
  }, [controls])

  return (
    <header className="titlebar">
      <div className="titlebar-brand">
        <LogoMark size={22} />
        <span className="titlebar-name">Dev Toolkit</span>
        <span className="titlebar-tag">All-in-One</span>
      </div>
      <div className="titlebar-drag" />
      {controls && (
        <div className="window-controls">
          <button
            type="button"
            className="window-btn"
            aria-label="Minimize"
            title="Minimize"
            onClick={() => controls.minimize()}
          >
            <Icon name="minus" size={16} />
          </button>
          <button
            type="button"
            className="window-btn"
            aria-label={maximized ? 'Restore' : 'Maximize'}
            title={maximized ? 'Restore' : 'Maximize'}
            onClick={() => controls.toggleMaximize()}
          >
            <Icon name={maximized ? 'restore' : 'square'} size={14} />
          </button>
          <button
            type="button"
            className="window-btn window-btn-close"
            aria-label="Close"
            title="Close"
            onClick={() => controls.close()}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </header>
  )
}
