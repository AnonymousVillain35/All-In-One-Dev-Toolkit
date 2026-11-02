import { useId, type ReactElement, type ReactNode, type SVGProps } from 'react'

export type IconProps = Omit<SVGProps<SVGSVGElement>, 'ref'> & { size?: number }

function Svg({ size = 18, children, ...props }: IconProps & { children: ReactNode }): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  )
}

const icons = {
  home: (props: IconProps) => (
    <Svg {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
      <path d="M9 21v-6h6v6" />
    </Svg>
  ),
  search: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Svg>
  ),
  braces: (props: IconProps) => (
    <Svg {...props}>
      <path d="M8.5 3H7a2 2 0 0 0-2 2v4a2 2 0 0 1-2 2 2 2 0 0 1 2 2v4a2 2 0 0 0 2 2h1.5" />
      <path d="M15.5 3H17a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2 2 2 0 0 0-2 2v4a2 2 0 0 1-2 2h-1.5" />
    </Svg>
  ),
  'file-code': (props: IconProps) => (
    <Svg {...props}>
      <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
      <path d="M14 2v5h5" />
      <path d="m9.5 12-1.5 1.5L9.5 15" />
      <path d="m14.5 12 1.5 1.5-1.5 1.5" />
    </Svg>
  ),
  key: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="7.5" cy="15.5" r="4.5" />
      <path d="m10.7 12.3 9-9" />
      <path d="m15 8 3 3" />
      <path d="m18 5 2 2" />
    </Svg>
  ),
  link: (props: IconProps) => (
    <Svg {...props}>
      <path d="M10 13a5 5 0 0 0 7.1 0l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1" />
      <path d="M14 11a5 5 0 0 0-7.1 0l-2 2A5 5 0 0 0 12 20.1l1.1-1.1" />
    </Svg>
  ),
  hash: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 9h16" />
      <path d="M4 15h16" />
      <path d="M10 3 8 21" />
      <path d="m16 3-2 18" />
    </Svg>
  ),
  fingerprint: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
      <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
      <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
      <path d="M2 12a10 10 0 0 1 18-6" />
      <path d="M2 16h.01" />
      <path d="M21.8 16c.2-2 .131-5.354 0-6" />
      <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
      <path d="M8.65 22c.21-.66.45-1.32.57-2" />
      <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
    </Svg>
  ),
  clock: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Svg>
  ),
  diff: (props: IconProps) => (
    <Svg {...props}>
      <path d="M5 4v16" />
      <path d="M19 4v16" />
      <path d="M9 7h6" />
      <path d="M9 12h6" />
      <path d="M9 17h4" />
    </Svg>
  ),
  regex: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 3v12" />
      <path d="m4.2 6.4 15.6 9" />
      <path d="m19.8 6.4-15.6 9" />
      <circle cx="12" cy="20" r="1.4" fill="currentColor" stroke="none" />
    </Svg>
  ),
  database: (props: IconProps) => (
    <Svg {...props}>
      <ellipse cx="12" cy="5.5" rx="8" ry="3" />
      <path d="M4 5.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
      <path d="M4 11.5v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
    </Svg>
  ),
  text: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 6h16" />
      <path d="M4 12h10" />
      <path d="M4 18h14" />
    </Svg>
  ),
  qr: (props: IconProps) => (
    <Svg {...props}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <path d="M14 14h3v3h-3z" />
      <path d="M20 14h1v3" />
      <path d="M14 20h3" />
      <path d="M20 20h1" />
    </Svg>
  ),
  palette: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 22a10 10 0 1 1 10-10c0 2.5-2 3-3.5 3H16a2 2 0 0 0 0 4h.5a2.5 2.5 0 0 1 0 5H12Z" />
      <circle cx="7.5" cy="11" r="1" />
      <circle cx="10" cy="7" r="1" />
      <circle cx="14.5" cy="7" r="1" />
      <circle cx="17" cy="10" r="1" />
    </Svg>
  ),
  'calendar-clock': (props: IconProps) => (
    <Svg {...props}>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
      <circle cx="17" cy="17" r="5" />
      <path d="M17 15v2.5l1.5 1" />
    </Svg>
  ),
  layers: (props: IconProps) => (
    <Svg {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 12 9 5 9-5" />
      <path d="m3 16 9 5 9-5" />
    </Svg>
  ),
  sparkles: (props: IconProps) => (
    <Svg {...props}>
      <path d="m12 3 1.8 4.9L19 9.7l-5.2 1.8L12 16.5l-1.8-5L5 9.7l5.2-1.8L12 3Z" />
      <path d="M5 16.5 5.8 19 8 19.8 5.8 20.6 5 23l-.8-2.4L2 19.8l2.2-.8.8-2.5Z" />
    </Svg>
  ),
  plus: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </Svg>
  ),
  copy: (props: IconProps) => (
    <Svg {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </Svg>
  ),
  check: (props: IconProps) => (
    <Svg {...props}>
      <path d="m5 12 4 4L19 6" />
    </Svg>
  ),
  'check-circle': (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </Svg>
  ),
  sun: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  ),
  moon: (props: IconProps) => (
    <Svg {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </Svg>
  ),
  minus: (props: IconProps) => (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  ),
  square: (props: IconProps) => (
    <Svg {...props}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </Svg>
  ),
  restore: (props: IconProps) => (
    <Svg {...props}>
      <rect x="8" y="3" width="13" height="13" rx="2" />
      <path d="M16 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h3" />
    </Svg>
  ),
  close: (props: IconProps) => (
    <Svg {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </Svg>
  ),
  'arrow-right': (props: IconProps) => (
    <Svg {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Svg>
  ),
  swap: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 7h13" />
      <path d="m14 4 3 3-3 3" />
      <path d="M20 17H7" />
      <path d="m10 14-3 3 3 3" />
    </Svg>
  ),
  trash: (props: IconProps) => (
    <Svg {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <path d="m6 7 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />
      <path d="M10 11v6M14 11v6" />
    </Svg>
  ),
  refresh: (props: IconProps) => (
    <Svg {...props}>
      <path d="M21 12a9 9 0 1 1-2.64-6.36" />
      <path d="M21 4v5h-5" />
    </Svg>
  ),
  play: (props: IconProps) => (
    <Svg {...props}>
      <path d="m8 5 11 7-11 7V5Z" />
    </Svg>
  ),
  alert: (props: IconProps) => (
    <Svg {...props}>
      <path d="M10.3 3.9 1.9 18a2 2 0 0 0 1.7 3h16.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </Svg>
  ),
  info: (props: IconProps) => (
    <Svg {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8h.01" />
    </Svg>
  ),
  shield: (props: IconProps) => (
    <Svg {...props}>
      <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </Svg>
  ),
  lock: (props: IconProps) => (
    <Svg {...props}>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </Svg>
  ),
  code: (props: IconProps) => (
    <Svg {...props}>
      <path d="m8 6-6 6 6 6" />
      <path d="m16 6 6 6-6 6" />
    </Svg>
  ),
  bug: (props: IconProps) => (
    <Svg {...props}>
      <rect x="8" y="6" width="8" height="14" rx="4" />
      <path d="M8 12H4M16 12h4M8 8 5 5M16 8l3-3M8 16l-3 3M16 16l3 3" />
    </Svg>
  ),
  bolt: (props: IconProps) => (
    <Svg {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </Svg>
  ),
  chevron: (props: IconProps) => (
    <Svg {...props}>
      <path d="m6 9 6 6 6-6" />
    </Svg>
  )
} satisfies Record<string, (props: IconProps) => ReactElement>

export type IconName = keyof typeof icons

export function Icon({ name, ...props }: IconProps & { name: IconName }): ReactElement {
  const Glyph = icons[name]
  return <Glyph {...props} />
}

export function LogoMark({ size = 24 }: { size?: number }): ReactElement {
  const rawId = useId()
  const gradientId = `logo-gradient-${rawId.replace(/:/g, '')}`

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill={`url(#${gradientId})`} />
      <path
        d="M12.5 10 7.5 16l5 6"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".95"
      />
      <path
        d="m19.5 10 5 6-5 6"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity=".95"
      />
      <path d="m17.5 8-3 16" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity=".5" />
      <defs>
        <linearGradient
          id={gradientId}
          x1="3"
          y1="2"
          x2="29"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="var(--accent)" />
          <stop offset="1" stopColor="var(--accent-2)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
