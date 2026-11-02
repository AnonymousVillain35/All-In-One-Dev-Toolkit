import { useCallback } from 'react'
import { useToast } from '../components/ui/Toast'

function legacyCopy(text: string): boolean {
  const field = document.createElement('textarea')
  field.value = text
  field.setAttribute('readonly', '')
  field.style.position = 'fixed'
  field.style.opacity = '0'
  document.body.appendChild(field)
  field.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(field)
  return copied
}

export function useCopy(): { copy: (text: string, message?: string) => Promise<boolean> } {
  const { show } = useToast()

  const copy = useCallback(
    async (text: string, message = 'Copied to clipboard'): Promise<boolean> => {
      try {
        if (window.devkit?.clipboard) {
          const copied = await window.devkit.clipboard.writeText(text)
          if (!copied) throw new Error('Clipboard write failed')
        } else if (navigator.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else if (!legacyCopy(text)) {
          throw new Error('Clipboard unavailable')
        }
        show(message, 'success')
        return true
      } catch {
        show('Unable to copy to clipboard', 'error')
        return false
      }
    },
    [show]
  )

  return { copy }
}
