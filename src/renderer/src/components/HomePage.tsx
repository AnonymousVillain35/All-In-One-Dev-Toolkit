import type { ReactElement } from 'react'
import { Icon } from '../icons'
import { PLANNED_TOOLS, READY_TOOLS } from '../tools/registry'

interface HomePageProps {
  onNavigate: (id: string) => void
}

export function HomePage({ onNavigate }: HomePageProps): ReactElement {
  return (
    <div className="page home-page">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">
            <Icon name="bolt" size={14} />
            All-in-one developer toolkit
          </span>
          <h1>
            Every small tool.
            <br />
            <span className="hero-accent">One fast app.</span>
          </h1>
          <p className="hero-lede">
            Format, encode, decode, generate, and debug — without opening ten browser tabs.
            Everything runs locally on your machine.
          </p>
          <div className="hero-actions">
            <button
              type="button"
              className="btn btn-primary btn-md"
              onClick={() => onNavigate('json-formatter')}
            >
              Start with JSON
              <Icon name="arrow-right" size={15} />
            </button>
            <span className="hero-hint">
              <kbd>Ctrl</kbd>
              <kbd>K</kbd>
              <span>to jump anywhere</span>
            </span>
          </div>
          <div className="hero-stats">
            <span>
              <strong>{READY_TOOLS.length}</strong> tools ready
            </span>
            <span className="hero-stats-dot" />
            <span>
              <strong>{PLANNED_TOOLS.length}</strong> in the workshop
            </span>
            <span className="hero-stats-dot" />
            <span className="hero-stats-private">
              <Icon name="shield" size={14} /> 100% offline
            </span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="hero-glow" />
          <div className="hero-terminal">
            <div className="hero-terminal-bar">
              <span />
              <span />
              <span />
              <em>dev-toolkit</em>
            </div>
            <pre>
              <span className="term-muted">$</span> devkit
              {'\n'}
              <span className="term-accent">→</span> json.format(input)
              {'\n'}
              <span className="term-success">✓</span> valid JSON · 24 lines
              {'\n'}
              <span className="term-accent">→</span> jwt.decode(token)
              {'\n'}
              <span className="term-success">✓</span> claims · expires in 9d
              {'\n'}
              <span className="term-accent">→</span> base64.encode(&quot;hello&quot;)
              {'\n'}
              <span className="term-output">aGVsbG8=</span>
              <span className="term-cursor" />
            </pre>
          </div>
          <div className="hero-float hero-float-a">
            <Icon name="check-circle" size={15} /> Nothing uploaded
          </div>
          <div className="hero-float hero-float-b">
            <Icon name="bolt" size={15} /> Instant results
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>Ready to use</h2>
            <p>Small, focused utilities that open instantly.</p>
          </div>
          <span className="section-count">{READY_TOOLS.length} tools</span>
        </div>
        <div className="tool-grid">
          {READY_TOOLS.map((tool) => (
            <button
              key={tool.id}
              type="button"
              className="tool-card"
              onClick={() => onNavigate(tool.id)}
            >
              <span className="tool-card-icon">
                <Icon name={tool.icon} size={20} />
              </span>
              <span className="tool-card-body">
                <span className="tool-card-meta">{tool.category}</span>
                <span className="tool-card-title">{tool.name}</span>
                <span className="tool-card-desc">{tool.description}</span>
              </span>
              <Icon name="arrow-right" size={16} className="tool-card-arrow" />
            </button>
          ))}
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <div>
            <h2>In the workshop</h2>
            <p>Next on the roadmap. New tools plug into the same shell.</p>
          </div>
          <span className="section-count">{PLANNED_TOOLS.length} planned</span>
        </div>
        <div className="roadmap-grid">
          {PLANNED_TOOLS.map((tool) => (
            <button
              key={tool.id}
              type="button"
              className="roadmap-card"
              onClick={() => onNavigate(tool.id)}
            >
              <span className="roadmap-icon">
                <Icon name={tool.icon} size={16} />
              </span>
              <span className="roadmap-text">
                <span className="roadmap-title">{tool.name}</span>
                <span className="roadmap-desc">{tool.description}</span>
              </span>
              <span className="pill pill-muted">Soon</span>
            </button>
          ))}
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-note">
          <Icon name="shield" size={14} />
          <span>No uploads, no accounts, no telemetry. Your data stays in this window.</span>
        </div>
      </footer>
    </div>
  )
}
