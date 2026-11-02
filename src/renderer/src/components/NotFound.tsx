import type { ReactElement } from 'react'
import { Icon } from '../icons'
import { Button } from './ui/Button'

interface NotFoundProps {
  onNavigate: (id: string) => void
}

export function NotFound({ onNavigate }: NotFoundProps): ReactElement {
  return (
    <div className="page empty-page">
      <div className="empty-card">
        <span className="empty-icon">
          <Icon name="bug" size={26} />
        </span>
        <h1>That tool wandered off</h1>
        <p>The route you followed does not match anything in the toolkit.</p>
        <Button variant="primary" onClick={() => onNavigate('home')}>
          Back to overview
        </Button>
      </div>
    </div>
  )
}
