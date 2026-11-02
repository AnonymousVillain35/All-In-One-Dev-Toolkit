const textEncoder = new TextEncoder()
const strictDecoder = new TextDecoder('utf-8', { fatal: true })

function bytesToBinary(bytes: Uint8Array): string {
  let binary = ''
  const chunkSize = 0x8000
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize))
  }
  return binary
}

function binaryToBytes(binary: string): Uint8Array {
  const bytes = new Uint8Array(binary.length)
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }
  return bytes
}

export function toBase64Url(base64: string): string {
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function fromBase64Url(value: string): string {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const remainder = normalized.length % 4
  return remainder === 0 ? normalized : normalized + '='.repeat(4 - remainder)
}

export function encodeBase64(text: string, urlSafe = false): string {
  const base64 = btoa(bytesToBinary(textEncoder.encode(text)))
  return urlSafe ? toBase64Url(base64) : base64
}

export function decodeBase64(text: string): string {
  const compact = text.replace(/\s+/g, '')
  if (!compact) return ''
  if (!/^[A-Za-z0-9+/_-]+={0,2}$/.test(compact)) {
    throw new Error('Input contains characters that are not valid Base64.')
  }

  const unpadded = compact.replace(/=+$/, '')
  if (unpadded.length % 4 === 1) {
    throw new Error('Base64 length is invalid. Check for missing characters.')
  }

  let binary: string
  try {
    binary = atob(fromBase64Url(compact))
  } catch {
    throw new Error('Could not decode Base64. Check for invalid or missing characters.')
  }

  try {
    return strictDecoder.decode(binaryToBytes(binary))
  } catch {
    throw new Error('Decoded bytes are not valid UTF-8 text.')
  }
}

export function bytesToBase64Url(bytes: Uint8Array): string {
  return toBase64Url(btoa(bytesToBinary(bytes)))
}

export function base64UrlToBytes(segment: string): Uint8Array {
  return binaryToBytes(atob(fromBase64Url(segment)))
}

export function encodeBase64Url(text: string): string {
  return bytesToBase64Url(textEncoder.encode(text))
}

export function textByteLength(text: string): number {
  return textEncoder.encode(text).length
}
