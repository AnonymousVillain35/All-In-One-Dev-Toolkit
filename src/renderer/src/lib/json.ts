export interface JsonError {
  message: string
  line?: number
  column?: number
  position?: number
}

export type JsonTransformResult =
  | { ok: true; value: string }
  | { ok: false; error: JsonError }

interface FormatOptions {
  indent: number | string
  minify?: boolean
  sortKeys?: boolean
}

function sortKeysDeep(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sortKeysDeep)
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>
    const sorted: Record<string, unknown> = {}
    for (const key of Object.keys(record).sort((left, right) => left.localeCompare(right))) {
      sorted[key] = sortKeysDeep(record[key])
    }
    return sorted
  }
  return value
}

function describeJsonError(error: unknown, input: string): JsonError {
  const message = error instanceof Error ? error.message : 'Invalid JSON'
  const positionMatch = /position\s+(\d+)/i.exec(message)
  const lineColumnMatch = /line\s+(\d+)\s+column\s+(\d+)/i.exec(message)

  const position = positionMatch ? Number(positionMatch[1]) : undefined
  let line = lineColumnMatch ? Number(lineColumnMatch[1]) : undefined
  let column = lineColumnMatch ? Number(lineColumnMatch[2]) : undefined

  if (position !== undefined && (line === undefined || column === undefined)) {
    const preceding = input.slice(0, position)
    const lines = preceding.split('\n')
    line = lines.length
    column = lines[lines.length - 1].length + 1
  }

  return { message, line, column, position }
}

export function transformJson(input: string, options: FormatOptions): JsonTransformResult {
  try {
    const parsed: unknown = JSON.parse(input)
    const prepared = options.sortKeys ? sortKeysDeep(parsed) : parsed
    const value = options.minify
      ? JSON.stringify(prepared)
      : JSON.stringify(prepared, null, options.indent)

    if (value === undefined) {
      return { ok: false, error: { message: 'This value cannot be represented as JSON.' } }
    }

    return { ok: true, value }
  } catch (error) {
    return { ok: false, error: describeJsonError(error, input) }
  }
}

export function validateJson(input: string): { ok: true } | { ok: false; error: JsonError } {
  try {
    JSON.parse(input)
    return { ok: true }
  } catch (error) {
    return { ok: false, error: describeJsonError(error, input) }
  }
}
