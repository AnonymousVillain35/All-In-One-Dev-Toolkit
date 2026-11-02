import { useMemo, useState, type ReactElement, type ReactNode } from 'react'
import { Icon } from '../icons'
import { ToolPage } from '../components/ToolPage'
import { Button } from '../components/ui/Button'
import { CodeArea } from '../components/ui/CodeArea'
import { CopyButton } from '../components/ui/CopyButton'
import { Callout, Panel } from '../components/ui/Panel'
import { useNow } from '../hooks/useNow'
import { encodeBase64Url } from '../lib/base64'
import { formatLocal, formatRelativeTime } from '../lib/format'
import { decodeJwt, jwtClaimDate } from '../lib/jwt'
import { getTool } from './registry'

function makeSampleToken(): string {
  const header = encodeBase64Url(
    JSON.stringify({ alg: 'HS256', typ: 'JWT', kid: 'dev-toolkit-demo' })
  )
  const payload = encodeBase64Url(
    JSON.stringify({
      iss: 'https://devtoolkit.local',
      sub: 'user_1042',
      name: 'Ada Lovelace',
      role: 'admin',
      iat: 1767225600,
      exp: 2051222400
    })
  )
  return `${header}.${payload}.${encodeBase64Url('demo-signature-not-verified')}`
}

function renderClaimValue(key: string, value: unknown): ReactNode {
  if ((key === 'exp' || key === 'iat' || key === 'nbf') && typeof value === 'number') {
    return (
      <>
        {formatLocal(new Date(value * 1000))}
        <span className="claim-raw"> ({value})</span>
      </>
    )
  }
  if (typeof value === 'string') return value
  return JSON.stringify(value)
}

function metaDate(payload: Record<string, unknown>, key: string): { value: string; sub: string } {
  const date = jwtClaimDate(payload, key)
  if (!date) return { value: '—', sub: `No ${key} claim` }
  return { value: formatLocal(date), sub: String(payload[key]) }
}

export default function JwtDecoder(): ReactElement {
  const tool = getTool('jwt-decoder')!
  const [token, setToken] = useState('')
  const now = useNow(30_000)

  const decoded = useMemo(() => {
    if (!token.trim()) return { kind: 'empty' as const }
    const result = decodeJwt(token)
    return result.ok
      ? { kind: 'ok' as const, token: result.token }
      : { kind: 'error' as const, message: result.error }
  }, [token])

  const status = useMemo(() => {
    if (decoded.kind !== 'ok') return null
    const payload = decoded.token.payload
    const expiration = jwtClaimDate(payload, 'exp')
    const notBefore = jwtClaimDate(payload, 'nbf')

    if (notBefore && notBefore.getTime() > now.getTime()) {
      return {
        tone: 'warning',
        label: 'Not yet valid',
        detail: `Starts ${formatRelativeTime(notBefore, now)}`
      }
    }
    if (expiration) {
      if (expiration.getTime() <= now.getTime()) {
        return {
          tone: 'danger',
          label: 'Expired',
          detail: `Expired ${formatRelativeTime(expiration, now)}`
        }
      }
      return {
        tone: 'success',
        label: 'Active',
        detail: `Expires ${formatRelativeTime(expiration, now)}`
      }
    }
    return { tone: 'neutral', label: 'No expiry', detail: 'Token has no exp claim' }
  }, [decoded, now])

  const loadSample = (): void => setToken(makeSampleToken())

  return (
    <ToolPage
      tool={tool}
      actions={
        <Button variant="secondary" icon={<Icon name="sparkles" size={15} />} onClick={loadSample}>
          Load example
        </Button>
      }
    >
      <CodeArea
        label="JWT token"
        ariaLabel="JWT token"
        value={token}
        onChange={setToken}
        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0In0.signature"
        minHeight={150}
        wrap
        invalid={decoded.kind === 'error'}
        actions={
          <>
            <CopyButton value={token} label="Copy token" />
            <Button
              variant="ghost"
              size="sm"
              icon={<Icon name="trash" size={13} />}
              onClick={() => setToken('')}
              disabled={!token}
            >
              Clear
            </Button>
          </>
        }
        footerExtra={
          <span className="inline-note">
            <Icon name="lock" size={11} /> Decoded locally
          </span>
        }
      />

      {decoded.kind === 'error' && (
        <Callout tone="error" title="Could not decode token">
          {decoded.message}
        </Callout>
      )}

      {decoded.kind === 'ok' && status && (
        <>
          <div className="meta-grid">
            <div className="meta-card">
              <span className="meta-label">Status</span>
              <span className={`status-value status-${status.tone}`}>{status.label}</span>
              <span className="meta-sub">{status.detail}</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Algorithm</span>
              <span className="meta-value mono">{String(decoded.token.header.alg ?? '—')}</span>
              <span className="meta-sub">Type: {String(decoded.token.header.typ ?? '—')}</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Issued at</span>
              <span className="meta-value meta-value-sm">
                {metaDate(decoded.token.payload, 'iat').value}
              </span>
              <span className="meta-sub">{metaDate(decoded.token.payload, 'iat').sub}</span>
            </div>
            <div className="meta-card">
              <span className="meta-label">Expires</span>
              <span className="meta-value meta-value-sm">
                {metaDate(decoded.token.payload, 'exp').value}
              </span>
              <span className="meta-sub">{metaDate(decoded.token.payload, 'exp').sub}</span>
            </div>
          </div>

          <div className="split">
            <CodeArea
              label="Header"
              ariaLabel="Decoded JWT header"
              value={JSON.stringify(decoded.token.header, null, 2)}
              readOnly
              wrap
              minHeight={210}
              actions={<CopyButton value={JSON.stringify(decoded.token.header, null, 2)} />}
            />
            <CodeArea
              label="Payload"
              ariaLabel="Decoded JWT payload"
              value={JSON.stringify(decoded.token.payload, null, 2)}
              readOnly
              wrap
              minHeight={210}
              actions={<CopyButton value={JSON.stringify(decoded.token.payload, null, 2)} />}
            />
          </div>

          <div className="split">
            <Panel title="Claims">
              <div className="claims">
                {Object.entries(decoded.token.payload).map(([key, value]) => (
                  <div className="claim-row" key={key}>
                    <span className="claim-key">{key}</span>
                    <span className="claim-value">{renderClaimValue(key, value)}</span>
                  </div>
                ))}
              </div>
            </Panel>

            <div className="stack">
              <Panel
                title="Signature"
                actions={<CopyButton value={decoded.token.signature} label="Copy signature" />}
                footer="Base64URL signature segment — decoding does not verify it."
              >
                <code className="signature-value">
                  {decoded.token.signature || 'No signature segment'}
                </code>
              </Panel>

              <Callout tone="warning" title="Signature not verified">
                Decoding only reveals the token contents. Verifying authenticity requires the
                signing secret or public key, which is planned as a follow-up feature.
              </Callout>
            </div>
          </div>
        </>
      )}

      {decoded.kind === 'empty' && (
        <Callout tone="info" title="Nothing leaves this app">
          Paste a JWT above to inspect its header and claims. Decoding happens entirely on your
          machine — no token is sent anywhere.
        </Callout>
      )}
    </ToolPage>
  )
}
