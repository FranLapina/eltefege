const { contextBridge } = require('electron');

// Expone información sobre el entorno a los scripts del renderizador
contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
});
