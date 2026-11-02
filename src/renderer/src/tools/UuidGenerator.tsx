import { useMemo, useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button, IconButton } from '../components/ui/Button'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout, Panel } from '../components/ui/Panel'
import { Toggle } from '../components/ui/Toggle'
import { useCopy } from '../hooks/useCopy'
import { useToast } from '../components/ui/Toast'
import { getTool } from './registry'

function randomUuid(): string {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()

  const bytes = crypto.getRandomValues(new Uint8Array(16))
  bytes[6] = (bytes[6] & 0x0f) | 0x40
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(
    16,
    20
  )}-${hex.slice(20)}`
}

function createUuids(count: number): string[] {
  return Array.from({ length: count }, randomUuid)
}

export default function UuidGenerator(): ReactElement {
  const tool = getTool('uuid-generator')!
  const { show } = useToast()
  const { copy } = useCopy()
  const [uuids, setUuids] = useState<string[]>(() => createUuids(5))
  const [count, setCount] = useState('5')
  const [uppercase, setUppercase] = useState(false)
  const [hyphens, setHyphens] = useState(true)

  const displayed = useMemo(
    () =>
      uuids.map((uuid) => {
        const cased = uppercase ? uuid.toUpperCase() : uuid
        return hyphens ? cased : cased.replace(/-/g, '')
      }),
    [uuids, uppercase, hyphens]
  )

  const allText = displayed.join('\n')

  const generate = (): void => {
    const parsed = Number.parseInt(count, 10)
    const safeCount = Number.isFinite(parsed) ? Math.min(100, Math.max(1, parsed)) : 5
    setCount(String(safeCount))
    setUuids(createUuids(safeCount))
    show(`Generated ${safeCount} UUID${safeCount === 1 ? '' : 's'}`, 'success')
  }

  return (
    <ToolPage tool={tool}>
      <div className="toolbar">
        <div className="toolbar-group">
          <label className="toolbar-label" htmlFor="uuid-count">
            Count
          </label>
          <input
            id="uuid-count"
            className="text-input number-input"
            type="number"
            min={1}
            max={100}
            value={count}
            onChange={(event) => setCount(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') generate()
            }}
          />
        </div>
        <Toggle checked={uppercase} onChange={setUppercase} label="Uppercase" />
        <Toggle checked={hyphens} onChange={setHyphens} label="Hyphens" />
        <div className="toolbar-group is-push">
          <span className="toolbar-hint">1–100 per batch</span>
          <Button variant="primary" icon={<Icon name="refresh" size={14} />} onClick={generate}>
            Generate
          </Button>
        </div>
      </div>

      <Panel
        title={`${displayed.length} UUID${displayed.length === 1 ? '' : 's'}`}
        actions={<CopyButton value={allText} label="Copy all" />}
        footer="Version 4 · 122 bits of cryptographic randomness · RFC 4122"
      >
        <div className="uuid-list">
          {displayed.map((uuid, index) => (
            <div className="uuid-row" key={`${uuids[index]}-${index}`}>
              <span className="uuid-index">{String(index + 1).padStart(2, '0')}</span>
              <code className="uuid-value">{uuid}</code>
              <IconButton
                label={`Copy UUID ${index + 1}`}
                onClick={() => {
                  void copy(uuid, 'UUID copied')
                }}
              >
                <Icon name="copy" size={14} />
              </IconButton>
            </div>
          ))}
        </div>
      </Panel>

      <Callout tone="info" title="Cryptographically random">
        Version 4 UUIDs are generated with the system CSPRNG. Collisions are practically
        impossible, so they are safe for identifiers, test data, and correlation IDs.
      </Callout>
    </ToolPage>
  )
}
