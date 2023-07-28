const { ipcMain, app } = require("electron");

module.exports.titleBar = (mainWindow) => {
  ipcMain.on("exit", (func) => {
    app.exit();
  });

  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("maximize", () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });
};
