import type { ReactElement } from 'react'
import { Icon } from '../icons'
import { PLANNED_TOOLS, READY_TOOLS, type ToolDef } from '../tools/registry'
import { Button } from './ui/Button'
import { Callout } from './ui/Panel'
import { ToolPage } from './ToolPage'

interface ComingSoonProps {
  tool: ToolDef
  onNavigate: (id: string) => void
}

export function ComingSoon({ tool, onNavigate }: ComingSoonProps): ReactElement {
  const suggestions = READY_TOOLS.filter((item) => item.category === tool.category)
  const firstSuggestion = suggestions[0] ?? READY_TOOLS[0]

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button
          variant="secondary"
          icon={<Icon name="arrow-right" size={15} className="icon-flip" />}
          onClick={() => onNavigate('home')}
        >
          Overview
        </Button>
      }
    >
      <div className="coming-soon">
        <div className="coming-art">
          <span className="coming-art-icon">
            <Icon name={tool.icon} size={26} />
          </span>
          <span className="coming-art-spark">
            <Icon name="sparkles" size={18} />
          </span>
        </div>
        <h2>In the workshop</h2>
        <p className="coming-lede">
          {tool.name} is planned for an upcoming iteration. It will drop into the same
          local-first shell as the rest of the toolkit.
        </p>

        <Callout tone="info" title="Why is it not here yet?">
          The foundation ships first. Tools are added one at a time so each one gets proper
          edge-case handling, keyboard support, and a focused interface.
        </Callout>

        <div className="coming-actions">
          {firstSuggestion && (
            <Button
              variant="primary"
              icon={<Icon name={firstSuggestion.icon} size={15} />}
              onClick={() => onNavigate(firstSuggestion.id)}
            >
              Try {firstSuggestion.name}
            </Button>
          )}
          <Button variant="secondary" onClick={() => onNavigate('home')}>
            Browse ready tools
          </Button>
        </div>

        <div className="coming-list">
          <h3>Also planned</h3>
          <div className="chip-row">
            {PLANNED_TOOLS.filter((item) => item.id !== tool.id).map((item) => (
              <button
                key={item.id}
                type="button"
                className="chip"
                onClick={() => onNavigate(item.id)}
              >
                <Icon name={item.icon} size={13} />
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolPage>
  )
}
