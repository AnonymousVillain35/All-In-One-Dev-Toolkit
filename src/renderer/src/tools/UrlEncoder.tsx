import { useMemo, useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button } from '../components/ui/Button'
import { CodeArea } from '../components/ui/CodeArea'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout } from '../components/ui/Panel'
import { Segmented } from '../components/ui/Segmented'
import { getTool } from './registry'

type Mode = 'encode' | 'decode'
type Scope = 'component' | 'url'

const MODES: ReadonlyArray<{ value: Mode; label: string }> = [
  { value: 'encode', label: 'Encode' },
  { value: 'decode', label: 'Decode' }
]

const SCOPES: ReadonlyArray<{ value: Scope; label: string }> = [
  { value: 'component', label: 'Query component' },
  { value: 'url', label: 'Full URL' }
]

function convert(value: string, mode: Mode, scope: Scope): string {
  if (!value) return ''
  if (mode === 'encode') return scope === 'component' ? encodeURIComponent(value) : encodeURI(value)
  return scope === 'component' ? decodeURIComponent(value) : decodeURI(value)
}

export default function UrlEncoder(): ReactElement {
  const tool = getTool('url-encoder')!
  const [mode, setMode] = useState<Mode>('encode')
  const [scope, setScope] = useState<Scope>('component')
  const [input, setInput] = useState('')

  const result = useMemo(() => {
    try {
      return { output: convert(input, mode, scope), error: '' }
    } catch {
      return {
        output: '',
        error: 'Malformed percent-encoding — check for incomplete sequences like a lone “%”.'
      }
    }
  }, [input, mode, scope])

  const swap = (): void => {
    if (!result.output) return
    setInput(result.output)
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button
          variant="secondary"
          icon={<Icon name="sparkles" size={15} />}
          onClick={() => {
            setMode('encode')
            setScope('component')
            setInput('hello world & friends / 100% ready')
          }}
        >
          Load example
        </Button>
      }
    >
      <div className="toolbar">
        <Segmented options={MODES} value={mode} onChange={setMode} ariaLabel="Conversion mode" />
        <Segmented options={SCOPES} value={scope} onChange={setScope} ariaLabel="Encoding scope" />
        <div className="toolbar-group is-push">
          <Button
            variant="ghost"
            size="sm"
            icon={<Icon name="swap" size={14} />}
            onClick={swap}
            disabled={!result.output}
          >
            Use output as input
          </Button>
        </div>
      </div>

      <div className="split">
        <CodeArea
          label={mode === 'encode' ? 'Raw input' : 'Encoded input'}
          ariaLabel="URL input"
          value={input}
          onChange={setInput}
          placeholder={
            mode === 'encode'
              ? 'Type a URL or query value to encode…'
              : 'Paste percent-encoded text to decode…'
          }
          minHeight={320}
          wrap
          invalid={Boolean(result.error)}
          actions={
            <Button
              variant="ghost"
              size="sm"
              icon={<Icon name="trash" size={13} />}
              onClick={() => setInput('')}
              disabled={!input}
            >
              Clear
            </Button>
          }
        />

        <CodeArea
          label={mode === 'encode' ? 'Encoded output' : 'Decoded output'}
          ariaLabel="URL output"
          value={result.output}
          readOnly
          wrap
          minHeight={320}
          invalid={Boolean(result.error)}
          placeholder="Converted value appears here."
          actions={<CopyButton value={result.output} />}
        />
      </div>

      {result.error && (
        <Callout tone="error" title="Conversion failed">
          {result.error}
        </Callout>
      )}

      <Callout tone="info" title={scope === 'component' ? 'Query component mode' : 'Full URL mode'}>
        {scope === 'component'
          ? 'Encodes reserved characters too, which is right for query values and path segments. Spaces become %20.'
          : 'Keeps URL structure such as :// ? & = intact, pairing well with whole links. Spaces become %20.'}{' '}
        Form-body encoding, where spaces become <code>+</code>, is planned for a later pass.
      </Callout>
    </ToolPage>
  )
}
