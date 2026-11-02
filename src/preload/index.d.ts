export interface DevkitApi {
  platform: string
  window: {
    minimize: () => void
    toggleMaximize: () => void
    close: () => void
    isMaximized: () => Promise<boolean>
    onMaximizeChange: (callback: (maximized: boolean) => void) => () => void
  }
  clipboard: {
    writeText: (text: string) => Promise<boolean>
  }
  app: {
    version: () => Promise<string>
  }
}

declare global {
  interface Window {
    devkit?: DevkitApi
  }
}
