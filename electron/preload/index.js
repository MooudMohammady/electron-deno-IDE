const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('API', {
  exit: () => {
    ipcRenderer.send('exit')
  },
  minimize: () => {
    ipcRenderer.send('minimize')
  },
  maximize: () => {
    ipcRenderer.send('maximize')
  }
})