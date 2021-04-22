'use strict';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const { getData, findIndices } = require('./src/utils/helpers');
const {
  populateLocations,
  compareLocationData,
} = require('./src/utils/VaxLocations');

let mainWindow;
let vaxLocations = {};

let dev = false;

if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV === 'development'
) {
  dev = true;
}

if (process.platform === 'win32') {
  app.commandLine.appendSwitch('high-dpi-support', 'true');
  app.commandLine.appendSwitch('force-device-scale-factor', '1');
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: path.join(__dirname, 'src/assets/icons/png/injection.png'),
  });

  let indexPath;

  if (dev && process.argv.indexOf('--noDevServer') === -1) {
    indexPath = url.format({
      protocol: 'http:',
      host: 'localhost:8080',
      pathname: 'index.html',
      slashes: true,
    });
  } else {
    indexPath = url.format({
      protocol: 'file:',
      pathname: path.join(__dirname, 'dist', 'index.html'),
      slashes: true,
    });
  }

  mainWindow.loadURL(indexPath);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();

    if (dev) {
      const {
        default: installExtension,
        REACT_DEVELOPER_TOOLS,
      } = require('electron-devtools-installer');

      installExtension(REACT_DEVELOPER_TOOLS).catch((err) =>
        console.log('Error loading React DevTools: ', err)
      );
      mainWindow.webContents.openDevTools();
    }
  });

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

async function finishedInitializing() {
  await app.whenReady();

  createWindow();

  const data = await getData();

  const [startIndices, stopIndex] = findIndices(data);

  const initialVaxLocations = populateLocations(data, startIndices, stopIndex);

  vaxLocations = initialVaxLocations;

  mainWindow.webContents.send('initial', vaxLocations);
}

finishedInitializing();

async function checkForUpdates() {
  const data = await getData();

  const [startIndices, stopIndex] = findIndices(data);

  const newVaxLocations = populateLocations(data, startIndices, stopIndex);

  const alertLocations = compareLocationData(vaxLocations, newVaxLocations);

  const updateObj = {
    vaxLocations,
    alertLocations,
  };

  mainWindow.webContents.send('update', updateObj);
}

setInterval(checkForUpdates, 60000);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('initial', (event, message) => {
  mainWindow.webContents.send('initial', vaxLocations);
});
