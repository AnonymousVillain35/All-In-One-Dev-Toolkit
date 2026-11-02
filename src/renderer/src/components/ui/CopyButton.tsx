import { useEffect, useState, type ReactElement } from 'react'
import { Icon } from '../../icons'
import { useCopy } from '../../hooks/useCopy'
import { Button } from './Button'

interface CopyButtonProps {
  value: string
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md'
}

export function CopyButton({
  value,
  label = 'Copy',
  disabled = false,
  size = 'sm'
}: CopyButtonProps): ReactElement {
  const { copy } = useCopy()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = window.setTimeout(() => setCopied(false), 1600)
    return () => window.clearTimeout(timer)
  }, [copied])

  return (
    <Button
      size={size}
      variant="secondary"
      disabled={disabled || !value}
      icon={<Icon name={copied ? 'check' : 'copy'} size={14} />}
      onClick={async () => {
        const success = await copy(value)
        if (success) setCopied(true)
      }}
    >
      {copied ? 'Copied' : label}
    </Button>
  )
}
