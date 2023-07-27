const path = require("path");
const fs = require("fs");

const { BrowserWindow, app, ipcMain, dialog } = require("electron");

let win;

const createWindow = () => {
  win = new BrowserWindow({
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
    },
  });

  ipcMain.on("exit", (func) => {
    app.exit();
  });

  ipcMain.on("minimize", () => {
    win.minimize();
  });

  ipcMain.on("maximize", () => {
    win.isMaximized() ? win.unmaximize() : win.maximize();
  });

  ipcMain.handle("showSaveDialogAndSaveFile", async (e, content) => {
    let result = await dialog.showSaveDialog(win);
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
    if(!result.canceled){
      return result.filePaths
    }
  });

  ipcMain.handle("readDirectoryAt",async(e,selectedDirectory)=>{
    return new Promise((resolve,reject)=>{
      fs.readdir(selectedDirectory, function (err, files) {
        if(err){
          reject(err)
        } 
        resolve(files)
      });
    })
  })

  ipcMain.handle("readFile", async(e,filePath)=>{
    return new Promise((resolve,reject)=>{
      fs.readFile(filePath, "utf-8", function (err, data) {
        //console.log("fs read called");
        if(err){
          reject(err)
        }
        resolve(data)
      });
    })
  })

  ipcMain.handle("openFolder", async(e,address)=>{
    return new Promise((resolve,reject)=>{
      fs.readdir(address, function (err, dir) {
        //console.log("fs read called");
        if(err){
          reject(err)
        }
        resolve(dir)
      });
    })
  })

  win.loadFile(path.join(__dirname, "..", "..", "src/pages/index.html"));

  win.on("ready-to-show", () => {
    win.show();
    win.focus();
  });
};

app.on("ready", () => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
