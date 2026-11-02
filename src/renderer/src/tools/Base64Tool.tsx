import { useMemo, useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button } from '../components/ui/Button'
import { CodeArea } from '../components/ui/CodeArea'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout } from '../components/ui/Panel'
import { Segmented } from '../components/ui/Segmented'
import { Toggle } from '../components/ui/Toggle'
import { decodeBase64, encodeBase64, textByteLength } from '../lib/base64'
import { formatBytes } from '../lib/format'
import { getTool } from './registry'

type Mode = 'encode' | 'decode'

const MODES: ReadonlyArray<{ value: Mode; label: string }> = [
  { value: 'encode', label: 'Encode' },
  { value: 'decode', label: 'Decode' }
]

const SAMPLE = 'Hello, developer! 👋  Everything stays on this machine.'

export default function Base64Tool(): ReactElement {
  const tool = getTool('base64')!
  const [mode, setMode] = useState<Mode>('encode')
  const [urlSafe, setUrlSafe] = useState(false)
  const [input, setInput] = useState('')

  const result = useMemo(() => {
    if (!input) return { output: '', error: '' }
    try {
      const output =
        mode === 'encode' ? encodeBase64(input, urlSafe) : decodeBase64(input)
      return { output, error: '' }
    } catch (error) {
      return {
        output: '',
        error: error instanceof Error ? error.message : 'Unable to convert the input.'
      }
    }
  }, [input, mode, urlSafe])

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
            setInput(SAMPLE)
          }}
        >
          Load example
        </Button>
      }
    >
      <div className="toolbar">
        <Segmented options={MODES} value={mode} onChange={setMode} ariaLabel="Conversion mode" />
        <Toggle
          checked={urlSafe}
          onChange={setUrlSafe}
          label="URL-safe alphabet"
          disabled={mode === 'decode'}
        />
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
          label={mode === 'encode' ? 'Plain text' : 'Base64 input'}
          ariaLabel={mode === 'encode' ? 'Text to encode' : 'Base64 to decode'}
          value={input}
          onChange={setInput}
          placeholder={
            mode === 'encode'
              ? 'Type or paste text to encode as Base64…'
              : 'Paste Base64 to decode, e.g. aGVsbG8='
          }
          minHeight={340}
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
          footerExtra={input ? <span>{formatBytes(textByteLength(input))} input</span> : undefined}
        />

        <CodeArea
          label={mode === 'encode' ? 'Base64 output' : 'Decoded text'}
          ariaLabel="Conversion output"
          value={result.output}
          readOnly
          wrap
          minHeight={340}
          invalid={Boolean(result.error)}
          placeholder={mode === 'encode' ? 'Base64 output appears here.' : 'Decoded text appears here.'}
          actions={<CopyButton value={result.output} />}
        />
      </div>

      {result.error && (
        <Callout tone="error" title="Conversion failed">
          {result.error}
        </Callout>
      )}

      <Callout tone="info" title="Encoding, not encryption">
        Base64 is a transport encoding — anyone can decode it. UTF-8 text is handled correctly,
        including emoji, and the URL-safe alphabet swaps <code>+</code> and <code>/</code> for{' '}
        <code>-</code> and <code>_</code>.
      </Callout>
    </ToolPage>
  )
}
