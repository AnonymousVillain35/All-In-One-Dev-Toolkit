import { useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button } from '../components/ui/Button'
import { CodeArea } from '../components/ui/CodeArea'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout } from '../components/ui/Panel'
import { Segmented } from '../components/ui/Segmented'
import { Toggle } from '../components/ui/Toggle'
import { useToast } from '../components/ui/Toast'
import { transformJson, validateJson, type JsonError } from '../lib/json'
import { getTool } from './registry'

const SAMPLE = `{
  "project": "all-in-one-dev-toolkit",
  "version": "0.1.0",
  "features": ["json", "base64", "jwt", "uuid"],
  "offline": true,
  "platform": { "name": "Windows", "arch": "x64" },
  "maintainer": { "name": "Dev Toolkit", "tools": 7 }
}`

type IndentOption = '2' | '4' | 'tab'

const INDENT_OPTIONS: ReadonlyArray<{ value: IndentOption; label: string }> = [
  { value: '2', label: '2 spaces' },
  { value: '4', label: '4 spaces' },
  { value: 'tab', label: 'Tab' }
]

export default function JsonFormatter(): ReactElement {
  const tool = getTool('json-formatter')!
  const { show } = useToast()
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [indent, setIndent] = useState<IndentOption>('2')
  const [sortKeys, setSortKeys] = useState(false)
  const [error, setError] = useState<JsonError | null>(null)

  const loadSample = (): void => {
    setInput(SAMPLE)
    setOutput('')
    setError(null)
  }

  const run = (mode: 'format' | 'minify'): void => {
    if (!input.trim()) {
      show('Paste some JSON first', 'error')
      return
    }

    const result = transformJson(input, {
      indent: indent === 'tab' ? '\t' : Number(indent),
      sortKeys,
      minify: mode === 'minify'
    })

    if (!result.ok) {
      setError(result.error)
      setOutput('')
      show('Invalid JSON — check the error details', 'error')
      return
    }

    setError(null)
    setOutput(result.value)
    show(mode === 'minify' ? 'JSON minified' : 'JSON formatted', 'success')
  }

  const check = (): void => {
    if (!input.trim()) {
      show('Paste some JSON first', 'error')
      return
    }

    const result = validateJson(input)
    if (!result.ok) {
      setError(result.error)
      show('Invalid JSON — check the error details', 'error')
      return
    }

    setError(null)
    show('Valid JSON', 'success')
  }

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button variant="secondary" icon={<Icon name="sparkles" size={15} />} onClick={loadSample}>
          Load example
        </Button>
      }
    >
      <div className="toolbar">
        <div className="toolbar-group">
          <span className="toolbar-label">Indent</span>
          <Segmented
            options={INDENT_OPTIONS}
            value={indent}
            onChange={setIndent}
            ariaLabel="Indentation"
          />
        </div>
        <Toggle checked={sortKeys} onChange={setSortKeys} label="Sort keys" />
        <div className="toolbar-group is-push">
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="check" size={14} />}
            onClick={check}
            disabled={!input.trim()}
          >
            Validate
          </Button>
          <Button
            variant="secondary"
            size="sm"
            icon={<Icon name="play" size={13} />}
            onClick={() => run('minify')}
            disabled={!input.trim()}
          >
            Minify
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<Icon name="braces" size={14} />}
            onClick={() => run('format')}
            disabled={!input.trim()}
          >
            Format JSON
          </Button>
        </div>
      </div>

      <div className="split">
        <CodeArea
          label="Input"
          ariaLabel="JSON input"
          value={input}
          onChange={(value) => {
            setInput(value)
            setOutput('')
            if (error) setError(null)
          }}
          placeholder='Paste JSON here, e.g. {"hello": "world"}'
          minHeight={420}
          invalid={Boolean(error)}
          actions={
            <Button
              variant="ghost"
              size="sm"
              icon={<Icon name="trash" size={13} />}
              onClick={() => {
                setInput('')
                setOutput('')
                setError(null)
              }}
              disabled={!input && !output}
            >
              Clear
            </Button>
          }
        />

        <div className="stack">
          {error && (
            <Callout tone="error" title="Invalid JSON">
              <span>{error.message}</span>
              {error.line !== undefined && (
                <div className="callout-meta">
                  Line {error.line}
                  {error.column !== undefined ? `, column ${error.column}` : ''}
                </div>
              )}
            </Callout>
          )}
          {!error && output && (
            <Callout tone="success" title="Valid JSON">
              {sortKeys ? 'Keys were sorted before formatting.' : 'Parsed successfully and formatted.'}
            </Callout>
          )}
          <CodeArea
            label="Output"
            ariaLabel="Formatted JSON output"
            value={output}
            readOnly
            wrap
            minHeight={420}
            placeholder="Formatted JSON will appear here."
            actions={<CopyButton value={output} />}
            footerExtra={
              output ? (
                <span>
                  {sortKeys ? 'Sorted · ' : ''}
                  {indent === 'tab' ? 'Tabs' : `${indent} spaces`}
                </span>
              ) : undefined
            }
          />
        </div>
      </div>
    </ToolPage>
  )
}
