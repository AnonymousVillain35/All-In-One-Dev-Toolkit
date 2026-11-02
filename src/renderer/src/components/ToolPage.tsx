import type { ReactElement, ReactNode } from 'react'
import { Icon } from '../icons'
import type { ToolDef } from '../tools/registry'

interface ToolPageProps {
  tool: ToolDef
  actions?: ReactNode
  children: ReactNode
}

export function ToolPage({ tool, actions, children }: ToolPageProps): ReactElement {
  return (
    <div className="page tool-page">
      <header className="tool-header">
        <span className="tool-icon">
          <Icon name={tool.icon} size={24} />
        </span>
        <div className="tool-heading">
          <div className="tool-title-row">
            <h1>{tool.name}</h1>
            <span className="tool-category">{tool.category}</span>
            {tool.status === 'planned' && <span className="pill pill-warning">Planned</span>}
          </div>
          <p className="tool-description">{tool.description}</p>
        </div>
        {actions && <div className="tool-actions">{actions}</div>}
      </header>
      <div className="tool-body">{children}</div>
    </div>
  )
}
