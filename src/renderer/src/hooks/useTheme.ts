import { useCallback, useEffect, useState } from 'react'

export type ThemeId =
  | 'toxic-green'
  | 'crimson-reactor'
  | 'cyber-blue'
  | 'purple-haze'
  | 'solar-flare'
  | 'arctic-frost'

export type ThemeScheme = 'dark' | 'light'

export interface ThemeDefinition {
  id: ThemeId
  name: string
  tagline: string
  scheme: ThemeScheme
  swatches: readonly [string, string, string]
}

export const THEMES: readonly ThemeDefinition[] = [
  {
    id: 'toxic-green',
    name: 'Toxic Green',
    tagline: 'Acid lab glow',
    scheme: 'dark',
    swatches: ['#07130c', '#34d399', '#d9f99d']
  },
  {
    id: 'crimson-reactor',
    name: 'Crimson Reactor',
    tagline: 'Reactor-core heat',
    scheme: 'dark',
    swatches: ['#17070b', '#e11d48', '#ffb36b']
  },
  {
    id: 'cyber-blue',
    name: 'Cyber Blue',
    tagline: 'Neon grid clarity',
    scheme: 'dark',
    swatches: ['#070d18', '#3b82f6', '#22d3ee']
  },
  {
    id: 'purple-haze',
    name: 'Purple Haze',
    tagline: 'Velvet static',
    scheme: 'dark',
    swatches: ['#0e0919', '#8b5cf6', '#f0abfc']
  },
  {
    id: 'solar-flare',
    name: 'Solar Flare',
    tagline: 'Horizon burn',
    scheme: 'dark',
    swatches: ['#160d05', '#f59e0b', '#fb7185']
  },
  {
    id: 'arctic-frost',
    name: 'Arctic Frost',
    tagline: 'Polar daylight',
    scheme: 'light',
    swatches: ['#eaf4fa', '#0e7490', '#38bdf8']
  }
]

export const DEFAULT_THEME_ID: ThemeId = 'cyber-blue'
const STORAGE_KEY = 'devkit:theme'

export function getTheme(id: ThemeId): ThemeDefinition {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0]
}

function isThemeId(value: string | null): value is ThemeId {
  return THEMES.some((theme) => theme.id === value)
}

export function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isThemeId(stored)) return stored
    if (stored === 'light') return 'arctic-frost'
    if (stored === 'dark') return 'cyber-blue'
  } catch {
    // localStorage can be unavailable in hardened environments
  }
  return DEFAULT_THEME_ID
}

export function applyTheme(id: ThemeId): void {
  const theme = getTheme(id)
  document.documentElement.dataset.theme = theme.id
  document.documentElement.dataset.scheme = theme.scheme
}

export function useTheme(): {
  theme: ThemeId
  themeDefinition: ThemeDefinition
  selectTheme: (id: ThemeId) => void
} {
  const [theme, setTheme] = useState<ThemeId>(readStoredTheme)

  useEffect(() => {
    applyTheme(theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // Persistence is a convenience; the theme still applies for this session
    }
  }, [theme])

  const selectTheme = useCallback((id: ThemeId) => setTheme(id), [])

  return { theme, themeDefinition: getTheme(theme), selectTheme }
}
