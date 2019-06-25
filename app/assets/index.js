const { app, BrowserWindow } = require('electron');
// require('electron-debug')();
let mainWindow;

function createWindow() {
    console.log('creating window' + __dirname);
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        webPreferences: {
            nodeIntegration: true,
            devTools: false
        }
    });
    // mainWindow.webContents.openDevTools();
    mainWindow.setMenu(null);
    mainWindow.setFullScreen(true);
    mainWindow.loadFile(__dirname + '/index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    console.log('activate');
    if (!mainWindow) {
        createWindow();
    }
});
