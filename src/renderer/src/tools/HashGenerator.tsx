import { useEffect, useState, type ReactElement } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button } from '../components/ui/Button'
import { CodeArea } from '../components/ui/CodeArea'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout, Panel } from '../components/ui/Panel'
import { Segmented } from '../components/ui/Segmented'
import { formatBytes } from '../lib/format'
import { textByteLength } from '../lib/base64'
import { getTool } from './registry'

const ALGORITHMS = [
  { value: 'SHA-1', label: 'SHA-1', bits: 160 },
  { value: 'SHA-256', label: 'SHA-256', bits: 256 },
  { value: 'SHA-384', label: 'SHA-384', bits: 384 },
  { value: 'SHA-512', label: 'SHA-512', bits: 512 }
] as const

type Algorithm = (typeof ALGORITHMS)[number]['value']

export default function HashGenerator(): ReactElement {
  const tool = getTool('hash-generator')!
  const [algorithm, setAlgorithm] = useState<Algorithm>('SHA-256')
  const [text, setText] = useState('')
  const [digest, setDigest] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!text) {
      setDigest('')
      setError('')
      return
    }

    let active = true

    const hash = async (): Promise<void> => {
      try {
        if (!globalThis.crypto?.subtle) {
          throw new Error('Web Crypto is not available in this environment.')
        }
        const buffer = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text))
        if (!active) return
        const hex = Array.from(new Uint8Array(buffer), (byte) =>
          byte.toString(16).padStart(2, '0')
        ).join('')
        setDigest(hex)
        setError('')
      } catch (reason) {
        if (!active) return
        setDigest('')
        setError(reason instanceof Error ? reason.message : 'Hashing failed.')
      }
    }

    void hash()

    return () => {
      active = false
    }
  }, [algorithm, text])

  const algorithmInfo = ALGORITHMS.find((item) => item.value === algorithm) ?? ALGORITHMS[1]

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button
          variant="secondary"
          icon={<Icon name="trash" size={14} />}
          onClick={() => setText('')}
          disabled={!text}
        >
          Clear
        </Button>
      }
    >
      <div className="toolbar">
        <span className="toolbar-label">Algorithm</span>
        <Segmented
          options={ALGORITHMS}
          value={algorithm}
          onChange={setAlgorithm}
          ariaLabel="Hash algorithm"
        />
        <div className="toolbar-group is-push">
          <span className="inline-note">
            <Icon name="shield" size={12} /> Computed locally
          </span>
        </div>
      </div>

      <div className="split">
        <CodeArea
          label="Text"
          ariaLabel="Text to hash"
          value={text}
          onChange={setText}
          placeholder="Type or paste text to generate a digest…"
          minHeight={340}
          wrap
          footerExtra={text ? <span>{formatBytes(textByteLength(text))}</span> : undefined}
        />

        <div className="stack">
          <Panel
            title={`${algorithm} digest`}
            actions={<CopyButton value={digest} />}
            footer={`${algorithmInfo.bits} bits · ${digest.length} hex characters`}
          >
            {digest ? (
              <code className="hash-value">{digest}</code>
            ) : (
              <span className="panel-placeholder">Start typing to generate a digest.</span>
            )}
          </Panel>

          {error && (
            <Callout tone="error" title="Hashing failed">
              {error}
            </Callout>
          )}

          <Callout tone="info" title="One-way by design">
            Hash digests cannot be reversed. Changing a single character produces a completely
            different result, which is what makes hashes useful for integrity checks.
          </Callout>
        </div>
      </div>
    </ToolPage>
  )
}
