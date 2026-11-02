import type { ReactElement, ReactNode } from 'react'
import { Icon, type IconName } from '../../icons'

interface PanelProps {
  title?: ReactNode
  actions?: ReactNode
  footer?: ReactNode
  children: ReactNode
  className?: string
}

export function Panel({ title, actions, footer, children, className = '' }: PanelProps): ReactElement {
  return (
    <section className={`panel${className ? ` ${className}` : ''}`}>
      {(title || actions) && (
        <header className="panel-header">
          <div className="panel-title">{title}</div>
          {actions && <div className="panel-actions">{actions}</div>}
        </header>
      )}
      <div className="panel-body">{children}</div>
      {footer && <footer className="panel-footer">{footer}</footer>}
    </section>
  )
}

export type CalloutTone = 'info' | 'error' | 'success' | 'warning'

const calloutIcons: Record<CalloutTone, IconName> = {
  info: 'info',
  error: 'alert',
  success: 'check-circle',
  warning: 'alert'
}

interface CalloutProps {
  tone?: CalloutTone
  title?: string
  children: ReactNode
}

export function Callout({ tone = 'info', title, children }: CalloutProps): ReactElement {
  return (
    <div className={`callout callout-${tone}`} role={tone === 'error' ? 'alert' : undefined}>
      <span className="callout-icon">
        <Icon name={calloutIcons[tone]} size={17} />
      </span>
      <div className="callout-content">
        {title && <strong className="callout-title">{title}</strong>}
        <div className="callout-text">{children}</div>
      </div>
    </div>
  )
}
