import type { ReactElement, ReactNode } from 'react'

interface CodeAreaProps {
  label?: ReactNode
  value: string
  onChange?: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  actions?: ReactNode
  minHeight?: number
  invalid?: boolean
  wrap?: boolean
  ariaLabel: string
  footerExtra?: ReactNode
}

export function CodeArea({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  actions,
  minHeight = 240,
  invalid = false,
  wrap = false,
  ariaLabel,
  footerExtra
}: CodeAreaProps): ReactElement {
  const lineCount = value ? value.split('\n').length : 0

  return (
    <div className={`code-field${invalid ? ' is-invalid' : ''}${readOnly ? ' is-readonly' : ''}`}>
      <div className="code-field-head">
        <span className="code-label">{label}</span>
        {actions && <div className="code-actions">{actions}</div>}
      </div>
      <textarea
        className={`code-textarea${wrap ? ' wrap' : ''}`}
        value={value}
        onChange={onChange ? (event) => onChange(event.target.value) : undefined}
        readOnly={readOnly}
        placeholder={placeholder}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        wrap={wrap ? 'soft' : 'off'}
        aria-label={ariaLabel}
        style={{ minHeight }}
      />
      <div className="code-foot">
        <span>
          {value.length.toLocaleString()} chars · {lineCount.toLocaleString()} lines
        </span>
        {footerExtra}
      </div>
    </div>
  )
}
