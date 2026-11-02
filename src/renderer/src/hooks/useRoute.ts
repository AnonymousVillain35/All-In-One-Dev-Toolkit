import { useCallback, useEffect, useState } from 'react'

const DEFAULT_ROUTE = 'home'

function readRoute(): string {
  return window.location.hash.replace(/^#\/?/, '').trim() || DEFAULT_ROUTE
}

export function useRoute(): { route: string; navigate: (next: string) => void } {
  const [route, setRoute] = useState(readRoute)

  useEffect(() => {
    const handleHashChange = (): void => setRoute(readRoute())
    window.addEventListener('hashchange', handleHashChange)
    if (!window.location.hash) window.history.replaceState(null, '', `#/${DEFAULT_ROUTE}`)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigate = useCallback((next: string) => {
    if (readRoute() === next) return
    window.location.hash = `/${next}`
  }, [])

  return { route, navigate }
}
