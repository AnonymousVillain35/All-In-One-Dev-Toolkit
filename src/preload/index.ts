import { contextBridge, ipcRenderer, type IpcRendererEvent } from 'electron'

const api = {
  platform: process.platform,
  window: {
    minimize: (): void => {
      ipcRenderer.send('window:minimize')
    },
    toggleMaximize: (): void => {
      ipcRenderer.send('window:toggle-maximize')
    },
    close: (): void => {
      ipcRenderer.send('window:close')
    },
    isMaximized: (): Promise<boolean> => ipcRenderer.invoke('window:is-maximized'),
    onMaximizeChange: (callback: (maximized: boolean) => void): (() => void) => {
      const listener = (_event: IpcRendererEvent, maximized: boolean): void => {
        callback(maximized)
      }
      ipcRenderer.on('window:maximized-changed', listener)
      return () => {
        ipcRenderer.removeListener('window:maximized-changed', listener)
      }
    }
  },
  clipboard: {
    writeText: (text: string): Promise<boolean> => ipcRenderer.invoke('clipboard:write', text)
  },
  app: {
    version: (): Promise<string> => ipcRenderer.invoke('app:version')
  }
} as const

contextBridge.exposeInMainWorld('devkit', api)
