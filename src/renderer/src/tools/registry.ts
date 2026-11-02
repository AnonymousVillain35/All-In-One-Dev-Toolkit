import type { IconName } from '../icons'

export const CATEGORIES = ['Data', 'Encoding', 'Security', 'Generators', 'Utilities'] as const

export type ToolCategory = (typeof CATEGORIES)[number]
export type ToolStatus = 'ready' | 'planned'

export interface ToolDef {
  id: string
  name: string
  description: string
  category: ToolCategory
  icon: IconName
  keywords: string[]
  status: ToolStatus
}

const TOOL_LIST: ToolDef[] = [
  {
    id: 'json-formatter',
    name: 'JSON Formatter',
    description: 'Format, validate, sort, and minify JSON with clear error locations.',
    category: 'Data',
    icon: 'braces',
    keywords: ['json', 'format', 'beautify', 'prettify', 'minify', 'validate', 'pretty'],
    status: 'ready'
  },
  {
    id: 'json-yaml',
    name: 'JSON ↔ YAML',
    description: 'Convert configuration between JSON and YAML.',
    category: 'Data',
    icon: 'layers',
    keywords: ['json', 'yaml', 'yml', 'convert', 'config'],
    status: 'planned'
  },
  {
    id: 'sql-formatter',
    name: 'SQL Formatter',
    description: 'Format SQL queries with configurable styles.',
    category: 'Data',
    icon: 'database',
    keywords: ['sql', 'query', 'format', 'database', 'postgres', 'mysql'],
    status: 'planned'
  },
  {
    id: 'diff-checker',
    name: 'Diff Checker',
    description: 'Compare two text blocks with line-level highlights.',
    category: 'Data',
    icon: 'diff',
    keywords: ['diff', 'compare', 'text', 'changes', 'merge'],
    status: 'planned'
  },
  {
    id: 'base64',
    name: 'Base64 Encoder / Decoder',
    description: 'Encode and decode Base64 with UTF-8 and URL-safe support.',
    category: 'Encoding',
    icon: 'file-code',
    keywords: ['base64', 'encode', 'decode', 'b64', 'url safe'],
    status: 'ready'
  },
  {
    id: 'url-encoder',
    name: 'URL Encoder / Decoder',
    description: 'Encode or decode URLs and query components instantly.',
    category: 'Encoding',
    icon: 'link',
    keywords: ['url', 'uri', 'encode', 'decode', 'percent', 'query'],
    status: 'ready'
  },
  {
    id: 'html-entities',
    name: 'HTML Entities',
    description: 'Encode and decode HTML entities.',
    category: 'Encoding',
    icon: 'code',
    keywords: ['html', 'entities', 'escape', 'unescape', 'encode', 'decode'],
    status: 'planned'
  },
  {
    id: 'jwt-decoder',
    name: 'JWT Decoder',
    description: 'Inspect JWT headers and claims locally — nothing leaves your machine.',
    category: 'Security',
    icon: 'key',
    keywords: ['jwt', 'token', 'jose', 'claims', 'auth', 'decode'],
    status: 'ready'
  },
  {
    id: 'hash-generator',
    name: 'Hash Generator',
    description: 'Generate SHA-1, SHA-256, SHA-384, and SHA-512 digests.',
    category: 'Security',
    icon: 'hash',
    keywords: ['hash', 'sha', 'digest', 'checksum', 'sha256', 'sha512'],
    status: 'ready'
  },
  {
    id: 'regex-tester',
    name: 'Regex Tester',
    description: 'Test patterns against sample text with match groups.',
    category: 'Security',
    icon: 'regex',
    keywords: ['regex', 'regexp', 'pattern', 'match', 'test'],
    status: 'planned'
  },
  {
    id: 'uuid-generator',
    name: 'UUID Generator',
    description: 'Create cryptographically random v4 UUIDs in bulk.',
    category: 'Generators',
    icon: 'fingerprint',
    keywords: ['uuid', 'guid', 'random', 'identifier', 'v4'],
    status: 'ready'
  },
  {
    id: 'qr-generator',
    name: 'QR Code Generator',
    description: 'Turn text or links into downloadable QR codes.',
    category: 'Generators',
    icon: 'qr',
    keywords: ['qr', 'code', 'barcode', 'link', 'generate'],
    status: 'planned'
  },
  {
    id: 'timestamp-converter',
    name: 'Timestamp Converter',
    description: 'Convert Unix timestamps and human dates in both directions.',
    category: 'Utilities',
    icon: 'clock',
    keywords: ['timestamp', 'unix', 'epoch', 'date', 'time', 'iso'],
    status: 'ready'
  },
  {
    id: 'cron-parser',
    name: 'Cron Parser',
    description: 'Explain cron expressions in plain English.',
    category: 'Utilities',
    icon: 'calendar-clock',
    keywords: ['cron', 'schedule', 'crontab', 'expression'],
    status: 'planned'
  },
  {
    id: 'color-converter',
    name: 'Color Converter',
    description: 'Convert HEX, RGB, HSL, and OKLCH values.',
    category: 'Utilities',
    icon: 'palette',
    keywords: ['color', 'colour', 'hex', 'rgb', 'hsl', 'convert'],
    status: 'planned'
  }
]

export const TOOLS: readonly ToolDef[] = TOOL_LIST
export const READY_TOOLS: readonly ToolDef[] = TOOL_LIST.filter((tool) => tool.status === 'ready')
export const PLANNED_TOOLS: readonly ToolDef[] = TOOL_LIST.filter(
  (tool) => tool.status === 'planned'
)

export function getTool(id: string): ToolDef | undefined {
  return TOOL_LIST.find((tool) => tool.id === id)
}

export function toolsInCategory(category: ToolCategory): readonly ToolDef[] {
  return TOOL_LIST.filter((tool) => tool.category === category)
}
