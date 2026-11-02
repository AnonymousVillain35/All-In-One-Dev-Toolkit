# All-in-One Dev Toolkit

A fast, offline desktop toolbox for everyday developer utilities. Everything runs locally inside the app window — no uploads, no accounts, no telemetry.

Built with Electron, React, TypeScript, and Vite.

## Tools

| Tool | Status |
| --- | --- |
| JSON Formatter | Ready |
| Base64 Encoder / Decoder | Ready |
| URL Encoder / Decoder | Ready |
| JWT Decoder | Ready |
| Hash Generator (SHA-1, SHA-256, SHA-384, SHA-512) | Ready |
| UUID Generator | Ready |
| Timestamp Converter | Ready |
| JSON ↔ YAML | Planned |
| SQL Formatter | Planned |
| Diff Checker | Planned |
| HTML Entities | Planned |
| Regex Tester | Planned |
| QR Code Generator | Planned |
| Cron Parser | Planned |
| Color Converter | Planned |

## Themes

Six hand-tuned palettes with a premium, theme-aware interface:

- Toxic Green
- Crimson Reactor
- Cyber Blue
- Purple Haze
- Solar Flare
- Arctic Frost (light)

The palette choice persists across launches.

## Getting started

```bash
npm install
npm run dev
```

## Verification

```bash
npm run typecheck
npm run build
```

## Windows installer

```bash
npm run build:win
```

The NSIS installer is written to `release/`.

## Privacy

All transformations run in the renderer with no network calls. Pasted content never leaves the machine.

## License

MIT
