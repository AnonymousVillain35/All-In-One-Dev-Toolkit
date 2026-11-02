import { useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button, IconButton } from '../components/ui/Button'
import { CopyButton } from '../components/ui/CopyButton'
import { Panel } from '../components/ui/Panel'
import { useCopy } from '../hooks/useCopy'
import { useNow } from '../hooks/useNow'
import { formatLocal, formatRelativeTime, formatUtc } from '../lib/format'
import { getTool } from './registry'

function parseInput(raw: string): Date | null {
  const trimmed = raw.trim()
  if (!trimmed) return null

  if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
    const numeric = Number(trimmed)
    if (!Number.isFinite(numeric)) return null
    const milliseconds = Math.abs(numeric) >= 1e11 ? numeric : numeric * 1000
    const date = new Date(milliseconds)
    return Number.isNaN(date.getTime()) ? null : date
  }

  const date = new Date(trimmed)
  return Number.isNaN(date.getTime()) ? null : date
}

export default function TimestampConverter(): ReactElement {
  const tool = getTool('timestamp-converter')!
  const now = useNow(1000)
  const { copy } = useCopy()
  const [raw, setRaw] = useState(() => String(Math.floor(Date.now() / 1000)))

  const parsed = parseInput(raw)

  const nowTime = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).format(now)
  const nowDate = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }).format(now)
  const utcTime = new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'UTC'
  }).format(now)
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const outputs = parsed
    ? [
        { label: 'Local time', value: formatLocal(parsed) },
        { label: 'UTC time', value: formatUtc(parsed) },
        { label: 'ISO 8601', value: parsed.toISOString() },
        { label: 'Unix seconds', value: String(Math.floor(parsed.getTime() / 1000)) },
        { label: 'Unix milliseconds', value: String(parsed.getTime()) },
        { label: 'Relative', value: formatRelativeTime(parsed, now) }
      ]
    : []

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button
          variant="secondary"
          icon={<Icon name="clock" size={14} />}
          onClick={() => setRaw(String(Math.floor(Date.now() / 1000)))}
        >
          Use current time
        </Button>
      }
    >
      <section className="clock-card">
        <div className="clock-main">
          <span className="clock-eyebrow">
            <span className="live-dot" /> Live · {timeZone}
          </span>
          <span className="clock-time">{nowTime}</span>
          <span className="clock-date">{nowDate}</span>
        </div>
        <div className="clock-side">
          <div className="clock-stat">
            <span>UTC</span>
            <code>{utcTime}</code>
          </div>
          <div className="clock-stat">
            <span>Unix</span>
            <code>{Math.floor(now.getTime() / 1000)}</code>
          </div>
        </div>
      </section>

      <div className="split">
        <Panel
          title="Timestamp or date"
          actions={
            <Button
              variant="ghost"
              size="sm"
              icon={<Icon name="refresh" size={13} />}
              onClick={() => setRaw(String(Math.floor(Date.now() / 1000)))}
            >
              Now
            </Button>
          }
        >
          <div className="stack-sm">
            <input
              className={`text-input mono${raw.trim() && !parsed ? ' is-invalid' : ''}`}
              value={raw}
              onChange={(event) => setRaw(event.target.value)}
              placeholder="1700000000 or 2026-11-02T10:00:00Z"
              aria-label="Timestamp or date"
              spellCheck={false}
            />
            <span className="field-hint">
              Unix seconds, milliseconds, ISO 8601, or any parseable date string.
            </span>
            {!raw.trim() && <span className="field-error">Enter a value to convert.</span>}
            {raw.trim() && !parsed && (
              <span className="field-error">
                That value could not be parsed as a date or timestamp.
              </span>
            )}
          </div>
        </Panel>

        <Panel
          title="Converted values"
          actions={
            parsed ? <CopyButton value={parsed.toISOString()} label="Copy ISO" /> : undefined
          }
        >
          {parsed ? (
            <div className="output-list">
              {outputs.map((item) => (
                <div className="output-row" key={item.label}>
                  <div className="output-info">
                    <span className="output-label">{item.label}</span>
                    <code className="output-value">{item.value}</code>
                  </div>
                  <IconButton
                    label={`Copy ${item.label}`}
                    onClick={() => {
                      void copy(item.value, `${item.label} copied`)
                    }}
                  >
                    <Icon name="copy" size={14} />
                  </IconButton>
                </div>
              ))}
            </div>
          ) : (
            <span className="panel-placeholder">Conversion appears here.</span>
          )}
        </Panel>
      </div>

      <p className="tool-footnote">
        Local values use the {timeZone} time zone. Unix values are absolute and time-zone
        independent. Values with 11 or more digits are treated as milliseconds.
      </p>
    </ToolPage>
  )
}
