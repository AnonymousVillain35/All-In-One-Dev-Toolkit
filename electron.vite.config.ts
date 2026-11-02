import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import type { Plugin } from 'vite'

const productionCsp =
  "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:; connect-src 'self';"

const cspPlugin: Plugin = {
  name: 'inject-production-csp',
  apply: 'build',
  transformIndexHtml(html) {
    return html.replace(
      '<!-- CSP -->',
      `<meta http-equiv="Content-Security-Policy" content="${productionCsp}" />`
    )
  }
}

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    plugins: [react(), cspPlugin]
  }
})
