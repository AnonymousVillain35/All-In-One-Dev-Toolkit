import { base64UrlToBytes } from './base64'

export interface DecodedJwt {
  header: Record<string, unknown>
  payload: Record<string, unknown>
  signature: string
  headerSegment: string
  payloadSegment: string
}

export type JwtResult = { ok: true; token: DecodedJwt } | { ok: false; error: string }

function decodeJsonSegment(segment: string, name: string): Record<string, unknown> {
  if (!segment) throw new Error(`The ${name} segment is empty.`)

  let text: string
  try {
    text = new TextDecoder('utf-8', { fatal: true }).decode(base64UrlToBytes(segment))
  } catch {
    throw new Error(`The ${name} segment is not valid Base64URL.`)
  }

  let parsed: unknown
  try {
    parsed = JSON.parse(text)
  } catch {
    throw new Error(`The ${name} segment does not contain valid JSON.`)
  }

  if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`The ${name} segment must be a JSON object.`)
  }

  return parsed as Record<string, unknown>
}

export function decodeJwt(raw: string): JwtResult {
  const token = raw.trim()
  if (!token) return { ok: false, error: 'Paste a JWT to inspect it.' }

  const segments = token.split('.')
  if (segments.length !== 3) {
    return {
      ok: false,
      error: 'A JWT needs exactly three dot-separated segments: header.payload.signature.'
    }
  }

  try {
    const header = decodeJsonSegment(segments[0], 'header')
    const payload = decodeJsonSegment(segments[1], 'payload')
    return {
      ok: true,
      token: {
        header,
        payload,
        signature: segments[2],
        headerSegment: segments[0],
        payloadSegment: segments[1]
      }
    }
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unable to decode the token.'
    }
  }
}

export function jwtClaimDate(payload: Record<string, unknown>, key: string): Date | null {
  const value = payload[key]
  if (typeof value !== 'number' || !Number.isFinite(value)) return null
  return new Date(value * 1000)
}
