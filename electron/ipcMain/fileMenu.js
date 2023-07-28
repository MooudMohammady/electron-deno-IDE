const fs = require('fs');

const { ipcMain, dialog } = require("electron");

module.exports.fileMenu = ()=>{
  ipcMain.handle("showSaveDialogAndSaveFile", async (e, content) => {
    let result = await dialog.showSaveDialog();
    if (!result.canceled) {
      fs.writeFile(result.filePath, content, function (error) {
        if (error) {
          throw error;
        }
      });
      return result.filePath;
    }
  });

  ipcMain.handle("saveFileWithoutDialog", async (e, filePath, content) => {
    fs.writeFile(filePath, content, function (error) {
      if (error) throw error;
    });
  });

  ipcMain.handle("selectFolder", async (e) => {
    let result = await dialog.showOpenDialog({ properties: ["openDirectory"] });
    if (!result.canceled) {
      return result.filePaths;
    }
  });

  ipcMain.handle("readDirectoryAt", async (e, selectedDirectory) => {
    return new Promise((resolve, reject) => {
      fs.readdir(selectedDirectory, function (err, files) {
        if (err) {
          reject(err);
        }
        resolve(files);
      });
    });
  });

  ipcMain.handle("readFile", async (e, filePath) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf-8", function (err, data) {
        //console.log("fs read called");
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  });

  ipcMain.handle("openFolder", async (e, address) => {
    return new Promise((resolve, reject) => {
      fs.readdir(address, function (err, dir) {
        //console.log("fs read called");
        if (err) {
          reject(err);
        }
        resolve(dir);
      });
    });
  });
}