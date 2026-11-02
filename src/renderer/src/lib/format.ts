export function formatLocal(date: Date): string {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'medium'
  }).format(date)
}

export function formatUtc(date: Date): string {
  const formatted = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'medium',
    timeZone: 'UTC'
  }).format(date)
  return `${formatted} UTC`
}

export function formatRelativeTime(target: Date, now = new Date()): string {
  const seconds = (target.getTime() - now.getTime()) / 1000
  if (Math.abs(seconds) < 5) return 'just now'

  const relative = new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' })
  if (Math.abs(seconds) < 60) return relative.format(Math.round(seconds), 'second')

  const minutes = seconds / 60
  if (Math.abs(minutes) < 60) return relative.format(Math.round(minutes), 'minute')

  const hours = minutes / 60
  if (Math.abs(hours) < 24) return relative.format(Math.round(hours), 'hour')

  const days = hours / 24
  if (Math.abs(days) < 30) return relative.format(Math.round(days), 'day')

  const months = days / 30.44
  if (Math.abs(months) < 12) return relative.format(Math.round(months), 'month')

  return relative.format(Math.round(days / 365.25), 'year')
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value)
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  const kilobytes = bytes / 1024
  if (kilobytes < 1024) return `${kilobytes.toFixed(kilobytes < 10 ? 1 : 0)} KB`
  return `${(kilobytes / 1024).toFixed(1)} MB`
}

export function formatClaimTimestamp(value: string | number): string {
  const numeric = typeof value === 'number' ? value : Number(value)
  if (!Number.isFinite(numeric)) return String(value)
  return formatLocal(new Date(numeric * 1000))
}
