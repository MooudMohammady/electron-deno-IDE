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
    icon: path.join(__dirname, "../../src/assets/img/logo.png"),
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
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
        // if (e) {
        //   alert("An error occured while saving the file");
        //   fileSaved = false;
        //   updateFileSave();
        // } else {
        // var tabIdNum = numberReturner(editor.container.id);
        // var tabId = "tabId_" + tabIdNum;
        // var currentFileName = getFileName(currentFileAddress);
        // $("#" + tabId)
        //   .parent()
        //   .html(
        //     returnListDesign(tabId, currentFileAddress, currentFileName, true)
        //   );
        // populateTitleText();
        // filePath = currentFileAddress;
        // fileSaved = true;
        // updateFileSave();
        // var fileExt = getFileExtension(currentFileAddress);
        // push(filePath);
        // mode = parseMode(fileExt);
        // //todo : update the ui aftr detecting the extension and then colour code the editor
        // codeSlate(tabIdNum);
        // savedFiles.push(currentFileAddress);
        // //jsonContent.savedFiles = savedFiles;
        // //writeJson(jsonContent);
        // findEditor(editorId, fileExt);
        // }
      });
    }
    return result.filePath
  });

  win.loadFile(path.join(__dirname + "../../../index.html"));

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
