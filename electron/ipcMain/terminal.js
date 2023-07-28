// const { spawn } = require("child_process");
const { ipcMain } = require("electron");
const pty = require('node-pty');
const os = require('os');
var shell = os.platform() === "win32" ? "powershell.exe" : "bash"

var ptyPeocess;

module.exports.startTerminal = (mainWindow)=>{
  if(ptyPeocess){
    ptyPeocess.kill()
  }

  ptyPeocess = pty.spawn(shell,[],{
    name:"xterm-color",
    cwd:process.env.HOME,
    env:process.env
  })

  ptyPeocess.onData((data)=>{
    mainWindow.webContents.send("command-output",data);
  })

  ipcMain.on("execute-command",(e,data)=>{
    ptyPeocess.write(data)
  })
}