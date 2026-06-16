const { app, BrowserWindow, screen } = require('electron');
const path = require('path');
const isDev = !app.isPackaged; // true en desarrollo, false en portable;

let mainWindow;

function createWindow() {
  // Obtiene la resolución del monitor
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width,
    height,
	autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });
  
  //mainWindow.setMenuBarVisibility(false);
  // Maximiza la ventana
  mainWindow.maximize();

  // 🔹 Corrección principal: usar loadFile en vez de pathToFileURL
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Abre DevTools en desarrollo para debugging
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});