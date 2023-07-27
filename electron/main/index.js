const path = require("path");
const fs = require("fs");

const {
  BrowserWindow,
  app,
  ipcMain,
  dialog,
  ipcRenderer,
} = require("electron");
const { spawn } = require("child_process");

let mainWindow;

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
      nodeIntegration: true
    },
  });

  ipcMain.on("exit", (func) => {
    app.exit();
  });

  ipcMain.on("minimize", () => {
    mainWindow.minimize();
  });

  ipcMain.on("maximize", () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
  });

  ipcMain.handle("showSaveDialogAndSaveFile", async (e, content) => {
    let result = await dialog.showSaveDialog(mainWindow);
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

  mainWindow.loadFile(path.join(__dirname, "..", "..", "src/pages/index.html"));

  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
    mainWindow.focus();
  });
};

function startTerminal() {
  const cmd = spawn(process.platform === 'win32' ? 'cmd.exe' : 'bash', [], {
    cwd: process.env.HOME,
    env: process.env
  });

  // دریافت دستور از فرآیند اصلی و اجرای آن در ترمینال
  ipcMain.on('execute-command', (event, command) => {
    cmd.stdin.write(command.split('>')[1] !== undefined ? command.split('>')[1] + '\n' : command + '\n');
  });

  // دریافت خروجی ترمینال و ارسال آن به فرآیند رندر
  cmd.stdout.on('data', (data) => {
    mainWindow.webContents.send('command-output', data.toString());
  });

  cmd.stderr.on('data', (data) => {
    mainWindow.webContents.send('command-output', data.toString());
  });
}

app.on("ready", () => {
  createWindow();
  startTerminal();
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
