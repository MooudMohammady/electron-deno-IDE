/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Denovin team. All rights reserved.
 *  Licensed under the GPL-3.0 License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const path = require("path");

const {
  BrowserWindow,
  app,
  ipcMain,
  dialog,
  ipcRenderer,
} = require("electron");

const { titleBar } = require("../ipcMain/titleBar");
const { fileMenu } = require("../ipcMain/fileMenu");
const { startTerminal } = require("../ipcMain/terminal");
const { contextMenu } = require("../ipcMain/contextMenu");

//------------------ Variable -------------------
let mainWindow;
//------------------ End Variable -------------------

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 800,
    center: true,
    minHeight: 650,
    minWidth: 600,
    frame: false,
    backgroundColor: "#16181A",
    icon: path.join(__dirname, "..", "..", "/src/assets/img/favicon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "..", "/preload/index.js"),
      nodeIntegration: true,
    },
  });
  //------------------ IpcMain -------------------
  titleBar(mainWindow);
  fileMenu();
  contextMenu();
  //------------------ End IpcMain -------------------

  mainWindow.loadFile(path.join(__dirname, "..", "..", "src/pages/index.html"));

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

app.on("ready", () => {
  createWindow();
  startTerminal(mainWindow);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
