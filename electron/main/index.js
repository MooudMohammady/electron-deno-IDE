const path = require("path");

const { BrowserWindow, app, ipcMain } = require("electron");

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
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
    },
  });

  ipcMain.on('exit',()=>{
    app.exit()
  })

  ipcMain.on('minimize',()=>{
    win.minimize()
  })
  
  ipcMain.on('maximize',()=>{
    win.isMaximized() ? win.unmaximize() : win.maximize()
  })

  win.loadFile(path.join(__dirname + "../../../index.html"));

  win.on("ready-to-show", () => {
    win.show();
    win.focus();
  });
};

app.on('ready', ()=>{
  createWindow();
})

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
