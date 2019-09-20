const electron = require('electron');
const app = electron.app
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const isDev = require('electron-is-dev');
const screenres = require('screenres');

let mainWindow;
let window_x;
let window_y;

function createWindow() {
    
    let sr = screenres.get()      
    window_x = Math.floor(sr[0] * 0.75)
    window_y = Math.floor(sr[1] * 0.75)    

    mainWindow = new BrowserWindow({width: window_x, height: window_y});
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
    mainWindow.on('closed', () => mainWindow = null);
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